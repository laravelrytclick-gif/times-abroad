"use client";

import { useEffect, useRef, useState } from "react";

const countries = [
  "India",
  "Russia", 
  "China",
  "Philippines",
  "Ukraine",
  "Bangladesh",
  "Kazakhstan",
  "Nepal",
  "Georgia",
  "Armenia",
  "Kyrgyzstan",
  "Belarus"
];

export default function MbbsMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-linear-to-r from-blue-900 via-blue-800 to-blue-900 text-white z-50 shadow-2xl border-t-2 border-yellow-400">
      <div className="overflow-hidden py-3">
        <div 
          ref={marqueeRef}
          className={`flex whitespace-nowrap ${isPaused ? '' : 'animate-marquee'}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* First set of items */}
          {countries.map((country, index) => (
            <div
              key={`first-${index}`}
              className="inline-flex items-center px-6 mx-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-lg font-bold text-yellow-300">
                MBBS in {country}
              </div>
            </div>
          ))}
          
          {/* Duplicate set for seamless infinite scroll */}
          {countries.map((country, index) => (
            <div
              key={`second-${index}`}
              className="inline-flex items-center px-6 mx-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-lg font-bold text-yellow-300">
                MBBS in {country}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
