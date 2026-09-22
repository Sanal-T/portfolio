import { motion } from "framer-motion";
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
} from "lucide-react";
import { skillGroups } from "../data/content";

const categoryIcons = {
  "Core Engineering": Terminal,
  "AI / GenAI & ML": Cpu,
  "Databases & Storage": Database,
  "Backend & Security": Shield,
};

const techMap = {
  Python: { icon: SiPython, color: "#3776AB" },
  FastAPI: { icon: SiFastapi, color: "#009688" },
  SQL: { icon: SiPostgresql, color: "#4169E1" },
  "REST APIs": { icon: SiPostman, color: "#FF6C37" },
  "Git & GitHub": { icon: SiGithub, color: "#F05032" },
  "Object-Oriented Programming": { icon: Code, color: "#a855f7" },
  AsyncIO: { icon: Zap, color: "#3776AB" },
  "Generative AI": { icon: Sparkles, color: "#c084fc" },
  LLMs: { icon: Brain, color: "#e879f9" },
  "RAG Pipelines": { icon: Layers, color: "#ec4899" },
  LangChain: { icon: Bot, color: "#22c55e" },
  FAISS: { icon: Search, color: "#0668E1" },
  NLP: { icon: MessageSquare, color: "#f43f5e" },
  "Gemini API": { icon: Sparkles, color: "#4285F4" },
  Ollama: { icon: Cpu, color: "#a855f7" },
  "Machine Learning": { icon: SiScikitlearn, color: "#F7931E" },
  "Deep Learning": { icon: SiPytorch, color: "#EE4C2C" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  "Firebase / Firestore": { icon: SiFirebase, color: "#FFCA28" },
  "Vector Stores": { icon: Database, color: "#a855f7" },
  "JWT Auth": { icon: KeyRound, color: "#d8b4fe" },
  "Role-Based Access Control (RBAC)": { icon: ShieldCheck, color: "#7c5cff" },
  Uvicorn: { icon: Terminal, color: "#009688" },
  Middleware: { icon: Layers, color: "#c084fc" },
  "Vite / React Integration": { icon: SiReact, color: "#61DAFB" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Linux: { icon: SiLinux, color: "#FCC624" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TailwindCSS: { icon: SiTailwindcss, color: "#06B6D4" },
};

function getTechInfo(tag) {
  return techMap[tag] || { icon: Wrench, color: "#7c5cff" };
}

export default function ToolsFamiliar() {
  return (
    <section id="tools" className="relative border-t border-line px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet mb-2">
            05 // Tech Stack
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            Tools &amp; Technologies Familiar
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
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
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-line/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/10 text-violet border border-violet/20">
                      <GroupIcon size={20} />
                    </div>
                    <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-paper">
                      {group.label}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.tags.map((tag) => {
                      const tech = getTechInfo(tag);
                      const TechIcon = tech.icon;

                      return (
                        <motion.div
                          key={tag}
                          whileHover={{ scale: 1.03, y: -2 }}
                          transition={{ duration: 0.2 }}
                          className="group relative flex items-center gap-3 rounded-xl border border-white/10 bg-surface-2/80 px-3.5 py-2.5 shadow-md hover:border-violet/40 hover:bg-surface-2 hover:shadow-lg hover:shadow-violet/10 cursor-pointer overflow-hidden"
                        >
                          {/* Soft background glow matching brand color on hover */}
                          <div
                            className="pointer-events-none absolute -inset-2 opacity-0 group-hover:opacity-25 transition-opacity duration-300 blur-xl"
                            style={{ background: tech.color }}
                          />

                          {/* Icon Container */}
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-ink/90 transition-transform group-hover:scale-110"
                            style={{ color: tech.color }}
                          >
                            <TechIcon size={18} />
                          </div>

                          {/* Technology Name */}
                          <span className="font-mono text-xs font-semibold text-paper/90 group-hover:text-white transition-colors truncate">
                            {tag}
                          </span>
                        </motion.div>
                      );
                    })}
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
