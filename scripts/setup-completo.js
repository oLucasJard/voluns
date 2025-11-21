#!/usr/bin/env node

/**
 * 🚀 Script de Setup Completo - Voluns
 * Este script guia você através de toda a configuração do Supabase
 * Execute: node scripts/setup-completo.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Cores para o terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function print(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function printHeader(message) {
  console.log('');
  print('═'.repeat(60), 'cyan');
  print(`  ${message}`, 'bright');
  print('═'.repeat(60), 'cyan');
  console.log('');
}

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.clear();
  
  printHeader('🚀 Setup Completo do Voluns - Supabase');
  
  print('Este assistente vai guiá-lo através da configuração completa.', 'blue');
  print('Tempo estimado: 5-10 minutos\n', 'blue');
  
  // Passo 1: Verificar se .env.local existe
  const envPath = path.join(process.cwd(), '.env.local');
  const envExists = fs.existsSync(envPath);
  
  if (envExists) {
    print('✅ Arquivo .env.local já existe', 'green');
    const response = await question('\nDeseja sobrescrevê-lo? (s/N): ');
    if (response.toLowerCase() !== 's') {
      print('\n📝 Mantenha o arquivo .env.local existente.', 'yellow');
      print('Certifique-se de que as variáveis estão corretas.\n', 'yellow');
    }
  }
  
  // Passo 2: Coletar informações do Supabase
  printHeader('📋 Passo 1: Informações do Supabase');
  
  print('Você precisa ter um projeto criado no Supabase.', 'blue');
  print('Se ainda não criou, acesse: https://supabase.com/dashboard\n', 'blue');
  
  const hasProject = await question('Você já criou um projeto no Supabase? (S/n): ');
  
  if (hasProject.toLowerCase() === 'n') {
    print('\n📚 Por favor, siga estas instruções:\n', 'yellow');
    print('1. Acesse https://supabase.com', 'yellow');
    print('2. Clique em "New Project"', 'yellow');
    print('3. Preencha nome, senha e região', 'yellow');
    print('4. Aguarde o projeto ser criado (2-3 minutos)', 'yellow');
    print('5. Execute este script novamente\n', 'yellow');
    rl.close();
    return;
  }
  
  print('\n🔑 Agora vamos coletar as credenciais do Supabase.\n', 'green');
  print('No dashboard do Supabase:', 'blue');
  print('1. Vá em Settings → API', 'blue');
  print('2. Você verá 3 informações importantes\n', 'blue');
  
  await question('Pressione ENTER quando estiver pronto...');
  
  console.log('');
  const supabaseUrl = await question('Cole a PROJECT URL (ex: https://xxxx.supabase.co): ');
  const anonKey = await question('Cole a ANON PUBLIC key: ');
  const serviceKey = await question('Cole a SERVICE_ROLE key: ');
  
  // Validar entradas
  if (!supabaseUrl.includes('supabase.co')) {
    print('\n❌ URL inválida! Deve conter "supabase.co"', 'red');
    rl.close();
    return;
  }
  
  if (!anonKey.startsWith('eyJ') || !serviceKey.startsWith('eyJ')) {
    print('\n❌ As chaves devem começar com "eyJ"', 'red');
    rl.close();
    return;
  }
  
  // Passo 3: Criar arquivo .env.local
  printHeader('📝 Passo 2: Criando arquivo .env.local');
  
  const envContent = `# ==============================================
# SUPABASE - CONFIGURADO AUTOMATICAMENTE
# ==============================================

NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}
SUPABASE_SERVICE_ROLE_KEY=${serviceKey}

# ==============================================
# APP
# ==============================================

NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# ==============================================
# AUTENTICAÇÃO
# ==============================================

NEXT_PUBLIC_SUPABASE_AUTH_REDIRECT_URL=http://localhost:3000/auth/callback

# ==============================================
# EMAIL - OPCIONAL
# ==============================================

# Descomente e preencha se quiser enviar emails
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=seu-email@gmail.com
# SMTP_PASS=sua-senha-de-app

# ==============================================
# STRIPE - OPCIONAL
# ==============================================

# Descomente e preencha se quiser aceitar pagamentos
# STRIPE_PUBLIC_KEY=pk_test_...
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...

# ==============================================
# REDIS - OPCIONAL
# ==============================================

# REDIS_URL=redis://localhost:6379
`;
  
  fs.writeFileSync(envPath, envContent);
  print('✅ Arquivo .env.local criado com sucesso!\n', 'green');
  
  // Passo 4: Instruções para executar migrations
  printHeader('🗄️ Passo 3: Executar Migrations SQL');
  
  print('Agora você precisa criar as tabelas no banco de dados.\n', 'blue');
  print('Siga estas instruções:\n', 'yellow');
  
  print('1. No dashboard do Supabase, vá em SQL EDITOR', 'yellow');
  print('2. Clique em "+ New query"', 'yellow');
  print('3. Execute as migrations NA ORDEM:\n', 'yellow');
  
  const migrations = [
    '001_initial_schema.sql (OBRIGATÓRIA)',
    '002_gamification.sql (OBRIGATÓRIA)',
    '003_chat.sql (OBRIGATÓRIA)',
    '004_analytics.sql (Recomendada)',
    '005_audit.sql (Recomendada)',
    '006_monitoring.sql (Opcional)',
    '007_performance.sql (Recomendada)',
    '008_improvements.sql (Opcional)',
  ];
  
  migrations.forEach((migration, index) => {
    print(`   ${index + 1}. sql-scripts/migrations/${migration}`, 'cyan');
  });
  
  print('\n⚠️  IMPORTANTE: Execute UMA POR VEZ e na ORDEM!', 'red');
  print('⚠️  Aguarde cada migration terminar antes de executar a próxima.\n', 'red');
  
  await question('Pressione ENTER quando terminar de executar AS 3 PRIMEIRAS migrations...');
  
  // Passo 5: Criar usuário de teste
  printHeader('👤 Passo 4: Criar Usuário de Teste');
  
  const createUser = await question('Deseja criar um usuário de teste automaticamente? (S/n): ');
  
  if (createUser.toLowerCase() !== 'n') {
    print('\n🔄 Criando usuário de teste...', 'blue');
    
    try {
      // Tentar carregar o Supabase
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, serviceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });
      
      // Criar igreja
      const { data: church, error: churchError } = await supabase
        .from('churches')
        .insert({
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Igreja Teste',
          description: 'Igreja para testes do sistema',
          plan: 'essential'
        })
        .select()
        .single();
      
      if (churchError && !churchError.message.includes('duplicate')) {
        throw churchError;
      }
      
      print('✅ Igreja criada', 'green');
      
      // Criar usuário
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: 'teste@voluns.com',
        password: 'Teste@2024',
        email_confirm: true,
        user_metadata: {
          name: 'Usuário Teste',
          role: 'admin'
        }
      });
      
      if (authError && !authError.message.includes('already registered')) {
        throw authError;
      }
      
      print('✅ Usuário de autenticação criado', 'green');
      
      // Criar perfil
      const userId = authData?.user?.id || (await supabase.auth.admin.listUsers())
        .data.users.find(u => u.email === 'teste@voluns.com')?.id;
      
      if (userId) {
        await supabase
          .from('users')
          .upsert({
            id: userId,
            email: 'teste@voluns.com',
            name: 'Usuário Teste',
            role: 'admin',
            church_id: '550e8400-e29b-41d4-a716-446655440000'
          });
        
        print('✅ Perfil do usuário criado', 'green');
        
        // Criar ministério
        await supabase
          .from('ministries')
          .insert({
            church_id: '550e8400-e29b-41d4-a716-446655440000',
            name: 'Ministério de Louvor',
            description: 'Ministério responsável pelo louvor e adoração',
            leader_id: userId,
            is_active: true
          });
        
        print('✅ Ministério criado\n', 'green');
      }
      
      print('🎉 Usuário de teste criado com sucesso!\n', 'green');
      
    } catch (error) {
      print(`\n⚠️  Erro ao criar usuário automaticamente: ${error.message}`, 'yellow');
      print('\n📝 Você pode criar manualmente depois executando:', 'yellow');
      print('   node scripts/create-test-user.js\n', 'yellow');
    }
  }
  
  // Passo 6: Instruções finais
  printHeader('✅ Configuração Concluída!');
  
  print('Próximos passos:\n', 'green');
  print('1. 🔄 Reinicie o servidor de desenvolvimento:', 'blue');
  print('   Ctrl+C (se estiver rodando)', 'cyan');
  print('   npm run dev\n', 'cyan');
  
  print('2. 🔐 Faça login no sistema:', 'blue');
  print('   Acesse: http://localhost:3000/auth/login', 'cyan');
  print('   Email: teste@voluns.com', 'cyan');
  print('   Senha: Teste@2024\n', 'cyan');
  
  print('3. 📊 Verifique o dashboard:', 'blue');
  print('   Após login, você deve ver o dashboard completo', 'cyan');
  print('   Sem erros no console\n', 'cyan');
  
  print('4. 🧹 Remova logs de debug:', 'blue');
  print('   Quando tudo estiver funcionando, execute:', 'cyan');
  print('   npm run remove-logs\n', 'cyan');
  
  print('5. 📚 Consulte a documentação:', 'blue');
  print('   Ver: GUIA_CONFIGURACAO_SUPABASE.md', 'cyan');
  print('   Ver: docs/README.md\n', 'cyan');
  
  print('═'.repeat(60), 'green');
  print('  🎉 Setup completo! Seu Voluns está pronto para uso!', 'bright');
  print('═'.repeat(60), 'green');
  console.log('');
  
  rl.close();
}

// Executar o script
main().catch(error => {
  print(`\n❌ Erro: ${error.message}`, 'red');
  rl.close();
  process.exit(1);
});


