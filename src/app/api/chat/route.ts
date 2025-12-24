import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { GoogleGenerativeAI } from '@google/generative-ai'

// POST /api/chat - Send message to AI
export async function POST(req: NextRequest) {
    try {
        const { sessionId, message, agentId } = await req.json()

        if (!sessionId || !message) {
            return NextResponse.json({ error: 'Session ID and message required' }, { status: 400 })
        }

        // Get API key from settings
        const apiKeySetting = await prisma.setting.findUnique({
            where: { key: 'geminiApiKey' },
        })

        if (!apiKeySetting?.value) {
            return NextResponse.json({
                reply: "I'm sorry, the AI support is currently unavailable. Please try again later or contact us directly.",
                error: 'API key not configured'
            })
        }

        // Get or create chat session
        let session = await prisma.chatSession.findUnique({
            where: { sessionId },
            include: { agent: true, messages: { orderBy: { createdAt: 'asc' }, take: 20 } },
        })

        if (!session) {
            // Assign random active agent
            const agents = await prisma.aIAgent.findMany({ where: { isActive: true } })
            const randomAgent = agents.length > 0 ? agents[Math.floor(Math.random() * agents.length)] : null

            session = await prisma.chatSession.create({
                data: {
                    sessionId,
                    agentId: agentId || randomAgent?.id,
                },
                include: { agent: true, messages: true },
            })
        }

        // Save user message
        await prisma.chatMessage.create({
            data: {
                sessionId: session.id,
                role: 'user',
                content: message,
            },
        })

        // Build conversation history for AI
        const conversationHistory = session.messages.map(m => ({
            role: m.role as 'user' | 'model',
            parts: [{ text: m.content }],
        }))

        // Get AI settings
        const settings = await prisma.setting.findMany()
        const settingsObj: Record<string, string> = {}
        settings.forEach(s => { settingsObj[s.key] = s.value })

        // Build system prompt
        const agentName = session.agent?.name || 'Support Agent'
        const agentRole = session.agent?.role || 'Customer Support'
        const agentPersonality = session.agent?.personality || 'friendly and helpful'

        const systemPrompt = `You are ${agentName}, a ${agentRole} for DewDropSkin Marketplace, an online multi-vendor shopping platform.
Your personality: ${agentPersonality}
Website: ${settingsObj.siteUrl || 'https://dewdropskin.com'}
Support email: ${settingsObj.supportEmail || 'support@mpmarketplace.com'}

Guidelines:
- Be helpful, friendly, and professional
- Keep responses concise (2-3 sentences max unless explaining something complex)
- Help with: orders, products, shipping, returns, account issues
- If you don't know something specific, suggest contacting support email
- Never share personal data or make up order numbers
- Use emojis sparingly to be friendly 😊`

        // Call Gemini API
        const genAI = new GoogleGenerativeAI(apiKeySetting.value)
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

        const chat = model.startChat({
            history: [
                { role: 'user', parts: [{ text: systemPrompt }] },
                { role: 'model', parts: [{ text: `Hi! I'm ${agentName}, your ${agentRole}. How can I help you today? 😊` }] },
                ...conversationHistory,
            ],
        })

        const result = await chat.sendMessage(message)
        const reply = result.response.text()

        // Save AI response
        await prisma.chatMessage.create({
            data: {
                sessionId: session.id,
                role: 'assistant',
                content: reply,
            },
        })

        return NextResponse.json({
            reply,
            agent: {
                name: agentName,
                avatar: session.agent?.avatar,
            },
        })
    } catch (error) {
        console.error('Chat error:', error)
        return NextResponse.json({
            reply: "I'm having trouble processing your request. Please try again in a moment.",
            error: 'AI processing error',
        })
    }
}
