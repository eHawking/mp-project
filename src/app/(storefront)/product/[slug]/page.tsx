'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { FiShoppingCart, FiHeart, FiShare2, FiStar, FiMinus, FiPlus, FiTruck, FiShield, FiRefreshCw, FiArrowLeft } from 'react-icons/fi'
import { useToast } from '@/components/Toast'
import styles from './page.module.css'

// Mock product data
const mockProducts: Record<string, any> = {
    'premium-wireless-headphones': {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.8,
        reviews: 128,
        description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise cancellation, 40-hour battery life, and ultra-comfortable ear cushions for all-day wear.',
        features: ['Active Noise Cancellation', '40-Hour Battery', 'Bluetooth 5.0', 'Premium Leather Cushions'],
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'],
        inStock: true,
        category: 'Electronics',
    },
    'smart-watch-series-x': {
        id: '2',
        name: 'Smart Watch Series X',
        price: 449.99,
        originalPrice: 549.99,
        rating: 4.9,
        reviews: 256,
        description: 'Stay connected with our latest smartwatch. Track your fitness, monitor your health, and receive notifications all from your wrist.',
        features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '5-Day Battery'],
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'],
        inStock: true,
        category: 'Electronics',
    },
}

export default function ProductPage() {
    const params = useParams()
    const { showToast } = useToast()
    const slug = params.slug as string
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Try to get product from mock data
        const mockProduct = mockProducts[slug]
        if (mockProduct) {
            setProduct(mockProduct)
        } else {
            // Generate a generic product for any slug
            setProduct({
                id: slug,
                name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                price: 99.99,
                originalPrice: 149.99,
                rating: 4.5,
                reviews: 50,
                description: 'High-quality product with premium materials and excellent craftsmanship.',
                features: ['Premium Quality', 'Fast Shipping', '30-Day Returns', 'Warranty Included'],
                images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'],
                inStock: true,
                category: 'General',
            })
        }
        setLoading(false)
    }, [slug])

    const addToCart = () => {
        // Get existing cart
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const existingIndex = cart.findIndex((item: any) => item.id === product.id)

        if (existingIndex >= 0) {
            cart[existingIndex].quantity += quantity
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity,
            })
        }

        localStorage.setItem('cart', JSON.stringify(cart))
        showToast(`Added ${quantity} item(s) to cart!`, 'success')
    }

    if (loading) {
        return <div className={styles.loading}>Loading...</div>
    }

    if (!product) {
        return (
            <div className={styles.notFound}>
                <h1>Product Not Found</h1>
                <Link href="/products">Back to Products</Link>
            </div>
        )
    }

    const discount = Math.round((1 - product.price / product.originalPrice) * 100)

    return (
        <div className={styles.productPage}>
            <div className="container">
                <Link href="/products" className={styles.backLink}>
                    <FiArrowLeft /> Back to Products
                </Link>

                <div className={styles.productGrid}>
                    {/* Images */}
                    <div className={styles.imageSection}>
                        <div className={styles.mainImage}>
                            <img src={product.images[0]} alt={product.name} />
                            {discount > 0 && <span className={styles.discountBadge}>-{discount}%</span>}
                        </div>
                    </div>

                    {/* Details */}
                    <div className={styles.detailsSection}>
                        <span className={styles.category}>{product.category}</span>
                        <h1 className={styles.productName}>{product.name}</h1>

                        <div className={styles.rating}>
                            <div className={styles.stars}>
                                {[...Array(5)].map((_, i) => (
                                    <FiStar key={i} className={i < Math.floor(product.rating) ? styles.filled : ''} />
                                ))}
                            </div>
                            <span>{product.rating}</span>
                            <span className={styles.reviewCount}>({product.reviews} reviews)</span>
                        </div>

                        <div className={styles.pricing}>
                            <span className={styles.currentPrice}>${product.price.toFixed(2)}</span>
                            {product.originalPrice > product.price && (
                                <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
                            )}
                        </div>

                        <p className={styles.description}>{product.description}</p>

                        <div className={styles.features}>
                            {product.features.map((feature: string, i: number) => (
                                <span key={i} className={styles.feature}>✓ {feature}</span>
                            ))}
                        </div>

                        <div className={styles.stock}>
                            {product.inStock ? (
                                <span className={styles.inStock}>✓ In Stock</span>
                            ) : (
                                <span className={styles.outOfStock}>Out of Stock</span>
                            )}
                        </div>

                        <div className={styles.quantityRow}>
                            <div className={styles.quantitySelector}>
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><FiMinus /></button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}><FiPlus /></button>
                            </div>
                            <button className={styles.addToCart} onClick={addToCart} disabled={!product.inStock}>
                                <FiShoppingCart /> Add to Cart
                            </button>
                            <button className={styles.wishlistBtn}><FiHeart /></button>
                        </div>

                        <div className={styles.benefits}>
                            <div className={styles.benefit}>
                                <FiTruck />
                                <span>Free Shipping over $50</span>
                            </div>
                            <div className={styles.benefit}>
                                <FiShield />
                                <span>Secure Payment</span>
                            </div>
                            <div className={styles.benefit}>
                                <FiRefreshCw />
                                <span>30-Day Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
