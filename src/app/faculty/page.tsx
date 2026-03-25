"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import DepartmentPage from "@/components/site/DepartmentPage";

type FacultyMember = {
  sl: number;
  name: string;
  designation: string;
  email: string | null;
  linkedin: string;
  photo: string;
  researchArea: string | string[];
  message: string | null;
};

// Exact hierarchy from the original Excel list, with student researchers appended (do not reorder)
const RESEARCHERS = [
  {
    sl: 1,
    name: "Dr. Sandip Mandal",
    designation: "HOD of CSE (IoT, CS, BT) & Professor",
    email: "sandip.mandal@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Sandip+Mandal+UEM",
    photo: "/photo/hod.jpg",
    researchArea: "IoT Architecture, Smart Systems, Embedded Intelligence",
    message:
      '"Curiosity is the engine of achievement. We are here to ignite it in every student who walks through our doors. By bridging the gap between theoretical knowledge and hands-on application, we prepare our graduates to be industry leaders. Let us build a future where technology solves real-world challenges."',
  },
  {
    sl: 2,
    name: "Sweta Saha",
    designation: "Assistant Professor",
    email: "shweta.saha@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Sweta+Saha+UEM",
    photo:
      "https://res.cloudinary.com/dvky83edw/image/upload/v1774123174/iot/faculty/lkxoyuxhfwc1lklygjpo.jpg",
    researchArea: "Cloud Computing, Software Engineering, Full-Stack Systems",
    message:
      '"Every line of code you write is a step closer to changing the world. Keep building, keep exploring. Embrace the inevitable bugs and errors as learning opportunities rather than roadblocks. Your persistence today will shape the innovative software solutions of tomorrow."',
  },
  {
    sl: 3,
    name: "Dr. Siddhartha Roy",
    designation: "Associate Professor",
    email: "siddhartha.roy@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Siddhartha+Roy+UEM",
    photo:
      "https://res.cloudinary.com/dvky83edw/image/upload/v1774123255/iot/faculty/sf82lahannlnw8gd79dp.jpg",
    researchArea: "Machine Learning, Data Analytics, Pattern Recognition",
    message:
      '"Research is not just about finding answers - it is about asking the right questions with conviction. I encourage you to look beyond the textbook and challenge established paradigms. True academic excellence is born in the pursuit of the unknown and the desire to push boundaries."',
  },
  {
    sl: 4,
    name: "Dr. Arijeet Ghosh",
    designation: "Associate Professor",
    email: "arijeet.ghosh@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Arijeet+Ghosh+UEM",
    photo:
      "https://res.cloudinary.com/dvky83edw/image/upload/v1774123428/iot/faculty/44927b53-2efb-4b9b-82a7-82abae394fb3.png",
    researchArea: "Cyber-Physical Systems, Edge Intelligence, IoT Security",
    message:
      '"Technology is most powerful when it serves humanity. Let that be the north star of your career. As you develop complex systems and IoT devices, always consider their societal impact. Responsible engineering is just as critical as technical proficiency."',
  },
  {
    sl: 5,
    name: "Avik Kumar Das",
    designation: "Associate Professor",
    email: null,
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Avik+Kumar+Das+UEM",
    photo:
      "https://res.cloudinary.com/dvky83edw/image/upload/v1774123617/iot/faculty/4b1a97c3-7ec0-4abb-beaa-975e02ddca7a.png",
    researchArea: "Distributed Systems, Computer Networks, Scalable Platforms",
    message:
      '"Learning never exhausts the mind - it only reveals how much more there is to discover. Stay hungry for knowledge and never settle for superficial understanding. The tech landscape evolves rapidly, and lifelong learning is your best tool for sustained success."',
  },
  {
    sl: 6,
    name: "Rangon Sarkar",
    designation: "Assistant Professor",
    email: "rangon.sarkar@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Rangon+Sarkar+UEM",
    photo:
      "https://res.cloudinary.com/dvky83edw/image/upload/v1774125626/iot/faculty/wwl69ve9rrjc2kprofqp.jpg",
    researchArea: "Reliable Systems, Fault Tolerance, IoT Infrastructure",
    message:
      '"Great engineers are not just problem solvers - they are problem finders. Train your eye to see what others miss. The most valuable skill you can cultivate is the ability to anticipate system failures before they occur. Design with resilience in mind."',
  },
  {
    sl: 7,
    name: "Apurba Nandi",
    designation: "Assistant Professor",
    email: "apurba.nandi@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Apurba+Nandi+UEM",
    photo:
      "https://res.cloudinary.com/dvky83edw/image/upload/v1774123987/iot/faculty/c2c77c23-20cc-4cd6-8788-82eacf0779fe.png",
    researchArea: "Algorithms, Computational Thinking, Applied Programming",
    message:
      '"The best classroom is one where curiosity meets discipline. Come prepared and leave transformed. Success in computer science requires a delicate balance of creative thinking and rigorous logical structuring. Master both, and there are no limits to what you can create."',
  },
  {
    sl: 8,
    name: "Suchanda Chatterjee (Das)",
    designation: "Assistant Professor",
    email: "suchanda.chatterjee@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Suchanda+Chatterjee+UEM",
    photo: "/photo/3.jpg",
    researchArea: "Human-Centered Computing, UX Engineering, Software Design",
    message:
      '"Innovation begins with empathy. Understand the problem deeply before you write a single line. User-centric design should drive your algorithms, not the other way around. Always build software that empowers people and simplifies their daily lives."',
  },
  {
    sl: 9,
    name: "Sangita Dutta",
    designation: "Associate Professor",
    email: "sangita.dutta@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Sangita+Dutta+UEM",
    photo:
      "https://res.cloudinary.com/dvky83edw/image/upload/v1774124304/iot/faculty/zjk1sdvuv7nogngftflg.jpg",
    researchArea: "Learning Systems, Academic Mentorship, Inclusive Pedagogy",
    message:
      '"Every student carries a spark. My role is simply to ensure it never goes out. I believe in fostering an environment where making mistakes is safely encouraged, provided you learn from them. Your unique perspective is your greatest asset in tech."',
  },
  {
    sl: 10,
    name: "Sayantani Das",
    designation: "Assistant Professor",
    email: "sayantani.das@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Sayantani+Das+UEM",
    photo:
      "https://res.cloudinary.com/dvky83edw/image/upload/v1774124433/iot/faculty/1c4c16f5-5dc6-4096-831a-23b5c6473e50.png",
    researchArea: "Data Structures, Networked Applications, System Design",
    message:
      '"Consistency and grit outperform talent every single time. Show up, put in the work. The path to mastering complex data structures or networking protocols isn\'t always linear. Celebrate the small victories and trust in the process of daily improvement."',
  },
  {
    sl: 11,
    name: "Nitu Saha",
    designation: "Assistant Professor",
    email: "nitu.saha@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Nitu+Saha+UEM",
    photo:
      "https://res.cloudinary.com/dvky83edw/image/upload/v1774124724/iot/faculty/ilur4cwoztp5injijtak.jpg",
    researchArea:
      "Team Science, Collaborative Development, Engineering Education",
    message:
      '"Collaboration turns individual strengths into collective breakthroughs. Learn to build together. In the modern tech industry, lone wolves are rare; success is driven by diverse teams communicating effectively. Practice your soft skills as rigorously as your coding."',
  },
  {
    sl: 12,
    name: "Ahona Ghosh",
    designation: "Associate Professor",
    email: "ahona.ghosh@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Ahona+Ghosh+UEM",
    photo:
      "https://res.cloudinary.com/dvky83edw/image/upload/v1774124862/iot/faculty/xgiwesp5gf00ubxn3q45.jpg",
    researchArea:
      "Data Intelligence, Analytical Modeling, Evidence-Driven Computing",
    message:
      '"Data speaks to those who listen carefully. Let critical thinking be your most refined skill. In an age of information overload, the ability to parse noise and extract actionable insights is invaluable. Let logic and evidence guide your technical decisions."',
  },
  {
    sl: 13,
    name: "Uddipan Ghosh",
    designation: "Assistant Professor",
    email: "uddipan.ghosh@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Uddipan+Ghosh+UEM",
    photo:
      "https://res.cloudinary.com/dvky83edw/image/upload/v1774125184/iot/faculty/9c2d31d5-a96e-4978-9712-4dd3d3c6162c.png",
    researchArea: "AI for IoT, Ethical Intelligence, Emerging Technologies",
    message:
      '"The future belongs to those who dare to imagine it differently. Dream boldly, build precisely. We stand on the brink of unprecedented technological shifts in AI and IoT. It is your generation\'s responsibility to steer these advancements ethically and brilliantly."',
  },
  {
    sl: 14,
    name: "Aritra Sen",
    designation: "Student Researcher",
    email: "aritra.sen@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Aritra+Sen+UEM",
    photo: "/photo/1.jpg",
    researchArea: ["IoT Sensor Networks", "Low-Power Embedded Design"],
    message: null,
  },
  {
    sl: 15,
    name: "Ria Mukherjee",
    designation: "Student Researcher",
    email: "ria.mukherjee@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Ria+Mukherjee+UEM",
    photo: "/photo/2.jpg",
    researchArea: ["Applied Machine Learning", "NLP for Education"],
    message: null,
  },
  {
    sl: 16,
    name: "Souvik Das",
    designation: "Student Researcher",
    email: "souvik.das@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Souvik+Das+UEM",
    photo: "/photo/4.jpg",
    researchArea: ["Embedded Systems", "Edge AI"],
    message: null,
  },
  {
    sl: 17,
    name: "Ananya Pal",
    designation: "Student Researcher",
    email: "ananya.pal@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Ananya+Pal+UEM",
    photo: "/photo/5.jpg",
    researchArea: ["Computer Vision", "Smart City Analytics"],
    message: null,
  },
  {
    sl: 18,
    name: "Debayan Roy",
    designation: "Student Researcher",
    email: "debayan.roy@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Debayan+Roy+UEM",
    photo: "/photo/6.jpg",
    researchArea: ["Secure IoT Communication", "Network Protocol Hardening"],
    message: null,
  },
  {
    sl: 19,
    name: "Ishita Ghosh",
    designation: "Student Researcher",
    email: "ishita.ghosh@uem.edu.in",
    linkedin:
      "https://www.linkedin.com/search/results/all/?keywords=Ishita+Ghosh+UEM",
    photo: "/photo/7.jpg",
    researchArea: [
      "Data-Driven Healthcare Systems",
      "Biomedical Signal Analytics",
    ],
    message: null,
  },
] as const satisfies FacultyMember[];

// ─── Icons ────────────────────────────────────────────────────────────
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? "h-4 w-4"}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-4 w-4"}
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// ─── Researcher Card Component ───────────────────────────────────────────────
function ResearcherCard({
  member,
  index,
  isFeatured = false,
}: {
  member: FacultyMember;
  index: number;
  isFeatured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.08,
          ease: "power3.out",
        },
      );
    });
  }, [index]);

  // Clean the quotes off the message if they exist in the raw data
  const cleanMessage = member.message
    ? member.message.replace(/^"|"$/g, "")
    : null;
  const researchAreas = Array.isArray(member.researchArea)
    ? member.researchArea
    : member.researchArea
        .split(",")
        .map((area) => area.trim())
        .filter(Boolean);
  const isStudentResearcher = member.designation === "Student Researcher";

  return (
    <article
      ref={cardRef}
      className={`group flex bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden ${
        isFeatured
          ? "flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-8 items-center md:items-start text-center md:text-left w-full"
          : "flex-col p-6 gap-5 items-center text-center h-full"
      }`}
    >
      {/* Image Container 
        Strictly enforces a 4:5 aspect ratio without cropping awkwardly.
        isFeatured uses 224x280px (w-56 h-[280px]). Normal uses 160x200px (w-40 h-[200px]). 
      */}
      <div
        className={`relative shrink-0 overflow-hidden rounded-2xl border-4 border-white shadow-md bg-slate-100 transition-transform duration-500 group-hover:scale-[1.02] ${
          isFeatured ? "w-56 h-[280px]" : "w-40 h-[200px]"
        }`}
      >
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover"
          sizes={isFeatured ? "(max-width: 768px) 224px, 224px" : "160px"}
        />
        {/* Subtle inner ring to make the image pop */}
        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-col flex-1 w-full h-full">
        {/* Affiliation */}
        <div
          className={`flex flex-wrap items-center gap-2 mb-2 ${isFeatured ? "justify-center md:justify-start" : "justify-center"}`}
        >
          <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600 border border-slate-100">
            {member.designation}
          </span>
        </div>

        {/* Name */}
        <h3
          className={`font-bold text-slate-900 ${isFeatured ? "text-2xl md:text-3xl" : "text-xl"}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {member.name}
        </h3>

        {isStudentResearcher ? (
          <div
            className={`mt-3 mb-1 ${isFeatured ? "text-center md:text-left" : "text-center"}`}
          >
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              Research Areas
            </p>
            <div
              className={`flex flex-wrap items-center gap-2 ${isFeatured ? "justify-center md:justify-start" : "justify-center"}`}
            >
              {researchAreas.map((area, areaIndex) => (
                <span
                  key={`${member.sl}-area-${areaIndex}`}
                  className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-700 border border-sky-100"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {/* Quote */}
        {cleanMessage ? (
          <p
            className={`mt-3 text-slate-600 italic leading-relaxed ${isFeatured ? "text-base" : "text-sm"}`}
          >
            &quot;{cleanMessage}&quot;
          </p>
        ) : null}

        {!isStudentResearcher ? (
          <div
            className={`mt-3 mb-1 ${isFeatured ? "text-center md:text-left" : "text-center"}`}
          >
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              Research Areas
            </p>
            <div
              className={`flex flex-wrap items-center gap-2 ${isFeatured ? "justify-center md:justify-start" : "justify-center"}`}
            >
              {researchAreas.map((area, areaIndex) => (
                <span
                  key={`${member.sl}-post-msg-area-${areaIndex}`}
                  className="inline-flex items-center rounded-full bg-green-200/80 px-2.5 py-1 text-[11px] font-semibold text-sky-700 border border-sky-100"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {/* Actions (Pinned to bottom via mt-auto) */}
        <div
          className={`mt-auto pt-5 flex flex-wrap items-center gap-3 ${isFeatured ? "justify-center md:justify-start" : "justify-center"}`}
        >
          {member.email ? (
            <a
              href={`mailto:${member.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
              title={member.email}
            >
              <MailIcon className="h-4 w-4" />
              Email
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-xl bg-slate-50/50 px-4 py-2 text-xs font-medium text-slate-400">
              <MailIcon className="h-4 w-4" />
              N/A
            </span>
          )}

          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0A66C2]/10 px-4 py-2 text-xs font-semibold text-[#0A66C2] transition hover:bg-[#0A66C2] hover:text-white"
          >
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── Main Page Component ────────────────────────────────────────────────
export default function FacultyPage() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      );
    });
  }, []);

  const facultyResearchers = RESEARCHERS.filter(
    (member) => member.designation !== "Student Researcher",
  );
  const studentResearchers = RESEARCHERS.filter(
    (member) => member.designation === "Student Researcher",
  );

  const leadResearcher = facultyResearchers[0];
  const otherFacultyResearchers = facultyResearchers.slice(1);

  return (
    <DepartmentPage
      title="Researchers"
      subtitle="Our research team drives foundational inquiry, applied innovation, and student-led discovery in Computer Science and IoT."
    >
      <section className="relative p-5 sm:p-8 bg-slate-50/50 rounded-3xl border border-slate-200/60">
        {/* Header Title */}
        <div
          ref={headingRef}
          className="relative z-10 mb-10 text-center sm:mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">
            Research Leadership
          </p>
          <h2
            className="text-3xl font-bold text-slate-900 sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Meet Our Researchers
          </h2>
        </div>

        {/* HOD Section (Featured Card) */}
        <div className="relative z-10 mb-12">
        

          <div className="mx-auto max-w-5xl">
            {/* isFeatured flag explicitly set for lead researcher */}
            <ResearcherCard
              member={leadResearcher}
              index={0}
              isFeatured={true}
            />
          </div>
        </div>

        {/* Faculty Researchers (Grid) */}
        <div className="relative z-10">
          

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {otherFacultyResearchers.map((member, index) => (
              <ResearcherCard
                key={member.sl}
                member={member}
                index={index + 1}
              />
            ))}
          </div>
        </div>

        {/* Student Researchers Divider + Grid */}
        <div className="relative z-10 mt-12">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-slate-400/90" />
            <span className="text-sm md:text-base font-extrabold uppercase tracking-[0.18em] text-slate-700 text-center">
              Student Researchers
            </span>
            <span className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-slate-400/90" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {studentResearchers.map((member, index) => (
              <ResearcherCard
                key={member.sl}
                member={member}
                index={otherFacultyResearchers.length + index + 1}
              />
            ))}
          </div>
        </div>
      </section>
    </DepartmentPage>
  );
}
