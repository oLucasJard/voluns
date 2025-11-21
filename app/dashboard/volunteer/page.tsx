// Dashboard específico para voluntários
'use client'

import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/components/providers/Providers'
import { usePermissions } from '@/lib/hooks/usePermissions'
import { 
  CalendarDaysIcon, 
  ClockIcon, 
  CheckCircleIcon,
  XCircleIcon,
  BellIcon,
  UserIcon,
  StarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

export default function VolunteerDashboard() {
  const { profile } = useAuth()
  const { userRole, isVolunteer } = usePermissions()

  console.log('👤 VolunteerDashboard - Componente renderizado')
  console.log('👤 VolunteerDashboard - User role:', userRole)
  console.log('👤 VolunteerDashboard - Is volunteer:', isVolunteer)

  // Dados mockados para o dashboard do voluntário
  const mockData = {
    volunteer: {
      name: profile?.name || 'Voluntário',
      ministry: 'Ministério de Louvor',
      position: 'Vocalista',
      joinDate: '2024-01-01',
      totalEvents: 15,
      upcomingEvents: 2
    },
    stats: {
      totalAssignments: 15,
      acceptedAssignments: 12,
      pendingAssignments: 2,
      declinedAssignments: 1,
      upcomingEvents: 2
    },
    upcomingEvents: [
      {
        id: '1',
        name: 'Culto de Domingo',
        date: '2024-01-21',
        time: '09:00',
        position: 'Vocalista',
        status: 'accepted',
        location: 'Templo Principal'
      },
      {
        id: '2',
        name: 'Ensaio de Louvor',
        date: '2024-01-19',
        time: '19:00',
        position: 'Vocalista',
        status: 'pending',
        location: 'Sala de Ensaios'
      }
    ],
    pendingAssignments: [
      {
        id: '1',
        eventName: 'Ensaio de Louvor',
        date: '2024-01-19',
        time: '19:00',
        position: 'Vocalista',
        assignedAt: '2024-01-15'
      },
      {
        id: '2',
        eventName: 'Culto Especial',
        date: '2024-01-25',
        time: '19:00',
        position: 'Vocalista',
        assignedAt: '2024-01-16'
      }
    ],
    recentActivity: [
      {
        id: '1',
        type: 'assignment_accepted',
        eventName: 'Culto de Domingo',
        date: '2024-01-14',
        message: 'Você aceitou a atribuição para o Culto de Domingo'
      },
      {
        id: '2',
        type: 'event_reminder',
        eventName: 'Ensaio de Louvor',
        date: '2024-01-13',
        message: 'Lembrete: Ensaio de Louvor em 2 dias'
      },
      {
        id: '3',
        type: 'assignment_declined',
        eventName: 'Culto de Sábado',
        date: '2024-01-12',
        message: 'Você recusou a atribuição para o Culto de Sábado'
      }
    ]
  }

  return (
    <ProtectedRoute requiredRole="volunteer">
      <DashboardLayout>
        <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-full">
          {/* Header do Dashboard do Voluntário */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Meu Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Bem-vindo, {mockData.volunteer.name}! Gerencie suas atribuições
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Ministério</div>
                <div className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                  {mockData.volunteer.ministry}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {mockData.volunteer.position}
                </div>
              </div>
            </div>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <CalendarDaysIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total de Atribuições
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockData.stats.totalAssignments}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Aceitas
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockData.stats.acceptedAssignments}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Pendentes
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockData.stats.pendingAssignments}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Próximos Eventos
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockData.stats.upcomingEvents}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Seção de Atribuições Pendentes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Atribuições Pendentes
              </h2>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900/30 dark:text-yellow-400">
                {mockData.pendingAssignments.length} pendentes
              </span>
            </div>
            <div className="space-y-4">
              {mockData.pendingAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {assignment.eventName}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(assignment.date).toLocaleDateString('pt-BR')} às {assignment.time}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {assignment.position}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Atribuído em {new Date(assignment.assignedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                      Aceitar
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                      Recusar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seção de Próximos Eventos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Próximos Eventos
                </h2>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Ver todos
                </button>
              </div>
              <div className="space-y-4">
                {mockData.upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {event.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {event.location} • {event.position}
                      </p>
                    </div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'accepted' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {event.status === 'accepted' ? 'Confirmado' : 'Pendente'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seção de Atividade Recente */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Atividade Recente
                </h2>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Ver todas
                </button>
              </div>
              <div className="space-y-4">
                {mockData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'assignment_accepted' 
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : activity.type === 'assignment_declined'
                        ? 'bg-red-100 dark:bg-red-900/30'
                        : 'bg-blue-100 dark:bg-blue-900/30'
                    }`}>
                      {activity.type === 'assignment_accepted' ? (
                        <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : activity.type === 'assignment_declined' ? (
                        <XCircleIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
                      ) : (
                        <BellIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {new Date(activity.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Ações Rápidas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
                <BellIcon className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3" />
                <div className="text-left">
                  <div className="font-medium text-primary-900 dark:text-primary-100">
                    Ver Notificações
                  </div>
                  <div className="text-sm text-primary-600 dark:text-primary-400">
                    {mockData.stats.pendingAssignments} pendentes
                  </div>
                </div>
              </button>

              <button className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <UserIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                <div className="text-left">
                  <div className="font-medium text-blue-900 dark:text-blue-100">
                    Meu Perfil
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    Editar informações
                  </div>
                </div>
              </button>

              <button className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <CalendarDaysIcon className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
                <div className="text-left">
                  <div className="font-medium text-green-900 dark:text-green-100">
                    Meus Eventos
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Ver histórico
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}






