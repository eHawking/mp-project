'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { useTheme } from '@/components/ThemeProvider'
import {
    FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX,
    FiSun, FiMoon, FiChevronDown, FiLogOut, FiPackage, FiSettings,
    FiGrid, FiShoppingBag
} from 'react-icons/fi'
import styles from './Header.module.css'

export default function Header() {
    const { data: session } = useSession()
    const { theme, toggleTheme } = useTheme()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <header className={styles.header}>
            {/* Top Bar */}
            <div className={styles.topBar}>
                <div className="container">
                    <div className={styles.topBarContent}>
                        <span>🚀 Free shipping on orders over $50</span>
                        <div className={styles.topBarLinks}>
                            <Link href="/seller/register">Become a Seller</Link>
                            <Link href="/help">Help Center</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className={styles.mainHeader}>
                <div className="container">
                    <div className={styles.headerContent}>
                        {/* Logo */}
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoIcon}>🛍️</span>
                            <span className={styles.logoText}>
                                MP<span>Marketplace</span>
                            </span>
                        </Link>

                        {/* Search Bar */}
                        <div className={styles.searchBar}>
                            <FiSearch className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search for products, brands and more..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                            />
                            <button className={styles.searchButton}>Search</button>
                        </div>

                        {/* Header Actions */}
                        <div className={styles.headerActions}>
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className={styles.iconButton}
                                title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                            >
                                {theme === 'light' ? <FiMoon /> : <FiSun />}
                            </button>

                            {/* Wishlist */}
                            <Link href="/wishlist" className={styles.iconButton}>
                                <FiHeart />
                                <span className={styles.badge}>0</span>
                            </Link>

                            {/* Cart */}
                            <Link href="/cart" className={styles.iconButton}>
                                <FiShoppingCart />
                                <span className={styles.badge}>0</span>
                            </Link>

                            {/* User Menu */}
                            {session ? (
                                <div
                                    className={`${styles.userMenu} dropdown ${userMenuOpen ? 'active' : ''}`}
                                    onMouseEnter={() => setUserMenuOpen(true)}
                                    onMouseLeave={() => setUserMenuOpen(false)}
                                >
                                    <button className={styles.userButton}>
                                        <div className={styles.avatar}>
                                            {session.user.avatar ? (
                                                <img src={session.user.avatar} alt="" />
                                            ) : (
                                                session.user.firstName?.[0] || 'U'
                                            )}
                                        </div>
                                        <span className={styles.userName}>
                                            {session.user.firstName}
                                        </span>
                                        <FiChevronDown />
                                    </button>
                                    <div className="dropdown-menu">
                                        <Link href="/account" className="dropdown-item">
                                            <FiUser /> My Account
                                        </Link>
                                        <Link href="/account/orders" className="dropdown-item">
                                            <FiPackage /> My Orders
                                        </Link>
                                        <Link href="/wishlist" className="dropdown-item">
                                            <FiHeart /> Wishlist
                                        </Link>
                                        {session.user.role === 'SELLER' && (
                                            <Link href="/seller" className="dropdown-item">
                                                <FiShoppingBag /> Seller Dashboard
                                            </Link>
                                        )}
                                        {session.user.role === 'ADMIN' && (
                                            <Link href="/admin" className="dropdown-item">
                                                <FiGrid /> Admin Panel
                                            </Link>
                                        )}
                                        <div className="dropdown-divider" />
                                        <button
                                            onClick={() => signOut()}
                                            className="dropdown-item"
                                        >
                                            <FiLogOut /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Link href="/login" className={styles.loginButton}>
                                    <FiUser />
                                    <span>Login</span>
                                </Link>
                            )}

                            {/* Mobile Menu Toggle */}
                            <button
                                className={`${styles.menuToggle} md:hidden`}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <FiX /> : <FiMenu />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className={styles.nav}>
                <div className="container">
                    <div className={styles.navContent}>
                        <Link href="/products" className={styles.navLink}>All Products</Link>
                        <Link href="/products?category=electronics" className={styles.navLink}>Electronics</Link>
                        <Link href="/products?category=fashion" className={styles.navLink}>Fashion</Link>
                        <Link href="/products?category=home" className={styles.navLink}>Home & Garden</Link>
                        <Link href="/products?category=beauty" className={styles.navLink}>Beauty</Link>
                        <Link href="/products?category=sports" className={styles.navLink}>Sports</Link>
                        <Link href="/stores" className={styles.navLink}>Stores</Link>
                        <Link href="/deals" className={`${styles.navLink} ${styles.dealsLink}`}>
                            🔥 Deals
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <div className={styles.mobileSearch}>
                        <FiSearch />
                        <input type="text" placeholder="Search products..." />
                    </div>
                    <nav className={styles.mobileNav}>
                        <Link href="/products">All Products</Link>
                        <Link href="/products?category=electronics">Electronics</Link>
                        <Link href="/products?category=fashion">Fashion</Link>
                        <Link href="/products?category=home">Home & Garden</Link>
                        <Link href="/products?category=beauty">Beauty</Link>
                        <Link href="/stores">Stores</Link>
                        <Link href="/deals">Deals</Link>
                    </nav>
                    {!session && (
                        <div className={styles.mobileAuth}>
                            <Link href="/login" className="btn btn-primary">Login</Link>
                            <Link href="/register" className="btn btn-outline">Register</Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}
