'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { 
  ExclamationTriangleIcon, 
  ArrowPathIcon,
  HomeIcon,
  BugAntIcon
} from '@heroicons/react/24/outline'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo })
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
    
    // Call custom error handler
    this.props.onError?.(error, errorInfo)
    
    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Implement error logging service (Sentry, LogRocket, etc.)
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return <DefaultErrorFallback error={this.state.error} />
    }

    return this.props.children
  }
}

// Componente padrão de fallback para erros
function DefaultErrorFallback({ error }: { error?: Error }) {
  const handleReload = () => {
    window.location.reload()
  }

  const handleGoHome = () => {
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Oops! Algo deu errado
          </h2>
          
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Encontramos um erro inesperado. Nossa equipe foi notificada e está trabalhando para corrigi-lo.
          </p>
          
          {process.env.NODE_ENV === 'development' && error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start">
                <BugAntIcon className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-2" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Detalhes do Erro (Desenvolvimento)
                  </h3>
                  <p className="mt-1 text-sm text-red-700 dark:text-red-300 font-mono">
                    {error.message}
                  </p>
                  {error.stack && (
                    <details className="mt-2">
                      <summary className="text-sm text-red-600 dark:text-red-400 cursor-pointer">
                        Stack Trace
                      </summary>
                      <pre className="mt-2 text-xs text-red-600 dark:text-red-400 overflow-auto">
                        {error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 space-y-4">
          <button
            onClick={handleReload}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Tentar Novamente
          </button>
          
          <button
            onClick={handleGoHome}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <HomeIcon className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Se o problema persistir, entre em contato com o suporte.
          </p>
        </div>
      </div>
    </div>
  )
}

// Error Boundary específico para componentes menores
export function InlineErrorBoundary({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ErrorBoundary 
      fallback={
        fallback || (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
              <p className="text-sm text-red-700 dark:text-red-300">
                Erro ao carregar componente. Tente recarregar a página.
              </p>
            </div>
          </div>
        )
      }
    >
      {children}
    </ErrorBoundary>
  )
}

// Hook para tratamento de erros em componentes funcionais
export function useErrorHandler() {
  const handleError = (error: Error, errorInfo?: string) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo)
    
    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Implement error logging service
    }
  }

  return { handleError }
}







