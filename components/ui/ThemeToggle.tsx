'use client'

import { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { 
  SunIcon, 
  MoonIcon, 
  ComputerDesktopIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  // Debug: verificar estado do tema (desabilitado por padrão)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && false) {
      console.log('ThemeToggle - Current theme:', theme, 'Resolved:', resolvedTheme)
    }
  }, [theme, resolvedTheme])

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const themes = [
    {
      key: 'light' as const,
      label: 'Claro',
      icon: SunIcon,
      description: 'Tema claro'
    },
    {
      key: 'dark' as const,
      label: 'Escuro',
      icon: MoonIcon,
      description: 'Tema escuro'
    },
    {
      key: 'system' as const,
      label: 'Sistema',
      icon: ComputerDesktopIcon,
      description: 'Seguir preferência do sistema'
    }
  ]

  const currentTheme = themes.find(t => t.key === theme) || themes[0]
  const CurrentIcon = currentTheme.icon

  return (
    <div className="relative">
      {/* Botão principal */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-lg transition-colors duration-200"
        title={`Tema atual: ${currentTheme.label}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <CurrentIcon className="h-5 w-5" />
        <span className="hidden sm:block text-sm font-medium">
          {currentTheme.label}
        </span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-[9999]"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-2">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              const isSelected = theme === themeOption.key
              
              return (
                <button
                  key={themeOption.key}
                  onClick={() => {
                    setTheme(themeOption.key)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center px-4 py-3 text-sm transition-colors duration-200 ${
                    isSelected
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  role="menuitem"
                >
                  <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                  <div className="flex flex-col items-start flex-1">
                    <span className="font-medium">{themeOption.label}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {themeOption.description}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="ml-2 w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                  )}
                </button>
              )
            })}
          </div>
          
          {/* Separator */}
          <div className="border-t border-gray-200 dark:border-gray-700" />
          
          {/* Preview */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-b-xl">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`} />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Tema ativo: {resolvedTheme === 'dark' ? 'Escuro' : 'Claro'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

