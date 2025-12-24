import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export const gemini = genAI.getGenerativeModel({ model: 'gemini-pro' })

// Generate SEO content for a product
export async function generateProductSEO(product: {
    name: string
    description?: string
    category?: string
}) {
    const prompt = `Generate SEO-optimized content for this e-commerce product:

Product Name: ${product.name}
Description: ${product.description || 'N/A'}
Category: ${product.category || 'General'}

Please provide in JSON format:
{
  "metaTitle": "SEO-optimized title (max 60 chars)",
  "metaDescription": "Compelling meta description (max 155 chars)",
  "metaKeywords": "comma-separated keywords",
  "enhancedDescription": "Improved product description with SEO keywords",
  "shortDescription": "Brief product summary (max 200 chars)"
}`

    try {
        const result = await gemini.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        // Parse JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0])
        }
        throw new Error('Invalid response format')
    } catch (error) {
        console.error('Gemini SEO generation error:', error)
        throw error
    }
}

// Generate social media post for a product
export async function generateSocialPost(product: {
    name: string
    description?: string
    price: number
    image?: string
}, platform: 'facebook' | 'twitter' | 'instagram') {
    const charLimits = {
        facebook: 500,
        twitter: 280,
        instagram: 2200,
    }

    const prompt = `Generate a compelling ${platform} post for this product:

Product: ${product.name}
Description: ${product.description || 'N/A'}
Price: $${product.price}

Requirements:
- Maximum ${charLimits[platform]} characters
- Include relevant emojis
- Add a compelling call-to-action
- Include 3-5 relevant hashtags at the end

Respond with just the post text, nothing else.`

    try {
        const result = await gemini.generateContent(prompt)
        const response = await result.response
        return response.text().trim()
    } catch (error) {
        console.error('Gemini social post generation error:', error)
        throw error
    }
}

// Generate category SEO
export async function generateCategorySEO(category: {
    name: string
    description?: string
    parentCategory?: string
}) {
    const prompt = `Generate SEO content for this e-commerce category:

Category Name: ${category.name}
Description: ${category.description || 'N/A'}
Parent Category: ${category.parentCategory || 'None'}

Please provide in JSON format:
{
  "metaTitle": "SEO-optimized category title (max 60 chars)",
  "metaDescription": "Category meta description (max 155 chars)",
  "metaKeywords": "comma-separated keywords",
  "enhancedDescription": "SEO-optimized category description"
}`

    try {
        const result = await gemini.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0])
        }
        throw new Error('Invalid response format')
    } catch (error) {
        console.error('Gemini category SEO generation error:', error)
        throw error
    }
}

// Generate store description
export async function generateStoreDescription(store: {
    name: string
    products?: string[]
    category?: string
}) {
    const prompt = `Generate a compelling store description for this marketplace vendor:

Store Name: ${store.name}
Products: ${store.products?.join(', ') || 'Various products'}
Category: ${store.category || 'General'}

Please provide in JSON format:
{
  "description": "Compelling store description (200-300 words)",
  "shortTagline": "Catchy tagline (max 100 chars)",
  "metaTitle": "SEO store title (max 60 chars)",
  "metaDescription": "Store meta description (max 155 chars)"
}`

    try {
        const result = await gemini.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0])
        }
        throw new Error('Invalid response format')
    } catch (error) {
        console.error('Gemini store description generation error:', error)
        throw error
    }
}
