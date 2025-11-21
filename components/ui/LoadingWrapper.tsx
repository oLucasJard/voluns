'use client'

import { ReactNode, useState, useEffect } from 'react'
import { 
  Skeleton, 
  CardSkeleton, 
  ListSkeleton, 
  TableSkeleton, 
  FormSkeleton, 
  MetricSkeleton,
  ChartSkeleton,
  PageSkeleton
} from './Skeleton'

interface LoadingWrapperProps {
  children: ReactNode
  isLoading: boolean
  skeleton?: 'card' | 'list' | 'table' | 'form' | 'metric' | 'chart' | 'page' | 'custom'
  customSkeleton?: ReactNode
  count?: number
  rows?: number
  cols?: number
  className?: string
}

export function LoadingWrapper({ 
  children, 
  isLoading, 
  skeleton = 'list',
  customSkeleton,
  count = 3,
  rows = 5,
  cols = 4,
  className = ''
}: LoadingWrapperProps) {
  if (!isLoading) {
    return <>{children}</>
  }

  const renderSkeleton = () => {
    if (customSkeleton) {
      return customSkeleton
    }

    switch (skeleton) {
      case 'card':
        return <CardSkeleton />
      case 'list':
        return <ListSkeleton count={count} />
      case 'table':
        return <TableSkeleton rows={rows} cols={cols} />
      case 'form':
        return <FormSkeleton />
      case 'metric':
        return <MetricSkeleton />
      case 'chart':
        return <ChartSkeleton />
      case 'page':
        return <PageSkeleton />
      default:
        return <Skeleton className="h-32 w-full" />
    }
  }

  return (
    <div className={className}>
      {renderSkeleton()}
    </div>
  )
}

// Hook para simular loading
export function useLoading(delay: number = 1000) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return isLoading
}
