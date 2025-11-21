import { NextRequest, NextResponse } from 'next/server'
import { eventTemplateManager } from '@/lib/templates/event-templates'

// POST /api/templates/[id]/generate-event - Gerar evento a partir do template
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await req.json()

    const {
      name,
      description,
      date,
      start_time,
      end_time,
      location,
      church_id,
      ministry_id,
      created_by
    } = body

    if (!name || !date || !church_id || !ministry_id || !created_by) {
      return NextResponse.json(
        { error: 'Nome, data, igreja, ministério e criador são obrigatórios' },
        { status: 400 }
      )
    }

    // Validar data
    const eventDate = new Date(date)
    if (isNaN(eventDate.getTime())) {
      return NextResponse.json(
        { error: 'Data inválida' },
        { status: 400 }
      )
    }

    const eventData = {
      name,
      description,
      date: eventDate,
      start_time,
      end_time,
      location,
      church_id,
      ministry_id,
      created_by
    }

    const event = await eventTemplateManager.generateEventFromTemplate(id, eventData)
    
    return NextResponse.json({ 
      message: 'Evento gerado com sucesso a partir do template',
      event 
    }, { status: 201 })
  } catch (error) {
    console.error('Erro ao gerar evento do template:', error)
    
    if (error instanceof Error && error.message === 'Template não encontrado') {
      return NextResponse.json(
        { error: 'Template não encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}



