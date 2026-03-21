export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-linear-to-b from-sky-50 via-blue-50 to-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="relative mb-8 flex items-center justify-center">
          <div className="h-20 w-20 rounded-full border-4 border-sky-200" />
          <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-transparent border-t-sky-600 border-r-sky-500" />
          <div className="absolute h-9 w-9 rounded-full bg-white shadow-sm" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-sky-900 sm:text-3xl">
          Loading Department Portal
        </h2>
        <p className="mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
          Preparing your page with the latest academic content, research updates, and lab highlights.
        </p>

        <div className="mt-8 flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-sky-500 [animation-delay:0ms]" />
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-sky-500 [animation-delay:180ms]" />
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-sky-500 [animation-delay:360ms]" />
        </div>

        <div className="mt-10 h-1.5 w-64 overflow-hidden rounded-full bg-sky-100">
          <div className="h-full w-1/2 animate-[loader_1.2s_ease-in-out_infinite] rounded-full bg-linear-to-r from-sky-500 to-cyan-500" />
        </div>
      </div>

      <style>{`@keyframes loader { 0% { transform: translateX(-90%); } 50% { transform: translateX(60%); } 100% { transform: translateX(-90%); } }`}</style>
    </div>
  );
}
