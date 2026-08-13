import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { projects } from "../data/content";

const secondary = projects.filter((p) => !p.featured);

export default function Projects() {
  return (
    <section id="work" className="relative border-t border-line px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 font-mono text-xs uppercase tracking-[0.25em] text-violet"
        >
          More Work
        </motion.p>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {secondary.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="break-inside-avoid"
            >
              <a href={p.href} target="_blank" rel="noreferrer" className="block">
                <SpotlightCard className="p-6 transition-colors hover:border-violet/40">
                  <div className="relative flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-medium text-paper">{p.name}</h3>
                    <ArrowUpRight
                      size={18}
                      className="mt-1 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet"
                    />
                  </div>
                  <p className="relative mt-3 text-sm leading-relaxed text-muted">
                    {p.description}
                  </p>
                  <div className="relative mt-4 flex flex-wrap gap-2">
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
