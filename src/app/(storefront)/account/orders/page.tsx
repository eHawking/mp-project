'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FiPackage, FiArrowLeft, FiTruck, FiCheck, FiClock, FiX } from 'react-icons/fi'
import styles from './page.module.css'

// Mock orders for demo
const mockOrders: any[] = []

export default function OrdersPage() {
    const { data: session, status } = useSession()

    if (status === 'loading') {
        return <div className={styles.loading}>Loading...</div>
    }

    if (!session) {
        redirect('/login?callbackUrl=/account/orders')
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'delivered': return <FiCheck />
            case 'shipped': return <FiTruck />
            case 'cancelled': return <FiX />
            default: return <FiClock />
        }
    }

    return (
        <div className={styles.ordersPage}>
            <div className="container">
                <div className={styles.header}>
                    <Link href="/account" className={styles.backBtn}>
                        <FiArrowLeft /> Back
                    </Link>
                    <h1>My Orders</h1>
                    <p>Track and manage your orders</p>
                </div>

                {mockOrders.length === 0 ? (
                    <div className={styles.emptyState}>
                        <FiPackage />
                        <h2>No orders yet</h2>
                        <p>When you place an order, it will appear here.</p>
                        <Link href="/products" className={styles.shopBtn}>Start Shopping</Link>
                    </div>
                ) : (
                    <div className={styles.ordersList}>
                        {mockOrders.map((order: any) => (
                            <div key={order.id} className={styles.orderCard}>
                                <div className={styles.orderHeader}>
                                    <div>
                                        <span className={styles.orderId}>Order #{order.orderNumber}</span>
                                        <span className={styles.orderDate}>{order.date}</span>
                                    </div>
                                    <span className={`${styles.status} ${styles[order.status]}`}>
                                        {getStatusIcon(order.status)} {order.status}
                                    </span>
                                </div>
                                <div className={styles.orderItems}>
                                    {order.items?.map((item: any, i: number) => (
                                        <div key={i} className={styles.orderItem}>
                                            <img src={item.image} alt={item.name} />
                                            <div className={styles.itemInfo}>
                                                <p className={styles.itemName}>{item.name}</p>
                                                <p className={styles.itemQty}>Qty: {item.quantity}</p>
                                            </div>
                                            <p className={styles.itemPrice}>${item.price}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.orderFooter}>
                                    <span className={styles.total}>Total: ${order.total}</span>
                                    <Link href={`/account/orders/${order.id}`} className={styles.viewBtn}>
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
