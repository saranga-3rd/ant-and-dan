// The five beats of copy over the scroll film. All beats live in one sticky frame;
// src/engine/film.js crossfades them as the film scrubs.
// anchors in film pixels (1280×720), read off the frame at 5.6 s
const layers = [
  { label: "Parmesan & oregano", vx: 655, vy: 102 },
  { label: "Cupped pepperoni", vx: 648, vy: 198 },
  { label: "Mozzarella, plenty of it", vx: 642, vy: 288 },
  { label: "Slow-cooked tomato", vx: 628, vy: 378 },
  { label: "Hand-stretched crust", vx: 570, vy: 478 },
];

export default function Story() {
  return (
    <section id="story" aria-label="How an Ant & Dan’s pie comes together">
      <div className="story__pin">
        <div className="beat beat--one" data-beat>
          <p className="kicker">New York pies · Colombo</p>
          <h1 className="display">
            Big New York pies.<br />
            <span className="accent-word">Colombo</span> heat.
          </h1>
          <p className="beat__lede">
            18-inch pies by the slice, the half or the whole thing. Pasta your way. Shakes thick enough to need a spoon.
          </p>
          <div className="beat__actions">
            <a className="btn btn--primary" href="#menu">See the menu</a>
            <a className="link-arrow" href="#visit">Find us at the mall</a>
          </div>
          <div className="scroll-cue" aria-hidden="true"><span />Scroll to build a pie</div>
        </div>

        <div className="beat beat--two" data-beat>
          <h2 className="display display--md">Stretched by hand.<br />Made fresh every morning.</h2>
          <p className="beat__lede">One dough runs through every pie and every melt. We make it each morning and stretch every base by hand.</p>
        </div>

        <div className="beat beat--three" data-beat>
          <h2 className="display display--md">Every layer,<br />made in-house.</h2>
          <ul className="layer-list" aria-label="What goes into a Tony Pepperoni">
            {layers.slice().reverse().map((l) => <li key={l.label}>{l.label}</li>)}
          </ul>
        </div>

        <div className="beat beat--four" data-beat>
          <h2 className="display display--md">Slice it. Half it.<br />Take the whole thing.</h2>
          <p className="beat__lede">A slice for the walk to the cinema. A half for two. The full 18 inches when everyone’s hungry.</p>
        </div>

        <div className="beat beat--five" data-beat>
          <h2 className="display display--md">Made for good food<br />and great company.</h2>
          <p className="beat__lede">Pizza, pasta and shakes, in the box and on the table. Dine in, take away or get it delivered.</p>
          <div className="beat__actions">
            <a className="btn btn--primary" href="#menu">See the menu</a>
          </div>
        </div>

        <div className="layer-labels" aria-hidden="true">
          {layers.map((l) => (
            <span key={l.label} className="layer-label" data-vx={l.vx} data-vy={l.vy}>
              <span className="layer-label__text">{l.label}</span>
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
