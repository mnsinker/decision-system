import { challengesContent } from "@/content/overview/challenges";

export default function PlanningPanel() {

  const planning = challengesContent.en.planning;

  return (
    <div className="overflow-hidden rounded-[2.8rem] border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.04)]">

      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">

        {/* left */}
        <div className="border-b border-slate-100 bg-slate-50 p-10 lg:border-b-0 lg:border-r">

          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Business Request
          </div>

          <p className="mt-10 text-3xl font-bold leading-tight text-slate-900">
            “{planning.businessQuote}”
          </p>

          <p className="mt-10 max-w-md leading-relaxed text-slate-600">
            {planning.businessDescription}
          </p>

        </div>

        {/* right */}
        <div className="p-10">

          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            System Reality
          </div>

          <div className="mt-10 space-y-4">

            {planning.systemQuestions.map((item, idx) => (

              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700"
              >
                {item}
              </div>

            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-indigo-100 bg-indigo-50 px-6 py-5">

            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-500">
              Operational Result
            </div>

            <p className="mt-3 leading-relaxed text-slate-700">
              {planning.result}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}