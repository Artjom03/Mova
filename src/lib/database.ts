// Simple in-memory store for development
// In production, this would be a real database

export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  isVerified: boolean
  verificationCode?: string
  verificationExpires?: Date
  createdAt: Date
}

export interface PendingVerification {
  email: string
  code: string
  expires: Date
  name: string
  passwordHash: string
}

// In-memory stores (replace with database in production)
export const users: User[] = []
export const pendingVerifications: PendingVerification[] = []

export function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email)
}

export function findUserById(id: string): User | undefined {
  return users.find(user => user.id === id)
}

export function createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
  const user: User = {
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
    ...userData
  }
  users.push(user)
  return user
}

export function findPendingVerification(email: string): PendingVerification | undefined {
  return pendingVerifications.find(p => p.email === email)
}

export function addPendingVerification(verification: PendingVerification): void {
  // Remove any existing verification for this email
  const index = pendingVerifications.findIndex(p => p.email === verification.email)
  if (index !== -1) {
    pendingVerifications.splice(index, 1)
  }
  pendingVerifications.push(verification)
}

export function removePendingVerification(email: string): void {
  const index = pendingVerifications.findIndex(p => p.email === email)
  if (index !== -1) {
    pendingVerifications.splice(index, 1)
  }
}

export function cleanupExpiredVerifications(): void {
  const now = new Date()
  for (let i = pendingVerifications.length - 1; i >= 0; i--) {
    if (pendingVerifications[i].expires < now) {
      pendingVerifications.splice(i, 1)
    }
  }
}
