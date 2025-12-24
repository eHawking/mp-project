import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { slugify } from '@/lib/utils'

// GET /api/products - Get all products with filters
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)

        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '12')
        const category = searchParams.get('category')
        const store = searchParams.get('store')
        const search = searchParams.get('search')
        const featured = searchParams.get('featured')
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')
        const sort = searchParams.get('sort') || 'createdAt'
        const order = searchParams.get('order') || 'desc'

        const where: any = {
            status: 'PUBLISHED',
        }

        if (category) {
            where.category = { slug: category }
        }

        if (store) {
            where.store = { slug: store }
        }

        if (search) {
            where.OR = [
                { name: { contains: search } },
                { description: { contains: search } },
            ]
        }

        if (featured === 'true') {
            where.isFeatured = true
        }

        if (minPrice) {
            where.price = { ...where.price, gte: parseFloat(minPrice) }
        }

        if (maxPrice) {
            where.price = { ...where.price, lte: parseFloat(maxPrice) }
        }

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                include: {
                    images: { take: 2, orderBy: { sortOrder: 'asc' } },
                    store: { select: { name: true, slug: true } },
                    category: { select: { name: true, slug: true } },
                },
                orderBy: { [sort]: order },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.product.count({ where }),
        ])

        return NextResponse.json({
            products,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error('Products fetch error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        )
    }
}

// POST /api/products - Create a new product (seller only)
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        if (session.user.role !== 'SELLER' && session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const body = await request.json()
        const {
            name,
            description,
            shortDescription,
            price,
            comparePrice,
            categoryId,
            sku,
            quantity,
            images,
            isFeatured,
            isDigital,
            metaTitle,
            metaDescription,
            metaKeywords,
        } = body

        if (!name || !price) {
            return NextResponse.json(
                { error: 'Name and price are required' },
                { status: 400 }
            )
        }

        // Get user's store
        const store = await prisma.store.findUnique({
            where: { userId: session.user.id },
        })

        if (!store) {
            return NextResponse.json(
                { error: 'Store not found. Please create a store first.' },
                { status: 400 }
            )
        }

        // Generate unique slug
        const baseSlug = slugify(name)
        let slug = baseSlug
        let counter = 1

        while (await prisma.product.findUnique({ where: { slug } })) {
            slug = `${baseSlug}-${counter}`
            counter++
        }

        // Create product
        const product = await prisma.product.create({
            data: {
                storeId: store.id,
                name,
                slug,
                description,
                shortDescription,
                price,
                comparePrice,
                categoryId,
                sku,
                quantity: quantity || 0,
                isFeatured: isFeatured || false,
                isDigital: isDigital || false,
                metaTitle: metaTitle || name,
                metaDescription,
                metaKeywords,
                status: 'PENDING',
                images: images?.length ? {
                    create: images.map((url: string, index: number) => ({
                        url,
                        sortOrder: index,
                    })),
                } : undefined,
            },
            include: {
                images: true,
                category: true,
            },
        })

        return NextResponse.json(product, { status: 201 })
    } catch (error) {
        console.error('Product creation error:', error)
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        )
    }
}
