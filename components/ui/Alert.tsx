import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  XCircleIcon 
} from '@heroicons/react/24/outline'

interface AlertProps {
  children: ReactNode
  variant?: 'success' | 'warning' | 'error' | 'info'
  title?: string
  className?: string
  onClose?: () => void
}

export function Alert({ children, variant = 'info', title, className, onClose }: AlertProps) {
  const variantConfig = {
    success: {
      containerClasses: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
      iconClasses: 'text-green-600 dark:text-green-400',
      titleClasses: 'text-green-800 dark:text-green-300',
      textClasses: 'text-green-700 dark:text-green-400',
      Icon: CheckCircleIcon,
    },
    warning: {
      containerClasses: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
      iconClasses: 'text-yellow-600 dark:text-yellow-400',
      titleClasses: 'text-yellow-800 dark:text-yellow-300',
      textClasses: 'text-yellow-700 dark:text-yellow-400',
      Icon: ExclamationTriangleIcon,
    },
    error: {
      containerClasses: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
      iconClasses: 'text-red-600 dark:text-red-400',
      titleClasses: 'text-red-800 dark:text-red-300',
      textClasses: 'text-red-700 dark:text-red-400',
      Icon: XCircleIcon,
    },
    info: {
      containerClasses: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
      iconClasses: 'text-blue-600 dark:text-blue-400',
      titleClasses: 'text-blue-800 dark:text-blue-300',
      textClasses: 'text-blue-700 dark:text-blue-400',
      Icon: InformationCircleIcon,
    },
  }

  const config = variantConfig[variant]
  const Icon = config.Icon

  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        config.containerClasses,
        className
      )}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={cn('h-5 w-5', config.iconClasses)} />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={cn('text-sm font-medium mb-1', config.titleClasses)}>
              {title}
            </h3>
          )}
          <div className={cn('text-sm', config.textClasses)}>
            {children}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={cn(
              'ml-3 flex-shrink-0 inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
              config.iconClasses
            )}
          >
            <span className="sr-only">Fechar</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

