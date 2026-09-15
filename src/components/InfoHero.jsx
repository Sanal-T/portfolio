import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, FileText, Sparkles, MapPin } from "lucide-react";
import { profile } from "../data/content";

export default function InfoHero() {
  return (
    <section id="info" className="relative min-h-[85vh] flex items-center justify-center px-6 pt-28 pb-16">
      <div className="mx-auto max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bento-tile relative overflow-hidden p-8 md:p-12"
        >
          {/* Subtle decorative glow orb */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-violet/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-cyan/10 blur-3xl" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-12 items-center">
            {/* Left side: Photo with neon rim lighting effect */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet via-cyan to-coral opacity-40 blur transition duration-500 group-hover:opacity-75" />
                <div className="relative h-48 w-48 md:h-56 md:w-56 overflow-hidden rounded-2xl border border-white/10 bg-surface-2 shadow-2xl">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Available Status Floating Badge */}
                {profile.available && (
                  <div className="absolute -bottom-3 -right-3 flex items-center gap-2 rounded-full border border-violet/30 bg-ink/90 px-3.5 py-1.5 backdrop-blur-md shadow-lg">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet" />
                    </span>
                    <span className="font-mono text-[11px] font-medium text-paper">
                      {profile.availability}
                    </span>
                  </div>
                )}
              </div>

              {/* Location Badge */}
              <div className="mt-6 flex items-center gap-1.5 font-mono text-xs text-muted">
                <MapPin size={14} className="text-violet" />
                <span>{profile.location}</span>
              </div>
            </div>

            {/* Right side: Information & Bio Tagline */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-violet mb-3">
                <Sparkles size={14} className="animate-pulse text-violet" />
                <span>{profile.title}</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-paper leading-[1.08]">
                {profile.name}
              </h1>

              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted max-w-xl">
                {profile.tagline}
              </p>

              {/* Primary Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="specular-btn flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition-transform hover:scale-[1.03]"
                >
                  <span>Explore Projects</span>
                  <ArrowUpRight size={15} />
                </a>

                <a
                  href="#contact"
                  className="specular-btn flex items-center gap-2 rounded-full border border-line bg-surface-2 px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider text-paper transition-all hover:border-violet/50 hover:bg-surface-2/80"
                >
                  <Mail size={14} className="text-violet" />
                  <span>Get In Touch</span>
                </a>

                {profile.resumeUrl && profile.resumeUrl !== "#" && (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-paper transition-colors py-2 px-3"
                  >
                    <FileText size={14} /> Resume
                  </a>
                )}
              </div>

              {/* Social Links Bar */}
              <div className="mt-8 pt-6 border-t border-line/60 flex items-center gap-4 font-mono text-xs text-muted">
                <span className="text-muted/60">Connect:</span>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-paper transition-colors"
                >
                  <Github size={14} /> GitHub
                </a>
                <span>•</span>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-paper transition-colors"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
                <span>•</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-1.5 hover:text-paper transition-colors"
                >
                  <Mail size={14} /> Email
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
