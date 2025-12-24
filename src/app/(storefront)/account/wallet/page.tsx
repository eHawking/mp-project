'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiPlus, FiArrowUpRight, FiArrowDownLeft, FiCreditCard, FiGift, FiRefreshCw } from 'react-icons/fi'
import { useToast } from '@/components/Toast'
import styles from './page.module.css'

interface Transaction {
    id: string
    type: 'credit' | 'debit' | 'refund' | 'cashback'
    amount: number
    description: string
    date: string
}

export default function WalletPage() {
    const { data: session, status } = useSession()
    const { showToast } = useToast()
    const [balance, setBalance] = useState(0)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [showAddFunds, setShowAddFunds] = useState(false)
    const [addAmount, setAddAmount] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Mock data - in production fetch from API
        setBalance(250.50)
        setTransactions([
            { id: '1', type: 'credit', amount: 100, description: 'Added funds', date: '2024-12-24' },
            { id: '2', type: 'debit', amount: 45.50, description: 'Order #ORD-12345', date: '2024-12-23' },
            { id: '3', type: 'cashback', amount: 5, description: 'Cashback reward', date: '2024-12-22' },
            { id: '4', type: 'refund', amount: 25, description: 'Refund for order #ORD-12340', date: '2024-12-20' },
        ])
    }, [])

    const handleAddFunds = async () => {
        const amount = parseFloat(addAmount)
        if (isNaN(amount) || amount <= 0) {
            showToast('Please enter a valid amount', 'error')
            return
        }

        setLoading(true)
        // Simulate adding funds - in production redirect to payment gateway
        setTimeout(() => {
            setBalance(prev => prev + amount)
            setTransactions(prev => [{
                id: Date.now().toString(),
                type: 'credit',
                amount,
                description: 'Added funds',
                date: new Date().toISOString().split('T')[0],
            }, ...prev])
            setShowAddFunds(false)
            setAddAmount('')
            setLoading(false)
            showToast(`$${amount.toFixed(2)} added to wallet!`, 'success')
        }, 1500)
    }

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'credit': return <FiArrowDownLeft className={styles.credit} />
            case 'debit': return <FiArrowUpRight className={styles.debit} />
            case 'refund': return <FiRefreshCw className={styles.refund} />
            case 'cashback': return <FiGift className={styles.cashback} />
            default: return <FiCreditCard />
        }
    }

    if (status === 'loading') return <div className={styles.loading}>Loading...</div>
    if (!session) redirect('/login?callbackUrl=/account/wallet')

    return (
        <div className={styles.walletPage}>
            <div className="container">
                <Link href="/account" className={styles.backBtn}>
                    <FiArrowLeft /> Back to Account
                </Link>

                <h1 className={styles.title}>My Wallet</h1>

                <div className={styles.content}>
                    {/* Balance Card */}
                    <div className={styles.balanceCard}>
                        <div className={styles.balanceInfo}>
                            <span className={styles.balanceLabel}>Available Balance</span>
                            <span className={styles.balanceAmount}>${balance.toFixed(2)}</span>
                        </div>
                        <button className={styles.addFundsBtn} onClick={() => setShowAddFunds(true)}>
                            <FiPlus /> Add Funds
                        </button>
                    </div>

                    {/* Add Funds Modal */}
                    {showAddFunds && (
                        <div className={styles.modal}>
                            <div className={styles.modalContent}>
                                <h2>Add Funds to Wallet</h2>
                                <p>Choose an amount to add to your wallet balance.</p>

                                <div className={styles.quickAmounts}>
                                    {[10, 25, 50, 100].map(amount => (
                                        <button
                                            key={amount}
                                            className={`${styles.quickAmount} ${addAmount === amount.toString() ? styles.selected : ''}`}
                                            onClick={() => setAddAmount(amount.toString())}
                                        >
                                            ${amount}
                                        </button>
                                    ))}
                                </div>

                                <div className={styles.customAmount}>
                                    <label>Or enter custom amount:</label>
                                    <div className={styles.inputGroup}>
                                        <span>$</span>
                                        <input
                                            type="number"
                                            value={addAmount}
                                            onChange={e => setAddAmount(e.target.value)}
                                            placeholder="0.00"
                                            min="1"
                                        />
                                    </div>
                                </div>

                                <div className={styles.modalActions}>
                                    <button className={styles.cancelBtn} onClick={() => { setShowAddFunds(false); setAddAmount(''); }}>
                                        Cancel
                                    </button>
                                    <button className={styles.confirmBtn} onClick={handleAddFunds} disabled={loading || !addAmount}>
                                        {loading ? 'Processing...' : 'Add Funds'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Features */}
                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <FiCreditCard />
                            <span>Quick Checkout</span>
                        </div>
                        <div className={styles.feature}>
                            <FiRefreshCw />
                            <span>Easy Refunds</span>
                        </div>
                        <div className={styles.feature}>
                            <FiGift />
                            <span>Earn Cashback</span>
                        </div>
                    </div>

                    {/* Transactions */}
                    <div className={styles.transactionsSection}>
                        <h2>Transaction History</h2>

                        {transactions.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>No transactions yet</p>
                            </div>
                        ) : (
                            <div className={styles.transactionsList}>
                                {transactions.map(tx => (
                                    <div key={tx.id} className={styles.transaction}>
                                        <div className={styles.txIcon}>
                                            {getTransactionIcon(tx.type)}
                                        </div>
                                        <div className={styles.txInfo}>
                                            <span className={styles.txDesc}>{tx.description}</span>
                                            <span className={styles.txDate}>{tx.date}</span>
                                        </div>
                                        <span className={`${styles.txAmount} ${styles[tx.type]}`}>
                                            {tx.type === 'debit' ? '-' : '+'}${tx.amount.toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
