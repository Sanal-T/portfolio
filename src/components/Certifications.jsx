import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  GraduationCap,
  Brain,
  Cpu,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import { certifications } from "../data/content";

// Card themes per certification index/type
const certThemes = [
  {
    accent: "#7c5cff",
    glowRgb: "124, 92, 255",
    icon: GraduationCap,
    category: "Academic Specialization",
    badgeColor: "text-violet bg-violet/10 border-violet/30",
    iconBg: "bg-violet/10 border-violet/30 text-violet shadow-violet/20",
    hoverBorder: "group-hover:border-violet/50",
    tagBg: "bg-violet/5 text-violet/90 border-violet/20 group-hover:border-violet/40",
    gradientText: "from-purple-200 via-violet-300 to-indigo-300",
  },
  {
    accent: "#5cd9ff",
    glowRgb: "92, 217, 255",
    icon: Brain,
    category: "Applied Engineering",
    badgeColor: "text-cyan bg-cyan/10 border-cyan/30",
    iconBg: "bg-cyan/10 border-cyan/30 text-cyan shadow-cyan/20",
    hoverBorder: "group-hover:border-cyan/50",
    tagBg: "bg-cyan/5 text-cyan/90 border-cyan/20 group-hover:border-cyan/40",
    gradientText: "from-cyan-100 via-sky-200 to-blue-300",
  },
  {
    accent: "#34d399",
    glowRgb: "52, 211, 153",
    icon: Cpu,
    category: "Generative AI & LLMs",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    iconBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-emerald-500/20",
    hoverBorder: "group-hover:border-emerald-500/50",
    tagBg: "bg-emerald-500/5 text-emerald-300 border-emerald-500/20 group-hover:border-emerald-500/40",
    gradientText: "from-emerald-100 via-teal-200 to-emerald-300",
  },
];

function CertificationCard({ cert, index }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const theme = certThemes[index % certThemes.length];
  const IconComponent = theme.icon || Award;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // 3D tilt calculation
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;
    setTilt({ x: py * -6, y: px * 6 });
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.025, 1.025, 1)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered
            ? "transform 0.12s ease-out"
            : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          transformStyle: "preserve-3d",
        }}
        className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-surface/70 backdrop-blur-xl p-6 md:p-7 transition-all duration-300 hover:shadow-2xl overflow-hidden ${theme.hoverBorder}`}
      >
        {/* Dynamic Interactive Radial Cursor Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${theme.glowRgb}, 0.18), transparent 70%)`,
          }}
        />

        {/* Dynamic Border Edge Spotlight Glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${theme.glowRgb}, 0.45), transparent 70%)`,
            padding: "1px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Specular Light Sheen Sweeping Across on Hover */}
        <div
          className="pointer-events-none absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.08) 50%, transparent 60%)`,
            transform: isHovered
              ? "translateX(100%) translateY(100%)"
              : "translateX(-100%) translateY(-100%)",
            transition: "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* Ambient Top Subtle Glowing Beam */}
        <div
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-28 w-44 rounded-full blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-500"
          style={{ background: theme.accent }}
        />

        {/* Subtle Tech Grid Motif */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />

        {/* Subtle Background Watermark Seal */}
        <div className="pointer-events-none absolute -bottom-6 -right-6 text-white/[0.03] group-hover:text-white/[0.07] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
          <BadgeCheck size={140} strokeWidth={1} />
        </div>

        {/* Card Content - Top Section */}
        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
          {/* Header Row: Icon + Date Badge + Verified Indicator */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg ${theme.iconBg}`}
              >
                <IconComponent size={22} className="transition-transform group-hover:scale-105" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted/80">
                  {theme.category}
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: theme.accent }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ backgroundColor: theme.accent }}
                    />
                  </span>
                  <span className="font-mono text-[11px] font-medium text-paper/90">
                    {cert.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Verified Pill Badge */}
            <span
              className={`inline-flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm transition-all duration-300 ${theme.badgeColor} group-hover:scale-105`}
            >
              <CheckCircle2 size={11} className="shrink-0" />
              <span>Verified</span>
            </span>
          </div>

          {/* Title */}
          <h3
            className={`font-display text-xl font-semibold tracking-tight text-paper transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${theme.gradientText}`}
          >
            {cert.title}
          </h3>

          {/* Issuer */}
          <div className="mt-2 flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: theme.accent }}
            />
            <p className="font-mono text-xs font-medium text-muted group-hover:text-muted/95 transition-colors">
              {cert.issuer}
            </p>
          </div>

          {/* Description */}
          <p className="mt-3.5 text-xs leading-relaxed text-muted/80 group-hover:text-muted/95 transition-colors">
            {cert.description}
          </p>
        </div>

        {/* Card Content - Bottom Section (Tags & Verification Action) */}
        <div
          className="relative z-10 mt-6 pt-4 border-t border-white/10"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cert.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-lg border px-2.5 py-1 font-mono text-[10px] font-medium transition-all duration-200 hover:scale-105 ${theme.tagBg}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer Action Link or Verification Indicator */}
          <div className="flex items-center justify-between pt-1">
            {cert.credentialUrl && cert.credentialUrl !== "#" ? (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 font-mono text-xs font-semibold transition-all duration-200 hover:gap-2.5 ${theme.badgeColor.split(" ")[0]} hover:underline`}
              >
                <span>View Official Credential</span>
                <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted/70 group-hover:text-muted transition-colors">
                <ShieldCheck size={13} style={{ color: theme.accent }} />
                <span>Curriculum &amp; Capstone Validated</span>
              </div>
            )}

            <div className="font-mono text-[10px] text-muted/40 group-hover:text-muted/80 transition-colors">
              #{String(index + 1).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="relative px-6 py-12 sm:py-16 overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-violet/10 blur-3xl opacity-40 -z-10" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan/10 blur-3xl opacity-30 -z-10" />

      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs font-mono uppercase tracking-[0.25em] text-violet mb-3">
              <Sparkles size={12} className="animate-pulse" />
              <span>04 // Verified Credentials</span>
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              Certifications &amp; Training
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-muted/80 leading-relaxed font-body">
            Formal specializations, applied AI architectures, and continuous engineering training backing real-world systems.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.title} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
