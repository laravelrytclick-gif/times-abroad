import Link from "next/link";
import {
  MapPin,
  Award,
  CircleDollarSign,
  Star,
  Users,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

type CollegeCardProps = {
  data: {
    _id: string;
    name: string;
    slug?: string;
    banner_url?: string;
    location?: string;
    rank?: string;
    tuition?: string;
    acceptance?: string;
    rating?: string;
    employability?: string;
    tags?: string[];
  };
};

export default function CollegeCard({ data }: CollegeCardProps) {
  const { openModal } = useFormModal();
  
  const getImageSrc = (image?: string) => {
    if (!image) return null;
    if (image.startsWith("http")) return image;
    if (image.startsWith("/")) return image;
    return `/uploads/colleges/${image}`;
  };

  const imageUrl = getImageSrc(data.banner_url) || 
    "https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=600";

  const slug = data.slug || data._id;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-200 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] hover:border-blue-400/50">
      
      {/* Top Image Section */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={imageUrl}
          alt={data.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {data.rank && (
            <span className="bg-white/90 backdrop-blur-md text-blue-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg shadow-sm border border-white">
              {data.rank}
            </span>
          )}
        </div>

        {data.tags?.includes("Scholarship") && (
          <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter shadow-lg">
            ✨ Scholarship Available
          </div>
        )}

        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-1.5 text-white/90">
            <MapPin size={14} className="text-blue-400" />
            <span className="text-xs font-medium drop-shadow-md">{data.location}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-lg font-extrabold text-slate-800 line-clamp-1 mb-3 group-hover:text-blue-600 transition-colors">
          {data.name}
        </h3>

        {/* Stats Grid - Using a cleaner layout */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
          <StatItem 
            icon={<CircleDollarSign size={16} />} 
            label="Tuition" 
            value={data.tuition} 
          />
          <StatItem 
            icon={<Award size={16} />} 
            label="Acceptance" 
            value={data.acceptance} 
          />
          <StatItem 
            icon={<Users size={16} />} 
            label="Employability" 
            value={data.employability} 
          />
          <StatItem 
            icon={<Star size={16} className="fill-amber-400 text-amber-400" />} 
            label="Rating" 
            value={data.rating} 
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex items-center gap-3">
          <Link
            href={`/colleges/${slug}`}
            className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 py-3 rounded-xl hover:bg-blue-100 transition-colors"
          >
            Details
          </Link>

          <button
            onClick={() => openModal()}
            className="flex-[1.5] inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-blue-600 py-3 rounded-xl shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:shadow-none transition-all"
          >
            Apply Now
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Sub-component for cleaner code
function StatItem({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 p-1.5 rounded-lg bg-slate-50 text-blue-500 group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-bold text-slate-700">{value}</p>
      </div>
    </div>
  );
}