'use client'

import { useState, useEffect } from 'react'
import { FiImage, FiSave, FiUpload, FiTrash2, FiLayout, FiGrid, FiLink, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { useToast } from '@/components/Toast'
import styles from './page.module.css'

const defaultSettings = {
    // Logos
    logoLight: '',
    logoDark: '',
    favicon: '',
    siteName: 'MP Marketplace',

    // Header
    headerShowSearch: true,
    headerShowCart: true,
    headerShowWishlist: true,
    headerShowAccount: true,
    headerNavLinks: JSON.stringify([
        { label: 'Home', url: '/' },
        { label: 'Products', url: '/products' },
        { label: 'Deals', url: '/deals' },
        { label: 'Stores', url: '/stores' },
    ]),

    // Footer
    footerAboutText: 'Your one-stop destination for quality products from verified sellers. Shop with confidence and enjoy the best deals online.',
    footerPhone: '+1 (555) 123-4567',
    footerEmail: 'support@mpmarketplace.com',
    footerAddress: '123 Market Street, NY 10001',
    footerCopyright: '© 2024 MP Marketplace. All rights reserved.',
    footerShowNewsletter: true,
    footerSocialFacebook: '',
    footerSocialTwitter: '',
    footerSocialInstagram: '',
    footerSocialYoutube: '',
}

export default function AppearancePage() {
    const { showToast } = useToast()
    const [settings, setSettings] = useState(defaultSettings)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [navLinks, setNavLinks] = useState<{ label: string, url: string }[]>([])

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings')
            if (res.ok) {
                const data = await res.json()
                const merged = { ...defaultSettings }
                Object.keys(data).forEach(key => {
                    if (key in merged) {
                        (merged as any)[key] = data[key]
                    }
                })
                setSettings(merged)
                try {
                    setNavLinks(JSON.parse(merged.headerNavLinks))
                } catch {
                    setNavLinks([{ label: 'Home', url: '/' }])
                }
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
            const dataToSave = {
                ...settings,
                headerNavLinks: JSON.stringify(navLinks),
            }
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSave),
            })
            if (res.ok) {
                showToast('Settings saved successfully!', 'success')
            } else {
                showToast('Failed to save settings', 'error')
            }
        } catch {
            showToast('Failed to save settings', 'error')
        } finally {
            setSaving(false)
        }
    }

    const addNavLink = () => {
        setNavLinks([...navLinks, { label: '', url: '' }])
    }

    const updateNavLink = (index: number, field: string, value: string) => {
        const updated = [...navLinks]
        updated[index] = { ...updated[index], [field]: value }
        setNavLinks(updated)
    }

    const removeNavLink = (index: number) => {
        setNavLinks(navLinks.filter((_, i) => i !== index))
    }

    if (loading) {
        return <div className={styles.loading}>Loading settings...</div>
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1><FiLayout /> Site Appearance</h1>
                    <p>Customize logos, header, and footer settings</p>
                </div>
                <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                    <FiSave /> {saving ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>

            {/* Logo & Branding */}
            <div className={styles.section}>
                <h2><FiImage /> Logo & Branding</h2>
                <div className={styles.logoGrid}>
                    <div className={styles.logoCard}>
                        <label>Logo (Light Mode)</label>
                        <div className={styles.logoPreview}>
                            {settings.logoLight ? (
                                <img src={settings.logoLight} alt="Light Logo" />
                            ) : (
                                <div className={styles.placeholder}><FiUpload /> Upload Logo</div>
                            )}
                        </div>
                        <input
                            type="url"
                            placeholder="Enter logo URL..."
                            value={settings.logoLight}
                            onChange={e => setSettings({ ...settings, logoLight: e.target.value })}
                        />
                        <p className={styles.hint}>Recommended: PNG with transparent background, 200x50px</p>
                    </div>

                    <div className={styles.logoCard}>
                        <label>Logo (Dark Mode)</label>
                        <div className={styles.logoPreview}>
                            {settings.logoDark ? (
                                <img src={settings.logoDark} alt="Dark Logo" />
                            ) : (
                                <div className={styles.placeholder}><FiUpload /> Upload Logo</div>
                            )}
                        </div>
                        <input
                            type="url"
                            placeholder="Enter logo URL..."
                            value={settings.logoDark}
                            onChange={e => setSettings({ ...settings, logoDark: e.target.value })}
                        />
                        <p className={styles.hint}>Use a lighter version for dark backgrounds</p>
                    </div>

                    <div className={styles.logoCard}>
                        <label>Favicon</label>
                        <div className={styles.faviconPreview}>
                            {settings.favicon ? (
                                <img src={settings.favicon} alt="Favicon" />
                            ) : (
                                <div className={styles.placeholder}><FiUpload /></div>
                            )}
                        </div>
                        <input
                            type="url"
                            placeholder="Enter favicon URL..."
                            value={settings.favicon}
                            onChange={e => setSettings({ ...settings, favicon: e.target.value })}
                        />
                        <p className={styles.hint}>32x32px PNG or ICO format</p>
                    </div>

                    <div className={styles.logoCard}>
                        <label>Site Name (Fallback)</label>
                        <input
                            type="text"
                            placeholder="Site Name"
                            value={settings.siteName}
                            onChange={e => setSettings({ ...settings, siteName: e.target.value })}
                            className={styles.siteNameInput}
                        />
                        <p className={styles.hint}>Shown when logo is not set</p>
                    </div>
                </div>
            </div>

            {/* Header Settings */}
            <div className={styles.section}>
                <h2><FiGrid /> Header Settings</h2>
                <div className={styles.toggleGrid}>
                    <label className={styles.toggle}>
                        <input type="checkbox" checked={settings.headerShowSearch} onChange={e => setSettings({ ...settings, headerShowSearch: e.target.checked })} />
                        <span>Show Search Bar</span>
                    </label>
                    <label className={styles.toggle}>
                        <input type="checkbox" checked={settings.headerShowCart} onChange={e => setSettings({ ...settings, headerShowCart: e.target.checked })} />
                        <span>Show Cart Icon</span>
                    </label>
                    <label className={styles.toggle}>
                        <input type="checkbox" checked={settings.headerShowWishlist} onChange={e => setSettings({ ...settings, headerShowWishlist: e.target.checked })} />
                        <span>Show Wishlist Icon</span>
                    </label>
                    <label className={styles.toggle}>
                        <input type="checkbox" checked={settings.headerShowAccount} onChange={e => setSettings({ ...settings, headerShowAccount: e.target.checked })} />
                        <span>Show Account Icon</span>
                    </label>
                </div>

                <div className={styles.navLinksSection}>
                    <div className={styles.navLinksHeader}>
                        <h3><FiLink /> Navigation Links</h3>
                        <button onClick={addNavLink} className={styles.addBtn}>+ Add Link</button>
                    </div>
                    <div className={styles.navLinksList}>
                        {navLinks.map((link, i) => (
                            <div key={i} className={styles.navLinkRow}>
                                <input
                                    type="text"
                                    placeholder="Label"
                                    value={link.label}
                                    onChange={e => updateNavLink(i, 'label', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="URL (e.g., /products)"
                                    value={link.url}
                                    onChange={e => updateNavLink(i, 'url', e.target.value)}
                                />
                                <button onClick={() => removeNavLink(i)} className={styles.removeBtn}><FiTrash2 /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Settings */}
            <div className={styles.section}>
                <h2><FiLayout /> Footer Settings</h2>

                <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                        <label><FiMapPin /> Business Address</label>
                        <input
                            type="text"
                            value={settings.footerAddress}
                            onChange={e => setSettings({ ...settings, footerAddress: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label><FiPhone /> Phone Number</label>
                        <input
                            type="text"
                            value={settings.footerPhone}
                            onChange={e => setSettings({ ...settings, footerPhone: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label><FiMail /> Support Email</label>
                        <input
                            type="email"
                            value={settings.footerEmail}
                            onChange={e => setSettings({ ...settings, footerEmail: e.target.value })}
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>About Text</label>
                    <textarea
                        rows={3}
                        value={settings.footerAboutText}
                        onChange={e => setSettings({ ...settings, footerAboutText: e.target.value })}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Copyright Text</label>
                    <input
                        type="text"
                        value={settings.footerCopyright}
                        onChange={e => setSettings({ ...settings, footerCopyright: e.target.value })}
                    />
                </div>

                <label className={styles.toggle}>
                    <input type="checkbox" checked={settings.footerShowNewsletter} onChange={e => setSettings({ ...settings, footerShowNewsletter: e.target.checked })} />
                    <span>Show Newsletter Signup</span>
                </label>

                <h3 className={styles.subheading}>Social Media Links</h3>
                <div className={styles.socialGrid}>
                    <div className={styles.formGroup}>
                        <label>Facebook URL</label>
                        <input type="url" placeholder="https://facebook.com/..." value={settings.footerSocialFacebook} onChange={e => setSettings({ ...settings, footerSocialFacebook: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Twitter/X URL</label>
                        <input type="url" placeholder="https://twitter.com/..." value={settings.footerSocialTwitter} onChange={e => setSettings({ ...settings, footerSocialTwitter: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Instagram URL</label>
                        <input type="url" placeholder="https://instagram.com/..." value={settings.footerSocialInstagram} onChange={e => setSettings({ ...settings, footerSocialInstagram: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>YouTube URL</label>
                        <input type="url" placeholder="https://youtube.com/..." value={settings.footerSocialYoutube} onChange={e => setSettings({ ...settings, footerSocialYoutube: e.target.value })} />
                    </div>
                </div>
            </div>
        </div>
    )
}
