import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/db'
import { authOptions } from '@/lib/auth'

// GET /api/cart - Get user's cart
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const cart = await prisma.cart.findUnique({
            where: { userId: session.user.id },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                images: { take: 1 },
                                store: { select: { name: true, slug: true } },
                            },
                        },
                        variant: true,
                    },
                },
            },
        })

        if (!cart) {
            // Create cart if doesn't exist
            const newCart = await prisma.cart.create({
                data: { userId: session.user.id },
                include: { items: true },
            })
            return NextResponse.json(newCart)
        }

        return NextResponse.json(cart)
    } catch (error) {
        console.error('Cart fetch error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch cart' },
            { status: 500 }
        )
    }
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { productId, variantId, quantity = 1 } = await request.json()

        if (!productId) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            )
        }

        // Get or create cart
        let cart = await prisma.cart.findUnique({
            where: { userId: session.user.id },
        })

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId: session.user.id },
            })
        }

        // Check if item already in cart
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId,
                variantId: variantId || null,
            },
        })

        if (existingItem) {
            // Update quantity
            const updatedItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
                include: {
                    product: { include: { images: { take: 1 } } },
                },
            })
            return NextResponse.json(updatedItem)
        }

        // Add new item
        const newItem = await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                variantId,
                quantity,
            },
            include: {
                product: { include: { images: { take: 1 } } },
            },
        })

        return NextResponse.json(newItem, { status: 201 })
    } catch (error) {
        console.error('Add to cart error:', error)
        return NextResponse.json(
            { error: 'Failed to add to cart' },
            { status: 500 }
        )
    }
}

// DELETE /api/cart - Remove item from cart
export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { itemId } = await request.json()

        if (!itemId) {
            return NextResponse.json(
                { error: 'Item ID is required' },
                { status: 400 }
            )
        }

        await prisma.cartItem.delete({
            where: { id: itemId },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Remove from cart error:', error)
        return NextResponse.json(
            { error: 'Failed to remove from cart' },
            { status: 500 }
        )
    }
}
