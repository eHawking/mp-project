import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import prisma from './db'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter your email and password')
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    include: { store: true },
                })

                if (!user) {
                    throw new Error('No user found with this email')
                }

                if (user.status !== 'ACTIVE') {
                    throw new Error('Your account is not active')
                }

                const isPasswordValid = await compare(credentials.password, user.password)

                if (!isPasswordValid) {
                    throw new Error('Invalid password')
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    avatar: user.avatar,
                    storeId: user.store?.id,
                    storeSlug: user.store?.slug,
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
                token.firstName = user.firstName
                token.lastName = user.lastName
                token.avatar = user.avatar
                token.storeId = user.storeId
                token.storeSlug = user.storeSlug
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
                session.user.firstName = token.firstName as string
                session.user.lastName = token.lastName as string
                session.user.avatar = token.avatar as string | null
                session.user.storeId = token.storeId as string | null
                session.user.storeSlug = token.storeSlug as string | null
            }
            return session
        },
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
}
