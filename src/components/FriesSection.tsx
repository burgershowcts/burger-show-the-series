import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { fries, drinks } from "@/config/site";
import { formatARS, useCart } from "@/lib/cart";
import { Header } from "./MenuSection";

export function FriesSection() {
  const { addItem } = useCart();
  return (
    <section id="papas" className="relative py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Header
          eyebrow="Spin-off oficial"
          title={
            <>
              <span className="text-gradient-fire">PAPAS</span> & MÁS
            </>
          }
          subtitle="Una saga aparte. Crocantes, cargadas, cinematográficas."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fries.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-accent/50"
            >
              <div className="relative aspect-square overflow-hidden bg-secondary">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-6xl">🍟</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                {p.badge && (
                  <span className="absolute right-3 top-3 rounded-md bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="text-display text-lg leading-tight text-foreground">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.description}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="text-display text-lg text-primary">{formatARS(p.price)}</span>
                  <button
                    onClick={() =>
                      addItem({
                        productId: p.id,
                        name: p.name,
                        extras: [],
                        unitPrice: p.price,
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition hover:shadow-[0_0_25px_oklch(0.84_0.18_88/0.5)]"
                  >
                    <Plus className="h-3.5 w-3.5" /> Agregar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bebidas */}
        <div className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent">Soundtrack</p>
              <h3 className="text-display mt-1 text-3xl text-foreground sm:text-4xl">BEBIDAS</h3>
            </div>
            <span className="text-xs text-muted-foreground">500 ml · bien frías</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {drinks.map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition hover:border-primary/50"
              >
                <div>
                  <p className="text-display text-xl text-foreground">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.tagline}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-display text-lg text-primary">{formatARS(d.price)}</span>
                  <button
                    onClick={() =>
                      addItem({
                        productId: d.id,
                        name: d.name,
                        extras: [],
                        unitPrice: d.price,
                      })
                    }
                    className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground transition hover:scale-110"
                    aria-label={`Agregar ${d.name}`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
