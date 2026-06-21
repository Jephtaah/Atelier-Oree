import { useState } from "react";
import { X, ShieldCheck, HelpCircle, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GarmetItem } from "../types";

interface LookbookModalProps {
  product: GarmetItem | null;
  onClose: () => void;
  onAddToBag: (product: GarmetItem, size: string) => void;
}

export default function LookbookModal({ product, onClose, onAddToBag }: LookbookModalProps) {
  const [selectedSize, setSelectedSize] = useState("S");
  const [activeTab, setActiveTab] = useState<"details" | "origin" | "care">("details");
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleBagSubmit = () => {
    onAddToBag(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1E1B18]/60 backdrop-blur-sm"
        />

        {/* Modal Sheet Container - Center-stage elegant card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", damping: 30, stiffness: 350 }}
          className="relative bg-[#FDFBF7] w-full max-w-4xl mx-4 rounded-sm overflow-hidden border border-[#EADFC9]/50 shadow-[0_30px_70px_rgba(28,26,24,0.3)] z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh]"
        >
          {/* Left Column: Huge High-Fashion Imagery with details label */}
          <div className="relative h-[250px] md:h-auto min-h-[300px] bg-[#F4EFE6] overflow-hidden group">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cream-950/50 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] tracking-[0.25em] font-sans font-semibold text-[#FDFBF7]/80">
                LOOKBOOK SERIES
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white mt-1">
                {product.collection}
              </h3>
            </div>

            {/* Float dismiss trigger for quick access on small screens */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:hidden p-2 bg-[#FDFBF7]/90 rounded-full text-cream-950 shadow-md cursor-pointer hover:bg-[#FDFBF7] transition-all"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Right Column: Dynamic Custom Tailor Details Scrollable */}
          <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
            
            {/* Upper Portion of Details */}
            <div className="space-y-6">
              {/* Dismiss & Series code line */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest text-gold-brass font-medium">
                  REGISTRY LOOK {product.id} // BESPOKE COUTURE
                </span>
                <button
                  onClick={onClose}
                  className="hidden md:flex p-1.5 hover:bg-cream-100 rounded-full text-cream-900 duration-200 transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Title & Price */}
              <div className="space-y-1.5">
                <h2 className="font-serif text-2xl sm:text-3xl text-cream-950 leading-tight">
                  {product.title}
                </h2>
                <div className="flex items-baseline space-x-3">
                  <span className="text-xl font-serif text-gold-brass font-medium">
                    {product.price}
                  </span>
                  <span className="text-[10px] tracking-widest font-sans text-cream-900/60 uppercase">
                    Duties & shipping included
                  </span>
                </div>
              </div>

              {/* Composition Indicator */}
              <div className="bg-cream-100/50 rounded-xs p-3.5 border border-cream-200/20">
                <p className="text-xs text-cream-950 leading-relaxed font-sans">
                  {product.description}
                </p>
                <div className="flex items-center space-x-2 mt-2.5 text-[10px] text-cream-900/70 font-mono font-light">
                  <span className="text-gold-dark font-medium select-none">MATERIAL: </span>
                  <span>{product.composition}</span>
                </div>
              </div>

              {/* Editorial Detail Custom Tabbing System */}
              <div className="space-y-3.5">
                {/* Tabs */}
                <div className="flex border-b border-cream-200/30 text-xs">
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`pb-2 pr-6 tracking-wider font-sans font-medium transition-colors cursor-pointer ${
                      activeTab === "details" ? "text-cream-950 border-b-2 border-gold-brass" : "text-cream-900/50 hover:text-cream-900"
                    }`}
                  >
                    ARTISANAL DETAILS
                  </button>
                  <button
                    onClick={() => setActiveTab("origin")}
                    className={`pb-2 px-6 tracking-wider font-sans font-medium transition-colors cursor-pointer ${
                      activeTab === "origin" ? "text-cream-950 border-b-2 border-gold-brass" : "text-cream-900/50 hover:text-cream-900"
                    }`}
                  >
                    ORIGIN PATHWAYS
                  </button>
                  <button
                    onClick={() => setActiveTab("care")}
                    className={`pb-2 px-6 tracking-wider font-sans font-medium transition-colors cursor-pointer ${
                      activeTab === "care" ? "text-cream-950 border-b-2 border-gold-brass" : "text-cream-900/50 hover:text-cream-900"
                    }`}
                  >
                    SARTORIAL CARE
                  </button>
                </div>

                {/* Tab Materialized Content */}
                <div className="min-h-[110px]">
                  {activeTab === "details" && (
                    <ul className="space-y-1.5">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-xs text-cream-900/80 font-sans leading-relaxed">
                          <span className="text-gold-brass text-lg leading-none mr-2 select-none">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === "origin" && (
                    <div className="space-y-3">
                      <p className="text-xs text-cream-900/80 leading-relaxed font-sans">
                        True sustainability lies in geographic transparent roots. This garment travels standard zero-emission routes from origin to finishing.
                      </p>
                      <div className="grid grid-cols-2 gap-4 pt-1 text-[11px] font-mono">
                        <div>
                          <div className="text-gold-dark font-medium">ORIGIN</div>
                          <div className="text-cream-950 mt-0.5">{product.attributes.origin}</div>
                        </div>
                        <div>
                          <div className="text-gold-dark font-medium">WEIGHT RATIO</div>
                          <div className="text-cream-950 mt-0.5">{product.attributes.weight}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "care" && (
                    <div className="space-y-2">
                      <p className="text-xs text-cream-900/80 leading-relaxed font-sans">
                        This item was engineered using traditional natural yarns. It responds beautifully to air purging and rare dry cleaning cycles that sustain its structural matrix.
                      </p>
                      <div className="text-[11px] font-mono mt-2">
                        <span className="text-gold-dark font-medium">Couturier Guideline: </span>
                        <span className="text-cream-950">{product.attributes.care}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Purchase Form Controls (Size Select & Submission) */}
            <div className="space-y-4 pt-6 border-t border-[#EADFC9]/30 mt-6 md:mt-2">
              
              {/* Size Selectors */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="tracking-wider text-cream-900/70 font-semibold uppercase">
                    Select Atelier Size
                  </span>
                  <button className="text-[10px] tracking-wider text-gold-dark select-none underline flex items-center space-x-0.5 hover:text-gold-brass">
                    <HelpCircle className="w-3 h-3" />
                    <span>Sizing Blueprint</span>
                  </button>
                </div>
                
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 py-1.5 rounded-sm text-xs font-mono border duration-300 cursor-pointer ${
                        selectedSize === size
                          ? "bg-cream-950 border-cream-950 text-cream-50"
                          : "border-cream-200/60 text-cream-950 hover:border-gold-brass hover:bg-cream-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Pre-order Trigger */}
              <button
                onClick={handleBagSubmit}
                disabled={isAdded}
                className={`w-full py-3.5 text-xs font-semibold tracking-[0.2em] font-sans transition-all duration-500 rounded-sm cursor-pointer flex items-center justify-center space-x-2 ${
                  isAdded
                    ? "bg-emerald-800 text-cream-50"
                    : "bg-cream-950 hover:bg-gold-brass text-cream-50 shadow-lg"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4.5 h-4.5 stroke-[2]" />
                    <span>ADDED TO SARTORIAL BAG</span>
                  </>
                ) : (
                  <>
                    <span>PRE-ORDER GARMENT</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-cream-900/60 font-medium tracking-wide">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Certificate of Couture Registry included with shipment</span>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
