#!/usr/bin/env node

/**
 * Script para configurar o Supabase automaticamente
 * Execute: node setup-supabase.js
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando Supabase para o Voluns...\n');

// Credenciais extraídas da string PostgreSQL fornecida
const SUPABASE_CONFIG = {
  url: 'https://vemwzoakozriarknqepk.supabase.co',
  projectId: 'vemwzoakozriarknqepk'
};

// Template do arquivo .env.local
const ENV_TEMPLATE = `# Supabase Configuration
# Credenciais extraídas da string de conexão PostgreSQL

# URL do seu projeto Supabase
NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_CONFIG.url}

# Chave pública (anon key) - OBTER NO DASHBOARD DO SUPABASE
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui

# Chave de serviço (service role key) - OBTER NO DASHBOARD DO SUPABASE
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui

# Configurações de autenticação
NEXT_PUBLIC_SUPABASE_AUTH_REDIRECT_URL=http://localhost:3000/auth/callback

# Configurações de desenvolvimento
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Configurações de email (opcional - para notificações)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Configurações do Stripe (opcional - para pagamentos)
STRIPE_PUBLIC_KEY=pk_test_your-stripe-public-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
`;

// Verificar se .env.local já existe
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('⚠️  Arquivo .env.local já existe!');
  console.log('📝 Por favor, edite manualmente e adicione as chaves do Supabase.\n');
} else {
  // Criar arquivo .env.local
  fs.writeFileSync(envPath, ENV_TEMPLATE);
  console.log('✅ Arquivo .env.local criado com sucesso!\n');
}

// Instruções
console.log('📋 PRÓXIMOS PASSOS:\n');
console.log('1. 🔑 Obter chaves do Supabase:');
console.log(`   • Acesse: https://supabase.com/dashboard/project/${SUPABASE_CONFIG.projectId}`);
console.log('   • Vá em Settings → API');
console.log('   • Copie a "anon public" key');
console.log('   • Copie a "service_role" key\n');

console.log('2. ✏️  Editar .env.local:');
console.log('   • Substitua "sua-anon-key-aqui" pela anon key');
console.log('   • Substitua "sua-service-role-key-aqui" pela service role key\n');

console.log('3. 🗄️  Executar script SQL:');
console.log('   • No dashboard do Supabase, vá em SQL Editor');
console.log('   • Copie o conteúdo de "supabase-setup-safe.sql"');
console.log('   • Cole e execute no editor SQL\n');

console.log('4. 🔄 Reiniciar servidor:');
console.log('   • Ctrl+C para parar o servidor');
console.log('   • npm run dev para reiniciar\n');

console.log('5. ✅ Verificar configuração:');
console.log('   • Acesse: http://localhost:3000/demo');
console.log('   • Verifique o card "Status do Supabase"');
console.log('   • Todos devem estar ✅ verdes\n');

console.log('🎉 Após seguir estes passos, seu Voluns estará configurado!');
console.log('\n📚 Para mais detalhes, consulte: CONFIGURAR_SUPABASE.md');






