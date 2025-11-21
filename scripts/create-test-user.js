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
    console.log('🚀 Criando usuário de teste...')
    
    // Verificar se a igreja de teste já existe
    const churchId = '550e8400-e29b-41d4-a716-446655440000'
    const { data: existingChurch } = await supabase
      .from('churches')
      .select('*')
      .eq('id', churchId)
      .single()
    
    let church
    if (existingChurch) {
      console.log('✅ Igreja de teste já existe')
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
      console.log('✅ Igreja criada:', church.name)
    }

    // Criar usuário de teste
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'teste@voluns.com',
      password: 'Teste@2024',
      email_confirm: true,
      user_metadata: {
        name: 'Usuário Teste',
        role: 'admin'
      }
    })

    if (authError) {
      console.error('❌ Erro ao criar usuário:', authError)
      return
    }

    console.log('✅ Usuário de autenticação criado:', authData.user.email)

    // Criar perfil do usuário
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: 'teste@voluns.com',
        name: 'Usuário Teste',
        role: 'admin',
        church_id: church.id
      })

    if (profileError) {
      console.error('❌ Erro ao criar perfil:', profileError)
      return
    }

    console.log('✅ Perfil do usuário criado')

    // Criar ministério de teste
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

    if (ministryError) {
      console.error('❌ Erro ao criar ministério:', ministryError)
      return
    }

    console.log('✅ Ministério criado:', ministry.name)

    console.log('')
    console.log('🎉 Usuário de teste criado com sucesso!')
    console.log('')
    console.log('📧 Email: teste@voluns.com')
    console.log('🔑 Senha: Teste@2024')
    console.log('')
    console.log('Agora você pode:')
    console.log('1. Acessar http://localhost:3000/auth/login')
    console.log('2. Fazer login com as credenciais acima')
    console.log('3. Explorar o dashboard da aplicação')

  } catch (error) {
    console.error('❌ Erro geral:', error)
  }
}

createTestUser()


