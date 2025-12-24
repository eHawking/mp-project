'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import {
    FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX,
    FiSun, FiMoon, FiChevronDown, FiLogOut, FiPackage, FiSettings,
    FiGrid, FiShoppingBag
} from 'react-icons/fi'
import CurrencySelector from '@/components/CurrencySelector'
import styles from './Header.module.css'

interface SiteSettings {
    logoLight?: string
    logoDark?: string
    siteName?: string
    headerShowSearch?: boolean
    headerShowCart?: boolean
    headerShowWishlist?: boolean
    headerShowAccount?: boolean
    headerNavLinks?: string
}

export default function Header() {
    const { data: session } = useSession()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [settings, setSettings] = useState<SiteSettings>({})
    const [navLinks, setNavLinks] = useState<{ label: string, url: string }[]>([
        { label: 'All Products', url: '/products' },
        { label: 'Deals', url: '/deals' },
        { label: 'Stores', url: '/stores' },
    ])

    useEffect(() => {
        const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
        if (stored) {
            setTheme(stored)
            document.documentElement.setAttribute('data-theme', stored)
        }
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings')
            if (res.ok) {
                const data = await res.json()
                setSettings(data)
                if (data.headerNavLinks) {
                    try {
                        setNavLinks(JSON.parse(data.headerNavLinks))
                    } catch { }
                }
            }
        } catch (error) {
            console.error('Error fetching settings:', error)
        }
    }

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
    }

    const currentLogo = theme === 'dark' ? settings.logoDark : settings.logoLight
    const showSearch = settings.headerShowSearch !== false
    const showCart = settings.headerShowCart !== false
    const showWishlist = settings.headerShowWishlist !== false
    const showAccount = settings.headerShowAccount !== false

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
                            <CurrencySelector />
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
                            {currentLogo ? (
                                <img src={currentLogo} alt={settings.siteName || 'Logo'} className={styles.logoImage} />
                            ) : (
                                <>
                                    <span className={styles.logoIcon}>🛍️</span>
                                    <span className={styles.logoText}>
                                        {settings.siteName || 'DewDropSkin'}
                                    </span>
                                </>
                            )}
                        </Link>

                        {/* Search Bar */}
                        {showSearch && (
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
                        )}

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
                            {showWishlist && (
                                <Link href="/wishlist" className={styles.iconButton}>
                                    <FiHeart />
                                    <span className={styles.badge}>0</span>
                                </Link>
                            )}

                            {/* Cart */}
                            {showCart && (
                                <Link href="/cart" className={styles.iconButton}>
                                    <FiShoppingCart />
                                    <span className={styles.badge}>0</span>
                                </Link>
                            )}

                            {/* User Menu */}
                            {showAccount && (
                                <>
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
                                </>
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
                        {navLinks.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url}
                                className={`${styles.navLink} ${link.label.toLowerCase().includes('deal') ? styles.dealsLink : ''}`}
                            >
                                {link.label.toLowerCase().includes('deal') ? '🔥 ' : ''}{link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    {showSearch && (
                        <div className={styles.mobileSearch}>
                            <FiSearch />
                            <input type="text" placeholder="Search products..." />
                        </div>
                    )}
                    <nav className={styles.mobileNav}>
                        {navLinks.map((link, i) => (
                            <Link key={i} href={link.url}>{link.label}</Link>
                        ))}
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
