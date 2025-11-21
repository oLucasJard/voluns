// Sistema de Webhooks para Integrações
// Implementação inspirada em Stripe, GitHub e Slack

export interface WebhookEvent {
  id: string
  type: string
  data: Record<string, any>
  timestamp: Date
  source: string
  retry_count?: number
  max_retries?: number
}

export interface WebhookEndpoint {
  id: string
  url: string
  events: string[]
  secret: string
  is_active: boolean
  created_at: Date
  last_triggered?: Date
  success_count: number
  failure_count: number
}

export interface WebhookDelivery {
  id: string
  endpoint_id: string
  event_id: string
  status: 'pending' | 'delivered' | 'failed' | 'retrying'
  attempts: number
  max_attempts: number
  next_retry_at?: Date
  response_code?: number
  response_body?: string
  created_at: Date
  delivered_at?: Date
}

// Classe principal do sistema de webhooks
class WebhookManager {
  private endpoints: Map<string, WebhookEndpoint> = new Map()
  private deliveries: Map<string, WebhookDelivery> = new Map()
  private eventQueue: WebhookEvent[] = []
  private isProcessing = false

  // Gerar UUID compatível
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  // Gerar secret para webhook
  private generateSecret(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // Registrar endpoint de webhook
  async registerEndpoint(
    url: string, 
    events: string[], 
    isActive: boolean = true
  ): Promise<WebhookEndpoint> {
    const endpoint: WebhookEndpoint = {
      id: this.generateUUID(),
      url,
      events,
      secret: this.generateSecret(),
      is_active: isActive,
      created_at: new Date(),
      success_count: 0,
      failure_count: 0
    }

    this.endpoints.set(endpoint.id, endpoint)
    console.log(`🔗 Webhook endpoint registrado: ${endpoint.id}`)
    
    return endpoint
  }

  // Remover endpoint de webhook
  async unregisterEndpoint(endpointId: string): Promise<boolean> {
    const endpoint = this.endpoints.get(endpointId)
    if (!endpoint) {
      return false
    }

    this.endpoints.delete(endpointId)
    console.log(`🔗 Webhook endpoint removido: ${endpointId}`)
    
    return true
  }

  // Listar endpoints
  async listEndpoints(): Promise<WebhookEndpoint[]> {
    return Array.from(this.endpoints.values())
  }

  // Disparar evento de webhook
  async triggerEvent(
    type: string, 
    data: Record<string, any>, 
    source: string = 'system'
  ): Promise<void> {
    const event: WebhookEvent = {
      id: this.generateUUID(),
      type,
      data,
      timestamp: new Date(),
      source,
      retry_count: 0,
      max_retries: 3
    }

    console.log(`🔗 Disparando evento webhook: ${type}`)
    
    // Encontrar endpoints que escutam este tipo de evento
    const relevantEndpoints = Array.from(this.endpoints.values())
      .filter(endpoint => 
        endpoint.is_active && 
        endpoint.events.includes(type)
      )

    // Criar deliveries para cada endpoint
    for (const endpoint of relevantEndpoints) {
      const delivery: WebhookDelivery = {
        id: this.generateUUID(),
        endpoint_id: endpoint.id,
        event_id: event.id,
        status: 'pending',
        attempts: 0,
        max_attempts: 3,
        created_at: new Date()
      }

      this.deliveries.set(delivery.id, delivery)
    }

    // Processar fila de webhooks
    await this.processWebhookQueue()
  }

  // Processar fila de webhooks
  private async processWebhookQueue(): Promise<void> {
    if (this.isProcessing) {
      return
    }

    this.isProcessing = true

    try {
      const pendingDeliveries = Array.from(this.deliveries.values())
        .filter(delivery => delivery.status === 'pending')

      for (const delivery of pendingDeliveries) {
        await this.deliverWebhook(delivery)
      }
    } finally {
      this.isProcessing = false
    }
  }

  // Entregar webhook
  private async deliverWebhook(delivery: WebhookDelivery): Promise<void> {
    const endpoint = this.endpoints.get(delivery.endpoint_id)
    if (!endpoint) {
      delivery.status = 'failed'
      return
    }

    try {
      delivery.attempts++
      delivery.status = 'retrying'

      // Buscar dados do evento
      const event = this.eventQueue.find(e => e.id === delivery.event_id)
      if (!event) {
        delivery.status = 'failed'
        return
      }

      // Preparar payload
      const payload = {
        id: event.id,
        type: event.type,
        data: event.data,
        timestamp: event.timestamp.toISOString(),
        source: event.source
      }

      // Calcular assinatura HMAC
      const signature = await this.calculateSignature(
        JSON.stringify(payload), 
        endpoint.secret
      )

      // Fazer requisição HTTP
      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Signature': signature,
          'X-Webhook-Event': event.type,
          'User-Agent': 'Voluns-Webhook/1.0'
        },
        body: JSON.stringify(payload)
      })

      delivery.response_code = response.status
      delivery.response_body = await response.text()

      if (response.ok) {
        delivery.status = 'delivered'
        delivery.delivered_at = new Date()
        endpoint.success_count++
        endpoint.last_triggered = new Date()
        console.log(`✅ Webhook entregue com sucesso: ${delivery.id}`)
      } else {
        throw new Error(`HTTP ${response.status}: ${delivery.response_body}`)
      }

    } catch (error) {
      console.error(`❌ Erro ao entregar webhook: ${delivery.id}`, error)
      
      endpoint.failure_count++
      
      if (delivery.attempts >= delivery.max_attempts) {
        delivery.status = 'failed'
        console.log(`💀 Webhook falhou definitivamente: ${delivery.id}`)
      } else {
        // Agendar nova tentativa (exponential backoff)
        const delay = Math.pow(2, delivery.attempts) * 1000 // 1s, 2s, 4s, 8s...
        delivery.next_retry_at = new Date(Date.now() + delay)
        delivery.status = 'pending'
        console.log(`⏰ Webhook reagendado para: ${delivery.next_retry_at}`)
      }
    }
  }

  // Calcular assinatura HMAC
  private async calculateSignature(payload: string, secret: string): Promise<string> {
    // Implementação simples de HMAC-SHA256
    // Em produção, usar uma biblioteca adequada
    const encoder = new TextEncoder()
    const keyData = encoder.encode(secret)
    const messageData = encoder.encode(payload)
    
    // Simulação de HMAC (em produção usar crypto.subtle)
    let hash = 0
    for (let i = 0; i < messageData.length; i++) {
      hash = ((hash << 5) - hash) + messageData[i]
      hash = hash & hash
    }
    
    return `sha256=${hash.toString(16)}`
  }

  // Verificar assinatura de webhook recebido
  async verifySignature(
    payload: string, 
    signature: string, 
    secret: string
  ): Promise<boolean> {
    const expectedSignature = await this.calculateSignature(payload, secret)
    return signature === expectedSignature
  }

  // Listar deliveries
  async listDeliveries(
    endpointId?: string, 
    status?: string
  ): Promise<WebhookDelivery[]> {
    let deliveries = Array.from(this.deliveries.values())
    
    if (endpointId) {
      deliveries = deliveries.filter(d => d.endpoint_id === endpointId)
    }
    
    if (status) {
      deliveries = deliveries.filter(d => d.status === status)
    }
    
    return deliveries.sort((a, b) => b.created_at.getTime() - a.created_at.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         