'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiPlus, FiMapPin, FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi'
import { useToast } from '@/components/Toast'
import styles from './page.module.css'

interface Address {
    id: string
    label: string
    firstName: string
    lastName: string
    phone: string
    address1: string
    address2?: string
    city: string
    state: string
    postalCode: string
    country: string
    isDefault: boolean
}

export default function AddressesPage() {
    const { data: session, status } = useSession()
    const { showToast } = useToast()
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: '1',
            label: 'Home',
            firstName: 'John',
            lastName: 'Doe',
            phone: '+92 300 1234567',
            address1: '123 Main Street',
            address2: 'Apt 4B',
            city: 'Lahore',
            state: 'Punjab',
            postalCode: '54000',
            country: 'Pakistan',
            isDefault: true,
        },
    ])
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState<Partial<Address>>({})

    const handleSave = () => {
        if (!form.firstName || !form.lastName || !form.address1 || !form.city) {
            showToast('Please fill all required fields', 'error')
            return
        }

        if (editingId) {
            setAddresses(addresses.map(a => a.id === editingId ? { ...a, ...form } as Address : a))
            showToast('Address updated!', 'success')
        } else {
            const newAddress: Address = {
                ...form as Address,
                id: Date.now().toString(),
                isDefault: addresses.length === 0,
            }
            setAddresses([...addresses, newAddress])
            showToast('Address added!', 'success')
        }
        setShowForm(false)
        setEditingId(null)
        setForm({})
    }

    const handleEdit = (address: Address) => {
        setForm(address)
        setEditingId(address.id)
        setShowForm(true)
    }

    const handleDelete = (id: string) => {
        setAddresses(addresses.filter(a => a.id !== id))
        showToast('Address deleted', 'success')
    }

    const setDefault = (id: string) => {
        setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })))
        showToast('Default address updated', 'success')
    }

    if (status === 'loading') return <div className={styles.loading}>Loading...</div>
    if (!session) redirect('/login?callbackUrl=/account/addresses')

    return (
        <div className={styles.addressesPage}>
            <div className="container">
                <Link href="/account" className={styles.backBtn}>
                    <FiArrowLeft /> Back to Account
                </Link>

                <div className={styles.header}>
                    <h1 className={styles.title}><FiMapPin /> Saved Addresses</h1>
                    {!showForm && (
                        <button className={styles.addBtn} onClick={() => { setShowForm(true); setForm({ label: 'Home' }); }}>
                            <FiPlus /> Add Address
                        </button>
                    )}
                </div>

                {showForm && (
                    <div className={styles.formCard}>
                        <h2>{editingId ? 'Edit Address' : 'Add New Address'}</h2>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Label</label>
                                <select value={form.label || 'Home'} onChange={e => setForm({ ...form, label: e.target.value })}>
                                    <option>Home</option>
                                    <option>Work</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Phone</label>
                                <input type="tel" value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+92 XXX XXXXXXX" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>First Name *</label>
                                <input value={form.firstName || ''} onChange={e => setForm({ ...form, firstName: e.target.value })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Last Name *</label>
                                <input value={form.lastName || ''} onChange={e => setForm({ ...form, lastName: e.target.value })} />
                            </div>
                            <div className={styles.formGroupFull}>
                                <label>Address Line 1 *</label>
                                <input value={form.address1 || ''} onChange={e => setForm({ ...form, address1: e.target.value })} placeholder="Street address" />
                            </div>
                            <div className={styles.formGroupFull}>
                                <label>Address Line 2</label>
                                <input value={form.address2 || ''} onChange={e => setForm({ ...form, address2: e.target.value })} placeholder="Apartment, suite, etc." />
                            </div>
                            <div className={styles.formGroup}>
                                <label>City *</label>
                                <input value={form.city || ''} onChange={e => setForm({ ...form, city: e.target.value })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>State/Province</label>
                                <input value={form.state || ''} onChange={e => setForm({ ...form, state: e.target.value })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Postal Code</label>
                                <input value={form.postalCode || ''} onChange={e => setForm({ ...form, postalCode: e.target.value })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Country</label>
                                <input value={form.country || 'Pakistan'} onChange={e => setForm({ ...form, country: e.target.value })} />
                            </div>
                        </div>
                        <div className={styles.formActions}>
                            <button className={styles.cancelBtn} onClick={() => { setShowForm(false); setEditingId(null); setForm({}); }}>Cancel</button>
                            <button className={styles.saveBtn} onClick={handleSave}>Save Address</button>
                        </div>
                    </div>
                )}

                <div className={styles.addressList}>
                    {addresses.length === 0 ? (
                        <div className={styles.emptyState}>
                            <FiMapPin />
                            <p>No saved addresses</p>
                        </div>
                    ) : (
                        addresses.map(address => (
                            <div key={address.id} className={`${styles.addressCard} ${address.isDefault ? styles.default : ''}`}>
                                <div className={styles.addressHeader}>
                                    <span className={styles.label}>{address.label}</span>
                                    {address.isDefault && <span className={styles.defaultBadge}><FiCheck /> Default</span>}
                                </div>
                                <p className={styles.name}>{address.firstName} {address.lastName}</p>
                                <p className={styles.street}>{address.address1}{address.address2 && `, ${address.address2}`}</p>
                                <p className={styles.cityLine}>{address.city}, {address.state} {address.postalCode}</p>
                                <p className={styles.phone}>{address.phone}</p>
                                <div className={styles.addressActions}>
                                    <button onClick={() => handleEdit(address)}><FiEdit2 /> Edit</button>
                                    {!address.isDefault && <button onClick={() => setDefault(address.id)}>Set Default</button>}
                                    <button className={styles.deleteBtn} onClick={() => handleDelete(address.id)}><FiTrash2 /></button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
