'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

// Flag de debug - desabilitar em produção
const DEBUG_INTERACTIONS = false

interface MicroInteractionProps {
  children: React.ReactNode
  className?: string
  type?: 'hover' | 'focus' | 'click' | 'all'
  intensity?: 'subtle' | 'medium' | 'strong'
}

export function MicroInteraction({ 
  children, 
  className, 
  type = 'all', 
  intensity = 'medium' 
}: MicroInteractionProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const intensityClasses = {
    subtle: {
      hover: 'hover:scale-[1.02] hover:shadow-sm',
      focus: 'focus:scale-[1.01] focus:shadow-sm',
      click: 'active:scale-[0.98]'
    },
    medium: {
      hover: 'hover:scale-[1.05] hover:shadow-md',
      focus: 'focus:scale-[1.03] focus:shadow-md',
      click: 'active:scale-[0.95]'
    },
    strong: {
      hover: 'hover:scale-[1.08] hover:shadow-lg',
      focus: 'focus:scale-[1.05] focus:shadow-lg',
      click: 'active:scale-[0.92]'
    }
  }

  const getInteractionClasses = () => {
    const classes = []
    
    if (type === 'all' || type === 'hover') {
      classes.push(intensityClasses[intensity].hover)
    }
    if (type === 'all' || type === 'focus') {
      classes.push(intensityClasses[intensity].focus)
    }
    if (type === 'all' || type === 'click') {
      classes.push(intensityClasses[intensity].click)
    }
    
    return classes.join(' ')
  }

  return (
    <div
      className={cn(
        'transition-all duration-200 ease-in-out cursor-pointer',
        getInteractionClasses(),
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
    >
      {children}
    </div>
  )
}

interface RippleEffectProps {
  children: React.ReactNode
  className?: string
  color?: 'primary' | 'secondary' | 'accent'
}

export function RippleEffect({ children, className, color = 'primary' }: RippleEffectProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    }
    
    setRipples(prev => [...prev, newRipple])
    
    // Remover ripple após animação
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)
  }

  const colorClasses = {
    primary: 'bg-primary-500/30',
    secondary: 'bg-gray-500/30',
    accent: 'bg-accent-purple/30'
  }

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onClick={handleClick}
    >
      {children}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className={cn(
            'absolute rounded-full animate-ping pointer-events-none',
            colorClasses[color]
          )}
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20
          }}
        />
      ))}
    </div>
  )
}

interface FloatingActionProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

export function FloatingAction({ 
  children, 
  className, 
  direction = 'up', 
  distance = 4 
}: FloatingActionProps) {
  const getTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(-${distance}px)`
      case 'down':
        return `translateY(${distance}px)`
      case 'left':
        return `translateX(-${distance}px)`
      case 'right':
        return `translateX(${distance}px)`
      default:
        return `translateY(-${distance}px)`
    }
  }

  return (
    <div
      className={cn(
        'transition-transform duration-300 ease-in-out hover:transform',
        className
      )}
      style={{
        transform: getTransform()
      }}
    >
      {children}
    </div>
  )
}

interface PulseGlowProps {
  children: React.ReactNode
  className?: string
  color?: 'primary' | 'success' | 'warning' | 'error'
  intensity?: 'low' | 'medium' | 'high'
}

export function PulseGlow({ 
  children, 
  className, 
  color = 'primary', 
  intensity = 'medium' 
}: PulseGlowProps) {
  const colorClasses = {
    primary: 'shadow-primary-500/50',
    success: 'shadow-green-500/50',
    warning: 'shadow-yellow-500/50',
    error: 'shadow-red-500/50'
  }

  const intensityClasses = {
    low: 'shadow-lg',
    medium: 'shadow-xl',
    high: 'shadow-2xl'
  }

  return (
    <div
      className={cn(
        'animate-pulse',
        colorClasses[color],
        intensityClasses[intensity],
        className
      )}
    >
      {children}
    </div>
  )
}


