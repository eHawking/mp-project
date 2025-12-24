'use client'

import { useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiChevronRight } from 'react-icons/fi'
import styles from '../vendors/page.module.css'

const categories = [
    { id: '1', name: 'Electronics', slug: 'electronics', products: 156, subcategories: ['Phones', 'Laptops', 'Audio', 'Cameras'] },
    { id: '2', name: 'Fashion', slug: 'fashion', products: 234, subcategories: ['Men', 'Women', 'Kids', 'Accessories'] },
    { id: '3', name: 'Home & Garden', slug: 'home', products: 189, subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden'] },
    { id: '4', name: 'Beauty', slug: 'beauty', products: 145, subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrances'] },
    { id: '5', name: 'Sports', slug: 'sports', products: 98, subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Swimwear'] },
]

export default function CategoriesPage() {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Category Management</h1>
                <button className={styles.addBtn}><FiPlus /> Add Category</button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Slug</th>
                            <th>Products</th>
                            <th>Subcategories</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat.id}>
                                <td><strong>{cat.name}</strong></td>
                                <td><code>{cat.slug}</code></td>
                                <td>{cat.products}</td>
                                <td>{cat.subcategories.join(', ')}</td>
                                <td>
                                    <div className={styles.actionBtns}>
                                        <button title="Edit"><FiEdit2 /></button>
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
