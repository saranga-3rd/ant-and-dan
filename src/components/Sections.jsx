import { useState } from "react";
import {
  classics, premiums, finishes, melts, pastaShapes, pastaSizes, pastaSauces, extras,
  freshPicks, freshAddOns, sweets, meals, levelUps, shakes, shakeExtras, drinks, contact,
} from "../data/menu.js";

/* ---------------------------------------------------------------- Impact */
export function Impact() {
  const stats = [
    { big: "18″", small: "New York pies, by the slice, the half or the whole thing" },
    { big: "4 × 10", small: "pasta shapes and sauces, so forty bowls before you add a size" },
    { big: "6", small: "old school thickshakes, and malt if you ask nicely" },
    { big: "4", small: "free finishes on everything: chilli oil, honey, flakes, parmesan" },
  ];
  return (
    <section className="impact" id="impact">
      <h2 className="impact__line" data-reveal>
        Fresh dough<br />every morning.<br />
        <span className="impact__line--outline">Eighteen inches</span> of it.
      </h2>
      <dl className="impact__stats">
        {stats.map((s) => (
          <div className="stat" key={s.big} data-reveal>
            <dt className="stat__big">{s.big}</dt>
            <dd className="stat__small">{s.small}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ---------------------------------------------------------------- Line-up */
export function LineUp() {
  const restClassics = classics.filter((c) => !["Devilled Chicken", "Four Cheese"].includes(c.name));
  return (
    <section className="lineup panel" id="lineup">
      <header className="section-head">
        <p className="kicker">The line-up</p>
        <h2 className="display display--lg" data-reveal>Nine classics.<br />Three for the whole table.</h2>
        <p className="section-head__lede" data-reveal>
          Every classic comes by the slice, the half or the full 18-inch pie. Premiums are full pies only, because they deserve it.
        </p>
      </header>

      <div className="lineup__grid">
        <article className="pie pie--feature" data-reveal data-tilt>
          <div className="pie__media"><img src="/img/menu/big-dan.webp" alt="The Big Dan pizza with a slice pulling away, cheese stretching" loading="lazy" /></div>
          <div className="pie__body">
            <p className="pie__tag pie__tag--premium">Premium · full pie</p>
            <h3 className="pie__name">The Big Dan</h3>
            <p className="pie__desc">{premiums[1].desc}.</p>
            <p className="pie__note">Named after the bigger appetite of the two.</p>
          </div>
        </article>

        <article className="pie pie--side" data-reveal data-tilt>
          <div className="pie__media"><img src="/img/menu/prawn-calamari.webp" alt="Prawn and calamari pizza with lemon wedges" loading="lazy" /></div>
          <div className="pie__body">
            <p className="pie__tag pie__tag--premium">Premium · full pie</p>
            <h3 className="pie__name">Prawn &amp; Calamari</h3>
            <p className="pie__desc">{premiums[0].desc}.</p>
          </div>
        </article>

        <article className="pie pie--side pie--heat" data-reveal data-tilt>
          <div className="pie__media"><img src="/img/menu/devilled-chicken.webp" alt="A devilled chicken slice lifting from the pie" loading="lazy" /></div>
          <div className="pie__body">
            <p className="pie__tag">Classic · slice, half, full</p>
            <h3 className="pie__name">Devilled Chicken</h3>
            <p className="pie__desc">Tomato, mozzarella, devilled chicken, red onion, roasted capsicum. Brings the heat.</p>
          </div>
        </article>

        <article className="pie pie--wide" data-reveal>
          <div className="pie__media"><img src="/img/menu/four-cheese.webp" alt="A four cheese slice with a long cheese pull" loading="lazy" /></div>
          <div className="pie__body">
            <p className="pie__tag">Classic · slice, half, full</p>
            <h3 className="pie__name">Four Cheese</h3>
            <p className="pie__desc">Mozzarella, cheddar, parmesan and ricotta with black pepper. The pull goes on for a while.</p>
            <ul className="pie__more" aria-label="More classics">
              {restClassics.map((c) => <li key={c.name}><strong>{c.name}</strong><span>{c.desc}</span></li>)}
            </ul>
            <p className="pie__note">Also premium: <strong>Tandoori Chicken</strong>, {premiums[2].desc.toLowerCase()}.</p>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- The bake */
export function Bake() {
  return (
    <section className="bake" id="bake">
      <div className="bake__film" data-reveal>
        <video src="/video/oven.mp4" muted loop playsInline autoPlay preload="metadata" poster="/img/world.webp" aria-label="The deck oven glowing, steam rising off fresh pies" />
        <span className="tube tube--cyan" aria-hidden="true" />
      </div>
      <div className="bake__copy">
        <p className="kicker">The bake</p>
        <h2 className="display display--lg" data-reveal>The dough does<br />the talking.</h2>
        <p className="bake__lede" data-reveal>
          Every morning starts the same: flour on the bench, dough balls lined up, the oven coming up to heat. Every base is stretched by hand,
          so the crust puffs up, blisters and comes out freckled the way a New York pie should.
        </p>
        <div className="bake__steps">
          <div className="step" data-reveal data-tilt>
            <img src="/img/material.webp" alt="Close-up of a blistered, leopard-spotted crust and a cupped pepperoni" loading="lazy" />
            <div>
              <h3>Crust with character</h3>
              <p>Thin in the middle, puffy at the edge, spotted from the heat.</p>
            </div>
          </div>
          <div className="step step--finishes" data-reveal>
            <h3>Free finishes on everything</h3>
            <ul className="chips">{finishes.map((f) => <li key={f}>{f}</li>)}</ul>
            <p>Pizzas, pastas and sides. Ask at the counter or add them to your order.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Pasta bar */
export function PastaBar() {
  const [shape, setShape] = useState("Penne");
  const [sauce, setSauce] = useState(pastaSauces[0].name);
  const [size, setSize] = useState("Large");
  const chosen = pastaSauces.find((s) => s.name === sauce);
  return (
    <section className="pasta panel" id="pasta">
      <div className="pasta__builder">
        <p className="kicker">The pasta bar</p>
        <h2 className="display display--lg" data-reveal>Pick your shape.<br />Pick your sauce.<br />Pick your size.</h2>

        <fieldset className="picker">
          <legend>Shape</legend>
          <div className="picker__row">
            {pastaShapes.map((s) => (
              <button key={s} type="button" className="opt" aria-pressed={shape === s} onClick={() => setShape(s)}>{s}</button>
            ))}
          </div>
        </fieldset>

        <fieldset className="picker">
          <legend>Sauce</legend>
          <div className="picker__row picker__row--wrap">
            {pastaSauces.map((s) => (
              <button key={s.name} type="button" className={`opt${s.heat ? " opt--heat" : ""}`} aria-pressed={sauce === s.name} onClick={() => setSauce(s.name)}>
                {s.name}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="picker">
          <legend>Size</legend>
          <div className="picker__row">
            {pastaSizes.map((s) => (
              <button key={s} type="button" className="opt" aria-pressed={size === s} onClick={() => setSize(s)}>{s}</button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="pasta__result" aria-live="polite">
        <div className="pasta__media" data-tilt>
          <img src="/img/menu/pasta-bowl.webp" alt="Kochchi chicken penne in an Ant & Dan’s pasta bowl, fork lifting a twirl" loading="lazy" />
        </div>
        <div className="ticket">
          <p className="ticket__label">Your bowl</p>
          <p className="ticket__title">{size} {shape}, {sauce}</p>
          <p className="ticket__desc">{chosen.desc}.{chosen.heat ? " This one has a kick." : ""}</p>
          <a className="btn btn--primary" href="#visit">Order this bowl</a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Melts, extras, sweets */
export function MeltsExtras() {
  const groups = [
    { id: "melts", img: "/img/menu/melt.webp", alt: "A chicken parm melt cut open with a cheese pull", title: "Melts", line: "Our pizza dough, baked hot, folded and loaded.", items: melts },
    { id: "extras", img: "/img/menu/extras.webp", alt: "Garlic knots, A&D fries and mozzarella sticks with dips", title: "The extras", line: "Pick a few. Load it up. Don’t hold back.", items: extras },
    { id: "sweets", img: "/img/menu/sweets.webp", alt: "A big cookie with soft serve next to an A&D sundae", title: "Save room", line: "You’ll want something sweet.", items: sweets },
  ];
  return (
    <section className="rail-section" id="more">
      <header className="section-head section-head--row">
        <div>
          <p className="kicker">Beyond the pie</p>
          <h2 className="display display--lg" data-reveal>Folded, loaded,<br />gone in minutes.</h2>
        </div>
        <p className="section-head__lede" data-reveal>Drag or scroll sideways. Every one of these goes well with a free finish on top.</p>
      </header>
      <div className="rail" tabIndex={0} aria-label="Melts, extras and desserts">
        {groups.map((g) => (
          <article className={`rail__card rail__card--${g.id}`} key={g.id}>
            <div className="rail__media"><img src={g.img} alt={g.alt} loading="lazy" /></div>
            <div className="rail__body">
              <h3 className="rail__title">{g.title}</h3>
              <p className="rail__line">{g.line}</p>
              <ul className="rail__list">
                {g.items.map((it) => <li key={it.name}><strong>{it.name}</strong><span>{it.desc}</span></li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Shakes */
export function Shakes() {
  const [pick, setPick] = useState(shakes[3]);
  return (
    <section className="shakes" id="shakes" style={{ "--swatch": pick.swatch }}>
      <div className="shakes__copy">
        <p className="kicker">Old school thickshakes</p>
        <h2 className="display display--lg" data-reveal>Thick. Cold.<br />Proper old school.</h2>
        <div className="flavours" role="radiogroup" aria-label="Pick a flavour">
          {shakes.map((s) => (
            <button
              key={s.name}
              type="button"
              role="radio"
              aria-checked={pick.name === s.name}
              className="flavour"
              style={{ "--dot": s.swatch }}
              onClick={() => setPick(s)}
            >
              <span className="flavour__dot" aria-hidden="true" />{s.name}
            </button>
          ))}
        </div>
        <p className="shakes__pick" aria-live="polite"><strong>{pick.name}.</strong> {pick.desc}.</p>
        <p className="shakes__extras-title">Make it yours</p>
        <ul className="chips chips--quiet">{shakeExtras.map((e) => <li key={e}>{e}</li>)}</ul>
      </div>
      <div className="shakes__media">
        <div className="shakes__loop">
          <video src="/video/shake.mp4" muted loop playsInline autoPlay preload="metadata" aria-label="A cookies and cream thickshake in an Ant & Dan’s cup, crumbs falling" />
        </div>
        <img className="shakes__trio" src="/img/menu/shakes.webp" alt="Vanilla, chocolate and salted caramel thickshakes in Ant & Dan’s cups" loading="lazy" data-reveal />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Made for every crowd */
export function Crowd() {
  const rows = [
    { when: "Saturday, 1pm", who: "The family table", line: "Slices for the kids, a premium pie for the grown-ups, shakes all round. Nobody argues about where to eat." },
    { when: "Tuesday, 4pm", who: "Between lectures", line: "A slice meal, fries and a drink. Back on the bus before the next class." },
    { when: "Friday, 11pm", who: "After the late show", line: "Open till midnight on weekends. Something big, hot and fast when the credits roll." },
    { when: "Any weekday", who: "The office order", line: "Full pies and large pastas for the team, delivered while they’re still hot." },
  ];
  return (
    <section className="crowd panel" id="crowd">
      <header className="section-head">
        <p className="kicker">Made for every crowd</p>
        <h2 className="display display--lg" data-reveal>One table.<br />Everybody fits.</h2>
      </header>
      <ol className="crowd__rows">
        {rows.map((r) => (
          <li className="crowd__row" key={r.who} data-reveal>
            <span className="crowd__when">{r.when}</span>
            <span className="crowd__who">{r.who}</span>
            <span className="crowd__line">{r.line}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------------------------------------------------------- Make it a meal */
export function Meals() {
  return (
    <section className="meals" id="meals">
      <div className="meals__intro">
        <p className="kicker">Make it a meal</p>
        <h2 className="display display--lg" data-reveal>More food.<br />Better value.<br />Easy choice.</h2>
        <img src="/img/menu/slice-meal.webp" alt="A pepperoni slice, A&D fries and a cold drink" loading="lazy" data-reveal />
      </div>
      <div className="meals__table" role="table" aria-label="Meal deals">
        <div className="meals__row meals__row--head" role="row">
          <span role="columnheader">Meal</span>
          <span role="columnheader">The main</span>
          <span role="columnheader">On the side</span>
          <span role="columnheader">Drinks</span>
          <span role="columnheader">Feeds</span>
        </div>
        {meals.map((m) => (
          <div className={`meals__row${m.featured ? " meals__row--featured" : ""}`} role="row" key={m.name} data-reveal>
            <span role="cell" className="meals__name">{m.name}{m.featured && <em className="meals__flag">Best for two</em>}</span>
            <span role="cell" data-label="The main">{m.main}</span>
            <span role="cell" data-label="On the side">{m.side}</span>
            <span role="cell" data-label="Drinks">{m.drinks}</span>
            <span role="cell" data-label="Feeds" className="meals__feeds">{m.feeds}</span>
          </div>
        ))}
        <div className="levelups">
          <p className="levelups__title">Level up any meal</p>
          <ul>
            {levelUps.map((l) => <li key={l.name}><strong>{l.name}</strong><span>{l.desc}</span></li>)}
          </ul>
          <p className="levelups__note">Prices are on the menu board in store. Drink upgrades are charged per drink.</p>
        </div>
        <a className="btn btn--primary" href="#visit">Order a meal</a>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Meet Ant & Dan */
export function MeetUs() {
  return (
    <section className="meet panel" id="meet">
      <div className="meet__sticker" data-reveal data-tilt>
        <img src="/brand/mascots.webp" alt="Ant and Dan, the two mates behind Ant & Dan’s" loading="lazy" />
      </div>
      <div className="meet__copy">
        <p className="kicker">Meet Ant &amp; Dan</p>
        <h2 className="display display--lg" data-reveal>Two mates.<br />One very hot oven.</h2>
        <p data-reveal>
          Ant and Dan spent years arguing about where to get a proper slice in Colombo. In the end they settled it the only way that made
          sense: they opened their own place. Big New York pies, pasta made your way and shakes like the ones they grew up on.
        </p>
        <p data-reveal>
          The kochchi on the pizza and the Jaffna spice in the pasta are not on any menu in New York. That part is all Colombo.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Full menu */
const tabs = [
  { id: "pizzas", label: "Pizzas" },
  { id: "melts", label: "Melts" },
  { id: "pasta", label: "Pasta" },
  { id: "extras", label: "Extras & salads" },
  { id: "sweets", label: "Sweets" },
  { id: "drinks", label: "Shakes & drinks" },
];

function List({ items }) {
  return (
    <ul className="menu-list">
      {items.map((i) => <li key={i.name}><span className="menu-list__name">{i.name}</span><span className="menu-list__desc">{i.desc}</span></li>)}
    </ul>
  );
}

export function FullMenu() {
  const [tab, setTab] = useState("pizzas");
  return (
    <section className="fullmenu panel" id="menu">
      <header className="section-head section-head--row">
        <div>
          <h2 className="display display--lg" data-reveal>Everything we make.</h2>
        </div>
        <p className="section-head__lede" data-reveal>Free finishes on all pizzas, pastas and sides: house chilli oil, honey, chilli flakes, parmesan.</p>
      </header>
      <div className="tabs" role="tablist" aria-label="Menu sections">
        {tabs.map((t) => (
          <button key={t.id} role="tab" id={`tab-${t.id}`} aria-selected={tab === t.id} aria-controls={`panel-${t.id}`} className="tab" onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="tabpanel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === "pizzas" && (
          <div className="menu-cols">
            <div><h3>Classic pizzas</h3><p className="menu-note">Slice · half pie · full 18″ pie</p><List items={classics} /></div>
            <div><h3>Premium pizzas</h3><p className="menu-note">Full 18″ pie only</p><List items={premiums} /></div>
          </div>
        )}
        {tab === "melts" && (
          <div className="menu-cols"><div><h3>Melts</h3><p className="menu-note">Our pizza dough, baked hot, folded and loaded</p><List items={melts} /></div></div>
        )}
        {tab === "pasta" && (
          <div className="menu-cols">
            <div><h3>Pick your pasta</h3><p className="menu-note">Small · large</p><p className="menu-inline">{pastaShapes.join(" · ")}</p></div>
            <div><h3>Pick your sauce</h3><List items={pastaSauces} /></div>
          </div>
        )}
        {tab === "extras" && (
          <div className="menu-cols">
            <div><h3>The extras</h3><List items={extras} /></div>
            <div><h3>Fresh picks</h3><p className="menu-note">Regular · double</p><List items={freshPicks} /><p className="menu-inline">Add a topping: {freshAddOns.join(" · ")}</p></div>
          </div>
        )}
        {tab === "sweets" && (
          <div className="menu-cols"><div><h3>Save room</h3><List items={sweets} /></div></div>
        )}
        {tab === "drinks" && (
          <div className="menu-cols">
            <div><h3>Old school thickshakes</h3><List items={shakes} /><p className="menu-inline">Make it yours: {shakeExtras.join(" · ")}</p></div>
            <div><h3>Drinks</h3><List items={drinks} /></div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Visit & order */
export function Visit() {
  const [sent, setSent] = useState(false);
  return (
    <section className="visit" id="visit">
      <img className="visit__bg" src="/img/world.webp" alt="" aria-hidden="true" loading="lazy" />
      <div className="visit__inner">
        <div className="visit__copy">
          <h2 className="display display--lg" data-reveal>Come hungry.</h2>
          <address className="visit__address">{contact.address}</address>
          <dl className="visit__hours">
            {contact.hours.map((h) => (
              <div key={h.days}><dt>{h.days}</dt><dd>{h.time}</dd></div>
            ))}
          </dl>
          <div className="visit__actions">
            <a className="btn btn--primary" href={contact.phoneHref}>Call for takeaway</a>
            <a className="btn btn--ghost" href="#visit" data-placeholder="delivery">Order delivery</a>
            <a className="link-arrow" href="https://maps.google.com/?q=Colombo%20Sri%20Lanka" target="_blank" rel="noopener noreferrer">Get directions</a>
          </div>
        </div>

        <form
          className="visit__form"
          onSubmit={(e) => { e.preventDefault(); if (e.currentTarget.checkValidity()) setSent(true); }}
          aria-label="Send us a message"
        >
          {sent ? (
            <div className="form-done" role="status">
              <p className="form-done__title">Got it. Thank you.</p>
              <p>We’ll get back to you soon. For anything urgent, call {contact.phone}.</p>
            </div>
          ) : (
            <>
              <p className="form__title">Party orders, office lunches, or just a question?</p>
              <label>Your name<input name="name" required autoComplete="name" /></label>
              <label>Email or phone<input name="contact" required autoComplete="email" /></label>
              <label>Message<textarea name="message" rows={4} required /></label>
              <button className="btn btn--primary" type="submit">Send message</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Footer */
export function Footer() {
  return (
    <footer className="footer stage-cover">
      <p className="footer__line">See you at<br />the counter.</p>
      <img className="footer__mark" src="/brand/wordmark-white.png" alt="Ant & Dan’s" width="534" height="180" loading="lazy" />
      <div className="footer__cols">
        <div>
          <p className="footer__h">Find us</p>
          <p>{contact.address}</p>
          <p><a href={contact.phoneHref}>{contact.phone}</a></p>
          <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
        </div>
        <div>
          <p className="footer__h">Open</p>
          {contact.hours.map((h) => <p key={h.days}>{h.days}: {h.time}</p>)}
        </div>
        <div>
          <p className="footer__h">Follow</p>
          {contact.socials.map((s) => (
            <p key={s.name}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.name} {s.handle}</a></p>
          ))}
        </div>
      </div>
      <p className="footer__legal">© 2026 Ant &amp; Dan’s · Pizza · Pasta · Shakes · Colombo</p>
    </footer>
  );
}

/* ---------------------------------------------------------------- Signature: the neon tube rail */
export function NeonRail() {
  return (
    <div className="neon-rail" aria-hidden="true">
      <svg className="neon-rail__crown" viewBox="0 0 64 44" width="22" height="16">
        <path d="M8 38 L4 10 L19 21 L32 4 L45 21 L60 10 L56 38 Q32 32 8 38 Z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
      </svg>
      <span className="neon-rail__track"><span className="neon-rail__fill" /></span>
    </div>
  );
}
