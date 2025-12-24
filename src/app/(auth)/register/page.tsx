'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle, FiCheck } from 'react-icons/fi'
import styles from '../login/page.module.css'

type UserRole = 'BUYER' | 'SELLER'

export default function RegisterPage() {
    const router = useRouter()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'BUYER' as UserRole,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters')
            return
        }

        setLoading(true)

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Registration failed')
            }

            router.push('/login?registered=true')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.authPage}>
            {/* Background */}
            <div className={styles.background}>
                <div className={styles.gradientOrb1} />
                <div className={styles.gradientOrb2} />
            </div>

            <div className={styles.container}>
                {/* Left Side - Branding */}
                <div className={styles.branding}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoIcon}>🛍️</span>
                        <span className={styles.logoText}>
                            MP<span>Marketplace</span>
                        </span>
                    </Link>

                    <div className={styles.brandingContent}>
                        <h1>Join Our Community!</h1>
                        <p>
                            Create an account to start shopping from thousands of verified
                            sellers or become a seller yourself.
                        </p>

                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <span>🛒</span>
                                <span>Shop from trusted sellers</span>
                            </div>
                            <div className={styles.feature}>
                                <span>💰</span>
                                <span>Exclusive member discounts</span>
                            </div>
                            <div className={styles.feature}>
                                <span>🏪</span>
                                <span>Start your own store</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className={styles.formContainer}>
                    <div className={styles.formCard}>
                        <div className={styles.formHeader}>
                            <h2>Create Account</h2>
                            <p>Join DewDropSkin Marketplace today</p>
                        </div>

                        {error && (
                            <div className={styles.error}>
                                <FiAlertCircle />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Role Selector */}
                        <div className={styles.roleSelector}>
                            <button
                                type="button"
                                className={`${styles.roleOption} ${formData.role === 'BUYER' ? styles.active : ''}`}
                                onClick={() => setFormData(prev => ({ ...prev, role: 'BUYER' }))}
                            >
                                <span className={styles.roleIcon}>🛒</span>
                                <span className={styles.roleLabel}>Buyer</span>
                                {formData.role === 'BUYER' && <FiCheck className={styles.roleCheck} />}
                            </button>
                            <button
                                type="button"
                                className={`${styles.roleOption} ${formData.role === 'SELLER' ? styles.active : ''}`}
                                onClick={() => setFormData(prev => ({ ...prev, role: 'SELLER' }))}
                            >
                                <span className={styles.roleIcon}>🏪</span>
                                <span className={styles.roleLabel}>Seller</span>
                                {formData.role === 'SELLER' && <FiCheck className={styles.roleCheck} />}
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="firstName">First Name</label>
                                    <div className={styles.inputWrapper}>
                                        <FiUser className={styles.inputIcon} />
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="First name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="lastName">Last Name</label>
                                    <div className={styles.inputWrapper}>
                                        <FiUser className={styles.inputIcon} />
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Last name"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email Address</label>
                                <div className={styles.inputWrapper}>
                                    <FiMail className={styles.inputIcon} />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="password">Password</label>
                                <div className={styles.inputWrapper}>
                                    <FiLock className={styles.inputIcon} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a password"
                                        required
                                        minLength={8}
                                    />
                                    <button
                                        type="button"
                                        className={styles.togglePassword}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className={styles.inputWrapper}>
                                    <FiLock className={styles.inputIcon} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className={styles.spinner} />
                                ) : (
                                    <>
                                        Create Account
                                        <FiArrowRight />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className={styles.divider}>
                            <span>Already have an account?</span>
                        </div>

                        <Link href="/login" className={styles.secondaryBtn}>
                            Sign In
                        </Link>

                        <p className={styles.terms}>
                            By creating an account, you agree to our{' '}
                            <Link href="/terms">Terms of Service</Link> and{' '}
                            <Link href="/privacy">Privacy Policy</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
