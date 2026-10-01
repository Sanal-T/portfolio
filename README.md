# Sanal T. — Portfolio

A high-performance, dark luxury editorial portfolio for an AI/ML Engineer & Software Developer.

## Tech Stack

- **Frontend**: React 19, Vite 8, Tailwind CSS v4, Framer Motion, Lucide Icons, Three.js (WebGL Silk fluid background)
- **Styling**: Bento-Grid architecture, glassmorphism, glowing borders, custom tokens (`Space Grotesk`, `Inter`, `JetBrains Mono`)
- **Contact Service (Zero-Backend)**: Web3Forms direct client submission (no server required) + graceful mailto fallback
- **Optional Backend**: FastAPI (Python 3.10+ async IO, Uvicorn, Pydantic)

---

## Running Locally

### Option A: Frontend Only (No Python Needed!)
```bash
npm run dev:frontend
```
Your portfolio will launch on `http://localhost:5173`. Everything works out-of-the-box (including GitHub stats directly via client-side GitHub REST API).

### Option B: Fullstack (Frontend + Optional FastAPI Backend)
```bash
# 1. Install frontend packages
npm install

# 2. (Optional) Install Python requirements
pip install -r requirements.txt

# 3. Run both concurrently
npm run dev
```

---

## Contact Form Setup (Zero Backend)

We use **Web3Forms** so you never have to host or maintain a 24/7 Python backend just to receive emails.

1. Go to [https://web3forms.com](https://web3forms.com)
2. Enter your email (`sanalt2024@gmail.com`) and click **"Create Access Key"** (takes 10 seconds, 100% free)
3. Open [.env](.env) and paste your key:
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```
4. Restart your frontend (`npm run dev:frontend`). Any submissions from the contact form will land directly in your Gmail inbox!

> **Fallback:** If no key is configured or the backend is offline, the form automatically offers a 1-click fallback to launch the user's default email client (`mailto:`) with pre-filled subject and message body.

---

## Building for Production / Free Deployment

You can deploy this site for free on **Vercel**, **Netlify**, or **GitHub Pages**:

```bash
npm run build
```
The output static bundle will be generated in `dist/`.
