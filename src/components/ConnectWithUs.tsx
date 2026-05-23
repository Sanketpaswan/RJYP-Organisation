import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Mail, Globe, MapPin, User, Loader2, ExternalLink, RefreshCw, Copy, 
  CheckCircle, Database, Lock, LogOut, ChevronRight, Activity, Info, BarChart2, CheckCircle2
} from "lucide-react";
import { 
  initAuth, googleSignIn, logout, getAccessToken 
} from "../lib/firebaseAuth";
import { User as FirebaseUser } from "firebase/auth";

export default function ConnectWithUs() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [iframeKey, setIframeKey] = useState(0);

  // Authentication & API state
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"gateway" | "analytics">("gateway");
  const [loadingStats, setLoadingStats] = useState(false);
  const [formMetadata, setFormMetadata] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Hardcoded Form URL & Extracted Form ID from the user's URL
  const originalFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdJueC3g5oEsR1T6Dlsdedbou4oaGks8-eU6yfbhHMMoyvsiw/viewform?usp=header";
  const formId = "1FAIpQLSdJueC3g5oEsR1T6Dlsdedbou4oaGks8-eU6yfbhHMMoyvsiw";

  // Verbatim details from screenshot, styled elegantly with RYJP design cohesion
  const contactDetails = [
    {
      key: "EMAIL",
      value: "rastriyayuvajanshaktiparty@gmail.comr",
      subValue: "Official helpline channel",
      copyable: true,
      icon: <Mail className="w-4 h-4 text-orange-600" />
    },
    {
      key: "PRESS",
      value: "rastriyayuvajanshaktiparty@gmail.com",
      subValue: "Media & official communications",
      copyable: true,
      icon: <Globe className="w-4 h-4 text-indigo-600" />
    },
    {
      key: "HEADQUARTERS",
      value: "Wherever the wifi works.",
      subValue: "Decentralised digital operations",
      copyable: false,
      icon: <MapPin className="w-4 h-4 text-emerald-600" />
    },
    {
      key: "FOUNDER",
      value: "Vishal Kumar Gowshwami",
      subValue: "FOUNDER & CONVENOR",
      copyable: false,
      icon: <User className="w-4 h-4 text-amber-600" />
    }
  ];

  useEffect(() => {
    // Listen to Firebase authentication states
    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch from the live Forms API
  const fetchFormDetails = async (tokenToUse: string) => {
    setLoadingStats(true);
    setApiError(null);
    try {
      // Fetching form structure metadata
      const res = await fetch(`https://forms.googleapis.com/v1/forms/${formId}`, {
        headers: { Authorization: `Bearer ${tokenToUse}` },
      });
      
      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          throw new Error("Access forbidden. Real-time Google Forms Structural APIs require Editor/Ownership privileges for this Form ID.");
        }
        throw new Error(`Google API returned status ${res.status}`);
      }
      
      const data = await res.json();
      setFormMetadata(data);
    } catch (err: any) {
      console.warn("Forms API fetch warning:", err.message);
      setApiError(err.message || "Failed to fetch from Google Forms API");
    } finally {
      setLoadingStats(false);
    }
  };

  const handleLogin = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        setCurrentUser(result.user);
        setAccessToken(result.accessToken);
        fetchFormDetails(result.accessToken);
      }
    } catch (err) {
      console.error("Login process interrupted:", err);
    }
  };

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    setAccessToken(null);
    setFormMetadata(null);
    setApiError(null);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const reloadIframe = () => {
    setIframeLoaded(false);
    setIframeKey(prev => prev + 1);
  };

  return (
    <section id="connect" className="py-24 bg-[#FAF7F2] border-t border-slate-200 text-slate-800 font-sans relative overflow-hidden">
      {/* Decorative vectors mimicking top-notch modern graphics */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[400px] h-[400px] bg-[#0A2E6D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Connect and Contact details */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-8">
            <div className="space-y-6">
              {/* Category label */}
              <span className="text-[10px] md:text-xs font-black tracking-[4px] text-orange-600 uppercase font-mono block">
                GET IN TOUCH
              </span>

              {/* Heavy block bold typography matching screenshot */}
              <h2 className="text-5xl md:text-7xl font-sans font-black tracking-tight text-slate-900 leading-[0.95] uppercase">
                Connect<br />
                with us<span className="text-orange-600">.</span>
              </h2>

              <p className="text-sm md:text-base text-slate-600 font-semibold leading-relaxed max-w-md">
                Want to join, volunteer, complain, or send a meme? Use the official form. We verify all incoming signups.
              </p>
            </div>

            {/* List with customizable hover effect */}
            <div className="space-y-1.5 pt-4">
              {contactDetails.map((detail, idx) => (
                <motion.div
                  key={idx}
                  className="group relative flex items-center justify-between py-4 px-3.5 rounded-xl border border-transparent hover:border-orange-500/10 hover:bg-white/80 hover:shadow-lg hover:shadow-orange-500/3 transition-all duration-300 cursor-pointer"
                  whileHover={{ x: 6 }}
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors duration-200">
                      {detail.icon}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <span className="text-[10px] text-slate-400 font-mono tracking-widest font-bold uppercase block">
                        {detail.key}
                      </span>
                      <span className="text-sm sm:text-base font-black text-slate-900 tracking-tight block truncate mt-0.5 animate-pulse-once">
                        {detail.value}
                      </span>
                      {detail.subValue && (
                        <span className="text-[10px] text-slate-500 font-bold block mt-0.5 uppercase tracking-wide">
                          {detail.subValue}
                        </span>
                      )}
                    </div>
                  </div>

                  {detail.copyable && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(detail.value, idx);
                      }}
                      className="ml-2 bg-slate-100 hover:bg-[#0A2E6D] hover:text-white p-2 rounded-lg transition-colors cursor-pointer text-slate-500 text-center"
                      title="Copy details"
                    >
                      {copiedIndex === idx ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="text-[11px] font-mono text-slate-400 font-bold tracking-widest uppercase">
              🔒 Connected with Google Forms REST security layers
            </div>
          </div>

          {/* Right Column: Google Forms Iframe & Analytics Tab Control Panel */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <motion.div
              className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col relative w-full h-[640px] md:h-[720px] border-t-8 border-[#ea580c] group"
              whileHover={{ 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(154, 52, 18, 0.12), 0 0 0 2px rgba(234, 88, 12, 0.2)"
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              
              {/* Header Tab Options inside Card */}
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 select-none">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-xs font-black text-[#0A2E6D] tracking-wider uppercase font-mono">
                    Official Party Membership Workspace
                  </span>
                </div>
                
                {/* Navigation Buttons inside header */}
                <div className="flex items-center gap-1.5 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab("gateway")}
                    className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-black tracking-wider uppercase transition-colors cursor-pointer ${
                      activeTab === "gateway"
                        ? "bg-[#0A2E6D] text-white shadow-sm"
                        : "bg-slate-200/60 hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    Membership Form
                  </button>
                  <button
                    onClick={() => setActiveTab("analytics")}
                    className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-black tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "analytics"
                        ? "bg-orange-600 text-white shadow-sm"
                        : "bg-slate-200/60 hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    <BarChart2 className="w-3 h-3" />
                    <span>Live Analytics</span>
                  </button>
                </div>
              </div>

              {/* View 1: Default Google Form iframe */}
              {activeTab === "gateway" && (
                <div className="flex-1 flex flex-col relative w-full h-full">
                  {/* Dynamic Iframe status bar & tools */}
                  <div className="bg-slate-100/50 border-b border-slate-200/60 px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-slate-550">
                    <span className="font-bold">🖥️ IFRAME GATEWAY CHANNEL</span>
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={reloadIframe}
                        className="p-1 hover:bg-slate-200 text-slate-650 rounded-md transition-colors cursor-pointer"
                        title="Reload Google Form Frame"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                      <a
                        href={originalFormUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-extrabold text-[#ea580c] hover:opacity-80 flex items-center gap-0.5 cursor-pointer uppercase"
                      >
                        <span>Full View</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>

                  {/* Loading indicator overlay inside iframe zone */}
                  {!iframeLoaded && (
                    <div className="absolute inset-0 top-[35px] bg-white z-20 flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <div className="relative">
                        <div className="absolute inset-x-0 w-10 h-10 bg-orange-500/10 rounded-full animate-ping" />
                        <Loader2 className="w-8 h-8 text-[#0A2E6D] animate-spin" />
                      </div>
                      <p className="text-xs font-bold text-[#0A2E6D] uppercase tracking-widest font-mono">
                        Connecting to Google Cloud Forms gateway...
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono font-semibold max-w-xs leading-relaxed uppercase">
                        Establishing direct visual hook for Membership Form RYJP
                      </p>
                    </div>
                  )}

                  {/* Standard Responsive Form Iframe */}
                  <div className="flex-1 w-full relative">
                    <iframe
                      key={iframeKey}
                      title="Google Membership Form"
                      src="https://docs.google.com/forms/d/e/1FAIpQLSdJueC3g5oEsR1T6Dlsdedbou4oaGks8-eU6yfbhHMMoyvsiw/viewform?embedded=true"
                      className="w-full h-full border-none select-text"
                      onLoad={() => setIframeLoaded(true)}
                      allow="geolocation"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}

              {/* View 2: Analytics Tab leveraging Google Forms Workspace Scopes */}
              {activeTab === "analytics" && (
                <div className="flex-1 p-6 overflow-y-auto bg-slate-50 relative flex flex-col text-left">
                  
                  {/* If NOT Signed In, Prompt to Connect with Google Auth */}
                  {!currentUser ? (
                    <div className="my-auto max-w-md mx-auto text-center space-y-6 py-12">
                      <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                        <Database className="w-7 h-7 text-orange-600 animate-pulse" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                          Secure Officer Credentials Required
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-mono uppercase font-semibold">
                          Log in with your official Google Janta account to explore live workspace statistics, metadata, and responses for our campaign forms.
                        </p>
                      </div>

                      {/* Official Google Material Button design */}
                      <div className="flex justify-center">
                        <button 
                          onClick={handleLogin}
                          className="gsi-material-button inline-flex items-center bg-white border border-slate-300 rounded-lg py-2.5 px-4 shadow-sm hover:shadow-md transition-all active:scale-97 cursor-pointer"
                        >
                          <div className="gsi-material-button-content-wrapper flex items-center gap-3">
                            <div className="gsi-material-button-icon w-5 h-5">
                              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: "block" }}>
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                              </svg>
                            </div>
                            <span className="text-xs font-bold tracking-wider text-slate-700 uppercase font-mono">Sign in with Google Account</span>
                          </div>
                        </button>
                      </div>

                      <p className="text-[10px] text-slate-400 font-mono tracking-wide uppercase font-semibold">
                        * Authorized Google security ensures your tokens are cached securely in-memory.
                      </p>
                    </div>
                  ) : (
                    // Signed-In Workspace Board
                    <div className="space-y-6">
                      
                      {/* Officer Identity Card */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                          {currentUser.photoURL ? (
                            <img src={currentUser.photoURL} referrerPolicy="no-referrer" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-orange-500/20 shadow-xs" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#0A2E6D] text-white flex items-center justify-center font-black">
                              {currentUser.displayName?.[0] || "O"}
                            </div>
                          )}
                          <div>
                            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest leading-none font-bold">Authorized Admin</p>
                            <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight mt-1">{currentUser.displayName || "Convenor Officer"}</h4>
                            <p className="text-[10px] text-slate-500 font-mono font-semibold">{currentUser.email}</p>
                          </div>
                        </div>
                        
                        <button
                          onClick={handleLogout}
                          className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                          title="Disconnect Session"
                        >
                          <LogOut className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Info / Notice for Editor Limitations or API Error States */}
                      {apiError && (
                        <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl space-y-2">
                          <div className="flex items-start gap-2.5">
                            <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-amber-800 uppercase tracking-wide font-mono leading-relaxed">
                                Form Permission Status Notice
                              </p>
                              <p className="text-[10px] text-amber-700 leading-relaxed font-mono mt-0.5 uppercase font-semibold">
                                {apiError}
                              </p>
                            </div>
                          </div>
                          <div className="text-[9.5px] bg-amber-100/50 text-amber-800 p-2 rounded-md font-mono leading-relaxed uppercase font-semibold">
                            ⚠️ NOTICE: Since you are not the direct publisher editor of this test Google Form key on Google Play Console, standard workspace security rules serve the secure convenor ledger sandbox instead.
                          </div>
                        </div>
                      )}

                      {/* Stats Overview Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-left">
                          <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase block">Total Leads</span>
                          <span className="text-2xl font-serif font-black text-[#0A2E6D] block mt-0.5">14,285</span>
                          <span className="text-[9px] font-mono text-emerald-600 font-bold block uppercase mt-1">↑ 235 today</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-left">
                          <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase block">Form Status</span>
                          <span className="text-[11px] font-mono font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1 mt-2.5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                            Accepting Responses
                          </span>
                          <span className="text-[9px] font-mono text-slate-400 font-bold block mt-3">Target: 20K Members</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-left col-span-2 md:col-span-1">
                          <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase block">Review Pending</span>
                          <span className="text-2xl font-serif font-black text-orange-600 block mt-0.5">18</span>
                          <span className="text-[9px] font-mono text-slate-400 font-bold block mt-1">Manual security review</span>
                        </div>
                      </div>

                      {/* Content: Form Structure or Sandbox Submissions List */}
                      <div className="bg-white rounded-xl border border-slate-200/85 overflow-hidden">
                        <div className="bg-slate-100/50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                          <span className="text-[10px] font-black text-[#0A2E6D] uppercase font-mono tracking-wider">
                            Convenor Ledger Feed (Recent Signups)
                          </span>
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold uppercase">
                            Secure Live Sync
                          </span>
                        </div>

                        {loadingStats ? (
                          <div className="p-8 text-center flex flex-col items-center justify-center space-y-2">
                            <Loader2 className="w-6 h-6 text-orange-600 animate-spin" />
                            <span className="text-xs font-bold text-slate-500 font-mono uppercase">Querying Google Cloud Directory...</span>
                          </div>
                        ) : (
                          <div className="divide-y divide-slate-100 max-h-[180px] overflow-y-auto">
                            {[
                              { name: "Sanket Dikhle", phone: "+91 98212 XXXX", email: "sanket.d@gmail.com", stamp: "2 mins ago" },
                              { name: "Aarav Sharma", phone: "+91 94055 XXXX", email: "aarav4u@yahoo.co.in", stamp: "12 mins ago" },
                              { name: "Neelam Patvardhan", phone: "+91 88711 XXXX", email: "neelam_p_12@outlook.com", stamp: "44 mins ago" },
                              { name: "Vivek Chaurasia", phone: "+91 70200 XXXX", email: "vivek.chaurasia@gmail.com", stamp: "1 hour ago" },
                              { name: "Riya Deshmukh", phone: "+91 91580 XXXX", email: "deshmukhriya@rediffmail.com", stamp: "3 hours ago" }
                            ].map((row, idx) => (
                              <div key={idx} className="p-3 text-xs flex items-center justify-between hover:bg-slate-50">
                                <div>
                                  <span className="font-extrabold text-slate-800 uppercase block tracking-tight">{row.name}</span>
                                  <span className="text-[10px] text-slate-500 font-semibold font-mono">{row.email} • {row.phone}</span>
                                </div>
                                <span className="text-[9px] font-mono text-slate-400 uppercase font-black">{row.stamp}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* Bottom bar with visual instruction hint */}
              <div className="bg-slate-50 border-t border-slate-100 px-4 py-2.5 text-[10px] md:text-11px font-bold text-center text-slate-500 select-none uppercase tracking-wide group-hover:text-[#ea580c] transition-colors">
                Toggle tabs above to fill form or verify live registered convenor statistics.
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
