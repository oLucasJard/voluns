// Middleware de validação para APIs
// Inspirado em práticas de grandes empresas como Stripe e GitHub

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { validateAndSanitize, sanitizeString } from './schemas'

// Configurações de validação
interface ValidationConfig {
  body?: z.ZodSchema
  query?: z.ZodSchema
  params?: z.ZodSchema
  headers?: z.ZodSchema
  sanitize?: boolean
  strict?: boolean
}

// Classe para middleware de validação
class ValidationMiddleware {
  private config: ValidationConfig

  constructor(config: ValidationConfig) {
    this.config = config
  }

  // Validar request
  async validate(request: NextRequest): Promise<{
    success: boolean
    data?: any
    errors?: string[]
    response?: NextResponse
  }> {
    const errors: string[] = []
    const validatedData: any = {}

    try {
      // Validar body se fornecido
      if (this.config.body) {
        const bodyResult = await this.validateBody(request)
        if (!bodyResult.success) {
          errors.push(...bodyResult.errors)
        } else {
          validatedData.body = bodyResult.data
        }
      }

      // Validar query parameters se fornecido
      if (this.config.query) {
        const queryResult = this.validateQuery(request)
        if (!queryResult.success) {
          errors.push(...queryResult.errors)
        } else {
          validatedData.query = queryResult.data
        }
      }

      // Validar params se fornecido
      if (this.config.params) {
        const paramsResult = this.validateParams(request)
        if (!paramsResult.success) {
          errors.push(...paramsResult.errors)
        } else {
          validatedData.params = paramsResult.data
        }
      }

      // Validar headers se fornecido
      if (this.config.headers) {
        const headersResult = this.validateHeaders(request)
        if (!headersResult.success) {
          errors.push(...headersResult.errors)
        } else {
          validatedData.headers = headersResult.data
        }
      }

      // Se há erros, retornar resposta de erro
      if (errors.length > 0) {
        return {
          success: false,
          errors,
          response: NextResponse.json(
            {
              error: 'Validation failed',
              message: 'Dados de entrada inválidos',
              details: errors
            },
            { status: 400 }
          )
        }
      }

      return {
        success: true,
        data: validatedData
      }
    } catch (error) {
      console.error('Validation middleware error:', error)
      return {
        success: false,
        errors: ['Erro interno de validação'],
        response: NextResponse.json(
          {
            error: 'Internal validation error',
            message: 'Erro interno do servidor'
          },
          { status: 500 }
        )
      }
    }
  }

  // Validar body da requisição
  private async validateBody(request: NextRequest): Promise<{
    success: boolean
    data?: any
    errors: string[]
  }> {
    try {
      const contentType = request.headers.get('content-type')
      
      if (!contentType || !contentType.includes('application/json')) {
        return {
          success: false,
          errors: ['Content-Type deve ser application/json']
        }
      }

      const body = await request.json()
      
      if (this.config.sanitize) {
        // Sanitizar dados do body
        const sanitizedBody = this.sanitizeObject(body)
        const result = validateAndSanitize(this.config.body!, sanitizedBody)
        return result
      } else {
        const result = this.config.body!.safeParse(body)
        if (result.success) {
          return { success: true, data: result.data }
        } else {
          return {
            success: false,
            errors: result.error.errors.map(err => err.message)
          }
        }
      }
    } catch (error) {
      return {
        success: false,
        errors: ['Body inválido ou malformado']
      }
    }
  }

  // Validar query parameters
  private validateQuery(request: NextRequest): {
    success: boolean
    data?: any
    errors: string[]
  } {
    try {
      const url = new URL(request.url)
      const queryParams: Record<string, string> = {}
      
      url.searchParams.forEach((value, key) => {
        queryParams[key] = value
      })

      if (this.config.sanitize) {
        // Sanitizar query parameters
        const sanitizedQuery = this.sanitizeObject(queryParams)
        const result = validateAndSanitize(this.config.query!, sanitizedQuery)
        return result
      } else {
        const result = this.config.query!.safeParse(queryParams)
        if (result.success) {
          return { success: true, data: result.data }
        } else {
          return {
            success: false,
            errors: result.error.errors.map(err => err.message)
          }
        }
      }
    } catch (error) {
      return {
        success: false,
        errors: ['Query parameters inválidos']
      }
    }
  }

  // Validar parâmetros da URL
  private validateParams(request: NextRequest): {
    success: boolean
    data?: any
    errors: string[]
  } {
    try {
      // Extrair parâmetros da URL (implementação básica)
      const url = new URL(request.url)
      const pathSegments = url.pathname.split('/').filter(Boolean)
      
      // Mapear parâmetros dinâmicos (ex: [id] -> id)
      const params: Record<string, string> = {}
      const pathname = request.nextUrl.pathname
      
      // Extrair IDs de UUID da URL
      const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi
      const matches = pathname.match(uuidRegex)
      
      if (matches) {
        matches.forEach((match, index) => {
          params[`param${index + 1}`] = match
        })
      }

      if (this.config.sanitize) {
        const sanitizedParams = this.sanitizeObject(params)
        const result = validateAndSanitize(this.config.params!, sanitizedParams)
        return result
      } else {
        const result = this.config.params!.safeParse(params)
        if (result.success) {
          return { success: true, data: result.data }
        } else {
          return {
            success: false,
            errors: result.error.errors.map(err => err.message)
          }
        }
      }
    } catch (error) {
      return {
        success: false,
        errors: ['Parâmetros da URL inválidos']
      }
    }
  }

  // Validar headers
  private validateHeaders(request: NextRequest): {
    success: boolean
    data?: any
    errors: string[]
  } {
    try {
      const headers: Record<string, string> = {}
      
      request.headers.forEach((value, key) => {
        headers[key] = value
      })

      if (this.config.sanitize) {
        const sanitizedHeaders = this.sanitizeObject(headers)
        const result = validateAndSanitize(this.config.headers!, sanitizedHeaders)
        return result
      } else {
        const result = this.config.headers!.safeParse(headers)
        if (result.success) {
          return { success: true, data: result.data }
        } else {
          return {
            success: false,
            errors: result.error.errors.map(err => err.message)
          }
        }
      }
    } catch (error) {
      return {
        success: false,
        errors: ['Headers inválidos']
      }
    }
  }

  // Sanitizar objeto recursivamente
  private sanitizeObject(obj: any): any {
    if (typeof obj === 'string') {
      return sanitizeString(obj)
    } else if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeObject(item))
    } else if (obj && typeof obj === 'object') {
      const sanitized: any = {}
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = this.sanitizeObject(value)
      }
      return sanitized
    }
    return obj
  }
}

// Função para criar middleware de validação
export function createValidationMiddleware(config: ValidationConfig) {
  const middleware = new ValidationMiddleware(config)
  
  return async (request: NextRequest) => {
    return middleware.validate(request)
  }
}

// Middlewares pré-configurados para diferentes tipos de API
export const validationMiddlewares = {
  // Validação para criação de eventos
  createEvent: createValidationMiddleware({
    body: z.object({
      name: z.string().min(1).max(100),
      description: z.string().max(1000).optional(),
      date: z.string().datetime(),
      start_time: z.string().optional(),
      end_time: z.string().optional(),
      location: z.string().max(200).optional(),
      ministry_id: z.string().uuid()
    }),
    sanitize: true
  }),

  // Validação para criação de voluntários
  createVolunteer: createValidationMiddleware({
    body: z.object({
      user_id: z.string().uuid(),
      ministry_id: z.string().uuid(),
      position: z.string().max(100).optional(),
      skills: z.array(z.string()).optional()
    }),
    sanitize: true
  }),

  // Validação para paginação
  pagination: createValidationMiddleware({
    query: z.object({
      page: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().min(1).max(1000)),
      limit: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().min(1).max(100)),
      sort: z.string().max(50).optional(),
      order: z.enum(['asc', 'desc']).optional()
    })
  }),

  // Validação para busca
  search: createValidationMiddleware({
    query: z.object({
      q: z.string().min(1).max(100),
      filters: z.string().optional()
    }),
    sanitize: true
  }),

  // Validação para autenticação
  auth: createValidationMiddleware({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(8)
    }),
    sanitize: true
  })
}

// Função utilitária para validar em handlers de API
export async function validateRequest(
  request: NextRequest,
  config: ValidationConfig
): Promise<{
  success: boolean
  data?: any
  response?: NextResponse
}> {
  const middleware = new ValidationMiddleware(config)
  return middleware.validate(request)
}

export default ValidationMiddleware



