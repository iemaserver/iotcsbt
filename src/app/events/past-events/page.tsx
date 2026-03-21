"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import DepartmentPage from "@/components/site/DepartmentPage";

// ─── Expanded Data for Bento + 2-Column Layout ────────────────────────────────
const PAST_EVENTS = [
  {
    id: "pe1",
    name: "Tech Kurukshetra 2025",
    date: "February 2025",
    type: "Tech Fest",
    report: "Comprehensive event report PDF submitted to departmental records.",
    photo: "/photo/1.jpg",
  },
  {
    id: "pe2",
    name: "Innovation Demo Day",
    date: "December 2024",
    type: "Showcase",
    report: "Industry panel evaluation report and startup showcase summary available.",
    photo: "/photo/4.jpg",
  },
  {
    id: "pe3",
    name: "AI Research Colloquium",
    date: "October 2024",
    type: "Colloquium",
    report: "Proceedings and presentation abstracts archived as PDF.",
    photo: "/photo/5.jpg",
  },
  {
    id: "pe4",
    name: "Web3 Developers Meetup",
    date: "August 2024",
    type: "Meetup",
    report: "Event photo gallery and smart contract deployment logs compiled.",
    photo: "/photo/2.jpg",
  },
  {
    id: "pe5",
    name: "Cyber Security Hackathon",
    date: "June 2024",
    type: "Hackathon",
    report: "Vulnerability assessment reports and winning team source codes archived.",
    photo: "/photo/3.jpg",
  },
  {
    id: "pe6",
    name: "IoT Smart City Workshop",
    date: "April 2024",
    type: "Workshop",
    report: "Sensor network deployment architecture PDFs and participant certificates.",
    photo: "/photo/1.jpg",
  },
];

// ─── Minimal Icons ────────────────────────────────────────────────────────────
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-3.5 h-3.5"}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PastEventsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const bentoEvents = PAST_EVENTS.slice(0, 4);
  const regularEvents = PAST_EVENTS.slice(4);

  useEffect(() => {
    if (!containerRef.current) return;

    import("gsap").then(({ gsap }) => {
      const cards = containerRef.current?.querySelectorAll("article");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
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
      title="Past Events Archive"
      subtitle="Browse previous department events, with photo highlights and comprehensive report documents."
    >
      <div className="max-w-7xl mx-auto py-8" ref={containerRef}>
        
        {/* =========================================
            SECTION 1: BENTO GRID (First 4 Items)
            ========================================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[280px] grid-flow-dense mb-12">
          {bentoEvents.map((event, index) => {
            const bentoClasses = 
              index === 0 ? "md:col-span-2 md:row-span-2" :
              index === 1 ? "md:col-span-2 md:row-span-1" :
              "md:col-span-1 md:row-span-1";
              
            const isLarge = index === 0 || index === 1;

            return (
              <article 
                key={event.id} 
                className={`group relative overflow-hidden rounded-3xl bg-slate-900 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${bentoClasses}`}
                style={{ willChange: "transform, opacity", opacity: 0 }}
              >
                <Image
                  src={event.photo}
                  alt={event.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-75 group-hover:opacity-90"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 inset-x-4 flex justify-between items-start gap-2">
                  <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-sky-300 shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-wider">{event.type}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-slate-950/40 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-slate-200">
                    <CalendarIcon />
                    <span className="text-[10px] font-semibold tracking-wide">{event.date}</span>
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                  <h2 
                    className={`font-bold text-white leading-tight mb-2 ${isLarge ? 'text-2xl md:text-3xl' : 'text-lg'}`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {event.name}
                  </h2>

                  <div className={`overflow-hidden transition-all duration-500 ${isLarge ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-2'}`}>
                    <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {event.report}
                    </p>
                    <button className="inline-flex items-center gap-2 rounded-xl bg-sky-500/20 backdrop-blur-md border border-sky-400/30 px-4 py-2 text-xs font-semibold text-sky-100 transition-colors hover:bg-sky-500/40 hover:text-white">
                      <DocumentIcon /> View Report PDF
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* =========================================
            SECTION 2: 2-COLUMN GRID (Remaining)
            ========================================= */}
        {regularEvents.length > 0 && (
          <>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                More Past Events
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200" />
            </div>

            <section className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {regularEvents.map((event) => (
                <article 
                  key={event.id} 
                  className="group flex flex-col sm:flex-row bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-300 overflow-hidden"
                  style={{ willChange: "transform, opacity", opacity: 0 }}
                >
                  <div className="relative h-48 sm:h-auto sm:w-40 shrink-0 overflow-hidden bg-slate-100">
                    <Image
                      src={event.photo}
                      alt={event.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0"
                      sizes="(max-width: 640px) 100vw, 160px"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm border border-slate-100">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-sky-700">
                        {event.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-sky-600 transition-colors">
                      {event.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-slate-500 mb-3">
                      <CalendarIcon />
                      <span className="text-xs font-medium">{event.date}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
                      {event.report}
                    </p>

                    <div className="mt-auto">
                      <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors">
                        <DocumentIcon /> Open Report
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}

      </div>
    </DepartmentPage>
  );
}