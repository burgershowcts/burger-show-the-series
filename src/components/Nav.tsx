import { ShoppingBag, Gamepad2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const links = [
  { href: "#menu", label: "Niveles" },
  { href: "#combos", label: "Misiones" },
  { href: "#papas", label: "Power-Ups" },
  { href: "#promo", label: "Bonus" },
  { href: "#about", label: "Lore" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <a href="#top" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/15 ring-1 ring-primary/40">
            <Flame className="h-4 w-4 text-primary animate-flicker" />
          </span>
          <span className="text-display text-base md:text-lg font-bold tracking-widest text-foreground">
            BURGER<span className="text-primary">SHOW</span>
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen(true)}
          className="relative inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_oklch(0.84_0.18_88/0.45)]"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Carrito</span>
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
