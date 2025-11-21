'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-700',
        className
      )}
    />
  )
}

// Skeleton para cards
export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  )
}

// Skeleton para listas
export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Skeleton para tabelas
export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-4">
          {Array.from({ length: cols }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-20" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4">
            <div className="flex space-x-4">
              {Array.from({ length: cols }).map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-4 w-16" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Skeleton para formulários
export function FormSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="flex space-x-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    </div>
  )
}

// Skeleton para métricas/cards de estatísticas
export function MetricSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Skeleton className="h-12 w-12 rounded-lg" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium truncate">
                <Skeleton className="h-4 w-24" />
              </dt>
              <dd className="text-lg font-semibold">
                <Skeleton className="h-6 w-16 mt-1" />
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

// Skeleton para gráficos
export function ChartSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="mb-4">
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="h-64 flex items-end space-x-2">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton 
            key={index} 
            className="flex-1 h-16"
          />
        ))}
      </div>
    </div>
  )
}

// Skeleton para páginas completas
export function PageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      
      {/* Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ListSkeleton count={5} />
        </div>
        <div>
          <CardSkeleton />
        </div>
      </div>
    </div>
  )
}


