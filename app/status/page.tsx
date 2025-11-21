'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function StatusPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 60000) // Atualizar a cada minuto

    return () => clearInterval(interval)
  }, [])

  const systems = [
    {
      name: 'Plataforma Web',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '45ms'
    },
    {
      name: 'API',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '120ms'
    },
    {
      name: 'Sistema de Notificações',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '200ms'
    },
    {
      name: 'Banco de Dados',
      status: 'operational',
      uptime: '100%',
      responseTime: '15ms'
    },
    {
      name: 'Emails',
      status: 'operational',
      uptime: '99.97%',
      responseTime: '500ms'
    },
    {
      name: 'Webhooks',
      status: 'operational',
      uptime: '99.92%',
      responseTime: '300ms'
    }
  ]

  const incidents = [
    {
      date: '15 Jan 2026',
      title: 'Lentidão no carregamento de relatórios',
      status: 'resolved',
      duration: '15 minutos',
      severity: 'minor'
    },
    {
      date: '10 Jan 2026',
      title: 'Atualização de segurança programada',
      status: 'resolved',
      duration: '5 minutos',
      severity: 'maintenance'
    },
    {
      date: '03 Jan 2026',
      title: 'Intermitência no envio de notificações',
      status: 'resolved',
      duration: '30 minutos',
      severity: 'major'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
      case 'degraded':
        return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
      case 'down':
        return <XCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
      default:
        return <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational':
        return { text: 'Operacional', color: 'text-green-600 dark:text-green-400' }
      case 'degraded':
        return { text: 'Degradado', color: 'text-yellow-600 dark:text-yellow-400' }
      case 'down':
        return { text: 'Fora do Ar', color: 'text-red-600 dark:text-red-400' }
      default:
        return { text: 'Operacional', color: 'text-green-600 dark:text-green-400' }
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'minor':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded">Menor</span>
      case 'major':
        return <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400 rounded">Maior</span>
      case 'critical':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded">Crítico</span>
      case 'maintenance':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded">Manutenção</span>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Status do Sistema
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Monitoramento em tempo real dos nossos serviços
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
              <ClockIcon className="h-5 w-5" />
              <span className="text-sm">
                Última atualização: {lastUpdated.toLocaleTimeString('pt-BR')}
              </span>
            </div>
          </div>

          {/* Overall Status */}
          <div className="mb-12">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <div className="flex items-center">
                <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400 mr-4" />
                <div>
                  <h2 className="text-xl font-semibold text-green-900 dark:text-green-100">
                    Todos os Sistemas Operacionais
                  </h2>
                  <p className="text-green-700 dark:text-green-300 mt-1">
                    Todos os serviços estão funcionando normalmente
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Systems Status */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Status dos Serviços
            </h2>
            <div className="space-y-4">
              {systems.map((system) => {
                const statusInfo = getStatusText(system.status)
                return (
                  <div
                    key={system.name}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(system.status)}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {system.name}
                          </h3>
                          <p className={`text-sm ${statusInfo.color}`}>
                            {statusInfo.text}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-400">
                        <div>
                          <span className="font-medium">Uptime:</span> {system.uptime}
                        </div>
                        <div>
                          <span className="font-medium">Tempo de Resposta:</span> {system.responseTime}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Incident History */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Histórico de Incidentes
            </h2>
            <div className="space-y-4">
              {incidents.map((incident, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {incident.date}
                        </span>
                        {getSeverityBadge(incident.severity)}
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded">
                          Resolvido
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {incident.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Duração: {incident.duration}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscribe to Updates */}
          <div className="mt-16">
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8 border border-primary-200 dark:border-primary-800 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Receba Atualizações de Status
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Inscreva-se para receber notificações sobre atualizações de status e incidentes
              </p>
              <div className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                  Inscrever
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

