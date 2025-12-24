import Link from 'next/link'
import { FiClock, FiTag, FiPercent } from 'react-icons/fi'
import ProductCard from '@/components/storefront/ProductCard'
import styles from './page.module.css'

// Mock deals data
const deals = [
    {
        id: '1', name: 'Premium Wireless Headphones', slug: 'premium-wireless-headphones',
        price: 199.99, comparePrice: 399.99, rating: 4.8, reviewCount: 124,
        images: [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' }],
        store: { name: 'TechStore', slug: 'techstore' }
    },
    {
        id: '2', name: 'Smart Watch Series X', slug: 'smart-watch-series-x',
        price: 299.99, comparePrice: 599.99, rating: 4.9, reviewCount: 89,
        images: [{ url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' }],
        store: { name: 'GadgetWorld', slug: 'gadgetworld' }
    },
    {
        id: '3', name: 'Leather Backpack', slug: 'leather-backpack',
        price: 99.99, comparePrice: 249.99, rating: 4.7, reviewCount: 56,
        images: [{ url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' }],
        store: { name: 'StyleShop', slug: 'styleshop' }
    },
    {
        id: '4', name: 'Vintage Sunglasses', slug: 'vintage-sunglasses',
        price: 49.99, comparePrice: 149.99, rating: 4.5, reviewCount: 78,
        images: [{ url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400' }],
        store: { name: 'StyleShop', slug: 'styleshop' }
    },
]

export default function DealsPage() {
    return (
        <div className={styles.dealsPage}>
            {/* Hero */}
            <div className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>🔥 Limited Time</span>
                        <h1>Today&apos;s Best Deals</h1>
                        <p>Up to 60% off on selected items. Don&apos;t miss out!</p>
                        <div className={styles.timer}>
                            <FiClock />
                            <span>Ends in: 12:45:30</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Stats */}
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <FiTag />
                        <span>{deals.length} Active Deals</span>
                    </div>
                    <div className={styles.stat}>
                        <FiPercent />
                        <span>Up to 60% Off</span>
                    </div>
                </div>

                {/* Products Grid */}
                <div className={styles.productsGrid}>
                    {deals.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}
