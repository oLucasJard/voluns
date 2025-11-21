'use client'

import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { User as UserProfile } from '@/types'
import { getTestUserById, TestUser } from '@/lib/auth/test-auth'
import { NotificationProvider } from './NotificationProvider'
import { ThemeProvider } from './ThemeProvider'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Flag de debug - desabilitar em produção
const DEBUG_AUTH = process.env.NODE_ENV === 'development' && false

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const renderCount = useRef(0)

  // Debug condicional (desabilitado por padrão)
  if (DEBUG_AUTH) {
    renderCount.current++
    console.log(`🔐 AuthProvider - Render #${renderCount.current}`, {
      user: user?.id,
      profile: profile?.id,
      loading
    })
  }

  useEffect(() => {
    const getInitialSession = async () => {
      console.log('🔐 [AuthProvider] Verificando sessão inicial...')
      
      // Verificar se há usuário de teste no localStorage
      const testAuth = localStorage.getItem('test-auth')
      const testUserData = localStorage.getItem('test-user')
      
      console.log('🔐 [AuthProvider] Dados de teste encontrados:', {
        testAuth,
        hasTestUserData: !!testUserData,
        testUserData: testUserData ? testUserData.substring(0, 50) + '...' : null
      })
      
      if (testAuth === 'true' && testUserData) {
        try {
          const testUser = JSON.parse(testUserData) as TestUser
          console.log('✅ [AuthProvider] Usuário de teste carregado:', testUser)
          setUser({ id: testUser.id, email: testUser.email } as User)
          setProfile(testUser as UserProfile)
          setLoading(false)
          return
        } catch (error) {
          console.error('❌ [AuthProvider] Erro ao parsear dados de teste:', error)
        }
      }

      console.log('🔐 [AuthProvider] Não há usuário de teste, tentando Supabase...')
      // Tentar obter sessão do Supabase
      const { data: { session } } = await supabase.auth.getSession()
      console.log('🔐 [AuthProvider] Sessão Supabase:', { hasSession: !!session, userId: session?.user?.id })
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      }
      
      console.log('🔐 [AuthProvider] Carregamento finalizado')
      setLoading(false)
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: any, session: any) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchUserProfile(session.user.id)
        } else {
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        
        // Se for um usuário de teste e não existir no banco, criar automaticamente
        const testUser = getTestUserById(userId)
        if (testUser) {
          await createTestUserProfile(testUser)
          setProfile(testUser as UserProfile)
          return
        }
        
        return
      }

      setProfile(data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  const createTestUserProfile = async (testUser: TestUser) => {
    try {
      // Garantir que a igreja de teste existe
      const { error: churchError } = await supabase
        .from('churches')
        .upsert({
          id: testUser.church_id!,
          name: 'Igreja Teste',
          description: 'Igreja para testes do sistema',
          plan: 'essential'
        })

      if (churchError) {
        console.error('Error creating test church:', churchError)
      }

      // Criar perfil do usuário de teste
      const { error: userError } = await supabase
        .from('users')
        .upsert({
          id: testUser.id,
          email: testUser.email,
          name: testUser.name,
          role: testUser.role,
          church_id: testUser.church_id
        })

      if (userError) {
        console.error('Error creating test user profile:', userError)
      }

      // Criar dados de exemplo para o dashboard se for o usuário admin
      if (testUser.role === 'admin') {
        await createTestDashboardData(testUser.church_id!, testUser.id)
      }

      if (DEBUG_AUTH) console.log('Test user profile created successfully')
    } catch (error) {
      console.error('Error in createTestUserProfile:', error)
    }
  }

  const createTestDashboardData = async (churchId: string, userId: string) => {
    try {
      // Criar ministério de teste
      const ministryId = '550e8400-e29b-41d4-a716-446655440002'
      const { error: ministryError } = await supabase
        .from('ministries')
        .upsert({
          id: ministryId,
          church_id: churchId,
          name: 'Ministério de Louvor',
          description: 'Ministério responsável pelo louvor e adoração',
          leader_id: userId,
          is_active: true
        })

      if (ministryError) {
        console.error('Error creating test ministry:', ministryError)
      }

      // Criar alguns voluntários de teste
      const volunteers = [
        {
          id: '550e8400-e29b-41d4-a716-446655440003',
          user_id: userId,
          ministry_id: ministryId,
          position: 'Líder',
          skills: ['liderança', 'música'],
          is_active: true
        }
      ]

      for (const volunteer of volunteers) {
        const { error: volunteerError } = await supabase
          .from('volunteers')
          .upsert(volunteer)

        if (volunteerError) {
          console.error('Error creating test volunteer:', volunteerError)
        }
      }

      // Criar alguns eventos de teste
      const events = [
        {
          id: '550e8400-e29b-41d4-a716-446655440004',
          church_id: churchId,
          ministry_id: ministryId,
          name: 'Culto de Domingo',
          description: 'Culto principal da igreja',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Próximo domingo
          status: 'published',
          created_by: userId
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440005',
          church_id: churchId,
          ministry_id: ministryId,
          name: 'Reunião de Jovens',
          description: 'Reunião semanal do grupo de jovens',
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Em 3 dias
          status: 'published',
          created_by: userId
        }
      ]

      for (const event of events) {
        const { error: eventError } = await supabase
          .from('events')
          .upsert(event)

        if (eventError) {
          console.error('Error creating test event:', eventError)
        }
      }

      // Criar algumas notificações de teste
      const notifications = [
        {
          id: '550e8400-e29b-41d4-a716-446655440006',
          user_id: userId,
          type: 'system',
          title: 'Bem-vindo ao Voluns!',
          message: 'Sistema configurado com sucesso. Você pode começar a usar a plataforma.',
          is_read: false
        }
      ]

      for (const notification of notifications) {
        const { error: notificationError } = await supabase
          .from('notifications')
          .upsert(notification)

        if (notificationError) {
          console.error('Error creating test notification:', notificationError)
        }
      }

      if (DEBUG_AUTH) console.log('Test dashboard data created successfully')
    } catch (error) {
      console.error('Error in createTestDashboardData:', error)
    }
  }

  const signOut = async () => {
    // Limpar dados de teste
    localStorage.removeItem('test-auth')
    localStorage.removeItem('test-user')
    
    // Limpar cookies de teste
    document.cookie = 'test-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'test-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    
    // Tentar logout do Supabase
    await supabase.auth.signOut()
  }

  const value = {
    user,
    profile,
    loading,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Flag de debug para Providers
const DEBUG_PROVIDERS = process.env.NODE_ENV === 'development' && false

export function Providers({ children }: { children: React.ReactNode }) {
  if (DEBUG_PROVIDERS) {
    console.log('🔧 Providers - Componente renderizado')
  }
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
