import { Suspense } from 'react'
import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { Pricing } from '@/components/landing/Pricing'
import { Testimonials } from '@/components/landing/Testimonials'
import { CTA } from '@/components/landing/CTA'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <main>
        <Suspense fallback={<div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">Carregando...</div>}>
          <Hero />
          <Features />
          <Pricing />
          <Testimonials />
          <CTA />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  )
}

