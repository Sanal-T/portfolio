import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiPython,
  SiFastapi,
  SiGithub,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiPostgresql,
  SiDocker,
  SiLinux,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiPytorch,
  SiScikitlearn,
  SiPostman,
  SiGo,
  SiSupabase,
  SiGooglecloud,
} from "react-icons/si";
import {
  Zap,
  Sparkles,
  Layers,
  Search,
  Brain,
  Wrench,
  Code,
  KeyRound,
  Bot,
  Cpu,
  Palette,
  FileCode,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const allTools = [
  // Frontend
  { name: "React", category: "FRONTEND", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", category: "FRONTEND", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", category: "FRONTEND", icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML5", category: "FRONTEND", icon: FileCode, color: "#E34F26" },
  { name: "CSS3", category: "FRONTEND", icon: Palette, color: "#1572B6" },
  { name: "TailwindCSS", category: "FRONTEND", icon: SiTailwindcss, color: "#06B6D4" },

  // Backend & Core Engineering
  { name: "Python", category: "BACKEND", icon: SiPython, color: "#3776AB" },
  { name: "Go", category: "BACKEND", icon: SiGo, color: "#00ADD8" },
  { name: "FastAPI", category: "BACKEND", icon: SiFastapi, color: "#009688" },
  { name: "REST APIs", category: "BACKEND", icon: SiPostman, color: "#FF6C37" },
  { name: "Pydantic", category: "BACKEND", icon: CheckCircle2, color: "#E92063" },
  { name: "AsyncIO", category: "BACKEND", icon: Zap, color: "#3776AB" },
  { name: "OOP", category: "BACKEND", icon: Code, color: "#a855f7" },

  // AI / GenAI & ML
  { name: "Generative AI", category: "AI / ML", icon: Sparkles, color: "#c084fc" },
  { name: "LLMs", category: "AI / ML", icon: Brain, color: "#e879f9" },
  { name: "SLMs", category: "AI / ML", icon: Brain, color: "#a855f7" },
  { name: "RAG Pipelines", category: "AI / ML", icon: Layers, color: "#ec4899" },
  { name: "LangChain", category: "AI / ML", icon: Bot, color: "#22c55e" },
  { name: "Gemini API", category: "AI / ML", icon: Sparkles, color: "#4285F4" },
  { name: "Ollama", category: "AI / ML", icon: Cpu, color: "#ffffff" },
  { name: "Machine Learning", category: "AI / ML", icon: SiScikitlearn, color: "#F7931E" },
  { name: "Deep Learning", category: "AI / ML", icon: SiPytorch, color: "#EE4C2C" },
  { name: "FAISS", category: "AI / ML", icon: Search, color: "#0668E1" },

  // Databases & Cloud
  { name: "PostgreSQL", category: "DATABASE", icon: SiPostgresql, color: "#4169E1" },
  { name: "Supabase", category: "DATABASE", icon: SiSupabase, color: "#3ECF8E" },
  { name: "Google Cloud (GCP)", category: "CLOUD", icon: SiGooglecloud, color: "#4285F4" },
  { name: "MySQL", category: "DATABASE", icon: SiMysql, color: "#4479A1" },
  { name: "MongoDB", category: "DATABASE", icon: SiMongodb, color: "#47A248" },
  { name: "Firebase", category: "DATABASE", icon: SiFirebase, color: "#FFCA28" },

  // Security & DevOps Tooling
  { name: "Docker", category: "DEVOPS", icon: SiDocker, color: "#2496ED" },
  { name: "Linux", category: "DEVOPS", icon: SiLinux, color: "#FCC624" },
  { name: "Git & GitHub", category: "DEVOPS", icon: SiGithub, color: "#F05032" },
  { name: "Postman", category: "TOOLS", icon: SiPostman, color: "#FF6C37" },
  { name: "JWT Auth", category: "SECURITY", icon: KeyRound, color: "#d8b4fe" },
  { name: "RBAC Security", category: "SECURITY", icon: ShieldCheck, color: "#7c5cff" },
];

function TechIconButton({ tool }) {
  const [isHovered, setIsHovered] = useState(false);
  const TechIcon = tool.icon || Wrench;

  return (
    <div
      className={`relative flex flex-col items-center transition-z ${
        isHovered ? "z-30" : "z-10"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Floating Tooltip Popup */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute bottom-full mb-2.5 z-40 pointer-events-none flex flex-col items-center"
          >
            <div className="rounded-xl border border-white/15 bg-ink/95 px-3.5 py-1.5 shadow-2xl backdrop-blur-md text-center min-w-[85px]">
              <p className="font-mono text-xs font-bold text-paper whitespace-nowrap">
                {tool.name}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-wider text-muted mt-0.5 whitespace-nowrap">
                {tool.category}
              </p>
            </div>
            {/* Tooltip Arrow Pointer */}
            <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-white/15 -mt-[1px]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon Tile */}
      <motion.button
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.18 }}
        className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-white/10 bg-surface-2/80 shadow-md hover:border-violet/50 hover:bg-surface-2 hover:shadow-violet/20 cursor-pointer overflow-hidden"
      >
        {/* Soft Hover Glow matching tech brand color */}
        <div
          className="pointer-events-none absolute -inset-2 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"
          style={{ background: tool.color }}
        />

        {/* Tech Icon */}
        <TechIcon
          size={24}
          className="transition-transform duration-300 group-hover:scale-110"
          style={{ color: tool.color }}
        />
      </motion.button>
    </div>
  );
}

export default function ToolsFamiliar() {
  return (
    <section id="tools" className="relative px-6 py-3 sm:py-4">
      <div className="mx-auto max-w-5xl">
        {/* Single Continuous Bento Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="bento-tile px-6 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8 hover:border-violet/40 transition-all duration-300 overflow-visible relative"
        >
          {/* Header Inside Bento Tile */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-[11px] text-muted mb-3">
              <span className="text-violet font-bold">&lt;/&gt;</span>
              <span>05 // TECH_STACK.MANIFEST</span>
            </div>
            <h2 className="font-display text-2xl font-medium tracking-tight text-paper sm:text-3xl">
              Tools of the Trade
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm font-mono text-muted">
              Hover over each icon to explore my stack — from frontend frameworks to security &amp; AI tooling.
            </p>
          </div>

          {/* Icons Flex Grid */}
          <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center sm:justify-start">
            {allTools.map((tool) => (
              <TechIconButton key={tool.name} tool={tool} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


