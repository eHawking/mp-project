import crypto from 'crypto'
import { prisma } from '@/lib/prisma'

// Payment Gateway Types
export type PaymentGateway = 'alfa' | 'easypaisa' | 'jazzcash' | 'stripe' | 'cod' | 'bank_transfer'

export interface PaymentResult {
    success: boolean
    transactionId?: string
    redirectUrl?: string
    error?: string
}

interface PaymentSettings {
    // Alfa Payment Gateway
    alfaEnabled?: string
    alfaMerchantId?: string
    alfaStoreId?: string
    alfaMerchantHash?: string
    alfaKey1?: string
    alfaKey2?: string

    // Easypaisa
    easypaisaEnabled?: string
    easypaisaStoreId?: string
    easypaisaStorePassword?: string
    easypaisaMerchantId?: string

    // JazzCash
    jazzcashEnabled?: string
    jazzcashMerchantId?: string
    jazzcashPassword?: string
    jazzcashIntegritySalt?: string

    // Stripe (International)
    stripeEnabled?: string
    stripePublicKey?: string
    stripeSecretKey?: string

    // Cash on Delivery
    codEnabled?: string
}

async function getPaymentSettings(): Promise<PaymentSettings> {
    const settings = await prisma.setting.findMany({
        where: {
            key: {
                startsWith: 'alfa'
            }
        }
    })

    const allSettings = await prisma.setting.findMany({
        where: {
            key: {
                in: [
                    'alfaEnabled', 'alfaMerchantId', 'alfaStoreId', 'alfaMerchantHash', 'alfaKey1', 'alfaKey2',
                    'easypaisaEnabled', 'easypaisaStoreId', 'easypaisaStorePassword', 'easypaisaMerchantId',
                    'jazzcashEnabled', 'jazzcashMerchantId', 'jazzcashPassword', 'jazzcashIntegritySalt',
                    'stripeEnabled', 'stripePublicKey', 'stripeSecretKey',
                    'codEnabled'
                ]
            }
        }
    })

    return allSettings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {} as PaymentSettings)
}

// =====================
// ALFA PAYMENT GATEWAY
// =====================
export async function initiateAlfaPayment(orderId: string, amount: number, customerEmail: string): Promise<PaymentResult> {
    try {
        const settings = await getPaymentSettings()

        if (settings.alfaEnabled !== 'true') {
            return { success: false, error: 'Alfa payment not enabled' }
        }

        const transactionId = `TXN${Date.now()}`
        const dateTime = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14)

        // Create hash for Alfa
        const hashString = `${settings.alfaMerchantId}${settings.alfaStoreId}${transactionId}${amount}${dateTime}${settings.alfaMerchantHash}`
        const hash = crypto.createHash('sha256').update(hashString).digest('hex')

        // Alfa redirect URL format
        const redirectUrl = `https://payments.bankalfalah.com/HS/HS/HS?` +
            `MerchantId=${settings.alfaMerchantId}` +
            `&StoreId=${settings.alfaStoreId}` +
            `&TransactionReferenceNumber=${transactionId}` +
            `&TransactionAmount=${amount}` +
            `&OrderId=${orderId}` +
            `&Hash=${hash}`

        return {
            success: true,
            transactionId,
            redirectUrl,
        }
    } catch (error) {
        return { success: false, error: 'Alfa payment initiation failed' }
    }
}

// =====================
// EASYPAISA
// =====================
export async function initiateEasypaisaPayment(orderId: string, amount: number, mobileNumber: string): Promise<PaymentResult> {
    try {
        const settings = await getPaymentSettings()

        if (settings.easypaisaEnabled !== 'true') {
            return { success: false, error: 'Easypaisa payment not enabled' }
        }

        const transactionId = `EP${Date.now()}`
        const dateTime = new Date().toISOString()

        // Easypaisa integration
        const params = new URLSearchParams({
            storeId: settings.easypaisaStoreId || '',
            orderId: orderId,
            transactionAmount: amount.toString(),
            transactionId: transactionId,
            mobileAccountNo: mobileNumber,
            emailAddress: '',
        })

        const redirectUrl = `https://easypay.easypaisa.com.pk/easypay/Index.jsf?${params.toString()}`

        return {
            success: true,
            transactionId,
            redirectUrl,
        }
    } catch (error) {
        return { success: false, error: 'Easypaisa payment initiation failed' }
    }
}

// =====================
// JAZZCASH
// =====================
export async function initiateJazzCashPayment(orderId: string, amount: number, mobileNumber: string): Promise<PaymentResult> {
    try {
        const settings = await getPaymentSettings()

        if (settings.jazzcashEnabled !== 'true') {
            return { success: false, error: 'JazzCash payment not enabled' }
        }

        const transactionId = `JC${Date.now()}`
        const dateTime = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14)

        // Create hash for JazzCash
        const hashString = `${settings.jazzcashIntegritySalt}&${amount}&${orderId}&${settings.jazzcashMerchantId}&${settings.jazzcashPassword}&${transactionId}&${dateTime}`
        const hash = crypto.createHmac('sha256', settings.jazzcashIntegritySalt || '').update(hashString).digest('hex')

        const redirectUrl = `https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform?` +
            `pp_Amount=${amount}` +
            `&pp_BillReference=${orderId}` +
            `&pp_MerchantID=${settings.jazzcashMerchantId}` +
            `&pp_TxnRefNo=${transactionId}` +
            `&pp_SecureHash=${hash}`

        return {
            success: true,
            transactionId,
            redirectUrl,
        }
    } catch (error) {
        return { success: false, error: 'JazzCash payment initiation failed' }
    }
}

// =====================
// GET ENABLED PAYMENT METHODS
// =====================
export async function getEnabledPaymentMethods(): Promise<{ id: PaymentGateway; name: string; icon: string }[]> {
    const settings = await getPaymentSettings()
    const methods: { id: PaymentGateway; name: string; icon: string }[] = []

    if (settings.alfaEnabled === 'true') {
        methods.push({ id: 'alfa', name: 'Alfa Payment', icon: '🏦' })
    }
    if (settings.easypaisaEnabled === 'true') {
        methods.push({ id: 'easypaisa', name: 'Easypaisa', icon: '📱' })
    }
    if (settings.jazzcashEnabled === 'true') {
        methods.push({ id: 'jazzcash', name: 'JazzCash', icon: '📲' })
    }
    if (settings.stripeEnabled === 'true') {
        methods.push({ id: 'stripe', name: 'Credit/Debit Card', icon: '💳' })
    }
    if (settings.codEnabled === 'true') {
        methods.push({ id: 'cod', name: 'Cash on Delivery', icon: '💵' })
    }

    return methods
}

// =====================
// PROCESS PAYMENT
// =====================
export async function processPayment(
    gateway: PaymentGateway,
    orderId: string,
    amount: number,
    customerInfo: { email?: string; mobile?: string }
): Promise<PaymentResult> {
    switch (gateway) {
        case 'alfa':
            return initiateAlfaPayment(orderId, amount, customerInfo.email || '')
        case 'easypaisa':
            return initiateEasypaisaPayment(orderId, amount, customerInfo.mobile || '')
        case 'jazzcash':
            return initiateJazzCashPayment(orderId, amount, customerInfo.mobile || '')
        case 'cod':
            return { success: true, transactionId: `COD${Date.now()}` }
        default:
            return { success: false, error: 'Invalid payment gateway' }
    }
}
