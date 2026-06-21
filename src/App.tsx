import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS } from "./data";
import { GarmetItem } from "./types";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import LookbookModal from "./components/LookbookModal";
import InteractiveVisualizer from "./components/InteractiveVisualizer";
import ShowroomBooking from "./components/ShowroomBooking";
import AmbientVibePlayer from "./components/AmbientVibePlayer";
import { 
  ShoppingBag, Trash2, ShieldCheck, Mail, ArrowRight, X, Sparkles, 
  ChevronRight, Compass, Heart, Globe, HelpCircle 
} from "lucide-react";

export default function App() {
  // Navigation Section tracker
  const [activeSection, setActiveSection] = useState("hero");

  // Shopping cart/bag states
  const [cart, setCart] = useState<{ garment: GarmetItem; size: string; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutMethod, setCheckoutMethod] = useState("pre-order");
  const [isCheckoutDone, setIsCheckoutDone] = useState(false);

  // Selected item to view/inspect look details
  const [selectedProduct, setSelectedProduct] = useState<GarmetItem | null>(null);

  // Newsletter ledger status
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Soundscape states
  const [soundState, setSoundState] = useState({ isPlaying: false, trackName: "ATELIER NO.4" });

  // Add Item to couture bag
  const handleAddToBag = (garment: GarmetItem, size: string) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.garment.id === garment.id && item.size === size
      );
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prevCart, { garment, size, quantity: 1 }];
    });
    // Open bag drawer for satisfying feedback unless it's a fast add
    setIsCartOpen(true);
  };

  // Remove Item from bag
  const handleRemoveFromBag = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Subtotal calculation
  const subtotal = cart.reduce((acc, item) => {
    const priceNum = parseInt(item.garment.price.replace(/[^0-9]/g, ""));
    return acc + priceNum * item.quantity;
  }, 0);

  // Smooth layout navigation transitions
  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCheckoutComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckoutDone(true);
    setTimeout(() => {
      setCart([]);
      setIsCheckoutDone(false);
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E1E1E] leading-normal antialiased selection:bg-gold-brass/30 selection:text-cream-950 font-sans">
      
      {/* 1. Interactive Ambient Soundscape module */}
      <AmbientVibePlayer
        isPlaying={soundState.isPlaying}
        onStateChange={(isPlaying, trackName) => setSoundState({ isPlaying, trackName })}
      />

      {/* 2. Top Viewport-Fixed Navigation Bar */}
      <Navbar
        onNavClick={handleScrollToSection}
        activeSection={activeSection}
        cartCount={cart.reduce((s, c) => s + c.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 3. Hero Section (Scattered Collage) */}
      <div id="hero">
        <HeroSection
          onExploreClick={() => handleScrollToSection("lookbook")}
          onBespokeClick={() => handleScrollToSection("visualizer")}
        />
      </div>

      {/* 4. Overlapping Editorial Collection Grid */}
      <section id="lookbook" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Subtle decorative quote */}
        <div className="absolute left-[3%] top-[40%] text-[#C5A880]/15 select-none font-serif italic text-6xl leading-tight pointer-events-none max-w-xs hidden lg:block">
          "Simplicity is the ultimate canvas of sophistication."
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-baseline justify-between border-b border-[#EADFC9]/50 pb-8 mb-16 gap-4">
          <div className="space-y-2 select-none">
            <span className="text-[10px] tracking-[0.25em] font-sans font-bold text-gold-dark uppercase block">
              SARTORIAL PORTFOLIO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-950 font-light tracking-tight leading-none">
              Edition II: <span className="italic">L'Art de l'Allure</span>
            </h2>
          </div>
          <div className="text-right flex items-center space-x-10 text-xs text-cream-900/60 font-medium tracking-[0.15em] select-none uppercase">
            <span>LOOKS 01 — 04</span>
            <span className="w-12 h-[1px] bg-gold-brass" />
            <span>WINTER SOLSTICE ARCHIVE</span>
          </div>
        </div>

        {/* Asymmetric Scattered collage of 4 items */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12 lg:gap-x-16 items-start pb-12">
          
          {/* LOOK 1: The Alabaster Flow Dress (Overlapping Left, Tall proportions) */}
          <div className="md:col-span-7 space-y-4">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] overflow-hidden rounded-xs bg-[#F4EFE6] shadow-[0_15px_35px_rgba(28,26,24,0.08)] group cursor-pointer"
              onClick={() => setSelectedProduct(PRODUCTS[0])}
            >
              <img
                src={PRODUCTS[0].imageUrl}
                alt={PRODUCTS[0].title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream-950/40 via-transparent to-transparent opacity-90 group-hover:opacity-100 duration-500 transition-opacity p-6 sm:p-8 flex flex-col justify-end text-white">
                <span className="font-mono text-[9px] tracking-widest text-[#C5A880] uppercase font-bold">Look 01 — Imperial drape</span>
                <h3 className="font-serif text-2xl tracking-[0.05em] mt-1.5 font-light">{PRODUCTS[0].title}</h3>
                <p className="text-white/70 text-xs font-sans font-light mt-2 max-w-sm leading-relaxed truncate group-hover:whitespace-normal group-hover:overflow-visible transition-all">
                  {PRODUCTS[0].description}
                </p>
                <div className="mt-4 flex items-center space-x-2 text-[10px] tracking-widest font-mono text-gold-brass opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span>INSPECT SARTORIAL SHEETS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* LOOK 2: Travertine Minimal Trench (Centered Right, Smaller Offset) */}
          <div className="md:col-span-5 space-y-4 md:mt-24">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] overflow-hidden rounded-xs bg-[#F4EFE6] shadow-[0_15px_30px_rgba(28,26,24,0.08)] group cursor-pointer"
              onClick={() => setSelectedProduct(PRODUCTS[1])}
            >
              <img
                src={PRODUCTS[1].imageUrl}
                alt={PRODUCTS[1].title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream-950/40 via-transparent to-transparent opacity-90 group-hover:opacity-100 duration-500 transition-opacity p-6 flex flex-col justify-end text-white">
                <span className="font-mono text-[9px] tracking-widest text-[#C5A880] uppercase font-bold">Look 02 — Kinetic Overcoat</span>
                <h3 className="font-serif text-xl tracking-[0.05em] mt-1 font-light">{PRODUCTS[1].title}</h3>
                <div className="mt-3.5 flex items-center space-x-2 text-[9px] tracking-widest font-mono text-gold-brass opacity-0 group-hover:opacity-100 duration-300">
                  <span>INSPECT SARTORIAL SHEETS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* LOOK 3: Burgundy Sculptural Solitaire (Left Column, Offset Below) */}
          <div className="md:col-span-5 space-y-4 md:-mt-12">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] overflow-hidden rounded-xs bg-[#F4EFE6] shadow-[0_15px_30px_rgba(28,26,24,0.08)] group cursor-pointer"
              onClick={() => setSelectedProduct(PRODUCTS[2])}
            >
              <img
                src={PRODUCTS[2].imageUrl}
                alt={PRODUCTS[2].title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream-950/40 via-transparent to-transparent opacity-90 group-hover:opacity-100 duration-500 transition-opacity p-6 flex flex-col justify-end text-white">
                <span className="font-mono text-[9px] tracking-widest text-[#C5A880] uppercase font-bold">Look 03 — DOURA SILK GOWN</span>
                <h3 className="font-serif text-xl tracking-[0.05em] mt-1 font-light">{PRODUCTS[2].title}</h3>
                <div className="mt-3.5 flex items-center space-x-2 text-[9px] tracking-widest font-mono text-gold-brass opacity-0 group-hover:opacity-100 duration-300">
                  <span>INSPECT SARTORIAL SHEETS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* LOOK 4: The Atelier Raw Brass Clutch (Right Column, Large & Overlapping) */}
          <div className="md:col-span-7 space-y-4 md:mt-[60px]">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[3/4] md:aspect-[4/3] overflow-hidden rounded-xs bg-[#F4EFE6] shadow-[0_20px_45px_rgba(28,26,24,0.1)] group cursor-pointer"
              onClick={() => setSelectedProduct(PRODUCTS[3])}
            >
              <img
                src={PRODUCTS[3].imageUrl}
                alt={PRODUCTS[3].title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cream-950/50 via-transparent to-transparent opacity-90 group-hover:opacity-100 duration-500 transition-opacity p-6 sm:p-8 flex flex-col justify-end text-white">
                <span className="font-mono text-[9px] tracking-widest text-[#C5A880] uppercase font-bold">Look 04 — Structured Leathercraft</span>
                <h3 className="font-serif text-2xl tracking-[0.05em] mt-1.5 font-light">{PRODUCTS[3].title}</h3>
                <p className="text-white/70 text-xs font-sans font-light mt-2 max-w-sm truncate">
                  {PRODUCTS[3].description}
                </p>
                <div className="mt-4 flex items-center space-x-2 text-[10px] tracking-widest font-mono text-gold-brass opacity-0 group-hover:opacity-100 duration-300">
                  <span>INSPECT SARTORIAL SHEETS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 5. Creative Vision / Brand Manifesto */}
      <section id="manifesto" className="bg-[#1E1B18] text-[#FDFBF7] py-28 relative overflow-hidden">
        {/* Soft decorative radial gradient warm core */}
        <div className="absolute w-[800px] h-[800px] rounded-full bg-gold-brass/5 blur-[180px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center space-y-12 relative z-10 select-none">
          
          <div className="flex justify-center space-x-2 items-center text-[#C5A880] text-[10px] tracking-[0.4em] font-mono leading-none">
            <span className="w-2 h-2 border border-gold-brass transform rotate-45" />
            <span>THE CREATIVE MANIFESTO</span>
            <span className="w-2 h-2 border border-gold-brass transform rotate-45" />
          </div>

          <blockquote className="font-serif text-2xl sm:text-3xl md:text-5xl font-extralight tracking-tight leading-[1.3] text-cream-50 select-none">
            "Silence is the ultimate premium language of luxury. We build architecture for the body, suspending form between gravitational weight and kinetic grace."
          </blockquote>

          <div className="h-[1px] w-24 bg-gold-brass/35 mx-auto" />

          {/* Editorial Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left max-w-3xl mx-auto pt-4">
            <div className="space-y-2">
              <span className="font-serif text-xs text-[#C5A880] tracking-widest uppercase block">I. Kinetic Grace</span>
              <p className="text-xs text-white/50 leading-relaxed font-sans font-light">
                Garments must never constrain the wearer. We utilize bias cuts and structural fluid anchors to ensure elegant resonance on every step.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-serif text-xs text-[#C5A880] tracking-widest uppercase block">II. Material Silence</span>
              <p className="text-xs text-white/50 leading-relaxed font-sans font-light">
                No loud branding, no temporary trends. Premium un-dyed long silk drapes, Flemish flax weaves, and solid brass detailing speak in soft whispers.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-serif text-xs text-[#C5A880] tracking-widest uppercase block">III. Zero Waste Design</span>
              <p className="text-xs text-white/50 leading-relaxed font-sans font-light">
                Each silhouette honors the original rectangular weave loom sizes, engineered surgically to leave zero yarn behind in our ateliers.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Customized Bespoke Builder / Interactive Visualizer */}
      <InteractiveVisualizer onAddToBag={handleAddToBag} />

      {/* 7. Showroom Booking */}
      <ShowroomBooking />

      {/* 8. Elegant Editorial Footer (Warm ecru) */}
      <footer className="bg-[#1E1B18] text-[#FDFBF7] pt-20 pb-12 border-t border-[#EADFC9]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Atelier Brand Column (4 Columns) */}
            <div className="md:col-span-4 space-y-4">
              <span className="font-serif text-2xl tracking-[0.25em] text-white block">
                A T E L I E R <span className="text-[#C5A880]">O R É E</span>
              </span>
              <p className="text-zinc-500 text-xs leading-relaxed font-sans font-light max-w-xs">
                A luxury couture house chronicling sensory still drapes, heavy Flemish coats, and hand-patina metalworks. Operating global sanctuaries for private fittings.
              </p>
              <div className="flex items-center space-x-3 text-zinc-500 font-mono text-[10px] pt-1 select-none">
                <Globe className="w-3.5 h-3.5 text-gold-brass" />
                <span>COMO / PARIS / TOKYO / NY</span>
              </div>
            </div>

            {/* Sitemap Navigation Links (5 Columns) */}
            <div className="md:col-span-5 grid grid-cols-2 gap-4">
              <div className="space-y-3.5">
                <span className="font-serif text-xs text-[#C5A880] tracking-widest uppercase font-medium">SANCTUARIES</span>
                <ul className="space-y-2 text-zinc-500 text-[11px] font-sans font-light">
                  <li><button onClick={() => handleScrollToSection("showroom")} className="hover:text-white transition-colors cursor-pointer text-left">Paris, Rue Saint-Honoré</button></li>
                  <li><button onClick={() => handleScrollToSection("showroom")} className="hover:text-white transition-colors cursor-pointer text-left">Milan, Montenapoleone</button></li>
                  <li><button onClick={() => handleScrollToSection("showroom")} className="hover:text-white transition-colors cursor-pointer text-left">Tokyo, Minami-Aoyama</button></li>
                  <li><button onClick={() => handleScrollToSection("showroom")} className="hover:text-white transition-colors cursor-pointer text-left">New York, Greene Soho</button></li>
                </ul>
              </div>
              <div className="space-y-3.5">
                <span className="font-serif text-xs text-[#C5A880] tracking-widest uppercase font-medium">COLLECTIONS</span>
                <ul className="space-y-2 text-zinc-500 text-[11px] font-sans font-light">
                  <li><button onClick={() => handleScrollToSection("lookbook")} className="hover:text-white transition-colors cursor-pointer text-left">Edition II — Solstice</button></li>
                  <li><button onClick={() => handleScrollToSection("visualizer")} className="hover:text-white transition-colors cursor-pointer text-left">Bespoke Monogram</button></li>
                  <li><button onClick={() => handleScrollToSection("lookbook")} className="hover:text-white transition-colors cursor-pointer text-left">Imperial Silk Series</button></li>
                  <li><button onClick={() => handleScrollToSection("lookbook")} className="hover:text-white transition-colors cursor-pointer text-left">Trench Architecture</button></li>
                </ul>
              </div>
            </div>

            {/* Newsletter Column (3 Columns) */}
            <div className="md:col-span-3 space-y-4">
              <span className="font-serif text-xs text-[#C5A880] tracking-widest uppercase font-medium block">THE LEDGER</span>
              <p className="text-zinc-500 text-[11px] leading-relaxed font-sans font-light">
                Subscribe to receive private invitations to regional trunk shows, lookbook releases, and early bespoke slots.
              </p>
              
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gold-brass text-xs font-mono py-2"
                >
                  ✓ ADDRESS REGISTERED IN LEDGER.
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsSubscribed(true);
                  }}
                  className="flex border-b border-zinc-700 pb-1 items-center"
                >
                  <input
                    type="email"
                    required
                    placeholder="Address Email"
                    className="bg-transparent border-none py-1 text-xs text-white focus:outline-none placeholder:text-zinc-600 font-sans w-full"
                  />
                  <button type="submit" aria-label="Submit email" className="text-gold-brass hover:text-white transition-colors cursor-pointer">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>

          <div className="border-t border-zinc-800 pt-10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-600 font-mono font-light select-none gap-4">
            <div>
              © 2026 ATELIER ORÉE INC. ALL RIGHS RESERVED. PRODUCED BY ARTISANAL ETHICS.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-zinc-400">PATTERNS & METHOD</a>
              <a href="#" className="hover:text-zinc-400">BLUEPRINT REGISTER</a>
              <a href="#" className="hover:text-zinc-400">LEGAL COMPLIANCE</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 9. Interactive Product Inspection Modal */}
      <LookbookModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToBag={handleAddToBag}
      />

      {/* 10. Sliding Luxury Shopping Bag Sidebar Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-[#1E1B18]/50 backdrop-blur-xs"
            />

            {/* Sidebar panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-[0_0_50px_rgba(20,15,10,0.2)] border-l border-[#EADFC9]/40 p-6 flex flex-col justify-between z-10"
            >
              
              {/* Drawer Top */}
              <div>
                <div className="flex items-center justify-between border-b border-[#EADFC9]/30 pb-5 mb-6">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5 text-gold-brass stroke-[1.25]" />
                    <span className="font-serif text-[15px] font-medium tracking-[0.1em] text-cream-950 uppercase">
                      YOUR COUTURE BAG ({cart.reduce((s, c) => s + c.quantity, 0)})
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 hover:bg-[#F4EFE6] text-cream-900 rounded-full cursor-pointer transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Bag lists */}
                <div className="space-y-5 overflow-y-auto max-h-[60vh] pr-1 scrollbar-fine">
                  {cart.length === 0 ? (
                    <div className="py-20 text-center space-y-4">
                      <span className="text-[10px] tracking-[0.25em] font-sans font-bold text-zinc-400 uppercase block">
                        COUTURE STORAGE EMPTY
                      </span>
                      <p className="text-zinc-500 font-sans text-xs italic font-light max-w-xs mx-auto">
                        "Each commission begins with space. Add lookbook items or configure bespoke materials to populate this drawer."
                      </p>
                      <button
                        onClick={() => { setIsCartOpen(false); handleScrollToSection("lookbook"); }}
                        className="text-xs text-gold-dark font-medium tracking-widest uppercase hover:text-gold-brass underline cursor-pointer"
                      >
                        VIEW LOOKBOOK EDITIONS
                      </button>
                    </div>
                  ) : (
                    cart.map((item, idx) => (
                      <div key={`${item.garment.id}-${item.size}-${idx}`} className="flex items-start gap-4 border-b border-[#EADFC9]/25 pb-4">
                        <div className="w-16 h-20 bg-[#F4EFE6] rounded-xs overflow-hidden shrink-0">
                          <img
                            src={item.garment.imageUrl}
                            alt={item.garment.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between text-xs font-serif font-semibold text-cream-950">
                            <span className="line-clamp-1">{item.garment.title}</span>
                            <span>{item.garment.price}</span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-x-3 text-[10px] text-zinc-500 font-mono font-light uppercase">
                            <div>SIZE: <span className="text-cream-950 font-bold">{item.size}</span></div>
                            <div>QTY: <span className="text-cream-950 font-bold">{item.quantity}</span></div>
                          </div>

                          <div className="text-[10px] text-zinc-400 font-sans italic line-clamp-1">
                            {item.garment.fabric}
                          </div>

                          <button
                            onClick={() => handleRemoveFromBag(idx)}
                            className="flex items-center space-x-1 text-[9px] font-medium text-burgundy-800 hover:text-cream-950 px-1 py-0.5 rounded-sm duration-150 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>REMOVE Commission</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Drawer Bottom (Prices, Checkout trigger) */}
              {cart.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-[#EADFC9]/30">
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-sm text-cream-950">Total Est. Collection Value:</span>
                    <span className="text-2xl font-serif text-burgundy-850 font-bold">${subtotal.toLocaleString()}</span>
                  </div>

                  <p className="text-[10px] text-zinc-500 leading-normal font-light">
                    *Pre-order transactions are processed securely through traditional boutique invoicing. Your total includes luxury VAT, shipping, and bespoke protective storage.
                  </p>

                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-4 bg-cream-950 hover:bg-burgundy-800 text-[#FDFBF7] text-xs font-semibold tracking-[0.2em] rounded-sm cursor-pointer shadow-md transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>SECURE DIRECT INVOICING</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-[10px] text-zinc-500 select-none font-medium pb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                    <span>Loom-registry protection and shipping logs guaranteed</span>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 11. Checkout Modal Overlay */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-[#1E1B18]/70 backdrop-blur-sm"
            />

            {/* Sheet Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-[#FDFBF7] border border-[#EADFC9]/60 rounded-sm p-6 sm:p-8 w-full max-w-lg shadow-[0_20px_50px_rgba(20,15,10,0.3)] z-10 text-center"
            >
              
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-4 right-4 p-1.5 hover:bg-[#F4EFE6] rounded-full text-cream-900 transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <AnimatePresence mode="wait">
                {!isCheckoutDone ? (
                  <motion.form
                    key="checkout-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleCheckoutComplete}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-[#C5A880]/15 flex items-center justify-center mx-auto text-gold-dark">
                        <ShoppingBag className="w-6 h-6 stroke-[1.25]" />
                      </div>
                      <h3 className="font-serif text-2xl text-cream-950">Atelier Invoicing registry</h3>
                      <p className="text-zinc-600 text-xs font-sans font-light max-w-xs mx-auto text-center">
                        Our tailors review each order detail to ensure appropriate fabric weight allocations. Please complete your email to secure.
                      </p>
                    </div>

                    <div className="space-y-3.5 text-left">
                      
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block">
                          1. REGISTER EMAIL ACCOUNT
                        </label>
                        <input
                          type="email"
                          required
                          value={checkoutEmail}
                          onChange={(e) => setCheckoutEmail(e.target.value)}
                          placeholder="Your Email Address"
                          className="w-full bg-white border border-[#EADFC9] focus:outline-none focus:border-gold-brass px-3 py-2.5 rounded-sm text-xs font-sans text-zinc-800 placeholder:text-zinc-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block">
                          2. COLLECTION RESERVATION TYPE
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setCheckoutMethod("pre-order")}
                            className={`p-3.5 rounded-sm border text-center transition-all cursor-pointer ${
                              checkoutMethod === "pre-order"
                                ? "bg-cream-950 border-cream-950 text-[#FDFBF7]"
                                : "border-[#EADFC9]/50 hover:bg-[#F4EFE6] text-zinc-800"
                            }`}
                          >
                            <span className="font-serif text-xs font-medium block">Pre-Order Reservation</span>
                            <span className="text-[8px] font-mono opacity-60 block mt-0.5">Shipment in 4 weeks</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setCheckoutMethod("measure")}
                            className={`p-3.5 rounded-sm border text-center transition-all cursor-pointer ${
                              checkoutMethod === "measure"
                                ? "bg-cream-950 border-cream-950 text-[#FDFBF7]"
                                : "border-[#EADFC9]/50 hover:bg-[#F4EFE6] text-zinc-800"
                            }`}
                          >
                            <span className="font-serif text-xs font-medium block">Made-to-Measure Lock</span>
                            <span className="text-[8px] font-mono opacity-60 block mt-0.5">Milan Salon Fitting req.</span>
                          </button>
                        </div>
                      </div>

                    </div>

                    <p className="text-[10px] font-mono text-zinc-500">
                      Subtotal Valuation Sum: <strong className="text-burgundy-800 font-bold">${subtotal.toLocaleString()}</strong>
                    </p>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-burgundy-800 hover:bg-cream-950 text-[#FDFBF7] text-xs font-semibold tracking-[0.2em] rounded-sm cursor-pointer shadow-md transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>TRANSMIT REQUISITION BLUEPRINT</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                  </motion.form>
                ) : (
                  <motion.div
                    key="checkout-complete"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 space-y-6"
                  >
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-800">
                      <ShieldCheck className="w-8 h-8 stroke-[1.25]" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-serif text-2xl text-cream-950">Invoicing Initiated</h4>
                      <p className="text-zinc-600 text-xs sm:text-sm font-sans font-light max-w-sm mx-auto">
                        Your requisition blueprint has been logged under registry entry code <strong className="font-mono text-gold-dark font-medium uppercase">REG-{Math.floor(1000 + Math.random() * 9000)}-OR</strong>. Check <span className="font-medium text-cream-950 underline">{checkoutEmail}</span> for invoice files.
                      </p>
                    </div>

                    <p className="text-[9.5px] font-mono text-zinc-400 select-none">
                      Thank you for trusting Atelier Orée for preserving artisanal loom ethics.
                    </p>

                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
