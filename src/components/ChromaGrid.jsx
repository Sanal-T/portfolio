const palette = [
  { text: "text-violet", glow: "rgba(124, 92, 255, 0.16)", border: "hover:border-violet/50" },
  { text: "text-cyan", glow: "rgba(92, 217, 255, 0.16)", border: "hover:border-cyan/50" },
  { text: "text-coral", glow: "rgba(255, 92, 138, 0.16)", border: "hover:border-coral/50" },
];

// A colorful, per-category hover-reveal grid for the stack tile.
// Each category gets its own accent so the tile reads as "chroma" —
// the rest of the page stays single-accent violet.
export default function ChromaGrid({ groups }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {groups.map((group, i) => {
        const c = palette[i % palette.length];
        return (
          <div
            key={group.label}
            className={`group relative overflow-hidden rounded-lg border border-line bg-surface-2 p-3 transition-colors ${c.border}`}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(160px circle at 50% 0%, ${c.glow}, transparent 70%)`,
              }}
            />
            <h4 className={`relative font-mono text-[11px] uppercase tracking-wider ${c.text}`}>
              {group.label}
            </h4>
            <ul className="relative mt-2 space-y-1">
              {group.tags.map((tag) => (
                <li key={tag} className="font-mono text-[11px] text-muted">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
