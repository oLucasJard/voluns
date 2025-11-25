'use client'

import { memo } from 'react'
import { CheckBadgeIcon, ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface TestCredentialsProps {
  onQuickLogin?: (email: string, password: string) => void
}

const credentials = [
  {
    id: 'admin',
    label: 'Administrador',
    description: 'Acesso completo ao painel executivo e configurações globais.',
    email: 'teste@voluns.com',
    password: 'Teste@2024',
    icon: ShieldCheckIcon,
    accent: 'from-primary-500/10 to-primary-500/0 border-primary-200 dark:border-primary-800',
  },
  {
    id: 'leader',
    label: 'Líder de Ministério',
    description: 'Gerencia voluntários, eventos e notificações do ministério.',
    email: 'lider@voluns.com',
    password: 'Teste@2024',
    icon: UserGroupIcon,
    accent: 'from-emerald-500/10 to-emerald-500/0 border-emerald-200 dark:border-emerald-800',
  },
  {
    id: 'volunteer',
    label: 'Voluntário',
    description: 'Visualiza escalas, confirma presença e recebe comunicados.',
    email: 'voluntario@voluns.com',
    password: 'Teste@2024',
    icon: CheckBadgeIcon,
    accent: 'from-amber-500/10 to-amber-500/0 border-amber-200 dark:border-amber-800',
  },
]

export const TestCredentials = memo(({ onQuickLogin }: TestCredentialsProps) => {
  const handleQuickAccess = (email: string, password: string) => {
    if (!onQuickLogin) {
      toast.error('Formulário indisponível para preenchimento automático.')
      return
    }

    onQuickLogin(email, password)
    toast.success('Credenciais preenchidas automaticamente!')
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
            Credenciais de teste
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Use acesso rápido para preencher automaticamente.
          </p>
        </div>
        <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-200">
          100% seguro
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {credentials.map((cred) => {
          const Icon = cred.icon
          return (
            <div
              key={cred.id}
              className={cn(
                'rounded-xl border bg-gradient-to-r p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg',
                cred.accent
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-1 items-center gap-3">
                  <div className="rounded-xl bg-white/70 p-2 text-gray-900 shadow-sm dark:bg-gray-900/40 dark:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{cred.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{cred.description}</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAccess(cred.email, cred.password)}
                >
                  Acesso rápido
                </Button>
              </div>
              <div className="mt-3 grid gap-4 text-xs sm:grid-cols-2">
                <div className="rounded-lg bg-white/80 px-3 py-2 text-gray-600 shadow-inner dark:bg-gray-900/50 dark:text-gray-300">
                  <p className="text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">Email</p>
                  <p className="font-mono text-sm">{cred.email}</p>
                </div>
                <div className="rounded-lg bg-white/80 px-3 py-2 text-gray-600 shadow-inner dark:bg-gray-900/50 dark:text-gray-300">
                  <p className="text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">Senha</p>
                  <p className="font-mono text-sm">{cred.password}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        💡 As credenciais são resetadas automaticamente e não impactam ambientes reais.
      </p>
    </section>
  )
})

TestCredentials.displayName = 'TestCredentials'

