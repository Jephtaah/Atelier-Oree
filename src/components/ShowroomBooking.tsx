import React, { useState } from "react";
import { BOUTIQUE_LOCATIONS } from "../data";
import { BoutiqueLocation } from "../types";
import { Calendar, MapPin, Phone, Clock, ArrowRight, UserCheck, CheckCircle, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ShowroomBooking() {
  const [selectedBoutique, setSelectedBoutique] = useState<BoutiqueLocation>(BOUTIQUE_LOCATIONS[0]);
  const [selectedService, setSelectedService] = useState("Full-Collection Custom Fitting");
  const [selectedDate, setSelectedDate] = useState("Monday, June 29, 2026");
  const [selectedTime, setSelectedTime] = useState("14:00 PM");
  const [selectedAssistant, setSelectedAssistant] = useState("Senior Sartorial Archivist");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [ticketCode, setTicketCode] = useState("");

  const services = [
    "Full-Collection Custom Fitting",
    "Bespoke Couture Design Consultation",
    "Leathercraft & Accessory Showcase",
    "Private Archival Fitting Retrospective"
  ];

  const times = ["10:30 AM", "12:00 PM", "14:00 PM", "16:30 PM", "18:00 PM"];
  
  const calendarDates = [
    { day: "Mon", date: "29", full: "Monday, June 29, 2026" },
    { day: "Tue", date: "30", full: "Tuesday, June 30, 2026" },
    { day: "Wed", date: "01", full: "Wednesday, July 01, 2026" },
    { day: "Thu", date: "02", full: "Thursday, July 02, 2026" },
    { day: "Fri", date: "03", full: "Friday, July 03, 2026" }
  ];

  const assistants = [
    { name: "Sartorial Archivist", title: "Pattern Expert", description: "Specializes in fabric architecture and drape weights." },
    { name: "Senior Tailoring Academic", title: "Master Couturier", description: "Brings 22 years of custom bespoke coat structures." }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    // Generated a luxurious ticket receipt identifier code
    const randomCode = `AT-${selectedBoutique.city.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketCode(randomCode);
    setIsBooked(true);
  };

  return (
    <section id="showroom" className="bg-[#FDFBF7] py-24 border-b border-[#EADFC9]/30 relative overflow-hidden">
      
      {/* Decorative details */}
      <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-gold-brass/5 blur-3xl pointer-events-none" />
      <div className="absolute left-[-5%] top-[10%] text-[100px] font-serif text-[#EADFC9]/10 select-none tracking-[0.2em] uppercase pointer-events-none">
        SA N C T U A R Y
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section copy */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <span className="text-[10px] tracking-[0.25em] font-sans font-bold text-gold-dark uppercase block">
            ATELIER PRIVATE APPOINTMENTS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream-950 font-light leading-tight">
            Reserve Your Private Fitting
          </h2>
          <p className="text-zinc-600 font-sans text-xs sm:text-sm font-light max-w-xl mx-auto">
            Fitting is an auditory and sensory dialogue. Slip behind the marble partitions of our global sanctuaries for a tailored experience with tea and archival blueprints.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Boutique Browser and Form inputs (7 Columns) */}
          <div className="lg:col-span-7 bg-[#F4EFE6]/30 border border-[#EADFC9]/50 rounded-sm p-6 sm:p-8 space-y-8 shadow-sm">
            
            <AnimatePresence mode="wait">
              {!isBooked ? (
                <motion.form
                  key="booking-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleBookingSubmit}
                  className="space-y-6"
                >
                  
                  {/* Select Boutique Location */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-cream-900/50">
                      1. Select Showroom Sanctuary
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BOUTIQUE_LOCATIONS.map((loc) => {
                        const isSelected = selectedBoutique.id === loc.id;
                        return (
                          <button
                            type="button"
                            key={loc.id}
                            onClick={() => setSelectedBoutique(loc)}
                            className={`p-3 rounded-sm border text-center transition-all cursor-pointer ${
                              isSelected
                                ? "bg-cream-950 border-cream-950 text-white"
                                : "bg-[#FDFBF7]/60 border-[#EADFC9]/60 text-cream-950 hover:bg-[#FDFBF7]"
                            }`}
                          >
                            <div className="font-serif text-[13px] font-medium tracking-wide">{loc.city}</div>
                            <div className={`text-[8.5px] mt-1 line-clamp-1 font-mono tracking-normal leading-none ${isSelected ? "text-gold-brass" : "text-cream-900/50"}`}>
                              {loc.coordinates}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Show selected Boutique Detail Panel */}
                    <div className="bg-white/40 border border-[#EADFC9]/30 rounded-xs p-3.5 flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-2.5 text-xs text-cream-900/80">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gold-brass shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-cream-950">{selectedBoutique.city} Sanctuary: </span>
                          <span className="font-light">{selectedBoutique.address}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5 font-mono text-[10px] text-gold-dark shrink-0">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{selectedBoutique.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Select Boutique Service Type */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-cream-900/50">
                      2. Select Atelier Consultation Service
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {services.map((srv) => {
                        const isSelected = selectedService === srv;
                        return (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => setSelectedService(srv)}
                            className={`p-3 rounded-sm border text-left flex items-center justify-between cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-burgundy-900 border-burgundy-900 text-white"
                                : "bg-[#FDFBF7]/60 border-[#EADFC9]/40 text-cream-950 hover:bg-[#FDFBF7]"
                            }`}
                          >
                            <span className="font-serif text-xs font-light">{srv}</span>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-gold-brass" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Select Date and Time Pickers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* Calendar visual days */}
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-cream-900/50 block">
                        3. Appointment Date
                      </label>
                      <div className="flex justify-between gap-1">
                        {calendarDates.map((item) => {
                          const isSelected = selectedDate === item.full;
                          return (
                            <button
                              type="button"
                              key={item.date}
                              onClick={() => setSelectedDate(item.full)}
                              className={`flex-1 flex flex-col items-center py-2 rounded-xs border cursor-pointer transition-colors ${
                                isSelected
                                  ? "bg-cream-950 border-cream-950 text-white"
                                  : "bg-[#FDFBF7]/50 border-[#EADFC9]/40 text-cream-950 hover:bg-[#FDFBF7]"
                              }`}
                            >
                              <span className="text-[9px] uppercase tracking-wider font-mono opacity-60">{item.day}</span>
                              <span className="text-sm font-semibold font-serif mt-0.5">{item.date}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Hour slots */}
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-cream-900/50 block">
                        4. Select Clock Hours
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {times.map((t) => {
                          const isSelected = selectedTime === t;
                          return (
                            <button
                              type="button"
                              key={t}
                              onClick={() => setSelectedTime(t)}
                              className={`px-3 py-2 rounded-xs border text-[11px] font-mono cursor-pointer transition-colors ${
                                isSelected
                                  ? "bg-cream-950 border-cream-950 text-white"
                                  : "bg-[#FDFBF7]/50 border-[#EADFC9]/40 text-cream-950 hover:bg-[#FDFBF7]"
                              }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* Selecting Atelier Guide Assistant */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-cream-900/50">
                      5. Assigned Atelier Specialist
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {assistants.map((ast) => {
                        const isSelected = selectedAssistant.includes(ast.name);
                        return (
                          <button
                            type="button"
                            key={ast.name}
                            onClick={() => setSelectedAssistant(`${ast.name} (${ast.title})`)}
                            className={`p-3 rounded-sm border text-left flex flex-col justify-between cursor-pointer transition-all ${
                              isSelected
                                ? "bg-white border-gold-brass shadow-sm"
                                : "bg-[#FDFBF7]/40 border-[#EADFC9]/40 hover:bg-[#FDFBF7]"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="font-serif text-xs font-semibold text-cream-950">{ast.name}</span>
                              <span className="text-[9px] font-mono bg-[#F4EFE6] px-2 py-0.5 text-gold-dark rounded-xs">{ast.title}</span>
                            </div>
                            <p className="text-[10px] text-zinc-500 font-light mt-1.5 leading-relaxed">{ast.description}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Customer Credentials (client info) */}
                  <div className="space-y-3 pt-4 border-t border-[#EADFC9]/40">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-cream-900/50">
                      6. Client Credentials
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Your Name (E.g., Okezie Jephtah)"
                          className="w-full bg-[#FDFBF7] border border-[#EADFC9] focus:border-gold-brass focus:outline-none px-3.5 py-3 rounded-sm text-xs font-sans text-zinc-800 placeholder:text-zinc-400"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="Email Address"
                          className="w-full bg-cream-50 border border-cream-200 focus:border-gold-brass focus:outline-none px-3.5 py-3 rounded-sm text-xs font-sans text-zinc-800 placeholder:text-zinc-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submission triggers */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-cream-950 hover:bg-gold-brass text-cream-50 text-xs font-semibold tracking-[0.2em] rounded-sm cursor-pointer shadow-md transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>SCHEDULE SHOWROOM VISIT</span>
                    <ArrowRight className="w-4.5 h-4.5 stroke-[1.5]" />
                  </button>

                </motion.form>
              ) : (
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-[#C5A880]/15 rounded-full flex items-center justify-center mx-auto text-gold-dark">
                    <CheckCircle className="w-10 h-10 stroke-[1.25]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl text-cream-950">Appointment Registered</h3>
                    <p className="text-zinc-600 text-xs sm:text-sm font-light max-w-md mx-auto">
                      Thank you for reserving slots, <strong className="font-medium text-cream-950">{clientName}</strong>. A confirmation blueprint has been transmitted to <span className="text-gold-brass underline block mt-0.5">{clientEmail}</span>.
                    </p>
                  </div>

                  <p className="text-[10px] font-mono text-zinc-400">
                    Your digital entry key card is displayed on the board. Please show this to the concierges on.
                  </p>

                  <button
                    onClick={() => {
                      setIsBooked(false);
                      setClientName("");
                      setClientEmail("");
                    }}
                    className="px-6 py-2.5 border border-cream-200 text-cream-900 tracking-[0.15em] text-[10px] hover:bg-cream-50 rounded-sm transition-colors cursor-pointer"
                  >
                    REGISTER NEW VISITATION
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Block: Dynamic Physical Fitting Card Ticket receipt (5 Columns) */}
          <div className="lg:col-span-5 h-full flex flex-col justify-between">
            
            {/* The Ticket Board */}
            <div className="relative bg-[#1E1B18] text-[#FDFBF7] rounded-sm shadow-[0_25px_60px_rgba(28,26,24,0.35)] overflow-hidden flex flex-col divide-y divide-[#EADFC9]/10">
              
              {/* Header section fitting block */}
              <div className="p-6 relative">
                {/* Gold seal accent */}
                <div className="absolute right-6 top-6 text-[#C5A880]/10 shrink-0 pointer-events-none">
                  <Award className="w-20 h-20 stroke-[0.75]" />
                </div>
                
                <span className="font-mono text-[9px] text-[#C5A880] tracking-widest font-medium uppercase">
                  Sartorial Fitting Permit
                </span>
                <h3 className="font-serif text-2xl tracking-[0.1em] font-light text-white uppercase mt-1">
                  Atelier Client Card
                </h3>
              </div>

              {/* Live parameters section */}
              <div className="p-6 space-y-4 font-sans text-xs">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-mono text-[#C5A880] block uppercase tracking-wider">CLIENTEE RECON</span>
                    <span className="font-serif text-sm font-light mt-0.5 break-words block">
                      {clientName || "Awaiting Identification"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-[#C5A880] block uppercase tracking-wider">boutique sanctuary</span>
                    <span className="font-serif text-sm font-light mt-0.5 block text-white font-medium">
                      {selectedBoutique.city} Salon
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-mono text-[#C5A880] block uppercase tracking-wider">COUTURE consultation</span>
                    <span className="font-sans text-[11px] font-light mt-0.5 block opacity-85">
                      {selectedService}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-[#C5A880] block uppercase tracking-wider">DATE & TIME SLOTS</span>
                    <span className="font-sans text-[11px] font-light mt-0.5 block opacity-85">
                      {selectedDate.split(", ").slice(1).join(", ")} <br />
                      {selectedTime}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-[#C5A880] block uppercase tracking-wider">Specialist Assigner</span>
                  <span className="font-sans text-[11px] font-light mt-0.5 block opacity-85">
                    {selectedAssistant}
                  </span>
                </div>

              </div>

              {/* Stub barcode / scan verification bottom (very high physical fidelity) */}
              <div className="p-6 bg-cream-950/40 relative flex flex-col sm:flex-row justify-between items-center gap-4">
                
                {/* Barcode drawing */}
                <div className="flex flex-col space-y-1 items-start">
                  <div className="flex space-x-[2px] h-9 h-bg-white opacity-80 items-stretch">
                    <span className="w-[1.5px] bg-[#FDFBF7]" />
                    <span className="w-[3px] bg-[#FDFBF7]" />
                    <span className="w-[1.5px] bg-[#FDFBF7]" />
                    <span className="w-[0.5px] bg-[#FDFBF7]" />
                    <span className="w-[2px] bg-[#FDFBF7]" />
                    <span className="w-[1.5px] bg-[#FDFBF7]" />
                    <span className="w-[4px] bg-[#FDFBF7]" />
                    <span className="w-[1.5px] bg-[#FDFBF7]" />
                    <span className="w-[2.5px] bg-[#FDFBF7]" />
                    <span className="w-[1px] bg-[#FDFBF7]" />
                    <span className="w-[3px] bg-[#FDFBF7]" />
                    <span className="w-[1.5px] bg-[#FDFBF7]" />
                    <span className="w-[3.5px] bg-[#FDFBF7]" />
                  </div>
                  <span className="font-mono text-[8px] text-zinc-500 tracking-wider">
                    {ticketCode || "PENDING REGISTER"}
                  </span>
                </div>
                
                {/* Quick informational notes */}
                <div className="text-right text-[9px] font-mono text-zinc-500 max-w-[150px] leading-tight flex flex-col">
                  <span>ATELIER PRIVATE ACCESS</span>
                  <span>MILAN / TOKYO / NY / PARIS</span>
                  <span className="text-[#C5A880] font-medium mt-1 select-none">ID REQ AT GA-01</span>
                </div>

              </div>

            </div>

            {/* Advisory note */}
            <div className="p-4 bg-burgundy-900/5 rounded-xs mt-4 text-[11px] select-none text-zinc-600 leading-normal flex items-start space-x-2">
              <Award className="w-5 h-5 text-gold-brass mt-0.5 shrink-0" />
              <span>We advise arriving 10 minutes early to appreciate the acoustic ambient soundscapes of the parlor rooms before fitting begins. Rescheduling is complimentary up to 24 hours prior.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
