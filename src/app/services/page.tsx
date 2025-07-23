'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

type ServiceType = 'website' | 'content-creation' | 'content-editing' | null

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceType>(null)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Choose Your Service
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Select the service you need and fill out the form to get started
          </p>
        </div>

        {!selectedService ? (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Website Creation Service */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Website Creation</h3>
                <p className="text-gray-600 mb-6">
                  Professional, responsive websites tailored to your business needs and brand identity.
                </p>
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => setSelectedService('website')}
                >
                  Choose This Service
                </Button>
              </div>
            </div>

            {/* Content Creation Service */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Content Creation</h3>
                <p className="text-gray-600 mb-6">
                  Engaging content that resonates with your audience and drives conversions.
                </p>
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => setSelectedService('content-creation')}
                >
                  Choose This Service
                </Button>
              </div>
            </div>

            {/* Content Editing Service */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Content Editing</h3>
                <p className="text-gray-600 mb-6">
                  Professional editing and optimization of your existing content for maximum impact.
                </p>
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => setSelectedService('content-editing')}
                >
                  Choose This Service
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedService === 'website' && 'Website Creation Form'}
                  {selectedService === 'content-creation' && 'Content Creation Form'}
                  {selectedService === 'content-editing' && 'Content Editing Form'}
                </h2>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedService(null)}
                >
                  Back to Services
                </Button>
              </div>

              {selectedService === 'website' && <WebsiteForm />}
              {selectedService === 'content-creation' && <ContentCreationForm />}
              {selectedService === 'content-editing' && <ContentEditingForm />}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

function WebsiteForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    websiteType: '',
    features: [] as string[],
    budget: '',
    timeline: '',
    description: '',
    currentWebsite: '',
    designPreferences: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFeatureChange = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/services/website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        alert('Thank you! Your website creation request has been submitted. We\'ll contact you soon.')
        setFormData({
          name: '', email: '', company: '', phone: '', websiteType: '',
          features: [], budget: '', timeline: '', description: '', currentWebsite: '', designPreferences: ''
        })
      } else {
        console.error('Error submitting request')
        alert('There was an error submitting your request. Please try again.')
      }
    } catch (err) {
      console.error('Error submitting request:', err)
      alert('There was an error submitting your request. Please try again.')
    }
    
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Type of Website *
        </label>
        <select
          name="websiteType"
          required
          value={formData.websiteType}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select website type</option>
          <option value="business">Business Website</option>
          <option value="ecommerce">E-commerce</option>
          <option value="portfolio">Portfolio</option>
          <option value="blog">Blog</option>
          <option value="landing">Landing Page</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Required Features (select all that apply)
        </label>
        <div className="grid md:grid-cols-2 gap-2">
          {['Contact Forms', 'Online Store', 'Blog', 'Photo Gallery', 'User Registration', 'Payment Integration', 'Social Media Integration', 'SEO Optimization'].map(feature => (
            <label key={feature} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.features.includes(feature)}
                onChange={() => handleFeatureChange(feature)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Budget Range *
          </label>
          <select
            name="budget"
            required
            value={formData.budget}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select budget range</option>
            <option value="under-1000">Under $1,000</option>
            <option value="1000-3000">$1,000 - $3,000</option>
            <option value="3000-5000">$3,000 - $5,000</option>
            <option value="5000-10000">$5,000 - $10,000</option>
            <option value="over-10000">Over $10,000</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Timeline *
          </label>
          <select
            name="timeline"
            required
            value={formData.timeline}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select timeline</option>
            <option value="asap">ASAP</option>
            <option value="1-month">Within 1 month</option>
            <option value="2-3-months">2-3 months</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Current Website (if any)
        </label>
        <input
          type="url"
          name="currentWebsite"
          value={formData.currentWebsite}
          onChange={handleInputChange}
          placeholder="https://yourwebsite.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Project Description *
        </label>
        <textarea
          name="description"
          required
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Tell us about your project, goals, and any specific requirements..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Design Preferences
        </label>
        <textarea
          name="designPreferences"
          rows={3}
          value={formData.designPreferences}
          onChange={handleInputChange}
          placeholder="Any specific design preferences, color schemes, or websites you like..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="large"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Website Request'}
      </Button>
    </form>
  )
}

function ContentCreationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    contentType: '',
    contentPurpose: '',
    targetAudience: '',
    quantity: '',
    budget: '',
    timeline: '',
    description: '',
    existingContent: '',
    brandGuidelines: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/services/content-creation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        alert('Thank you! Your content creation request has been submitted. We\'ll contact you soon.')
        setFormData({
          name: '', email: '', company: '', phone: '', contentType: '',
          contentPurpose: '', targetAudience: '', quantity: '', budget: '', timeline: '',
          description: '', existingContent: '', brandGuidelines: ''
        })
      } else {
        console.error('Error submitting request')
        alert('There was an error submitting your request. Please try again.')
      }
    } catch (err) {
      console.error('Error submitting request:', err)
      alert('There was an error submitting your request. Please try again.')
    }
    
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Type of Content *
        </label>
        <select
          name="contentType"
          required
          value={formData.contentType}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select content type</option>
          <option value="blog-posts">Blog Posts</option>
          <option value="website-copy">Website Copy</option>
          <option value="product-descriptions">Product Descriptions</option>
          <option value="social-media">Social Media Content</option>
          <option value="email-campaigns">Email Campaigns</option>
          <option value="marketing-materials">Marketing Materials</option>
          <option value="technical-writing">Technical Writing</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Content Purpose *
        </label>
        <select
          name="contentPurpose"
          required
          value={formData.contentPurpose}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select purpose</option>
          <option value="brand-awareness">Brand Awareness</option>
          <option value="lead-generation">Lead Generation</option>
          <option value="sales-conversion">Sales Conversion</option>
          <option value="education">Education/Information</option>
          <option value="seo">SEO/Organic Traffic</option>
          <option value="engagement">Audience Engagement</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Target Audience *
        </label>
        <textarea
          name="targetAudience"
          required
          rows={3}
          value={formData.targetAudience}
          onChange={handleInputChange}
          placeholder="Describe your target audience (demographics, interests, pain points, etc.)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Quantity Needed *
          </label>
          <input
            type="text"
            name="quantity"
            required
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="e.g., 5 blog posts, 10 product descriptions"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Budget Range *
          </label>
          <select
            name="budget"
            required
            value={formData.budget}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select budget range</option>
            <option value="under-500">Under $500</option>
            <option value="500-1500">$500 - $1,500</option>
            <option value="1500-3000">$1,500 - $3,000</option>
            <option value="3000-5000">$3,000 - $5,000</option>
            <option value="over-5000">Over $5,000</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Timeline *
        </label>
        <select
          name="timeline"
          required
          value={formData.timeline}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select timeline</option>
          <option value="1-week">Within 1 week</option>
          <option value="2-weeks">Within 2 weeks</option>
          <option value="1-month">Within 1 month</option>
          <option value="flexible">Flexible</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Project Description *
        </label>
        <textarea
          name="description"
          required
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe your content needs, goals, key messages, and any specific requirements..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Existing Content Examples
        </label>
        <textarea
          name="existingContent"
          rows={3}
          value={formData.existingContent}
          onChange={handleInputChange}
          placeholder="Share links or examples of existing content you like or want to improve upon..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Brand Guidelines
        </label>
        <textarea
          name="brandGuidelines"
          rows={3}
          value={formData.brandGuidelines}
          onChange={handleInputChange}
          placeholder="Share your brand voice, tone, style guidelines, or any specific requirements..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="large"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Content Creation Request'}
      </Button>
    </form>
  )
}

function ContentEditingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    contentType: '',
    editingType: '',
    contentLength: '',
    currentContent: '',
    goals: '',
    budget: '',
    timeline: '',
    description: '',
    styleGuide: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/services/content-editing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        alert('Thank you! Your content editing request has been submitted. We\'ll contact you soon.')
        setFormData({
          name: '', email: '', company: '', phone: '', contentType: '',
          editingType: '', contentLength: '', currentContent: '', goals: '',
          budget: '', timeline: '', description: '', styleGuide: ''
        })
      } else {
        console.error('Error submitting request')
        alert('There was an error submitting your request. Please try again.')
      }
    } catch (err) {
      console.error('Error submitting request:', err)
      alert('There was an error submitting your request. Please try again.')
    }
    
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Type of Content to Edit *
        </label>
        <select
          name="contentType"
          required
          value={formData.contentType}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select content type</option>
          <option value="blog-posts">Blog Posts</option>
          <option value="website-copy">Website Copy</option>
          <option value="marketing-materials">Marketing Materials</option>
          <option value="documents">Documents/Reports</option>
          <option value="social-media">Social Media Content</option>
          <option value="email-campaigns">Email Campaigns</option>
          <option value="product-descriptions">Product Descriptions</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Type of Editing Needed *
        </label>
        <select
          name="editingType"
          required
          value={formData.editingType}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select editing type</option>
          <option value="proofreading">Proofreading (grammar, spelling, punctuation)</option>
          <option value="copy-editing">Copy Editing (style, clarity, flow)</option>
          <option value="content-editing">Content Editing (structure, organization)</option>
          <option value="seo-optimization">SEO Optimization</option>
          <option value="rewriting">Rewriting/Restructuring</option>
          <option value="comprehensive">Comprehensive Editing</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Content Length *
        </label>
        <select
          name="contentLength"
          required
          value={formData.contentLength}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select approximate length</option>
          <option value="under-500">Under 500 words</option>
          <option value="500-1500">500 - 1,500 words</option>
          <option value="1500-3000">1,500 - 3,000 words</option>
          <option value="3000-5000">3,000 - 5,000 words</option>
          <option value="over-5000">Over 5,000 words</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Current Content *
        </label>
        <textarea
          name="currentContent"
          required
          rows={5}
          value={formData.currentContent}
          onChange={handleInputChange}
          placeholder="Paste your content here or provide a link/description of the content to be edited..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Goals for Editing *
        </label>
        <textarea
          name="goals"
          required
          rows={3}
          value={formData.goals}
          onChange={handleInputChange}
          placeholder="What do you want to achieve with this editing? (improve readability, SEO, conversions, etc.)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Budget Range *
          </label>
          <select
            name="budget"
            required
            value={formData.budget}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select budget range</option>
            <option value="under-200">Under $200</option>
            <option value="200-500">$200 - $500</option>
            <option value="500-1000">$500 - $1,000</option>
            <option value="1000-2000">$1,000 - $2,000</option>
            <option value="over-2000">Over $2,000</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Timeline *
          </label>
          <select
            name="timeline"
            required
            value={formData.timeline}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select timeline</option>
            <option value="24-hours">Within 24 hours</option>
            <option value="3-days">Within 3 days</option>
            <option value="1-week">Within 1 week</option>
            <option value="2-weeks">Within 2 weeks</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Additional Details
        </label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Any additional information, specific requirements, or concerns..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Style Guide/Preferences
        </label>
        <textarea
          name="styleGuide"
          rows={3}
          value={formData.styleGuide}
          onChange={handleInputChange}
          placeholder="Any style preferences, brand voice, or specific formatting requirements..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="large"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Content Editing Request'}
      </Button>
    </form>
  )
}
