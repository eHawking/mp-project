'use client'

import { useState } from 'react'
import { FiSearch, FiEdit2, FiTrash2, FiUserX, FiUserCheck } from 'react-icons/fi'
import styles from '../vendors/page.module.css'

const users = [
    { id: '1', name: 'John Doe', email: 'john@email.com', role: 'BUYER', orders: 12, status: 'active', joined: '2024-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@email.com', role: 'BUYER', orders: 8, status: 'active', joined: '2024-02-20' },
    { id: '3', name: 'Mike Johnson', email: 'mike@email.com', role: 'SELLER', orders: 0, status: 'active', joined: '2024-03-10' },
    { id: '4', name: 'Sarah Wilson', email: 'sarah@email.com', role: 'SELLER', orders: 0, status: 'suspended', joined: '2024-04-05' },
    { id: '5', name: 'Admin User', email: 'admin@dewdropskin.com', role: 'ADMIN', orders: 0, status: 'active', joined: '2024-01-01' },
]

export default function UsersPage() {
    const [filter, setFilter] = useState('all')
    const filtered = filter === 'all' ? users : users.filter(u => u.role === filter)

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>User Management</h1>
                <div className={styles.actions}>
                    <div className={styles.searchBox}>
                        <FiSearch />
                        <input type="text" placeholder="Search users..." />
                    </div>
                    <select value={filter} onChange={e => setFilter(e.target.value)} className={styles.filterSelect}>
                        <option value="all">All Users</option>
                        <option value="BUYER">Buyers</option>
                        <option value="SELLER">Sellers</option>
                        <option value="ADMIN">Admins</option>
                    </select>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Orders</th>
                            <th>Status</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <div className={styles.vendorInfo}>
                                        <div className={styles.avatar}>{user.name[0]}</div>
                                        <div>
                                            <p className={styles.name}>{user.name}</p>
                                            <p className={styles.email}>{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td><span className={`${styles.status} ${styles[user.role.toLowerCase()]}`}>{user.role}</span></td>
                                <td>{user.orders}</td>
                                <td><span className={`${styles.status} ${styles[user.status]}`}>{user.status}</span></td>
                                <td>{user.joined}</td>
                                <td>
                                    <div className={styles.actionBtns}>
                                        <button title="Edit"><FiEdit2 /></button>
                                        {user.status === 'active' ? (
                                            <button title="Suspend" className={styles.reject}><FiUserX /></button>
                                        ) : (
                                            <button title="Activate" className={styles.approve}><FiUserCheck /></button>
                                        )}
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
