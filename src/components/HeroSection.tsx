import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Flame, Sparkles } from "lucide-react";
import { IMAGES } from "../assets/images";

interface HeroSectionProps {
  onExploreClick: () => void;
  onBespokeClick: () => void;
}

export default function HeroSection({ onExploreClick, onBespokeClick }: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Native mouse tracking for interactive 3D parallax layers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen bg-cream-50 flex items-center justify-center pt-24 pb-16 overflow-hidden md:px-8">
      {/* Editorial Decorative Background Details - Elegant & Minimalist */}
      <div className="absolute top-[30%] left-[5%] text-[100px] sm:text-[140px] md:text-[180px] font-serif font-light text-cream-200/15 select-none tracking-[0.1em] pointer-events-none">
        É T H E R
      </div>
      <div className="absolute bottom-[20%] right-[-5%] text-[100px] sm:text-[150px] md:text-[200px] font-serif font-light text-cream-200/15 select-none tracking-[0.1em] pointer-events-none">
        O R É E
      </div>

      {/* Floating Light Rays or Soft Radial Warm Glare (No grid patterns) */}
      <div className="absolute w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-gold-brass/5 blur-[120px] top-[10%] left-[20%] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-burgundy-800/2.5 blur-[150px] bottom-[15%] right-[10%] pointer-events-none" />

      {/* Main Structural Grid Container */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-10rem)]">
        
        {/* Typographical / Copy Column - Left Spaced (6 Columns) */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8 select-none z-20">
          <div className="space-y-4">
            {/* Fine upper caption */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex items-center space-x-2 text-[10px] tracking-[0.3em] font-sans font-semibold text-gold-dark"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold-brass" />
              <span>COLLECTION EDITION II — ATELIER ORÉE</span>
            </motion.div>

            {/* Elegantly styled high-end serif header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="space-y-1"
            >
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-serif text-cream-950 leading-[1.05] tracking-tight font-extralight">
                La Poésie <br />
                <span className="italic font-normal font-serif text-burgundy-800 tracking-normal pl-4 md:pl-8">
                  du Mouvement
                </span>
              </h1>
            </motion.div>
          </div>

          {/* Editorial manifesto descriptor */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="text-cream-900/70 text-sm sm:text-base leading-relaxed max-w-lg font-sans font-light"
          >
            An architectural exploration of gravity, flowing silk, and raw natural fibers.
            Our winter silhouette study suspends luxury from singular points, forging space between
            garment and motion. Crafted meticulously outside temporal trends.
          </motion.p>

          {/* Elegant Action Buttons with high micro-interactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={onExploreClick}
              className="group relative px-6 py-3.5 bg-cream-950 hover:bg-burgundy-800 text-[#FDFBF7] text-xs tracking-[0.2em] font-medium font-sans rounded-xs shadow-md transition-all duration-500 cursor-pointer overflow-hidden flex items-center space-x-2"
            >
              <span className="relative z-10">EXPLORE LOOKBOOK</span>
              <ArrowDown className="w-4.5 h-4.5 stroke-[1.5] group-hover:translate-y-1 transition-transform duration-300" />
            </button>

            <button
              onClick={onBespokeClick}
              className="group border border-cream-200 hover:border-gold-brass px-6 py-3.5 text-cream-900 text-xs tracking-[0.2em] font-medium font-sans rounded-xs bg-cream-50/40 hover:bg-cream-50 transition-all duration-500 cursor-pointer flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-gold-brass group-hover:rotate-12 transition-transform duration-300" />
              <span>CUSTOM BESPOKE BUILDER</span>
            </button>
          </motion.div>

          {/* Quick status details in mono */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="flex items-center space-x-8 pt-4 text-[10px] tracking-[0.1em] font-mono font-light text-cream-900/60"
          >
            <div>
              <span className="text-gold-dark font-medium">SHILOUETTES: </span>02 ARCHETYPES
            </div>
            <div>
              <span className="text-gold-dark font-medium">ORIGIN: </span>COMO, LYON & FLANDERS
            </div>
          </motion.div>
        </div>

        {/* Dynamic Scattered Collage Column - Right Spaced (6 Columns) */}
        <div className="lg:col-span-6 relative h-[500px] xs:h-[550px] sm:h-[650px] flex items-center justify-center">
          
          {/* Layer 1: The Main Centered Hero Image - Gorgeous Flow Dress (Drapes elegantly) */}
          <motion.div
            style={{
              x: mousePosition.x * 0.25,
              y: mousePosition.y * 0.25,
            }}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="absolute w-[240px] xs:w-[280px] sm:w-[350px] h-[340px] xs:h-[390px] sm:h-[480px] z-10 rounded-sm overflow-hidden border-[10px] border-cream-50 bg-cream-50 shadow-[0_20px_50px_rgba(44,38,32,0.15)] group cursor-pointer"
            onClick={onExploreClick}
          >
            <div className="w-full h-full overflow-hidden relative">
              <img
                src={IMAGES.luxuryHero}
                alt="Model wearing Alabaster Flow Dress"
                className="w-full h-full object-cover grayscale-[15%] group-hover:scale-105 duration-700 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cream-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
                <p className="font-serif text-cream-50 italic text-sm">The Alabaster Flow Dress</p>
                <p className="text-[9px] tracking-[0.2em] font-sans text-gold-brass font-bold uppercase mt-1">VIEW SILHOUETTE — Look 01</p>
              </div>
            </div>
          </motion.div>

          {/* Layer 2: Floating Polaroid/Framed Image (Brutalist Trench) - Overlapping Left Bottom */}
          <motion.div
            style={{
              x: mousePosition.x * -0.4,
              y: mousePosition.y * -0.4,
            }}
            initial={{ opacity: 0, x: -60, rotate: -4 }}
            animate={{ opacity: 1, x: 0, rotate: -3 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="absolute left-0 xs:left-4 sm:left-[-15px] bottom-[-10px] sm:bottom-[30px] w-[140px] xs:w-[170px] sm:w-[210px] h-[200px] xs:h-[240px] sm:h-[300px] z-20 rounded-xs bg-cream-50 border-[8px] border-cream-50 shadow-[0_15px_35px_rgba(40,30,20,0.18)]"
          >
            <div className="w-full h-[82%] overflow-hidden relative bg-cream-100">
              <img
                src={IMAGES.brutalistMotion}
                alt="Travertine Minimal Trench"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="h-[18%] flex items-center justify-center bg-white px-2">
              <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-cream-900/60 uppercase select-none">
                Look 02 — Motion S2
              </span>
            </div>
          </motion.div>

          {/* Layer 3: Floating Polaroid/Framed Image (Burgundy Sitting) - Overlapping Top Right */}
          <motion.div
            style={{
              x: mousePosition.x * 0.5,
              y: mousePosition.y * 0.5,
            }}
            initial={{ opacity: 0, x: 60, y: -40, rotate: 4 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 3 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
            className="absolute right-[-10px] top-[10px] sm:top-[40px] w-[150px] xs:w-[180px] sm:w-[220px] h-[210px] xs:h-[250px] sm:h-[310px] z-30 rounded-xs bg-cream-50 border-[8px] border-cream-50 shadow-[0_20px_40px_rgba(40,30,20,0.14)]"
          >
            <div className="w-full h-[82%] overflow-hidden relative bg-cream-100">
              <img
                src={IMAGES.burgundyEditorial}
                alt="Burgundy Sculptural Solitaire"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="h-[18%] flex items-center justify-center bg-white px-2">
              <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-cream-900/60 uppercase select-none">
                Look 03 — DOURA M1
              </span>
            </div>
          </motion.div>

          {/* Layer 4: Miniature Detail Accent Gold Card - Hanging off center */}
          <motion.div
            style={{
              x: mousePosition.x * -0.6,
              y: mousePosition.y * 0.2,
              backgroundImage: `url('${IMAGES.editorialGoldAccent}')`
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 1.1 }}
            className="absolute right-[40px] sm:right-[150px] bottom-[20px] sm:bottom-[60px] w-[90px] sm:w-[120px] h-[90px] sm:h-[120px] rounded-full overflow-hidden border-4 border-cream-50 shadow-lg z-30 hover:rotate-6 transition-all duration-500 pointer-events-auto bg-cover bg-center"
            title="Gold Brass Clasp Detail"
          />

          {/* Frosted elegant text tag overlayed */}
          <motion.div
            style={{
              x: mousePosition.x * 0.1,
              y: mousePosition.y * -0.3,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.3 }}
            className="absolute bottom-[20%] left-[8%] bg-cream-50/85 backdrop-blur-md border border-gold-brass/35 text-[9px] tracking-[0.2em] px-4 py-2 text-cream-950 font-sans shadow-md z-40 rounded-sm font-semibold select-none"
          >
            HAND-ROLLED ORGANIC SILK
          </motion.div>

        </div>
      </div>

      {/* Floating subtle scroll-down cursor anchor */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center space-y-1 z-30 select-none opacity-60 hover:opacity-100 cursor-pointer" onClick={onExploreClick}>
        <span className="text-[9px] tracking-[0.25em] font-sans font-light text-cream-900">SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-1 h-3 rounded-full bg-gold-brass"
        />
      </div>
    </section>
  );
}
