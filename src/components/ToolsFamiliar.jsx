import { motion } from "framer-motion";
import { Wrench, Terminal, Cpu, Database, Shield } from "lucide-react";
import { skillGroups } from "../data/content";

const categoryIcons = {
  "Core Engineering": Terminal,
  "AI / GenAI & ML": Cpu,
  "Databases & Storage": Database,
  "Backend & Security": Shield,
};

export default function ToolsFamiliar() {
  return (
    <section id="tools" className="relative border-t border-line px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet mb-2">
            05 // Tech Stack
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            Tools &amp; Technologies Familiar
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, index) => {
            const Icon = categoryIcons[group.label] || Wrench;
            return (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bento-tile p-6 hover:border-violet/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-line/50">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet/10 text-violet">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-paper">
                    {group.label}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {group.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-line bg-surface-2/90 px-3.5 py-1.5 font-mono text-xs text-paper/90 transition-all hover:border-violet/50 hover:bg-violet/10 hover:text-paper hover:scale-[1.03]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
