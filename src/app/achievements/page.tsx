"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DepartmentPage from "@/components/site/DepartmentPage";

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
    title: "IndiaAI Impact Summit 2026",
    category: "AI Challenge",
    date: "2026",
    member: "IEM-UEM Teams",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1774099272/iot/4c5adcf5-81ae-45d4-a989-71dd48f6b1aa_de6560.png",
    description: "IEM-UEM teams won top honors at the YUVAi Global Challenge at Bharat Mandapam.",
  },
  {
    id: "a2",
    title: "Hackathon Winner",
    category: "JPMorgan Chase CFG 2025 - Social Impact",
    date: "2025",
    member: "Team FootPathshala",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1774104001/iot/08182265-1d07-4b60-ac81-72aed66b0956.png",
    description: "Built award-winning solutions like FootPathshala at JPMorgan Chase Code for Good 2025 with geo-tagged face attendance, ML-powered assessments, real-time dashboards, and scalable automation.",
  },
  {
    id: "a3",
    title: "Aegis Graham Bell Award Finalist",
    category: "Innovation in RPA - Govt. of India Supported",
    date: "Feb 2025",
    member: "Apurba Nandi, Avik Kumar Das, Sandip Mandal, Arijeet Ghosh",
    image: "/img2.png",
    description:
      "Project AquaSmartIQ, a smart aquaculture monitoring platform using IoT and AI, was recognized with UEM as a finalist under the Innovation in RPA category. Dr. Sandip Mandal received the recognition in the presence of Hon'ble Minister Shri Jitin Prasada, Union Minister of State for Commerce and Industry, and Electronics and Information Technology, Government of India.",
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
    id: "a5",
    title: "SATYAMEBA Supercomputing Initiative",
    category: "UEM Kolkata - HPC and AI Research",
    date: "2025",
    member: "Students, Faculty and Leadership",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1774103669/iot/e7aa4373-5920-499d-af38-7d109e14ecef.png",
    description: "Showcasing the SATYAMEBA 2025 initiative, a collaborative effort to advance AI acceleration, multi-GPU architectures, and high-performance computing for next-generation research.",
  },
  {
    id: "a6",
    title: "AI for Smart Mining",
    category: "CMPDI Hackathon 2025 - Runner-Up",
    date: "2025",
    member: "CMPDI Hackathon Team",
    image: "https://res.cloudinary.com/dvky83edw/image/upload/v1774103610/iot/2839f291-11e1-47bf-bf72-c56c2bc3b861.png",
    description: "Awarded Runner-Up at the Ministry of Coal CMPDI R and D Hackathon 2025 for an intelligent monitoring and control system for ventilation and fire safety in underground coal mines.",
  },
  {
    id: "a7",
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

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-5 h-5"}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Achievement Modal ────────────────────────────────────────────────────────
function AchievementModal({
  item,
  onClose,
}: {
  item: Achievement;
  onClose: () => void;
}) {
  // Close on backdrop click
  const backdropRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl animate-in zoom-in-95 fade-in duration-300">
        
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-t-3xl bg-slate-900 shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover opacity-90"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-full bg-slate-950/50 backdrop-blur-md border border-white/10 text-white hover:bg-slate-950/80 transition-colors"
            aria-label="Close modal"
          >
            <XIcon className="w-4 h-4" />
          </button>

          {/* Category badge on image */}
          <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-sky-300">
            <TrophyIcon className="w-4 h-4 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider">{item.category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Title */}
          <h2
            className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {item.title}
          </h2>

          {/* Meta row */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 px-4 py-2 rounded-full text-sky-700">
              <CalendarIcon className="w-4 h-4" />
              <span className="text-sm font-semibold">{item.date}</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full text-slate-700">
              <UserIcon className="w-4 h-4" />
              <span className="text-sm font-semibold">{item.member}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-100 mb-6" />

          {/* Description */}
          <p className="text-base text-slate-600 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Bento Card ───────────────────────────────────────────────────────────────
function BentoCard({
  item,
  showDescription = true,
  className = "",
  onClick,
}: {
  item: Achievement;
  showDescription?: boolean;
  className?: string;
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl bg-slate-900 shadow-sm cursor-pointer
        transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-sky-400/50
        ${className}`}
      style={{ willChange: "transform, opacity", opacity: 0 }}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-75 group-hover:opacity-95"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

      {/* Click hint */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 text-white text-[10px] font-semibold tracking-wide">
        View Details →
      </div>

      {/* Top badges */}
      <div className="absolute top-4 left-4 right-28 flex items-start">
        <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-sky-300 shadow-sm max-w-full">
          <TrophyIcon />
          <span className="text-[10px] font-bold uppercase tracking-wider truncate">{item.category}</span>
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
        <div className="mb-2 inline-flex items-center gap-1.5 w-fit rounded-full bg-sky-500/20 backdrop-blur-md border border-sky-400/30 px-3 py-1 text-xs font-semibold text-sky-100">
          <UserIcon />
          <span className="truncate max-w-[200px]">{item.member}</span>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h2
              className="font-bold text-white leading-tight mb-2 text-lg md:text-xl lg:text-2xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item.title}
            </h2>
            {showDescription && (
              <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            )}
            {!showDescription && (
              <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500">
                <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">{item.description}</p>
              </div>
            )}
          </div>
          <div className="shrink-0 inline-flex items-center gap-1.5 bg-slate-950/50 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-slate-200 self-end">
            <CalendarIcon />
            <span className="text-[10px] font-semibold tracking-wide">{item.date}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AchievementsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<Achievement | null>(null);

  const bentoAchievements = ACHIEVEMENTS.slice(0, 5);
  const remainingAchievements = ACHIEVEMENTS.slice(5);

  useEffect(() => {
    if (!containerRef.current) return;
    import("gsap").then(({ gsap }) => {
      const cards = containerRef.current?.querySelectorAll("article");
      if (!cards || cards.length === 0) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 25, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07, ease: "power2.out", force3D: true }
      );
    });
  }, []);

  return (
    <DepartmentPage
      title="Hall of Fame"
      subtitle="Celebrating our top milestones, awards, and breakthroughs in academics, innovation, and research excellence."
    >
      <div className="max-w-7xl mx-auto py-8 px-4" ref={containerRef}>

        {/* =============================================
            BENTO GRID — 5 items
            Row unit = 110px (increased from 80px)

            Desktop layout (4 cols × 10 rows):
              [0] col-span-2 row-span-4  → left tall    (rows 1-4,  ~440px)
              [1] col-span-2 row-span-2  → top-right    (rows 1-2,  ~220px)
              [2] col-span-2 row-span-4  → right tall   (rows 3-6,  ~440px)
              [3] col-span-2 row-span-2  → bottom-left  (rows 5-6,  ~220px)
              [4] col-span-4 row-span-4  → full banner  (rows 7-10, ~440px)

            Total height ≈ 1100px + 4×gap(20px) = ~1180px
        ============================================= */}
        <section
          className="
            mb-16
            grid grid-cols-1 gap-4
            md:grid-cols-2 md:gap-5
            lg:grid-cols-4
            lg:grid-rows-[repeat(10,110px)]
            lg:gap-5
          "
        >
          {/* Card 0 — Left tall square: rows 1-4 */}
          <BentoCard
            item={bentoAchievements[0]}
            showDescription
            onClick={() => setSelectedItem(bentoAchievements[0])}
            className="
              min-h-[320px]
              md:col-span-1
              lg:col-span-2 lg:row-span-4 lg:col-start-1 lg:row-start-1 lg:min-h-0
            "
          />

          {/* Card 1 — Top-right short: rows 1-2 */}
          <BentoCard
            item={bentoAchievements[1]}
            showDescription={false}
            onClick={() => setSelectedItem(bentoAchievements[1])}
            className="
              min-h-[220px]
              md:col-span-1
              lg:col-span-2 lg:row-span-2 lg:col-start-3 lg:row-start-1 lg:min-h-0
            "
          />

          {/* Card 2 — Right tall square: rows 3-6 */}
          <BentoCard
            item={bentoAchievements[2]}
            showDescription
            onClick={() => setSelectedItem(bentoAchievements[2])}
            className="
              min-h-[320px]
              md:col-span-1
              lg:col-span-2 lg:row-span-4 lg:col-start-3 lg:row-start-3 lg:min-h-0
            "
          />

          {/* Card 3 — Bottom-left short: rows 5-6 */}
          <BentoCard
            item={bentoAchievements[3]}
            showDescription={false}
            onClick={() => setSelectedItem(bentoAchievements[3])}
            className="
              min-h-[220px]
              md:col-span-1
              lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-5 lg:min-h-0
            "
          />

          {/* Card 4 — Full-width banner: rows 7-10 */}
          <BentoCard
            item={bentoAchievements[4]}
            showDescription
            onClick={() => setSelectedItem(bentoAchievements[4])}
            className="
              min-h-[340px]
              md:col-span-2
              lg:col-span-4 lg:row-span-4 lg:col-start-1 lg:row-start-7 lg:min-h-0
            "
          />
        </section>

        {/* =============================================
            STANDARD GRID — remaining items
        ============================================= */}
        {remainingAchievements.length > 0 && (
          <>
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">More Achievements</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200" />
            </div>

            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {remainingAchievements.map((item) => (
                <article
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm
                    hover:shadow-xl hover:border-sky-300 hover:-translate-y-1 cursor-pointer
                    transition-all duration-300 overflow-hidden"
                  style={{ willChange: "transform, opacity", opacity: 0 }}
                >
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm text-sky-700">
                      <TrophyIcon className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">{item.category}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-slate-100">
                      <CalendarIcon className="w-4 h-4 text-sky-400" />
                      <span className="text-sm font-medium tracking-wide drop-shadow-md">{item.date}</span>
                    </div>
                    {/* View hint */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-slate-950/60 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full border border-white/20">
                        View Details →
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    <h2
                      className="text-xl font-bold text-slate-900 leading-snug mb-3 group-hover:text-sky-600 transition-colors line-clamp-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">{item.description}</p>
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
          </>
        )}
      </div>

      {/* ── Modal ── */}
      {selectedItem && (
        <AchievementModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </DepartmentPage>
  );
}