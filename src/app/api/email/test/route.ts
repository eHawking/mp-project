import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(req: Request) {
    try {
        const { email } = await req.json()

        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 })
        }

        const success = await sendEmail({
            to: email,
            subject: 'Test Email from DewDropSkin',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Test Email ✅</h1>
            </div>
            <div class="content">
              <p>Congratulations! 🎉</p>
              <p>Your Mailgun email configuration is working correctly.</p>
              <p>This test email was sent at: ${new Date().toLocaleString()}</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} DewDropSkin Marketplace</p>
            </div>
          </div>
        </body>
        </html>
      `,
        })

        if (success) {
            return NextResponse.json({ success: true })
        } else {
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
        }
    } catch (error) {
        console.error('Test email error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
