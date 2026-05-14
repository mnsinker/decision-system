"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white py-12">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 text-sm text-slate-500">

        <p>
          © 2026 AI Decision System
        </p>

        <div className="flex gap-8">

          <a
            href="#"
            className="hover:text-slate-900"
          >
            Overview
          </a>

          <a
            href="#"
            className="hover:text-slate-900"
          >
            Architecture
          </a>

          <a
            href="#"
            className="hover:text-slate-900"
          >
            GitHub
          </a>

        </div>
      </div>
    </footer>
  );
}