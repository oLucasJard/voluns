# 🔗 Como Conectar o Projeto ao GitHub

## 📋 Pré-requisitos

- ✅ Conta no GitHub criada
- ✅ Git configurado localmente (já feito)
- ✅ Repositório local inicializado (já feito)

---

## 🚀 Opção 1: Criar Repositório pelo GitHub (Recomendado)

### Passo 1: Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Preencha:
   - **Repository name:** `voluns` ou `escalaup-bycsr`
   - **Description:** "Sistema de Gestão de Voluntários para Igrejas"
   - **Visibility:** Private (recomendado) ou Public
   - ⚠️ **NÃO** marque "Initialize with README" (já temos)
   - ⚠️ **NÃO** adicione .gitignore ou license (já temos)

3. Clique em **"Create repository"**

### Passo 2: Conectar Repositório Local

No terminal, execute:

```bash
cd "C:\Users\lucas\OneDrive\Documentos\BRANDUP HUB\ESCALAUP BYCSR"

# Adicionar remote (substitua SEU-USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU-USUARIO/voluns.git

# Ou se preferir SSH:
# git remote add origin git@github.com:SEU-USUARIO/voluns.git

# Verificar remote
git remote -v

# Fazer push inicial
git push -u origin main
```

### Passo 3: Criar Branch Develop

```bash
# Criar e fazer push da branch develop
git checkout -b develop
git push -u origin develop

# Voltar para main
git checkout main
```

---

## 🚀 Opção 2: Usar GitHub CLI (gh)

Se você tem o GitHub CLI instalado:

```bash
cd "C:\Users\lucas\OneDrive\Documentos\BRANDUP HUB\ESCALAUP BYCSR"

# Login (se ainda não estiver logado)
gh auth login

# Criar repositório e fazer push
gh repo create voluns --private --source=. --remote=origin --push

# Criar branch develop
git checkout -b develop
git push -u origin develop
```

---

## ⚙️ Configurar GitHub Secrets (Para CI/CD)

Depois de conectar, configure os secrets para o CI/CD funcionar:

### 1. Acessar Settings do Repositório

1. Vá para: `https://github.com/SEU-USUARIO/voluns/settings/secrets/actions`

### 2. Adicionar Secrets Necessários

Clique em **"New repository secret"** e adicione cada um:

#### Supabase (OBRIGATÓRIO)
```
Nome: NEXT_PUBLIC_SUPABASE_URL
Valor: https://seu-projeto.supabase.co

Nome: NEXT_PUBLIC_SUPABASE_ANON_KEY
Valor: sua-anon-key-aqui

Nome: SUPABASE_SERVICE_ROLE_KEY
Valor: sua-service-role-key-aqui
```

#### Vercel (Para Deploy Automático)
```
Nome: VERCEL_TOKEN
Valor: seu-token-vercel

Nome: VERCEL_ORG_ID
Valor: seu-org-id

Nome: VERCEL_PROJECT_ID
Valor: seu-project-id
```

**Como obter tokens Vercel:**
1. Acesse: https://vercel.com/account/tokens
2. Crie um novo token
3. No projeto Vercel, vá em Settings → General
4. Copie "Project ID" e "Team ID"

#### Slack (Opcional - Para Notificações)
```
Nome: SLACK_WEBHOOK
Valor: https://hooks.slack.com/services/SEU/WEBHOOK/URL
```

---

## 🔒 Configurar Branch Protection (Recomendado)

### Proteger Branch Main

1. Vá para: `Settings → Branches → Add rule`
2. Branch name pattern: `main`
3. Marque:
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Do not allow bypassing the above settings**

4. Status checks requeridos:
   - `Lint e Type Check`
   - `Build`

### Proteger Branch Develop (Opcional)

Repita o processo acima para a branch `develop` com regras mais flexíveis.

---

## 📝 Workflow de Desenvolvimento

### Criar Nova Feature

```bash
# A partir da develop
git checkout develop
git pull origin develop

# Criar branch de feature
git checkout -b feature/nome-da-feature

# Fazer alterações e commits
git add .
git commit -m "feat: descrição da feature"

# Push da feature
git push origin feature/nome-da-feature
```

### Abrir Pull Request

1. Vá para o GitHub
2. Clique em "Compare & pull request"
3. Base: `develop` ← Compare: `feature/nome-da-feature`
4. Preencha descrição
5. Aguarde CI passar
6. Solicite review (se tiver equipe)
7. Merge quando aprovado

### Deploy para Staging

```bash
# Merge na develop dispara deploy automático para staging
git checkout develop
git merge feature/nome-da-feature
git push origin develop
# → Deploy automático via GitHub Actions
```

### Deploy para Produção

```bash
# Merge na main dispara deploy para produção
git checkout main
git merge develop
git push origin main
# → Deploy automático via GitHub Actions
```

---

## 🧪 Testar CI/CD

### Teste 1: Push Simples
```bash
# Fazer uma pequena alteração
echo "# Test CI" >> README.md
git add README.md
git commit -m "test: validar CI"
git push origin main
```

Verifique: `https://github.com/SEU-USUARIO/voluns/actions`

### Teste 2: Pull Request
```bash
git checkout -b test/ci-validation
echo "# CI Test" >> TESTE.md
git add TESTE.md
git commit -m "test: PR workflow"
git push origin test/ci-validation
```

No GitHub, abra um PR e veja os checks rodarem.

---

## 🔍 Verificar Conexão

```bash
# Ver remotes configurados
git remote -v

# Ver status
git status

# Ver branches
git branch -a

# Ver último commit
git log --oneline -1
```

**Output esperado:**
```
origin  https://github.com/SEU-USUARIO/voluns.git (fetch)
origin  https://github.com/SEU-USUARIO/voluns.git (push)
```

---

## ⚠️ Troubleshooting

### Erro: "Permission denied"
```bash
# Verificar autenticação
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Se usar HTTPS, o Windows pedirá credenciais
# Se usar SSH, configure chaves SSH
```

### Erro: "Remote origin already exists"
```bash
# Remover remote existente
git remote remove origin

# Adicionar novamente
git remote add origin https://github.com/SEU-USUARIO/voluns.git
```

### Erro: "Updates were rejected"
```bash
# Se for o primeiro push e der conflito
git pull origin main --allow-unrelated-histories
git push origin main
```

---

## 📊 Monitorar Projeto

Após conectar, você pode monitorar:

- **Actions:** `https://github.com/SEU-USUARIO/voluns/actions`
- **Branches:** `https://github.com/SEU-USUARIO/voluns/branches`
- **Commits:** `https://github.com/SEU-USUARIO/voluns/commits/main`
- **Network:** `https://github.com/SEU-USUARIO/voluns/network`

---

## 🎉 Próximos Passos

Após conectar ao GitHub:

1. ✅ Configurar secrets (Supabase, Vercel)
2. ✅ Configurar branch protection
3. ✅ Adicionar colaboradores (se houver)
4. ✅ Configurar Vercel para deploy automático
5. ✅ Testar workflow completo
6. ✅ Documentar processo da equipe

---

**🔗 Link útil:** https://docs.github.com/pt/get-started/quickstart

