import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function LicensesPage() {
  const licenses = [
    {
      category: 'Frontend Framework',
      libraries: [
        { name: 'Next.js', version: '14.0.3', license: 'MIT', url: 'https://nextjs.org' },
        { name: 'React', version: '18.2.0', license: 'MIT', url: 'https://react.dev' },
        { name: 'React DOM', version: '18.2.0', license: 'MIT', url: 'https://react.dev' }
      ]
    },
    {
      category: 'UI & Styling',
      libraries: [
        { name: 'Tailwind CSS', version: '3.3.5', license: 'MIT', url: 'https://tailwindcss.com' },
        { name: 'Headless UI', version: '1.7.17', license: 'MIT', url: 'https://headlessui.com' },
        { name: 'Heroicons', version: '2.0.18', license: 'MIT', url: 'https://heroicons.com' },
        { name: 'Framer Motion', version: '10.16.4', license: 'MIT', url: 'https://www.framer.com/motion' },
        { name: 'Lucide React', version: '0.292.0', license: 'ISC', url: 'https://lucide.dev' }
      ]
    },
    {
      category: 'Backend & Database',
      libraries: [
        { name: 'Supabase JS', version: '2.38.4', license: 'MIT', url: 'https://supabase.com' },
        { name: 'Supabase SSR', version: '0.1.0', license: 'MIT', url: 'https://supabase.com' },
        { name: 'Apollo Server', version: '5.0.0', license: 'MIT', url: 'https://www.apollographql.com' },
        { name: 'GraphQL', version: '16.11.0', license: 'MIT', url: 'https://graphql.org' },
        { name: 'Redis', version: '5.8.2', license: 'MIT', url: 'https://redis.io' }
      ]
    },
    {
      category: 'Forms & Validation',
      libraries: [
        { name: 'React Hook Form', version: '7.47.0', license: 'MIT', url: 'https://react-hook-form.com' },
        { name: 'Zod', version: '3.22.4', license: 'MIT', url: 'https://zod.dev' },
        { name: 'Hookform Resolvers', version: '3.3.2', license: 'MIT', url: 'https://github.com/react-hook-form/resolvers' }
      ]
    },
    {
      category: 'Utilities',
      libraries: [
        { name: 'Date-fns', version: '2.30.0', license: 'MIT', url: 'https://date-fns.org' },
        { name: 'CLSX', version: '2.0.0', license: 'MIT', url: 'https://github.com/lukeed/clsx' },
        { name: 'Class Variance Authority', version: '0.7.0', license: 'Apache-2.0', url: 'https://cva.style' },
        { name: 'Tailwind Merge', version: '2.0.0', license: 'MIT', url: 'https://github.com/dcastil/tailwind-merge' }
      ]
    },
    {
      category: 'Payments & Analytics',
      libraries: [
        { name: 'Stripe JS', version: '2.1.11', license: 'MIT', url: 'https://stripe.com' },
        { name: 'Recharts', version: '2.10.3', license: 'MIT', url: 'https://recharts.org' }
      ]
    },
    {
      category: 'Notifications',
      libraries: [
        { name: 'React Hot Toast', version: '2.4.1', license: 'MIT', url: 'https://react-hot-toast.com' }
      ]
    },
    {
      category: 'Development Tools',
      libraries: [
        { name: 'TypeScript', version: '5.3.2', license: 'Apache-2.0', url: 'https://www.typescriptlang.org' },
        { name: 'ESLint', version: '8.53.0', license: 'MIT', url: 'https://eslint.org' },
        { name: 'Prettier', version: '3.0.3', license: 'MIT', url: 'https://prettier.io' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Licenças Open Source
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              O Voluns é construído com o apoio de projetos open source incríveis. Esta página lista 
              todas as bibliotecas e frameworks que utilizamos, juntamente com suas respectivas licenças.
            </p>
          </div>

          {licenses.map((category) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {category.category}
              </h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Biblioteca
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Versão
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Licença
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Link
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {category.libraries.map((lib) => (
                        <tr key={lib.name} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {lib.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {lib.version}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                              {lib.license}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400">
                            <a href={lib.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              Visitar →
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-16">
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-8 border border-primary-200 dark:border-primary-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Sobre as Licenças
              </h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div>
                  <h4 className="font-semibold mb-2">MIT License</h4>
                  <p>
                    Licença permissiva que permite uso, cópia, modificação e distribuição do software, 
                    mantendo o aviso de copyright e a licença.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Apache License 2.0</h4>
                  <p>
                    Licença permissiva similar à MIT, mas com cláusulas explícitas sobre patentes e 
                    contribuições de código.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">ISC License</h4>
                  <p>
                    Licença permissiva funcionalmente equivalente à MIT, com texto mais simples.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Agradecemos a todos os mantenedores e contribuidores destes projetos open source 
              que tornam o Voluns possível.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Esta lista é atualizada regularmente. Última atualização: 01 de Janeiro de 2026
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

