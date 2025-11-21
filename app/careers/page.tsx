import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { 
  MapPinIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  BriefcaseIcon 
} from '@heroicons/react/24/outline'

export default function CareersPage() {
  const benefits = [
    'Trabalho remoto',
    'Horário flexível',
    'Plano de saúde',
    'Vale refeição',
    'Equipamento fornecido',
    'Desenvolvimento profissional',
    'Ambiente colaborativo',
    'Impacto social real'
  ]

  const openings = [
    {
      title: 'Desenvolvedor Full-Stack Sênior',
      type: 'Tempo Integral',
      location: 'Remoto',
      salary: 'R$ 10.000 - R$ 15.000',
      description: 'Buscamos desenvolvedor experiente com React, Node.js e PostgreSQL para liderar projetos.'
    },
    {
      title: 'Designer UI/UX',
      type: 'Tempo Integral',
      location: 'Remoto',
      salary: 'R$ 7.000 - R$ 10.000',
      description: 'Profissional criativo para criar interfaces incríveis e experiências memoráveis.'
    },
    {
      title: 'Analista de Suporte ao Cliente',
      type: 'Tempo Integral',
      location: 'São Paulo ou Remoto',
      salary: 'R$ 4.000 - R$ 6.000',
      description: 'Pessoa empática e comunicativa para ajudar nossos clientes a terem sucesso.'
    },
    {
      title: 'Gerente de Produto',
      type: 'Tempo Integral',
      location: 'Remoto',
      salary: 'R$ 12.000 - R$ 18.000',
      description: 'Liderar a estratégia de produto e trabalhar com times multidisciplinares.'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main>
        {/* Hero */}
        <div className="relative py-24 bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              Carreiras no Voluns
            </h1>
            <p className="mt-4 text-xl text-primary-100">
              Junte-se a nós e ajude igrejas a transformarem sua gestão
            </p>
          </div>
        </div>

        {/* About Us */}
        <div className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
                Por que trabalhar no Voluns?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Somos uma startup em crescimento com missão de ajudar igrejas por todo o Brasil. 
                Trabalhamos com tecnologias modernas, priorizamos qualidade e valorizamos o equilíbrio 
                entre vida pessoal e profissional.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 max-w-4xl mx-auto">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-center h-10 w-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg mx-auto mb-3">
                    <svg className="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
              Vagas Abertas
            </h2>

            <div className="space-y-6 max-w-4xl mx-auto">
              {openings.map((job, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <BriefcaseIcon className="h-4 w-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPinIcon className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CurrencyDollarIcon className="h-4 w-4" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 lg:mt-0 lg:ml-6">
                      <button className="w-full lg:w-auto px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200">
                        Candidatar-se
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spontaneous Application */}
        <div className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-12 text-center border border-primary-200 dark:border-primary-800">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                Não encontrou a vaga ideal?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Envie seu currículo espontaneamente. Estamos sempre procurando talentos excepcionais 
                para se juntarem ao nosso time.
              </p>
              <a
                href="mailto:rh@voluns.com"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Enviar Currículo
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

