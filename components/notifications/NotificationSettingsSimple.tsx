'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { 
  BellIcon, 
  EnvelopeIcon, 
  ClockIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export function NotificationSettingsSimple() {
  const [preferences, setPreferences] = useState({
    email_enabled: true,
    in_app_enabled: true,
    assignment_notifications: true,
    reminder_notifications: true,
    system_notifications: true,
    urgent_notifications: true,
    reminder_frequency: 'daily',
    quiet_hours_enabled: true,
    quiet_hours_start: '22:00',
    quiet_hours_end: '08:00'
  })

  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Configurações salvas:', preferences)
    } finally {
      setLoading(false)
    }
  }

  const updatePreference = (key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">
      {/* Configurações de Canal */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BellIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Canais de Notificação</h3>
              <p className="text-sm text-gray-500">Escolha como você quer receber notificações</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Notificações no App</h4>
                <p className="text-sm text-gray-500">Receba notificações dentro da plataforma</p>
              </div>
              <button
                type="button"
                onClick={() => updatePreference('in_app_enabled', !preferences.in_app_enabled)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  preferences.in_app_enabled ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    preferences.in_app_enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between py-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Notificações por Email</h4>
                <p className="text-sm text-gray-500">Receba notificações por email</p>
              </div>
              <button
                type="button"
                onClick={() => updatePreference('email_enabled', !preferences.email_enabled)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  preferences.email_enabled ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    preferences.email_enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Configurações por Tipo */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Tipos de Notificação</h3>
              <p className="text-sm text-gray-500">Escolha quais tipos de notificação você quer receber</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Atribuições</h4>
                <p className="text-sm text-gray-500">Quando você for escalado para eventos</p>
              </div>
              <button
                type="button"
                onClick={() => updatePreference('assignment_notifications', !preferences.assignment_notifications)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  preferences.assignment_notifications ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    preferences.assignment_notifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Lembretes</h4>
                <p className="text-sm text-gray-500">Lembretes de eventos e confirmações pendentes</p>
              </div>
              <button
                type="button"
                onClick={() => updatePreference('reminder_notifications', !preferences.reminder_notifications)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  preferences.reminder_notifications ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    preferences.reminder_notifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between py-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Notificações do Sistema</h4>
                <p className="text-sm text-gray-500">Atualizações da plataforma e informações gerais</p>
              </div>
              <button
                type="button"
                onClick={() => updatePreference('system_notifications', !preferences.system_notifications)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  preferences.system_notifications ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    preferences.system_notifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              disabled={loading}
            >
              <XMarkIcon className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            
            <Button
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
