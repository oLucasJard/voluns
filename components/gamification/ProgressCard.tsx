'use client'

/**
 * 📊 Progress Card Component
 * Card de progresso com nível, pontos e XP bar
 */

import { useEffect, useState } from 'react'
import { VolunteerPoints } from '@/types/gamification'
import { Card } from '@/components/ui/Card'
import { gamificationHelpers } from '@/lib/gamification/gamification-service'
import { motion } from 'framer-motion'

interface ProgressCardProps {
  volunteerId: string
  churchId: string
}

export default function ProgressCard({ volunteerId, churchId }: ProgressCardProps) {
  const [points, setPoints] = useState<VolunteerPoints | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPoints()
  }, [volunteerId, churchId])

  const fetchPoints = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/gamification/points?volunteer_id=${volunteerId}&church_id=${churchId}`)
      const data = await res.json()
      setPoints(data)
    } catch (error) {
      console.error('Erro ao buscar pontos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        </div>
      </Card>
    )
  }

  if (!points) {
    return null
  }

  const nextLevelPoints = points.level * 100
  const currentLevelPoints = (points.level - 1) * 100
  const pointsInLevel = points.total_points - currentLevelPoints
  const progressPercentage = (pointsInLevel / 100) * 100

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Seu Progresso
          </h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              Nível {points.level}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({gamificationHelpers.formatPoints(points.total_points)} pts)
            </span>
          </div>
        </div>
        <div className="text-5xl">🎮</div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Progresso para Nível {points.level + 1}
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            {pointsInLevel} / 100 XP
          </span>
        </div>
        <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500 text-right">
          {Math.round(progressPercentage)}% completo
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Total Ganho</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {gamificationHelpers.formatPoints(points.lifetime_points)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Disponível</p>
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {gamificationHelpers.formatPoints(points.total_points)}
          </p>
        </div>
      </div>
    </Card>
  )
}


