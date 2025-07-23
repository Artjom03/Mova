import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { 
  generateVerificationCode, 
  isValidEmail, 
  isValidPassword 
} from '@/lib/auth-utils'
import { sendEmail, generateVerificationEmailHtml } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        { 
          error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number' 
        },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        )
      } else {
        // User exists but not verified, resend verification
        const verificationCode = generateVerificationCode()
        
        // Update or create verification code
        await prisma.verificationCode.upsert({
          where: { email },
          update: {
            code: verificationCode,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
          },
          create: {
            email,
            code: verificationCode,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
          }
        })

        // For development, we'll log the code
        console.log(`Verification code for ${email}: ${verificationCode}`)
        
        return NextResponse.json(
          { 
            message: 'Verification code resent. Please check your email.',
            email,
            // For development only - remove in production
            verificationCode
          },
          { status: 200 }
        )
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Generate verification code
    const verificationCode = generateVerificationCode()

    // Create user (unverified)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: passwordHash,
        isVerified: false
      }
    })

    // Create verification code
    await prisma.verificationCode.create({
      data: {
        email,
        code: verificationCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      }
    })

    // For development, we'll log the code
    console.log(`Verification code for ${email}: ${verificationCode}`)
    
    // Simulate email sending (uncomment for production with proper SMTP config)
    /*
    try {
      const emailHtml = generateVerificationEmailHtml(verificationCode, email)
      await sendEmail({
        to: email,
        subject: 'Verify your email - Mova Studio',
        html: emailHtml
      })
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError)
      // For development, continue without failing
    }
    */

    return NextResponse.json(
      { 
        message: 'Registration initiated. Please check your email for verification code.',
        email,
        // For development only - remove in production
        verificationCode
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    )
  }
}
