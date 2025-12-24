import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        default: 'DewDropSkin Marketplace - Premium Multi-Vendor Shopping',
        template: '%s | DewDropSkin Marketplace',
    },
    description: 'Discover amazing products from trusted sellers on DewDropSkin Marketplace. Shop electronics, fashion, home & more with secure payments and fast delivery.',
    keywords: ['marketplace', 'ecommerce', 'shopping', 'online store', 'multi-vendor'],
    authors: [{ name: 'DewDropSkin Marketplace' }],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        siteName: 'DewDropSkin Marketplace',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
