'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CollegeSlider from '@/components/CollegeSlider'
import { useFormModal } from '@/context/FormModalContext'
import FAQ from "@/app/Components/FAQ"
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Wallet, 
  FileCheck, 
  Briefcase, 
  Users,
  ArrowLeft,
  ArrowRight,
  FileText,
  Compass,
  GraduationCap,
  Sparkles,
  Plane
} from 'lucide-react'

interface Country {
  _id: string
  name: string
  slug: string
  flag: string
  description: string
  meta_title?: string
  meta_description?: string
  is_active: boolean
  createdAt: string
  updatedAt: string
}

const CountryPage = () => {
  const params = useParams()
  const slug = params.slug as string
  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)
  const { openModal } = useFormModal()

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/countries/${slug}`)
        const result = await response.json()
        if (result.success) setCountry(result.data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchCountry()
  }, [slug])

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">Charting your path...</p>
      </div>
    </div>
  )

  if (!country) return null

  const stats = [
    { label: "Global Safety", val: "Ranked Top 15", icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Est. Living", val: "$450/mo", icon: Wallet, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Visa Success", val: "99.1%", icon: FileCheck, color: "text-blue-700", bg: "bg-blue-100/50" },
    { label: "Post-Study", val: "Work Permit", icon: Briefcase, color: "text-sky-600", bg: "bg-sky-50" },
  ]

  const roadmap = [
    { step: "01", title: "Free Counseling", desc: "Profile assessment & university selection" },
    { step: "02", title: "Documentation", desc: "Transcript verification & translation" },
    { step: "03", title: "Admission", desc: "Receive your official University offer letter" },
    { step: "04", title: "Visa & Travel", desc: "Visa processing & departure briefing" },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. BLUE THEMED HERO */}
      <section className="relative h-[65vh] min-h-[550px] flex items-center justify-center overflow-hidden bg-[#020617]">
        {/* Deep Blue/Indigo Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-xl mb-8"
          >
            <span className="text-2xl">{country.flag}</span>
            <span className="text-blue-200 font-bold text-xs uppercase tracking-[0.25em]">Global Medical Hub</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-8"
          >
            Study in <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{country.name}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Transform your future with internationally recognized degrees and world-class clinical exposure in {country.name}.
          </motion.p>
        </div>
      </section>

      {/* 2. FLOATING BENTO STATS (Indigo/Blue) */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-blue-50 group"
            >
              <div className={`${stat.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.val}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8 space-y-20">
            {/* Why Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <Compass size={24} />
                </div>
                <h2 className="text-4xl font-black tracking-tight text-slate-900">Education Excellence</h2>
              </div>
              
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
                <p className="text-xl text-slate-600 leading-relaxed font-medium mb-12">
                  {country.description}
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: "WHO Accredited", desc: "Universities recognized by WHO, ECFMG & MCC", icon: ShieldCheck },
                    { title: "English Medium", desc: "100% English medium instructions for students", icon: Globe },
                    { title: "No Entrance", desc: "Direct admission based on academic scores", icon: Sparkles },
                    { title: "PR Options", desc: "Easy path to residency and local practice", icon: MapPin },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-6 rounded-[2rem] bg-blue-50/50 border border-blue-100/50 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-500 font-medium mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ROADMAP SECTION */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
                  <Plane size={24} />
                </div>
                <h3 className="text-3xl font-black text-slate-900">Admission Roadmap</h3>
              </div>
              
              

              <div className="grid md:grid-cols-4 gap-4 mt-8">
                {roadmap.map((item, i) => (
                  <div key={i} className="relative p-6 bg-white rounded-3xl border border-slate-100">
                    <span className="text-4xl font-black text-slate-100 absolute top-4 right-6">{item.step}</span>
                    <h4 className="font-bold text-blue-600 mb-2 relative z-10">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR CTA */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <Card className="border-none bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[3rem] overflow-hidden text-white shadow-2xl shadow-blue-200">
                <CardContent className="p-10 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
                  <h3 className="text-3xl font-black mb-4 leading-tight">Start Your Journey Today</h3>
                  <p className="text-blue-100/70 mb-10 font-medium text-sm leading-relaxed">
                    Consult with our {country.name} admission experts and get your eligibility report within 24 hours.
                  </p>
                  
                  <div className="space-y-4">
                    <Button 
                      onClick={openModal}
                      className="w-full h-16 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-black text-lg shadow-xl transition-all group"
                    >
                      Book Free Slot
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" className="w-full h-16 rounded-2xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold">
                      <FileText className="mr-2 w-5 h-5" />
                      Download Brochure
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                   <GraduationCap size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enrollment Status</p>
                  <p className="text-sm font-bold text-slate-700 italic">Admissions Open 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SLIDER & FAQ */}
      <div className="bg-white py-24 border-y border-slate-100">
        <CollegeSlider countrySlug={country.slug} countryName={country.name} />
      </div>

      <section className="py-24">
        <FAQ />
      </section>
    </div>
  )
}

export default CountryPage