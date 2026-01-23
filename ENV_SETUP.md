# 🔧 Environment Variables Setup

This project uses environment variables to switch between local development and production.

## Quick Setup

### 1. Copy Environment Template
```bash
cp .env.example .env.local
```

### 2. Configure Based on Your Environment

#### Option A: Using Production CDN (Recommended for Development)
**Easiest option** - no local MinIO needed, images load from production:

```env
# .env.local
NEXT_PUBLIC_CDN_URL=https://cdn.drwskincare.com/drwfoundation
```

#### Option B: Using Local MinIO
If you need to test image uploads or work offline:

```env
# .env.local
NEXT_PUBLIC_CDN_URL=http://localhost:9100/drwfoundation

# MinIO credentials (for upload operations)
MINIO_ENDPOINT=localhost
MINIO_PORT=9100
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=drwcorp
MINIO_SECRET_KEY=Rahasiakita.88
MINIO_BUCKET=drwfoundation
```

Then run MinIO locally:
```bash
docker run -d \
  --name drw-minio-local \
  -p 9100:9000 \
  -p 9101:9001 \
  -e MINIO_ROOT_USER=drwcorp \
  -e MINIO_ROOT_PASSWORD=Rahasiakita.88 \
  -v ~/minio-data:/data \
  minio/minio server /data --console-address ":9001"
```

## Environment Variables Explained

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_CDN_URL` | CDN base URL for images | `https://cdn.drwskincare.com/drwfoundation` |

### Optional (for MinIO operations)

| Variable | Description | Default |
|----------|-------------|---------|
| `MINIO_ENDPOINT` | MinIO server hostname | `localhost` |
| `MINIO_PORT` | MinIO API port | `9100` |
| `MINIO_USE_SSL` | Use HTTPS for MinIO | `false` |
| `MINIO_ACCESS_KEY` | MinIO access key | `drwcorp` |
| `MINIO_SECRET_KEY` | MinIO secret key | `Rahasiakita.88` |
| `MINIO_BUCKET` | Bucket name | `drwfoundation` |

### Database (Optional - for future features)

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `3310` |
| `DB_USER` | Database user | `drwfoundation` |
| `DB_PASSWORD` | Database password | - |
| `DB_NAME` | Database name | `drwfoundation` |

## How Images Work

All markdown files use **relative paths**:
```markdown
![Logo](images/2024/12/Logo.png)
```

At runtime, the app automatically converts these to full CDN URLs based on `NEXT_PUBLIC_CDN_URL`:

**Development (local MinIO):**
```
images/2024/12/Logo.png → http://localhost:9100/drwfoundation/images/2024/12/Logo.png
```

**Production (CDN):**
```
images/2024/12/Logo.png → https://cdn.drwskincare.com/drwfoundation/images/2024/12/Logo.png
```

## Switching Environments

### On Your Local PC

**Using Production CDN** (no setup needed):
```bash
# .env.local
NEXT_PUBLIC_CDN_URL=https://cdn.drwskincare.com/drwfoundation
```

**Using Local MinIO** (for testing uploads):
```bash
# .env.local
NEXT_PUBLIC_CDN_URL=http://localhost:9100/drwfoundation
```

Just change the value and restart dev server:
```bash
npm run dev
```

### On Vercel (Production)

Set in Vercel dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_CDN_URL=https://cdn.drwskincare.com/drwfoundation
```

Vercel will automatically use this for production builds.

## Testing Your Setup

After configuring `.env.local`:

```bash
# Start dev server
npm run dev

# Open browser
http://localhost:3000

# Check DevTools → Network → Images
# URL should match your NEXT_PUBLIC_CDN_URL
```

## Troubleshooting

### Images not loading?

1. **Check environment variable:**
   ```bash
   echo $NEXT_PUBLIC_CDN_URL  # Should show your CDN URL
   ```

2. **Restart dev server:**
   ```bash
   # Kill and restart
   npm run dev
   ```

3. **Check CDN accessibility:**
   ```bash
   # For production CDN
   curl -I https://cdn.drwskincare.com/drwfoundation/images/2024/12/Logo.png
   
   # For local MinIO
   curl -I http://localhost:9100/drwfoundation/images/2024/12/Logo.png
   ```

### MinIO not running locally?

```bash
# Check if container exists
docker ps -a | grep minio

# Start existing container
docker start drw-minio-local

# Or create new one (see Option B above)
```

## Production Deployment

For Vercel deployment, set environment variable in dashboard:

1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Add: `NEXT_PUBLIC_CDN_URL` = `https://cdn.drwskincare.com/drwfoundation`
3. Redeploy

## Summary

**Default Setup (Recommended):**
- ✅ No local MinIO needed
- ✅ Images from production CDN
- ✅ Just copy `.env.example` to `.env.local`
- ✅ `NEXT_PUBLIC_CDN_URL=https://cdn.drwskincare.com/drwfoundation`

**Advanced Setup (Optional):**
- 🔧 Local MinIO for offline development
- 🔧 Test image uploads locally
- 🔧 `NEXT_PUBLIC_CDN_URL=http://localhost:9100/drwfoundation`

Choose based on your needs! 🚀
