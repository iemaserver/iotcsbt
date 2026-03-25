"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import DepartmentPage from "@/components/site/DepartmentPage";
import {
  RESEARCH_ITEMS,
  isPublishedItem,
  type ResearchItem,
} from "@/app/research/researchData";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "w-5 h-5"}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "w-3 h-3"}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function statusTone(status: ResearchItem["status"]) {
  if (status === "Published") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
  if (status === "Proceedings") {
    return "bg-indigo-50 text-indigo-700 border-indigo-200";
  }
  if (status === "Presented") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }
  return "bg-slate-100 text-slate-700 border-slate-200";
}

export default function PublicationsPage() {
  const ITEMS_PER_PAGE = 10;

  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const publications = useMemo(
    () => RESEARCH_ITEMS.filter((item) => isPublishedItem(item)),
    [],
  );

  const availableYears = useMemo(() => {
    return Array.from(new Set(publications.map((pub) => pub.year))).sort(
      (a, b) => b - a,
    );
  }, [publications]);

  const availableCategories = useMemo(() => {
    return Array.from(new Set(publications.map((pub) => pub.category))).sort();
  }, [publications]);

  const filteredPublications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return publications.filter((pub) => {
      const matchesSearch =
        !query ||
        pub.title.toLowerCase().includes(query) ||
        pub.venue.toLowerCase().includes(query) ||
        pub.authors.toLowerCase().includes(query) ||
        pub.category.toLowerCase().includes(query);

      const matchesYear = yearFilter === "all" || pub.year === Number(yearFilter);
      const matchesCategory =
        categoryFilter === "all" || pub.category === categoryFilter;

      return matchesSearch && matchesYear && matchesCategory;
    });
  }, [categoryFilter, publications, searchQuery, yearFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, yearFilter, categoryFilter]);

  const totalPages = Math.ceil(filteredPublications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPublications = filteredPublications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

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
  }, [currentPage, filteredPublications, currentPublications.length]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <DepartmentPage
      title="Publications"
      subtitle="Published and presented research outputs from faculty, scholars, and collaborators."
    >
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 px-2 w-full lg:w-auto">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0"></span>
            <p className="text-sm font-semibold text-slate-700 whitespace-nowrap">
              Publications: <span className="text-sky-600">{filteredPublications.length}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 flex-1 lg:justify-end">
            <div className="relative w-full sm:max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search title, venue, category, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
              />
            </div>

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

        {filteredPublications.length > 0 ? (
          <section ref={gridRef} className="grid gap-6 sm:grid-cols-1 xl:grid-cols-2">
            {currentPublications.map((pub) => (
              <article
                key={pub.id}
                className="group flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                style={{ willChange: "transform, opacity" }}
              >
                <div className="h-2 w-full bg-linear-to-r from-sky-500 via-cyan-500 to-emerald-500" />

                <div className="flex flex-col p-5 sm:p-6">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-700">
                      {pub.category}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusTone(pub.status)}`}
                    >
                      {pub.status}
                    </span>
                    <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                      {pub.year}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-sky-700 transition-colors">
                    {pub.title}
                  </h2>

                  <p className="text-sm text-slate-600 mb-2">
                    <span className="font-semibold text-slate-700">Venue:</span> {pub.venue}
                  </p>

                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-5">
                    <span className="font-semibold text-slate-700">Authors:</span> {pub.authors}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    {pub.doi ? (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-800 transition-colors group/link"
                      >
                        View DOI
                        <LinkIcon className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 size-6" />
                      </a>
                    ) : (
                      <span className="text-xs font-medium text-slate-400">DOI not available</span>
                    )}
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
              We could not find anything matching your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setYearFilter("all");
                setCategoryFilter("all");
              }}
              className="mt-6 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-sky-600 hover:bg-sky-50 transition-colors shadow-sm"
            >
              Clear Filters
            </button>
          </div>
        )}

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
