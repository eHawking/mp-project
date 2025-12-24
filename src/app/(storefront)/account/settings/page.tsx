'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiSettings, FiBell, FiMail, FiGlobe, FiMoon, FiSave, FiCheck } from 'react-icons/fi'
import { useToast } from '@/components/Toast'
import styles from './page.module.css'

export default function SettingsPage() {
    const { data: session, status } = useSession()
    const { showToast } = useToast()
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    const [settings, setSettings] = useState({
        // Notifications
        emailOrderUpdates: true,
        emailPromotions: false,
        emailNewsletter: true,
        pushNotifications: true,

        // Preferences
        language: 'en',
        currency: 'USD',
        darkMode: false,

        // Privacy
        showProfile: true,
        allowReviews: true,
    })

    const handleSave = async () => {
        setSaving(true)
        // Simulate API call
        await new Promise(r => setTimeout(r, 1000))
        setSaving(false)
        setSaved(true)
        showToast('Settings saved!', 'success')
        setTimeout(() => setSaved(false), 3000)
    }

    if (status === 'loading') return <div className={styles.loading}>Loading...</div>
    if (!session) redirect('/login?callbackUrl=/account/settings')

    return (
        <div className={styles.settingsPage}>
            <div className="container">
                <Link href="/account" className={styles.backBtn}>
                    <FiArrowLeft /> Back to Account
                </Link>

                <h1 className={styles.title}><FiSettings /> Account Settings</h1>

                <div className={styles.content}>
                    {/* Email Notifications */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <FiMail />
                            <h2>Email Notifications</h2>
                        </div>
                        <div className={styles.settingsList}>
                            <label className={styles.toggle}>
                                <span>Order updates</span>
                                <input type="checkbox" checked={settings.emailOrderUpdates} onChange={e => setSettings({ ...settings, emailOrderUpdates: e.target.checked })} />
                                <span className={styles.slider}></span>
                            </label>
                            <label className={styles.toggle}>
                                <span>Promotional emails</span>
                                <input type="checkbox" checked={settings.emailPromotions} onChange={e => setSettings({ ...settings, emailPromotions: e.target.checked })} />
                                <span className={styles.slider}></span>
                            </label>
                            <label className={styles.toggle}>
                                <span>Newsletter</span>
                                <input type="checkbox" checked={settings.emailNewsletter} onChange={e => setSettings({ ...settings, emailNewsletter: e.target.checked })} />
                                <span className={styles.slider}></span>
                            </label>
                        </div>
                    </div>

                    {/* Push Notifications */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <FiBell />
                            <h2>Push Notifications</h2>
                        </div>
                        <div className={styles.settingsList}>
                            <label className={styles.toggle}>
                                <span>Enable push notifications</span>
                                <input type="checkbox" checked={settings.pushNotifications} onChange={e => setSettings({ ...settings, pushNotifications: e.target.checked })} />
                                <span className={styles.slider}></span>
                            </label>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <FiGlobe />
                            <h2>Preferences</h2>
                        </div>
                        <div className={styles.settingsGrid}>
                            <div className={styles.formGroup}>
                                <label>Language</label>
                                <select value={settings.language} onChange={e => setSettings({ ...settings, language: e.target.value })}>
                                    <option value="en">English</option>
                                    <option value="ur">Urdu</option>
                                    <option value="ar">Arabic</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Currency</label>
                                <select value={settings.currency} onChange={e => setSettings({ ...settings, currency: e.target.value })}>
                                    <option value="USD">USD ($)</option>
                                    <option value="PKR">PKR (Rs)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.settingsList}>
                            <label className={styles.toggle}>
                                <span><FiMoon /> Dark mode</span>
                                <input type="checkbox" checked={settings.darkMode} onChange={e => setSettings({ ...settings, darkMode: e.target.checked })} />
                                <span className={styles.slider}></span>
                            </label>
                        </div>
                    </div>

                    {/* Privacy */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <FiSettings />
                            <h2>Privacy</h2>
                        </div>
                        <div className={styles.settingsList}>
                            <label className={styles.toggle}>
                                <span>Show profile publicly</span>
                                <input type="checkbox" checked={settings.showProfile} onChange={e => setSettings({ ...settings, showProfile: e.target.checked })} />
                                <span className={styles.slider}></span>
                            </label>
                            <label className={styles.toggle}>
                                <span>Allow reviews on my orders</span>
                                <input type="checkbox" checked={settings.allowReviews} onChange={e => setSettings({ ...settings, allowReviews: e.target.checked })} />
                                <span className={styles.slider}></span>
                            </label>
                        </div>
                    </div>

                    <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : saved ? <><FiCheck /> Saved!</> : <><FiSave /> Save Changes</>}
                    </button>
                </div>
            </div>
        </div>
    )
}
