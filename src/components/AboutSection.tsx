import React, { useState } from "react";
import { Info, ArrowRight, ShieldCheck, CheckCircle, Sparkles, X } from "lucide-react";
import RYJPLogo from "./RYJPLogo";

export default function AboutSection() {
  const [showManifesto, setShowManifesto] = useState(false);

  return (
    <section id="about" className="py-24 bg-white text-slate-900 overflow-hidden relative font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Descriptive text details in high-contrast light theme */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* About RYJP badge with vertical orange line */}
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-6 bg-[#ea580c] rounded-sm" />
              <span className="text-[11px] md:text-sm font-black tracking-[2px] text-orange-600 uppercase">
                ABOUT RYJP
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-[#0A2E6D] uppercase">
              A MOVEMENT.<br />
              <span className="text-slate-950">NOT JUST A PARTY.</span>
            </h2>

            <div className="space-y-4 text-slate-700 text-sm md:text-base leading-relaxed font-medium">
              <p>
                Rashtriya Yuva Jan Shakti Party (RYJP) is a youth-driven political commitment committed to building a new India based on truth, accountability, and national pride.
              </p>
              <p>
                We stand against fake news, hate politics, and divisive narratives. Our mission is simple – to be the voice of youth and the power behind a stronger Bharat.
              </p>
            </div>

            <div className="pt-3">
              <button
                onClick={() => setShowManifesto(true)}
                className="inline-flex items-center gap-2.5 bg-[#ea580c] hover:bg-[#c2410c] text-white font-black py-4 px-8 rounded-lg text-xs tracking-widest uppercase transition-all shadow-xl shadow-orange-500/15 cursor-pointer active:scale-95"
              >
                <span>KNOW MORE ABOUT US</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Campaign Poster exactly matching the Instagram source "THE POWER IS IN YOUTH. THE FUTURE IS OURS." */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            
            {/* The main Square Campaign Poster Container */}
            <div className="relative w-full max-w-[480px] aspect-square bg-[#051126] border-2 border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-row justify-between overflow-hidden group font-sans">
              
              {/* Subtle grid mesh background */}
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              
              {/* Creative Diagonal Laser Lines in Saffron Orange */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#ea580c]/60 stroke-[1.5] opacity-70" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Top right lines */}
                <line x1="82" y1="0" x2="100" y2="18" />
                <line x1="88" y1="0" x2="100" y2="12" />
                <line x1="76" y1="0" x2="100" y2="24" />
                {/* Bottom right lines */}
                <line x1="76" y1="100" x2="100" y2="24" className="stroke-[#ea580c]/10" />
                <line x1="80" y1="100" x2="100" y2="80" />
                <line x1="85" y1="100" x2="100" y2="85" />
                <line x1="90" y1="100" x2="100" y2="90" />
              </svg>

              {/* Elegant white bounding outline exactly mimicking high-end posters */}
              <div className="absolute inset-3 border border-slate-700/50 rounded-xl pointer-events-none z-0" />

              {/* Left hand information block (Logo, massive brand-slogan, hashtag) */}
              <div className="w-[48%] flex flex-col justify-between h-full relative z-10 text-left select-none pointer-events-none">
                
                {/* Brand Identifier (Top) */}
                <div className="space-y-1.5 pt-1 pl-1">
                  <div className="flex items-center gap-2">
                    <RYJPLogo className="w-11 h-11 bg-white/5 rounded-full p-0.5 border border-slate-800" />
                    <span className="text-xl font-black tracking-tight text-white font-sans">R<span className="text-[#ea580c]">Y</span>JP</span>
                  </div>
                  <div className="leading-[1.1] pl-0.5">
                    <p className="text-[8px] font-black tracking-widest text-[#ea580c] uppercase">Rashtriya Yuva</p>
                    <p className="text-[8px] font-bold tracking-widest text-slate-400 uppercase">Jan Shakti Party</p>
                  </div>
                </div>

                {/* Left Central Campaign Slogan */}
                <div className="flex flex-col text-left py-4 pl-1">
                  <div className="text-[28px] sm:text-[34px] font-black text-white tracking-tight uppercase leading-[1.05]">
                    THE POWER
                  </div>
                  <div className="text-[28px] sm:text-[34px] font-black text-[#ea580c] tracking-tight uppercase leading-[1.05]">
                    IS IN YOUTH.
                  </div>
                  <div className="text-[28px] sm:text-[34px] font-black text-white tracking-tight uppercase leading-[1.05] mt-1">
                    THE FUTURE
                  </div>
                  <div className="text-[28px] sm:text-[34px] font-black text-[#ea580c] tracking-tight uppercase leading-[1.05]">
                    IS OURS.
                  </div>
                </div>

                {/* Bottom Left Hash */}
                <div className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 tracking-wider pl-1.5 pb-1">
                  #PowerOfYouth
                </div>

              </div>

              {/* Right hand Typographic Indian Map Block */}
              <div className="w-[52%] h-full flex items-center justify-center relative select-none pointer-events-none">
                
                {/* Simplified vector path outline of the India Map */}
                <svg viewBox="0 0 450 500" className="absolute inset-0 w-full h-full opacity-20 stroke-[#ea580c]/60 stroke-[1.25]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 220 40 
                           L 245 45 L 260 55 L 255 75 L 265 85 L 280 80 L 290 88 L 305 75 L 320 85 L 325 100 L 315 110 L 320 120 L 300 140 
                           L 305 160 L 315 165 L 310 175 L 295 178 L 290 190 L 300 205 L 315 200 L 325 185 L 340 195 L 350 205 L 360 200 
                           L 368 215 L 380 220 L 385 235 L 375 240 L 370 250 L 385 255 L 395 248 L 405 252 L 415 245 L 420 255 L 410 268 
                           L 395 265 L 380 275 L 370 270 L 365 285 L 355 280 L 345 295 L 330 290 L 320 300 L 325 315 L 315 320 L 310 310 
                           L 295 312 L 290 325 L 275 320 L 270 330 L 275 345 L 285 360 L 290 380 L 275 390 L 260 415 L 250 435 L 245 455 
                           L 235 470 L 230 485 L 225 475 L 220 455 L 210 435 L 205 415 L 200 390 L 195 380 L 192 360 L 180 350 L 175 340 
                           L 170 320 L 165 300 L 160 290 L 145 295 L 140 280 L 125 275 L 115 285 L 100 270 L 90 285 L 85 245 L 95 240 L 105 250 
                           L 115 235 L 130 230 L 140 245 L 145 240 L 150 225 L 165 220 L 175 230 L 185 215 L 170 200 L 180 185 L 195 190 
                           L 200 175 L 195 160 L 200 145 L 190 135 L 198 120 L 210 115 L 215 95 L 210 85 L 212 65 Z" 
                  />
                </svg>

                {/* Staggered Typographic word cloud structured to follow India Map outline */}
                <div className="flex flex-col items-center justify-center text-center space-y-0.5 sm:space-y-1 w-full pl-2 mt-4 z-10 select-none">
                  
                  {/* Top: Kashmir region (Smaller, tightly-spaced point terms) */}
                  <div className="text-[7px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-[0.25em] pl-1 select-none">
                    DREAM
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1 select-none">
                    BELIEVE
                  </div>

                  {/* Upper Plateau: Northern states */}
                  <div className="text-sm sm:text-base md:text-lg font-black text-white tracking-[0.16em] uppercase select-none font-sans leading-none">
                    DREAM
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl font-black text-[#ea580c] tracking-widest uppercase select-none leading-none">
                    BELIEVE
                  </div>

                  {/* Central Plateau: India wide */}
                  <div className="flex items-center justify-center gap-1.5 py-0.5 select-none text-center">
                    <span className="text-xs sm:text-sm md:text-base font-black text-white tracking-[0.12em] uppercase leading-none">LEAD</span>
                    <div className="flex flex-col leading-[0.8] text-[6px] sm:text-[8px] font-bold text-slate-500 tracking-wider text-left pl-0.5 opacity-80 uppercase select-none">
                      <span>INNOVATE</span>
                      <span>INNOVATE</span>
                    </div>
                  </div>

                  <div className="text-sm sm:text-base md:text-lg font-black text-slate-300 tracking-[0.15em] uppercase select-none leading-none">
                    INNOVATE
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-black text-white tracking-[0.18em] uppercase select-none leading-none">
                    ACHIEVE
                  </div>

                  {/* Southern Wider Belt: Central/Southern states */}
                  <div className="text-lg sm:text-xl md:text-2xl font-black text-[#ea580c] tracking-widest uppercase select-none leading-none py-0.5">
                    BUILD
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-400 tracking-[0.12em] uppercase select-none leading-none">
                    RESPECT
                  </div>

                  {/* Peninsula: Narrowing downwards to Kanyakumari point */}
                  <div className="text-[10px] sm:text-xs font-black text-slate-300 tracking-[0.18em] uppercase select-none leading-none">
                    DISCIPLINE
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-black text-slate-500 tracking-[0.15em] uppercase select-none leading-none">
                    SERVE
                  </div>
                  <div className="text-[7px] sm:text-[8px] font-semibold text-slate-600 tracking-[0.25em] uppercase select-none leading-none mt-0.5 pl-0.5">
                    INSPIRE
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Manifesto modal overlay */}
      {showManifesto && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white text-slate-900 border border-slate-200 rounded-2xl w-full max-w-2xl p-6 md:p-8 relative shadow-2xl text-left overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowManifesto(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-950"
              aria-label="Close manifesto"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-black text-slate-950 flex items-center gap-2 mb-4 uppercase tracking-tight">
              <ShieldCheck className="w-6 h-6 text-orange-600" /> RYJP Executive Manifesto
            </h3>
            
            <p className="text-slate-700 text-xs leading-relaxed mb-6 font-medium">
              Our core objective is to bypass empty rhetoric and deliver tangible developmental metrics for Indian youth. Here are the four executive pillars of our active directives:
            </p>

            <div className="space-y-4">
              {[
                { title: "Direct Policy Auditing", info: "Establish neural fact-checking blocks (the AI Truth Engine) to screen clickbait or fake social media forwards that harm national security or student stability." },
                { title: "Socio-Economic Skill Labs", info: "Introduce structural coding, circular tech-economy, and global export labs straight into state colleges, creating instant employability pipelines." },
                { title: "Nation-First Border Guards", info: "Incorporate specialized cyber-guards and physical community networks to strengthen youth alert index, maintaining robust border security." },
                { title: "Decentralized Action Unions", info: "Equip local regional coordinators with official tech portals to directly track issues, reporting resolutions to governing bodies weekly." }
              ].map((mItem, mIdx) => (
                <div key={mIdx} className="bg-slate-50 p-4 border border-slate-200 rounded-xl">
                  <h4 className="text-sm font-bold text-orange-600 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" /> {mItem.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{mItem.info}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setShowManifesto(false)}
                className="bg-[#0A2E6D] hover:bg-[#082456] text-white font-extrabold py-3 px-8 rounded-lg text-xs tracking-wider uppercase"
              >
                Close Manifesto
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
