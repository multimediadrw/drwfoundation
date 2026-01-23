# DRW Foundation - Next.js Website

Situs web resmi DRW Foundation yang dibangun dengan Next.js 14 dan dideploy di Vercel.

## 🚀 Teknologi

- **Next.js 14** - React framework dengan App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **MDX** - Markdown content dengan React components
- **Vercel** - Hosting & deployment

## 📁 Struktur Folder

```
drwfoundation-nextjs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   └── posts/             # Blog posts pages
├── content/               # Markdown content
│   ├── posts/            # Blog posts (.md)
│   └── pages/            # Static pages (.md)
├── lib/                   # Utility functions
│   └── posts.ts          # Post data fetching
├── public/               # Static assets
│   └── images/          # WordPress images (47MB)
├── next.config.mjs       # Next.js configuration
├── tailwind.config.js    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Content Migration

Content dari WordPress sudah ter-export ke:
- `content/posts/` - 85 blog posts
- `public/images/` - 47MB media files

## 🌐 Deployment ke Vercel

### 1. Push ke GitHub

```bash
cd /root/drwfoundation-nextjs
git init
git add .
git commit -m "Initial commit - DRW Foundation Next.js"
git branch -M main
git remote add origin https://github.com/[username]/drwfoundation.git
git push -u origin main
```

### 2. Deploy di Vercel

1. Login ke [vercel.com](https://vercel.com)
2. Import repository "drwfoundation"
3. Framework: **Next.js** (auto-detect)
4. Build Command: `next build`
5. Output Directory: `.next`
6. Install Command: `npm install`
7. Click **Deploy**

### 3. Custom Domain

Setelah deploy berhasil:

1. Go to Project Settings → Domains
2. Add domain: `drwfoundation.com`
3. Add domain: `www.drwfoundation.com`
4. Update DNS records sesuai instruksi Vercel:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

## 🔒 Environment Variables (Optional)

Jika perlu, tambahkan di Vercel dashboard:

```
NODE_ENV=production
```

## 📊 Performance

- ✅ Static Site Generation (SSG)
- ✅ Image Optimization
- ✅ Code Splitting
- ✅ CDN Distribution
- ✅ Edge Network

## 🎯 Migration Status

- ✅ 85 posts exported
- ✅ 8 pages exported  
- ✅ 47MB images copied
- ⏳ Content conversion ke Markdown (pending)
- ⏳ GitHub push
- ⏳ Vercel deployment

## 📞 Support

Untuk pertanyaan atau bantuan:
- Email: support@drwfoundation.com
- Website: https://drwfoundation.com

---

Built with ❤️ by DRW Foundation
