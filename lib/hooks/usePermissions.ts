'use client'

import { useMemo } from 'react'
import type { ComponentType, SVGProps } from 'react'
import { useAuth } from '@/components/providers/Providers'
import {
  BellIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  HomeIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

export type UserRole = 'admin' | 'leader' | 'volunteer'

export interface Permission {
  resource: string
  action: string
}

interface NavigationItem {
  name: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  roles: UserRole[]
}

const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: 'Visão Geral', href: '/dashboard', icon: HomeIcon, roles: ['admin', 'leader', 'volunteer'] },
  { name: 'Eventos', href: '/dashboard/events', icon: CalendarDaysIcon, roles: ['admin', 'leader'] },
  { name: 'Escalas', href: '/dashboard/assignments', icon: ClipboardDocumentListIcon, roles: ['admin', 'leader', 'volunteer'] },
  { name: 'Voluntários', href: '/dashboard/volunteers', icon: UserGroupIcon, roles: ['admin', 'leader'] },
  { name: 'Meu Perfil', href: '/dashboard/volunteer', icon: UserCircleIcon, roles: ['volunteer'] },
  { name: 'Notificações', href: '/dashboard/notifications', icon: BellIcon, roles: ['admin', 'leader', 'volunteer'] },
  { name: 'Relatórios', href: '/dashboard/reports', icon: ChartBarIcon, roles: ['admin'] },
  { name: 'Administração', href: '/dashboard/admin', icon: ShieldCheckIcon, roles: ['admin'] },
  { name: 'Configurações', href: '/dashboard/settings', icon: Cog6ToothIcon, roles: ['admin', 'leader', 'volunteer'] },
]

const ROLE_INFO: Record<UserRole, { role: UserRole; label: string; description: string }> = {
  admin: {
    role: 'admin',
    label: 'Administrador',
    description: 'Controle total da operação, integrações e relatórios executivos.',
  },
  leader: {
    role: 'leader',
    label: 'Líder de Ministério',
    description: 'Gerencia ministérios, eventos, voluntários e comunicação.',
  },
  volunteer: {
    role: 'volunteer',
    label: 'Voluntário',
    description: 'Acompanha escalas, confirmações e treinamentos.',
  },
}

const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [{ resource: '*', action: '*' }],
  leader: [
    { resource: 'ministries', action: '*' },
    { resource: 'volunteers', action: '*' },
    { resource: 'events', action: '*' },
    { resource: 'assignments', action: '*' },
    { resource: 'notifications', action: '*' },
    { resource: 'reports', action: 'read' },
  ],
  volunteer: [
    { resource: 'events', action: 'read' },
    { resource: 'assignments', action: 'read' },
    { resource: 'assignments', action: 'update' },
    { resource: 'profile', action: 'update' },
    { resource: 'notifications', action: 'read' },
  ],
}

export function usePermissions() {
  const { profile } = useAuth()

  const userRole = useMemo<UserRole>(() => {
    return (profile?.role as UserRole) || 'volunteer'
  }, [profile?.role])

  const permissions = useMemo(() => rolePermissions[userRole] ?? rolePermissions.volunteer, [userRole])
  const filteredNavigation = useMemo(
    () => NAVIGATION_ITEMS.filter((item) => item.roles.includes(userRole)),
    [userRole]
  )
  const roleInfo = useMemo(() => ROLE_INFO[userRole], [userRole])

  const checkPermission = (resource: string, action: string): boolean => {
    if (userRole === 'admin') {
      return true
    }

    return permissions.some((permission) => {
      const resourceMatches = permission.resource === resource || permission.resource === '*'
      const actionMatches = permission.action === action || permission.action === '*'
      return resourceMatches && actionMatches
    })
  }

  const canAccess = (resource: string): boolean => {
    if (userRole === 'admin') {
      return true
    }

    return permissions.some((permission) => permission.resource === resource || permission.resource === '*')
  }

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (Array.isArray(role)) {
      return role.includes(userRole)
    }

    return userRole === role
  }

  const isAdmin = userRole === 'admin'
  const isLeader = userRole === 'leader'
  const isVolunteer = userRole === 'volunteer'

  const getNavigation = () => filteredNavigation
  const getRoleInfo = () => roleInfo

  return {
    userRole,
    permissions,
    checkPermission,
    canAccess,
    hasRole,
    isAdmin,
    isLeader,
    isVolunteer,
    getNavigation,
    getRoleInfo,
  }
}
'use client'

import { useAuth } from '@/components/providers/Providers'
import { useMemo } from 'react'

export type UserRole = 'admin' | 'leader' | 'volunteer'

export interface Permission {
  resource: string
  action: string
}

// Mapeamento de permissões por role
const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    // Admin tem acesso total
    { resource: '*', action: '*' },
  ],
  leader: [
    // Líderes podem gerenciar ministérios
    { resource: 'ministries', action: 'read' },
    { resource: 'ministries', action: 'update' },
    { resource: 'ministries', action: 'create' },
    
    // Líderes podem gerenciar voluntários do seu ministério
    { resource: 'volunteers', action: 'read' },
    { resource: 'volunteers', action: 'update' },
    { resource: 'volunteers', action: 'create' },
    
    // Líderes podem gerenciar eventos
    { resource: 'events', action: 'read' },
    { resource: 'events', action: 'create' },
    { resource: 'events', action: 'update' },
    { resource: 'events', action: 'delete' },
    
    // Líderes podem gerenciar atribuições
    { resource: 'assignments', action: 'read' },
    { resource: 'assignments', action: 'create' },
    { resource: 'assignments', action: 'update' },
    { resource: 'assignments', action: 'delete' },
    
    // Líderes podem ver relatórios
    { resource: 'reports', action: 'read' },
    
    // Líderes podem enviar notificações
    { resource: 'notifications', action: 'create' },
  ],
  volunteer: [
    // Voluntários podem ver eventos
    { resource: 'events', action: 'read' },
    
    // Voluntários podem ver suas atribuições
    { resource: 'assignments', action: 'read' },
    
    // Voluntários podem aceitar/recusar atribuições
    { resource: 'assignments', action: 'update' },
    
    // Voluntários podem ver notificações
    { resource: 'notifications', action: 'read' },
    
    // Voluntários podem atualizar seu próprio perfil
    { resource: 'profile', action: 'update' },
  ],
}

export function usePermissions() {
  const { profile } = useAuth()
  
  const userRole = useMemo<UserRole>(() => {
    return (profile?.role as UserRole) || 'volunteer'
  }, [profile?.role])
  
  const permissions = useMemo(() => {
    return rolePermissions[userRole] || rolePermissions.volunteer
  }, [userRole])
  
  /**
   * Verifica se o usuário tem uma permissão específica
   */
  const checkPermission = (resource: string, action: string): boolean => {
    // Admin tem acesso total
    if (userRole === 'admin') {
      return true
    }
    
    // Verificar se tem a permissão exata
    const hasExactPermission = permissions.some(
      (p) => p.resource === resource && p.action === action
    )
    
    if (hasExactPermission) {
      return true
    }
    
    // Verificar se tem permissão wildcard para o recurso
    const hasWildcardPermission = permissions.some(
      (p) => p.resource === resource && p.action === '*'
    )
    
    if (hasWildcardPermission) {
      return true
    }
    
    // Verificar se tem permissão wildcard total
    const hasTotalWildcard = permissions.some(
      (p) => p.resource === '*' && p.action === '*'
    )
    
    return hasTotalWildcard
  }
  
  /**
   * Verifica se o usuário pode acessar um recurso (qualquer ação)
   */
  const canAccess = (resource: string): boolean => {
    // Admin tem acesso total
    if (userRole === 'admin') {
      return true
    }
    
    // Verificar se tem alguma permissão para o recurso
    return permissions.some((p) => p.resource === resource || p.resource === '*')
  }
  
  /**
   * Verifica se o usuário tem um role específico
   */
  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (Array.isArray(role)) {
      return role.includes(userRole)
    }
    return userRole === role
  }
  
  /**
   * Verifica se o usuário é admin
   */
  const isAdmin = useMemo(() => userRole === 'admin', [userRole])
  
  /**
   * Verifica se o usuário é líder
   */
  const isLeader = useMemo(() => userRole === 'leader', [userRole])
  
  /**
   * Verifica se o usuário é voluntário
   */
  const isVolunteer = useMemo(() => userRole === 'volunteer', [userRole])
  
  /**
   * Retorna a navegação disponível para o usuário baseado em seu role
   */
  const getNavigation = () => {
    const baseNavigation = [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: 'HomeIcon',
        roles: ['admin', 'leader', 'volunteer'],
      },
    ]
    
    const adminNavigation = [
      {
        name: 'Visão Executiva',
        href: '/dashboard/admin',
        icon: 'ChartBarIcon',
        roles: ['admin'],
      },
      {
        name: 'Igrejas',
        href: '/dashboard/churches',
        icon: 'BuildingLibraryIcon',
        roles: ['admin'],
      },
      {
        name: 'Relatórios',
        href: '/dashboard/reports',
        icon: 'DocumentChartBarIcon',
        roles: ['admin'],
      },
    ]
    
    const leaderNavigation = [
      {
        name: 'Eventos',
        href: '/dashboard/events',
        icon: 'CalendarIcon',
        roles: ['admin', 'leader'],
      },
      {
        name: 'Voluntários',
        href: '/dashboard/volunteers',
        icon: 'UsersIcon',
        roles: ['admin', 'leader'],
      },
      {
        name: 'Escalas',
        href: '/dashboard/assignments',
        icon: 'ClipboardDocumentListIcon',
        roles: ['admin', 'leader'],
      },
    ]
    
    const volunteerNavigation = [
      {
        name: 'Meu Perfil',
        href: '/dashboard/volunteer',
        icon: 'UserIcon',
        roles: ['volunteer'],
      },
      {
        name: 'Minhas Escalas',
        href: '/dashboard/assignments',
        icon: 'ClipboardDocumentListIcon',
        roles: ['volunteer'],
      },
    ]
    
    const commonNavigation = [
      {
        name: 'Notificações',
        href: '/dashboard/notifications',
        icon: 'BellIcon',
        roles: ['admin', 'leader', 'volunteer'],
      },
      {
        name: 'Configurações',
        href: '/dashboard/settings',
        icon: 'CogIcon',
        roles: ['admin', 'leader', 'volunteer'],
      },
    ]
    
    let navigation = [...baseNavigation]
    
    if (isAdmin) {
      navigation = [...navigation, ...adminNavigation, ...leaderNavigation, ...commonNavigation]
    } else if (isLeader) {
      navigation = [...navigation, ...leaderNavigation, ...commonNavigation]
    } else {
      navigation = [...navigation, ...volunteerNavigation, ...commonNavigation]
    }
    
    return navigation.filter((item) => item.roles.includes(userRole))
  }
  
  return {
    userRole,
    permissions,
    checkPermission,
    canAccess,
    hasRole,
    isAdmin,
    isLeader,
    isVolunteer,
    getNavigation,
  }
}

