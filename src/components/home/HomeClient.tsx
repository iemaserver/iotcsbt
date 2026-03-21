"use client";

import AboutUs from "@/components/home/AboutUs";
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/home/Navbar";

import LabCarousel from "./ViewImages";
import Achievements from "./Achievements";
import HodMessage from "./HodMessage";
import Footer from "./Footer";

export default function HomeClient() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden text-slate-900 bg-gradient-to-b from-sky-50 via-blue-50 to-slate-100">
      <Navbar />
      <HeroSection />
      <AboutUs />
      <Achievements />
      <LabCarousel />
      <HodMessage />
      <Footer />
    </div>
  );
}
