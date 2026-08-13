import { profile } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-xs text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with React, Tailwind &amp; Framer Motion — deployed on Vercel</p>
      </div>
    </footer>
  );
}
