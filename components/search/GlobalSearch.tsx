'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CommandLineIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

const QUICK_LINKS = [
  { title: 'Visão Geral', description: 'Resumo executivo do seu ministério', href: '/dashboard', tags: ['dashboard', 'home'] },
  { title: 'Eventos', description: 'Planeje e acompanhe eventos', href: '/dashboard/events', tags: ['eventos', 'agenda'] },
  { title: 'Voluntários', description: 'Gerencie a base de voluntários', href: '/dashboard/volunteers', tags: ['voluntarios', 'pessoas'] },
  { title: 'Escalas', description: 'Controle confirmações e atribuições', href: '/dashboard/assignments', tags: ['escalas'] },
  { title: 'Notificações', description: 'Central de comunicados e alertas', href: '/dashboard/notifications', tags: ['alertas'] },
  { title: 'Relatórios', description: 'Indicadores e exportações avançadas', href: '/dashboard/reports', tags: ['relatorios', 'kpi'] },
]

export function GlobalSearch() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  const filteredLinks = useMemo(() => {
    if (!query.trim()) {
      return QUICK_LINKS
    }

    const lowerQuery = query.toLowerCase()
    return QUICK_LINKS.filter((link) => {
      return (
        link.title.toLowerCase().includes(lowerQuery) ||
        link.description.toLowerCase().includes(lowerQuery) ||
        link.tags.some((tag) => tag.includes(lowerQuery))
      )
    })
  }, [query])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setQuery('')
  }, [pathname])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-3 py-2 text-sm text-gray-500 shadow-sm transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-300"
      >
        <MagnifyingGlassIcon className="h-4 w-4" />
        <span className="hidden md:inline">Buscar</span>
        <kbd className="rounded border border-gray-200 px-1.5 text-[10px] font-semibold text-gray-400 dark:border-gray-600 dark:text-gray-500">
          ⌘K
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3 dark:border-gray-800">
              <CommandLineIcon className="h-5 w-5 text-primary-500" />
              <input
                autoFocus
                placeholder="Busque por páginas, relatórios ou ações..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-white dark:placeholder:text-gray-500"
              />
            </div>

            <div className="max-h-80 overflow-y-auto py-2">
              {filteredLinks.length === 0 && (
                <p className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                  Nenhum resultado encontrado para “{query}”.
                </p>
              )}
              {filteredLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 transition hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{link.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{link.description}</p>
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <p>Use ⌘K / Ctrl+K para abrir rapidamente</p>
              <button onClick={() => setIsOpen(false)} className="underline-offset-2 hover:underline">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

