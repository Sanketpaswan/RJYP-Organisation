import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Sparkles, AlertCircle } from "lucide-react";
import RYJPLogo from "./RYJPLogo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Add subtle background shadow and contract height on scroll
      setScrolled(window.scrollY > 20);

      // Scroll progress calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      } else {
        setScrollProgress(0);
      }

      const navSections = [
        "hero",
        "about",
        "manifesto",
        "issues",
        "join-us",
        "connect"
      ];

      const threshold = 120; // offset buffer to detect active sections precisely
      let currentSection = "hero";

      const sectionOffsets = navSections
        .map((id) => {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            return { id, top: rect.top, bottom: rect.bottom };
          }
          return null;
        })
        .filter((item): item is { id: string; top: number; bottom: number } => item !== null);

      // Find standard active sections that have crossed the threshold list-order style
      const activeSections = sectionOffsets.filter((sec) => sec.top <= threshold);
      if (activeSections.length > 0) {
        currentSection = activeSections[activeSections.length - 1].id;
      }

      // Precise absolute bottom of viewport fallback to highlight Connect ("connect" / Contact)
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        currentSection = "connect";
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial execution on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Find offset element padding and scroll beautifully
      const headerOffset = scrolled ? 64 : 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset + 5;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: "Home", actionId: "hero" },
    { label: "Vision", actionId: "about" },
    { label: "Manifesto", actionId: "manifesto" },
    { label: "Issues", actionId: "issues" },
    { label: "Movement", actionId: "join-us" },
    { label: "Contact", actionId: "connect" }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-md py-1" 
        : "bg-white border-b border-slate-100 shadow-xs py-0"
    } font-sans`}>
      {/* Thin, orange scroll-progress bar */}
      <div 
        className="absolute top-0 left-0 h-[3px] bg-[#ea580c] transition-all duration-75 z-50 pointer-events-none" 
        style={{ width: `${scrollProgress}%` }} 
      />
      <div className={`max-w-7xl mx-auto px-6 transition-all duration-300 ${scrolled ? "h-16" : "h-20"} flex items-center justify-between`}>
        {/* Brand Logo & Name exactly matching the screenshot but high contrast light mode */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => scrollToSection("hero")}
              className="hover:opacity-85 transition-opacity cursor-pointer flex items-center"
            >
              <RYJPLogo className="w-14 h-14" />
            </button>
            {/* Fine vertical line spacer */}
            <div className="h-10 w-[1px] bg-slate-200 mx-2" />
            <div className="flex flex-col text-left leading-none select-none">
              <span className="text-[11px] font-black tracking-widest text-[#0A2E6D] uppercase">Rashtriya Yuva</span>
              <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mt-1">Jan Shakti Party</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = activeSection === item.actionId;
            return (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.actionId)}
                className={`text-[11px] font-bold tracking-widest uppercase cursor-pointer hover:text-[#0A2E6D] transition-all relative py-1.5 ${
                  isActive ? "text-[#ea580c] font-black scale-102" : "text-slate-655"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-[#ea580c] rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* CTA Button exactly as shown in screenshot */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={() => scrollToSection("join-us")}
            className="bg-[#ea580c] hover:bg-[#c2410c] px-5 py-2.5 rounded-lg text-[10px] font-black tracking-widest uppercase text-white shadow-lg shadow-orange-500/10 cursor-pointer active:scale-95 transition-all text-center flex items-center gap-1.5"
          >
            JOIN RYJP
          </button>
        </div>

        {/* Mobile Hamburger block */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-slate-600 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 animate-fade-in py-4 px-6 space-y-3 shadow-lg">
          {navItems.map((item) => {
            const isActive = activeSection === item.actionId;
            return (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.actionId)}
                className={`block w-full text-left text-xs tracking-widest uppercase font-bold py-2 px-3 rounded-lg transition-colors ${
                  isActive ? "bg-orange-50 text-[#ea580c] font-black" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => scrollToSection("join-us")}
              className="w-full bg-[#ea580c] hover:bg-orange-600 text-white font-extrabold py-3 px-4 rounded-lg text-center text-xs tracking-widest uppercase"
            >
              JOIN RYJP
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
