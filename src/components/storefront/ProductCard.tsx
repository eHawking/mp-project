import Link from 'next/link'
import Image from 'next/image'
import { FiStar, FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import styles from './ProductCard.module.css'

interface ProductCardProps {
    product: {
        id: string
        name: string
        slug: string
        price: number
        comparePrice?: number | null
        rating: number
        reviewCount: number
        images: { url: string; alt?: string }[]
        store?: { name: string; slug: string }
        isFeatured?: boolean
    }
    variant?: 'default' | 'compact' | 'horizontal'
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
    const discount = product.comparePrice
        ? calculateDiscount(product.price, product.comparePrice)
        : 0

    const mainImage = product.images[0]?.url || '/placeholder-product.jpg'

    return (
        <div className={`${styles.card} ${styles[variant]}`}>
            {/* Image Container */}
            <div className={styles.imageContainer}>
                <Link href={`/product/${product.slug}`}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={mainImage}
                            alt={product.name}
                            className={styles.image}
                        />
                        {product.images[1] && (
                            <img
                                src={product.images[1].url}
                                alt={product.name}
                                className={styles.imageHover}
                            />
                        )}
                    </div>
                </Link>

                {/* Badges */}
                <div className={styles.badges}>
                    {discount > 0 && (
                        <span className={styles.discountBadge}>-{discount}%</span>
                    )}
                    {product.isFeatured && (
                        <span className={styles.featuredBadge}>Featured</span>
                    )}
                </div>

                {/* Quick Actions */}
                <div className={styles.actions}>
                    <button className={styles.actionBtn} title="Add to Wishlist">
                        <FiHeart />
                    </button>
                    <button className={styles.actionBtn} title="Quick View">
                        <FiEye />
                    </button>
                    <button className={styles.actionBtn} title="Add to Cart">
                        <FiShoppingCart />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className={styles.content}>
                {/* Store */}
                {product.store && (
                    <Link href={`/store/${product.store.slug}`} className={styles.store}>
                        {product.store.name}
                    </Link>
                )}

                {/* Title */}
                <Link href={`/product/${product.slug}`} className={styles.title}>
                    {product.name}
                </Link>

                {/* Rating */}
                <div className={styles.rating}>
                    <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                            <FiStar
                                key={i}
                                className={i < Math.floor(product.rating) ? styles.starFilled : styles.starEmpty}
                            />
                        ))}
                    </div>
                    <span className={styles.reviewCount}>
                        ({product.reviewCount})
                    </span>
                </div>

                {/* Price */}
                <div className={styles.priceContainer}>
                    <span className={styles.price}>{formatPrice(product.price)}</span>
                    {product.comparePrice && product.comparePrice > product.price && (
                        <span className={styles.comparePrice}>
                            {formatPrice(product.comparePrice)}
                        </span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button className={styles.addToCart}>
                    <FiShoppingCart />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    )
}
