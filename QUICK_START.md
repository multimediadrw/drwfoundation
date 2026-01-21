# 🚀 Quick Start Guide - DRW Foundation

**Repository**: https://github.com/multimediadrw/drwfoundation  
**For**: Continuing work on different device

---

## ⚡ Quick Setup (New Device)

### 1. Clone Repository
```bash
git clone https://github.com/multimediadrw/drwfoundation.git
cd drwfoundation
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development
```bash
npm run dev
```

Open: http://localhost:3000

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `PROJECT_DOCUMENTATION.md` | **Complete documentation** - READ THIS FIRST |
| `README.md` | Project overview |
| `DEPLOYMENT.md` | Vercel deployment guide |
| `content/posts/` | All 85 blog posts (Markdown) |
| `content/pages/` | All 8 pages (Markdown) |
| `public/images/` | 47MB WordPress images |

---

## 🎯 What's Done

✅ WordPress cleaned (11,512 malware removed)  
✅ Content exported (85 posts + 8 pages)  
✅ Next.js project built (88 static pages)  
✅ Pushed to GitHub  
✅ Complete documentation created  

---

## 📋 Next Steps

### Immediate
1. **Deploy to Vercel**
   - Go to: https://vercel.com
   - Import: `multimediadrw/drwfoundation`
   - Deploy!

2. **Setup Domain**
   - Add: drwfoundation.com
   - Update DNS records
   - See: `DEPLOYMENT.md`

### Later
3. Setup MinIO (image storage)
4. Build admin panel (TipTap editor)
5. Implement ISR (auto content updates)

---

## 🔧 Common Commands

```bash
# Development
npm run dev        # Start dev server
npm run build      # Build for production

# Content
nano content/posts/new-article.md    # Create new post
git add .
git commit -m "Add new article"
git push origin main                  # Auto-deploy to Vercel

# Update from GitHub
git pull origin main

# Check status
git status
npm run build      # Test build
```

---

## 📞 Quick Links

- **GitHub**: https://github.com/multimediadrw/drwfoundation
- **Vercel**: https://vercel.com (after deployment)
- **Docs**: Read `PROJECT_DOCUMENTATION.md` for full details

---

## 🆘 Troubleshooting

**Build fails?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Git issues?**
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

**Need help?**
- Check: `PROJECT_DOCUMENTATION.md`
- GitHub Issues: https://github.com/multimediadrw/drwfoundation/issues

---

**Ready to continue?** Start with: `npm install && npm run dev` 🚀
