import { motion } from "framer-motion";
import { MapPin, Clock, Zap, Gamepad2 } from "lucide-react";
import { site } from "@/config/site";
import heroBurger from "@/assets/hero-burger.jpg";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-24 md:pt-28">
      {/* Floating burger glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-x-0 top-12 md:top-0 mx-auto h-[58vh] w-[120vw] max-w-none"
        style={{ maxWidth: 1400 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.29_0/0.45),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.65_0.27_305/0.35),transparent_60%)] blur-2xl" />
        <img
          src={heroBurger}
          alt="Burger Show — hero"
          width={1536}
          height={1536}
          className="animate-float relative mx-auto h-full w-auto object-contain opacity-95 drop-shadow-[0_30px_80px_oklch(0.72_0.29_0/0.7)]"
        />
      </motion.div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-[26vh] text-center md:pt-[30vh]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-5 inline-flex items-center gap-2 rounded-md border-2 border-[var(--neon-pink)]/60 bg-[var(--neon-pink)]/10 px-3 py-1.5 text-pixel text-xs uppercase tracking-[0.35em] text-[var(--neon-pink)] text-glow-pink backdrop-blur"
        >
          <span className="inline-block h-1.5 w-1.5 animate-blink rounded-full bg-[var(--neon-pink)]" />
          ▸ PRESS START · SEASON 01
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-display flex flex-col items-center gap-1 text-[9vw] leading-[1] text-foreground text-glow-purple sm:text-[6vw] md:text-[5vw] lg:text-[4.5rem]"
        >
          <span>BURGER</span>
          <span className="text-gradient-fire text-glow-pink">SHOW</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-pixel mt-2 text-lg tracking-[0.4em] text-[var(--neon-blue)] text-glow-blue md:text-2xl"
        >
          ▌ THE · ARCADE · GAME ▐
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.7 }}
          className="mt-7 max-w-xl text-base text-muted-foreground md:text-lg"
        >
          Cada hamburguesa es un <span className="text-[var(--neon-pink)] font-bold">nivel</span>.
          Cada combo una <span className="text-[var(--neon-purple)] font-bold">misión</span>. Cada cliente,
          una nueva <span className="text-[var(--neon-blue)] font-bold">partida</span> en el show más sabroso de Corrientes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#menu" className="btn-arcade">
            <Gamepad2 className="h-4 w-4" />
            INSERT COIN · JUGAR
          </a>
          <a
            href="#promo"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-[var(--neon-blue)]/60 bg-background/40 px-6 py-3 text-pixel text-xs font-bold uppercase tracking-[0.18em] text-[var(--neon-blue)] text-glow-blue backdrop-blur transition-all hover:bg-[var(--neon-blue)]/15 hover:shadow-[0_0_28px_oklch(0.72_0.22_240/0.5)]"
          >
            <Zap className="h-4 w-4 animate-flicker" />
            MISIÓN BONUS
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="text-pixel mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[var(--neon-pink)]" /> {site.city}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-[var(--neon-purple)] md:inline-block" />
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-[var(--neon-blue)]" /> {site.hours}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-[var(--neon-pink)] md:inline-block" />
          <span className="inline-flex items-center gap-2 text-[var(--cheddar)]">
            🪙 PAPAS GRATIS · POWER UP
          </span>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-y-2 border-[var(--neon-purple)]/40 bg-background/70 py-3 backdrop-blur">
        <div className="text-pixel flex animate-[scroll_30s_linear_infinite] gap-8 whitespace-nowrap text-sm tracking-[0.3em] text-muted-foreground">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="text-[var(--neon-pink)] text-glow-pink">★</span>
              CADA BURGER · UN NIVEL
              <span className="text-[var(--neon-purple)] text-glow-purple">●</span>
              PAPAS GRATIS · POWER UP
              <span className="text-[var(--neon-blue)] text-glow-blue">▲</span>
              PEDIDOS POR WHATSAPP
              <span className="text-[var(--cheddar)] text-glow-cheddar">🪙</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
