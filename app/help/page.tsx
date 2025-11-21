'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { 
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    {
      icon: BookOpenIcon,
      title: 'Primeiros Passos',
      description: 'Como começar a usar o Voluns',
      articles: 5,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: UserGroupIcon,
      title: 'Gestão de Voluntários',
      description: 'Cadastro, perfis e permissões',
      articles: 8,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: CalendarDaysIcon,
      title: 'Escalas e Eventos',
      description: 'Criação e gerenciamento de escalas',
      articles: 12,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      icon: BellIcon,
      title: 'Notificações',
      description: 'Configuração de alertas e lembretes',
      articles: 6,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
    },
    {
      icon: ChartBarIcon,
      title: 'Relatórios',
      description: 'Analytics e métricas',
      articles: 7,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Segurança e Privacidade',
      description: 'LGPD e proteção de dados',
      articles: 4,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/20'
    }
  ]

  const popularArticles = [
    'Como criar minha primeira escala?',
    'Como adicionar voluntários?',
    'Como configurar notificações?',
    'Como gerar relatórios?',
    'Como gerenciar ministérios?',
    'Como definir permissões de usuários?'
  ]

  const resources = [
    {
      icon: VideoCameraIcon,
      title: 'Tutoriais em Vídeo',
      description: 'Aprenda visualmente com nossos vídeos passo a passo',
      link: '#',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/20'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Fale Conosco',
      description: 'Entre em contato com nossa equipe de suporte',
      link: '/contact',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: AcademicCapIcon,
      title: 'Documentação Completa',
      description: 'Acesse toda a documentação técnica',
      link: '/docs',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="relative py-24 bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              Como Podemos Ajudar?
            </h1>
            <p className="mt-4 text-xl text-primary-100">
              Encontre respostas rápidas para suas dúvidas
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por artigos de ajuda..."
                  className="block w-full pl-12 pr-4 py-4 border border-transparent rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
              Categorias de Ajuda
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <a
                  key={category.title}
                  href="#"
                  className="relative group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600"
                >
                  <div className={`h-12 w-12 ${category.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                    <category.icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {category.description}
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {category.articles} artigos
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Articles */}
        <div className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
              Artigos Mais Populares
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {popularArticles.map((article, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center p-4 bg-white dark:bg-gray-900 rounded-lg hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 group"
                >
                  <QuestionMarkCircleIcon className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-4 flex-shrink-0" />
                  <span className="text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {article}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
              Outros Recursos
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {resources.map((resource) => (
                <a
                  key={resource.title}
                  href={resource.link}
                  className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 group"
                >
                  <div className={`inline-flex h-16 w-16 ${resource.bgColor} rounded-full items-center justify-center mb-4`}>
                    <resource.icon className={`h-8 w-8 ${resource.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {resource.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="py-16 bg-primary-600 dark:bg-primary-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Ainda Precisa de Ajuda?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Nossa equipe está pronta para atendê-lo
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-primary-600 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Entrar em Contato
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// Importações necessárias
import { CalendarDaysIcon, BellIcon, ChartBarIcon, ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline'

