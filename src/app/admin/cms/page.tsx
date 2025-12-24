'use client'

import { FiPlus, FiEdit2, FiTrash2, FiEye, FiFileText } from 'react-icons/fi'
import styles from '../vendors/page.module.css'

const pages = [
    { id: '1', title: 'About Us', slug: 'about', status: 'published', updated: '2024-12-20' },
    { id: '2', title: 'Privacy Policy', slug: 'privacy', status: 'published', updated: '2024-12-15' },
    { id: '3', title: 'Terms of Service', slug: 'terms', status: 'published', updated: '2024-12-15' },
    { id: '4', title: 'Contact Us', slug: 'contact', status: 'published', updated: '2024-12-22' },
    { id: '5', title: 'FAQ', slug: 'faq', status: 'draft', updated: '2024-12-24' },
]

export default function CMSPage() {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>CMS Pages</h1>
                <button className={styles.addBtn}><FiPlus /> Add Page</button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Page Title</th>
                            <th>URL Slug</th>
                            <th>Status</th>
                            <th>Last Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map(page => (
                            <tr key={page.id}>
                                <td>
                                    <div className={styles.vendorInfo}>
                                        <FiFileText style={{ fontSize: '1.5rem', color: 'var(--primary)' }} />
                                        <strong>{page.title}</strong>
                                    </div>
                                </td>
                                <td><code>/{page.slug}</code></td>
                                <td>
                                    <span className={`${styles.status} ${page.status === 'published' ? styles.active : styles.pending}`}>
                                        {page.status}
                                    </span>
                                </td>
                                <td>{page.updated}</td>
                                <td>
                                    <div className={styles.actionBtns}>
                                        <button title="Preview"><FiEye /></button>
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
