'use client'

/**
 * 📊 KPI Card Component
 * Card de KPI (Key Performance Indicator) com indicador de crescimento
 */

import { Card } from '@/components/ui/Card'
import { analyticsHelpers } from '@/lib/analytics/analytics-service'
import { motion } from 'framer-motion'

interface KPICardProps {
  title: string
  value: number | string
  icon?: string
  format?: 'number' | 'percentage' | 'currency'
  growth?: number
  loading?: boolean
  subtitle?: string
}

export default function KPICard({
  title,
  value,
  icon,
  format = 'number',
  growth,
  loading = false,
  subtitle,
}: KPICardProps) {
  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val

    switch (format) {
      case 'percentage':
        return analyticsHelpers.formatPercentage(val)
      case 'currency':
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      default:
        return analyticsHelpers.formatNumber(val)
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>

      <div className="flex items-baseline gap-3">
        <motion.h3
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          {formatValue(value)}
        </motion.h3>

        {growth !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-medium ${analyticsHelpers.getGrowthColor(growth)}`}>
            <span>{analyticsHelpers.getGrowthIcon(growth)}</span>
            <span>{analyticsHelpers.formatGrowth(growth)}</span>
          </div>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{subtitle}</p>
      )}
    </Card>
  )
}


