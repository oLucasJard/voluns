# 🎨 Diretrizes de CSS - Voluns

## 📋 Objetivo

Garantir consistência visual, suporte completo a dark mode e prevenir erros de compilação.

---

## ✅ Classes Permitidas

### Cores de Texto
```tsx
// ✅ CORRETO
<div className="text-gray-700 dark:text-gray-300">
<div className="text-gray-900 dark:text-white">
<div className="text-gray-600 dark:text-gray-400">

// ❌ ERRADO
<div className="text-secondary-700">
<div className="text-gray-700"> {/* Sem dark mode */}
```

### Cores de Fundo
```tsx
// ✅ CORRETO
<div className="bg-white dark:bg-gray-800">
<div className="bg-gray-50 dark:bg-gray-900">
<div className="bg-gray-100 dark:bg-gray-700">

// ❌ ERRADO
<div className="bg-secondary-100">
<div className="bg-white"> {/* Sem dark mode */}
```

### Bordas
```tsx
// ✅ CORRETO
<div className="border border-gray-300 dark:border-gray-600">
<div className="border-t border-gray-200 dark:border-gray-700">

// ❌ ERRADO
<div className="border-secondary-300">
<div className="border-gray-300"> {/* Sem dark mode */}
```

---

## 🎨 Paleta de Cores Aprovada

### Cores Principais
- **Primary:** `primary-{50-900}` - Azul principal
- **Success:** `success-{50-900}` - Verde para sucesso
- **Warning:** `warning-{50-900}` - Amarelo para avisos
- **Error:** `error-{50-900}` - Vermelho para erros

### Cores Neutras (Sempre com Dark Mode)
- **Gray:** `gray-{50-900}` - Cinzas padrão
- **White/Black:** Sempre com variante dark

### ❌ Cores Proibidas
- **Secondary-*** - Não usar! Use `gray-*` com dark mode

---

## 🛠️ Classes Utilitárias

### Input Fields
```tsx
// Use a classe global
<input className="input-field" />

// Ou customize com dark mode
<input className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
```

### Buttons
```tsx
// Use as variantes do componente Button
<Button variant="primary">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>

// Todas as variantes já têm dark mode!
```

### Cards
```tsx
// Use a classe global
<div className="card">...</div>

// Ou customize
<div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
```

---

## 🌓 Regras de Dark Mode

### Regra 1: Sempre Adicione Dark Mode
```tsx
// ✅ SEMPRE faça isso
<div className="bg-white dark:bg-gray-800">
<p className="text-gray-900 dark:text-white">

// ❌ NUNCA faça isso
<div className="bg-white">
<p className="text-gray-900">
```

### Regra 2: Use Pares Consistentes
```tsx
// ✅ Pares recomendados
bg-white          → dark:bg-gray-800
bg-gray-50        → dark:bg-gray-900
bg-gray-100       → dark:bg-gray-700
text-gray-700     → dark:text-gray-300
text-gray-900     → dark:text-white
border-gray-200   → dark:border-gray-700
border-gray-300   → dark:border-gray-600
```

### Regra 3: Verifique Contraste
```tsx
// ✅ Bom contraste em ambos modos
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-white">Texto legível</p>
</div>

// ❌ Contraste ruim no dark mode
<div className="bg-gray-900 dark:bg-gray-900">
  <p className="text-gray-900 dark:text-gray-900">Invisível!</p>
</div>
```

---

## 🔍 Ferramentas de Validação

### 1. Teste Automatizado
```bash
npm run test:css
```
**O que faz:**
- Detecta classes `secondary-*` sem dark mode
- Verifica cobertura de dark mode
- Valida classes em componentes UI

### 2. Validador de CSS
```bash
npm run validate-css
```
**O que faz:**
- Escaneia todos os arquivos
- Encontra classes proibidas
- Sugere correções

### 3. Verificador de Dark Mode
```bash
npm run check-dark-mode
```
**O que faz:**
- Verifica todas as classes de cor
- Identifica classes sem dark mode
- Gera relatório detalhado

---

## 🚨 Prevenção de Erros

### Antes de Commit
```bash
# Execute validação completa
npm run validate

# Inclui:
# - Type checking
# - Linting
# - Validação CSS
# - Todos os testes
```

### Antes de Build
```bash
# Validação automática no build
npm run build

# Automaticamente executa:
# - validate-css (prebuild)
# - type-check
# - build
```

### Durante Desenvolvimento
```bash
# Use o validador CSS
npm run validate-css

# Corrija os erros antes de continuar
```

---

## 📝 Checklist de PR/Commit

Antes de fazer commit, verifique:

- [ ] Todas as cores têm dark mode?
- [ ] Não usa classes `secondary-*`?
- [ ] Inputs têm classe `.input-field` ou dark mode?
- [ ] Botões usam componente `<Button>`?
- [ ] Cards usam classe `.card` ou dark mode?
- [ ] Testou visualmente no dark mode?
- [ ] `npm run validate-css` passou?
- [ ] `npm test` passou?

---

## 🔧 Como Corrigir Erros Comuns

### Erro: "text-secondary-700 não tem dark mode"
```tsx
// ❌ Errado
<label className="text-secondary-700">Label</label>

// ✅ Correto
<label className="text-gray-700 dark:text-gray-300">Label</label>
```

### Erro: "bg-white sem dark mode"
```tsx
// ❌ Errado
<div className="bg-white">

// ✅ Correto
<div className="bg-white dark:bg-gray-800">
```

### Erro: "border-secondary-300"
```tsx
// ❌ Errado
<input className="border-secondary-300" />

// ✅ Correto
<input className="border-gray-300 dark:border-gray-600" />

// ✅ Ou use a classe global
<input className="input-field" />
```

---

## 🎯 Melhores Práticas

### 1. Use Classes Globais
```tsx
// ✅ Melhor
<input className="input-field" />
<div className="card" />
<Button variant="primary" />

// ⚠️ Evite duplicação
<input className="w-full px-4 py-3 border..." />
```

### 2. Sempre Pense em Dark Mode
```tsx
// ✅ Ao adicionar uma classe de cor, adicione o dark mode
<div className="bg-blue-50 dark:bg-blue-900/20">
<p className="text-blue-700 dark:text-blue-300">
```

### 3. Teste Visualmente
- Abra a aplicação
- Alterne para dark mode
- Verifique se tudo está legível
- Procure por elementos "invisíveis"

### 4. Use o Validador
```bash
# Antes de cada commit
npm run validate-css

# Corrija TODOS os erros reportados
```

---

## 📚 Recursos

### Documentação
- [Tailwind Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [Color Palette](https://tailwindcss.com/docs/customizing-colors)

### Ferramentas
- `npm run validate-css` - Validar CSS
- `npm run check-dark-mode` - Verificar dark mode
- `npm run test:css` - Testes automatizados

### Exemplos
- Veja `components/ui/Button.tsx` - Dark mode perfeito
- Veja `components/ui/Input.tsx` - Dark mode perfeito
- Veja `app/auth/login/page.tsx` - Dark mode perfeito

---

## ⚡ Quick Reference

```tsx
// CORES DE TEXTO
text-gray-700 dark:text-gray-300    // Labels
text-gray-900 dark:text-white       // Títulos
text-gray-600 dark:text-gray-400    // Descrições
text-gray-500 dark:text-gray-400    // Placeholders

// FUNDOS
bg-white dark:bg-gray-800           // Cards, modais
bg-gray-50 dark:bg-gray-900         // Backgrounds
bg-gray-100 dark:bg-gray-700        // Hover states

// BORDAS
border-gray-200 dark:border-gray-700  // Borders gerais
border-gray-300 dark:border-gray-600  // Inputs

// ÍCONES
text-gray-400 dark:text-gray-500    // Ícones decorativos
text-gray-600 dark:text-gray-400    // Ícones de ação
```

---

## 🎉 Conclusão

Seguindo estas diretrizes, você:
- ✅ Evita erros de compilação
- ✅ Garante dark mode consistente
- ✅ Melhora acessibilidade
- ✅ Mantém código padronizado
- ✅ Facilita manutenção

**Lembre-se:** Sempre teste no dark mode! 🌓

