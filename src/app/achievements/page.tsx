"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import DepartmentPage from "@/components/site/DepartmentPage";

// ─── Data Schema & 8 Department Highlights ───────────────────────────────────
type Achievement = {
  id: string;
  title: string;
  category: string;
  date: string;
  member: string;
  image: string;
  description: string;
};

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "a1",
    title: "Hackathon Winner",
    category: "JPMorgan Chase CFG 2025 - Social Impact",
    date: "2025",
    member: "Team FootPathshala",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1774104001/iot/08182265-1d07-4b60-ac81-72aed66b0956.png",
    description: "Built award-winning solutions like FootPathshala at JPMorgan Chase Code for Good 2025 with geo-tagged face attendance, ML-powered assessments, real-time dashboards, and scalable automation.",
  },
  {
    id: "a2",
    title: "IndiaAI Impact Summit 2026",
    category: "AI Challenge",
    date: "2026",
    member: "IEM-UEM Teams",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1774099272/iot/4c5adcf5-81ae-45d4-a989-71dd48f6b1aa_de6560.png",
    description: "IEM-UEM teams won top honors at the YUVAi Global Challenge at Bharat Mandapam.",
  },
  {
    id: "a3",
    title: "Innovation Showcase at STPI",
    category: "Innovation",
    date: "2026",
    member: "IEM-UEM Student Startups",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1774098091/iot/ec0e3942-bb2d-4ccc-8b39-1a96c4dd48f4.png",
    description: "Presented IEM-UEM student startups to Honorable West Bengal IT Minister Babul Supriyo and IT Secretary Shubhanjan Das.",
  },
  {
    id: "a4",
    title: "SIH 2025 Grand Finale",
    category: "Hackathon",
    date: "2025",
    member: "Team ThinkBit",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1774099485/iot/630b65d2-c9eb-46dc-81a0-afde5664f0ee.png",
    description: "Team ThinkBit represented the department at the Smart India Hackathon Grand Finale held at Sri Sri University.",
  },


  {
    id: "a7",
    title: "SATYAMEBA Supercomputing Initiative",
    category: "UEM Kolkata - HPC and AI Research",
    date: "2025",
    member: "Students, Faculty and Leadership",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1774103669/iot/e7aa4373-5920-499d-af38-7d109e14ecef.png",
    description: "Showcasing the SATYAMEBA 2025 initiative, a collaborative effort to advance AI acceleration, multi-GPU architectures, and high-performance computing for next-generation research.",
  },
 
  
  {
    id: "a10",
    title: "AI for Smart Mining",
    category: "CMPDI Hackathon 2025 - Runner-Up",
    date: "2025",
    member: "CMPDI Hackathon Team",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1774103610/iot/2839f291-11e1-47bf-bf72-c56c2bc3b861.png",
    description: "Awarded Runner-Up at the Ministry of Coal CMPDI R and D Hackathon 2025 for an intelligent monitoring and control system for ventilation and fire safety in underground coal mines.",
  },
  {
    id: "a11",
    title: "KrishiDhan AI System",
    category: "Square Hacks 2025 Finalist - AgriTech",
    date: "2025",
    member: "KrishiDhan Team",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1774103994/iot/849c54cf-aa80-43bb-aa47-c488c063c8e3.png",
    description: "Top 10 finalist among 650+ teams at Square Hacks 2025, IIT Delhi, with an offline-first AI system on Raspberry Pi 5 for soil health assessment using Explainable AI.",
  },
 
];

// ─── Icons ────────────────────────────────────────────────────────────────────
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-3.5 h-3.5"}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-3.5 h-3.5"}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-3.5 h-3.5"}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AchievementsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split data: Top 4 for the Bento Grid, remaining items for the Standard Grid
  const featuredAchievements = ACHIEVEMENTS.slice(0, 4);
  const remainingAchievements = ACHIEVEMENTS.slice(4);

  // Simple, fast, non-scrolling entrance animation on load
  useEffect(() => {
    if (!containerRef.current) return;

    import("gsap").then(({ gsap }) => {
      // Select all article cards within the container
      const cards = containerRef.current?.querySelectorAll("article");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 25, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          force3D: true,
        }
      );
    });
  }, []);

  return (
    <DepartmentPage
      title="Hall of Fame"
      subtitle="Celebrating our top milestones, awards, and breakthroughs in academics, innovation, and research excellence."
    >
      <div className="max-w-7xl mx-auto py-8" ref={containerRef}>
        
        {/* =========================================
            SECTION 1: BENTO GRID (First 4 Items)
            ========================================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[280px] grid-flow-dense mb-16">
          {featuredAchievements.map((item, index) => {
            // Perfect 4-piece Bento Math:
            // 0: 2x2 (Large Square)
            // 1: 2x1 (Wide Banner)
            // 2: 1x1 (Small Square)
            // 3: 1x1 (Small Square)
            const bentoClasses = 
              index === 0 ? "md:col-span-2 md:row-span-2" :
              index === 1 ? "md:col-span-2 md:row-span-1" :
              "md:col-span-1 md:row-span-1";
              
            const isLarge = index === 0 || index === 1;

            return (
              <article 
                key={item.id} 
                className={`group relative overflow-hidden rounded-3xl bg-slate-900 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${bentoClasses}`}
                style={{ willChange: "transform, opacity", opacity: 0 }} // opacity 0 initially for GSAP
              >
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-75 group-hover:opacity-95"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Darkening Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 inset-x-4 flex justify-between items-start gap-2">
                  <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-sky-300 shadow-sm">
                    <TrophyIcon />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{item.category}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-slate-950/40 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-slate-200">
                    <CalendarIcon />
                    <span className="text-[10px] font-semibold tracking-wide">{item.date}</span>
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                  <div className="mb-3 inline-flex items-center gap-1.5 w-fit rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-400/30 px-3 py-1 text-xs font-semibold text-sky-100">
                    <UserIcon /> {item.member}
                  </div>

                  <h2 
                    className={`font-bold text-white leading-tight mb-2 ${isLarge ? 'text-xl md:text-2xl' : 'text-lg'}`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h2>

                  {/* Description: Hidden on small squares until hover, visible on large blocks */}
                  <div className={`overflow-hidden transition-all duration-500 ${isLarge ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-2'}`}>
                    <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>


        {/* =========================================
            SECTION 2: STANDARD GRID (Remaining Items)
            ========================================= */}
        <div className="mb-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            More Achievements
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200" />
        </div>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {remainingAchievements.map((item) => (
            <article 
              key={item.id} 
              className="group flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              style={{ willChange: "transform, opacity", opacity: 0 }} // opacity 0 initially for GSAP
            >
              {/* Image Header Area */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                
                {/* Floating Category Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm text-sky-700">
                  <TrophyIcon className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">{item.category}</span>
                </div>

                {/* Date Overlay */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-slate-100">
                  <CalendarIcon className="w-4 h-4 text-sky-400" />
                  <span className="text-sm font-medium tracking-wide drop-shadow-md">{item.date}</span>
                </div>
              </div>

              {/* Text Content Area */}
              <div className="flex flex-col flex-1 p-6">
                <h2 
                  className="text-xl font-bold text-slate-900 leading-snug mb-3 group-hover:text-sky-600 transition-colors line-clamp-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h2>
                
                <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {item.description}
                </p>

                {/* Member / Team Footer (Pushed to bottom) */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-50 text-sky-600 shrink-0">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Achieved By</span>
                    <span className="text-sm font-semibold text-slate-800 truncate">{item.member}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

      </div>
    </DepartmentPage>
  );
}