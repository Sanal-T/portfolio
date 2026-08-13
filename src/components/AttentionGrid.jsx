import { useEffect, useRef } from "react";

// A quiet grid of nodes with occasional "attention" pulses between them —
// a nod to attention-weight visualizations in transformer models.
// Deliberately subtle: low opacity, slow, non-distracting.
export default function AttentionGrid() {
  const canvasRef = useRef(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, nodes, dpr;
    let raf;
    let pulses = [];
    let lastPulse = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.max(6, Math.floor(width / 90));
      const rows = Math.max(4, Math.floor(height / 90));
      nodes = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (i + 0.5) * (width / cols) + (Math.random() - 0.5) * 24;
          const y = (j + 0.5) * (height / rows) + (Math.random() - 0.5) * 24;
          nodes.push({ x, y, r: Math.random() * 1.2 + 0.6 });
        }
      }
    }

    function spawnPulse(t) {
      if (nodes.length < 2) return;
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      // pick a nearby-ish node for a plausible "edge"
      let b = nodes[Math.floor(Math.random() * nodes.length)];
      let tries = 0;
      while (tries < 5 && Math.hypot(a.x - b.x, a.y - b.y) > 260) {
        b = nodes[Math.floor(Math.random() * nodes.length)];
        tries++;
      }
      pulses.push({ a, b, start: t, dur: 1800 + Math.random() * 1200 });
    }

    function draw(t) {
      ctx.clearRect(0, 0, width, height);

      // static dim nodes
      ctx.fillStyle = "rgba(236, 232, 222, 0.14)";
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduceMotion.current) {
        if (t - lastPulse > 420) {
          spawnPulse(t);
          lastPulse = t;
        }

        pulses = pulses.filter((p) => t - p.start < p.dur);
        for (const p of pulses) {
          const progress = (t - p.start) / p.dur;
          const fade = Math.sin(progress * Math.PI); // in-out
          const grad = ctx.createLinearGradient(p.a.x, p.a.y, p.b.x, p.b.y);
          grad.addColorStop(0, `rgba(255, 106, 69, ${0.55 * fade})`);
          grad.addColorStop(1, `rgba(77, 141, 255, ${0.35 * fade})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.a.x, p.a.y);
          ctx.lineTo(p.b.x, p.b.y);
          ctx.stroke();

          ctx.fillStyle = `rgba(255, 106, 69, ${0.8 * fade})`;
          ctx.beginPath();
          ctx.arc(p.a.x, p.a.y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(77, 141, 255, ${0.8 * fade})`;
          ctx.beginPath();
          ctx.arc(p.b.x, p.b.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
