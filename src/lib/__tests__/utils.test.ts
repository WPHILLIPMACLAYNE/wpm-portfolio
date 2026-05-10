import { describe, expect, it } from "vitest";
import { cn } from "../utils";

describe("cn", () => {
  it("merges conditional class names and resolves Tailwind conflicts", () => {
    expect(cn("flex px-2", false && "hidden", "px-4")).toBe("flex px-4");
  });
});
