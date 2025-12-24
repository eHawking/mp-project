import styles from './page.module.css'

export default function PrivacyPage() {
    return (
        <div className={styles.policyPage}>
            <div className="container">
                <h1>Privacy Policy</h1>
                <p className={styles.updated}>Last updated: December 2025</p>

                <section>
                    <h2>1. Information We Collect</h2>
                    <p>We collect information you provide directly, including name, email, shipping address, and payment information when you make a purchase or create an account.</p>
                </section>

                <section>
                    <h2>2. How We Use Your Information</h2>
                    <ul>
                        <li>Process and fulfill your orders</li>
                        <li>Send transactional emails (order confirmations, shipping updates)</li>
                        <li>Improve our services and user experience</li>
                        <li>Communicate promotions (with your consent)</li>
                    </ul>
                </section>

                <section>
                    <h2>3. Information Sharing</h2>
                    <p>We share information with sellers to fulfill orders, payment processors for transactions, and shipping carriers for delivery. We do not sell your personal data.</p>
                </section>

                <section>
                    <h2>4. Data Security</h2>
                    <p>We implement industry-standard security measures including SSL encryption, secure payment processing, and regular security audits.</p>
                </section>

                <section>
                    <h2>5. Your Rights</h2>
                    <p>You have the right to access, update, or delete your personal information. Contact us at privacy@mpmarketplace.com.</p>
                </section>

                <section>
                    <h2>6. Contact</h2>
                    <p>Questions? Email us at privacy@mpmarketplace.com</p>
                </section>
            </div>
        </div>
    )
}
