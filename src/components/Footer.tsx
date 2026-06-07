import { Instagram, MapPin, MessageCircle, Clock } from "lucide-react";
import { site } from "@/config/site";

export function Footer() {
  const wa = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;
  return (
    <footer id="contacto" className="relative border-t border-border bg-background/80 py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <p className="text-display text-3xl text-foreground">
            BURGER<span className="text-primary">SHOW</span>
          </p>
          <p className="text-display mt-1 text-xs tracking-[0.35em] text-muted-foreground">
            THE · SERIES
          </p>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            {site.subtagline} Pedidos por WhatsApp todos los días de {site.hours} en {site.city}.
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Visitanos</p>
          <ul className="mt-3 space-y-2 text-sm text-foreground/85">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {site.city}</li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {site.hours}</li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Seguinos</p>
          <ul className="mt-3 space-y-2 text-sm text-foreground/85">
            <li>
              <a
                className="inline-flex items-center gap-2 hover:text-primary"
                href={wa}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 hover:text-primary"
                href={`https://instagram.com/${site.instagram}`}
                target="_blank"
                rel="noreferrer"
              >
                <Instagram className="h-4 w-4" /> @{site.instagram}
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 hover:text-primary"
                href={`https://tiktok.com/@${site.tiktok}`}
                target="_blank"
                rel="noreferrer"
              >
                <TikTokIcon className="h-4 w-4" /> @{site.tiktok}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-border px-4 pt-6 text-xs text-muted-foreground md:px-8 md:flex md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.brand}. Todos los derechos reservados.</p>
        <p className="mt-2 md:mt-0">Hecho con 🔥 en Corrientes Capital.</p>
      </div>
    </footer>
  );
}

function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.01a8.16 8.16 0 0 0 4.77 1.52V7.09a4.85 4.85 0 0 1-1.84-.4Z" />
    </svg>
  );
}
