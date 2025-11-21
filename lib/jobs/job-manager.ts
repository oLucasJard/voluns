// Sistema de Background Jobs para Tarefas Pesadas
// Implementação inspirada em Bull, Agenda e Sidekiq

export interface Job {
  id: string
  type: string
  data: Record<string, any>
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'
  priority: number
  attempts: number
  max_attempts: number
  created_at: Date
  started_at?: Date
  completed_at?: Date
  failed_at?: Date
  error?: string
  result?: any
  scheduled_for?: Date
  delay?: number
}

export interface JobQueue {
  name: string
  jobs: Job[]
  is_processing: boolean
  concurrency: number
  max_retries: number
  retry_delay: number
}

// Tipos de jobs disponíveis
export const JOB_TYPES = {
  // Jobs de email
  SEND_EMAIL: 'send_email',
  SEND_BULK_EMAIL: 'send_bulk_email',
  SEND_NOTIFICATION_EMAIL: 'send_notification_email',
  
  // Jobs de relatório
  GENERATE_REPORT: 'generate_report',
  EXPORT_DATA: 'export_data',
  GENERATE_STATISTICS: 'generate_statistics',
  
  // Jobs de backup
  BACKUP_DATABASE: 'backup_database',
  CLEANUP_OLD_DATA: 'cleanup_old_data',
  ARCHIVE_LOGS: 'archive_logs',
  
  // Jobs de integração
  SYNC_EXTERNAL_DATA: 'sync_external_data',
  PROCESS_WEBHOOK: 'process_webhook',
  UPDATE_CACHE: 'update_cache',
  
  // Jobs de notificação
  SEND_PUSH_NOTIFICATION: 'send_push_notification',
  SEND_SMS: 'send_sms',
  SEND_WHATSAPP: 'send_whatsapp',
  
  // Jobs de processamento
  PROCESS_IMAGES: 'process_images',
  GENERATE_THUMBNAILS: 'generate_thumbnails',
  COMPRESS_FILES: 'compress_files',
  
  // Jobs de manutenção
  HEALTH_CHECK: 'health_check',
  PERFORMANCE_MONITOR: 'performance_monitor',
  SECURITY_SCAN: 'security_scan'
} as const

// Classe principal do gerenciador de jobs
class JobManager {
  private queues: Map<string, JobQueue> = new Map()
  private isRunning = false
  private processingInterval: NodeJS.Timeout | null = null

  constructor() {
    this.initializeQueues()
  }

  // Gerar UUID compatível
  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  // Inicializar filas padrão
  private initializeQueues() {
    const defaultQueues = [
      { name: 'email', concurrency: 5, max_retries: 3, retry_delay: 5000 },
      { name: 'reports', concurrency: 2, max_retries: 2, retry_delay: 10000 },
      { name: 'backup', concurrency: 1, max_retries: 5, retry_delay: 30000 },
      { name: 'integration', concurrency: 3, max_retries: 3, retry_delay: 15000 },
      { name: 'notification', concurrency: 10, max_retries: 2, retry_delay: 2000 },
      { name: 'processing', concurrency: 2, max_retries: 2, retry_delay: 10000 },
      { name: 'maintenance', concurrency: 1, max_retries: 1, retry_delay: 60000 }
    ]

    defaultQueues.forEach(queueConfig => {
      this.queues.set(queueConfig.name, {
        name: queueConfig.name,
        jobs: [],
        is_processing: false,
        concurrency: queueConfig.concurrency,
        max_retries: queueConfig.max_retries,
        retry_delay: queueConfig.retry_delay
      })
    })
  }

  // Adicionar job à fila
  async addJob(
    queueName: string,
    type: string,
    data: Record<string, any>,
    options: {
      priority?: number
      delay?: number
      max_attempts?: number
      scheduled_for?: Date
    } = {}
  ): Promise<Job> {
    const queue = this.queues.get(queueName)
    if (!queue) {
      throw new Error(`Fila '${queueName}' não encontrada`)
    }

    const job: Job = {
      id: this.generateUUID(),
      type,
      data,
      status: 'pending',
      priority: options.priority || 0,
      attempts: 0,
      max_attempts: options.max_attempts || queue.max_retries,
      created_at: new Date(),
      scheduled_for: options.scheduled_for,
      delay: options.delay
    }

    // Inserir job na posição correta baseada na prioridade
    const insertIndex = queue.jobs.findIndex(j => j.priority < job.priority)
    if (insertIndex === -1) {
      queue.jobs.push(job)
    } else {
      queue.jobs.splice(insertIndex, 0, job)
    }

    console.log(`📋 Job adicionado: ${job.id} (${type}) na fila ${queueName}`)
    
    // Iniciar processamento se não estiver rodando
    if (!this.isRunning) {
      this.startProcessing()
    }

    return job
  }

  // Iniciar processamento de jobs
  startProcessing() {
    if (this.isRunning) {
      return
    }

    this.isRunning = true
    console.log('🚀 Iniciando processamento de background jobs')

    this.processingInterval = setInterval(() => {
      this.processQueues()
    }, 1000) // Verificar a cada segundo
  }

  // Parar processamento de jobs
  stopProcessing() {
    if (!this.isRunning) {
      return
    }

    this.isRunning = false
    if (this.processingInterval) {
      clearInterval(this.processingInterval)
      this.processingInterval = null
    }

    console.log('⏹️ Parando processamento de background jobs')
  }

  // Processar todas as filas
  private async processQueues() {
    for (const [queueName, queue] of this.queues) {
      if (queue.is_processing) {
        continue
      }

      const pendingJobs = queue.jobs.filter(job => 
        job.status === 'pending' && 
        (!job.scheduled_for || job.scheduled_for <= new Date()) &&
        (!job.delay || Date.now() - job.created_at.getTime() >= job.delay)
      )

      if (pendingJobs.length > 0) {
        this.processQueue(queueName, queue)
      }
    }
  }

  // Processar fila específica
  private async processQueue(queueName: string, queue: JobQueue) {
    queue.is_processing = true

    try {
      const jobsToProcess = queue.jobs
        .filter(job => 
          job.status === 'pending' && 
          (!job.scheduled_for || job.scheduled_for <= new Date()) &&
          (!job.delay || Date.now() - job.created_at.getTime() >= job.delay)
        )
        .slice(0, queue.concurrency)

      const promises = jobsToProcess.map(job => this.processJob(queueName, job))
      await Promise.allSettled(promises)
    } finally {
      queue.is_processing = false
    }
  }

  // Processar job individual
  private async processJob(queueName: string, job: Job) {
    try {
      job.status = 'running'
      job.started_at = new Date()
      job.attempts++

      console.log(`⚡ Processando job: ${job.id} (${job.type})`)

      // Executar job baseado no tipo
      const result = await this.executeJob(job)

      job.status = 'completed'
      job.completed_at = new Date()
      job.result = result

      console.log(`✅ Job concluído: ${job.id}`)

    } catch (error) {
      console.error(`❌ Job falhou: ${job.id}`, error)

      job.status = 'failed'
      job.failed_at = new Date()
      job.error = error instanceof Error ? error.message : String(error)

      // Tentar novamente se não excedeu o limite
      if (job.attempts < job.max_attempts) {
        job.status = 'pending'
        job.scheduled_for = new Date(Date.now() + this.getRetryDelay(job.attempts))
        console.log(`🔄 Job reagendado: ${job.id} (tentativa ${job.attempts + 1})`)
      } else {
        console.log(`💀 Job falhou definitivamente: ${job.id}`)
      }
    }
  }

  // Executar job baseado no tipo
  private async executeJob(job: Job): Promise<any> {
    switch (job.type) {
      case JOB_TYPES.SEND_EMAIL:
        return await this.sendEmail(job.data)
      
      case JOB_TYPES.SEND_BULK_EMAIL:
        return await this.sendBulkEmail(job.data)
      
      case JOB_TYPES.GENERATE_REPORT:
        return await this.generateReport(job.data)
      
      case JOB_TYPES.BACKUP_DATABASE:
        return await this.backupDatabase(job.data)
      
      case JOB_TYPES.CLEANUP_OLD_DATA:
        return await this.cleanupOldData(job.data)
      
      case JOB_TYPES.SYNC_EXTERNAL_DATA:
        return await this.syncExternalData(job.data)
      
      case JOB_TYPES.SEND_PUSH_NOTIFICATION:
        return await this.sendPushNotification(job.data)
      
      case JOB_TYPES.PROCESS_IMAGES:
        return await this.processImages(job.data)
      
      case JOB_TYPES.HEALTH_CHECK:
        return await this.healthCheck(job.data)
      
      default:
        throw new Error(`Tipo de job não suportado: ${job.type}`)
    }
  }

  // Implementações específicas de jobs
  private async sendEmail(data: any): Promise<any> {
    console.log('📧 Enviando email:', data.to)
    // Implementar envio de email
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simular envio
    return { message: 'Email enviado com sucesso' }
  }

  private async sendBulkEmail(data: any): Promise<any> {
    console.log('📧 Enviando emails em lote:', data.recipients?.length || 0)
    // Implementar envio em lote
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simular envio
    return { message: 'Emails em lote enviados com sucesso' }
  }

  private async generateReport(data: any): Promise<any> {
    console.log('📊 Gerando relatório:', data.type)
    // Implementar geração de relatório
    await new Promise(resolve => setTimeout(resolve, 5000)) // Simular processamento
    return { message: 'Relatório gerado com sucesso' }
  }

  private async backupDatabase(data: any): Promise<any> {
    console.log('💾 Fazendo backup do banco de dados')
    // Implementar backup
    await new Promise(resolve => setTimeout(resolve, 10000)) // Simular backup
    return { message: 'Backup concluído com sucesso' }
  }

  private async cleanupOldData(data: any): Promise<any> {
    console.log('🧹 Limpando dados antigos')
    // Implementar limpeza
    await new Promise(resolve => setTimeout(resolve, 3000)) // Simular limpeza
    return { message: 'Limpeza concluída com sucesso' }
  }

  private async syncExternalData(data: any): Promise<any> {
    console.log('🔄 Sincronizando dados externos')
    // Implementar sincronização
    await new Promise(resolve => setTimeout(resolve, 4000)) // Simular sincronização
    return { message: 'Sincronização concluída com sucesso' }
  }

  private async sendPushNotification(data: any): Promise<any> {
    console.log('🔔 Enviando notificação push:', data.title)
    // Implementar notificação push
    await new Promise(resolve => setTimeout(resolve, 500)) // Simular envio
    return { message: 'Notificação push enviada com sucesso' }
  }

  private async processImages(data: any): Promise<any> {
    console.log('🖼️ Processando imagens:', data.files?.length || 0)
    // Implementar processamento de imagens
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simular processamento
    return { message: 'Imagens processadas com sucesso' }
  }

  private async healthCheck(data: any): Promise<any> {
    console.log('🏥 Executando health check')
    // Implementar health check
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simular verificação
    return { message: 'Health check concluído com sucesso' }
  }

  // Calcular delay para retry
  private getRetryDelay(attempt: number): number {
    return Math.pow(2, attempt) * 1000 // Exponential backoff
  }

  // Listar jobs de uma fila
  async getJobs(queueName: string, status?: string): Promise<Job[]> {
    const queue = this.queues.get(queueName)
    if (!queue) {
      throw new Error(`Fila '${queueName}' não encontrada`)
    }

    let jobs = queue.jobs
    if (status) {
      jobs = jobs.filter(job => job.status === status)
    }

    return jobs.sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
  }

  // Obter job específico
  async getJob(jobId: string): Promise<Job | null> {
    for (const queue of this.queues.values()) {
      const job = queue.jobs.find(j => j.id === jobId)
      if (job) {
        return job
      }
    }
    return null
  }

  // Cancelar job
  async cancelJob(jobId: string): Promise<boolean> {
    for (const queue of this.queues.values()) {
      const jobIndex = queue.jobs.findIndex(j => j.id === jobId)
      if (jobIndex !== -1) {
        const job = queue.jobs[jobIndex]
        if (job.status === 'pending' || job.status === 'running') {
          job.status = 'cancelled'
          console.log(`🚫 Job cancelado: ${jobId}`)
          return true
        }
      }
    }
    return false
  }

  // Estatísticas das filas
  async getStats(): Promise<{
    total_queues: number
    total_jobs: number
    pending_jobs: number
    running_jobs: number
    completed_jobs: number
    failed_jobs: number
    queues: Array<{
      name: string
      total_jobs: number
      pending_jobs: number
      running_jobs: number
      completed_jobs: number
      failed_jobs: number
    }>
  }> {
    const stats = {
      total_queues: this.queues.size,
      total_jobs: 0,
      pending_jobs: 0,
      running_jobs: 0,
      completed_jobs: 0,
      failed_jobs: 0,
      queues: [] as any[]
    }

    for (const [queueName, queue] of this.queues) {
      const queueStats = {
        name: queueName,
        total_jobs: queue.jobs.length,
        pending_jobs: queue.jobs.filter(j => j.status === 'pending').length,
        running_jobs: queue.jobs.filter(j => j.status === 'running').length,
        completed_jobs: queue.jobs.filter(j => j.status === 'completed').length,
        failed_jobs: queue.jobs.filter(j => j.status === 'failed').length
      }

      stats.queues.push(queueStats)
      stats.total_jobs += queueStats.total_jobs
      stats.pending_jobs += queueStats.pending_jobs
      stats.running_jobs += queueStats.running_jobs
      stats.completed_jobs += queueStats.completed_jobs
      stats.failed_jobs += queueStats.failed_jobs
    }

    return stats
  }
}

// Instância singleton
export const jobManager = new JobManager()

// Funções auxiliares para adicionar jobs comuns
export const jobHelpers = {
  async sendEmail(to: string, subject: string, body: string, priority: number = 0) {
    return await jobManager.addJob('email', JOB_TYPES.SEND_EMAIL, {
      to, subject, body
    }, { priority })
  },

  async sendBulkEmail(recipients: string[], subject: string, body: string) {
    return await jobManager.addJob('email', JOB_TYPES.SEND_BULK_EMAIL, {
      recipients, subject, body
    })
  },

  async generateReport(type: string, churchId: string, options: any = {}) {
    return await jobManager.addJob('reports', JOB_TYPES.GENERATE_REPORT, {
      type, churchId, options
    })
  },

  async backupDatabase(churchId?: string) {
    return await jobManager.addJob('backup', JOB_TYPES.BACKUP_DATABASE, {
      churchId
    })
  },

  async cleanupOldData(days: number = 30) {
    return await jobManager.addJob('maintenance', JOB_TYPES.CLEANUP_OLD_DATA, {
      days
    })
  },

  async sendPushNotification(userId: string, title: string, message: string) {
    return await jobManager.addJob('notification', JOB_TYPES.SEND_PUSH_NOTIFICATION, {
      userId, title, message
    })
  }
}



