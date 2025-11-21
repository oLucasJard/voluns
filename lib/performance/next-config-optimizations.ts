/**
 * Otimizações Avançadas para Next.js
 * 
 * Configurações de performance inspiradas em grandes empresas:
 * - Airbnb: Bundle splitting inteligente
 * - Netflix: Preload e prefetch otimizados
 * - Vercel: Edge caching strategies
 */

export const performanceConfig = {
  // Experimental features para melhor performance
  experimental: {
    // Otimizar CSS automaticamente
    optimizeCss: true,
    
    // Lazy load de pacotes específicos
    optimizePackageImports: [
      '@heroicons/react',
      'framer-motion',
      'date-fns',
      'recharts',
      'lucide-react'
    ],
    
    // Server Actions (Next.js 14+)
    serverActions: true,
    
    // Turbo mode para builds mais rápidos
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Compilador SWC otimizado
  compiler: {
    // Remover console.logs em produção
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn', 'info'],
    } : false,
    
    // Minificação agressiva
    styledComponents: false,
    
    // React optimizations
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },

  // Images optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Webpack optimizations
  webpack: (config: any, { dev, isServer }: any) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Cache configuração para builds incrementais
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      }

      // Otimizar chunk splitting
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            
            // Framework bundle (React, React-DOM)
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 40,
              enforce: true,
            },
            
            // Lib bundle (bibliotecas grandes)
            lib: {
              test(module: any) {
                return (
                  module.size() > 160000 &&
                  /node_modules[/\\]/.test(module.identifier())
                )
              },
              name(module: any) {
                const hash = require('crypto').createHash('sha1')
                hash.update(module.identifier())
                return hash.digest('hex').substring(0, 8)
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            
            // Commons bundle (código compartilhado)
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
            
            // Shared bundle (CSS e assets)
            shared: {
              name(module: any, chunks: any) {
                const crypto = require('crypto')
                return (
                  crypto
                    .createHash('sha1')
                    .update(chunks.reduce((acc: any, chunk: any) => acc + chunk.name, ''))
                    .digest('hex') +
                  (module.type === 'css/mini-extract' ? '_CSS' : '')
                )
              },
              priority: 10,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
          maxInitialRequests: 25,
          minSize: 20000,
        },
      }
    }

    return config
  },

  // Headers de segurança e performance
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          // DNS Prefetch
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // HSTS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Prevent MIME sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // XSS Protection
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
      // Cache para assets estáticos
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache para imagens
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Redirects e rewrites otimizados
  redirects: async () => {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

/**
 * Função auxiliar para aplicar todas as otimizações
 */
export function applyPerformanceOptimizations(nextConfig: any) {
  return {
    ...nextConfig,
    ...performanceConfig,
    experimental: {
      ...nextConfig.experimental,
      ...performanceConfig.experimental,
    },
    compiler: {
      ...nextConfig.compiler,
      ...performanceConfig.compiler,
    },
    images: {
      ...nextConfig.images,
      ...performanceConfig.images,
    },
  }
}

