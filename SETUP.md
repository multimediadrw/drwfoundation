# Local Development Setup Guide

## Prerequisites

- Node.js 18+ installed
- Docker Desktop running (for MinIO CDN)
- Git installed

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/multimediadrw/drwfoundation.git
cd drwfoundation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` if needed (default values work for local development).

### 4. Start MinIO (Optional - for local CDN)

If you want to serve images locally instead of using production CDN:

```bash
# Pull MinIO image
docker pull minio/minio:latest

# Create data directory
mkdir -p ~/minio-data

# Run MinIO
docker run -d \
  --name drw-minio-local \
  -p 9100:9000 \
  -p 9101:9001 \
  -e "MINIO_ROOT_USER=drwcorp" \
  -e "MINIO_ROOT_PASSWORD=Rahasiakita.88" \
  -v ~/minio-data:/data \
  minio/minio:latest \
  server /data --console-address ":9001"

# Install MinIO client
wget https://dl.min.io/client/mc/release/linux-amd64/mc -O /usr/local/bin/mc
chmod +x /usr/local/bin/mc

# Configure MinIO client
mc alias set local http://localhost:9100 drwcorp Rahasiakita.88

# Create bucket
mc mb local/drwfoundation

# Set public read policy
mc anonymous set download local/drwfoundation

# Upload images (if you have them)
mc cp --recursive public/images/ local/drwfoundation/images/
```

**Note**: By default, the app uses production CDN (`https://cdn.drwskincare.com/drwfoundation`). You only need to run MinIO locally if you're testing image uploads or want offline development.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
drwfoundation/
├── app/                    # Next.js 13+ App Router
│   ├── page.tsx           # Homepage
│   ├── posts/[slug]/      # Blog post pages
│   ├── tentang/           # About page
│   ├── program/           # Programs pages
│   ├── berita/            # News listing
│   └── laporan/           # Reports page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Footer
├── content/              # Markdown content
│   ├── posts/            # Blog posts (85 files)
│   └── pages/            # Static pages (8 files)
├── lib/                  # Utilities
│   ├── posts.ts          # Post fetching functions
│   └── pages.ts          # Page fetching functions
├── public/              # Static assets
│   └── images/          # Downloaded images (47MB, 233 files)
└── .env.local           # Local environment variables
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

### Required for Development

```env
# Public CDN URL for images
NEXT_PUBLIC_CDN_URL=https://cdn.drwskincare.com/drwfoundation
```

### Optional (MinIO Local Development)

```env
MINIO_ENDPOINT=localhost
MINIO_PORT=9100
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=drwcorp
MINIO_SECRET_KEY=Rahasiakita.88
MINIO_BUCKET=drwfoundation
```

### Optional (Database - if you want to connect to WordPress backup)

```env
DB_HOST=localhost
DB_PORT=3310
DB_USER=drwfoundation
DB_PASSWORD=drw123456
DB_NAME=drwfoundation
```

## Production Deployment (Vercel)

The site automatically deploys to Vercel when you push to `main` branch.

### Vercel Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

```env
NEXT_PUBLIC_CDN_URL=https://cdn.drwskincare.com/drwfoundation
```

## MinIO CDN Setup (Production)

Images are served from MinIO at `https://cdn.drwskincare.com/drwfoundation/images/`.

To access MinIO console:
- URL: https://cdn.drwskincare.com (or http://localhost:9101 for local)
- Username: drwcorp
- Password: Rahasiakita.88

## Troubleshooting

### Images not loading

1. Check if CDN URL is correct in `.env.local`
2. Verify MinIO is running: `docker ps | grep minio`
3. Test MinIO access: `curl -I http://localhost:9100/drwfoundation/images/2024/12/Logo.png`

### Build fails

1. Clear Next.js cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`
3. Check Node.js version: `node -v` (should be 18+)

### Port already in use

If port 3000 is busy:
```bash
npm run dev -- -p 3001
```

## Content Management

### Adding New Posts

1. Create a new `.md` file in `content/posts/`
2. Add frontmatter:
```yaml
---
title: "Your Post Title"
date: "2026-01-20"
slug: "your-post-slug"
excerpt: "Short description"
author: "Author Name"
---
```
3. Write content in Markdown
4. Images: Use CDN URL format `![Alt text](https://cdn.drwskincare.com/drwfoundation/images/2024/12/image.jpg)`

### Updating Pages

Static pages are in `content/pages/`. Edit them directly.

## Support

For issues or questions:
- GitHub Issues: https://github.com/multimediadrw/drwfoundation/issues
- Email: admin@drwskincare.com

## License

Copyright © 2026 DRW Foundation
