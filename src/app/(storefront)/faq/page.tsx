'use client'

import { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import styles from './page.module.css'

const faqs = [
    {
        category: 'Orders', items: [
            { q: 'How do I place an order?', a: 'Browse products, add them to cart, and proceed to checkout. You can pay with credit card or PayPal.' },
            { q: 'Can I modify my order after placing it?', a: 'Orders can be modified within 1 hour of placement. Contact support for assistance.' },
            { q: 'How do I track my order?', a: 'Go to My Account > Orders and click on your order to see tracking information.' },
        ]
    },
    {
        category: 'Shipping', items: [
            { q: 'What are the shipping options?', a: 'We offer Standard (5-7 days), Express (2-3 days), and Next Day delivery options.' },
            { q: 'Do you ship internationally?', a: 'Yes, we ship to select countries. International fees may apply.' },
            { q: 'Is shipping free?', a: 'Free standard shipping on orders over $50 within the US.' },
        ]
    },
    {
        category: 'Returns', items: [
            { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery for unused items in original packaging.' },
            { q: 'How do I start a return?', a: 'Go to My Account > Orders, select the order, and click "Return Item".' },
            { q: 'When will I get my refund?', a: 'Refunds are processed within 5-7 business days after we receive your return.' },
        ]
    },
    {
        category: 'Account', items: [
            { q: 'How do I create an account?', a: 'Click "Register" and fill in your details. Verify your email to activate your account.' },
            { q: 'How do I reset my password?', a: 'Click "Forgot Password" on the login page and follow the instructions.' },
            { q: 'Can I become a seller?', a: 'Yes! Register as a seller and complete the verification process to start selling.' },
        ]
    },
]

export default function FaqPage() {
    const [openItems, setOpenItems] = useState<string[]>([])

    const toggle = (key: string) => {
        setOpenItems(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
    }

    return (
        <div className={styles.faqPage}>
            <div className="container">
                <div className={styles.header}>
                    <h1>Frequently Asked Questions</h1>
                    <p>Find answers to common questions</p>
                </div>

                {faqs.map((section) => (
                    <div key={section.category} className={styles.section}>
                        <h2>{section.category}</h2>
                        <div className={styles.items}>
                            {section.items.map((item, i) => {
                                const key = `${section.category}-${i}`
                                const isOpen = openItems.includes(key)
                                return (
                                    <div key={key} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                                        <button className={styles.question} onClick={() => toggle(key)}>
                                            {item.q}
                                            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                                        </button>
                                        {isOpen && <div className={styles.answer}>{item.a}</div>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
