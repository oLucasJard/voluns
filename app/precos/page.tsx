'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CheckIcon, XMarkIcon, StarIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function PrecosPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Essencial',
      description: 'Para ministérios individuais e igrejas pequenas',
      price: {
        monthly: 'Grátis',
        yearly: 'Grátis'
      },
      features: [
        { text: 'Até 20 voluntários', included: true },
        { text: '1 ministério', included: true },
        { text: 'Gestão básica de escalas', included: true },
        { text: 'Notificações por email', included: true },
        { text: 'Suporte por email', included: true },
        { text: '10 eventos por mês', included: true },
        { text: 'Relatórios básicos', included: true },
        { text: 'Notificações SMS', included: false },
        { text: 'Relatórios avançados', included: false },
        { text: 'API access', included: false }
      ],
      cta: 'Começar Grátis',
      href: '/auth/signup',
      popular: false,
      highlight: false
    },
    {
      name: 'Crescimento',
      description: 'Para igrejas em expansão com múltiplos ministérios',
      price: {
        monthly: 'R$ 19',
        yearly: 'R$ 15'
      },
      features: [
        { text: 'Até 75 voluntários', included: true },
        { text: '5 ministérios', included: true },
        { text: 'Gestão avançada de escalas', included: true },
        { text: 'Notificações SMS + Email', included: true },
        { text: 'Relatórios e analytics', included: true },
        { text: 'Eventos ilimitados', included: true },
        { text: 'Suporte prioritário', included: true },
        { text: 'Integração com calendário', included: true },
        { text: 'Templates customizados', included: true },
        { text: 'API access', included: false }
      ],
      cta: 'Iniciar Teste de 14 Dias',
      href: '/auth/signup?plan=growth',
      popular: true,
      highlight: true
    },
    {
      name: 'Pro',
      description: 'Para igrejas grandes que precisam de máximo controle',
      price: {
        monthly: 'R$ 49',
        yearly: 'R$ 39'
      },
      features: [
        { text: 'Voluntários ilimitados', included: true },
        { text: 'Ministérios ilimitados', included: true },
        { text: 'Gestão completa de escalas', included: true },
        { text: 'Todas as notificações', included: true },
        { text: 'Analytics avançados', included: true },
        { text: 'Eventos ilimitados', included: true },
        { text: 'Suporte 24/7', included: true },
        { text: 'Integrações avançadas', included: true },
        { text: 'API personalizada', included: true },
        { text: 'Treinamento dedicado', included: true }
      ],
      cta: 'Falar com Vendas',
      href: '/contact',
      popular: false,
      highlight: false
    }
  ]

  const faqs = [
    {
      question: 'Posso cancelar a qualquer momento?',
      answer: 'Sim! Você pode cancelar sua assinatura a qualquer momento através das configurações da sua conta. Não há taxas de cancelamento e você manterá acesso até o fim do período pago.'
    },
    {
      question: 'Como funciona o teste gratuito?',
      answer: 'Oferecemos 14 dias de teste gratuito em todos os planos pagos. Durante o teste, você tem acesso completo a todos os recursos. Não cobramos cartão de crédito antecipadamente.'
    },
    {
      question: 'Posso mudar de plano depois?',
      answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças são refletidas imediatamente e ajustamos a cobrança proporcionalmente.'
    },
    {
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Aceitamos cartões de crédito (Visa, Mastercard, American Express), débito e PIX. Os pagamentos são processados de forma segura através do Stripe.'
    },
    {
      question: 'Há desconto para pagamento anual?',
      answer: 'Sim! Ao optar pelo pagamento anual, você economiza até 20% em comparação ao plano mensal. O pagamento é feito uma vez por ano.'
    },
    {
      question: 'O que acontece se eu exceder o limite de voluntários?',
      answer: 'Entraremos em contato para ajudá-lo a fazer upgrade para um plano adequado. Você não perderá acesso aos seus dados ou funcionalidades.'
    },
    {
      question: 'Posso adicionar recursos extras?',
      answer: 'Sim! Oferecemos add-ons como SMS extras, armazenamento adicional e integrações personalizadas. Entre em contato para conhecer as opções.'
    },
    {
      question: 'Vocês oferecem desconto para igrejas?',
      answer: 'Sim! Temos descontos especiais para igrejas pequenas e organizações sem fins lucrativos. Entre em contato para saber mais sobre nossos programas.'
    }
  ]

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main>
        {/* Hero */}
        <div className="relative py-24 bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                Planos Transparentes
              </h1>
              <p className="mt-4 text-xl text-primary-100 max-w-3xl mx-auto">
                Escolha o plano ideal para sua igreja. Comece grátis e evolua conforme cresce.
              </p>
            </motion.div>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-8 flex items-center justify-center space-x-4"
            >
              <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-white' : 'text-primary-200'}`}>
                Mensal
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-8 w-14 items-center rounded-full bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    billingPeriod === 'yearly' ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingPeriod === 'yearly' ? 'text-white' : 'text-primary-200'}`}>
                Anual
              </span>
              <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                Economize 20%
              </span>
            </motion.div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative ${plan.highlight ? 'transform lg:scale-105 z-10' : ''}`}
                >
                  <div
                    className={`h-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl border-2 p-8 flex flex-col ${
                      plan.highlight
                        ? 'border-primary-500'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-600 text-white shadow-lg">
                          <StarIcon className="h-4 w-4 mr-1" />
                          Mais Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                        {plan.description}
                      </p>
                      <div className="mb-2">
                        <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
                          {billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly}
                        </span>
                        {plan.price.monthly !== 'Grátis' && (
                          <span className="text-gray-600 dark:text-gray-400 text-lg">/mês</span>
                        )}
                      </div>
                      {billingPeriod === 'yearly' && plan.price.monthly !== 'Grátis' && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Cobrado anualmente
                        </p>
                      )}
                    </div>

                    <ul className="space-y-4 mb-8 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          {feature.included ? (
                            <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XMarkIcon className="h-5 w-5 text-gray-300 dark:text-gray-600 mr-3 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={plan.href}
                      className={`block w-full py-4 px-6 rounded-xl text-center font-semibold transition-all duration-200 ${
                        plan.highlight
                          ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center">
                    <CheckIcon className="h-8 w-8 text-green-600 dark:text-green-400 mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      14 Dias Grátis
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sem cartão de crédito
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <CheckIcon className="h-8 w-8 text-green-600 dark:text-green-400 mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Cancele Quando Quiser
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sem compromisso
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <CheckIcon className="h-8 w-8 text-green-600 dark:text-green-400 mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Suporte Brasileiro
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Em português
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQs */}
        <div className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                Perguntas Frequentes
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                Tire suas dúvidas sobre planos e pagamentos
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <QuestionMarkCircleIcon className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {faq.question}
                      </span>
                    </div>
                    <svg
                      className={`h-5 w-5 text-gray-500 transform transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 bg-primary-600 dark:bg-primary-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Ainda tem dúvidas?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Nossa equipe está pronta para ajudá-lo a escolher o melhor plano
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-primary-600 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Falar com Especialista
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-lg text-white bg-transparent hover:bg-white/10 transition-all duration-200"
              >
                Começar Teste Grátis
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

