// Sistema de Tratamento de Erros para Prevenção de Problemas
// Implementação inspirada em Sentry, Bugsnag e Rollbar

import { logger, LogCategory } from './logger'

export interface ErrorContext {
  userId?: string
  churchId?: string
  sessionId?: string
  requestId?: string
  operation?: string
  endpoint?: string
  method?: string
  userAgent?: string
  ip?: string
  timestamp?: Date
  additionalData?: Record<string, any>
}

export interface ErrorReport {
  id: string
  error: Error
  context: ErrorContext
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: string
  timestamp: Date
  resolved: boolean
  resolvedAt?: Date
  resolvedBy?: string
  notes?: string
}

// Classe principal do sistema de tratamento de erros
class ErrorHandler {
  private errorReports: Map<string, ErrorReport> = new Map()
  private errorCounts: Map<string, number> = new Map()
  private alertThresholds: Map<string, number> = new Map()

  constructor() {
    this.setupDefaultThresholds()
  }

  // Configurar thresholds padrão
  private setupDefaultThresholds() {
    this.alertThresholds.set('database', 5) // 5 erros de banco em 1 hora
    this.alertThresholds.set('api', 10) // 10 erros de API em 1 hora
    this.alertThresholds.set('auth', 3) // 3 erros de auth em 1 hora
    this.alertThresholds.set('security', 1) // 1 erro de segurança = alerta
    this.alertThresholds.set('system', 2) // 2 erros de sistema em 1 hora
  }

  // Gerar ID único para erro
  private generateErrorId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15)
  }

  // Determinar severidade do erro
  private determineSeverity(error: Error, category: string): 'low' | 'medium' | 'high' | 'critical' {
    // Erros críticos
    if (error.name === 'TypeError' && error.message.includes('Cannot read property')) {
      return 'critical'
    }
    
    if (error.name === 'ReferenceError') {
      return 'critical'
    }
    
    if (error.name === 'SyntaxError') {
      return 'critical'
    }
    
    // Erros de segurança são sempre altos
    if (category === 'security') {
      return 'high'
    }
    
    // Erros de banco de dados
    if (category === 'database') {
      if (error.message.includes('connection') || error.message.includes('timeout')) {
        return 'high'
      }
      return 'medium'
    }
    
    // Erros de API
    if (category === 'api') {
      if (error.message.includes('500') || error.message.includes('Internal Server Error')) {
        return 'high'
      }
      return 'medium'
    }
    
    // Erros de autenticação
    if (category === 'auth') {
      return 'medium'
    }
    
    // Outros erros
    return 'low'
  }

  // Capturar e processar erro
  captureError(
    error: Error,
    context: ErrorContext = {},
    category: string = 'system'
  ): string {
    const errorId = this.generateErrorId()
    const severity = this.determineSeverity(error, category)
    
    // Criar relatório de erro
    const errorReport: ErrorReport = {
      id: errorId,
      error,
      context: {
        ...context,
        timestamp: new Date()
      },
      severity,
      category,
      timestamp: new Date(),
      resolved: false
    }

    // Armazenar relatório
    this.errorReports.set(errorId, errorReport)

    // Atualizar contador
    const errorKey = `${category}:${error.name}`
    this.errorCounts.set(errorKey, (this.errorCounts.get(errorKey) || 0) + 1)

    // Log do erro
    logger.error(
      `Error captured: ${error.name} - ${error.message}`,
      category as LogCategory,
      {
        errorId,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack
        },
        severity,
        context
      }
    )

    // Verificar se precisa alertar
    this.checkAlertThresholds(category, errorKey)

    // Enviar para serviço externo se crítico
    if (severity === 'critical') {
      this.sendToExternalService(errorReport)
    }

    return errorId
  }

  // Verificar thresholds de alerta
  private checkAlertThresholds(category: string, errorKey: string) {
    const threshold = this.alertThresholds.get(category)
    if (!threshold) return

    const count = this.errorCounts.get(errorKey) || 0
    if (count >= threshold) {
      this.sendAlert(category, errorKey, count, threshold)
    }
  }

  // Enviar alerta
  private sendAlert(category: string, errorKey: string, count: number, threshold: number) {
    logger.warn(
      `Alert threshold exceeded: ${category} - ${errorKey}`,
      LogCategory.SYSTEM,
      {
        category,
        errorKey,
        count,
        threshold,
        message: `Error count (${count}) exceeded threshold (${threshold}) for ${category}`
      }
    )

    // Aqui você poderia integrar com serviços de alerta como:
    // - Slack
    // - Discord
    // - Email
    // - SMS
    // - PagerDuty
  }

  // Enviar para serviço externo
  private async sendToExternalService(errorReport: ErrorReport) {
    try {
      // Implementar envio para Sentry, Bugsnag, Rollbar, etc.
      logger.info(
        'Error sent to external service',
        LogCategory.SYSTEM,
        {
          errorId: errorReport.id,
          severity: errorReport.severity,
          category: errorReport.category
        }
      )
    } catch (error) {
      logger.error(
        'Failed to send error to external service',
        LogCategory.SYSTEM,
        { error: error instanceof Error ? error.message : String(error) }
      )
    }
  }

  // Resolver erro
  resolveError(errorId: string, resolvedBy: string, notes?: string): boolean {
    const errorReport = this.errorReports.get(errorId)
    if (!errorReport) {
      return false
    }

    errorReport.resolved = true
    errorReport.resolvedAt = new Date()
    errorReport.resolvedBy = resolvedBy
    errorReport.notes = notes

    logger.info(
      `Error resolved: ${errorId}`,
      LogCategory.SYSTEM,
      {
        errorId,
        resolvedBy,
        notes,
        severity: errorReport.severity,
        category: errorReport.category
      }
    )

    return true
  }

  // Obter relatório de erro
  getErrorReport(errorId: string): ErrorReport | null {
    return this.errorReports.get(errorId) || null
  }

  // Listar erros
  listErrors(
    category?: string,
    severity?: string,
    resolved?: boolean,
    limit: number = 50
  ): ErrorReport[] {
    let errors = Array.from(this.errorReports.values())

    if (category) {
      errors = errors.filter(e => e.category === category)
    }

    if (severity) {
      errors = errors.filter(e => e.severity === severity)
    }

    if (resolved !== undefined) {
      errors = errors.filter(e => e.resolved === resolved)
    }

    return errors
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit)
  }

  // Obter estatísticas de erros
  getErrorStats(): {
    totalErrors: number
    resolvedErrors: number
    unresolvedErrors: number
    errorsByCategory: Record<string, number>
    errorsBySeverity: Record<string, number>
    errorCounts: Record<string, number>
    recentErrors: ErrorReport[]
  } {
    const errors = Array.from(this.errorReports.values())
    
    const stats = {
      totalErrors: errors.length,
      resolvedErrors: errors.filter(e => e.resolved).length,
      unresolvedErrors: errors.filter(e => !e.resolved).length,
      errorsByCategory: {} as Record<string, number>,
      errorsBySeverity: {} as Record<string, number>,
      errorCounts: Object.fromEntries(this.errorCounts),
      recentErrors: errors
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 10)
    }

    // Contar por categoria
    errors.forEach(error => {
      stats.errorsByCategory[error.category] = 
        (stats.errorsByCategory[error.category] || 0) + 1
    })

    // Contar por severidade
    errors.forEach(error => {
      stats.errorsBySeverity[error.severity] = 
        (stats.errorsBySeverity[error.severity] || 0) + 1
    })

    return stats
  }

  // Limpar erros antigos
  cleanupOldErrors(days: number = 30): number {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    let cleanedCount = 0
    for (const [errorId, errorReport] of this.errorReports) {
      if (errorReport.timestamp < cutoffDate && errorReport.resolved) {
        this.errorReports.delete(errorId)
        cleanedCount++
      }
    }

    if (cleanedCount > 0) {
      logger.info(
        `Cleaned up ${cleanedCount} old error reports`,
        LogCategory.SYSTEM,
        { cleanedCount, days }
      )
    }

    return cleanedCount
  }

  // Reset contadores
  resetCounters(): void {
    this.errorCounts.clear()
    logger.info('Error counters reset', LogCategory.SYSTEM)
  }
}

// Instância singleton
export const errorHandler = new ErrorHandler()

// Funções auxiliares para captura de erros
export const errorHelpers = {
  // Capturar erro de API
  captureApiError(error: Error, req: any, context?: any) {
    return errorHandler.captureError(error, {
      endpoint: req?.url,
      method: req?.method,
      userAgent: req?.headers?.['user-agent'],
      ip: req?.ip,
      ...context
    }, 'api')
  },

  // Capturar erro de banco de dados
  captureDatabaseError(error: Error, operation: string, table: string, context?: any) {
    return errorHandler.captureError(error, {
      operation,
      table,
      ...context
    }, 'database')
  },

  // Capturar erro de autenticação
  captureAuthError(error: Error, userId?: string, context?: any) {
    return errorHandler.captureError(error, {
      userId,
      ...context
    }, 'auth')
  },

  // Capturar erro de segurança
  captureSecurityError(error: Error, context?: any) {
    return errorHandler.captureError(error, context, 'security')
  },

  // Capturar erro de sistema
  captureSystemError(error: Error, context?: any) {
    return errorHandler.captureError(error, context, 'system')
  },

  // Wrapper para funções assíncronas
  async wrapAsync<T>(
    fn: () => Promise<T>,
    context: ErrorContext = {},
    category: string = 'system'
  ): Promise<T> {
    try {
      return await fn()
    } catch (error) {
      const errorId = errorHandler.captureError(
        error instanceof Error ? error : new Error(String(error)),
        context,
        category
      )
      throw new Error(`Operation failed (Error ID: ${errorId}): ${error instanceof Error ? error.message : String(error)}`)
    }
  },

  // Wrapper para funções síncronas
  wrapSync<T>(
    fn: () => T,
    context: ErrorContext = {},
    category: string = 'system'
  ): T {
    try {
      return fn()
    } catch (error) {
      const errorId = errorHandler.captureError(
        error instanceof Error ? error : new Error(String(error)),
        context,
        category
      )
      throw new Error(`Operation failed (Error ID: ${errorId}): ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}

// Middleware para captura automática de erros
export function errorCaptureMiddleware(error: Error, req: any, res: any, next: any) {
  const errorId = errorHelpers.captureApiError(error, req)
  
  // Adicionar errorId à resposta
  res.setHeader('X-Error-ID', errorId)
  
  next(error)
}



