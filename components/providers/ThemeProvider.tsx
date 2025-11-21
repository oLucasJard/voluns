'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  // Detectar tema do sistema
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Resolver tema baseado na configuração
  const resolveTheme = (currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      return getSystemTheme()
    }
    return currentTheme
  }

  // Aplicar tema ao DOM
  const applyTheme = (resolved: 'light' | 'dark') => {
    if (typeof window === 'undefined') return
    
    const root = document.documentElement
    
    if (resolved === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    // Aplicar meta theme-color para mobile
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', resolved === 'dark' ? '#111827' : '#ffffff')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'theme-color'
      meta.content = resolved === 'dark' ? '#111827' : '#ffffff'
      document.head.appendChild(meta)
    }
  }

  // Set theme e salvar preferência
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme-preference', newTheme) // Salvar PREFERÊNCIA, não tema resolvido
    const resolved = resolveTheme(newTheme)
    setResolvedTheme(resolved)
    applyTheme(resolved)
  }

  // Inicialização
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Carregar preferência salva
    const savedPreference = localStorage.getItem('theme-preference') as Theme
    const preference: Theme = savedPreference && ['light', 'dark', 'system'].includes(savedPreference) 
      ? savedPreference 
      : 'light'
    
    setThemeState(preference)
    const resolved = resolveTheme(preference)
    setResolvedTheme(resolved)
    
    // Aplicar tema (script inicial já pode ter aplicado)
    applyTheme(resolved)
  }, [])

  // Escutar mudanças no tema do sistema
  useEffect(() => {
    if (typeof window === 'undefined' || theme !== 'system') return
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      const newResolved = getSystemTheme()
      setResolvedTheme(newResolved)
      applyTheme(newResolved)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const value: ThemeContextType = {
    theme,
    setTheme,
    resolvedTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
