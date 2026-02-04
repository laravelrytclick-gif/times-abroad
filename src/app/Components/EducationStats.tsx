"use client"
import React from 'react';
import { GraduationCap, TrendingUp, Users, Award, BookOpen, Target, Globe, BrainCircuit, ShieldCheck, Star } from 'lucide-react';

export default function EducationStats() {
  const stats = [
    {
      icon: GraduationCap,
      value: "1000+",
      label: "MBBS Students Placed",
      description: "Successfully enrolled in NMC approved universities"
    },
    {
      icon: ShieldCheck,
      value: "100%",
      label: "NMC Approved", 
      description: "All our partner universities are NMC & WHO approved"
    },
    {
      icon: Globe,
      value: "15+",
      label: "Countries",
      description: "Popular MBBS destinations worldwide"
    },
    {
      icon: Star,
      value: "0",
      label: "Donation Fees",
      description: "Transparent education costs with zero hidden charges"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span>📊</span>
            Our MBBS Impact
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-6">
            NUMBERS THAT <span className="text-blue-600">MATTER</span>
          </h2>
          <p className="text-slate-500 font-semibold text-lg max-w-3xl mx-auto">
            Our track record shows our commitment to making MBBS abroad accessible and affordable for Indian students.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-6">
                <stat.icon size={32} />
              </div>
              <div className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-bold text-blue-600 mb-2">
                {stat.label}
              </div>
              <div className="text-slate-500 text-sm leading-relaxed">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
