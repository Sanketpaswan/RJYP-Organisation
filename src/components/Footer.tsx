import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube, Send, Sparkles, CheckCircle, ArrowUp } from "lucide-react";
import RYJPLogo from "./RYJPLogo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = 2026;

  return (
    <footer id="footer" className="bg-slate-50 text-slate-800 border-t border-slate-200 pt-16 pb-8 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-200 text-left">
          
          {/* Logo Brand information */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <RYJPLogo className="w-11 h-11" />
              <div>
                <h5 className="text-sm font-black text-[#0A2E6D] tracking-widest leading-none uppercase">RYJP</h5>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Rashtriya Yuva Jan Shakti Party</p>
              </div>
            </div>
            
            <p className="text-slate-650 text-xs leading-relaxed max-w-sm font-semibold">
              We rise against fake narratives, clickbait propaganda, and divisiveness. Redefining democratic responsibility for the youth of India.
            </p>

            <div className="pt-2 font-mono text-[10px] text-orange-600 font-black tracking-widest uppercase">
              Voice of Truth. Power of Youth.
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8 text-xs font-semibold">
            <div>
              <h5 className="font-extrabold text-[#0A2E6D] uppercase tracking-widest mb-4 font-mono text-[10px]">Navigations</h5>
              <ul className="space-y-2.5 text-slate-600">
                {["Home", "Vision", "Issues", "Movement"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link === "Home" ? "hero" : link === "Vision" ? "about" : link === "Movement" ? "join-us" : link.toLowerCase()}`}
                      className="hover:text-[#0A2E6D] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-extrabold text-[#0A2E6D] uppercase tracking-widest mb-4 font-mono text-[10px]">Resources</h5>
              <ul className="space-y-2.5 text-slate-600">
                {["Join Us", "Contact", "Privacy Policy"].map((link) => (
                  <li key={link}>
                    <a
                      href={link === "Join Us" ? "#join-us" : link === "Contact" ? "#connect" : "#"}
                      onClick={(e) => {
                        if (link !== "Join Us" && link !== "Contact") e.preventDefault();
                      }}
                      className="hover:text-[#0A2E6D] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Subscribe Community Field Column */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="font-extrabold text-[#0A2E6D] uppercase tracking-widest mb-4 font-mono text-[10px]">Join Our Community</h5>
            <p className="text-slate-655 text-xs leading-relaxed font-semibold">
              Get the latest updates, event calendars, and fact-checking digests delivered to your email.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-white border border-slate-200 text-slate-800 text-xs rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0A2E6D] transition-all placeholder:text-slate-400 font-semibold"
                />
                <button
                  type="submit"
                  className="bg-[#0A2E6D] hover:bg-[#082456] text-white font-extrabold px-4 py-2.5 rounded-lg text-xs tracking-wider cursor-pointer transition-colors flex items-center justify-center flex-shrink-0 uppercase"
                >
                  SUBSCRIBE
                </button>
              </form>
            ) : (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-start gap-2 text-orange-700 font-semibold text-xs">
                <CheckCircle className="w-4 h-4 flex-shrink-0 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-black uppercase">Subscription Complete!</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">Jai Hind! You are now subscribed to RYJP updates.</p>
                </div>
              </div>
            )}

            {/* Social media nodes */}
            <div className="pt-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono block mb-2.5">
                Follow RYJP Movement
              </span>
              <div className="flex gap-3 text-slate-500">
                {[
                  { icon: <Facebook className="w-4 h-4" />, url: "https://facebook.com/ryjp" },
                  { icon: <Twitter className="w-4 h-4" />, url: "https://twitter.com/ryjp" },
                  { icon: <Instagram className="w-4 h-4" />, url: "https://www.instagram.com/rastriyayuvajanshaktiparty/" },
                  { icon: <Youtube className="w-4 h-4" />, url: "https://youtube.com/ryjp" },
                  { icon: <Send className="w-4 h-4" />, url: "https://telegram.me/ryjp" }
                ].map((social, smIdx) => (
                  <a
                    key={smIdx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-white hover:bg-[#0A2E6D]/5 border border-slate-200 hover:border-[#0A2E6D]/20 flex items-center justify-center hover:text-[#0A2E6D] transition-all cursor-pointer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Copyright banner row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-400 font-mono font-bold uppercase">
          <div className="text-center sm:text-left">
            &copy; {currentYear} Rashtriya Yuva Jan Shakti Party (RYJP). All Rights Reserved.
          </div>
          
          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-500 hover:text-[#0A2E6D] transition-colors cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
