'use client'

import { useState } from 'react'
import { FiZap, FiRefreshCw, FiCopy, FiCheck, FiEdit3, FiSend, FiHash } from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import styles from './page.module.css'

export default function AIToolsPage() {
    const [activeTab, setActiveTab] = useState<'seo' | 'social'>('seo')
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(false)
    const [seoResult, setSeoResult] = useState<any>(null)
    const [socialResult, setSocialResult] = useState<any>(null)
    const [selectedPlatform, setSelectedPlatform] = useState<'facebook' | 'twitter' | 'instagram'>('facebook')
    const [copied, setCopied] = useState('')

    const generateSEO = async () => {
        if (!productName) return
        setLoading(true)

        // Simulate API call
        setTimeout(() => {
            setSeoResult({
                metaTitle: `${productName} - Premium Quality | DewDropSkin Marketplace`,
                metaDescription: `Discover the ${productName}. ${productDescription || 'High-quality product'} with free shipping and hassle-free returns. Shop now!`,
                metaKeywords: `${productName.toLowerCase()}, ${category || 'products'}, buy online, best deals, premium quality`,
                enhancedDescription: `Introducing the ${productName} - a premium product designed for excellence. ${productDescription || ''} Features premium materials, exceptional craftsmanship, and unmatched quality. Perfect for discerning customers who value both style and substance. Experience the difference with our satisfaction guarantee.`,
                shortDescription: `Premium ${productName} with exceptional quality. ${category ? `Perfect for ${category.toLowerCase()} enthusiasts.` : ''} Shop now for the best deals!`
            })
            setLoading(false)
        }, 1500)
    }

    const generateSocialPost = async () => {
        if (!productName) return
        setLoading(true)

        const posts = {
            facebook: `🎉 NEW ARRIVAL ALERT! 🎉\n\nIntroducing our ${productName}! 🌟\n\n${productDescription || 'Your must-have item of the season!'}\n\n✨ Premium Quality\n🚚 Free Shipping\n💯 Satisfaction Guaranteed\n\n👉 Shop now and get 10% OFF with code: SOCIAL10\n\n#NewArival #ShopNow #${productName.replace(/\s+/g, '')} #DewDropSkin #Sale`,
            twitter: `🚀 Just dropped: ${productName}! ${productDescription || ''}\n\n✅ Premium quality\n✅ Free shipping\n✅ 10% OFF: SOCIAL10\n\nShop now! 🛒\n\n#NewProduct #DewDropSkin`,
            instagram: `✨ Say hello to the ${productName}! ✨\n\n${productDescription || 'The perfect addition to your collection.'}\n\n💎 Premium craftsmanship\n📦 Free shipping worldwide\n🔄 Easy 30-day returns\n\nDouble tap if you love it! ❤️\n\n🛒 Link in bio!\n\n#ProductLaunch #NewIn #${productName.replace(/\s+/g, '')} #ShopNow #Lifestyle #Premium #DewDropSkin #InstaShop #MustHave #TrendingNow`
        }

        setTimeout(() => {
            setSocialResult(posts)
            setLoading(false)
        }, 1500)
    }

    const copyToClipboard = (text: string, key: string) => {
        navigator.clipboard.writeText(text)
        setCopied(key)
        setTimeout(() => setCopied(''), 2000)
    }

    return (
        <div className={styles.aiTools}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerIcon}>
                    <FiZap />
                </div>
                <div>
                    <h1>AI-Powered Tools</h1>
                    <p>Generate SEO content and social media posts with Gemini AI</p>
                </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'seo' ? styles.active : ''}`}
                    onClick={() => setActiveTab('seo')}
                >
                    <FiEdit3 />
                    SEO Generator
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'social' ? styles.active : ''}`}
                    onClick={() => setActiveTab('social')}
                >
                    <FiSend />
                    Social Media Posts
                </button>
            </div>

            <div className={styles.content}>
                {/* Input Form */}
                <div className={styles.inputCard}>
                    <h2>Product Information</h2>
                    <div className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>Product Name *</label>
                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="e.g., Premium Wireless Headphones"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Product Description</label>
                            <textarea
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                placeholder="Brief description of your product..."
                                rows={4}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Category</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="e.g., Electronics"
                            />
                        </div>

                        {activeTab === 'social' && (
                            <div className={styles.platformSelector}>
                                <label>Select Platform</label>
                                <div className={styles.platforms}>
                                    <button
                                        className={`${styles.platform} ${selectedPlatform === 'facebook' ? styles.active : ''}`}
                                        onClick={() => setSelectedPlatform('facebook')}
                                    >
                                        <FaFacebook />
                                        Facebook
                                    </button>
                                    <button
                                        className={`${styles.platform} ${selectedPlatform === 'twitter' ? styles.active : ''}`}
                                        onClick={() => setSelectedPlatform('twitter')}
                                    >
                                        <FaTwitter />
                                        Twitter
                                    </button>
                                    <button
                                        className={`${styles.platform} ${selectedPlatform === 'instagram' ? styles.active : ''}`}
                                        onClick={() => setSelectedPlatform('instagram')}
                                    >
                                        <FaInstagram />
                                        Instagram
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            className={styles.generateBtn}
                            onClick={activeTab === 'seo' ? generateSEO : generateSocialPost}
                            disabled={loading || !productName}
                        >
                            {loading ? (
                                <>
                                    <FiRefreshCw className={styles.spinning} />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <FiZap />
                                    Generate with AI
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div className={styles.resultsCard}>
                    <h2>Generated Content</h2>

                    {activeTab === 'seo' && seoResult ? (
                        <div className={styles.results}>
                            <div className={styles.resultItem}>
                                <div className={styles.resultHeader}>
                                    <span>Meta Title</span>
                                    <button onClick={() => copyToClipboard(seoResult.metaTitle, 'title')}>
                                        {copied === 'title' ? <FiCheck /> : <FiCopy />}
                                    </button>
                                </div>
                                <p>{seoResult.metaTitle}</p>
                            </div>

                            <div className={styles.resultItem}>
                                <div className={styles.resultHeader}>
                                    <span>Meta Description</span>
                                    <button onClick={() => copyToClipboard(seoResult.metaDescription, 'desc')}>
                                        {copied === 'desc' ? <FiCheck /> : <FiCopy />}
                                    </button>
                                </div>
                                <p>{seoResult.metaDescription}</p>
                            </div>

                            <div className={styles.resultItem}>
                                <div className={styles.resultHeader}>
                                    <span>Keywords</span>
                                    <button onClick={() => copyToClipboard(seoResult.metaKeywords, 'keywords')}>
                                        {copied === 'keywords' ? <FiCheck /> : <FiCopy />}
                                    </button>
                                </div>
                                <div className={styles.keywords}>
                                    {seoResult.metaKeywords.split(', ').map((keyword: string) => (
                                        <span key={keyword} className={styles.keyword}>
                                            <FiHash /> {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.resultItem}>
                                <div className={styles.resultHeader}>
                                    <span>Enhanced Description</span>
                                    <button onClick={() => copyToClipboard(seoResult.enhancedDescription, 'enhanced')}>
                                        {copied === 'enhanced' ? <FiCheck /> : <FiCopy />}
                                    </button>
                                </div>
                                <p>{seoResult.enhancedDescription}</p>
                            </div>
                        </div>
                    ) : activeTab === 'social' && socialResult ? (
                        <div className={styles.results}>
                            {Object.entries(socialResult).map(([platform, content]) => (
                                <div key={platform} className={`${styles.socialPost} ${styles[platform]}`}>
                                    <div className={styles.socialHeader}>
                                        {platform === 'facebook' && <FaFacebook />}
                                        {platform === 'twitter' && <FaTwitter />}
                                        {platform === 'instagram' && <FaInstagram />}
                                        <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                                        <button onClick={() => copyToClipboard(content as string, platform)}>
                                            {copied === platform ? <FiCheck /> : <FiCopy />}
                                        </button>
                                    </div>
                                    <pre className={styles.socialContent}>{content as string}</pre>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.placeholder}>
                            <FiZap className={styles.placeholderIcon} />
                            <p>Enter product details and click generate to see AI-powered content</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
