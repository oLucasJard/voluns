'use client'

import { AuthProvider } from './AuthProvider'
import { NotificationProvider } from './NotificationProvider'
import { ThemeProvider } from './ThemeProvider'

export { useAuth } from './AuthProvider'

export function Providers({ children }: { children: React.ReactNode }) {
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
