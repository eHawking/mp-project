import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET /api/settings - Fetch all settings
export async function GET() {
    try {
        const settings = await prisma.setting.findMany()

        // Convert to object format
        const settingsObj: Record<string, any> = {}
        settings.forEach(s => {
            if (s.type === 'number') {
                settingsObj[s.key] = parseFloat(s.value)
            } else if (s.type === 'boolean') {
                settingsObj[s.key] = s.value === 'true'
            } else {
                settingsObj[s.key] = s.value
            }
        })

        return NextResponse.json(settingsObj)
    } catch (error) {
        console.error('Error fetching settings:', error)
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
    }
}

// POST /api/settings - Save settings (Admin only)
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const data = await req.json()

        // Upsert each setting
        const operations = Object.entries(data).map(([key, value]) => {
            let type = 'string'
            let stringValue = String(value)

            if (typeof value === 'number') {
                type = 'number'
            } else if (typeof value === 'boolean') {
                type = 'boolean'
                stringValue = value ? 'true' : 'false'
            }

            return prisma.setting.upsert({
                where: { key },
                update: { value: stringValue, type },
                create: { key, value: stringValue, type },
            })
        })

        await prisma.$transaction(operations)

        return NextResponse.json({ success: true, message: 'Settings saved successfully' })
    } catch (error) {
        console.error('Error saving settings:', error)
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
    }
}
