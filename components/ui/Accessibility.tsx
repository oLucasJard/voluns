'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// Flag de debug - desabilitar em produção
const DEBUG_ACCESSIBILITY = false

interface FocusTrapProps {
  children: React.ReactNode
  isActive: boolean
  className?: string
}

export function FocusTrap({ children, isActive, className }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLElement | null>(null)
  const lastFocusableRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    if (focusableElements.length > 0) {
      firstFocusableRef.current = focusableElements[0]
      lastFocusableRef.current = focusableElements[focusableElements.length - 1]
      
      // Focar no primeiro elemento
      firstFocusableRef.current.focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusableRef.current) {
            e.preventDefault()
            lastFocusableRef.current?.focus()
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusableRef.current) {
            e.preventDefault()
            firstFocusableRef.current?.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isActive])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

interface SkipLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function SkipLink({ href, children, className }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4',
        'bg-primary-600 text-white px-4 py-2 rounded-md z-50',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
        className
      )}
    >
      {children}
    </a>
  )
}

interface ScreenReaderOnlyProps {
  children: React.ReactNode
  className?: string
}

export function ScreenReaderOnly({ children, className }: ScreenReaderOnlyProps) {
  return (
    <span className={cn('sr-only', className)}>
      {children}
    </span>
  )
}

interface AriaLiveRegionProps {
  message: string
  politeness?: 'polite' | 'assertive'
  className?: string
}

export function AriaLiveRegion({ message, politeness = 'polite', className }: AriaLiveRegionProps) {
  return (
    <div
      aria-live={politeness}
      aria-atomic="true"
      className={cn('sr-only', className)}
    >
      {message}
    </div>
  )
}

interface KeyboardNavigationProps {
  children: React.ReactNode
  onEnter?: () => void
  onEscape?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
  className?: string
}

export function KeyboardNavigation({
  children,
  onEnter,
  onEscape,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  className
}: KeyboardNavigationProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        onEnter?.()
        break
      case 'Escape':
        onEscape?.()
        break
      case 'ArrowUp':
        onArrowUp?.()
        break
      case 'ArrowDown':
        onArrowDown?.()
        break
      case 'ArrowLeft':
        onArrowLeft?.()
        break
      case 'ArrowRight':
        onArrowRight?.()
        break
    }
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={cn('focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2', className)}
    >
      {children}
    </div>
  )
}

interface HighContrastModeProps {
  children: React.ReactNode
  className?: string
}

export function HighContrastMode({ children, className }: HighContrastModeProps) {
  const [isHighContrast, setIsHighContrast] = useState(false)

  useEffect(() => {
    // Detectar preferência de alto contraste
    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setIsHighContrast(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div
      className={cn(
        isHighContrast && 'contrast-more',
        className
      )}
    >
      {children}
    </div>
  )
}

interface ReducedMotionProps {
  children: React.ReactNode
  className?: string
}

export function ReducedMotion({ children, className }: ReducedMotionProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Detectar preferência de movimento reduzido
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div
      className={cn(
        prefersReducedMotion && 'motion-reduce',
        className
      )}
    >
      {children}
    </div>
  )
}


