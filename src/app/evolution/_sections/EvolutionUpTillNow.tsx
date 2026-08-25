"use client";

import { useState, type ReactNode } from "react";
import {
  Check,
  AlertTriangle,
  ArrowDown,
  ChevronRight,
  PencilLine,
  RefreshCw,
  ShieldCheck,
  Sliders,
} from "lucide-react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";

type EvolutionItem = {
  version: string;
  title: string;
  subtitle: string;
  capability: string;
  beforeCode: string[];
  afterCode: string[];
  beforeTooltip: ReactNode;
  afterTooltip?: ReactNode;
  beforeDiagram: ReactNode;
  afterDiagram: ReactNode;
};

// Precise syntax coloring optimizing depth against the refined background
const highlightCode = (line: string) => {
  return line
    .replace(
      /\b(while|for|in|def|class)\b/g,
      '<span class="text-slate-500 font-semibold">$1</span>',
    )
    .replace(
      /\b(planner|validate_graph|run_agent|get_first_tool|get_next_tool)\b/g,
      '<span class="text-indigo-400 font-medium">$1</span>',
    )
    .replace(
      /(steps\.insert\(i, missing_step\))/g,
      '<span class="text-indigo-400 font-medium">$1</span>',
    )
    .replace(/#.*/g, '<span class="text-slate-600 italic">$&</span>')
    .replace(/\/\/.*/g, '<span class="text-slate-600 italic">$&</span>');
};

export default function EvolutionUpTillNow() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const panelRadius = theme.radius.cardSm;
  const diagramBoxWidth = "mx-auto w-full max-w-[420px]";
  const [isValidatorExpanded, setIsValidatorExpanded] = useState(false);

  const evolutionData: EvolutionItem[] = [
    {
      version: "V1",
      title: "Runtime Repair → Pre-runtime Planning",
      subtitle:
        "Extracting runtime topology and path logic outside of the execution loop path.",
      capability: "Dependency-aware execution planning",
      beforeTooltip: (
        <ul className="list-disc space-y-1 pl-4">
          <li>Graph correctness could not be validated upfront</li>
          <li>Execution paths emerged during runtime</li>
          <li>
            Dependency issues could only be surfaced after execution started
          </li>
        </ul>
      ),
      afterTooltip: (
        <ul className="list-disc space-y-1 pl-4">
          <li>Execution steps became deterministic</li>
          <li>Graph correctness became testable upfront</li>
          <li>Runtime loop no longer mutates execution paths</li>
        </ul>
      ),
      beforeCode: [
        "while i < len(steps):",
        "    missing_step = find_missing(...)",
        "    if missing_step:",
        "           steps.insert(i, missing_step)",
        "           continue",
        "",
        "",
        "    params = resolve_params(step)",
        "    result = step.run(**params)",
      ],
      afterCode: [
        "",
        "",
        "steps = planner.plan(intent, graph)",
        "",
        "",
        "",
        "for step in steps:",
        "    params = resolve_params(step)",
        "    result = step.run(**params)",
      ],
      beforeDiagram: (
        <div className="flex h-[120px] w-full flex-col justify-end font-mono text-[11px]">
          <div
            className={cn(
              "invisible mb-3 flex h-10 items-center justify-center border border-dashed border-slate-700/40 bg-slate-900/10 text-[10px] text-slate-500 italic",
              diagramBoxWidth,
              panelRadius,
            )}
            aria-hidden="true"
          >
            [ Missing Pre-Flight Domain ]
          </div>
          <div
            className={cn(
              "border border-slate-700/80 bg-slate-900/20 p-2",
              diagramBoxWidth,
              panelRadius,
            )}
          >
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              <RefreshCw size={10} className="text-slate-500" /> Runtime Loop
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span
                className={cn(
                  "border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-medium text-indigo-300",
                  panelRadius,
                )}
              >
                Missing dep
              </span>
              <span className="text-slate-600">→</span>
              <span
                className={cn(
                  "border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-medium text-indigo-300",
                  panelRadius,
                )}
              >
                Insert step
              </span>
              <span className="text-slate-600">→</span>
              <span
                className={cn(
                  "border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-400",
                  panelRadius,
                )}
              >
                Execute
              </span>
            </div>
          </div>
        </div>
      ),
      afterDiagram: (
        <div className="flex h-[120px] w-full flex-col justify-end font-mono text-[11px]">
          <div
            className={cn(
              "mb-1.5 flex w-full items-center justify-center gap-1.5 border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-center text-[11px] font-bold text-indigo-300 shadow-md shadow-indigo-950/50",
              diagramBoxWidth,
              panelRadius,
            )}
          >
            <Sliders size={11} className="text-indigo-400" /> Planned Steps
          </div>
          <div className="mb-1 flex justify-center text-slate-600">
            <ArrowDown size={12} />
          </div>
          <div
            className={cn(
              "border border-slate-700 bg-slate-900/20 p-2",
              diagramBoxWidth,
              panelRadius,
            )}
          >
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              <RefreshCw size={10} className="text-slate-500" /> Runtime Loop
            </div>
            <div className="flex items-center justify-center py-1 text-[10px] text-slate-400">
              <span
                className={cn(
                  "border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-400",
                  panelRadius,
                )}
              >
                Execute
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      version: "V2",
      title: "Implicit Trust → Explicit Validation",
      subtitle:
        "Isolating topology health verification away from core calculation execution.",
      capability: "Deterministic upfront structural guarantees",
      beforeTooltip: (
        <div className="space-y-2">
          <p>
            Cycle safety existed,
            <br />
            but validation only happened
            <br />
            during active execution.
          </p>
          <div className="border-t border-slate-700/70 pt-2">
            <ul className="list-disc space-y-1 pl-4">
              <li>graph integrity was still unknown</li>
              <li>missing producers were undetected</li>
              <li>failures surfaced after execution started</li>
            </ul>
          </div>
        </div>
      ),
      afterTooltip: (
        <div className="space-y-2">
          <p>
            Validation became
            <br />a dedicated pre-runtime layer.
          </p>
          <div className="border-t border-slate-700/70 pt-2">
            <ul className="list-disc space-y-1 pl-4">
              <li>Graph correctness became testable upfront.</li>
              <li>Execution paths became deterministic.</li>
              <li>Failures moved into pre-flight validation.</li>
            </ul>
          </div>
        </div>
      ),
      beforeCode: [
        "graph = build_graph(tools)",
        "",
        "for step in steps:",
        "\t if step in path:\n",
        "\t\t raise CycleError()\n",
        "",
        "\t params = resolve_params(step)",
        "\t step.run()",
      ],
      afterCode: [
        "graph = build_graph(tools)",
        "",
        "validate_cycle()",
        "validate_integrity()",
        "",
        "for step in steps:",
        "\t params = resolve_params(step)",
        "\t step.run()",
      ],
      beforeDiagram: (
        <div className="flex h-[120px] w-full flex-col justify-end font-mono text-[11px]">
          <div
            className={cn(
              "invisible mb-3 flex h-10 items-center justify-center border border-dashed border-slate-700/40 bg-slate-900/10 text-[10px] text-slate-500 italic",
              diagramBoxWidth,
              panelRadius,
            )}
            aria-hidden="true"
          >
            [ Missing Evaluation Gates ]
          </div>
          <div
            className={cn(
              "border border-slate-700 bg-slate-900/20 p-2",
              diagramBoxWidth,
              panelRadius,
            )}
          >
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              RUNTIME LOOP
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span
                className={cn(
                  "border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-medium text-indigo-300",
                  panelRadius,
                )}
              >
                Cycle Detection
              </span>
              <span className="text-slate-600">→</span>
              <span
                className={cn(
                  "border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-400",
                  panelRadius,
                )}
              >
                Execute
              </span>
            </div>
          </div>
        </div>
      ),
      afterDiagram: (
        <div className="flex min-h-[120px] w-full flex-col justify-end font-mono text-[11px]">
          <button
            type="button"
            onClick={() => setIsValidatorExpanded((isExpanded) => !isExpanded)}
            aria-expanded={isValidatorExpanded}
            className={cn(
              "mb-1.5 flex w-full cursor-pointer flex-col items-center justify-center gap-2 border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-center text-[11px] font-bold text-indigo-300 shadow-md shadow-indigo-950/50 transition-colors hover:border-indigo-400/70 hover:bg-indigo-500/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400",
              diagramBoxWidth,
              panelRadius,
            )}
          >
            <span className="flex items-center justify-center gap-1.5">
              <ShieldCheck size={11} className="text-indigo-400" />
              VALIDATOR
              <ChevronRight
                size={12}
                aria-hidden="true"
                className={cn(
                  "text-indigo-300 transition-transform",
                  isValidatorExpanded && "rotate-90",
                )}
              />
            </span>
            {isValidatorExpanded && (
              <span className="block max-w-[330px] border-t border-indigo-400/20 pt-2 text-left font-sans text-[11px] leading-relaxed font-medium text-slate-300">
                • Graph correctness became testable upfront.
                <br />
                • Execution paths became deterministic.
                <br />• Failures moved into pre-flight validation.
              </span>
            )}
          </button>
          <div className="mb-1 flex justify-center text-slate-600">
            <ArrowDown size={12} />
          </div>
          <div
            className={cn(
              "border border-slate-700 bg-slate-900/20 p-2",
              diagramBoxWidth,
              panelRadius,
            )}
          >
            <div className="mb-1 flex items-center justify-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
              RUNTIME LOOP
            </div>
            <div className="flex items-center justify-center gap-4 py-1 text-[10px] text-slate-400">
              <span
                className={cn(
                  "border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-400",
                  panelRadius,
                )}
              >
                Execute
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      version: "V3",
      title: "Manual Tool Wiring → Self-Describing Tools",
      subtitle:
        "Decomposing macro objects into granular nodes explicitly typed for runtime routing.",
      capability:
        "Decoupled validation, feature scoring, and strategy branches",
      beforeTooltip:
        "Architectural Bottleneck: Monolithic black boxes combine schema constraints, deep neural feature transforms, and fallback strategies, resulting in regression collisions across teams.",
      afterTooltip: (
        <ul className="list-disc space-y-1 pl-4">
          <li>Metadata defined once</li>
          <li>Graph derived automatically</li>
        </ul>
      ),
      beforeCode: [
        "# Tool signature",
        "def check_coupon(",
        "    order: OrderSummaryDTO,",
        "    user: UserProfileDTO",
        ") -> CouponEligibilityDTO:",
        "    ...",
        "",
        "# Tool registry",
        "dependency_arg=[",
        "\tOrderSummaryDTO,",
        "\tUserProfileDTO",
        "]",
        "",
        "# Entity_to_Tool mapping",
        "ENTITY_TO_TOOL = {",
        '    CouponEligibilityDTO: "check_coupon"}',
      ],
      afterCode: [
        "# Tool signature",
        "def check_coupon(",
        "    order: OrderSummaryDTO,",
        "    user: UserProfileDTO",
        ") -> CouponEligibilityDTO:",
        "    ...",
        "",
        "",
        "# Auto-derived schema",
        "tool_schema = derive_tool_schema(check_coupon)",
        "",
        "tool_schema.requires\t# [OrderSummaryDTO, UserProfileDTO]",
        "tool_schema.provides\t# [CouponEligibilityDTO]",
      ],
      beforeDiagram: (
        <div className="flex min-h-[205px] w-full flex-col items-center justify-center font-mono text-[11px]">
          <div className="mb-2 text-center text-[11px] font-bold tracking-wider text-slate-300 uppercase">
            3 Sources of Truth
          </div>
          <div className="mb-3 h-px w-48 bg-slate-700/60" />
          <div className="flex w-full max-w-[270px] flex-col items-center gap-2 text-slate-400">
            <div
              className={cn(
                "flex min-h-8 w-full items-center justify-center border border-indigo-500/25 bg-indigo-500/10 px-3 py-1.5 text-center font-medium text-indigo-300",
                panelRadius,
              )}
            >
              Tool Signature
            </div>
            <div
              className={cn(
                "flex min-h-8 w-full items-center justify-center gap-2 border border-indigo-500/25 bg-indigo-500/10 px-3 py-1.5 text-center font-medium text-indigo-300",
                panelRadius,
              )}
            >
              Dependency Args
              <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                <PencilLine size={10} />
                manual
              </span>
            </div>
            <div
              className={cn(
                "flex min-h-8 w-full items-center justify-center gap-2 border border-indigo-500/25 bg-indigo-500/10 px-3 py-1.5 text-center font-medium text-indigo-300",
                panelRadius,
              )}
            >
              Entity-to-Tool Mapping
              <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                <PencilLine size={10} />
                manual
              </span>
            </div>
            <div
              className={cn(
                "flex min-h-8 w-full items-center justify-center gap-2 border border-indigo-500/25 bg-indigo-500/10 px-3 py-1.5 text-center font-medium text-indigo-300",
                panelRadius,
              )}
            >
              Execution Graph
              <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                <PencilLine size={10} />
                manual assembly
              </span>
            </div>
          </div>
        </div>
      ),
      afterDiagram: (
        <div className="flex min-h-[205px] w-full flex-col items-center justify-center font-mono text-[11px]">
          <div className="mb-2 text-center text-[11px] font-bold tracking-wider text-slate-300 uppercase">
            Single Source of Truth
          </div>
          <div className="mb-3 h-px w-48 bg-slate-700/60" />
          <div className="relative h-[152px] w-full max-w-[270px] text-slate-400">
            <div
              className={cn(
                "absolute top-0 flex min-h-8 w-full items-center justify-center border border-emerald-400/35 bg-emerald-400/10 px-3 py-1.5 text-center font-medium text-emerald-300",
                panelRadius,
              )}
            >
              Tool Signature
            </div>
            <ArrowDown
              size={13}
              className="absolute top-[40px] left-1/2 -translate-x-1/2 text-slate-600"
            />
            <div
              className={cn(
                "absolute top-[60px] flex min-h-8 w-full items-center justify-center border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-center font-medium text-indigo-300",
                panelRadius,
              )}
            >
              Requires / Provides
            </div>
            <ArrowDown
              size={13}
              className="absolute top-[100px] left-1/2 -translate-x-1/2 text-slate-600"
            />
            <div
              className={cn(
                "absolute bottom-0 flex min-h-8 w-full items-center justify-center border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-center font-medium text-indigo-300",
                panelRadius,
              )}
            >
              Execution Graph
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      data-locale={locale}
      className={cn(
        "border-b border-slate-800/60 bg-[#0e121a] font-sans text-[#a5b5c5] antialiased selection:bg-indigo-500/30 selection:text-white",
        theme.spacing.sectionXComfort,
        theme.spacing.sectionY,
      )}
    >
      <div className={cn("mx-auto", theme.spacing.container)}>
        <div className="mb-12">
          <div className={cn(theme.typography.moduleLabel, "text-indigo-400")}>
            SECTION 01
          </div>
          <h3 className={cn(theme.typography.cardTitle, "mt-1 text-slate-200")}>
            How the Architecture Evolved
          </h3>
        </div>

        <div className="relative">
          {/* Vertical Timeline Guide Wire */}
          <div className="absolute top-4 bottom-4 left-[21px] hidden w-px bg-slate-800 md:block" />

          <div className="space-y-12">
            {evolutionData.map((item) => (
              <div
                key={item.version}
                className="relative gap-5 md:grid md:grid-cols-12"
              >
                {/* Visual Timeline Circular Node Tag */}
                <div className="relative hidden md:col-span-1 md:block">
                  <div
                    className={cn(
                      "sticky top-24 flex h-11 w-11 items-center justify-center border border-slate-700 bg-[#0e121a] font-mono text-xs font-bold tracking-tight text-slate-300 shadow-xl",
                      theme.radius.pill,
                    )}
                  >
                    {item.version}
                  </div>
                </div>

                {/* Main Component Card */}
                <div
                  className={cn(
                    "group border border-slate-800/80 bg-gradient-to-b from-[#121721] to-[#0f131b] p-5 shadow-2xl md:col-span-11",
                    theme.radius.cardSm,
                  )}
                >
                  <div className="flex flex-col justify-between gap-4 border-b border-slate-800/80 pb-4 sm:flex-row sm:items-center">
                    <div>
                      <h4
                        className={cn(
                          theme.typography.cardTitle,
                          "text-[22px] text-slate-200 transition-colors group-hover:text-white md:text-[24px]",
                        )}
                      >
                        {item.title}
                      </h4>
                    </div>

                    <div className="max-w-sm shrink-0 rounded border border-emerald-500/10 bg-emerald-500/[0.01] px-3 py-1.5 sm:text-right">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wider text-emerald-400/80 sm:justify-end">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.55)]" />
                        {item.version === "V1"
                          ? "Move planning out of execution"
                          : item.version === "V3"
                            ? "Move metadata out of manual wiring"
                            : "Move validation out of execution"}
                      </div>
                    </div>
                  </div>

                  {/* Shared Matrix Blackboard Layout */}
                  <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    {/* BEFORE Matrix Block */}
                    <div className="relative flex flex-col overflow-visible rounded-lg border border-slate-800/80 bg-[#0a0d14]">
                      <div className="flex items-center rounded-t-lg border-b border-slate-800 bg-[#111520] px-4 py-2">
                        <span className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-slate-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />{" "}
                          BEFORE
                        </span>
                      </div>

                      <div className="flex flex-col gap-5 p-4">
                        <div className="border-b border-slate-800/40 pb-4">
                          {item.beforeDiagram}
                        </div>

                        <div className="relative min-h-[155px] overflow-visible rounded border border-slate-800/40 bg-[#080a10] p-3 font-mono text-xs leading-relaxed">
                          {item.beforeCode.map((line, idx) => {
                            const isProblemAnchor =
                              line.includes("steps.insert") ||
                              line.includes("run_agent") ||
                              (item.version === "V2" &&
                                line.includes("if step in path")) ||
                              (item.version === "V3" &&
                                (line.includes("dependency_arg=[") ||
                                  line.includes("ENTITY_TO_TOOL") ||
                                  line.includes("CouponEligibilityDTO:"))) ||
                              line.includes("class CampaignEngine");
                            const isV2LoopLine =
                              item.version === "V2" &&
                              line.includes("for step in steps");
                            const isV2ProblemLine =
                              item.version === "V2" &&
                              line.includes("if step in path");
                            return (
                              <div
                                key={idx}
                                className={cn(
                                  "group/line relative flex items-center justify-between rounded px-1 py-0.5 hover:z-50 hover:bg-slate-900/30",
                                  isV2LoopLine &&
                                    "bg-amber-400/5 text-amber-300 [&_span]:!text-amber-300",
                                  isV2ProblemLine &&
                                    "text-indigo-400 [&_span]:!text-indigo-400",
                                )}
                              >
                                <div
                                  className={cn(
                                    "whitespace-pre text-slate-400",
                                    (isV2LoopLine || isV2ProblemLine) &&
                                      "!text-inherit",
                                  )}
                                  dangerouslySetInnerHTML={{
                                    __html: highlightCode(line) || "&nbsp;",
                                  }}
                                />
                                {isProblemAnchor && (
                                  <div className="relative z-30 ml-2 shrink-0">
                                    <div className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-[10px] font-bold text-red-400 shadow-sm transition-all group-hover/line:bg-red-500 group-hover/line:text-white">
                                      !
                                    </div>
                                    <div className="pointer-events-none absolute top-0 right-6 z-[80] w-64 rounded border border-slate-700 bg-[#141924] p-3 font-sans text-xs leading-relaxed font-normal text-slate-300 opacity-0 shadow-xl transition-opacity duration-150 group-hover/line:opacity-100">
                                      <div className="mb-1.5 flex items-center gap-1 font-mono text-[10px] font-bold text-red-400 uppercase">
                                        <AlertTriangle size={11} /> Problems
                                      </div>
                                      {item.beforeTooltip}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* AFTER Matrix Block */}
                    <div className="relative flex flex-col overflow-visible rounded-lg border border-slate-800/80 bg-[#0a0d14]">
                      <div className="flex items-center rounded-t-lg border-b border-slate-800 bg-[#111520] px-4 py-2">
                        <span className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-indigo-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />{" "}
                          AFTER
                        </span>
                      </div>

                      <div className="flex flex-col gap-5 p-4">
                        <div className="border-b border-slate-800/40 pb-4">
                          {item.afterDiagram}
                        </div>

                        <div className="relative min-h-[155px] overflow-visible rounded border border-slate-800/40 bg-[#080a10] p-3 font-mono text-xs leading-relaxed text-slate-400">
                          {item.afterCode.map((line, idx) => {
                            const isSuccessAnchor =
                              (item.version === "V1" &&
                                line.includes("steps = planner.plan")) ||
                              (item.version === "V2" &&
                                line.includes("validate_integrity")) ||
                              (item.version === "V3" &&
                                line.includes(
                                  "tool_schema = derive_tool_schema",
                                ));
                            const isV2LoopLine =
                              item.version === "V2" &&
                              line.includes("for step in steps");
                            const isV2ValidatorLine =
                              item.version === "V2" &&
                              (line.includes("validate_cycle") ||
                                line.includes("validate_integrity"));
                            const successTooltip =
                              item.version === "V2" &&
                              line.includes("validate_integrity") ? (
                                <ol className="list-decimal space-y-2 pl-4">
                                  <li>
                                    <span className="font-semibold text-slate-200">
                                      Producer Completeness:
                                    </span>
                                    <br />
                                    every required node must be producible
                                  </li>
                                  <li>
                                    <span className="font-semibold text-slate-200">
                                      Dependency Completeness:
                                    </span>
                                    <br />
                                    unresolved dependencies are detected upfront
                                  </li>
                                  <li>
                                    <span className="font-semibold text-slate-200">
                                      Orphan Detection:
                                    </span>
                                    <br />
                                    orphan nodes are surfaced before execution
                                  </li>
                                </ol>
                              ) : (
                                item.afterTooltip
                              );

                            return (
                              <div
                                key={idx}
                                className={cn(
                                  "group/afterline relative flex items-center justify-between rounded px-1 py-0.5 hover:z-50 hover:bg-slate-900/30",
                                  isV2LoopLine &&
                                    "bg-amber-400/5 text-amber-300 [&_span]:!text-amber-300",
                                  isV2ValidatorLine &&
                                    "text-indigo-400 [&_span]:!text-indigo-400",
                                )}
                              >
                                <div
                                  className={cn(
                                    "whitespace-pre",
                                    (isV2LoopLine || isV2ValidatorLine) &&
                                      "!text-inherit",
                                  )}
                                  dangerouslySetInnerHTML={{
                                    __html: highlightCode(line) || "&nbsp;",
                                  }}
                                />
                                {isSuccessAnchor && successTooltip && (
                                  <div className="relative z-30 ml-2 shrink-0">
                                    <div className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 transition-colors group-hover/afterline:bg-emerald-400 group-hover/afterline:text-[#07110d]">
                                      <Check size={12} />
                                    </div>
                                    <div className="pointer-events-none absolute top-0 right-6 z-[80] w-72 rounded border border-slate-700 bg-[#141924] p-3 font-sans text-xs leading-relaxed font-normal text-slate-300 opacity-0 shadow-xl transition-opacity duration-150 group-hover/afterline:opacity-100">
                                      <div className="mb-1.5 flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-400 uppercase">
                                        <Check size={11} />{" "}
                                        {item.version === "V2"
                                          ? "Integrity Guarantees"
                                          : "New Capabilities"}
                                      </div>
                                      {successTooltip}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
