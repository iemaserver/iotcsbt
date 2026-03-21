import type { ReactNode } from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

type DepartmentPageProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function DepartmentPage({
  title,
  subtitle,
  children,
}: DepartmentPageProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-sky-50 via-blue-50 to-slate-100 text-slate-900">
      <Navbar />
      <main className="px-4 pb-16 pt-36 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <section className="mb-8 rounded-3xl border border-sky-200/70 bg-gradient-to-r from-white via-sky-50 to-blue-100 px-5 py-8 shadow-sm sm:px-7">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700/80">
              Department Of Computer Science & Engineering (IoT, CS, BT)
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-sky-900 sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {subtitle}
            </p>
          </section>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
