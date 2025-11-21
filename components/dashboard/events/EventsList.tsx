'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { 
  CalendarDaysIcon, 
  ClockIcon, 
  MapPinIcon,
  UserGroupIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { formatDate, formatDateTime } from '@/lib/utils'

interface Event {
  id: string
  name: string
  description?: string
  date: string
  start_time?: string
  end_time?: string
  location?: string
  status: 'draft' | 'published' | 'cancelled' | 'completed'
  ministry_name?: string
  volunteer_count?: number
  confirmed_count?: number
}

export function SimpleEventsList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'draft' | 'published' | 'cancelled' | 'completed'>('all')

  // Dados de teste para demonstração
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: '1',
        name: 'Culto de Domingo',
        description: 'Culto principal da semana',
        date: '2024-01-15',
        start_time: '09:00',
        end_time: '11:00',
        location: 'Templo Principal',
        status: 'published',
        ministry_name: 'Ministério de Louvor',
        volunteer_count: 8,
        confirmed_count: 6
      },
      {
        id: '2',
        name: 'Reunião de Oração',
        description: 'Reunião semanal de oração',
        date: '2024-01-17',
        start_time: '19:00',
        end_time: '21:00',
        location: 'Salão de Eventos',
        status: 'published',
        ministry_name: 'Ministério de Intercessão',
        volunteer_count: 5,
        confirmed_count: 4
      },
      {
        id: '3',
        name: 'Escola Bíblica',
        description: 'Aulas da escola bíblica dominical',
        date: '2024-01-21',
        start_time: '08:00',
        end_time: '09:00',
        location: 'Classes',
        status: 'draft',
        ministry_name: 'Ministério de Ensino',
        volunteer_count: 12,
        confirmed_count: 0
      },
      {
        id: '4',
        name: 'Evento de Evangelismo',
        description: 'Evangelismo no centro da cidade',
        date: '2024-01-20',
        start_time: '14:00',
        end_time: '18:00',
        location: 'Praça Central',
        status: 'published',
        ministry_name: 'Ministério de Evangelismo',
        volunteer_count: 15,
        confirmed_count: 12
      }
    ]

    // Simular carregamento
    setTimeout(() => {
      setEvents(mockEvents)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredEvents = events.filter(event => 
    filter === 'all' || event.status === filter
  )

  const getStatusBadge = (status: Event['status']) => {
    const statusConfig = {
      draft: { label: 'Rascunho', className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
      published: { label: 'Publicado', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
      cancelled: { label: 'Cancelado', className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
      completed: { label: 'Concluído', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' }
    }

    const config = statusConfig[status]
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'Todos' },
              { key: 'published', label: 'Publicados' },
              { key: 'draft', label: 'Rascunhos' },
              { key: 'completed', label: 'Concluídos' },
              { key: 'cancelled', label: 'Cancelados' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  filter === key
                    ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de Eventos */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <CalendarDaysIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                Nenhum evento encontrado
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {filter === 'all' 
                  ? 'Comece criando seu primeiro evento.'
                  : `Nenhum evento com status "${filter}" encontrado.`
                }
              </p>
              <div className="mt-6">
                <Link href="/dashboard/events/new">
                  <Button>
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Novo Evento
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {event.name}
                        </h3>
                        {getStatusBadge(event.status)}
                      </div>
                      
                      {event.description && (
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{event.description}</p>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <CalendarDaysIcon className="h-4 w-4 mr-2" />
                          {formatDate(event.date)}
                        </div>
                        
                        {event.start_time && (
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-2" />
                            {formatDateTime(event.date, event.start_time)}
                            {event.end_time && ` - ${event.end_time}`}
                          </div>
                        )}
                        
                        {event.location && (
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-2" />
                            {event.location}
                          </div>
                        )}
                        
                        <div className="flex items-center">
                          <UserGroupIcon className="h-4 w-4 mr-2" />
                          {event.confirmed_count || 0}/{event.volunteer_count || 0} confirmados
                        </div>
                      </div>
                      
                      {event.ministry_name && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {event.ministry_name}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Link href={`/dashboard/events/${event.id}`}>
                        <Button variant="outline" size="sm" title="Visualizar">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                      
                      <Link href={`/dashboard/events/${event.id}/edit`}>
                        <Button variant="outline" size="sm" title="Editar">
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                      
                      <Button variant="outline" size="sm" title="Excluir" className="text-red-600 hover:text-red-800">
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}





