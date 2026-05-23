import React from "react";
import { motion } from "motion/react";
import { Sparkles, MessageSquare, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";

interface DemandItem {
  num: string;
  segments: { text: string; highlighted: boolean }[];
}

const DEMANDS: DemandItem[] = [
  {
    num: "01",
    segments: [
      { text: "We believe in ", highlighted: false },
      { text: "strengthening constitutional institutions", highlighted: true },
      { text: ", not ", highlighted: false },
      { text: "weakening public trust in them", highlighted: true },
      { text: ".", highlighted: false }
    ]
  },
  {
    num: "02",
    segments: [
      { text: "Democracy must be protected through ", highlighted: false },
      { text: "transparency, law, and responsible reforms", highlighted: true },
      { text: " — not through extreme accusations.", highlighted: false }
    ]
  },
  {
    num: "03",
    segments: [
      { text: "Women empowerment should focus on ", highlighted: false },
      { text: "education, leadership, safety, and equal opportunities", highlighted: true },
      { text: " for long-term national growth.", highlighted: false }
    ]
  },
  {
    num: "04",
    segments: [
      { text: "India needs ", highlighted: false },
      { text: "strong industries, free media, innovation, and employment generation", highlighted: true },
      { text: " to empower its youth.", highlighted: false }
    ]
  },
  {
    num: "05",
    segments: [
      { text: "Political reforms should remain ", highlighted: false },
      { text: "balanced, constitutional, and focused", highlighted: true },
      { text: " on stability and national development.", highlighted: false }
    ]
  }
];

export default function ManifestoSection() {
  const scrollToContact = () => {
    const el = document.getElementById("join-us");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="manifesto" className="py-24 bg-[#FAFAF9] border-t border-slate-200/60 text-slate-800 font-sans relative overflow-hidden">
      {/* Visual background decorations keeping the layout clean and modern */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0A2E6D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Subtle Category Tag */}
        <span className="text-[10px] md:text-[11px] uppercase tracking-[3px] font-mono font-black text-orange-600 block mb-2">
          THE FIVE DEMANDS
        </span>

        {/* Big Impactful Heading matching the style in the screenshot */}
        <h2 className="text-5xl md:text-7xl font-sans font-black tracking-tight text-[#0A2E6D] uppercase mb-4 leading-none select-none">
          The Manifesto<span className="text-[#ea580c]">.</span>
        </h2>

        {/* Subtitle verbatim from image */}
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mb-16 font-semibold font-mono leading-relaxed uppercase tracking-wider">
          Read it once. Read it twice. Then send it to someone who needs to read it.
        </p>

        {/* Divider line before list */}
        <div className="h-[2px] bg-[#0A2E6D]/15 w-full mb-4" />

        {/* Demands List */}
        <div className="space-y-2">
          {DEMANDS.map((demand, index) => (
            <motion.div
              key={demand.num}
              className="group relative flex flex-col md:flex-row items-start gap-6 md:gap-10 p-6 sm:p-8 rounded-2xl border border-transparent hover:border-orange-500/20 hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 ease-out text-left cursor-pointer overflow-hidden"
              whileHover={{ y: -3 }}
            >
              {/* Dynamic Thick Left Hover Bar Indicator inside card */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-transparent group-hover:bg-[#ea580c] transition-all duration-300 rounded-l-2xl" />

              {/* Big Serif Number */}
              <div className="flex-shrink-0">
                <span className="font-serif font-black text-5xl sm:text-6xl text-[#ea580c]/90 group-hover:text-[#ea580c] select-none transition-colors duration-200 tracking-tight leading-none block">
                  {demand.num}
                </span>
              </div>

              {/* Demand Text Description with dynamic orange underline styling */}
              <div className="flex-1 pt-1 md:pt-2">
                <p className="text-slate-700 font-semibold text-xs sm:text-sm leading-relaxed md:leading-loose">
                  {demand.segments.map((seg, sIdx) => {
                    if (seg.highlighted) {
                      return (
                        <span
                          key={sIdx}
                          className="relative inline-block text-[#0A2E6D] font-extrabold mx-0.5 border-b-2 border-orange-500/80 group-hover:border-orange-600 transition-colors"
                        >
                          {seg.text}
                        </span>
                      );
                    }
                    return <span key={sIdx} className="group-hover:text-slate-900 transition-colors">{seg.text}</span>;
                  })}
                </p>
              </div>

              {/* Interactive micro badge on hover */}
              <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] font-bold text-orange-600 font-mono tracking-widest uppercase flex items-center gap-1">
                <span>Spread truth</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider line after list */}
        <div className="h-[2px] bg-[#0A2E6D]/15 w-full mt-4 mb-12" />

        {/* Action Call for spreading manifesto */}
        <button
          onClick={scrollToContact}
          className="inline-flex items-center gap-2.5 bg-[#0A2E6D] hover:bg-[#082456] text-white font-black py-4 px-8 rounded-xl text-[10px] tracking-widest uppercase transition-all shadow-xl shadow-blue-500/10 cursor-pointer active:scale-95"
        >
          <ShieldCheck className="w-4 h-4 text-orange-500" />
          <span>I STAND WITH THE MANIFESTO</span>
        </button>

      </div>
    </section>
  );
}
