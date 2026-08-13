import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/content";

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-line px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-signal"
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-3xl font-medium leading-tight text-paper sm:text-5xl"
        >
          Open to AI/ML and software
          <br />
          engineering roles.
        </motion.h2>

        <motion.a
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          href={`mailto:${profile.email}`}
          className="group mt-8 inline-flex items-center gap-2 font-mono text-lg text-ember sm:text-xl"
        >
          {profile.email}
          <ArrowUpRight
            size={20}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex gap-6"
        >
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-paper"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-paper"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-paper"
          >
            <Mail size={16} /> Email
          </a>
        </motion.div>
      </div>
    </section>
  );
}
