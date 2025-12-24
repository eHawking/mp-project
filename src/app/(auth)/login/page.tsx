'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle } from 'react-icons/fi'
import styles from './page.module.css'

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError(result.error)
            } else {
                router.push(callbackUrl)
                router.refresh()
            }
        } catch (err) {
            setError('An unexpected error occurred')
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
                        <h1>Welcome Back!</h1>
                        <p>
                            Sign in to access your account, track orders,
                            and enjoy personalized shopping experience.
                        </p>

                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <span>✨</span>
                                <span>Access exclusive deals</span>
                            </div>
                            <div className={styles.feature}>
                                <span>📦</span>
                                <span>Track your orders</span>
                            </div>
                            <div className={styles.feature}>
                                <span>❤️</span>
                                <span>Save your favorites</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.illustration}>
                        <img
                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600"
                            alt="Shopping"
                        />
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className={styles.formContainer}>
                    <div className={styles.formCard}>
                        <div className={styles.formHeader}>
                            <h2>Sign In</h2>
                            <p>Enter your credentials to continue</p>
                        </div>

                        {error && (
                            <div className={styles.error}>
                                <FiAlertCircle />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email Address</label>
                                <div className={styles.inputWrapper}>
                                    <FiMail className={styles.inputIcon} />
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.labelRow}>
                                    <label htmlFor="password">Password</label>
                                    <Link href="/forgot-password" className={styles.forgotLink}>
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className={styles.inputWrapper}>
                                    <FiLock className={styles.inputIcon} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
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

                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className={styles.spinner} />
                                ) : (
                                    <>
                                        Sign In
                                        <FiArrowRight />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className={styles.divider}>
                            <span>Don&apos;t have an account?</span>
                        </div>

                        <Link href="/register" className={styles.secondaryBtn}>
                            Create Account
                        </Link>

                        <p className={styles.terms}>
                            By signing in, you agree to our{' '}
                            <Link href="/terms">Terms of Service</Link> and{' '}
                            <Link href="/privacy">Privacy Policy</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
