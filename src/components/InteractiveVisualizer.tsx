import { useState } from "react";
import { BRASS_MATERIALS, SILHOUETTES } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Check, Info, Sparkles, ShoppingBag } from "lucide-react";
import { GarmetItem } from "../types";

interface InteractiveVisualizerProps {
  onAddToBag: (bespokeItem: GarmetItem, size: string) => void;
}

export default function InteractiveVisualizer({ onAddToBag }: InteractiveVisualizerProps) {
  const [selectedSilhouette, setSelectedSilhouette] = useState(SILHOUETTES[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(BRASS_MATERIALS[0]);
  const [selectedAccent, setSelectedAccent] = useState({
    id: "brushed-brass",
    name: "Brushed Yellow Brass",
    colorHex: "#D4AF37",
    description: "Traditional hand-finished warm golden sheen"
  });
  const [monogram, setMonogram] = useState("A.O");
  const [selectedSize, setSelectedSize] = useState("S");
  const [isOrdered, setIsOrdered] = useState(false);

  const accents = [
    {
      id: "brushed-brass",
      name: "Brushed Yellow Brass",
      colorHex: "#D4AF37",
      description: "Traditional hand-finished warm golden sheen"
    },
    {
      id: "tarnished-copper",
      name: "Tarnished Antique Copper",
      colorHex: "#9B6B55",
      description: "Oxidized earthy copper with rich character"
    },
    {
      id: "rose-gold",
      name: "Aged Rose Gold",
      colorHex: "#C2A39B",
      description: "Warm, muted rose-flush solid copper alloy"
    }
  ];

  // Price calculations
  const basePriceNum = parseInt(selectedSilhouette.basePrice.replace(/[^0-9]/g, ""));
  const materialAddonNum = parseInt(selectedMaterial.priceIncrease.replace(/[^0-9]/g, ""));
  const totalPrice = basePriceNum + materialAddonNum;

  // Compile bespoke item to conform to GarmetItem interface for the Shopping Bag compatibility
  const handleBespokeSubmit = () => {
    const bespokeProduct: GarmetItem = {
      id: `bespoke-${Date.now().toString().slice(-4)}`,
      title: `Bespoke ${selectedSilhouette.name}`,
      collection: "Bespoke Couture Archive",
      price: `$${totalPrice.toLocaleString()}`,
      fabric: selectedMaterial.name,
      composition: `${selectedMaterial.weight} of ${selectedMaterial.name}`,
      description: `A commissioned personal masterwork. Specially tailored of ${selectedMaterial.name} in Milan. Commissioned accents of ${selectedAccent.name} with custom direct silk hand-monogram: "${monogram.toUpperCase()}".`,
      imageUrl: selectedSilhouette.id === "sil-dress"
        ? "/src/assets/images/luxury_hero_pose_1782034357700.jpg"
        : "/src/assets/images/brutalist_fashion_motion_1782034375594.jpg",
      details: [
        `Custom hand-engraved hardware in ${selectedAccent.name}`,
        `Direct gold-silk hand chain-stitch monogram "${monogram.toUpperCase()}"`,
        `Includes a handwritten letter of tailoring signed by the Chief Couturier`,
        `Made-to-measure based on personal fitting registration`
      ],
      attributes: {
        origin: "Woven in Lyon & Florence; Hand Sewn in Milan No. 4 Atelier",
        weight: selectedMaterial.weight,
        care: "Specialist protective storage only, eco gentle vacuuming"
      }
    };

    onAddToBag(bespokeProduct, selectedSize);
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
    }, 2000);
  };

  return (
    <section id="visualizer" className="bg-[#F4EFE6]/50 py-24 border-t border-b border-[#EADFC9]/40 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/40 via-transparent to-[#FDFBF7]/40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <span className="text-[10px] tracking-[0.25em] font-sans font-bold text-gold-dark uppercase block">
            THE BESPOKE VISUALIZER
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-950 font-light leading-tight">
            Commission Your Masterpiece
          </h2>
          <p className="text-zinc-600 font-sans text-xs sm:text-sm font-light max-w-xl mx-auto">
            Interactive, traditional tailoring. Adjust yarn densities, choose physical metal accents, and assign personal monogram markers to log your identity in our archive books.
          </p>
        </div>

        {/* Builder Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Masterful Interactive Mannequin Vector Preview (5 Columns) */}
          <div className="lg:col-span-5 bg-[#FDFBF7] border border-[#EADFC9]/40 p-6 sm:p-8 rounded-sm flex flex-col justify-between shadow-[0_15px_40px_rgba(40,30,20,0.06)] relative overflow-hidden min-h-[400px]">
            {/* Fine grid paper watermarked backing */}
            <div className="absolute inset-0 opacity-1 pointer-events-none flex flex-wrap justify-between p-4 text-[10px] font-mono text-cream-900/10 uppercase select-none">
              <span>MANNEQUIN: RE-029</span>
              <span>ATELIER MILANO</span>
              <span>SCALE: 1:10</span>
            </div>

            {/* Live Interactive SVG Mannequin Diagram */}
            <div className="flex-1 flex items-center justify-center py-6 relative">
              
              {/* Dynamic SVG Drawing */}
              <svg
                viewBox="0 0 200 320"
                className="w-48 xs:w-56 h-auto drop-shadow-[0_15px_30px_rgba(20,15,10,0.08)] transition-all duration-700"
              >
                {/* Background soft outline glowing circle */}
                <circle cx="100" cy="160" r="85" fill={selectedMaterial.hexColor} opacity="0.1" />
                <circle cx="100" cy="160" r="85" stroke="#C5A880" strokeWidth="0.5" strokeDasharray="3 3" fill="none" opacity="0.3" />

                {/* Mannequin neck and stand (Earthy charcoal) */}
                <path d="M 94 40 L 106 40 L 104 70 L 96 70 Z" fill="#2C2C2C" opacity="0.8" />
                <line x1="100" y1="230" x2="100" y2="310" stroke="#1E1E1E" strokeWidth="2.5" />
                <path d="M 80 310 L 120 310 L 120 314 L 80 314 Z" fill="#1E1E1E" />
                <path d="M 88 310 L 100 295 L 112 310 Z" fill="#2C2D2B" opacity="0.4" />

                {/* Core Mannequin Torso Body Lines */}
                {selectedSilhouette.id === "sil-dress" ? (
                  // Dress Draperies Silhouette
                  <motion.g initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
                    {/* Main dress flow layer (React to selected fabric color) */}
                    <path
                      d="M 88 65 Q 100 60 112 65 Q 120 100 116 130 Q 110 180 125 240 Q 110 245 90 240 Q 75 180 84 130 Q 80 100 88 65 Z"
                      fill={selectedMaterial.hexColor}
                      stroke="#8C7456"
                      strokeWidth="0.75"
                    />
                    
                    {/* Sweeping elegant folds in different shade */}
                    <path
                      d="M 88 65 Q 98 100 90 140 Q 105 180 110 240 M 112 65 Q 105 110 112 160 Q 100 200 90 240 M 94 90 Q 106 120 98 170"
                      stroke="#8C7456"
                      strokeWidth="0.5"
                      fill="none"
                      opacity="0.35"
                    />

                    {/* Asymmetric shoulder drape block */}
                    <path d="M 88 65 Q 96 55 102 61 L 102 90 Q 92 85 88 65 Z" fill="#58111A" opacity="0.15" />
                  </motion.g>
                ) : (
                  // Overcoat structural jacket
                  <motion.g initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
                    {/* Coat Body Silhouette (Flat styling) */}
                    <path
                      d="M 84 65 Q 100 62 116 65 L 124 100 L 120 180 Q 114 245 116 260 L 84 260 Q 86 245 80 180 L 76 100 Z"
                      fill={selectedMaterial.hexColor}
                      stroke="#8C7456"
                      strokeWidth="0.75"
                    />
                    
                    {/* Dual lapels */}
                    <path d="M 84 65 L 94 100 L 88 102 Z" fill="#FFF" stroke="#8C7456" strokeWidth="0.5" opacity="0.25" />
                    <path d="M 116 65 L 106 100 L 112 102 Z" fill="#FFF" stroke="#8C7456" strokeWidth="0.5" opacity="0.25" />

                    {/* Highly-structured high belt element with brass buckle */}
                    <path d="M 80 145 L 120 145 L 120 151 L 80 151 Z" fill="#1E1E1E" opacity="0.9" />
                    {/* Selected metal Accent buckle */}
                    <rect x="96" y="142" width="8" height="12" fill="none" stroke={selectedAccent.colorHex} strokeWidth="1.25" />
                  </motion.g>
                )}

                {/* Hand sewn monogram overlay representation relative */}
                {monogram && (
                  <text
                    x="100"
                    y="110"
                    fill="#AC8A5A"
                    fontSize="7"
                    fontFamily="Georgia"
                    letterSpacing="0.5"
                    textAnchor="middle"
                    className="font-bold select-none opacity-80"
                  >
                    {monogram.toUpperCase().split("").join(" ")}
                  </text>
                )}

                {/* Simulated hanging label string and tag */}
                <line x1="90" y1="210" x2="70" y2="230" stroke="#C5A880" strokeWidth="0.5" opacity="0.5" />
                <rect x="52" y="222" width="36" height="20" fill="#FDFBF7" stroke="#EADFC9" strokeWidth="0.5" rx="1" />
                <text x="70" y="234" textAnchor="middle" fill="#58111A" fontSize="4.5" fontFamily="monospace">
                  {selectedSilhouette.id === "sil-dress" ? "DRE-Look01" : "TRE-Look02"}
                </text>
              </svg>

              {/* Status Spec Indicator Bubble */}
              <div className="absolute bottom-2 left-2 bg-[#F1E9DA]/50 border border-[#EADFC9]/30 rounded-xs py-1.5 px-3 select-none text-[9px] font-mono text-zinc-600 space-y-0.5">
                <div>ACCENT: <span className="text-zinc-800">{selectedAccent.name.split(" ")[2] || selectedAccent.name}</span></div>
                <div>YARN: <span className="text-zinc-800">{selectedMaterial.name.split(" ").slice(-1)}</span></div>
              </div>
            </div>

            {/* Customizer Real-Time Pricing Summary */}
            <div className="border-t border-[#EADFC9]/30 pt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] tracking-wider text-cream-900/50 uppercase font-bold block">
                  COMMISSION ESTIMATION
                </span>
                <span className="text-2xl font-serif text-burgundy-800 font-semibold tracking-wide">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="text-right text-[10px] font-mono text-cream-900/60 leading-tight">
                <div>TAILORING: {selectedSilhouette.productionTime.split(" bespoke")[0]}</div>
                <div>ATELIER: MILANO SECTOR CO.</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Customizer Toggles / Form Parameters (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            
            {/* Custom Dials Body */}
            <div className="space-y-6">
              
              {/* Step 1: Silhouette Choice */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="h-5 w-5 bg-burgundy-800 text-white rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
                  <span className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-cream-950">
                    Select Silhouette Archetype
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SILHOUETTES.map((sil) => {
                    const isSelected = selectedSilhouette.id === sil.id;
                    return (
                      <button
                        key={sil.id}
                        onClick={() => setSelectedSilhouette(sil)}
                        className={`text-left p-4 rounded-sm border transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-cream-950 border-cream-950 text-[#FDFBF7]"
                            : "border-[#EADFC9]/70 bg-white/40 hover:bg-[#FDFBF7] hover:border-gold-dark text-cream-950"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-serif text-sm tracking-wide font-medium">{sil.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-gold-brass" />}
                        </div>
                        <p className={`text-[11px] mt-1.5 font-light leading-relaxed ${isSelected ? "text-[#FDFBF7]/85" : "text-cream-900/70"}`}>
                          {sil.description}
                        </p>
                        <div className="mt-2.5 flex items-baseline justify-between">
                          <span className={`text-[10px] font-mono ${isSelected ? "text-gold-brass" : "text-gold-dark"}`}>Base: {sil.basePrice}</span>
                          <span className={`text-[9px] font-sans tracking-wider ${isSelected ? "text-white/60" : "text-cream-900/40"}`}>{sil.productionTime}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Fine Material selection */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="h-5 w-5 bg-burgundy-800 text-white rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
                  <span className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-cream-950">
                    Select Artisanal Material
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {BRASS_MATERIALS.map((mat) => {
                    const isSelected = selectedMaterial.id === mat.id;
                    return (
                      <button
                        key={mat.id}
                        onClick={() => setSelectedMaterial(mat)}
                        className={`text-left p-3.5 rounded-sm border transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-[#1E1B18] border-cream-950 text-[#FDFBF7]"
                            : "border-[#EADFC9]/70 bg-white/40 hover:bg-[#FDFBF7] hover:border-gold-brass text-cream-950"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="w-3 h-3 rounded-full border border-[#EADFC9]/60" style={{ backgroundColor: mat.hexColor }} />
                          <span className="text-xs font-serif font-medium tracking-wide">{mat.name.split(" ").slice(-2).join(" ")}</span>
                        </div>
                        <p className={`text-[10px] mt-1 font-light leading-relaxed line-clamp-2 ${isSelected ? "text-white/70" : "text-zinc-500"}`}>
                          {mat.description}
                        </p>
                        <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-gold-dark">+{mat.priceIncrease}</span>
                          <span className="opacity-60">{mat.weight.split(" ")[0]}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Accent Metals & Monogram */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Accent details selector */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="h-5 w-5 bg-burgundy-800 text-white rounded-full flex items-center justify-center text-[10px] font-bold">3</span>
                    <span className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-cream-950">
                      Engraved Accents
                    </span>
                  </div>
                  <div className="space-y-2">
                    {accents.map((acc) => {
                      const isSelected = selectedAccent.id === acc.id;
                      return (
                        <button
                          key={acc.id}
                          onClick={() => setSelectedAccent(acc)}
                          className={`w-full flex items-center justify-between p-3 rounded-sm border text-left cursor-pointer transition-all ${
                            isSelected
                              ? "bg-cream-950 border-cream-950 text-white"
                              : "border-[#EADFC9]/50 bg-white/40 hover:bg-[#FDFBF7]"
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <span className="w-4.5 h-4.5 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: acc.colorHex }} />
                            <div>
                              <div className="text-xs font-sans font-medium">{acc.name}</div>
                              <div className={`text-[9px] font-light ${isSelected ? "text-white/60" : "text-cream-900/50"}`}>{acc.description}</div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-gold-brass" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Personal Monogram stitching */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="h-5 w-5 bg-burgundy-800 text-white rounded-full flex items-center justify-center text-[10px] font-bold">4</span>
                    <span className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-cream-950">
                      Gold Silk Monogram
                    </span>
                  </div>
                  
                  <div className="p-4 bg-white/50 border border-[#EADFC9]/60 rounded-sm space-y-3 flex flex-col justify-between h-[155px]">
                    <div className="space-y-1">
                      <label className="text-[10px] font-medium tracking-wider text-cream-900/50 uppercase block">
                        Enter Initials (Max 3 Characters)
                      </label>
                      <input
                        type="text"
                        value={monogram}
                        onChange={(e) => setMonogram(e.target.value.slice(0, 3))}
                        placeholder="E.g., A.O"
                        className="w-full bg-[#FDFBF7] border border-[#EADFC9] focus:border-gold-brass focus:outline-none px-3 py-2 rounded-sm text-sm font-mono text-zinc-800 uppercase tracking-[0.3em]"
                      />
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-normal font-light">
                      *Stitched directly onto garment hemline using standard 22-karat spun silk thread locks in our Milan salon.
                    </p>
                  </div>
                </div>

              </div>

              {/* Step 4: Bespoke Sizing select */}
              <div className="space-y-2">
                <div className="text-xs tracking-[0.15em] font-semibold text-cream-900/70 font-sans uppercase">
                  ATELIER PATTERN SIZE
                </div>
                <div className="flex gap-2">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 py-2 rounded-sm text-xs font-mono border duration-300 cursor-pointer ${
                        selectedSize === size
                          ? "bg-cream-950 border-cream-950 text-cream-50"
                          : "border-cream-200/60 text-cream-950 hover:bg-cream-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Action Trigger Block */}
            <div className="pt-6 border-t border-cream-200/40 flex flex-col sm:flex-row items-center gap-4">
              
              <button
                onClick={handleBespokeSubmit}
                disabled={isOrdered}
                className={`flex-1 w-full py-4 rounded-sm text-xs font-medium tracking-[0.2em] font-sans flex items-center justify-center space-x-2 transition-all duration-500 cursor-pointer select-none ${
                  isOrdered
                    ? "bg-emerald-800 text-cream-50"
                    : "bg-cream-950 hover:bg-gold-brass text-cream-50 shadow-md"
                }`}
              >
                {isOrdered ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>BESPOKE REQUISITION PROTOCOLED</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4.5 h-4.5 stroke-[1.25]" />
                    <span>BAG BESPOKE CONFIGURATION</span>
                  </>
                )}
              </button>

              <div className="flex items-center space-x-1.5 text-[10px] text-cream-900/50 max-w-xs leading-normal font-light select-none py-1 text-center sm:text-left">
                <Info className="w-4 h-4 text-gold-brass shrink-0" />
                <span>Bespoke items are tailored to order and are ineligible for standard returns. Standard 15-day modification window applies.</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
