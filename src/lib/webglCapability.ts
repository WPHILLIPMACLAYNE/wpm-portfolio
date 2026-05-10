const MOBILE_USER_AGENT = /Mobi|Android|iPhone|iPad|iPod/i;

export function shouldAvoidWebGLOnMobile(): boolean {
  const mobileUserAgent =
    typeof navigator !== "undefined" && MOBILE_USER_AGENT.test(navigator.userAgent);

  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return mobileUserAgent;
  }

  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const noHover = window.matchMedia("(hover: none)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  return mobileUserAgent || coarsePointer || noHover || !finePointer;
}
