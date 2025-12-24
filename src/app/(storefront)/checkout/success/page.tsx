'use client'

import Link from 'next/link'
import { FiCheck, FiPackage, FiHome } from 'react-icons/fi'
import styles from './page.module.css'

export default function CheckoutSuccessPage() {
    return (
        <div className={styles.successPage}>
            <div className="container">
                <div className={styles.successCard}>
                    <div className={styles.checkIcon}>
                        <FiCheck />
                    </div>
                    <h1>Order Placed Successfully! 🎉</h1>
                    <p>Thank you for your order. We&apos;ve sent a confirmation email with your order details.</p>

                    <div className={styles.orderInfo}>
                        <p><strong>Order Number:</strong> #ORD-{Date.now().toString().slice(-8)}</p>
                        <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
                    </div>

                    <div className={styles.actions}>
                        <Link href="/account/orders" className={styles.ordersBtn}>
                            <FiPackage /> View Orders
                        </Link>
                        <Link href="/" className={styles.homeBtn}>
                            <FiHome /> Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
