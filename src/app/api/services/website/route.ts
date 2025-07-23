import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Configure email transporter (you'll need to add your email credentials)
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
      <h2>New Website Creation Request</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Company:</strong> ${body.company || 'Not provided'}</p>
      <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
      <p><strong>Website Type:</strong> ${body.websiteType}</p>
      <p><strong>Required Features:</strong> ${body.features?.join(', ') || 'None specified'}</p>
      <p><strong>Budget:</strong> ${body.budget}</p>
      <p><strong>Timeline:</strong> ${body.timeline}</p>
      <p><strong>Current Website:</strong> ${body.currentWebsite || 'None'}</p>
      <p><strong>Project Description:</strong></p>
      <p>${body.description}</p>
      <p><strong>Design Preferences:</strong></p>
      <p>${body.designPreferences || 'None specified'}</p>
    `

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@movastudio.com',
      to: process.env.CONTACT_EMAIL || 'contact@movastudio.com',
      subject: 'New Website Creation Request',
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
