import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import OSLoader from "../OSLoader";

describe("OSLoader", () => {
  it("renders the label passed by prop", () => {
    render(<OSLoader label="SINCRONIZANDO MODULOS" />);

    expect(screen.getByText("SINCRONIZANDO MODULOS")).toBeInTheDocument();
  });

  it("renders a loading indicator", () => {
    const { container } = render(<OSLoader />);

    expect(container.querySelector(".bg-wpm-cyan")).toBeTruthy();
    expect(container.querySelector(".via-wpm-cyan\\/50")).toBeTruthy();
  });
});
