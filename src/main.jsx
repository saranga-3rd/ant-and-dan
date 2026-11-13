import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// No StrictMode: the scroll engine (Lenis, ScrollTrigger, the film) initialises once per page load.
createRoot(document.getElementById("root")).render(<App />);
