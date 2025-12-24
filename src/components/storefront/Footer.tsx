import Link from 'next/link'
import {
    FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail,
    FiPhone, FiMapPin, FiCreditCard, FiTruck, FiShield, FiHeadphones
} from 'react-icons/fi'
import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            {/* Features Bar */}
            <div className={styles.featuresBar}>
                <div className="container">
                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <FiTruck className={styles.featureIcon} />
                            <div>
                                <h4>Free Shipping</h4>
                                <p>On orders over $50</p>
                            </div>
                        </div>
                        <div className={styles.feature}>
                            <FiShield className={styles.featureIcon} />
                            <div>
                                <h4>Secure Payment</h4>
                                <p>100% secure checkout</p>
                            </div>
                        </div>
                        <div className={styles.feature}>
                            <FiHeadphones className={styles.featureIcon} />
                            <div>
                                <h4>24/7 Support</h4>
                                <p>Dedicated support</p>
                            </div>
                        </div>
                        <div className={styles.feature}>
                            <FiCreditCard className={styles.featureIcon} />
                            <div>
                                <h4>Easy Returns</h4>
                                <p>30-day return policy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className={styles.mainFooter}>
                <div className="container">
                    <div className={styles.footerGrid}>
                        {/* About */}
                        <div className={styles.footerSection}>
                            <Link href="/" className={styles.footerLogo}>
                                <span className={styles.logoIcon}>🛍️</span>
                                <span className={styles.logoText}>
                                    MP<span>Marketplace</span>
                                </span>
                            </Link>
                            <p className={styles.aboutText}>
                                Your one-stop destination for quality products from verified sellers.
                                Shop with confidence and enjoy the best deals online.
                            </p>
                            <div className={styles.socialLinks}>
                                <a href="#" aria-label="Facebook"><FiFacebook /></a>
                                <a href="#" aria-label="Twitter"><FiTwitter /></a>
                                <a href="#" aria-label="Instagram"><FiInstagram /></a>
                                <a href="#" aria-label="YouTube"><FiYoutube /></a>
                            </div>
                        </div>

                        {/* Shop */}
                        <div className={styles.footerSection}>
                            <h3 className={styles.footerTitle}>Shop</h3>
                            <ul className={styles.footerLinks}>
                                <li><Link href="/products">All Products</Link></li>
                                <li><Link href="/products?category=electronics">Electronics</Link></li>
                                <li><Link href="/products?category=fashion">Fashion</Link></li>
                                <li><Link href="/products?category=home">Home & Garden</Link></li>
                                <li><Link href="/products?category=beauty">Beauty</Link></li>
                                <li><Link href="/deals">Today&apos;s Deals</Link></li>
                            </ul>
                        </div>

                        {/* Customer Service */}
                        <div className={styles.footerSection}>
                            <h3 className={styles.footerTitle}>Customer Service</h3>
                            <ul className={styles.footerLinks}>
                                <li><Link href="/help">Help Center</Link></li>
                                <li><Link href="/account/orders">Track Order</Link></li>
                                <li><Link href="/returns">Returns & Refunds</Link></li>
                                <li><Link href="/shipping">Shipping Info</Link></li>
                                <li><Link href="/faq">FAQ</Link></li>
                                <li><Link href="/contact">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Sell on Marketplace */}
                        <div className={styles.footerSection}>
                            <h3 className={styles.footerTitle}>Sell on Marketplace</h3>
                            <ul className={styles.footerLinks}>
                                <li><Link href="/seller/register">Become a Seller</Link></li>
                                <li><Link href="/seller/benefits">Seller Benefits</Link></li>
                                <li><Link href="/seller/policies">Seller Policies</Link></li>
                                <li><Link href="/seller/guide">Seller Guide</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className={styles.footerSection}>
                            <h3 className={styles.footerTitle}>Contact Us</h3>
                            <ul className={styles.contactList}>
                                <li>
                                    <FiMapPin />
                                    <span>123 Market Street, NY 10001</span>
                                </li>
                                <li>
                                    <FiPhone />
                                    <span>+1 (555) 123-4567</span>
                                </li>
                                <li>
                                    <FiMail />
                                    <span>support@mpmarketplace.com</span>
                                </li>
                            </ul>
                            <div className={styles.newsletter}>
                                <h4>Subscribe to Newsletter</h4>
                                <form className={styles.newsletterForm}>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className={styles.newsletterInput}
                                    />
                                    <button type="submit" className={styles.newsletterButton}>
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.bottomBar}>
                <div className="container">
                    <div className={styles.bottomContent}>
                        <p>&copy; {new Date().getFullYear()} MP Marketplace. All rights reserved.</p>
                        <div className={styles.bottomLinks}>
                            <Link href="/privacy">Privacy Policy</Link>
                            <Link href="/terms">Terms of Service</Link>
                            <Link href="/cookies">Cookie Policy</Link>
                        </div>
                        <div className={styles.paymentMethods}>
                            <span>We Accept:</span>
                            <div className={styles.paymentIcons}>
                                <span>💳 Visa</span>
                                <span>💳 Mastercard</span>
                                <span>💳 PayPal</span>
                                <span>💳 Stripe</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
