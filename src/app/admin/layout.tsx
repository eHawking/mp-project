'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import {
    FiHome, FiUsers, FiPackage, FiShoppingBag, FiSettings,
    FiBarChart2, FiSun, FiMoon, FiLogOut, FiChevronLeft, FiChevronRight,
    FiBell, FiGrid, FiLayers, FiFileText, FiMenu, FiImage, FiCpu, FiInbox, FiMail, FiCreditCard, FiMessageCircle
} from 'react-icons/fi'
import styles from './layout.module.css'

const sidebarItems = [
    { href: '/admin', icon: FiHome, label: 'Dashboard' },
    { href: '/admin/vendors', icon: FiUsers, label: 'Vendors' },
    { href: '/admin/products', icon: FiPackage, label: 'Products' },
    { href: '/admin/orders', icon: FiShoppingBag, label: 'Orders' },
    { href: '/admin/categories', icon: FiLayers, label: 'Categories' },
    { href: '/admin/users', icon: FiUsers, label: 'Users' },
    { href: '/admin/cms', icon: FiFileText, label: 'CMS Pages' },
    { href: '/admin/banners', icon: FiImage, label: 'Banners' },
    { href: '/admin/analytics', icon: FiBarChart2, label: 'Analytics' },
    { href: '/admin/ai-support', icon: FiCpu, label: 'AI Support' },
    { href: '/admin/inbox', icon: FiInbox, label: 'Inbox' },
    { href: '/admin/payments', icon: FiCreditCard, label: 'Payments' },
    { href: '/admin/whatsapp', icon: FiMessageCircle, label: 'WhatsApp' },
    { href: '/admin/email', icon: FiMail, label: 'Email' },
    { href: '/admin/appearance', icon: FiImage, label: 'Appearance' },
    { href: '/admin/settings', icon: FiSettings, label: 'Settings' },
]

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const { data: session } = useSession()
    const [collapsed, setCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
        if (stored) {
            setTheme(stored)
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
    }

    return (
        <div className={styles.layout}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''} ${mobileOpen ? styles.mobileOpen : ''}`}>
                {/* Logo */}
                <div className={styles.sidebarHeader}>
                    <Link href="/admin" className={styles.logo}>
                        <span className={styles.logoIcon}>⚙️</span>
                        {!collapsed && <span className={styles.logoText}>Admin Panel</span>}
                    </Link>
                    <button
                        className={styles.collapseBtn}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className={styles.nav}>
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/admin' && pathname.startsWith(item.href))
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                <item.icon className={styles.navIcon} />
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer */}
                <div className={styles.sidebarFooter}>
                    <Link href="/" className={styles.navItem}>
                        <FiGrid className={styles.navIcon} />
                        {!collapsed && <span>View Store</span>}
                    </Link>
                    <button onClick={toggleTheme} className={styles.navItem}>
                        {theme === 'light' ? <FiMoon className={styles.navIcon} /> : <FiSun className={styles.navIcon} />}
                        {!collapsed && <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
                    </button>
                    <button onClick={() => signOut()} className={styles.navItem}>
                        <FiLogOut className={styles.navIcon} />
                        {!collapsed && <span>Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className={styles.main}>
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.headerLeft}>
                        <button
                            className={styles.mobileMenuBtn}
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            <FiMenu />
                        </button>
                        <div className={styles.pageInfo}>
                            <h1 className={styles.pageTitle}>
                                {sidebarItems.find(item =>
                                    pathname === item.href ||
                                    (item.href !== '/admin' && pathname.startsWith(item.href))
                                )?.label || 'Dashboard'}
                            </h1>
                            <p className={styles.welcomeText}>
                                DewDropSkin Admin 🛡️
                            </p>
                        </div>
                    </div>

                    <div className={styles.headerRight}>
                        <button className={styles.headerBtn}>
                            <FiBell />
                            <span className={styles.badge}>5</span>
                        </button>
                        <div className={styles.userInfo}>
                            <div className={styles.avatar}>
                                {session?.user?.avatar ? (
                                    <img src={session.user.avatar} alt="" />
                                ) : (
                                    session?.user?.firstName?.[0] || 'A'
                                )}
                            </div>
                            <div className={styles.userDetails}>
                                <span className={styles.userName}>
                                    {session?.user?.firstName} {session?.user?.lastName}
                                </span>
                                <span className={styles.userRole}>Administrator</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className={styles.content}>
                    {children}
                </div>
            </div>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setMobileOpen(false)}
                />
            )}
        </div>
    )
}
