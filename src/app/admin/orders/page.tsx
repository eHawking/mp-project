'use client'

import { useState } from 'react'
import { FiSearch, FiEye, FiTruck, FiPackage, FiCheck, FiX } from 'react-icons/fi'
import styles from '../vendors/page.module.css'

const orders = [
    { id: 'ORD-001', customer: 'John Doe', items: 3, total: 549.97, status: 'processing', date: '2024-12-24', vendor: 'TechStore' },
    { id: 'ORD-002', customer: 'Jane Smith', items: 2, total: 299.98, status: 'shipped', date: '2024-12-23', vendor: 'StyleShop' },
    { id: 'ORD-003', customer: 'Mike Johnson', items: 1, total: 1299.99, status: 'delivered', date: '2024-12-22', vendor: 'PhotoPro' },
    { id: 'ORD-004', customer: 'Sarah Wilson', items: 4, total: 189.96, status: 'pending', date: '2024-12-24', vendor: 'HomeEssentials' },
    { id: 'ORD-005', customer: 'Tom Brown', items: 2, total: 449.98, status: 'cancelled', date: '2024-12-21', vendor: 'GadgetWorld' },
]

export default function OrdersPage() {
    const [filter, setFilter] = useState('all')
    const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Order Management</h1>
                <div className={styles.actions}>
                    <div className={styles.searchBox}>
                        <FiSearch />
                        <input type="text" placeholder="Search orders..." />
                    </div>
                    <select value={filter} onChange={e => setFilter(e.target.value)} className={styles.filterSelect}>
                        <option value="all">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Vendor</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(order => (
                            <tr key={order.id}>
                                <td><strong>{order.id}</strong></td>
                                <td>{order.customer}</td>
                                <td>{order.items}</td>
                                <td>${order.total.toFixed(2)}</td>
                                <td>{order.vendor}</td>
                                <td>
                                    <span className={`${styles.status} ${styles[order.status] || styles.pending}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>{order.date}</td>
                                <td>
                                    <div className={styles.actionBtns}>
                                        <button title="View"><FiEye /></button>
                                        <button title="Update Shipping"><FiTruck /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
