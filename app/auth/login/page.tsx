'use client'

import React from 'react'
import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'
import { TestCredentials } from '@/components/auth/TestCredentials'
import { 
  CheckCircleIcon, 
  SparklesIcon,
  ShieldCheckIcon,
  BoltIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const quickLoginCallbackRef = React.useRef<((email: string, password: string) => void) | null>(null)

  const benefits = [
    {
      icon: BoltIcon,
      text: 'Acesso instantâneo a todos os recursos'
    },
    {
      icon: ShieldCheckIcon,
      text: 'Dados protegidos com criptografia'
    },
    {
      icon: HeartIcon,
      text: 'Suporte dedicado em português'
    }
  ]

  const stats = [
    { value: '500+', label: 'Igrejas Ativas' },
    { value: '15k+', label: 'Voluntários' },
    { value: '98%', label: 'Satisfação' }
  ]

  const handleQuickLoginRequest = React.useCallback((callback: (email: string, password: string) => void) => {
    console.log('🔐 [LoginPage] handleQuickLoginRequest chamado, registrando callback')
    quickLoginCallbackRef.current = callback
    console.log('🔐 [LoginPage] Callback registrado:', { hasCallback: !!quickLoginCallbackRef.current })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="flex min-h-screen">
        {/* Left Side - Form */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-sm lg:w-96"
          >
            {/* Logo */}
            <div>
              <Link href="/" className="inline-flex items-center space-x-3 group">
                <div className="h-12 w-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                  <span className="text-white font-bold text-2xl">V</span>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-primary-600 dark:from-white dark:to-primary-400 bg-clip-text text-transparent">
                  Voluns
                </span>
              </Link>
            </div>

            {/* Header */}
            <div className="mt-8">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                Bem-vindo de volta!
              </h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                Entre para continuar gerenciando seus voluntários
              </p>
            </div>

            {/* Test Credentials */}
            <div className="mt-6">
              <TestCredentials onQuickLogin={(email, password) => {
                console.log('🔐 [LoginPage] onQuickLogin chamado de TestCredentials', { email, password: '***' })
                if (quickLoginCallbackRef.current) {
                  console.log('🔐 [LoginPage] Chamando callback armazenado')
                  quickLoginCallbackRef.current(email, password)
                } else {
                  console.error('❌ [LoginPage] quickLoginCallbackRef.current está null!')
                }
              }} />
            </div>

            {/* Form */}
            <div className="mt-8">
              <LoginForm onQuickLoginRequest={handleQuickLoginRequest} />
            </div>

            {/* Sign up link */}
            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              Ainda não tem conta?{' '}
              <Link
                href="/auth/signup"
                className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
              >
                Criar conta grátis →
              </Link>
            </p>

            {/* Benefits */}
            <div className="mt-10 pt-10 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-lg bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                        <benefit.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {benefit.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Visual */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-400 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-purple rounded-full blur-3xl opacity-20" />

          <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 py-12">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8 w-fit"
            >
              <SparklesIcon className="h-4 w-4 mr-2" />
              Plataforma #1 para Igrejas
            </motion.div>

            {/* Main content */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Transforme a gestão de voluntários da sua igreja
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-primary-100 mb-12 leading-relaxed"
            >
              Elimine o caos das planilhas e WhatsApp. Organize escalas, notifique voluntários e acompanhe métricas em uma única plataforma.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="grid grid-cols-3 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-200">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-16 space-y-4"
            >
              {[
                'Escalas automáticas inteligentes',
                'Notificações em tempo real',
                'Relatórios e analytics completos',
                'Suporte 24/7 em português'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircleIcon className="h-6 w-6 text-primary-200 flex-shrink-0" />
                  <span className="text-white font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  )
}
