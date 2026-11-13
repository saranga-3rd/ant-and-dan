// Fixed layers behind the page: posters, the scrubbed film, the live particle canvas, the dimmer.
export default function Stage() {
  return (
    <>
      <img className="stage-poster" id="poster-hero" src="/img/hero.jpg" alt="" aria-hidden="true" fetchPriority="high" />
      <img className="stage-poster stage-poster--alt" id="poster-layers" src="/img/layers.webp" alt="" aria-hidden="true" loading="lazy" />
      <img className="stage-poster stage-poster--alt" id="poster-spread" src="/img/spread.webp" alt="" aria-hidden="true" loading="lazy" />
      <video id="bgv" className="bg-video" muted playsInline preload="none" aria-hidden="true" tabIndex={-1} />
      <div className="stage-grade" aria-hidden="true" />
      <canvas id="atmos" aria-hidden="true" />
      <div className="stage-dim" aria-hidden="true" />
      <div className="stage-hud" aria-hidden="true">
        <span className="hud-corner hud-corner--tl" />
        <span className="hud-corner hud-corner--tr" />
        <span className="hud-corner hud-corner--bl" />
        <span className="hud-corner hud-corner--br" />
      </div>
    </>
  );
}
