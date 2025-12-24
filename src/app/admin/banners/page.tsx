'use client'

import { FiPlus, FiEdit2, FiTrash2, FiEye, FiImage, FiToggleLeft, FiToggleRight } from 'react-icons/fi'
import styles from '../vendors/page.module.css'

const banners = [
    { id: '1', title: 'Winter Sale', position: 'Homepage Hero', status: 'active', clicks: 1250, image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200' },
    { id: '2', title: 'New Arrivals', position: 'Homepage Middle', status: 'active', clicks: 856, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200' },
    { id: '3', title: 'Free Shipping', position: 'Header Banner', status: 'inactive', clicks: 2340, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200' },
    { id: '4', title: 'Summer Collection', position: 'Category Page', status: 'scheduled', clicks: 0, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200' },
]

export default function BannersPage() {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Banner Management</h1>
                <button className={styles.addBtn}><FiPlus /> Add Banner</button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Banner</th>
                            <th>Position</th>
                            <th>Status</th>
                            <th>Clicks</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banners.map(banner => (
                            <tr key={banner.id}>
                                <td>
                                    <div className={styles.vendorInfo}>
                                        <img src={banner.image} alt="" style={{ width: 60, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                                        <strong>{banner.title}</strong>
                                    </div>
                                </td>
                                <td>{banner.position}</td>
                                <td>
                                    <span className={`${styles.status} ${styles[banner.status] || styles.pending}`}>
                                        {banner.status}
                                    </span>
                                </td>
                                <td>{banner.clicks.toLocaleString()}</td>
                                <td>
                                    <div className={styles.actionBtns}>
                                        <button title="Preview"><FiEye /></button>
                                        <button title="Edit"><FiEdit2 /></button>
                                        <button title="Toggle">{banner.status === 'active' ? <FiToggleRight /> : <FiToggleLeft />}</button>
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
