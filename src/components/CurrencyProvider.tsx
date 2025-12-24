'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Currency {
    code: string
    symbol: string
    name: string
    rate: number
}

const currencies: Currency[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
    { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
    { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.36 },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.53 },
    { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee', rate: 278.50 },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.12 },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 3.67 },
]

interface CurrencyContextType {
    currency: Currency
    currencies: Currency[]
    setCurrency: (code: string) => void
    formatPrice: (price: number) => string
    convertPrice: (priceInUSD: number) => number
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrencyState] = useState<Currency>(currencies[0])

    useEffect(() => {
        const saved = localStorage.getItem('currency')
        if (saved) {
            const found = currencies.find(c => c.code === saved)
            if (found) setCurrencyState(found)
        }
    }, [])

    const setCurrency = (code: string) => {
        const found = currencies.find(c => c.code === code)
        if (found) {
            setCurrencyState(found)
            localStorage.setItem('currency', code)
        }
    }

    const convertPrice = (priceInUSD: number): number => {
        return priceInUSD * currency.rate
    }

    const formatPrice = (priceInUSD: number): string => {
        const converted = convertPrice(priceInUSD)
        return `${currency.symbol}${converted.toFixed(2)}`
    }

    return (
        <CurrencyContext.Provider value={{ currency, currencies, setCurrency, formatPrice, convertPrice }}>
            {children}
        </CurrencyContext.Provider>
    )
}

export function useCurrency() {
    const context = useContext(CurrencyContext)
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider')
    }
    return context
}
