import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stage from "./components/Stage.jsx";
import Nav from "./components/Nav.jsx";
import Story from "./components/Story.jsx";
import {
  Impact, LineUp, Bake, PastaBar, MeltsExtras, Shakes, Crowd, Meals, MeetUs, FullMenu, Visit, Footer, NeonRail,
} from "./components/Sections.jsx";
import { initFilm } from "./engine/film.js";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

    // ---- smooth scroll, driving ScrollTrigger ----
    const lenis = new Lenis({ lerp: reduced ? 1 : 0.1, smoothWheel: !reduced });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // in-page links glide instead of jumping
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      const el = id.length > 1 && document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: id === "#story" ? 0 : -70, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    // ---- the film + beats ----
    const film = initFilm({ lenis });

    // ---- live particles over the film (three.js loads after the page has painted) ----
    let atmos = null;
    let cancelled = false;
    import("./engine/atmosphere.js").then(({ initAtmosphere }) => {
      if (!cancelled) atmos = initAtmosphere({ lenis });
    });

    // ---- reveals ----
    const revealEls = gsap.utils.toArray("[data-reveal]");
    gsap.set(revealEls, { autoAlpha: 0, y: 34 });
    const batch = ScrollTrigger.batch(revealEls, {
      start: "top 88%",
      once: true,
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true }),
    });

    // ---- signature: the neon tube rail fills with page progress ----
    const railFill = document.querySelector(".neon-rail__fill");
    const rail = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => railFill && railFill.style.setProperty("--p", self.progress.toFixed(4)),
    });

    // ---- 3D tilt on cards, desktop pointers only ----
    const tiltCleanups = [];
    if (fine && !reduced) {
      document.querySelectorAll("[data-tilt]").forEach((card) => {
        const qx = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
        const qy = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
        gsap.set(card, { transformPerspective: 900 });
        const move = (e) => {
          const r = card.getBoundingClientRect();
          qx(((e.clientX - r.left) / r.width - 0.5) * 10);
          qy(-((e.clientY - r.top) / r.height - 0.5) * 8);
        };
        const leave = () => { qx(0); qy(0); };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        tiltCleanups.push(() => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); });
      });
    }

    // ---- horizontal rail: vertical wheel stays vertical; drag to scroll on desktop ----
    const track = document.querySelector(".rail");
    let dragCleanup = () => {};
    if (track && fine) {
      let down = false, startX = 0, startLeft = 0;
      const pd = (e) => { down = true; startX = e.clientX; startLeft = track.scrollLeft; track.classList.add("is-dragging"); };
      const pm = (e) => { if (down) track.scrollLeft = startLeft - (e.clientX - startX); };
      const pu = () => { down = false; track.classList.remove("is-dragging"); };
      track.addEventListener("pointerdown", pd);
      addEventListener("pointermove", pm);
      addEventListener("pointerup", pu);
      dragCleanup = () => { track.removeEventListener("pointerdown", pd); removeEventListener("pointermove", pm); removeEventListener("pointerup", pu); };
    }

    const onLoad = () => ScrollTrigger.refresh();
    addEventListener("load", onLoad);
    if (import.meta.env.DEV) { window.__lenis = lenis; window.__ST = ScrollTrigger; }

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick);
      removeEventListener("load", onLoad);
      gsap.ticker.remove(raf);
      film.destroy();
      atmos?.destroy();
      batch.forEach((b) => b.kill());
      rail.kill();
      tiltCleanups.forEach((f) => f());
      dragCleanup();
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Stage />
      <Nav />
      <NeonRail />
      <main id="page">
        <Story />
        <Impact />
        <LineUp />
        <Bake />
        <PastaBar />
        <MeltsExtras />
        <Shakes />
        <Crowd />
        <Meals />
        <MeetUs />
        <FullMenu />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
