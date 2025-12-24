'use client'

import { FiTrendingUp, FiUsers, FiShoppingBag, FiDollarSign, FiPackage, FiBarChart2 } from 'react-icons/fi'
import styles from './page.module.css'

const stats = [
    { label: 'Total Revenue', value: '$127,450', change: '+12.5%', icon: FiDollarSign, positive: true },
    { label: 'Total Orders', value: '1,847', change: '+8.2%', icon: FiShoppingBag, positive: true },
    { label: 'Active Users', value: '3,256', change: '+15.3%', icon: FiUsers, positive: true },
    { label: 'Products Sold', value: '4,521', change: '+22.1%', icon: FiPackage, positive: true },
]

const monthlyData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15800 },
    { month: 'Mar', revenue: 18200 },
    { month: 'Apr', revenue: 14600 },
    { month: 'May', revenue: 21300 },
    { month: 'Jun', revenue: 24500 },
    { month: 'Jul', revenue: 22100 },
    { month: 'Aug', revenue: 28900 },
    { month: 'Sep', revenue: 26700 },
    { month: 'Oct', revenue: 31200 },
    { month: 'Nov', revenue: 35400 },
    { month: 'Dec', revenue: 42800 },
]

const topProducts = [
    { name: 'Premium Headphones', sales: 456, revenue: 136344 },
    { name: 'Smart Watch', sales: 312, revenue: 140388 },
    { name: 'Camera Kit', sales: 189, revenue: 245711 },
    { name: 'Leather Backpack', sales: 278, revenue: 52802 },
]

export default function AnalyticsPage() {
    const maxRevenue = Math.max(...monthlyData.map(d => d.revenue))

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Analytics Dashboard</h1>
                <select className={styles.periodSelect}>
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                    <option>Last Year</option>
                    <option>All Time</option>
                </select>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                {stats.map((stat, i) => (
                    <div key={i} className={styles.statCard}>
                        <div className={styles.statIcon}><stat.icon /></div>
                        <div className={styles.statInfo}>
                            <p className={styles.statLabel}>{stat.label}</p>
                            <p className={styles.statValue}>{stat.value}</p>
                            <p className={`${styles.statChange} ${stat.positive ? styles.positive : styles.negative}`}>
                                <FiTrendingUp /> {stat.change}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className={styles.chartCard}>
                <h2><FiBarChart2 /> Monthly Revenue</h2>
                <div className={styles.chart}>
                    {monthlyData.map((d, i) => (
                        <div key={i} className={styles.bar}>
                            <div className={styles.barFill} style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}>
                                <span className={styles.barValue}>${(d.revenue / 1000).toFixed(1)}k</span>
                            </div>
                            <span className={styles.barLabel}>{d.month}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Products */}
            <div className={styles.topProducts}>
                <h2>Top Selling Products</h2>
                <table className={styles.table}>
                    <thead>
                        <tr><th>Product</th><th>Sales</th><th>Revenue</th></tr>
                    </thead>
                    <tbody>
                        {topProducts.map((p, i) => (
                            <tr key={i}>
                                <td><strong>{p.name}</strong></td>
                                <td>{p.sales}</td>
                                <td>${p.revenue.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
