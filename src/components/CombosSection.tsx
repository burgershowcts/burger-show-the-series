import { motion } from "framer-motion";
import { Plus, Trophy } from "lucide-react";
import { combos } from "@/config/site";
import { formatARS, useCart } from "@/lib/cart";
import { Header } from "./MenuSection";

export function CombosSection() {
  const { addItem } = useCart();
  return (
    <section id="combos" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Header
          eyebrow="Top 4 · Episodios Destacados"
          title={
            <>
              <span className="text-gradient-fire">COMBOS</span> ÉPICOS
            </>
          }
          subtitle="Pensados para compartir. O no."
        />

        <div className="relative mt-12 grid gap-5 md:grid-cols-2">
          {combos.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_30px_60px_-20px_oklch(0.84_0.18_88/0.3)]"
            >
              {/* Big rank number */}
              <span
                aria-hidden
                className="text-display pointer-events-none absolute -bottom-10 -right-6 select-none text-[12rem] leading-none text-primary/10 transition-all group-hover:text-primary/15"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                    <Trophy className="h-3 w-3" /> #{i + 1}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {c.episode}
                  </span>
                  {c.badge && (
                    <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                      {c.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-display mt-3 text-3xl text-foreground md:text-4xl">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>

                <ul className="mt-5 space-y-1.5">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-foreground/90">
                      <span className="h-1 w-1 rounded-full bg-primary" /> {it}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Precio combo</p>
                    <p className="text-display text-3xl text-primary text-glow-cheddar">
                      {formatARS(c.price)}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      addItem({
                        productId: c.id,
                        name: c.name,
                        extras: [],
                        unitPrice: c.price,
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:scale-[1.03] hover:shadow-[0_0_35px_oklch(0.84_0.18_88/0.5)]"
                  >
                    <Plus className="h-4 w-4" /> Agregar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
