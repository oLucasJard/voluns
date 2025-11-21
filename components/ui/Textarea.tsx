import { forwardRef, TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          className={cn(
            'w-full px-3 py-2 border rounded-lg transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'disabled:bg-gray-100 disabled:cursor-not-allowed dark:disabled:bg-gray-800',
            'resize-y min-h-[100px]',
            error
              ? 'border-red-500 dark:border-red-500'
              : 'border-gray-300 dark:border-gray-600',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-white',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

