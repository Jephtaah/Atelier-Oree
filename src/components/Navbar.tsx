import { ShoppingBag, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({
  onNavClick,
  activeSection,
  cartCount,
  onOpenCart,
}: NavbarProps) {
  const menuItems = [
    { label: "COLLECTIONS", id: "lookbook" },
    { label: "CREATIVE VISION", id: "manifesto" },
    { label: "BESPOKE BUILDER", id: "visualizer" },
    { label: "PRIVATE FIT", id: "showroom" }
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 bg-cream-50/80 backdrop-blur-md border-b border-cream-200/50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo - Far Left */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavClick("hero")}>
          <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] text-cream-950 font-light select-none">
            ATELIER <span className="text-gold-dark font-normal">ORÉE</span>
          </span>
        </div>

        {/* Menu Links - Centered */}
        <nav className="hidden md:flex items-center space-x-10">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className="relative text-xs tracking-[0.2em] font-sans font-medium text-cream-900/70 hover:text-burgundy-800 transition-colors py-1 cursor-pointer"
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold-brass"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Widgets - Far Right */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Checkout bag */}
          <button
            onClick={onOpenCart}
            className="group relative flex items-center justify-center p-2 text-cream-950 hover:text-gold-dark transition-colors cursor-pointer"
            aria-label="View Shopping bag"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.25]" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartCount}
                className="absolute -top-1 -right-1 w-4 h-4 bg-gold-brass text-cream-50 text-[9px] font-bold rounded-full flex items-center justify-center font-sans"
              >
                {cartCount}
              </motion.span>
            )}
            <span className="hidden lg:inline text-xs tracking-[0.1em] font-medium ml-1.5 uppercase select-none font-sans text-cream-900/70 group-hover:text-cream-950">
              BAG
            </span>
          </button>

          {/* Small Bespoke indicator button */}
          <button
            onClick={() => onNavClick("visualizer")}
            className="hidden sm:flex items-center space-x-1 text-[10px] tracking-[0.15em] font-sans text-cream-50 bg-cream-950 px-3.5 py-2 rounded-xs hover:bg-gold-brass transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-gold-brass fill-gold-brass/20" />
            <span>BESPOKE FIT</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
