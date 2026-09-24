import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiPython,
  SiFastapi,
  SiGit,
  SiGithub,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiPostgresql,
  SiDocker,
  SiLinux,
  SiReact,
  SiVite,
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
  Database,
  Cpu,
  Server,
  Shield,
  Terminal,
  Zap,
  Sparkles,
  Layers,
  Search,
  ShieldCheck,
  Brain,
  MessageSquare,
  Wrench,
  Code,
  KeyRound,
  Bot,
  Cloud,
  Palette,
  FileCode,
  CheckCircle2,
} from "lucide-react";
import { skillGroups } from "../data/content";

const categoryIcons = {
  "Core Engineering": Terminal,
  "AI / GenAI & ML": Cpu,
  "Databases & Storage": Database,
  "Backend & Security": Shield,
  "Backend, Cloud & Security": Shield,
};

const categoryShortNames = {
  "Core Engineering": "CORE ENG",
  "AI / GenAI & ML": "AI / ML",
  "Databases & Storage": "DATABASE",
  "Backend & Security": "BACKEND",
  "Backend, Cloud & Security": "BACKEND / CLOUD",
};

const techMap = {
  Python: { icon: SiPython, color: "#3776AB" },
  Go: { icon: SiGo, color: "#00ADD8" },
  FastAPI: { icon: SiFastapi, color: "#009688" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  React: { icon: SiReact, color: "#61DAFB" },
  HTML5: { icon: FileCode, color: "#E34F26" },
  CSS3: { icon: Palette, color: "#1572B6" },
  SQL: { icon: SiPostgresql, color: "#4169E1" },
  "REST APIs": { icon: SiPostman, color: "#FF6C37" },
  "Git & GitHub": { icon: SiGithub, color: "#F05032" },
  "Object-Oriented Programming": { icon: Code, color: "#a855f7" },
  AsyncIO: { icon: Zap, color: "#3776AB" },

  "Generative AI": { icon: Sparkles, color: "#c084fc" },
  LLMs: { icon: Brain, color: "#e879f9" },
  SLMs: { icon: Brain, color: "#a855f7" },
  "RAG Pipelines": { icon: Layers, color: "#ec4899" },
  LangChain: { icon: Bot, color: "#22c55e" },
  FAISS: { icon: Search, color: "#0668E1" },
  NLP: { icon: MessageSquare, color: "#f43f5e" },
  "Gemini API": { icon: Sparkles, color: "#4285F4" },
  Ollama: { icon: Cpu, color: "#ffffff" },
  "Machine Learning": { icon: SiScikitlearn, color: "#F7931E" },
  "Deep Learning": { icon: SiPytorch, color: "#EE4C2C" },

  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  Supabase: { icon: SiSupabase, color: "#3ECF8E" },
  "Google Cloud (GCP)": { icon: SiGooglecloud, color: "#4285F4" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  "Firebase / Firestore": { icon: SiFirebase, color: "#FFCA28" },
  "Vector Stores": { icon: Database, color: "#a855f7" },

  Pydantic: { icon: CheckCircle2, color: "#E92063" },
  Postman: { icon: SiPostman, color: "#FF6C37" },
  "JWT Auth": { icon: KeyRound, color: "#d8b4fe" },
  "Role-Based Access Control (RBAC)": { icon: ShieldCheck, color: "#7c5cff" },
  Uvicorn: { icon: Terminal, color: "#009688" },
  Middleware: { icon: Layers, color: "#c084fc" },
  "Vite / React Integration": { icon: SiReact, color: "#61DAFB" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Linux: { icon: SiLinux, color: "#FCC624" },
  TailwindCSS: { icon: SiTailwindcss, color: "#06B6D4" },
};

function getTechInfo(tag) {
  return techMap[tag] || { icon: Wrench, color: "#7c5cff" };
}

function TechIconButton({ tag, categoryLabel }) {
  const [isHovered, setIsHovered] = useState(false);
  const tech = getTechInfo(tag);
  const TechIcon = tech.icon;
  const categoryTag = categoryShortNames[categoryLabel] || "TECH";

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Tooltip Popup on top */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute bottom-full mb-3 z-30 pointer-events-none flex flex-col items-center"
          >
            <div className="rounded-xl border border-white/15 bg-ink/95 px-3.5 py-2 shadow-2xl backdrop-blur-md text-center min-w-[90px]">
              <p className="font-mono text-xs font-bold text-paper whitespace-nowrap">
                {tag}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-wider text-muted mt-0.5 whitespace-nowrap">
                {categoryTag}
              </p>
            </div>
            {/* Tooltip Arrow */}
            <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-white/15 -mt-[1px]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon Button Tile */}
      <motion.button
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border border-white/10 bg-surface-2/80 shadow-lg hover:border-violet/50 hover:bg-surface-2 hover:shadow-violet/20 cursor-pointer overflow-hidden"
      >
        {/* Soft background glow matching tech brand color on hover */}
        <div
          className="pointer-events-none absolute -inset-2 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"
          style={{ background: tech.color }}
        />

        {/* Brand Icon */}
        <TechIcon
          size={24}
          className="transition-transform duration-300 group-hover:scale-110"
          style={{ color: tech.color }}
        />
      </motion.button>
    </div>
  );
}

export default function ToolsFamiliar() {
  return (
    <section id="tools" className="relative border-t border-line px-6 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet mb-2">
            05 // Tech Stack
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            Tools of the Trade
          </h2>
          <p className="mt-2 text-sm font-mono text-muted">
            Hover over each icon to explore my stack — from frontend frameworks to AI &amp; backend tooling.
          </p>
        </motion.div>

        {/* Categories Bento Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, index) => {
            const GroupIcon = categoryIcons[group.label] || Wrench;
            return (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bento-tile p-6 hover:border-violet/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-line/50">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet/10 text-violet border border-violet/20">
                      <GroupIcon size={18} />
                    </div>
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-paper">
                      {group.label}
                    </h3>
                  </div>

                  {/* Icon Grid */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
                    {group.tags.map((tag) => (
                      <TechIconButton
                        key={tag}
                        tag={tag}
                        categoryLabel={group.label}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
