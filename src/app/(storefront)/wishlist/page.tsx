'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi'
import styles from './page.module.css'

// Mock wishlist data
const initialWishlist = [
    {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        comparePrice: 399.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        inStock: true
    },
    {
        id: '3',
        name: 'Minimalist Leather Backpack',
        price: 189.99,
        comparePrice: 249.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
        inStock: true
    },
    {
        id: '4',
        name: 'Professional Camera Kit',
        price: 1299.99,
        comparePrice: 1599.99,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
        inStock: false
    },
]

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState(initialWishlist)

    const removeItem = (id: string) => {
        setWishlist(items => items.filter(item => item.id !== id))
    }

    return (
        <div className={styles.wishlistPage}>
            <div className="container">
                <h1 className={styles.title}>My Wishlist</h1>

                {wishlist.length === 0 ? (
                    <div className={styles.emptyWishlist}>
                        <FiHeart className={styles.emptyIcon} />
                        <h2>Your wishlist is empty</h2>
                        <p>Save items you love to your wishlist and revisit them anytime.</p>
                        <Link href="/products" className={styles.shopBtn}>
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {wishlist.map((item) => (
                            <div key={item.id} className={styles.wishlistItem}>
                                <div className={styles.imageContainer}>
                                    <img src={item.image} alt={item.name} />
                                    {!item.inStock && (
                                        <span className={styles.outOfStock}>Out of Stock</span>
                                    )}
                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                                <div className={styles.itemInfo}>
                                    <h3>{item.name}</h3>
                                    <div className={styles.prices}>
                                        <span className={styles.price}>${item.price.toFixed(2)}</span>
                                        {item.comparePrice && (
                                            <span className={styles.comparePrice}>
                                                ${item.comparePrice.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        className={styles.addToCart}
                                        disabled={!item.inStock}
                                    >
                                        <FiShoppingCart />
                                        {item.inStock ? 'Add to Cart' : 'Notify Me'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
