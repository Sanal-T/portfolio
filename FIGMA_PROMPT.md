# Prompt for Figma / AI Design Assistant

Copy and paste the entire block below into your Figma AI or design assistant along with the uploaded files:

```markdown
You are an expert UI/UX Designer and Design Systems Architect working with me in Figma.

I am uploading the core codebase and design token files for my personal AI/ML Engineer & Software Developer portfolio website. 

### CRITICAL INSTRUCTION:
DO NOT generate, build, or re-code any screens or components yet. 
Your SOLE TASK right now is to ingest, parse, and deeply understand the existing architecture, design tokens, visual hierarchy, layout structure, and implemented sections. Once you have absorbed everything, you will simply acknowledge and confirm your understanding by providing a concise architectural summary. After that, I will give you step-by-step instructions on what additional screens, features, or design variations to create in Figma.

---

### 1. High-Level Concept & Design Language
- **Persona / Focus**: Sanal T. — AI/ML Engineer & Software Developer specializing in RAG pipelines, Agentic AI, and production FastAPI backend architectures.
- **Aesthetic Direction**: Dark luxury Bento-Grid UI with cyber-minimalism, high-contrast neon accents, glassmorphism, subtle glows, and interactive specular highlights.
- **Background Layering**: An underlying 3D WebGL Silk fluid animation (#464349 tone) running under a fixed z-index layer (z-0), with the main interactive content resting on z-10.

---

### 2. Design System Tokens (from src/index.css)
- **Typography Hierarchy**:
  - Display / Headlines: Space Grotesk (weights: 500, 600, 700)
  - Body Copy & Paragraphs: Inter (weights: 400, 500, 600)
  - Code / Badges / Metrics / Meta: JetBrains Mono (weights: 400, 500)
- **Color Palette**:
  - Base / Background: --color-ink (#0d0d0f) & Body background (#0a0a0c)
  - Elevated Surfaces: --color-surface (#131316), --color-surface-2 (#19191d)
  - Borders & Dividing Lines: --color-line (#232326) & rgba(255, 255, 255, 0.08)
  - Text: --color-paper (#ededec) & Muted text --color-muted (#8f8f96)
  - Primary Accent: Neon Violet --color-violet / --color-ember (#7c5cff)
  - Secondary Accents:
    - Cyan --color-cyan (#5cd9ff)
    - Emerald (#34d399)
    - Coral / Rose --color-coral (#ff5c8a)
    - Amber --color-amber (#ff9142)
- **Surface Styles & Visual Treatments**:
  - bento-tile: Rounded 16px (1rem), backdrop-blur (22px), rgba(10, 10, 12, 0.42), border 1px rgba(255, 255, 255, 0.08), soft drop shadow + inner white hairline highlight.
  - glass-panel: Rounded cards with rgba(19, 19, 22, 0.55), blur (18px), border 1px rgba(255, 255, 255, 0.09).
  - border-glow: Conic-gradient rotating accent border (#7c5cff to transparent) for highlighted items.
  - specular-btn: Pill buttons with smooth diagonal light reflection sheen on hover.
  - StarBorder: Moving orbital glow perimeter border around featured cards.

---

### 3. Sequential Section Breakdown (from src/App.jsx)
The page follows this precise vertical sequence:
1. **Navbar** (Navbar.jsx): Floating frosted pill navigation centered at top with logo, navigation anchors, live availability pulse dot, and quick action links.
2. **Hero Section** (InfoHero.jsx): Bento-tile card framed in animated StarBorder. Photo with neon rim glow, live pulsing status badge ("Open to AI/ML & Backend Roles"), location tag, display headline, tagline, and CTA pills.
3. **Capabilities Section** (DescriptionCapabilities.jsx): Interactive Bento grid highlighting 4 core technical pillars with 3D tilt & mouse-following spotlight glow:
   - RAG & Vector Search (FAISS, semantic retrieval - Violet accent)
   - Agentic AI & Multi-Step Reasoning (LangChain, tool loops - Cyan accent)
   - Production Backend & APIs (FastAPI, async IO, microservices - Emerald accent)
   - Backend Security & Evaluation (RBAC, JWT, LLM guardrails - Coral accent)
4. **Experience Timeline** (VerticalExperience.jsx): Continuous vertical connecting line with glowing milestone nodes. Filter tabs (All / Work / Education) and expandable cards for Mintsglobal.ae and ASIET B.Tech.
5. **Certifications** (Certifications.jsx): Credential verification cards covering AI Specialization, ML Foundations, and GenAI & LLM Systems Development.
6. **Familiar Tools & Tech Stack** (ToolsFamiliar.jsx): Segmented skill categories for Core Engineering, AI/GenAI & ML, Databases & Storage, and Backend/Security.
7. **GitHub Intelligence & Activity** (GithubDetails.jsx): Live activity metrics dashboard with repository stats, language breakdown, search & filter, and commit feed.
8. **Projects Showcase** (ProjectsSection.jsx): Flagship project card (Insightive) with rotating conic border glow, followed by production projects (AI Recruitment System, ATS, Cyber-Shield) with category filtering.
9. **Communication & Contact** (CommunicationSection.jsx): Interactive glassmorphic contact form connected to Web3Forms / fallback, direct email, and social links.
10. **Footer** (Footer.jsx): Minimal copyright, back-to-top button, and design credits.

---

### 4. Data Layer (from src/data/content.js)
All copy, project metadata, role descriptions, and tags are centralized in src/data/content.js.

---

### YOUR REQUIRED RESPONSE:
Please review the uploaded files and reply ONLY with:
1. A brief confirmation (2-3 sentences) confirming you have mapped the design tokens, fonts, color palettes, and layout structure.
2. A bulleted outline of the 10 core sections you recognized and their key visual elements.
3. A confirmation that you are on standby waiting for my specific instructions before generating any Figma frames or components.
```
