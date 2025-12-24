import 'next-auth'

declare module 'next-auth' {
    interface User {
        id: string
        email: string
        name: string
        firstName: string
        lastName: string
        role: string
        avatar?: string | null
        storeId?: string | null
        storeSlug?: string | null
    }

    interface Session {
        user: User
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        role: string
        firstName: string
        lastName: string
        avatar?: string | null
        storeId?: string | null
        storeSlug?: string | null
    }
}
