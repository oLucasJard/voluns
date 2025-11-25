# 🙏 Voluns - Sistema de Gestão de Voluntários

> Plataforma completa para gestão de voluntários em igrejas

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)](https://tailwindcss.com/)

---

## 🚀 Quick Start

### 1. Instalação
```bash
git clone https://github.com/oLucasJard/voluns.git
cd voluns
npm install
```

### 2. Configuração
```bash
cp env.example .env.local
# Configure suas variáveis de ambiente do Supabase:
# NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
# SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
```

### 3. Criar Usuários de Teste
```bash
npm run create-test-users
```
⚠️ **IMPORTANTE:** Execute este comando antes de usar o sistema pela primeira vez!

### 4. Executar
```bash
npm run dev -- -p 5000
```

Acesse: **http://localhost:5000**

---

## 🔐 Credenciais de Teste

### ⚠️ Primeiro: Criar Usuários no Supabase
Execute antes de fazer login:
```bash
npm run create-test-users
```

### 👑 Administrador
- **Email:** `teste@voluns.com`
- **Senha:** `Teste@2024`
- **Acesso:** Completo ao sistema

### 👥 Líder de Ministério
- **Email:** `lider@voluns.com`
- **Senha:** `Teste@2024`
- **Acesso:** Gerencia ministérios e escalas

### ✅ Voluntário
- **Email:** `voluntario@voluns.com`
- **Senha:** `Teste@2024`
- **Acesso:** Visualiza escalas e confirma participação

📖 **[Guia Completo de Credenciais](docs/guides/CREDENCIAIS_TESTE.md)**

---

## 📚 Documentação

### 📖 Essenciais
- **[SETUP.md](SETUP.md)** - Instalação detalhada
- **[DEPLOY.md](DEPLOY.md)** - Deploy em produção
- **[ROADMAP.md](ROADMAP.md)** - Planejamento futuro

### 📘 Documentação Técnica
- **[docs/INDEX.md](docs/INDEX.md)** - Índice completo da documentação
- **[docs/guides/](docs/guides/)** - Guias técnicos para desenvolvimento
- **[docs/reports/](docs/reports/)** - Relatórios de correções e melhorias

---

## ✨ Funcionalidades

### Gestão de Voluntários
- ✅ Cadastro completo de voluntários
- ✅ Perfis personalizados por ministério
- ✅ Histórico de participação

### Escalas Inteligentes
- ✅ Criação automática de escalas
- ✅ Notificações por email e SMS
- ✅ Confirmação de presença

### Dashboard Executivo
- ✅ Métricas em tempo real
- ✅ Relatórios personalizados
- ✅ Análise de engajamento

### Gamificação
- ✅ Sistema de pontos
- ✅ Badges e conquistas
- ✅ Ranking de voluntários

### Comunicação
- ✅ Chat em tempo real
- ✅ Notificações push
- ✅ Templates de mensagens

---

## 🛠️ Tecnologias

### Frontend
- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações

### Backend
- **Supabase** - Backend as a Service
- **PostgreSQL** - Banco de dados
- **Edge Functions** - Serverless

### Features
- **PWA** - Progressive Web App
- **Real-time** - WebSockets
- **GraphQL** - API flexível
- **Sentry** - Error tracking

---

## 📂 Estrutura do Projeto

```
voluns/
├── app/                    # Páginas Next.js (App Router)
├── components/             # Componentes React
├── lib/                    # Utilitários e serviços
├── docs/                   # 📚 Documentação
│   ├── guides/            # Guias técnicos
│   └── reports/           # Relatórios
├── public/                 # Arquivos estáticos
├── scripts/                # Scripts utilitários
├── sql-scripts/            # Migrações do banco
└── types/                  # Definições TypeScript
```

---

## 🧪 Testes

### Executar Todos os Testes
```bash
npm test
```

### Executar com Cobertura
```bash
npm run test:coverage
```

### Validar CSS
```bash
npm run validate-css
```

### Validação Completa
```bash
npm run validate
```

---

## 🚀 Scripts Disponíveis

```bash
npm run dev            # Servidor de desenvolvimento
npm run build          # Build de produção
npm run start          # Servidor de produção
npm run lint           # Verificar código
npm test               # Executar testes
npm run validate-css   # Validar classes CSS
npm run check-dark-mode # Verificar dark mode
```

---

## 📖 Guias de Desenvolvimento

### Para Começar
1. Leia o [SETUP.md](SETUP.md)
2. Configure as variáveis de ambiente
3. Use as [credenciais de teste](docs/guides/CREDENCIAIS_TESTE.md)

### Padrões de Código
- **[CSS Guidelines](docs/guides/CSS_GUIDELINES.md)** - Padrões de CSS
- **[Debug Mode](docs/guides/DEBUG_MODE.md)** - Sistema de debug

### Arquitetura
- **[Funcionalidades](docs/FUNCTIONALITIES_IMPLEMENTED.md)** - Features implementadas
- **[Schema do Banco](docs/SCHEMA_SUPABASE_COMPLETO.md)** - Estrutura do banco
- **[Backend](docs/BACKEND_IMPROVEMENTS.md)** - Melhorias no backend

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Suporte

- **Documentação:** [docs/INDEX.md](docs/INDEX.md)
- **Issues:** [GitHub Issues](https://github.com/yourusername/voluns/issues)
- **Email:** suporte@voluns.com

---

## 🎉 Agradecimentos

Desenvolvido com ❤️ para ajudar igrejas a gerenciar seus voluntários de forma eficiente.

---

**Versão:** 1.0.0  
**Última atualização:** 20/10/2025
