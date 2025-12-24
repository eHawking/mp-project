import styles from '../privacy/page.module.css'

export default function CookiesPage() {
    return (
        <div className={styles.policyPage}>
            <div className="container">
                <h1>Cookie Policy</h1>
                <p className={styles.updated}>Last updated: December 2025</p>

                <section>
                    <h2>What Are Cookies?</h2>
                    <p>Cookies are small text files stored on your device when you visit our website. They help us provide a better experience.</p>
                </section>

                <section>
                    <h2>Types of Cookies We Use</h2>
                    <ul>
                        <li><strong>Essential:</strong> Required for the website to function (cart, login)</li>
                        <li><strong>Analytics:</strong> Help us understand how visitors use our site</li>
                        <li><strong>Preferences:</strong> Remember your settings (theme, language)</li>
                        <li><strong>Marketing:</strong> Track advertising effectiveness (with consent)</li>
                    </ul>
                </section>

                <section>
                    <h2>Managing Cookies</h2>
                    <p>You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.</p>
                </section>

                <section>
                    <h2>Contact</h2>
                    <p>Questions about our cookie policy? Email privacy@mpmarketplace.com</p>
                </section>
            </div>
        </div>
    )
}
