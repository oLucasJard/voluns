'use client'

import { Toaster as HotToaster } from 'react-hot-toast'
import { useTheme } from '@/components/providers/ThemeProvider'

export function Toast() {
  const { resolvedTheme } = useTheme()

  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: resolvedTheme === 'dark' ? '#1f2937' : '#ffffff',
          color: resolvedTheme === 'dark' ? '#f9fafb' : '#111827',
          border: `1px solid ${resolvedTheme === 'dark' ? '#374151' : '#e5e7eb'}`,
          boxShadow: resolvedTheme === 'dark' 
            ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#22c55e',
            secondary: resolvedTheme === 'dark' ? '#1f2937' : '#ffffff',
          },
          style: {
            background: resolvedTheme === 'dark' ? '#064e3b' : '#f0fdf4',
            color: resolvedTheme === 'dark' ? '#6ee7b7' : '#166534',
            border: `1px solid ${resolvedTheme === 'dark' ? '#065f46' : '#bbf7d0'}`,
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: '#ef4444',
            secondary: resolvedTheme === 'dark' ? '#1f2937' : '#ffffff',
          },
          style: {
            background: resolvedTheme === 'dark' ? '#7f1d1d' : '#fef2f2',
            color: resolvedTheme === 'dark' ? '#fca5a5' : '#991b1b',
            border: `1px solid ${resolvedTheme === 'dark' ? '#991b1b' : '#fecaca'}`,
          },
        },
        loading: {
          style: {
            background: resolvedTheme === 'dark' ? '#1e3a8a' : '#eff6ff',
            color: resolvedTheme === 'dark' ? '#93c5fd' : '#1e40af',
            border: `1px solid ${resolvedTheme === 'dark' ? '#1e40af' : '#bfdbfe'}`,
          },
        },
      }}
    />
  )
}

