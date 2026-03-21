"use client";

import { useEffect, useRef, useState } from "react";
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

type GallerySeed = Omit<GalleryItem, "id">;

const TYPE_ROTATION: GalleryItem["type"][] = [
  "Events",
  "Labs",
  "Campus",
  "Achievements",
];

const formatTitleFromPath = (src: string) => {
  const name = src.split("/").pop() ?? src;
  const base = name
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .trim();
  return base.length > 0 ? base : "Gallery Image";
};

const LOCAL_IMAGE_PATHS = [
  "/about/1.jpg",
  "/photo/1.jpg",
  "/photo/10.jpg",
  "/photo/13.JPG",
  "/photo/11.JPG",
  "/photo/12.JPG",
  "/photo/2.jpg",
  "/photo/4.jpg",
  "/photo/16.JPG",
  "/photo/15.JPG",
  "/photo/3.jpg",
  "/photo/14.JPG",

  "/photo/5.jpg",
  "/photo/6.jpg",
  "/photo/7.jpg",
  "/photo/hod.jpg",
] as const;

const CLOUDINARY_ITEMS: GallerySeed[] = [
  {
    title: "IndiaAI Impact Summit 2026",
    type: "Achievements",
    media: "Photo",
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1774099272/iot/4c5adcf5-81ae-45d4-a989-71dd48f6b1aa_de6560.png",
  },
  {
    title: "SIH 2025 Grand Finale",
    type: "Achievements",
    media: "Photo",
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1774099485/iot/630b65d2-c9eb-46dc-81a0-afde5664f0ee.png",
  },
  {
    title: "Global Academic Interaction",
    type: "Events",
    media: "Photo",
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1774099669/iot/ef5a4cbd-e5a5-4625-8e82-f896a8d1e135.png",
  },
  {
    title: "Faculty Student Interaction",
    type: "Campus",
    media: "Photo",
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1774099779/iot/941bed0c-6fac-43e1-9d20-afdc8ea9a1ea.png",
  },

  {
    title: "Industry Leadership Visit",
    type: "Events",
    media: "Photo",
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1774100086/iot/d878d790-3212-43bc-9bd7-e9cdb63c370b.png",
  },
  {
    title: "AI and Supercomputing Innovation",
    type: "Labs",
    media: "Photo",
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1774099839/iot/6be548f0-60d7-4556-a311-20d28ee10539.png",
  },

  {
    title: "Hackathon Winner",
    type: "Achievements",
    media: "Photo",
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1774104001/iot/08182265-1d07-4b60-ac81-72aed66b0956.png",
  },
  {
    title: "SATYAMEBA Supercomputing Initiative",
    type: "Labs",
    media: "Photo",
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1774103669/iot/e7aa4373-5920-499d-af38-7d109e14ecef.png",
  },
  {
    title: "AI for Smart Mining",
    type: "Labs",
    media: "Photo",
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1774103610/iot/2839f291-11e1-47bf-bf72-c56c2bc3b861.png",
  },
  {
    title: "KrishiDhan AI System",
    type: "Labs",
    media: "Photo",
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1774103994/iot/849c54cf-aa80-43bb-aa47-c488c063c8e3.png",
  },
  {
    title: "CtrlS Datacenter Visit",
    type: "Campus",
    media: "Photo",
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1774103581/iot/bd4c75a6-78e5-42f7-90ab-4627e10f9eef.png",
  },
  {
    title: "Hero Background Showcase",
    type: "Campus",
    media: "Photo",
    src: "https://res.cloudinary.com/dvky83edw/image/upload/v1774068989/iot/i6fesgigd7mcwixnsu8n.jpg",
  },
];

const ITEMS: GalleryItem[] = [
  ...LOCAL_IMAGE_PATHS.map((src, index) => ({
    id: index + 1,
    title: formatTitleFromPath(src),
    type: src.startsWith("/about/")
      ? "Campus"
      : TYPE_ROTATION[index % TYPE_ROTATION.length],
    media: "Photo" as const,
    src,
  })),
  ...CLOUDINARY_ITEMS.map((item, index) => ({
    id: LOCAL_IMAGE_PATHS.length + index + 1,
    ...item,
  })),
];

// ─── Icons ────────────────────────────────────────────────────────────────────
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "w-6 h-6"}
    >
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
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
        },
      );
    });
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxItem]);

  return (
    <DepartmentPage
      title="Department Gallery"
      subtitle="A curated visual wall capturing our events, state-of-the-art labs, campus life, and top achievements."
    >
      <div className="max-w-7xl mx-auto py-8">
        {/* Mosaic Grid Container */}
        <section
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[220px] md:auto-rows-[260px] grid-flow-dense"
        >
          {ITEMS.map((item, index) => {
            const mosaicClasses = getMosaicSpanClasses(index);

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
              </article>
            );
          })}
        </section>

        {/* Fullscreen Lightbox Modal */}
        {lightboxItem && (
          <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-300">
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
            </div>
          </div>
        )}
      </div>
    </DepartmentPage>
  );
}
