'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ClockIcon 
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/Button'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: 'Email',
      details: 'contato@voluns.com',
      link: 'mailto:contato@voluns.com'
    },
    {
      icon: PhoneIcon,
      title: 'Telefone',
      details: '+55 (11) 9999-9999',
      link: 'tel:+5511999999999'
    },
    {
      icon: MapPinIcon,
      title: 'Endereço',
      details: 'São Paulo, SP - Brasil',
      link: null
    },
    {
      icon: ClockIcon,
      title: 'Horário',
      details: 'Seg - Sex: 9h às 18h',
      link: null
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Entre em Contato
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Estamos aqui para ajudar. Envie sua mensagem e retornaremos em breve.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informações de Contato */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Informações de Contato
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Precisa de ajuda ou tem alguma dúvida? Nossa equipe está pronta para atendê-lo.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="mt-1 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          {item.details}
                        </a>
                      ) : (
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          {item.details}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Suporte Prioritário
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Clientes dos planos Crescimento e Pro têm acesso a suporte prioritário via WhatsApp e telefone.
                </p>
                <Button variant="outline" className="w-full">
                  Falar com Especialista
                </Button>
              </div>
            </div>

            {/* Formulário */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Envie sua Mensagem
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Mensagem Enviada!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Obrigado pelo contato. Retornaremos em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Assunto *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Como podemos ajudar?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Descreva sua dúvida ou necessidade..."
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Enviar Mensagem
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

