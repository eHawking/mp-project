import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import prisma from '@/lib/db'
import { slugify } from '@/lib/utils'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, password, firstName, lastName, role } = body

        // Validate input
        if (!email || !password || !firstName || !lastName) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            )
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters' },
                { status: 400 }
            )
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'An account with this email already exists' },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await hash(password, 12)

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role: role === 'SELLER' ? 'SELLER' : 'BUYER',
                status: 'ACTIVE',
            },
        })

        // If seller, create pending store
        if (role === 'SELLER') {
            const storeName = `${firstName}'s Store`
            const baseSlug = slugify(storeName)
            let slug = baseSlug
            let counter = 1

            // Ensure unique slug
            while (await prisma.store.findUnique({ where: { slug } })) {
                slug = `${baseSlug}-${counter}`
                counter++
            }

            await prisma.store.create({
                data: {
                    userId: user.id,
                    name: storeName,
                    slug,
                    status: 'PENDING',
                },
            })
        }

        // Create cart for user
        await prisma.cart.create({
            data: {
                userId: user.id,
            },
        })

        return NextResponse.json(
            {
                message: 'Account created successfully',
                userId: user.id,
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json(
            { error: 'Registration failed. Please try again.' },
            { status: 500 }
        )
    }
}
