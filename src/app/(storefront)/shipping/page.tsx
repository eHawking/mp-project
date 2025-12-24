import styles from '../privacy/page.module.css'

export default function ShippingPage() {
    return (
        <div className={styles.policyPage}>
            <div className="container">
                <h1>Shipping Information</h1>
                <p className={styles.updated}>Everything you need to know about shipping</p>

                <section>
                    <h2>Shipping Options</h2>
                    <ul>
                        <li><strong>Standard Shipping:</strong> 5-7 business days - FREE on orders $50+</li>
                        <li><strong>Express Shipping:</strong> 2-3 business days - $9.99</li>
                        <li><strong>Next Day Delivery:</strong> 1 business day - $19.99</li>
                    </ul>
                </section>

                <section>
                    <h2>Processing Time</h2>
                    <p>Orders are processed within 1-2 business days. Processing times may vary by seller.</p>
                </section>

                <section>
                    <h2>Tracking Your Order</h2>
                    <p>Once shipped, you&apos;ll receive a tracking number via email. Track your order in My Account &gt; Orders.</p>
                </section>

                <section>
                    <h2>International Shipping</h2>
                    <p>We ship to select countries. International orders may be subject to customs fees.</p>
                </section>
            </div>
        </div>
    )
}
