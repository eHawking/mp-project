'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiSearch, FiFilter, FiCheck, FiX, FiEye, FiMoreVertical } from 'react-icons/fi'
import styles from './page.module.css'

// Mock vendors data
const vendors = [
    { id: '1', name: 'TechStore', email: 'tech@store.com', products: 156, revenue: 45280, status: 'active', joined: '2024-01-15' },
    { id: '2', name: 'Fashion Hub', email: 'fashion@hub.com', products: 234, revenue: 32150, status: 'active', joined: '2024-02-20' },
    { id: '3', name: 'Home Essentials', email: 'home@ess.com', products: 89, revenue: 18900, status: 'pending', joined: '2024-12-01' },
    { id: '4', name: 'Sports World', email: 'sports@world.com', products: 67, revenue: 12500, status: 'pending', joined: '2024-12-15' },
    { id: '5', name: 'Beauty Plus', email: 'beauty@plus.com', products: 112, revenue: 28400, status: 'suspended', joined: '2024-03-10' },
]

export default function VendorsPage() {
    const [filter, setFilter] = useState('all')

    const filtered = filter === 'all' ? vendors : vendors.filter(v => v.status === filter)

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Vendor Management</h1>
                <div className={styles.actions}>
                    <div className={styles.searchBox}>
                        <FiSearch />
                        <input type="text" placeholder="Search vendors..." />
                    </div>
                    <select value={filter} onChange={e => setFilter(e.target.value)} className={styles.filterSelect}>
                        <option value="all">All Vendors</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                    </select>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Products</th>
                            <th>Revenue</th>
                            <th>Status</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(vendor => (
                            <tr key={vendor.id}>
                                <td>
                                    <div className={styles.vendorInfo}>
                                        <div className={styles.avatar}>{vendor.name[0]}</div>
                                        <div>
                                            <p className={styles.name}>{vendor.name}</p>
                                            <p className={styles.email}>{vendor.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{vendor.products}</td>
                                <td>${vendor.revenue.toLocaleString()}</td>
                                <td>
                                    <span className={`${styles.status} ${styles[vendor.status]}`}>
                                        {vendor.status}
                                    </span>
                                </td>
                                <td>{vendor.joined}</td>
                                <td>
                                    <div className={styles.actionBtns}>
                                        <button title="View"><FiEye /></button>
                                        {vendor.status === 'pending' && (
                                            <>
                                                <button title="Approve" className={styles.approve}><FiCheck /></button>
                                                <button title="Reject" className={styles.reject}><FiX /></button>
                                            </>
                                        )}
                                        <button title="More"><FiMoreVertical /></button>
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
