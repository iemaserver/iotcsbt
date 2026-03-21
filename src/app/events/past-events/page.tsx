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
   
    photo: "https://res.cloudinary.com/dvky83edw/image/upload/v1774100346/iot/chjz9ii3pn3cs0ebqemt.jpg",
  },
  {
    id: "pe2",
    name: "BuildCon 2026",
    date: "February 2026",
    type: "Start-up Pitch Competition",
  
    photo: "https://res.cloudinary.com/dvky83edw/image/upload/v1774100388/iot/qdu9vtbn3in9wvkucxxy.jpg",
  },
  {
    id: "pe3",
    name: "Cyber Odyssey 2025",
    date: "October 2025",
    type: "Competition",
    
    photo: "https://res.cloudinary.com/dvky83edw/image/upload/v1774068989/iot/i6fesgigd7mcwixnsu8n.jpg",
  },
  {
    id: "pe4",
    name: "Guest Lecture",
    date: "August 2025",
    type: "Seminar",
   
    photo: "https://res.cloudinary.com/dvky83edw/image/upload/v1774069066/iot/goyciqtvbymwfse7q5ik.jpg",
  },
  {
    id: "pe5",
    name: "Poster Competition",
    date: "March 2026",
    type: "Competition",
    
    photo: "https://res.cloudinary.com/dvky83edw/image/upload/v1774120807/iot/5d887295-361f-4774-a4a1-8e2b9b3160ed.png",
  },
  {
    id: "pe6",
    name: "Debate Competition",
    date: "March 2026",
    type: "Competition",
 
    photo: "https://res.cloudinary.com/dvky83edw/image/upload/v1774120801/iot/85953946-b8ac-43c2-b866-b183e3d987de.png",
  },
];


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
      subtitle="Browse previous department events, with photo highlights."
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