import { Suspense } from 'react'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { ReportsOverview } from '@/components/reports/ReportsOverview'

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Relatórios e Analytics
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Acompanhe o desempenho dos seus ministérios e voluntários com dados detalhados.
            </p>
          </div>
        </div>

        <Suspense fallback={<div className="flex items-center justify-center h-64">Carregando relatórios...</div>}>
          <ReportsOverview />
        </Suspense>
      </div>
    </DashboardLayout>
  )
}