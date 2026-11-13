import { useEffect, useState } from "react";

const links = [
  { href: "#lineup", label: "Pizzas" },
  { href: "#pasta", label: "Pasta bar" },
  { href: "#shakes", label: "Shakes" },
  { href: "#meals", label: "Meals" },
  { href: "#menu", label: "Full menu" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
  }, [open]);

  return (
    <header className={`nav${solid ? " nav--solid" : ""}${open ? " nav--open" : ""}`}>
      <a className="nav__brand" href="#story" aria-label="Ant & Dan’s, back to the top" onClick={() => setOpen(false)}>
        <img src="/brand/wordmark-white.png" alt="Ant & Dan’s" width="178" height="60" />
      </a>
      <nav className="nav__links" aria-label="Main">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
      </nav>
      <a className="btn btn--primary btn--sm nav__cta" href="#visit" onClick={() => setOpen(false)}>Order now</a>
      <button
        className="nav__toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span /><span />
      </button>
      <div id="mobile-menu" className="nav__sheet" hidden={!open}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a href="#visit" onClick={() => setOpen(false)}>Visit & order</a>
      </div>
    </header>
  );
}
