'use client'

import { usePathname } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

interface PageWrapperProps {
  children: React.ReactNode
  title?: string
  description?: string
  showBreadcrumbs?: boolean
  customBreadcrumbs?: Array<{ name: string; href?: string; current?: boolean }>
  actions?: React.ReactNode
}

export function PageWrapper({ 
  children, 
  title, 
  description, 
  showBreadcrumbs = true,
  customBreadcrumbs,
  actions
}: PageWrapperProps) {
  const pathname = usePathname()
  const breadcrumbs = customBreadcrumbs || []

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header com título e breadcrumbs */}
        {(title || showBreadcrumbs) && (
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              {showBreadcrumbs && breadcrumbs.length > 0 && (
                <div className="mb-4">
                  <Breadcrumbs />
                </div>
              )}
              
              {title && (
                <div>
                  <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                    {title}
                  </h2>
                  {description && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {description}
                    </p>
                  )}
                </div>
              )}
            </div>
            
            {actions && (
              <div className="mt-4 md:mt-0 md:ml-4">
                {actions}
              </div>
            )}
          </div>
        )}

        {/* Conteúdo da página */}
        {children}
      </div>
    </DashboardLayout>
  )
}

