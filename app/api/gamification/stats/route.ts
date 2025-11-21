/**
 * API: Gamification - Stats
 * Estatísticas completas de gamificação de um voluntário
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import gamificationService from '@/lib/gamification/gamification-service'
import type { GamificationStats } from '@/types/gamification'

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const volunteerId = searchParams.get('volunteer_id')
    const churchId = searchParams.get('church_id')

    if (!volunteerId || !churchId) {
      return NextResponse.json(
        { error: 'volunteer_id e church_id são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar todas as informações em paralelo
    const [points, badges, streak, rank, transactions] = await Promise.all([
      gamificationService.getVolunteerPoints(volunteerId, churchId),
      gamificationService.getVolunteerBadges(volunteerId),
      gamificationService.getVolunteerStreak(volunteerId, churchId),
      gamificationService.getVolunteerRank(volunteerId, churchId),
      gamificationService.getPointTransactions(volunteerId, churchId, 10),
    ])

    if (!points) {
      return NextResponse.json(
        { error: 'Voluntário não encontrado' },
        { status: 404 }
      )
    }

    const stats: GamificationStats = {
      points,
      badges,
      streak,
      rank,
      recentTransactions: transactions,
    }

    return NextResponse.json(stats)
  } catch (error: any) {
    console.error('Erro ao buscar estatísticas:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao buscar estatísticas' },
      { status: 500 }
    )
  }
}


