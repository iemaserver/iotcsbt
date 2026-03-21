"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import DepartmentPage from "@/components/site/DepartmentPage";

// ─── Data Schema & Mock Events ───────────────────────────────────────────────
type Event = {
  id: string;
  name: string;
  date: string;
  month: string;
  day: string;
  time: string;
  venue: string;
  image: string;
  description: string;
};

const UPCOMING_EVENTS: Event[] = [
  {
    id: "e1",
    name: "National IoT Innovation Meet 2026",
    date: "April 08, 2026",
    month: "APR",
    day: "08",
    time: "10:00 AM - 04:00 PM",
    venue: "Innovation Auditorium, Block A",
    image: "/photo/1.jpg",
    description: "Join industry leaders and top researchers for a day of keynote speeches, hardware showcases, and networking focused on the future of the Internet of Things.",
  },
  {
    id: "e2",
    name: "Cyber Security Awareness Week Launch",
    date: "April 20, 2026",
    month: "APR",
    day: "20",
    time: "11:30 AM - 01:00 PM",
    venue: "Main Seminar Hall",
    image: "/photo/2.jpg",
    description: "Kick off our annual security week with live ethical hacking demonstrations, panel discussions, and a workshop on zero-trust network architecture.",
  },
  {
    id: "e3",
    name: "Web3 & Open Source Contribution Day",
    date: "May 03, 2026",
    month: "MAY",
    day: "03",
    time: "09:30 AM - 05:00 PM",
    venue: "Lab Complex - Block B",
    image: "/photo/3.jpg",
    description: "A hands-on coding marathon. Bring your laptops, collaborate with peers, and make your first open-source contributions to real-world blockchain projects.",
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-4 h-4"}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-4 h-4"}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function UpcomingEventsPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Clean, fast entrance animation (No scrolling required)
  useEffect(() => {
    if (!gridRef.current) return;

    import("gsap").then(({ gsap }) => {
      const cards = gridRef.current?.querySelectorAll("article");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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
      title="Upcoming Events"
      subtitle="Explore upcoming department events, workshops, and seminars. Register early to secure your spot."
    >
      <div className="max-w-7xl mx-auto py-4 sm:py-8">
        
        {/* Department Title Header */}
        <div className="mb-10 flex flex-col items-center text-center bg-slate-50/50 p-6 rounded-3xl border border-slate-200/60 shadow-sm">
          <h2 className="text-sm md:text-base font-bold uppercase tracking-widest text-sky-600 mb-2">
            Dept of Computer Science & Engineering
          </h2>
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200">
            <p className="text-xs sm:text-sm font-semibold text-slate-700 tracking-wide">
              (Internet of Things, Cyber Security and Blockchain Technology)
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <section 
          ref={gridRef}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {UPCOMING_EVENTS.map((event) => (
            <article 
              key={event.id} 
              className="group flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-sky-300 transition-all duration-300 overflow-hidden"
              style={{ willChange: "transform, opacity", opacity: 0 }} // opacity 0 for GSAP
            >
              {/* Image Header Area */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                
                {/* Subtle gradient to make the image pop */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating Date Badge (Eventbrite Style) */}
                <div className="absolute top-4 right-4 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-100 shadow-lg transform group-hover:-translate-y-1 transition-transform duration-300">
                  <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-0.5">{event.month}</span>
                  <span className="text-2xl font-black leading-none text-slate-900">{event.day}</span>
                </div>
              </div>

              {/* Text Content Area */}
              <div className="flex flex-col flex-1 p-6 sm:p-7">
                
                {/* Title */}
                <h3 
                  className="text-xl font-bold text-slate-900 leading-snug mb-3 group-hover:text-sky-600 transition-colors line-clamp-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {event.name}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {event.description}
                </p>

                {/* Meta Details (Time & Venue) */}
                <div className="mt-auto space-y-3 pt-5 border-t border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex items-center justify-center w-6 h-6 rounded-md bg-sky-50 text-sky-600 shrink-0">
                      <ClockIcon />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Time</span>
                      <span className="text-sm font-semibold text-slate-700">{event.time}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex items-center justify-center w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 shrink-0">
                      <MapPinIcon />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Venue</span>
                      <span className="text-sm font-semibold text-slate-700 truncate">{event.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Call to Action Button */}
                <button className="mt-8 w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-sky-600 hover:shadow-md active:scale-[0.98]">
                  Register Now
                </button>

              </div>
            </article>
          ))}
        </section>

      </div>
    </DepartmentPage>
  );
}