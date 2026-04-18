# ✈️ WSU Raider Portal
**Wright State University — Full Student Portal**

A professional, comprehensive student portal for Wright State University featuring live news, AI assistance (Grok), course planning, project showcase, resource hub, alumni mentorship, SysML learning, campus events, and WSU heritage.

---

## 🚀 Live Demo
After deployment: `https://<your-github-username>.github.io/wsu-raider-portal/`

---

## ✨ Features

| Section | Description |
|---|---|
| 🏠 **Dashboard** | University stats, college grid, quick access, president's message |
| 📰 **Live News** | Real-time WSU Newsroom RSS feed (auto-refreshes every 15 min) |
| 📅 **Course Planner** | Visual 8-semester degree planner with 40+ courses, auto-saved |
| 💼 **Project Showcase** | CECS capstone & research projects with GitHub/demo links |
| 🆘 **Resource Hub** | Every campus service: tutoring, mental health, food, IT, housing |
| 🤝 **Alumni Connect** | 125,000+ alumni network with mentorship request system |
| 🤖 **AI Assistant** | Grok-3 powered chatbot, WSU-aware, SysML expert |
| ⚙️ **SysML Module** | 6-step interactive CATIA Magic / Cameo modeling tutorial |
| 📅 **Campus Events** | Full Spring 2026 events calendar with RSVP and countdown |
| ✈️ **WSU Heritage** | Timeline from Wright Brothers 1867 to WSU 2026 |

---

## 🛠 Tech Stack

- **React 18** + **Vite 5** — fast, modern frontend
- **lucide-react** — icon library
- **CSS Variables** — custom WSU design system
- **GitHub Actions** — auto-deploy to GitHub Pages
- **rss2json.com** — CORS-friendly WSU RSS proxy
- **xAI Grok API** — AI assistant (OpenAI-compatible)

---

## 📦 Deployment to GitHub Pages (Step by Step)

### 1. Create GitHub Repository
```bash
# Go to github.com → New Repository
# Name: wsu-raider-portal  (or any name you prefer)
# Public repository
# Do NOT initialize with README
```

### 2. Update Base Path
Open `vite.config.js` and change the base to match your repo name:
```js
base: '/wsu-raider-portal/',   // ← change to your repo name
```

### 3. Enable GitHub Pages
```
GitHub Repo → Settings → Pages → Source: GitHub Actions
```

### 4. Push to GitHub
```bash
# In the wsu-raider-portal/ folder:
git init
git add .
git commit -m "🚀 Initial WSU Raider Portal"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/wsu-raider-portal.git
git push -u origin main
```

### 5. Wait ~2 Minutes
GitHub Actions will automatically build and deploy. Check progress under:
`GitHub Repo → Actions tab`

Your site will be live at:
`https://<your-username>.github.io/wsu-raider-portal/`

---

## 🤖 Grok AI Setup (Free)

1. Go to **[console.x.ai](https://console.x.ai)**
2. Sign up / log in
3. Create an API Key
4. In the portal → **AI Assistant** → click **Setup Key**
5. Paste your key → Save

> **Cost:** xAI provides **$25 free API credits per month** — more than enough for daily study sessions. The `grok-3` model is used.

---

## 🔄 Dynamic News Updates

The portal pulls live news from WSU's WordPress RSS feed:
```
https://webapp2.wright.edu/web1/newsroom/feed/
```

Via CORS proxy: `rss2json.com` (free tier, no API key needed)

- Auto-refreshes every **15 minutes**
- Falls back to **8 curated headlines** if the feed is unavailable
- Shows a **LIVE** badge when connected

---

## 🏗 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
wsu-raider-portal/
├── .github/workflows/deploy.yml    # Auto-deploy to GitHub Pages
├── public/
│   └── favicon.svg                 # WSU portal favicon
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx             # Navigation sidebar
│   │   ├── UI.jsx                  # Shared components
│   │   ├── Dashboard.jsx           # Main overview
│   │   ├── LiveNews.jsx            # RSS news feed
│   │   ├── AIAssistant.jsx         # Grok AI chatbot
│   │   └── Sections.jsx            # All other sections
│   ├── data/
│   │   └── index.js                # All WSU data
│   ├── hooks/
│   │   └── useWSUNews.js           # RSS fetching hook
│   ├── styles/
│   │   └── globals.css             # Design system
│   ├── App.jsx                     # Root app component
│   └── main.jsx                    # React entry point
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite + base path config
└── package.json                    # Dependencies
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| WSU Green | `#2B5234` |
| WSU Gold | `#E8A020` |
| Background | `#080f0a` |
| Font Display | Syne (Google Fonts) |
| Font Body | Nunito (Google Fonts) |
| Font Mono | JetBrains Mono |

---

## 📬 Contributing

This portal is built for the WSU community. To contribute:
1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes
4. Open a Pull Request

---

## 📜 License

MIT — Built with ❤️ for Wright State University Raiders

**Go Green! ✈️**

---

*Wright State University · 3640 Colonel Glenn Hwy · Fairborn (Dayton), OH 45435*
*[wright.edu](https://www.wright.edu) · (937) 775-4400*
