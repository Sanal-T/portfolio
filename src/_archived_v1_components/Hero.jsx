import { motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import AttentionGrid from "./AttentionGrid";
import { profile } from "../data/content";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-24"
    >
      <div className="absolute inset-0">
        <AttentionGrid />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-4xl"
      >
        <motion.p
          variants={item}
          className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-signal"
        >
          <span className="text-ember">&gt;</span> {profile.title}
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-5xl font-semibold leading-[1.08] tracking-tight text-paper sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="rounded-full bg-paper px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider text-ink transition-transform hover:scale-[1.03]"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider text-paper transition-colors hover:border-ember hover:text-ember"
          >
            Get In Touch
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
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="animate-bounce text-muted" size={18} />
      </motion.div>
    </section>
  );
}
