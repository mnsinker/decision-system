"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ExternalLink } from "lucide-react";
import { demoPageContent } from "@/content/demo/demoPage";
import { useLanguage } from "@/lib/LanguageProvider";
import { cn } from "@/lib/cn";

const VIDEO_URL =
  "https://cmdxtl84mcsrbwug.public.blob.vercel-storage.com/demo_decision_system.mov";
const STREAMLIT_DEMO_URL =
  "https://rag-agent-order-assistant-pmylymnsvoae742ilijbs7.streamlit.app/";

export default function DemoPage() {
  const { locale } = useLanguage();
  const content = demoPageContent[locale];

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Navbar />

      <section className="relative isolate overflow-hidden px-6 py-20 md:px-8 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_45%_at_50%_8%,rgba(99,102,241,0.10),transparent_72%)]"
          aria-hidden
        />

        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-indigo-700">
              {content.badge}
            </div>

            <h1
              className={cn(
                "text-balance text-4xl font-semibold tracking-tight md:text-5xl",
                locale === "zh" && "leading-[1.25]",
              )}
            >
              <span className="block md:whitespace-nowrap">
                {content.title.line1}
              </span>
              <span className="block bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                {content.title.line2}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl whitespace-pre-line text-base leading-7 text-slate-600 md:text-lg">
              {content.description}
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-2xl shadow-slate-200/70">
            <div className="aspect-video">
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
              >
                <source src={VIDEO_URL} type="video/quicktime" />
                {content.videoFallback}
              </video>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href={STREAMLIT_DEMO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              {content.primaryAction}
              <ExternalLink size={16} aria-hidden />
            </a>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            {content.note}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
