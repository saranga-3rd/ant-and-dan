// A transparent WebGL layer over the film: flour dust plus cyan and purple specks.
// It drifts on its own, speeds up with scroll and leans with the cursor.
import * as THREE from "three";
import { makeParticles } from "./particles.js";

const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export function initAtmosphere({ lenis }) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  const LITE = matchMedia("(max-width: 768px), (hover: none)").matches;
  const canvas = document.getElementById("atmos");
  if (!canvas) return null;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
  } catch {
    return null;
  }
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio, LITE ? 1.25 : 1.5));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.1, 40);
  camera.position.set(0, 1.5, 6);

  const pr = renderer.getPixelRatio();
  const flour = makeParticles(LITE ? 260 : 900, "#F4F7F8", pr, { size: 20, opacity: 0.55, fall: 0.12 });
  const cyan = makeParticles(LITE ? 90 : 260, css("--accent") || "#00DCFC", pr, { size: 26, opacity: 0.85, fall: 0.08 });
  const violet = makeParticles(LITE ? 60 : 180, css("--accent-2") || "#9128FB", pr, { size: 28, opacity: 0.9, fall: 0.06 });
  scene.add(flour, cyan, violet);
  const systems = [flour, cyan, violet];

  const pointer = { x: 0, y: 0 };
  const onMove = (e) => {
    pointer.x = (e.clientX / innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / innerHeight) * 2 + 1;
  };
  addEventListener("pointermove", onMove, { passive: true });
  const resize = () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight, false);
  };
  addEventListener("resize", resize);
  resize();

  const cover = document.querySelector(".stage-cover");
  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    if (document.hidden || (cover && cover.getBoundingClientRect().top <= 0)) return;
    const t = clock.getElapsedTime();
    camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.04;
    camera.position.y += (1.5 + pointer.y * 0.3 - camera.position.y) * 0.04;
    camera.lookAt(0, 1.5, 0);
    const boost = Math.min(2, Math.abs(lenis?.velocity || 0) * 0.02);
    for (const s of systems) {
      s.material.uniforms.uTime.value = t;
      s.material.uniforms.uBoost.value = boost;
    }
    renderer.render(scene, camera);
  });

  return {
    destroy() {
      renderer.setAnimationLoop(null);
      removeEventListener("pointermove", onMove);
      removeEventListener("resize", resize);
      renderer.dispose();
    },
  };
}
