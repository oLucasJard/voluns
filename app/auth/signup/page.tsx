'use client'

import Link from 'next/link'
import { SignupForm } from '@/components/auth/SignupForm'
import { 
  CheckCircleIcon, 
  SparklesIcon,
  ClockIcon,
  CreditCardIcon,
  UsersIcon,
  ChartBarIcon,
  BellIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function SignupPage() {
  const benefits = [
    {
      icon: ClockIcon,
      title: '14 dias grátis',
      description: 'Teste completo sem cartão'
    },
    {
      icon: CreditCardIcon,
      title: 'Sem compromisso',
      description: 'Cancele quando quiser'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Dados seguros',
      description: 'Conformidade com LGPD'
    }
  ]

  const features = [
    {
      icon: UsersIcon,
      title: 'Gestão de Voluntários',
      description: 'Cadastro completo e organizado'
    },
    {
      icon: ChartBarIcon,
      title: 'Escalas Automáticas',
      description: 'Crie escalas em minutos'
    },
    {
      icon: BellIcon,
      title: 'Notificações',
      description: 'Email, SMS e push notifications'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="flex min-h-screen">
        {/* Left Side - Visual */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-purple overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-1/4 -left-40 w-96 h-96 bg-accent-purple rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-primary-400 rounded-full blur-3xl opacity-20" />

          <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 py-12">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8 w-fit"
            >
              <SparklesIcon className="h-4 w-4 mr-2" />
              Comece Grátis por 14 Dias
            </motion.div>

            {/* Main content */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Junte-se a centenas de igrejas
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl text-primary-100 mb-12 leading-relaxed"
            >
              Crie sua conta em menos de 2 minutos e comece a organizar seus voluntários hoje mesmo.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-1 gap-6 mb-12"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                >
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-primary-100 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="space-y-4"
            >
              <div className="text-primary-200 text-sm font-medium mb-3">
                O que você ganha ao criar sua conta:
              </div>
              {[
                'Acesso imediato a todos os recursos',
                'Sem necessidade de cartão de crédito',
                'Suporte dedicado em português',
                'Dados protegidos com criptografia',
                'Cancele quando quiser, sem burocracia'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-white text-sm">{item}</span>
                </div>
              ))}
            </motion.div>

          </div>
        </motion.div>

        {/* Right Side - Form */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-sm lg:w-96"
          >
            {/* Logo - Mobile only */}
            <div className="lg:hidden mb-8">
              <Link href="/" className="inline-flex items-center space-x-3 group">
                <div className="h-12 w-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">V</span>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-primary-600 dark:from-white dark:to-primary-400 bg-clip-text text-transparent">
                  Voluns
                </span>
              </Link>
            </div>

            {/* Header */}
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                Comece gratuitamente
              </h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                Crie sua conta e transforme sua igreja hoje
              </p>
            </div>

            {/* Benefits - Mobile */}
            <div className="mt-6 lg:hidden">
              <div className="grid grid-cols-1 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                    <benefit.icon className="h-5 w-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {benefit.title}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="mt-8">
              <SignupForm />
        </div>

            {/* Login link */}
            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              Já tem uma conta?{' '}
          <Link
            href="/auth/login"
                className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
          >
                Fazer login →
          </Link>
        </p>

            {/* Benefits - Desktop */}
            <div className="hidden lg:block mt-10 pt-10 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-xl bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                        <benefit.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {benefit.title}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
      </div>

            {/* Trust badge */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <ShieldCheckIcon className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-xs font-medium text-green-900 dark:text-green-100">
                  Seus dados estão seguros conosco
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
