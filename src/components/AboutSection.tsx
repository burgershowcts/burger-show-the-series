import { motion } from "framer-motion";
import { MapPin, Clock, Instagram, MessageCircle } from "lucide-react";
import { site } from "@/config/site";

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-primary">
              Historia · Lore
            </p>
            <h2 className="text-display mt-3 text-5xl text-foreground md:text-6xl">
              No vendemos <br />
              <span className="text-gradient-fire">hamburguesas</span>.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Creamos <strong className="text-foreground">experiencias</strong>. En Burger Show,
              cada hamburguesa es un episodio, cada combo una temporada y cada cliente es parte
              de la serie. Nacimos en Corrientes Capital con una sola obsesión: que probar una
              de nuestras hamburguesas se sienta como vivir el final perfecto de tu serie favorita.
            </p>

            <ul className="mt-8 grid gap-3 text-sm">
              {[
                ["6", "Episodios disponibles"],
                ["100%", "Carne fresca, hecha al momento"],
                ["🍟", "Papas gratis con cada burger"],
                ["20→02", "Horario de servicio"],
              ].map(([k, v]) => (
                <li
                  key={v}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card/60 px-4 py-3"
                >
                  <span className="text-display text-2xl text-primary">{k}</span>
                  <span className="text-foreground/85">{v}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary to-card p-10"
          >
            <div className="absolute inset-0 bg-grain opacity-30" />
            <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.84_0.18_88/0.45),transparent_70%)] blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.7_0.22_40/0.45),transparent_70%)] blur-3xl" />

            <div className="relative flex h-full flex-col justify-between">
              <div className="text-display text-[6rem] leading-[0.85] text-foreground/95 md:text-[8rem]">
                S<span className="text-primary text-glow-cheddar">01</span>
              </div>

              <div className="grid grid-cols-1 gap-2 text-sm">
                <Info icon={<MapPin className="h-4 w-4" />} label={site.city} />
                <Info icon={<Clock className="h-4 w-4" />} label={`${site.hours} hs`} />
                <Info icon={<Instagram className="h-4 w-4" />} label={`@${site.instagram}`} />
                <Info icon={<MessageCircle className="h-4 w-4" />} label={site.whatsappDisplay} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Info({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-3 py-2 backdrop-blur">
      <span className="grid h-7 w-7 place-items-center rounded-md bg-primary/15 text-primary">
        {icon}
      </span>
      <span className="text-foreground/90">{label}</span>
    </div>
  );
}
