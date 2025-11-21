/**
 * Helpers de Acessibilidade (WCAG 2.1 AA)
 */

// Verificar contraste de cores (WCAG AA: mínimo 4.5:1 para texto normal, 3:1 para texto grande)
export function getContrastRatio(foreground: string, background: string): number {
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }
  
  const l1 = getLuminance(foreground)
  const l2 = getLuminance(background)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  
  return (lighter + 0.05) / (darker + 0.05)
}

export function meetsWCAGAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background)
  return isLargeText ? ratio >= 3 : ratio >= 4.5
}

// Atributos ARIA para componentes
export const ariaAttributes = {
  // Loading states
  loading: (isLoading: boolean) => ({
    'aria-busy': isLoading,
    'aria-live': 'polite' as const,
  }),
  
  // Errors
  error: (errorId?: string) => ({
    'aria-invalid': true,
    'aria-describedby': errorId,
  }),
  
  // Modals
  modal: (isOpen: boolean, labelId: string) => ({
    role: 'dialog' as const,
    'aria-modal': true,
    'aria-labelledby': labelId,
    'aria-hidden': !isOpen,
  }),
  
  // Buttons
  button: (isPressed?: boolean, isExpanded?: boolean) => ({
    role: 'button' as const,
    'aria-pressed': isPressed,
    'aria-expanded': isExpanded,
  }),
  
  // Tabs
  tab: (isSelected: boolean, controls: string) => ({
    role: 'tab' as const,
    'aria-selected': isSelected,
    'aria-controls': controls,
  }),
  
  // Notifications
  notification: (type: 'assertive' | 'polite' = 'polite') => ({
    role: 'status' as const,
    'aria-live': type,
    'aria-atomic': true,
  }),
}

// Skip links para navegação
export function SkipLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg"
    >
      {children}
    </a>
  )
}

// Focus trap para modals
export function useFocusTrap(isActive: boolean) {
  const ref = React.useRef<HTMLDivElement>(null)
  
  React.useEffect(() => {
    if (!isActive || !ref.current) return
    
    const focusableElements = ref.current.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
    
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }
    
    document.addEventListener('keydown', handleTab)
    firstElement?.focus()
    
    return () => document.removeEventListener('keydown', handleTab)
  }, [isActive])
  
  return ref
}

// Announcer para mudanças dinâmicas
export function useAnnouncer() {
  const [announcement, setAnnouncement] = React.useState('')
  
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement(message)
    // Limpar após leitura
    setTimeout(() => setAnnouncement(''), 1000)
  }
  
  const Announcer = () => (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  )
  
  return { announce, Announcer }
}

// Keyboard navigation helpers
export const keyboardHandlers = {
  // Escape to close
  escape: (callback: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') callback()
  },
  
  // Enter/Space to activate
  activate: (callback: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      callback()
    }
  },
  
  // Arrow navigation
  arrows: (callbacks: {
    up?: () => void
    down?: () => void
    left?: () => void
    right?: () => void
  }) => (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        callbacks.up?.()
        break
      case 'ArrowDown':
        e.preventDefault()
        callbacks.down?.()
        break
      case 'ArrowLeft':
        e.preventDefault()
        callbacks.left?.()
        break
      case 'ArrowRight':
        e.preventDefault()
        callbacks.right?.()
        break
    }
  },
}

// Screen reader only styles
export const srOnly = {
  position: 'absolute' as const,
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden' as const,
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap' as const,
  border: 0,
}

// Import React no topo do arquivo
import React from 'react'

