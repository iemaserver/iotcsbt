"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   DATA (Refined & Professional)
───────────────────────────────────────────── */
const stats = [
  {
    value: "120",
    suffix: "+",
    label: "Publications",
    sub: "Research in IoT, AI, Security & Blockchain",
  },
  {
    value: "350",
    suffix: "+",
    label: "Research Scholars",
    sub: "Students actively engaged in research projects",
  },
  {
    value: "10",
    suffix: "+",
    label: "HPC Systems",
    sub: "High-performance GPU clusters for AI & simulation",
  },
  {
    value: "20",
    suffix: "+",
    label: "Faculty Mentors",
    sub: "Experienced professors guiding academic, research and innovation",
  },
  {
    value: "50",
    suffix: "+",
    label: "Innovations Delivered",
    sub: "Prototypes and solutions developed in labs",
  },
];

/* ─────────────────────────────────────────────
   Counter
───────────────────────────────────────────── */
function Counter({ target, duration = 2 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: () => {
        if (started.current) return;
        started.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = Math.round(obj.val).toString();
            }
          },
        });
      },
    });

    return () => trigger.kill(); // cleanup
  }, [target, duration]);

  return <span ref={ref}>0</span>;
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function ResearchGlory() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-50 text-slate-900"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-40 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10">
        {/* HEADER */}
        <div className="px-[6vw] py-[clamp(48px,8vw,96px)]">
          <p className="text-sky-600 text-[11px] tracking-[0.4em] uppercase mb-6 font-mono">
            — Department Impact
          </p>

          <h2
            ref={headingRef}
            className="text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[1.05] tracking-tight"
          >
            CSE Innovation <br/>in{" "}
            
            <em className="text-sky-800 italic">Action</em>
          </h2>

          <div
            ref={lineRef}
            className="h-[1px] mt-10 bg-gradient-to-r from-sky-400 to-transparent"
          />
        </div>

        {/* STATS */}
        <div className="stats-grid border-y border-slate-300/60 bg-slate-200/40">
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-card group relative bg-sky-50 hover:bg-sky-100 transition duration-300 p-[clamp(20px,4vw,40px)]"
            >
              {/* Accent line */}
              <div className="absolute left-0 bottom-0 w-[3px] h-full bg-sky-400 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300" />

              {/* Number */}
              <div className="text-[clamp(2.2rem,3.5vw,3.8rem)] font-bold tracking-tight mb-3 group-hover:text-sky-700 transition">
                <Counter target={parseInt(s.value)} />
                {s.suffix}
              </div>

              {/* Label */}
              <div className="text-[13px] font-semibold uppercase tracking-wide mb-1">
                {s.label}
              </div>

              {/* Subtext */}
              <div className="text-[12px] text-slate-600 leading-relaxed">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GRID */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
        }
        @media (min-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }
      `}</style>
    </section>
  );
}