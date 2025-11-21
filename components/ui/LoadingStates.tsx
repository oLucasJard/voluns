'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  const [dots, setDots] = useState('')

  // Animação dos pontos
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return ''
        return prev + '.'
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-2', className)}>
      <div className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-primary-600',
        sizeClasses[size]
      )} />
      {text && (
        <p className={cn(
          'text-gray-600 dark:text-gray-400 font-medium',
          textSizeClasses[size]
        )}>
          {text}{dots}
        </p>
      )}
    </div>
  )
}

interface LoadingCardProps {
  className?: string
  lines?: number
}

export function LoadingCard({ className, lines = 3 }: LoadingCardProps) {
  // Log para debug
  if (process.env.NODE_ENV === 'development') {
    console.log('📄 LoadingCard - Lines:', lines)
  }

  return (
    <div className={cn(
      'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 animate-pulse',
      className
    )}>
      <div className="space-y-4">
        {/* Título */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        
        {/* Linhas de conteúdo */}
        {Array.from({ length: lines }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        ))}
        
        {/* Botão */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 mt-6"></div>
      </div>
    </div>
  )
}

interface LoadingButtonProps {
  isLoading: boolean
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export function LoadingButton({ 
  isLoading, 
  children, 
  className, 
  disabled, 
  onClick 
}: LoadingButtonProps) {
  // Log para debug
  if (process.env.NODE_ENV === 'development') {
    console.log('🔘 LoadingButton - Loading:', isLoading, 'Disabled:', disabled)
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-all duration-200',
        'bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        isLoading && 'cursor-wait',
        className
      )}
    >
      {isLoading && (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
      )}
      {children}
    </button>
  )
}

interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
  text?: string
}

export function LoadingOverlay({ isLoading, children, text = 'Carregando...' }: LoadingOverlayProps) {
  // Log para debug
  if (process.env.NODE_ENV === 'development') {
    console.log('🔄 LoadingOverlay - Loading:', isLoading, 'Text:', text)
  }

  if (!isLoading) {
    return <>{children}</>
  }

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        <LoadingSpinner size="lg" text={text} />
      </div>
    </div>
  )
}






