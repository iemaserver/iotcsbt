"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import DepartmentPage from "@/components/site/DepartmentPage";

// ... (PROJECTS data array remains the same as previous)
// Expanded dummy data to test search and pagination
type Project = {
  id: string;
  title: string;
  mentors: string;
  students: string;
  image: string;
  description: string;
};
const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Urban Sprawl Prediction",
    mentors: "Avik Kr. Das",
    students: "Suman Mishra",
    image: "/research/suman.png",
    description: "Using satellite imagery and machine learning to model and predict urban expansion patterns in rapidly growing cities, aiding sustainable development planning.",
  },
 
];



export default function OngoingProjectsPage() {
  const ITEMS_PER_PAGE = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return PROJECTS;
    const query = searchQuery.toLowerCase();
    return PROJECTS.filter((project) => 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.mentors.toLowerCase().includes(query) ||
      project.students.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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
  }, [currentPage, filteredProjects]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <DepartmentPage
      title="Ongoing Projects"
      subtitle="A snapshot of active student-faculty research projects pushing the boundaries of technology."
    >
      <div className="max-w-7xl mx-auto py-8">
        
        {/* Search Bar Strip */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 px-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0"></span>
            <p className="text-sm font-semibold text-slate-700">
              Projects: <span className="text-sky-600">{filteredProjects.length}</span>
            </p>
          </div>

          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search projects, mentors, or students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
            />
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
                className="group flex flex-col md:flex-row bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Image Section - Fixed 4:5 Aspect Ratio feel */}
                <div className="relative h-52 md:h-auto md:w-52 shrink-0 overflow-hidden bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4 leading-tight group-hover:text-sky-600 transition-colors">
                    {project.title}
                  </h2>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                       <div className="mt-1 px-1.5 py-0.5 rounded bg-sky-50 text-sky-600 text-[10px] font-bold uppercase">Mentor</div>
                       <p className="text-sm text-slate-700 font-medium">{project.mentors}</p>
                    </div>
                    <div className="flex items-start gap-2">
                       <div className="mt-1 px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase">Students</div>
                       <p className="text-sm text-slate-600">{project.students}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mt-auto pt-4 border-t border-slate-50">
                    {project.description}
                  </p>
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