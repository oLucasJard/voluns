import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/Providers'
import { Toast } from '@/components/ui/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Voluns - Sistema de Gestão',
  description: 'Sistema de gestão de voluntários',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script src="/theme-script.js" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toast />
        </Providers>
      </body>
    </html>
  )
}

