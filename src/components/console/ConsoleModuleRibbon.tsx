import { useRef, useCallback, useState } from "react";
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
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [focusedIdx, setFocusedIdx] = useState(0);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      const count = activeMenuItems.length;
      let next = index;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          next = (index + 1) % count;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          next = (index - 1 + count) % count;
          break;
        case "Home":
          e.preventDefault();
          next = 0;
          break;
        case "End":
          e.preventDefault();
          next = count - 1;
          break;
        default:
          return;
      }

      setFocusedIdx(next);
      itemRefs.current[next]?.focus();
    },
    []
  );

  return (
    <section className="border-t border-white/[0.06] bg-wpm-black/25 px-5 py-5 backdrop-blur-xl md:px-10 xl:px-12">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-wpm-lavender/90">Modulos</p>
          <p className="mt-2 max-w-xl text-sm text-wpm-gray">
            Explore o perfil operacional sem sair do sistema visual WPM.OS.
          </p>
        </div>

        <div
          className="grid grid-cols-2 gap-2 lg:grid-cols-4 xl:flex xl:flex-wrap xl:justify-end"
          role="toolbar"
          aria-label="Atalhos de modulos"
        >
          {activeMenuItems.map((item, index) => {
            const typeColor = typeColors[item.type] ?? "#8B95A5";
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                ref={(el) => { itemRefs.current[index] = el; }}
                type="button"
                onClick={() => onModuleSelect(item.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={index === focusedIdx ? 0 : -1}
                aria-expanded={isActive}
                aria-controls="module-panel"
                className="group relative min-h-14 min-w-0 overflow-hidden rounded-sm border bg-white/[0.018] px-3 py-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70 sm:min-w-44"
                style={{
                  borderColor: isActive ? `${typeColor}99` : 'rgba(255,255,255,0.06)',
                  background: isActive
                    ? `linear-gradient(90deg, ${typeColor}22, rgba(255,255,255,0.028))`
                    : `linear-gradient(90deg, ${typeColor}10, rgba(255,255,255,0.018))`,
                }}
              >
                <span
                  className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full transition-all duration-200"
                  style={{ backgroundColor: isActive ? `${typeColor}ff` : `${typeColor}88` }}
                />
                <span className="block truncate pl-2 pr-8 font-sans text-sm text-wpm-white/75 group-hover:text-wpm-white transition-colors">
                  {item.label}
                </span>
                <span className="mt-1 block pl-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors" style={{ color: isActive ? `${typeColor}bb` : undefined }}>
                  <span className={isActive ? '' : 'text-wpm-gray'}>{item.type}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
