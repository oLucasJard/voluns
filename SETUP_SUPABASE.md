# 🚀 Setup Supabase - Voluns

## Passo 1: Criar Projeto no Supabase (5 minutos)

1. Acesse: https://supabase.com/dashboard
2. Clique em **"New Project"**
3. Preencha:
   - Nome: `voluns`
   - Senha: `Voluns@2024` (anote!)
   - Região: **South America (São Paulo)**
4. Aguarde 2-3 minutos

## Passo 2: Copiar Credenciais (2 minutos)

1. No dashboard, vá em: **Settings → API**
2. Copie:
   - **Project URL** (ex: https://xxx.supabase.co)
   - **anon public** (chave pública)
   - **service_role** (clique em "Reveal" - chave privada)

## Passo 3: Configurar .env.local (1 minuto)

Crie o arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
NEXT_PUBLIC_SUPABASE_AUTH_REDIRECT_URL=http://localhost:3000/auth/callback
```

## Passo 4: Executar SQL (2 minutos)

1. No dashboard do Supabase, vá em: **SQL Editor**
2. Clique em **"+ New query"**
3. Abra o arquivo `database-setup.sql` deste projeto
4. **Copie TODO o conteúdo**
5. **Cole** no SQL Editor
6. Clique em **"Run"** (Ctrl+Enter)
7. Aguarde 1-2 minutos
8. ✅ Deve mostrar: "Setup concluído com sucesso!"

## Passo 5: Criar Usuário de Teste (1 minuto)

```bash
node scripts/create-test-user.js
```

## Passo 6: Iniciar Aplicação

```bash
npm run dev
```

## Passo 7: Testar Login

1. Acesse: http://localhost:3000/auth/login
2. Credenciais:
   - Email: `teste@voluns.com`
   - Senha: `Teste@2024`
3. ✅ Deve entrar no dashboard!

---

## ✅ Checklist

- [ ] Projeto Supabase criado
- [ ] Credenciais copiadas
- [ ] .env.local criado
- [ ] SQL executado sem erros
- [ ] Usuário de teste criado
- [ ] npm run dev funcionando
- [ ] Login funcionando
- [ ] Dashboard carregando

---

## 🆘 Problemas?

### Erro: "Supabase not configured"
- Verifique se `.env.local` existe
- Confirme que as variáveis estão corretas
- Reinicie: `Ctrl+C` → `npm run dev`

### Erro ao executar SQL
- Copie TODO o conteúdo do `database-setup.sql`
- Execute novamente

### Login não funciona
- Execute: `node scripts/create-test-user.js`
- Verifique em: **Authentication → Users** no Supabase

---

**Pronto! Sistema configurado e funcionando! 🎉**


