"use client";

import { useEffect, useRef } from "react";
import DepartmentPage from "@/components/site/DepartmentPage";



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
               University Area, Plot No. III – B/5, New Town, Action Area – III, Kolkata – 700160
              </p>

              <div className="space-y-4">
               
                <div className="flex items-center gap-3 text-slate-700">
                 
                  <span className="font-medium">iedc.iotcsbt@iem.edu.in</span>
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
                    href="https://www.linkedin.com/company/uem-innovation-and-entrepreneurship-development-cell/posts/?feedView=all"
                    className="text-slate-600 hover:text-sky-600 font-semibold transition-colors"
                  >
                    LinkedIn
                  </a>
                 
                </div>
              </div>
            </div>
          </article>
        </section>

    
      </div>
    </DepartmentPage>
  );
}
