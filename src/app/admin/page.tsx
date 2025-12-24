import Link from 'next/link'
import {
    FiUsers, FiPackage, FiShoppingBag, FiDollarSign,
    FiArrowUp, FiArrowDown, FiTrendingUp, FiUserCheck, FiUserX,
    FiAlertCircle
} from 'react-icons/fi'
import styles from './page.module.css'

// Mock data
const stats = [
    {
        label: 'Total Revenue',
        value: '$125,430.00',
        change: '+15.3%',
        isPositive: true,
        icon: FiDollarSign,
        gradient: 'primary'
    },
    {
        label: 'Total Orders',
        value: '2,845',
        change: '+12.1%',
        isPositive: true,
        icon: FiShoppingBag,
        gradient: 'secondary'
    },
    {
        label: 'Active Vendors',
        value: '156',
        change: '+8',
        isPositive: true,
        icon: FiUsers,
        gradient: 'success'
    },
    {
        label: 'Total Products',
        value: '4,521',
        change: '+234',
        isPositive: true,
        icon: FiPackage,
        gradient: 'accent'
    },
]

const pendingVendors = [
    { id: 1, name: 'John\'s Electronics', email: 'john@example.com', date: '2024-01-15', products: 25 },
    { id: 2, name: 'Fashion Hub', email: 'fashion@example.com', date: '2024-01-14', products: 0 },
    { id: 3, name: 'Home Decor Plus', email: 'homedecor@example.com', date: '2024-01-13', products: 12 },
]

const recentOrders = [
    { id: 'ORD-2845', customer: 'Alice Brown', vendor: 'TechStore', amount: 599.99, status: 'Processing' },
    { id: 'ORD-2844', customer: 'Bob Wilson', vendor: 'Fashion Hub', amount: 159.99, status: 'Shipped' },
    { id: 'ORD-2843', customer: 'Carol Davis', vendor: 'GadgetWorld', amount: 899.99, status: 'Delivered' },
    { id: 'ORD-2842', customer: 'David Lee', vendor: 'StyleShop', amount: 249.99, status: 'Pending' },
]

const alerts = [
    { type: 'warning', message: '3 vendors pending approval', link: '/admin/vendors?status=pending' },
    { type: 'info', message: '12 products pending review', link: '/admin/products?status=pending' },
    { type: 'error', message: '2 refund requests need attention', link: '/admin/orders?refunds=true' },
]

export default function AdminDashboard() {
    return (
        <div className={styles.dashboard}>
            {/* Alerts */}
            <div className={styles.alerts}>
                {alerts.map((alert, index) => (
                    <Link key={index} href={alert.link} className={`${styles.alert} ${styles[alert.type]}`}>
                        <FiAlertCircle />
                        <span>{alert.message}</span>
                    </Link>
                ))}
            </div>

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

            {/* Main Grid */}
            <div className={styles.mainGrid}>
                {/* Pending Vendors */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Pending Vendor Approvals</h2>
                        <Link href="/admin/vendors?status=pending" className={styles.viewAll}>View All</Link>
                    </div>
                    <div className={styles.vendorList}>
                        {pendingVendors.map((vendor) => (
                            <div key={vendor.id} className={styles.vendorItem}>
                                <div className={styles.vendorInfo}>
                                    <span className={styles.vendorName}>{vendor.name}</span>
                                    <span className={styles.vendorEmail}>{vendor.email}</span>
                                    <span className={styles.vendorDate}>Applied: {vendor.date}</span>
                                </div>
                                <div className={styles.vendorActions}>
                                    <button className={styles.approveBtn}>
                                        <FiUserCheck /> Approve
                                    </button>
                                    <button className={styles.rejectBtn}>
                                        <FiUserX /> Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Orders */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Recent Orders</h2>
                        <Link href="/admin/orders" className={styles.viewAll}>View All</Link>
                    </div>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Customer</th>
                                    <th>Vendor</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td className={styles.orderId}>{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td className={styles.vendor}>{order.vendor}</td>
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
            </div>

            {/* Quick Stats Row */}
            <div className={styles.quickStats}>
                <div className={styles.quickStatCard}>
                    <FiTrendingUp className={styles.quickStatIcon} />
                    <div className={styles.quickStatInfo}>
                        <span className={styles.quickStatValue}>89.4%</span>
                        <span className={styles.quickStatLabel}>Order Success Rate</span>
                    </div>
                </div>
                <div className={styles.quickStatCard}>
                    <FiUsers className={styles.quickStatIcon} />
                    <div className={styles.quickStatInfo}>
                        <span className={styles.quickStatValue}>12,453</span>
                        <span className={styles.quickStatLabel}>Registered Users</span>
                    </div>
                </div>
                <div className={styles.quickStatCard}>
                    <FiPackage className={styles.quickStatIcon} />
                    <div className={styles.quickStatInfo}>
                        <span className={styles.quickStatValue}>4.8 / 5</span>
                        <span className={styles.quickStatLabel}>Avg. Product Rating</span>
                    </div>
                </div>
                <div className={styles.quickStatCard}>
                    <FiDollarSign className={styles.quickStatIcon} />
                    <div className={styles.quickStatInfo}>
                        <span className={styles.quickStatValue}>$12,540</span>
                        <span className={styles.quickStatLabel}>Commission Earned (MTD)</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
