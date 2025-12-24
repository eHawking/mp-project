import Link from 'next/link'
import {
    FiPackage, FiShoppingBag, FiDollarSign, FiTrendingUp,
    FiArrowUp, FiArrowDown, FiEye, FiPlus, FiZap
} from 'react-icons/fi'
import styles from './page.module.css'

// Mock data for demo
const stats = [
    {
        label: 'Total Revenue',
        value: '$24,589.00',
        change: '+12.5%',
        isPositive: true,
        icon: FiDollarSign,
        gradient: 'primary'
    },
    {
        label: 'Total Orders',
        value: '156',
        change: '+8.2%',
        isPositive: true,
        icon: FiShoppingBag,
        gradient: 'secondary'
    },
    {
        label: 'Products Listed',
        value: '48',
        change: '+3',
        isPositive: true,
        icon: FiPackage,
        gradient: 'success'
    },
    {
        label: 'Store Views',
        value: '3,421',
        change: '+24.1%',
        isPositive: true,
        icon: FiEye,
        gradient: 'accent'
    },
]

const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', product: 'Wireless Headphones', amount: 299.99, status: 'Delivered' },
    { id: 'ORD-002', customer: 'Jane Smith', product: 'Smart Watch', amount: 449.99, status: 'Shipped' },
    { id: 'ORD-003', customer: 'Mike Johnson', product: 'Leather Backpack', amount: 189.99, status: 'Processing' },
    { id: 'ORD-004', customer: 'Emily Davis', product: 'Camera Kit', amount: 1299.99, status: 'Pending' },
    { id: 'ORD-005', customer: 'Chris Wilson', product: 'Bluetooth Earbuds', amount: 79.99, status: 'Delivered' },
]

const topProducts = [
    { name: 'Premium Wireless Headphones', sales: 145, revenue: '$43,255.00', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' },
    { name: 'Smart Watch Series X', sales: 98, revenue: '$44,100.00', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100' },
    { name: 'Minimalist Leather Backpack', sales: 87, revenue: '$16,533.00', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100' },
]

export default function SellerDashboard() {
    return (
        <div className={styles.dashboard}>
            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                {stats.map((stat) => (
                    <div key={stat.label} className={`${styles.statCard} ${styles[stat.gradient]}`}>
                        <div className={styles.statIcon}>
                            <stat.icon />
                        </div>
                        <div className={styles.statContent}>
                            <span className={styles.statLabel}>{stat.label}</span>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={`${styles.statChange} ${stat.isPositive ? styles.positive : styles.negative}`}>
                                {stat.isPositive ? <FiArrowUp /> : <FiArrowDown />}
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
                <Link href="/seller/products/new" className={styles.actionCard}>
                    <div className={styles.actionIcon}>
                        <FiPlus />
                    </div>
                    <span>Add Product</span>
                </Link>
                <Link href="/seller/ai-tools" className={styles.actionCard}>
                    <div className={styles.actionIconAi}>
                        <FiZap />
                    </div>
                    <span>AI SEO Tool</span>
                </Link>
                <Link href="/seller/orders" className={styles.actionCard}>
                    <div className={styles.actionIconOrders}>
                        <FiShoppingBag />
                    </div>
                    <span>View Orders</span>
                </Link>
                <Link href="/seller/analytics" className={styles.actionCard}>
                    <div className={styles.actionIconAnalytics}>
                        <FiTrendingUp />
                    </div>
                    <span>Analytics</span>
                </Link>
            </div>

            {/* Charts & Tables */}
            <div className={styles.mainGrid}>
                {/* Recent Orders */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Recent Orders</h2>
                        <Link href="/seller/orders" className={styles.viewAll}>View All</Link>
                    </div>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Product</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td className={styles.orderId}>{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td className={styles.productName}>{order.product}</td>
                                        <td className={styles.amount}>${order.amount}</td>
                                        <td>
                                            <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Top Products */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Top Products</h2>
                        <Link href="/seller/products" className={styles.viewAll}>View All</Link>
                    </div>
                    <div className={styles.productList}>
                        {topProducts.map((product, index) => (
                            <div key={product.name} className={styles.productItem}>
                                <span className={styles.productRank}>#{index + 1}</span>
                                <img src={product.image} alt={product.name} className={styles.productImage} />
                                <div className={styles.productInfo}>
                                    <span className={styles.productTitle}>{product.name}</span>
                                    <span className={styles.productSales}>{product.sales} sales</span>
                                </div>
                                <span className={styles.productRevenue}>{product.revenue}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
