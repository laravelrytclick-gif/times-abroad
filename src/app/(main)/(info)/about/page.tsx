"use client"
import React from 'react';
import Image from 'next/image';
import {
  PlayCircle, Star, Check, ShieldCheck,
  GraduationCap, TrendingUp, MoveRight,
  MapPin, Phone, Mail, ArrowUpRight,
  Calendar, Users, Award, Globe, CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useFormModal } from '@/context/FormModalContext';

// --- Types ---
interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface Expert {
  name: string;
  role: string;
  image: string;
}

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// --- Data ---
const timeline: TimelineItem[] = [
  { year: "2018", title: "Foundation in Delhi", description: "Started with a mission to make MBBS abroad accessible and affordable for Indian students." },
  { year: "2020", title: "Expansion to Medical Education", description: "Partnered with top NMC & WHO approved universities across Bangladesh, Russia, and Georgia." },
  { year: "2023", title: "Digital Transformation", description: "Launched our student portal for seamless applications and real-time tracking." },
];

const experts: Expert[] = [
  { name: "Dr. Rajesh Kumar", role: "Medical Education Director", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop" },
  { name: "Priya Sharma", role: "Student Counselor", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop" },
  { name: "Amit Patel", role: "Visa Specialist", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop" },
  { name: "Sarah Johnson", role: "International Relations", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop" },
];

const values = [
  {
    title: "Zero Donation Policy",
    description:
      "We believe in transparent education costs. No hidden charges, no donation fees - only genuine tuition fees for quality medical education.",
    subtext:
      "Making MBBS abroad affordable for every deserving student."
  },
  {
    title: "NMC & WHO Approved Universities",
    description:
      "All our partner universities are approved by NMC (National Medical Commission) and WHO, ensuring your degree is valid globally.",
    subtext:
      "Your medical career is secure with recognized degrees."
  },
  {
    title: "Complete End-to-End Support",
    description:
      "From university selection to visa processing, accommodation to local support - we handle everything for your smooth journey.",
    subtext:
      "Focus on your studies while we handle the logistics."
  },
  {
    title: "Indian Food & Hostel Guarantee",
    description:
      "We ensure comfortable accommodation with Indian food facilities, making your stay away from home feel like home.",
    subtext:
      "Your comfort and well-being are our top priorities."
  }
];

const legacyTimeline = [
  {
    year: "2018",
    title: "Started with Medical Focus",
    description:
      "Founded with a clear vision - to help Indian students pursue MBBS abroad without financial burden."
  },
  {
    year: "2019",
    title: "Partnership with Top Universities",
    description:
      "Built strong relationships with NMC approved universities in Bangladesh, Russia, Georgia, and other popular destinations."
  },
  {
    year: "2021",
    title: "500+ Students Placed",
    description:
      "Successfully placed over 500 students in top medical universities with 100% admission success rate."
  },
  {
    year: "2022",
    title: "Expanded Support Services",
    description:
      "Added complete visa support, accommodation assistance, and local guidance for students and parents."
  },
  {
    year: "Today",
    title: "Leading MBBS Abroad Consultancy",
    description:
      "Trusted by thousands of students and parents for transparent, affordable, and reliable medical education abroad."
  }
];

export default function AboutPage() {
   const { openModal } = useFormModal();
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">

      {/* Hero Section */}
<section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center bg-white">
  
  {/* LEFT CONTENT */}
  <div>
    <span className="text-sm font-semibold tracking-widest text-blue-700 uppercase">
      About Education Times Abroad
    </span>

    <h1 className="mt-6 text-xl sm:text-5xl lg:text-4xl font-bold text-slate-900 leading-tight">
      Making MBBS Abroad<br />
      <span className="text-blue-600">Accessible & Affordable</span>
    </h1>

    <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
      We are India's leading consultancy for MBBS abroad, helping students 
      secure admissions in NMC & WHO approved universities with zero 
      donation and complete support.
    </p>

    {/* STATS */}
    <div className="mt-10 grid grid-cols-3 gap-8 max-w-xl">
      <div>
        <p className="text-3xl font-bold text-slate-900">1000+</p>
        <p className="text-sm text-slate-500 mt-1">Students Placed</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-900">15+</p>
        <p className="text-sm text-slate-500 mt-1">Countries</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-900">98%</p>
        <p className="text-sm text-slate-500 mt-1">Success Rate</p>
      </div>
    </div>

    {/* CTA */}
    <div className="mt-12">
      <button
        onClick={openModal}
        className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
      >
        Start Your MBBS Journey
      </button>
    </div>
  </div>

  {/* RIGHT IMAGE */}
  <div className="relative">
    <div className="rounded-3xl overflow-hidden border border-slate-200 bg-slate-50">
      <img
        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop"
        alt="Medical students abroad"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Rating Badge */}
    <div className="absolute -bottom-6 left-6 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
      <p className="text-lg font-bold text-slate-900 leading-none">4.9 / 5</p>
      <p className="text-xs text-slate-500 mt-1">
        Rated by medical students & parents
      </p>
    </div>
  </div>
</section>

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-y border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "NMC Approved", value: "100%" },
          { label: "Partner Universities", value: "50+" },
          { label: "Visa Success Rate", value: "99%" },
          { label: "Zero Donation", value: "Guaranteed" }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <h3 className="text-3xl font-bold text-blue-600">{stat.value}</h3>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Your Medical Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">Starts Here</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                Founded in 2018, Education Times Abroad specializes in MBBS admissions 
                with a focus on transparency, affordability, and student success.
              </p>
              <p className="text-slate-500 text-lg leading-relaxed">
                We've helped over 1000+ students fulfill their dreams of becoming doctors 
                by securing admissions in top medical universities across 15+ countries.
              </p>
            </div>

            {/* Key Achievements */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-slate-700 font-medium">Zero Donation Universities</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-slate-700 font-medium">NMC & WHO Approved Only</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-slate-700 font-medium">Indian Food & Hostel</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=500&h=400&fit=crop"
                alt="Medical Education"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
    <section className="max-w-7xl mx-auto px-6 py-28 bg-slate-50 rounded-3xl mx-6 mb-24 border border-slate-200">
      
      {/* Header */}
      <div className="max-w-3xl mb-20">
        <span className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
          Our Journey
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6 leading-tight">
          Building Medical Careers Since 2018
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          From a small startup to India's trusted MBBS abroad consultancy, 
          our journey has been defined by student success.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-300"></div>

        <div className="space-y-14">
          {legacyTimeline.map((item, index) => (
            <div key={index} className="relative pl-12">
              
              {/* Dot */}
              <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-white border-2 border-blue-700 flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-semibold text-blue-700">
                    {item.year}
                  </span>
                  <Calendar className="w-4 h-4 text-slate-400" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Our Values Section */}
    <section className="max-w-7xl mx-auto px-6 py-28 bg-white">
  {/* Header */}
<div className="max-w-3xl mx-auto mb-20 text-center">
  <span className="text-sm font-semibold tracking-wider text-blue-700 uppercase">
    Our Values
  </span>

  <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mt-4 mb-6 leading-tight">
    Principles That Guide Every Student's Success
  </h2>

  <p className="text-lg text-slate-600 leading-relaxed">
    Our values are built around transparency, affordability, and complete 
    student support for their medical education journey.
  </p>
</div>


  {/* Values Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    {values.map((value, index) => (
      <div
        key={index}
        className="border border-slate-200 rounded-2xl p-10 hover:border-slate-300 transition-colors duration-300"
      >
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-12 h-12 rounded-full border border-blue-700 flex items-center justify-center text-blue-700 font-semibold">
            {index + 1}
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {value.title}
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              {value.description}
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              {value.subtext}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Contact CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your MBBS Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get expert guidance for NMC approved universities with zero donation
          </p>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold rounded-2xl transition-all duration-300 px-8 py-4 text-lg hover:bg-blue-50"
          >
            Get Free Consultation
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

    </main>
  );
}