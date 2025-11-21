// Dashboard específico para administradores
'use client'

import { Suspense } from 'react'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardLayout>
        <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-full">
          <Suspense fallback={<div className="flex items-center justify-center h-64">Carregando...</div>}>
            <DashboardOverview />
          </Suspense>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}


