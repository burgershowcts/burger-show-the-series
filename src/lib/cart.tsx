import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { site } from "@/config/site";

export type CartItem = {
  key: string; // unique cart line id
  productId: string;
  name: string;
  size?: string;
  extras: { id: string; name: string; price: number }[];
  unitPrice: number;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  addItem: (i: Omit<CartItem, "key" | "qty"> & { qty?: number }) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
  whatsappUrl: string;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const addItem: CartCtx["addItem"] = (i) => {
    const extrasKey = i.extras.map((e) => e.id).sort().join(",");
    const key = `${i.productId}|${i.size ?? ""}|${extrasKey}`;
    setItems((prev) => {
      const existing = prev.find((p) => p.key === key);
      if (existing) {
        return prev.map((p) => (p.key === key ? { ...p, qty: p.qty + (i.qty ?? 1) } : p));
      }
      return [...prev, { ...i, key, qty: i.qty ?? 1 }];
    });
    setOpen(true);
  };

  const remove = (key: string) => setItems((prev) => prev.filter((p) => p.key !== key));
  const setQty = (key: string, qty: number) =>
    setItems((prev) =>
      qty <= 0 ? prev.filter((p) => p.key !== key) : prev.map((p) => (p.key === key ? { ...p, qty } : p)),
    );
  const clear = () => setItems([]);

  const total = useMemo(
    () =>
      items.reduce(
        (sum, it) =>
          sum + it.qty * (it.unitPrice + it.extras.reduce((s, e) => s + e.price, 0)),
        0,
      ),
    [items],
  );

  const count = items.reduce((s, it) => s + it.qty, 0);

  const whatsappUrl = useMemo(() => {
    const lines = [
      "🍔 *Pedido — BURGER SHOW*",
      "",
      ...items.map((it) => {
        const extras = it.extras.length ? `\n   Extras: ${it.extras.map((e) => e.name).join(", ")}` : "";
        const size = it.size ? ` (${it.size})` : "";
        const subtotal =
          it.qty * (it.unitPrice + it.extras.reduce((s, e) => s + e.price, 0));
        return `• ${it.qty}× ${it.name}${size}${extras}\n   $${subtotal.toLocaleString("es-AR")}`;
      }),
      "",
      `*Total:* $${total.toLocaleString("es-AR")}`,
      "",
      "Gracias!",
    ];
    const msg = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${msg}`;
  }, [items, total]);

  return (
    <Ctx.Provider value={{ items, open, setOpen, addItem, remove, setQty, clear, total, count, whatsappUrl }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export const formatARS = (n: number) =>
  `$${n.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`;
