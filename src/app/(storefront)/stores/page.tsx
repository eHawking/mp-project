import Link from 'next/link'
import { FiStar, FiMapPin, FiPackage } from 'react-icons/fi'
import styles from './page.module.css'

// Mock stores data
const stores = [
    {
        id: '1',
        name: 'TechStore',
        slug: 'techstore',
        description: 'Premium electronics and gadgets for tech enthusiasts',
        logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=200',
        banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
        rating: 4.9,
        reviewCount: 1250,
        productCount: 156,
        location: 'New York, USA'
    },
    {
        id: '2',
        name: 'Fashion Hub',
        slug: 'fashionhub',
        description: 'Trendy fashion and accessories for all styles',
        logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200',
        banner: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600',
        rating: 4.7,
        reviewCount: 892,
        productCount: 234,
        location: 'Los Angeles, USA'
    },
    {
        id: '3',
        name: 'Home Essentials',
        slug: 'homeessentials',
        description: 'Everything you need for a beautiful home',
        logo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200',
        banner: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600',
        rating: 4.8,
        reviewCount: 567,
        productCount: 189,
        location: 'Chicago, USA'
    },
    {
        id: '4',
        name: 'Sports World',
        slug: 'sportsworld',
        description: 'Sports gear and fitness equipment',
        logo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200',
        banner: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
        rating: 4.6,
        reviewCount: 423,
        productCount: 98,
        location: 'Miami, USA'
    },
]

export default function StoresPage() {
    return (
        <div className={styles.storesPage}>
            <div className="container">
                <div className={styles.header}>
                    <h1>Explore Stores</h1>
                    <p>Discover trusted sellers and their unique collections</p>
                </div>

                <div className={styles.grid}>
                    {stores.map((store) => (
                        <Link key={store.id} href={`/store/${store.slug}`} className={styles.storeCard}>
                            <div className={styles.banner}>
                                <img src={store.banner} alt="" />
                                <div className={styles.logo}>
                                    <img src={store.logo} alt={store.name} />
                                </div>
                            </div>
                            <div className={styles.info}>
                                <h2>{store.name}</h2>
                                <p className={styles.description}>{store.description}</p>
                                <div className={styles.stats}>
                                    <span className={styles.rating}>
                                        <FiStar /> {store.rating} ({store.reviewCount})
                                    </span>
                                    <span className={styles.products}>
                                        <FiPackage /> {store.productCount} products
                                    </span>
                                </div>
                                <span className={styles.location}>
                                    <FiMapPin /> {store.location}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
