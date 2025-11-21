'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { PlayIcon, CheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export function Hero() {
  const features = [
    'Gestão completa de voluntários',
    'Escalas automáticas inteligentes',
    'Notificações em tempo real',
    'Interface moderna e intuitiva',
  ]

  const stats = [
    { label: 'Igrejas Ativas', value: '500+' },
    { label: 'Voluntários Gerenciados', value: '15.000+' },
    { label: 'Eventos Criados', value: '50.000+' },
    { label: 'Satisfação', value: '98%' },
  ]

  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <motion.div 
              className="sm:text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <motion.div 
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300 mb-6 border border-primary-200 dark:border-primary-800"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                ✨ Sistema otimizado e pronto para produção
              </motion.div>

              <motion.h1 
                className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="block xl:inline">Elimine o caos na</span>{' '}
                <span className="block text-primary-600 dark:text-primary-400 xl:inline">
                  gestão de voluntários
                </span>
              </motion.h1>
              
              <motion.p 
                className="mt-6 text-lg text-gray-600 dark:text-gray-300 sm:mt-8 sm:text-xl sm:max-w-2xl sm:mx-auto md:mt-8 md:text-2xl lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                O Voluns é a plataforma SaaS mais completa para igrejas gerenciarem voluntários 
                e escalas ministeriais de forma organizada, inteligente e eficiente.
              </motion.p>

              <motion.div 
                className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Link 
                  href="/auth/signup" 
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Começar Grátis
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="#demo" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-base font-medium rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <PlayIcon className="h-5 w-5 mr-2" />
                  Ver Demo
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Social proof */}
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-10 w-10 rounded-full bg-primary-600 border-2 border-white dark:border-gray-900 flex items-center justify-center text-white text-sm font-medium shadow-md"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">+500 igrejas</span> já usam o Voluns
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </main>
        </div>
      </div>

      {/* Hero Image */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <motion.div 
          className="h-56 w-full bg-primary-600 dark:bg-primary-700 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center relative overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="relative z-10 text-white text-center p-8">
            <motion.div 
              className="text-8xl mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5, type: "spring" }}
            >
              ⛪
            </motion.div>
            <motion.h3 
              className="text-2xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Dashboard Interativo
            </motion.h3>
            <motion.p 
              className="text-primary-100 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              Visualização em tempo real
            </motion.p>
          </div>
        </motion.div>
      </div>
      
      {/* Features list */}
      <motion.div 
        className="bg-gray-50 dark:bg-gray-800 py-16 border-t border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="flex items-center space-x-3 p-4 rounded-lg bg-white dark:bg-gray-700 hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex-shrink-0">
                  <CheckIcon className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

