import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Database, Cpu, Server, ShieldCheck, CheckCircle2 } from "lucide-react";
import { profile, capabilities } from "../data/content";
import StarBorder from "./StarBorder";

const iconMap = {
  Database: Database,
  Cpu: Cpu,
  Server: Server,
  ShieldCheck: ShieldCheck,
};

const cardThemeMap = {
  "rag-search": {
    accent: "#7c5cff",
    glowRgb: "124, 92, 255",
    badgeBg: "bg-violet/15 text-violet border-violet/30",
    iconBg: "bg-violet/10 border-violet/30 text-violet shadow-violet/20",
    titleHover: "group-hover:from-purple-200 group-hover:to-violet-400",
    badgeGlow: "group-hover:shadow-[0_0_12px_rgba(124,92,255,0.3)]",
  },
  "agentic-ai": {
    accent: "#5cd9ff",
    glowRgb: "92, 217, 255",
    badgeBg: "bg-cyan/15 text-cyan border-cyan/30",
    iconBg: "bg-cyan/10 border-cyan/30 text-cyan shadow-cyan/20",
    titleHover: "group-hover:from-cyan-100 group-hover:to-blue-400",
    badgeGlow: "group-hover:shadow-[0_0_12px_rgba(92,217,255,0.3)]",
  },
  "fastapi-backends": {
    accent: "#34d399",
    glowRgb: "52, 211, 153",
    badgeBg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    iconBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-emerald-500/20",
    titleHover: "group-hover:from-emerald-100 group-hover:to-teal-400",
    badgeGlow: "group-hover:shadow-[0_0_12px_rgba(52,211,153,0.3)]",
  },
  "security-mlops": {
    accent: "#ff5c8a",
    glowRgb: "255, 92, 138",
    badgeBg: "bg-coral/15 text-coral border-coral/30",
    iconBg: "bg-coral/10 border-coral/30 text-coral shadow-coral/20",
    titleHover: "group-hover:from-rose-100 group-hover:to-coral",
    badgeGlow: "group-hover:shadow-[0_0_12px_rgba(255,92,138,0.3)]",
  },
};

function CapabilityCard({ cap, index }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const Icon = iconMap[cap.icon] || Cpu;
  const theme = cardThemeMap[cap.id] || cardThemeMap["rag-search"];

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered ? "transform 0.15s ease-out" : "transform 0.5s ease-out",
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-xl p-7 transition-all duration-300 hover:border-white/20 hover:shadow-2xl overflow-hidden"
      >
        {/* Dynamic Interactive Radial Spotlight Overlay */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${theme.glowRgb}, 0.16), transparent 75%)`,
          }}
        />

        {/* Dynamic Border Edge Spotlight Glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${theme.glowRgb}, 0.35), transparent 70%)`,
            padding: "1px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Tech Grid Micro Pattern Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />

        {/* Card Header: Icon & Highlight Badge */}
        <div className="relative flex items-center justify-between gap-4 mb-5" style={{ transform: "translateZ(20px)" }}>
          <div className="relative">
            {/* Animated Ambient Halo behind Icon */}
            <div
              className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
              style={{ background: theme.accent }}
            />
            <div
              className={`relative flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 ${theme.iconBg}`}
              style={{
                boxShadow: isHovered ? `0 0 20px rgba(${theme.glowRgb}, 0.35)` : "none",
              }}
            >
              <Icon size={22} className="transition-transform group-hover:scale-105" />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`font-mono text-[10px] font-medium uppercase tracking-wider px-3 py-1 rounded-full border transition-all duration-300 ${theme.badgeBg} ${theme.badgeGlow}`}
            >
              {cap.highlight}
            </span>
          </div>
        </div>

        {/* Card Content: Title & Description */}
        <div className="relative" style={{ transform: "translateZ(15px)" }}>
          <h3
            className={`font-display text-xl font-semibold text-paper transition-all duration-300 group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent ${theme.titleHover}`}
          >
            {cap.title}
          </h3>

          <p className="mt-2.5 text-sm leading-relaxed text-muted group-hover:text-paper/90 transition-colors duration-300">
            {cap.description}
          </p>
        </div>

        {/* Corner Glowing Accent Line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function DescriptionCapabilities() {
  return (
    <section id="about" className="relative px-6 py-3 sm:py-4 overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-violet/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-10 h-80 w-80 rounded-full bg-cyan/10 blur-[120px]" />

      <div className="mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet mb-2">
            02 // Overview &amp; Capabilities
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            Description &amp; Engineering Focus
          </h2>
        </motion.div>

        {/* Bio Narrative Card */}
        <StarBorder color="#7c3aed" speed="6s" borderRadius={24} className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="bento-tile p-8 md:p-10"
          >
            <div className="flex items-center gap-3 font-mono text-xs text-muted mb-4">
              <span className="h-2 w-2 rounded-full bg-violet animate-pulse" />
              <span>BIO NARRATIVE</span>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-paper/90">
              {profile.bio}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 pt-6 border-t border-line/50 font-mono text-xs text-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-violet" />
                <span>Production-ready Python / FastAPI</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-violet" />
                <span>Vector Search &amp; FAISS Indexing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-violet" />
                <span>LangChain Agent Workflows</span>
              </div>
            </div>
          </motion.div>
        </StarBorder>

        {/* Capabilities Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.id} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

