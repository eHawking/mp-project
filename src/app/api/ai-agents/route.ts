import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET /api/ai-agents - Get all agents
export async function GET() {
    try {
        const agents = await prisma.aIAgent.findMany({
            orderBy: { sortOrder: 'asc' },
        })
        return NextResponse.json(agents)
    } catch (error) {
        console.error('Error fetching agents:', error)
        return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 })
    }
}

// POST /api/ai-agents - Create or update agent (Admin only)
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const data = await req.json()

        if (data.id) {
            // Update existing
            const agent = await prisma.aIAgent.update({
                where: { id: data.id },
                data: {
                    name: data.name,
                    role: data.role,
                    avatar: data.avatar,
                    personality: data.personality,
                    isActive: data.isActive,
                    sortOrder: data.sortOrder,
                },
            })
            return NextResponse.json(agent)
        } else {
            // Create new
            const agent = await prisma.aIAgent.create({
                data: {
                    name: data.name,
                    role: data.role,
                    avatar: data.avatar,
                    personality: data.personality,
                    isActive: data.isActive ?? true,
                    sortOrder: data.sortOrder ?? 0,
                },
            })
            return NextResponse.json(agent)
        }
    } catch (error) {
        console.error('Error saving agent:', error)
        return NextResponse.json({ error: 'Failed to save agent' }, { status: 500 })
    }
}

// DELETE /api/ai-agents - Delete agent
export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Agent ID required' }, { status: 400 })
        }

        await prisma.aIAgent.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting agent:', error)
        return NextResponse.json({ error: 'Failed to delete agent' }, { status: 500 })
    }
}
