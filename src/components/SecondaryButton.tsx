import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
};

export default function SecondaryButton({
  children,
  onClick,
  icon,
  className = "",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-700 transition-all hover:bg-slate-50 ${className} `}
    >
      {children}

      {icon}
    </button>
  );
}
