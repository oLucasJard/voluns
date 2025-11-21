import { NextRequest, NextResponse } from 'next/server'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@apollo/server/adapters/start'
import { typeDefs } from '@/lib/graphql/schema'
import { resolvers } from '@/lib/graphql/resolvers'

// Configurar servidor Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV === 'development',
  plugins: [
    // Plugin para logging de queries
    {
      requestDidStart() {
        return {
          willSendResponse(requestContext) {
            console.log(`🔍 GraphQL Query: ${requestContext.request.operationName || 'Anonymous'}`)
            console.log(`📊 GraphQL Variables:`, requestContext.request.variables)
          }
        }
      }
    }
  ]
})

// Criar handler para Next.js
const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    // Contexto para resolvers
    return {
      req,
      // Adicionar autenticação, autorização, etc.
      user: null, // Implementar lógica de autenticação
      church: null // Implementar lógica de igreja
    }
  }
})

// Handler para requisições GraphQL
export async function GET(req: NextRequest) {
  return handler(req)
}

export async function POST(req: NextRequest) {
  return handler(req)
}

// Handler para GraphQL Playground (apenas em desenvolvimento)
export async function OPTIONS(req: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
  }
  
  return new NextResponse(null, { status: 405 })
}



