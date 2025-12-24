import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { generateProductSEO, generateSocialPost } from '@/lib/gemini'

// POST /api/ai/generate-seo - Generate SEO content for a product
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { productId, name, description, category, type } = body

        if (!name) {
            return NextResponse.json(
                { error: 'Product name is required' },
                { status: 400 }
            )
        }

        let result

        if (type === 'social') {
            const { platform, price } = body
            result = await generateSocialPost(
                { name, description, price: price || 0 },
                platform || 'facebook'
            )

            // Save to database
            if (productId) {
                await prisma.socialPost.create({
                    data: {
                        productId,
                        platform: platform?.toUpperCase() || 'FACEBOOK',
                        content: result,
                        status: 'DRAFT',
                    },
                })
            }

            return NextResponse.json({ content: result })
        } else {
            // SEO generation
            result = await generateProductSEO({ name, description, category })

            // Log the generation
            if (productId) {
                await prisma.seoLog.create({
                    data: {
                        productId,
                        entityType: 'product',
                        entityId: productId,
                        input: JSON.stringify({ name, description, category }),
                        output: result,
                    },
                })

                // Update product with generated SEO
                await prisma.product.update({
                    where: { id: productId },
                    data: {
                        metaTitle: result.metaTitle,
                        metaDescription: result.metaDescription,
                        metaKeywords: result.metaKeywords,
                    },
                })
            }

            return NextResponse.json(result)
        }
    } catch (error) {
        console.error('AI generation error:', error)
        return NextResponse.json(
            { error: 'Failed to generate content. Please check your Gemini API key.' },
            { status: 500 }
        )
    }
}
