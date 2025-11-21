import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function CookiesPage() {
  const cookieTypes = [
    {
      name: 'Cookies Essenciais',
      description: 'Necessários para o funcionamento básico do site',
      examples: ['Sessão de login', 'Preferências de idioma', 'Carrinho de compras'],
      duration: 'Sessão ou até 1 ano',
      required: true
    },
    {
      name: 'Cookies de Performance',
      description: 'Coletam informações sobre como você usa o site',
      examples: ['Google Analytics', 'Tempo de carregamento', 'Páginas visitadas'],
      duration: 'Até 2 anos',
      required: false
    },
    {
      name: 'Cookies de Funcionalidade',
      description: 'Lembram suas escolhas e personalizam sua experiência',
      examples: ['Tema claro/escuro', 'Tamanho de fonte', 'Layout preferido'],
      duration: 'Até 1 ano',
      required: false
    },
    {
      name: 'Cookies de Marketing',
      description: 'Rastreiam suas visitas para mostrar anúncios relevantes',
      examples: ['Facebook Pixel', 'Google Ads', 'Remarketing'],
      duration: 'Até 2 anos',
      required: false
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Política de Cookies
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-12">
            Última atualização: 01 de Janeiro de 2026
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <h2>O que são Cookies?</h2>
            <p>
              Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você 
              visita um site. Eles ajudam o site a lembrar suas preferências e melhorar sua 
              experiência de navegação.
            </p>

            <h2>Como Usamos Cookies</h2>
            <p>
              O Voluns utiliza cookies para:
            </p>
            <ul>
              <li>Manter você conectado à sua conta</li>
              <li>Lembrar suas preferências (tema, idioma, etc.)</li>
              <li>Analisar como você usa a plataforma</li>
              <li>Melhorar nossos serviços e experiência do usuário</li>
              <li>Personalizar conteúdo e recomendações</li>
              <li>Garantir segurança e prevenir fraudes</li>
            </ul>

            <h2>Tipos de Cookies que Utilizamos</h2>
            
            {cookieTypes.map((type) => (
              <div key={type.name} className="my-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white m-0">
                    {type.name}
                  </h3>
                  {type.required ? (
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded">
                      Essencial
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded">
                      Opcional
                    </span>
                  )}
                </div>
                <p className="mb-4">{type.description}</p>
                <div className="text-sm">
                  <p className="font-medium mb-2">Exemplos:</p>
                  <ul className="list-disc list-inside mb-2">
                    {type.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                  <p className="text-gray-500 dark:text-gray-400">
                    Duração: {type.duration}
                  </p>
                </div>
              </div>
            ))}

            <h2>Cookies de Terceiros</h2>
            <p>
              Utilizamos serviços de terceiros que podem definir seus próprios cookies:
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> Para análise de tráfego e comportamento</li>
              <li><strong>Stripe:</strong> Para processamento seguro de pagamentos</li>
              <li><strong>Supabase:</strong> Para autenticação e banco de dados</li>
              <li><strong>Vercel:</strong> Para hospedagem e performance</li>
            </ul>

            <h2>Como Gerenciar Cookies</h2>
            <h3>Através do Navegador</h3>
            <p>
              Você pode gerenciar ou excluir cookies através das configurações do seu navegador:
            </p>
            <ul>
              <li><strong>Chrome:</strong> Configurações → Privacidade e segurança → Cookies</li>
              <li><strong>Firefox:</strong> Configurações → Privacidade e segurança</li>
              <li><strong>Safari:</strong> Preferências → Privacidade</li>
              <li><strong>Edge:</strong> Configurações → Cookies e permissões do site</li>
            </ul>

            <h3>Através da Nossa Plataforma</h3>
            <p>
              Você pode ajustar suas preferências de cookies nas configurações da sua conta ou 
              através do banner de cookies que aparece ao acessar o site pela primeira vez.
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
              <p className="m-0">
                <strong>Atenção:</strong> Bloquear todos os cookies pode afetar a funcionalidade 
                do site. Alguns recursos podem não funcionar corretamente sem cookies essenciais.
              </p>
            </div>

            <h2>Cookies de Sessão vs Persistentes</h2>
            <h3>Cookies de Sessão</h3>
            <p>
              São temporários e expiram quando você fecha o navegador. Usados para manter você 
              conectado durante a navegação.
            </p>

            <h3>Cookies Persistentes</h3>
            <p>
              Permanecem no seu dispositivo por um período definido. Usados para lembrar suas 
              preferências entre visitas.
            </p>

            <h2>Seus Direitos</h2>
            <p>Você tem o direito de:</p>
            <ul>
              <li>Aceitar ou recusar cookies não essenciais</li>
              <li>Alterar suas preferências a qualquer momento</li>
              <li>Solicitar informações sobre cookies armazenados</li>
              <li>Excluir cookies do seu dispositivo</li>
            </ul>

            <h2>Atualizações desta Política</h2>
            <p>
              Podemos atualizar esta Política de Cookies ocasionalmente. A data de "Última atualização" 
              no topo da página indicará quando a política foi revisada pela última vez.
            </p>

            <h2>Contato</h2>
            <p>
              Dúvidas sobre cookies? Entre em contato:
            </p>
            <ul>
              <li>Email: privacidade@voluns.com</li>
              <li>Consulte também nossa{' '}
                <a href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Política de Privacidade
                </a>
              </li>
            </ul>

            <div className="mt-12 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Prefere Controlar Seus Cookies Agora?
              </h3>
              <p className="mb-4">
                Acesse as configurações da sua conta para ajustar suas preferências de cookies.
              </p>
              <a
                href="/dashboard/settings"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
              >
                Ir para Configurações
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

