// src/app/playground/system-log/page.tsx

const LogTransition = () => (
  <div className="max-w-xl mx-auto py-16 font-mono text-[12px] text-slate-500">
    <div className="flex items-center gap-4 mb-2 opacity-60">
      <span className="text-emerald-500">✓</span>
      <span>Legacy pipeline terminated.</span>
    </div>
    <div className="flex items-center gap-4 animate-pulse">
      <span className="text-blue-500">→</span>
      <span className="text-slate-300">Injecting dynamic execution graph...</span>
    </div>
  </div>
);

export default LogTransition;