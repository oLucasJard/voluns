import { Suspense } from 'react'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { AssignmentsOverview } from '@/components/dashboard/assignments/AssignmentsOverview'

export default function AssignmentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Atribuições
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Gerencie todas as atribuições de voluntários aos eventos.
            </p>
          </div>
        </div>

        <Suspense fallback={<div className="flex items-center justify-center h-64">Carregando atribuições...</div>}>
          <AssignmentsOverview />
        </Suspense>
      </div>
    </DashboardLayout>
  )
}