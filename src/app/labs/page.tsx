"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import DepartmentPage from "@/components/site/DepartmentPage";

// ─── Data ────────────────────────────────────────────────────────────────────
// Advanced infrastructure inventory with one image per item
const LABS = [
  {
    name: "NVIDIA RTX 5070, A1000, RTX 4090 & RTX 3060 GPUs",
    photo:
      "https://res.cloudinary.com/dvky83edw/image/upload/v1774069038/iot/qsbabxitresgu15toxjf.jpg",
    description:
      "High-performance hardware enabling accelerated training and optimization of deep learning and computer vision models.",
  },
  {
    name: "RMS Superspec 32-Channel EEG System",
    photo:
      "https://res.cloudinary.com/dvky83edw/image/upload/v1774069008/iot/m74jib4wpwxzcwdtk1zc.jpg",
    description:
      "Advanced EEG acquisition platform supporting high-resolution brain signal analysis for BCI research.",
  },
  {
    name: "Network Attached Storage (NAS) Server",
    photo: "/photo/10.jpg",
    description:
      "Reliable, high-speed, and secure infrastructure for managing and processing large-scale experimental datasets.",
  },
  {
    name: "NVIDIA Jetson Nano & Jetson Orin",
    photo:
      "https://res.cloudinary.com/dvky83edw/image/upload/v1774069040/iot/tyuprntqnjtbgbet4svc.jpg",
    description:
      "Efficient edge AI platforms designed for real-time inference in embedded and intelligent systems.",
  },
  {
    name: "Industry-Grade Prototyping Infrastructure",
    photo: "/photo/4.jpg",
    description:
      "Comprehensive facilities including 3D printing, soldering, PCB design, and embedded system development.",
  },
  {
    name: "IoT Development Platforms (Arduino, Raspberry Pi 5, ESP32)",
    photo: "/photo/5.jpg",
    description:
      "Versatile ecosystems for building scalable and connected smart applications.",
  },
  {
    name: "NVIDIA AGX Thor & Jetson Orin Super",
    photo:
      "https://res.cloudinary.com/dvky83edw/image/upload/v1774099839/iot/6be548f0-60d7-4556-a311-20d28ee10539.png",
    description:
      "Cutting-edge edge computing solutions for high-throughput AI workloads in robotics, autonomy, and intelligent systems.",
  },
  {
    name: "Advanced UAV & Drone Ecosystem",
    photo: "/photo/6.jpg",
    description:
      "Modern aerial platforms equipped for intelligent surveillance, geospatial mapping, and autonomous mission execution.",
  },
  {
    name: "NVIDIA DGX Spark (1 PetaFLOPS Supercomputing System)",
    photo: "/photo/7.jpg",
    description:
      "Ultra-high-performance AI supercomputing platform delivering petaflop-scale processing power for large-scale model training, simulation, and advanced research workloads.",
  },
];

// ─── Helper for Bento Layout ─────────────────────────────────────────────────
// This function determines the size of each card based on its index
const getBentoSpanClasses = (index: number) => {
  const spans = [
    "md:col-span-2 md:row-span-2", // 0: Hero card
    "md:col-span-1 md:row-span-1", // 1
    "md:col-span-1 md:row-span-2", // 2
    "md:col-span-1 md:row-span-1", // 3
    "md:col-span-2 md:row-span-1", // 4
    "md:col-span-1 md:row-span-1", // 5
    "md:col-span-1 md:row-span-2", // 6
    "md:col-span-1 md:row-span-1", // 7
    "md:col-span-2 md:row-span-1", // 8
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
      subtitle="Our advanced infrastructure supports practical learning through state-of-the-art equipment, edge platforms, and high-performance compute environments."
    >
      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-6 rounded-2xl border border-sky-200/80 bg-sky-50/80 px-5 py-4 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">
            Advanced Infrastructure
          </p>
          <p className="mt-1 text-sm text-slate-700">
            Explore the core systems powering AI, BCI, IoT, edge intelligence,
            and autonomous platform research in our labs.
          </p>
        </div>

        {/* BENTO GRID CONTAINER
          grid-flow-dense is the magic CSS that fills empty spaces to make the bento box perfect
        */}
        <section
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[300px] grid-flow-dense"
        >
          {LABS.map((lab, index) => {
            const bentoClasses = getBentoSpanClasses(index);

            return (
              <article
                key={lab.name}
                className={`group relative overflow-hidden rounded-3xl bg-slate-900 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${bentoClasses}`}
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
                <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-white/10 opacity-0 blur-xl transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />

                {/* Content Container (Pinned to Bottom) */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 sm:p-5">
                  <span className="mb-3 inline-flex w-fit items-center rounded-full border border-cyan-200/35 bg-cyan-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100">
                    ⚡ Infrastructure
                  </span>

                  {/* Title & Stats */}
                  <div className="transform transition-transform duration-500">
                    <h2
                      className="mb-3 text-lg font-bold leading-tight text-white md:text-2xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {lab.name}
                    </h2>

                    <p className="line-clamp-3 text-sm text-slate-200 md:line-clamp-4">
                      {lab.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </DepartmentPage>
  );
}
