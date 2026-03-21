"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import DepartmentPage from "@/components/site/DepartmentPage";

// ─── Data ────────────────────────────────────────────────────────────────────
// Expanded to 10 items for a complete Bento Grid experience
const LABS = [
  {
    name: "IoT Systems & Sensors",
    photo: "https://res.cloudinary.com/dvky83edw/image/upload/v1774069040/iot/tyuprntqnjtbgbet4svc.jpg",
    description:
      "Hands-on lab for sensor integration, edge gateways, and real-time monitoring deployments.",
  
  },
  {
    name: "EEG & Brain-Computer Interfaces",
    photo: "https://res.cloudinary.com/dvky83edw/image/upload/v1774069008/iot/m74jib4wpwxzcwdtk1zc.jpg",
    description:
      "Neuroscience and BCI research with EEG headsets, signal processing workstations, and cognitive computing tools.",
   
  },
  {
    name: "SATYAMEBA",
    photo:
      "https://res.cloudinary.com/dvky83edw/image/upload/v1774099839/iot/6be548f0-60d7-4556-a311-20d28ee10539.png",
    description:
      "High-performance computing lab with GPU clusters and AI acceleration for research in deep learning, multi-GPU architectures, and quantum simulation.",
    
   
  },
  
  {
    name: "NVDIA powerful 4090 GPU Cluster",
    photo: "https://res.cloudinary.com/dvky83edw/image/upload/v1774069038/iot/qsbabxitresgu15toxjf.jpg",
    description:
      "High-performance GPU cluster with NVIDIA RTX 4090s for AI research, deep learning model training, and computational simulations.",
 
   
  },
  
];

// ─── Helper for Bento Layout ─────────────────────────────────────────────────
// This function determines the size of each card based on its index
const getBentoSpanClasses = (index: number) => {
  const spans = [
    "md:col-span-2 md:row-span-2", // 0: Large square (Hero)
    "md:col-span-1 md:row-span-1", // 1: Standard
    "md:col-span-1 md:row-span-2", // 2: Tall rectangle
    "md:col-span-1 md:row-span-1", // 3: Standard
    "md:col-span-3 md:row-span-1", // 4: Wide rectangle
  
    "md:col-span-1 md:row-span-1", // 6: Standard
    "md:col-span-2 md:row-span-2", // 7: Large square
    "md:col-span-1 md:row-span-2", // 8: Standard
    "md:col-span-1 md:row-span-2", // 9: Standard
  ];
  return spans[index] || "md:col-span-1 md:row-span-1";
};

// ─── Main Component ──────────────────────────────────────────────────────────
export default function LabsPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Animation
  useEffect(() => {
    if (!gridRef.current) return;

    import("gsap").then(({ gsap }) => {
      const cards = gridRef.current?.children;
      if (!cards) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.2)",
          force3D: true,
        },
      );
    });
  }, []);

  return (
    <DepartmentPage
      title="Laboratories"
      subtitle="Our advanced laboratories support practical learning through state-of-the-art equipment, industry software, and expert faculty supervision."
    >
      <div className="max-w-7xl mx-auto py-8">
        {/* BENTO GRID CONTAINER
          grid-flow-dense is the magic CSS that fills empty spaces to make the bento box perfect
        */}
        <section
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[300px] grid-flow-dense"
        >
          {LABS.map((lab, index) => {
            const bentoClasses = getBentoSpanClasses(index);
            const isLargeOrTall = bentoClasses.includes("row-span-2");

            return (
              <article
                key={lab.name}
                className={`group relative overflow-hidden rounded-3xl bg-slate-900 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${bentoClasses}`}
                style={{ willChange: "transform, opacity" }}
              >
                {/* Background Image */}
                <Image
                  src={lab.photo}
                  alt={lab.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Gradient Overlays 
                  Bottom gradient ensures text is always readable. Top gradient for slight vignette.
                */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 to-transparent" />

                {/* Content Container (Pinned to Bottom) */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 sm:p-5">
                  {/* Title & Stats */}
                  <div className="transform transition-transform duration-500">
                    <h2
                      className="text-xl md:text-2xl font-bold text-white leading-tight mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {lab.name}
                    </h2>

                   

                    <p className="text-sm text-slate-300 line-clamp-2 md:line-clamp-3">
                      {lab.description}
                    </p>
                  </div>

                  {/* Equipment List (Appears on Hover for smaller cards, always visible on Large/Tall cards)
                   */}
                 
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </DepartmentPage>
  );
}
