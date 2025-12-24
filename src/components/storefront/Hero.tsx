import Link from 'next/link'
import { FiArrowRight, FiPlay } from 'react-icons/fi'
import styles from './Hero.module.css'

export default function Hero() {
    return (
        <section className={styles.hero}>
            {/* Background Elements */}
            <div className={styles.bgElements}>
                <div className={styles.gradientOrb1} />
                <div className={styles.gradientOrb2} />
                <div className={styles.gridPattern} />
            </div>

            <div className="container">
                <div className={styles.heroContent}>
                    {/* Left Content */}
                    <div className={styles.textContent}>
                        <span className={styles.badge}>
                            <span className={styles.badgeDot} />
                            New Season Collection 2024
                        </span>

                        <h1 className={styles.title}>
                            Discover
                            <span className={styles.gradientText}> Premium Products </span>
                            from Trusted Sellers
                        </h1>

                        <p className={styles.subtitle}>
                            Shop from thousands of verified sellers worldwide. Find exclusive deals,
                            trending products, and enjoy secure checkout with buyer protection.
                        </p>

                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>50K+</span>
                                <span className={styles.statLabel}>Products</span>
                            </div>
                            <div className={styles.statDivider} />
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>10K+</span>
                                <span className={styles.statLabel}>Sellers</span>
                            </div>
                            <div className={styles.statDivider} />
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>100K+</span>
                                <span className={styles.statLabel}>Customers</span>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <Link href="/products" className={styles.primaryBtn}>
                                Shop Now
                                <FiArrowRight />
                            </Link>
                            <button className={styles.secondaryBtn}>
                                <div className={styles.playIcon}>
                                    <FiPlay />
                                </div>
                                Watch Video
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className={styles.trustBadges}>
                            <span>Trusted by:</span>
                            <div className={styles.brands}>
                                <span className={styles.brand}>🏆 Forbes</span>
                                <span className={styles.brand}>⭐ TrustPilot</span>
                                <span className={styles.brand}>🛡️ Verified</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Featured Products */}
                    <div className={styles.visual}>
                        <div className={styles.visualContainer}>
                            {/* Main Card */}
                            <div className={styles.mainCard}>
                                <img
                                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
                                    alt="Featured Product"
                                />
                                <div className={styles.cardOverlay}>
                                    <span className={styles.cardBadge}>Trending</span>
                                    <div className={styles.cardInfo}>
                                        <h3>Premium Watches</h3>
                                        <p>Starting from $299</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Cards */}
                            <div className={styles.floatingCard1}>
                                <img
                                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"
                                    alt="Headphones"
                                />
                                <div className={styles.floatingInfo}>
                                    <span>Headphones</span>
                                    <span className={styles.floatingPrice}>$149</span>
                                </div>
                            </div>

                            <div className={styles.floatingCard2}>
                                <img
                                    src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200"
                                    alt="Camera"
                                />
                                <div className={styles.floatingInfo}>
                                    <span>Cameras</span>
                                    <span className={styles.floatingPrice}>$599</span>
                                </div>
                            </div>

                            {/* Stats Card */}
                            <div className={styles.statsCard}>
                                <div className={styles.statsCardIcon}>📈</div>
                                <div className={styles.statsCardContent}>
                                    <span className={styles.statsCardNumber}>+28%</span>
                                    <span className={styles.statsCardLabel}>Sales Growth</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
