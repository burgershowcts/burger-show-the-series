import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useState } from "react";
import { products, type Product } from "@/config/site";
import { formatARS } from "@/lib/cart";
import { BurgerModal } from "./BurgerModal";

export function MenuSection() {
  const [open, setOpen] = useState<Product | null>(null);

  return (
    <section id="menu" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Header
          eyebrow="▌ SELECT YOUR CHARACTER · 6 NIVELES ▐"
          title={
            <>
              ELEGÍ TU <span className="text-gradient-fire text-glow-pink">PERSONAJE</span>
            </>
          }
          subtitle="Cada hamburguesa es un personaje desbloqueable. Tocá una para ver su build animado."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setOpen(p)}
              className="group relative overflow-hidden rounded-2xl border-2 border-border bg-card text-left transition-all hover:-translate-y-1 hover:border-[var(--neon-pink)]/70 hover:shadow-[0_0_45px_oklch(0.72_0.29_0/0.45)]"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                {/* Top tags */}
                <div className="absolute left-3 top-3 flex items-center gap-2">
                  <span className="text-pixel rounded-md border border-[var(--neon-blue)]/60 bg-background/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[var(--neon-blue)] backdrop-blur">
                    NIVEL {String(i + 1).padStart(2, "0")}
                  </span>
                  {p.badge && (
                    <span className="text-pixel inline-flex items-center gap-1 rounded-md bg-[var(--neon-pink)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-background shadow-[0_0_18px_oklch(0.72_0.29_0/0.7)]">
                      <Flame className="h-3 w-3" /> {p.badge}
                    </span>
                  )}
                </div>
                {/* Power-up badge */}
                {p.includesFries && (
                  <span className="text-pixel absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-[var(--cheddar)]/60 bg-background/80 px-2.5 py-1 text-[10px] font-semibold text-[var(--cheddar)] text-glow-cheddar backdrop-blur">
                    🪙 POWER-UP
                  </span>
                )}
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-pixel grid h-16 w-16 place-items-center rounded-md border-2 border-[var(--neon-pink)] bg-[var(--neon-pink)]/95 text-[10px] font-bold uppercase tracking-widest text-background shadow-[0_0_40px_oklch(0.72_0.29_0/0.8)]">
                    PLAY
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-end justify-between gap-3 p-4">
                <div className="min-w-0">
                  <h3 className="text-display truncate text-base text-foreground md:text-lg">
                    {p.name}
                  </h3>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{p.tagline}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-pixel text-[10px] uppercase tracking-widest text-muted-foreground">Score</p>
                  <p className="text-display text-base text-[var(--cheddar)] text-glow-cheddar">
                    {formatARS(p.price)}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <BurgerModal product={open} onClose={() => setOpen(null)} />
    </section>
  );
}

export function Header({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-pixel text-xs font-semibold uppercase tracking-[0.35em] text-[var(--neon-pink)] text-glow-pink">
        {eyebrow}
      </p>
      <h2 className="text-display mt-4 text-3xl text-foreground text-glow-purple sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-base text-muted-foreground md:text-lg">{subtitle}</p>}
    </div>
  );
}
