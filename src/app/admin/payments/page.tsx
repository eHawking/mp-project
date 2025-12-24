'use client'

import { useState, useEffect } from 'react'
import { FiCreditCard, FiSave, FiCheck, FiToggleLeft, FiToggleRight } from 'react-icons/fi'
import styles from './page.module.css'

interface PaymentSettings {
    // Alfa
    alfaEnabled: boolean
    alfaMerchantId: string
    alfaStoreId: string
    alfaMerchantHash: string
    alfaKey1: string
    alfaKey2: string

    // Easypaisa
    easypaisaEnabled: boolean
    easypaisaStoreId: string
    easypaisaStorePassword: string
    easypaisaMerchantId: string

    // JazzCash
    jazzcashEnabled: boolean
    jazzcashMerchantId: string
    jazzcashPassword: string
    jazzcashIntegritySalt: string

    // Stripe
    stripeEnabled: boolean
    stripePublicKey: string
    stripeSecretKey: string

    // Bank Transfer
    bankTransferEnabled: boolean
    bankName: string
    bankAccountTitle: string
    bankAccountNumber: string
    bankIban: string
    bankBranchCode: string

    // Cash on Delivery
    codEnabled: boolean

    // Digital Wallet
    walletEnabled: boolean
}

const defaultSettings: PaymentSettings = {
    alfaEnabled: false, alfaMerchantId: '', alfaStoreId: '', alfaMerchantHash: '', alfaKey1: '', alfaKey2: '',
    easypaisaEnabled: false, easypaisaStoreId: '', easypaisaStorePassword: '', easypaisaMerchantId: '',
    jazzcashEnabled: false, jazzcashMerchantId: '', jazzcashPassword: '', jazzcashIntegritySalt: '',
    stripeEnabled: false, stripePublicKey: '', stripeSecretKey: '',
    bankTransferEnabled: false, bankName: '', bankAccountTitle: '', bankAccountNumber: '', bankIban: '', bankBranchCode: '',
    codEnabled: true,
    walletEnabled: false,
}

export default function PaymentSettingsPage() {
    const [settings, setSettings] = useState<PaymentSettings>(defaultSettings)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [activeTab, setActiveTab] = useState('alfa')

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings')
            if (res.ok) {
                const data = await res.json()
                setSettings({
                    alfaEnabled: data.alfaEnabled === 'true',
                    alfaMerchantId: data.alfaMerchantId || '',
                    alfaStoreId: data.alfaStoreId || '',
                    alfaMerchantHash: data.alfaMerchantHash || '',
                    alfaKey1: data.alfaKey1 || '',
                    alfaKey2: data.alfaKey2 || '',
                    easypaisaEnabled: data.easypaisaEnabled === 'true',
                    easypaisaStoreId: data.easypaisaStoreId || '',
                    easypaisaStorePassword: data.easypaisaStorePassword || '',
                    easypaisaMerchantId: data.easypaisaMerchantId || '',
                    jazzcashEnabled: data.jazzcashEnabled === 'true',
                    jazzcashMerchantId: data.jazzcashMerchantId || '',
                    jazzcashPassword: data.jazzcashPassword || '',
                    jazzcashIntegritySalt: data.jazzcashIntegritySalt || '',
                    stripeEnabled: data.stripeEnabled === 'true',
                    stripePublicKey: data.stripePublicKey || '',
                    stripeSecretKey: data.stripeSecretKey || '',
                    bankTransferEnabled: data.bankTransferEnabled === 'true',
                    bankName: data.bankName || '',
                    bankAccountTitle: data.bankAccountTitle || '',
                    bankAccountNumber: data.bankAccountNumber || '',
                    bankIban: data.bankIban || '',
                    bankBranchCode: data.bankBranchCode || '',
                    codEnabled: data.codEnabled !== 'false',
                    walletEnabled: data.walletEnabled === 'true',
                })
            }
        } catch (error) {
            console.error('Error fetching settings:', error)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const saveData: Record<string, string> = {}
            Object.entries(settings).forEach(([key, value]) => {
                saveData[key] = typeof value === 'boolean' ? value.toString() : value
            })

            await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saveData),
            })
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        } catch (error) {
            console.error('Error saving settings:', error)
        } finally {
            setSaving(false)
        }
    }

    const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
        <button className={`${styles.toggle} ${enabled ? styles.on : ''}`} onClick={onToggle}>
            {enabled ? <FiToggleRight /> : <FiToggleLeft />}
            <span>{enabled ? 'Enabled' : 'Disabled'}</span>
        </button>
    )

    const tabs = [
        { id: 'alfa', name: 'Alfa', icon: '🏦' },
        { id: 'easypaisa', name: 'Easypaisa', icon: '📱' },
        { id: 'jazzcash', name: 'JazzCash', icon: '📲' },
        { id: 'stripe', name: 'Stripe', icon: '💳' },
        { id: 'bank', name: 'Bank Transfer', icon: '🏛️' },
        { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
        { id: 'wallet', name: 'Digital Wallet', icon: '👛' },
    ]

    return (
        <div className={styles.paymentPage}>
            <div className={styles.header}>
                <h1><FiCreditCard /> Payment Settings</h1>
                <p>Configure payment gateways for your marketplace</p>
            </div>

            <div className={styles.content}>
                {/* Tabs */}
                <div className={styles.tabs}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span>{tab.icon}</span> {tab.name}
                        </button>
                    ))}
                </div>

                {/* Alfa */}
                {activeTab === 'alfa' && (
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>🏦 Alfa Payment Gateway</h2>
                            <Toggle enabled={settings.alfaEnabled} onToggle={() => setSettings({ ...settings, alfaEnabled: !settings.alfaEnabled })} />
                        </div>
                        <p className={styles.cardDesc}>Accept payments via Bank Alfalah - supports cards, mobile wallets, and bank accounts.</p>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Merchant ID</label>
                                <input type="text" value={settings.alfaMerchantId} onChange={e => setSettings({ ...settings, alfaMerchantId: e.target.value })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Store ID</label>
                                <input type="text" value={settings.alfaStoreId} onChange={e => setSettings({ ...settings, alfaStoreId: e.target.value })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Merchant Hash</label>
                                <input type="password" value={settings.alfaMerchantHash} onChange={e => setSettings({ ...settings, alfaMerchantHash: e.target.value })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Key 1</label>
                                <input type="password" value={settings.alfaKey1} onChange={e => setSettings({ ...settings, alfaKey1: e.target.value })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Key 2</label>
                                <input type="password" value={settings.alfaKey2} onChange={e => setSettings({ ...settings, alfaKey2: e.target.value })} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Easypaisa */}
                {activeTab === 'easypaisa' && (
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>📱 Easypaisa</h2>
                            <Toggle enabled={settings.easypaisaEnabled} onToggle={() => setSettings({ ...settings, easypaisaEnabled: !settings.easypaisaEnabled })} />
                        </div>
                        <p className={styles.cardDesc}>Accept payments via Easypaisa mobile wallet - popular in Pakistan.</p>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Store ID</label>
                                <input type="text" value={settings.easypaisaStoreId} onChange={e => setSettings({ ...settings, easypaisaStoreId: e.target.value })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Merchant ID</label>
                                <input type="text" value={settings.easypaisaMerchantId} onChange={e => setSettings({ ...settings, easypaisaMerchantId: e.target.value })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Store Password</label>
                                <input type="password" value={settings.easypaisaStorePassword} onChange={e => setSettings({ ...settings, easypaisaStorePassword: e.target.value })} />
                            </div>
                        </div>
                    </div>
                )}

                {/* JazzCash */}
                {activeTab === 'jazzcash' && (
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>📲 JazzCash</h2>
                            <Toggle enabled={settings.jazzcashEnabled} onToggle={() => setSettings({ ...settings, jazzcashEnabled: !settings.jazzcashEnabled })} />
                        </div>
                        <p className={styles.cardDesc}>Accept payments via JazzCash mobile wallet.</p>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Merchant ID</label>
                                <input type="text" value={settings.jazzcashMerchantId} onChange={e => setSettings({ ...settings, jazzcashMerchantId: e.target.value })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Password</label>
                                <input type="password" value={settings.jazzcashPassword} onChange={e => setSettings({ ...settings, jazzcashPassword: e.target.value })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Integrity Salt</label>
                                <input type="password" value={settings.jazzcashIntegritySalt} onChange={e => setSettings({ ...settings, jazzcashIntegritySalt: e.target.value })} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Stripe */}
                {activeTab === 'stripe' && (
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>💳 Stripe (International)</h2>
                            <Toggle enabled={settings.stripeEnabled} onToggle={() => setSettings({ ...settings, stripeEnabled: !settings.stripeEnabled })} />
                        </div>
                        <p className={styles.cardDesc}>Accept international credit/debit cards via Stripe.</p>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Publishable Key</label>
                                <input type="text" value={settings.stripePublicKey} onChange={e => setSettings({ ...settings, stripePublicKey: e.target.value })} placeholder="pk_..." />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Secret Key</label>
                                <input type="password" value={settings.stripeSecretKey} onChange={e => setSettings({ ...settings, stripeSecretKey: e.target.value })} placeholder="sk_..." />
                            </div>
                        </div>
                    </div>
                )}

                {/* Bank Transfer */}
                {activeTab === 'bank' && (
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>🏛️ Bank Transfer</h2>
                            <Toggle enabled={settings.bankTransferEnabled} onToggle={() => setSettings({ ...settings, bankTransferEnabled: !settings.bankTransferEnabled })} />
                        </div>
                        <p className={styles.cardDesc}>Allow customers to pay via direct bank transfer. Details will be shown at checkout.</p>
                        <div className={styles.formGrid}>
                            <div className={styles.formGroup}>
                                <label>Bank Name</label>
                                <input type="text" value={settings.bankName} onChange={e => setSettings({ ...settings, bankName: e.target.value })} placeholder="e.g., Bank Alfalah" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Account Title</label>
                                <input type="text" value={settings.bankAccountTitle} onChange={e => setSettings({ ...settings, bankAccountTitle: e.target.value })} placeholder="e.g., DewDropSkin Pvt Ltd" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Account Number</label>
                                <input type="text" value={settings.bankAccountNumber} onChange={e => setSettings({ ...settings, bankAccountNumber: e.target.value })} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>IBAN</label>
                                <input type="text" value={settings.bankIban} onChange={e => setSettings({ ...settings, bankIban: e.target.value })} placeholder="PK..." />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Branch Code</label>
                                <input type="text" value={settings.bankBranchCode} onChange={e => setSettings({ ...settings, bankBranchCode: e.target.value })} />
                            </div>
                        </div>
                    </div>
                )}

                {/* COD */}
                {activeTab === 'cod' && (
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>💵 Cash on Delivery</h2>
                            <Toggle enabled={settings.codEnabled} onToggle={() => setSettings({ ...settings, codEnabled: !settings.codEnabled })} />
                        </div>
                        <p className={styles.cardDesc}>Allow customers to pay in cash when their order is delivered.</p>
                    </div>
                )}

                {/* Digital Wallet */}
                {activeTab === 'wallet' && (
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>👛 Digital Wallet</h2>
                            <Toggle enabled={settings.walletEnabled} onToggle={() => setSettings({ ...settings, walletEnabled: !settings.walletEnabled })} />
                        </div>
                        <p className={styles.cardDesc}>Enable store wallet for customers. They can add funds and pay from wallet balance.</p>
                        <div className={styles.walletFeatures}>
                            <div className={styles.feature}>✅ Customers can add money to wallet</div>
                            <div className={styles.feature}>✅ Quick checkout with wallet balance</div>
                            <div className={styles.feature}>✅ Refunds credited to wallet</div>
                            <div className={styles.feature}>✅ Cashback & rewards credited to wallet</div>
                        </div>
                    </div>
                )}

                <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : saved ? <><FiCheck /> Saved!</> : <><FiSave /> Save All Settings</>}
                </button>
            </div>
        </div>
    )
}
