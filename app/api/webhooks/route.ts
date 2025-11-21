import { NextRequest, NextResponse } from 'next/server'
import { webhookManager, WEBHOOK_EVENTS } from '@/lib/webhooks/webhook-manager'

// GET /api/webhooks - Listar endpoints de webhook
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const endpointId = searchParams.get('endpoint_id')
    const status = searchParams.get('status')

    if (endpointId) {
      // Listar deliveries de um endpoint específico
      const deliveries = await webhookManager.listDeliveries(endpointId, status || undefined)
      return NextResponse.json({ deliveries })
    } else if (status) {
      // Listar deliveries por status
      const deliveries = await webhookManager.listDeliveries(undefined, status)
      return NextResponse.json({ deliveries })
    } else {
      // Listar todos os endpoints
      const endpoints = await webhookManager.listEndpoints()
      const stats = await webhookManager.getStats()
      return NextResponse.json({ endpoints, stats })
    }
  } catch (error) {
    console.error('Erro ao listar webhooks:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/webhooks - Registrar novo endpoint
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { url, events, is_active = true } = body

    if (!url || !events || !Array.isArray(events)) {
      return NextResponse.json(
        { error: 'URL e eventos são obrigatórios' },
        { status: 400 }
      )
    }

    // Validar URL
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'URL inválida' },
        { status: 400 }
      )
    }

    // Validar eventos
    const validEvents = Object.values(WEBHOOK_EVENTS)
    const invalidEvents = events.filter(event => !validEvents.includes(event as any))
    if (invalidEvents.length > 0) {
      return NextResponse.json(
        { error: `Eventos inválidos: ${invalidEvents.join(', ')}` },
        { status: 400 }
      )
    }

    const endpoint = await webhookManager.registerEndpoint(url, events, is_active)
    
    return NextResponse.json({ 
      message: 'Endpoint registrado com sucesso',
      endpoint 
    }, { status: 201 })
  } catch (error) {
    console.error('Erro ao registrar webhook:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE /api/webhooks - Remover endpoint
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const endpointId = searchParams.get('id')

    if (!endpointId) {
      return NextResponse.json(
        { error: 'ID do endpoint é obrigatório' },
        { status: 400 }
      )
    }

    const success = await webhookManager.unregisterEndpoint(endpointId)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Endpoint não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      message: 'Endpoint removido com sucesso' 
    })
  } catch (error) {
    console.error('Erro ao remover webhook:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}



