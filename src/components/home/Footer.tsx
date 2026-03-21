"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Faculty", href: "/faculty" },
 
  { label: "Laboratories", href: "/labs" },
  { label: "Achievements", href: "/achievements" },
  { label: "Gallery", href: "/gallery" },
];

const SOCIALS = [
  
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/uem-innovation-and-entrepreneurship-development-cell/posts/?feedView=all",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
 
];

const CONTACT_ITEMS = [
  {
    label: "Address",
    value: "University Area, Plot No. III – B/5, New Town, Action Area – III, Kolkata – 700160",
  },
  { label: "Email", value: "iedc.iotcsbt@iem.edu.in" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Top divider line
      gsap.fromTo(
        topLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: topLineRef.current, start: "top 92%" },
        },
      );

      // Giant logo text — horizontal slide + fade words
      if (bigTextRef.current) {
        const words = bigTextRef.current.querySelectorAll(".ft-word");
        gsap.fromTo(
          words,
          { y: "105%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.07,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: bigTextRef.current, start: "top 88%" },
          },
        );
      }

      // Grid columns — stagger up
      if (gridRef.current) {
        const cols = gridRef.current.querySelectorAll(".ft-col");
        gsap.fromTo(
          cols,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 88%" },
          },
        );
      }

      // Bottom bar
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: bottomRef.current, start: "top 95%" },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Magnetic hover for social icons
  const onSocialEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.15,
      color: "#0ea5e9",
      duration: 0.25,
      ease: "power2.out",
    });
  };
  const onSocialLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      color: "rgba(51,65,85,0.72)",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const onLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 6,
      color: "#0284c7",
      duration: 0.2,
      ease: "power2.out",
    });
  };
  const onLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      color: "rgba(51,65,85,0.72)",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <footer
      ref={footerRef}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#f8fafc",
        color: "#0f172a",
        fontFamily: "'Syne', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Top blend seam */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 100,
          background:
            "linear-gradient(to bottom, #e2e8f0 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Subtle grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 44px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 44px)",
        }}
      />

      {/* Accent glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70vw",
          height: "40vh",
          background:
            "radial-gradient(ellipse, rgba(14,165,233,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Additional ambient blobs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: 460,
          height: 460,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
          filter: "blur(2px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-5%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(219,39,119,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
          filter: "blur(2px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "35%",
          left: "25%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
          filter: "blur(2px)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, padding: "0 6vw" }}>
        {/* ── Top divider ── */}
        <div
          ref={topLineRef}
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #0ea5e9 40%, rgba(148,163,184,0.35) 100%)",
            transformOrigin: "left",
            marginBottom: 72,
            marginTop: 80,
          }}
        />

        {/* ── Responsive brand heading ── */}
        <div
          ref={bigTextRef}
          style={{
            overflow: "hidden",
            marginBottom: 64,
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          {["Computer Science and Engineering", "IoT | CS | BT"].map(
            (word, i) => (
              <div
                key={i}
                style={{
                  overflow: "hidden",
                  display: "block",
                  paddingBottom: 7,
                }}
              >
                <span
                  className="ft-word"
                  style={{
                    display: "inline-block",
                    fontSize:
                      i === 0
                        ? "clamp(1.85rem, 5.2vw, 4.4rem)"
                        : "clamp(1rem, 2.1vw, 1.45rem)",
                    fontWeight: i === 0 ? 800 : 700,
                    letterSpacing: i === 0 ? "-0.02em" : "0.18em",
                    color: i === 1 ? "#0284c7" : "#0f172a",
                    textTransform: i === 1 ? "uppercase" : "none",
                    opacity: 0,
                    willChange: "transform",
                  }}
                >
                  {word}
                </span>
              </div>
            ),
          )}
          <p
            style={{
              marginTop: 14,
              fontSize: "clamp(0.84rem, 1.2vw, 1rem)",
              color: "rgba(51,65,85,0.75)",
              letterSpacing: "0.04em",
              maxWidth: 700,
            }}
          >
            Building future-ready innovation through focused programs, research,
            and collaboration.
          </p>
        </div>

        {/* ── Columns grid ── */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "48px 40px",
            marginBottom: 72,
          }}
        >
          {/* About col */}
          <div className="ft-col" style={{ opacity: 0 }}>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "#0284c7",
                fontFamily: "monospace",
                marginBottom: 16,
              }}
            >
              About Us
            </p>
            <p
              style={{
                fontSize: 14,
                color: "rgba(51,65,85,0.88)",
                lineHeight: 1.8,
              }}
            >
              We are committed to nurturing the next generation of engineers and
              innovators by combining strong theoretical foundations with
              hands-on, industry-oriented learning.
            </p>
          </div>

          {/* Links col */}
          <div className="ft-col" style={{ opacity: 0 }}>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "#0284c7",
                fontFamily: "monospace",
                marginBottom: 16,
              }}
            >
              Navigate
            </p>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={onLinkEnter}
                  onMouseLeave={onLinkLeave}
                  style={{
                    fontSize: 14,
                    color: "rgba(51,65,85,0.88)",
                    textDecoration: "none",
                    fontFamily: "monospace",
                    letterSpacing: "0.04em",
                    willChange: "transform",
                    display: "inline-block",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact col */}
          <div className="ft-col" style={{ opacity: 0 }}>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "#0284c7",
                fontFamily: "monospace",
                marginBottom: 16,
              }}
            >
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {CONTACT_ITEMS.map((item) => (
                <div key={item.label}>
                  <p
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "rgba(71,85,105,0.8)",
                      fontFamily: "monospace",
                      marginBottom: 3,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: "rgba(51,65,85,0.9)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Social col */}
          <div className="ft-col" style={{ opacity: 0 }}>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "#0284c7",
                fontFamily: "monospace",
                marginBottom: 16,
              }}
            >
              Follow
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  onMouseEnter={onSocialEnter}
                  onMouseLeave={onSocialLeave}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "rgba(51,65,85,0.85)",
                    textDecoration: "none",
                    fontSize: 13,
                    fontFamily: "monospace",
                    letterSpacing: "0.04em",
                    willChange: "transform",
                  }}
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          ref={bottomRef}
          style={{
            opacity: 0,
            borderTop: "1px solid rgba(148,163,184,0.45)",
            paddingBlock: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "rgba(71,85,105,0.82)",
              fontFamily: "monospace",
              letterSpacing: "0.08em",
            }}
          >
            © {new Date().getFullYear()} Computer Science and Engineering IoT,
            CS, BT. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((t) => (
              <a
                key={t}
                href="#"
                style={{
                  fontSize: 11,
                  color: "rgba(71,85,105,0.82)",
                  fontFamily: "monospace",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  gsap.to(e.currentTarget, { color: "#0284c7", duration: 0.2 })
                }
                onMouseLeave={(e) =>
                  gsap.to(e.currentTarget, {
                    color: "rgba(71,85,105,0.82)",
                    duration: 0.2,
                  })
                }
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');`}</style>
    </footer>
  );
}
