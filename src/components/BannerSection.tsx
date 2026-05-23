import React from "react";
import { ArrowRight } from "lucide-react";

export default function BannerSection() {
  const scrollToJoin = () => {
    const el = document.getElementById("join-us");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#0A2E6D] py-12 border-t border-white/10 font-sans relative overflow-hidden text-white">
      {/* Background container mimicking the image layout */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left Side: Silhouette of a young leader with double fists raised */}
        <div className="w-full lg:w-4/12 flex items-center justify-start relative h-36">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-44 h-44 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />
          
          {/* Custom Stylized Young leader raises arms silhouette graphic */}
          <div className="relative flex items-end justify-center w-full h-full text-white/40 opacity-95">
            <svg viewBox="0 0 100 100" className="w-40 h-28 fill-white drop-shadow-[0_10px_20px_rgba(234,88,12,0.3)]">
              {/* Leader silhouette */}
              <path d="M50 30 C55 30, 58 35, 58 40 C58 45, 55 48, 50 48 C45 48, 42 45, 42 40 C42 35, 45 30, 50 30 Z" className="fill-white" />
              {/* Torso & Arms */}
              <path d="M25 90 L30 70 L35 48 C36 45, 40 45, 40 48 L45 65 L50 63 L55 65 L60 48 C60 45, 64 45, 65 48 L70 70 L75 90 Z" className="fill-white" />
              {/* Left Fist */}
              <circle cx="34" cy="46" r="4.5" className="fill-white" />
              {/* Right Fist */}
              <circle cx="66" cy="46" r="4.5" className="fill-white" />
              <path d="M30 46 L34 46 M70 46 L66 46" stroke="#ea580c" strokeWidth="2" />
            </svg>
            {/* Stage flare lighting */}
            <div className="absolute bottom-1 w-24 h-5 bg-[#ea580c]/35 rounded-full blur-md" />
          </div>
        </div>

        {/* Center Side: Slogan details */}
        <div className="w-full lg:w-4/12 text-left space-y-2 lg:border-l lg:border-white/25 lg:pl-8">
          <span className="text-[#ea580c] font-mono text-[10px] tracking-widest font-black uppercase block">
            BE A PART OF CHANGE
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase tracking-tight">
            TOGETHER, WE CAN <br />
            <span className="text-orange-400">BUILD NEW INDIA.</span>
          </h3>
        </div>

        {/* Right Side: Descriptions and Call-To-Action buttons */}
        <div className="w-full lg:w-4/12 text-left space-y-4 lg:pl-4">
          <p className="text-orange-100 text-xs md:text-sm leading-relaxed font-semibold">
            Join thousands of young Indians who are standing up for truth, justice and the nation.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={scrollToJoin}
              className="bg-[#ea580c] hover:bg-orange-600 text-white font-black px-5 py-2.5 rounded-lg text-[10px] tracking-wider uppercase flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-xl shadow-orange-500/10"
            >
              <span>JOIN RYJP NOW</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
            <button
              onClick={scrollToJoin}
              className="bg-transparent hover:bg-white/10 border border-white/30 hover:border-white text-white font-black px-5 py-2.5 rounded-lg text-[10px] tracking-wider uppercase transition-all cursor-pointer active:scale-95"
            >
              BECOME A VOLUNTEER
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
