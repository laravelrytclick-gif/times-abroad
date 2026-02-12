"use client";

import React from 'react';
import { ArrowRight, GraduationCap, Globe, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-[#F8FAFC] pt-20 pb-16 overflow-hidden">

      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 -skew-x-12 transform origin-top" />
      <div className="absolute top-40 -left-20 w-80 h-80 bg-blue-400 rounded-full blur-[100px] opacity-20 animate-pulse" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT COLUMN - Messaging */}
          <div className="flex flex-col items-start text-left">

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">NMC & WHO Approved Universities</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl xl:text-[75px] font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              Your Global Degree <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-blue-600">Starts Overseas</span>
                {/* Abstract underline effect */}
                <span className="absolute bottom-2 left-0 w-full h-4 bg-blue-100 -z-10 rounded-full opacity-60"></span>
              </span>
              <br />
              <span className="relative inline-flex flex-wrap items-center gap-3">
                {/* Universal Highlight */}
                <span className="relative z-10 px-5 py-1.5 text-white bg-slate-900 rounded-2xl shadow-xl shadow-slate-200">
                  Zero Donation
                </span>
                {/* Sub-text inside heading for clarity */}
                <span className="text-2xl md:text-3xl font-bold text-slate-400">
                  MBBS • Engineering • MBA
                </span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed mb-10">
              Low-cost MBBS abroad with world-class clinical exposure. We help you find the best medical colleges in <span className="text-slate-900 font-semibold underline decoration-blue-400">Bangladesh, Russia, Georgia</span> & more.
            </p>

            {/* Feature Checkmarks (Quick Connectivity for Parents) */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 mb-10">
              {['100% Admission Mail', 'Lowest Tuition Fees', 'Verified Hostels', 'Indian Food Available'].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{text}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/colleges"
                className="group w-full sm:w-auto px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-400/30 flex items-center justify-center gap-3 text-lg hover:-translate-y-1"
              >
                Find My College
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/countries"
                className="group w-full sm:w-auto px-8 py-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-blue-600 transition-all flex items-center justify-center gap-3"
              >
                <Globe size={20} className="text-blue-600" />
                <span className="text-base font-bold text-slate-900">Explore Countries</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN - Visuals */}
          <div className="relative pt-10 lg:pt-0">
            {/* Experience Card (Floating) */}
            <div className="absolute -top-4 -right-4 md:right-0 z-20 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 animate-float">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <ShieldCheck size={28} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Guaranteed</p>
                <p className="text-sm font-black text-slate-900">Direct Admissions</p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 h-[450px] md:h-[550px]">
              {/* Main Image - Medical Students */}
              <div className="col-span-8 h-full relative group">
                <div className="absolute inset-0 bg-blue-600 rounded-[2rem] rotate-3 transition-transform group-hover:rotate-1" />
                <div className="relative h-full rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
                    alt="MBBS Students Abroad"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                    <p className="text-white font-medium italic text-sm">"Safe campus and quality education for Indian students"</p>
                  </div>
                </div>
              </div>

              {/* Side Images */}
              <div className="col-span-4 flex flex-col gap-4 h-full">
                <div className="h-1/2 rounded-[2rem] overflow-hidden border-4 border-white shadow-lg">
                  <img src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&q=80" className="w-full h-full object-cover" alt="Hospital" />
                </div>
                <div className="h-1/2 rounded-[2rem] overflow-hidden border-4 border-white shadow-lg bg-blue-600 flex items-center justify-center text-center p-4">
                  <div>
                    <p className="text-white font-black text-2xl">100%</p>
                    <p className="text-blue-100 text-[10px] font-bold uppercase">Transparency</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Country Tags Overlay */}
            <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              {['Bangladesh', 'Russia', 'Uzbekistan', 'Georgia', 'Egypt', 'Kazakhstan'].map((country) => (
                <span key={country} className="px-4 py-2 bg-white rounded-xl text-sm font-bold text-slate-700 shadow-sm border border-slate-100 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {country}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;