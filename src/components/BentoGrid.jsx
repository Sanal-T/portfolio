import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, FileText } from "lucide-react";
import BorderGlow from "./BorderGlow";
import ChromaGrid from "./ChromaGrid";
import { profile, skillGroups, projects } from "../data/content";

const featured = projects.find((p) => p.featured) || projects[0];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function BentoGrid() {
  return (
    <section id="top" className="relative px-6 pb-16 pt-28">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl auto-rows-[minmax(140px,auto)] grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {/* Name / title tile — big, spans 2 rows on col 1 */}
        <motion.div
          variants={item}
          className="bento-tile flex flex-col justify-center p-8 sm:row-span-2"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-violet">
            <span className="text-coral">&gt;</span> {profile.title}
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-paper sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            {profile.tagline}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="specular-btn rounded-full bg-paper px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-ink transition-transform hover:scale-[1.03]"
            >
              View Work
            </a>
            {profile.resumeUrl && profile.resumeUrl !== "#" && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-paper"
              >
                <FileText size={14} /> Resume
              </a>
            )}
          </div>
        </motion.div>

        {/* Bio tile */}
        <motion.div
          variants={item}
          className="bento-tile flex flex-col justify-center p-6 sm:col-span-2"
        >
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Overview
          </p>
          <p className="text-sm leading-relaxed text-paper">{profile.bio}</p>
        </motion.div>

        {/* Featured project tile — Border Glow, the one loud element */}
        <motion.div variants={item} className="sm:col-span-2">
          <BorderGlow className="h-full">
            <a
              href={featured.href}
              target="_blank"
              rel="noreferrer"
              className="flex h-full flex-col justify-between p-6"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-violet">
                    Featured Project
                  </p>
                  <ArrowUpRight size={18} className="shrink-0 text-muted" />
                </div>
                <h3 className="mt-2 font-display text-xl font-medium text-paper sm:text-2xl">
                  {featured.name}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  {featured.description}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </BorderGlow>
        </motion.div>

        {/* Status tile */}
        <motion.div
          variants={item}
          className="bento-tile flex flex-col justify-center gap-1.5 p-6"
        >
          <div className="flex items-center gap-2">
            {profile.available && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
              </span>
            )}
            <p className="font-mono text-xs uppercase tracking-wider text-paper">
              {profile.availability}
            </p>
          </div>
          <p className="font-mono text-[11px] text-muted">{profile.location}</p>
        </motion.div>

        {/* Stack tile — Chroma Grid */}
        <motion.div variants={item} className="bento-tile p-6">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Stack
          </p>
          <ChromaGrid groups={skillGroups} />
        </motion.div>

        {/* Contact / CTA tile */}
        <motion.div
          variants={item}
          className="bento-tile flex flex-col justify-center gap-3 p-6"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Usage
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="specular-btn group flex items-center justify-between rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-xs text-paper transition-colors hover:border-violet/50"
          >
            <span className="flex items-center gap-2">
              <Mail size={14} /> {profile.email}
            </span>
            <ArrowUpRight
              size={14}
              className="text-muted transition-colors group-hover:text-violet"
            />
          </a>
          <div className="flex gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-xs text-muted transition-colors hover:border-violet/50 hover:text-paper"
            >
              <Github size={14} /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-xs text-muted transition-colors hover:border-violet/50 hover:text-paper"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
