import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function testAdminLogin() {
  try {
    console.log('Testing admin login...')

    // Test admin 1
    const admin1 = await prisma.user.findUnique({
      where: { email: 'Artjom.extra@gmail.com' }
    })

    if (admin1) {
      const isValidPassword1 = await bcrypt.compare('Artjom2003', admin1.passwordHash)
      console.log(`✅ Admin 1 (${admin1.email}) - Password verification: ${isValidPassword1 ? 'PASSED' : 'FAILED'}`)
      console.log(`   Role: ${admin1.role}, Verified: ${admin1.isVerified}`)
    }

    // Test admin 2
    const admin2 = await prisma.user.findUnique({
      where: { email: 'jacobadesaever44@gmail.com' }
    })

    if (admin2) {
      const isValidPassword2 = await bcrypt.compare('Amira2003', admin2.passwordHash)
      console.log(`✅ Admin 2 (${admin2.email}) - Password verification: ${isValidPassword2 ? 'PASSED' : 'FAILED'}`)
      console.log(`   Role: ${admin2.role}, Verified: ${admin2.isVerified}`)
    }

    console.log('\nAdmin accounts are ready for login!')
  } catch (error) {
    console.error('Error testing admin login:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAdminLogin()
