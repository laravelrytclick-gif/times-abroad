'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Globe, MapPin, GraduationCap, ArrowRight, X, AlertCircle, RefreshCw } from 'lucide-react'
import { useCountries } from '@/hooks/useCountries'

interface Country {
  _id: string
  name: string
  slug: string
  flag: string
  description: string
  is_active: boolean
}

export default function CountriesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // Use TanStack Query for countries data
  const { 
    data: countries = [], 
    isLoading, 
    error, 
    refetch 
  } = useCountries()

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries
    
    const searchLower = searchTerm.toLowerCase()
    return countries.filter(country => 
      country.name.toLowerCase().includes(searchLower) ||
      (country.description && country.description.toLowerCase().includes(searchLower))
    )
  }, [countries, searchTerm])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading countries...</p>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Countries</h2>
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
                Study <span className="font-semibold text-blue-700">Abroad</span>
              </h1>
              <p className="text-gray-700 text-sm font-medium">
                Explore {filteredCountries.length} countries for international education
              </p>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-xl text-white">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                <Globe size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xl font-light text-white">{filteredCountries.length}</p>
                <p className="text-xs text-white/80">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Search */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
            <input
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:bg-white"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Countries List */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {filteredCountries.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No countries found</h3>
            <p className="text-gray-700 text-sm font-medium">Try adjusting your search</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCountries.map((country) => (
              <div
                key={country._id}
                className="bg-white border border-blue-100 rounded-xl p-6 hover:shadow-md hover:border-blue-200 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Country Flag */}
                  <div className="w-full md:w-48 h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <div className="text-5xl">
                      {country.flag}
                    </div>
                  </div>

                  {/* Country Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{country.name}</h3>
                        <div className="flex items-center text-blue-700 text-sm font-medium mb-2">
                          <MapPin size={14} className="mr-1" />
                          Study Destination
                        </div>
                      </div>
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full">
                        Active
                      </span>
                    </div>

                    <p className="text-gray-700 text-sm line-clamp-2 mb-4 font-medium">
                      {country.description || 'Discover educational opportunities in this amazing country'}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
                      <div className="flex items-center gap-1 text-blue-700 font-medium">
                        <GraduationCap size={14} />
                        <span>Top Universities</span>
                      </div>
                      <div className="flex items-center gap-1 text-green-700 font-medium">
                        <Globe size={14} />
                        <span>Global Recognition</span>
                      </div>
                      <div className="flex items-center gap-1 text-purple-700 font-medium">
                        <MapPin size={14} />
                        <span>PR Opportunities</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Link href={`/countries/${country.slug}`}>
                        <button className="text-blue-700 hover:text-blue-800 font-semibold text-sm transition-colors flex items-center gap-1">
                          Explore Country
                          <span className="text-blue-600">→</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* End of results */}
        {filteredCountries.length > 0 && (
          <div className="text-center py-8 border-t border-blue-100 mt-8">
            <p className="text-gray-700 text-sm font-medium">
              Showing all {filteredCountries.length} countries
            </p>
          </div>
        )}
      </div>
    </div>
  )
}