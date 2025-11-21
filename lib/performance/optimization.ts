/**
 * Otimizações de Performance
 * ISR, Cache, Lazy Loading, etc.
 */

import { unstable_cache } from 'next/cache'

// Configuração de revalidação ISR
export const REVALIDATE_TIMES = {
  STATIC: false as const, // Nunca revalida (páginas 100% estáticas)
  SHORT: 60, // 1 minuto
  MEDIUM: 300, // 5 minutos
  LONG: 3600, // 1 hora
  DAILY: 86400, // 24 horas
} as const

// Cache tags para invalidação granular
export const CACHE_TAGS = {
  USERS: 'users',
  CHURCHES: 'churches',
  MINISTRIES: 'ministries',
  EVENTS: 'events',
  VOLUNTEERS: 'volunteers',
  ASSIGNMENTS: 'assignments',
  NOTIFICATIONS: 'notifications',
} as const

// Helper para criar função com cache
export function createCachedFunction<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: {
    tags?: string[]
    revalidate?: number | false
  }
): T {
  return unstable_cache(fn, undefined, {
    tags: options.tags,
    revalidate: options.revalidate,
  }) as T
}

// Debounce para otimizar eventos frequentes
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle para limitar execuções
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Lazy loading de componentes
export function lazyLoadComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options?: {
    ssr?: boolean
    loading?: React.ComponentType
  }
) {
  const React = require('react')
  const dynamic = require('next/dynamic')
  
  return dynamic(importFn, {
    ssr: options?.ssr !== false,
    loading: options?.loading || (() => <div>Carregando...</div>),
  })
}

// Preload de dados críticos
export async function preloadCriticalData(userId: string) {
  // Implementar preload de dados que o usuário certamente vai precisar
  const criticalQueries = [
    // fetch user profile
    // fetch active events
    // fetch notifications
  ]
  
  return Promise.all(criticalQueries)
}

// Otimização de imagens
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 600 },
  large: { width: 1200, height: 1200 },
  hero: { width: 1920, height: 1080 },
} as const

// Bundle analyzer helpers
export function analyzeBundle() {
  if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: true,
    })
    return withBundleAnalyzer
  }
  return (config: any) => config
}

// Metrics para monitoramento
export function trackPerformanceMetric(metric: {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
}) {
  // Enviar para analytics/monitoring
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: metric.value,
      metric_rating: metric.rating,
    })
  }
}

// Web Vitals tracking
export function reportWebVitals(metric: any) {
  // Core Web Vitals
  const { name, value, rating } = metric
  
  trackPerformanceMetric({ name, value, rating })
  
  // Log em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${name}:`, {
      value,
      rating,
      id: metric.id,
    })
  }
}

