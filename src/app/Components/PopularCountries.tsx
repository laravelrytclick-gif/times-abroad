"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, GraduationCap, ChevronLeft, ChevronRight, ShieldCheck, Users, Star, Heart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const CountryCard = ({ country }: { country: any; index: number }) => (
  <Link href={`/countries/${country.slug}`} className="group block h-full">
    <div className="relative bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full overflow-hidden hover:-translate-y-2">
      
      {/* Top Section - Flag & Badge */}
      <div className="relative p-6 pb-0">
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform duration-500 relative z-10">
              {country.flag}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="bg-green-100 px-3 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck size={12} className="text-green-600" />
              <span className="text-[10px] font-bold text-green-700 uppercase">NMC</span>
            </div>
            <div className="bg-blue-100 px-3 py-1 rounded-full">
              <span className="text-[10px] font-bold text-blue-700 uppercase">
                {country.is_active ? 'Available' : 'Closed'}
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
          {country.name}
        </h3>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className={`${i < 4 ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-500">(4.8)</span>
        </div>
      </div>

      <div className="px-6 py-4 flex-grow">
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {country.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 p-3 rounded-xl text-center">
            < GraduationCap size={16} className="text-blue-600 mx-auto mb-1" />
            <p className="text-xs font-bold text-slate-700">MBBS</p>
          </div>
          <div className="bg-green-50 p-3 rounded-xl text-center">
            <Users size={16} className="text-green-600 mx-auto mb-1" />
            <p className="text-xs font-bold text-slate-700">Indian Food</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <MapPin size={12} className="text-slate-400" />
            <span className="text-slate-500 font-medium">Popular Destination</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={12} className="text-red-400" />
            <span className="text-slate-500 font-medium">500+ Students</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-4 border-t border-slate-100">
        <button className="w-full bg-blue-600 text-white py-3 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2">
          Explore MBBS Programs
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </Link>
);

const PopularCountries = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);
  
  // Define constants for slider math
  const SLIDER_GAP = 24; // This is the numerical value for gap-6

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) setCardsPerPage(3);
        else if (window.innerWidth >= 768) setCardsPerPage(2);
        else setCardsPerPage(1);
      }
    };
    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);
  
  const fetchCountries = async () => {
    const response = await fetch('/api/countries', { headers: { 'Content-Type': 'application/json' } });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    if (!result.success) throw new Error(result.message || 'Failed to fetch');
    return result.data.slice(0, 6);
  };
  
  const { data: countries = [], isLoading } = useQuery({
    queryKey: ['popular-countries'],
    queryFn: fetchCountries,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
  
  const fallbackCountries = [
    { name: 'Russia', flag: '🇷🇺', slug: 'russia', description: 'Top destination for MBBS with NMC approved universities.', is_active: true },
    { name: 'Bangladesh', flag: '🇧🇩', slug: 'bangladesh', description: 'Close to India with similar curriculum.', is_active: true },
    { name: 'Georgia', flag: '🇬🇪', slug: 'georgia', description: 'European standard medical education.', is_active: true },
    { name: 'Kazakhstan', flag: '🇰🇿', slug: 'kazakhstan', description: 'Affordable MBBS programs.', is_active: true },
    { name: 'Philippines', flag: '🇵🇭', slug: 'philippines', description: 'English-medium medical education.', is_active: true },
    { name: 'Ukraine', flag: '🇺🇦', slug: 'ukraine', description: 'Quality medical education.', is_active: true }
  ];

  const displayCountries = countries.length > 0 ? countries : fallbackCountries;
  const maxIndex = Math.max(0, displayCountries.length - cardsPerPage);

  const nextSlide = () => setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  const goToSlide = (index: number) => setCurrentIndex(Math.min(index, maxIndex));

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 bg-slate-50">
      <div className="relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span>🏥</span> MBBS Destinations
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-6">
            POPULAR <span className="text-blue-600">MBBS</span> DESTINATIONS
          </h2>
        </div>

        <div className="relative">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-[450px] rounded-3xl bg-white border border-slate-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="overflow-hidden px-1">
                <div 
                  className="flex transition-transform duration-500 ease-in-out gap-6"
                  style={{ 
                    transform: `translateX(calc(-${currentIndex * (100 / cardsPerPage)}% - ${currentIndex * (SLIDER_GAP / cardsPerPage)}px))` 
                  }}
                >
                  {displayCountries.map((country: any, index: number) => (
                    <div 
                      key={index} 
                      className="flex-shrink-0" 
                      style={{ width: `calc(${100 / cardsPerPage}% - ${(SLIDER_GAP * (cardsPerPage - 1)) / cardsPerPage}px)` }}
                    >
                      <CountryCard country={country} index={index} />
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-4 shadow-md border border-slate-200 hover:bg-blue-50 transition-all z-20">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-4 shadow-md border border-slate-200 hover:bg-blue-50 transition-all z-20">
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularCountries;