import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  FolderGit2,
  Sparkles,
  Bot,
  ShieldCheck,
  Search,
  Code2,
} from "lucide-react";
import StarBorder from "./StarBorder";
import { projects } from "../data/content";

// Color themes & icon maps per project
const projectThemes = {
  "Insightive": {
    accent: "#7c5cff",
    glowRgb: "124, 92, 255",
    icon: Sparkles,
    category: "AI & RAG Systems",
    badge: "Flagship Architecture",
    themeBadge: "bg-violet/10 text-violet border-violet/30",
    iconBg: "bg-violet/15 border-violet/30 text-violet shadow-violet/20",
    hoverBorder: "group-hover:border-violet/50",
    gradientText: "from-purple-200 via-violet-300 to-indigo-300",
    tagStyle: "bg-violet/10 text-violet/90 border-violet/25 group-hover:border-violet/45",
  },
  "AI-Powered Recruitment & Job Management System": {
    accent: "#5cd9ff",
    glowRgb: "92, 217, 255",
    icon: Bot,
    category: "AI & RAG Systems",
    badge: "Production Backend",
    themeBadge: "bg-cyan/10 text-cyan border-cyan/30",
    iconBg: "bg-cyan/15 border-cyan/30 text-cyan shadow-cyan/20",
    hoverBorder: "group-hover:border-cyan/50",
    gradientText: "from-cyan-100 via-sky-200 to-blue-300",
    tagStyle: "bg-cyan/10 text-cyan/90 border-cyan/25 group-hover:border-cyan/45",
  },
  "Applicant Tracking System": {
    accent: "#34d399",
    glowRgb: "52, 211, 153",
    icon: Search,
    category: "AI & RAG Systems",
    badge: "Full-Stack AI",
    themeBadge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    iconBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-emerald-500/20",
    hoverBorder: "group-hover:border-emerald-500/50",
    gradientText: "from-emerald-100 via-teal-200 to-emerald-300",
    tagStyle: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25 group-hover:border-emerald-500/45",
  },
  "Cyber-Shield": {
    accent: "#ff5c8a",
    glowRgb: "255, 92, 138",
    icon: ShieldCheck,
    category: "Backend & Security",
    badge: "Auth & Hardened Sec",
    themeBadge: "bg-coral/10 text-coral border-coral/30",
    iconBg: "bg-coral/15 border-coral/30 text-coral shadow-coral/20",
    hoverBorder: "group-hover:border-coral/50",
    gradientText: "from-rose-100 via-pink-200 to-coral",
    tagStyle: "bg-coral/10 text-coral/90 border-coral/25 group-hover:border-coral/45",
  },
};

const defaultTheme = {
  accent: "#7c5cff",
  glowRgb: "124, 92, 255",
  icon: FolderGit2,
  category: "Software",
  badge: "Active Project",
  themeBadge: "bg-violet/10 text-violet border-violet/30",
  iconBg: "bg-violet/15 border-violet/30 text-violet shadow-violet/20",
  hoverBorder: "group-hover:border-violet/50",
  gradientText: "from-purple-200 via-violet-300 to-indigo-300",
  tagStyle: "bg-surface-2 text-muted border-white/5 group-hover:border-white/20",
};

// Interactive 3D Spotlight Project Card
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const theme = projectThemes[project.name] || defaultTheme;
  const IconComponent = theme.icon;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // 3D tilt calculation
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;
    setTilt({ x: py * -5, y: px * 5 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      style={{ perspective: "1000px" }}
      className="h-full"
    >
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="block h-full outline-none group"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setTilt({ x: 0, y: 0 });
          }}
          style={{
            transform: isHovered
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1)`
              : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
            transition: isHovered
              ? "transform 0.12s ease-out"
              : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
            transformStyle: "preserve-3d",
          }}
          className={`relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-xl p-6 transition-all duration-300 hover:shadow-2xl overflow-hidden ${theme.hoverBorder}`}
        >
          {/* Dynamic Radial Spotlight */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${theme.glowRgb}, 0.16), transparent 70%)`,
            }}
          />

          {/* Dynamic Masked Edge Glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(260px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${theme.glowRgb}, 0.4), transparent 70%)`,
              padding: "1px",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* Specular Shimmer Sheen */}
          <div
            className="pointer-events-none absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.07) 50%, transparent 60%)`,
              transform: isHovered
                ? "translateX(100%) translateY(100%)"
                : "translateX(-100%) translateY(-100%)",
              transition: "transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* Tech Grid Micro Pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500"
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
              backgroundSize: "16px 16px",
            }}
          />

          {/* Watermark Emblem */}
          <div className="pointer-events-none absolute -bottom-6 -right-6 text-white/[0.03] group-hover:text-white/[0.07] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
            <IconComponent size={130} strokeWidth={1} />
          </div>

          {/* Card Body - Top */}
          <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 shadow-md ${theme.iconBg}`}
                >
                  <IconComponent size={18} />
                </div>
                <span
                  className={`inline-flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${theme.themeBadge}`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: theme.accent }}
                  />
                  {theme.badge}
                </span>
              </div>

              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-surface-2/80 text-muted transition-all duration-300 group-hover:border-white/20 group-hover:text-paper group-hover:scale-110"
              >
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: isHovered ? theme.accent : undefined }}
                />
              </div>
            </div>

            <h3
              className={`font-display text-lg font-semibold tracking-tight text-paper transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${theme.gradientText}`}
            >
              {project.name}
            </h3>

            <p className="mt-2.5 text-xs leading-relaxed text-muted/80 group-hover:text-muted/95 transition-colors line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Card Body - Bottom */}
          <div
            className="relative z-10 mt-6 pt-4 border-t border-white/10"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium transition-all duration-200 hover:scale-105 ${theme.tagStyle}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

// Interactive Flagship Featured Showcase Component
function FeaturedProject({ project }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const theme = projectThemes[project.name] || defaultTheme;
  const IconComponent = theme.icon;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;
    setTilt({ x: py * -4, y: px * 4 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      style={{ perspective: "1200px" }}
      className="mb-10"
    >
      <StarBorder color="#7c3aed" speed="5s" borderRadius={24} className="w-full">
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="block w-full outline-none group"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setTilt({ x: 0, y: 0 });
            }}
            style={{
              transform: isHovered
                ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.015, 1.015, 1)`
                : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
              transition: isHovered
                ? "transform 0.12s ease-out"
                : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
              transformStyle: "preserve-3d",
            }}
            className="relative flex flex-col justify-between rounded-[23px] bg-surface/80 backdrop-blur-2xl p-7 sm:p-9 md:p-11 transition-all duration-300 hover:shadow-2xl overflow-hidden"
          >
            {/* Dynamic Spotlight */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${theme.glowRgb}, 0.2), transparent 70%)`,
              }}
            />

            {/* Ambient Top Glow Beam */}
            <div
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-36 w-80 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"
              style={{ background: theme.accent }}
            />

            {/* Specular Light Reflection Sweep */}
            <div
              className="pointer-events-none absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)`,
                transform: isHovered
                  ? "translateX(100%) translateY(100%)"
                  : "translateX(-100%) translateY(-100%)",
                transition: "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />

            {/* Background Seal Watermark */}
            <div className="pointer-events-none absolute -bottom-12 -right-8 text-white/[0.04] group-hover:text-white/[0.08] transition-all duration-500 group-hover:scale-105 group-hover:rotate-6">
              <Sparkles size={200} strokeWidth={0.8} />
            </div>

            {/* Top Row: Category + Star + Arrow */}
            <div className="relative z-10" style={{ transform: "translateZ(25px)" }}>
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-lg ${theme.iconBg} group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-violet font-semibold">
                      ★ Flagship Research &amp; AI
                    </span>
                    <span className="font-mono text-xs text-muted/80">
                      Autonomous RAG &amp; Multi-Step Reasoning
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs font-medium text-paper/80 group-hover:text-violet transition-colors">
                    <span>View Repository</span>
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-surface-2 text-paper shadow-md group-hover:scale-110 group-hover:border-violet/40 group-hover:bg-violet/10 group-hover:text-violet transition-all">
                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3
                className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-paper transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${theme.gradientText}`}
              >
                {project.name}
              </h3>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-muted/90 max-w-3xl font-body">
                {project.description}
              </p>
            </div>

            {/* Bottom Tech Tags */}
            <div
              className="relative z-10 mt-8 flex flex-wrap gap-2 pt-6 border-t border-white/10"
              style={{ transform: "translateZ(25px)" }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-violet/30 bg-violet/10 px-3 py-1 font-mono text-xs font-medium text-paper/90 transition-all duration-200 hover:scale-105 hover:border-violet/50 hover:bg-violet/15"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </a>
      </StarBorder>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");

  const featured = projects.find((p) => p.featured) || projects[0];
  const otherProjects = projects.filter((p) => !p.featured);

  const categories = ["All", "AI & RAG Systems", "Backend & Security"];

  const filteredOther = otherProjects.filter((p) => {
    if (filter === "All") return true;
    const theme = projectThemes[p.name];
    return theme && theme.category === filter;
  });

  return (
    <section id="projects" className="relative px-6 py-12 sm:py-16 overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-violet/10 blur-3xl opacity-35 -z-10" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan/10 blur-3xl opacity-25 -z-10" />

      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs font-mono uppercase tracking-[0.25em] text-violet mb-3">
              <Code2 size={12} className="animate-pulse" />
              <span>07 // Engineering Showcase</span>
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              Featured Projects &amp; Software
            </h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-surface/60 border border-white/10 backdrop-blur-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-3 py-1.5 rounded-xl font-mono text-xs transition-all duration-200 ${
                  filter === cat
                    ? "text-paper font-medium"
                    : "text-muted hover:text-paper"
                }`}
              >
                {filter === cat && (
                  <motion.div
                    layoutId="activeProjectFilter"
                    className="absolute inset-0 rounded-xl bg-violet/20 border border-violet/40 shadow-sm"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Flagship Featured Showcase */}
        {featured && (filter === "All" || filter === "AI & RAG Systems") && (
          <FeaturedProject project={featured} />
        )}

        {/* Other Projects Grid with Dynamic 3D Cards */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredOther.map((p, index) => (
              <ProjectCard key={p.name} project={p} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
