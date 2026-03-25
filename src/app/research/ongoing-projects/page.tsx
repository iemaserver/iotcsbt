"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import DepartmentPage from "@/components/site/DepartmentPage";
import {
  RESEARCH_ITEMS,
  isOngoingItem,
  type ResearchItem,
} from "@/app/research/researchData";

function statusChipTone(status: ResearchItem["status"]) {
  if (status === "Accepted for Publication") {
    return "bg-sky-50 text-sky-700 border-sky-200";
  }
  if (status === "Accepted") {
    return "bg-indigo-50 text-indigo-700 border-indigo-200";
  }
  if (status === "In Press") {
    return "bg-violet-50 text-violet-700 border-violet-200";
  }
  if (status === "Proposal Accepted") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }
  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}

export default function OngoingProjectsPage() {
  const ITEMS_PER_PAGE = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const ongoingItems = useMemo(
    () => RESEARCH_ITEMS.filter((item) => isOngoingItem(item)),
    [],
  );

  const availableCategories = useMemo(() => {
    return Array.from(new Set(ongoingItems.map((item) => item.category))).sort();
  }, [ongoingItems]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim() && categoryFilter === "all") return ongoingItems;
    const query = searchQuery.toLowerCase();
    return ongoingItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.venue.toLowerCase().includes(query) ||
        item.authors.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [categoryFilter, ongoingItems, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // ─── Clean GSAP Entrance (No Scroll) ───────────────────────────────────────
  useEffect(() => {
    if (!gridRef.current || currentProjects.length === 0) return;

    import("gsap").then(({ gsap }) => {
      const cards = gridRef.current?.children;
      if (!cards) return;

      gsap.killTweensOf(cards);
      
      // Set initial state (invisible and slightly down)
      gsap.set(cards, { opacity: 0, y: 15, scale: 0.98 });

      // Animate in with a professional stagger
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.05, // 50ms delay between each card for a "wave" effect
        ease: "power2.out",
        force3D: true, // Hardware acceleration
      });
    });
  }, [currentPage, filteredProjects, currentProjects.length]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <DepartmentPage
      title="Ongoing Projects"
      subtitle="Accepted, in-press, and proposal-stage research work currently progressing through publication pipelines."
    >
      <div className="max-w-7xl mx-auto py-8">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 px-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0"></span>
            <p className="text-sm font-semibold text-slate-700">
              Projects: <span className="text-sky-600">{filteredProjects.length}</span>
            </p>
          </div>

          <div className="flex w-full md:w-auto gap-3 flex-col sm:flex-row">
            <input
              type="text"
              placeholder="Search title, venue, category, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 pl-4 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-64 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all cursor-pointer"
            >
              <option value="all">All Categories</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <section 
            ref={gridRef} 
            className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2"
          >
            {currentProjects.map((project) => (
              <article 
                key={project.id} 
                className="group flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                style={{ willChange: "transform, opacity" }}
              >
                <div className="h-1.5 w-full bg-linear-to-r from-violet-500 via-sky-500 to-emerald-500" />

                <div className="flex flex-col flex-1 p-6">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                      {project.category}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusChipTone(project.status)}`}
                    >
                      {project.status}
                    </span>
                    <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                      {project.year}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 mb-4 leading-tight group-hover:text-sky-600 transition-colors">
                    {project.title}
                  </h2>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                       <div className="mt-1 px-1.5 py-0.5 rounded bg-sky-50 text-sky-600 text-[10px] font-bold uppercase">Venue</div>
                       <p className="text-sm text-slate-700 font-medium">{project.venue}</p>
                    </div>
                    <div className="flex items-start gap-2">
                       <div className="mt-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase">Authors</div>
                       <p className="text-sm text-slate-600 line-clamp-2">{project.authors}</p>
                    </div>
                  </div>

                
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-500">No projects match your search.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold transition-all ${
                  currentPage === i + 1 
                  ? "bg-sky-600 text-white" 
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-sky-50"
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