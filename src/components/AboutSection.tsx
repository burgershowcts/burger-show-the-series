import { motion } from "framer-motion";
import { MapPin, Clock, Instagram, MessageCircle, Zap } from "lucide-react";
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
            <p className="text-pixel text-xs uppercase tracking-[0.4em] text-[var(--neon-pink)] text-glow-pink">
              ▌ LORE · PLAYER STORY
            </p>
            <h2 className="text-display mt-4 text-3xl text-foreground md:text-4xl lg:text-5xl">
              EN BURGER SHOW <br />
              <span className="text-gradient-fire">NO SERVIMOS</span>
              <br />
              COMIDA RÁPIDA.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Creamos <strong className="text-foreground text-glow-cheddar">episodios memorables</strong>.
                Cada hamburguesa es una producción original, cada combo una temporada
                y cada visita una nueva historia.
              </p>
              <p>
                Nacimos en <strong className="text-foreground">Corrientes Capital</strong> con una misión:
                convertir una hamburguesa en una experiencia digna de maratón.
              </p>
            </div>

            <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
              {[
                { k: "+50K", v: "Mordidas legendarias", glow: "purple" },
                { k: "6", v: "Hamburguesas protagonistas", glow: "pink" },
                { k: "100%", v: "Carne fresca, hecha al momento", glow: "blue" },
                { k: "20→02", v: "Horario open arcade", glow: "cheddar" },
              ].map((it) => (
                <li
                  key={it.v}
                  className={`group flex items-center gap-4 rounded-xl border-2 border-border bg-card/60 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-[var(--neon-${it.glow})] hover:shadow-[0_0_30px_oklch(0.7_0.25_320/0.4)]`}
                >
                  <span className={`text-display text-2xl text-[var(--neon-${it.glow})] text-glow-${it.glow}`}>
                    {it.k}
                  </span>
                  <span className="text-foreground/85">{it.v}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Floating "Season" arcade card with glow pulse */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative aspect-square overflow-hidden rounded-3xl"
          >
            <div className="animate-float h-full w-full">
              <div className="animate-glow-pulse relative h-full w-full overflow-hidden rounded-3xl border-2 border-[var(--neon-purple)]/60 bg-gradient-to-br from-[oklch(0.18_0.1_305)] via-card to-[oklch(0.12_0.08_245)] p-10">
                {/* Animated grid floor */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3">
                  <div className="arcade-grid h-full w-full" />
                </div>

                {/* Scanlines */}
                <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />
                <div className="absolute inset-0 bg-grain opacity-25" />

                {/* Neon corner blobs */}
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.29_0/0.55),transparent_70%)] blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.65_0.27_305/0.55),transparent_70%)] blur-3xl" />
                <div className="absolute right-1/2 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.22_240/0.35),transparent_70%)] blur-2xl" />

                {/* HUD top bar */}
                <div className="relative flex items-center justify-between">
                  <span className="text-pixel text-xs uppercase tracking-[0.3em] text-[var(--neon-green)] text-glow-purple">
                    ▶ LOADED
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--neon-pink)]/60 bg-[var(--neon-pink)]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--neon-pink)] text-glow-pink">
                    <span className="h-1.5 w-1.5 animate-blink rounded-full bg-[var(--neon-pink)]" />
                    LIVE
                  </span>
                </div>

                <div className="relative mt-6 flex flex-col justify-between gap-8 h-[calc(100%-3rem)]">
                  <div>
                    <p className="text-pixel text-base tracking-[0.4em] text-muted-foreground">
                      SEASON
                    </p>
                    <div className="text-display flex items-end gap-2 leading-none">
                      <span className="text-[6rem] text-foreground md:text-[8rem]">S</span>
                      <span className="text-[6rem] text-[var(--neon-pink)] text-glow-pink md:text-[8rem]">
                        01
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-pixel text-sm text-[var(--neon-blue)] text-glow-blue">
                      <Zap className="h-4 w-4 animate-flicker" />
                      <span>NOW PLAYING IN CORRIENTES</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <Info icon={<MapPin className="h-4 w-4" />} label={site.city} />
                    <Info icon={<Clock className="h-4 w-4" />} label={`${site.hours} hs`} />
                    <Info icon={<Instagram className="h-4 w-4" />} label={`@${site.instagram}`} />
                    <Info icon={<MessageCircle className="h-4 w-4" />} label={site.whatsappDisplay} />
                  </div>
                </div>
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
    <div className="flex items-center gap-3 rounded-lg border border-[var(--neon-purple)]/40 bg-background/50 px-3 py-2 backdrop-blur">
      <span className="grid h-7 w-7 place-items-center rounded-md bg-[var(--neon-purple)]/20 text-[var(--neon-pink)]">
        {icon}
      </span>
      <span className="text-foreground/90">{label}</span>
    </div>
  );
}
