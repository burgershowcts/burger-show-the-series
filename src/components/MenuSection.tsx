import { motion } from "framer-motion";
import { Plus, Flame } from "lucide-react";
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
          eyebrow="Temporada 1 · 6 episodios"
          title={
            <>
              EL <span className="text-gradient-fire">MENÚ</span>
            </>
          }
          subtitle="Cada hamburguesa es un episodio. Hacé click y mirá cómo se arma en vivo."
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
              className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_25px_60px_-12px_oklch(0.84_0.18_88/0.35)]"
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
                  <span className="rounded-md border border-border/60 bg-background/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground backdrop-blur">
                    {p.episode}
                  </span>
                  {p.badge && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-accent-foreground shadow-[0_0_20px_oklch(0.7_0.22_45/0.45)]">
                      <Flame className="h-3 w-3" /> {p.badge}
                    </span>
                  )}
                </div>
                {/* Fries badge */}
                {p.includesFries && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-primary/40 bg-background/70 px-2.5 py-1 text-[10px] font-semibold text-primary backdrop-blur">
                    🍟 Papas GRATIS
                  </span>
                )}
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-primary/95 text-primary-foreground shadow-[0_0_40px_oklch(0.84_0.18_88/0.6)]">
                    <Plus className="h-6 w-6" />
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-end justify-between gap-3 p-4">
                <div className="min-w-0">
                  <h3 className="text-display truncate text-xl text-foreground">
                    {p.name}
                  </h3>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{p.tagline}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Desde</p>
                  <p className="text-display text-lg text-primary text-glow-cheddar">
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
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-primary">{eyebrow}</p>
      <h2 className="text-display mt-3 text-5xl text-foreground sm:text-6xl md:text-7xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground md:text-lg">{subtitle}</p>}
    </div>
  );
}
