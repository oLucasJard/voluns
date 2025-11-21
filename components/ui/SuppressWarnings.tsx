'use client'

import { useEffect } from 'react'

// Componente para suprimir warnings específicos do console
export function SuppressWarnings() {
  useEffect(() => {
    // Suprimir warnings específicos do console
    const originalError = console.error
    const originalWarn = console.warn
    
    console.error = (...args) => {
      const message = args[0]
      if (typeof message === 'string') {
        // Suprimir warnings específicos
        if (
          message.includes('Extra attributes from the server') ||
          message.includes('infinite recursion detected in policy for relation') ||
          message.includes('Download the React DevTools') ||
          message.includes('Maximum update depth exceeded') ||
          message.includes('is using incorrect casing') ||
          message.includes('is unrecognized in this browser')
        ) {
          return
        }
      }
      // Manter outros erros
      originalError.apply(console, args)
    }

    console.warn = (...args) => {
      const message = args[0]
      if (typeof message === 'string') {
        // Suprimir warnings específicos
        if (
          message.includes('Extra attributes from the server') ||
          message.includes('cz-shortcut-listen') ||
          message.includes('is using incorrect casing') ||
          message.includes('is unrecognized in this browser')
        ) {
          return
        }
      }
      // Manter outros warnings
      originalWarn.apply(console, args)
    }

    // Restaurar console quando o componente for desmontado
    return () => {
      console.error = originalError
      console.warn = originalWarn
    }
  }, [])

  return null
}
