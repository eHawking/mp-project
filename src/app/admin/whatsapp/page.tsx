'use client'

import { useState, useEffect } from 'react'
import { FiMessageCircle, FiCheck, FiX, FiRefreshCw, FiSend, FiSettings, FiUser, FiPhone } from 'react-icons/fi'
import styles from './page.module.css'

interface WhatsAppStatus {
    connected: boolean
    phone?: string
    name?: string
    lastSeen?: string
}

interface AutoReply {
    id: string
    trigger: string
    response: string
    isActive: boolean
}

export default function WhatsAppPage() {
    const [status, setStatus] = useState<WhatsAppStatus>({ connected: false })
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('connection')
    const [qrCode, setQrCode] = useState<string | null>(null)
    const [autoReplies, setAutoReplies] = useState<AutoReply[]>([
        { id: '1', trigger: 'hi', response: 'Hello! 👋 Welcome to DewDropSkin. How can I help you today?', isActive: true },
        { id: '2', trigger: 'order status', response: 'To check your order status, please provide your order number and we\'ll look it up for you.', isActive: true },
        { id: '3', trigger: 'shipping', response: 'We offer free shipping on orders over $50! Standard delivery takes 3-5 business days.', isActive: true },
        { id: '4', trigger: 'return', response: 'We have a 30-day return policy. Items must be unused and in original packaging. Contact us to initiate a return.', isActive: true },
        { id: '5', trigger: 'payment', response: 'We accept Alfa, Easypaisa, JazzCash, bank transfer, and cash on delivery.', isActive: true },
    ])
    const [newTrigger, setNewTrigger] = useState('')
    const [newResponse, setNewResponse] = useState('')
    const [settings, setSettings] = useState({
        welcomeMessage: 'Welcome to DewDropSkin! 🛍️ How can we assist you today?',
        awayMessage: 'Thanks for your message! We\'re currently away but will respond as soon as possible.',
        businessHoursStart: '09:00',
        businessHoursEnd: '18:00',
        autoReplyEnabled: true,
        notifyOnNewMessage: true,
    })

    const generateQR = () => {
        setLoading(true)
        // Simulate QR generation - in production this would connect to WhatsApp Business API or whatsapp-web.js
        setTimeout(() => {
            // Using a placeholder QR code
            setQrCode('https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=whatsapp://connect/dewdropskin-' + Date.now())
            setLoading(false)
        }, 1500)
    }

    const simulateConnection = () => {
        setLoading(true)
        setTimeout(() => {
            setStatus({
                connected: true,
                phone: '+92 300 1234567',
                name: 'DewDropSkin Support',
                lastSeen: 'Just now',
            })
            setQrCode(null)
            setLoading(false)
        }, 2000)
    }

    const disconnect = () => {
        setStatus({ connected: false })
        setQrCode(null)
    }

    const addAutoReply = () => {
        if (!newTrigger.trim() || !newResponse.trim()) return
        setAutoReplies([...autoReplies, {
            id: Date.now().toString(),
            trigger: newTrigger,
            response: newResponse,
            isActive: true,
        }])
        setNewTrigger('')
        setNewResponse('')
    }

    const toggleAutoReply = (id: string) => {
        setAutoReplies(autoReplies.map(ar =>
            ar.id === id ? { ...ar, isActive: !ar.isActive } : ar
        ))
    }

    const deleteAutoReply = (id: string) => {
        setAutoReplies(autoReplies.filter(ar => ar.id !== id))
    }

    return (
        <div className={styles.whatsappPage}>
            <div className={styles.header}>
                <h1><FiMessageCircle /> WhatsApp Integration</h1>
                <p>Connect WhatsApp Business for customer support automation</p>
            </div>

            {/* Status Bar */}
            <div className={`${styles.statusBar} ${status.connected ? styles.connected : ''}`}>
                <div className={styles.statusInfo}>
                    <span className={styles.statusDot}></span>
                    <span>{status.connected ? 'Connected' : 'Disconnected'}</span>
                    {status.connected && status.phone && (
                        <span className={styles.phoneNumber}>({status.phone})</span>
                    )}
                </div>
                {status.connected && (
                    <button className={styles.disconnectBtn} onClick={disconnect}>
                        <FiX /> Disconnect
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
                <button className={`${styles.tab} ${activeTab === 'connection' ? styles.active : ''}`} onClick={() => setActiveTab('connection')}>
                    <FiPhone /> Connection
                </button>
                <button className={`${styles.tab} ${activeTab === 'autoreplies' ? styles.active : ''}`} onClick={() => setActiveTab('autoreplies')}>
                    <FiMessageCircle /> Auto-Replies
                </button>
                <button className={`${styles.tab} ${activeTab === 'settings' ? styles.active : ''}`} onClick={() => setActiveTab('settings')}>
                    <FiSettings /> Settings
                </button>
            </div>

            <div className={styles.content}>
                {/* Connection Tab */}
                {activeTab === 'connection' && (
                    <div className={styles.connectionSection}>
                        {!status.connected ? (
                            <div className={styles.qrSection}>
                                <h2>Scan QR Code to Connect</h2>
                                <p>Open WhatsApp on your phone → Menu → Linked Devices → Link a Device</p>

                                {qrCode ? (
                                    <div className={styles.qrCode}>
                                        <img src={qrCode} alt="WhatsApp QR Code" />
                                        <button className={styles.refreshBtn} onClick={generateQR}>
                                            <FiRefreshCw /> Refresh QR
                                        </button>
                                        {/* Demo button - remove in production */}
                                        <button className={styles.demoBtn} onClick={simulateConnection}>
                                            Simulate Connection (Demo)
                                        </button>
                                    </div>
                                ) : (
                                    <button className={styles.generateBtn} onClick={generateQR} disabled={loading}>
                                        {loading ? 'Generating...' : 'Generate QR Code'}
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className={styles.connectedInfo}>
                                <div className={styles.avatar}>
                                    <FiUser />
                                </div>
                                <h2>{status.name}</h2>
                                <p className={styles.phone}>{status.phone}</p>
                                <p className={styles.lastSeen}>Last seen: {status.lastSeen}</p>
                                <div className={styles.stats}>
                                    <div className={styles.stat}>
                                        <span className={styles.statValue}>156</span>
                                        <span className={styles.statLabel}>Messages Today</span>
                                    </div>
                                    <div className={styles.stat}>
                                        <span className={styles.statValue}>45</span>
                                        <span className={styles.statLabel}>Auto-Replies</span>
                                    </div>
                                    <div className={styles.stat}>
                                        <span className={styles.statValue}>12</span>
                                        <span className={styles.statLabel}>Active Chats</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Auto-Replies Tab */}
                {activeTab === 'autoreplies' && (
                    <div className={styles.autoRepliesSection}>
                        <div className={styles.addReply}>
                            <h3>Add New Auto-Reply</h3>
                            <div className={styles.addForm}>
                                <input
                                    type="text"
                                    placeholder="Trigger word/phrase (e.g., 'hello', 'price')"
                                    value={newTrigger}
                                    onChange={e => setNewTrigger(e.target.value)}
                                />
                                <textarea
                                    placeholder="Response message..."
                                    value={newResponse}
                                    onChange={e => setNewResponse(e.target.value)}
                                />
                                <button onClick={addAutoReply}>
                                    <FiSend /> Add Reply
                                </button>
                            </div>
                        </div>

                        <div className={styles.replyList}>
                            <h3>Active Auto-Replies ({autoReplies.filter(ar => ar.isActive).length})</h3>
                            {autoReplies.map(reply => (
                                <div key={reply.id} className={`${styles.replyItem} ${!reply.isActive ? styles.inactive : ''}`}>
                                    <div className={styles.replyContent}>
                                        <span className={styles.trigger}>"{reply.trigger}"</span>
                                        <p className={styles.response}>{reply.response}</p>
                                    </div>
                                    <div className={styles.replyActions}>
                                        <button
                                            className={`${styles.toggleBtn} ${reply.isActive ? styles.on : ''}`}
                                            onClick={() => toggleAutoReply(reply.id)}
                                        >
                                            {reply.isActive ? <FiCheck /> : <FiX />}
                                        </button>
                                        <button className={styles.deleteBtn} onClick={() => deleteAutoReply(reply.id)}>
                                            <FiX />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className={styles.settingsSection}>
                        <div className={styles.settingGroup}>
                            <label>Welcome Message</label>
                            <textarea
                                value={settings.welcomeMessage}
                                onChange={e => setSettings({ ...settings, welcomeMessage: e.target.value })}
                            />
                        </div>

                        <div className={styles.settingGroup}>
                            <label>Away Message</label>
                            <textarea
                                value={settings.awayMessage}
                                onChange={e => setSettings({ ...settings, awayMessage: e.target.value })}
                            />
                        </div>

                        <div className={styles.settingRow}>
                            <div className={styles.settingGroup}>
                                <label>Business Hours Start</label>
                                <input
                                    type="time"
                                    value={settings.businessHoursStart}
                                    onChange={e => setSettings({ ...settings, businessHoursStart: e.target.value })}
                                />
                            </div>
                            <div className={styles.settingGroup}>
                                <label>Business Hours End</label>
                                <input
                                    type="time"
                                    value={settings.businessHoursEnd}
                                    onChange={e => setSettings({ ...settings, businessHoursEnd: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className={styles.toggleSettings}>
                            <label className={styles.toggleSetting}>
                                <input
                                    type="checkbox"
                                    checked={settings.autoReplyEnabled}
                                    onChange={e => setSettings({ ...settings, autoReplyEnabled: e.target.checked })}
                                />
                                <span>Enable Auto-Replies</span>
                            </label>
                            <label className={styles.toggleSetting}>
                                <input
                                    type="checkbox"
                                    checked={settings.notifyOnNewMessage}
                                    onChange={e => setSettings({ ...settings, notifyOnNewMessage: e.target.checked })}
                                />
                                <span>Notify on New Messages</span>
                            </label>
                        </div>

                        <button className={styles.saveBtn}>Save Settings</button>
                    </div>
                )}
            </div>
        </div>
    )
}
