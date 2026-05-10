import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { useRovingTabIndex } from "../useRovingTabIndex";

interface RovingGridProps {
  itemCount?: number;
  gridCols?: number;
  onSelect?: (index: number) => void;
  handleSelect?: boolean;
}

function RovingGrid({
  itemCount = 6,
  gridCols = 3,
  onSelect,
  handleSelect = false,
}: RovingGridProps) {
  const { focusedIdx, itemRefs, setFocusedIdx } = useRovingTabIndex({
    itemCount,
    gridCols,
    onSelect,
    handleSelect,
  });

  return createElement(
    "div",
    null,
    createElement("button", null, "Before grid"),
    createElement(
      "div",
      { role: "grid", "aria-label": "Modules" },
      Array.from({ length: itemCount }, (_, index) =>
        createElement(
          "button",
          {
            key: index,
            ref: (element: HTMLButtonElement | null) => {
              itemRefs.current[index] = element;
            },
            role: "gridcell",
            tabIndex: focusedIdx === index ? 0 : -1,
            onFocus: () => setFocusedIdx(index),
          },
          `Module ${index}`
        )
      )
    ),
    createElement("button", null, "After grid"),
    createElement("output", { "aria-label": "Focused index" }, focusedIdx)
  );
}

const focusedIndex = () => screen.getByLabelText("Focused index").textContent;

describe("useRovingTabIndex", () => {
  it("keeps a single tab stop for Tab and Shift+Tab navigation", async () => {
    const user = userEvent.setup();
    render(createElement(RovingGrid));

    expect(screen.getByText("Module 0")).toHaveFocus();
    expect(screen.getByText("Module 0")).toHaveAttribute("tabIndex", "0");
    expect(screen.getByText("Module 1")).toHaveAttribute("tabIndex", "-1");

    await user.tab();
    expect(screen.getByText("After grid")).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByText("Module 0")).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByText("Before grid")).toHaveFocus();
  });

  it("navigates a grid with arrow keys", async () => {
    const user = userEvent.setup();
    render(createElement(RovingGrid));

    screen.getByText("Module 0").focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByText("Module 1")).toHaveFocus();
    expect(focusedIndex()).toBe("1");

    await user.keyboard("{ArrowDown}");
    expect(screen.getByText("Module 4")).toHaveFocus();
    expect(focusedIndex()).toBe("4");

    await user.keyboard("{ArrowLeft}");
    expect(screen.getByText("Module 3")).toHaveFocus();
    expect(focusedIndex()).toBe("3");

    await user.keyboard("{ArrowUp}");
    expect(screen.getByText("Module 0")).toHaveFocus();
    expect(focusedIndex()).toBe("0");
  });

  it("clamps navigation at grid limits", async () => {
    const user = userEvent.setup();
    render(createElement(RovingGrid, { itemCount: 5, gridCols: 3 }));

    screen.getByText("Module 0").focus();
    await user.keyboard("{ArrowLeft}{ArrowUp}");
    expect(screen.getByText("Module 0")).toHaveFocus();
    expect(focusedIndex()).toBe("0");

    await user.keyboard("{End}");
    expect(screen.getByText("Module 4")).toHaveFocus();
    expect(focusedIndex()).toBe("4");

    await user.keyboard("{ArrowRight}{ArrowDown}");
    expect(screen.getByText("Module 4")).toHaveFocus();
    expect(focusedIndex()).toBe("4");
  });

  it("calls onSelect when handleSelect=true", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(createElement(RovingGrid, { onSelect, handleSelect: true }));

    screen.getByText("Module 0").focus();
    await user.keyboard("{ArrowRight}{Enter}");
    expect(onSelect).toHaveBeenCalledWith(1);

    await user.keyboard(" ");
    expect(onSelect).toHaveBeenLastCalledWith(1);
    expect(onSelect).toHaveBeenCalledTimes(2);
  });
});
