"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const JOBS = [
  {
    id: 1,

    accent: "#1db954",
    image: "/photo/1.jpg",
  },
  {
    id: 2,

    accent: "#e91e8c",
    image: "/photo/2.jpg",
  },
  {
    id: 3,

    accent: "#9146ff",
    image: "/photo/3.jpg",
  },
  {
    id: 4,

    accent: "#ff9500",
    image: "/photo/4.jpg",
  },
  {
    id: 5,

    accent: "#e50914",
    image: "/photo/5.jpg",
  },
];

const COUNT = JOBS.length;

// ─── CARD DIMENSIONS ──────────────────────────────────────────────────────────
const CARD_W = 320;
const CARD_H = 400;

const BRAND = {
  primary: "#0369a1",
  primarySoft: "#0284c7",
  ink: "#020617",
  inkSoft: "#1e293b",
};

// ─── ARC CONFIG ───────────────────────────────────────────────────────────────
const RADIUS = 1100;
const STEP_ANGLE = 15;
const VISIBLE_SIDE = 3;

function slotToXYR(offset: number) {
  const angleDeg = 90 + offset * STEP_ANGLE;
  const angleRad = (angleDeg * Math.PI) / 180;

  const cx = RADIUS * Math.cos(angleRad);
  const cy = -RADIUS * Math.sin(angleRad);

  const x = cx;
  const y = cy + RADIUS;

  const rotation = -offset * STEP_ANGLE * 0.9;

  return { x, y, rotation };
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function CardCarousel() {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const initDone = useRef(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getOffset = (cardIndex: number) => {
    let diff = (cardIndex - ((active % COUNT) + COUNT)) % COUNT;
    if (diff > COUNT / 2) diff -= COUNT;
    if (diff < -COUNT / 2) diff += COUNT;
    return diff;
  };

  const animate = (currentActive: number) => {
    cardRefs.current.forEach((el, cardIndex) => {
      if (!el) return;

      // compute offset relative to currentActive (not stale closure)
      let diff = (cardIndex - ((currentActive % COUNT) + COUNT)) % COUNT;
      if (diff > COUNT / 2) diff -= COUNT;
      if (diff < -COUNT / 2) diff += COUNT;
      const offset = diff;

      const { x, y, rotation } = slotToXYR(offset);
      const dist = Math.abs(offset);
      const isActive = offset === 0;

      const scale = isActive ? 1.08 : Math.max(0.65, 0.88 - dist * 0.06);
      const opacity =
        dist > VISIBLE_SIDE
          ? 0
          : isActive
            ? 1
            : offset < 0 && dist <= 2
              ? 1
              : offset < 0
                ? Math.max(0.78, 1 - dist * 0.1)
                : Math.max(0.22, 0.72 - dist * 0.18);
      const zIndex = 20 - dist;

      // 3D: side cards rotate on Y axis to give depth; active faces forward
      const rotateY = offset * -15; // -36° on far left, +36° on far right
      const rotateX = isActive ? -2 : dist * 1.5; // subtle tilt back for side cards

      gsap.to(el, {
        x,
        y,
        rotation,
        rotationY: rotateY,
        rotationX: rotateX,
        scale,
        opacity,
        zIndex,
        duration: 0.65,
        ease: "power3.out",
      });
    });
  };

  // Start / restart autoplay
  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setActive((a) => a + 1);
    }, 1500);
  };

  // Mount
  useEffect(() => {
    if (!initDone.current) {
      initDone.current = true;
      animate(0);
    }
    startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Active change
  useEffect(() => {
    if (initDone.current) animate(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const activeJobIndex = ((active % COUNT) + COUNT) % COUNT;
  const activeJob = JOBS[activeJobIndex];

  const edgeY =
    RADIUS - RADIUS * Math.cos((VISIBLE_SIDE * STEP_ANGLE * Math.PI) / 180);
  const STAGE_H = Math.ceil(edgeY) + CARD_H / 3 - 90;

  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        minHeight: "100vh",
        overflowX: "clip",
        overflowY: "hidden",
        userSelect: "none",
        background:
          "linear-gradient(180deg,#f8fbff 0%, #eef6ff 52%, #e7f0fb 100%)",
        fontFamily: "var(--font-playfair)",
        width: "100%",
        perspective: 1400,
        perspectiveOrigin: "50% 100%",
      }}
      className="pt-28 md:pt-24"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        @keyframes blobA { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-24px) scale(1.06)} }
        @keyframes blobB { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-14px) scale(0.95)} }
        @keyframes pulseGlow { 0%,100%{opacity:0.5} 50%{opacity:1} }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url('https://res.cloudinary.com/dvky83edw/image/upload/v1774068989/iot/i6fesgigd7mcwixnsu8n.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 32%",
          opacity: 1,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "84%",
          zIndex: 2,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(247,252,255,0.95) 40%, rgba(236,246,255,0.72) 63%, rgba(236,246,255,0.34) 82%, rgba(236,246,255,0) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.34) 0%, rgba(247,252,255,0.2) 42%, rgba(229,240,252,0.12) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 6,
          background:
            "linear-gradient(to top, #ffffff 0%, #ffffff 10%, rgba(255,255,255,0.62) 20%, rgba(255,255,255,0.24) 30%, rgba(255,255,255,0) 42%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Ambient lime blobs ── */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          left: "-8%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(2,132,199,0.09) 0%,transparent 65%)",
          pointerEvents: "none",
          animation: "blobA 10s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "-5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(14,165,233,0.07) 0%,transparent 65%)",
          pointerEvents: "none",
          animation: "blobB 13s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "35%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(56,189,248,0.06) 0%,transparent 65%)",
          pointerEvents: "none",
          animation: "blobA 16s ease-in-out infinite",
          zIndex: 0,
        }}
      />

      {/* ── CAROUSEL STAGE — absolutely behind everything ── */}

      {/* ── Bottom-to-top blend overlay for smooth section continuity ───── */}

      {/* ── MAIN CONTENT — sits above scrim ── */}
      <div
        className="flex w-full min-h-screen flex-col md:flex-row"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          width: "100%",
          minHeight: "100vh",
          padding: "24px 0 0 0",
          alignItems: "stretch",
        }}
      >
        {/* ── LEFT / CENTER — Institution name block ── */}
        <div
          className=" text-center items-start md:text-left"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 clamp(20px, 6vw, 96px)",
            minWidth: 0,
            transform: "translateY(-28px)",
          }}
        >
          {/* Top label row */}

          {/* ── PRIMARY GIANT HEADING ── */}
          {/* Cell name */}
          <h1
            style={{
              fontFamily: "'Bebas Neue', 'Arial Narrow', sans-serif",
              fontSize: "clamp(3rem, 7vw, 6.2rem)",
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "0.01em",
              color: BRAND.ink,
              margin: 0,
              marginBottom: 4,
              textShadow: "0 2px 10px rgba(0,0,0,0.35)",
            }}
            className="text-left"
          >
            Computer Science
            <br />
            <span className="block">
              and{" "}
              <span
                className="drop-shadow-[0_2px_12px_rgba(255,255,255,0.5)]"
                style={{ color: BRAND.primary }}
              >
                Engineering
              </span>
            </span>
          </h1>

          {/* Horizontal rule */}
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(to right, rgba(2,132,199,0.55), transparent)",
              marginBottom: 20,
              width: "70%",
            }}
          />

          {/* Specialisations */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap" as const,
              gap: 8,
              marginBottom: 36,
            }}
          >
            {[
              "Internet of Things",
              "Cyber Security",
              "Blockchain Technology",
            ].map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: "monospace",
                  fontSize: "clamp(0.6rem, 1vw, 0.89rem)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                  color: "#0c4a6e",
                  border: "1px solid rgba(3,105,161,0.38)",
                
                  padding: "5px 14px",
                  borderRadius: 4,
                }}
                className="bg-green-200/80 font-bold text-sky-900"
              >
                {s}
              </span>
            ))}
          </div>

          <p
            style={{
              maxWidth: "720px",
           
              fontSize: "clamp(0.9rem, 1.25vw, 1.02rem)",
              lineHeight: 1.6,
              color: "#334155",
              margin: "0 0 26px 0",
            }}
            className="text-left font-merriweather font-medium"
          >
            Empowering future engineers through AI-driven learning, secure
            computing practices, and decentralized system design. Our department
            blends research, innovation, and industry-ready skills across IoT,
            Cyber Security, and Blockchain Technology.
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
            <button
              style={{
                padding: "13px 34px",
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "#ecfeff",
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(135deg,#0369a1,#075985)",
                boxShadow: "0 8px 28px rgba(3,105,161,0.34)",
                textTransform: "uppercase" as const,
              }}
            >
              Explore Programs →
            </button>
            <button
              style={{
                padding: "13px 34px",
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: BRAND.inkSoft,
                border: "1px solid rgba(3,105,161,0.42)",
                cursor: "pointer",
                background: "rgba(255,255,255,0.9)",
                textTransform: "uppercase" as const,
              }}
            >
              Meet the Team
            </button>
          </div>

          {/* Mobile tagline */}
          <div
            className="md:hidden"
            style={{
              marginTop: 71,
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(8,47,73,0.86)",
              textAlign: "center",
              width: "100%",
            }}
          >
            Innovate · Build · Disrupt
          </div>
        </div>

        {/* ── RIGHT — Vertical tagline strip ── */}
        <div
          className="hidden md:flex"
          style={{
            width: 56,
            flexShrink: 0,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderLeft: "1px solid rgba(14,165,233,0.22)",
            background: "rgba(255,255,255,0.84)",
            backdropFilter: "blur(2px)",
            padding: "40px 0",
            gap: 32,
            position: "relative",
          }}
        >
          {/* Vertical scrolling indicator line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 1,
              height: "100%",
              background:
                "linear-gradient(to bottom, transparent, rgba(2,132,199,0.22) 30%, rgba(2,132,199,0.22) 70%, transparent)",
              pointerEvents: "none",
            }}
          />

          {/* Vertical text — tagline */}
          <div
            style={{
              writingMode: "vertical-rl" as const,
              textOrientation: "mixed" as const,
              transform: "rotate(180deg)",
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: "0.35em",
              textTransform: "uppercase" as const,
              color: "rgba(8,47,73,0.92)",
              userSelect: "none",
            }}
          >
            Innovate · Build · Disrupt
          </div>

          {/* Divider dot */}
        </div>
      </div>
    </div>
  );
}
