'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const signupSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número'),
  confirmPassword: z.string(),
  churchName: z.string().min(2, 'Nome da igreja é obrigatório'),
  role: z.enum(['admin', 'leader'], {
    required_error: 'Selecione seu papel na igreja',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
})

type SignupFormData = z.infer<typeof signupSchema>

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    
    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            church_name: data.churchName,
            role: data.role,
          },
        },
      })

      if (authError) {
        toast.error(authError.message)
        return
      }

      if (authData.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: data.email,
            name: data.name,
            role: data.role,
          })

        if (profileError) {
          console.error('Error creating profile:', profileError)
        }

        // Create church if user is admin
        if (data.role === 'admin') {
          const { data: churchData, error: churchError } = await supabase
            .from('churches')
            .insert({
              name: data.churchName,
              plan: 'essential',
            })
            .select()
            .single()

          if (churchError) {
            console.error('Error creating church:', churchError)
          } else if (churchData) {
            // Update user with church_id
            await supabase
              .from('users')
              .update({ church_id: churchData.id })
              .eq('id', authData.user.id)
          }
        }
      }

      toast.success('Conta criada com sucesso! Verifique seu email para confirmar.')
      router.push('/auth/login')
    } catch (error) {
      toast.error('Erro ao criar conta. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setIsLoading(true)
    
    try {
      toast.loading('Redirecionando para o Google...', { duration: 2000 })
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        toast.error(error.message)
        setIsLoading(false)
      }
      // Não setamos isLoading como false aqui porque a página vai redirecionar
    } catch (error) {
      toast.error('Erro ao criar conta com Google. Tente novamente.')
      setIsLoading(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nome completo
          </label>
          <div className="mt-1">
            <input
              {...register('name')}
              type="text"
              autoComplete="name"
              className="input-field"
              placeholder="Seu nome completo"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-error-600">{errors.name.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <div className="mt-1">
            <input
              {...register('email')}
              type="email"
              autoComplete="email"
              className="input-field"
              placeholder="seu@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="churchName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Nome da igreja
        </label>
        <div className="mt-1">
          <input
            {...register('churchName')}
            type="text"
            className="input-field"
            placeholder="Nome da sua igreja"
          />
          {errors.churchName && (
            <p className="mt-1 text-sm text-error-600">{errors.churchName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Seu papel na igreja
        </label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              {...register('role')}
              type="radio"
              value="admin"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            />
            <label className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
              Pastor/Administrador (criar igreja)
            </label>
          </div>
          <div className="flex items-center">
            <input
              {...register('role')}
              type="radio"
              value="leader"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            />
            <label className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
              Líder de Ministério (participar de igreja existente)
            </label>
          </div>
        </div>
        {errors.role && (
          <p className="mt-1 text-sm text-error-600">{errors.role.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Senha
          </label>
          <div className="mt-1 relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className="input-field pr-10"
              placeholder="Mínimo 8 caracteres"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              )}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-error-600">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirmar senha
          </label>
          <div className="mt-1 relative">
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className="input-field pr-10"
              placeholder="Confirme sua senha"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-error-600">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Criando conta...' : 'Criar conta gratuita'}
        </Button>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Ou continue com</span>
          </div>
        </div>

        <div className="mt-6">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar com Google
          </Button>
        </div>
      </div>

      <div className="text-sm text-center text-gray-600 dark:text-gray-400">
        Ao criar uma conta, você concorda com nossos{' '}
        <Link href="/terms" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
          Termos de Uso
        </Link>{' '}
        e{' '}
        <Link href="/privacy" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
          Política de Privacidade
        </Link>
        .
      </div>
    </form>
  )
}

