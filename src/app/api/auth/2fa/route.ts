import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateTOTPSecret, getTOTPQRCodeURL, generateBackupCodes, verifyTOTP, enable2FA, disable2FA } from '@/lib/twoFactor'
import { prisma } from '@/lib/prisma'

// GET - Get 2FA status
export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { twoFactorEnabled: true },
        })

        return NextResponse.json({ enabled: user?.twoFactorEnabled || false })
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

// POST - Setup 2FA (generate secret and QR)
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { action, code } = await req.json()

        if (action === 'setup') {
            // Generate new secret
            const secret = generateTOTPSecret()
            const qrCodeUrl = getTOTPQRCodeURL(secret, session.user.email || '')
            const backupCodes = generateBackupCodes()

            // Store temporarily (user needs to verify before enabling)
            await prisma.user.update({
                where: { id: session.user.id },
                data: { twoFactorSecret: secret },
            })

            return NextResponse.json({
                secret,
                qrCodeUrl,
                backupCodes,
            })
        }

        if (action === 'verify') {
            // Verify code and enable 2FA
            const user = await prisma.user.findUnique({
                where: { id: session.user.id },
                select: { twoFactorSecret: true },
            })

            if (!user?.twoFactorSecret) {
                return NextResponse.json({ error: 'Setup required first' }, { status: 400 })
            }

            if (!verifyTOTP(user.twoFactorSecret, code)) {
                return NextResponse.json({ error: 'Invalid code' }, { status: 400 })
            }

            const backupCodes = generateBackupCodes()
            await enable2FA(session.user.id, user.twoFactorSecret, backupCodes)

            return NextResponse.json({ success: true, backupCodes })
        }

        if (action === 'disable') {
            // Verify code before disabling
            const user = await prisma.user.findUnique({
                where: { id: session.user.id },
                select: { twoFactorSecret: true },
            })

            if (!user?.twoFactorSecret || !verifyTOTP(user.twoFactorSecret, code)) {
                return NextResponse.json({ error: 'Invalid code' }, { status: 400 })
            }

            await disable2FA(session.user.id)
            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
