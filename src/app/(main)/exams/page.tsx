'use client'

import React, { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { Search, Globe, Calendar, Building, Clock, FileText, ArrowRight, X, LayoutGrid, AlertCircle, RefreshCw, Award, Building2, ArrowUpRight } from 'lucide-react'
import FAQ from "@/app/Components/FAQ"
import { useExams } from '@/hooks/useExams'

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
  is_active: boolean
  display_order: number
}

export default function ExamsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedMode, setSelectedMode] = useState<string>('all')

  const { 
    data: exams = [], 
    isLoading, 
    error,
    refetch 
  } = useExams()

  const filteredExams = useMemo(() => {
    let filtered = exams

    if (selectedType !== 'all') {
      filtered = filtered.filter(exam => exam.exam_type === selectedType)
    }

    if (selectedMode !== 'all') {
      filtered = filtered.filter(exam => exam.exam_mode === selectedMode)
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(exam =>
        exam.name.toLowerCase().includes(searchLower) ||
        exam.short_name.toLowerCase().includes(searchLower) ||
        exam.conducting_body.toLowerCase().includes(searchLower)
      )
    }

    return filtered
  }, [exams, searchTerm, selectedType, selectedMode])

  const examTypes = useMemo(() => [...new Set(exams.map(exam => exam.exam_type))], [exams])
  const examModes = useMemo(() => [...new Set(exams.map(exam => exam.exam_mode))], [exams])

  const resetFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedType('all')
    setSelectedMode('all')
  }, [])

  // ExamCard Component
  const ExamCard = ({ name, short_name, exam_type, conducting_body, exam_mode, frequency, description, slug }: any) => (
    <Link href={`/exams/${slug}`} className="group block h-full">
      <div className="relative h-full bg-white rounded-xl border-2 border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(59,130,246,0.12)] hover:border-blue-400 transition-all duration-500 flex flex-col p-6 overflow-hidden hover:-translate-y-1">
        
        {/* Decorative Background Pattern */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/30 rounded-bl-full -mr-12 -mt-12 group-hover:bg-blue-100/50 transition-colors duration-500" />

        {/* Header Section */}
        <div className="flex items-start justify-between mb-4 relative">
          {/* Floating Icon */}
          <div className="relative">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-lg border border-slate-50 group-hover:scale-105 group-hover:rotate-2 transition-transform duration-500 relative z-10">
              <FileText size={24} />
            </div>
            <div className="absolute inset-0 bg-blue-200 blur-xl opacity-15 group-hover:opacity-30 transition-opacity" />
          </div>
          
          <div className="bg-blue-50 p-1.5 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
            <Award size={16} />
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="text-xl font-black text-slate-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors">
            {short_name || name}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>{exam_type}</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold mb-3">
            <Building2 size={12} className="text-blue-500" />
            <span className="uppercase">{conducting_body}</span>
          </div>

          <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>

          {/* Dynamic Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
              <Calendar size={12} className="text-blue-600" />
              <span className="text-[9px] font-black text-slate-600 uppercase">{exam_mode}</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
              <Clock size={12} className="text-blue-600" />
              <span className="text-[9px] font-black text-slate-600 uppercase">{frequency}</span>
            </div>
          </div>
        </div>

        {/* Modern Footer CTA */}
        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
          <span className="text-[9px] font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-wider">
            Exam Guide
          </span>
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-md">
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading exams...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Exams</h2>
          <p className="text-gray-500 mb-6 text-sm">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </p>
          <button 
            onClick={() => refetch()}
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Simple Header */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">
                Entrance <span className="font-semibold text-blue-700">Exams</span>
              </h1>
              <p className="text-gray-700 text-sm font-medium">
                Explore {filteredExams.length} global entrance examinations
              </p>
            </div>
            <div className="flex items-center gap-3 bg-blue-700 p-3 rounded-xl text-white">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xl font-light text-white">{filteredExams.length}</p>
                <p className="text-xs text-white/80">Exams</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Filters */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
              <input
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:bg-white"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:bg-white"
            >
              <option value="all">All Types</option>
              {examTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:bg-white"
            >
              <option value="all">All Modes</option>
              {examModes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <button
              onClick={resetFilters}
              className="w-full px-3 py-2 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg text-sm text-red-600 hover:text-red-700 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
            >
              <X size={14} />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Exams Grid */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {filteredExams.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LayoutGrid size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No exams found</h3>
            <p className="text-gray-700 text-sm font-medium">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map((exam) => (
              <ExamCard
                key={exam._id}
                name={exam.name}
                short_name={exam.short_name}
                exam_type={exam.exam_type}
                conducting_body={exam.conducting_body}
                exam_mode={exam.exam_mode}
                frequency={exam.frequency}
                description={exam.description}
                slug={exam.slug}
              />
            ))}
          </div>
        )}

        {/* End of results */}
        {filteredExams.length > 0 && (
          <div className="text-center py-8 border-t border-blue-100 mt-8">
            <p className="text-gray-700 text-sm font-medium">
              Showing all {filteredExams.length} exams
            </p>
          </div>
        )}
      </div>
      
      <FAQ />
    </div>
  )
}