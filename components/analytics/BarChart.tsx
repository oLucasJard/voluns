'use client'

/**
 * 📊 Bar Chart Component
 * Gráfico de barras para comparações
 */

import { Card } from '@/components/ui/Card'
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { ChartDataPoint } from '@/lib/analytics/analytics-service'

interface BarChartProps {
  title: string
  data: ChartDataPoint[]
  dataKey?: string
  loading?: boolean
  height?: number
  color?: string
  horizontal?: boolean
}

export default function BarChart({
  title,
  data,
  dataKey = 'value',
  loading = false,
  height = 300,
  color = '#8B5CF6',
  horizontal = false,
}: BarChartProps) {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{title}</h3>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={height}>
          <RechartsBarChart 
            data={data} 
            layout={horizontal ? 'vertical' : 'horizontal'}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            {horizontal ? (
              <>
                <XAxis type="number" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis dataKey="label" type="category" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              </>
            ) : (
              <>
                <XAxis dataKey="label" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              </>
            )}
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px',
                color: '#F9FAFB',
              }}
            />
            <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center" style={{ height }}>
          <p className="text-gray-600 dark:text-gray-400">Sem dados disponíveis</p>
        </div>
      )}
    </Card>
  )
}


