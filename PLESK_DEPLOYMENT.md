# Plesk Obsidian Deployment Guide

## Complete Guide for Deploying MP Marketplace to Plesk

---

## Prerequisites

- Plesk Obsidian 18.0.74 with Node.js extension
- MariaDB 11.4.9 database
- Domain or subdomain configured
- SSH/SFTP access

---

## Step 1: Create Database

### Via Plesk Panel:
1. Go to **Databases** → **Add Database**
2. Set database name: `marketplace`
3. Create database user with password
4. Note down: `database_name`, `username`, `password`

### Connection String Format:
```
mysql://username:password@localhost:3306/marketplace
```

---

## Step 2: Upload Project Files

### Option A: Via File Manager
1. Go to **Files** → your domain's `httpdocs` folder
2. Upload all project files (or zip and extract)

### Option B: Via SFTP
```bash
# Connect via SFTP
sftp username@yourdomain.com

# Upload project folder
put -r "mp project/*" /var/www/vhosts/yourdomain.com/httpdocs/
```

### Option C: Via Git (Recommended)
1. Go to **Git** in Plesk
2. Clone from repository URL
3. Set deployment path to `httpdocs`

---

## Step 3: Configure Node.js Application

1. Go to **Node.js** section in your domain
2. Click **Enable Node.js**
3. Configure settings:

| Setting | Value |
|---------|-------|
| **Node.js Version** | 24.x (or latest available) |
| **Document Root** | `/httpdocs` |
| **Application Mode** | production |
| **Application Startup File** | `node_modules/.bin/next` |

> ⚠️ If Next.js CLI doesn't work, use custom startup (see Step 5)

---

## Step 4: Configure Environment Variables

In Plesk Node.js section, click **NPM** → **Run script** or add to `.env`:

### Create/Edit `.env` file:
```env
# Database
DATABASE_URL="mysql://db_user:db_password@localhost:3306/marketplace"

# NextAuth  
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-a-32-character-random-string"

# Gemini AI
GEMINI_API_KEY="your-gemini-api-key"

# App
NEXT_PUBLIC_APP_NAME="MP Marketplace"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NODE_ENV="production"
```

### Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

---

## Step 5: Install Dependencies & Build

### Via Plesk Terminal or SSH:

```bash
# Navigate to project folder
cd /var/www/vhosts/yourdomain.com/httpdocs

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Build for production
npm run build
```

---

## Step 6: Configure Startup Script

### Create `server.js` in project root:
```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

### Update Plesk Node.js settings:
- **Application Startup File**: `server.js`

---

## Step 7: Restart Application

1. In Plesk → **Node.js**
2. Click **Restart App**

---

## Step 8: Configure Apache/Nginx Proxy

Plesk usually handles this automatically, but verify:

### Nginx (if using):
```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

---

## Step 9: SSL Certificate (HTTPS)

1. Go to **SSL/TLS Certificates**
2. Click **Let's Encrypt**
3. Issue free SSL certificate
4. Enable **Redirect HTTP to HTTPS**

---

## Step 10: Seed Initial Data (Optional)

### Create Admin User:
```bash
# Via SSH or Plesk Terminal
cd /var/www/vhosts/yourdomain.com/httpdocs
npx prisma studio
```

Or create a seed script in `prisma/seed.ts`.

---

## Troubleshooting

### Application Not Starting:
```bash
# Check logs
cat /var/www/vhosts/yourdomain.com/logs/error.log

# Check Node.js logs in Plesk
```

### Database Connection Failed:
- Verify DATABASE_URL is correct
- Check MariaDB is running
- Ensure database user has proper permissions

### 502 Bad Gateway:
- Check if Node.js app is running
- Verify port configuration
- Restart Node.js application

### Build Errors:
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

---

## Maintenance Commands

```bash
# Update dependencies
npm update

# Regenerate Prisma client after schema changes
npx prisma generate
npx prisma db push

# View database
npx prisma studio

# Restart app (via Plesk UI or):
touch tmp/restart.txt
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Build | `npm run build` |
| Start | `npm start` |
| Database push | `npx prisma db push` |
| Database studio | `npx prisma studio` |
| View logs | Plesk → Logs |

---

## Your Deployment Checklist

- [ ] Database created in Plesk
- [ ] Files uploaded to httpdocs
- [ ] Node.js enabled and configured
- [ ] Environment variables set
- [ ] `npm install` completed
- [ ] `npx prisma db push` completed
- [ ] `npm run build` successful
- [ ] Application restarted
- [ ] SSL certificate installed
- [ ] Site accessible via HTTPS
