import { describe, expect, it } from "vitest";
import { absoluteUrl } from "../site";

describe("absoluteUrl", () => {
  it("builds an absolute URL from a root-relative path", () => {
    expect(absoluteUrl("/projects")).toBe(
      "https://wphillipmaclayne.github.io/wpm-portfolio/projects"
    );
  });

  it("builds an absolute URL from a path without a leading slash", () => {
    expect(absoluteUrl("contact")).toBe(
      "https://wphillipmaclayne.github.io/wpm-portfolio/contact"
    );
  });
});
