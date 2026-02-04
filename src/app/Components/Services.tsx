"use client"
import Image from "next/image";
import {
  Settings,
  ShieldCheck,
  Wallet,
  Globe,
  ArrowUpRight,
  BookOpen,
  Users,
  Compass
} from "lucide-react";
import Link from "next/link";

export default function ComprehensiveServices() {
  return (
    <section id="services" className="bg-white py-20 lg:py-32 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50/50 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-50/50 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section: Professional & Bold */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16 sm:mb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              <Compass className="w-3 h-3" />
              Our Ecosystem
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
              End-to-End <br />
              <span className="text-blue-600">Global Excellence.</span>
            </h2>
            
            <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed">
              We’ve replaced traditional consultancy with a <strong className="text-slate-900">full-stack support system</strong>. From your first AI-match to your first job abroad.
            </p>
          </div>

          <Link
            href="/service"
            className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all duration-300 shadow-xl"
          >
            Explore All Services
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* The 2026 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 auto-rows-[200px] md:auto-rows-[180px]">
          
          {/* Feature 1: AI Counseling (Large) */}
          <div className="md:col-span-3 lg:col-span-5 row-span-2 bg-slate-50 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between group overflow-hidden border border-slate-100">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                <Settings className="text-blue-600 w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">Precision AI Counseling</h3>
              <p className="text-slate-600 leading-relaxed">
                Utilizing data from 15,000+ successful placements to map your profile against 800+ global universities instantly.
              </p>
            </div>
            <div className="relative h-32 w-full mt-6 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <Image
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="AI matching"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Feature 2: Visa (Solid Color) */}
          <div className="md:col-span-3 lg:col-span-4 row-span-1 bg-blue-600 rounded-[2.5rem] p-8 text-white relative group">
            <ShieldCheck className="absolute top-8 right-8 w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-xl font-bold mb-2">99% Visa Success</h3>
            <p className="text-blue-100 text-sm">Updated for 2026 immigration norms.</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              Check Eligibility <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Feature 3: Test Prep */}
          <div className="md:col-span-3 lg:col-span-3 row-span-2 bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 flex flex-col justify-between group">
             <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="text-blue-600 w-6 h-6" />
             </div>
             <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Test Prep Mastery</h3>
                <p className="text-slate-500 text-sm mb-4">IELTS, GRE & GMAT coaching by certified trainers.</p>
                <div className="flex -space-x-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="student" width={32} height={32} />
                     </div>
                   ))}
                   <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold border-2 border-white">+2k</div>
                </div>
             </div>
          </div>

          {/* Feature 4: Community (Image with overlay) */}
          <div className="md:col-span-3 lg:col-span-4 row-span-2 relative rounded-[2.5rem] overflow-hidden group">
            <Image
              src="https://images.pexels.com/photos/5673501/pexels-photo-5673501.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Community"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent p-8 flex flex-col justify-end">
              <Users className="text-blue-400 w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Global Alumni Network</h3>
              <p className="text-slate-300 text-sm">Connect with seniors in 15+ countries before you fly.</p>
            </div>
          </div>

          {/* Feature 5: Scholarship (Short) */}
          <div className="md:col-span-3 lg:col-span-5 row-span-1 bg-slate-900 rounded-[2.5rem] p-8 flex items-center justify-between group">
            <div className="flex gap-5 items-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Wallet className="text-blue-400 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Scholarship Desk</h3>
                <p className="text-slate-400 text-sm">₹45Cr+ aid secured in 2025-26.</p>
              </div>
            </div>
            <div className="bg-blue-600 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
               <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}