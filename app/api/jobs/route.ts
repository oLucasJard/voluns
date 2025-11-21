import { NextRequest, NextResponse } from 'next/server'
import { jobManager, JOB_TYPES } from '@/lib/jobs/job-manager'

// GET /api/jobs - Listar jobs
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const queueName = searchParams.get('queue')
    const status = searchParams.get('status')
    const jobId = searchParams.get('job_id')

    if (jobId) {
      // Buscar job específico
      const job = await jobManager.getJob(jobId)
      if (!job) {
        return NextResponse.json(
          { error: 'Job não encontrado' },
          { status: 404 }
        )
      }
      return NextResponse.json({ job })
    }

    if (queueName) {
      // Listar jobs de uma fila específica
      const jobs = await jobManager.getJobs(queueName, status || undefined)
      return NextResponse.json({ jobs })
    }

    // Estatísticas gerais
    const stats = await jobManager.getStats()
    return NextResponse.json({ stats })
  } catch (error) {
    console.error('Erro ao listar jobs:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/jobs - Adicionar job
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { queue, type, data, options = {} } = body

    if (!queue || !type || !data) {
      return NextResponse.json(
        { error: 'Fila, tipo e dados são obrigatórios' },
        { status: 400 }
      )
    }

    // Validar tipo de job
    const validTypes = Object.values(JOB_TYPES)
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Tipo de job inválido. Válidos: ${validTypes.join(', ')}` },
        { status: 400 }
      )
    }

    const job = await jobManager.addJob(queue, type, data, options)
    
    return NextResponse.json({ 
      message: 'Job adicionado com sucesso',
      job 
    }, { status: 201 })
  } catch (error) {
    console.error('Erro ao adicionar job:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE /api/jobs - Cancelar job
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const jobId = searchParams.get('job_id')

    if (!jobId) {
      return NextResponse.json(
        { error: 'ID do job é obrigatório' },
        { status: 400 }
      )
    }

    const success = await jobManager.cancelJob(jobId)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Job não encontrado ou não pode ser cancelado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      message: 'Job cancelado com sucesso' 
    })
  } catch (error) {
    console.error('Erro ao cancelar job:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}



