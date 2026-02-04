"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import {
  GraduationCap,
  FileText,
  DollarSign,
  BookOpen,
  TrendingUp,
  ArrowUpRight,
  Home,
  ArrowRight,
  Star
} from 'lucide-react';
import Link from 'next/link';
import FAQ from "@/app/Components/FAQ";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }: {
  end: string;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true });

  const getNumericValue = (value: string) => {
    const match = value.match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const getSuffix = (value: string) => value.replace(/[\d.]/g, '');

  const numericEnd = getNumericValue(end);
  const displaySuffix = getSuffix(end);

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
      controls.start("visible");

      const startTime = Date.now();
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * numericEnd));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, isVisible, numericEnd, duration, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6 }}
      className="text-center group"
    >
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 mb-2 transition-all duration-300 group-hover:scale-110">
        {prefix}{count.toLocaleString()}{displaySuffix}
      </div>
      <div className="text-xs tracking-widest text-slate-500 font-bold uppercase">
        {suffix}
      </div>
    </motion.div>
  );
};

// Animated Card Component
const AnimatedCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group"
    >
      {children}
    </motion.div>
  );
};

const ServicesPage = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen font-sans relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-white border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm"
            >
              <span className="text-lg">🎯</span>
              <span className="tracking-wide">COMPREHENSIVE GUIDANCE</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight"
            >
              Your Complete Study
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
                Abroad Solution
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed mb-12"
            >
              From university selection to visa approval, accommodation to career guidance -
              we handle every aspect of your international education journey.
            </motion.p>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              
              {/* University Admissions */}
              <AnimatedCard delay={0.1}>
                <div className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-lg text-white">
                      <GraduationCap size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">University Admissions</h3>
                    <p className="text-slate-600 mb-6">Strategic guidance for top universities worldwide. We match your profile with perfect institutions.</p>
                    <div className="flex items-center text-blue-600 font-bold">
                      <span>Learn More</span> <ArrowUpRight size={18} className="ml-2" />
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Visa Assistance */}
              <AnimatedCard delay={0.2}>
                <div className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-6 shadow-lg text-white">
                      <FileText size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Visa Assistance</h3>
                    <p className="text-slate-600 mb-6">Expert visa application support with 99% success rate across all major destinations.</p>
                    <div className="flex items-center text-blue-600 font-bold">
                      <span>Get Started</span> <ArrowUpRight size={18} className="ml-2" />
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Accommodation */}
              <AnimatedCard delay={0.3}>
                <div className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-6 shadow-lg text-white">
                      <Home size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Accommodation</h3>
                    <p className="text-slate-600 mb-6">Pre-arranged housing solutions in verified locations near your university campus.</p>
                    <div className="flex items-center text-blue-600 font-bold">
                      <span>Find Housing</span> <ArrowUpRight size={18} className="ml-2" />
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Scholarships */}
              <AnimatedCard delay={0.4}>
                <div className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-600 rounded-2xl mb-6 shadow-lg text-white">
                      <DollarSign size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Scholarships</h3>
                    <p className="text-slate-600 mb-6">Access to exclusive scholarships and financial aid opportunities worth millions.</p>
                    <div className="flex items-center text-blue-600 font-bold">
                      <span>Explore Funds</span> <ArrowUpRight size={18} className="ml-2" />
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Test Prep */}
              <AnimatedCard delay={0.5}>
                <div className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-600 rounded-2xl mb-6 shadow-lg text-white">
                      <BookOpen size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Test Prep</h3>
                    <p className="text-slate-600 mb-6">Comprehensive preparation for IELTS, TOEFL, GRE, and other entrance exams.</p>
                    <div className="flex items-center text-blue-600 font-bold">
                      <span>Start Learning</span> <ArrowUpRight size={18} className="ml-2" />
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Career Counseling */}
              <AnimatedCard delay={0.6}>
                <div className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-2xl mb-6 shadow-lg text-white">
                      <TrendingUp size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Career Counseling</h3>
                    <p className="text-slate-600 mb-6">Personalized career guidance and roadmap creation for your future success.</p>
                    <div className="flex items-center text-blue-600 font-bold">
                      <span>Get Advice</span> <ArrowUpRight size={18} className="ml-2" />
                    </div>
                  </div>
                </div>
              </AnimatedCard>

            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-slate-50 py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-12">Proven Results That Speak</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <AnimatedCounter end="10000" suffix="Students Placed" />
              <AnimatedCounter end="500" suffix="University Partners" />
              <AnimatedCounter end="25" suffix="Countries Served" />
              <AnimatedCounter prefix="$" end="50000" suffix="Scholarships Secured" />
            </div>
            
            <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 transform hover:scale-105">
              Begin Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>

      <FAQ />
    </div>
  );
};

export default ServicesPage;