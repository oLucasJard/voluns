'use client'

/**
 * 🏆 Leaderboard Component
 * Ranking de voluntários
 */

import { useEffect, useState } from 'react'
import { LeaderboardEntry } from '@/types/gamification'
import { Card } from '@/components/ui/Card'
import { gamificationHelpers } from '@/lib/gamification/gamification-service'

interface LeaderboardProps {
  churchId: string
  type?: 'points' | 'events'
  limit?: number
  currentVolunteerId?: string
}

export default function Leaderboard({
  churchId,
  type = 'points',
  limit = 10,
  currentVolunteerId,
}: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [churchId, type, limit])

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/gamification/leaderboard?church_id=${churchId}&type=${type}&limit=${limit}`)
      const data = await res.json()
      setEntries(data)
    } catch (error) {
      console.error('Erro ao buscar leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `#${rank}`
    }
  }

  const getMetricDisplay = (entry: LeaderboardEntry) => {
    if (type === 'points') {
      return (
        <div className="text-right">
          <p className="font-bold text-gray-900 dark:text-white">
            {gamificationHelpers.formatPoints(entry.metric_value || entry.total_points || 0)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            pontos
          </p>
        </div>
      )
    } else {
      return (
        <div className="text-right">
          <p className="font-bold text-gray-900 dark:text-white">
            {entry.metric_value || entry.events_count || 0}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            eventos
          </p>
        </div>
      )
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          🏆 Ranking {type === 'points' ? 'de Pontos' : 'de Participação'}
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Top {limit}
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-3">
        {entries.length > 0 ? (
          entries.map((entry, index) => {
            const isCurrentUser = entry.volunteer_id === currentVolunteerId
            const rank = entry.rank || index + 1

            return (
              <div
                key={entry.volunteer_id}
                className={`
                  flex items-center gap-4 p-4 rounded-lg
                  transition-all
                  ${isCurrentUser
                    ? 'bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-12 text-center">
                  <span className="text-2xl font-bold">
                    {getRankMedal(rank)}
                  </span>
                </div>

                {/* Avatar & Name */}
                <div className="flex-1 min-w-0">
                  <p className={`
                    font-semibold truncate
                    ${isCurrentUser
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-gray-900 dark:text-white'
                    }
                  `}>
                    {entry.volunteer_name}
                    {isCurrentUser && ' (Você)'}
                  </p>
                  {entry.level && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Nível {entry.level}
                    </p>
                  )}
                </div>

                {/* Metric */}
                <div className="flex-shrink-0">
                  {getMetricDisplay(entry)}
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-gray-600 dark:text-gray-400">
              Nenhum dado disponível ainda
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {currentVolunteerId && entries.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-center text-gray-500 dark:text-gray-500">
            Continue participando de eventos para subir no ranking! 🚀
          </p>
        </div>
      )}
    </Card>
  )
}


