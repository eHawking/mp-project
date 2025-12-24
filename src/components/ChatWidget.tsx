'use client'

import { useState, useRef, useEffect } from 'react'
import { FiMessageCircle, FiX, FiSend, FiUser } from 'react-icons/fi'
import styles from './ChatWidget.module.css'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
}

interface Agent {
    name: string
    avatar?: string
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [agent, setAgent] = useState<Agent | null>(null)
    const [sessionId] = useState(() => `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Initial greeting
            setMessages([{
                id: '1',
                role: 'assistant',
                content: 'Hi! 👋 Welcome to DewDropSkin Marketplace. How can I help you today?'
            }])
        }
    }, [isOpen])

    const sendMessage = async () => {
        if (!input.trim() || loading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setLoading(true)

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    message: userMessage.content,
                }),
            })

            const data = await res.json()

            if (data.agent) {
                setAgent(data.agent)
            }

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.reply || 'Sorry, I could not process that request.',
            }])
        } catch (error) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, something went wrong. Please try again.',
            }])
        } finally {
            setLoading(false)
        }
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
                aria-label="Open chat"
            >
                <FiMessageCircle />
            </button>

            {/* Chat Window */}
            <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerInfo}>
                        {agent?.avatar ? (
                            <img src={agent.avatar} alt="" className={styles.agentAvatar} />
                        ) : (
                            <div className={styles.agentAvatarPlaceholder}>
                                <FiUser />
                            </div>
                        )}
                        <div>
                            <h3>{agent?.name || 'Support Agent'}</h3>
                            <span className={styles.status}>● Online</span>
                        </div>
                    </div>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                        <FiX />
                    </button>
                </div>

                {/* Messages */}
                <div className={styles.messages}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`${styles.message} ${styles[msg.role]}`}
                        >
                            {msg.content}
                        </div>
                    ))}
                    {loading && (
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
                        disabled={loading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || loading}
                        className={styles.sendBtn}
                    >
                        <FiSend />
                    </button>
                </div>
            </div>
        </>
    )
}
