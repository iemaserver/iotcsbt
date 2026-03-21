"use client";

import { useEffect, useRef } from "react";
import DepartmentPage from "@/components/site/DepartmentPage";

// ─── Data ────────────────────────────────────────────────────────────────────
const QUICK_CONTACTS = [
  {
    role: "Head of Department",
    name: "Prof. Dr. Sandip Mandal",
    email: "sandip.mandal@uem.edu.in",
  },
  {
    role: "Placement Coordinator",
    name: "Prof. Rohit Menon",
    email: "placement.cse@uem.edu.in",
  },
  {
    role: "Department Administration",
    name: "Ms. Kavya N",
    email: "admin.cse@uem.edu.in",
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      );
    });
  }, []);

  return (
    <DepartmentPage
      title="Contact Us"
      subtitle="Connect with the Dept. of CSE (IoT, CS & BT) for admissions, industry collaborations, and research inquiries."
    >
      <div ref={containerRef} className="max-w-7xl mx-auto py-8">
        <section className="grid gap-8 lg:grid-cols-2">
          {/* Column 1: Office Info & Map */}
          <article className="contact-card space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2
                className="text-2xl font-bold text-slate-900 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Department Office
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Innovation Block, University of Engineering & Management (UEM),{" "}
                <br />
                Salt Lake Electronics Complex, Sector V, <br />
                Kolkata, West Bengal 700091, India.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
                    <PhoneIcon />
                  </div>
                  <span className="font-medium">+91 33 2357 2059 (Office)</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <MailIcon />
                  </div>
                  <span className="font-medium">contact.cse@uem.edu.in</span>
                </div>
              </div>

              {/* Map Embed */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3334.2919682843212!2d88.48732647475677!3d22.5599251334359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a020b267a3cdc13%3A0xb3b21d652126f40!2sUniversity%20of%20Engineering%20%26%20Management%2C%20Kolkata%20(UEM)!5e1!3m2!1sen!2sin!4v1774084227319!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{border:0}}
                  allowFullScreen
                 
                  loading="lazy"
                 
                ></iframe>
              </div>
            </div>
          </article>

          {/* Column 2: Form & Socials */}
          <article className="contact-card space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2
                className="text-2xl font-bold text-slate-900 mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Send a Message
              </h2>
              <form className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                    type="text"
                    placeholder="Full Name"
                    required
                  />
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                    type="email"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                  type="text"
                  placeholder="Subject"
                  required
                />
                <textarea
                  className="min-h-[140px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                  placeholder="Tell us how we can help..."
                  required
                />
                <button className="w-full rounded-xl bg-slate-900 py-4 text-sm font-bold text-white shadow-lg hover:bg-sky-600 transition-all active:scale-[0.98]">
                  Submit Inquiry
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                  Official Channels
                </p>
                <div className="flex justify-center gap-6">
                  <a
                    href="#"
                    className="text-slate-600 hover:text-sky-600 font-semibold transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-sky-600 font-semibold transition-colors"
                  >
                    Twitter / X
                  </a>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-sky-600 font-semibold transition-colors"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* Quick Contacts Section */}
        <section className="contact-card mt-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm overflow-hidden">
            <h2
              className="text-2xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Key Points of Contact
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {QUICK_CONTACTS.map((contact) => (
                <div
                  key={contact.role}
                  className="flex flex-col p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-sky-200 hover:bg-white transition-all group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 mb-1">
                    {contact.role}
                  </span>
                  <h3 className="font-bold text-slate-900 mb-2">
                    {contact.name}
                  </h3>
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-sky-600 transition-colors"
                  >
                    <MailIcon /> {contact.email}
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-center text-slate-400 italic">
              * Faculty phone numbers are restricted. For urgent matters, please
              contact the main department office.
            </p>
          </div>
        </section>
      </div>
    </DepartmentPage>
  );
}
