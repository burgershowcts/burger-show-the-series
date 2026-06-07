import { motion } from "framer-motion";
import { MapPin, Clock, Flame, Play } from "lucide-react";
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
        className="pointer-events-none absolute inset-x-0 top-12 md:top-0 mx-auto h-[60vh] w-[120vw] max-w-none"
        style={{ maxWidth: 1400 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.7_0.22_40/0.35),transparent_60%)] blur-2xl" />
        <img
          src={heroBurger}
          alt="Burger Show — hero"
          width={1536}
          height={1536}
          className="relative mx-auto h-full w-auto object-contain opacity-90 drop-shadow-[0_30px_80px_oklch(0.7_0.22_40/0.55)]"
        />
      </motion.div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-[28vh] text-center md:pt-[34vh]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-primary backdrop-blur"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Original Series · S01
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-display text-[14vw] leading-[0.88] text-foreground sm:text-[10vw] md:text-[8.5vw] lg:text-[7.5rem]"
        >
          BURGER <span className="text-gradient-fire text-glow-cheddar">SHOW</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-display mt-1 text-base tracking-[0.4em] text-muted-foreground md:text-lg"
        >
          THE · SERIES
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.7 }}
          className="mt-7 max-w-xl text-base text-muted-foreground md:text-lg"
        >
          {site.subtagline} El show más sabroso de Corrientes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#menu"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:scale-[1.03] hover:shadow-[0_0_50px_oklch(0.84_0.18_88/0.6)]"
          >
            <Play className="h-4 w-4 fill-current" />
            Ver Menú
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <a
            href="#promo"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-foreground backdrop-blur transition-all hover:border-primary/60 hover:bg-card/70"
          >
            <Flame className="h-4 w-4 text-accent" />
            Promociones
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground md:text-sm"
        >
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> {site.city}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-border md:inline-block" />
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" /> {site.hours}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-border md:inline-block" />
          <span className="inline-flex items-center gap-2">
            🍟 Todas las hamburguesas incluyen papas
          </span>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-y border-border/40 bg-background/50 py-3 backdrop-blur">
        <div className="flex animate-[scroll_30s_linear_infinite] gap-8 whitespace-nowrap text-display text-sm tracking-[0.3em] text-muted-foreground">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              CADA HAMBURGUESA · UN EPISODIO
              <span className="text-primary">●</span>
              PAPAS GRATIS · SIEMPRE
              <span className="text-accent">●</span>
              PEDIDOS POR WHATSAPP
              <span className="text-primary">●</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
