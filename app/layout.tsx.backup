import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/Providers'
import { NotificationToast } from '@/components/notifications/NotificationToast'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { SuppressWarnings } from '@/components/ui/SuppressWarnings'
import { Toast } from '@/components/ui/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Voluns - Gestão Inteligente de Voluntários',
  description: 'Plataforma SaaS para igrejas gerenciarem voluntários e escalas ministeriais de forma organizada e eficiente.',
  keywords: ['igreja', 'voluntários', 'escalas', 'gestão', 'ministério', 'SaaS'],
  authors: [{ name: 'Voluns Team' }],
  creator: 'Voluns',
  publisher: 'Voluns',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://voluns.com',
    title: 'Voluns - Gestão Inteligente de Voluntários',
    description: 'Plataforma SaaS para igrejas gerenciarem voluntários e escalas ministeriais de forma organizada e eficiente.',
    siteName: 'Voluns',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voluns - Gestão Inteligente de Voluntários',
    description: 'Plataforma SaaS para igrejas gerenciarem voluntários e escalas ministeriais de forma organizada e eficiente.',
  },
  metadataBase: new URL('https://voluns.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <head>
        <script src="/theme-script.js" />
      </head>
      <body className={`${inter.className} h-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
        <SuppressWarnings />
        <ErrorBoundary>
          <Providers>
            {children}
            <NotificationToast />
            <Toast />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
