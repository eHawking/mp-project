'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiHelpCircle, FiSearch, FiPackage, FiCreditCard, FiTruck, FiRefreshCw, FiUser, FiShield, FiChevronDown, FiChevronUp, FiMessageCircle, FiMail, FiPhone } from 'react-icons/fi'
import styles from './page.module.css'

interface FAQ {
    question: string
    answer: string
}

const categories = [
    { id: 'orders', icon: FiPackage, name: 'Orders', desc: 'Track, cancel, or modify orders' },
    { id: 'payments', icon: FiCreditCard, name: 'Payments', desc: 'Payment methods and issues' },
    { id: 'shipping', icon: FiTruck, name: 'Shipping', desc: 'Delivery times and tracking' },
    { id: 'returns', icon: FiRefreshCw, name: 'Returns', desc: 'Return policy and refunds' },
    { id: 'account', icon: FiUser, name: 'Account', desc: 'Profile and login help' },
    { id: 'security', icon: FiShield, name: 'Security', desc: 'Privacy and 2FA' },
]

const faqs: FAQ[] = [
    { question: 'How do I track my order?', answer: 'Go to My Account → Orders and click on your order to see tracking details. You can also use the tracking number provided in your shipping confirmation email.' },
    { question: 'What payment methods do you accept?', answer: 'We accept Alfa, Easypaisa, JazzCash, bank transfer, credit/debit cards (Stripe), and cash on delivery.' },
    { question: 'How long does shipping take?', answer: 'Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for an additional fee. Free shipping on orders over $50.' },
    { question: 'What is your return policy?', answer: 'We offer a 30-day hassle-free return policy. Items must be unused and in original packaging. Contact us to initiate a return.' },
    { question: 'How do I enable two-factor authentication?', answer: 'Go to My Account → Security and click "Enable 2FA". Scan the QR code with your authenticator app and enter the verification code.' },
    { question: 'Can I change my shipping address after ordering?', answer: 'You can change your address within 1 hour of placing your order. After that, contact our support team for assistance.' },
    { question: 'How do I add funds to my wallet?', answer: 'Go to My Account → Wallet and click "Add Funds". Choose an amount and complete the payment using your preferred method.' },
    { question: 'How do I contact customer support?', answer: 'You can reach us via live chat (click the chat icon), email at support@dewdropskin.com, or WhatsApp.' },
]

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

    const filteredFAQs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className={styles.helpPage}>
            <div className="container">
                {/* Hero */}
                <div className={styles.hero}>
                    <h1><FiHelpCircle /> How can we help you?</h1>
                    <div className={styles.searchBox}>
                        <FiSearch />
                        <input
                            type="text"
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className={styles.categories}>
                    {categories.map(cat => (
                        <div key={cat.id} className={styles.categoryCard}>
                            <div className={styles.categoryIcon}>
                                <cat.icon />
                            </div>
                            <h3>{cat.name}</h3>
                            <p>{cat.desc}</p>
                        </div>
                    ))}
                </div>

                {/* FAQs */}
                <div className={styles.faqSection}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                        {filteredFAQs.map((faq, i) => (
                            <div key={i} className={`${styles.faqItem} ${expandedFAQ === i ? styles.expanded : ''}`}>
                                <button className={styles.faqQuestion} onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}>
                                    <span>{faq.question}</span>
                                    {expandedFAQ === i ? <FiChevronUp /> : <FiChevronDown />}
                                </button>
                                {expandedFAQ === i && (
                                    <div className={styles.faqAnswer}>
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div className={styles.contactSection}>
                    <h2>Still need help?</h2>
                    <div className={styles.contactOptions}>
                        <div className={styles.contactCard}>
                            <FiMessageCircle />
                            <h3>Live Chat</h3>
                            <p>Chat with our support team</p>
                            <button onClick={() => document.querySelector<HTMLButtonElement>('.chatButton')?.click()}>Start Chat</button>
                        </div>
                        <div className={styles.contactCard}>
                            <FiMail />
                            <h3>Email</h3>
                            <p>support@dewdropskin.com</p>
                            <a href="mailto:support@dewdropskin.com">Send Email</a>
                        </div>
                        <div className={styles.contactCard}>
                            <FiPhone />
                            <h3>WhatsApp</h3>
                            <p>+92 300 1234567</p>
                            <a href="https://wa.me/923001234567" target="_blank">Message Us</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
