import nodemailer from 'nodemailer'

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `${process.env.FROM_NAME || 'Mova Studio'} <${process.env.SMTP_FROM}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    })

    console.log('Email sent: ', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email error: ', error)
    return { success: false, error: error }
  }
}

export function generateVerificationEmailHtml(verificationCode: string, email: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email - Mova Studio</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
        }
        .header { 
          text-align: center; 
          padding: 20px 0; 
          border-bottom: 1px solid #eee; 
        }
        .logo { 
          font-size: 24px; 
          font-weight: bold; 
          color: #1a73e8; 
        }
        .content { 
          padding: 30px 0; 
        }
        .verification-code { 
          background: #f8f9fa; 
          border: 2px dashed #1a73e8; 
          padding: 20px; 
          text-align: center; 
          margin: 20px 0; 
          border-radius: 8px; 
        }
        .code { 
          font-size: 32px; 
          font-weight: bold; 
          color: #1a73e8; 
          letter-spacing: 4px; 
          font-family: monospace; 
        }
        .footer { 
          border-top: 1px solid #eee; 
          padding-top: 20px; 
          text-align: center; 
          color: #666; 
          font-size: 14px; 
        }
        .button {
          display: inline-block;
          background: #1a73e8;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Mova Studio</div>
      </div>
      
      <div class="content">
        <h1>Verify Your Email Address</h1>
        <p>Hello!</p>
        <p>Thank you for signing up for Mova Studio. To complete your registration, please use the verification code below:</p>
        
        <div class="verification-code">
          <p style="margin: 0; font-size: 14px; color: #666;">Your verification code is:</p>
          <div class="code">${verificationCode}</div>
          <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">This code expires in 10 minutes</p>
        </div>
        
        <p>If you didn't request this verification, please ignore this email.</p>
        <p>For security reasons, please don't share this code with anyone.</p>
      </div>
      
      <div class="footer">
        <p>&copy; 2025 Mova Studio. All rights reserved.</p>
        <p>This email was sent to ${email}</p>
      </div>
    </body>
    </html>
  `
}
