// Utility functions

export function formatPrice(price: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(price)
}

export function formatDate(date: Date | string): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date))
}

export function formatDateTime(date: Date | string): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date))
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export function generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `ORD-${timestamp}-${random}`
}

export function truncate(text: string, length: number): string {
    if (text.length <= length) return text
    return text.slice(0, length) + '...'
}

export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ')
}

export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

export function calculateDiscount(price: number, comparePrice: number): number {
    if (!comparePrice || comparePrice <= price) return 0
    return Math.round(((comparePrice - price) / comparePrice) * 100)
}

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn(...args), delay)
    }
}

export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        // Order statuses
        PENDING: 'warning',
        CONFIRMED: 'info',
        PROCESSING: 'info',
        SHIPPED: 'primary',
        DELIVERED: 'success',
        CANCELLED: 'error',
        REFUNDED: 'error',
        // Payment statuses
        PAID: 'success',
        FAILED: 'error',
        // Product statuses
        DRAFT: 'default',
        PUBLISHED: 'success',
        REJECTED: 'error',
        OUT_OF_STOCK: 'warning',
        // Store statuses
        APPROVED: 'success',
        SUSPENDED: 'error',
        // User statuses
        ACTIVE: 'success',
        INACTIVE: 'default',
    }
    return colors[status] || 'default'
}
