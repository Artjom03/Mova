import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateJWT } from '@/lib/auth-utils'

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      )
    }

    // Find verification code
    const verificationRecord = await prisma.verificationCode.findUnique({
      where: { email }
    })

    if (!verificationRecord) {
      return NextResponse.json(
        { error: 'No pending verification found for this email' },
        { status: 404 }
      )
    }

    // Check if verification code has expired
    if (verificationRecord.expiresAt < new Date()) {
      // Delete expired verification code
      await prisma.verificationCode.delete({
        where: { email }
      })
      return NextResponse.json(
        { error: 'Verification code has expired. Please register again.' },
        { status: 410 }
      )
    }

    // Verify code
    if (verificationRecord.code !== code) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      )
    }

    // Find and update user to verified
    const user = await prisma.user.update({
      where: { email },
      data: { isVerified: true }
    })

    // Delete verification code
    await prisma.verificationCode.delete({
      where: { email }
    })

    // Generate JWT token
    const token = generateJWT({ userId: user.id, email: user.email })

    // Set HTTP-only cookie
    const response = NextResponse.json(
      { 
        message: 'Email verified successfully!',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified
        }
      },
      { status: 200 }
    )

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response

  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Verification failed. Please try again.' },
      { status: 500 }
    )
  }
}
