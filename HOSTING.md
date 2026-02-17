# 🚀 Hosting Your Portfolio — Free Deployment Guide

## Your Files
```
portfolio/
├── index.html    ← Main page
├── styles.css    ← All styles
├── main.js       ← All interactivity
└── HOSTING.md    ← This file
```

---

## Option 1: GitHub Pages (Recommended — Free Forever)

### Step 1 — Create a GitHub Repository
1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click the **+** icon → **New repository**
3. Name it: `ayush-portfolio` (or `<your-github-username>.github.io` for a cleaner URL)
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Upload Your Files
**Option A — Drag & Drop (easiest):**
1. Open your new repository on GitHub
2. Click **"uploading an existing file"**
3. Drag all 3 files (`index.html`, `styles.css`, `main.js`) into the drop zone
4. Click **Commit changes**

**Option B — Git CLI:**
```bash
# In your portfolio folder:
git init
git add .
git commit -m "Initial portfolio deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ayush-portfolio.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. In your repository, go to **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose **main** branch → **/ (root)** folder
4. Click **Save**

### Your Live URL
```
https://YOUR_USERNAME.github.io/ayush-portfolio/
```
*(Or `https://YOUR_USERNAME.github.io` if you named the repo `<username>.github.io`)*

> ⏱️ Takes ~2 minutes to go live after first deploy. Changes reflect within 60 seconds.

---

## Option 2: Vercel (Best for Custom Domains — Free Tier)

### Step 1 — Push to GitHub (same as above)

### Step 2 — Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Select your portfolio repository
4. Click **Deploy** — no config needed for a static site!

### Your Live URL
```
https://ayush-portfolio.vercel.app
```

### Custom Domain (Optional)
1. In Vercel dashboard → your project → **Settings** → **Domains**
2. Add your domain (e.g., `ayushrajak.dev`)
3. Follow the DNS instructions Vercel provides

---

## Option 3: Netlify (Drop & Go — Fastest Start)

1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag your entire `portfolio/` folder onto the page
3. Done — you get a live URL instantly (no login required!)

---

## 🔧 Customization Tips

### Update Contact Form to Actually Send Emails
Replace the simulated submit in `main.js` with a free service like:
- **Formspree**: Sign up at formspree.io, add your form ID to the action attribute
- **EmailJS**: Connect to Gmail/Outlook directly from the frontend

```html
<!-- In index.html, update the form tag: -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" ...>
```

### Add Your Real Project Screenshots
Replace project card backgrounds by adding to `.project-card` in styles.css:
```css
.project-card:nth-child(2) {
  background-image: url('your-screenshot.jpg');
  background-size: cover;
}
```

### Connect a Custom Domain on GitHub Pages
1. Buy a domain (Namecheap, Google Domains, etc.)
2. In repo Settings → Pages → **Custom domain**, enter your domain
3. Add a CNAME DNS record pointing to `YOUR_USERNAME.github.io`

---

## 📧 Need Help?
Email: ajr51407@gmail.com
