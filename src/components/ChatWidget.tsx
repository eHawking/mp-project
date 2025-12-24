'use client'

import { useState, useRef, useEffect } from 'react'
import { FiMessageCircle, FiX, FiSend, FiUser, FiMic, FiPaperclip, FiImage, FiStopCircle } from 'react-icons/fi'
import styles from './ChatWidget.module.css'

interface Message {
    id: string
    role: 'user' | 'agent'
    content: string
    type: 'text' | 'image' | 'voice'
    mediaUrl?: string
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

// Pre-defined responses
const responses: Record<string, string[]> = {
    greeting: ["Hello! How can I assist you today? 😊", "Hi there! Welcome to DewDropSkin. What can I help you with?"],
    shipping: ["We offer free shipping on orders over $50! Standard delivery takes 3-5 business days."],
    returns: ["We have a hassle-free 30-day return policy. Simply contact us and we'll arrange a return or exchange."],
    payment: ["We accept all major credit cards, PayPal, Easypaisa, JazzCash, and bank transfer."],
    order: ["I'd be happy to help with your order! Could you please provide your order number?"],
    image: ["Thanks for sharing that image! Let me take a look and get back to you."],
    voice: ["I received your voice message. Let me listen and respond shortly."],
    default: ["Thank you for your message! Let me look into that for you.", "I appreciate you reaching out! Could you provide more detail?"],
}

function getResponse(message: string, type: string): string {
    if (type === 'image') return responses.image[0]
    if (type === 'voice') return responses.voice[0]

    const lower = message.toLowerCase()
    if (lower.includes('hi') || lower.includes('hello')) return responses.greeting[Math.floor(Math.random() * responses.greeting.length)]
    if (lower.includes('ship') || lower.includes('delivery')) return responses.shipping[0]
    if (lower.includes('return') || lower.includes('refund')) return responses.returns[0]
    if (lower.includes('pay') || lower.includes('card')) return responses.payment[0]
    if (lower.includes('order') || lower.includes('track')) return responses.order[0]
    return responses.default[Math.floor(Math.random() * responses.default.length)]
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [agent] = useState<Agent>(() => agents[Math.floor(Math.random() * agents.length)])
    const [isConnecting, setIsConnecting] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [recordingTime, setRecordingTime] = useState(0)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const recordingInterval = useRef<NodeJS.Timeout | null>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setIsConnecting(true)
            setTimeout(() => {
                setIsConnecting(false)
                setMessages([{
                    id: '1',
                    role: 'agent',
                    content: `Hi! I'm ${agent.name} from DewDropSkin support. How can I help you today? 😊`,
                    type: 'text',
                }])
            }, 1500)
        }
    }, [isOpen, agent.name])

    const sendMessage = async (content: string, type: 'text' | 'image' | 'voice' = 'text', mediaUrl?: string) => {
        if ((!content.trim() && type === 'text') || isTyping) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: content.trim() || (type === 'image' ? '📷 Image' : '🎤 Voice message'),
            type,
            mediaUrl,
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsTyping(true)

        const typingDelay = 1500 + Math.random() * 2000
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'agent',
                content: getResponse(content, type),
                type: 'text',
            }])
            setIsTyping(false)
        }, typingDelay)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage(input)
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const dataUrl = event.target?.result as string
                sendMessage('', 'image', dataUrl)
            }
            reader.readAsDataURL(file)
        }
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const startRecording = () => {
        setIsRecording(true)
        setRecordingTime(0)
        recordingInterval.current = setInterval(() => {
            setRecordingTime(prev => prev + 1)
        }, 1000)
    }

    const stopRecording = () => {
        setIsRecording(false)
        if (recordingInterval.current) {
            clearInterval(recordingInterval.current)
        }
        // Simulate voice message
        sendMessage(`Voice message (${recordingTime}s)`, 'voice')
        setRecordingTime(0)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
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
                            {msg.type === 'image' && msg.mediaUrl && (
                                <img src={msg.mediaUrl} alt="Shared" className={styles.messageImage} />
                            )}
                            {msg.type === 'voice' && (
                                <div className={styles.voiceMessage}>
                                    <FiMic /> {msg.content}
                                </div>
                            )}
                            {msg.type === 'text' && msg.content}
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
                    {isRecording ? (
                        <div className={styles.recordingBar}>
                            <span className={styles.recordingDot}></span>
                            <span>Recording... {formatTime(recordingTime)}</span>
                            <button onClick={stopRecording} className={styles.stopBtn}>
                                <FiStopCircle /> Stop
                            </button>
                        </div>
                    ) : (
                        <>
                            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileSelect} hidden />
                            <button className={styles.attachBtn} onClick={() => fileInputRef.current?.click()}>
                                <FiImage />
                            </button>
                            <button className={styles.attachBtn} onClick={startRecording}>
                                <FiMic />
                            </button>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                disabled={isTyping || isConnecting}
                            />
                            <button
                                onClick={() => sendMessage(input)}
                                disabled={!input.trim() || isTyping || isConnecting}
                                className={styles.sendBtn}
                            >
                                <FiSend />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
