import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const path = req.nextUrl.pathname

        // Admin routes - only admins
        if (path.startsWith('/admin')) {
            if (token?.role !== 'ADMIN') {
                return NextResponse.redirect(new URL('/login?error=unauthorized', req.url))
            }
        }

        // Seller routes - only sellers and admins
        if (path.startsWith('/seller')) {
            if (token?.role !== 'SELLER' && token?.role !== 'ADMIN') {
                return NextResponse.redirect(new URL('/login?error=unauthorized', req.url))
            }
        }

        // Account routes - any authenticated user
        if (path.startsWith('/account')) {
            if (!token) {
                return NextResponse.redirect(new URL('/login', req.url))
            }
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname

                // Public routes - always allowed
                if (
                    path === '/' ||
                    path.startsWith('/products') ||
                    path.startsWith('/product/') ||
                    path.startsWith('/store/') ||
                    path.startsWith('/categories') ||
                    path.startsWith('/login') ||
                    path.startsWith('/register') ||
                    path.startsWith('/api/auth') ||
                    path.startsWith('/api/products')
                ) {
                    return true
                }

                // Protected routes - require token
                return !!token
            },
        },
    }
)

export const config = {
    matcher: [
        '/admin/:path*',
        '/seller/:path*',
        '/account/:path*',
        '/checkout/:path*',
        '/api/cart/:path*',
        '/api/orders/:path*',
        '/api/ai/:path*',
    ],
}
