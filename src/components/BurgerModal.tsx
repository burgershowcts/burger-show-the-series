import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "@/config/site";
import { extras as extrasList } from "@/config/site";
import { useCart, formatARS } from "@/lib/cart";
import { BurgerBuilder } from "./BurgerBuilder";

export function BurgerModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const [size, setSize] = useState<string | undefined>(undefined);
  const [chosenExtras, setChosenExtras] = useState<string[]>([]);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (product) {
      setSize(product.sizes?.[0]?.label);
      setChosenExtras([]);
      setPlay(false);
      // start build a tick later for smoother entry
      const t = setTimeout(() => setPlay(true), 250);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
  }, [product]);

  if (!product) return null;

  const sizeDelta =
    product.sizes?.find((s) => s.label === size)?.priceDelta ?? 0;
  const extrasObjs = extrasList.filter((e) => chosenExtras.includes(e.id));
  const unitPrice = product.price + sizeDelta;
  const total = unitPrice + extrasObjs.reduce((s, e) => s + e.price, 0);

  const toggleExtra = (id: string) =>
    setChosenExtras((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl overflow-hidden rounded-t-3xl md:rounded-3xl border border-border bg-card shadow-[0_30px_80px_rgba(0,0,0,0.6)] max-h-[92vh] md:max-h-[88vh]"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition hover:bg-background"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid h-full max-h-[92vh] md:max-h-[88vh] grid-rows-[auto_1fr] overflow-y-auto md:grid-cols-2 md:grid-rows-1">
            {/* Animation side */}
            <div className="relative flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,oklch(0.2_0.03_50),oklch(0.08_0.005_60))] p-6 md:p-10 min-h-[360px]">
              <div className="absolute left-5 top-5 text-display text-[10px] tracking-[0.35em] text-muted-foreground">
                {product.episode}
              </div>
              <BurgerBuilder product={product} play={play} />
              <button
                onClick={() => setPlay(false /* reset */) || setTimeout(() => setPlay(true), 80)}
                className="mt-12 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur hover:text-foreground"
              >
                <Flame className="h-3 w-3 text-accent" /> Repetir armado
              </button>
            </div>

            {/* Details side */}
            <div className="flex flex-col gap-5 p-6 md:p-8">
              {product.badge && (
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                  <Flame className="h-3 w-3" /> {product.badge}
                </span>
              )}
              <div>
                <h3 className="text-display text-3xl md:text-4xl text-foreground">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground italic">
                  {product.tagline}
                </p>
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed">
                {product.description}
              </p>

              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                  Ingredientes
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((i) => (
                    <span
                      key={i}
                      className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-xs text-foreground/85"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                    Tamaño
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => {
                      const active = s.label === size;
                      return (
                        <button
                          key={s.label}
                          onClick={() => setSize(s.label)}
                          className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
                            active
                              ? "border-primary bg-primary text-primary-foreground shadow-[0_0_25px_oklch(0.84_0.18_88/0.35)]"
                              : "border-border bg-secondary/40 text-foreground/85 hover:border-primary/50"
                          }`}
                        >
                          {s.label}
                          {s.priceDelta !== 0 && (
                            <span className="ml-1 opacity-70">
                              {s.priceDelta > 0 ? "+" : ""}
                              {formatARS(s.priceDelta)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                  Extras
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {extrasList
                    .filter((e) => e.enabled)
                    .map((e) => {
                      const active = chosenExtras.includes(e.id);
                      return (
                        <button
                          key={e.id}
                          onClick={() => toggleExtra(e.id)}
                          className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs transition ${
                            active
                              ? "border-primary/70 bg-primary/15 text-foreground"
                              : "border-border bg-secondary/30 text-foreground/80 hover:border-primary/40"
                          }`}
                        >
                          <span className="truncate">{e.name}</span>
                          <span className="ml-2 font-bold text-primary">+{formatARS(e.price)}</span>
                        </button>
                      );
                    })}
                </div>
              </div>

              {product.includesFries && (
                <div className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs text-foreground/90">
                  🍟 Incluye papas <span className="font-bold text-primary">GRATIS</span>
                </div>
              )}

              <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Total</p>
                  <p className="text-display text-3xl text-foreground text-glow-cheddar">
                    {formatARS(total)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    addItem({
                      productId: product.id,
                      name: product.name,
                      size,
                      extras: extrasObjs.map((e) => ({ id: e.id, name: e.name, price: e.price })),
                      unitPrice,
                    });
                    onClose();
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:scale-[1.03] hover:shadow-[0_0_40px_oklch(0.84_0.18_88/0.5)]"
                >
                  <Plus className="h-4 w-4" /> Agregar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
