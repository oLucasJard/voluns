'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { CheckIcon, StarIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export function Pricing() {
  const plans = [
    {
      name: 'Essencial',
      description: 'Ministérios individuais e igrejas testando a plataforma',
      price: 'Grátis',
      period: '',
      features: [
        'Até 20 voluntários',
        '1 ministério',
        'Gestão básica de escalas',
        'Notificações por email',
        'Suporte por email',
        '10 eventos por mês',
      ],
      cta: 'Começar Grátis',
      href: '/auth/signup',
      popular: false,
    },
    {
      name: 'Crescimento',
      description: 'Igrejas em crescimento que precisam de gestão centralizada',
      price: 'R$ 19',
      period: '/mês',
      features: [
        'Até 75 voluntários',
        '5 ministérios',
        'Gestão avançada de escalas',
        'Notificações SMS + Email',
        'Relatórios e analytics',
        'Eventos ilimitados',
        'Suporte prioritário',
        'Integração com calendário',
      ],
      cta: 'Começar Teste',
      href: '/auth/signup?plan=growth',
      popular: true,
    },
    {
      name: 'Pro',
      description: 'Igrejas maiores que buscam máxima eficiência e relatórios avançados',
      price: 'R$ 49',
      period: '/mês',
      features: [
        'Voluntários ilimitados',
        'Ministérios ilimitados',
        'Gestão completa de escalas',
        'Todas as notificações',
        'Analytics avançados',
        'Eventos ilimitados',
        'Suporte 24/7',
        'Integrações avançadas',
        'API personalizada',
        'Treinamento dedicado',
      ],
      cta: 'Falar com Vendas',
      href: '/contact',
      popular: false,
    },
  ]

  return (
    <div id="pricing" className="py-24 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300 mb-4 border border-primary-200 dark:border-primary-800"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
          >
            ✨ Planos Flexíveis
          </motion.div>
          
          <motion.h2 
            className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Planos que crescem com sua igreja
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Comece grátis e evolua conforme suas necessidades crescem
          </motion.p>
        </motion.div>

        <div className="mt-20 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative group ${
                plan.popular
                  ? 'scale-105'
                  : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div
                className={`relative bg-white dark:bg-gray-800 border rounded-2xl shadow-lg hover:shadow-xl px-6 py-8 transition-all duration-300 ${
                  plan.popular
                    ? 'border-primary-500 ring-2 ring-primary-500/20'
                    : 'border-gray-200 dark:border-gray-700 group-hover:border-primary-300 dark:group-hover:border-primary-600'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-primary-600 text-white shadow-lg">
                      <StarIcon className="h-4 w-4 mr-1" />
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-lg font-medium text-gray-600 dark:text-gray-400">{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={feature} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + featureIndex * 0.05, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-600 mt-0.5" />
                      <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link
                    href={plan.href}
                    className={`block w-full py-3 px-4 border rounded-lg text-center text-sm font-medium transition-all duration-200 transform hover:-translate-y-0.5 ${
                      plan.popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl border-transparent'
                        : 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Todos os planos incluem 14 dias de teste gratuito. Sem compromisso.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <CheckIcon className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Cancelamento a qualquer momento</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckIcon className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Suporte em português</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckIcon className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Sistema otimizado</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
