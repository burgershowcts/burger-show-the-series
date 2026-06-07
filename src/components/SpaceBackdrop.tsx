import { useEffect, useRef } from "react";

/** Arcade/synthwave backdrop: neon grid horizon, drifting pixel particles, scanlines. */
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

    const N = 80;
    const palette = [
      { h: 305, s: 95, l: 65 }, // neon purple
      { h: 340, s: 100, l: 65 }, // neon pink
      { h: 220, s: 95, l: 65 }, // electric blue
      { h: 55, s: 100, l: 65 }, // cheddar
    ];
    const particles = Array.from({ length: N }, () => {
      const c = palette[Math.floor(Math.random() * palette.length)];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: (Math.random() * 1.8 + 0.4) * dpr,
        vx: (Math.random() - 0.5) * 0.18 * dpr,
        vy: -(Math.random() * 0.35 + 0.1) * dpr,
        a: Math.random() * 0.8 + 0.2,
        ...c,
      };
    });

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
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 9);
        grad.addColorStop(0, `hsla(${p.h}, ${p.s}%, ${p.l}%, ${p.a})`);
        grad.addColorStop(1, `hsla(${p.h}, ${p.s}%, ${p.l}%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 9, 0, Math.PI * 2);
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
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.18_0.12_305)_0%,oklch(0.07_0.02_290)_70%)]" />

      {/* Neon horizon line */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-[linear-gradient(90deg,transparent,oklch(0.72_0.29_0/0.9),oklch(0.65_0.27_305/0.9),transparent)] shadow-[0_0_30px_oklch(0.72_0.29_0/0.8)]" />

      {/* Retro grid floor */}
      <div className="absolute inset-x-0 top-1/2 bottom-0 overflow-hidden">
        <div className="arcade-grid h-[200%] w-full" />
      </div>

      {/* Synthwave sun */}
      <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-[110%] rounded-full bg-[radial-gradient(circle,oklch(0.85_0.22_60)_0%,oklch(0.72_0.29_0)_50%,oklch(0.65_0.27_305)_100%)] opacity-60 blur-2xl" />

      {/* Neon corner blobs */}
      <div className="animate-smoke absolute -top-40 -left-40 h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,oklch(0.65_0.27_305/0.28),transparent_70%)] blur-3xl" />
      <div className="animate-smoke absolute top-1/4 -right-40 h-[50vw] w-[50vw] rounded-full bg-[radial-gradient(circle,oklch(0.72_0.29_0/0.22),transparent_70%)] blur-3xl [animation-delay:-7s]" />
      <div className="animate-smoke absolute -bottom-32 left-1/4 h-[45vw] w-[45vw] rounded-full bg-[radial-gradient(circle,oklch(0.72_0.22_240/0.22),transparent_70%)] blur-3xl [animation-delay:-4s]" />

      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Scanlines */}
      <div className="scanlines absolute inset-0 opacity-50" />
      {/* Grain */}
      <div className="absolute inset-0 bg-grain opacity-40" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
