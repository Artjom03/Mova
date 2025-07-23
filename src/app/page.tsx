'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      <Header />

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-gray-700 text-lg mb-8 font-light">
            built for brands with a mission
          </p>
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold text-gray-900 tracking-wider mb-12">
            MOVA
          </h1>
          <div className="space-x-4">
            <Link href="/services">
              <Button 
                variant="primary" 
                className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-medium"
              >
                Services
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                variant="primary" 
                className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-medium"
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
