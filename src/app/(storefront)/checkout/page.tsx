'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiShoppingBag, FiCreditCard, FiTruck, FiCheck, FiLock } from 'react-icons/fi'
import { useToast } from '@/components/Toast'
import styles from './page.module.css'

interface CartItem {
    id: string
    name: string
    price: number
    image: string
    quantity: number
}

export default function CheckoutPage() {
    const { data: session, status } = useSession()
    const { showToast } = useToast()
    const [cart, setCart] = useState<CartItem[]>([])
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States',
    })
    const [paymentMethod, setPaymentMethod] = useState('card')

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
        setCart(savedCart)
        if (session?.user) {
            setShippingInfo(prev => ({
                ...prev,
                firstName: session.user.firstName || '',
                lastName: session.user.lastName || '',
                email: session.user.email || '',
            }))
        }
    }, [session])

    if (status === 'loading') {
        return <div className={styles.loading}>Loading...</div>
    }

    if (!session) {
        redirect('/login?callbackUrl=/checkout')
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 50 ? 0 : 9.99
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    const handleSubmit = async () => {
        setLoading(true)

        // Simulate order processing
        await new Promise(r => setTimeout(r, 2000))

        // Clear cart
        localStorage.removeItem('cart')

        showToast('Order placed successfully! 🎉', 'success')

        // Redirect to success page
        window.location.href = '/checkout/success'
    }

    if (cart.length === 0) {
        return (
            <div className={styles.checkoutPage}>
                <div className="container">
                    <div className={styles.emptyCart}>
                        <FiShoppingBag />
                        <h2>Your cart is empty</h2>
                        <p>Add some products before checking out.</p>
                        <Link href="/products" className={styles.shopBtn}>Browse Products</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.checkoutPage}>
            <div className="container">
                <Link href="/cart" className={styles.backLink}>
                    <FiArrowLeft /> Back to Cart
                </Link>

                <h1 className={styles.title}>Checkout</h1>

                {/* Progress Steps */}
                <div className={styles.steps}>
                    <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
                        <span className={styles.stepNumber}>1</span>
                        <span>Shipping</span>
                    </div>
                    <div className={styles.stepLine}></div>
                    <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
                        <span className={styles.stepNumber}>2</span>
                        <span>Payment</span>
                    </div>
                    <div className={styles.stepLine}></div>
                    <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>
                        <span className={styles.stepNumber}>3</span>
                        <span>Review</span>
                    </div>
                </div>

                <div className={styles.checkoutGrid}>
                    {/* Main Form */}
                    <div className={styles.formSection}>
                        {step === 1 && (
                            <div className={styles.formCard}>
                                <h2><FiTruck /> Shipping Information</h2>
                                <div className={styles.formGrid}>
                                    <div className={styles.formGroup}>
                                        <label>First Name</label>
                                        <input type="text" value={shippingInfo.firstName} onChange={e => setShippingInfo({ ...shippingInfo, firstName: e.target.value })} required />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Last Name</label>
                                        <input type="text" value={shippingInfo.lastName} onChange={e => setShippingInfo({ ...shippingInfo, lastName: e.target.value })} required />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Email</label>
                                        <input type="email" value={shippingInfo.email} onChange={e => setShippingInfo({ ...shippingInfo, email: e.target.value })} required />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Phone</label>
                                        <input type="tel" value={shippingInfo.phone} onChange={e => setShippingInfo({ ...shippingInfo, phone: e.target.value })} required />
                                    </div>
                                    <div className={styles.formGroupFull}>
                                        <label>Address</label>
                                        <input type="text" value={shippingInfo.address} onChange={e => setShippingInfo({ ...shippingInfo, address: e.target.value })} required />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>City</label>
                                        <input type="text" value={shippingInfo.city} onChange={e => setShippingInfo({ ...shippingInfo, city: e.target.value })} required />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>State</label>
                                        <input type="text" value={shippingInfo.state} onChange={e => setShippingInfo({ ...shippingInfo, state: e.target.value })} required />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>ZIP Code</label>
                                        <input type="text" value={shippingInfo.zip} onChange={e => setShippingInfo({ ...shippingInfo, zip: e.target.value })} required />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Country</label>
                                        <select value={shippingInfo.country} onChange={e => setShippingInfo({ ...shippingInfo, country: e.target.value })}>
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>United Kingdom</option>
                                        </select>
                                    </div>
                                </div>
                                <button className={styles.continueBtn} onClick={() => setStep(2)}>Continue to Payment</button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className={styles.formCard}>
                                <h2><FiCreditCard /> Payment Method</h2>
                                <div className={styles.paymentOptions}>
                                    <label className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.selected : ''}`}>
                                        <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                                        <FiCreditCard />
                                        <span>Credit/Debit Card</span>
                                    </label>
                                    <label className={`${styles.paymentOption} ${paymentMethod === 'paypal' ? styles.selected : ''}`}>
                                        <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} />
                                        <span>💰</span>
                                        <span>PayPal</span>
                                    </label>
                                </div>

                                {paymentMethod === 'card' && (
                                    <div className={styles.cardForm}>
                                        <div className={styles.formGroupFull}>
                                            <label>Card Number</label>
                                            <input type="text" placeholder="1234 5678 9012 3456" />
                                        </div>
                                        <div className={styles.formGrid}>
                                            <div className={styles.formGroup}>
                                                <label>Expiry Date</label>
                                                <input type="text" placeholder="MM/YY" />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>CVV</label>
                                                <input type="text" placeholder="123" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className={styles.btnGroup}>
                                    <button className={styles.backBtn} onClick={() => setStep(1)}>Back</button>
                                    <button className={styles.continueBtn} onClick={() => setStep(3)}>Review Order</button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className={styles.formCard}>
                                <h2><FiCheck /> Review Order</h2>

                                <div className={styles.reviewSection}>
                                    <h3>Shipping Address</h3>
                                    <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                                    <p>{shippingInfo.address}</p>
                                    <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
                                </div>

                                <div className={styles.reviewSection}>
                                    <h3>Payment</h3>
                                    <p>{paymentMethod === 'card' ? 'Credit/Debit Card' : 'PayPal'}</p>
                                </div>

                                <div className={styles.reviewSection}>
                                    <h3>Items ({cart.length})</h3>
                                    {cart.map(item => (
                                        <div key={item.id} className={styles.reviewItem}>
                                            <img src={item.image} alt={item.name} />
                                            <div>
                                                <p>{item.name}</p>
                                                <p className={styles.itemQty}>Qty: {item.quantity}</p>
                                            </div>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.btnGroup}>
                                    <button className={styles.backBtn} onClick={() => setStep(2)}>Back</button>
                                    <button className={styles.placeOrderBtn} onClick={handleSubmit} disabled={loading}>
                                        <FiLock /> {loading ? 'Processing...' : 'Place Order'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className={styles.summarySection}>
                        <div className={styles.summaryCard}>
                            <h2>Order Summary</h2>
                            <div className={styles.summaryItems}>
                                {cart.map(item => (
                                    <div key={item.id} className={styles.summaryItem}>
                                        <img src={item.image} alt="" />
                                        <div>
                                            <p>{item.name}</p>
                                            <span>x{item.quantity}</span>
                                        </div>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.summaryTotals}>
                                <div className={styles.summaryRow}>
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className={`${styles.summaryRow} ${styles.total}`}>
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
