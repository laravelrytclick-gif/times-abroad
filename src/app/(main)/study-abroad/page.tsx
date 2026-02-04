'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Building, Calendar, Award, ArrowRight, GraduationCap, MapPin } from 'lucide-react'

interface College {
  _id: string
  name: string
  slug: string
  college_type: string
  country_ref: {
    _id: string
    name: string
    slug: string
    flag: string
  }
  establishment_year: string
  banner_url: string
  overview: {
    title: string
    description: string
  }
  key_highlights: {
    features: string[]
  }
  ranking: {
    country_ranking: string
  }
}

export default function StudyAbroadPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('all')

  useEffect(() => {
    fetchStudyAbroadColleges()
  }, [])

  const fetchStudyAbroadColleges = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/colleges?college_type=study_abroad&limit=20')
      const result = await response.json()

      if (result.success) {
        setColleges(result.data.colleges)
      }
    } catch (error) {
      console.error('Error fetching study abroad colleges:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = !searchTerm ||
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.overview?.description?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCountry = selectedCountry === 'all' ||
      college.country_ref?.slug === selectedCountry

    return matchesSearch && matchesCountry
  })

  const countries = [...new Set(colleges.map(college => college.country_ref?.name).filter(Boolean))]

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading study abroad colleges...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Banner */}
      <div className="relative h-screen max-h-[600px] overflow-hidden">
        <img
          src="/studyAbroad/image.png"
          alt="Study Abroad"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-center">
          {/* <div className="text-white max-w-2xl">
            <h1 className="text-6xl font-bold mb-6">
              Study <span className="text-blue-300">Abroad</span>
            </h1>
            <p className="text-xl mb-8 leading-relaxed">
              Pursue your degree at top international universities
            </p>
            <div className="flex items-center gap-6 mb-8">
              <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-xl">
                <p className="text-3xl font-bold">{filteredColleges.length}</p>
                <p className="text-sm">Colleges</p>
              </div>
              <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-xl">
                <p className="text-3xl font-bold">{countries.length}</p>
                <p className="text-sm">Countries</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-4 w-4" />
              <input
                placeholder="Search colleges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:bg-white"
              />
            </div>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:bg-white"
            >
              <option value="all">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>

            <button
              onClick={() => { setSearchTerm(''); setSelectedCountry('all') }}
              className="w-full px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 hover:bg-red-100 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Colleges Grid */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {filteredColleges.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No colleges found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college) => (
              <div key={college._id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                {/* College Image */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-t-xl overflow-hidden">
                  {college.banner_url ? (
                    <img
                      src={college.banner_url}
                      alt={college.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <GraduationCap className="w-16 h-16 text-blue-600" />
                    </div>
                  )}
                </div>

                {/* College Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{college.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{college.country_ref?.name}</span>
                        <span className="text-blue-600 font-medium">• {college.country_ref?.flag}</span>
                      </div>
                    </div>
                    <span className="bg-blue-100 whitespace-normal text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full inline-flex items-center text-center leading-tight max-w-[120px]">
                      Study Abroad
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {college.overview?.description || 'Quality international education with global opportunities.'}
                  </p>

                  {/* Key Highlights */}
                  {college.key_highlights?.features?.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {college.key_highlights.features.slice(0, 2).map((feature, index) => (
                          <span key={index} className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      <span>{college.establishment_year || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-blue-500" />
                      <span>{college.ranking?.country_ranking || 'Ranked'}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href={`/colleges/${college.slug}`}>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
