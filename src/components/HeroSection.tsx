import React from "react";
import { ArrowRight, Play, ShieldAlert, Users, Flag, Handshake } from "lucide-react";
import RYJPLogo from "./RYJPLogo";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="hero" className="relative bg-white text-slate-800 pt-[110px] md:pt-[140px] pb-0 overflow-hidden font-sans">
      {/* Immersive Atmospheric Lighting & Crowds Backdrop mimicking the screenshot but light mode */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(10,46,109,0.05)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_90%,rgba(16,185,129,0.03)_0%,transparent_50%)] pointer-events-none" />
      
      {/* Real-time high-quality background pattern overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1600')`
        }}
      />
      
      {/* Symmetrical grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(10,46,109,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(10,46,109,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Hero Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 pb-16 md:pb-24">
        
        {/* Left Side Content - Bold, Left-aligned exactly as shown in screenshot but high contrast light theme */}
        <div className="w-full lg:w-1/2 text-left space-y-6">
          {/* Slogan Badge with left vertical orange line indicator */}
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-6 bg-[#ea580c] rounded-sm" />
            <span className="text-[11px] md:text-xs font-black tracking-[2px] text-[#0A2E6D] uppercase">
              A NEW POLITICAL FORCE. A NEW INDIA.
            </span>
          </div>

          {/* Main Huge Titles */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] uppercase">
            <span className="block text-[#0A2E6D]">
              VOICE OF TRUTH.
            </span>
            <span className="block text-[#ea580c]">
              POWER OF YOUTH.
            </span>
          </h2>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl font-semibold">
            We rise against fake narratives and propaganda. RYJP is the voice of India's youth, for a strong, united and developed Bharat.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={() => scrollToSection("join-us")}
              className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold px-8 py-3.5 rounded-lg text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-orange-500/20 active:scale-98 transition-all"
            >
              <span>JOIN THE MOVEMENT</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="bg-transparent hover:bg-slate-50 text-[#0A2E6D] border border-[#0A2E6D]/30 hover:border-[#0A2E6D] font-extrabold px-8 py-3.5 rounded-lg text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <span>OUR VISION</span>
              <Play className="w-3.5 h-3.5 text-[#0A2E6D] fill-[#0A2E6D]" />
            </button>
          </div>
        </div>

        {/* Right Side Visual Graphic Overlay - High-Fidelity campaign design "TRUTH OVER PROPAGANDA" */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          <div className="relative w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl bg-[#fcfbfa] p-7 md:p-9 flex flex-col justify-between font-sans">
            {/* Subtle background paper texture simulation */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#002_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/50 via-white to-slate-50/20 pointer-events-none" />
            
            {/* Saffron paint stroke decorative background brushing left-down */}
            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#ea580c]/10 blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#ea580c]/25 to-transparent rounded-bl-full pointer-events-none" />
            
            {/* Additional paint overlay accent in the bottom left */}
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#0A2E6D]/5 blur-3xl pointer-events-none" />

            {/* RYJP Brand Header */}
            <div className="relative z-10 flex items-center gap-3 text-left">
              <RYJPLogo className="w-16 h-16 shadow-md rounded-full bg-white/75 p-0.5 border border-slate-100" />
              <div className="flex flex-col select-none leading-none">
                <span className="text-[11px] font-black tracking-widest text-[#0A2E6D] uppercase">Rashtriya Yuva</span>
                <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mt-1">Jan Shakti Party</span>
              </div>
            </div>

            {/* Campaign Central Slogan Box */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center gap-1.5 py-4">
              
              {/* TRUTH Block */}
              <div className="relative transform -rotate-[1.5deg] px-8 py-2.5 bg-[#0A2E6D] text-white font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-widest rounded shadow-md uppercase select-none w-fit text-center leading-none">
                {/* Simulated paint stroke border edges */}
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#ea580c]/80" />
                <div className="absolute top-0 bottom-0 right-0 w-1 bg-[#ea580c]/80" />
                TRUTH
              </div>

              {/* OVER Block */}
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-[#ea580c] tracking-[0.15em] uppercase select-none my-1 font-sans text-center">
                OVER
              </div>

              {/* PROPAGANDA Block */}
              <div className="relative transform rotate-[1deg] px-7 py-3 bg-[#0A2E6D] text-white font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-[0.1em] rounded shadow-md uppercase select-none w-fit text-center leading-none">
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#ea580c]/90" />
                <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-[#ea580c]/90" />
                PROPAGANDA
              </div>

            </div>

            {/* Copy & Hashtag Section */}
            <div className="relative z-10 w-full text-center space-y-3 pt-2">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm md:text-base font-semibold text-slate-700 leading-relaxed">
                  We rise against fake narratives.
                </p>
                <p className="text-xs sm:text-sm md:text-base font-extrabold text-slate-800">
                  We stand for <span className="text-[#ea580c] font-black">Bharat.</span>
                </p>
              </div>

              <div className="text-[9px] sm:text-[10px] md:text-xs font-mono font-black text-[#0A2E6D] tracking-wider bg-slate-100 hover:bg-slate-200/80 transition-colors inline-block px-3.5 py-1 rounded-full uppercase cursor-default">
                #VoiceOfTruth
              </div>
            </div>

            {/* Saffron & Green Accent Lines at the very bottom border mimicking the Indian flag colors */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 flex">
              <div className="w-1/3 h-full bg-[#FF9933]" />
              <div className="w-1/3 h-full bg-white" />
              <div className="w-1/3 h-full bg-[#138808]" />
            </div>

          </div>
        </div>

      </div>

      {/* Royal Blue (#0A2E6D) Pillar Strip exactly styled like the screenshot banner */}
      <div className="bg-[#0A2E6D] border-y border-white/10 shadow-2xl py-6 relative z-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-white/10">
            
            {/* Pillar 1 */}
            <div className="flex items-center gap-4 py-3 sm:py-0 lg:px-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-orange-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-black uppercase tracking-wider text-white">TRUTH OVER PROPAGANDA</h4>
                <p className="text-[10px] text-orange-200 mt-0.5 leading-snug">Exposing fake news & narratives</p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-center gap-4 py-3 sm:py-0 lg:px-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-orange-400">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-black uppercase tracking-wider text-white">YOUTH EMPOWERMENT</h4>
                <p className="text-[10px] text-orange-200 mt-0.5 leading-snug">Building leaders of tomorrow</p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-center gap-4 py-3 sm:py-0 lg:px-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-orange-400">
                <Flag className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-black uppercase tracking-wider text-white">NATION FIRST</h4>
                <p className="text-[10px] text-orange-200 mt-0.5 leading-snug">Strong India, Strong Future</p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="flex items-center gap-4 py-3 sm:py-0 lg:px-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-orange-400">
                <Handshake className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-black uppercase tracking-wider text-white">PEOPLE POWERED</h4>
                <p className="text-[10px] text-orange-200 mt-0.5 leading-snug">By the youth, For the nation</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
