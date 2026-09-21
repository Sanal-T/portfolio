import { motion } from "framer-motion";
import { Award, CheckCircle2, ExternalLink } from "lucide-react";
import { certifications } from "../data/content";

export default function Certifications() {
  return (
    <section id="certifications" className="relative border-t border-line px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet mb-2">
            04 // Credentials
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            Certifications &amp; Training
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bento-tile flex flex-col justify-between p-6 hover:border-violet/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/10 text-violet border border-violet/20 group-hover:scale-110 transition-transform">
                    <Award size={18} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-violet bg-violet/10 px-2.5 py-1 rounded-full border border-violet/20">
                    {cert.date}
                  </span>
                </div>

                <h3 className="font-display text-lg font-semibold text-paper group-hover:text-violet transition-colors">
                  {cert.title}
                </h3>

                <p className="mt-1 font-mono text-xs text-muted">
                  {cert.issuer}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-muted/80">
                  {cert.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line/50">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {cert.credentialUrl && cert.credentialUrl !== "#" && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-violet hover:underline"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
