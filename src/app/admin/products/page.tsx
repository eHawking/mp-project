'use client'

import { useState } from 'react'
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye, FiCheck, FiX } from 'react-icons/fi'
import styles from '../vendors/page.module.css'

const products = [
    { id: '1', name: 'Premium Wireless Headphones', vendor: 'TechStore', price: 299.99, stock: 45, status: 'active', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80' },
    { id: '2', name: 'Smart Watch Series X', vendor: 'GadgetWorld', price: 449.99, stock: 23, status: 'active', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80' },
    { id: '3', name: 'Leather Backpack', vendor: 'StyleShop', price: 189.99, stock: 0, status: 'outofstock', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=80' },
    { id: '4', name: 'Vintage Sunglasses', vendor: 'StyleShop', price: 149.99, stock: 67, status: 'pending', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=80' },
    { id: '5', name: 'Professional Camera Kit', vendor: 'PhotoPro', price: 1299.99, stock: 12, status: 'active', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=80' },
]

export default function ProductsPage() {
    const [filter, setFilter] = useState('all')
    const filtered = filter === 'all' ? products : products.filter(p => p.status === filter)

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Product Management</h1>
                <div className={styles.actions}>
                    <div className={styles.searchBox}>
                        <FiSearch />
                        <input type="text" placeholder="Search products..." />
                    </div>
                    <select value={filter} onChange={e => setFilter(e.target.value)} className={styles.filterSelect}>
                        <option value="all">All Products</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending Review</option>
                        <option value="outofstock">Out of Stock</option>
                    </select>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Vendor</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <div className={styles.vendorInfo}>
                                        <img src={product.image} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                                        <p className={styles.name}>{product.name}</p>
                                    </div>
                                </td>
                                <td>{product.vendor}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <span className={`${styles.status} ${styles[product.status]}`}>
                                        {product.status === 'outofstock' ? 'Out of Stock' : product.status}
                                    </span>
                                </td>
                                <td>
                                    <div className={styles.actionBtns}>
                                        <button title="View"><FiEye /></button>
                                        <button title="Edit"><FiEdit2 /></button>
                                        {product.status === 'pending' && (
                                            <>
                                                <button title="Approve" className={styles.approve}><FiCheck /></button>
                                                <button title="Reject" className={styles.reject}><FiX /></button>
                                            </>
                                        )}
                                        <button title="Delete" className={styles.reject}><FiTrash2 /></button>
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
