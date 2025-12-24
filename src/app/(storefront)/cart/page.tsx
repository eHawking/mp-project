'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi'
import styles from './page.module.css'

// Mock cart data
const initialCartItems = [
    {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
        store: 'TechStore'
    },
    {
        id: '2',
        name: 'Smart Watch Series X',
        price: 449.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
        store: 'GadgetWorld'
    },
]

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialCartItems)

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        )
    }

    const removeItem = (id: string) => {
        setCartItems(items => items.filter(item => item.id !== id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 50 ? 0 : 9.99
    const total = subtotal + shipping

    return (
        <div className={styles.cartPage}>
            <div className="container">
                <h1 className={styles.title}>Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className={styles.emptyCart}>
                        <FiShoppingBag className={styles.emptyIcon} />
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven&apos;t added anything to your cart yet.</p>
                        <Link href="/products" className={styles.shopBtn}>
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className={styles.layout}>
                        {/* Cart Items */}
                        <div className={styles.cartItems}>
                            {cartItems.map((item) => (
                                <div key={item.id} className={styles.cartItem}>
                                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                                    <div className={styles.itemDetails}>
                                        <h3>{item.name}</h3>
                                        <p className={styles.store}>Sold by: {item.store}</p>
                                        <p className={styles.price}>${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className={styles.quantity}>
                                        <button onClick={() => updateQuantity(item.id, -1)}>
                                            <FiMinus />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)}>
                                            <FiPlus />
                                        </button>
                                    </div>
                                    <p className={styles.itemTotal}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className={styles.summary}>
                            <h2>Order Summary</h2>
                            <div className={styles.summaryRow}>
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className={`${styles.summaryRow} ${styles.total}`}>
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <Link href="/checkout" className={styles.checkoutBtn}>
                                Proceed to Checkout
                                <FiArrowRight />
                            </Link>
                            <Link href="/products" className={styles.continueBtn}>
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
