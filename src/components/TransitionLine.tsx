type Props = {
  text: string;
  dark?: boolean;
};

export default function TransitionLine({
  text,
  dark = false,
}: Props) {

  return (

    <div className="mb-24 flex flex-col items-center">

      <div
        className={`
          h-16 w-px bg-gradient-to-b
          from-transparent
          ${dark ? "via-indigo-400/40" : "via-indigo-200"}
          to-transparent
        `}
      />

      <div
        className={`
          rounded-full px-5 py-2
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.18em]
          shadow-sm

          ${
            dark
              ? "border border-white/10 bg-white/5 text-indigo-300 backdrop-blur-sm"
              : "border border-indigo-100 bg-white text-indigo-600"
          }
        `}
      >
        {text}
      </div>

    </div>
  );
}