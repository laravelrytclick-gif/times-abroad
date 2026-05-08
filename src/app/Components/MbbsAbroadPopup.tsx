"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const MbbsAbroadPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 10 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 6000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    // Auto-hide after 10 seconds when popup is visible
    if (isVisible) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);

      return () => clearTimeout(hideTimer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      {/* Simple Popup with Only Image */}
      <div className="relative max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Close Button - Top Right Corner */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        >
          <X className="w-4 h-4 text-slate-700" />
        </button>

        {/* Banner Image Only */}
        <img
          src="/mbbsbanner.png"
          alt="MBBS Abroad"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default MbbsAbroadPopup;
