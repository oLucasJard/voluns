/**
 * Utilities para PWA
 */

// Registrar Service Worker
export async function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js')
    console.log('✅ Service Worker registrado:', registration.scope)

    // Verificar updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // Nova versão disponível
            console.log('🔄 Nova versão disponível')
            // Notificar usuário para recarregar
            if (confirm('Nova versão disponível! Recarregar página?')) {
              window.location.reload()
            }
          }
        })
      }
    })

    return registration
  } catch (error) {
    console.error('❌ Erro ao registrar Service Worker:', error)
  }
}

// Verificar se é standalone (instalado)
export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false
  
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  )
}

// Verificar se pode instalar
export function canInstall(): boolean {
  if (typeof window === 'undefined') return false
  return 'BeforeInstallPromptEvent' in window
}

// Prompt de instalação
export async function promptInstall(deferredPrompt: any) {
  if (!deferredPrompt) return false

  try {
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.log(`Instalação: ${outcome}`)
    return outcome === 'accepted'
  } catch (error) {
    console.error('Erro ao solicitar instalação:', error)
    return false
  }
}

// Verificar conectividade
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = React.useState(
    typeof window !== 'undefined' ? navigator.onLine : true
  )

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

// Solicitar permissão para notificações
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('Notificações não suportadas')
    return 'denied'
  }

  if (Notification.permission === 'granted') {
    return 'granted'
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission
  }

  return Notification.permission
}

// Enviar notificação local
export function showLocalNotification(title: string, options?: NotificationOptions) {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return
  }

  const notification = new Notification(title, {
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    ...options,
  })

  notification.onclick = () => {
    window.focus()
    notification.close()
  }

  return notification
}

// Verificar se é iOS
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false
  
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
}

// Verificar se é Android
export function isAndroid(): boolean {
  if (typeof window === 'undefined') return false
  return /Android/.test(navigator.userAgent)
}

// Instrução de instalação por plataforma
export function getInstallInstructions(): string {
  if (isIOS()) {
    return 'Toque em "Compartilhar" e depois em "Adicionar à Tela de Início"'
  }
  if (isAndroid()) {
    return 'Toque no menu (⋮) e depois em "Adicionar à tela inicial"'
  }
  return 'Use o menu do navegador para instalar'
}

import React from 'react'

