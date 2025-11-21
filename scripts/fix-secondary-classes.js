#!/usr/bin/env node

/**
 * Script para Corrigir Classes Secondary Automaticamente
 * Substitui classes secondary- por gray- com dark mode
 */

const fs = require('fs')
const path = require('path')

// Mapeamento de substituições
const REPLACEMENTS = [
  {
    pattern: /className="([^"]*)\btext-secondary-900\b([^"]*)"/g,
    replacement: 'className="$1text-gray-900 dark:text-white$2"'
  },
  {
    pattern: /className="([^"]*)\btext-secondary-700\b([^"]*)"/g,
    replacement: 'className="$1text-gray-700 dark:text-gray-300$2"'
  },
  {
    pattern: /className="([^"]*)\btext-secondary-600\b([^"]*)"/g,
    replacement: 'className="$1text-gray-600 dark:text-gray-400$2"'
  },
  {
    pattern: /className="([^"]*)\btext-secondary-500\b([^"]*)"/g,
    replacement: 'className="$1text-gray-500 dark:text-gray-400$2"'
  },
  {
    pattern: /className="([^"]*)\bbg-secondary-50\b([^"]*)"/g,
    replacement: 'className="$1bg-gray-50 dark:bg-gray-800$2"'
  },
  {
    pattern: /className="([^"]*)\bbg-secondary-100\b([^"]*)"/g,
    replacement: 'className="$1bg-gray-100 dark:bg-gray-700$2"'
  },
  {
    pattern: /className="([^"]*)\bborder-secondary-200\b([^"]*)"/g,
    replacement: 'className="$1border-gray-200 dark:border-gray-700$2"'
  },
  {
    pattern: /className="([^"]*)\bborder-secondary-300\b([^"]*)"/g,
    replacement: 'className="$1border-gray-300 dark:border-gray-600$2"'
  },
]

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8')
  let changed = false

  REPLACEMENTS.forEach(({ pattern, replacement }) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement)
      changed = true
    }
  })

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8')
    console.log(`✅ Corrigido: ${path.relative(process.cwd(), filePath)}`)
  }

  return changed
}

function main() {
  const filesToFix = [
    'components/layout/PageWrapper.tsx',
    'app/dashboard/events/[id]/assign/page.tsx',
    'app/dashboard/ministries/new/page.tsx',
    'app/dashboard/notifications/settings/page.tsx',
    'app/dashboard/reports/detailed/page.tsx',
    'app/dashboard/reports/export/page.tsx',
    'app/dashboard/volunteers/new/page.tsx',
  ]

  console.log('🔧 Corrigindo classes secondary- automaticamente...\n')

  let totalFixed = 0

  filesToFix.forEach((file) => {
    const fullPath = path.join(process.cwd(), file)
    if (fs.existsSync(fullPath)) {
      if (fixFile(fullPath)) {
        totalFixed++
      }
    } else {
      console.log(`⚠️  Arquivo não encontrado: ${file}`)
    }
  })

  console.log(`\n✅ Total de arquivos corrigidos: ${totalFixed}`)
}

main()

