import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function addAdminAccounts() {
  try {
    console.log('Adding admin accounts...')

    // Admin account 1
    const admin1Email = 'Artjom.extra@gmail.com'
    const admin1Password = 'Artjom2003'
    const admin1HashedPassword = await bcrypt.hash(admin1Password, 12)

    // Admin account 2
    const admin2Email = 'jacobadesaever44@gmail.com'
    const admin2Password = 'Amira2003'
    const admin2HashedPassword = await bcrypt.hash(admin2Password, 12)

    // Check if admin1 already exists
    const existingAdmin1 = await prisma.user.findUnique({
      where: { email: admin1Email }
    })

    if (!existingAdmin1) {
      await prisma.user.create({
        data: {
          email: admin1Email,
          name: 'Artjom (Admin)',
          passwordHash: admin1HashedPassword,
          isVerified: true,
          role: UserRole.ADMIN
        }
      })
      console.log(`✅ Admin account created: ${admin1Email}`)
    } else {
      console.log(`⚠️  Admin account already exists: ${admin1Email}`)
    }

    // Check if admin2 already exists
    const existingAdmin2 = await prisma.user.findUnique({
      where: { email: admin2Email }
    })

    if (!existingAdmin2) {
      await prisma.user.create({
        data: {
          email: admin2Email,
          name: 'Jacob (Admin)',
          passwordHash: admin2HashedPassword,
          isVerified: true,
          role: UserRole.ADMIN
        }
      })
      console.log(`✅ Admin account created: ${admin2Email}`)
    } else {
      console.log(`⚠️  Admin account already exists: ${admin2Email}`)
    }

    console.log('Admin accounts setup completed!')
  } catch (error) {
    console.error('Error adding admin accounts:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addAdminAccounts()
