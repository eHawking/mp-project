'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FiUser, FiArrowLeft, FiCamera, FiSave } from 'react-icons/fi'
import { useToast } from '@/components/Toast'
import styles from './page.module.css'

export default function ProfilePage() {
    const { data: session, status } = useSession()
    const { showToast } = useToast()
    const [saving, setSaving] = useState(false)
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    })

    if (status === 'loading') {
        return <div className={styles.loading}>Loading...</div>
    }

    if (!session) {
        redirect('/login?callbackUrl=/account/profile')
    }

    // Initialize profile from session
    if (profile.firstName === '' && session.user) {
        setProfile({
            firstName: session.user.firstName || '',
            lastName: session.user.lastName || '',
            email: session.user.email || '',
            phone: '',
        })
    }

    const handleSave = async () => {
        setSaving(true)
        await new Promise(r => setTimeout(r, 1000))
        showToast('Profile updated successfully!', 'success')
        setSaving(false)
    }

    return (
        <div className={styles.profilePage}>
            <div className="container">
                <Link href="/account" className={styles.backBtn}>
                    <FiArrowLeft /> Back to Account
                </Link>

                <h1 className={styles.title}>Profile Information</h1>

                <div className={styles.content}>
                    {/* Avatar Section */}
                    <div className={styles.avatarSection}>
                        <div className={styles.avatar}>
                            {session.user.avatar ? (
                                <img src={session.user.avatar} alt="" />
                            ) : (
                                session.user.firstName?.[0] || 'U'
                            )}
                        </div>
                        <button className={styles.changeAvatarBtn}>
                            <FiCamera /> Change Photo
                        </button>
                    </div>

                    {/* Form */}
                    <div className={styles.formCard}>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>First Name</label>
                                <input
                                    type="text"
                                    value={profile.firstName}
                                    onChange={e => setProfile({ ...profile, firstName: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    value={profile.lastName}
                                    onChange={e => setProfile({ ...profile, lastName: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={e => setProfile({ ...profile, email: e.target.value })}
                                    disabled
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    value={profile.phone}
                                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>

                        <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                            <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
