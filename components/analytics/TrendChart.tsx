'use client'

/**
 * 📈 Trend Chart Component
 * Gráfico de linha para tendências
 */

import { Card } from '@/components/ui/Card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { ChartDataPoint } from '@/lib/analytics/analytics-service'

interface TrendChartProps {
  title: string
  data: ChartDataPoint[]
  dataKey?: string
  loading?: boolean
  height?: number
  color?: string
  showLegend?: boolean
}

export default function TrendChart({
  title,
  data,
  dataKey = 'value',
  loading = false,
  height = 300,
  color = '#3B82F6',
  showLegend = false,
}: TrendChartProps) {
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
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey="label" 
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '8px',
                color: '#F9FAFB',
              }}
            />
            {showLegend && <Legend />}
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={2}
              dot={{ fill: color, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center" style={{ height }}>
          <p className="text-gray-600 dark:text-gray-400">Sem dados disponíveis</p>
        </div>
      )}
    </Card>
  )
}


