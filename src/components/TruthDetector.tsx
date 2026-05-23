import React, { useState } from "react";
import { Search, AlertTriangle, CheckCircle, HelpCircle, ShieldAlert, FileText, Globe, Loader2, Sparkles, RefreshCw } from "lucide-react";
import { TruthResponse } from "../types";

const EXAMPLES = [
  "Viral Forward: Government is planning to cancel all traditional university degrees by 2027 in favor of online certifications.",
  "Report: Over 10 lakh jobs were successfully generated last year in India's climate-tech and renewable energy sectors.",
  "Social Media: A foreign intelligence agency has warned that social media platforms are running massive bot farms to divide Indian youth ahead of major legislation."
];

export default function TruthDetector() {
  const [claim, setClaim] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<TruthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    "Contacting global verified databases...",
    "Analyzing rhetoric bias & manipulation keywords...",
    "Cross-referencing timeline context...",
    "Structuring factual verification summary..."
  ];

  const handleVerify = async (textToVerify: string) => {
    if (!textToVerify.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    // Dynamic loading text transition
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % steps.length);
    }, 1200);

    try {
      const response = await fetch("/api/verify-truth", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ claim: textToVerify })
      });

      const resJson = await response.json();
      if (resJson.success && resJson.data) {
        setResult(resJson.data);
      } else {
        setError(resJson.error || "Failed to process truth verification. Try again.");
      }
    } catch (err: any) {
      setError("Server connection issue. Please ensure your backend dev server is active.");
    } finally {
      clearInterval(interval);
      setIsLoading(false);
    }
  };

  const getVerdictStyle = (verdict: string) => {
    switch (verdict) {
      case "TRUE":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          accentColor: "#10b981",
          label: "FULLY VERIFIED",
          icon: <CheckCircle className="w-12 h-12 text-emerald-600" />
        };
      case "PARTIALLY_TRUE":
        return {
          bg: "bg-sky-50 text-sky-800 border-sky-200",
          accentColor: "#0284c7",
          label: "PARTIALLY TRUE",
          icon: <Globe className="w-12 h-12 text-sky-600" />
        };
      case "MISLEADING":
        return {
          bg: "bg-amber-50 text-amber-800 border-amber-200",
          accentColor: "#d97706",
          label: "MISLEADING",
          icon: <AlertTriangle className="w-12 h-12 text-amber-600" />
        };
      case "FALSE":
      default:
        return {
          bg: "bg-red-50 text-red-800 border-red-200",
          accentColor: "#dc2626",
          label: "FALSE / PROPAGANDA",
          icon: <ShieldAlert className="w-12 h-12 text-red-600" />
        };
    }
  };

  return (
    <div className="text-slate-800 font-sans p-6 md:p-8 space-y-6 bg-white">
      {/* Input box */}
      <div className="space-y-4">
        <label className="text-[#0A2E6D] text-sm font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-500" /> Enter the claim or WhatsApp message:
        </label>
        <div className="relative">
          <textarea
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            placeholder="Examples: 'Colleges are banning physical books...' or 'Government gives a free solar panel to all citizens under 30...'"
            className="w-full text-sm min-h-[110px] p-4 pr-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A2E6D] focus:border-transparent transition-all overflow-y-auto resize-none font-medium"
          />
          <button
            onClick={() => setClaim("")}
            className="absolute right-4 bottom-4 text-slate-500 hover:text-slate-800 transition-colors text-xs bg-slate-200/60 px-2.5 py-1 rounded-md font-bold cursor-pointer"
          >
            Clear
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Tap a quick example to test:
          </p>
          <button
            onClick={() => handleVerify(claim)}
            disabled={isLoading || !claim.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0A2E6D] hover:bg-[#082456] disabled:bg-slate-100 disabled:text-slate-400 text-white font-extrabold py-3 px-8 rounded-xl cursor-pointer shadow-lg shadow-blue-500/10 active:scale-97 transition-all text-xs tracking-wider uppercase"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Checking...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4 text-white" />
                <span>Verify Claim</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
          {EXAMPLES.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => {
                setClaim(ex);
                handleVerify(ex);
              }}
              className="bg-slate-50 hover:bg-[#0A2E6D]/5 border border-slate-200 p-3 rounded-xl text-[11px] text-left text-slate-650 hover:text-[#0A2E6D] hover:border-[#0A2E6D]/30 transition-all cursor-pointer truncate font-semibold"
              title={ex}
            >
              "{ex.replace(/^(Viral Forward:|Report:|Social Media:)\s*/, '')}"
            </button>
          ))}
        </div>
      </div>

      {/* Loading Animation Status */}
      {isLoading && (
        <div className="pt-6 border-t border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="relative flex items-center justify-center mb-3">
            <div className="absolute w-12 h-12 bg-orange-500/15 rounded-full animate-ping" />
            <Loader2 className="w-7 h-7 text-[#0A2E6D] animate-spin" />
          </div>
          <p className="text-xs font-bold text-[#0A2E6D] tracking-wide font-mono animate-pulse">
            {steps[loadingStep]}
          </p>
          <p className="text-[10px] text-slate-400 mt-1 uppercase font-mono">RYJP Neural Agent computing facts</p>
        </div>
      )}

      {/* Error view */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-150 text-red-700 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-500" />
          <div>
            <p className="text-xs font-black uppercase">Verification Interrupted</p>
            <p className="text-[11px] font-medium mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Verification Result Dashboard */}
      {result && (
        <div className="pt-6 border-t border-slate-100 animate-fade-in text-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visual score dial */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
              <div className="relative flex items-center justify-center w-32 h-32">
                {/* SVG ring */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    className="stroke-slate-200"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="52"
                    className="transition-all duration-1000 ease-out"
                    stroke={getVerdictStyle(result.verdict).accentColor}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={326.7}
                    strokeDashoffset={326.7 - (326.7 * result.ratingPercentage) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black tracking-tight text-[#0A2E6D]">
                    {result.ratingPercentage}%
                  </span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    Truth Index
                  </span>
                </div>
              </div>

              <div className={`mt-5 inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full border text-[10px] font-black uppercase tracking-wider ${getVerdictStyle(result.verdict).bg}`}>
                {getVerdictStyle(result.verdict).label}
              </div>

              <p className="text-slate-400 text-[10px] text-center mt-3 italic leading-relaxed font-semibold">
                Neutral parameters calculated via Gemini API verification rules.
              </p>
            </div>

            {/* Text explanation */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-sm font-black text-[#0A2E6D] flex items-center gap-2 uppercase tracking-tight">
                  <FileText className="w-4 h-4 text-orange-500" /> Truth Verdict & Evaluation
                </h4>
                <p className="text-xs text-slate-700 mt-1.5 leading-relaxed font-semibold">
                  {result.explanation}
                </p>
              </div>

              {/* Fact Bullet points */}
              <div>
                <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
                  Core Factual Evidence:
                </h5>
                <ul className="space-y-1">
                  {result.keyFacts.map((fact, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start gap-2 font-semibold">
                      <span className="text-[#0A2E6D] font-black mt-0.5">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Manipulations detected */}
              {result.propagandaSpotted && result.propagandaSpotted.length > 0 && (
                <div>
                  <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">
                    Propaganda Techniques Spotted:
                  </h5>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {result.propagandaSpotted.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-red-50 text-red-700 border border-red-100 text-[10px] py-0.5 px-2.5 rounded-full font-bold"
                      >
                        🚨 {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sources Suggested */}
              <div className="pt-3.5 border-t border-slate-100 flex flex-col gap-1.5">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Globe className="w-3 h-3 text-[#0A2E6D]" /> Recommended Neutral Channels:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {result.sourcesSuggested.map((source, i) => (
                    <span
                      key={i}
                      className="bg-slate-100 text-slate-750 text-[10px] py-1 px-2.5 rounded border border-slate-250 font-mono font-bold"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
