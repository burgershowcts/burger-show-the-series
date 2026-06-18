import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Gamepad2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({ meta: [{ title: "Acceso · Burger Show" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setMsg("Cuenta creada. Si el correo de confirmación está desactivado, ya podés iniciar sesión.");
        setMode("login");
      }
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card/80 backdrop-blur p-8 shadow-[0_0_60px_rgba(0,0,0,0.6)]">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <span className="grid h-9 w-9 place-items-center rounded-md border-2 border-[var(--neon-pink)]/60 bg-[var(--neon-pink)]/15 text-[var(--neon-pink)]">
            <Gamepad2 className="h-4 w-4" />
          </span>
          <span className="text-display tracking-widest text-sm">BURGER<span className="text-[var(--neon-pink)]">SHOW</span> · ADMIN</span>
        </Link>
        <h1 className="text-display text-2xl mb-1">{mode === "login" ? "Iniciar sesión" : "Crear cuenta admin"}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {mode === "login" ? "Acceso al panel de control." : "El primer usuario registrado es administrador."}
        </p>
        <form onSubmit={onSubmit} className="space-y-3">
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[var(--neon-blue)]"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Contraseña</span>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[var(--neon-blue)]"
            />
          </label>
          {err && <p className="text-sm text-destructive">{err}</p>}
          {msg && <p className="text-sm text-[var(--neon-blue)]">{msg}</p>}
          <button
            disabled={loading}
            className="w-full rounded-md bg-[var(--neon-pink)] px-4 py-2.5 text-sm font-bold uppercase tracking-widest text-background hover:brightness-110 disabled:opacity-50"
          >
            {loading ? "..." : mode === "login" ? "Entrar" : "Crear cuenta"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
        >
          {mode === "login" ? "¿No tenés cuenta? Crear una" : "Ya tengo cuenta · Iniciar sesión"}
        </button>
      </div>
    </main>
  );
}
