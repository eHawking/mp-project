'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiBell, FiPackage, FiTag, FiGift, FiAlertCircle, FiCheck, FiTrash2, FiCheckCircle } from 'react-icons/fi'
import styles from './page.module.css'

interface Notification {
    id: string
    type: 'order' | 'promo' | 'reward' | 'alert'
    title: string
    message: string
    time: string
    read: boolean
    link?: string
}

export default function NotificationsPage() {
    const { data: session, status } = useSession()
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: '1', type: 'order', title: 'Order Shipped!', message: 'Your order #ORD-12345 has been shipped and is on its way.', time: '2 hours ago', read: false, link: '/account/orders' },
        { id: '2', type: 'promo', title: '🎄 Holiday Sale!', message: 'Get 25% off on all skincare products. Use code HOLIDAY25.', time: '1 day ago', read: false },
        { id: '3', type: 'reward', title: 'Cashback Credited', message: '$5.00 cashback has been added to your wallet.', time: '2 days ago', read: true, link: '/account/wallet' },
        { id: '4', type: 'order', title: 'Order Delivered', message: 'Your order #ORD-12340 has been delivered successfully.', time: '3 days ago', read: true },
        { id: '5', type: 'alert', title: 'Password Changed', message: 'Your account password was changed successfully.', time: '1 week ago', read: true },
    ])

    const unreadCount = notifications.filter(n => !n.read).length

    const getIcon = (type: string) => {
        switch (type) {
            case 'order': return <FiPackage />
            case 'promo': return <FiTag />
            case 'reward': return <FiGift />
            case 'alert': return <FiAlertCircle />
            default: return <FiBell />
        }
    }

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
    }

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })))
    }

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id))
    }

    const clearAll = () => {
        setNotifications([])
    }

    if (status === 'loading') return <div className={styles.loading}>Loading...</div>
    if (!session) redirect('/login?callbackUrl=/account/notifications')

    return (
        <div className={styles.notificationsPage}>
            <div className="container">
                <Link href="/account" className={styles.backBtn}>
                    <FiArrowLeft /> Back to Account
                </Link>

                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}><FiBell /> Notifications</h1>
                        {unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount} unread</span>}
                    </div>
                    <div className={styles.headerActions}>
                        {unreadCount > 0 && (
                            <button className={styles.markAllBtn} onClick={markAllAsRead}>
                                <FiCheckCircle /> Mark all read
                            </button>
                        )}
                        {notifications.length > 0 && (
                            <button className={styles.clearBtn} onClick={clearAll}>
                                <FiTrash2 /> Clear all
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles.notificationsList}>
                    {notifications.length === 0 ? (
                        <div className={styles.emptyState}>
                            <FiBell />
                            <p>No notifications</p>
                        </div>
                    ) : (
                        notifications.map(notif => (
                            <div
                                key={notif.id}
                                className={`${styles.notification} ${!notif.read ? styles.unread : ''}`}
                                onClick={() => markAsRead(notif.id)}
                            >
                                <div className={`${styles.icon} ${styles[notif.type]}`}>
                                    {getIcon(notif.type)}
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.notifHeader}>
                                        <h3>{notif.title}</h3>
                                        <span className={styles.time}>{notif.time}</span>
                                    </div>
                                    <p>{notif.message}</p>
                                    {notif.link && (
                                        <Link href={notif.link} className={styles.viewLink}>View Details →</Link>
                                    )}
                                </div>
                                <div className={styles.actions}>
                                    {!notif.read && (
                                        <button className={styles.readBtn} onClick={(e) => { e.stopPropagation(); markAsRead(notif.id); }}>
                                            <FiCheck />
                                        </button>
                                    )}
                                    <button className={styles.deleteBtn} onClick={(e) => { e.stopPropagation(); deleteNotification(notif.id); }}>
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
