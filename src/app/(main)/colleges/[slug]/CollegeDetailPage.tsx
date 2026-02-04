'use client'

import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFormModal } from '@/context/FormModalContext'
import FAQ from "@/app/Components/FAQ"
import { SITE_CONTACT } from '@/config/site-config'
import { useContactInfo } from "@/hooks/useContactInfo";
import { useCollege } from '@/hooks/useColleges'

import {
  MapPin,
  GraduationCap,
  DollarSign,
  Clock,
  Award,
  Calendar,
  Phone,
  Mail,
  Globe,
  Users,
  BookOpen,
  CheckCircle,
  Star,
  TrendingUp,
  ArrowRight,
  Building,
  FileText,
  Shield,
  Target,
  Zap,
  ChevronRight,
  Info,
  University,
  Camera,
  Trophy,
  Globe2,
  Languages,
  Briefcase,
  Heart,
  Lightbulb,
  Compass,
  Flag,
  CreditCard,
  Library,
  Wifi,
  Bus,
  Coffee,
  Dumbbell,
  Utensils,
  Home,
  TreePine,
  Sparkles,
  Medal,
  Bookmark,
  Share2,
  Download,
  ExternalLink,
  ArrowUpRight,
  ChevronUp,
  ChevronDown,
  History,
  ShieldCheck,
  Quote,
  BookOpenCheck,
  Coins
} from 'lucide-react'
import RelatedColleges from './RelatedColleges'

interface College {
  _id: string
  name: string
  slug: string
  country_ref: any
  exams: string[]
  fees?: number
  duration?: string
  establishment_year?: string
  ranking?: string | {
    title: string
    description: string
    country_ranking: string
    world_ranking: string
    accreditation: string[]
  }
  banner_url?: string
  about_content?: string
  is_active: boolean
  createdAt: string
  updatedAt: string

  // Comprehensive structure fields
  overview?: {
    title: string
    description: string
  }
  key_highlights?: {
    title: string
    description: string
    features: string[]
  }
  why_choose_us?: {
    title: string
    description: string
    features: { title: string; description: string }[]
  }
  admission_process?: {
    title: string
    description: string
    steps: string[]
  }
  documents_required?: {
    title: string
    description: string
    documents: string[]
  }
  fees_structure?: {
    title: string
    description: string
    courses: { course_name: string; duration: string; annual_tuition_fee: string }[]
  }
  campus_highlights?: {
    title: string
    description: string
    highlights: string[]
  }
}

interface CollegeDetailPageProps {
  slug: string
}

const CollegeDetailPage: React.FC<CollegeDetailPageProps> = ({ slug }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { openModal } = useFormModal()

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const sections = [
        { id: 'overview', color: 'bg-emerald-50' },
        { id: 'key-highlights', color: 'bg-yellow-50' },
        { id: 'why-choose', color: 'bg-indigo-50' },
        { id: 'ranking', color: 'bg-blue-50' },
        { id: 'course-highlights', color: 'bg-purple-50' },
        { id: 'admission-process', color: 'bg-slate-50' },
        { id: 'entrance-exams', color: 'bg-orange-50' },
        { id: 'documents-required', color: 'bg-red-50' },
        { id: 'fees-structure', color: 'bg-green-50' },
        { id: 'fees-compare', color: 'bg-teal-50' },
        { id: 'campus-highlights', color: 'bg-cyan-50' },
        { id: 'students-life', color: 'bg-pink-50' }
      ];

      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  const { phones, emails } = useContactInfo();

  // Use TanStack Query for college data
  const {
    data: college,
    isLoading,
    error,
    refetch
  } = useCollege(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading College...</p>
        </div>
      </div>
    )
  }

  if (error || !college) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {error instanceof Error && error.message === 'College not found' ? 'College Not Found' : 'Failed to Load College'}
          </h2>
          <p className="text-slate-500 mb-6">
            {error instanceof Error ? error.message : 'The college you are looking for does not exist.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => refetch()}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Try Again
            </Button>
            <Link href="/colleges">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Browse All Colleges
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative min-h-[600px] lg:min-h-[850px] bg-white overflow-hidden flex items-center">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[45%] h-full bg-slate-900 skew-x-[-6deg] translate-x-20 z-0 hidden lg:block overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-50" />
          {/* Animated Grid Pattern for Tech vibe */}
          <div className="absolute inset-0 opacity-10 bg-[grid-white/20] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20 lg:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* LEFT CONTENT: 7 Columns */}
            <div className="lg:col-span-7 order-2 lg:order-1 space-y-8">

              {/* Badge Row */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                    {college.country_ref?.name || 'International'} Campus
                  </span>
                </div>
                {college.ranking && (
                  <div className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-2xl shadow-xl shadow-amber-200">
                    <Trophy size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Top Tier Rank #{typeof college.ranking === 'object' ? college.ranking.country_ranking : college.ranking}
                    </span>
                  </div>
                )}
              </div>

              {/* Hero Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-900 leading-[0.9] tracking-tight">
                  {college.name}
                  <span className="text-blue-600 italic">.</span>
                </h1>
              </div>

              {/* Description with Expandable Logic */}
              <div className="relative group max-w-2xl">
                <div className={`relative overflow-hidden transition-all duration-700 ${isExpanded ? 'max-h-[500px]' : 'max-h-[100px]'}`}>
                  <p className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed border-l-4 border-blue-600 pl-6">
                    {college.overview?.description || college.about_content}
                  </p>
                  {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent" />
                  )}
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 hover:text-slate-900 transition-colors"
                >
                  {isExpanded ? 'Collapse Brief' : 'Read Full Vision'}
                  <div className={`w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown size={14} />
                  </div>
                </button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-blue-600">
                    <MapPin size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Campus Location</span>
                  </div>
                  <p className="text-lg font-black text-slate-800">{college.country_ref?.name || 'Global'}</p>
                </div>

                {college.establishment_year && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-600">
                      <History size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Legacy Since</span>
                    </div>
                    <p className="text-lg font-black text-slate-800">{college.establishment_year}</p>
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <ShieldCheck size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</span>
                  </div>
                  <p className="text-lg font-black text-slate-800 uppercase">Verified</p>
                </div>
              </div>

              {/* CTA Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button onClick={openModal} className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-2xl">
                  Start My Application
                </button>
                <button className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                  Download Prospectus
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE: 5 Columns */}
            <div className="lg:col-span-5 order-1 lg:order-2 relative h-full flex items-center">
              <div className="relative w-full">
                {/* Main Hero Image */}
                <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-[0_60px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-white group aspect-[4/5]">
                  <img
                    src={college.banner_url || `https://picsum.photos/seed/${college.slug}/800/1000`}
                    alt={college.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Overlay Gradient on Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Floating Experience Card */}
                <div className="absolute -bottom-10 -left-10 z-20 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-50 max-w-[280px] hidden md:block animate-bounce-slow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Intake</p>
                      <p className="text-sm font-black text-slate-900">Session 2026</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Admissions are now open for international scholars with up to 50% scholarship.
                  </p>
                </div>

                {/* Decorative Geometry */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-20" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg">
        <div className="max-w-none px-0 sm:px-0 md:px-0 lg:px-0">
          <div className="relative">
            {/* Active Tab Indicator Line */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out" />
            <div className="flex items-center gap-1 py-2 sm:py-3 overflow-x-auto scrollbar-hide scroll-smooth">
              {[
                { name: 'Overview', id: 'overview' },
                { name: 'Key Highlights', id: 'key-highlights' },
                { name: 'Why Choose ?', id: 'why-choose' },
                { name: 'Ranking', id: 'ranking' },
                { name: 'Course Highlights', id: 'course-highlights' },
                { name: 'Admission Process', id: 'admission-process' },
                { name: 'Eligibility', id: 'entrance-exams' },
                { name: 'Documents', id: 'documents-required' },
                { name: 'Fees', id: 'fees-structure' },
                { name: 'Compare Fees', id: 'fees-compare' },
                { name: 'Campus', id: 'campus-highlights' },
                { name: 'Students Life', id: 'students-life' }
              ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  const element = document.getElementById(tab.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`flex items-center gap-2 px-4 sm:px-4 md:px-4 lg:px-6 py-2.5 text-sm font-semibold rounded-lg sm:rounded-xl transition-all duration-300 whitespace-nowrap group relative overflow-hidden flex-shrink-0 min-w-max ${
                  activeTab === tab.id
                    ? 'text-white bg-blue-600 shadow-md'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="relative z-10 text-sm">
                  {tab.name}
                </span>
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl" />
                {/* Animated underline on hover */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </button>
            ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 transition-colors duration-500 ${
        activeTab === 'overview' ? 'bg-emerald-50' :
        activeTab === 'key-highlights' ? 'bg-yellow-50' :
        activeTab === 'why-choose' ? 'bg-indigo-50' :
        activeTab === 'ranking' ? 'bg-blue-50' :
        activeTab === 'course-highlights' ? 'bg-purple-50' :
        activeTab === 'admission-process' ? 'bg-slate-50' :
        activeTab === 'entrance-exams' ? 'bg-orange-50' :
        activeTab === 'documents-required' ? 'bg-red-50' :
        activeTab === 'fees-structure' ? 'bg-green-50' :
        activeTab === 'fees-compare' ? 'bg-teal-50' :
        activeTab === 'campus-highlights' ? 'bg-cyan-50' :
        activeTab === 'students-life' ? 'bg-pink-50' :
        'bg-white'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* About Section */}
            <div id="overview" className="scroll-mt-24">
              <Card className="border-none shadow-[0_40px_80px_-15px_rgba(16,185,129,0.1)] rounded-[3rem] overflow-hidden bg-white relative">

                {/* Abstract Background Decoration */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-32 z-0 hidden lg:block" />
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-40" />

                <CardHeader className="relative z-10 px-8 sm:px-14 pt-14 pb-4">
                  <div className="flex flex-col gap-4">
                    <div className="inline-flex items-center gap-3">
                      <Badge className="bg-emerald-600 text-white border-none px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-200">
                        Heritage & Vision
                      </Badge>
                      <div className="h-[1px] w-12 bg-emerald-200" />
                    </div>

                    <CardTitle className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                      The <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                        Institution.
                      </span>
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 px-8 sm:px-14 pb-14 pt-6">
                  <div className="relative group">
                    {/* Decorative Quote Icon */}
                    <div className="absolute -left-6 -top-6 text-emerald-100 opacity-50 group-hover:text-emerald-200 transition-colors hidden sm:block">
                      <Quote size={80} fill="currentColor" />
                    </div>

                    {/* Text Body with Expand/Collapse Logic */}
                    <div
                      className={`relative overflow-hidden transition-all duration-1000 ease-in-out ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-[220px] opacity-90'
                        }`}
                    >
                      <div className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium pl-2 sm:pl-8 border-l-2 border-emerald-100 hover:border-emerald-500 transition-colors duration-500">
                        {college.overview?.description || college.about_content}
                      </div>

                      {/* Intelligent Gradient Fade */}
                      {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent z-10" />
                      )}
                    </div>

                    {/* Enhanced Interactive Controller */}
                    <div className="mt-8 flex justify-center sm:justify-start">
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="group relative flex items-center gap-4 bg-slate-900 hover:bg-emerald-600 text-white px-8 py-5 rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-emerald-200"
                      >
                        <span className="text-[11px] font-black uppercase tracking-[0.25em]">
                          {isExpanded ? 'Read Less' : 'Explore Full Story'}
                        </span>

                        <div className={`p-1 bg-white/10 rounded-full transition-transform duration-700 ${isExpanded ? 'rotate-180' : 'group-hover:translate-x-1'}`}>
                          {isExpanded ? <ChevronUp size={18} /> : <ArrowRight size={18} />}
                        </div>

                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 rounded-2xl bg-emerald-400 blur-xl opacity-0 group-hover:opacity-20 transition-opacity -z-10" />
                      </button>
                    </div>
                  </div>

                  {/* Modern Data Integrity Footer */}
                  <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-t border-slate-100">
                    <div className="flex items-center gap-4 text-slate-400">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                        <ShieldCheck className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Verified Profile</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Academic Year 2026-27</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Information */}
            <div id="key-highlights">
              {/* Key Information - Executive Dashboard Style */}
              <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                <CardHeader className="bg-white px-8 pt-10 pb-2">
                  <div className="flex flex-col gap-2">
                    <Badge className="w-fit bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                      Essentials
                    </Badge>
                    <CardTitle className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tighter">
                      <Target className="w-8 h-8 text-blue-600 fill-blue-600/10" />
                      Key Information
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      // Mapping your data into a clean structure for the UI
                      {
                        show: !!college.fees || (college.fees_structure?.courses && college.fees_structure.courses.length > 0),
                        label: "Annual Fees",
                        value: college.fees ? `$${college.fees.toLocaleString()}` : college.fees_structure?.courses?.[0]?.annual_tuition_fee,
                        sub: "Academic investment",
                        icon: DollarSign,
                        color: "emerald"
                      },
                      {
                        show: !!(college.duration || college.fees_structure?.courses?.[0]?.duration),
                        label: "Program Duration",
                        value: `${college.duration || college.fees_structure?.courses?.[0]?.duration} Years`,
                        sub: "Full-time study",
                        icon: Clock,
                        color: "blue"
                      },
                      {
                        show: !!college.establishment_year,
                        label: "Established",
                        value: college.establishment_year,
                        sub: "Legacy of excellence",
                        icon: Calendar,
                        color: "purple"
                      },
                      {
                        show: true,
                        label: "Location",
                        value: college.country_ref?.name || 'International',
                        sub: "Campus residence",
                        icon: MapPin,
                        color: "orange"
                      }
                    ].map((item, i) => item.show && (
                      <div
                        key={i}
                        className="group relative flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                      >
                        <div className="flex items-center gap-5">
                          {/* Dynamic Icon Container */}
                          <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-${item.color}-600 transition-all duration-300`}>
                            <item.icon className={`w-6 h-6 text-${item.color}-600 group-hover:text-white transition-colors`} />
                          </div>

                          <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-slate-500 transition-colors">
                              {item.label}
                            </span>
                            <span className={`text-xl font-black text-slate-900 tracking-tight group-hover:text-${item.color}-700 transition-colors`}>
                              {item.value}
                            </span>
                            <span className="text-xs font-medium text-slate-400">
                              {item.sub}
                            </span>
                          </div>
                        </div>

                        {/* Directional Arrow Path */}
                        <div className="flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                          <ArrowRight className={`w-5 h-5 text-${item.color}-600`} />
                          <div className={`h-1.5 w-1.5 rounded-full bg-${item.color}-600 animate-pulse`} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Trust Line */}
                  <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                      <Shield className="w-3 h-3" /> 100% Verified University Data
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Entrance Exams */}
            <div id="entrance-exams" className="scroll-mt-24">
              {college.exams && college.exams.length > 0 && (
                <Card className="border-none shadow-[0_32px_64px_-20px_rgba(0,0,0,0.08)] rounded-[3rem] overflow-hidden bg-white relative">
                  {/* Decorative Background Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-[5rem] -z-0" />

                  <CardHeader className="relative z-10 px-8 sm:px-12 pt-12">
                    <div className="space-y-4">
                      <Badge className="bg-blue-600 text-white hover:bg-blue-700 border-none px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200">
                        Admission Gates
                      </Badge>
                      <CardTitle className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter flex items-center gap-4">
                        <span className="bg-blue-600 w-2 h-10 rounded-full hidden sm:block" />
                        Entrance Pathway
                      </CardTitle>
                      <p className="text-slate-500 font-medium max-w-2xl leading-relaxed text-lg">
                        Below are the officially recognized standardized tests. High percentiles in these exams can often lead to <span className="text-blue-600 font-bold">merit-based scholarships.</span>
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 p-8 sm:p-12">
                    {/* Exams Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {college.exams.map((exam, index) => (
                        <div
                          key={exam}
                          className="group relative p-6 rounded-[2rem] bg-slate-50 border-2 border-transparent hover:border-blue-100 hover:bg-white transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]"
                        >
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                <FileText className="w-6 h-6" />
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase">
                                  <CheckCircle className="w-3 h-3" /> Accepted
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                                {exam}
                              </h4>
                              <div className="mt-2 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                  Standardized Score
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Subtle Progress Bar Decoration */}
                          <div className="absolute bottom-0 left-8 right-8 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-0 group-hover:w-full bg-blue-600 transition-all duration-700 ease-out" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Dynamic CTA Footer Card */}
                    <div className="mt-12 overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-slate-900 to-blue-900 p-1 font-medium">
                      <div className="bg-slate-900/40 backdrop-blur-sm rounded-[2.4rem] p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">

                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/20 blur-[120px] pointer-events-none" />

                        <div className="flex items-start gap-6 relative z-10">
                          <div className="w-16 h-16 bg-blue-500/20 rounded-[1.5rem] flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                            <Lightbulb className="w-8 h-8 text-blue-400 fill-blue-400/20" />
                          </div>
                          <div className="space-y-2">
                            <h5 className="text-white text-2xl font-black tracking-tight">Confused about the cutoff?</h5>
                            <p className="text-slate-400 max-w-md text-sm leading-relaxed">
                              Every year cutoffs fluctuate based on applicant volume. Our experts can provide you with the <span className="text-blue-400 font-bold">2025-26 expected scorecards.</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full lg:w-auto">
                          <button
                            onClick={openModal}
                            className="group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)]"
                          >
                            Get Cutoff List
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                          <button className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                            Download Brochure
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Key Highlights */}
            <div id="key-highlights" className="scroll-mt-24">
              {college.key_highlights?.features && college.key_highlights.features.length > 0 && (
                <Card className="border-none shadow-[0_40px_80px_-20px_rgba(251,191,36,0.12)] rounded-[3.5rem] overflow-hidden bg-white relative">

                  {/* Top Banner Accent */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600" />

                  <CardHeader className="relative z-10 px-8 sm:px-14 pt-14 pb-6">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-[2px] bg-yellow-500" />
                          <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            Excellence Track
                          </Badge>
                        </div>
                        <CardTitle className="text-5xl sm:text-6xl font-black text-slate-900 tracking-[ -0.05em] leading-[0.9]">
                          Academic <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
                            Highlights.
                          </span>
                        </CardTitle>
                      </div>

                      {college.key_highlights.description && (
                        <div className="max-w-sm">
                          <p className="text-slate-500 font-medium leading-relaxed border-l-2 border-slate-100 pl-6 italic">
                            "{college.key_highlights.description}"
                          </p>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 p-8 sm:p-14">
                    {/* Mosaic Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {college.key_highlights.features.map((feature, index) => (
                        <div
                          key={index}
                          className={`group relative overflow-hidden p-8 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-3 ${index % 3 === 0
                            ? 'bg-slate-900 text-white lg:col-span-2'
                            : 'bg-slate-50 border border-slate-100'
                            }`}
                        >
                          {/* Animated Background Glow (for dark cards) */}
                          {index % 3 === 0 && (
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-yellow-500/10 blur-[80px] group-hover:bg-yellow-500/20 transition-all duration-700" />
                          )}

                          <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                            <div className="flex justify-between items-start">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:rotate-[10deg] ${index % 3 === 0 ? 'bg-yellow-500 text-slate-900' : 'bg-white text-yellow-600'
                                }`}>
                                <Sparkles size={28} className={index % 3 === 0 ? 'fill-slate-900/20' : ''} />
                              </div>
                              <span className={`text-[40px] font-black opacity-10 group-hover:opacity-20 transition-opacity ${index % 3 === 0 ? 'text-white' : 'text-slate-900'
                                }`}>
                                0{index + 1}
                              </span>
                            </div>

                            <div className="space-y-4">
                              <h4 className={`text-xl sm:text-2xl font-black leading-tight tracking-tight ${index % 3 === 0 ? 'text-white' : 'text-slate-800'
                                }`}>
                                {feature}
                              </h4>
                              <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${index % 3 === 0 ? 'text-yellow-500' : 'text-slate-400'
                                }`}>
                                <span>Verified Milestone</span>
                                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* High-Impact Footer (Glassmorphism) */}
                    <div className="mt-12 group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-[3rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                      <div className="relative flex flex-col md:flex-row items-center gap-8 p-10 rounded-[3rem] bg-white border border-yellow-100 shadow-xl overflow-hidden">

                        {/* Left side: Iconography */}
                        <div className="relative">
                          <div className="w-20 h-20 bg-yellow-500 rounded-[2rem] flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-500">
                            <Medal className="w-10 h-10 text-white" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white border-4 border-white">
                            <CheckCircle size={14} />
                          </div>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-2">
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Global Accreditation 2026</h3>
                          <p className="text-slate-500 font-medium">
                            Ranked in the top <span className="text-orange-600 font-black">1% of global institutions</span> for research output and student employability satisfaction.
                          </p>
                        </div>

                        <button className="flex-shrink-0 bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl">
                          View All Accreditations
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Why Choose Us */}
            <div id="why-choose">
              {college.why_choose_us?.features && (
                <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                  <CardHeader className="bg-white px-8 pt-10 pb-2">
                    <div className="flex flex-col gap-2">
                      <Badge className="w-fit bg-indigo-100 text-indigo-700 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        Advantage
                      </Badge>
                      <CardTitle className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tighter">
                        <Compass className="w-8 h-8 text-indigo-600 fill-indigo-600/10" />
                        {college.why_choose_us.title || 'Why Choose Us?'}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {college.why_choose_us.features.map((feature, idx) => (
                        <div key={idx} className="group p-6 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-indigo-100">
                          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <CheckCircle className="w-6 h-6" />
                          </div>
                          <h4 className="text-xl font-black text-slate-900 mb-2">{feature.title}</h4>
                          <p className="text-slate-500 text-sm font-medium leading-relaxed">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Fees Structure Table */}
            <div id="fees-structure">
              {college.fees_structure?.courses && (
                <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                  <CardHeader className="bg-white px-8 pt-10 pb-6">
                    <div className="flex flex-col gap-2">
                      <Badge className="w-fit bg-emerald-100 text-emerald-700 border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        Financials
                      </Badge>
                      <CardTitle className="text-4xl font-black text-slate-900 tracking-tighter">
                        Fee Structure <span className="text-emerald-600">2026</span>
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 sm:p-8">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead>
                          <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            <th className="px-6 py-4">Course Program</th>
                            <th className="px-6 py-4">Duration</th>
                            <th className="px-6 py-4">Annual Tuition</th>
                          </tr>
                        </thead>
                        <tbody>
                          {college.fees_structure.courses.map((course, idx) => (
                            <tr key={idx} className="group bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                              <td className="px-6 py-4 rounded-l-2xl font-bold text-slate-900">{course.course_name}</td>
                              <td className="px-6 py-4 text-slate-500 font-medium">{course.duration} Years</td>
                              <td className="px-6 py-4 rounded-r-2xl font-black text-emerald-600">{course.annual_tuition_fee}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Ranking & Recognition */}
            <div id="ranking" className="scroll-mt-24">
              {college.ranking && typeof college.ranking === 'object' && (
                <Card className="border-none shadow-[0_40px_80px_-15px_rgba(30,58,138,0.1)] rounded-[3.5rem] overflow-hidden bg-white relative">

                  {/* Background Decorative "Global" Mesh */}
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-32 z-0 hidden lg:block" />

                  <CardHeader className="relative z-10 px-8 sm:px-14 pt-14 pb-4">
                    <div className="flex flex-col gap-4">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 w-fit">
                        <Trophy className="w-4 h-4 text-amber-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">Premier Recognition</span>
                      </div>
                      <CardTitle className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tighter">
                        Global <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">Standings.</span>
                      </CardTitle>
                      {college.ranking.description && (
                        <p className="text-slate-500 text-lg font-medium max-w-xl leading-relaxed">
                          {college.ranking.description}
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 p-6 sm:p-14">
                    {/* Main Ranking Display */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                      {[
                        {
                          val: college.ranking.country_ranking,
                          label: "National Rank",
                          tag: "In Country",
                          icon: MapPin,
                          gradient: "from-blue-600 to-blue-800",
                          light: "bg-blue-50"
                        },
                        {
                          val: college.ranking.world_ranking,
                          label: "World Rank",
                          tag: "International",
                          icon: Globe2,
                          gradient: "from-amber-500 to-orange-600",
                          light: "bg-amber-50"
                        }
                      ].map((item, i) => item.val && (
                        <div key={i} className="group relative overflow-hidden rounded-[3rem] bg-white border border-slate-100 p-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                          <div className="flex items-start justify-between relative z-10">
                            <div className="space-y-4">
                              <div className={`w-12 h-12 ${item.light} rounded-2xl flex items-center justify-center`}>
                                <item.icon className="w-6 h-6 text-slate-900" />
                              </div>
                              <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                                <h3 className={`text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br ${item.gradient}`}>
                                  #{item.val}
                                </h3>
                              </div>
                              <Badge className="bg-slate-900 text-white border-none px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                Top {parseInt(item.val) < 100 ? '1%' : '5%'} Globally
                              </Badge>
                            </div>

                            {/* Large Background Ghost Number */}
                            <span className="absolute -right-4 -bottom-8 text-[12rem] font-black text-slate-50 group-hover:text-slate-100 transition-colors pointer-events-none -z-10">
                              {item.val}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Accreditations - The "Seal of Trust" Section */}
                    {college.ranking.accreditation && college.ranking.accreditation.length > 0 && (
                      <div className="relative p-1 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 rounded-[3rem]">
                        <div className="bg-white rounded-[2.9rem] p-8 sm:p-12 overflow-hidden relative">

                          {/* Animated Ray Effect */}
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />

                          <div className="flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-shrink-0 text-center lg:text-left space-y-3">
                              <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-blue-200 mx-auto lg:mx-0 rotate-6 group-hover:rotate-0 transition-transform">
                                <ShieldCheck className="w-10 h-10 text-white" />
                              </div>
                              <h4 className="text-2xl font-black text-slate-900 tracking-tight">Quality <br />Assured.</h4>
                            </div>

                            <div className="flex-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 text-center lg:text-left">
                                Certified by International Boards
                              </p>
                              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                {college.ranking.accreditation.map((acc, index) => (
                                  <div
                                    key={index}
                                    className="group flex items-center gap-3 bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl hover:bg-slate-900 hover:text-white transition-all duration-300"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-blue-400 group-hover:animate-pulse" />
                                    <span className="text-sm font-black tracking-tight uppercase">{acc}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
            {/* Admission Process */}
            <div id="admission-process" className="scroll-mt-24">
              {college.admission_process?.steps && college.admission_process.steps.length > 0 && (
                <Card className="border-none shadow-[0_40px_80px_-15px_rgba(30,64,175,0.08)] rounded-[3.5rem] overflow-hidden bg-white relative">

                  {/* Dynamic Background Wave/Shape */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[100px] opacity-60 -mr-20 -mt-20" />

                  <CardHeader className="relative z-10 px-8 sm:px-14 pt-14 pb-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[8px] font-black text-blue-600">
                              {i}
                            </div>
                          ))}
                        </div>
                        <Badge className="bg-slate-900 text-white border-none px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                          Journey Roadmap
                        </Badge>
                      </div>
                      <CardTitle className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                        The Success <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                          Pathway.
                        </span>
                      </CardTitle>
                      {college.admission_process.description && (
                        <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
                          {college.admission_process.description}
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 p-8 sm:p-14">
                    <div className="relative">
                      {/* Central Connecting Path Line (Animated) */}
                      <div className="absolute left-[31px] top-6 bottom-6 w-[2px] bg-slate-100 hidden md:block">
                        <div className="h-1/2 w-full bg-gradient-to-b from-blue-600 to-indigo-500 animate-pulse" />
                      </div>

                      <div className="space-y-12">
                        {college.admission_process.steps.map((step, index) => (
                          <div
                            key={index}
                            className="group relative flex flex-col md:flex-row items-start gap-8"
                          >
                            {/* Step Indicator Section */}
                            <div className="relative flex-shrink-0 z-10">
                              <div className="w-16 h-16 bg-white border-[3px] border-slate-50 rounded-[1.5rem] flex items-center justify-center shadow-xl transition-all duration-500 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:rotate-[10deg]">
                                <span className="text-2xl font-black text-slate-900 group-hover:text-white transition-colors">
                                  {String(index + 1).padStart(2, '0')}
                                </span>
                              </div>
                              {/* Floating Micro-Badge */}
                              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300">
                                <ChevronRight size={14} />
                              </div>
                            </div>

                            {/* Step Description Card */}
                            <div className="flex-1 bg-slate-50/50 group-hover:bg-white border border-transparent group-hover:border-slate-100 p-8 rounded-[2.5rem] transition-all duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-2">
                                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                                    Phase {index + 1}
                                  </span>
                                  <h4 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-slate-900 transition-colors">
                                    {step}
                                  </h4>
                                </div>
                                {/* Status Placeholder */}
                                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm w-fit">
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                  <span className="text-[10px] font-bold text-slate-500 uppercase">Available for 2026</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* High-Conversion Footer */}
                    <div className="mt-20 group relative">
                      <div className="absolute inset-0 bg-blue-600 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
                      <div className="relative flex flex-col lg:flex-row items-center gap-10 p-10 sm:p-14 rounded-[3rem] bg-slate-900 text-white overflow-hidden">

                        {/* Background Texture */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent" />
                        </div>

                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2rem] flex items-center justify-center rotate-6 group-hover:rotate-12 transition-transform duration-700 shadow-2xl">
                            <Compass className="w-12 h-12 text-white" />
                          </div>
                        </div>

                        <div className="flex-1 text-center lg:text-left space-y-4">
                          <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
                            Still Unsure About <br /> The Process?
                          </h3>
                          <p className="text-slate-400 font-medium text-lg">
                            Get a personalized <span className="text-blue-400">1-on-1 counseling session</span> to clear all your doubts regarding eligibility and deadlines.
                          </p>
                        </div>

                        <button
                          onClick={openModal}
                          className="flex-shrink-0 w-full lg:w-auto bg-white text-slate-900 hover:bg-blue-600 hover:text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all transform active:scale-95 shadow-xl shadow-white/5"
                        >
                          Get Guidance Now
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Documents Required */}
            <div id="documents-required" className="scroll-mt-24">
              {college.documents_required?.documents && college.documents_required.documents.length > 0 && (
                <Card className="border-none shadow-[0_40px_80px_-15px_rgba(249,115,22,0.08)] rounded-[3.5rem] overflow-hidden bg-white relative">

                  {/* Decorative Document "Stack" Graphic in Background */}
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] hidden lg:block transform rotate-12">
                    <FileText size={300} strokeWidth={1} />
                  </div>

                  <CardHeader className="relative z-10 px-8 sm:px-14 pt-14 pb-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1">
                          {[1, 2].map((i) => (
                            <div key={i} className="w-5 h-5 rounded-full bg-orange-500 border-2 border-white" />
                          ))}
                        </div>
                        <Badge className="bg-orange-50 text-orange-700 border-orange-100 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                          Required Dossier
                        </Badge>
                      </div>
                      <CardTitle className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                        Document <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                          Checklist.
                        </span>
                      </CardTitle>
                      {college.documents_required.description && (
                        <p className="text-slate-500 text-lg font-medium max-w-xl leading-relaxed">
                          {college.documents_required.description}
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 p-8 sm:p-14">
                    {/* Document Grid with "Checked" State Style */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {college.documents_required.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="group relative flex items-center p-6 rounded-[2rem] bg-slate-50 border-2 border-transparent hover:border-orange-100 hover:bg-white transition-all duration-500 hover:shadow-xl"
                        >
                          <div className="flex items-center gap-6 w-full">
                            {/* Visual Checkbox */}
                            <div className="relative flex-shrink-0">
                              <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center shadow-sm group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
                                <ShieldCheck className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors" />
                              </div>
                              {/* Floating Number */}
                              <span className="absolute -top-2 -left-2 w-6 h-6 bg-slate-900 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                                {index + 1}
                              </span>
                            </div>

                            <div className="flex-1">
                              <h4 className="text-lg font-black text-slate-700 tracking-tight group-hover:text-slate-900 transition-colors">
                                {doc}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="h-1 w-1 rounded-full bg-orange-400" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mandatory Copy</span>
                              </div>
                            </div>

                            {/* Status indicator on hover */}
                            <div className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 hidden sm:block">
                              <div className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-black uppercase">
                                Ready
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* High-End Instructional Footer */}
                    <div className="mt-12 group">
                      <div className="relative p-10 rounded-[3rem] bg-slate-900 text-white overflow-hidden shadow-2xl">
                        {/* Background Light Pattern */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent opacity-50" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                          <div className="w-20 h-20 bg-orange-500 rounded-[2rem] flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-orange-500/20">
                            <Info className="w-10 h-10 text-white" />
                          </div>

                          <div className="flex-1 space-y-2 text-center md:text-left">
                            <h4 className="text-2xl font-black tracking-tight uppercase">Professional Scanning Tip</h4>
                            <p className="text-slate-400 font-medium leading-relaxed max-w-2xl">
                              Ensure all documents are <span className="text-orange-400">Clear Color Scans</span> in PDF format. Mobile photos are often rejected—use a professional scanner for high resolution.
                            </p>
                          </div>

                          <div className="flex-shrink-0">
                            <div className="flex flex-col items-center gap-2 p-4 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
                              <FileText className="text-orange-400" size={24} />
                              <span className="text-[10px] font-black uppercase text-slate-400">PDF ONLY</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Campus Highlights */}
            <div id="campus-highlights" className="scroll-mt-24">
              {college.campus_highlights?.highlights && college.campus_highlights.highlights.length > 0 && (
                <Card className="border-none shadow-[0_40px_80px_-15px_rgba(59,130,246,0.1)] rounded-[3.5rem] overflow-hidden bg-white relative">

                  {/* Decorative Blob for Atmosphere */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />

                  <CardHeader className="relative z-10 px-8 sm:px-14 pt-14 pb-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-1">
                          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                          <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]" />
                          <div className="w-2 h-2 rounded-full bg-blue-200 animate-bounce [animation-delay:0.4s]" />
                        </div>
                        <Badge className="bg-blue-50 text-blue-700 border-blue-100 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                          Campus Experience
                        </Badge>
                      </div>
                      <CardTitle className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                        Life Beyond <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                          The Books.
                        </span>
                      </CardTitle>
                      {college.campus_highlights.description && (
                        <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
                          {college.campus_highlights.description}
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 p-8 sm:p-14">
                    {/* Bento Style Highlights Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {college.campus_highlights.highlights.map((highlight, index) => {
                        const getIcon = (text: string) => {
                          const lowerText = text.toLowerCase();
                          if (lowerText.includes('wifi')) return <Wifi size={24} />;
                          if (lowerText.includes('library')) return <Library size={24} />;
                          if (lowerText.includes('gym') || lowerText.includes('sport')) return <Dumbbell size={24} />;
                          if (lowerText.includes('food') || lowerText.includes('cafe')) return <Utensils size={24} />;
                          if (lowerText.includes('hostel')) return <Home size={24} />;
                          return <Zap size={24} />;
                        };

                        return (
                          <div
                            key={index}
                            className="group relative p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
                          >
                            {/* Floating Decoration Background */}
                            <div className="absolute -right-4 -bottom-4 text-slate-100 group-hover:text-blue-50 transition-colors pointer-events-none transform group-hover:scale-150 transition-transform duration-700">
                              {getIcon(highlight)}
                            </div>

                            <div className="relative z-10 space-y-6">
                              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                                {getIcon(highlight)}
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">
                                  {highlight}
                                </h4>
                                <div className="flex items-center gap-2">
                                  <div className="h-1 w-1 rounded-full bg-blue-400" />
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium Facility</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Cinematic Virtual Tour Banner */}
                    <div className="mt-16 group relative overflow-hidden rounded-[3rem] bg-slate-900 p-1">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 opacity-20 group-hover:opacity-40 transition-opacity" />

                      <button
                        onClick={openModal}
                        className="relative w-full bg-slate-900/80 backdrop-blur-xl rounded-[2.9rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 transition-all overflow-hidden"
                      >
                        {/* Animated Light Ray */}
                        <div className="absolute top-0 left-[-100%] group-hover:left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 ease-in-out" />

                        <div className="flex items-center gap-8 relative z-10 text-center md:text-left">
                          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 group-hover:scale-110 transition-transform duration-500">
                            <Globe className="w-10 h-10 text-white animate-[spin_10s_linear_infinite]" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-3xl font-black text-white tracking-tight leading-none uppercase">Experience the Campus</h3>
                            <p className="text-slate-400 font-medium text-lg">Take a 360° virtual tour from the comfort of your home.</p>
                          </div>
                        </div>

                        <div className="relative z-10 flex items-center gap-4 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] group-hover:bg-blue-600 group-hover:text-white transition-all">
                          Launch Tour <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </div>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right Column - CTA and Related */}
          <div className="space-y-8 lg:sticky lg:top-28 lg:h-fit">
            {/* Primary CTA Card: The "Action Hub" */}
            <Card className="border-none shadow-[0_30px_60px_-15px_rgba(22,163,74,0.2)] rounded-[2.5rem] overflow-hidden bg-slate-900 relative group">

              {/* Animated Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[50px] group-hover:bg-emerald-500/40 transition-colors duration-700" />

              <CardContent className="p-10 relative z-10">
                <div className="flex flex-col items-center text-center">
                  {/* Floating Icon with Ring */}
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center rotate-6 group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-emerald-500/20">
                      <Sparkles className="w-10 h-10 text-white animate-pulse" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                    </div>
                  </div>

                  <h3 className="text-3xl font-black text-white tracking-tighter mb-3">
                    Take the <br /> <span className="text-emerald-400">Next Step.</span>
                  </h3>
                  <p className="text-slate-400 font-medium mb-8 text-sm leading-relaxed">
                    Join 5,000+ international students starting their journey in 2026.
                  </p>

                  <div className="w-full space-y-4">
                    {/* Main Action Button */}
                    <button
                      onClick={openModal}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-2xl transition-all duration-300 py-5 px-6 flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/20 active:scale-95 group/btn"
                    >
                      <span className="text-xs uppercase tracking-[0.2em]">Apply Securely</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </button>

                    {/* Secondary Action Button */}
                    <button
                      onClick={openModal}
                      className="w-full bg-white/5 backdrop-blur-md text-white border border-white/10 hover:bg-white/10 font-black rounded-2xl transition-all duration-300 py-5 px-6 flex items-center justify-center gap-3 group/btn2"
                    >
                      <Phone className="w-4 h-4 text-emerald-400 group-hover/btn2:rotate-12 transition-transform" />
                      <span className="text-xs uppercase tracking-[0.2em]">Talk to Expert</span>
                    </button>
                  </div>
                </div>
              </CardContent>

              {/* Bottom Trust Strip */}
              <div className="bg-emerald-500/10 py-3 px-6 text-center border-t border-white/5">
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em]">Official Partner Channel</span>
              </div>
            </Card>

            {/* Contact Details: The "Support Dossier" */}
            <Card className="border border-slate-100 shadow-xl rounded-[2rem] overflow-hidden bg-white">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Direct Contact</h4>

                  {/* Contact Item */}
                  <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Phone size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Support Line</span>
                      <span className="text-sm font-black text-slate-800 tracking-tight">{phones.primary}</span>
                    </div>
                  </div>

                  {/* Contact Item */}
                  <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                      <Mail size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Email Inquiry</span>
                      <span className="text-sm font-black text-slate-800 tracking-tight">{emails.info}</span>
                    </div>
                  </div>

                  {/* Floating Availability Badge */}
                  <div className="pt-4 border-t border-slate-50">
                    <div className="flex items-center justify-center gap-2 bg-emerald-50 py-2 rounded-xl">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">Counselors Online Now</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Trust Badge */}
            <div className="flex items-center justify-center gap-4 px-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
              <ShieldCheck size={24} className="text-slate-400" />
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-tight">
                Secure Data Encryption <br /> ISO 27001 Certified
              </p>
            </div>
          </div>
        </div>

        {/* Related Colleges */}
        <div className="mt-16">
          <RelatedColleges currentCollegeSlug={college.slug} />
        </div>
      </div>

      <FAQ />
    </div>
  )
}

export default CollegeDetailPage
