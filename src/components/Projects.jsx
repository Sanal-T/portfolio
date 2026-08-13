import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { projects } from "../data/content";

export default function Projects() {
  return (
    <section id="work" className="relative border-t border-line px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-signal"
        >
          Selected Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-14 font-display text-3xl font-medium text-paper sm:text-4xl"
        >
          Systems that reason, retrieve, and ship.
        </motion.h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className={p.featured ? "sm:col-span-2" : ""}
            >
              <a href={p.href} target="_blank" rel="noreferrer" className="block h-full">
                <SpotlightCard className="h-full p-7 transition-colors hover:border-ember/40">
                  <div className="relative flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-medium text-paper sm:text-2xl">
                      {p.name}
                    </h3>
                    <ArrowUpRight
                      size={20}
                      className="mt-1 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ember"
                    />
                  </div>
                  <p className="relative mt-3 max-w-xl text-sm leading-relaxed text-muted">
                    {p.description}
                  </p>
                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
