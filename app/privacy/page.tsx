import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Política de Privacidade
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-12">
            Última atualização: 01 de Janeiro de 2026
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <h2>1. Introdução</h2>
            <p>
              Bem-vindo ao Voluns. Esta Política de Privacidade explica como coletamos, usamos, 
              armazenamos e protegemos suas informações pessoais quando você usa nossa plataforma. 
              Estamos comprometidos com a proteção de sua privacidade e cumprimento da Lei Geral 
              de Proteção de Dados (LGPD).
            </p>

            <h2>2. Informações que Coletamos</h2>
            <h3>2.1 Informações Fornecidas por Você</h3>
            <ul>
              <li>Nome completo e email</li>
              <li>Telefone e endereço</li>
              <li>Informações da igreja e ministério</li>
              <li>Dados de voluntários cadastrados</li>
              <li>Informações de pagamento (processadas por terceiros)</li>
            </ul>

            <h3>2.2 Informações Coletadas Automaticamente</h3>
            <ul>
              <li>Endereço IP e dados de localização</li>
              <li>Tipo de navegador e dispositivo</li>
              <li>Páginas visitadas e tempo de acesso</li>
              <li>Cookies e tecnologias similares</li>
            </ul>

            <h2>3. Como Usamos Suas Informações</h2>
            <p>Utilizamos suas informações para:</p>
            <ul>
              <li>Fornecer e melhorar nossos serviços</li>
              <li>Processar transações e enviar notificações</li>
              <li>Personalizar sua experiência</li>
              <li>Enviar atualizações e comunicações importantes</li>
              <li>Garantir segurança e prevenir fraudes</li>
              <li>Cumprir obrigações legais</li>
            </ul>

            <h2>4. Compartilhamento de Informações</h2>
            <p>
              Não vendemos suas informações pessoais. Podemos compartilhar dados apenas com:
            </p>
            <ul>
              <li>Provedores de serviços essenciais (hospedagem, pagamentos)</li>
              <li>Autoridades legais quando exigido por lei</li>
              <li>Parceiros com seu consentimento explícito</li>
            </ul>

            <h2>5. Segurança de Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados:
            </p>
            <ul>
              <li>Criptografia de dados em trânsito e em repouso</li>
              <li>Controles de acesso rigorosos</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backups regulares e redundância</li>
              <li>Auditorias de segurança periódicas</li>
            </ul>

            <h2>6. Seus Direitos (LGPD)</h2>
            <p>Você tem direito a:</p>
            <ul>
              <li>Confirmar a existência de tratamento de dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar anonimização ou exclusão de dados</li>
              <li>Revogar consentimento a qualquer momento</li>
              <li>Portabilidade de dados para outro fornecedor</li>
              <li>Informações sobre compartilhamento de dados</li>
            </ul>

            <h2>7. Retenção de Dados</h2>
            <p>
              Mantemos suas informações pelo tempo necessário para fornecer nossos serviços ou 
              conforme exigido por lei. Você pode solicitar exclusão a qualquer momento através 
              de contato@voluns.com.
            </p>

            <h2>8. Cookies</h2>
            <p>
              Utilizamos cookies para melhorar sua experiência. Você pode gerenciar preferências 
              de cookies nas configurações do navegador. Consulte nossa 
              {' '}<a href="/cookies" className="text-primary-600 dark:text-primary-400 hover:underline">
                Política de Cookies
              </a>{' '}
              para mais detalhes.
            </p>

            <h2>9. Transferência Internacional de Dados</h2>
            <p>
              Seus dados são armazenados em servidores localizados no Brasil. Caso haja transferência 
              internacional, garantimos medidas adequadas de proteção conforme LGPD.
            </p>

            <h2>10. Menores de Idade</h2>
            <p>
              Nossos serviços são destinados a maiores de 18 anos. Não coletamos intencionalmente 
              dados de menores sem consentimento dos responsáveis.
            </p>

            <h2>11. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças 
              significativas por email ou através da plataforma.
            </p>

            <h2>12. Contato</h2>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre privacidade:
            </p>
            <ul>
              <li>Email: privacidade@voluns.com</li>
              <li>DPO (Encarregado de Dados): dpo@voluns.com</li>
              <li>Telefone: +55 (11) 9999-9999</li>
            </ul>

            <div className="mt-12 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Dúvidas sobre Privacidade?
              </h3>
              <p className="mb-4">
                Nossa equipe está pronta para esclarecer qualquer questão sobre como tratamos seus dados.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
              >
                Entre em Contato
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

