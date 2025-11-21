import { Suspense } from 'react'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { DetailedReports } from '@/components/reports/DetailedReports'

export default function DetailedReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <div>
                    <a href="/dashboard/reports" className="text-gray-400 hover:text-gray-500">
                      <svg className="flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      <span className="sr-only">Relatórios</span>
                    </a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <a href="/dashboard/reports" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                      Relatórios
                    </a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-4 text-sm font-medium text-gray-500" aria-current="page">
                      Relatórios Detalhados
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h2 className="mt-2 text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
              Relatórios Detalhados
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Análise aprofundada de performance, tendências e insights para tomada de decisão.
            </p>
          </div>
        </div>

        <Suspense fallback={<div className="flex items-center justify-center h-64">Carregando relatórios detalhados...</div>}>
          <DetailedReports />
        </Suspense>
      </div>
    </DashboardLayout>
  )
}







