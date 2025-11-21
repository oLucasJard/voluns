'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  name: string
  href: string
  current?: boolean
}

export function Breadcrumbs() {
  const pathname = usePathname()

  // Gerar breadcrumbs baseado no pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Dashboard', href: '/dashboard' }
    ]

    // Mapear segmentos para nomes amigáveis
    const segmentNames: Record<string, string> = {
      'events': 'Eventos',
      'volunteers': 'Voluntários',
      'ministries': 'Ministérios',
      'assignments': 'Atribuições',
      'notifications': 'Notificações',
      'reports': 'Relatórios',
      'settings': 'Configurações',
      'billing': 'Assinatura',
      'new': 'Novo',
      'edit': 'Editar',
      'view': 'Visualizar'
    }

    let currentPath = '/dashboard'
    
    segments.forEach((segment, index) => {
      if (segment !== 'dashboard') {
        currentPath += `/${segment}`
        const isLast = index === segments.length - 1
        
        breadcrumbs.push({
          name: segmentNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
          href: currentPath,
          current: isLast
        })
      }
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  // Não mostrar breadcrumbs na página inicial do dashboard
  if (pathname === '/dashboard') {
    return null
  }

  return (
    <nav className="flex items-center space-x-1 text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-1" />
            )}
            
            {item.current ? (
              <span className="text-gray-900 dark:text-white font-medium">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200',
                  index === 0 && 'flex items-center'
                )}
              >
                {index === 0 && <HomeIcon className="h-4 w-4 mr-1" />}
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}