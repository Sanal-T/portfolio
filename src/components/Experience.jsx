import { motion } from "framer-motion";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <section id="experience" className="relative border-t border-line px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 font-mono text-xs uppercase tracking-[0.25em] text-signal"
        >
          Experience &amp; Education
        </motion.p>

        <ol className="relative border-l border-line pl-8">
          {experience.map((e, i) => (
            <motion.li
              key={e.role}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="mb-12 last:mb-0"
            >
              <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-ink bg-ember" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-medium text-paper sm:text-xl">
                  {e.role}
                </h3>
                <span className="font-mono text-xs uppercase tracking-wider text-signal">
                  {e.period}
                </span>
              </div>
              <p className="mt-1 font-mono text-sm text-muted">{e.org}</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                {e.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
