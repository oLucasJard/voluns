'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export default function ClearSessionPage() {
  const [cleared, setCleared] = useState(false)
  const router = useRouter()

  const clearSession = () => {
    // Limpar localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('test-auth')
      localStorage.removeItem('test-user')
      
      // Limpar cookies
      document.cookie = 'test-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie = 'test-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      
      // Limpar cookies do Supabase
      const cookies = document.cookie.split(';')
      cookies.forEach(cookie => {
        const cookieName = cookie.split('=')[0].trim()
        if (cookieName.includes('supabase')) {
          document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
        }
      })
      
      setCleared(true)
    }
  }

  useEffect(() => {
    // Limpar automaticamente ao carregar
    clearSession()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          {cleared ? (
            <div className="text-6xl mb-4">✅</div>
          ) : (
            <div className="text-6xl mb-4">🔄</div>
          )}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {cleared ? 'Sessão Limpa!' : 'Limpando Sessão...'}
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {cleared 
            ? 'Todas as sessões de teste foram removidas. Agora você pode fazer login normalmente.'
            : 'Removendo cookies e dados de autenticação...'}
        </p>

        {cleared && (
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/')}
              className="w-full"
            >
              Voltar para Home
            </Button>
            <Button
              onClick={() => router.push('/auth/login')}
              variant="outline"
              className="w-full"
            >
              Ir para Login
            </Button>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Dica:</strong> Se os botões ainda redirecionarem para o dashboard, 
            limpe o cache do navegador (Ctrl+Shift+Delete) e tente novamente.
          </p>
        </div>
      </div>
    </div>
  )
}

