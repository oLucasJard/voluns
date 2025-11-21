'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/Providers'
import { usePermissions } from '@/lib/hooks/usePermissions'
import { LoadingSpinner } from '@/components/ui/LoadingStates'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'

export default function DashboardPage() {
  const { profile, loading } = useAuth()
  const { userRole } = usePermissions()
  const router = useRouter()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Carregando dashboard...
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

  // Mostrar dashboard principal
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  )
}

