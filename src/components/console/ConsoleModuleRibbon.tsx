import { menuItems } from "@/data/profile";
import { typeColors } from "./MenuModule";

const activeMenuItems = menuItems.filter((item) => item.status === "Active");

interface ConsoleModuleRibbonProps {
  activeModule: string | null;
  onModuleSelect: (id: string) => void;
}

export default function ConsoleModuleRibbon({
  activeModule,
  onModuleSelect,
}: ConsoleModuleRibbonProps) {
  return (
    <section className="border-t border-white/[0.06] bg-wpm-black/25 px-5 py-5 backdrop-blur-xl md:px-10 xl:px-12">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-wpm-lavender/90">Modules</p>
          <p className="mt-2 max-w-xl text-sm text-wpm-gray/90">
            Explore the operating profile without leaving the WPM.OS visual system.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 xl:flex xl:flex-wrap xl:justify-end" role="list" aria-label="Module shortcuts">
          {activeMenuItems.map((item) => {
            const typeColor = typeColors[item.type] ?? "#7E8797";
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onModuleSelect(item.id)}
                aria-expanded={isActive}
                aria-controls="module-panel"
                className="group relative min-h-14 min-w-0 overflow-hidden rounded-sm border border-white/[0.06] bg-white/[0.018] px-3 py-2.5 text-left transition-all hover:-translate-y-0.5 hover:border-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70 sm:min-w-40"
                style={{
                  background: `linear-gradient(90deg, ${typeColor}10, rgba(255,255,255,0.018))`,
                }}
              >
                <span
                  className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full"
                  style={{ backgroundColor: isActive ? `${typeColor}ff` : `${typeColor}88` }}
                />
                <span className="block truncate pl-2 font-sans text-sm text-wpm-white/75 group-hover:text-wpm-white">
                  {item.label}
                </span>
                <span className="mt-1 block pl-2 font-mono text-[11px] uppercase tracking-[0.12em] text-wpm-gray/90">
                  {item.type}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
