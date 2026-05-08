"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, GraduationCap, DollarSign, Users, Star, ArrowRight, Loader2, Bell, MessageCircle, X } from 'lucide-react';

interface College {
  _id: string;
  name: string;
  slug: string;
  college_type: string;
  country_ref: {
    _id: string;
    name: string;
    slug: string;
    flag: string;
  };
  establishment_year: string;
  banner_url: string;
  overview: {
    title: string;
    description: string;
  };
  key_highlights: {
    features: string[];
  };
  ranking: {
    country_ranking: string;
    world_ranking: string;
  };
  fees_structure?: {
    courses: [{
      course_name: string;
      duration: string;
      annual_tuition_fee: string;
    }];
  };
  fees?: number;
  duration?: string;
  legacy_ranking?: string;
}

const MbbsAbroad: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [displayedColleges, setDisplayedColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async (page: number = 1, append: boolean = false) => {
    try {
      if (!append) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await fetch(`/api/colleges?college_type=mbbs_abroad&page=${page}&limit=6`);
      const result = await response.json();

      if (result.success && result.data.colleges.length > 0) {
        const newColleges = result.data.colleges;
        
        if (append) {
          setColleges(prev => [...prev, ...newColleges]);
          setDisplayedColleges(prev => [...prev, ...newColleges]);
        } else {
          setColleges(newColleges);
          setDisplayedColleges(newColleges);
        }

        setHasMore(result.data.hasNext);
        setCurrentPage(page);
      } else {
        if (!append) {
          await fetchMBBSFallback();
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error fetching MBBS colleges:', error);
      if (!append) {
        await fetchMBBSFallback();
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const fetchMBBSFallback = async () => {
    try {
      const response = await fetch('/api/colleges');
      const result = await response.json();

      if (result.success) {
        const allColleges = result.data.colleges;
        const mbbsColleges = allColleges.filter((college: any) =>
          college.slug?.toLowerCase().includes('mbbs') ||
          college.name?.toLowerCase().includes('medical') ||
          college.name?.toLowerCase().includes('mbbs') ||
          college.college_type === 'mbbs_abroad'
        );

        setColleges(mbbsColleges);
        setDisplayedColleges(mbbsColleges.slice(0, 6));
        setHasMore(mbbsColleges.length > 6);
      }
    } catch (error) {
      console.error('Error in fallback fetch:', error);
    }
  };

  const loadMore = async () => {
    if (hasMore && !loadingMore) {
      const nextPage = currentPage + 1;
      await fetchColleges(nextPage, true);
    }
  };

  const getCollegeFees = (college: College): string => {
    if (college.fees_structure?.courses && college.fees_structure.courses.length > 0) {
      const course = college.fees_structure.courses[0];
      return course.annual_tuition_fee || `$${college.fees || 'N/A'}/year`;
    }
    return college.fees ? `$${college.fees}/year` : 'Contact for fees';
  };

  const getCollegeDuration = (college: College): string => {
    if (college.fees_structure?.courses && college.fees_structure.courses.length > 0) {
      const course = college.fees_structure.courses[0];
      return course.duration || college.duration || '5-6 Years';
    }
    return college.duration || '5-6 Years';
  };

  const getCollegeRanking = (college: College): string => {
    return college.ranking?.country_ranking || college.legacy_ranking || 'Ranked';
  };

  const isNMCApproved = (college: College): boolean => {
    return college.college_type === 'mbbs_abroad';
  };

  // Sticky UI Components (WhatsApp & Notifications)
  const StickyActions = () => (
    <div className="fixed bottom-6 right-6 z-60 flex flex-col gap-3">
      <a
        href="https://wa.me/919958565973"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 flex items-center justify-center"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      <button
        onClick={() => setShowPopup(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 flex items-center justify-center relative"
      >
        <Bell className="w-6 h-6" />
        {showPopup && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
        )}
      </button>
    </div>
  );

  // Popup Component
  const AdPopup = () => (
    showPopup && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 animate-fade-in">
        <div className="relative max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          >
            <X className="w-4 h-4 text-slate-700" />
          </button>
          <img
            src="/mbbsbanner.png"
            alt="MBBS Abroad"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    )
  );

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
        <StickyActions />
        <AdPopup />
      </>
    );
  }

  return (
    <>
      <StickyActions />
      
      <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Top MBBS Colleges <span className="text-blue-600">Abroad</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Discover NMC approved medical universities with affordable fees and world-class education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayedColleges.map((college) => (
              <div
                key={college._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  {college.banner_url ? (
                    <img
                      src={college.banner_url}
                      alt={college.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <GraduationCap className="w-16 h-16 text-blue-600" />
                    </div>
                  )}
                  {isNMCApproved(college) && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      NMC Approved
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{college.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={14} />
                        <span>{college.country_ref?.name}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-semibold">4.8</span>
                      </div>
                      <p className="text-xs text-slate-500">{getCollegeRanking(college)}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{college.overview?.description || 'Quality medical education with international standards.'}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-blue-600" />
                      <span className="text-sm font-medium text-slate-700">{getCollegeFees(college)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap size={16} className="text-blue-600" />
                      <span className="text-sm font-medium text-slate-700">{getCollegeDuration(college)}</span>
                    </div>
                  </div>

                  <Link href={`/colleges/${college.slug}`}>
                    <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      View Details
                      <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="text-center mb-8">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center gap-3 mx-auto disabled:opacity-50"
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Loading...
                  </>
                ) : (
                  <>
                    Load More Colleges
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/mbbs-abroad"
              className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-400/30 text-lg hover:-translate-y-1"
            >
              Explore All MBBS Colleges
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <AdPopup />
    </>
  );
};

export default MbbsAbroad;