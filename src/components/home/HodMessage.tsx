"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HodMessage() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    const loadGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Card reveal
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 48, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );

        // Photo slide in
        gsap.fromTo(
          photoRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: "power3.out",
            delay: 0.18,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );

        // Content stagger
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: 36 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: "power3.out",
            delay: 0.32,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );

        // Quote block
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            delay: 0.52,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );

        // Tagline fade
        gsap.fromTo(
          taglineRef.current,
          { opacity: 0, letterSpacing: "0.5em" },
          {
            opacity: 1,
            letterSpacing: "0.28em",
            duration: 1.1,
            ease: "power2.out",
            delay: 0.72,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );
      }, sectionRef);
    };

    loadGSAP();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&family=Cinzel:wght@600&display=swap');

        .hod-section {
          font-family: 'DM Sans', sans-serif;
        }
        .hod-display {
          font-family: 'Playfair Display', serif;
        }
        .hod-label {
          font-family: 'Cinzel', serif;
        }
        .hod-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(240,249,255,0.95) 100%);
          backdrop-filter: blur(16px);
        }
        .hod-photo-frame::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 22px;
          background: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 40%, #7dd3fc 70%, #0369a1 100%);
          z-index: -1;
        }
        .hod-accent-bar {
          background: linear-gradient(90deg, #0ea5e9, #38bdf8, #7dd3fc);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .hod-quote-block {
          background: linear-gradient(135deg, rgba(224,242,254,0.6) 0%, rgba(186,230,253,0.35) 100%);
          border: 1px solid rgba(125,211,252,0.5);
        }
        .hod-bg-pattern {
          background-image:
            radial-gradient(circle at 20% 20%, rgba(14,165,233,0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(56,189,248,0.1) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .hod-floating-badge {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .hod-name-glow {
          text-shadow: 0 0 40px rgba(14,165,233,0.18);
        }
        .dept-chip {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          box-shadow: 0 4px 14px rgba(14,165,233,0.35);
        }
      `}</style>

      <section
        ref={sectionRef}
        className="hod-section hod-bg-pattern relative w-full overflow-hidden px-4 py-20 sm:px-8 lg:px-16"
        style={{
          background:
            "linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)",
        }}
      >
        {/* Decorative SVG top-left */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -left-10 opacity-[0.07]"
          width="320"
          height="320"
          viewBox="0 0 320 320"
        >
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="#0ea5e9"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="160"
            cy="160"
            r="100"
            stroke="#38bdf8"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="160"
            cy="160"
            r="60"
            stroke="#7dd3fc"
            strokeWidth="1"
            fill="none"
          />
          <line
            x1="20"
            y1="160"
            x2="300"
            y2="160"
            stroke="#0ea5e9"
            strokeWidth="1"
          />
          <line
            x1="160"
            y1="20"
            x2="160"
            y2="300"
            stroke="#0ea5e9"
            strokeWidth="1"
          />
        </svg>

        {/* Decorative SVG bottom-right */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -right-16 opacity-[0.08]"
          width="360"
          height="360"
          viewBox="0 0 360 360"
        >
          <polygon
            points="180,20 340,280 20,280"
            stroke="#0ea5e9"
            strokeWidth="2"
            fill="none"
          />
          <polygon
            points="180,60 310,270 50,270"
            stroke="#38bdf8"
            strokeWidth="1.2"
            fill="none"
          />
          <polygon
            points="180,100 280,260 80,260"
            stroke="#7dd3fc"
            strokeWidth="0.8"
            fill="none"
          />
        </svg>

        {/* Floating dots */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 right-12 opacity-20"
          width="80"
          height="80"
          viewBox="0 0 80 80"
        >
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * 20 + 10}
                cy={row * 20 + 10}
                r="2.5"
                fill="#0ea5e9"
              />
            )),
          )}
        </svg>

        {/* Section label */}
        <div className="relative mx-auto mb-8 max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="hod-accent-bar h-px flex-1 max-w-12" />
            <p className="hod-label text-[10px] font-semibold tracking-[0.32em] text-sky-600 uppercase">
              A Message From
            </p>
            <div className="hod-accent-bar h-px flex-1 max-w-12" />
          </div>
          <h2 className="hod-display mt-2 text-4xl font-black text-sky-950 sm:text-5xl">
            Head of the Department
          </h2>
          <div className="hod-accent-bar mt-3 h-1 w-20 rounded-full" />
        </div>

        {/* Main Card */}
        <div
          ref={cardRef}
          className="hod-card relative mx-auto max-w-7xl overflow-hidden rounded-3xl shadow-[0_32px_80px_rgba(2,132,199,0.18)] border border-sky-200/60"
          style={{ opacity: 0 }}
        >
          {/* Top shimmer line */}
          <div className="hod-accent-bar absolute inset-x-0 top-0 h-0.75" />

          <div className="grid grid-cols-1 gap-0 md:grid-cols-[38%_1fr]">
            {/* === LEFT: Photo Column === */}
            <div
              ref={photoRef}
              className="relative flex flex-col items-center justify-end overflow-hidden"
              style={{ minHeight: "480px", opacity: 0 }}
            >
              {/* Background wash */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, #0c4a6e 0%, #075985 40%, #0369a1 100%)",
                }}
              />

              {/* Photo frame */}
              <div className="hod-photo-frame relative z-10 mb-8 mt-10">
                <div className="relative h-64 w-52 overflow-hidden rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:h-72 sm:w-60">
                  <Image
                    src="/photo/hod.jpg"
                    alt="Prof. Dr. Sandip Mandal, Head of Department"
                    fill
                    sizes="(max-width: 768px) 208px, 240px"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    priority
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-sky-950/30 via-transparent to-transparent" />
                </div>
              </div>

              {/* Name & title overlay */}
              <div className="relative z-10 mb-0 w-full px-6 pb-8 text-center">
                {/* Dept chip */}
                <div className="hod-floating-badge dept-chip mx-auto mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white/90"
                  >
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="hod-label text-[9px] font-semibold tracking-[0.22em] text-white uppercase">
                    CSE IoT • CS • BT
                  </span>
                </div>

                <h3 className="hod-display hod-name-glow text-xl font-black text-white sm:text-2xl">
                  Prof. Dr. Sandip Mandal
                </h3>
                <p className="mt-1.5 text-xs font-medium tracking-wide text-sky-200">
                  Professor & Head of Department
                </p>
                <p className="text-[11px] text-sky-300/80 mt-0.5">
                  UEM, Kolkata
                </p>

                {/* Divider */}
                <div className="mx-auto mt-4 h-px w-24 bg-sky-400/30" />

                {/* Social / credential icons */}
                <div className="mt-4 flex justify-center gap-3">
                  {/* Scholar icon */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-400/30 bg-sky-800/40 text-sky-300 transition-colors hover:bg-sky-700/50">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                    </svg>
                  </div>
                  {/* Research icon */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-400/30 bg-sky-800/40 text-sky-300 transition-colors hover:bg-sky-700/50">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  {/* Email icon */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-400/30 bg-sky-800/40 text-sky-300 transition-colors hover:bg-sky-700/50">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* === RIGHT: Content Column === */}
            <div
              ref={contentRef}
              className="flex flex-col justify-center px-8 py-10 lg:px-12"
              style={{ opacity: 0 }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <div className="hod-accent-bar h-0.5 w-8 rounded-full" />
                <p className="hod-label text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-600">
                  Department of CSE (IoT, CS, BT)
                </p>
              </div>

              {/* Headline */}
              <h3 className="hod-display text-2xl font-bold leading-tight text-sky-950 sm:text-3xl">
                Innovating Tomorrow,
                <br />
                <span className="text-sky-600">Engineering the Future.</span>
              </h3>

              {/* Specialisation badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Internet of Things",
                  "Cyber Security",
                  "Blockchain Technology",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-semibold text-sky-700"
                  >
                    <svg width="7" height="7" viewBox="0 0 8 8" fill="#0ea5e9">
                      <circle cx="4" cy="4" r="4" />
                    </svg>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quote block */}
              <div
                ref={quoteRef}
                className="hod-quote-block mt-7 rounded-2xl p-6"
                style={{ opacity: 0 }}
              >
                {/* Open-quote SVG */}
                <svg
                  aria-hidden="true"
                  width="40"
                  height="32"
                  viewBox="0 0 40 32"
                  fill="none"
                  className="mb-3 text-sky-400"
                >
                  <path
                    d="M0 32V20C0 12.8 4.26667 6.93333 12.8 2.4L16 8C12.2667 10.1333 10 12.8 9.6 16H16V32H0ZM24 32V20C24 12.8 28.2667 6.93333 36.8 2.4L40 8C36.2667 10.1333 34 12.8 33.6 16H40V32H24Z"
                    fill="currentColor"
                    opacity="0.6"
                  />
                </svg>

                <p className="text-[1.02rem] leading-[1.85] text-slate-700 sm:text-[1.06rem]">
                  It is my immense pleasure to welcome you to the Department of
                  <strong className="font-semibold text-sky-800">
                    {" "}
                    Computer Science Engineering with specializations in
                    Internet of Things, Cyber Security, and Blockchain
                    Technology.
                  </strong>{" "}
                  Our department is committed to outcome-based education,
                  hands-on learning, and fostering a spirit of continuous
                  curiosity. We strive to nurture students not only as skilled
                  engineers but also as forward-thinking innovators capable of
                  shaping the digital future.
                </p>

                <p className="mt-4 text-[1.02rem] leading-[1.85] text-slate-700 sm:text-[1.06rem]">
                  Through focused academic tracks in
                  <strong className="font-medium text-sky-700">
                    {" "}
                    Internet of Things
                  </strong>
                  ,{" "}
                  <strong className="font-medium text-sky-700">
                    {" "}
                    Cyber Security
                  </strong>
                  , and{" "}
                  <strong className="font-medium text-sky-700">
                    {" "}
                    Blockchain Technology
                  </strong>
                  , we equip our students with strong theoretical foundations
                  alongside practical problem-solving skills. Research-driven
                  learning, industry collaborations, and startup-oriented
                  initiatives further enrich their academic experience. I warmly
                  encourage every learner to explore new ideas, build meaningful
                  solutions, and lead with purpose.
                </p>

                {/* Signature line */}
                <div className="mt-6">
                  {/* HOD Signature Image */}
                  <div className="mb-1 flex justify-start pr-1">
                    <Image
                      src="/signature.png"
                      alt="HOD Signature"
                      className="h-12 w-auto object-contain "
                      width={160}
                      height={40}
                    />
                  </div>

                  <div className="flex items-center gap-4 border-t border-sky-200/60  mt-1">
                    <div>
                      <p className="hod-display text-base font-bold text-sky-900">
                        Prof. Dr. Sandip Mandal
                      </p>
                      <p className="mt-0.5 text-xs text-sky-600">
                        HOD — CSE IoT, CS & BT, UEM Kolkata
                      </p>
                    </div>

                    {/* Decorative signature squiggle */}
                    <svg
                      className="ml-auto shrink-0 text-sky-300"
                      width="72"
                      height="28"
                      viewBox="0 0 72 28"
                      fill="none"
                    >
                      <path
                        d="M4 22 Q18 4 32 14 Q46 24 60 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M12 26 Q26 16 36 20 Q48 24 60 18"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <p
                ref={taglineRef}
                className="hod-label mt-7 text-center text-[10px] font-semibold italic tracking-[0.28em] text-sky-500/80 uppercase"
                style={{ opacity: 0 }}
              >
                &ldquo; Excellence in Innovation &rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
