import Link from 'next/link'
import { FiSearch, FiPackage, FiCreditCard, FiTruck, FiRefreshCw, FiHelpCircle } from 'react-icons/fi'
import styles from './page.module.css'

const helpTopics = [
    { icon: FiPackage, title: 'Orders & Shipping', desc: 'Track orders, shipping info, delivery times', link: '/help/orders' },
    { icon: FiCreditCard, title: 'Payments & Billing', desc: 'Payment methods, invoices, refunds', link: '/help/payments' },
    { icon: FiRefreshCw, title: 'Returns & Refunds', desc: 'Return policy, how to return items', link: '/returns' },
    { icon: FiTruck, title: 'Delivery Information', desc: 'Shipping options, tracking, delays', link: '/shipping' },
]

const faqs = [
    { q: 'How do I track my order?', a: 'You can track your order by going to My Account > Orders and clicking on the order you want to track.' },
    { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, PayPal, and Stripe for secure payments.' },
    { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.' },
    { q: 'What is your return policy?', a: 'We offer a 30-day return policy for most items. Items must be unused and in original packaging.' },
]

export default function HelpPage() {
    return (
        <div className={styles.helpPage}>
            <div className="container">
                {/* Header */}
                <div className={styles.header}>
                    <h1>How can we help you?</h1>
                    <div className={styles.searchBox}>
                        <FiSearch />
                        <input type="text" placeholder="Search for help topics..." />
                    </div>
                </div>

                {/* Topics */}
                <div className={styles.topics}>
                    {helpTopics.map((topic, i) => (
                        <Link key={i} href={topic.link} className={styles.topicCard}>
                            <topic.icon className={styles.topicIcon} />
                            <h3>{topic.title}</h3>
                            <p>{topic.desc}</p>
                        </Link>
                    ))}
                </div>

                {/* FAQ */}
                <div className={styles.faqSection}>
                    <h2><FiHelpCircle /> Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                        {faqs.map((faq, i) => (
                            <details key={i} className={styles.faqItem}>
                                <summary>{faq.q}</summary>
                                <p>{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div className={styles.contactCta}>
                    <h3>Still need help?</h3>
                    <p>Our support team is available 24/7</p>
                    <Link href="/contact" className={styles.contactBtn}>Contact Support</Link>
                </div>
            </div>
        </div>
    )
}
