# 🚀 Guia de Deploy - Voluns

Este guia cobre o processo completo de deploy do Voluns para staging e produção.

---

## 📋 Pré-requisitos

- [ ] Conta Vercel configurada
- [ ] Repositório GitHub configurado
- [ ] Supabase projeto em produção
- [ ] Variáveis de ambiente preparadas
- [ ] DNS configurado (para produção)

---

## 🌐 Ambientes

### **Development** (Local)
- URL: `http://localhost:3000`
- Banco: Supabase Development
- Variáveis: `.env.local`

### **Staging** (Pré-produção)
- URL: `https://staging.voluns.com` ou Vercel preview
- Branch: `develop`
- Banco: Supabase Staging
- Deploy: Automático via GitHub Actions

### **Production** (Produção)
- URL: `https://voluns.com`
- Branch: `main`
- Banco: Supabase Production
- Deploy: Automático via GitHub Actions (com aprovação)

---

## 🔧 Passo 1: Configurar Vercel

### 1.1. Criar Conta e Projeto

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Criar projeto (na raiz do repositório)
vercel
```

### 1.2. Configurar Variáveis de Ambiente na Vercel

No dashboard da Vercel (`vercel.com/dashboard`):

1. Vá em **Settings** → **Environment Variables**
2. Adicione as seguintes variáveis para cada ambiente:

**Produção:**
```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto-prod.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-prod
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role-prod
NEXT_PUBLIC_APP_URL=https://voluns.com
NODE_ENV=production

# Email (escolha um)
SENDGRID_API_KEY=...
SENDGRID_FROM_EMAIL=noreply@voluns.com
# OU
RESEND_API_KEY=...
RESEND_FROM_EMAIL=noreply@voluns.com

# Stripe
STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Sentry (opcional)
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=...

# Redis (opcional)
REDIS_URL=redis://...
```

**Staging:**
```
# Mesmas variáveis mas com valores de staging/test
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto-staging.supabase.co
...
```

### 1.3. Conectar ao GitHub

1. No dashboard da Vercel, vá em **Git** → **Connect Git Repository**
2. Selecione seu repositório
3. Configure:
   - **Production Branch**: `main`
   - **Install Command**: `npm install`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

---

## 🔐 Passo 2: Configurar GitHub Secrets

No seu repositório GitHub, vá em **Settings** → **Secrets and variables** → **Actions**:

```
VERCEL_TOKEN=seu-token-vercel
VERCEL_ORG_ID=seu-org-id
VERCEL_PROJECT_ID=seu-project-id

NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Sentry (opcional)
SENTRY_AUTH_TOKEN=...
SENTRY_ORG=...
SENTRY_PROJECT=...

# Slack (opcional)
SLACK_WEBHOOK=https://hooks.slack.com/services/...
```

**Como obter IDs da Vercel:**
```bash
vercel project ls
vercel whoami
```

---

## 🎯 Passo 3: Estratégia de Branches

```
main (production)
  ↑
develop (staging)
  ↑
feature/* (desenvolvimento)
```

### Workflow:

1. **Feature Development**
   ```bash
   git checkout -b feature/nova-funcionalidade
   # Desenvolver...
   git push origin feature/nova-funcionalidade
   # Criar Pull Request para develop
   ```

2. **Staging**
   ```bash
   # Após merge no develop
   git checkout develop
   git pull
   # Deploy automático para staging
   ```

3. **Production**
   ```bash
   # Após testar em staging
   git checkout main
   git merge develop
   git push origin main
   # Deploy automático para produção
   ```

---

## 🚀 Passo 4: Deploy Manual (Primeira Vez)

### 4.1. Deploy Staging

```bash
# Certifique-se de estar no branch develop
git checkout develop

# Deploy para staging
vercel --prod
```

### 4.2. Deploy Production

```bash
# Certifique-se de estar no branch main
git checkout main

# Deploy para produção
vercel --prod
```

---

## 🔄 Passo 5: Deploy Automático (CI/CD)

Após configurar os arquivos de workflow, o deploy será automático:

### Staging (Develop Branch)
```bash
git push origin develop
# GitHub Actions → Deploy automático para staging
```

### Production (Main Branch)
```bash
git push origin main
# GitHub Actions → Testes → Deploy para produção
```

---

## 🧪 Passo 6: Validar Deploy

### Checklist Pós-Deploy:

**Staging:**
- [ ] Aplicação carrega sem erros
- [ ] Login funciona
- [ ] Dashboard carrega
- [ ] API endpoints respondem
- [ ] Banco de dados conectado
- [ ] Emails sendo enviados (modo teste)
- [ ] Logs no Sentry (se configurado)

**Production:**
- [ ] Todos os itens de staging ✅
- [ ] DNS aponta corretamente
- [ ] SSL/HTTPS funcionando
- [ ] Performance adequada (Lighthouse)
- [ ] Backup automático ativo
- [ ] Monitoramento ativo
- [ ] Error tracking funcionando

---

## 🔍 Passo 7: Monitoramento

### 7.1. Vercel Analytics

Ative no dashboard:
- **Analytics** → Habilitar
- **Speed Insights** → Habilitar

### 7.2. Uptime Monitoring

Configure em:
- **UptimeRobot** (gratuito)
- **Pingdom**
- **StatusCake**

### 7.3. Error Tracking

Se configurou Sentry:
- Acesse `sentry.io/organizations/seu-org/issues/`
- Configure alertas por email/Slack

---

## 🐛 Troubleshooting

### Erro: "Build failed"

```bash
# Verificar logs
vercel logs seu-deployment-url

# Testar build localmente
npm run build
```

### Erro: "Environment variables not found"

1. Verificar se todas as env vars estão configuradas na Vercel
2. Verificar se o nome está correto (case-sensitive)
3. Redesployar: `vercel --prod --force`

### Erro: "Cannot connect to database"

1. Verificar se `NEXT_PUBLIC_SUPABASE_URL` está correto
2. Verificar se as chaves não expiraram
3. Verificar firewall/IP allowlist no Supabase

### Deploy lento

1. Otimizar dependências: `npm prune`
2. Verificar tamanho do bundle: `ANALYZE=true npm run build`
3. Considerar Vercel Edge Functions

---

## 📊 Rollback

Se algo der errado em produção:

### Via Vercel Dashboard:
1. Vá em **Deployments**
2. Encontre o último deploy funcional
3. Clique em **⋯** → **Promote to Production**

### Via CLI:
```bash
vercel rollback
```

---

## 🔄 Atualização de Dependências

```bash
# Atualizar dependências
npm update

# Verificar vulnerabilidades
npm audit

# Corrigir vulnerabilidades
npm audit fix

# Testar
npm run build
npm run type-check

# Commitar e deployar
git add package.json package-lock.json
git commit -m "chore: update dependencies"
git push
```

---

## 📝 Checklist de Deploy

### Antes do Deploy:
- [ ] Testes passando localmente
- [ ] Sem erros de TypeScript
- [ ] Sem warnings de lint
- [ ] Variáveis de ambiente configuradas
- [ ] SQL scripts aplicados no banco
- [ ] Documentação atualizada
- [ ] CHANGELOG.md atualizado

### Durante o Deploy:
- [ ] GitHub Actions passando
- [ ] Build concluído sem erros
- [ ] Deployment URL acessível

### Após o Deploy:
- [ ] Smoke tests executados
- [ ] Performance verificada
- [ ] Error tracking limpo
- [ ] Logs sem erros críticos
- [ ] Time notificado

---

## 🎉 Sucesso!

Se tudo estiver ✅, seu Voluns está no ar!

**URLs:**
- Production: `https://voluns.com`
- Staging: `https://staging.voluns.com`
- Dashboard Vercel: `vercel.com/dashboard`

---

## 📞 Suporte

Problemas com deploy?
- Docs Vercel: https://vercel.com/docs
- Docs Next.js: https://nextjs.org/docs/deployment
- Issues: Abra no GitHub

**Última atualização:** Outubro 2024

