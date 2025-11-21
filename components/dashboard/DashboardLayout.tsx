'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/providers/Providers'
import { usePermissions } from '@/lib/hooks/usePermissions'
import { NotificationBadge } from '@/components/notifications/NotificationBadge'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { GlobalSearch } from '@/components/search/GlobalSearch'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SkipLink } from '@/components/ui/Accessibility'
import { MicroInteraction } from '@/components/ui/MicroInteractions'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  BellIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

// Navegação baseada em permissões será gerada dinamicamente

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { profile, signOut } = useAuth()
  const { userRole, getNavigation, getRoleInfo } = usePermissions()

  // Obter navegação baseada nas permissões do usuário
  const navigation = getNavigation()
  const roleInfo = getRoleInfo()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
      <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <SkipLink href="#main-content">Pular para o conteúdo principal</SkipLink>
      {/* Mobile sidebar */}
      <div className={cn(
        'fixed inset-0 flex z-40 md:hidden',
        sidebarOpen ? 'block' : 'hidden'
      )}>
          <div className="fixed inset-0 bg-gray-600 dark:bg-gray-800 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Fechar sidebar</span>
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                   <div className="flex-shrink-0 flex items-center px-4">
                     <MicroInteraction type="hover" intensity="subtle">
                       <Link href="/dashboard" className="flex items-center space-x-2">
                         <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                           <span className="text-white font-bold text-lg">E</span>
                         </div>
                         <div>
                           <span className="text-xl font-bold text-gray-900 dark:text-white">Voluns</span>
                           <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                             {roleInfo.role}
                           </div>
                         </div>
                       </Link>
                     </MicroInteraction>
                   </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-200',
                      isActive
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{profile?.name || 'Usuário'}</p>
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-0 h-auto"
                >
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar - Simplificada */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                     <div className="flex items-center flex-shrink-0 px-4">
                       <MicroInteraction type="hover" intensity="subtle">
                         <Link href="/dashboard" className="flex items-center space-x-2">
                           <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                             <span className="text-white font-bold text-lg">E</span>
                           </div>
                           <div>
                             <span className="text-xl font-bold text-gray-900 dark:text-white">Voluns</span>
                             <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                               {roleInfo.role}
                             </div>
                           </div>
                         </Link>
                       </MicroInteraction>
                     </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200',
                        isActive
                          ? 'bg-primary-100 text-primary-900 dark:bg-primary-900/20 dark:text-primary-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{profile?.name || 'Usuário'}</p>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-0 h-auto"
                  >
                    Sair
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content - Simplificado */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* Mobile header */}
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="h-10 w-10 inline-flex items-center justify-center rounded-lg bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Abrir sidebar</span>
              <Bars3Icon className="h-5 w-5" />
            </button>
            
                   {/* Título da página para mobile */}
                   <div className="text-lg font-semibold text-gray-900 dark:text-white">
                     {roleInfo.role === 'admin' ? 'Dashboard' : 
                      roleInfo.role === 'leader' ? 'Líder' : 'Voluntário'}
                   </div>
            
            {/* Busca e Notificações para Mobile */}
            <div className="flex items-center space-x-2">
              <GlobalSearch />
              <NotificationBadge />
            </div>
          </div>
        </div>
        
        {/* Desktop header */}
        <div className="hidden md:flex md:items-center md:justify-between md:px-6 md:py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <Breadcrumbs />
          </div>
          
          <div className="flex items-center space-x-4">
            <GlobalSearch />
            <ThemeToggle />
            <NotificationBadge />
          </div>
        </div>
        
        {/* Main content area */}
        <main id="main-content" className="flex-1 relative overflow-y-auto focus:outline-none" tabIndex={-1}>
          <div className="min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
