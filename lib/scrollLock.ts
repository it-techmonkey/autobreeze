/**
 * Reference-counted body scroll lock.
 *
 * Several overlays (booking modal, 360 viewer, image zoom) can be open at the
 * same time or overlap while animating out. Each one setting
 * `document.body.style.overflow` directly meant the first to unmount cleared the
 * lock for everyone — or restored scrolling while another overlay was still
 * open, leaving the page stuck. Counting locks keeps them independent: the
 * page only unlocks once the last overlay releases.
 */

let lockCount = 0;
let previousOverflow: string | null = null;

export function lockBodyScroll(): void {
  if (typeof document === "undefined") return;
  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  lockCount += 1;
}

export function unlockBodyScroll(): void {
  if (typeof document === "undefined") return;
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow ?? "";
    previousOverflow = null;
  }
}
