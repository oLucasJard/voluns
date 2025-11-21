'use client'

/**
 * 🏅 Badge Display Component
 * Exibição de badges individuais com animação
 */

import { Badge } from '@/types/gamification'
import { gamificationHelpers } from '@/lib/gamification/gamification-service'
import { motion } from 'framer-motion'

interface BadgeDisplayProps {
  badge: Badge
  earned?: boolean
  size?: 'sm' | 'md' | 'lg'
  showDetails?: boolean
}

export default function BadgeDisplay({
  badge,
  earned = false,
  size = 'md',
  showDetails = true,
}: BadgeDisplayProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-16 h-16 text-3xl',
    lg: 'w-24 h-24 text-5xl',
  }

  const rarityColor = gamificationHelpers.getRarityColor(badge.rarity)
  const rarityEmoji = gamificationHelpers.getRarityEmoji(badge.rarity)

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative ${earned ? '' : 'opacity-40 grayscale'}`}
    >
      <div className="text-center">
        {/* Badge Icon */}
        <div
          className={`
            ${sizeClasses[size]}
            mx-auto rounded-full
            flex items-center justify-center
            shadow-lg
            transition-all
          `}
          style={{
            backgroundColor: earned ? rarityColor : '#4B5563',
            border: `3px solid ${earned ? rarityColor : '#6B7280'}`,
          }}
        >
          <span className="drop-shadow-md">{badge.icon || '🏆'}</span>
        </div>

        {/* Rarity Indicator */}
        {earned && (
          <div className="absolute -top-1 -right-1 text-sm">
            {rarityEmoji}
          </div>
        )}

        {/* Badge Details */}
        {showDetails && (
          <div className="mt-2">
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
              {badge.name}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {badge.description}
            </p>
            {badge.points_reward > 0 && (
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">
                +{badge.points_reward} pontos
              </p>
            )}
          </div>
        )}

        {/* Locked Overlay */}
        {!earned && showDetails && (
          <div className="mt-2">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              🔒 Bloqueado
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}


