import burgerDefinitiva from "@/assets/burger-definitiva.jpg";
import burgerMordida from "@/assets/burger-mordida.jpg";
import burgerToon from "@/assets/burger-toon.jpg";
import burgerCartoon from "@/assets/burger-cartoon.jpg";
import burgerParque from "@/assets/burger-parque.jpg";
import burgerMega from "@/assets/burger-mega.jpg";
import friesMonstruo from "@/assets/fries-monstruo.jpg";

/**
 * Editá precios, productos, combos e info de contacto desde este único archivo.
 * Toda la web se actualiza automáticamente.
 */

export const site = {
  brand: "BURGER SHOW",
  tagline: "The Series",
  subtagline: "Cada hamburguesa tiene su propia historia.",
  city: "Corrientes Capital, Argentina",
  hours: "20:00 — 02:00",
  whatsapp: "+5493790000000", // sin signos, formato internacional
  whatsappDisplay: "+54 9 379 XXXX-XXXX",
  instagram: "burgershow",
  tiktok: "burgershow",
  facebook: "Burger Show",
  address: "Corrientes Capital, Argentina",
  mapsQuery: "Corrientes Capital, Argentina",
};

export type BurgerSize = { label: string; priceDelta: number };
export type Product = {
  id: string;
  name: string;
  episode: string; // ej. "S01·E01"
  category: "burger" | "combo" | "papas" | "bebida" | "extra";
  tagline: string;
  description: string;
  ingredients: string[];
  /** Capa visual para la animación cinematográfica de armado */
  buildLayers: { name: string; color: string; height: number; emoji?: string }[];
  price: number; // ARS
  image?: string;
  sizes?: BurgerSize[];
  badge?: string;
  includesFries?: boolean;
};

const baseLayers = [
  { name: "Pan inferior", color: "#c98a4b", height: 22 },
  { name: "Lechuga", color: "#7cc24a", height: 10 },
  { name: "Medallón 100g", color: "#5a2e1d", height: 22 },
  { name: "Cheddar", color: "#f6c04b", height: 8 },
  { name: "Bacon", color: "#a23a25", height: 9 },
  { name: "Cebolla", color: "#d8b48a", height: 8 },
  { name: "Salsa de la casa", color: "#e0a020", height: 6 },
  { name: "Pan superior", color: "#d59a55", height: 26 },
];

export const products: Product[] = [
  {
    id: "definitiva",
    name: "La Hamburguesa Definitiva",
    episode: "S01 · E01",
    category: "burger",
    tagline: "El piloto que lo empezó todo.",
    description:
      "El episodio fundacional. Pan de papa dorado, medallón sellado a la plancha y una salchicha alemana que cambia todo.",
    ingredients: [
      "Pan de papa",
      "Carne 100g",
      "Salchicha alemana",
      "Salsa criolla",
      "Queso tymbo",
      "Salsa de la casa",
    ],
    buildLayers: [
      { name: "Pan de papa", color: "#d59a55", height: 22 },
      { name: "Salsa criolla", color: "#c44a2a", height: 6 },
      { name: "Medallón 100g", color: "#5a2e1d", height: 22 },
      { name: "Queso tymbo", color: "#f0d27a", height: 8 },
      { name: "Salchicha alemana", color: "#9c4d2e", height: 14 },
      { name: "Salsa de la casa", color: "#e0a020", height: 6 },
      { name: "Pan superior", color: "#d59a55", height: 26 },
    ],
    price: 8900,
    image: burgerDefinitiva,
    sizes: [
      { label: "Doble", priceDelta: 0 },
      { label: "Triple", priceDelta: 2500 },
      { label: "Cuádruple", priceDelta: 4800 },
    ],
    badge: "ÉPICA",
    includesFries: true,
  },
  {
    id: "mordida-legendaria",
    name: "La Mordida Legendaria",
    episode: "S01 · E02",
    category: "burger",
    tagline: "Aros de cebolla y bacon en cámara lenta.",
    description:
      "Cheddar fundido sobre carne jugosa, aros de cebolla crocantes y bacon ahumado. Una mordida que se vuelve mito.",
    ingredients: [
      "Pan de papa",
      "Carne 100g",
      "Cheddar",
      "Salsa de la casa",
      "Aros de cebolla",
      "Bacon",
    ],
    buildLayers: [
      { name: "Pan de papa", color: "#d59a55", height: 22 },
      { name: "Medallón 100g", color: "#5a2e1d", height: 22 },
      { name: "Cheddar", color: "#f6c04b", height: 8 },
      { name: "Bacon", color: "#a23a25", height: 10 },
      { name: "Aros de cebolla", color: "#e8c98a", height: 14 },
      { name: "Salsa de la casa", color: "#e0a020", height: 6 },
      { name: "Pan superior", color: "#d59a55", height: 26 },
    ],
    price: 8600,
    image: burgerMordida,
    sizes: [
      { label: "Doble", priceDelta: 0 },
      { label: "Triple", priceDelta: 2500 },
    ],
    includesFries: true,
  },
  {
    id: "triple-toon",
    name: "La Triple Toon",
    episode: "S01 · E03",
    category: "burger",
    tagline: "Cheddar al cuadrado. Cuatro veces.",
    description:
      "Cuatro láminas de cheddar derritiéndose sobre bacon crocante y pepinillo ácido. Color saturado, sabor a maratón.",
    ingredients: ["Pan de papa", "Carne 100g", "Cheddar x4", "Bacon", "Pepinillo"],
    buildLayers: [
      { name: "Pan de papa", color: "#d59a55", height: 22 },
      { name: "Pepinillo", color: "#8aaa3a", height: 7 },
      { name: "Medallón 100g", color: "#5a2e1d", height: 22 },
      { name: "Cheddar", color: "#f6c04b", height: 6 },
      { name: "Cheddar", color: "#f6c04b", height: 6 },
      { name: "Bacon", color: "#a23a25", height: 10 },
      { name: "Cheddar", color: "#f6c04b", height: 6 },
      { name: "Cheddar", color: "#f6c04b", height: 6 },
      { name: "Pan superior", color: "#d59a55", height: 26 },
    ],
    price: 9100,
    image: burgerToon,
    sizes: [
      { label: "Simple", priceDelta: -1500 },
      { label: "Doble", priceDelta: 0 },
      { label: "Triple", priceDelta: 2500 },
    ],
    badge: "FAN FAVORITE",
    includesFries: true,
  },
  {
    id: "cartoon-bacon",
    name: "Cartoon Bacon",
    episode: "S01 · E04",
    category: "burger",
    tagline: "Mermelada de bacon. Cambia todo.",
    description:
      "Queso tymbo, cheddar y una mermelada de bacon casera que se vuelve adictiva al primer bocado.",
    ingredients: ["Pan de papa", "Carne 100g", "Queso tymbo", "Cheddar", "Mermelada de bacon"],
    buildLayers: [
      { name: "Pan de papa", color: "#d59a55", height: 22 },
      { name: "Medallón 100g", color: "#5a2e1d", height: 22 },
      { name: "Queso tymbo", color: "#f0d27a", height: 8 },
      { name: "Cheddar", color: "#f6c04b", height: 8 },
      { name: "Mermelada de bacon", color: "#7a2814", height: 8 },
      { name: "Pan superior", color: "#d59a55", height: 26 },
    ],
    price: 8800,
    image: burgerCartoon,
    sizes: [
      { label: "Doble", priceDelta: 0 },
      { label: "Triple", priceDelta: 2500 },
    ],
    includesFries: true,
  },
  {
    id: "burger-parque",
    name: "Burger del Parque",
    episode: "S01 · E05",
    category: "burger",
    tagline: "Clásica. Equilibrada. Atemporal.",
    description:
      "Frescura clásica: lechuga, tomate, pepinillo y nuestra salsa tasty sobre carne 100% al punto.",
    ingredients: ["Pan de papa", "Carne 100g", "Lechuga", "Tomate", "Pepinillo", "Salsa tasty"],
    buildLayers: [
      { name: "Pan de papa", color: "#d59a55", height: 22 },
      { name: "Lechuga", color: "#7cc24a", height: 10 },
      { name: "Tomate", color: "#c43c20", height: 8 },
      { name: "Medallón 100g", color: "#5a2e1d", height: 22 },
      { name: "Pepinillo", color: "#8aaa3a", height: 7 },
      { name: "Salsa tasty", color: "#e8c860", height: 6 },
      { name: "Pan superior", color: "#d59a55", height: 26 },
    ],
    price: 7900,
    image: burgerParque,
    sizes: [
      { label: "Simple", priceDelta: 0 },
      { label: "Doble", priceDelta: 1800 },
    ],
    includesFries: true,
  },
  {
    id: "mega-show",
    name: "Mega Show",
    episode: "S01 · E06",
    category: "burger",
    tagline: "El season finale. Sin reglas.",
    description:
      "Bacon, cheddar, cebolla tasty y salsa de la casa. Triple o cuádruple — vos elegís el desenlace.",
    ingredients: [
      "Pan de papa",
      "Carne 100g",
      "Bacon",
      "Cheddar",
      "Cebolla tasty",
      "Salsa de la casa",
    ],
    buildLayers: baseLayers,
    price: 11200,
    image: burgerMega,
    sizes: [
      { label: "Triple", priceDelta: 0 },
      { label: "Cuádruple", priceDelta: 2800 },
    ],
    badge: "SEASON FINALE",
    includesFries: true,
  },
];

export const fries: Product[] = [
  {
    id: "papas-clasicas",
    name: "Papas Clásicas",
    episode: "Especial",
    category: "papas",
    tagline: "Doradas, crocantes, eternas.",
    description: "Las de toda la vida. Doradas, crocantes, con esa sal en el punto justo.",
    ingredients: ["Papas"],
    buildLayers: [],
    price: 3200,
  },
  {
    id: "papas-chili",
    name: "Papas con Chili",
    episode: "Especial",
    category: "papas",
    tagline: "Con carne molida, cheddar y morrón.",
    description: "Papas cubiertas en chili casero, cheddar fundido y mayo de la casa.",
    ingredients: ["Papas", "Carne molida", "Cheddar", "Mayonesa de la casa", "Morrón"],
    buildLayers: [],
    price: 5400,
  },
  {
    id: "papas-monstruo",
    name: "Papas Monstruo",
    episode: "Especial",
    category: "papas",
    tagline: "Bacon, cheddar y salchichas. Para compartir.",
    description: "El plato para compartir. Bacon, cheddar fundido y salchichas en cada bocado.",
    ingredients: ["Papas", "Bacon", "Cheddar", "Salchichas"],
    buildLayers: [],
    price: 6900,
    image: friesMonstruo,
    badge: "TOP 3",
  },
  {
    id: "papas-rusticas",
    name: "Papas Rústicas",
    episode: "Especial",
    category: "papas",
    tagline: "Cáscara, queso tymbo, gloria.",
    description: "Cortadas con cáscara, horneadas y bañadas en queso tymbo derretido.",
    ingredients: ["Papas rústicas", "Queso tymbo"],
    buildLayers: [],
    price: 4600,
  },
];

export const drinks: Product[] = [
  { id: "pepsi", name: "Pepsi", episode: "", category: "bebida", tagline: "Clásica fría.", description: "500 ml bien fría.", ingredients: [], buildLayers: [], price: 1800 },
  { id: "7up", name: "7UP", episode: "", category: "bebida", tagline: "Lima limón.", description: "500 ml bien fría.", ingredients: [], buildLayers: [], price: 1800 },
  { id: "mirinda", name: "Mirinda", episode: "", category: "bebida", tagline: "Naranja.", description: "500 ml bien fría.", ingredients: [], buildLayers: [], price: 1800 },
];

export const extras: { id: string; name: string; price: number; enabled: boolean }[] = [
  { id: "extra-cheddar", name: "Extra cheddar", price: 900, enabled: true },
  { id: "extra-bacon", name: "Extra bacon", price: 1200, enabled: true },
  { id: "extra-medallon", name: "Extra medallón", price: 2200, enabled: true },
  { id: "extra-salsa", name: "Extra salsa de la casa", price: 600, enabled: true },
];

export type Combo = {
  id: string;
  name: string;
  episode: string;
  description: string;
  items: string[];
  price: number;
  badge?: string;
};

export const combos: Combo[] = [
  {
    id: "combo-leyendas",
    name: "Combo Leyendas",
    episode: "Temporada 1",
    description: "Dos episodios fundacionales, dos bebidas heladas.",
    items: ["2× La Hamburguesa Definitiva", "2× Bebida"],
    price: 19900,
  },
  {
    id: "combo-episodio-doble",
    name: "Combo Episodio Doble",
    episode: "Temporada 1",
    description: "El episodio más visto de la temporada, por duplicado.",
    items: ["2× La Mordida Legendaria", "2× Bebida"],
    price: 18900,
  },
  {
    id: "combo-toon",
    name: "Combo Toon",
    episode: "Temporada 1",
    description: "Cheddar en cada cuadro. Doble dosis.",
    items: ["2× La Triple Toon", "2× Bebida"],
    price: 19500,
    badge: "TOP",
  },
  {
    id: "combo-mega-show",
    name: "Combo Mega Show",
    episode: "Season Finale",
    description: "El cierre de temporada perfecto. Papas Monstruo incluidas.",
    items: ["2× Mega Show", "Papas Monstruo", "2× Bebida"],
    price: 27900,
    badge: "PROMO",
  },
];

export const promo = {
  title: "Promo de Temporada",
  subtitle: "Por tiempo limitado",
  description: "2× Mega Show · Papas Monstruo · 2× Bebida",
  price: 27900,
  cta: "PEDIR AHORA",
};

export const allProducts = [...products, ...fries, ...drinks];
