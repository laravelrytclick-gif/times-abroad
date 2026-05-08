"use client";

import EducationTimesAdvantage from "@/app/Components/AdvantageCard";
import CtaSection from "@/app/Components/CtaSection";
import EducationStats from "@/app/Components/EducationStats";
import FAQ from "@/app/Components/FAQ";
import FeaturedSection from "@/app/Components/FeaturedExams";
import Hero from "@/app/Components/Hero";
import LatestBlogs from "@/app/Components/LatestBlogs";
import PopularCountries from "@/app/Components/PopularCountries";
import ProcessJourney from "@/app/Components/ProcessJourney";
import Services from "@/app/Components/Services";
import StudentTestimonials from "@/app/Components/StudentTestimonials";
import StudyPrograms from "@/app/Components/StudyPrograms";
import MbbsAbroad from "../Components/MbbsAbroad";
import MbbsAbroadPopup from "../Components/MbbsAbroadPopup";

const page = () => {
  return (
    <div className="w-full bg-white text-black overflow-x-hidden">
      <Hero />
      <MbbsAbroad />
      <FeaturedSection />
      <PopularCountries />
      <StudyPrograms />
      <EducationStats />
      <LatestBlogs />
      <Services />
      <EducationTimesAdvantage />
      <ProcessJourney />
      <StudentTestimonials />
      <FAQ />
      <CtaSection />
      <MbbsAbroadPopup />
    </div>
  );
};

export default page;