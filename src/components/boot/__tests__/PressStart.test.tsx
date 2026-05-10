import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PressStart from "../PressStart";

describe("PressStart", () => {
  it('renders "INTERACTIVE DOSSIER"', () => {
    render(<PressStart onStart={vi.fn()} />);

    expect(
      screen.getByRole("heading", { name: "INTERACTIVE DOSSIER" })
    ).toBeInTheDocument();
  });

  it('shows the "INICIAR SISTEMA" button', () => {
    render(<PressStart onStart={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: /INICIAR SISTEMA/ })
    ).toBeVisible();
  });

  it("calls onStart when Enter is pressed", () => {
    const onStart = vi.fn();
    render(<PressStart onStart={onStart} />);

    fireEvent.keyDown(window, { key: "Enter" });

    expect(onStart).toHaveBeenCalledTimes(1);
  });

  it("calls onStart when Space is pressed", () => {
    const onStart = vi.fn();
    render(<PressStart onStart={onStart} />);

    fireEvent.keyDown(window, { key: " " });

    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
