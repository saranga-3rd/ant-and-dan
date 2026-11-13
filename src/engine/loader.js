// The loading screen. Tasks (the film, fonts, the hero still) report progress here; the screen
// shows one smooth bar and lifts only when every task is done, so the first thing a visitor sees
// is the film fully loaded, never a blurry still swapping to video.
//
// Safety nets: a minimum time on screen (no flash), and a hard timeout so a stalled download can
// never trap the visitor behind the loader.

const MIN_MS = 900;
const MAX_MS = 35000;

const el = document.getElementById("loader");
const fill = document.getElementById("loader-fill");
const pct = document.getElementById("loader-pct");
const label = document.getElementById("loader-label");

const tasks = new Map();   // name -> { weight, p, text }
let shown = 0, finished = false, startedAt = performance.now();
const waiters = [];

function target() {
  let w = 0, s = 0;
  for (const t of tasks.values()) { w += t.weight; s += t.weight * t.p; }
  return w ? s / w : 0;
}

function finish() {
  if (finished) return;
  finished = true;
  document.documentElement.classList.remove("is-loading");
  el?.classList.add("is-done");
  document.body.classList.add("is-loaded");
  waiters.splice(0).forEach((fn) => fn());
  setTimeout(() => el?.remove(), 1200);
}

function frame() {
  if (finished) return;
  const goal = target();
  // ease toward the real number; never run ahead of it, never jump backwards
  shown += Math.max(0, goal - shown) * 0.12 + (goal > shown ? 0.002 : 0);
  shown = Math.min(shown, goal);
  const v = Math.min(shown, 1);
  fill?.style.setProperty("--p", v.toFixed(4));
  if (pct) pct.textContent = `${Math.round(v * 100)}%`;
  const all = [...tasks.values()];
  const pending = all.find((t) => t.p < 1);
  if (label && pending?.text) label.textContent = pending.text;
  const elapsed = performance.now() - startedAt;
  if ((all.length && !pending && v > 0.995 && elapsed > MIN_MS) || elapsed > MAX_MS) {
    fill?.style.setProperty("--p", "1");
    if (pct) pct.textContent = "100%";
    finish();
    return;
  }
  requestAnimationFrame(frame);
}

if (el) requestAnimationFrame(frame); else finished = true;

/** Register a task. Returns { set(p 0..1), done() }. Call before the first frame settles. */
export function track(name, weight = 1, text = "") {
  const t = { weight, p: 0, text };
  tasks.set(name, t);
  return {
    set(p) { t.p = Math.max(t.p, Math.min(1, p)); },
    done() { t.p = 1; },
  };
}

/** Resolves once the loader has lifted (immediately if it already has). */
export function whenLoaded() {
  return finished ? Promise.resolve() : new Promise((r) => waiters.push(r));
}

/** Resolve a promise into a task: done when it settles, win or lose, or after `limit` ms. */
export function trackPromise(name, weight, text, promise, limit = 8000) {
  const task = track(name, weight, text);
  const end = () => task.done();
  Promise.race([promise, new Promise((r) => setTimeout(r, limit))]).then(end, end);
  return task;
}
