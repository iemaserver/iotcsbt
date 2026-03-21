"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

type NavItem = {
  label: string;
  href?: string;
  children?: Array<{ label: string; href: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Faculty", href: "/faculty" },
  {
    label: "Research & Innovation",
    children: [
      { label: "Ongoing Projects", href: "/research/ongoing-projects" },
      { label: "Publications", href: "/research/publications" },
    ],
  },
  { label: "Laboratories", href: "/labs" },
  { label: "Achievements", href: "/achievements" },
  {
    label: "Events",
    children: [
      { label: "Upcoming Events", href: "/events/upcoming" },
      
      { label: "Guest Lectures", href: "/events/guest-lectures" },
      { label: "Past Events", href: "/events/past-events" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

function LogoImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative shrink-0 rounded-md bg-white/95 flex h-11 w-11 items-center justify-center sm:h-16 sm:w-16">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 45px, 65px"
        className="object-contain lg:scale-130"
        priority
      />
    </div>
  );
}

function DesktopNavItem({
  item,
  withSep = false,
}: {
  item: NavItem;
  withSep?: boolean;
}) {
  if (!item.children) {
    return (
      <Link
        href={item.href ?? "/"}
        className="relative font-merriweather group shrink-0 px-3 py-2.5 text-[12px] lg:text-[13px] font-medium text-slate-600 hover:text-sky-700 transition-colors duration-200 select-none"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: "0.05em",
        }}
      >
        {item.label}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full bg-sky-500 transition-all duration-300 group-hover:w-4/5" />
        {withSep && (
          <span className="absolute right-0 top-1/2 h-3 w-px -translate-y-1/2 bg-slate-300/70" />
        )}
      </Link>
    );
  }

  return (
    <div className="group relative shrink-0 px-3 py-2.5 flex">
      <button
        type="button"
        className="inline-flex items-center gap-1 text-[12px] lg:text-[13px] font-medium text-slate-600 hover:text-sky-700 transition-colors duration-200"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: "0.05em",
        }}
      >
        {item.label}
        <span className="text-[10px]">▾</span>
      </button>

      <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-sky-500 transition-all duration-300 group-hover:w-4/5" />

      <div className="pointer-events-none absolute left-0 top-full z-40 w-64 translate-y-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        <div className="mt-1 rounded-xl border border-sky-200 bg-white p-2 shadow-lg">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>

      {withSep && (
        <span className="absolute right-0 top-1/2 h-3 w-px -translate-y-1/2 bg-slate-300/70" />
      )}
    </div>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="w-5 h-4 flex flex-col justify-between">
      <span
        className="block h-0.5 bg-sky-500 rounded-full transition-all duration-300 origin-center"
        style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }}
      />
      <span
        className="block h-0.5 bg-sky-500 rounded-full transition-all duration-300"
        style={{
          opacity: open ? 0 : 1,
          transform: open ? "scaleX(0)" : "none",
        }}
      />
      <span
        className="block h-0.5 bg-sky-500 rounded-full transition-all duration-300 origin-center"
        style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}
      />
    </div>
  );
}

export default function Navbar() {
  const topRowRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const isCollapsed = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setOpenMobileGroup(null);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        setOpenMobileGroup(null);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  useEffect(() => {
    const navbar = navbarRef.current;
    const topRow = topRowRef.current;
    if (!navbar || !topRow) return;

    const topRowStyles = window.getComputedStyle(topRow);
    const expandedHeight = topRow.scrollHeight;
    const expandedPaddingTop = topRowStyles.paddingTop;
    const expandedPaddingBottom = topRowStyles.paddingBottom;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 50;

      if (scrollY > threshold && !isCollapsed.current) {
        isCollapsed.current = true;
        gsap.to(topRow, {
          height: 0,
          opacity: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.35,
          ease: "power2.inOut",
          onComplete: () => {
            topRow.style.overflow = "hidden";
          },
        });
        gsap.to(navbar, {
          backdropFilter: "blur(20px)",
          boxShadow: "0 4px 20px -5px rgba(0,0,0,0.1)",
          duration: 0.3,
        });
      } else if (scrollY <= threshold && isCollapsed.current) {
        isCollapsed.current = false;
        topRow.style.overflow = "";
        gsap.to(topRow, {
          height: expandedHeight,
          opacity: 1,
          paddingTop: expandedPaddingTop,
          paddingBottom: expandedPaddingBottom,
          duration: 0.35,
          ease: "power2.inOut",
        });
        gsap.to(navbar, { boxShadow: "none", duration: 0.3 });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-100 w-full"
        style={{
          background: "rgba(255, 255, 255, 0.96)",
          borderBottom: "1px solid rgba(148,163,184,0.2)",
        }}
      >
        {/* Top Header Section - Persistent Branding */}
        <div ref={topRowRef} className="w-full py-2 sm:py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Left Logo */}
            <div className="shrink-0">
              <LogoImage src="/iem.png" alt="IEM logo" />
            </div>

            {/* Center Text */}
            <div className="flex flex-col items-center justify-center flex-1 px-2 text-center overflow-hidden font-merriweather">
              <h1
                className="text-[12px] sm:text-[18px] lg:text-[24px] font-black text-slate-900 leading-tight"
               
              >
                Computer Science & Engineering
              </h1>
              <div className="dept-badge overflow-hidden" >
                <span className="hidden sm:inline-flex items-center mt-1 px-3 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100 text-[10px] lg:text-[12px] font-semibold">
                  IoT, Cyber Security &amp; Blockchain Technology
                </span>
                {/* Mobile version shorter text to avoid overflow */}
                <span className="sm:hidden text-[10px] font-bold text-sky-600 mt-0.5">
                  IoT, CS &amp; BT
                </span>
              </div>
            </div>

            {/* Right Logo */}
            <div className="shrink-0">
              <LogoImage src="/uem.png" alt="UEM logo" />
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-slate-200" />

        {/* Navigation Bar */}
        <div className="w-full bg-white/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-12">
            {/* Desktop Nav */}
            <nav className="hidden md:flex flex-1 items-center">
              <DesktopNavItem item={NAV_ITEMS[0]} withSep />
              <div className="flex-1 flex items-center justify-center">
                {NAV_ITEMS.slice(1).map((item, index) => (
                  <DesktopNavItem
                    key={item.label}
                    item={item}
                    withSep={index < NAV_ITEMS.length - 2}
                  />
                ))}
              </div>
            </nav>

            {/* Mobile Nav Header */}
            <div className="flex md:hidden items-center justify-between w-full">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Department Menu
              </span>
              <button
                className="p-2 rounded-md hover:bg-slate-100 transition-colors"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <MenuIcon open={menuOpen} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className="md:hidden overflow-y-auto transition-all duration-300 ease-in-out bg-white"
          style={{
            maxHeight: menuOpen ? "calc(100vh - 120px)" : "0",
            borderTop: menuOpen ? "1px solid rgba(148,163,184,0.1)" : "none",
          }}
        >
          <nav className="flex flex-col p-4 gap-1">
            {NAV_ITEMS.map((item) => {
              if (!item.children) {
                return (
                  <Link
                    key={item.label}
                    href={item.href ?? "/"}
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    {item.label}
                  </Link>
                );
              }

              const isOpen = openMobileGroup === item.label;

              return (
                <div key={item.label} className="flex flex-col">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 rounded-lg hover:bg-slate-50"
                    onClick={() => setOpenMobileGroup(isOpen ? null : item.label)}
                  >
                    {item.label}
                    <span className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                      ▾
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60" : "max-h-0"}`}>
                    <div className="flex flex-col pl-8 pr-4 py-1 gap-1 border-l-2 border-sky-100 ml-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMenu}
                          className="py-2 text-sm text-slate-500 hover:text-sky-700"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}