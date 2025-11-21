'use client'

import { 
  CalendarDaysIcon, 
  UserGroupIcon, 
  BellIcon, 
  ChartBarIcon,
  ClockIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  CloudIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export function Features() {
  const features = [
    {
      name: 'Gestão de Escalas',
      description: 'Crie e gerencie escalas ministeriais de forma intuitiva. Defina posições, convide voluntários e acompanhe confirmações em tempo real.',
      icon: CalendarDaysIcon,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      name: 'Gestão de Voluntários',
      description: 'Organize sua equipe de voluntários com perfis completos, habilidades, disponibilidade e histórico de serviços.',
      icon: UserGroupIcon,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      name: 'Notificações Inteligentes',
      description: 'Sistema de notificações automáticas para lembretes, confirmações e atualizações importantes.',
      icon: BellIcon,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    },
    {
      name: 'Relatórios e Analytics',
      description: 'Acompanhe métricas importantes como frequência de voluntários, taxa de confirmação e performance das equipes.',
      icon: ChartBarIcon,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      name: 'Gestão de Disponibilidade',
      description: 'Voluntários podem informar suas datas de indisponibilidade, facilitando o planejamento das escalas.',
      icon: ClockIcon,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
    },
    {
      name: 'Segurança e Privacidade',
      description: 'Dados protegidos com criptografia de ponta e conformidade com LGPD. Sua igreja em total segurança.',
      icon: ShieldCheckIcon,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
    },
    {
      name: 'Acesso Mobile',
      description: 'Interface responsiva e otimizada para dispositivos móveis. Acesse de qualquer lugar, a qualquer hora.',
      icon: DevicePhoneMobileIcon,
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-100 dark:bg-pink-900/20',
    },
    {
      name: 'Sincronização em Nuvem',
      description: 'Todos os dados sincronizados automaticamente na nuvem. Nunca perca informações importantes.',
      icon: CloudIcon,
      color: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/20',
    },
  ]

  return (
    <div id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="lg:text-center"
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
            ✨ Recursos Avançados
          </motion.div>
          
          <motion.h2 
            className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Tudo que sua igreja precisa
          </motion.h2>
          
          <motion.p 
            className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 lg:mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Uma plataforma completa e intuitiva para revolucionar a gestão de voluntários 
            e escalas ministeriais da sua igreja.
          </motion.p>
        </motion.div>

        <div className="mt-20">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.name} 
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-primary-400 dark:group-hover:border-primary-500">
                  <dt>
                    <div className={`mb-4 flex items-center justify-center h-12 w-12 rounded-lg ${feature.bgColor}`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                    </div>
                    <p className="text-lg leading-6 font-semibold text-gray-900 dark:text-white">
                      {feature.name}
                    </p>
                  </dt>
                  <dd className="mt-3 text-base text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </dd>
                </div>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* Call to action */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-primary-600 dark:bg-primary-700 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para revolucionar sua igreja?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Junte-se a centenas de igrejas que já transformaram sua gestão de voluntários com o Voluns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/signup"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-primary-600 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Começar Teste Grátis
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-lg text-white bg-transparent hover:bg-white/10 transition-all duration-200"
              >
                Ver Planos
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

