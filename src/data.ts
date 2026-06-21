import { GarmetItem, BoutiqueLocation, MaterialOption } from "./types";
import { IMAGES } from "./assets/images";

export const PRODUCTS: GarmetItem[] = [
  {
    id: "01",
    title: "The Alabaster Flow Dress",
    collection: "La Poésie du Mouvement",
    price: "$2,450",
    fabric: "Mulberry Silk",
    composition: "100% Organic Mulberry Imperial Silk",
    description: "An ethereal silhouette crafted to trace and amplify the wearer's natural cadence and grace. Its gossamer layers fall like architectural water, swaying fluidly with even the softest breath.",
    imageUrl: IMAGES.luxuryHero,
    details: [
      "Individually hand-rolled fine hems",
      "Internal silk georgette lining for opaque elegance",
      "Artisanal pleated collar with mother-of-pearl buttons",
      "Hidden side seam pocket detailing"
    ],
    attributes: {
      origin: "Woven in Lyon, France; Tailored in Paris",
      weight: "18 momme silk satin drape",
      care: "Specialist Eco-Dry Clean Only"
    }
  },
  {
    id: "02",
    title: "Travertine Minimal Trench",
    collection: "Sartorial Silence",
    price: "$3,800",
    fabric: "Flemish Linen & Cashmere Blend",
    composition: "70% Flemish Long-Staple Flax, 30% Pure Merino Cashmere",
    description: "Honoring clean lines and structural gravity, this oversized silhouette brings a sculpted presence. Structured yet soft, its fabric is treated with dynamic water-repellent biological wax.",
    imageUrl: IMAGES.brutalistMotion,
    details: [
      "Oversized notched lapels with deep sculptural backing",
      "Removable broad waist belt with stitched solid brass buckle",
      "Signature storm flap designed for biological kinetic ease",
      "Double-face lining construction with raw inner contrast piping"
    ],
    attributes: {
      origin: "Woven and treated in Flanders; Tailored in Milan",
      weight: "480g heavy structural matrix canvas",
      care: "Ammonite air clean, professional dry cleaning"
    }
  },
  {
    id: "03",
    title: "Burgundy Sculptural Solitaire",
    collection: "Draped Gravity",
    price: "$4,100",
    fabric: "Siena Crimson Heavy Silk Crêpe",
    composition: "100% Siena Forest-Grown Mulberry Silk Gown",
    description: "An elegant tribute to physical stillness and architectural form. This deep burgundy masterpiece utilizes weight ratios to suspend elegantly from a single asymmetrical shoulder stitch.",
    imageUrl: IMAGES.burgundyEditorial,
    details: [
      "Single-shoulder continuous fabric drape",
      "Asymmetrical bias-cut structure for personalized contour mapping",
      "Reinforced subtle inner structure with soft linen canvas",
      "Gold thread hand-whipped back seam highlights"
    ],
    attributes: {
      origin: "Woven in Como, Italy; Hand-finished in Milan Atelier",
      weight: "Heavy-weight dual-faced drape crêpe",
      care: "Horizontal dry storage, professional care"
    }
  },
  {
    id: "04",
    title: "The Atelier Raw Brass Clutch",
    collection: "Sculpted Objects",
    price: "$1,950",
    fabric: "Full-Grain Natural Vachetta Calfskin",
    composition: "Vegetable-tanned leather lined with fine linen",
    description: "An architectural ornament designed to accompany motion. Accentuated by a solid hand-forged brass raw-edge clasp that patinas uniquely to chronicle the keeper's personal travels.",
    imageUrl: IMAGES.editorialGoldAccent,
    details: [
      "Solid hand-forged untreated raw brass hardware",
      "Flesh-side raw interior lining with linen slot details",
      "Detachable hand-braided fine thread chain",
      "Stamped unique wax registry seal of completion"
    ],
    attributes: {
      origin: "Leathers sourced in Tuscany; Forged and stitched in Florence",
      weight: "340g solid brass & calfskin structure",
      care: "Beeswax coat conditioning, store in protective dustbag"
    }
  }
];

export const BOUTIQUE_LOCATIONS: BoutiqueLocation[] = [
  {
    id: "loc-1",
    city: "Paris",
    address: "18 Rue Saint-Honoré, Escaliers de Verre",
    ateliers: ["Haute Couture", "Ready-to-Wear Bespoke", "Private Bridal Lounge"],
    phone: "+33 (1) 42 68 80 00",
    coordinates: "48.8668° N, 2.3248° E"
  },
  {
    id: "loc-2",
    city: "Milan",
    address: "Via Montenapoleone, Suite 9B",
    ateliers: ["Tailoring Academy", "Custom Trench Visualizer Salon", "Leathercraft Archive"],
    phone: "+39 (02) 7600 5000",
    coordinates: "45.4682° N, 9.1953° E"
  },
  {
    id: "loc-3",
    city: "Tokyo",
    address: "5-Chōme Minami-Aoyama, Minimal Glass Pavilion",
    ateliers: ["Organic Silk Showroom", "Zen Acoustic Fitting Salon"],
    phone: "+81 (3) 5464 1200",
    coordinates: "35.6618° N, 139.7153° E"
  },
  {
    id: "loc-4",
    city: "New York",
    address: "116 Greene Street, Soho Cast Iron Chamber",
    ateliers: ["Kinetic Lookbook Salon", "Private Loft Fitting Lounge"],
    phone: "+1 (212) 966 3000",
    coordinates: "40.7252° N, 74.0012° W"
  }
];

export const BRASS_MATERIALS: MaterialOption[] = [
  {
    id: "mat-silk",
    name: "Imperial Mulberry Silk",
    type: "Organic Filament",
    description: "Cultivated ethically in old-growth mulberry forests. Offers an incredible sheen and unparalleled lightness that floats on the skin.",
    priceIncrease: "$450",
    hexColor: "#F4EFE6",
    weight: "18 momme featherweight",
    sustainabilityRating: 5
  },
  {
    id: "mat-flax",
    name: "Flemish Heavy-Staple Flax",
    type: "Hand-harvested Bast",
    description: "Loomed using historic wooden shuttles. Highly structured weave that retains memory, developing an exquisite rumpled character.",
    priceIncrease: "$300",
    hexColor: "#EADFC9",
    weight: "410g structure",
    sustainabilityRating: 5
  },
  {
    id: "mat-cashmere",
    name: "Organic Altai Cashmere",
    type: "Undercoat Fiber",
    description: "Sourced through traditional hand-combing. Incredibly warm with an architectural loft and a buttery touch that softens with age.",
    priceIncrease: "$750",
    hexColor: "#D1C7BD",
    weight: "320g thermal knit",
    sustainabilityRating: 4
  }
];

export const SILHOUETTES = [
  {
    id: "sil-dress",
    name: "The Liquid Draped Gown",
    description: "An elegant silhouette featuring an asymmetrical body-contour cascade with zero cut waste.",
    basePrice: "$2,200",
    productionTime: "4 weeks bespoke tailoring"
  },
  {
    id: "sil-trench",
    name: "The Sculpted Brutalist Overcoat",
    description: "Strong shoulder block with deep storm lapels, high cinched structural belt, and kinetic back splits.",
    basePrice: "$3,300",
    productionTime: "6 weeks bespoke tailoring"
  }
];
