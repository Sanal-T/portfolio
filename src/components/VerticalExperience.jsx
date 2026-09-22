import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, Building2 } from "lucide-react";
import { experience } from "../data/content";
import StarBorder from "./StarBorder";

export default function VerticalExperience() {
  return (
    <section id="experience" className="relative border-t border-line px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet mb-2">
            03 // Timeline
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            Experience &amp; Education
          </h2>
        </motion.div>

        {/* Timeline Container with Continuous Vertical Line Connecting Downwards */}
        <div className="relative pl-6 sm:pl-10">
          {/* Glowing Vertical Line Stem */}
          <div className="absolute top-0 bottom-0 left-[11px] sm:left-[19px] w-0.5 bg-gradient-to-b from-violet via-cyan/60 to-violet/20" />

          <div className="flex flex-col gap-12">
            {experience.map((item, index) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Node dot on vertical line */}
                <div className="absolute -left-[30px] sm:-left-[39px] top-6 flex h-6 w-6 items-center justify-center rounded-full border border-violet bg-ink shadow-lg shadow-violet/20 group-hover:scale-125 transition-transform z-10">
                  <span className="h-2 w-2 rounded-full bg-violet" />
                </div>

                {/* Experience Card attached to vertical line */}
                <StarBorder color={index % 2 === 0 ? "#7c3aed" : "#ec4899"} speed="6s" borderRadius={16}>
                  <div className="bento-tile p-6 sm:p-8 hover:border-violet/40 transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-violet">
                        {item.type === "Degree" ? (
                          <GraduationCap size={16} />
                        ) : (
                          <Briefcase size={16} />
                        )}
                        <span>{item.type || "Role"}</span>
                      </div>

                      <div className="flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-xs text-muted">
                        <Calendar size={13} />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-paper">
                      {item.role}
                    </h3>

                    <div className="mt-1 flex items-center gap-2 font-mono text-sm text-muted">
                      <Building2 size={14} className="text-violet/70" />
                      <span>{item.org}</span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>

                    {item.skills && (
                      <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-line/40">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted border border-white/5"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </StarBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
