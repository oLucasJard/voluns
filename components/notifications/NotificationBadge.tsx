'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  BellIcon, 
  XMarkIcon,
  CheckIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { useNotifications } from '@/components/providers/NotificationProvider'
import { formatDate } from '@/lib/utils'

// Componente para badge de notificação
export function NotificationBadge() {
  const { notifications, unreadCount, markAsRead, deleteNotification } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)

  // Notificações recentes (últimas 5)
  const recentNotifications = notifications.slice(0, 5)

  // Função para obter ícone por tipo
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return '📋'
      case 'event':
        return '📅'
      case 'reminder':
        return '⏰'
      case 'system':
        return '⚙️'
      case 'urgent':
        return '🚨'
      default:
        return '🔔'
    }
  }

  // Função para obter cor por prioridade
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500'
      case 'high':
        return 'bg-orange-500'
      case 'medium':
        return 'bg-blue-500'
      case 'low':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="relative">
      {/* Botão do Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-full"
      >
        <BellIcon className="h-6 w-6" />
        
        {/* Badge de contador */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown de Notificações */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Notificações
                  {unreadCount > 0 && (
                    <span className="ml-2 text-sm text-gray-500">
                      ({unreadCount} não lidas)
                    </span>
                  )}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Lista de Notificações */}
            <div className="max-h-96 overflow-y-auto">
              {recentNotifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Nenhuma notificação
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Você está em dia com todas as notificações.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {recentNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 transition-colors duration-200 ${
                        !notification.read_at ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Ícone */}
                        <div className="flex-shrink-0">
                          <span className="text-lg">
                            {getNotificationIcon(notification.type)}
                          </span>
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            
                            {/* Indicador de prioridade */}
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`} />
                          </div>
                          
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-gray-500">
                              {formatDate(notification.created_at)}
                            </p>
                            
                            {/* Ações */}
                            <div className="flex items-center space-x-2">
                              {!notification.read_at && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs text-blue-600 hover:text-blue-800"
                                  title="Marcar como lida"
                                >
                                  <CheckIcon className="h-4 w-4" />
                                </button>
                              )}
                              
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="text-xs text-red-600 hover:text-red-800"
                                title="Remover"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {/* Botão de ação */}
                          {notification.data?.action_url && notification.data?.action_label && (
                            <div className="mt-2">
                              <Link
                                href={notification.data.action_url}
                                className="inline-flex items-center px-2 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded hover:bg-primary-100"
                                onClick={() => setIsOpen(false)}
                              >
                                {notification.data.action_label}
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {recentNotifications.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-200">
                <Link
                  href="/dashboard/notifications"
                  className="block w-full text-center text-sm font-medium text-primary-600 hover:text-primary-700"
                  onClick={() => setIsOpen(false)}
                >
                  Ver todas as notificações
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}







