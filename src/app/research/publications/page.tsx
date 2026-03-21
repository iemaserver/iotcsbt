"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import DepartmentPage from "@/components/site/DepartmentPage";

// ─── Types & Data ─────────────────────────────────────────────────────────────
type Publication = {
  id: string;
  title: string;
  kind: "Journal Papers" | "Conference Papers" | "Book Chapters";
  year: number;
  image: string;
  description: string;
  link: string;
};

// Expanded dummy data (12 items) to test search, filter, and pagination
const PUBLICATIONS: Publication[] = [
  {
    id: "pub1",
    title: "Efficient Lightweight Encryption for Smart Devices",
    kind: "Journal Papers",
    year: 2026,
    image: "/photo/1.jpg",
    description: "Proposes a novel, low-latency cryptographic algorithm specifically designed for resource-constrained IoT edge nodes, reducing power consumption by 34%.",
    link: "#",
  },
  {
    id: "pub2",
    title: "Explainable Intrusion Detection using Hybrid Models",
    kind: "Conference Papers",
    year: 2025,
    image: "/photo/2.jpg",
    description: "Combines deep learning with decision trees to provide transparent and explainable network anomaly detection for enterprise campus networks.",
    link: "#",
  },
  {
    id: "pub3",
    title: "Decentralized Trust for Edge Networks",
    kind: "Journal Papers",
    year: 2024,
    image: "/photo/3.jpg",
    description: "A comprehensive framework utilizing blockchain ledgers to establish peer-to-peer trust among ad-hoc edge computing clusters.",
    link: "#",
  },
  {
    id: "pub4",
    title: "Chapter: Secure IoT-by-Design Patterns",
    kind: "Book Chapters",
    year: 2026,
    image: "/photo/4.jpg",
    description: "An extensive book chapter detailing foundational software architecture patterns that inherently resist common IoT hardware vulnerabilities.",
    link: "#",
  },
  {
    id: "pub5",
    title: "Adaptive Scheduling in Campus Compute Grids",
    kind: "Conference Papers",
    year: 2023,
    image: "/photo/5.jpg",
    description: "Introduces an adaptive heuristic for scheduling parallel computing tasks across distributed university laboratory computers during off-hours.",
    link: "#",
  },
  {
    id: "pub6",
    title: "Quantum-Resistant Key Exchange in 5G",
    kind: "Journal Papers",
    year: 2026,
    image: "/photo/1.jpg",
    description: "Evaluating the performance overhead of lattice-based cryptography when integrated into existing 5G telecommunication handshakes.",
    link: "#",
  },
  {
    id: "pub7",
    title: "Federated Learning for Healthcare Wearables",
    kind: "Conference Papers",
    year: 2025,
    image: "/photo/2.jpg",
    description: "Demonstrates a privacy-preserving machine learning pipeline where patient data never leaves the wearable device while still improving the global model.",
    link: "#",
  },
  {
    id: "pub8",
    title: "Chapter: AI in Automated Code Review",
    kind: "Book Chapters",
    year: 2024,
    image: "/photo/3.jpg",
    description: "Explores the evolution of static analysis tools augmented by Large Language Models to detect logical bugs and security flaws.",
    link: "#",
  },
  {
    id: "pub9",
    title: "Optimizing Graph Neural Networks on Edge GPUs",
    kind: "Journal Papers",
    year: 2025,
    image: "/photo/4.jpg",
    description: "A hardware-aware compilation strategy that reduces memory bottlenecks when running complex GNNs on mobile-grade GPUs.",
    link: "#",
  },
  {
    id: "pub10",
    title: "Smart Contract Vulnerability Scanner",
    kind: "Conference Papers",
    year: 2024,
    image: "/photo/5.jpg",
    description: "A novel automated tool combining symbolic execution and fuzzing to proactively identify reentrancy attacks in Ethereum smart contracts.",
    link: "#",
  },
  {
    id: "pub11",
    title: "Energy-Harvesting WSN Routing Protocols",
    kind: "Journal Papers",
    year: 2023,
    image: "/photo/1.jpg",
    description: "Analyzes routing efficiency in Wireless Sensor Networks powered by ambient energy harvesting, proposing a battery-aware pathing metric.",
    link: "#",
  },
  {
    id: "pub12",
    title: "Chapter: The Future of Spatial Computing",
    kind: "Book Chapters",
    year: 2026,
    image: "/photo/2.jpg",
    description: "Discusses the intersection of AR/VR, edge computing, and real-time object detection in shaping next-generation user interfaces.",
    link: "#",
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-5 h-5"}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-3 h-3"}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function TypeIcon({ kind, className }: { kind: Publication["kind"]; className?: string }) {
  if (kind === "Journal Papers") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-3.5 h-3.5"}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    );
  }
  if (kind === "Conference Papers") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-3.5 h-3.5"}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-3.5 h-3.5"}>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PublicationsPage() {
  const ITEMS_PER_PAGE = 10;
  
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  // Extract unique sorted years
  const availableYears = useMemo(() => {
    return Array.from(new Set(PUBLICATIONS.map((pub) => pub.year))).sort((a, b) => b - a);
  }, []);

  // Filter by both Search Query AND Year
  const filteredPublications = useMemo(() => {
    return PUBLICATIONS.filter((pub) => {
      const matchesSearch = 
        !searchQuery.trim() || 
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.kind.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesYear = yearFilter === "all" || pub.year === Number(yearFilter);

      return matchesSearch && matchesYear;
    });
  }, [searchQuery, yearFilter]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, yearFilter]);

  // Pagination Math
  const totalPages = Math.ceil(filteredPublications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPublications = filteredPublications.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // ─── Clean GSAP Entrance (Fade & Pop) ───────────────────────────────────────
  useEffect(() => {
    if (!gridRef.current || currentPublications.length === 0) return;

    import("gsap").then(({ gsap }) => {
      const cards = gridRef.current?.children;
      if (!cards) return;

      gsap.killTweensOf(cards);
      
      gsap.set(cards, { opacity: 0, y: 15, scale: 0.98 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.05, 
        ease: "power2.out",
        force3D: true, 
      });
    });
  }, [currentPage, filteredPublications]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <DepartmentPage
      title="Publications"
      subtitle="Journal papers, conference papers, and book chapters published by our faculty and research scholars."
    >
      <div className="max-w-7xl mx-auto py-8">
        
        {/* Controls Strip (Search + Year Filter) */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          
          <div className="flex items-center gap-3 px-2 w-full lg:w-auto">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0"></span>
            <p className="text-sm font-semibold text-slate-700 whitespace-nowrap">
              Papers: <span className="text-sky-600">{filteredPublications.length}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 flex-1 lg:justify-end">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search titles, abstracts, or types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
              />
            </div>

            {/* Year Dropdown */}
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full sm:w-40 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all cursor-pointer"
            >
              <option value="all">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Publications Grid */}
        {filteredPublications.length > 0 ? (
          <section 
            ref={gridRef} 
            className="grid gap-6 sm:grid-cols-1 xl:grid-cols-2"
          >
            {currentPublications.map((pub) => (
              <article 
                key={pub.id} 
                className="group flex flex-col sm:flex-row bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Image Section */}
                <div className="relative h-48 sm:h-auto sm:w-64 shrink-0 overflow-hidden bg-slate-100">
                  <Image
                    src={pub.image}
                    alt={pub.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 700px) 100vw, 192px"
                  />
                  {/* Subtle year overlay on image */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/20 shadow-sm text-xs font-bold text-slate-800">
                    {pub.year}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  {/* Kind Badge */}
                  <div className="flex items-center gap-1.5 w-fit px-2.5 py-1 mb-3 rounded-md bg-sky-50 text-sky-700 border border-sky-100">
                    <TypeIcon kind={pub.kind} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{pub.kind}</span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 mb-3 leading-tight group-hover:text-sky-600 transition-colors">
                    {pub.title}
                  </h2>
                  
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-5">
                    {pub.description}
                  </p>

                  {/* Actions / Outbound Link */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors group/link"
                    >
                      Read Publication
                      <LinkIcon className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 size-6" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <SearchIcon className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-2">No publications found</h3>
            <p className="text-sm text-slate-500 max-w-sm">
              We couldn&apos;t find anything matching your filters.
            </p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setYearFilter("all");
              }}
              className="mt-6 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-sky-600 hover:bg-sky-50 transition-colors shadow-sm"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold transition-all shadow-sm ${
                  currentPage === i + 1 
                  ? "bg-sky-600 text-white border border-sky-600" 
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-sky-50 hover:text-sky-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </DepartmentPage>
  );
}