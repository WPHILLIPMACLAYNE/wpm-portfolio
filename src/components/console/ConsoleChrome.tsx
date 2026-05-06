import Link from "next/link";

const primaryNav = [
  { label: "Work", href: "/projects" },
  { label: "Profile", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

const telemetry = [
  ["SYS", "ONLINE"],
  ["SIGNAL", "STRONG"],
  ["MODE", "DOSSIER"],
  ["USER", "WPM"],
];

export function SystemTelemetry() {
  return (
    <aside
      className="hidden xl:flex w-20 shrink-0 flex-col items-center justify-between border-r border-white/[0.06] bg-wpm-black/45 px-4 py-7"
      aria-label="System telemetry"
    >
      <div className="relative h-10 w-10 rounded-full border border-wpm-cyan/30">
        <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-wpm-cyan shadow-[0_0_18px_rgba(116,247,255,0.8)]" />
        <div className="absolute inset-1 rounded-full border border-wpm-purple/20" />
        <div className="absolute -left-2 top-1/2 h-px w-3 bg-wpm-cyan/30" />
        <div className="absolute -right-2 top-1/2 h-px w-3 bg-wpm-cyan/30" />
        <div className="absolute -top-2 left-1/2 h-3 w-px bg-wpm-cyan/30" />
        <div className="absolute -bottom-2 left-1/2 h-3 w-px bg-wpm-cyan/30" />
      </div>

      <div className="flex w-full flex-col gap-8">
        {telemetry.map(([label, value]) => (
          <div key={label} className="text-left font-mono">
            <div className="mb-2 h-px w-3 bg-wpm-gray/35" />
            <p className="text-[11px] uppercase tracking-[0.2em] text-wpm-gray/90">{label}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-wpm-cyan/80">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1 opacity-35" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} className="h-0.5 w-0.5 rounded-full bg-wpm-cyan/70" />
        ))}
      </div>
    </aside>
  );
}

export function ConsoleNav() {
  return (
    <nav
      aria-label="Primary portfolio navigation"
      className="hidden items-center justify-end gap-9 md:flex"
    >
      {primaryNav.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className="group relative font-mono text-xs uppercase tracking-[0.16em] text-wpm-gray/90 transition-colors hover:text-wpm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#02040a]"
        >
          <span>{item.label}</span>
          <span
            className={`absolute -bottom-4 left-0 h-px bg-wpm-cyan transition-all duration-300 ${
              index === 0 ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-80"
            }`}
          />
        </Link>
      ))}
    </nav>
  );
}
