import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyAdminAccounts() {
  try {
    console.log('Verifying admin accounts...')

    const admins = await prisma.user.findMany({
      where: {
        role: 'ADMIN'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isVerified: true,
        createdAt: true
      }
    })

    console.log('Found admin accounts:')
    console.table(admins)

    console.log(`\nTotal admin accounts: ${admins.length}`)
  } catch (error) {
    console.error('Error verifying admin accounts:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyAdminAccounts()
