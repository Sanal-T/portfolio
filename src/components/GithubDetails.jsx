import { motion } from "framer-motion";
import { Github, ArrowUpRight, Code, GitBranch, Star, Terminal } from "lucide-react";
import { githubDetails, profile } from "../data/content";

export default function GithubDetails() {
  return (
    <section id="github" className="relative border-t border-line px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet mb-2">
            06 // Open Source
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            GitHub Details &amp; Activity
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="bento-tile p-8 md:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            {/* Left side: GitHub Profile Info & Direct Link */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 border border-line text-paper">
                    <Github size={24} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-paper">
                      @{githubDetails.username}
                    </h3>
                    <p className="font-mono text-xs text-violet">GitHub Developer Profile</p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted max-w-md">
                  {githubDetails.bio}
                </p>
              </div>

              <div className="mt-8">
                <a
                  href={githubDetails.url}
                  target="_blank"
                  rel="noreferrer"
                  className="specular-btn inline-flex items-center gap-2 rounded-xl bg-violet px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-paper transition-transform hover:scale-[1.02]"
                >
                  <Github size={16} />
                  <span>Visit GitHub Profile</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Right side: Stats Matrix */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {githubDetails.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-line bg-surface-2/60 p-4 backdrop-blur-sm"
                >
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-display text-xl font-bold text-paper">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Code Repos Highlight Footer */}
          <div className="mt-8 pt-6 border-t border-line/50 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-muted">
            <div className="flex items-center gap-2">
              <Code size={14} className="text-violet" />
              <span>Python &amp; Async FastAPI</span>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch size={14} className="text-cyan" />
              <span>RAG &amp; Agent Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-coral" />
              <span>Open Source Engineering</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
