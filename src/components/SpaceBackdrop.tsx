import { useEffect, useRef } from "react";

/** Cinematic background: smoke layers, drifting particles, spotlight sweep. */
export function SpaceBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 70;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: (Math.random() * 1.6 + 0.3) * dpr,
      vx: (Math.random() - 0.5) * 0.15 * dpr,
      vy: -(Math.random() * 0.35 + 0.1) * dpr,
      a: Math.random() * 0.7 + 0.2,
      hue: Math.random() > 0.5 ? 38 : 18, // cheddar / fire
    }));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
        grad.addColorStop(0, `hsla(${p.hue}, 95%, 65%, ${p.a})`);
        grad.addColorStop(1, "hsla(38, 90%, 60%, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Vignette base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.15_0.02_50)_0%,oklch(0.06_0.005_60)_70%)]" />
      {/* Grain */}
      <div className="absolute inset-0 bg-grain opacity-40" />
      {/* Smoke blobs */}
      <div className="animate-smoke absolute -top-40 -left-40 h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle,oklch(0.7_0.22_40/0.18),transparent_70%)] blur-3xl" />
      <div className="animate-smoke absolute top-1/3 -right-40 h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,oklch(0.84_0.18_88/0.14),transparent_70%)] blur-3xl [animation-delay:-7s]" />
      <div className="animate-smoke absolute -bottom-32 left-1/4 h-[50vw] w-[50vw] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.22_25/0.16),transparent_70%)] blur-3xl [animation-delay:-4s]" />
      {/* Spotlight sweep */}
      <div className="animate-spotlight absolute -top-1/2 left-1/2 h-[200vh] w-[60vw] -translate-x-1/2 bg-[linear-gradient(180deg,oklch(0.84_0.18_88/0.08),transparent_60%)] blur-3xl opacity-60" />
      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
