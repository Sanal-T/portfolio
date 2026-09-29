import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  Building2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Code2,
  MapPin,
  TrendingUp,
  Layers,
  ChevronRight,
  Target,
} from "lucide-react";
import { experience } from "../data/content";

// Enhanced rich metadata for experience milestones
const experienceData = [
  {
    id: "mintsglobal",
    role: "AI/ML Engineer (Intern)",
    org: "Mintsglobal.ae",
    location: "Remote / UAE",
    period: "2026 — Present",
    status: "Active Internship",
    type: "Work Experience",
    icon: Briefcase,
    accent: "#34d399",
    glowRgb: "52, 211, 153",
    themeBadge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    themeIcon: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-emerald-500/20",
    gradientText: "from-emerald-200 via-teal-300 to-cyan-300",
    summary:
      "Engineering core machine learning pipelines, LLM-powered agent workflows, and resilient asynchronous backend services in production.",
    highlights: [
      "Architecting RAG retrieval pipelines using FAISS vector indexing & semantic search rerankers.",
      "Developing and optimizing high-concurrency FastAPI microservices with async Python.",
      "Designing agentic reasoning chains with LangChain for automated data extraction and synthesis.",
      "Collaborating on full-lifecycle ML deployment, API guardrails, and automated evaluation.",
    ],
    skills: ["Python", "FastAPI", "ML Integration", "LLM Pipelines", "FAISS", "AsyncIO", "REST APIs"],
  },
  {
    id: "asiet",
    role: "B.Tech, Computer Science (AI Specialization)",
    org: "Adi Shankara Institute of Engineering & Technology",
    location: "Kerala, India",
    period: "2022 — 2026",
    status: "AI Specialization",
    type: "Degree & Education",
    icon: GraduationCap,
    accent: "#7c5cff",
    glowRgb: "124, 92, 255",
    themeBadge: "bg-violet/10 text-violet border-violet/30",
    themeIcon: "bg-violet/15 border-violet/30 text-violet shadow-violet/20",
    gradientText: "from-purple-200 via-violet-300 to-indigo-300",
    summary:
      "Comprehensive 4-year engineering curriculum focused on Artificial Intelligence foundations, machine learning mathematical theory, algorithms, and full-stack software architecture.",
    highlights: [
      "Core coursework in Deep Learning, Neural Networks, Natural Language Processing, and Computer Vision.",
      "Built end-to-end academic capstone projects incorporating automated ML pipelines & evaluation.",
      "Strong grounding in Data Structures & Algorithms, Object-Oriented Design, Operating Systems, and DBMS.",
      "Active participant in technical symposiums, hackathons, and software engineering problem-solving.",
    ],
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Structures",
      "Deep Learning",
      "Algorithms",
      "Python",
      "DBMS",
    ],
  },
];

export default function VerticalExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = experienceData[activeIndex];
  const IconComponent = activeItem.icon;

  return (
    <section id="experience" className="relative px-6 py-12 sm:py-16 overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-30 transition-all duration-700 -z-10"
        style={{
          background: `radial-gradient(circle, rgba(${activeItem.glowRgb}, 0.25), transparent 70%)`,
        }}
      />
      <div className="pointer-events-none absolute bottom-10 right-10 w-72 h-72 rounded-full bg-violet/10 blur-3xl opacity-20 -z-10" />

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
              <Sparkles size={12} className="animate-pulse" />
              <span>03 // Trajectory &amp; Background</span>
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              Experience &amp; Education
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-muted/80 leading-relaxed font-body">
            Milestones across professional industry roles and academic specializations in AI &amp; systems engineering.
          </p>
        </motion.div>

        {/* Interactive React-Bits Style Stepper & Stage Deck Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Milestone Timeline Rail (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted/70 mb-1 px-1">
              Select Milestone ({activeIndex + 1}/{experienceData.length})
            </p>

            <div className="flex flex-col gap-3">
              {experienceData.map((item, idx) => {
                const isSelected = activeIndex === idx;
                const ItemIcon = item.icon;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`relative w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 backdrop-blur-xl overflow-hidden group ${
                      isSelected
                        ? "bg-surface/90 border-white/25 shadow-xl"
                        : "bg-surface/40 border-white/5 hover:border-white/15 hover:bg-surface/60 text-muted"
                    }`}
                  >
                    {/* Active luminous indicator bar */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeTimelineGlow"
                        className="absolute left-0 top-0 bottom-0 w-1.5 rounded-r"
                        style={{ backgroundColor: item.accent }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    {/* Active ambient glow */}
                    {isSelected && (
                      <div
                        className="pointer-events-none absolute inset-0 opacity-15"
                        style={{
                          background: `radial-gradient(circle at 20% 50%, rgba(${item.glowRgb}, 0.5), transparent 70%)`,
                        }}
                      />
                    )}

                    <div className="flex items-start justify-between gap-3 relative z-10">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                            isSelected
                              ? item.themeIcon
                              : "bg-surface-2 border-white/10 text-muted group-hover:text-paper"
                          }`}
                        >
                          <ItemIcon size={18} />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-muted/80">
                              {item.type}
                            </span>
                          </div>
                          <h4
                            className={`font-display text-sm font-semibold transition-colors line-clamp-1 ${
                              isSelected ? "text-paper" : "text-muted group-hover:text-paper"
                            }`}
                          >
                            {item.role}
                          </h4>
                          <p className="font-mono text-xs text-muted/70 line-clamp-1 mt-0.5">
                            {item.org}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        <span
                          className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                            isSelected ? item.themeBadge : "border-white/5 bg-surface-2 text-muted"
                          }`}
                        >
                          {item.period.split("—")[0].trim()}
                        </span>
                        <ChevronRight
                          size={14}
                          className={`mt-2 transition-transform duration-300 ${
                            isSelected
                              ? "translate-x-0.5 text-paper opacity-100"
                              : "opacity-0 group-hover:opacity-60 -translate-x-1"
                          }`}
                          style={{ color: isSelected ? item.accent : undefined }}
                        />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Quick Stats Summary Card */}
            <div className="mt-2 rounded-2xl border border-white/5 bg-surface/30 backdrop-blur-md p-4 hidden sm:block">
              <div className="flex items-center gap-2 text-xs font-mono text-muted mb-2">
                <Target size={14} className="text-violet" />
                <span>Career Focus</span>
              </div>
              <p className="text-xs text-muted/80 leading-relaxed font-body">
                Dedicated to full-cycle AI development — combining mathematical theory, scalable async APIs, and production LLM orchestration.
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Animated Milestone Stage (8 cols on lg) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl border border-white/15 bg-surface/80 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
              >
                {/* Stage Header Accent Beam */}
                <div
                  className="pointer-events-none absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${activeItem.accent}, transparent)`,
                  }}
                />

                {/* Ambient Radial Spotlight */}
                <div
                  className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-20"
                  style={{ backgroundColor: activeItem.accent }}
                />

                {/* Subtle Geometric Background Watermark */}
                <div className="pointer-events-none absolute -bottom-10 -right-10 text-white/[0.03] rotate-12">
                  <IconComponent size={220} strokeWidth={0.8} />
                </div>

                {/* Stage Content */}
                <div className="relative z-10">
                  {/* Top Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg ${activeItem.themeIcon}`}
                      >
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${activeItem.themeBadge}`}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full animate-pulse"
                              style={{ backgroundColor: activeItem.accent }}
                            />
                            {activeItem.status}
                          </span>
                          <span className="font-mono text-xs text-muted">
                            {activeItem.type}
                          </span>
                        </div>
                        <h3
                          className={`mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-paper`}
                        >
                          {activeItem.role}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 font-mono text-xs text-muted">
                      <div className="flex items-center gap-1.5 bg-surface-2/80 px-3 py-1 rounded-full border border-white/5">
                        <Calendar size={13} style={{ color: activeItem.accent }} />
                        <span className="text-paper/90">{activeItem.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted/70 text-[11px] pr-1">
                        <MapPin size={11} />
                        <span>{activeItem.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Organization & Overview */}
                  <div className="mt-5">
                    <div className="flex items-center gap-2 font-mono text-sm font-medium text-paper/90">
                      <Building2 size={16} style={{ color: activeItem.accent }} />
                      <span>{activeItem.org}</span>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted/90 font-body">
                      {activeItem.summary}
                    </p>
                  </div>

                  {/* Key Responsibilities / Coursework Highlights */}
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted mb-3.5">
                      <TrendingUp size={14} style={{ color: activeItem.accent }} />
                      <span>Key Highlights &amp; Scope</span>
                    </h4>

                    <div className="grid grid-cols-1 gap-2.5">
                      {activeItem.highlights.map((highlight, hIdx) => (
                        <motion.div
                          key={hIdx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: hIdx * 0.06 }}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-2/40 border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <CheckCircle2
                            size={15}
                            className="shrink-0 mt-0.5"
                            style={{ color: activeItem.accent }}
                          />
                          <p className="text-xs sm:text-xs leading-relaxed text-paper/90">
                            {highlight}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Skills / Tech Matrix */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted shrink-0">
                      <Code2 size={13} style={{ color: activeItem.accent }} />
                      <span>Tech Stack:</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {activeItem.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-white/10 bg-surface-2/90 px-2.5 py-1 font-mono text-[10px] sm:text-[11px] text-paper/85 transition-all duration-200 hover:scale-105 hover:border-white/20 hover:text-paper"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
