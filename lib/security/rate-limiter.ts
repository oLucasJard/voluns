// Sistema de rate limiting para APIs
// Inspirado em práticas de grandes empresas como GitHub, Stripe e AWS

import { NextRequest, NextResponse } from 'next/server'
import { redisCache } from '@/lib/cache/redis'

// Configurações de rate limiting
export interface RateLimitConfig {
  windowMs: number // Janela de tempo em milissegundos
  maxRequests: number // Máximo de requests por janela
  skipSuccessfulRequests?: boolean // Pular requests bem-sucedidos
  skipFailedRequests?: boolean // Pular requests com falha
  keyGenerator?: (req: NextRequest) => string // Função para gerar chave única
  onLimitReached?: (req: NextRequest, key: string) => void // Callback quando limite é atingido
}

// Configurações padrão para diferentes endpoints
export const rateLimitConfigs: Record<string, RateLimitConfig> = {
  // Endpoints de autenticação - mais restritivos
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    maxRequests: 5, // 5 tentativas por 15 minutos
    keyGenerator: (req) => `auth:${getClientIP(req)}`,
    onLimitReached: (req, key) => {
      console.warn(`Rate limit exceeded for auth: ${key}`)
    }
  },

  // Endpoints de API geral - moderados
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    maxRequests: 100, // 100 requests por 15 minutos
    keyGenerator: (req) => `api:${getClientIP(req)}`,
    onLimitReached: (req, key) => {
      console.warn(`Rate limit exceeded for API: ${key}`)
    }
  },

  // Endpoints de dashboard - mais permissivos
  dashboard: {
    windowMs: 60 * 1000, // 1 minuto
    maxRequests: 60, // 60 requests por minuto
    keyGenerator: (req) => `dashboard:${getClientIP(req)}`,
    onLimitReached: (req, key) => {
      console.warn(`Rate limit exceeded for dashboard: ${key}`)
    }
  },

  // Endpoints de upload - muito restritivos
  upload: {
    windowMs: 60 * 60 * 1000, // 1 hora
    maxRequests: 10, // 10 uploads por hora
    keyGenerator: (req) => `upload:${getClientIP(req)}`,
    onLimitReached: (req, key) => {
      console.warn(`Rate limit exceeded for upload: ${key}`)
    }
  },

  // Endpoints de relatórios - moderados
  reports: {
    windowMs: 5 * 60 * 1000, // 5 minutos
    maxRequests: 20, // 20 requests por 5 minutos
    keyGenerator: (req) => `reports:${getClientIP(req)}`,
    onLimitReached: (req, key) => {
      console.warn(`Rate limit exceeded for reports: ${key}`)
    }
  }
}

// Obter IP do cliente
function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const realIP = req.headers.get('x-real-ip')
  const cfConnectingIP = req.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return req.ip || 'unknown'
}

// Classe principal do rate limiter
class RateLimiter {
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
  }

  // Verificar se request está dentro do limite
  async checkLimit(req: NextRequest): Promise<{
    allowed: boolean
    remaining: number
    resetTime: number
    totalHits: number
  }> {
    const key = this.config.keyGenerator ? this.config.keyGenerator(req) : `default:${getClientIP(req)}`
    const now = Date.now()
    const windowStart = now - this.config.windowMs

    try {
      // Tentar usar Redis para rate limiting
      return await this.checkLimitWithRedis(key, now, windowStart)
    } catch (error) {
      console.warn('Redis not available for rate limiting, using memory fallback')
      return this.checkLimitWithMemory(key, now, windowStart)
    }
  }

  // Rate limiting com Redis
  private async checkLimitWithRedis(key: string, now: number, windowStart: number): Promise<{
    allowed: boolean
    remaining: number
    resetTime: number
    totalHits: number
  }> {
    const redisKey = `rate_limit:${key}`
    
    // Obter hits atuais
    const hits = await redisCache.get<number[]>(redisKey) || []
    
    // Filtrar hits dentro da janela de tempo
    const validHits = hits.filter(hit => hit > windowStart)
    
    // Adicionar hit atual
    validHits.push(now)
    
    // Verificar se excede o limite
    const totalHits = validHits.length
    const allowed = totalHits <= this.config.maxRequests
    
    if (allowed) {
      // Salvar hits atualizados
      await redisCache.set(redisKey, validHits, {
        ttl: Math.ceil(this.config.windowMs / 1000)
      })
    }

    const remaining = Math.max(0, this.config.maxRequests - totalHits)
    const resetTime = now + this.config.windowMs

    // Callback se limite foi atingido
    if (!allowed && this.config.onLimitReached) {
      this.config.onLimitReached({} as NextRequest, key)
    }

    return {
      allowed,
      remaining,
      resetTime,
      totalHits
    }
  }

  // Rate limiting com memória (fallback)
  private memoryStore: Map<string, number[]> = new Map()

  private checkLimitWithMemory(key: string, now: number, windowStart: number): {
    allowed: boolean
    remaining: number
    resetTime: number
    totalHits: number
  } {
    // Obter hits atuais
    const hits = this.memoryStore.get(key) || []
    
    // Filtrar hits dentro da janela de tempo
    const validHits = hits.filter(hit => hit > windowStart)
    
    // Adicionar hit atual
    validHits.push(now)
    
    // Verificar se excede o limite
    const totalHits = validHits.length
    const allowed = totalHits <= this.config.maxRequests
    
    if (allowed) {
      // Salvar hits atualizados
      this.memoryStore.set(key, validHits)
    }

    const remaining = Math.max(0, this.config.maxRequests - totalHits)
    const resetTime = now + this.config.windowMs

    // Callback se limite foi atingido
    if (!allowed && this.config.onLimitReached) {
      this.config.onLimitReached({} as NextRequest, key)
    }

    return {
      allowed,
      remaining,
      resetTime,
      totalHits
    }
  }

  // Limpar dados antigos da memória
  cleanup(): void {
    const now = Date.now()
    for (const [key, hits] of this.memoryStore.entries()) {
      const validHits = hits.filter(hit => hit > now - this.config.windowMs)
      if (validHits.length === 0) {
        this.memoryStore.delete(key)
      } else {
        this.memoryStore.set(key, validHits)
      }
    }
  }
}

// Instâncias dos rate limiters
export const rateLimiters = {
  auth: new RateLimiter(rateLimitConfigs.auth),
  api: new RateLimiter(rateLimitConfigs.api),
  dashboard: new RateLimiter(rateLimitConfigs.dashboard),
  upload: new RateLimiter(rateLimitConfigs.upload),
  reports: new RateLimiter(rateLimitConfigs.reports)
}

// Middleware para rate limiting
export async function rateLimitMiddleware(
  req: NextRequest,
  type: keyof typeof rateLimiters = 'api'
): Promise<NextResponse | null> {
  const limiter = rateLimiters[type]
  const result = await limiter.checkLimit(req)

  // Headers de rate limiting
  const headers = new Headers()
  headers.set('X-RateLimit-Limit', rateLimitConfigs[type].maxRequests.toString())
  headers.set('X-RateLimit-Remaining', result.remaining.toString())
  headers.set('X-RateLimit-Reset', new Date(result.resetTime).toISOString())
  headers.set('X-RateLimit-Used', result.totalHits.toString())

  if (!result.allowed) {
    // Limite excedido
    const response = NextResponse.json(
      {
        error: 'Rate limit exceeded',
        message: `Too many requests. Limit: ${rateLimitConfigs[type].maxRequests} requests per ${Math.ceil(rateLimitConfigs[type].windowMs / 60000)} minutes`,
        retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000)
      },
      { status: 429, headers }
    )

    return response
  }

  // Request permitido, adicionar headers
  const response = NextResponse.next()
  headers.forEach((value, key) => {
    response.headers.set(key, value)
  })

  return null
}

// Função utilitária para verificar rate limit
export async function checkRateLimit(
  req: NextRequest,
  type: keyof typeof rateLimiters = 'api'
): Promise<{
  allowed: boolean
  remaining: number
  resetTime: number
  totalHits: number
}> {
  const limiter = rateLimiters[type]
  return limiter.checkLimit(req)
}

// Limpeza periódica dos rate limiters
setInterval(() => {
  Object.values(rateLimiters).forEach(limiter => {
    limiter.cleanup()
  })
}, 60000) // Limpar a cada minuto

export default rateLimiters



