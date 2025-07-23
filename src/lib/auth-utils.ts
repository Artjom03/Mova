import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export function generateVerificationCode(): string {
  return Math.random().toString(10).substr(2, 6).padStart(6, '0')
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateJWT(payload: { userId: string, email: string }): string {
  const secret = process.env.JWT_SECRET || 'default-secret-change-in-production'
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d'
  
  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions)
}

export function verifyJWT(token: string): { userId: string, email: string } | null {
  try {
    const secret = process.env.JWT_SECRET || 'default-secret-change-in-production'
    const decoded = jwt.verify(token, secret) as { userId: string, email: string }
    return decoded
  } catch (error) {
    return null
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPassword(password: string): boolean {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}
