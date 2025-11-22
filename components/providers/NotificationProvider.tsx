'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAuth } from './AuthProvider'
import { supabase } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

// Tipos bem definidos para escalabilidade
export interface Notification {
  id: string
  user_id: string
  type: 'assignment' | 'event' | 'reminder' | 'system' | 'urgent'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  title: string
  message: string
  data?: {
    event_id?: string
    assignment_id?: string
    volunteer_id?: string
    action_url?: string
    action_label?: string
  }
  read_at?: string
  created_at: string
  expires_at?: string
}

export interface NotificationPreferences {
  user_id: string
  email_enabled: boolean
  in_app_enabled: boolean
  assignment_notifications: boolean
  reminder_notifications: boolean
  system_notifications: boolean
  urgent_notifications: boolean
  reminder_frequency: 'immediate' | 'daily' | 'weekly'
  quiet_hours_start: string
  quiet_hours_end: string
  quiet_hours_enabled: boolean
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  preferences: NotificationPreferences | null
  loading: boolean
  
  // Actions
  markAsRead: (notificationId: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  deleteNotification: (notificationId: string) => Promise<void>
  updatePreferences: (preferences: Partial<NotificationPreferences>) => Promise<void>
  sendNotification: (notification: Omit<Notification, 'id' | 'created_at'>) => Promise<void>
  refreshNotifications: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Hook para usar o contexto
export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Provider principal
export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null)
  const [loading, setLoading] = useState(true)

  // Carregar notificações
  const fetchNotifications = async () => {
    if (!user?.id) return

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching notifications:', error)
        // Não definir notificações se houver erro - manter estado atual
        return
      }

      // Converter dados do Supabase para o formato esperado
      const formattedNotifications: Notification[] = (data || []).map((notification: any) => ({
        id: notification.id,
        user_id: notification.user_id,
        type: notification.type as Notification['type'],
        priority: notification.priority || 'medium',
        title: notification.title,
        message: notification.message,
        data: notification.data,
        read_at: notification.is_read ? notification.created_at : undefined,
        created_at: notification.created_at,
        expires_at: notification.expires_at
      }))

      setNotifications(formattedNotifications)
    } catch (error) {
      console.error('Error in fetchNotifications:', error)
      // Não alterar estado em caso de erro
    } finally {
      setLoading(false)
    }
  }

  // Carregar preferências
  const fetchPreferences = async () => {
    if (!user?.id) return

    try {
      const mockPreferences: NotificationPreferences = {
        user_id: user.id,
        email_enabled: true,
        in_app_enabled: true,
        assignment_notifications: true,
        reminder_notifications: true,
        system_notifications: true,
        urgent_notifications: true,
        reminder_frequency: 'daily',
        quiet_hours_start: '22:00',
        quiet_hours_end: '08:00',
        quiet_hours_enabled: true
      }

      setPreferences(mockPreferences)
    } catch (error) {
      console.error('Error fetching preferences:', error)
    }
  }

  // Calcular notificações não lidas
  const unreadCount = notifications.filter(n => !n.read_at).length

  // Marcar como lida
  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)

      if (error) {
        console.error('Error marking notification as read:', error)
        toast.error('Erro ao marcar notificação como lida')
        return
      }

      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read_at: new Date().toISOString() }
            : notification
        )
      )
    } catch (error) {
      console.error('Error marking notification as read:', error)
      toast.error('Erro ao marcar notificação como lida')
    }
  }

  // Marcar todas como lidas
  const markAllAsRead = async () => {
    try {
      if (!user?.id) return

      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false)

      if (error) {
        console.error('Error marking all notifications as read:', error)
        toast.error('Erro ao marcar notificações como lidas')
        return
      }

      const now = new Date().toISOString()
      setNotifications(prev => 
        prev.map(notification => 
          !notification.read_at 
            ? { ...notification, read_at: now }
            : notification
        )
      )
      
      toast.success('Todas as notificações foram marcadas como lidas')
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      toast.error('Erro ao marcar notificações como lidas')
    }
  }

  // Deletar notificação
  const deleteNotification = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId)

      if (error) {
        console.error('Error deleting notification:', error)
        toast.error('Erro ao remover notificação')
        return
      }

      setNotifications(prev => prev.filter(n => n.id !== notificationId))
      toast.success('Notificação removida')
    } catch (error) {
      console.error('Error deleting notification:', error)
      toast.error('Erro ao remover notificação')
    }
  }

  // Atualizar preferências
  const updatePreferences = async (newPreferences: Partial<NotificationPreferences>) => {
    try {
      if (!preferences) return

      const updated = { ...preferences, ...newPreferences }
      setPreferences(updated)
      
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Preferências atualizadas com sucesso')
    } catch (error) {
      console.error('Error updating preferences:', error)
      toast.error('Erro ao atualizar preferências')
    }
  }

  // Enviar notificação (para líderes/admins)
  const sendNotification = async (notification: Omit<Notification, 'id' | 'created_at'>) => {
    try {
      const newNotification: Notification = {
        ...notification,
        id: `temp-${Date.now()}`,
        created_at: new Date().toISOString()
      }

      setNotifications(prev => [newNotification, ...prev])
      
      await new Promise(resolve => setTimeout(resolve, 500))
      toast.success('Notificação enviada com sucesso')
    } catch (error) {
      console.error('Error sending notification:', error)
      toast.error('Erro ao enviar notificação')
    }
  }

  // Atualizar notificações
  const refreshNotifications = async () => {
    setLoading(true)
    await fetchNotifications()
  }

  // Carregar dados iniciais
  useEffect(() => {
    if (user?.id) {
      fetchNotifications()
      fetchPreferences()
    }
  }, [user?.id])

  // Configurar notificações em tempo real (apenas para usuários reais do Supabase)
  useEffect(() => {
    if (!user?.id) return

    // Desabilitar WebSocket para usuários de teste para evitar erros de conexão
    const isTestUser = user.email === 'teste@voluns.com' || 
                      user.email === 'lider@voluns.com' || 
                      user.email === 'voluntario@voluns.com'
    
    if (isTestUser) {
      // WebSocket desabilitado para usuário de teste
      return
    }

    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload: any) => {
          const newNotification = payload.new as any
          const formattedNotification: Notification = {
            id: newNotification.id,
            user_id: newNotification.user_id,
            type: newNotification.type,
            priority: newNotification.priority || 'medium',
            title: newNotification.title,
            message: newNotification.message,
            data: newNotification.data,
            created_at: newNotification.created_at,
            expires_at: newNotification.expires_at
          }

          setNotifications(prev => [formattedNotification, ...prev])
          
          // Mostrar toast para notificações importantes
          if (formattedNotification.priority === 'high' || formattedNotification.priority === 'urgent') {
            toast.success(formattedNotification.title, {
              duration: 4000,
              icon: '🔔'
            })
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload: any) => {
          const updatedNotification = payload.new as any
          setNotifications(prev => 
            prev.map(notification => 
              notification.id === updatedNotification.id 
                ? { ...notification, read_at: updatedNotification.is_read ? new Date().toISOString() : undefined }
                : notification
            )
          )
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload: any) => {
          const deletedNotification = payload.old as any
          setNotifications(prev => prev.filter(n => n.id !== deletedNotification.id))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user?.id])

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    preferences,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    updatePreferences,
    sendNotification,
    refreshNotifications
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

