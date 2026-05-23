import React from "react";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ManifestoSection from "./components/ManifestoSection";
import IssuesSection from "./components/IssuesSection";
import BannerSection from "./components/BannerSection";
import ConnectWithUs from "./components/ConnectWithUs";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div id="ryjp-portal" className="min-h-screen bg-white font-sans text-slate-800 antialiased overflow-x-hidden selection:bg-[#0A2E6D]/10 selection:text-[#0A2E6D]">
      {/* Navigation Headers */}
      <Header />

      {/* Hero Visual Section */}
      <HeroSection />

      {/* Main Vision Details */}
      <AboutSection />

      {/* The 5-part Manifesto Demands */}
      <ManifestoSection />

      {/* Specific Issues Grid */}
      <IssuesSection />

      {/* Banner Section Call to Action banner */}
      <BannerSection />

      {/* Connect with us Google Form Embedded Page */}
      <ConnectWithUs />

      {/* Navigation Footers */}
      <Footer />
    </div>
  );
}
