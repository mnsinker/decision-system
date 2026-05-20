import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
};

export default function PrimaryButton({
  children,
  onClick,
  icon,
  className = "",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-base font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 ${className} `}
    >
      {children}

      {icon}
    </button>
  );
}
