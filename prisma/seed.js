const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await bcrypt.hash('Admin@123', 12)

    const admin = await prisma.user.upsert({
        where: { email: 'admin@dewdropskin.com' },
        update: {},
        create: {
            email: 'admin@dewdropskin.com',
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'User',
            role: 'ADMIN',
        },
    })

    console.log('✅ Admin user created/updated:')
    console.log('   Email: admin@dewdropskin.com')
    console.log('   Password: Admin@123')
    console.log('   Role: ADMIN')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
