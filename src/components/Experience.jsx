import { motion } from "framer-motion";
import TiltedCard from "./TiltedCard";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <section id="experience" className="relative border-t border-line px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 font-mono text-xs uppercase tracking-[0.25em] text-violet"
        >
          Experience &amp; Education
        </motion.p>

        <div className="grid gap-5 sm:grid-cols-2">
          {experience.map((e, i) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TiltedCard>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-medium text-paper">{e.role}</h3>
                  <span className="font-mono text-xs uppercase tracking-wider text-violet">
                    {e.period}
                  </span>
                </div>
                <p className="mt-1 font-mono text-sm text-muted">{e.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{e.description}</p>
              </TiltedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
