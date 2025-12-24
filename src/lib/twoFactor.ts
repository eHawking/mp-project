import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

// Generate a random base32 secret for TOTP
export function generateTOTPSecret(): string {
    const buffer = crypto.randomBytes(20)
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
    let secret = ''
    for (let i = 0; i < buffer.length; i++) {
        secret += base32Chars[buffer[i] % 32]
    }
    return secret
}

// Generate TOTP code
export function generateTOTP(secret: string, timeStep: number = 30): string {
    const time = Math.floor(Date.now() / 1000 / timeStep)
    const timeBuffer = Buffer.alloc(8)
    timeBuffer.writeBigInt64BE(BigInt(time))

    // Decode base32 secret
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
    let bits = ''
    for (const char of secret.toUpperCase()) {
        const val = base32Chars.indexOf(char)
        if (val >= 0) bits += val.toString(2).padStart(5, '0')
    }
    const keyBuffer = Buffer.from(
        bits.match(/.{8}/g)?.map(byte => parseInt(byte, 2)) || []
    )

    // HMAC-SHA1
    const hmac = crypto.createHmac('sha1', keyBuffer)
    hmac.update(timeBuffer)
    const hash = hmac.digest()

    // Dynamic truncation
    const offset = hash[hash.length - 1] & 0x0f
    const code = (
        ((hash[offset] & 0x7f) << 24) |
        ((hash[offset + 1] & 0xff) << 16) |
        ((hash[offset + 2] & 0xff) << 8) |
        (hash[offset + 3] & 0xff)
    ) % 1000000

    return code.toString().padStart(6, '0')
}

// Verify TOTP code (with time window for clock drift)
export function verifyTOTP(secret: string, code: string, window: number = 1): boolean {
    for (let i = -window; i <= window; i++) {
        const time = Math.floor(Date.now() / 1000 / 30) + i
        const timeBuffer = Buffer.alloc(8)
        timeBuffer.writeBigInt64BE(BigInt(time))

        // Same TOTP generation logic
        const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
        let bits = ''
        for (const char of secret.toUpperCase()) {
            const val = base32Chars.indexOf(char)
            if (val >= 0) bits += val.toString(2).padStart(5, '0')
        }
        const keyBuffer = Buffer.from(
            bits.match(/.{8}/g)?.map(byte => parseInt(byte, 2)) || []
        )

        const hmac = crypto.createHmac('sha1', keyBuffer)
        hmac.update(timeBuffer)
        const hash = hmac.digest()

        const offset = hash[hash.length - 1] & 0x0f
        const generatedCode = (
            ((hash[offset] & 0x7f) << 24) |
            ((hash[offset + 1] & 0xff) << 16) |
            ((hash[offset + 2] & 0xff) << 8) |
            (hash[offset + 3] & 0xff)
        ) % 1000000

        if (generatedCode.toString().padStart(6, '0') === code) {
            return true
        }
    }
    return false
}

// Generate QR code URL for authenticator apps
export function getTOTPQRCodeURL(secret: string, email: string, issuer: string = 'DewDropSkin'): string {
    const encodedIssuer = encodeURIComponent(issuer)
    const encodedEmail = encodeURIComponent(email)
    const otpauthUrl = `otpauth://totp/${encodedIssuer}:${encodedEmail}?secret=${secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauthUrl)}`
}

// Generate backup codes
export function generateBackupCodes(count: number = 8): string[] {
    const codes: string[] = []
    for (let i = 0; i < count; i++) {
        const code = crypto.randomBytes(4).toString('hex').toUpperCase()
        codes.push(`${code.slice(0, 4)}-${code.slice(4)}`)
    }
    return codes
}

// Database operations
export async function enable2FA(userId: string, secret: string, backupCodes: string[]): Promise<boolean> {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                twoFactorEnabled: true,
                twoFactorSecret: secret,
                backupCodes: JSON.stringify(backupCodes),
            },
        })
        return true
    } catch (error) {
        console.error('Error enabling 2FA:', error)
        return false
    }
}

export async function disable2FA(userId: string): Promise<boolean> {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                twoFactorEnabled: false,
                twoFactorSecret: null,
                backupCodes: null,
            },
        })
        return true
    } catch (error) {
        console.error('Error disabling 2FA:', error)
        return false
    }
}

export async function verify2FACode(userId: string, code: string): Promise<boolean> {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { twoFactorSecret: true, backupCodes: true },
        })

        if (!user?.twoFactorSecret) return false

        // Check TOTP code
        if (verifyTOTP(user.twoFactorSecret, code)) {
            return true
        }

        // Check backup codes
        if (user.backupCodes) {
            const backupCodes: string[] = JSON.parse(user.backupCodes)
            const codeIndex = backupCodes.indexOf(code.toUpperCase())
            if (codeIndex >= 0) {
                // Remove used backup code
                backupCodes.splice(codeIndex, 1)
                await prisma.user.update({
                    where: { id: userId },
                    data: { backupCodes: JSON.stringify(backupCodes) },
                })
                return true
            }
        }

        return false
    } catch (error) {
        console.error('Error verifying 2FA:', error)
        return false
    }
}
