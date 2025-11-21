import { Suspense } from 'react'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { SmartEventCreator } from '@/components/dashboard/events/SmartEventCreator'
import Link from 'next/link'
import { ArrowLeftIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function NewEventPage() {
  console.log('📄 NewEventPage - Componente renderizado')
  
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Melhorado */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Link 
                href="/dashboard/events"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Voltar para Eventos
              </Link>
            </div>
            
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-primary-500 to-blue-600 rounded-xl shadow-lg">
                  <SparklesIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                    Criar Novo Evento
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                    Metodologia Inteligente
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto lg:mx-0">
                Use nossa metodologia revolucionária para criar eventos rapidamente com posições predefinidas e voluntários disponíveis. 
                Processo simplificado em apenas 3 etapas.
              </p>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <Suspense fallback={
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Carregando criador inteligente...</p>
              </div>
            </div>
          }>
            <SmartEventCreator />
          </Suspense>
        </div>
      </div>
    </DashboardLayout>
  )
}