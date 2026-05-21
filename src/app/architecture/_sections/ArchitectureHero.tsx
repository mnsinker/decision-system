"use client";

import React from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { useLanguage } from "@/lib/LanguageProvider";
import { displayTitle, bodyText, eyebrowText } from "@/lib/typography";
import { architectureHeroContent } from "@/content/architecture/architectureHero";
import { cn } from "@/lib/cn";

export default function ArchitectureHero() {
  const { theme } = useTheme();
  const { locale } = useLanguage();

  const content = architectureHeroContent[locale];

  /**
   * =========================================================
   * GLOBAL CONTROLS
   * =========================================================
   */

  const visualPositionClass =
    "translate-x-[0px] translate-y-[-50px] scale-[0.7]";

  const layerGap = 130;
  const layerTopOffset = 70;
  const layers = [
    {
      label: content.layers[0].label,
      color: "from-indigo-100/50 to-indigo-200/50",
      shadow: "shadow-[20px_20px_50px_rgba(99,102,241,0.1)]",
      dot: "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]",
      text: "text-indigo-500",
      animation: "animate-[float_6s_infinite_ease-in-out]",
      top: "0",
      z: "0px",
      dotted: false,
    },

    {
      label: content.layers[1].label,
      color: "from-emerald-100/50 to-emerald-200/50",
      shadow: "shadow-[20px_20px_50px_rgba(52,211,153,0.1)]",
      dot: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]",
      text: "text-emerald-500",
      animation: "animate-[float_6s_infinite_ease-in-out_1s]",
      top: "var(--offset)",
      z: "calc(var(--gap) * -1)",
      dotted: true,
    },

    {
      label: content.layers[2].label,
      color: "from-rose-100/50 to-rose-200/50",
      shadow: "shadow-[20px_20px_50px_rgba(244,63,94,0.1)]",
      dot: "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]",
      text: "text-rose-500",
      animation: "animate-[float_6s_infinite_ease-in-out_2s]",
      top: "calc(var(--offset) * 2)",
      z: "calc(var(--gap) * -2)",
      dotted: false,
    },

    {
      label: content.layers[3].label,
      color: "from-amber-100/50 to-amber-200/50",
      shadow: "shadow-[20px_20px_50px_rgba(245,158,11,0.1)]",
      dot: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]",
      text: "text-amber-500",
      animation: "animate-[float_6s_infinite_ease-in-out_3s]",
      top: "calc(var(--offset) * 3)",
      z: "calc(var(--gap) * -3)",
      dotted: false,
    },
  ];

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b pt-10 pb-9",
        theme.spacing.sectionXComfort,
        theme.colors.borderPrimary,
        theme.colors.surfacePageTinted,
      )}
    >
      {/* soft gradient */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.14),transparent_58%)]" />

      {/* subtle grid */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div
        className={cn(
          "relative mx-auto grid items-center lg:grid-cols-[1fr_0.95fr]",
          theme.spacing.container,
          theme.spacing.gridSplit,
        )}
      >
        {/* left content */}

        <div className="relative z-10">
          <div
            className={cn(
              theme.spacing.headerBottomWide,
              theme.typography.sectionEyebrow,
              theme.colors.textAccent,
              eyebrowText(locale),
            )}
          >
            {content.eyebrow}
          </div>
          <h1
            className={`max-w-[1200px] text-7xl font-black text-slate-950 ${displayTitle(locale)}`}
          >
            {content.title.line1} <br />
            <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {content.title.line2}
            </span>
          </h1>

          <p
            className={cn(
              "mt-7 max-w-2xl text-xl font-light",
              theme.colors.textMuted,
              bodyText(locale),
            )}
          >
            {content.subtitle}
          </p>
        </div>

        {/* right visual */}

        <div
          className={`relative flex items-center justify-center pt-8 lg:pt-0 ${visualPositionClass}`}
        >
          <div className="relative h-[600px] w-full max-w-[450px] [perspective:1500px]">
            <div
              className="relative h-full w-full [transform:rotateX(58deg)_rotateZ(-28deg)] [transform-style:preserve-3d]"
              style={
                {
                  "--gap": `${layerGap}px`,
                  "--offset": `${layerTopOffset}px`,
                } as React.CSSProperties
              }
            >
              {layers.map((layer, index) => (
                <div
                  key={layer.label}
                  className={`layer-float absolute left-0 h-44 w-full`}
                  style={
                    {
                      top: layer.top,
                      "--z": layer.z,
                      "--i": index,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className={`relative h-full w-full overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br ${layer.color} ${layer.shadow} backdrop-blur-xl`}
                  >
                    {layer.dotted && (
                      <div className="absolute inset-0 [background-image:radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
                    )}

                    <div
                      className={`absolute top-10 left-10 h-3 w-3 animate-pulse rounded-full ${layer.dot}`}
                    />
                  </div>

                  <div
                    className={`absolute top-10 -right-4 translate-x-full font-mono text-[10px] font-bold tracking-widest uppercase ${layer.text}`}
                  >
                    {layer.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .layer-float {
          transform: translateZ(var(--z))
            translateY(calc(var(--float-offset, 0px)));

          animation: layerFloat 6s ease-in-out infinite;
          animation-delay: calc(var(--i) * 1s);
        }

        @keyframes layerFloat {
          0%,
          100% {
            transform: translateZ(var(--z)) translateY(0);
          }

          50% {
            transform: translateZ(var(--z)) translateY(-12px);
          }
        }
      `}</style>
    </section>
  );
}
