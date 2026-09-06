/**
 * Ref-counted body scroll lock utility.
 *
 * Multiple independent UI elements (mobile menu, project modal) can each call
 * lockScroll() / unlockScroll() without interfering with each other.
 *
 * The body's overflow is only restored once every consumer has called
 * unlockScroll(). The original overflow value is preserved and restored
 * exactly — it is never blindly reset to ''.
 *
 * Usage:
 *   import { lockScroll, unlockScroll } from '../utils/scrollLock';
 *
 *   // In a useEffect:
 *   lockScroll();
 *   return () => unlockScroll();
 */

let lockCount = 0;
let savedOverflow = null;

/**
 * Increment the lock count and apply overflow:hidden to body if not already applied.
 */
export function lockScroll() {
  if (typeof document === 'undefined') return;

  if (lockCount === 0) {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount += 1;
}

/**
 * Decrement the lock count. Restores original body overflow when count reaches 0.
 */
export function unlockScroll() {
  if (typeof document === 'undefined') return;

  if (lockCount <= 0) return; // Guard against unbalanced calls

  lockCount -= 1;

  if (lockCount === 0) {
    document.body.style.overflow = savedOverflow ?? '';
    savedOverflow = null;
  }
}
