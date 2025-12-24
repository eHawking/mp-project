'use client'

import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock } from 'react-icons/fi'
import { useToast } from '@/components/Toast'
import styles from './page.module.css'

export default function ContactPage() {
    const { showToast } = useToast()
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        showToast('Message sent successfully! We will get back to you soon.', 'success')
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <div className={styles.contactPage}>
            <div className="container">
                <div className={styles.header}>
                    <h1>Contact Us</h1>
                    <p>Have a question? We&apos;d love to hear from you.</p>
                </div>

                <div className={styles.grid}>
                    {/* Contact Form */}
                    <div className={styles.formCard}>
                        <h2>Send us a message</h2>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label>Your Name</label>
                                    <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                </div>
                                <div className={styles.field}>
                                    <label>Email Address</label>
                                    <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                                </div>
                            </div>
                            <div className={styles.field}>
                                <label>Subject</label>
                                <input type="text" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} required />
                            </div>
                            <div className={styles.field}>
                                <label>Message</label>
                                <textarea rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required />
                            </div>
                            <button type="submit" className={styles.submitBtn}>
                                <FiSend /> Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.infoCard}>
                        <h2>Get in touch</h2>
                        <div className={styles.infoList}>
                            <div className={styles.infoItem}>
                                <FiMapPin />
                                <div>
                                    <h4>Address</h4>
                                    <p>123 Market Street<br />New York, NY 10001</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <FiPhone />
                                <div>
                                    <h4>Phone</h4>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <FiMail />
                                <div>
                                    <h4>Email</h4>
                                    <p>support@mpmarketplace.com</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <FiClock />
                                <div>
                                    <h4>Business Hours</h4>
                                    <p>Mon - Fri: 9AM - 6PM<br />Sat: 10AM - 4PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
