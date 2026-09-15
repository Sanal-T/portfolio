import { motion } from "framer-motion";
import { Database, Cpu, Server, ShieldCheck, CheckCircle2 } from "lucide-react";
import { profile, capabilities } from "../data/content";

const iconMap = {
  Database: Database,
  Cpu: Cpu,
  Server: Server,
  ShieldCheck: ShieldCheck,
};

export default function DescriptionCapabilities() {
  return (
    <section id="about" className="relative border-t border-line px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet mb-2">
            02 // Overview &amp; Capabilities
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            Description &amp; Engineering Focus
          </h2>
        </motion.div>

        {/* Bio Narrative Card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="bento-tile mb-12 p-8 md:p-10"
        >
          <div className="flex items-center gap-3 font-mono text-xs text-muted mb-4">
            <span className="h-2 w-2 rounded-full bg-violet animate-pulse" />
            <span>BIO NARRATIVE</span>
          </div>
          <p className="text-base md:text-lg leading-relaxed text-paper/90">
            {profile.bio}
          </p>
          
          <div className="mt-6 flex flex-wrap gap-4 pt-6 border-t border-line/50 font-mono text-xs text-muted">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-violet" />
              <span>Production-ready Python / FastAPI</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-violet" />
              <span>Vector Search &amp; FAISS Indexing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-violet" />
              <span>LangChain Agent Workflows</span>
            </div>
          </div>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {capabilities.map((cap, i) => {
            const Icon = iconMap[cap.icon] || Cpu;
            return (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bento-tile p-6 group hover:border-violet/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet/10 border border-violet/20 text-violet group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted bg-surface-2 px-2.5 py-1 rounded-md">
                    {cap.highlight}
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium text-paper group-hover:text-violet transition-colors">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {cap.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
