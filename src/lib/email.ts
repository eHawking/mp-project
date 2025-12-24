import Mailgun from 'mailgun.js'
import formData from 'form-data'
import { prisma } from '@/lib/prisma'

interface EmailOptions {
    to: string | string[]
    subject: string
    html: string
    text?: string
}

interface MailgunSettings {
    mailgunApiKey?: string
    mailgunDomain?: string
    mailgunFromEmail?: string
    mailgunFromName?: string
}

async function getMailgunSettings(): Promise<MailgunSettings> {
    const settings = await prisma.setting.findMany({
        where: {
            key: {
                in: ['mailgunApiKey', 'mailgunDomain', 'mailgunFromEmail', 'mailgunFromName']
            }
        }
    })

    return settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {} as MailgunSettings)
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
    try {
        const settings = await getMailgunSettings()

        if (!settings.mailgunApiKey || !settings.mailgunDomain) {
            console.error('Mailgun not configured')
            return false
        }

        const mailgun = new Mailgun(formData)
        const mg = mailgun.client({
            username: 'api',
            key: settings.mailgunApiKey,
        })

        const fromAddress = settings.mailgunFromName
            ? `${settings.mailgunFromName} <${settings.mailgunFromEmail || `noreply@${settings.mailgunDomain}`}>`
            : settings.mailgunFromEmail || `noreply@${settings.mailgunDomain}`

        await mg.messages.create(settings.mailgunDomain, {
            from: fromAddress,
            to: Array.isArray(options.to) ? options.to : [options.to],
            subject: options.subject,
            html: options.html,
            text: options.text || options.html.replace(/<[^>]*>/g, ''),
        })

        return true
    } catch (error) {
        console.error('Email send error:', error)
        return false
    }
}

// Email Templates
export const emailTemplates = {
    // Welcome email after registration
    welcome: (data: { firstName: string; email: string }) => ({
        subject: 'Welcome to DewDropSkin! 🎉',
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
          .button { display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to DewDropSkin! 🌟</h1>
          </div>
          <div class="content">
            <p>Hi ${data.firstName},</p>
            <p>Thank you for joining DewDropSkin Marketplace! We're thrilled to have you as part of our community.</p>
            <p>Here's what you can do now:</p>
            <ul>
              <li>Browse our amazing collection of products</li>
              <li>Create your wishlist</li>
              <li>Get exclusive deals and offers</li>
            </ul>
            <p style="text-align: center; margin: 30px 0;">
              <a href="https://dewdropskin.com/products" class="button">Start Shopping</a>
            </p>
            <p>If you have any questions, our support team is here to help!</p>
            <p>Happy shopping! 🛍️</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} DewDropSkin Marketplace. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    }),

    // Order confirmation
    orderConfirmation: (data: { firstName: string; orderNumber: string; total: number; items: { name: string; quantity: number; price: number }[] }) => ({
        subject: `Order Confirmed! #${data.orderNumber}`,
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
          .order-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
          .total { font-size: 20px; font-weight: bold; margin-top: 20px; text-align: right; }
          .button { display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmed! ✅</h1>
            <p>Order #${data.orderNumber}</p>
          </div>
          <div class="content">
            <p>Hi ${data.firstName},</p>
            <p>Great news! Your order has been confirmed and is being processed.</p>
            <h3>Order Summary</h3>
            ${data.items.map(item => `
              <div class="order-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            `).join('')}
            <div class="total">Total: $${data.total.toFixed(2)}</div>
            <p style="text-align: center; margin: 30px 0;">
              <a href="https://dewdropskin.com/account/orders" class="button">Track Your Order</a>
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} DewDropSkin Marketplace. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    }),

    // Password reset
    passwordReset: (data: { firstName: string; resetLink: string }) => ({
        subject: 'Reset Your Password',
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
          .button { display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request 🔐</h1>
          </div>
          <div class="content">
            <p>Hi ${data.firstName},</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${data.resetLink}" class="button">Reset Password</a>
            </p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} DewDropSkin Marketplace. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    }),

    // Shipping notification
    orderShipped: (data: { firstName: string; orderNumber: string; trackingNumber: string; carrier: string }) => ({
        subject: `Your Order Has Shipped! 📦 #${data.orderNumber}`,
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
          .tracking-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb; }
          .button { display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Order Has Shipped! 🚚</h1>
          </div>
          <div class="content">
            <p>Hi ${data.firstName},</p>
            <p>Great news! Your order #${data.orderNumber} is on its way!</p>
            <div class="tracking-box">
              <p><strong>Carrier:</strong> ${data.carrier}</p>
              <p><strong>Tracking Number:</strong> ${data.trackingNumber}</p>
            </div>
            <p style="text-align: center; margin: 30px 0;">
              <a href="https://dewdropskin.com/account/orders" class="button">Track Your Package</a>
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} DewDropSkin Marketplace. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    }),
}
