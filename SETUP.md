# 🚀 Guia de Configuração - Voluns

Este guia irá ajudá-lo a configurar o Voluns do zero até a produção.

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)
- Git instalado
- Editor de código (recomendado: VS Code)

---

## 🔧 Passo 1: Clonar e Instalar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/voluns.git
cd voluns

# Instale as dependências
npm install
```

---

## 🗄️ Passo 2: Configurar Supabase

### 2.1. Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Escolha um nome (ex: "voluns-production")
4. Escolha uma senha forte para o banco
5. Selecione uma região próxima aos seus usuários
6. Clique em "Create new project"

### 2.2. Executar Scripts SQL

1. No dashboard do Supabase, vá em **SQL Editor**
2. Clique em "New query"
3. Copie o conteúdo de `sql-scripts/supabase-setup-complete.sql`
4. Cole no editor e clique em "Run"
5. Aguarde a execução (pode levar alguns segundos)

### 2.3. Aplicar Melhorias (Opcional mas Recomendado)

Execute os seguintes scripts na ordem:

1. `sql-scripts/performance-optimization.sql`
2. `sql-scripts/monitoring-system.sql`
3. `sql-scripts/audit-system.sql`

---

## 🔑 Passo 3: Configurar Variáveis de Ambiente

### 3.1. Obter Chaves do Supabase

1. No dashboard do Supabase, vá em **Settings** → **API**
2. Copie as seguintes informações:
   - **URL**: Na seção "Project URL"
   - **anon key**: Na seção "Project API keys" → "anon public"
   - **service_role key**: Na seção "Project API keys" → "service_role" (⚠️ Mantenha secreta!)

### 3.2. Criar Arquivo .env.local

```bash
# Copie o arquivo de exemplo
cp env.example .env.local
```

### 3.3. Preencher as Variáveis

Edite `.env.local`:

```env
# ======================
# SUPABASE (OBRIGATÓRIO)
# ======================
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role-aqui

# ======================
# APP
# ======================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# ======================
# AUTH
# ======================
NEXT_PUBLIC_SUPABASE_AUTH_REDIRECT_URL=http://localhost:3000/auth/callback

# ======================
# EMAIL (Opcional)
# ======================
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=seu-email@gmail.com
# SMTP_PASS=sua-senha-de-app

# ======================
# STRIPE (Opcional)
# ======================
# STRIPE_PUBLIC_KEY=pk_test_...
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...

# ======================
# REDIS (Opcional)
# ======================
# REDIS_URL=redis://localhost:6379
```

---

## 👤 Passo 4: Criar Usuário de Teste

```bash
# Execute o script de criação de usuário
node scripts/create-test-user.js
```

Isso criará:
- Uma igreja de teste
- Um usuário admin: `teste@voluns.com` / senha: `Teste@2024`
- Um ministério de exemplo

---

## 🚀 Passo 5: Executar o Projeto

```bash
# Modo desenvolvimento
npm run dev

# Abra http://localhost:3000
```

### 5.1. Testar Login

1. Acesse `http://localhost:3000/auth/login`
2. Use as credenciais:
   - Email: `teste@voluns.com`
   - Senha: `Teste@2024`
3. Você deve ser redirecionado para o dashboard

---

## ✅ Passo 6: Validação

Execute esta checklist para garantir que tudo está funcionando:

- [ ] Aplicação inicia sem erros
- [ ] Consegue fazer login
- [ ] Dashboard carrega corretamente
- [ ] Pode criar um novo evento
- [ ] Pode adicionar voluntários
- [ ] Notificações funcionam
- [ ] Perfil de usuário carrega

---

## 🌐 Passo 7: Deploy para Produção

### 7.1. Vercel (Recomendado)

1. Crie conta em [https://vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente no dashboard da Vercel
4. Deploy automático!

```bash
# Ou via CLI
npm install -g vercel
vercel
```

### 7.2. Configurar Variáveis de Ambiente na Vercel

No dashboard da Vercel, vá em **Settings** → **Environment Variables** e adicione:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL (com seu domínio de produção)
```

### 7.3. Atualizar Redirect URLs no Supabase

1. No dashboard do Supabase, vá em **Authentication** → **URL Configuration**
2. Adicione seu domínio de produção aos "Site URL" e "Redirect URLs"

---

## 🔒 Segurança em Produção

### Checklist de Segurança:

- [ ] Service Role Key NÃO está exposta publicamente
- [ ] Row Level Security (RLS) está ativo em todas as tabelas
- [ ] Rate limiting configurado
- [ ] HTTPS obrigatório
- [ ] Variáveis de ambiente configuradas no host
- [ ] `.env.local` no `.gitignore`
- [ ] Políticas de backup configuradas
- [ ] Monitoramento de erros ativo

---

## 📊 Monitoramento (Opcional)

### Sentry para Error Tracking

1. Crie conta em [https://sentry.io](https://sentry.io)
2. Crie um projeto Next.js
3. Adicione ao `.env.local`:

```env
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
```

4. Instale o SDK:

```bash
npm install @sentry/nextjs
```

---

## 🆘 Solução de Problemas

### Erro: "Supabase não configurado"
- Verifique se o `.env.local` existe
- Confirme que as variáveis estão corretas
- Reinicie o servidor de desenvolvimento

### Erro: "Cannot find module"
- Execute `npm install` novamente
- Limpe o cache: `rm -rf .next node_modules`
- Reinstale: `npm install`

### Banco de dados vazio
- Execute os scripts SQL novamente
- Crie o usuário de teste com `node scripts/create-test-user.js`

### Página em branco após login
- Verifique o console do navegador para erros
- Confirme que as políticas RLS estão configuradas
- Verifique se o usuário tem uma igreja associada

---

## 📚 Próximos Passos

Após configuração básica:

1. [ ] Configurar email (SMTP)
2. [ ] Configurar Stripe para pagamentos
3. [ ] Adicionar logo e branding personalizados
4. [ ] Configurar domínio personalizado
5. [ ] Habilitar Analytics
6. [ ] Configurar backup automático

---

## 💬 Suporte

- **Documentação**: `docs/`
- **Issues**: GitHub Issues
- **Email**: suporte@voluns.com

---

**🎉 Parabéns! Seu Voluns está configurado e pronto para uso!**

