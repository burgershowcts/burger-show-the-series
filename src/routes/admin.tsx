import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Save, Plus, Trash2, RefreshCw, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({ meta: [{ title: "Panel Admin · Burger Show" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type ProductRow = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  in_stock: boolean;
  image_url: string | null;
  category: string;
  active: boolean;
  sort_order: number;
};

function AdminPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/auth" });
        return;
      }
      const uid = sess.session.user.id;
      if (!mounted) return;
      setUserId(uid);
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid);
      const admin = (roles ?? []).some((r) => r.role === "admin");
      if (!mounted) return;
      setIsAdmin(admin);
      setChecking(false);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/auth" });
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (checking) {
    return (
      <main className="min-h-screen grid place-items-center bg-background">
        <p className="text-sm text-muted-foreground">Cargando panel…</p>
      </main>
    );
  }
  if (!isAdmin) {
    return (
      <main className="min-h-screen grid place-items-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-display text-2xl">Sin permisos</h1>
          <p className="mt-2 text-sm text-muted-foreground">Tu cuenta ({userId}) no es administrador.</p>
          <button onClick={signOut} className="mt-4 rounded-md border border-border px-4 py-2 text-sm">
            Cerrar sesión
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3 w-3" /> Sitio
            </Link>
            <h1 className="text-display text-lg">Panel · BURGER SHOW</h1>
          </div>
          <button onClick={signOut} className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-secondary">
            <LogOut className="h-3.5 w-3.5" /> Salir
          </button>
        </div>
      </header>
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-8">
        <SettingsPanel />
        <ProductsPanel />
      </div>
    </main>
  );
}

function SettingsPanel() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["admin_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("key,value");
      if (error) throw error;
      const out: Record<string, string> = {};
      for (const row of data ?? []) {
        const v = row.value as unknown;
        out[row.key] = typeof v === "string" ? v : JSON.stringify(v);
      }
      return out;
    },
  });

  const [form, setForm] = useState<Record<string, string>>({});
  useEffect(() => {
    if (q.data) setForm(q.data);
  }, [q.data]);

  const save = useMutation({
    mutationFn: async (entries: Record<string, string>) => {
      const rows = Object.entries(entries).map(([key, value]) => ({ key, value }));
      const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin_settings"] });
      qc.invalidateQueries({ queryKey: ["site_settings"] });
    },
  });

  const fields: { key: string; label: string; help?: string }[] = [
    { key: "whatsapp", label: "WhatsApp (solo números, formato internacional)", help: "Ej: 5493794073008" },
    { key: "whatsapp_display", label: "WhatsApp visible", help: "Cómo se muestra al cliente" },
    { key: "hours", label: "Horarios de atención" },
    { key: "instagram", label: "Instagram (sin @)" },
    { key: "address", label: "Dirección / ubicación" },
  ];

  return (
    <section className="rounded-2xl border border-border bg-card/60 p-6">
      <h2 className="text-display text-xl mb-1">Configuración del local</h2>
      <p className="text-sm text-muted-foreground mb-5">
        Estos datos se aplican al carrito (WhatsApp), al footer y a la sección de contacto.
      </p>
      {q.isLoading ? (
        <p className="text-sm text-muted-foreground">Cargando…</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate(form);
          }}
          className="grid gap-4 md:grid-cols-2"
        >
          {fields.map((f) => (
            <label key={f.key} className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{f.label}</span>
              <input
                value={form[f.key] ?? ""}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[var(--neon-blue)]"
              />
              {f.help && <span className="mt-1 block text-[11px] text-muted-foreground">{f.help}</span>}
            </label>
          ))}
          <div className="md:col-span-2 flex items-center justify-end gap-3">
            {save.isError && <span className="text-xs text-destructive">{(save.error as Error).message}</span>}
            {save.isSuccess && <span className="text-xs text-[var(--neon-blue)]">Guardado.</span>}
            <button
              disabled={save.isPending}
              className="inline-flex items-center gap-1.5 rounded-md bg-[var(--neon-pink)] px-4 py-2 text-sm font-bold uppercase tracking-widest text-background hover:brightness-110 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {save.isPending ? "Guardando…" : "Guardar"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

function ProductsPanel() {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["admin_products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as ProductRow[];
    },
  });

  const upsert = useMutation({
    mutationFn: async (row: ProductRow) => {
      const { error } = await supabase.from("products").upsert(row, { onConflict: "id" });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin_products"] }),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin_products"] }),
  });

  const [newId, setNewId] = useState("");

  async function addNew() {
    const id = newId.trim().toLowerCase().replace(/\s+/g, "-");
    if (!id) return;
    await upsert.mutateAsync({
      id,
      name: "Nuevo producto",
      description: "",
      price: 0,
      stock: 0,
      in_stock: true,
      image_url: null,
      category: "burger",
      active: true,
      sort_order: 99,
    });
    setNewId("");
  }

  return (
    <section className="rounded-2xl border border-border bg-card/60 p-6">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
        <div>
          <h2 className="text-display text-xl mb-1">Productos</h2>
          <p className="text-sm text-muted-foreground">Editá precio, stock, nombre, descripción e imagen.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => qc.invalidateQueries({ queryKey: ["admin_products"] })}
            className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-secondary"
          >
            <RefreshCw className="h-3 w-3" /> Recargar
          </button>
          <input
            value={newId}
            onChange={(e) => setNewId(e.target.value)}
            placeholder="id-nuevo-producto"
            className="rounded-md border border-border bg-background px-3 py-1.5 text-xs"
          />
          <button
            onClick={addNew}
            className="inline-flex items-center gap-1 rounded-md bg-[var(--neon-blue)]/20 border border-[var(--neon-blue)]/60 px-3 py-1.5 text-xs text-[var(--neon-blue)] hover:bg-[var(--neon-blue)]/30"
          >
            <Plus className="h-3 w-3" /> Agregar
          </button>
        </div>
      </div>

      {q.isLoading ? (
        <p className="text-sm text-muted-foreground">Cargando productos…</p>
      ) : (
        <div className="space-y-3">
          {(q.data ?? []).map((p) => (
            <ProductRowEditor
              key={p.id}
              product={p}
              onSave={(r) => upsert.mutate(r)}
              onDelete={() => {
                if (confirm(`Eliminar ${p.name}?`)) del.mutate(p.id);
              }}
              saving={upsert.isPending}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ProductRowEditor({
  product,
  onSave,
  onDelete,
  saving,
}: {
  product: ProductRow;
  onSave: (r: ProductRow) => void;
  onDelete: () => void;
  saving: boolean;
}) {
  const [row, setRow] = useState<ProductRow>(product);
  useEffect(() => setRow(product), [product]);

  const dirty = JSON.stringify(row) !== JSON.stringify(product);

  return (
    <div className={`rounded-xl border p-4 transition-colors ${dirty ? "border-[var(--neon-pink)]/60 bg-[var(--neon-pink)]/5" : "border-border bg-background/40"}`}>
      <div className="grid gap-3 md:grid-cols-12">
        <div className="md:col-span-3">
          <Label>ID</Label>
          <input disabled value={row.id} className="input opacity-60" />
        </div>
        <div className="md:col-span-4">
          <Label>Nombre</Label>
          <input value={row.name} onChange={(e) => setRow({ ...row, name: e.target.value })} className="input" />
        </div>
        <div className="md:col-span-2">
          <Label>Categoría</Label>
          <select
            value={row.category}
            onChange={(e) => setRow({ ...row, category: e.target.value })}
            className="input"
          >
            <option value="burger">Hamburguesa</option>
            <option value="combo">Combo</option>
            <option value="papas">Papas</option>
            <option value="bebida">Bebida</option>
            <option value="extra">Extra</option>
          </select>
        </div>
        <div className="md:col-span-1">
          <Label>Precio</Label>
          <input
            type="number"
            value={row.price}
            onChange={(e) => setRow({ ...row, price: Number(e.target.value) })}
            className="input"
          />
        </div>
        <div className="md:col-span-1">
          <Label>Stock</Label>
          <input
            type="number"
            value={row.stock}
            onChange={(e) => setRow({ ...row, stock: Number(e.target.value) })}
            className="input"
          />
        </div>
        <div className="md:col-span-1 flex items-end">
          <label className="inline-flex items-center gap-1 text-xs">
            <input
              type="checkbox"
              checked={row.active}
              onChange={(e) => setRow({ ...row, active: e.target.checked })}
            />
            Activo
          </label>
        </div>
        <div className="md:col-span-8">
          <Label>Descripción</Label>
          <textarea
            value={row.description}
            onChange={(e) => setRow({ ...row, description: e.target.value })}
            rows={2}
            className="input resize-none"
          />
        </div>
        <div className="md:col-span-4">
          <Label>URL de imagen</Label>
          <input
            value={row.image_url ?? ""}
            onChange={(e) => setRow({ ...row, image_url: e.target.value || null })}
            placeholder="https://…"
            className="input"
          />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          onClick={onDelete}
          className="inline-flex items-center gap-1 rounded-md border border-destructive/50 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-3 w-3" /> Eliminar
        </button>
        <button
          disabled={!dirty || saving}
          onClick={() => onSave(row)}
          className="inline-flex items-center gap-1 rounded-md bg-[var(--neon-pink)] px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-background disabled:opacity-40"
        >
          <Save className="h-3 w-3" /> Guardar
        </button>
      </div>
      <style>{`.input{margin-top:.25rem;width:100%;border-radius:.375rem;border:1px solid hsl(var(--border));background:hsl(var(--background));padding:.5rem .65rem;font-size:.8rem;outline:none;}.input:focus{border-color:var(--neon-blue)}`}</style>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{children}</span>;
}
