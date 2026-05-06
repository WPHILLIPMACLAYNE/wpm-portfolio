import Link from "next/link";
import { menuItems, profile } from "@/data/profile";

interface StaticConsoleShellProps {
  children: React.ReactNode;
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

export default function StaticConsoleShell({ children }: StaticConsoleShellProps) {
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
          <span className="font-mono text-[10px] text-wpm-gray/70 hidden sm:inline">
            v1.0
          </span>
        </div>

        <nav aria-label="Quick navigation" className="hidden md:flex items-center gap-0.5">
          {activeMenuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="relative font-mono text-[10px] text-wpm-gray/75 hover:text-wpm-cyan
                         px-2 py-1 transition-colors duration-200 group
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 focus-visible:ring-offset-2 focus-visible:ring-offset-wpm-black rounded-sm"
              aria-label={item.label}
            >
              <span className="text-wpm-purple/80 group-hover:text-wpm-purple transition-colors">
                <span className="font-mono select-none text-xs" aria-hidden="true">
                  {navIconNames[item.id]}
                </span>
              </span>
              <span className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:inline">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <Link
          href="/console"
          className="md:hidden font-mono text-[11px] text-wpm-gray/75 hover:text-wpm-cyan transition-colors
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 rounded-sm px-2 py-1"
        >
          MODULES
        </Link>
      </header>

      <footer className="fixed bottom-0 left-0 right-0 z-30 h-8 border-t border-white/[0.04] bg-wpm-black/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-6">
        <span className="font-mono text-[10px] text-wpm-gray/70">
          {profile.name}
        </span>
        <span className="font-mono text-[10px] text-wpm-gray/65">
          ESC to return
        </span>
      </footer>

      <main id="main-content" tabIndex={-1} className="pt-12 pb-16 min-h-screen focus:outline-none">
        <div>{children}</div>
      </main>

      <div className="crt-overlay" />
      <div className="crt-vignette" />
    </div>
  );
}
