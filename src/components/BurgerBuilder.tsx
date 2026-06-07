import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Product } from "@/config/site";

/** Cinematic build-up: layers fall one by one from above, glow + steam at the end. */
export function BurgerBuilder({ product, play }: { product: Product; play: boolean }) {
  const layers = product.buildLayers;
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!play) {
      setVisibleCount(0);
      setDone(false);
      return;
    }
    let i = 0;
    setVisibleCount(0);
    setDone(false);
    const id = setInterval(() => {
      i += 1;
      setVisibleCount(i);
      if (i >= layers.length) {
        clearInterval(id);
        setTimeout(() => setDone(true), 250);
      }
    }, 320);
    return () => clearInterval(id);
  }, [play, layers.length]);

  // stack layers from bottom up
  const stacked = layers.slice(0, visibleCount);
  const totalHeight = layers.reduce((s, l) => s + l.height, 0);

  return (
    <div className="relative mx-auto flex h-72 w-full max-w-sm items-end justify-center md:h-80">
      {/* Plate / spotlight */}
      <div className="absolute bottom-2 left-1/2 h-3 w-44 -translate-x-1/2 rounded-full bg-black/60 blur-md" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-44 w-72 -translate-y-2 rounded-full bg-[radial-gradient(ellipse_at_bottom,oklch(0.7_0.22_40/0.4),transparent_70%)] blur-xl" />

      {/* Steam */}
      <AnimatePresence>
        {done && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.5, 0], y: -120, scale: 1.4 }}
                transition={{ duration: 2.6, delay: i * 0.4, repeat: Infinity }}
                className="absolute bottom-44 h-16 w-12 rounded-full bg-white/15 blur-xl"
                style={{ left: `${42 + i * 8}%` }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Explosion glow */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.9, 0], scale: 1.6 }}
            transition={{ duration: 1.1 }}
            className="absolute inset-0 m-auto h-64 w-64 rounded-full bg-[radial-gradient(circle,oklch(0.84_0.18_88/0.65),transparent_70%)] blur-xl"
          />
        )}
      </AnimatePresence>

      <div
        className="relative flex w-56 flex-col-reverse items-center"
        style={{ minHeight: totalHeight }}
      >
        <AnimatePresence initial={false}>
          {stacked.map((layer, i) => (
            <motion.div
              key={`${i}-${layer.name}`}
              initial={{ y: -260, opacity: 0, rotate: -4 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 18,
                mass: 0.7,
              }}
              className="relative"
              style={{
                width:
                  i === 0
                    ? 200
                    : i === layers.length - 1
                      ? 200
                      : 184 - Math.min(i, 3) * 2,
                height: layer.height,
                background: `linear-gradient(180deg, ${layer.color}, color-mix(in oklab, ${layer.color} 70%, black))`,
                borderRadius:
                  i === layers.length - 1
                    ? "999px 999px 18px 18px"
                    : i === 0
                      ? "18px 18px 28px 28px"
                      : "10px",
                boxShadow:
                  "0 6px 14px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.18), inset 0 -3px 0 rgba(0,0,0,0.25)",
                marginTop: -3,
                zIndex: i + 1,
              }}
              title={layer.name}
            >
              {/* sesame seeds for top bun */}
              {i === layers.length - 1 && (
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-70">
                  {[0, 1, 2, 3].map((s) => (
                    <span
                      key={s}
                      className="h-1 w-1.5 rounded-full bg-amber-100"
                      style={{ transform: `translateY(${s % 2 ? -6 : -3}px)` }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-[-2.25rem] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary backdrop-blur"
        >
          Lista para el show ✨
        </motion.div>
      )}
    </div>
  );
}
