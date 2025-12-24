'use client'

import { useState, useEffect } from 'react'
import { FiSave, FiGlobe, FiMail, FiDollarSign, FiShield, FiBell, FiDatabase, FiLoader } from 'react-icons/fi'
import { useToast } from '@/components/Toast'
import styles from './page.module.css'

const defaultSettings = {
    siteName: 'MP Marketplace',
    siteUrl: 'https://dewdropskin.com',
    supportEmail: 'support@mpmarketplace.com',
    commissionRate: 10,
    minPayout: 50,
    enableRegistration: true,
    enableReviews: true,
    enableAI: true,
}

export default function SettingsPage() {
    const { showToast } = useToast()
    const [settings, setSettings] = useState(defaultSettings)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // Fetch settings on mount
    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings')
            if (res.ok) {
                const data = await res.json()
                setSettings({ ...defaultSettings, ...data })
            }
        } catch (error) {
            console.error('Error fetching settings:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            })

            if (res.ok) {
                showToast('Settings saved successfully!', 'success')
            } else {
                const data = await res.json()
                showToast(data.error || 'Failed to save settings', 'error')
            }
        } catch (error) {
            showToast('Failed to save settings', 'error')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className={styles.page}>
                <div className={styles.loading}>
                    <FiLoader className={styles.spinner} /> Loading settings...
                </div>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Platform Settings</h1>
                <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                    {saving ? <FiLoader className={styles.spinner} /> : <FiSave />}
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className={styles.sections}>
                {/* General */}
                <div className={styles.section}>
                    <h2><FiGlobe /> General Settings</h2>
                    <div className={styles.form}>
                        <div className={styles.field}>
                            <label>Site Name</label>
                            <input type="text" value={settings.siteName} onChange={e => setSettings({ ...settings, siteName: e.target.value })} />
                        </div>
                        <div className={styles.field}>
                            <label>Site URL</label>
                            <input type="url" value={settings.siteUrl} onChange={e => setSettings({ ...settings, siteUrl: e.target.value })} />
                        </div>
                        <div className={styles.field}>
                            <label>Support Email</label>
                            <input type="email" value={settings.supportEmail} onChange={e => setSettings({ ...settings, supportEmail: e.target.value })} />
                        </div>
                    </div>
                </div>

                {/* Commission */}
                <div className={styles.section}>
                    <h2><FiDollarSign /> Commission & Payouts</h2>
                    <div className={styles.form}>
                        <div className={styles.field}>
                            <label>Commission Rate (%)</label>
                            <input type="number" value={settings.commissionRate} onChange={e => setSettings({ ...settings, commissionRate: Number(e.target.value) })} />
                        </div>
                        <div className={styles.field}>
                            <label>Minimum Payout ($)</label>
                            <input type="number" value={settings.minPayout} onChange={e => setSettings({ ...settings, minPayout: Number(e.target.value) })} />
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className={styles.section}>
                    <h2><FiShield /> Features</h2>
                    <div className={styles.toggleList}>
                        <label className={styles.toggle}>
                            <input type="checkbox" checked={settings.enableRegistration} onChange={e => setSettings({ ...settings, enableRegistration: e.target.checked })} />
                            <span>Enable User Registration</span>
                        </label>
                        <label className={styles.toggle}>
                            <input type="checkbox" checked={settings.enableReviews} onChange={e => setSettings({ ...settings, enableReviews: e.target.checked })} />
                            <span>Enable Product Reviews</span>
                        </label>
                        <label className={styles.toggle}>
                            <input type="checkbox" checked={settings.enableAI} onChange={e => setSettings({ ...settings, enableAI: e.target.checked })} />
                            <span>Enable AI Features (SEO, Content Generation)</span>
                        </label>
                    </div>
                </div>

                {/* Database */}
                <div className={styles.section}>
                    <h2><FiDatabase /> Database</h2>
                    <div className={styles.dbInfo}>
                        <p><strong>Status:</strong> <span className={styles.statusConnected}>Connected</span></p>
                        <p><strong>Type:</strong> MariaDB 11.4</p>
                        <p><strong>Host:</strong> localhost:3306</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
