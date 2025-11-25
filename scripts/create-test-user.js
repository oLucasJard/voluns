const { createClient } = require('@supabase/supabase-js')

// Substitua pelas suas credenciais do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key'

if (supabaseUrl === 'https://your-project.supabase.co' || supabaseServiceKey === 'your-service-role-key') {
  console.log('❌ Por favor, configure suas credenciais do Supabase no arquivo .env.local')
  console.log('')
  console.log('Você precisa:')
  console.log('1. Criar um projeto no Supabase (https://supabase.com)')
  console.log('2. Copiar a URL do projeto e a Service Role Key')
  console.log('3. Colar no arquivo .env.local')
  console.log('')
  console.log('Exemplo do .env.local:')
  console.log('NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co')
  console.log('SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createTestUser() {
  try {
    console.log('🚀 Criando usuários de teste...\n')
    
    // Verificar se a igreja de teste já existe
    const churchId = '550e8400-e29b-41d4-a716-446655440000'
    const { data: existingChurch } = await supabase
      .from('churches')
      .select('*')
      .eq('id', churchId)
      .single()
    
    let church
    if (existingChurch) {
      console.log('✅ Igreja de teste já existe\n')
      church = existingChurch
    } else {
      // Criar igreja de teste
      const { data: newChurch, error: churchError } = await supabase
        .from('churches')
        .insert({
          id: churchId,
          name: 'Igreja Teste',
          description: 'Igreja para testes do sistema',
          plan: 'essential'
        })
        .select()
        .single()

      if (churchError) {
        console.error('❌ Erro ao criar igreja:', churchError)
        return
      }
      church = newChurch
      console.log('✅ Igreja criada:', church.name, '\n')
    }

    // Usuários de teste
    const testUsers = [
      {
        email: 'teste@voluns.com',
        password: 'Teste@2024',
        name: 'Admin Teste',
        role: 'admin',
        label: '👑 Administrador'
      },
      {
        email: 'lider@voluns.com',
        password: 'Teste@2024',
        name: 'Líder Teste',
        role: 'leader',
        label: '👥 Líder de Ministério'
      },
      {
        email: 'voluntario@voluns.com',
        password: 'Teste@2024',
        name: 'Voluntário Teste',
        role: 'volunteer',
        label: '✅ Voluntário'
      }
    ]

    let ministryId = null

    for (const user of testUsers) {
      console.log(`\n🔄 Criando ${user.label}...`)

      // Criar usuário de autenticação
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: {
          name: user.name,
          role: user.role
        }
      })

      if (authError) {
        if (authError.message.includes('already')) {
          console.log(`⚠️  Usuário ${user.email} já existe, pulando...`)
          continue
        }
        console.error('❌ Erro ao criar usuário:', authError)
        continue
      }

      console.log('   ✅ Autenticação criada:', authData.user.email)

      // Criar perfil do usuário
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          church_id: church.id
        })

      if (profileError && !profileError.message.includes('duplicate')) {
        console.error('   ❌ Erro ao criar perfil:', profileError)
        continue
      }

      console.log('   ✅ Perfil criado')

      // Se for o admin, criar ministério
      if (user.role === 'admin' && !ministryId) {
        const { data: ministry, error: ministryError } = await supabase
          .from('ministries')
          .insert({
            church_id: church.id,
            name: 'Ministério de Louvor',
            description: 'Ministério responsável pela música e louvor',
            leader_id: authData.user.id
          })
          .select()
          .single()

        if (ministryError && !ministryError.message.includes('duplicate')) {
          console.error('   ❌ Erro ao criar ministério:', ministryError)
        } else if (ministry) {
          ministryId = ministry.id
          console.log('   ✅ Ministério criado:', ministry.name)
        }
      }
    }

    console.log('\n\n🎉 Usuários de teste criados com sucesso!')
    console.log('\n📋 CREDENCIAIS DE ACESSO:')
    console.log('\n┌─────────────────────────────────────────────────┐')
    console.log('│ 👑 ADMINISTRADOR                                │')
    console.log('├─────────────────────────────────────────────────┤')
    console.log('│ 📧 Email: teste@voluns.com                      │')
    console.log('│ 🔑 Senha: Teste@2024                            │')
    console.log('└─────────────────────────────────────────────────┘')
    console.log('\n┌─────────────────────────────────────────────────┐')
    console.log('│ 👥 LÍDER DE MINISTÉRIO                          │')
    console.log('├─────────────────────────────────────────────────┤')
    console.log('│ 📧 Email: lider@voluns.com                      │')
    console.log('│ 🔑 Senha: Teste@2024                            │')
    console.log('└─────────────────────────────────────────────────┘')
    console.log('\n┌─────────────────────────────────────────────────┐')
    console.log('│ ✅ VOLUNTÁRIO                                   │')
    console.log('├─────────────────────────────────────────────────┤')
    console.log('│ 📧 Email: voluntario@voluns.com                 │')
    console.log('│ 🔑 Senha: Teste@2024                            │')
    console.log('└─────────────────────────────────────────────────┘')
    console.log('\n🌐 Acesse: http://localhost:5000/auth/login')
    console.log('\n💡 Use o botão "Acesso Rápido" para preencher automaticamente!\n')

  } catch (error) {
    console.error('\n❌ Erro geral:', error)
  }
}

createTestUser()


