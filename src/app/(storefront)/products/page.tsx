import Link from 'next/link'
import { FiFilter, FiGrid, FiList } from 'react-icons/fi'
import ProductCard from '@/components/storefront/ProductCard'
import styles from './page.module.css'

// Mock data
const products = [
    {
        id: '1', name: 'Premium Wireless Headphones', slug: 'premium-wireless-headphones',
        price: 299.99, comparePrice: 399.99, rating: 4.8, reviewCount: 124,
        images: [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' }],
        store: { name: 'TechStore', slug: 'techstore' }
    },
    {
        id: '2', name: 'Smart Watch Series X', slug: 'smart-watch-series-x',
        price: 449.99, comparePrice: 599.99, rating: 4.9, reviewCount: 89,
        images: [{ url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' }],
        store: { name: 'GadgetWorld', slug: 'gadgetworld' }
    },
    {
        id: '3', name: 'Minimalist Leather Backpack', slug: 'minimalist-leather-backpack',
        price: 189.99, comparePrice: 249.99, rating: 4.7, reviewCount: 56,
        images: [{ url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' }],
        store: { name: 'StyleShop', slug: 'styleshop' }
    },
    {
        id: '4', name: 'Professional Camera Kit', slug: 'professional-camera-kit',
        price: 1299.99, comparePrice: 1599.99, rating: 4.9, reviewCount: 203,
        images: [{ url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400' }],
        store: { name: 'PhotoPro', slug: 'photopro' }
    },
    {
        id: '5', name: 'Bluetooth Earbuds Pro', slug: 'bluetooth-earbuds-pro',
        price: 79.99, comparePrice: 129.99, rating: 4.6, reviewCount: 312,
        images: [{ url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400' }],
        store: { name: 'TechStore', slug: 'techstore' }
    },
    {
        id: '6', name: 'Vintage Sunglasses', slug: 'vintage-sunglasses',
        price: 149.99, comparePrice: 199.99, rating: 4.5, reviewCount: 78,
        images: [{ url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400' }],
        store: { name: 'StyleShop', slug: 'styleshop' }
    },
]

const categories = [
    'All', 'Electronics', 'Fashion', 'Home & Garden', 'Beauty', 'Sports'
]

export default function ProductsPage() {
    return (
        <div className={styles.productsPage}>
            <div className="container">
                {/* Breadcrumb */}
                <nav className={styles.breadcrumb}>
                    <Link href="/">Home</Link>
                    <span>/</span>
                    <span>All Products</span>
                </nav>

                <div className={styles.layout}>
                    {/* Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.filterSection}>
                            <h3>Categories</h3>
                            <ul className={styles.categoryList}>
                                {categories.map((cat) => (
                                    <li key={cat}>
                                        <Link href={cat === 'All' ? '/products' : `/products?category=${cat.toLowerCase()}`}>
                                            {cat}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.filterSection}>
                            <h3>Price Range</h3>
                            <div className={styles.priceInputs}>
                                <input type="number" placeholder="Min" />
                                <span>-</span>
                                <input type="number" placeholder="Max" />
                            </div>
                            <button className={styles.applyBtn}>Apply</button>
                        </div>

                        <div className={styles.filterSection}>
                            <h3>Rating</h3>
                            <label className={styles.checkbox}>
                                <input type="checkbox" /> 4★ & above
                            </label>
                            <label className={styles.checkbox}>
                                <input type="checkbox" /> 3★ & above
                            </label>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className={styles.main}>
                        {/* Header */}
                        <div className={styles.header}>
                            <h1>All Products</h1>
                            <div className={styles.controls}>
                                <select className={styles.sortSelect}>
                                    <option>Sort by: Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest First</option>
                                    <option>Best Rating</option>
                                </select>
                                <div className={styles.viewToggle}>
                                    <button className={styles.active}><FiGrid /></button>
                                    <button><FiList /></button>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className={styles.productsGrid}>
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className={styles.pagination}>
                            <button disabled>Previous</button>
                            <span className={styles.pageNumbers}>
                                <button className={styles.active}>1</button>
                                <button>2</button>
                                <button>3</button>
                            </span>
                            <button>Next</button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
