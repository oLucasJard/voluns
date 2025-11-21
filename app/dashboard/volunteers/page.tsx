import { Suspense } from 'react'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { VolunteersList } from '@/components/dashboard/volunteers/VolunteersList'

export default function VolunteersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Voluntários
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Gerencie todos os voluntários da sua igreja e suas habilidades.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/dashboard/volunteers/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Adicionar Voluntário
            </a>
          </div>
        </div>

        <Suspense fallback={<div className="flex items-center justify-center h-64">Carregando voluntários...</div>}>
          <VolunteersList />
        </Suspense>
      </div>
    </DashboardLayout>
  )
}