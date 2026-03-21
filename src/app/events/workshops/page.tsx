"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import DepartmentPage from "@/components/site/DepartmentPage";

// ─── Data Schema & Mock Events ───────────────────────────────────────────────
type PastEvent = {
  id: string;
  title: string;
  type: "Workshop" | "Seminar" | "Guest Lecture";
  date: string;
  time: string;
  venue: string;
  speaker: string;
  image: string;
  description: string;
  report: string;
};

const PAST_EVENTS: PastEvent[] = [
  {
    id: "pe1",
    title: "Modern API Security Workshop",
    type: "Workshop",
    date: "January 17, 2026",
    time: "10:00 AM - 04:00 PM",
    venue: "Lab Complex - Block B",
    speaker: "Ms. Priya Reddy",
    image: "/photo/1.jpg",
    description: "A comprehensive, hands-on workshop focused on securing REST and GraphQL APIs. Students learned token-based authentication strategies, rate limiting, and how to implement zero-trust architecture patterns in modern microservices.",
    report: "Successfully attended by 120+ students. Certificates and materials distributed.",
  },
  {
    id: "pe2",
    title: "Seminar on Responsible & Ethical AI",
    type: "Seminar",
    date: "February 06, 2026",
    time: "02:00 PM - 04:30 PM",
    venue: "Main Seminar Hall",
    speaker: "Dr. Naveen Bhat",
    image: "/photo/2.jpg",
    description: "An engaging seminar exploring the critical need for bias mitigation, data governance, and ethical frameworks when developing Large Language Models and automated decision-making systems in healthcare and finance.",
    report: "Session recording and presentation slides are archived in the digital library.",
  },
  {
    id: "pe3",
    title: "Building Decentralized Apps (dApps)",
    type: "Workshop",
    date: "November 12, 2025",
    time: "09:00 AM - 05:00 PM",
    venue: "IoT & Blockchain Lab",
    speaker: "Mr. Vikram Singh",
    image: "/photo/3.jpg",
    description: "An intensive full-day boot camp where participants built and deployed their first Ethereum smart contracts using Solidity and Hardhat, culminating in a mini-hackathon.",
    report: "35 working dApps were deployed to the testnet during the final hour.",
  },
  {
    id: "pe4",
    title: "The Future of Edge Computing in 5G",
    type: "Guest Lecture",
    date: "September 28, 2025",
    time: "11:00 AM - 12:30 PM",
    venue: "Virtual Event",
    speaker: "Dr. Sarah Jenkins",
    image: "/photo/4.jpg",
    description: "A deep dive into how 5G networks are pushing computational power to the extreme edge, drastically reducing latency for autonomous vehicles and real-time IoT networks.",
    report: "Over 200 virtual attendees. Q&A transcript is available on the student portal.",
  },
];

// ─── Minimal Icons (Sized down for a cleaner look) ────────────────────────────
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

function SpeakerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-3.5 h-3.5"}>
      <path d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
      <path d="M22 22c0-3.31-2.69-6-6-6h-8c-3.31 0-6 2.69-6 6" />
      <path d="M19 8v4" />
      <path d="M21 10h-4" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-3.5 h-3.5"}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-4 h-4"}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function WorkshopsPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Smooth fade-in animation
  useEffect(() => {
    if (!gridRef.current) return;

    import("gsap").then(({ gsap }) => {
      const cards = gridRef.current?.querySelectorAll("article");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          force3D: true,
        }
      );
    });
  }, []);

  return (
    <DepartmentPage
      title="Past Workshops & Seminars"
      subtitle="An archive of our knowledge-sharing sessions, expert talks, and hands-on training programs."
    >
      <div className="max-w-7xl mx-auto py-8">
        
        {/* Events Grid - Switched to a sleek 2-column layout */}
        <section 
          ref={gridRef}
          className="grid gap-6 md:grid-cols-2 lg:gap-8"
        >
          {PAST_EVENTS.map((event) => (
            <article 
              key={event.id} 
              className="group flex flex-col bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-300 overflow-hidden"
              style={{ willChange: "transform, opacity", opacity: 0 }}
            >
              
              {/* Image Section */}
              <div className="relative h-48 sm:h-68 w-full overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Minimal Type Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-md shadow-sm border border-white/20">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-700">
                    {event.type}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-1 p-5 sm:p-6">
                
                <h2 
                  className="text-xl font-bold text-slate-900 leading-snug mb-4 group-hover:text-sky-600 transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {event.title}
                </h2>

                {/* Minimal Meta Details Row - Icons are much smaller now */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <CalendarIcon />
                    <span className="text-xs font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <SpeakerIcon />
                    <span className="text-xs font-medium">{event.speaker}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPinIcon />
                    <span className="text-xs font-medium">{event.venue}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {event.description}
                </p>

                {/* Report Footer - Super sleek and clean */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-start gap-2.5">
                  <CheckCircleIcon className="text-emerald-500 shrink-0 mt-0.5 size-4" />
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-800">Outcome: </span>
                    {event.report}
                  </p>
                </div>

              </div>
            </article>
          ))}
        </section>

      </div>
    </DepartmentPage>
  );
}