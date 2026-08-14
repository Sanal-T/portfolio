import { motion } from "framer-motion";
import { skillGroups } from "../data/content";

export default function Skills() {
  return (
    <section id="skills" className="relative border-t border-line px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 font-mono text-xs uppercase tracking-[0.25em] text-signal"
        >
          Stack
        </motion.p>

        <div className="space-y-10">
          {skillGroups.map((group, gi) => (
            <div key={group.label} className="grid gap-4 sm:grid-cols-[160px_1fr]">
              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: gi * 0.05 }}
                className="font-display text-lg text-paper"
              >
                {group.label}
              </motion.h3>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag, ti) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.35, delay: gi * 0.05 + ti * 0.03 }}
                    className="rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-ember/50 hover:text-paper"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
