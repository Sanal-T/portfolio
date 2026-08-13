import { motion } from "framer-motion";
import { profile } from "../data/content";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-signal"
        >
          About
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-2xl font-medium leading-snug text-paper sm:text-3xl"
        >
          {profile.bio}
        </motion.p>
      </div>
    </section>
  );
}
