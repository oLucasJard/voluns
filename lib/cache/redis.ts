// Sistema de cache Redis para dados estáticos
// Implementação inspirada em grandes empresas como Netflix, Uber e Airbnb

// Importação condicional para evitar erros no browser
let createClient: any, RedisClientType: any
if (typeof window === 'undefined') {
  try {
    const redis = require('redis')
    createClient = redis.createClient
    RedisClientType = redis.RedisClientType
  } catch (error) {
    console.warn('Redis não disponível no servidor')
  }
}

// Configurações do Redis
const REDIS_CONFIG = {
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    connectTimeout: 10000,
    lazyConnect: true,
  },
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
}

// Tipos para cache
export interface CacheOptions {
  ttl?: number // Time to live em segundos
  tags?: string[] // Tags para invalidação em lote
  compress?: boolean // Compressão para dados grandes
}

export interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
  tags?: string[]
}

// Classe principal do cache
class RedisCache {
  private client: any = null
  private isConnected = false
  private connectionPromise: Promise<void> | null = null

  // Conectar ao Redis
  private async connect(): Promise<void> {
    if (this.isConnected && this.client) return

    if (this.connectionPromise) {
      return this.connectionPromise
    }

    this.connectionPromise = this._connect()
    return this.connectionPromise
  }

  private async _connect(): Promise<void> {
    try {
      if (!createClient) {
        throw new Error('Redis não disponível')
      }
      this.client = createClient(REDIS_CONFIG)
      
      this.client.on('error', (err) => {
        console.error('Redis Client Error:', err)
        this.isConnected = false
      })

      this.client.on('connect', () => {
        console.log('Redis Client Connected')
        this.isConnected = true
      })

      this.client.on('disconnect', () => {
        console.log('Redis Client Disconnected')
        this.isConnected = false
      })

      await this.client.connect()
    } catch (error) {
      console.error('Failed to connect to Redis:', error)
      this.isConnected = false
      throw error
    }
  }

  // Verificar se está conectado
  private async ensureConnected(): Promise<boolean> {
    try {
      await this.connect()
      return this.isConnected && this.client !== null
    } catch (error) {
      console.error('Redis connection failed:', error)
      return false
    }
  }

  // Gerar chave de cache
  private generateKey(key: string, namespace?: string): string {
    const prefix = process.env.NODE_ENV === 'production' ? 'voluns:prod' : 'voluns:dev'
    return namespace ? `${prefix}:${namespace}:${key}` : `${prefix}:${key}`
  }

  // Serializar dados
  private serialize<T>(data: T): string {
    return JSON.stringify(data)
  }

  // Deserializar dados
  private deserialize<T>(data: string): T {
    try {
      return JSON.parse(data)
    } catch (error) {
      console.error('Failed to deserialize cache data:', error)
      throw error
    }
  }

  // Definir valor no cache
  async set<T>(
    key: string, 
    value: T, 
    options: CacheOptions = {}
  ): Promise<boolean> {
    const connected = await this.ensureConnected()
    if (!connected || !this.client) {
      console.warn('Redis not available, skipping cache set')
      return false
    }

    try {
      const { ttl = 3600, tags = [] } = options // TTL padrão: 1 hora
      const cacheEntry: CacheEntry<T> = {
        data: value,
        timestamp: Date.now(),
        ttl,
        tags
      }

      const serializedData = this.serialize(cacheEntry)
      const cacheKey = this.generateKey(key)

      // Definir valor com TTL
      await this.client.setEx(cacheKey, ttl, serializedData)

      // Adicionar tags para invalidação em lote
      if (tags.length > 0) {
        const tagKey = this.generateKey(`tags:${key}`)
        await this.client.setEx(tagKey, ttl, this.serialize(tags))
      }

      return true
    } catch (error) {
      console.error('Failed to set cache:', error)
      return false
    }
  }

  // Obter valor do cache
  async get<T>(key: string): Promise<T | null> {
    const connected = await this.ensureConnected()
    if (!connected || !this.client) {
      return null
    }

    try {
      const cacheKey = this.generateKey(key)
      const cachedData = await this.client.get(cacheKey)

      if (!cachedData) {
        return null
      }

      const cacheEntry: CacheEntry<T> = this.deserialize(cachedData)
      
      // Verificar se expirou
      const now = Date.now()
      if (now - cacheEntry.timestamp > cacheEntry.ttl * 1000) {
        await this.delete(key)
        return null
      }

      return cacheEntry.data
    } catch (error) {
      console.error('Failed to get cache:', error)
      return null
    }
  }

  // Deletar valor do cache
  async delete(key: string): Promise<boolean> {
    const connected = await this.ensureConnected()
    if (!connected || !this.client) {
      return false
    }

    try {
      const cacheKey = this.generateKey(key)
      const result = await this.client.del(cacheKey)
      return result > 0
    } catch (error) {
      console.error('Failed to delete cache:', error)
      return false
    }
  }

  // Invalidar cache por tags
  async invalidateByTags(tags: string[]): Promise<number> {
    const connected = await this.ensureConnected()
    if (!connected || !this.client) {
      return 0
    }

    try {
      let invalidatedCount = 0

      for (const tag of tags) {
        const pattern = this.generateKey(`tags:*${tag}*`)
        const keys = await this.client.keys(pattern)
        
        for (const key of keys) {
          const tagData = await this.client.get(key)
          if (tagData) {
            const tagList: string[] = this.deserialize(tagData)
            if (tagList.includes(tag)) {
              // Extrair chave original e deletar
              const originalKey = key.replace(this.generateKey('tags:'), '')
              await this.delete(originalKey)
              invalidatedCount++
            }
          }
        }
      }

      return invalidatedCount
    } catch (error) {
      console.error('Failed to invalidate cache by tags:', error)
      return 0
    }
  }

  // Limpar todo o cache
  async clear(): Promise<boolean> {
    const connected = await this.ensureConnected()
    if (!connected || !this.client) {
      return false
    }

    try {
      const pattern = this.generateKey('*')
      const keys = await this.client.keys(pattern)
      
      if (keys.length > 0) {
        await this.client.del(keys)
      }

      return true
    } catch (error) {
      console.error('Failed to clear cache:', error)
      return false
    }
  }

  // Obter estatísticas do cache
  async getStats(): Promise<{
    connected: boolean
    memory: string
    keys: number
    hitRate?: number
  }> {
    const connected = await this.ensureConnected()
    
    if (!connected || !this.client) {
      return {
        connected: false,
        memory: '0',
        keys: 0
      }
    }

    try {
      const info = await this.client.info('memory')
      const keys = await this.client.dbSize()
      
      // Extrair uso de memória do info
      const memoryMatch = info.match(/used_memory_human:([^\r\n]+)/)
      const memory = memoryMatch ? memoryMatch[1] : '0'

      return {
        connected: true,
        memory,
        keys
      }
    } catch (error) {
      console.error('Failed to get cache stats:', error)
      return {
        connected: false,
        memory: '0',
        keys: 0
      }
    }
  }

  // Fechar conexão
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.disconnect()
      this.client = null
      this.isConnected = false
    }
  }
}

// Instância singleton
export const redisCache = new RedisCache()

// Funções utilitárias para cache
export const cacheUtils = {
  // Cache para dados de dashboard
  async cacheDashboardStats(churchId: string, data: any): Promise<void> {
    await redisCache.set(`dashboard:stats:${churchId}`, data, {
      ttl: 300, // 5 minutos
      tags: ['dashboard', 'stats']
    })
  },

  // Cache para listas de eventos
  async cacheEventsList(churchId: string, page: number, data: any): Promise<void> {
    await redisCache.set(`events:list:${churchId}:${page}`, data, {
      ttl: 600, // 10 minutos
      tags: ['events', 'list']
    })
  },

  // Cache para listas de voluntários
  async cacheVolunteersList(churchId: string, page: number, data: any): Promise<void> {
    await redisCache.set(`volunteers:list:${churchId}:${page}`, data, {
      ttl: 600, // 10 minutos
      tags: ['volunteers', 'list']
    })
  },

  // Cache para dados de ministérios
  async cacheMinistries(churchId: string, data: any): Promise<void> {
    await redisCache.set(`ministries:${churchId}`, data, {
      ttl: 1800, // 30 minutos
      tags: ['ministries']
    })
  },

  // Invalidar cache de eventos
  async invalidateEventsCache(churchId: string): Promise<void> {
    await redisCache.invalidateByTags(['events'])
  },

  // Invalidar cache de voluntários
  async invalidateVolunteersCache(churchId: string): Promise<void> {
    await redisCache.invalidateByTags(['volunteers'])
  },

  // Invalidar cache de dashboard
  async invalidateDashboardCache(churchId: string): Promise<void> {
    await redisCache.invalidateByTags(['dashboard', 'stats'])
  }
}

// Hook para usar cache em componentes React
export function useCache() {
  return {
    get: redisCache.get.bind(redisCache),
    set: redisCache.set.bind(redisCache),
    delete: redisCache.delete.bind(redisCache),
    invalidateByTags: redisCache.invalidateByTags.bind(redisCache),
    clear: redisCache.clear.bind(redisCache),
    getStats: redisCache.getStats.bind(redisCache)
  }
}

export default redisCache
