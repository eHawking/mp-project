# MP Marketplace - Premium Multi-Vendor eCommerce CMS

A full-featured multi-vendor marketplace built with Next.js 15, featuring AI-powered SEO and social media automation.

## 🚀 Features

### Customer Storefront
- Premium responsive design with dark/light mode
- Product browsing with filters and search
- Shopping cart and wishlist
- Order tracking
- User account management

### Seller Panel
- Dashboard with sales analytics
- Product management (CRUD)
- Order management
- AI-powered SEO generator
- Social media post generator
- Payout tracking

### Admin Panel
- Platform-wide analytics
- Vendor approval system
- Product moderation
- User management
- CMS pages and banners
- Commission settings

### AI Features (Gemini API)
- Auto SEO meta generation
- Product description enhancement
- Social media post generation (Facebook, Twitter, Instagram)
- Auto-posting capabilities

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** MariaDB 11.4.9 with Prisma ORM
- **Auth:** NextAuth.js with JWT
- **AI:** Google Gemini API
- **Styling:** CSS with Premium Design System
- **Hosting:** Plesk Obsidian

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   # Copy example env file
   cp .env.example .env
   
   # Edit .env with your credentials
   ```

3. **Set up database:**
   ```bash
   # Push schema to database
   npx prisma db push
   
   # Generate Prisma client
   npx prisma generate
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/marketplace"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Gemini AI
GEMINI_API_KEY="your-gemini-api-key"

# Social APIs (optional)
FACEBOOK_PAGE_ACCESS_TOKEN=""
TWITTER_API_KEY=""
INSTAGRAM_ACCESS_TOKEN=""
```

## 📁 Project Structure

```
src/
├── app/
│   ├── (storefront)/     # Customer pages
│   ├── (auth)/           # Login/Register
│   ├── admin/            # Admin panel
│   ├── seller/           # Seller dashboard
│   └── api/              # API routes
├── components/
│   ├── ui/               # UI components
│   ├── storefront/       # Customer components
│   ├── admin/            # Admin components
│   └── seller/           # Seller components
├── lib/
│   ├── db.ts             # Database
│   ├── auth.ts           # Auth config
│   ├── gemini.ts         # AI integration
│   └── utils.ts          # Utilities
└── prisma/
    └── schema.prisma     # Database schema
```

## 🚀 Deployment to Plesk

1. Create a Node.js application in Plesk
2. Set Node.js version to 24.x
3. Configure environment variables in Plesk
4. Upload project files
5. Run `npm install && npm run build`
6. Set startup file to `npm start`

## 📝 License

MIT License - Feel free to use this for your projects!
