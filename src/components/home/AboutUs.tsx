"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


/* --- Bento Card Data (Unchanged) --- */
const bentoItems = [
  {
    id: 1,
    img: "https://media.licdn.com/dms/image/v2/D5622AQEhnpqaDnHLhw/feedshare-shrink_2048_1536/B56ZyVwKoHKYAk-/0/1772038957816?e=1775692800&v=beta&t=fQfW85HPZLD_tiZWbC1unWlNdbkXKL6u5IFl5tjWdtY",
    label: "Effortless Prompt Perfection",
    desc: "14 days trial • after $5/month",
    size: "tall",
    showOnMobile: true,
  },
  {
    id: 2,
    img: "https://media.licdn.com/dms/image/v2/D4E22AQF_ZIDTTAd6Uw/feedshare-shrink_2048_1536/B4EZxsPPxUGgAk-/0/1771342462457?e=1775692800&v=beta&t=qTjrsB7H_5WVuTcnNfBOdyGF960S18YgR7o8QdpZDHg",
    label: "Your AI Prompt Companion",
    desc: "PromptPal",
    size: "large",
    showOnMobile: true,
  },
  {
    id: 3,
    img: "https://media.licdn.com/dms/image/v2/D5622AQHQ3QA5aldF-Q/feedshare-shrink_2048_1536/B56ZsOMfO5H8A0-/0/1765469714698?e=1775692800&v=beta&t=kqmOTbcpj4de-r5HkQGpwQ1FU8vjGoqYqW1lhOj0hyo",
    label: "Settings",
    desc: "Toggle",
    size: "normal",
    showOnMobile: false,
  },
  {
    id: 4,
    img: "https://media.licdn.com/dms/image/v2/D4D22AQE-ozXYJaxJbQ/feedshare-shrink_2048_1536/B4DZw3IiaKGQAk-/0/1770451511207?e=1775692800&v=beta&t=XYjBYD-kjOZ6ugfoz-1r-oHl2FkCGB9_svU9Nr8gmTk",
    label: "25M+",
    desc: "created prompts",
    size: "normal",
    showOnMobile: true,
  },
  {
    id: 5,
    img: "https://media.licdn.com/dms/image/v2/D4D22AQGb5tn8BH5BpQ/feedshare-shrink_2048_1536/B4DZw3IimuHMAk-/0/1770451512164?e=1775692800&v=beta&t=NP81NhAXphFWZ-n-NKaUWfQoqvsZtAIbXZm3oxdwuak",
    label: "12K",
    desc: "happy users",
    size: "normal",
    showOnMobile: true,
  },
  {
    id: 6,
    img: "/photo/13.JPG",
    label: "Branching paths",
    desc: "Explore multiple prompt directions with branching.",
    size: "tall",
    showOnMobile: false,
  },
  {
    id: 7,
    img: "https://media.licdn.com/dms/image/v2/D4D22AQEJ7hxcW8F1Xg/feedshare-shrink_2048_1536/B4DZteu2u.H4Aw-/0/1766820907694?e=1775692800&v=beta&t=WBr_LHogDm3ukn1k2KhoFomuz7C5q7S7zv-VUYFtQyA",
    label: "Keyword enhancer",
    desc: "Boost your prompt precision with keywords.",
    size: "tall",
    showOnMobile: false,
  },
  {
    id: 8,
    img: "https://media.licdn.com/dms/image/v2/D5622AQG8yi3QSEE7EQ/feedshare-shrink_800/B56Znh9SR1G0Ag-/0/1760432564008?e=1775692800&v=beta&t=rSrhvdN96gWiSW3AcJ0FCD4Fnijl8BQanBVI5m1C9Vc",
    label: "Prompt templates",
    desc: "Use pre-made templates to jumpstart creativity.",
    size: "tall",
    showOnMobile: false,
  },
  {
    id: 9,
    img: "/photo/15.JPG",
    label: "Generate",
    desc: "Start creating now",
    size: "normal",
    showOnMobile: true,
  },
];

const ABOUT_PARAGRAPHS = [
  "The Department of Computer Science and Engineering (CSE) with specializations in Internet of Things (IoT), Cyber Security (CS), and Blockchain Technology (BCT) at the University of Engineering and Management Kolkata and Institute of Engineering and Management Kolkata stands at the forefront of technological education and innovation.",
  "We are committed to nurturing the next generation of engineers and innovators by blending strong theoretical foundations with hands-on, industry-oriented learning. Our curriculum is carefully designed to keep pace with rapidly evolving technologies and industry demands, ensuring that students are equipped with the skills required to excel in a competitive global environment.",
  "The Internet of Things (IoT) specialization empowers students to design and develop intelligent, connected systems that drive smart cities, automation, and modern infrastructure. Through Cyber Security (CS), students gain expertise in protecting digital ecosystems, learning key concepts such as network security, cryptography, ethical hacking, and data privacy. The Blockchain Technology (BCT) program focuses on decentralized architectures, enabling students to build secure, transparent, and trust-driven applications for the future.",
  
];

/* ─── Simplified Animated Paragraph (Logic moved to Parent) ─── */
function AnimatedParagraph({
  text,
  className,
  index,
}: {
  text: string;
  className?: string;
  index: number;
}) {
  return (
    <div
      className={`paragraph-block flex flex-wrap gap-x-[0.35em] gap-y-1 ${className ?? "justify-center"}`}
      data-index={index}
    >
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="word-scroll inline-block opacity-[0.12] will-change-[opacity]"
        >
          {word}
        </span>
      ))}
    </div>
  );
}

/* ─── Bento Card (Unchanged as requested) ─── */
function BentoCard({
  item,
  index,
}: {
  item: (typeof bentoItems)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const img = imgRef.current;
    const overlay = overlayRef.current;
    if (!card || !img || !overlay) return;

    gsap.set(img, { filter: "grayscale(100%) brightness(0.7)" });
    gsap.set(overlay, { opacity: 1 });
    gsap.set(card, { opacity: 0, y: 40, scale: 0.96 });

    gsap.to(card, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "expo.out",
      delay: index * 0.08,
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });

    gsap.to(img, {
      filter: "grayscale(0%) brightness(1)",
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 70%",
        end: "top 30%",
        scrub: 1,
      },
    });

    gsap.to(overlay, {
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: card,
        start: "top 70%",
        end: "top 30%",
        scrub: 1,
      },
    });

    const onEnter = () =>
      gsap.to(img, { scale: 1.08, duration: 0.6, ease: "power2.out" });
    const onLeave = () =>
      gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [index]);

  const spanClass = {
    large: "lg:col-span-2 lg:row-span-2",
    tall: "lg:row-span-2",
    wide: "lg:col-span-2",
    normal: "lg:col-span-1 lg:row-span-1",
  }[item.size];
  const mobileVisibility = item.showOnMobile ? "flex" : "hidden lg:flex";

  return (
    <div
      ref={cardRef}
      className={`relative w-full h-full overflow-hidden rounded-2xl group cursor-pointer ${spanClass} ${mobileVisibility} flex-col`}
    >
      <Image
        ref={imgRef}
        src={item.img}
        alt={item.label}
        className="absolute inset-0 w-full h-full object-cover"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading={item.id === 4 ? "eager" : "lazy"}
      />
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#0c0c0c]/60 mix-blend-color pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/90 via-[#0c0c0c]/20 to-transparent flex flex-col justify-end p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <span className="text-sky-300 text-xs font-semibold tracking-widest uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {item.label}
        </span>
        <h3
          className="text-white font-bold text-lg md:text-xl leading-tight"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {item.label}
        </h3>
        <p className="text-white/60 text-sm mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          {item.desc}
        </p>
      </div>
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(56,189,248,0.75)]" />
    </div>
  );
}

/* ─── Main Component ──────────────────────────────── */
export default function AboutUs() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initial Intro Animations
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 90%" },
      },
    );
    gsap.fromTo(
      decorRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        scrollTrigger: { trigger: headingRef.current, start: "top 90%" },
      },
    );

    // 2. The Sequential Paragraph Scrubbing logic
    const blocks =
      textContainerRef.current?.querySelectorAll(".paragraph-block");
    if (blocks) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 75%", // Starts when container enters view
          end: "bottom 25%", // Ends when container is leaving
          scrub: 0.5, // Faster response for quicker color change
        },
      });

      blocks.forEach((block) => {
        const words = block.querySelectorAll(".word-scroll");
        tl.to(
          words,
          {
            opacity: 1,
            stagger: 0.04,
            ease: "none",
          },
          "+=0.02",
        ); // Small pause between paragraphs
      });
    }

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');
      `}</style>

      <section className="relative min-h-screen w-full px-4 sm:px-8 lg:px-16 overflow-hidden py-24 bg-slate-50">
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
            <span className="text-sky-600 text-xs font-bold tracking-[0.35em] uppercase mb-6 block">
              ◆ Who We Are ◆
            </span>
            <h2
              ref={headingRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
             Academic Excellence <br/>in <br />{" "}
             Next-Generation {" "}
              <em className="text-sky-600 not-italic">
                Computing
              </em>
            </h2>
            <div
              ref={decorRef}
              className="h-[2px] w-24 bg-sky-500/60 mb-12 origin-left"
            />

            {/* Unified Container for Sequential Scrubbing */}
            <div
              ref={textContainerRef}
              className="font-merriweather max-w-5xl text-center text-base sm:text-lg font-bold text-slate-700 leading-relaxed space-y-12"
            >
              {ABOUT_PARAGRAPHS.map((paragraph, index) => (
                <AnimatedParagraph key={index} text={paragraph} index={index} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 auto-rows-[160px] md:auto-rows-[180px] lg:auto-rows-[200px] gap-4">
            {bentoItems.map((item, i) => (
              <BentoCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
