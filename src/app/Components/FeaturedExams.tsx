"use client"
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  MapPin, Trophy, DollarSign, Calendar, ArrowUpRight,
  FileText, Award, Building2, ArrowRight, GraduationCap, 
  ChevronRight, Sparkles
} from 'lucide-react';

// --- Interfaces (Kept as per your original structure) ---
interface UniversityCardProps {
  name: string; image: string; location: string; ranking?: string;
  fees?: number; duration?: string; establishment_year?: string;
  slug: string; country?: string; about?: string; college_type?: string;
}

interface ExamCardProps {
  name: string; short_name?: string; exam_type?: string;
  conducting_body?: string; exam_mode?: string; frequency?: string;
  description?: string; slug: string;
}

// --- Component 1: Premium University Card ---

const UniversityCard = ({ name, image, location, college_type ,  ranking, fees, duration, establishment_year, slug, country, about }: UniversityCardProps) => (
  <Link href={`/colleges/${slug}`} className="group block h-full">
    <div className="relative h-full bg-white rounded-3xl border border-slate-200 hover:border-blue-500/50 shadow-sm hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-500 overflow-hidden flex flex-col hover:-translate-y-2">
      
      {/* Image & Badges */}
      <div className="relative h-52 w-full overflow-hidden">
        <img 
          src={image || "/next.svg"} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {ranking && (
          <div className="absolute top-4 right-4 backdrop-blur-md bg-white/90 border border-white/50 text-slate-900 px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-xl">
            <Trophy size={14} className="text-amber-500 fill-amber-500/20" />
            <span className="text-[11px] font-bold tracking-tight">Ranked {ranking}</span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
          <div className="backdrop-blur-md bg-black/30 border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-2 text-white">
            <MapPin size={14} className="text-blue-400" />
            <span className="text-[11px] font-semibold truncate">{country}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-white to-slate-50/50">
        <div className="mb-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] tracking-widest uppercase mb-1.5">
            <Building2 size={12} />
            <span>ESTD. {establishment_year}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2 uppercase">
            {name}
          </h3>
        </div>

        {about && (
          <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-6 italic border-l-2 border-blue-200 pl-3">
            {about}
          </p>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm group-hover:border-blue-100 transition-colors">
            <p className="text-[9px] text-slate-400 uppercase font-black mb-1 flex items-center gap-1">
              <DollarSign size={10} /> Tuition Fee
            </p>
            <p className="text-slate-900 font-bold text-sm">
              {typeof fees === 'string' ? fees : (fees ? `$${fees.toLocaleString()}` : 'N/A')}
            </p>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm group-hover:border-blue-100 transition-colors">
            <p className="text-[9px] text-slate-400 uppercase font-black mb-1 flex items-center gap-1">
              <Calendar size={10} /> Duration
            </p>
            <p className="text-slate-900 font-bold text-sm">{duration} Years</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-blue-600">
            <GraduationCap size={16} />
            <span className="text-[10px] font-black uppercase tracking-wider">{college_type}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-900 text-xs font-bold group-hover:translate-x-1 transition-transform">
            DETAILS <ArrowUpRight size={14} className="text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

// --- Component 2: Modern Exam Card ---

const ExamCard = ({ name, short_name, exam_type, conducting_body, exam_mode, frequency, description, slug }: ExamCardProps) => (
  <Link href={`/exams/${slug}`} className="group block h-full">
    <div className="relative h-full bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
            <FileText size={24} />
          </div>
          <span className="bg-green-50 text-green-600 text-[10px] font-black px-2 py-1 rounded-lg uppercase">Active</span>
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
          {short_name || name}
        </h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">{conducting_body}</p>

        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-6">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="bg-slate-50 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-xl border border-slate-100">
            {exam_mode}
          </span>
          <span className="bg-slate-50 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-xl border border-slate-100">
            {exam_type}
          </span>
        </div>
      </div>

      <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between group-hover:bg-indigo-50 transition-colors">
        <span className="text-[10px] font-black text-indigo-600 uppercase">View Exam Pattern</span>
        <ChevronRight size={16} className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </Link>
);

// --- Sections & Main Logic ---

export default function FeaturedSection() {
  const { universities, exams, isLoading, error } = useFeaturedData();
  const [uCount, setUCount] = useState(6);
  const [eCount, setECount] = useState(8);

  if (error) return <div className="py-20 text-center text-red-500 font-bold">Error loading featured content.</div>;

  return (
    <div className="space-y-32 py-24 bg-white overflow-hidden">
      
      {/* Universities Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-3">
              <Sparkles size={18} className="animate-pulse" />
              <span>NMC Approved Institutions</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              FEATURED <span className="text-blue-600">COLLEGES</span>
            </h2>
          </div>
          <Link href="/colleges" className="hidden md:flex items-center gap-2 text-slate-900 font-bold hover:text-blue-600 transition-colors">
            Explore All <ArrowRight size={20} />
          </Link>
        </div>

        {isLoading ? <SkeletonGrid /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {universities.slice(0, uCount).map((uni: UniversityCardProps, i: number) => <UniversityCard key={i} {...uni} />)}
          </div>
        )}

        {uCount < universities.length && (
          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <button onClick={() => setUCount(prev => prev + 3)} className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
              Show More Colleges
            </button>
            <Link href="/colleges"  className="bg-slate-900 ml-3 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
              All colleges
            </Link>
          </div>
        )}
      </section>

      {/* Exams Section */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase mb-4">
              CRACK THE <span className="text-indigo-600">EXAMS</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg">Your gateway to medical excellence starts here.</p>
          </div>

          {isLoading ? <SkeletonGrid count={4} /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {exams.slice(0, eCount).map((exam: ExamCardProps, i: number) => <ExamCard key={i} {...exam} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Helper Skeleton Component
const SkeletonGrid = ({ count = 3 }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${count} gap-8`}>
    {[...Array(count)].map((_, i) => (
      <div key={i} className="bg-slate-100 h-[400px] rounded-3xl animate-pulse" />
    ))}
  </div>
);

// --- useFeaturedData Hook (Logic remains same as your original) ---
const useFeaturedData = () => {
  const { data: collegesData, isLoading: collegesLoading, error: collegesError } = useQuery({
    queryKey: ['featured-colleges'],
    queryFn: async () => {
      const res = await fetch('/api/colleges');
      const json = await res.json();
      return json.data.colleges || [];
    }
  });

  const { data: examsData, isLoading: examsLoading, error: examsError } = useQuery({
    queryKey: ['featured-exams'],
    queryFn: async () => {
      const res = await fetch('/api/exams');
      const json = await res.json();
      return json.data || [];
    }
  });

  const universities = useMemo(() => {
    if (!collegesData) return [];
    return collegesData.map((college: any) => ({
      name: college.name,
      image: college.banner_url,
      location: college.country_ref?.city,
      ranking: college.ranking?.country_ranking || college.ranking,
      fees: college.fees_structure?.courses?.[0]?.annual_tuition_fee ? 
        college.fees_structure.courses[0].annual_tuition_fee : college.fees,
      duration: college.fees_structure?.courses?.[0]?.duration || college.duration,
      establishment_year: college.establishment_year,
      slug: college.slug,
      country: college.country_ref?.name,
      about: college.about_content,
      college_type: college.college_type || 'University'
    }));
  }, [collegesData]);

  const transformedExams = useMemo(() => {
    if (!examsData) return [];
    return examsData.map((exam: any) => ({
      name: exam.name,
      short_name: exam.short_name,
      exam_type: exam.exam_type,
      conducting_body: exam.conducting_body,
      exam_mode: exam.exam_mode,
      frequency: exam.frequency,
      description: exam.description,
      slug: exam.slug
    }));
  }, [examsData]);

  return { universities, exams: transformedExams, isLoading: collegesLoading || examsLoading, error: collegesError || examsError };
};
