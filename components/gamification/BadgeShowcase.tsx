'use client'

/**
 * 🏅 Badge Showcase Component
 * Galeria de badges do voluntário
 */

import { useEffect, useState } from 'react'
import { VolunteerBadge, Badge } from '@/types/gamification'
import BadgeDisplay from './BadgeDisplay'
import { Card } from '@/components/ui/Card'

interface BadgeShowcaseProps {
  volunteerId: string
  churchId: string
}

export default function BadgeShowcase({ volunteerId, churchId }: BadgeShowcaseProps) {
  const [earnedBadges, setEarnedBadges] = useState<VolunteerBadge[]>([])
  const [availableBadges, setAvailableBadges] = useState<Badge[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'earned' | 'available'>('earned')

  useEffect(() => {
    fetchBadges()
  }, [volunteerId, churchId])

  const fetchBadges = async () => {
    try {
      setLoading(true)

      // Buscar badges conquistados
      const earnedRes = await fetch(`/api/gamification/badges?volunteer_id=${volunteerId}`)
      const earnedData = await earnedRes.json()
      setEarnedBadges(earnedData)

      // Buscar badges disponíveis
      const availableRes = await fetch(`/api/gamification/badges?church_id=${churchId}`)
      const availableData = await availableRes.json()
      
      // Filtrar badges não conquistados
      const earnedIds = new Set(earnedData.map((b: VolunteerBadge) => b.badge_id))
      const notEarned = availableData.filter((b: Badge) => !earnedIds.has(b.id))
      setAvailableBadges(notEarned)
    } catch (error) {
      console.error('Erro ao buscar badges:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          🏅 Coleção de Badges
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {earnedBadges.length} conquistados
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('earned')}
          className={`
            px-4 py-2 font-medium text-sm transition-colors
            ${activeTab === 'earned'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }
          `}
        >
          Conquistados ({earnedBadges.length})
        </button>
        <button
          onClick={() => setActiveTab('available')}
          className={`
            px-4 py-2 font-medium text-sm transition-colors
            ${activeTab === 'available'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }
          `}
        >
          Disponíveis ({availableBadges.length})
        </button>
      </div>

      {/* Badges Grid */}
      {activeTab === 'earned' && (
        <div>
          {earnedBadges.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {earnedBadges.map(vb => (
                vb.badge && (
                  <BadgeDisplay
                    key={vb.id}
                    badge={vb.badge}
                    earned={true}
                    size="md"
                  />
                )
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-gray-600 dark:text-gray-400">
                Nenhum badge conquistado ainda
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Participe de eventos para ganhar seus primeiros badges!
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'available' && (
        <div>
          {availableBadges.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {availableBadges.map(badge => (
                <BadgeDisplay
                  key={badge.id}
                  badge={badge}
                  earned={false}
                  size="md"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-gray-600 dark:text-gray-400">
                Você conquistou todos os badges!
              </p>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}


