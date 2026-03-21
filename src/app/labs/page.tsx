"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import DepartmentPage from "@/components/site/DepartmentPage";

// ─── Data ────────────────────────────────────────────────────────────────────
// Expanded to 10 items for a complete Bento Grid experience
const LABS = [
  {
    name: "IoT Systems & Sensors Lab",
    photo: "/photo/2.jpg",
    description: "Hands-on lab for sensor integration, edge gateways, and real-time monitoring deployments.",
    equipment: ["ESP32 Dev Kits", "Raspberry Pi Clusters", "LoRa Gateways", "Digital Oscilloscopes"],
    inCharge: "Dr. Meera Raman",
    capacity: "45 students",
  },
  {
    name: "Cyber Security & Forensics",
    photo: "/photo/3.jpg",
    description: "Controlled environment for penetration testing, incident response, and malware analysis.",
    equipment: ["Kali Workstations", "Firewall Appliances", "SIEM Suite"],
    inCharge: "Dr. Arjun Nair",
    capacity: "36 students",
  },
  {
    name: "AI & Data Engineering",
    photo: "/photo/4.jpg",
    description: "GPU-enabled systems for machine learning, NLP experimentation, and massive data pipelines.",
    equipment: ["NVIDIA GPU Nodes", "JupyterHub", "Apache Spark", "Power BI"],
    inCharge: "Prof. Aisha Varma",
    capacity: "40 students",
  },
  {
    name: "Cloud Computing Hub",
    photo: "/photo/5.jpg",
    description: "Virtualization and container orchestration sandboxes for cloud-native application development.",
    equipment: ["AWS Educate", "Docker/Kubernetes", "OpenStack Servers"],
    inCharge: "Dr. Sandip Mandal",
    capacity: "50 students",
  },
  {
    name: "Blockchain & Web3",
    photo: "/photo/1.jpg",
    description: "Decentralized application development and smart contract auditing environment.",
    equipment: ["Ethereum Nodes", "Truffle Suite", "Hardware Wallets"],
    inCharge: "Dr. Keerthi S.",
    capacity: "30 students",
  },
  {
    name: "Robotics & Automation",
    photo: "/photo/2.jpg",
    description: "Design, build, and program autonomous robotic systems and drone fleets.",
    equipment: ["ROS Workstations", "LiDAR Sensors", "Robotic Arms", "3D Printers"],
    inCharge: "Apurba Nandi",
    capacity: "25 students",
  },
  {
    name: "AR/VR & Spatial Computing",
    photo: "/photo/3.jpg",
    description: "Immersive technology lab for building virtual reality and augmented reality experiences.",
    equipment: ["Meta Quest 3", "Unity/Unreal Engines", "Motion Capture"],
    inCharge: "Dr. Arijeet Ghosh",
    capacity: "20 students",
  },
  {
    name: "Quantum Simulation Lab",
    photo: "/photo/4.jpg",
    description: "Simulating quantum algorithms and quantum key distribution protocols.",
    equipment: ["IBM Qiskit", "High-RAM Simulation Nodes", "Optical Fiber Spools"],
    inCharge: "Ahona Ghosh",
    capacity: "15 students",
  },
  {
    name: "Mobile App Development",
    photo: "/photo/5.jpg",
    description: "Cross-platform engineering for iOS and Android ecosystems.",
    equipment: ["Mac Studio Fleet", "Android Emulators", "Physical Test Devices"],
    inCharge: "Sayantani Das",
    capacity: "40 students",
  },
  {
    name: "5G & Advanced Networking",
    photo: "/photo/1.jpg",
    description: "High-speed network topology design, software-defined networking, and protocol analysis.",
    equipment: ["Cisco Routers", "SDN Controllers", "Fiber Optic Splicers"],
    inCharge: "Rangon Sarkar",
    capacity: "35 students",
  },
];

// ─── Icons ───────────────────────────────────────────────────────────────────
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// ─── Helper for Bento Layout ─────────────────────────────────────────────────
// This function determines the size of each card based on its index
const getBentoSpanClasses = (index: number) => {
  const spans = [
    "md:col-span-2 md:row-span-2", // 0: Large square (Hero)
    "md:col-span-1 md:row-span-1", // 1: Standard
    "md:col-span-1 md:row-span-2", // 2: Tall rectangle
    "md:col-span-1 md:row-span-1", // 3: Standard
    "md:col-span-2 md:row-span-1", // 4: Wide rectangle
    "md:col-span-1 md:row-span-1", // 5: Standard
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
        }
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

                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500/20 backdrop-blur-md border border-sky-400/30 px-2.5 py-1 text-[11px] font-semibold text-sky-100 uppercase tracking-wide">
                        <UserIcon /> {lab.inCharge}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-slate-200 uppercase tracking-wide">
                        <UsersIcon /> {lab.capacity}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 line-clamp-2 md:line-clamp-3">
                      {lab.description}
                    </p>
                  </div>

                  {/* Equipment List (Appears on Hover for smaller cards, always visible on Large/Tall cards)
                  */}
                  <div className={`mt-4 overflow-hidden transition-all duration-500 ${isLargeOrTall ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-5'}`}>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-sky-400 mb-2">
                      Key Equipment
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {lab.equipment.map((item) => (
                        <span 
                          key={item} 
                          className="rounded-md bg-white/10 backdrop-blur-sm border border-white/5 px-2 py-1 text-xs text-slate-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
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