import { ShoppingBag, Gamepad2, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
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
          <span className="grid h-9 w-9 place-items-center rounded-md border-2 border-[var(--neon-pink)]/60 bg-[var(--neon-pink)]/15 text-[var(--neon-pink)] shadow-[0_0_18px_oklch(0.72_0.29_0/0.55)]">
            <Gamepad2 className="h-4 w-4 animate-flicker" />
          </span>
          <span className="text-display text-sm md:text-base font-bold tracking-widest text-foreground text-glow-purple">
            BURGER<span className="text-[var(--neon-pink)] text-glow-pink">SHOW</span>
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-pixel rounded-md px-3 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-[var(--neon-purple)]/15 hover:text-[var(--neon-pink)]"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/admin"
            className="text-pixel hidden md:inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/40 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-[var(--neon-purple)]/60 hover:text-[var(--neon-purple)]"
            aria-label="Panel admin"
          >
            <Shield className="h-3.5 w-3.5" />
            Admin
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="text-pixel relative inline-flex items-center gap-2 rounded-md border-2 border-[var(--neon-blue)]/60 bg-[var(--neon-blue)]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neon-blue)] transition-all hover:bg-[var(--neon-blue)] hover:text-background hover:shadow-[0_0_24px_oklch(0.72_0.22_240/0.6)]"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Inventario</span>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--neon-pink)] px-1 text-[10px] font-bold text-background shadow-[0_0_12px_oklch(0.72_0.29_0/0.9)]">
                {count}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
