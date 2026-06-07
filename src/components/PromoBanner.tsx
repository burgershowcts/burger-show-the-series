import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { promo } from "@/config/site";
import { formatARS, useCart } from "@/lib/cart";

export function PromoBanner() {
  const { addItem, setOpen } = useCart();
  return (
    <section id="promo" className="relative px-4 py-24 md:px-8 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-card via-card to-secondary p-8 md:p-14"
      >
        {/* fire bg */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.7_0.22_40/0.5),transparent_70%)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.84_0.18_88/0.45),transparent_70%)] blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-30" />

        <div className="relative grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
              <Flame className="h-3 w-3 animate-flicker" /> {promo.subtitle}
            </span>
            <h2 className="text-display mt-4 text-3xl leading-[1.05] text-foreground text-glow-purple md:text-5xl">
              {promo.title.split(" ").map((w, i) => (
                <span key={i} className={i === 1 ? "text-gradient-fire text-glow-pink" : ""}>
                  {w}{" "}
                </span>
              ))}
            </h2>
            <p className="mt-4 max-w-md text-base text-muted-foreground md:text-lg">
              {promo.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  addItem({
                    productId: "promo-mega",
                    name: promo.title,
                    extras: [],
                    unitPrice: promo.price,
                  });
                  setOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:scale-[1.04] hover:shadow-[0_0_50px_oklch(0.84_0.18_88/0.6)]"
              >
                <Flame className="h-4 w-4" /> {promo.cta}
              </button>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Promo total</p>
                <p className="text-display text-3xl text-primary text-glow-cheddar">
                  {formatARS(promo.price)}
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="text-display select-none text-center">
              <span className="block text-[6rem] leading-none text-[var(--neon-pink)] text-glow-pink md:text-[8rem]">
                2×1
              </span>
              <span className="text-pixel mt-3 inline-block rounded-md border-2 border-[var(--neon-blue)]/50 bg-background/60 px-3 py-1 text-xs tracking-[0.3em] text-[var(--neon-blue)] text-glow-blue backdrop-blur">
                BONUS LEVEL
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
