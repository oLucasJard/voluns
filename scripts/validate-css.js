#!/usr/bin/env node

/**
 * Script de Validação de Classes CSS
 * Detecta classes Tailwind problemáticas antes de build
 */

const fs = require('fs')
const path = require('path')

// Classes que devem ter suporte dark mode
const CLASSES_REQUIRING_DARK_MODE = [
  'bg-white',
  'text-gray-700',
  'text-gray-900',
  'border-gray-300',
  'bg-gray-50',
  'bg-gray-100',
]

// Classes proibidas (devem ser substituídas)
const FORBIDDEN_CLASSES = [
  { pattern: /text-secondary-(?!foreground)/, suggestion: 'text-gray-* dark:text-gray-*' },
  { pattern: /bg-secondary-(?!foreground)/, suggestion: 'bg-gray-* dark:bg-gray-*' },
  { pattern: /border-secondary-/, suggestion: 'border-gray-* dark:border-gray-*' },
]

// Diretórios para verificar
const DIRECTORIES = ['components', 'app']

// Extensões de arquivo
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js']

let totalErrors = 0
let totalWarnings = 0

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath)

  files.forEach((file) => {
    const filePath = path.join(dirPath, file)
    
    if (fs.statSync(filePath).isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles)
      }
    } else if (EXTENSIONS.some(ext => file.endsWith(ext))) {
      arrayOfFiles.push(filePath)
    }
  })

  return arrayOfFiles
}

function checkForbiddenClasses(content, filePath) {
  const errors = []
  const lines = content.split('\n')

  lines.forEach((line, index) => {
    FORBIDDEN_CLASSES.forEach(({ pattern, suggestion }) => {
      if (pattern.test(line)) {
        errors.push({
          file: filePath,
          line: index + 1,
          code: line.trim(),
          message: `Classe proibida detectada. Use: ${suggestion}`,
          severity: 'ERROR'
        })
        totalErrors++
      }
    })
  })

  return errors
}

function checkDarkModeSupport(content, filePath) {
  const warnings = []
  const lines = content.split('\n')

  lines.forEach((line, index) => {
    CLASSES_REQUIRING_DARK_MODE.forEach((className) => {
      if (line.includes(className) && line.includes('className=')) {
        // Verificar se a mesma linha tem dark:
        if (!line.includes('dark:')) {
          warnings.push({
            file: filePath,
            line: index + 1,
            code: line.trim(),
            message: `Classe ${className} sem suporte dark mode`,
            severity: 'WARNING'
          })
          totalWarnings++
        }
      }
    })
  })

  return warnings
}

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  
  const errors = checkForbiddenClasses(content, filePath)
  const warnings = checkDarkModeSupport(content, filePath)

  return { errors, warnings }
}

function main() {
  console.log('🔍 Validando Classes CSS Tailwind...\n')

  const allFiles = []
  
  DIRECTORIES.forEach((dir) => {
    const fullPath = path.join(process.cwd(), dir)
    if (fs.existsSync(fullPath)) {
      const files = getAllFiles(fullPath)
      allFiles.push(...files)
    }
  })

  console.log(`📁 Verificando ${allFiles.length} arquivos...\n`)

  const allErrors = []
  const allWarnings = []

  allFiles.forEach((file) => {
    const { errors, warnings } = validateFile(file)
    allErrors.push(...errors)
    allWarnings.push(...warnings)
  })

  // Exibir erros
  if (allErrors.length > 0) {
    console.log('🚨 ERROS ENCONTRADOS:\n')
    allErrors.forEach((error) => {
      console.log(`❌ ${error.file}:${error.line}`)
      console.log(`   ${error.message}`)
      console.log(`   Código: ${error.code}\n`)
    })
  }

  // Exibir warnings
  if (allWarnings.length > 0) {
    console.log('⚠️  AVISOS:\n')
    allWarnings.slice(0, 10).forEach((warning) => {
      console.log(`⚠️  ${warning.file}:${warning.line}`)
      console.log(`   ${warning.message}\n`)
    })
    
    if (allWarnings.length > 10) {
      console.log(`   ... e mais ${allWarnings.length - 10} avisos\n`)
    }
  }

  // Resumo
  console.log('📊 RESUMO:')
  console.log(`   Total de arquivos: ${allFiles.length}`)
  console.log(`   Erros: ${totalErrors}`)
  console.log(`   Avisos: ${totalWarnings}`)
  console.log('')

  if (totalErrors === 0 && totalWarnings === 0) {
    console.log('✅ Nenhum problema encontrado! CSS está padronizado.\n')
    process.exit(0)
  } else if (totalErrors === 0) {
    console.log('✅ Nenhum erro crítico. Avisos podem ser ignorados.\n')
    process.exit(0)
  } else {
    console.log('❌ Corrija os erros antes de fazer build!\n')
    process.exit(1)
  }
}

main()

