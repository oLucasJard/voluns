'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export function CTA() {
  return (
    <div className="relative bg-primary-600 dark:bg-primary-700 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
      
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white mb-6 border border-white/30"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
          >
            ✨ Transforme sua igreja hoje
          </motion.div>
          
          <motion.h2 
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Pronto para transformar sua igreja?
          </motion.h2>
          
          <motion.p 
            className="mt-6 max-w-3xl mx-auto text-lg leading-7 text-primary-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Junte-se a centenas de igrejas que já eliminaram o caos na gestão de voluntários. 
            Comece seu teste gratuito hoje mesmo e veja a diferença.
          </motion.p>

          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-primary-600 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Começar Teste Grátis
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-lg text-white bg-transparent hover:bg-white/10 transition-all duration-200"
            >
              Falar com Especialista
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 text-primary-200">
              <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Sistema otimizado</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-200">
              <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Suporte 24/7</span>
            </div>
            <div className="flex items-center space-x-2 text-primary-200">
              <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Teste grátis 14 dias</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

