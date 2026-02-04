'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useFormModal } from '@/context/FormModalContext'
import FAQ from "@/app/Components/FAQ"
import {
  Calendar,
  FileText,
  ArrowLeft,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Timer,
  TrendingUp,
  CalendarDays,
  Sparkles,
  ShieldCheck,
  Info,
  Clock
} from 'lucide-react'
import { motion } from 'framer-motion'
import './styles.css'

interface Country {
  _id: string
  name: string
  slug: string
  flag: string
}

interface Exam {
  _id: string
  name: string
  slug: string
  short_name: string
  exam_type: string
  conducting_body: string
  exam_mode: string
  frequency: string
  description: string
  hero_section: {
    title: string
    subtitle?: string
    image?: string
  }
  overview: {
    title: string
    content: string
    key_highlights: string[]
  }
  registration: {
    title: string
    description: string
    image?: string
    bullet_points: string[]
  }
  exam_pattern: {
    title: string
    description: string
    total_duration_mins: number
    score_range: string
    table_data: {
      section: string
      questions: number
      duration_mins: number
    }[]
  }
  exam_dates: {
    title: string
    important_dates: {
      event: string
      date: Date
    }[]
  }
  result_statistics: {
    title: string
    description: string
    passing_criteria: string
    total_marks: number
    passing_marks: number
  }
  applicable_countries: Country[]
  is_active: boolean
  display_order: number
  createdAt: string
  updatedAt: string
}

const ExamPage = () => {
  const params = useParams()
  const slug = params.slug as string
  const [exam, setExam] = useState<Exam | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const { openModal } = useFormModal()

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/exams/${slug}`)
        const result = await response.json()
        if (result.success) setExam(result.data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchExam()
  }, [slug])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'registration', 'pattern', 'dates', 'results', 'faq']
      const current = sections.find(section => {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      if (current) setActiveTab(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest animate-pulse">Fetching Data...</p>
      </div>
    </div>
  )

  if (!exam) return null

  const navItems = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'pattern', label: 'Exam Pattern', icon: Timer },
    { id: 'dates', label: 'Important Dates', icon: CalendarDays },
    { id: 'results', label: 'Statistics', icon: Award },
    { id: 'faq', label: 'FAQs', icon: Info },
  ]

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' })
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. PREMIUM HERO SECTION */}
      <section className="relative bg-[#0F172A] pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex gap-2 mb-6">
              <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1 rounded-lg uppercase text-[10px] font-bold tracking-widest">
                {exam.exam_type}
              </Badge>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 rounded-lg uppercase text-[10px] font-bold tracking-widest">
                {exam.exam_mode}
              </Badge>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-tight">
              Master the <span className="text-blue-500">{exam.short_name}</span> Exam
            </h1>
            <p className="text-slate-400 text-lg mt-6 max-w-xl leading-relaxed font-medium">
              {exam.hero_section?.subtitle || exam.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Button onClick={openModal} className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 rounded-2xl font-bold shadow-lg shadow-blue-500/20">
                Get Free Guidance <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button onClick={() => scrollTo('pattern')} variant="outline" className="border-slate-700 text-white bg-white/5 h-14 px-8 rounded-2xl font-bold">
                View Pattern
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <div className="aspect-video rounded-[2.5rem] overflow-hidden border-8 border-white/5 shadow-2xl">
              <img src={exam.hero_section?.image || "/api/placeholder/800/600"} alt={exam.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Users size={24} /></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Reach</p>
                  {/* <p className="text-xl font-black text-slate-900">{exam.applicable_countries.length}+ Countries</p> */}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* STICKY SIDEBAR */}
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-24 p-4 bg-white rounded-[2rem] border border-slate-100 shadow-sm space-y-2">
              <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Navigation</p>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === item.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'text-slate-500 hover:bg-slate-50'
                    }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>
          </aside>

          {/* CONTENT SECTIONS */}
          <div className="flex-1 space-y-20">

            {/* OVERVIEW */}
            <section id="overview" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 shrink-0"><BookOpen size={20} /></div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Overview</h2>
              </div>
              <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
                <CardContent className="p-10">
                  <p className="text-xl text-slate-600 leading-relaxed font-medium mb-10">
                    {exam.overview.content}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {exam.overview.key_highlights.map((h: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <CheckCircle className="text-emerald-500" size={20} />
                        <span className="font-bold text-slate-700">{h}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* EXAM PATTERN */}
            <section id="pattern" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600"><Timer size={20} /></div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">Exam Pattern</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <Clock className="text-purple-600 mb-4" size={32} />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Total Duration</p>
                  <p className="text-4xl font-black text-slate-900 mt-2">{exam.exam_pattern.total_duration_mins} <span className="text-lg text-slate-400">min</span></p>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <TrendingUp className="text-blue-600 mb-4" size={32} />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Score Range</p>
                  <p className="text-4xl font-black text-slate-900 mt-2">{exam.exam_pattern.score_range}</p>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <ShieldCheck className="text-emerald-600 mb-4" size={32} />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Difficulty</p>
                  <p className="text-4xl font-black text-slate-900 mt-2">Moderate</p>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <tr>
                      <th className="px-8 py-6">Section Name</th>
                      <th className="px-8 py-6 text-center">Questions</th>
                      <th className="px-8 py-6 text-right">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {exam.exam_pattern.table_data.map((row: any, i: number) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6 font-bold text-slate-800">{row.section}</td>
                        <td className="px-8 py-6 text-center text-slate-500 font-bold">{row.questions}</td>
                        <td className="px-8 py-6 text-right font-black text-blue-600">{row.duration_mins}m</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* NEW: DATES SECTION */}
            <section id="dates" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600"><CalendarDays size={20} /></div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">{exam.exam_dates.title}</h2>
              </div>
              
              <div className="relative border-l-2 border-slate-100 ml-4 pl-8 space-y-8">
                {exam.exam_dates.important_dates.map((item: any, i: number) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    key={i} 
                    className="relative"
                  >
                    <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full border-4 border-white bg-orange-500 shadow-sm" />
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Upcoming Event</p>
                          <h4 className="text-xl font-bold text-slate-900">{item.event}</h4>
                        </div>
                        <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl text-orange-700 font-bold">
                          <Calendar size={16} />
                          {formatDate(item.date)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* RESULTS STATISTICS */}
            {exam.result_statistics && (
              <section id="results" className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600"><Award size={20} /></div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-900">Success Metrics</h2>
                </div>
                <div className="bg-[#0F172A] p-12 rounded-[3rem] text-white relative overflow-hidden">
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-4">{exam.result_statistics.title}</h3>
                      <p className="text-slate-400 mb-8 leading-relaxed font-medium">{exam.result_statistics.description}</p>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                            <span>Passing Benchmark</span>
                            <span className="text-emerald-400">{exam.result_statistics.passing_marks} / {exam.result_statistics.total_marks}</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(exam.result_statistics.passing_marks / exam.result_statistics.total_marks) * 100}%` }}
                              transition={{ duration: 1 }}
                              className="h-full bg-emerald-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-44 h-44 rounded-full border-[12px] border-emerald-500/20 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-4xl font-black text-emerald-400">{Math.round((exam.result_statistics.passing_marks / exam.result_statistics.total_marks) * 100)}%</p>
                        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500">Pass Rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* FAQ */}
            <section id="faq" className="scroll-mt-32">
              <FAQ />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamPage