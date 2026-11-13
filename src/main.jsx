import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import { trackPromise } from "./engine/loader.js";

// The loading screen also waits for the brand fonts and the hero still (the film registers itself).
trackPromise("fonts", 1, "Setting the table",
  Promise.all([document.fonts.load("1em Anton"), document.fonts.load("700 1em Lato"), document.fonts.ready]));
trackPromise("hero", 1, "Warming the oven",
  new Promise((res) => { const i = new Image(); i.onload = i.onerror = res; i.src = "/img/hero.jpg"; }));

// No StrictMode: the scroll engine (Lenis, ScrollTrigger, the film) initialises once per page load.
createRoot(document.getElementById("root")).render(<App />);
