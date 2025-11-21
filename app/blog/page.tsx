import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ClockIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline'

export default function BlogPage() {
  const posts = [
    {
      title: 'Como Organizar Escalas de Louvor de Forma Eficiente',
      excerpt: 'Dicas práticas para criar escalas que funcionam e mantêm sua equipe engajada.',
      author: 'Maria Santos',
      date: '15 Jan 2026',
      readTime: '5 min',
      category: 'Dicas',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800'
    },
    {
      title: '10 Erros Comuns na Gestão de Voluntários',
      excerpt: 'Evite esses erros e melhore significativamente o engajamento da sua equipe.',
      author: 'João Silva',
      date: '10 Jan 2026',
      readTime: '7 min',
      category: 'Gestão',
      image: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=800'
    },
    {
      title: 'Novidades: Relatórios Avançados',
      excerpt: 'Conheça os novos recursos de analytics que vão transformar suas decisões.',
      author: 'Pedro Costa',
      date: '05 Jan 2026',
      readTime: '4 min',
      category: 'Produto',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    },
    {
      title: 'Guia Completo: Onboarding de Novos Voluntários',
      excerpt: 'Processo passo a passo para integrar novos membros à sua equipe.',
      author: 'Ana Oliveira',
      date: '28 Dez 2025',
      readTime: '6 min',
      category: 'Guias',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800'
    },
    {
      title: 'Segurança e LGPD: O que você precisa saber',
      excerpt: 'Como o Voluns protege os dados da sua igreja e garante conformidade.',
      author: 'Carlos Mendes',
      date: '20 Dez 2025',
      readTime: '8 min',
      category: 'Segurança',
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800'
    },
    {
      title: 'Case de Sucesso: Igreja Batista Central',
      excerpt: 'Como uma igreja de 500 membros otimizou sua gestão com o Voluns.',
      author: 'Maria Santos',
      date: '15 Dez 2025',
      readTime: '5 min',
      category: 'Casos de Sucesso',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800'
    }
  ]

  const categories = ['Todos', 'Dicas', 'Gestão', 'Produto', 'Guias', 'Segurança', 'Casos de Sucesso']

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main>
        {/* Hero */}
        <div className="relative py-24 bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              Blog Voluns
            </h1>
            <p className="mt-4 text-xl text-primary-100">
              Dicas, novidades e insights sobre gestão de voluntários
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 overflow-x-auto py-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    category === 'Todos'
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {posts.map((post, index) => (
                <article
                  key={index}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-all duration-200">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-600 text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <UserIcon className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-16 text-center">
              <button className="px-8 py-3 border-2 border-primary-600 dark:border-primary-500 text-primary-600 dark:text-primary-400 font-medium rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200">
                Carregar Mais Posts
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary-600 dark:bg-primary-700 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Assine Nossa Newsletter
              </h2>
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                Receba dicas exclusivas, novidades e insights diretamente no seu email
              </p>
              <div className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none text-gray-900"
                />
                <button className="px-8 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  Assinar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

