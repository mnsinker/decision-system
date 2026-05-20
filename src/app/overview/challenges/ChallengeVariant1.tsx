"use client";

import { Terminal } from "lucide-react";

export default function ChallengeVariant1({
  challenge,
}: {
  challenge: any;
}) {

  const realityPoints =
    challenge.systemQuestions || [];

  return (

    <div className="relative bg-slate-900 p-12 md:p-16 text-white">

      {/* grid */}

      <div
        className="
          absolute inset-0
          pointer-events-none
          opacity-[0.03]
          bg-[radial-gradient(#fff_1px,transparent_1px)]
          [background-size:20px_20px]
        "
      />

      <div className="relative z-10">

        {/* header */}

        <div className="mb-10">

          <div
            className="
              flex items-center gap-2
              font-mono text-[10px]
              font-bold uppercase
              tracking-[0.4em]
              text-indigo-400
            "
          >

            <Terminal size={14} />

            {challenge.systemLabel}

          </div>

        </div>

        {/* questions */}

        <div className="space-y-3">

          {realityPoints.map(
            (
              point: string,
              i: number
            ) => (

              <div
                key={i}
                className="
                  group/item
                  flex items-center gap-4
                  rounded-2xl
                  border border-white/5
                  bg-white/[0.02]
                  p-5
                  transition-all
                  hover:bg-white/[0.05]
                "
              >

                <div
                  className="
                    flex h-7 w-7
                    shrink-0
                    items-center justify-center
                    rounded-lg
                    border border-white/5
                    bg-slate-800
                    font-mono text-[9px]
                    text-slate-500
                    transition-colors
                    group-hover/item:text-indigo-400
                  "
                >

                  0{i + 1}

                </div>

                <p
                  className="
                    text-sm font-medium
                    leading-snug
                    text-slate-300
                  "
                >

                  {point}

                </p>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}