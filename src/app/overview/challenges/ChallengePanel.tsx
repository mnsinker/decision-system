"use client";

import {
    ArrowDown,
    Activity,
} from "lucide-react";

import ChallengeVariant1 from "./ChallengeVariant1";
import ChallengeVariant2 from "./ChallengeVariant2";
import ChallengeVariant3 from "./ChallengeVariant3";


export default function ChallengePanel({
                                           challenge,
                                       }: {
    challenge: any;
}) {

    return (

        <div className="relative">

            {/* container */}

            <div
                className="
          overflow-hidden
          rounded-[3rem]
          border border-slate-200
          bg-white
          shadow-[0_32px_80px_-20px_rgba(15,23,42,0.08)]
        "
            >

                {/* ========================================= */}
                {/* TOP GRID */}
                {/* ========================================= */}

                <div className="grid lg:grid-cols-[1fr_1.2fr]">

                    {/* LEFT */}

                    <div
                        className="
              flex flex-col justify-center
              bg-white
              p-12 md:p-16
            "
                    >

                        <div
                            className="
                mb-8
                flex items-center gap-2
                font-mono text-[10px]
                font-bold uppercase
                tracking-[0.3em]
                text-slate-400
              "
                        >

                            <span className="h-1 w-1 rounded-full bg-slate-300"/>

                            {challenge.businessLabel}

                        </div>

                        <h3
                            className="
                text-4xl md:text-5xl
                font-bold italic
                leading-[1.1]
                tracking-tighter
                text-slate-900
              "
                        >

                            “{challenge.businessQuote}”

                        </h3>

                        <div className="mt-8 h-px w-12 bg-slate-100"/>

                        <p
                            className="
                mt-8 max-w-sm
                text-lg font-light
                leading-relaxed
                text-slate-500
              "
                        >

                            {challenge.businessDescription}

                        </p>

                    </div>

                    {/* RIGHT VARIANT */}
                    {challenge.variant === "variant1" && (
                        <ChallengeVariant1
                            challenge={challenge}
                        />
                    )}

                    {challenge.variant === "variant2" && (
                        <ChallengeVariant2
                            challenge={challenge}
                        />
                    )}

                    {challenge.variant === "variant3" && (
                        <ChallengeVariant3
                            challenge={challenge}
                        />
                    )}

                </div>

                {/* ========================================= */}
                {/* CONSEQUENCE */}
                {/* ========================================= */}

                <div
                    className="
            relative overflow-hidden
            border-t border-slate-100
            bg-slate-50/50
            p-8 md:p-12
          "
                >

                    {/* glow */}

                    <div
                        className="
              absolute -bottom-20 -left-20
              h-64 w-64
              rounded-full
              bg-rose-500/5
              blur-[80px]
              pointer-events-none
            "
                    />

                    {/* connector */}

                    <div
                        className="
              absolute left-1/2 top-0
              hidden
              -translate-x-1/2
              -translate-y-1/2
              lg:block
            "
                    >

                        <div className="flex flex-col items-center">

                            <div className="h-6 w-px bg-slate-200"/>

                            <div
                                className="
                  rounded-full
                  bg-slate-900
                  p-2.5
                  text-white
                  shadow-xl
                  ring-4 ring-white
                "
                            >

                                <ArrowDown
                                    size={14}
                                    className="text-rose-400"
                                    fill="currentColor"
                                />

                            </div>

                        </div>

                    </div>

                    {/* content */}

                    <div className="relative z-10 mx-auto max-w-4xl">

                        <div
                            className="
                grid items-start gap-8
                md:grid-cols-[200px_1fr]
              "
                        >

                            {/* label */}

                            <div>

                                <div
                                    className="
                    inline-flex items-center gap-2
                    rounded
                    bg-rose-50
                    px-2 py-1
                    font-mono text-[10px]
                    font-bold uppercase
                    tracking-[0.3em]
                    text-rose-600
                  "
                                >

                                    <Activity size={12}/>

                                    {challenge.consequenceLabel}

                                </div>

                            </div>

                            {/* text */}

                            <div className="space-y-4">

                                <h4
                                    className="
                    text-2xl font-bold
                    leading-tight
                    tracking-tight
                    text-slate-900
                  "
                                >

                                    {challenge.consequenceTitleBeg}

                                    {" "}

                                    <span className="relative inline-block">

                    <span className="relative z-10 text-rose-700">

                      {challenge.consequenceHighlight}

                    </span>

                    <span
                        className="
                        absolute bottom-1 left-0
                        h-2 w-full
                        bg-rose-100
                        -z-0
                      "
                    />

                  </span>

                                    {" "}

                                    {challenge.consequenceTitleEnd}

                                </h4>

                                <p
                                    className="
                    text-sm
                    leading-relaxed
                    text-slate-500
                  "
                                >

                                    {challenge.consequenceDescription}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}