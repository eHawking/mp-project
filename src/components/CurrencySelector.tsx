'use client'

import { useState, useRef, useEffect } from 'react'
import { FiGlobe, FiChevronDown } from 'react-icons/fi'
import { useCurrency } from './CurrencyProvider'
import styles from './CurrencySelector.module.css'

export default function CurrencySelector() {
    const { currency, currencies, setCurrency } = useCurrency()
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className={styles.currencySelector} ref={ref}>
            <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
                <FiGlobe />
                <span>{currency.code}</span>
                <FiChevronDown className={isOpen ? styles.rotated : ''} />
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    {currencies.map((c) => (
                        <button
                            key={c.code}
                            className={`${styles.option} ${c.code === currency.code ? styles.active : ''}`}
                            onClick={() => { setCurrency(c.code); setIsOpen(false) }}
                        >
                            <span className={styles.symbol}>{c.symbol}</span>
                            <span className={styles.code}>{c.code}</span>
                            <span className={styles.name}>{c.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
