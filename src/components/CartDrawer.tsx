import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart, formatARS } from "@/lib/cart";
import { useSiteSettings, buildWhatsappUrl } from "@/lib/useSiteSettings";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, total, buildMessage, clear } = useCart();
  const { settings } = useSiteSettings();
  const whatsappUrl = items.length ? buildWhatsappUrl(settings.whatsapp, buildMessage()) : undefined;


  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            key="drw"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-[0_0_60px_rgba(0,0,0,0.6)]"
          >
            <header className="flex items-center justify-between border-b border-border p-5">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/15 text-primary">
                  <ShoppingBag className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-display text-lg leading-none text-foreground">Tu Pedido</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    BURGER SHOW
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background/60 text-foreground hover:bg-background"
                aria-label="Cerrar carrito"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-3xl">
                      🍔
                    </div>
                    <p className="text-display text-lg text-foreground">El carrito está vacío</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Elegí tu primer episodio del menú.
                    </p>
                  </div>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((it) => {
                    const lineTotal =
                      it.qty * (it.unitPrice + it.extras.reduce((s, e) => s + e.price, 0));
                    return (
                      <li
                        key={it.key}
                        className="rounded-2xl border border-border bg-background/40 p-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-display text-base leading-tight text-foreground">
                              {it.name}
                              {it.size && (
                                <span className="ml-2 text-xs font-normal text-muted-foreground">
                                  · {it.size}
                                </span>
                              )}
                            </p>
                            {it.extras.length > 0 && (
                              <p className="mt-1 text-xs text-muted-foreground">
                                {it.extras.map((e) => e.name).join(", ")}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => remove(it.key)}
                            className="text-muted-foreground hover:text-destructive"
                            aria-label="Quitar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/40 p-1">
                            <button
                              onClick={() => setQty(it.key, it.qty - 1)}
                              className="grid h-7 w-7 place-items-center rounded-full text-foreground hover:bg-secondary"
                              aria-label="Quitar uno"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold tabular-nums">
                              {it.qty}
                            </span>
                            <button
                              onClick={() => setQty(it.key, it.qty + 1)}
                              className="grid h-7 w-7 place-items-center rounded-full text-foreground hover:bg-secondary"
                              aria-label="Sumar uno"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-display text-base text-primary">
                            {formatARS(lineTotal)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <footer className="border-t border-border bg-background/40 p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Total</span>
                <span className="text-display text-3xl text-primary text-glow-cheddar">
                  {formatARS(total)}
                </span>
              </div>
              <a
                href={items.length ? whatsappUrl : undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={items.length === 0}
                onClick={(e) => {
                  if (items.length === 0) e.preventDefault();
                }}
                className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold uppercase tracking-wider transition ${
                  items.length === 0
                    ? "cursor-not-allowed bg-secondary text-muted-foreground"
                    : "bg-[#25D366] text-white hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(37,211,102,0.5)]"
                }`}
              >
                <WhatsAppIcon className="h-5 w-5" />
                Pedir por WhatsApp
              </a>
              {items.length > 0 && (
                <button
                  onClick={clear}
                  className="mt-2 w-full text-center text-xs text-muted-foreground hover:text-foreground"
                >
                  Vaciar carrito
                </button>
              )}
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.13 1.59 5.93L0 24l6.39-1.67a11.83 11.83 0 0 0 5.65 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.17-1.24-6.15-3.37-8.45ZM12.05 21.5h-.01a9.7 9.7 0 0 1-4.94-1.36l-.36-.21-3.79.99 1.01-3.7-.23-.38a9.66 9.66 0 0 1-1.5-5.2c0-5.36 4.36-9.72 9.72-9.72 2.6 0 5.04 1.01 6.88 2.85a9.66 9.66 0 0 1 2.85 6.88c0 5.36-4.36 9.85-9.63 9.85Zm5.55-7.27c-.31-.16-1.8-.89-2.08-.99-.28-.1-.48-.16-.69.15-.2.31-.79.99-.97 1.2-.18.21-.36.23-.67.08-.31-.16-1.3-.48-2.47-1.53-.91-.81-1.52-1.81-1.7-2.12-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.54-.08-.16-.69-1.67-.95-2.29-.25-.6-.5-.52-.69-.53l-.59-.01c-.21 0-.54.08-.83.39-.28.31-1.08 1.06-1.08 2.58 0 1.52 1.11 2.99 1.27 3.2.16.21 2.19 3.34 5.31 4.68.74.32 1.31.51 1.76.66.74.24 1.41.21 1.94.13.59-.09 1.8-.74 2.05-1.45.25-.71.25-1.32.18-1.45-.07-.14-.28-.21-.59-.36Z" />
    </svg>
  );
}
