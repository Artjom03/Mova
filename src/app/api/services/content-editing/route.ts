import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Create email content
    const emailContent = `
      <h2>New Content Editing Request</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Company:</strong> ${body.company || 'Not provided'}</p>
      <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
      <p><strong>Content Type:</strong> ${body.contentType}</p>
      <p><strong>Editing Type:</strong> ${body.editingType}</p>
      <p><strong>Content Length:</strong> ${body.contentLength}</p>
      <p><strong>Budget:</strong> ${body.budget}</p>
      <p><strong>Timeline:</strong> ${body.timeline}</p>
      <p><strong>Goals:</strong></p>
      <p>${body.goals}</p>
      <p><strong>Current Content:</strong></p>
      <p>${body.currentContent}</p>
      <p><strong>Additional Details:</strong></p>
      <p>${body.description || 'None provided'}</p>
      <p><strong>Style Guide:</strong></p>
      <p>${body.styleGuide || 'None provided'}</p>
    `

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@movastudio.com',
      to: process.env.CONTACT_EMAIL || 'contact@movastudio.com',
      subject: 'New Content Editing Request',
      html: emailContent,
    })

    return NextResponse.json({ success: true, message: 'Request submitted successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit request' },
      { status: 500 }
    )
  }
}
