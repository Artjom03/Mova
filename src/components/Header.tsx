'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/lib/auth'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout, isLoading } = useAuth()

  const handleLogout = async () => {
    await logout()
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-lg font-medium text-gray-700">Mova studio</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">
              About
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-gray-900 text-sm">
              Services
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">
              Contact
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/profile" className="text-sm text-gray-600 hover:text-gray-900">
                  {user?.name}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link href="/register">
                  <Button variant="primary">Get Started</Button>
                </Link>
              </>
            )}
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
              <Link href="/" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">
                Home
              </Link>
              <Link href="/about" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">
                About
              </Link>
              <Link href="/services" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">
                Services
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">
                Contact
              </Link>
              <div className="border-t pt-2 mt-2">
                {isAuthenticated ? (
                  <>
                    <Link href="/profile" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
                      {user?.name}
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block px-3 py-2 text-sm text-gray-500 hover:text-gray-700 w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
                      Log in
                    </Link>
                    <Link href="/register" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
