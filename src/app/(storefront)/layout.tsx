import Header from '@/components/storefront/Header'
import Footer from '@/components/storefront/Footer'
import styles from './layout.module.css'

export default function StorefrontLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    )
}
