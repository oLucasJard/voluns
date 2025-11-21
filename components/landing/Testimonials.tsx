'use client'

import { StarIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export function Testimonials() {
  const testimonials = [
    {
      body: 'O Voluns revolucionou nossa gestão de voluntários. Antes era um caos com planilhas e grupos de WhatsApp. Agora tudo é organizado e os voluntários adoram a facilidade.',
      author: {
        name: 'Pastor João Silva',
        handle: 'Igreja Batista Central',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      rating: 5,
    },
    {
      body: 'A interface é intuitiva e as notificações automáticas são perfeitas. Nossos voluntários confirmam muito mais rápido agora. Recomendo para qualquer igreja!',
      author: {
        name: 'Pastora Maria Santos',
        handle: 'Igreja Metodista Esperança',
        imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      rating: 5,
    },
    {
      body: 'O suporte é excepcional e a plataforma é muito robusta. Conseguimos gerenciar nossa igreja de 200+ membros sem problemas. Vale cada centavo investido.',
      author: {
        name: 'Pastor Carlos Oliveira',
        handle: 'Igreja Presbiteriana Renovada',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      rating: 5,
    },
    {
      body: 'Como líder de louvor, o Voluns me salvou! Consigo organizar as escalas do ministério de música de forma muito mais eficiente. Os voluntários adoram receber as notificações.',
      author: {
        name: 'Ana Costa',
        handle: 'Líder de Louvor - Igreja Pentecostal Vida',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      rating: 5,
    },
    {
      body: 'A gestão de disponibilidade é incrível! Os voluntários podem informar quando não estão disponíveis e isso facilita muito o planejamento das escalas.',
      author: {
        name: 'Pedro Almeida',
        handle: 'Coordenador de Ministérios - Igreja Cristã Maranata',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      rating: 5,
    },
    {
      body: 'Os relatórios são muito úteis para entender o engajamento dos nossos voluntários. A plataforma é completa e fácil de usar. Recomendo!',
      author: {
        name: 'Pastora Lúcia Fernandes',
        handle: 'Igreja Assembleia de Deus Central',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      rating: 5,
    },
  ]

  return (
    <div id="testimonials" className="py-24 bg-gray-50 dark:bg-gray-900">
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
            ✨ Depoimentos Reais
          </motion.div>
          
          <motion.h2 
            className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            O que pastores e líderes dizem
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Conheça as histórias de transformação de pastores e líderes
          </motion.p>
        </motion.div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="relative bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <ChatBubbleLeftRightIcon className="h-8 w-8 text-primary-600" />
                </div>

                <div className="flex items-center space-x-1 mb-4">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={`h-5 w-5 ${
                        rating < testimonial.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                
                <blockquote className="text-gray-900 dark:text-white mb-6 relative z-10">
                  <p className="text-lg leading-relaxed">"{testimonial.body}"</p>
                </blockquote>
                
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-200 dark:ring-primary-800"
                      src={testimonial.author.imageUrl}
                      alt={testimonial.author.name}
                    />
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      {testimonial.author.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.author.handle}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-primary-600 dark:bg-primary-700 rounded-xl p-8 text-white overflow-hidden">
            <h3 className="text-2xl font-bold mb-4">
              Junte-se a centenas de igrejas satisfeitas
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Comece sua transformação hoje mesmo. Teste grátis por 14 dias.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/signup"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-primary-600 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Começar Teste Grátis
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-lg text-white bg-transparent hover:bg-white/10 transition-all duration-200"
              >
                Falar com Especialista
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

