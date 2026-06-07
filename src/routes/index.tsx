import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/lib/cart";
import { SpaceBackdrop } from "@/components/SpaceBackdrop";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { CombosSection } from "@/components/CombosSection";
import { FriesSection } from "@/components/FriesSection";
import { PromoBanner } from "@/components/PromoBanner";
import { AboutSection } from "@/components/AboutSection";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Burger Show — Las mejores hamburguesas de Corrientes Capital" },
      {
        name: "description",
        content:
          "Burger Show: hamburguesería premium en Corrientes Capital. Hamburguesas artesanales con papas gratis, combos épicos y pedidos por WhatsApp. Abierto de 20:00 a 02:00.",
      },
      { property: "og:title", content: "Burger Show — The Series · Corrientes" },
      {
        property: "og:description",
        content:
          "El show más sabroso de Corrientes. Hamburguesas artesanales, combos, papas gratis y pedidos por WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "keywords",
        content:
          "Burger Show Corrientes, hamburguesas Corrientes Capital, hamburguesería Corrientes, burger Corrientes, hamburguesas artesanales Corrientes",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Burger Show",
          servesCuisine: ["Hamburguesas", "American"],
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Corrientes",
            addressRegion: "Corrientes",
            addressCountry: "AR",
          },
          openingHours: "Mo-Su 20:00-02:00",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <SpaceBackdrop />
      <Nav />
      <main className="relative">
        <Hero />
        <MenuSection />
        <CombosSection />
        <PromoBanner />
        <FriesSection />
        <AboutSection />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
