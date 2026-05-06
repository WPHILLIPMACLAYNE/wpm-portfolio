import Link from "next/link";
import { menuItems, profile } from "@/data/profile";

interface StaticConsoleShellProps {
  children: React.ReactNode;
  currentHref?: string;
  currentLabel?: string;
}

const navIconNames: Record<string, string> = {
  projects: "[]",
  about: "?",
  skills: "{}",
  resume: "\u25A0",
  lab: "<>",
  hobbies: "\u2666",
  contact: "@",
};

const activeMenuItems = menuItems.filter((m) => m.status === "Active");

export default function StaticConsoleShell({
  children,
  currentHref = "/projects",
  currentLabel = "Project Library",
}: StaticConsoleShellProps) {
  return (
    <div className="min-h-screen bg-wpm-black relative">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(108,77,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(108,77,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <header className="fixed top-0 left-0 right-0 z-30 h-12 border-b border-white/[0.04] bg-wpm-black/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-mono text-sm tracking-widest text-wpm-cyan/80 hover:text-wpm-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 focus-visible:ring-offset-2 focus-visible:ring-offset-wpm-black rounded-sm"
            aria-label="WPM.OS Home"
          >
            WPM.OS
          </Link>
          <span className="hidden font-mono text-[11px] text-wpm-gray/90 sm:inline" aria-hidden="true">
            /
          </span>
          <span className="hidden max-w-44 truncate font-mono text-[11px] uppercase tracking-[0.14em] text-wpm-lavender/90 sm:inline">
            {currentLabel}
          </span>
        </div>

        <nav aria-label="Quick navigation" className="hidden md:flex items-center gap-0.5">
          {activeMenuItems.map((item) => {
            const isCurrent = item.href === currentHref;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative font-mono text-[11px] hover:text-wpm-cyan
                         px-2 py-1 transition-colors duration-200 group
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 focus-visible:ring-offset-2 focus-visible:ring-offset-wpm-black rounded-sm ${
                           isCurrent ? "text-wpm-cyan" : "text-wpm-gray/90"
                         }`}
                aria-label={item.label}
                aria-current={isCurrent ? "page" : undefined}
              >
                <span className={isCurrent ? "text-wpm-cyan" : "text-wpm-lavender/90 group-hover:text-wpm-lavender transition-colors"}>
                  <span className="font-mono select-none text-xs" aria-hidden="true">
                    {navIconNames[item.id]}
                  </span>
                </span>
                <span className="ml-1.5 hidden opacity-0 transition-opacity group-hover:opacity-100 lg:inline">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <Link
          href="/console"
          className="md:hidden font-mono text-[11px] text-wpm-gray/90 hover:text-wpm-cyan transition-colors
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 rounded-sm px-2 py-1"
        >
          MODULES
        </Link>
      </header>

      <footer className="fixed bottom-0 left-0 right-0 z-30 h-8 border-t border-white/[0.04] bg-wpm-black/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-6">
        <span className="font-mono text-[11px] text-wpm-gray/90">
          {profile.name}
        </span>
        <span className="font-mono text-[11px] text-wpm-gray/90">
          ESC / BACK to return
        </span>
      </footer>

      <main id="main-content" tabIndex={-1} className="pt-12 pb-16 min-h-screen focus:outline-none">
        <div>{children}</div>
      </main>

      <Link
        href="/console"
        className="fixed bottom-12 right-4 z-40 inline-flex min-h-11 items-center justify-center border border-wpm-cyan/45 bg-wpm-black/90 px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-wpm-cyan shadow-[0_0_28px_rgba(116,247,255,0.12)] backdrop-blur-sm transition-colors hover:border-wpm-cyan/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70 md:hidden"
        aria-label="Return to console"
      >
        Back
      </Link>

      <div className="crt-overlay" />
      <div className="crt-vignette" />
    </div>
  );
}
