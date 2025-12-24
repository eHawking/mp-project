'use client'

import { useState, useEffect } from 'react'
import { FiMail, FiSave, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'
import styles from './page.module.css'

interface EmailSettings {
    mailgunApiKey: string
    mailgunDomain: string
    mailgunFromEmail: string
    mailgunFromName: string
}

export default function EmailSettingsPage() {
    const [settings, setSettings] = useState<EmailSettings>({
        mailgunApiKey: '',
        mailgunDomain: '',
        mailgunFromEmail: '',
        mailgunFromName: 'DewDropSkin',
    })
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [testEmail, setTestEmail] = useState('')
    const [testing, setTesting] = useState(false)
    const [testResult, setTestResult] = useState<'success' | 'error' | null>(null)

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings')
            if (res.ok) {
                const data = await res.json()
                setSettings({
                    mailgunApiKey: data.mailgunApiKey || '',
                    mailgunDomain: data.mailgunDomain || '',
                    mailgunFromEmail: data.mailgunFromEmail || '',
                    mailgunFromName: data.mailgunFromName || 'DewDropSkin',
                })
            }
        } catch (error) {
            console.error('Error fetching settings:', error)
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
                setSaved(true)
                setTimeout(() => setSaved(false), 3000)
            }
        } catch (error) {
            console.error('Error saving settings:', error)
        } finally {
            setSaving(false)
        }
    }

    const handleTestEmail = async () => {
        if (!testEmail) return
        setTesting(true)
        setTestResult(null)

        try {
            const res = await fetch('/api/email/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: testEmail }),
            })
            setTestResult(res.ok ? 'success' : 'error')
        } catch (error) {
            setTestResult('error')
        } finally {
            setTesting(false)
        }
    }

    return (
        <div className={styles.emailPage}>
            <div className={styles.header}>
                <h1><FiMail /> Email Settings</h1>
                <p>Configure Mailgun for transactional emails</p>
            </div>

            <div className={styles.content}>
                {/* Mailgun Configuration */}
                <div className={styles.card}>
                    <h2>Mailgun Configuration</h2>
                    <p className={styles.cardDesc}>Enter your Mailgun API credentials to enable email sending.</p>

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label>Mailgun API Key</label>
                            <input
                                type="password"
                                value={settings.mailgunApiKey}
                                onChange={(e) => setSettings({ ...settings, mailgunApiKey: e.target.value })}
                                placeholder="key-xxxxxxxxxxxxxxxx"
                            />
                            <span className={styles.hint}>Found in your Mailgun dashboard under API Keys</span>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Mailgun Domain</label>
                            <input
                                type="text"
                                value={settings.mailgunDomain}
                                onChange={(e) => setSettings({ ...settings, mailgunDomain: e.target.value })}
                                placeholder="mg.yourdomain.com"
                            />
                            <span className={styles.hint}>Your verified sending domain in Mailgun</span>
                        </div>

                        <div className={styles.formGroup}>
                            <label>From Email</label>
                            <input
                                type="email"
                                value={settings.mailgunFromEmail}
                                onChange={(e) => setSettings({ ...settings, mailgunFromEmail: e.target.value })}
                                placeholder="noreply@yourdomain.com"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>From Name</label>
                            <input
                                type="text"
                                value={settings.mailgunFromName}
                                onChange={(e) => setSettings({ ...settings, mailgunFromName: e.target.value })}
                                placeholder="DewDropSkin"
                            />
                        </div>
                    </div>

                    <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : saved ? <><FiCheck /> Saved!</> : <><FiSave /> Save Settings</>}
                    </button>
                </div>

                {/* Test Email */}
                <div className={styles.card}>
                    <h2>Test Email</h2>
                    <p className={styles.cardDesc}>Send a test email to verify your configuration.</p>

                    <div className={styles.testSection}>
                        <input
                            type="email"
                            value={testEmail}
                            onChange={(e) => setTestEmail(e.target.value)}
                            placeholder="Enter email address"
                        />
                        <button onClick={handleTestEmail} disabled={testing || !testEmail}>
                            <FiSend /> {testing ? 'Sending...' : 'Send Test'}
                        </button>
                    </div>

                    {testResult && (
                        <div className={`${styles.testResult} ${styles[testResult]}`}>
                            {testResult === 'success' ? (
                                <><FiCheck /> Test email sent successfully!</>
                            ) : (
                                <><FiAlertCircle /> Failed to send test email. Check your configuration.</>
                            )}
                        </div>
                    )}
                </div>

                {/* Email Templates Info */}
                <div className={styles.card}>
                    <h2>Email Templates</h2>
                    <p className={styles.cardDesc}>Pre-configured email templates for your marketplace.</p>

                    <div className={styles.templateList}>
                        <div className={styles.template}>
                            <div className={styles.templateIcon}>🎉</div>
                            <div className={styles.templateInfo}>
                                <h3>Welcome Email</h3>
                                <p>Sent when a new user registers</p>
                            </div>
                        </div>
                        <div className={styles.template}>
                            <div className={styles.templateIcon}>✅</div>
                            <div className={styles.templateInfo}>
                                <h3>Order Confirmation</h3>
                                <p>Sent when an order is placed</p>
                            </div>
                        </div>
                        <div className={styles.template}>
                            <div className={styles.templateIcon}>📦</div>
                            <div className={styles.templateInfo}>
                                <h3>Shipping Notification</h3>
                                <p>Sent when an order is shipped</p>
                            </div>
                        </div>
                        <div className={styles.template}>
                            <div className={styles.templateIcon}>🔐</div>
                            <div className={styles.templateInfo}>
                                <h3>Password Reset</h3>
                                <p>Sent when user requests password reset</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
