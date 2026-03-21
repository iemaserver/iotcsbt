"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import DepartmentPage from "@/components/site/DepartmentPage";

// ─── Expanded Data ────────────────────────────────────────────────────────────
const GUEST_LECTURES = [
  {
    id: "gl1",
    speakerName: "Mr. Harish Menon",
    topic: "Scaling Cloud Native Systems",
    date: "March 04, 2026",
    designation: "Principal Architect, CloudNine Labs",
    photo: "/photo/2.jpg",
    description: "An in-depth session on orchestrating microservices, handling high traffic loads, and implementing Kubernetes in production environments.",
  },
  {
    id: "gl2",
    speakerName: "Dr. Leena Iyer",
    topic: "Applied Cryptography in FinTech",
    date: "February 12, 2026",
    designation: "Research Director, SecureNet Research",
    photo: "/photo/3.jpg",
    description: "Exploring the mathematical foundations of modern encryption algorithms used to secure digital transactions and blockchain wallets.",
  },
  {
    id: "gl3",
    speakerName: "Ms. Ananya Das",
    topic: "Designing for Accessibility (a11y)",
    date: "January 28, 2026",
    designation: "Lead UX Engineer, Global Tech",
    photo: "/photo/4.jpg",
    description: "A practical guide to building inclusive web applications that comply with WCAG standards and provide a seamless experience for all users.",
  },
  {
    id: "gl4",
    speakerName: "Mr. Rohan Chatterjee",
    topic: "The Future of Quantum Machine Learning",
    date: "December 15, 2025",
    designation: "Senior Data Scientist, Qubit Core",
    photo: "/photo/5.jpg",
    description: "An introductory lecture bridging the gap between quantum mechanics and traditional neural networks, showcasing potential industry breakthroughs.",
  },
];

// ─── Minimal Icons ────────────────────────────────────────────────────────────
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

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-3.5 h-3.5"}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function MicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-3.5 h-3.5"}>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GuestLecturesPage() {
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
      title="Guest Lectures"
      subtitle="Distinguished talks by domain experts to expose students to real-world engineering challenges and trends."
    >
      <div className="max-w-7xl mx-auto py-8">
        
        {/* 2-Column Grid applied at md screen size */}
        <section 
          ref={gridRef}
          className="grid gap-6 md:grid-cols-2 lg:gap-8"
        >
          {GUEST_LECTURES.map((lecture) => (
            <article 
              key={lecture.id} 
              className="group flex flex-col sm:flex-row bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-300 overflow-hidden"
              style={{ willChange: "transform, opacity", opacity: 0 }}
            >
              {/* Image Section - Scaled specifically for a 2-column fit */}
              <div className="relative h-48 sm:h-auto sm:w-48 lg:w-62 shrink-0 overflow-hidden bg-slate-100">
                <Image
                  src={lecture.photo}
                  alt={lecture.speakerName}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                  sizes="(max-width: 640px) 100vw, 192px"
                />
                
                {/* Subtle gradient to blend image and text edge */}
                <div className="hidden sm:block absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-1 p-5 lg:p-6">
                
                {/* Speaker Name */}
                <h2 
                  className="text-lg lg:text-xl font-bold text-slate-900 leading-tight mb-1 group-hover:text-sky-600 transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {lecture.speakerName}
                </h2>
                
                {/* Designation */}
                <div className="flex items-center gap-1.5 text-slate-500 mb-4">
                  <BriefcaseIcon />
                  <span className="text-xs lg:text-sm font-medium line-clamp-1">{lecture.designation}</span>
                </div>

                {/* Topic Highlight Box */}
                <div className="flex items-start gap-2 bg-sky-50/80 border border-sky-100/50 rounded-xl p-2.5 mb-4">
                  <div className="mt-0.5 text-sky-500 shrink-0">
                    <MicIcon />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 mb-0.5">Topic</span>
                    <span className="text-xs lg:text-sm font-semibold text-slate-800 line-clamp-1">{lecture.topic}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs lg:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-2">
                  {lecture.description}
                </p>

                {/* Date Footer */}
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 text-slate-500 border border-slate-100 shrink-0">
                    <CalendarIcon />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 tracking-wide uppercase">
                    {lecture.date}
                  </span>
                </div>

              </div>
            </article>
          ))}
        </section>

      </div>
    </DepartmentPage>
  );
}