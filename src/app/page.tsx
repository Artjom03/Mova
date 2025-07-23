'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex">
              <Link href="/" className="flex items-center">
                <span className="text-lg font-medium text-gray-700">Mova studio</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#about" className="text-gray-600 hover:text-gray-900 text-sm">
                About
              </Link>
              <Link href="/services" className="text-gray-600 hover:text-gray-900 text-sm">
                Services
              </Link>
              <Link href="#plans" className="text-gray-600 hover:text-gray-900 text-sm">
                Plans
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-gray-900 text-sm">
                Contact
              </Link>
            </div>
            <div className="hidden md:flex items-center">
              <span className="text-sm text-gray-600">amiradesaev</span>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg mt-2">
                <Link href="#about" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">
                  About
                </Link>
                <Link href="/services" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">
                  Services
                </Link>
                <Link href="#plans" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">
                  Plans
                </Link>
                <Link href="#contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center min-h-[80vh]">
        <div className="text-center px-4">
          <p className="text-gray-700 text-lg mb-8 font-light">
            built for brands with a mission
          </p>
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold text-gray-900 tracking-wider mb-12">
            MOVA
          </h1>
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
  )
}
