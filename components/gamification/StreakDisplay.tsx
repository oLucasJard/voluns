'use client'

/**
 * 🔥 Streak Display Component
 * Exibição de sequência de participação
 */

import { useEffect, useState } from 'react'
import { VolunteerStreak } from '@/types/gamification'
import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'

interface StreakDisplayProps {
  volunteerId: string
  churchId: string
}

export default function StreakDisplay({ volunteerId, churchId }: StreakDisplayProps) {
  const [streak, setStreak] = useState<VolunteerStreak | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStreak()
  }, [volunteerId, churchId])

  const fetchStreak = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/gamification/stats?volunteer_id=${volunteerId}&church_id=${churchId}`)
      const data = await res.json()
      setStreak(data.streak)
    } catch (error) {
      console.error('Erro ao buscar streak:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </Card>
    )
  }

  const currentStreak = streak?.current_streak || 0
  const bestStreak = streak?.best_streak || 0

  return (
    <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            🔥 Sequência Atual
          </h3>
          <div className="flex items-baseline gap-2">
            <motion.span
              key={currentStreak}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold text-orange-600 dark:text-orange-400"
            >
              {currentStreak}
            </motion.span>
            <span className="text-lg text-gray-600 dark:text-gray-400">
              {currentStreak === 1 ? 'semana' : 'semanas'}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Continue participando para manter a sequência!
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            Recorde
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {bestStreak}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {bestStreak === 1 ? 'semana' : 'semanas'}
          </p>
        </div>
      </div>

      {/* Flames visualization */}
      <div className="flex justify-center gap-1 mt-4">
        {[...Array(Math.min(currentStreak, 7))].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-2xl"
          >
            🔥
          </motion.span>
        ))}
      </div>
    </Card>
  )
}


