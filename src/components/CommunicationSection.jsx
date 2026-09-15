import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { profile } from "../data/content";

export default function CommunicationSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [statusMsg, setStatusMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setStatusMsg("Please fill out all required fields.");
      return;
    }

    setStatus("submitting");
    setStatusMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setStatusMsg(data.message || "Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setStatusMsg(data.message || "Failed to send message. Please try again or email directly.");
      }
    } catch (_err) {
      setStatus("error");
      setStatusMsg("Unable to connect to backend server. You can email me directly at " + profile.email);
    }
  };

  return (
    <section id="contact" className="relative border-t border-line px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet mb-2">
            08 // Communication
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-paper sm:text-4xl">
            Get In Touch &amp; Collaborate
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left Column: Heading & Info */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex flex-col justify-between lg:col-span-5"
          >
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-medium leading-tight text-paper">
                Let's build something intelligent together.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Open for full-time AI/ML engineering, software development roles, or technical collaborations. Drop a message or reach out through social channels.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 font-mono text-xs">
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-3 rounded-xl border border-line bg-surface-2 p-4 text-muted transition-colors hover:border-violet/40 hover:text-paper"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet/10 text-violet">
                  <Mail size={18} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-mono text-[10px] uppercase text-muted">Direct Email</p>
                  <p className="font-mono text-xs font-semibold text-paper truncate">{profile.email}</p>
                </div>
                <ArrowUpRight size={16} className="text-muted group-hover:text-violet transition-colors" />
              </a>

              <div className="mt-2 flex gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 py-3 text-muted transition-colors hover:border-violet/40 hover:text-paper"
                >
                  <Github size={15} /> GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 py-3 text-muted transition-colors hover:border-violet/40 hover:text-paper"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Communication Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bento-tile p-8 lg:col-span-7"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-violet mb-6 pb-4 border-b border-line/50">
              <MessageSquare size={16} />
              <span>SEND A DIRECT MESSAGE</span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-line bg-surface-2 px-4 py-2.5 text-sm text-paper placeholder-muted/60 transition-colors focus:border-violet focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full rounded-lg border border-line bg-surface-2 px-4 py-2.5 text-sm text-paper placeholder-muted/60 transition-colors focus:border-violet focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-muted">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, role, or question..."
                  className="w-full rounded-lg border border-line bg-surface-2 px-4 py-2.5 text-sm text-paper placeholder-muted/60 transition-colors focus:border-violet focus:outline-none"
                />
              </div>

              {statusMsg && (
                <div
                  className={`flex items-center gap-2 rounded-lg p-3 text-xs font-mono ${
                    status === "success"
                      ? "border border-green-500/30 bg-green-500/10 text-green-300"
                      : "border border-red-500/30 bg-red-500/10 text-red-300"
                  }`}
                >
                  {status === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{statusMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="specular-btn flex items-center justify-center gap-2 rounded-lg bg-violet px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-paper transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
