'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FiUser, FiPackage, FiHeart, FiMapPin, FiSettings, FiLogOut, FiChevronRight } from 'react-icons/fi'
import styles from './page.module.css'

export default function AccountPage() {
    const { data: session, status } = useSession()

    if (status === 'loading') {
        return <div className={styles.loading}>Loading...</div>
    }

    if (!session) {
        redirect('/login?callbackUrl=/account')
    }

    const menuItems = [
        { icon: FiUser, label: 'Profile Information', href: '/account/profile', desc: 'Manage your personal details' },
        { icon: FiPackage, label: 'My Orders', href: '/account/orders', desc: 'Track and manage your orders' },
        { icon: FiHeart, label: 'Wishlist', href: '/wishlist', desc: 'View your saved items' },
        { icon: FiMapPin, label: 'Addresses', href: '/account/addresses', desc: 'Manage delivery addresses' },
        { icon: FiSettings, label: 'Settings', href: '/account/settings', desc: 'Account preferences' },
    ]

    return (
        <div className={styles.accountPage}>
            <div className="container">
                <div className={styles.header}>
                    <h1>My Account</h1>
                    <p>Welcome back, {session.user.firstName}!</p>
                </div>

                <div className={styles.content}>
                    {/* User Card */}
                    <div className={styles.userCard}>
                        <div className={styles.avatar}>
                            {session.user.avatar ? (
                                <img src={session.user.avatar} alt="" />
                            ) : (
                                session.user.firstName?.[0] || 'U'
                            )}
                        </div>
                        <div className={styles.userInfo}>
                            <h2>{session.user.firstName} {session.user.lastName}</h2>
                            <p>{session.user.email}</p>
                            <span className={styles.memberBadge}>Member since 2024</span>
                        </div>
                    </div>

                    {/* Menu Grid */}
                    <div className={styles.menuGrid}>
                        {menuItems.map((item, i) => (
                            <Link key={i} href={item.href} className={styles.menuCard}>
                                <div className={styles.menuIcon}>
                                    <item.icon />
                                </div>
                                <div className={styles.menuInfo}>
                                    <h3>{item.label}</h3>
                                    <p>{item.desc}</p>
                                </div>
                                <FiChevronRight className={styles.chevron} />
                            </Link>
                        ))}
                    </div>

                    {/* Recent Orders Preview */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2>Recent Orders</h2>
                            <Link href="/account/orders">View All</Link>
                        </div>
                        <div className={styles.emptyState}>
                            <FiPackage />
                            <p>No orders yet</p>
                            <Link href="/products" className={styles.shopBtn}>Start Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
