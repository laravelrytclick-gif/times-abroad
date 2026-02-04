'use client'

import React from 'react';
import { MessageSquare, FileText, Briefcase, Plane, Home, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const JourneyStep = ({ icon: Icon, title, description, isBlue = false }: {
  icon: any, title: string, description: string, isBlue?: boolean
}) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="flex flex-col items-center text-center flex-1 z-10 group"
  >
    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[1.5rem] flex items-center justify-center mb-5 sm:mb-6 shadow-xl transition-all duration-300
      ${isBlue 
        ? 'bg-blue-600 text-white shadow-blue-200' 
        : 'bg-white text-blue-600 border border-slate-100 group-hover:border-blue-200 group-hover:bg-blue-50/50'}`}>
      <Icon size={24} className="sm:w-[26px] sm:h-[26px]" />
    </div>
    <h3 className="font-black text-slate-900 text-base sm:text-lg mb-2 tracking-tight">{title}</h3>
    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-[140px] sm:max-w-[180px] font-medium italic">
      {description}
    </p>
  </motion.div>
);

export default function ProcessJourney() {
  const steps = [
    { icon: MessageSquare, title: "Strategic Discovery", description: "Expert profile evaluation & goal alignment", isBlue: true },
    { icon: FileText, title: "Academic Liaison", description: "Seamless university application & tracking" },
    { icon: ShieldCheck, title: "Visa Compliance", description: "Strict documentation & legal clearance" },
    { icon: Plane, title: "Global Logistics", description: "Departure briefing & travel coordination" },
    { icon: Home, title: "Campus Integration", description: "On-ground support & hostel settlement" }
  ];

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-[#F8FAFC] overflow-hidden relative">
      {/* Premium Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-indigo-100/30 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8">
          <Sparkles className="w-3 h-3" />
          The Path to Excellence
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-[1.1]">
          Your Gateway to a <br className="hidden sm:block" />
          <span className="text-blue-600">Global Medical Career</span>
        </h2>

        <p className="text-lg sm:text-xl text-slate-500 max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
          Navigating international admissions shouldn't be a maze. We’ve distilled 
          years of expertise into a <span className="text-slate-900 font-bold">seamless 5-stage transition</span> 
          designed for the modern medical student.
        </p>

        {/* High-Performance Metrics */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 lg:gap-16 mb-20">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-blue-600">99.2%</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visa Success Rate</div>
          </div>
          <div className="hidden md:block w-12 h-px bg-slate-200"></div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-blue-600">24/7</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">On-Ground Support</div>
          </div>
          <div className="hidden md:block w-12 h-px bg-slate-200"></div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-black text-blue-600">10k+</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Doctors Mentored</div>
          </div>
        </div>

        

        <div className="relative mt-10">
          {/* Connecting Line with Gradient */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-600 via-blue-200 to-slate-100 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <JourneyStep key={idx} {...step} />
            ))}
          </div>
        </div>

        <div className="mt-20">
            <button className="bg-slate-900 hover:bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-slate-200 flex items-center gap-3 mx-auto">
                Begin Your Assessment
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
      </div>
    </section>
  );
}