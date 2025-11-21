/**
 * Serviço de Email
 * Suporta SendGrid, Resend, SMTP genérico
 */

import { logger } from '@/lib/logging/logger'

export interface EmailOptions {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  from?: string
  replyTo?: string
  attachments?: Array<{
    filename: string
    content: string | Buffer
    contentType?: string
  }>
}

export interface EmailService {
  send(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }>
}

// SendGrid Implementation
class SendGridService implements EmailService {
  private apiKey: string
  private fromEmail: string

  constructor(apiKey: string, fromEmail: string) {
    this.apiKey = apiKey
    this.fromEmail = fromEmail
  }

  async send(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: Array.isArray(options.to) 
              ? options.to.map(email => ({ email }))
              : [{ email: options.to }],
          }],
          from: { email: options.from || this.fromEmail },
          subject: options.subject,
          content: [
            options.html && { type: 'text/html', value: options.html },
            options.text && { type: 'text/plain', value: options.text },
          ].filter(Boolean),
          reply_to: options.replyTo ? { email: options.replyTo } : undefined,
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`SendGrid error: ${error}`)
      }

      const messageId = response.headers.get('x-message-id')
      
      logger.info('Email enviado via SendGrid', {
        to: options.to,
        subject: options.subject,
        messageId,
      })

      return { success: true, messageId: messageId || undefined }
    } catch (error) {
      logger.error('Erro ao enviar email via SendGrid', { error, options })
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      }
    }
  }
}

// Resend Implementation
class ResendService implements EmailService {
  private apiKey: string
  private fromEmail: string

  constructor(apiKey: string, fromEmail: string) {
    this.apiKey = apiKey
    this.fromEmail = fromEmail
  }

  async send(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: options.from || this.fromEmail,
          to: options.to,
          subject: options.subject,
          html: options.html,
          text: options.text,
          reply_to: options.replyTo,
          attachments: options.attachments,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`Resend error: ${JSON.stringify(error)}`)
      }

      const data = await response.json()
      
      logger.info('Email enviado via Resend', {
        to: options.to,
        subject: options.subject,
        messageId: data.id,
      })

      return { success: true, messageId: data.id }
    } catch (error) {
      logger.error('Erro ao enviar email via Resend', { error, options })
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      }
    }
  }
}

// SMTP Implementation (usando nodemailer)
class SMTPService implements EmailService {
  private config: {
    host: string
    port: number
    user: string
    pass: string
  }
  private fromEmail: string

  constructor(config: { host: string; port: number; user: string; pass: string }, fromEmail: string) {
    this.config = config
    this.fromEmail = fromEmail
  }

  async send(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      // Nota: Esta implementação requer nodemailer
      // npm install nodemailer @types/nodemailer
      const nodemailer = await import('nodemailer')
      
      const transporter = nodemailer.default.createTransport({
        host: this.config.host,
        port: this.config.port,
        secure: this.config.port === 465,
        auth: {
          user: this.config.user,
          pass: this.config.pass,
        },
      })

      const info = await transporter.sendMail({
        from: options.from || this.fromEmail,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        replyTo: options.replyTo,
        attachments: options.attachments,
      })

      logger.info('Email enviado via SMTP', {
        to: options.to,
        subject: options.subject,
        messageId: info.messageId,
      })

      return { success: true, messageId: info.messageId }
    } catch (error) {
      logger.error('Erro ao enviar email via SMTP', { error, options })
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      }
    }
  }
}

// Mock Service (para desenvolvimento/testes)
class MockEmailService implements EmailService {
  async send(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
    console.log('📧 [MOCK EMAIL]', {
      to: options.to,
      subject: options.subject,
      preview: options.text?.substring(0, 100) || options.html?.substring(0, 100),
    })
    
    return {
      success: true,
      messageId: `mock-${Date.now()}`,
    }
  }
}

// Factory para criar o serviço apropriado
export function createEmailService(): EmailService {
  const env = process.env

  // SendGrid
  if (env.SENDGRID_API_KEY) {
    return new SendGridService(
      env.SENDGRID_API_KEY,
      env.SENDGRID_FROM_EMAIL || 'noreply@voluns.com'
    )
  }

  // Resend
  if (env.RESEND_API_KEY) {
    return new ResendService(
      env.RESEND_API_KEY,
      env.RESEND_FROM_EMAIL || 'noreply@voluns.com'
    )
  }

  // SMTP
  if (env.SMTP_HOST && env.SMTP_PORT && env.SMTP_USER && env.SMTP_PASS) {
    return new SMTPService(
      {
        host: env.SMTP_HOST,
        port: parseInt(env.SMTP_PORT),
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
      env.SMTP_FROM_EMAIL || env.SMTP_USER
    )
  }

  // Mock (desenvolvimento)
  console.warn('⚠️ Nenhum serviço de email configurado. Usando mock.')
  return new MockEmailService()
}

// Singleton
let emailServiceInstance: EmailService | null = null

export function getEmailService(): EmailService {
  if (!emailServiceInstance) {
    emailServiceInstance = createEmailService()
  }
  return emailServiceInstance
}

// Helper para enviar email
export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const service = getEmailService()
  return service.send(options)
}

