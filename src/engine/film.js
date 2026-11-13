// The scroll-scrubbed hero film.
// One sticky stage inside #story. A single GSAP timeline, scrubbed by scroll, drives the film's
// playhead, the five beats of copy and (on phones) a crossfade between three stills.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const STATIC_HERO_QUERY = "(max-width: 768px), (hover: none), (prefers-reduced-motion: reduce)";
const VIDEO_W = 1280;
const VIDEO_H = 720;

// Film seconds for each stretch. Holds keep a beat's frame almost still while its copy is read;
// moves are where the pie transforms. The fast packaging reveal (3→4) gets the most scroll.
// Timings read off the film itself (frames at 0.3 / 1.8 / 5.6 / 8.9 / 13.6 s).
const SCRIPT = [
  { hold: [0, 0.45] },              // beat 1: hero, slice lifted
  { move: [0.45, 1.7], len: 1.0 },  //   the slice settles back
  { hold: [1.7, 2.05] },            // beat 2: the whole pie, steam
  { move: [2.05, 4.7], len: 1.4 },  //   the layers rise apart
  { hold: [4.7, 6.5] },             // beat 3: exploded layers drifting (labels show here)
  { move: [6.5, 8.7], len: 1.4 },   //   the layers fall back together, the box appears
  { hold: [8.7, 9.15] },            // beat 4: the pie floating over the open box
  { move: [9.15, 13.4], len: 2.4 }, //   it lands; bowl and shake are revealed (the fast part, most scroll)
  { hold: [13.4, 13.74] },          // beat 5: the spread, at rest
];

export function initFilm({ lenis, src = "/film.mp4" }) {
  const story = document.getElementById("story");
  const video = document.getElementById("bgv");
  const copies = [...story.querySelectorAll("[data-beat]")];
  const labels = story.querySelector(".layer-labels");
  const isStatic = matchMedia(STATIC_HERO_QUERY).matches;
  const film = { t: 0 };

  // ---------- gated seeks: never write currentTime while a seek is in flight ----------
  let seekBusy = false, pendingTime = null, lastT = -1;
  const requestSeek = (t) => {
    if (isStatic || !video.duration) return;
    t = Math.min(Math.max(t, 0), video.duration - 0.05);
    if (Math.abs(t - lastT) < 0.008) return;
    if (seekBusy) { pendingTime = t; return; }
    seekBusy = true; lastT = t; video.currentTime = t;
  };
  const onSeeked = () => {
    seekBusy = false;
    if (pendingTime !== null) { const t = pendingTime; pendingTime = null; requestSeek(t); }
  };
  video.addEventListener("seeked", onSeeked);
  video.addEventListener("error", () => { seekBusy = false; pendingTime = null; document.body.classList.add("video-failed"); });

  // ---------- the master timeline ----------
  const tl = gsap.timeline({ defaults: { ease: "none" }, paused: true });
  let beatIndex = 0, at = 0;
  SCRIPT.forEach((step) => {
    if (step.hold) {
      const copy = copies[beatIndex];
      // copy fades in over the end of the previous move, stays for the whole hold
      if (beatIndex > 0) tl.fromTo(copy, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, at - 0.35);
      tl.fromTo(film, { t: step.hold[0] }, { t: step.hold[1], duration: 1 }, at);
      at += 1;
      if (beatIndex < copies.length - 1) tl.to(copy, { autoAlpha: 0, y: -40, duration: 0.3, ease: "power2.in" }, at);
      beatIndex++;
    } else {
      tl.fromTo(film, { t: step.move[0] }, { t: step.move[1], duration: step.len, ease: "power1.inOut" }, at);
      at += step.len;
    }
  });
  const totalUnits = at;

  // three stills crossfade under the film: they are the story on phones, with reduced motion,
  // or if the film fails to load (CSS hides them once the film is playing)
  tl.to("#poster-layers", { autoAlpha: 1, duration: 0.6 }, unitsAt(4) - 0.6);
  tl.to("#poster-spread", { autoAlpha: 1, duration: 0.6 }, unitsAt(6) - 0.6);
  // the closing frame: ease the film a little left so the last line of copy has a clear dark side
  if (!isStatic) tl.to(video, { xPercent: -11, duration: SCRIPT[7].len, ease: "power1.inOut" }, unitsAt(7));
  // layer labels ride with beat 3
  if (labels) {
    tl.fromTo(labels, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, unitsAt(4) - 0.3);
    tl.to(labels, { autoAlpha: 0, duration: 0.25 }, unitsAt(5));
  }

  function unitsAt(stepIndex) {   // timeline position where SCRIPT[stepIndex] starts
    let u = 0;
    for (let i = 0; i < stepIndex; i++) u += SCRIPT[i].hold ? 1 : SCRIPT[i].len;
    return u;
  }

  story.style.setProperty("--story-units", totalUnits.toFixed(2));
  // seek on every timeline render (the scrub keeps easing after the scroll stops)
  tl.eventCallback("onUpdate", () => requestSeek(film.t));
  const trigger = ScrollTrigger.create({
    trigger: story,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.6,
    animation: tl,
  });

  // ---------- after the story: the stage dims behind the content ----------
  gsap.to(".stage-dim", {
    opacity: 0.95, ease: "none",
    scrollTrigger: { trigger: story, start: "bottom 95%", end: "bottom 35%", scrub: true },
  });
  gsap.to(".stage-hud", {
    autoAlpha: 0, ease: "none",
    scrollTrigger: { trigger: story, start: "bottom 98%", end: "bottom 70%", scrub: true },
  });

  // ---------- layer labels: video pixels → screen pixels under object-fit: cover ----------
  const placeLabels = () => {
    if (!labels) return;
    const s = Math.max(innerWidth / VIDEO_W, innerHeight / VIDEO_H);
    const ox = (innerWidth - VIDEO_W * s) / 2, oy = (innerHeight - VIDEO_H * s) / 2;
    labels.querySelectorAll("[data-vx]").forEach((el) => {
      el.style.left = `${+el.dataset.vx * s + ox}px`;
      el.style.top = `${+el.dataset.vy * s + oy}px`;
    });
  };
  placeLabels();
  addEventListener("resize", placeLabels);

  // ---------- load the film as a Blob (works on hosts without Range support) ----------
  let objectUrl = null;
  if (!isStatic) {
    fetch(src)
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.blob(); })
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
        video.load();
        video.addEventListener("loadedmetadata", () => {
          lastT = -1;
          requestSeek(film.t);
          document.body.classList.add("video-ready");
        }, { once: true });
      })
      .catch(() => document.body.classList.add("video-failed"));
  }

  const api = { film, video, trigger, get time() { return film.t; } };
  if (import.meta.env.DEV) window.__film = api;
  return {
    api,
    destroy() {
      trigger.kill();
      tl.kill();
      removeEventListener("resize", placeLabels);
      video.removeEventListener("seeked", onSeeked);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    },
  };
}
