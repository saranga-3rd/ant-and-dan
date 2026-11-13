# Ant & Dan's website

A one-page React site (Vite) for Ant & Dan's: New York pizza, pasta and shakes in Colombo.
The hero is a 13.8-second film that plays forward and backward as you scroll, with live particles
(three.js) drifting over it. Brand decisions live in `../copy/brand-kit.md`. Every generated asset and
prompt is logged in `../copy/prompts.md` and `../copy/menu-prompts.md`.

## Run it

The project folder name contains `&`, which breaks Windows' npm launcher shims. The scripts call Vite
through Node directly, so these work as normal:

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve dist/ on http://localhost:4173
```

Always preview over HTTP. Opening `dist/index.html` from disk (`file://`) blocks the film download,
and the page falls back to still images on purpose.

## How the hero works

- `public/film.mp4`: the scroll film, 720p H.264 with short keyframe intervals so seeking is instant, 9.8 MB.
  It is downloaded as a Blob, so scrubbing works even on hosts without HTTP Range support.
- `src/engine/film.js`: one GSAP timeline, scrubbed by scroll, drives the film's playhead, the five beats
  of copy, the ingredient labels and the still-image fallback. Beat timings are in `SCRIPT` at the top.
- `src/engine/atmosphere.js`: flour dust and cyan/purple specks over the film (three.js, loaded after the page paints).
- Phones, tablets and reduced-motion visitors never download the film. They get three stills that crossfade
  (`public/img/hero.jpg`, `layers.webp`, `spread.webp`).

## Placeholders to replace before launch

These are in `src/data/menu.js` (`contact`) and in the copy:

| What | Where | Now |
|---|---|---|
| Mall name and address | `contact.address` | `Level 3 Food Court, [Mall name], Colombo` |
| Phone | `contact.phone`, `contact.phoneHref` | `+94 11 234 5678` |
| Email | `contact.email` | `hello@antanddans.lk` |
| Opening hours | `contact.hours` | daily 10:00 to 23:00, Fri/Sat to midnight |
| Socials | `contact.socials` | `@antanddans` on Instagram, TikTok, Facebook |
| Delivery link | the "Order delivery" button in `Visit` (`Sections.jsx`) | points back to `#visit` |
| Directions link | "Get directions" in `Visit` | a Google Maps search for Colombo |
| The Ant & Dan story | `MeetUs` in `Sections.jsx` | written as a placeholder, please check with Ant and Dan |
| "Named after the bigger appetite of the two" | The Big Dan card | a cheeky placeholder line |
| Prices | not shown anywhere | the menu had none, so the site says prices are on the board in store |

## Where a visitor's message goes

**Nowhere yet.** The contact form in the Visit section validates the fields and shows a thank-you message,
but it is not connected to an inbox, because the contact details are placeholders. When the real email is
confirmed, either point the form at a form service (Formspree, Basin, or the host's mail form), or swap it
for a `mailto:` link. Until then, visitors see the phone number for anything urgent.

## Content notes

- Third-party drink and spread brands from the menu are written generically ("post-mix soft drinks",
  "draft lager", "hazelnut chocolate spread"). Switch them back in `src/data/menu.js` if supplier
  agreements allow.
- The ANT & DAN'S wordmark is always the supplied artwork (`public/brand/`), never typed in a font.
- Fonts: Anton (headlines) and Lato 400/700/900 (body), from Google Fonts.
