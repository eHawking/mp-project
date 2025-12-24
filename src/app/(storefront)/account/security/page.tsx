'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FiShield, FiArrowLeft, FiSmartphone, FiCheck, FiX, FiCopy, FiEye, FiEyeOff } from 'react-icons/fi'
import { useToast } from '@/components/Toast'
import styles from './page.module.css'

export default function SecurityPage() {
    const { data: session, status } = useSession()
    const { showToast } = useToast()
    const [is2FAEnabled, setIs2FAEnabled] = useState(false)
    const [showSetup, setShowSetup] = useState(false)
    const [qrCodeUrl, setQrCodeUrl] = useState('')
    const [secret, setSecret] = useState('')
    const [backupCodes, setBackupCodes] = useState<string[]>([])
    const [verificationCode, setVerificationCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [showBackupCodes, setShowBackupCodes] = useState(false)

    useEffect(() => {
        fetch2FAStatus()
    }, [])

    const fetch2FAStatus = async () => {
        try {
            const res = await fetch('/api/auth/2fa')
            if (res.ok) {
                const data = await res.json()
                setIs2FAEnabled(data.enabled)
            }
        } catch (error) {
            console.error('Error fetching 2FA status:', error)
        }
    }

    const startSetup = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/auth/2fa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'setup' }),
            })
            const data = await res.json()
            if (data.qrCodeUrl) {
                setQrCodeUrl(data.qrCodeUrl)
                setSecret(data.secret)
                setBackupCodes(data.backupCodes || [])
                setShowSetup(true)
            }
        } catch (error) {
            showToast('Failed to start 2FA setup', 'error')
        } finally {
            setLoading(false)
        }
    }

    const verifyAndEnable = async () => {
        if (verificationCode.length !== 6) {
            showToast('Please enter a 6-digit code', 'error')
            return
        }
        setLoading(true)
        try {
            const res = await fetch('/api/auth/2fa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'verify', code: verificationCode }),
            })
            if (res.ok) {
                const data = await res.json()
                setIs2FAEnabled(true)
                setShowSetup(false)
                setBackupCodes(data.backupCodes || [])
                setShowBackupCodes(true)
                showToast('2FA enabled successfully! 🎉', 'success')
            } else {
                showToast('Invalid verification code', 'error')
            }
        } catch (error) {
            showToast('Failed to enable 2FA', 'error')
        } finally {
            setLoading(false)
        }
    }

    const disable2FA = async () => {
        const code = prompt('Enter your 2FA code to disable:')
        if (!code) return

        setLoading(true)
        try {
            const res = await fetch('/api/auth/2fa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'disable', code }),
            })
            if (res.ok) {
                setIs2FAEnabled(false)
                showToast('2FA disabled', 'success')
            } else {
                showToast('Invalid code', 'error')
            }
        } catch (error) {
            showToast('Failed to disable 2FA', 'error')
        } finally {
            setLoading(false)
        }
    }

    const copySecret = () => {
        navigator.clipboard.writeText(secret)
        showToast('Secret copied!', 'success')
    }

    if (status === 'loading') return <div className={styles.loading}>Loading...</div>
    if (!session) redirect('/login?callbackUrl=/account/security')

    return (
        <div className={styles.securityPage}>
            <div className="container">
                <Link href="/account" className={styles.backBtn}>
                    <FiArrowLeft /> Back to Account
                </Link>

                <h1 className={styles.title}><FiShield /> Security Settings</h1>

                <div className={styles.content}>
                    {/* 2FA Section */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div>
                                <h2><FiSmartphone /> Two-Factor Authentication</h2>
                                <p>Add an extra layer of security to your account</p>
                            </div>
                            <span className={`${styles.badge} ${is2FAEnabled ? styles.enabled : styles.disabled}`}>
                                {is2FAEnabled ? <><FiCheck /> Enabled</> : <><FiX /> Disabled</>}
                            </span>
                        </div>

                        {!showSetup && !showBackupCodes && (
                            <div className={styles.cardBody}>
                                {is2FAEnabled ? (
                                    <div className={styles.enabledInfo}>
                                        <p>Your account is protected with 2FA. You'll need your authenticator app to sign in.</p>
                                        <button className={styles.disableBtn} onClick={disable2FA} disabled={loading}>
                                            Disable 2FA
                                        </button>
                                    </div>
                                ) : (
                                    <div className={styles.setupPrompt}>
                                        <p>Protect your account by requiring a 6-digit code from your authenticator app when signing in.</p>
                                        <button className={styles.enableBtn} onClick={startSetup} disabled={loading}>
                                            {loading ? 'Setting up...' : 'Enable 2FA'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {showSetup && (
                            <div className={styles.setupSection}>
                                <div className={styles.step}>
                                    <span className={styles.stepNumber}>1</span>
                                    <div>
                                        <h3>Scan QR Code</h3>
                                        <p>Open your authenticator app (Google Authenticator, Authy, etc.) and scan this QR code:</p>
                                        <div className={styles.qrCode}>
                                            <img src={qrCodeUrl} alt="2FA QR Code" />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.step}>
                                    <span className={styles.stepNumber}>2</span>
                                    <div>
                                        <h3>Or Enter Manually</h3>
                                        <p>Can't scan? Enter this secret key manually:</p>
                                        <div className={styles.secretKey}>
                                            <code>{secret}</code>
                                            <button onClick={copySecret}><FiCopy /></button>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.step}>
                                    <span className={styles.stepNumber}>3</span>
                                    <div>
                                        <h3>Verify Code</h3>
                                        <p>Enter the 6-digit code from your app:</p>
                                        <div className={styles.verifyInput}>
                                            <input
                                                type="text"
                                                maxLength={6}
                                                value={verificationCode}
                                                onChange={e => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                                                placeholder="000000"
                                            />
                                            <button onClick={verifyAndEnable} disabled={loading || verificationCode.length !== 6}>
                                                {loading ? 'Verifying...' : 'Verify & Enable'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button className={styles.cancelBtn} onClick={() => setShowSetup(false)}>
                                    Cancel
                                </button>
                            </div>
                        )}

                        {showBackupCodes && backupCodes.length > 0 && (
                            <div className={styles.backupSection}>
                                <h3>🔐 Backup Codes</h3>
                                <p>Save these backup codes in a safe place. You can use them to access your account if you lose your authenticator.</p>
                                <div className={styles.backupCodes}>
                                    {backupCodes.map((code, i) => (
                                        <code key={i}>{code}</code>
                                    ))}
                                </div>
                                <button className={styles.doneBtn} onClick={() => setShowBackupCodes(false)}>
                                    I've Saved My Codes
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
