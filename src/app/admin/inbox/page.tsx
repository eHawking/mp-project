'use client'

import { useState, useEffect } from 'react'
import { FiMessageCircle, FiUser, FiClock, FiSearch, FiRefreshCw } from 'react-icons/fi'
import styles from './page.module.css'

interface ChatMessage {
    id: string
    visitorName: string
    email: string
    lastMessage: string
    timestamp: string
    unread: number
    messages: { role: 'user' | 'agent', content: string, time: string }[]
}

// Mock chat data - in production this would come from a database
const mockChats: ChatMessage[] = [
    {
        id: '1',
        visitorName: 'John Smith',
        email: 'john@example.com',
        lastMessage: 'Thank you for the help!',
        timestamp: '5 min ago',
        unread: 0,
        messages: [
            { role: 'agent', content: 'Hi! How can I help you today?', time: '10:30 AM' },
            { role: 'user', content: 'I have a question about shipping', time: '10:31 AM' },
            { role: 'agent', content: 'We offer free shipping on orders over $50!', time: '10:32 AM' },
            { role: 'user', content: 'Thank you for the help!', time: '10:33 AM' },
        ]
    },
    {
        id: '2',
        visitorName: 'Emily Johnson',
        email: 'emily@example.com',
        lastMessage: 'When will my order arrive?',
        timestamp: '15 min ago',
        unread: 1,
        messages: [
            { role: 'agent', content: 'Hello! Welcome to DewDropSkin.', time: '10:15 AM' },
            { role: 'user', content: 'When will my order arrive?', time: '10:20 AM' },
        ]
    },
    {
        id: '3',
        visitorName: 'Michael Chen',
        email: 'michael@example.com',
        lastMessage: 'Is this product available in blue?',
        timestamp: '1 hour ago',
        unread: 2,
        messages: [
            { role: 'user', content: 'Hi, I have a question', time: '9:30 AM' },
            { role: 'agent', content: 'Hello! How can I assist you?', time: '9:31 AM' },
            { role: 'user', content: 'Is this product available in blue?', time: '9:32 AM' },
        ]
    },
]

export default function InboxPage() {
    const [chats, setChats] = useState<ChatMessage[]>(mockChats)
    const [selectedChat, setSelectedChat] = useState<ChatMessage | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [reply, setReply] = useState('')

    const filteredChats = chats.filter(chat =>
        chat.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const sendReply = () => {
        if (!reply.trim() || !selectedChat) return

        const updatedChats = chats.map(chat => {
            if (chat.id === selectedChat.id) {
                return {
                    ...chat,
                    messages: [...chat.messages, { role: 'agent' as const, content: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }],
                    lastMessage: reply,
                    timestamp: 'Just now',
                }
            }
            return chat
        })

        setChats(updatedChats)
        setSelectedChat(updatedChats.find(c => c.id === selectedChat.id) || null)
        setReply('')
    }

    return (
        <div className={styles.inboxPage}>
            <div className={styles.header}>
                <h1><FiMessageCircle /> Customer Inbox</h1>
                <p>View and respond to customer chat messages</p>
            </div>

            <div className={styles.inboxLayout}>
                {/* Chat List */}
                <div className={styles.chatList}>
                    <div className={styles.searchBar}>
                        <FiSearch />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className={styles.chats}>
                        {filteredChats.length === 0 ? (
                            <div className={styles.empty}>
                                <FiMessageCircle />
                                <p>No conversations yet</p>
                            </div>
                        ) : (
                            filteredChats.map(chat => (
                                <div
                                    key={chat.id}
                                    className={`${styles.chatItem} ${selectedChat?.id === chat.id ? styles.active : ''} ${chat.unread > 0 ? styles.unread : ''}`}
                                    onClick={() => setSelectedChat(chat)}
                                >
                                    <div className={styles.chatAvatar}>
                                        <FiUser />
                                    </div>
                                    <div className={styles.chatInfo}>
                                        <div className={styles.chatHeader}>
                                            <span className={styles.chatName}>{chat.visitorName}</span>
                                            <span className={styles.chatTime}>{chat.timestamp}</span>
                                        </div>
                                        <p className={styles.chatPreview}>{chat.lastMessage}</p>
                                    </div>
                                    {chat.unread > 0 && (
                                        <span className={styles.unreadBadge}>{chat.unread}</span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat View */}
                <div className={styles.chatView}>
                    {selectedChat ? (
                        <>
                            <div className={styles.chatViewHeader}>
                                <div className={styles.chatViewInfo}>
                                    <div className={styles.chatAvatar}><FiUser /></div>
                                    <div>
                                        <h3>{selectedChat.visitorName}</h3>
                                        <span>{selectedChat.email}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.messages}>
                                {selectedChat.messages.map((msg, i) => (
                                    <div key={i} className={`${styles.message} ${styles[msg.role]}`}>
                                        <p>{msg.content}</p>
                                        <span className={styles.messageTime}>{msg.time}</span>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.replyArea}>
                                <input
                                    type="text"
                                    placeholder="Type your reply..."
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendReply()}
                                />
                                <button onClick={sendReply} disabled={!reply.trim()}>Send</button>
                            </div>
                        </>
                    ) : (
                        <div className={styles.noChat}>
                            <FiMessageCircle />
                            <h3>Select a conversation</h3>
                            <p>Choose a chat from the list to view and respond</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
