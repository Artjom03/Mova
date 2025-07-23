import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateAdminName() {
  try {
    console.log('Updating admin name...')

    const updatedUser = await prisma.user.update({
      where: {
        email: 'jacobadesaever44@gmail.com'
      },
      data: {
        name: 'Amira (Admin)'
      }
    })

    console.log(`✅ Admin name updated successfully:`)
    console.log(`   Email: ${updatedUser.email}`)
    console.log(`   Name: ${updatedUser.name}`)
    console.log(`   Role: ${updatedUser.role}`)

  } catch (error) {
    console.error('Error updating admin name:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateAdminName()
