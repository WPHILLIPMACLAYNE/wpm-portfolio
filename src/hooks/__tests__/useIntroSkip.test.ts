import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useIntroSkip } from "../useIntroSkip";

const STORAGE_KEY = "wpm-os-visited";
const NOW = 1_800_000_000_000;

describe("useIntroSkip", () => {
  let rafCallbacks: FrameRequestCallback[];

  const flushRaf = async () => {
    const callback = rafCallbacks.shift();
    expect(callback).toBeDefined();

    await act(async () => {
      callback?.(NOW);
    });
  };

  beforeEach(() => {
    rafCallbacks = [];
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(Date, "now").mockReturnValue(NOW);
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      rafCallbacks.push(callback);
      return rafCallbacks.length;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
  });

  it("returns shouldSkip=false on the first visit", async () => {
    const { result } = renderHook(() => useIntroSkip());

    await flushRaf();

    expect(result.current.hydrated).toBe(true);
    expect(result.current.shouldSkip).toBe(false);
  });

  it("returns shouldSkip=true after a recent visit", async () => {
    localStorage.setItem(STORAGE_KEY, String(NOW - 1_000));

    const { result } = renderHook(() => useIntroSkip());

    await flushRaf();

    expect(result.current.hydrated).toBe(true);
    expect(result.current.shouldSkip).toBe(true);
  });

  it("keeps hydrated=false until localStorage has been read", async () => {
    const getItem = vi.spyOn(Storage.prototype, "getItem");

    const { result } = renderHook(() => useIntroSkip());

    expect(result.current.hydrated).toBe(false);
    expect(getItem).not.toHaveBeenCalled();

    await flushRaf();

    expect(getItem).toHaveBeenCalledWith(STORAGE_KEY);
    expect(result.current.hydrated).toBe(true);
  });

  it("marks the visit and replays the intro", async () => {
    localStorage.setItem(STORAGE_KEY, String(NOW - 1_000));

    const { result } = renderHook(() => useIntroSkip());
    await flushRaf();
    expect(result.current.shouldSkip).toBe(true);

    act(() => {
      result.current.markVisited();
    });

    expect(localStorage.getItem(STORAGE_KEY)).toBe(String(NOW));

    act(() => {
      result.current.replay();
    });

    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(result.current.shouldSkip).toBe(false);
  });
});
