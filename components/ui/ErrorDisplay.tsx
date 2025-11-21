'use client'

import { 
  ExclamationTriangleIcon, 
  XCircleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

type ErrorType = 'error' | 'warning' | 'info' | 'success'

interface ErrorDisplayProps {
  type?: ErrorType
  title?: string
  message: string
  details?: string
  action?: {
    label: string
    onClick: () => void
  }
  onDismiss?: () => void
  className?: string
}

const errorConfig = {
  error: {
    icon: XCircleIcon,
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    iconColor: 'text-red-600 dark:text-red-400',
    titleColor: 'text-red-800 dark:text-red-200',
    messageColor: 'text-red-700 dark:text-red-300'
  },
  warning: {
    icon: ExclamationTriangleIcon,
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    titleColor: 'text-yellow-800 dark:text-yellow-200',
    messageColor: 'text-yellow-700 dark:text-yellow-300'
  },
  info: {
    icon: InformationCircleIcon,
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
    titleColor: 'text-blue-800 dark:text-blue-200',
    messageColor: 'text-blue-700 dark:text-blue-300'
  },
  success: {
    icon: CheckCircleIcon,
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-600 dark:text-green-400',
    titleColor: 'text-green-800 dark:text-green-200',
    messageColor: 'text-green-700 dark:text-green-300'
  }
}

export function ErrorDisplay({ 
  type = 'error', 
  title, 
  message, 
  details, 
  action, 
  onDismiss,
  className = ''
}: ErrorDisplayProps) {
  const config = errorConfig[type]
  const Icon = config.icon

  return (
    <div className={`rounded-lg border p-4 ${config.bgColor} ${config.borderColor} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${config.iconColor}`} />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${config.titleColor}`}>
              {title}
            </h3>
          )}
          <div className={`mt-1 text-sm ${config.messageColor}`}>
            <p>{message}</p>
            {details && (
              <details className="mt-2">
                <summary className="cursor-pointer hover:underline">
                  Detalhes
                </summary>
                <pre className="mt-2 text-xs overflow-auto whitespace-pre-wrap">
                  {details}
                </pre>
              </details>
            )}
          </div>
          {action && (
            <div className="mt-3">
              <button
                type="button"
                onClick={action.onClick}
                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  type === 'error' 
                    ? 'text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500' 
                    : type === 'warning'
                    ? 'text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:ring-yellow-500'
                    : type === 'info'
                    ? 'text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500'
                    : 'text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500'
                }`}
              >
                <ArrowPathIcon className="h-4 w-4 mr-1" />
                {action.label}
              </button>
            </div>
          )}
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onDismiss}
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  type === 'error' 
                    ? 'text-red-500 hover:bg-red-100 focus:ring-red-600' 
                    : type === 'warning'
                    ? 'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600'
                    : type === 'info'
                    ? 'text-blue-500 hover:bg-blue-100 focus:ring-blue-600'
                    : 'text-green-500 hover:bg-green-100 focus:ring-green-600'
                }`}
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente para erro de rede
export function NetworkErrorDisplay({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorDisplay
      type="error"
      title="Erro de Conexão"
      message="Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente."
      action={onRetry ? {
        label: "Tentar Novamente",
        onClick: onRetry
      } : undefined}
    />
  )
}

// Componente para erro de permissão
export function PermissionErrorDisplay() {
  return (
    <ErrorDisplay
      type="warning"
      title="Acesso Negado"
      message="Você não tem permissão para acessar este recurso. Entre em contato com um administrador se acredita que isso é um erro."
    />
  )
}

// Componente para erro de validação
export function ValidationErrorDisplay({ errors }: { errors: string[] }) {
  return (
    <ErrorDisplay
      type="warning"
      title="Dados Inválidos"
      message="Por favor, corrija os seguintes erros:"
      details={errors.join('\n')}
    />
  )
}







