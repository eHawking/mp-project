import Link from 'next/link'
import styles from '../privacy/page.module.css'

export default function ReturnsPage() {
    return (
        <div className={styles.policyPage}>
            <div className="container">
                <h1>Returns & Refunds</h1>
                <p className={styles.updated}>30-Day Return Policy</p>

                <section>
                    <h2>Return Policy</h2>
                    <p>We offer a 30-day return policy for most items. Items must be unused, in original packaging, with all tags attached.</p>
                </section>

                <section>
                    <h2>How to Return</h2>
                    <ul>
                        <li>Go to My Account &gt; Orders</li>
                        <li>Select the order and click &quot;Return Item&quot;</li>
                        <li>Print the prepaid shipping label</li>
                        <li>Drop off at your nearest carrier location</li>
                    </ul>
                </section>

                <section>
                    <h2>Refund Timeline</h2>
                    <p>Refunds are processed within 5-7 business days after we receive your return. You&apos;ll be notified via email.</p>
                </section>

                <section>
                    <h2>Non-Returnable Items</h2>
                    <ul>
                        <li>Personalized or custom items</li>
                        <li>Perishable goods</li>
                        <li>Digital products</li>
                        <li>Items marked as final sale</li>
                    </ul>
                </section>

                <section>
                    <h2>Need Help?</h2>
                    <p>Contact our <Link href="/contact">support team</Link> for return assistance.</p>
                </section>
            </div>
        </div>
    )
}
