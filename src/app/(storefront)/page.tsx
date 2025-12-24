import Link from 'next/link'
import Hero from '@/components/storefront/Hero'
import ProductCard from '@/components/storefront/ProductCard'
import { FiArrowRight, FiTrendingUp, FiStar, FiZap } from 'react-icons/fi'
import styles from './page.module.css'

// Mock data for demonstration
const featuredProducts = [
    {
        id: '1',
        name: 'Premium Wireless Headphones Pro',
        slug: 'premium-wireless-headphones-pro',
        price: 299.99,
        comparePrice: 399.99,
        rating: 4.8,
        reviewCount: 1234,
        images: [
            { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
            { url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500' }
        ],
        store: { name: 'TechStore', slug: 'techstore' },
        isFeatured: true,
    },
    {
        id: '2',
        name: 'Smart Watch Series X',
        slug: 'smart-watch-series-x',
        price: 449.99,
        comparePrice: 549.99,
        rating: 4.9,
        reviewCount: 892,
        images: [
            { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
            { url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500' }
        ],
        store: { name: 'GadgetWorld', slug: 'gadgetworld' },
        isFeatured: true,
    },
    {
        id: '3',
        name: 'Minimalist Leather Backpack',
        slug: 'minimalist-leather-backpack',
        price: 189.99,
        comparePrice: null,
        rating: 4.7,
        reviewCount: 567,
        images: [
            { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' },
            { url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500' }
        ],
        store: { name: 'StyleHub', slug: 'stylehub' },
    },
    {
        id: '4',
        name: 'Professional DSLR Camera Kit',
        slug: 'professional-dslr-camera-kit',
        price: 1299.99,
        comparePrice: 1599.99,
        rating: 4.9,
        reviewCount: 423,
        images: [
            { url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500' },
            { url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500' }
        ],
        store: { name: 'CameraShop', slug: 'camerashop' },
        isFeatured: true,
    },
]

const categories = [
    { name: 'Electronics', slug: 'electronics', icon: '📱', count: 1250, color: '#6366f1' },
    { name: 'Fashion', slug: 'fashion', icon: '👕', count: 2340, color: '#ec4899' },
    { name: 'Home & Garden', slug: 'home', icon: '🏠', count: 890, color: '#10b981' },
    { name: 'Beauty', slug: 'beauty', icon: '💄', count: 650, color: '#f59e0b' },
    { name: 'Sports', slug: 'sports', icon: '⚽', count: 430, color: '#3b82f6' },
    { name: 'Toys & Games', slug: 'toys', icon: '🎮', count: 780, color: '#8b5cf6' },
]

const deals = [
    {
        id: '5',
        name: 'Bluetooth Earbuds Ultra',
        slug: 'bluetooth-earbuds-ultra',
        price: 79.99,
        comparePrice: 149.99,
        rating: 4.6,
        reviewCount: 2341,
        images: [{ url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500' }],
        store: { name: 'AudioPro', slug: 'audiopro' },
    },
    {
        id: '6',
        name: 'Fitness Tracker Band',
        slug: 'fitness-tracker-band',
        price: 49.99,
        comparePrice: 89.99,
        rating: 4.5,
        reviewCount: 1567,
        images: [{ url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500' }],
        store: { name: 'FitGear', slug: 'fitgear' },
    },
    {
        id: '7',
        name: 'Portable Power Bank 20000mAh',
        slug: 'portable-power-bank',
        price: 39.99,
        comparePrice: 69.99,
        rating: 4.7,
        reviewCount: 3421,
        images: [{ url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500' }],
        store: { name: 'PowerUp', slug: 'powerup' },
    },
    {
        id: '8',
        name: 'Mechanical Gaming Keyboard',
        slug: 'mechanical-gaming-keyboard',
        price: 89.99,
        comparePrice: 129.99,
        rating: 4.8,
        reviewCount: 892,
        images: [{ url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500' }],
        store: { name: 'GameZone', slug: 'gamezone' },
    },
]

export default function HomePage() {
    return (
        <>
            {/* Hero Section */}
            <Hero />

            {/* Categories Section */}
            <section className={styles.section}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <div>
                            <h2 className={styles.sectionTitle}>
                                <FiZap className={styles.sectionIcon} />
                                Shop by Category
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Explore our wide range of product categories
                            </p>
                        </div>
                        <Link href="/categories" className={styles.viewAll}>
                            View All <FiArrowRight />
                        </Link>
                    </div>

                    <div className={styles.categories}>
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/products?category=${category.slug}`}
                                className={styles.categoryCard}
                                style={{ '--cat-color': category.color } as React.CSSProperties}
                            >
                                <div className={styles.categoryIcon}>
                                    {category.icon}
                                </div>
                                <h3 className={styles.categoryName}>{category.name}</h3>
                                <span className={styles.categoryCount}>{category.count} Products</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className={styles.section}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <div>
                            <h2 className={styles.sectionTitle}>
                                <FiStar className={styles.sectionIcon} />
                                Featured Products
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Handpicked products just for you
                            </p>
                        </div>
                        <Link href="/products?featured=true" className={styles.viewAll}>
                            View All <FiArrowRight />
                        </Link>
                    </div>

                    <div className={styles.productGrid}>
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Promo Banner */}
            <section className={styles.promoBanner}>
                <div className="container">
                    <div className={styles.promoContent}>
                        <div className={styles.promoText}>
                            <span className={styles.promoTag}>Limited Time Offer</span>
                            <h2 className={styles.promoTitle}>
                                Up to 50% Off on Electronics
                            </h2>
                            <p className={styles.promoSubtitle}>
                                Don&apos;t miss out on our biggest sale of the year.
                                Shop now and save on top brands!
                            </p>
                            <Link href="/deals" className={styles.promoBtn}>
                                Shop the Sale
                                <FiArrowRight />
                            </Link>
                        </div>
                        <div className={styles.promoImage}>
                            <img
                                src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600"
                                alt="Electronics Sale"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending & Deals */}
            <section className={styles.section}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <div>
                            <h2 className={styles.sectionTitle}>
                                <FiTrendingUp className={styles.sectionIcon} />
                                Today&apos;s Best Deals
                            </h2>
                            <p className={styles.sectionSubtitle}>
                                Limited time offers at unbeatable prices
                            </p>
                        </div>
                        <Link href="/deals" className={styles.viewAll}>
                            View All Deals <FiArrowRight />
                        </Link>
                    </div>

                    <div className={styles.productGrid}>
                        {deals.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className={styles.benefits}>
                <div className="container">
                    <div className={styles.benefitsGrid}>
                        <div className={styles.benefitCard}>
                            <div className={styles.benefitIcon}>🚚</div>
                            <h3>Free Shipping</h3>
                            <p>Free delivery on orders over $50</p>
                        </div>
                        <div className={styles.benefitCard}>
                            <div className={styles.benefitIcon}>🔒</div>
                            <h3>Secure Payment</h3>
                            <p>100% secure checkout process</p>
                        </div>
                        <div className={styles.benefitCard}>
                            <div className={styles.benefitIcon}>↩️</div>
                            <h3>Easy Returns</h3>
                            <p>30-day hassle-free returns</p>
                        </div>
                        <div className={styles.benefitCard}>
                            <div className={styles.benefitIcon}>💬</div>
                            <h3>24/7 Support</h3>
                            <p>Dedicated customer support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className={styles.newsletter}>
                <div className="container">
                    <div className={styles.newsletterContent}>
                        <h2>Stay Updated</h2>
                        <p>Subscribe to our newsletter for exclusive deals and updates</p>
                        <form className={styles.newsletterForm}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                            />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
