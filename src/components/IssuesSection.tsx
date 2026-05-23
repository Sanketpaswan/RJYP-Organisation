import React, { useState } from "react";
import { GraduationCap, Briefcase, ShieldAlert, BookOpen, Leaf, ArrowRight, HelpCircle, AlertCircle, X, Sparkles } from "lucide-react";
import { IssueItem } from "../types";

const KEY_ISSUES: IssueItem[] = [
  {
    id: "edu",
    title: "Education",
    icon: "GraduationCap",
    description: "Quality education for every youth. Skill, research and innovation for a new India.",
    detailedPoints: [
      "Modernize 10,000+ government schools with computational skill labs.",
      "Integrate mandatory internships during the final year of degree courses.",
      "Introduce circular tech training labs directly inside tier-2 and tier-3 colleges."
    ]
  },
  {
    id: "emp",
    title: "Employment",
    icon: "Briefcase",
    description: "More opportunities, startups, and support for entrepreneurs & job creators.",
    detailedPoints: [
      "Launch a 'Zero-Tax Incubator' campaign for student-led startups under 30.",
      "Set up state industrial youth corridors with 50 lakh active placement pipelines.",
      "Offer low-interest collateral-free entrepreneurship micro-credit grants."
    ]
  },
  {
    id: "sec",
    title: "National Security",
    icon: "ShieldAlert",
    description: "Strong borders, zero tolerance on terrorism, and a safe nation for all.",
    detailedPoints: [
      "Incorporate national Cyber Defence Guard recruitment channels.",
      "Establish youth volunteer disaster support cells across all state borders.",
      "Launch drone monitoring labs operated by tech students to assist police forces."
    ]
  },
  {
    id: "fkn",
    title: "Fake News & Narratives",
    icon: "Megaphone",
    description: "Exposing propaganda, spreading awareness, promoting truth and facts.",
    detailedPoints: [
      "Launch 25 state 'Truth Verification Centers' operated by neural checks.",
      "Educate students against WhatsApp forward scams through structural awareness camps.",
      "Implement strong legal guidelines against deliberate paid narrative bot farms."
    ]
  },
  {
    id: "env",
    title: "Environment",
    icon: "Leaf",
    description: "Sustainable development, cleaner future and green growth for next generations.",
    detailedPoints: [
      "Host 'Clean Bharat Hackathons' to plant native forestry across urban hotspots.",
      "Promote micro-solar grids through youth cooperative models.",
      "Audit municipal garbage recycling standards using volunteer indicators."
    ]
  }
];

export default function IssuesSection() {
  const [selectedIssue, setSelectedIssue] = useState<IssueItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5 text-[#0A2E6D]" />;
      case "Briefcase":
        return <Briefcase className="w-5 h-5 text-[#0A2E6D]" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-5 h-5 text-[#0A2E6D]" />;
      case "Megaphone":
        return <BookOpen className="w-5 h-5 text-[#0A2E6D]" />;
      case "Leaf":
      default:
        return <Leaf className="w-5 h-5 text-[#0A2E6D]" />;
    }
  };

  return (
    <section id="issues" className="py-24 bg-white text-slate-800 border-t border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header section with badge matching exact alignment */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="text-left">
            <span className="text-orange-600 font-mono text-[11px] tracking-widest uppercase font-extrabold block mb-2">
              OUR KEY FOCUS AREAS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0A2E6D] uppercase">
              Issues That Matter
            </h2>
          </div>
          <button
            onClick={() => setSelectedIssue(KEY_ISSUES[0])}
            className="self-start md:self-auto text-[10px] font-black text-slate-650 hover:text-[#0A2E6D] transition-colors uppercase tracking-widest border border-slate-200 hover:border-slate-300 px-5 py-2.5 rounded-lg cursor-pointer flex items-center gap-1 bg-slate-50"
          >
            <span>VIEW ALL ISSUES</span>
            <ArrowRight className="w-3 h-3 text-[#ea580c]" />
          </button>
        </div>

        {/* 5 columns responsive row matching blueprint layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {KEY_ISSUES.map((issue) => (
            <div
              key={issue.id}
              onClick={() => setSelectedIssue(issue)}
              className="bg-slate-50 hover:bg-white hover:shadow-xl border border-slate-200/50 hover:border-slate-200 rounded-xl p-5 transition-all group cursor-pointer flex flex-col justify-between h-[280px] text-left"
            >
              <div>
                {/* Outlined soft background icon container */}
                <div className="w-10 h-10 rounded-lg bg-[#0A2E6D]/10 flex items-center justify-center transition-all">
                  {getIcon(issue.icon)}
                </div>
                <h3 className="mt-4 text-sm font-black text-slate-900 group-hover:text-orange-600 transition-colors tracking-tight">
                  {issue.title}
                </h3>
                <p className="mt-2.5 text-slate-600 text-xs leading-relaxed font-semibold line-clamp-4">
                  {issue.description}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-[10px] text-orange-600 font-bold uppercase tracking-wider">
                <span>READ MORE</span>
                <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Modal/Drawer overlay when card clicked */}
        {selectedIssue && (
          <div className="fixed inset-0 z-50 bg-[#0A2E6D]/20 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl p-6 md:p-8 relative shadow-2xl text-left text-slate-800">
              <button
                onClick={() => setSelectedIssue(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-900"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0A2E6D]/10 flex items-center justify-center">
                  {getIcon(selectedIssue.icon)}
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0A2E6D] uppercase tracking-tight">
                    {selectedIssue.title} Roadmap
                  </h3>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-[#ea580c] font-black">Proposed Action Plan</p>
                </div>
              </div>

              <p className="text-slate-650 text-xs leading-relaxed mb-6 font-semibold">
                {selectedIssue.description}
              </p>

              <div className="space-y-3">
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500 block font-bold">Core Directives:</span>
                {selectedIssue.detailedPoints.map((pt, i) => (
                  <div key={i} className="flex gap-2.5 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-[#0A2E6D]/10 border border-[#0A2E6D]/20 text-[#0A2E6D] text-xs flex items-center justify-center flex-shrink-0 font-bold font-mono">
                      {i + 1}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">{pt}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center border-t border-slate-100 pt-5 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="bg-[#0A2E6D] hover:bg-brand-blue-hover text-white font-extrabold py-2 px-5 rounded-lg text-xs tracking-wider uppercase"
                >
                  Close Roadmap
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
