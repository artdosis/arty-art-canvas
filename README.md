# Artdosis landing page

# ARTDOSIS — Master build prompt (for Lovable)

You are building the full **Artdosis** website. This document is the single source of truth. Two files accompany it:

- **`artdosis-preview.html`** — a working, single-file visual reference of the whole site (hero paint engine, wordmark reveal, marquee, gallery shop, service pages, portfolio, forms, nav, preloader). **Match it closely.** When in doubt about layout, spacing, motion or copy, open it and copy the behaviour. The reference contains the exact `SERVICES` and `PORTFOLIO` data arrays and the full paint-engine JavaScript — reuse them.
- **`google-apps-script.gs`** — the backend for all forms (Google Sheets). Instructions inside.

Build it in **React (Vite) + Tailwind + React Router**, using CSS variables for the design tokens. Deploy target is Vercel. Do not use `localStorage`/`sessionStorage` except for the cookie-consent flag. Everything must be responsive, keyboard-accessible, and respect `prefers-reduced-motion`.

---

## 1. What Artdosis is

Artdosis is a Melbourne-based human storytelling studio: art, music and inclusive immersive experiences that create connection, belonging and social impact. It is the public face and funnel of **Mind Connect**, an NDIS support provider. Founder and artist: **Angi Castillo** (Venezuelan-Australian painter and muralist).

- Essence: art as a catalyst for human transformation.
- Taglines: "Art that makes people feel human again." · "A dose of art for the human in you."
- Four pillars: **AWAKEN · CONNECT · EXPRESS · TRANSFORM**.

---

## 2. Brand voice & copy rules (important)

- Warm, poetic, human, plain. Sentence case. Never corporate or "salesy".
- **No em-dashes (—) anywhere.** Use commas, full stops or rewrite. This is a hard rule (the copy must not read as AI-written).
- Use a proper ellipsis `…` (not `...`) and curly apostrophes/quotes (’ ” “).
- No emojis. No "elevate / seamless / unleash / next-gen / game-changer / delve".
- Avoid savior language ("people with lived experience", "co-created with community", "led by listening" are fine and part of the brand; do not over-use).
- Reuse the exact copy in the reference file. It is already written to these rules.

---

## 3. Design system (tokens)

Define these as CSS variables on `:root` and use them everywhere. The Artdosis design system is the source of truth (keep Dosis + Roboto even though generic "premium" guides discourage them — this is the brand).

**Colours**
```
--yellow:#FAEC00; --ink:#111; --ivory:#F7F2EA; --terracotta:#AA5844; --cobalt:#244C9A;
--artivist-red:#C7352B; --aubergine:#2D1E33; --sand:#D9CDBD; --sage:#728064; --sky:#A8C7D7;
--clay:#C8795F; --marigold:#F0B429; --violet:#6D4AFF; --coral:#FF5A4D; --mint:#B8D8C0;
--mist:#EFE9DF; --stone:#BDB5AA; --graphite:#44403C;
--surface:var(--ivory); --raised:#fff; --sunken:var(--mist);
--text:var(--ink); --text-2:var(--graphite); --text-mut:var(--stone); --link:var(--cobalt);
--bd-sub:rgba(17,17,17,.08); --bd:var(--stone);
```

**Type**
```
--f-display:"Dosis",sans-serif;   /* headings, wordmark, buttons; weights 400-800 */
--f-body:"Roboto",system-ui,sans-serif;
--f-mono:"IBM Plex Mono",monospace;  /* eyebrows/labels: uppercase, letter-spacing .12–.16em */
--f-script:"Caveat",cursive;         /* preview stand-in for the brand script font "LOVES" */
```
Load Dosis, Roboto, IBM Plex Mono, Caveat from Google Fonts with `display=swap` and `preconnect`. The real brand script font is **LOVES** (served locally as a self-hosted `@font-face`); use Caveat only as a placeholder until the LOVES file is added.

**Scale / motion / shape**
```
--page:clamp(20px,5vw,80px); --max:1440px; --narrow:760px; --nav-h:84px; --nav-hm:64px;
--r-sm:8px; --r-md:12px; --r-lg:16px; --r-xl:24px; --r-2xl:32px; --r-pill:999px;
--e-out:cubic-bezier(.16,1,.3,1); --e-spring:cubic-bezier(.32,.72,0,1);
--t-fast:140ms; --t-mid:280ms; --t-slow:560ms;
```
- 8pt spacing rhythm. Hairline borders (`--bd-sub`). Diffuse soft shadows only.
- Section padding: `clamp(72px,10vw,140px)`.
- Headings use `text-wrap:balance`. Numbers use `font-variant-numeric:tabular-nums`.

---

## 4. Global chrome & primitives

- **Preloader**: full-screen ivory overlay with a canvas that paints a few bold gestural brush strokes (same paint engine as the hero) for ~1.5s, then fades out. Tagline at the bottom: "A dose of art for the human in you". Under reduced-motion, paint 2–3 static strokes and fade fast.
- **Fixed grain overlay**: `position:fixed; inset:0; pointer-events:none; opacity:.05; mix-blend:multiply;` SVG fractal-noise. Canvas-weave feel.
- **Scroll progress bar**: fixed 3px top bar, gradient terracotta→marigold→cobalt, width = scroll %.
- **Nav**: sticky, translucent + `backdrop-blur`. Wordmark left, links (mono, uppercase) with an underline that wipes in on hover/active, yellow "Join the waitlist" pill. On **/experiences** the nav switches to a dark variant (ivory text) and `<meta theme-color>` becomes `#111`. Below 820px, links collapse into a burger that morphs to an X.
- **Oil-paint mobile menu** (the burger sheet): a full-screen artistic **oil-paint gradient** background made of layered radial gradients in brand colours (terracotta, marigold, cobalt, sage, clay) over ivory, blurred, with a grain overlay. Links are large **Dosis 800 in ink** (fully legible), staggered fade-up on open. Escape and link-tap close it; body scroll locks while open.
- **Buttons**: pill, Dosis 700. Magnetic hover on fine pointers (translate toward cursor, scale down on `:active`). Trailing arrow sits in its own nested circle ("button-in-button") that nudges on hover. Variants: solid ink, `--yellow`, and ghost (transparent + hairline).
- **Cards**: hairline border, soft lift on hover. Feature containers use a "double-bezel" (outer tinted shell `p-2 rounded-2xl` + inner core with concentric radius and a 1px inset highlight).
- **Reveals**: every major block fades up + slight blur as it enters the viewport, using **IntersectionObserver only** (never scroll listeners). Grid items stagger via a `--d` delay. Respect reduced-motion (show instantly).
- **Cookie banner**: ink pill, "Accept / Decline", privacy link; choice stored in `localStorage.ad_consent`; hidden thereafter.
- **Footer**: ink background, wordmark + script tagline + mission, Explore column (Work, Portfolio, Shop, Experiences, About, Let's talk), More column (Instagram, hello@artdosis.com, Privacy, Terms), and an acknowledgement of Country line.

All motion animates **transform/opacity only**. `backdrop-blur` only on fixed/sticky elements.

---

## 5. The hero (signature element)

Centered hero, min-height `100dvh`. Layers, back to front: **paint canvas** → soft ivory **halo** radial (keeps the wordmark legible) → **content** (eyebrow, wordmark, subline, two CTAs, hint, scroll cue). Everything centered.

### 5a. Oil-paint canvas — real bristle brush
The background is an interactive oil painting. As the visitor moves the cursor (or finger), a loaded brush drags paint across the canvas. **Reuse the exact engine in `artdosis-preview.html`** (function `makeBrush`). Key rules, so you can re-implement or verify:

- **Palette (no dark/near-black):** `#C7352B, #E0567A, #D66B8A, #244C9A, #3E9B8E, #3E8E5A, #F0B429, #E08A3C, #AA5844, #C8795F`. The colour **changes randomly per stroke** (a "reloaded brush").
- **One continuous stroke, not stamps.** Draw the path as a smooth quadratic ribbon through the midpoints of buffered points. **Densify the input to ~3px spacing** by interpolating between pointer samples, so fast strokes stay a single continuous ribbon with **no beads/circles**.
- **Bristle striations run along the stroke**, offset perpendicular to travel: a set of thin bristle lines at varying offsets, drawn as parallel continuous curves. Vary their **alpha** and use **lighter tints of the same colour** for texture, plus random "dry" bristles that skip to leave gaps. **Never darken toward black** — the black-line look is wrong.
- A soft solid **body ribbon** (same colour, ~0.5 alpha) under the bristles gives mass. Round caps/joins.
- Paint **accumulates** (source-over, no fade) — it is a canvas being painted.
- Seed a handful of gestural strokes on load; add one slow idle stroke every ~1.5s. Pause the loop when the hero is offscreen (IntersectionObserver). Under reduced-motion, paint a few static strokes and stop.
- Reference target look: long, fluid, directional strokes with visible bristle striations and dry edges (like real oil/acrylic brushwork). No perpendicular "comb" blocks, no beads, no black.

### 5b. Wordmark reveal ("ARTDOSIS")
Two stacked spans of the **same word, same font** (Dosis 800, same size/tracking, centered):
- **front**: filled `--ink`.
- **back**: the identical letters filled with a painted brand **gradient** (`linear-gradient(115deg, terracotta, marigold, artivist-red, cobalt, sage)` via `background-clip:text`).
- A **radial mask follows the cursor** over the wordmark: inside the circle the **front is erased** and the **back (painted) shows**; outside the circle only the front shows. So as you move across the letters, they get "painted" in place. **The word never moves** and **the letters never change shape** — only the fill colour is revealed. At rest (cursor away) it is clean ink ARTDOSIS with no bleed. Works on touch (`touchmove`), resets on leave/`touchend`.

### 5c. Subline + CTAs
Eyebrow "Melbourne · Art and human wellbeing"; subline (see reference copy); CTAs "Join the waitlist" (yellow) and "See the work" (ghost); a small hint line; a "Scroll" cue with an animated line.

### 5d. Marquee
Below the hero, a full-width ink marquee: "Storytelling · Awaken · Connect · Express · Transform · Public art". Auto-scrolls, and is **draggable/scrollable** with pointer/touch (pauses auto-scroll while dragging, resumes after). Disabled auto-scroll under reduced-motion.

---

## 6. Routes & pages

Use React Router. Scroll to top on route change. Hash anchors (e.g. `/#waitlist`) scroll to the section.

1. **/** Home: hero → marquee → "What is Artdosis" (centered lead + script line) → 4 pillar cards → work teaser (4 cards linking to service pages) → philosophy quote band (aubergine) → shop teaser (3 categories) → Awakening feature (ink, split) → **waitlist form** (`#waitlist`).
2. **/work** Index: intro, then three groups of cards — **Art services** (Murals, Live art, Commissions), **Music and sound** (Music production, Music distribution, Sound engineering), **Programs** (Wellbeing programs). Each card links to its own page.
3. **/work/:slug** Service pages — **data-driven** from the `SERVICES` array (see reference file; 7 services). Each page: back link, group eyebrow, title, lead, context tags; a body + "How it happens" numbered steps; its **own form** (posts to its own sheet); a **"What we offer / Inside …"** section with 4–6 detailed sub-offerings; and an "Explore other services" strip. Keep this depth — service pages must not feel thin.
4. **/portfolio** Filterable gallery — **data-driven** from the `PORTFOLIO` array (see reference; ~15 projects). Filter chips: All, Murals, Live art, Events, Commissions, Music, Brands, Experiences. Cards show media, category tags, year, one line. Filtering shows/hides by category. Closing CTA band to /lets-talk. (Content is placeholder based on the brand doc — real projects/assets to be swapped in.)
5. **/shop** — a **digital gallery**, not a plain store:
   - **Originals**: each artwork sits on a wooden **easel** in a gallery room (wall + floor, soft spotlight). Hover lifts the piece with a subtle 3D tilt (`perspective` + `rotateX`).
   - **Limited prints**: **framed and hung on a gallery wall** with a hanging wire to a nail and a wall-cast shadow, museum plate below. Hover lifts.
   - **Wearable art**: also presented as **hung framed pieces** on the wall (bandanas, tees, wellbeing line).
   - Enquire form for originals (`#enquire`). Prints show "Notify me" (checkout opens later with Stripe).
6. **/experiences** — "Awakening" (8–23 Dec 2026), dark hero with warm bloom, the 6-step "awakening journey", a CTA band, and a past events grid (UNESCO, Doctors Without Borders, Hunter Valley).
7. **/about** — founder story (Angi Castillo), milestone cards, team, and a "Work with us" form.
8. **/lets-talk** — partnership intro, ways-we-work list, and a contact form.
9. **/legal/privacy** and **/legal/terms** — simple legal pages (placeholder text OK for now).
10. **404** — on-brand not-found.

---

## 7. Forms → Google Sheets (the database)

**Every** form submits to one Google Apps Script Web App that appends a row to the correct tab. See `google-apps-script.gs` for the code and setup. Put the deployed `/exec` URL in an env var **`VITE_SHEETS_ENDPOINT`**.

- On submit, build a JSON payload: `{ sheet, type, ...namedFields, page, ts }` and `POST` it (`mode:"no-cors"`, `Content-Type:"text/plain;charset=utf-8"`, body = JSON string). Because it is `no-cors`, treat the request as fire-and-forget and show the success state on completion (or on error, since the row still lands).
- **Sheet/type mapping**:
  - waitlist → sheet `Waitlist`, type `general`
  - murals / live art / commissions → sheet `Art_Services`, type `mural` / `live_art` / `commission`
  - music production / distribution / sound engineering → sheet `Music`, type `production` / `distribution` / `sound_engineering`
  - wellbeing programs → sheet `Programs`, type `wellbeing`
  - original artwork enquiry → sheet `Originals`, type `original`
  - let's talk → sheet `Partnerships`, type `partnership`
  - work with us → sheet `Careers`, type `career`
- **Validation & UX** (per web-interface guidelines): required fields, valid email regex, inline error next to the field, **focus the first error on submit**, placeholders end with `…`, correct `type`/`inputmode`/`autocomplete`, labels tied to inputs, `aria-live` status, submit stays enabled until the request starts. On success, replace the form with a checkmark + thank-you message (title/message per form, see reference).
- **Scalable to Stripe**: keep the same intake pattern. Later, add an `Orders` tab (or a Supabase table) written by a Stripe webhook when shop checkout goes live. Do not build payments now; just don't block it architecturally.

---

## 8. Backgrounds & atmosphere

Do not leave flat white. Use brand-tinted sections with depth: ivory/mist/sand washes, soft **radial "paint bloom"** accents behind headings (warm: terracotta+marigold; cool: cobalt+sage), the gallery wall/floor gradients with a soft top light, and the fixed grain overlay. Dark sections use ink/aubergine with ivory text. Keep everything readable.

---

## 9. Accessibility & performance (must pass)

- Icon-only controls have `aria-label`; decorative SVG/canvas `aria-hidden`. Semantic `<button>` for actions, `<a>` for navigation. Visible `:focus-visible` rings (violet). Headings hierarchical.
- Forms: labels, `autocomplete`, correct `type`/`inputmode`, don't block paste, inline errors, focus first error.
- Motion: honour `prefers-reduced-motion`; animate transform/opacity only; interruptible; IntersectionObserver not scroll listeners for reveals.
- `color-scheme` set, `<meta theme-color>` matches (and flips on /experiences). Full-bleed uses `env(safe-area-inset-*)`. `touch-action:manipulation`. No layout-triggering animations, no blur on scrolling containers.
- Images (when real assets arrive): explicit width/height, `loading="lazy"` below the fold, `fetchpriority=high` for the hero.

---

## 10. Assets & content status

- Art/photo blocks are **placeholders with a caption** until real assets arrive (they come from a Dropbox and will be dropped in). Keep them as labelled placeholders so swapping is trivial.
- Add the **LOVES** font as a local `@font-face` when provided; until then Caveat stands in for the script accent.
- Emails: hello@ (clients/general), admin@ (ownership/finance), ndis@ (programs/staff), angi@ (personal).

---

## 11. Ownership & deploy

- All accounts and the domain live under **admin@artdosis.com**; deploy from **Angi's own Vercel account**. No third-party lock-in; the studio owns everything.
- Env vars: `VITE_SHEETS_ENDPOINT` (forms). Later: Stripe keys, Supabase URL/key if added.

---

## 12. Acceptance criteria (checklist)

- [ ] Hero paints **continuous, fluid, multi-colour oil strokes** with bristle striations, **no beads/circles and no black lines**, matching the reference and the brushwork look.
- [ ] Wordmark: **same letters**, painted-in-place gradient reveal that **follows the cursor** and **does not move or change the letterforms**; clean at rest; full "S" visible; works on touch.
- [ ] Draggable marquee; preloader paints strokes; oil-paint mobile menu with legible ink links.
- [ ] All routes exist, including **7 data-driven service pages with depth** and a **filterable Portfolio**.
- [ ] Shop reads as a **digital gallery**: originals on easels, prints and wearable hung on walls, all with hover lift.
- [ ] Every form posts to Google Sheets via `VITE_SHEETS_ENDPOINT` with the correct sheet/type; validation, focus-first-error, and success states work.
- [ ] Copy is humanised with **no em-dashes**; ellipsis and curly quotes used.
- [ ] Responsive to mobile, keyboard-accessible, reduced-motion respected, no console errors.
- [ ] Visual result closely matches `artdosis-preview.html`.

Build it to match the reference. Where the reference and this document agree, follow them exactly; where a detail is missing, choose the option most consistent with the Artdosis design system above.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c470709c-4690-4b4f-a730-afb0c05ef342).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
