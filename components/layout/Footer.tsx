import Link from 'next/link'
import type { SVGProps } from 'react'

const footerNavigation = {
  produto: [
    { name: 'Recursos', href: '/recursos' },
    { name: 'Planos', href: '/precos' },
    { name: 'Clientes', href: '/test' },
    { name: 'Status', href: '/status' },
  ],
  suporte: [
    { name: 'Central de ajuda', href: '/help' },
    { name: 'Documentação', href: '/docs' },
    { name: 'Contato', href: '/contact' },
    { name: 'Roadmap', href: '/roadmap' },
  ],
  empresa: [
    { name: 'Sobre nós', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Carreiras', href: '/careers' },
    { name: 'Licenças', href: '/licenses' },
  ],
  legal: [
    { name: 'Privacidade', href: '/privacy' },
    { name: 'Termos', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
  ],
}

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4V8.5zm7.5 0h3.8v2.11h.05c.53-1 1.83-2.11 3.77-2.11 4.03 0 4.78 2.66 4.78 6.11V24h-4v-6.74c0-1.61-.03-3.68-2.24-3.68-2.24 0-2.58 1.75-2.58 3.56V24h-4V8.5z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com',
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M7 2C4.238 2 2 4.238 2 7v10c0 2.762 2.238 5 5 5h10c2.762 0 5-2.238 5-5V7c0-2.762-2.238-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 2.5A4.5 4.5 0 107 11a4.5 4.5 0 005-4.5zm0 2A2.5 2.5 0 119.5 11 2.5 2.5 0 0112 8.5zm4.75-2.75a1 1 0 11-1 1 1 1 0 011-1z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com',
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M21.8 8.001a2.752 2.752 0 00-1.94-1.952C18.58 5.667 12 5.667 12 5.667s-6.58 0-7.86.382A2.752 2.752 0 002.2 8.001 28.43 28.43 0 002 12a28.43 28.43 0 00.2 3.999 2.752 2.752 0 001.94 1.952c1.28.382 7.86.382 7.86.382s6.58 0 7.86-.382a2.752 2.752 0 001.94-1.952A28.43 28.43 0 0022 12a28.43 28.43 0 00-.2-3.999zM10 14.667V9.333L15 12l-5 2.667z" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-gray-900 font-semibold text-xl">
                V
              </div>
              <span className="text-xl font-semibold text-white">Voluns</span>
            </Link>
            <p className="text-sm text-gray-400">
              Plataforma de classe mundial para igrejas modernas. Organize voluntários, crie escalas inteligentes e mantenha sua comunidade engajada em todos os canais.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 transition-colors duration-200 hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {Object.entries(footerNavigation).map(([group, links]) => (
                <div key={group}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white">{group}</h3>
                  <ul role="list" className="mt-4 space-y-3 text-sm">
                    {links.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-gray-400 transition-colors duration-200 hover:text-white"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Voluns. Todos os direitos reservados.</p>
          <p className="mt-2 text-xs text-gray-500">
            Construído com foco em acessibilidade, desempenho e excelência operacional. Referência em UX inspirada por Uber, iFood e 99.
          </p>
        </div>
      </div>
    </footer>
  )
}
