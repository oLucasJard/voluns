/**
 * API: Gamification - Leaderboard
 * Rankings e leaderboards
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import gamificationService from '@/lib/gamification/gamification-service'

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const churchId = searchParams.get('church_id')
    const type = searchParams.get('type') || 'points'
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!churchId) {
      return NextResponse.json(
        { error: 'church_id é obrigatório' },
        { status: 400 }
      )
    }

    let leaderboard = []

    if (type === 'points') {
      leaderboard = await gamificationService.getLeaderboardByPoints(churchId, limit)
    } else if (type === 'events') {
      leaderboard = await gamificationService.getLeaderboardByEvents(churchId, limit)
    } else {
      return NextResponse.json(
        { error: 'Tipo de leaderboard inválido. Use "points" ou "events"' },
        { status: 400 }
      )
    }

    return NextResponse.json(leaderboard)
  } catch (error: any) {
    console.error('Erro ao buscar leaderboard:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao buscar leaderboard' },
      { status: 500 }
    )
  }
}


