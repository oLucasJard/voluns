// Componente para proteger rotas baseado em permissões
'use client'

import { useAuth } from '@/components/providers/Providers'
import { usePermissions } from '@/lib/hooks/usePermissions'
import { LoadingSpinner } from '@/components/ui/LoadingStates'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: {
    resource: string
    action: string
  }
  requiredRole?: 'admin' | 'leader' | 'volunteer'
  fallback?: React.ReactNode
}

export function ProtectedRoute({ 
  children, 
  requiredPermission, 
  requiredRole,
  fallback 
}: ProtectedRouteProps) {
  const { profile, loading } = useAuth()
  const { userRole, checkPermission, canAccess } = usePermissions()
  const router = useRouter()

  useEffect(() => {
    if (!loading && profile) {
      // Verificar se o usuário tem o role necessário
      if (requiredRole && userRole !== requiredRole) {
        router.push('/dashboard')
        return
      }
      
      // Verificar se o usuário tem a permissão necessária
      if (requiredPermission && !checkPermission(requiredPermission.resource, requiredPermission.action)) {
        router.push('/dashboard')
        return
      }
    }
  }, [loading, profile, userRole, requiredPermission, requiredRole, checkPermission, router])

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

  // Verificar permissões
  if (requiredRole && userRole !== requiredRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Acesso Restrito
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Esta página é restrita para {requiredRole}s.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (requiredPermission && !checkPermission(requiredPermission.resource, requiredPermission.action)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Permissão Negada
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Você não tem permissão para acessar esta funcionalidade.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}


