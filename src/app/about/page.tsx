'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              About Mova Studio
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              We are a digital agency dedicated to helping brands with a mission create impactful digital experiences.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center bg-white p-8 rounded-lg shadow-sm">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Creative Excellence</h3>
                <p className="mt-2 text-base text-gray-500">
                  We craft beautiful, functional designs that tell your story and engage your audience.
                </p>
              </div>

              <div className="text-center bg-white p-8 rounded-lg shadow-sm">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Technical Expertise</h3>
                <p className="mt-2 text-base text-gray-500">
                  Modern technologies and best practices for optimal performance and scalability.
                </p>
              </div>

              <div className="text-center bg-white p-8 rounded-lg shadow-sm">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Mission-Driven</h3>
                <p className="mt-2 text-base text-gray-500">
                  We partner with brands that want to make a positive impact in the world.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  Founded with the belief that great design should serve a greater purpose, Mova Studio has been helping 
                  mission-driven brands create meaningful digital experiences since our inception.
                </p>
                <p className="mb-4">
                  Our team combines creative vision with technical expertise to deliver solutions that not only look 
                  beautiful but also drive real results for our clients and their audiences.
                </p>
                <p>
                  Whether you&apos;re a startup with a bold vision or an established organization looking to make a bigger 
                  impact, we&apos;re here to help you tell your story and achieve your goals through the power of 
                  thoughtful design and development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
