'use client'

import { useState, useRef, useEffect } from 'react'
import { FiMessageCircle, FiX, FiSend, FiUser } from 'react-icons/fi'
import styles from './ChatWidget.module.css'

interface Message {
    id: string
    role: 'user' | 'agent'
    content: string
}

interface Agent {
    name: string
    avatar: string
    role: string
}

// Real support agents
const agents: Agent[] = [
    { name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', role: 'Customer Support' },
    { name: 'Michael Chen', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', role: 'Sales Specialist' },
    { name: 'Emily Rodriguez', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', role: 'Product Expert' },
    { name: 'David Kim', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', role: 'Support Agent' },
    { name: 'Jessica Williams', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', role: 'Customer Care' },
]

// Pre-defined responses for common queries
const responses: Record<string, string[]> = {
    greeting: [
        "Hello! How can I assist you today? 😊",
        "Hi there! Welcome to DewDropSkin. What can I help you with?",
        "Hey! Great to have you here. How may I help you today?",
    ],
    shipping: [
        "We offer free shipping on orders over $50! Standard delivery takes 3-5 business days, and express shipping is available for 1-2 day delivery.",
        "Shipping is free for orders above $50. You can expect your package within 3-5 business days with standard shipping.",
    ],
    returns: [
        "We have a hassle-free 30-day return policy. If you're not satisfied with your purchase, simply contact us and we'll arrange a return or exchange.",
        "Returns are easy! You have 30 days to return any item for a full refund. Just make sure the item is unused and in original packaging.",
    ],
    payment: [
        "We accept all major credit cards, PayPal, and Apple Pay. All transactions are secured with SSL encryption.",
        "You can pay using Visa, Mastercard, PayPal, or Apple Pay. Your payment information is always secure with us.",
    ],
    order: [
        "I'd be happy to help with your order! Could you please provide your order number so I can look it up?",
        "Sure, I can help you track your order. Do you have your order confirmation number handy?",
    ],
    default: [
        "Thank you for your message! Let me look into that for you. Is there anything specific I can help clarify?",
        "I appreciate you reaching out! Could you provide a bit more detail about what you're looking for?",
        "Thanks for contacting us! I'm here to help. Could you tell me more about what you need assistance with?",
        "Great question! Let me check on that for you. In the meantime, is there anything else I can help with?",
    ],
}

function getResponse(message: string): string {
    const lower = message.toLowerCase()

    if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
        return responses.greeting[Math.floor(Math.random() * responses.greeting.length)]
    }
    if (lower.includes('ship') || lower.includes('delivery') || lower.includes('deliver')) {
        return responses.shipping[Math.floor(Math.random() * responses.shipping.length)]
    }
    if (lower.includes('return') || lower.includes('refund') || lower.includes('exchange')) {
        return responses.returns[Math.floor(Math.random() * responses.returns.length)]
    }
    if (lower.includes('pay') || lower.includes('card') || lower.includes('payment')) {
        return responses.payment[Math.floor(Math.random() * responses.payment.length)]
    }
    if (lower.includes('order') || lower.includes('track') || lower.includes('status')) {
        return responses.order[Math.floor(Math.random() * responses.order.length)]
    }
    return responses.default[Math.floor(Math.random() * responses.default.length)]
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [agent] = useState<Agent>(() => agents[Math.floor(Math.random() * agents.length)])
    const [isConnecting, setIsConnecting] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Simulate connecting to agent
            setIsConnecting(true)
            setTimeout(() => {
                setIsConnecting(false)
                setMessages([{
                    id: '1',
                    role: 'agent',
                    content: `Hi! I'm ${agent.name} from DewDropSkin support. How can I help you today? 😊`
                }])
            }, 1500) // Realistic connection delay
        }
    }, [isOpen, agent.name])

    const sendMessage = async () => {
        if (!input.trim() || isTyping) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')

        // Simulate agent typing with realistic delay
        setIsTyping(true)
        const typingDelay = 1500 + Math.random() * 2000 // 1.5-3.5 seconds

        setTimeout(() => {
            const response = getResponse(userMessage.content)
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'agent',
                content: response,
            }])
            setIsTyping(false)
        }, typingDelay)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <>
            {/* Chat Button */}
            <button
                className={`${styles.chatButton} ${isOpen ? styles.hidden : ''}`}
                onClick={() => setIsOpen(true)}
                aria-label="Chat with support"
            >
                <FiMessageCircle />
            </button>

            {/* Chat Window */}
            <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerInfo}>
                        <img src={agent.avatar} alt={agent.name} className={styles.agentAvatar} />
                        <div>
                            <h3>{agent.name}</h3>
                            <span className={styles.status}>● {agent.role}</span>
                        </div>
                    </div>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                        <FiX />
                    </button>
                </div>

                {/* Messages */}
                <div className={styles.messages}>
                    {isConnecting && (
                        <div className={styles.connecting}>
                            <span>Connecting you to {agent.name}...</span>
                        </div>
                    )}
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.assistant}`}
                        >
                            {msg.content}
                        </div>
                    ))}
                    {isTyping && (
                        <div className={`${styles.message} ${styles.assistant}`}>
                            <span className={styles.typing}>
                                <span></span><span></span><span></span>
                            </span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className={styles.inputArea}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        disabled={isTyping || isConnecting}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || isTyping || isConnecting}
                        className={styles.sendBtn}
                    >
                        <FiSend />
                    </button>
                </div>
            </div>
        </>
    )
}
