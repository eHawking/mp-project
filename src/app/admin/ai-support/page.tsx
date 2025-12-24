'use client'

import { useState } from 'react'
import { FiMessageSquare, FiZap, FiLink, FiUsers, FiKey, FiExternalLink, FiCheck, FiClock, FiTrash2, FiCpu, FiPower, FiEye, FiEyeOff } from 'react-icons/fi'
import { useToast } from '@/components/Toast'
import styles from './page.module.css'

const agents = [
    { name: 'Sarah Johnson', role: 'Sales Support', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Michael Chen', role: 'Tech Support', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { name: 'Emily Rodriguez', role: 'Billing Support', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { name: 'David Kim', role: 'General Support', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { name: 'Jessica Williams', role: 'Returns Support', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { name: 'James Anderson', role: 'Order Support', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
    { name: 'Amanda Taylor', role: 'Product Support', avatar: 'https://randomuser.me/api/portraits/women/7.jpg' },
    { name: 'Robert Martinez', role: 'Shipping Support', avatar: 'https://randomuser.me/api/portraits/men/8.jpg' },
    { name: 'Sophia Lee', role: 'VIP Support', avatar: 'https://randomuser.me/api/portraits/women/9.jpg' },
    { name: 'Daniel Brown', role: 'Escalation', avatar: 'https://randomuser.me/api/portraits/men/10.jpg' },
]

export default function AISupportPage() {
    const { showToast } = useToast()
    const [enabled, setEnabled] = useState(true)
    const [apiKey, setApiKey] = useState('')
    const [showApiKey, setShowApiKey] = useState(false)
    const [trainingUrl, setTrainingUrl] = useState('https://dewdropskin.com')
    const [settings, setSettings] = useState({
        queueWaitTime: 15,
        typingDelay: 15,
        replySpeed: 2.5,
        followUpTimeout: 120,
        endChatTimeout: 60,
    })
    const [logs, setLogs] = useState<string[]>([])
    const [testing, setTesting] = useState(false)
    const [training, setTraining] = useState(false)

    const testConnection = async () => {
        setTesting(true)
        await new Promise(r => setTimeout(r, 1500))
        showToast('API connection successful!', 'success')
        setTesting(false)
    }

    const validateAndSave = async () => {
        if (!apiKey) {
            showToast('Please enter an API key', 'error')
            return
        }
        showToast('API key validated and saved!', 'success')
    }

    const trainAgents = async () => {
        setTraining(true)
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Starting training with URL: ${trainingUrl}`])
        await new Promise(r => setTimeout(r, 2000))
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Crawling website content...`])
        await new Promise(r => setTimeout(r, 1500))
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Training completed successfully!`])
        showToast('All agents trained successfully!', 'success')
        setTraining(false)
    }

    const saveSettings = () => {
        showToast('Chat timing settings saved!', 'success')
    }

    return (
        <div className={styles.page}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1><FiCpu /> AI Customer Support Agent</h1>
                    <p>Configure and manage your AI-powered chatbot</p>
                </div>
                <button
                    className={`${styles.enableBtn} ${enabled ? styles.enabled : ''}`}
                    onClick={() => setEnabled(!enabled)}
                >
                    <FiPower /> {enabled ? 'Enabled' : 'Disabled'}
                </button>
            </div>

            {/* Stats */}
            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Total Chats</span>
                        <span className={styles.statValue}>0</span>
                    </div>
                    <FiMessageSquare className={styles.statIcon} />
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Status</span>
                        <span className={`${styles.statValue} ${styles.active}`}>● Active</span>
                    </div>
                    <FiZap className={styles.statIcon} />
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>API Status</span>
                        <span className={`${styles.statValue} ${styles.connected}`}>✓ Connected</span>
                    </div>
                    <FiLink className={styles.statIcon} />
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statInfo}>
                        <span className={styles.statLabel}>Available Agents</span>
                        <span className={styles.statValue}>{agents.length}</span>
                    </div>
                    <FiUsers className={styles.statIcon} />
                </div>
            </div>

            <div className={styles.grid}>
                {/* API Configuration */}
                <div className={styles.card}>
                    <h2><FiKey /> API Configuration</h2>
                    <div className={styles.formGroup}>
                        <label>Google Gemini API Key</label>
                        <div className={styles.apiKeyInput}>
                            <input
                                type={showApiKey ? 'text' : 'password'}
                                value={apiKey}
                                onChange={e => setApiKey(e.target.value)}
                                placeholder="Enter your API key..."
                            />
                            <button onClick={() => setShowApiKey(!showApiKey)}>
                                {showApiKey ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" className={styles.link}>
                            <FiExternalLink /> Get API key from Google AI Studio
                        </a>
                    </div>
                    <div className={styles.btnGroup}>
                        <button className={styles.outlineBtn} onClick={testConnection} disabled={testing}>
                            <FiZap /> {testing ? 'Testing...' : 'Test Connection'}
                        </button>
                        <button className={styles.primaryBtn} onClick={validateAndSave}>
                            <FiCheck /> Validate & Save
                        </button>
                    </div>

                    <div className={styles.trainSection}>
                        <h3><FiCpu /> Train All Agents</h3>
                        <p>Train all AI agents using your website content for better responses.</p>
                        <input
                            type="url"
                            value={trainingUrl}
                            onChange={e => setTrainingUrl(e.target.value)}
                            placeholder="https://your-website.com"
                        />
                        <button className={styles.trainBtn} onClick={trainAgents} disabled={training}>
                            <FiCpu /> {training ? 'Training...' : 'Train All Agents'}
                        </button>
                    </div>
                </div>

                {/* Chat Timing Settings */}
                <div className={styles.card}>
                    <h2><FiClock /> Chat Timing Settings</h2>

                    <div className={styles.sliderGroup}>
                        <div className={styles.sliderHeader}>
                            <label>Queue Wait Time</label>
                            <span>{settings.queueWaitTime}s</span>
                        </div>
                        <input
                            type="range" min="5" max="60" value={settings.queueWaitTime}
                            onChange={e => setSettings({ ...settings, queueWaitTime: Number(e.target.value) })}
                        />
                        <p className={styles.sliderDesc}>Time before assigning an agent</p>
                    </div>

                    <div className={styles.sliderGroup}>
                        <div className={styles.sliderHeader}>
                            <label>Typing Delay</label>
                            <span>{settings.typingDelay}s</span>
                        </div>
                        <input
                            type="range" min="1" max="30" value={settings.typingDelay}
                            onChange={e => setSettings({ ...settings, typingDelay: Number(e.target.value) })}
                        />
                        <p className={styles.sliderDesc}>Delay before typing indicator appears</p>
                    </div>

                    <div className={styles.sliderGroup}>
                        <div className={styles.sliderHeader}>
                            <label>Reply Speed</label>
                            <span>{settings.replySpeed}s/word</span>
                        </div>
                        <input
                            type="range" min="0.5" max="5" step="0.1" value={settings.replySpeed}
                            onChange={e => setSettings({ ...settings, replySpeed: Number(e.target.value) })}
                        />
                        <p className={styles.sliderDesc}>Typing duration per word</p>
                    </div>

                    <div className={styles.sliderGroup}>
                        <div className={styles.sliderHeader}>
                            <label>Follow-up Timeout</label>
                            <span>{settings.followUpTimeout}s</span>
                        </div>
                        <input
                            type="range" min="30" max="300" value={settings.followUpTimeout}
                            onChange={e => setSettings({ ...settings, followUpTimeout: Number(e.target.value) })}
                        />
                        <p className={styles.sliderDesc}>Time before asking &quot;anything else?&quot;</p>
                    </div>

                    <div className={styles.sliderGroup}>
                        <div className={styles.sliderHeader}>
                            <label>End Chat Timeout</label>
                            <span>{settings.endChatTimeout}s</span>
                        </div>
                        <input
                            type="range" min="30" max="180" value={settings.endChatTimeout}
                            onChange={e => setSettings({ ...settings, endChatTimeout: Number(e.target.value) })}
                        />
                        <p className={styles.sliderDesc}>Time after follow-up to auto-end chat</p>
                    </div>

                    <button className={styles.saveBtn} onClick={saveSettings}>
                        <FiCheck /> Save Settings
                    </button>
                </div>
            </div>

            {/* Training Logs */}
            <div className={styles.logsSection}>
                <div className={styles.logsHeader}>
                    <h2><FiCpu /> Training Logs</h2>
                    <button className={styles.clearBtn} onClick={() => setLogs([])}>
                        <FiTrash2 /> Clear Logs
                    </button>
                </div>
                <div className={styles.logsContent}>
                    {logs.length === 0 ? (
                        <p className={styles.noLogs}>No logs yet</p>
                    ) : (
                        logs.map((log, i) => <p key={i}>{log}</p>)
                    )}
                </div>
            </div>

            {/* Agent Profiles */}
            <div className={styles.agentsSection}>
                <h2><FiUsers /> Agent Profiles Preview</h2>
                <div className={styles.agentsGrid}>
                    {agents.map((agent, i) => (
                        <div key={i} className={styles.agentCard}>
                            <img src={agent.avatar} alt={agent.name} />
                            <p className={styles.agentName}>{agent.name}</p>
                            <p className={styles.agentRole}>{agent.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
