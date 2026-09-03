"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/design-system/runtime/useTheme";
import { cn } from "@/lib/cn";

export default function Footer() {
  const { theme } = useTheme();
  const [showWechatQr, setShowWechatQr] = useState(false);
  const contactMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showWechatQr) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!contactMenuRef.current?.contains(event.target as Node)) {
        setShowWechatQr(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowWechatQr(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [showWechatQr]);

  return (
    <footer
      className={cn(
        "border-t",
        theme.colors.borderPrimary,
        theme.colors.surfacePrimary,
        theme.spacing.footerPaddingY,
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between",
          theme.spacing.container,
          theme.spacing.sectionXComfort,
          theme.typography.footerText,
        )}
      >
        <p>© 2026 AI Decision System</p>

        <div className={cn("flex", theme.spacing.navLinkGap)}>
          <div ref={contactMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setShowWechatQr(true)}
              aria-expanded={showWechatQr}
              aria-haspopup="dialog"
              className={cn(
                "cursor-pointer bg-transparent border-0 p-0 font-inherit",
                "transition",
                theme.colors.textFooterLinkHover,
              )}
            >
              Contact me
            </button>

            {showWechatQr && (
              <div
                role="dialog"
                aria-label="WeChat contact QR code"
                className="absolute bottom-full left-1/2 z-50 mb-3 w-56 -translate-x-1/2 rounded-2xl bg-white p-3 shadow-2xl ring-1 ring-slate-200"
              >
                <img
                  src="/wechat_qrcode.jpg"
                  alt="WeChat QR Code"
                  className="h-auto w-full rounded-xl object-contain"
                />
              </div>
            )}
          </div>

          <a
            href="https://github.com/mnsinker?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={cn("transition", theme.colors.textFooterLinkHover)}
          >
            GitHub
          </a>
        </div>

      </div>
    </footer>
  );
}
