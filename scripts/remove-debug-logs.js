#!/usr/bin/env node

/**
 * 🧹 Script para Remover Logs de Debug
 * Remove console.log de debug após o sistema estar funcionando
 * Execute: node scripts/remove-debug-logs.js
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function print(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Arquivos para limpar
const filesToClean = [
  'components/auth/LoginForm.tsx',
  'components/auth/TestCredentials.tsx',
  'components/providers/Providers.tsx',
  'app/auth/login/page.tsx',
  'middleware.ts'
];

function removeDebugLogs(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    print(`⚠️  Arquivo não encontrado: ${filePath}`, 'yellow');
    return 0;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  const originalLength = content.length;
  
  // Padrões de log para remover
  const patterns = [
    // Console.logs específicos do debug
    /\s*console\.log\('🔐 \[.*?\].*?(?:,[\s\S]*?)?\);\s*\n/g,
    /\s*console\.log\('✅ \[.*?\].*?(?:,[\s\S]*?)?\);\s*\n/g,
    /\s*console\.log\('❌ \[.*?\].*?(?:,[\s\S]*?)?\);\s*\n/g,
    /\s*console\.log\('⚠️ \[.*?\].*?(?:,[\s\S]*?)?\);\s*\n/g,
    /\s*console\.error\('❌ \[.*?\].*?(?:,[\s\S]*?)?\);\s*\n/g,
  ];
  
  patterns.forEach(pattern => {
    content = content.replace(pattern, '');
  });
  
  const removed = originalLength - content.length;
  
  if (removed > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    print(`✅ ${filePath} - ${removed} caracteres removidos`, 'green');
    return 1;
  } else {
    print(`  ${filePath} - Nenhum log de debug encontrado`, 'blue');
    return 0;
  }
}

function main() {
  console.clear();
  print('═'.repeat(60), 'cyan');
  print('  🧹 Removendo Logs de Debug', 'cyan');
  print('═'.repeat(60), 'cyan');
  console.log('');
  
  print('Este script vai remover console.logs de debug do sistema.\n', 'blue');
  print('⚠️  ATENÇÃO: Faça backup ou commit antes de continuar!', 'yellow');
  print('⚠️  Esta ação não pode ser desfeita facilmente.\n', 'yellow');
  
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Deseja continuar? (s/N): ', (answer) => {
    if (answer.toLowerCase() !== 's') {
      print('\n❌ Operação cancelada.', 'yellow');
      rl.close();
      return;
    }
    
    print('\n🔄 Processando arquivos...\n', 'blue');
    
    let filesModified = 0;
    filesToClean.forEach(file => {
      filesModified += removeDebugLogs(file);
    });
    
    console.log('');
    print('═'.repeat(60), 'green');
    print(`  ✅ Concluído! ${filesModified} arquivo(s) modificado(s)`, 'green');
    print('═'.repeat(60), 'green');
    console.log('');
    
    if (filesModified > 0) {
      print('📝 Próximos passos:', 'blue');
      print('1. Teste o sistema para garantir que tudo funciona', 'blue');
      print('2. Faça commit das alterações', 'blue');
      print('3. Deploy para produção\n', 'blue');
    }
    
    rl.close();
  });
}

main();


