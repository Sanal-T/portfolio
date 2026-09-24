import { motion } from "framer-motion";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import BorderGlow from "./BorderGlow";
import SpotlightCard from "./SpotlightCard";
import StarBorder from "./StarBorder";
import { projects } from "../data/content";

const featured = projects.find((p) => p.featured) || projects[0];
const otherProjects = projects.filter((p) => !p.featured);

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative px-6 py-3 sm:py-4">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet mb-2">
            07 // Engineering Showcase
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            Featured Projects &amp; Software
          </h2>
        </motion.div>

        {/* Featured Project Showcase */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <StarBorder color="#7c3aed" speed="5s" borderRadius={24} className="w-full">
              <a
                href={featured.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between p-8 md:p-10 bento-tile"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-violet">
                      ★ Featured Project
                    </span>
                    <ArrowUpRight
                      size={20}
                      className="text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-violet"
                    />
                  </div>

                  <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold text-paper group-hover:text-violet transition-colors">
                    {featured.name}
                  </h3>

                  <p className="mt-4 text-base leading-relaxed text-muted max-w-3xl">
                    {featured.description}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-line/40">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-surface-2 px-3 py-1 font-mono text-xs text-paper/90 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </StarBorder>
          </motion.div>
        )}

        {/* Other Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((p, index) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <StarBorder color="#a855f7" speed="6s" borderRadius={16} className="h-full">
                <a href={p.href} target="_blank" rel="noreferrer" className="block h-full group">
                  <SpotlightCard className="flex h-full flex-col justify-between p-6 transition-colors hover:border-violet/40">
                    <div>
                      <div className="relative flex items-start justify-between gap-4 mb-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 text-violet border border-line">
                          <FolderGit2 size={18} />
                        </div>
                        <ArrowUpRight
                          size={18}
                          className="text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet"
                        />
                      </div>

                      <h3 className="relative font-display text-lg font-semibold text-paper group-hover:text-violet transition-colors">
                        {p.name}
                      </h3>

                      <p className="relative mt-2 text-xs leading-relaxed text-muted">
                        {p.description}
                      </p>
                    </div>

                    <div className="relative mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-line/40">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-surface-2/80 px-2 py-0.5 font-mono text-[10px] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </a>
              </StarBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
