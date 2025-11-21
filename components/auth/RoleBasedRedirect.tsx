// Componente para redirecionar usuários baseado no seu role
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/Providers'
import { usePermissions } from '@/lib/hooks/usePermissions'
import { LoadingSpinner } from '@/components/ui/LoadingStates'

interface RoleBasedRedirectProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function RoleBasedRedirect({ children, fallback }: RoleBasedRedirectProps) {
  const { profile, loading } = useAuth()
  const { userRole, getNavigation } = usePermissions()
  const router = useRouter()

  useEffect(() => {
    if (!loading && profile) {
      // Se o usuário está na página inicial do dashboard, redirecionar para a primeira página disponível
      if (window.location.pathname === '/dashboard') {
        const navigation = getNavigation()
        if (navigation.length > 0) {
          const firstAvailableRoute = navigation[0].href
          router.push(firstAvailableRoute)
        }
      }
    }
  }, [loading, profile, userRole, getNavigation, router])

  if (loading) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Verificando permissões...
          </p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Acesso Negado
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Você precisa estar logado para acessar esta página.
          </p>
          <button
            onClick={() => router.push('/auth/login')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Fazer Login
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}


