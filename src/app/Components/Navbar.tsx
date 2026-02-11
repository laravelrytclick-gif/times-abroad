"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Menu, X, Phone, Mail, MapPin, ChevronDown, ChevronRight,
  AlertCircle, RefreshCw, Sparkles, ArrowUpRight, GraduationCap, Building2, Search
} from "lucide-react";
import { usePathname } from "next/navigation";
import { SITE_IDENTITY } from "@/site-identity";
import { useContactInfo } from "@/hooks/useContactInfo";
import { useFormModal } from "@/context/FormModalContext";
import { useDropdownData } from "@/hooks/useDropdownData";
import { useCountryColleges } from "@/hooks/useCountryColleges";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Click based states for fetching
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCollegeType, setSelectedCollegeType] = useState<'study-abroad' | 'mbbs-abroad'>('study-abroad');

  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const [expandedMobileCountry, setExpandedMobileCountry] = useState<string | null>(null);

  const { emails, phones, address } = useContactInfo();
  const pathname = usePathname();
  const { openModal } = useFormModal();
  const { colleges, exams, countries, loading, error } = useDropdownData();

  // Fetching triggers only when selectedCountry changes via click
  const { data: countryColleges = [], isLoading: loadingColleges } = useCountryColleges(selectedCountry);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredColleges = useMemo(() => {
    console.log('🔍 [Navbar] Filtering colleges for type:', selectedCollegeType);
    console.log('🔍 [Navbar] Total colleges available:', colleges.length);
    console.log('🔍 [Navbar] Colleges with college_type:', colleges.filter(c => c.college_type).length);

    let baseColleges = [];
    
    if (selectedCollegeType === 'mbbs-abroad') {
      // First try to filter by college_type, then fallback to name/slug matching
      let mbbsColleges = colleges.filter(c => c.college_type === 'mbbs_abroad');

      // If no colleges with college_type, fallback to name/slug matching
      if (mbbsColleges.length === 0) {
        console.log('🔍 [Navbar] No colleges with college_type, using fallback matching');
        mbbsColleges = colleges.filter(c =>
          c.slug.toLowerCase().includes('mbbs') ||
          c.name.toLowerCase().includes('medical') ||
          c.name.toLowerCase().includes('mbbs')
        );
      }

      console.log('🔍 [Navbar] MBBS colleges found:', mbbsColleges.length);
      baseColleges = mbbsColleges;
    } else {
      // For study-abroad, get all non-MBBS colleges
      let studyAbroadColleges = colleges.filter(c => c.college_type === 'study_abroad');

      // If no colleges with college_type, use all colleges except MBBS ones
      if (studyAbroadColleges.length === 0) {
        console.log('🔍 [Navbar] No colleges with college_type, using fallback logic');
        const mbbsNames = colleges.filter(c =>
          c.slug.toLowerCase().includes('mbbs') ||
          c.name.toLowerCase().includes('medical') ||
          c.name.toLowerCase().includes('mbbs')
        );
        studyAbroadColleges = colleges.filter(c => !mbbsNames.includes(c));
      }

      console.log('🔍 [Navbar] Study abroad colleges found:', studyAbroadColleges.length);
      baseColleges = studyAbroadColleges;
    }

    // Apply search filter if search term exists
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      const filtered = baseColleges.filter(college =>
        college.name.toLowerCase().includes(searchLower) ||
        (college as any).overview?.description?.toLowerCase().includes(searchLower) ||
        college.slug?.toLowerCase().includes(searchLower)
      );
      console.log('🔍 [Navbar] Search term:', searchTerm, 'Filtered results:', filtered.length);
      return filtered;
    }

    return baseColleges;
  }, [colleges, selectedCollegeType, searchTerm]);

  // Filter country colleges based on search term
  const filteredCountryColleges = useMemo(() => {
    if (!searchTerm.trim()) {
      return countryColleges;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = countryColleges.filter((college: any) =>
      college.name.toLowerCase().includes(searchLower) ||
      (college as any).overview?.description?.toLowerCase().includes(searchLower) ||
      college.slug?.toLowerCase().includes(searchLower)
    );
    console.log('🔍 [Navbar] Country search term:', searchTerm, 'Filtered results:', filtered.length);
    return filtered;
  }, [countryColleges, searchTerm]);

  const navItems = [
    { name: "Scopes & Avenues", href: "/", hasDropdown: true },
    { name: "Colleges", href: "/colleges", hasDropdown: true },
    { name: "Exams", href: "/exams", hasDropdown: true },
    { name: "Countries", href: "/countries", hasDropdown: true },
    { name: "Blog", href: "/blogs" },
    { name: "About", href: "/about" },
  ];

  const dropdownContent = {
    "Scopes & Avenues": [
      { title: "Study Abroad", href: "/study-abroad" },
      { title: "MBBS Abroad", href: "/mbbs-abroad" }
    ],
    Colleges: [
      { title: "Study Abroad", slug: "study-abroad", icon: <GraduationCap size={18} /> },
      { title: "MBBS Abroad", slug: "mbbs-abroad", icon: <Building2 size={18} /> }
    ],
    Exams: exams.map(e => ({ title: e.short_name, href: `/exams/${e.slug}` })),
    Countries: countries.map(c => ({
      title: `Study in ${c.name}`,
      href: `/countries/${c.slug}`,
      flag: c.flag,
      slug: c.slug
    })),
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/98 backdrop-blur-lg shadow-xl" : "bg-white/90 backdrop-blur-sm shadow-sm"}`}>

      {/* TOP CONTACT BAR */}
      <div className="hidden bg-blue-900 text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2.5 text-[13px]">
          <div className="flex items-center gap-8">
            <a href={`tel:${phones.primaryRaw}`} className="flex items-center gap-2 hover:text-blue-400 transition-colors"><Phone size={14} /><span>{phones.primary}</span></a>
            <a href={`mailto:${emails.info}`} className="flex items-center gap-2 hover:text-blue-400 transition-colors"><Mail size={14} /><span>{emails.info}</span></a>
          </div>
          <div className="flex items-center gap-2 text-slate-300"><MapPin size={14} /><span>{address.office}</span></div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <div className="border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex-shrink-0">
              <img src={SITE_IDENTITY.assets.logo.main} alt="Logo" className="h-30 w-auto" />
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative py-6"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link href={item.href} className={`px-4 py-2.5 text-[15px] font-bold rounded-xl flex items-center gap-1.5 transition-all ${isActive(item.href) ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"}`}>
                    {item.name}
                    {item.hasDropdown && <ChevronDown size={14} className={`transition-transform ${hoveredItem === item.name ? 'rotate-180' : ''}`} />}
                  </Link>

                  {item.hasDropdown && hoveredItem === item.name && (
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-slate-100 py-0 z-[60] overflow-hidden ${(item.name === 'Countries' || item.name === 'Colleges') ? 'w-[45rem]' : 'w-64'
                      }`}>

                      {(item.name === 'Countries' || item.name === 'Colleges') ? (
                        <div className="flex h-[480px]">
                          {/* LEFT COLUMN - CLICK BASED SELECTION */}
                          <div className="w-5/12 border-r border-slate-100 bg-slate-50/50 p-4 overflow-y-auto custom-scrollbar">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-3 mb-4 mt-1">Select Category</p>
                            {dropdownContent[item.name as keyof typeof dropdownContent].map((dropdownItem: any) => (
                              <button
                                key={dropdownItem.title}
                                onClick={() => {
                                  if (item.name === 'Countries') setSelectedCountry(dropdownItem.slug);
                                  if (item.name === 'Colleges') setSelectedCollegeType(dropdownItem.slug);
                                }}
                                className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-[14px] font-bold transition-all mb-2 ${(selectedCountry === dropdownItem.slug || selectedCollegeType === dropdownItem.slug)
                                  ? 'bg-white shadow-lg text-blue-600 border-l-4 border-l-blue-600 scale-[1.02]'
                                  : 'text-slate-600 hover:bg-white/60 hover:text-blue-500'
                                  }`}
                              >
                                <span className="flex items-center gap-3">
                                  {dropdownItem.flag ? <span className="text-xl">{dropdownItem.flag}</span> : <span className="text-blue-500">{dropdownItem.icon}</span>}
                                  {dropdownItem.title}
                                </span>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${(selectedCountry === dropdownItem.slug || selectedCollegeType === dropdownItem.slug) ? 'bg-blue-50 text-blue-600' : 'text-slate-300'
                                  }`}>
                                  <ChevronRight size={14} />
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* RIGHT COLUMN - DATA LOADS HERE */}
                          <div className="w-7/12 bg-white flex flex-col">
                            <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-10">
                              <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Sparkles size={14} className="text-blue-500" />
                                {item.name === 'Colleges' ? `${selectedCollegeType.replace('-', ' ')}` : 'Universities List'}
                              </span>
                              {(selectedCountry || item.name === 'Colleges') && (
                                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold">LIVE DATA</span>
                              )}
                            </div>

                            {/* Search Input - MOVED TO RIGHT */}
                            <div className="relative mb-4">
                              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                              <input
                                type="text"
                                placeholder="Search colleges..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:bg-white"
                              />
                            </div>

                            <div className="flex-grow overflow-y-auto custom-scrollbar p-4 bg-slate-50/20">
                              {/* Show Placeholder if no country selected yet for Countries Tab */}
                              {item.name === 'Countries' && !selectedCountry ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                                    <MapPin size={32} className="animate-bounce" />
                                  </div>
                                  <p className="text-sm font-bold text-slate-600">Please click on a country <br /> to view available universities.</p>
                                </div>
                              ) : (loading || loadingColleges) ? (
                                <div className="h-full flex flex-col items-center justify-center gap-3">
                                  <RefreshCw size={24} className="animate-spin text-blue-600" />
                                  <span className="text-[10px] font-black text-slate-400 uppercase">Fetching latest list...</span>
                                </div>
                              ) : (
                                <div className="grid grid-cols-1 gap-2">
                                  {(item.name === 'Colleges' ? filteredColleges : filteredCountryColleges).map((college: any) => (
                                    <Link key={college._id} href={`/colleges/${college.slug}`} className="group flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
                                      <div className="mt-1 w-2 h-2 rounded-full bg-blue-100 group-hover:bg-blue-500 transition-colors" />
                                      <span className="text-[13px] font-bold text-slate-700 group-hover:text-blue-600 uppercase leading-snug">{college.name}</span>
                                    </Link>
                                  ))}
                                  {item.name === 'Countries' && filteredCountryColleges.length === 0 && !loadingColleges && (
                                    <div className="py-12 text-center text-slate-400 text-xs font-bold uppercase">No Universities Found</div>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="p-5 border-t border-slate-100 bg-white">
                              <Link href={item.name === 'Colleges' ? "/colleges" : `/countries/${selectedCountry}`} className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-blue-600 transition-all">
                                Explore Full Directory <ArrowUpRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Standard Dropdown */
                        <div className="p-3 space-y-1">
                          {dropdownContent[item.name as keyof typeof dropdownContent].map((dropdownItem: any) => (
                            <Link key={dropdownItem.title} href={dropdownItem.href} className="flex items-center px-4 py-3.5 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
                              {dropdownItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button onClick={openModal} className="hidden lg:block px-7 py-3 text-[13px] font-black text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 uppercase tracking-wider">
                Get Free Guide
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-700">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden bg-white transition-all duration-300 ${isOpen ? "max-h-screen opacity-100 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-6 py-6 space-y-2">
          {navItems.map((item) => (
            <div key={item.name} className="border-b border-slate-50 last:border-0">
              <button
                onClick={() => setExpandedMobileItem(expandedMobileItem === item.name ? null : item.name)}
                className="w-full py-4 flex items-center justify-between text-[16px] font-bold text-slate-800"
              >
                <span>{item.name}</span>
                {item.hasDropdown && <ChevronDown size={18} className={expandedMobileItem === item.name ? 'rotate-180' : ''} />}
              </button>
              {expandedMobileItem === item.name && item.hasDropdown && (
  <div className="bg-slate-50 rounded-xl p-3 mb-4 space-y-2">

    {/* 🔥 COLLEGES */}
    {item.name === "Colleges" ? (
      <>
        {/* Toggle */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setSelectedCollegeType("study-abroad")}
            className={`flex-1 py-2 rounded-lg text-sm font-bold ${
              selectedCollegeType === "study-abroad"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700"
            }`}
          >
            Study Abroad
          </button>

          <button
            onClick={() => setSelectedCollegeType("mbbs-abroad")}
            className={`flex-1 py-2 rounded-lg text-sm font-bold ${
              selectedCollegeType === "mbbs-abroad"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700"
            }`}
          >
            MBBS Abroad
          </button>
        </div>

        {/* Colleges List */}
        <div className="max-h-64 overflow-y-auto space-y-1">
          {filteredColleges.map((college: any) => (
            <Link
              key={college._id}
              href={`/colleges/${college.slug}`}
              onClick={() => {
                setIsOpen(false);
                setSearchTerm(''); // Clear search after clicking a college
              }}
              className="block px-4 py-3 text-sm font-bold bg-white rounded-lg hover:text-blue-600"
            >
              {college.name}
            </Link>
          ))}
          {item.name === 'Colleges' && filteredColleges.length === 0 && searchTerm && (
            <div className="py-8 text-center text-slate-400 text-xs font-bold uppercase">No colleges found for "{searchTerm}"</div>
          )}
          {item.name === 'Colleges' && filteredColleges.length === 0 && !searchTerm && (
            <div className="py-8 text-center text-slate-400 text-xs font-bold uppercase">No Colleges Found</div>
          )}
        </div>
      </>
    ) : item.name === "Countries" ? (
      <>
        {/* 🌍 COUNTRIES LIST */}
        {!selectedCountry && (
          <div className="space-y-1">
            {countries.map((country: any) => (
              <button
                key={country.slug}
                onClick={() => setSelectedCountry(country.slug)}
                className="w-full text-left px-4 py-3 bg-white rounded-lg text-sm font-bold hover:text-blue-600"
              >
                {country.flag} Study in {country.name}
              </button>
            ))}
          </div>
        )}

        {/* 🏫 COUNTRY COLLEGES */}
        {selectedCountry && (
          <>
            <button
              onClick={() => setSelectedCountry(null)}
              className="text-xs font-black uppercase text-blue-600 mb-2"
            >
              ← Back to Countries
            </button>

            <div className="max-h-64 overflow-y-auto space-y-1">
              {loadingColleges ? (
                <p className="text-center text-xs text-slate-400 py-6">
                  Loading Colleges...
                </p>
              ) : countryColleges.length > 0 ? (
                countryColleges.map((college: any) => (
                  <Link
                    key={college._id}
                    href={`/colleges/${college.slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      setSearchTerm(''); // Clear search after clicking a college
                    }}
                    className="block px-4 py-3 text-sm font-bold bg-white rounded-lg hover:text-blue-600"
                  >
                    {college.name}
                  </Link>
                ))
              ) : (
                <p className="text-center text-xs text-slate-400 py-6">
                  No Colleges Found
                </p>
              )}
            </div>
          </>
        )}
      </>
    ) : (
      /* 🌐 OTHER DROPDOWNS */
      dropdownContent[item.name as keyof typeof dropdownContent].map((sub: any) => (
        <Link
          key={sub.title}
          href={sub.href || "#"}
          onClick={() => setIsOpen(false)}
          className="block px-4 py-3 text-sm font-bold text-slate-600 hover:text-blue-600"
        >
          {sub.title}
        </Link>
      ))
    )}
  </div>
)}


            </div>
          ))}
          <button onClick={() => { openModal(); setIsOpen(false); }} className="w-full py-4 bg-blue-600 text-white font-black rounded-xl shadow-lg mt-6 uppercase tracking-widest">
            Book Consultation
          </button>
        </div>
      </div>
    </header>
  );
}