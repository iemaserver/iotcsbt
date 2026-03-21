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
    title: "Smart Irrigation Intelligence Platform",
    mentors: "Dr. Meera Raman",
    students: "Rahul K., Sneha P., Amit J.",
    image: "/photo/1.jpg",
    description: "Developing predictive irrigation scheduling using soil, weather, and crop telemetry from distributed IoT nodes to optimize water usage.",
  },
  {
    id: "p2",
    title: "Campus Cyber Threat Analytics",
    mentors: "Dr. Arjun Nair, Sweta Saha",
    students: "Priya M., Rohan D.",
    image: "/photo/2.jpg",
    description: "Building anomaly detection pipelines for campus network traffic and automated incident response using machine learning.",
  },
  {
    id: "p3",
    title: "Blockchain Credential Verification",
    mentors: "Dr. Keerthi S.",
    students: "Vikram B., Anjali T.",
    image: "/photo/3.jpg",
    description: "A decentralized framework for tamper-proof academic records and cross-institution credential validation using smart contracts.",
  },
  {
    id: "p4",
    title: "AI-Powered Traffic Grid Optimization",
    mentors: "Apurba Nandi, Dr. Sandip Mandal",
    students: "Karan V., Neha S., Pooja R.",
    image: "/photo/4.jpg",
    description: "Implementing real-time computer vision models on edge devices to dynamically control traffic lights based on vehicle density.",
  },
  {
    id: "p5",
    title: "Decentralized Energy Trading Grid",
    mentors: "Dr. Siddhartha Roy",
    students: "Aman G., Shruti L.",
    image: "/photo/5.jpg",
    description: "Creating a peer-to-peer microgrid platform allowing localized trading of solar energy using blockchain ledgers.",
  },
  {
    id: "p6",
    title: "IoT Health Monitor Wearables",
    mentors: "Sangita Dutta",
    students: "Deepak S., Megha W.",
    image: "/photo/1.jpg",
    description: "Designing low-cost, low-power wearable devices for continuous tracking of vital signs in elderly patients.",
  },
  {
    id: "p7",
    title: "Drone-based Crop Disease Detection",
    mentors: "Sayantani Das",
    students: "Nikhil P., Tara M.",
    image: "/photo/2.jpg",
    description: "Utilizing autonomous drones equipped with multispectral cameras to identify agricultural blight before it spreads.",
  },
  {
    id: "p8",
    title: "Secure Cloud Storage Archiving",
    mentors: "Rangon Sarkar",
    students: "Arnav K., Ishita B.",
    image: "/photo/3.jpg",
    description: "A novel cryptographic approach to segmenting and storing highly sensitive institutional data across multiple cloud providers.",
  },
  {
    id: "p9",
    title: "AR Navigation for Visually Impaired",
    mentors: "Dr. Arijeet Ghosh, Uddipan Ghosh",
    students: "Sanya C., Rahul M.",
    image: "/photo/4.jpg",
    description: "A spatial-audio augmented reality system that uses smartphone LiDAR to guide visually impaired users through complex indoor environments.",
  },
  {
    id: "p10",
    title: "Automated Phishing Defense Net",
    mentors: "Nitu Saha",
    students: "Varun H., Kavya N.",
    image: "/photo/5.jpg",
    description: "Deploying natural language processing to intercept, analyze, and quarantine sophisticated socially engineered email attacks.",
  },
  {
    id: "p11",
    title: "Smart Waste Management Bins",
    mentors: "Suchanda Chatterjee",
    students: "Aditya R., Simran K.",
    image: "/photo/1.jpg",
    description: "IoT-enabled municipal bins that optimize collection routes based on real-time fill levels and odor sensors.",
  },
  {
    id: "p12",
    title: "Quantum Key Distribution Simulation",
    mentors: "Ahona Ghosh",
    students: "Tarun D., Sneha V.",
    image: "/photo/2.jpg",
    description: "Simulating QKD protocols over optical fiber networks to test resilience against future quantum computing attacks.",
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
function MentorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-4 h-4"}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

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