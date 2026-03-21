"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import DepartmentPage from "@/components/site/DepartmentPage";

// ─── Data Schema & 20 Mock Items ──────────────────────────────────────────────
type GalleryItem = {
  id: number;
  title: string;
  type: "Events" | "Labs" | "Campus" | "Achievements";
  media: "Photo" | "Video";
  src: string;
};

const ITEMS: GalleryItem[] = [
  { id: 1, title: "Tech Fest Highlights", type: "Events", media: "Photo", src: "/photo/1.jpg" },
  { id: 2, title: "Advanced IoT Lab", type: "Labs", media: "Video", src: "/photo/2.jpg" },
  { id: 3, title: "Main Campus Building", type: "Campus", media: "Photo", src: "/photo/3.jpg" },
  { id: 4, title: "Hackathon Winners", type: "Achievements", media: "Photo", src: "/photo/4.jpg" },
  { id: 5, title: "Guest Lecture Series", type: "Events", media: "Video", src: "/photo/5.jpg" },
  { id: 6, title: "Cyber Security Simulation", type: "Labs", media: "Photo", src: "/photo/1.jpg" },
  { id: 7, title: "Annual Sports Meet", type: "Events", media: "Photo", src: "/photo/2.jpg" },
  { id: 8, title: "Best Innovator Award", type: "Achievements", media: "Photo", src: "/photo/3.jpg" },
  { id: 9, title: "Robotics Workshop", type: "Labs", media: "Photo", src: "/photo/4.jpg" },
  { id: 10, title: "Library Architecture", type: "Campus", media: "Photo", src: "/photo/5.jpg" },
  { id: 11, title: "Alumni Meet 2025", type: "Events", media: "Photo", src: "/photo/1.jpg" },
  { id: 12, title: "Drone Testing Field", type: "Labs", media: "Video", src: "/photo/2.jpg" },
  { id: 13, title: "Research Grant Received", type: "Achievements", media: "Photo", src: "/photo/3.jpg" },
  { id: 14, title: "Spring Fest Concert", type: "Events", media: "Photo", src: "/photo/4.jpg" },
  { id: 15, title: "Student Cafeteria", type: "Campus", media: "Photo", src: "/photo/5.jpg" },
  { id: 16, title: "Blockchain Hackathon", type: "Events", media: "Video", src: "/photo/1.jpg" },
  { id: 17, title: "Smart City Model", type: "Labs", media: "Photo", src: "/photo/2.jpg" },
  { id: 18, title: "National Level Coding Gold", type: "Achievements", media: "Photo", src: "/photo/3.jpg" },
  { id: 19, title: "Green Campus Initiative", type: "Campus", media: "Photo", src: "/photo/4.jpg" },
  { id: 20, title: "VR/AR Lab Setup", type: "Labs", media: "Video", src: "/photo/5.jpg" },
];

const FILTERS = ["All", "Events", "Labs", "Campus", "Achievements"] as const;
type FilterValue = (typeof FILTERS)[number];

// ─── Icons ────────────────────────────────────────────────────────────────────
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "w-4 h-4"}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-4 h-4"}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-6 h-6"}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── NEW: "Mosaic" Bento Grid Logic ───────────────────────────────────────────
// This pattern is completely different from the Achievements page. 
// It groups images into distinct visual "zones" (e.g., a massive center image flanked by tall portraits).
const getMosaicSpanClasses = (index: number) => {
  const spans = [
    // Block A: Left Heavy
    "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2", // 0: Large Square
    "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", // 1: Small
    "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", // 2: Small
    "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", // 3: Small
    "md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1", // 4: Small
    
    // Block B: Center Heavy (Flanked by portraits)
    "md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2", // 5: Tall Portrait Left
    "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2", // 6: Center Huge Focus
    "md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2", // 7: Tall Portrait Right
    
    // Block C: Panoramas
    "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1", // 8: Wide Landscape
    "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1", // 9: Wide Landscape
  ];
  return spans[index % spans.length]; // Repeats seamlessly for any number of images
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [filter, setFilter] = useState<FilterValue>("All");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(
    () => (filter === "All" ? ITEMS : ITEMS.filter((item) => item.type === filter)),
    [filter],
  );

  // GSAP Animation whenever the filter changes
  useEffect(() => {
    if (!gridRef.current) return;

    import("gsap").then(({ gsap }) => {
      const cards = gridRef.current?.children;
      if (!cards || cards.length === 0) return;

      gsap.killTweensOf(cards);
      
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.03, // Rapid pop-in
          ease: "back.out(1.5)",
          force3D: true,
        }
      );
    });
  }, [filteredItems]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [lightboxItem]);

  return (
    <DepartmentPage
      title="Department Gallery"
      subtitle="A curated visual wall capturing our events, state-of-the-art labs, campus life, and top achievements."
    >
      <div className="max-w-7xl mx-auto py-8">
        
        {/* Filter Navigation */}
        <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3 bg-white p-2 sm:p-3 rounded-full border border-slate-200 shadow-sm w-fit mx-auto">
          {FILTERS.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-300 ${
                filter === option 
                  ? "bg-slate-900 text-white shadow-md scale-105" 
                  : "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Mosaic Grid Container */}
        <section 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[220px] md:auto-rows-[260px] grid-flow-dense"
        >
          {filteredItems.map((item, index) => {
            const mosaicClasses = getMosaicSpanClasses(index);
            const isLarge = mosaicClasses.includes("row-span-2") || mosaicClasses.includes("col-span-2");

            return (
              <article 
                key={item.id} 
                onClick={() => setLightboxItem(item)}
                className={`group relative overflow-hidden rounded-2xl md:rounded-3xl bg-slate-900 shadow-sm transition-all duration-500 hover:shadow-2xl hover:z-10 hover:scale-[1.02] cursor-zoom-in ${mosaicClasses}`}
                style={{ willChange: "transform, opacity", opacity: 0 }} 
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Media Icon Badge (Top Right) */}
                <div className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-slate-900/50 backdrop-blur-md text-white border border-white/20 shadow-sm">
                  {item.media === "Video" ? <PlayIcon className="ml-0.5 w-3.5 h-3.5" /> : <CameraIcon className="w-3.5 h-3.5" />}
                </div>

                {/* Hover Darkening Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Hover Content (Bottom Left) */}
                <div className="absolute inset-x-0 bottom-0 p-5 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 mb-1">
                    {item.type}
                  </span>
                  <h2 
                    className={`font-bold text-white leading-tight ${isLarge ? 'text-xl md:text-2xl' : 'text-base'}`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.title}
                  </h2>
                </div>
              </article>
            );
          })}
        </section>

        {/* Fullscreen Lightbox Modal */}
        {lightboxItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-300">
            
            <button 
              onClick={() => setLightboxItem(null)}
              className="absolute top-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all border border-white/10"
            >
              <CloseIcon />
            </button>

            <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center">
              
              <div className="relative w-full h-[65vh] sm:h-[80vh] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-slate-900">
                <Image
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  fill
                  className="object-contain" 
                  sizes="100vw"
                  priority 
                />
              </div>

              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sky-300 text-xs font-bold uppercase tracking-widest mb-3">
                  {lightboxItem.media === "Video" ? <PlayIcon className="w-3 h-3" /> : <CameraIcon className="w-3 h-3" />}
                  {lightboxItem.type}
                </div>
                <h2 
                  className="text-2xl sm:text-3xl font-bold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {lightboxItem.title}
                </h2>
              </div>

            </div>
          </div>
        )}

      </div>
    </DepartmentPage>
  );
}