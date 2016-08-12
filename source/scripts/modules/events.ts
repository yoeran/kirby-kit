/**
 * Trigger function on DOMContentLoaded
 * @param {Function} fn Callback function
 */
export function documentReady(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
