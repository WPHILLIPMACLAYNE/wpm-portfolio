"use client";

import ConsoleShell from "@/components/console/ConsoleShell";
import ConsoleMenu from "@/components/console/ConsoleMenu";

export default function ConsolePage() {
  return (
    <ConsoleShell mode="hub">
      <ConsoleMenu />
    </ConsoleShell>
  );
}
