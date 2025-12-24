import styles from '../privacy/page.module.css'

export default function TermsPage() {
    return (
        <div className={styles.policyPage}>
            <div className="container">
                <h1>Terms of Service</h1>
                <p className={styles.updated}>Last updated: December 2025</p>

                <section>
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing and using MP Marketplace, you agree to be bound by these Terms of Service.</p>
                </section>

                <section>
                    <h2>2. User Accounts</h2>
                    <p>You are responsible for maintaining the confidentiality of your account. You must be 18+ to create an account.</p>
                </section>

                <section>
                    <h2>3. Purchases</h2>
                    <ul>
                        <li>All prices are in USD unless otherwise stated</li>
                        <li>Payment is required at checkout</li>
                        <li>Orders are subject to product availability</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Seller Terms</h2>
                    <p>Sellers agree to provide accurate product information, ship items promptly, and maintain professional communication with buyers.</p>
                </section>

                <section>
                    <h2>5. Prohibited Activities</h2>
                    <ul>
                        <li>Fraudulent transactions or identity theft</li>
                        <li>Selling counterfeit or illegal items</li>
                        <li>Harassment or abuse of other users</li>
                    </ul>
                </section>

                <section>
                    <h2>6. Limitation of Liability</h2>
                    <p>MP Marketplace is a platform connecting buyers and sellers. We are not responsible for transactions between parties.</p>
                </section>
            </div>
        </div>
    )
}
