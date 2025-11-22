'use client'

import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { User as UserProfile } from '@/types'
import { getTestUserById, TestUser } from '@/lib/auth/test-auth'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getInitialSession = async () => {
      // Verificar se há usuário de teste no localStorage
      const testAuth = localStorage.getItem('test-auth')
      const testUserData = localStorage.getItem('test-user')
      
      if (testAuth === 'true' && testUserData) {
        try {
          const testUser = JSON.parse(testUserData) as TestUser
          setUser({ id: testUser.id, email: testUser.email } as User)
          setProfile(testUser as UserProfile)
          setLoading(false)
          return
        } catch (error) {
          console.error('Erro ao parsear dados de teste:', error)
        }
      }

      // Tentar obter sessão do Supabase
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      }
      
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
        return
      }

      setProfile(data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
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

