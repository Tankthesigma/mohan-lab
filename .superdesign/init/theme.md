# Theme and design tokens

## Compact token summary

- Palette: paper `#f6f5f2`, deep paper `#ecebe7`, white `#ffffff`, ink `#17232d`, soft ink `#3f4b54`, muted `#69737a`, UH red `#c8102e`, dark red `#981027`, slate blue `#263c4b`, line `#d6d5cf`, dark line `#52606a`.
- Type: system Helvetica/Arial sans for UI and body; Georgia/Times serif for editorial display. Body 17px; lead 18.9–22.4px; captions 14px; primary display sizes use responsive clamp values.
- Layout: 1240px max shell with 64px desktop and 38px tablet side gutters. Primary section padding 88px.
- Shape: square, institutional geometry; buttons and cards use 0–2px radius.
- Motion: `cubic-bezier(.22, 1, .36, 1)`, 650–800ms scroll reveals, reduced-motion fallback.
- Breakpoints: 1080px, 820px, and 560px.
- Visual language: institutional editorial grid, warm paper, high-contrast slate/white, restrained UH red accents, documentary research photography, serif display with sans-serif information hierarchy.

## Raw source: app/globals.css

```css
:root {
  --paper: #f6f5f2;
  --paper-deep: #ecebe7;
  --white: #ffffff;
  --ink: #17232d;
  --ink-soft: #3f4b54;
  --muted: #69737a;
  --red: #c8102e;
  --red-dark: #981027;
  --blue: #263c4b;
  --line: #d6d5cf;
  --line-dark: #52606a;
  --sans: "Helvetica Neue", Helvetica, Arial, sans-serif;
  --serif: Georgia, "Times New Roman", serif;
  --shell: 1240px;
  --ease: cubic-bezier(.22, 1, .36, 1);
  --type-caption: .875rem;
  --type-label: .9375rem;
  --type-ui: 1rem;
  --type-body: 1.0625rem;
  --type-body-lg: 1.1875rem;
  --type-lead: clamp(1.18rem, 1.7vw, 1.4rem);
}

* { box-sizing: border-box; }
html { overflow-x: clip; scroll-behavior: smooth; }
body {
  overflow-x: clip;
  margin: 0;
  color: var(--ink);
  background: var(--paper);
  font-family: var(--sans);
  font-size: var(--type-body);
  line-height: 1.62;
  -webkit-font-smoothing: antialiased;
}
body, button, a { font-family: var(--sans); }
main { min-height: 60vh; }
img { display: block; max-width: 100%; }
a { color: inherit; }
button { color: inherit; }
p { text-wrap: pretty; }
h1, h2, h3 { text-wrap: balance; }
::selection { color: white; background: var(--red); }
:focus-visible { outline: 3px solid #ec4b66; outline-offset: 4px; }

.shell { width: min(var(--shell), calc(100% - 64px)); margin-inline: auto; }
.narrow { max-width: 920px; }
.section-pad { padding: 88px 0; }
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0;
  color: var(--red);
  font-size: var(--type-caption);
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
}
.eyebrow::before { display: none; }
.eyebrow.light { color: #f1788c; }

.button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 0 24px;
  border: 1px solid var(--ink);
  border-radius: 0;
  font-size: var(--type-ui);
  font-weight: 750;
  text-decoration: none;
  transition: color .2s, background .2s, border-color .2s;
}
.button:hover { transform: none; }
.button-primary { color: white; background: var(--red); border-color: var(--red); }
.button-primary:hover { background: var(--red-dark); border-color: var(--red-dark); }
.button-ghost { color: var(--ink); background: transparent; }
.button-ghost:hover { color: white; background: var(--ink); }
.button-dark { color: white; background: var(--ink); }
.button-white { color: var(--ink); background: white; border-color: white; }
.text-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--ink);
  font-size: var(--type-ui);
  font-weight: 750;
  text-decoration: none;
}
.text-link span, .text-link b { color: var(--red); font-size: 1.25rem; transition: transform .25s; }
.text-link:hover span, .text-link:hover b { transform: translateX(5px); }
.text-link.light { color: white; }

/* Header */
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  height: 74px;
  color: var(--ink);
  background: rgba(244, 242, 236, .96);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(16px);
  transition: transform .4s var(--ease);
}
.site-header.nav-hidden { transform: translateY(-105%); }
.scroll-progress {
  position: fixed;
  inset: 0 auto auto 0;
  z-index: 100;
  width: 100%;
  height: 3px;
  background: var(--red);
  transform: scaleX(0);
  transform-origin: left;
}
.nav-shell {
  width: min(var(--shell), calc(100% - 48px));
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}
.brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
.brand-mark {
  position: relative;
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  color: white;
  background: var(--red);
  font-family: var(--serif);
  font-size: 1.35rem;
  font-weight: 700;
}
.brand-mark i { position: absolute; right: -3px; bottom: -3px; width: 9px; height: 9px; background: var(--blue); border: 2px solid var(--paper); border-radius: 50%; }
.brand-copy { display: flex; flex-direction: column; line-height: 1.05; }
.brand-copy strong { font-size: 1rem; letter-spacing: -.01em; }
.brand-copy small { margin-top: 5px; color: var(--muted); font-size: .75rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.site-header nav { display: flex; align-items: center; gap: 2px; }
.site-header nav a {
  padding: 9px 11px;
  color: var(--ink-soft);
  border-bottom: 2px solid transparent;
  font-size: var(--type-label);
  font-weight: 650;
  text-decoration: none;
  transition: color .2s, border-color .2s;
}
.site-header nav a:hover, .site-header nav a.active { color: var(--ink); border-color: var(--red); }
.site-header nav .nav-contact { margin-left: 10px; padding: 10px 17px; color: white; background: var(--ink); border: 1px solid var(--ink); }
.site-header nav .nav-contact:hover { color: white; background: var(--red); border-color: var(--red); }
.menu-toggle { display: none; width: 44px; height: 44px; padding: 0; background: transparent; border: 0; }
.menu-toggle span { display: block; width: 24px; height: 2px; margin: 6px auto; background: var(--ink); transition: transform .25s; }
.menu-toggle.is-open span:first-child { transform: translateY(4px) rotate(45deg); }
.menu-toggle.is-open span:last-child { transform: translateY(-4px) rotate(-45deg); }

/* Home */
.home-hero { padding: 110px 0 48px; background: var(--paper); }
.hero-layout { min-height: 600px; display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(440px, .92fr); gap: 52px; align-items: center; }
.hero-content { max-width: 650px; }
.hero-kicker { margin-bottom: 32px; color: var(--red); font-size: var(--type-caption); font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
.home-hero h1 {
  margin: 0;
  font-size: clamp(3.5rem, 5vw, 5.3rem);
  font-weight: 650;
  line-height: .96;
  letter-spacing: -.065em;
}
.home-hero h1 em { display: block; margin-top: 10px; color: var(--red); font-style: normal; font-weight: 430; }
.home-hero .hero-content > p { max-width: 620px; margin: 26px 0; color: var(--ink-soft); font-size: var(--type-body-lg); line-height: 1.65; }
.hero-actions { display: flex; gap: 12px; }
.hero-proof { display: flex; gap: 34px; margin-top: 36px; padding-top: 20px; border-top: 1px solid var(--line); }
.hero-proof span { max-width: 150px; color: var(--muted); font-size: var(--type-caption); line-height: 1.4; }
.hero-proof strong { display: block; margin-bottom: 6px; color: var(--ink); font-size: 1.7rem; line-height: 1; }
.hero-media { position: relative; height: 600px; margin: 0; overflow: hidden; background: var(--paper-deep); }
.hero-media::after { position: absolute; inset: 0; content: ""; background: linear-gradient(to top, rgba(0,0,0,.28), transparent 35%); pointer-events: none; }
.hero-media img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
.hero-media figcaption { position: absolute; z-index: 1; right: 22px; bottom: 18px; left: 22px; color: white; font-size: var(--type-caption); font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }

.expertise-strip { color: white; background: var(--ink); }
.expertise-grid { display: grid; grid-template-columns: repeat(6, 1fr); }
.expertise-item { min-height: 104px; display: flex; flex-direction: column; justify-content: center; padding: 18px; border-left: 1px solid var(--line-dark); font-size: var(--type-label); font-weight: 650; line-height: 1.35; }
.expertise-item:last-child { border-right: 1px solid var(--line-dark); }
.expertise-item span { margin-bottom: 8px; color: #ef6c83; font-size: .75rem; font-weight: 800; }

.mission-band { padding: 120px 0; background: var(--white); }
.mission-grid { display: grid; grid-template-columns: .9fr 1.1fr; gap: 90px; align-items: center; }
.mission-grid h2, .section-heading h2, .people-copy h2 {
  margin: 18px 0 0;
  font-size: clamp(2.75rem, 4.6vw, 4.8rem);
  font-weight: 620;
  line-height: 1.02;
  letter-spacing: -.05em;
}
.mission-copy p { max-width: 680px; margin: 30px 0; color: var(--ink-soft); font-size: var(--type-lead); line-height: 1.62; }
.mission-visual { position: relative; padding-bottom: 44px; }
.mission-visual > img { width: 100%; aspect-ratio: 16 / 11; object-fit: cover; border: 1px solid var(--line); }
.mission-note { position: absolute; right: 20px; bottom: 0; width: min(380px, calc(100% - 40px)); padding: 20px 22px; color: white; background: var(--blue); }
.mission-note strong { display: block; font-size: 1.1rem; }
.mission-note span { display: block; margin-top: 5px; color: rgba(255,255,255,.72); font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }

.focus-section { background: var(--paper); }
.section-heading { margin-bottom: 54px; }
.section-heading h2 { max-width: 850px; }
.split-heading { display: flex; align-items: end; justify-content: space-between; gap: 70px; }
.split-heading > p { max-width: 480px; margin: 0 0 7px; color: var(--ink-soft); font-size: var(--type-body-lg); line-height: 1.62; }
.split-heading.light { color: white; }
.focus-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line); }
.focus-card { min-height: 340px; padding: 32px 28px; background: transparent; border-right: 1px solid var(--line); transition: color .25s, background .25s; }
.focus-card:first-child { border-left: 1px solid var(--line); }
.focus-card:hover { color: white; background: var(--blue); }
.focus-card > span { color: var(--red); font-size: var(--type-caption); font-weight: 800; }
.focus-card:hover > span, .focus-card:hover p { color: rgba(255,255,255,.72); }
.focus-card h3 { margin: 78px 0 18px; font-size: clamp(1.7rem, 2.4vw, 2.35rem); font-weight: 620; line-height: 1.05; letter-spacing: -.035em; }
.focus-card p { color: var(--ink-soft); font-size: var(--type-body); line-height: 1.65; }

.impact-section { background: var(--white); border-block: 1px solid var(--line); }
.impact-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-block: 1px solid var(--line); }
.impact-grid > div { min-height: 180px; display: flex; flex-direction: column; justify-content: center; padding: 30px; border-right: 1px solid var(--line); }
.impact-grid > div:first-child { border-left: 1px solid var(--line); }
.impact-grid strong { color: var(--red); font-size: clamp(3.2rem, 5vw, 5rem); font-weight: 520; line-height: 1; letter-spacing: -.06em; }
.impact-grid span { margin-top: 13px; color: var(--muted); font-size: var(--type-caption); font-weight: 700; }

.featured-research { color: white; background: var(--ink); }
.project-showcase { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--line-dark); border: 1px solid var(--line-dark); }
.showcase-card { position: relative; min-height: 490px; display: block; overflow: hidden; color: white; background: #252525; }
.showcase-card img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.8); transition: transform .7s var(--ease), filter .4s; }
.showcase-card:hover img { filter: saturate(1); transform: scale(1.035); }
.showcase-overlay { position: absolute; inset: 0; background: linear-gradient(0deg, rgba(0,0,0,.9), transparent 72%); }
.showcase-copy { position: absolute; inset: auto 30px 28px; }
.showcase-copy span { color: #f1788c; font-size: var(--type-caption); font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.showcase-copy h3 { max-width: 600px; margin: 12px 54px 0 0; font-size: clamp(1.65rem, 2.6vw, 2.45rem); font-weight: 580; line-height: 1.12; letter-spacing: -.035em; }
.showcase-copy i { position: absolute; right: 0; bottom: 0; font-size: 1.4rem; font-style: normal; }

.people-feature { background: var(--paper-deep); }
.people-feature-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 90px; align-items: center; }
.people-collage { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.portrait { position: relative; overflow: hidden; aspect-ratio: 4 / 5; background: #d8d5ce; }
.portrait img { width: 100%; height: 100%; object-fit: cover; object-position: center top; filter: saturate(.85); transition: filter .3s, transform .55s var(--ease); }
.portrait:hover img { filter: saturate(1); transform: scale(1.025); }
.portrait span { position: absolute; inset: auto 12px 12px; padding: 8px 10px; color: white; background: rgba(23,23,23,.88); font-size: var(--type-caption); }
.people-copy > p { margin: 28px 0 34px; color: var(--ink-soft); font-size: var(--type-body-lg); line-height: 1.65; }

.news-section { background: var(--white); }
.news-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line); }
.news-card { padding: 24px; color: var(--ink); border-right: 1px solid var(--line); text-decoration: none; transition: color .25s, background .25s; }
.news-card:first-child { border-left: 1px solid var(--line); }
.news-card:hover { color: white; background: var(--blue); }
.news-image { height: 250px; overflow: hidden; margin-bottom: 22px; background: var(--paper-deep); }
.news-image img { width: 100%; height: 100%; object-fit: cover; transition: transform .55s var(--ease); }
.news-card:hover img { transform: scale(1.03); }
.news-card > span { color: var(--red); font-size: var(--type-caption); font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.news-card:hover > span, .news-card:hover p { color: rgba(255,255,255,.72); }
.news-card h3 { margin: 10px 0; font-size: 1.65rem; font-weight: 620; line-height: 1.15; letter-spacing: -.025em; }
.news-card p { margin: 0; color: var(--ink-soft); font-size: 1rem; line-height: 1.6; }
.join-cta { padding: 98px 0; color: white; background: var(--red); }
.join-grid { display: grid; grid-template-columns: 1fr .75fr; gap: 100px; align-items: end; }
.join-grid h2 { max-width: 680px; margin: 18px 0 0; font-size: clamp(3rem, 5vw, 5.2rem); font-weight: 620; line-height: .98; letter-spacing: -.055em; }
.join-grid p { margin: 0 0 28px; color: rgba(255,255,255,.8); font-size: var(--type-body-lg); }

/* Motion: restrained and content-safe */
.motion-ready .hero-kicker,
.motion-ready .home-hero h1,
.motion-ready .home-hero .hero-content > p,
.motion-ready .home-hero .hero-actions,
.motion-ready .hero-proof,
.motion-ready .hero-media { opacity: 0; transform: translateY(26px); }
.motion-ready.site-loaded .hero-kicker,
.motion-ready.site-loaded .home-hero h1,
.motion-ready.site-loaded .home-hero .hero-content > p,
.motion-ready.site-loaded .home-hero .hero-actions,
.motion-ready.site-loaded .hero-proof,
.motion-ready.site-loaded .hero-media { opacity: 1; transform: translateY(0); transition: opacity .7s var(--ease), transform .8s var(--ease); }
.motion-ready.site-loaded .home-hero h1 { transition-delay: .08s; }
.motion-ready.site-loaded .home-hero .hero-content > p { transition-delay: .16s; }
.motion-ready.site-loaded .home-hero .hero-actions { transition-delay: .22s; }
.motion-ready.site-loaded .hero-proof { transition-delay: .28s; }
.motion-ready.site-loaded .hero-media { transition-delay: .12s; }
.motion-ready [data-reveal] { opacity: 0; transform: translateY(30px); transition: opacity .65s var(--ease), transform .75s var(--ease); transition-delay: var(--reveal-delay, 0ms); }
.motion-ready [data-reveal="left"] { transform: translateX(-30px); }
.motion-ready [data-reveal="right"] { transform: translateX(30px); }
.motion-ready [data-reveal].is-visible { opacity: 1; transform: translate3d(0,0,0); }
.motion-ready.motion-reduced [data-reveal],
.motion-ready.motion-reduced .hero-kicker,
.motion-ready.motion-reduced .home-hero h1,
.motion-ready.motion-reduced .home-hero .hero-content > p,
.motion-ready.motion-reduced .home-hero .hero-actions,
.motion-ready.motion-reduced .hero-proof,
.motion-ready.motion-reduced .hero-media { opacity: 1; transform: none; transition: none; }

/* Shared inner pages */
.page-intro { padding: 178px 0 100px; color: white; background: var(--ink); }
.intro-grid { display: grid; grid-template-columns: .45fr 1.55fr; column-gap: 64px; align-items: start; }
.intro-grid h1 { max-width: 980px; margin: 0; font-size: clamp(3.6rem, 7vw, 7.4rem); font-weight: 620; line-height: .94; letter-spacing: -.065em; }
.intro-grid p { grid-column: 2; max-width: 760px; margin: 34px 0 0; color: rgba(255,255,255,.68); font-size: var(--type-lead); line-height: 1.62; }
.research-index, .people-index, .publication-list, .opportunity-index, .news-archive { background: var(--paper); }
.filter-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 48px; }
.filter-row button { min-height: 46px; padding: 0 17px; color: var(--ink-soft); background: transparent; border: 1px solid var(--line); border-radius: 2px; font-size: var(--type-label); font-weight: 700; cursor: pointer; }
.filter-row button:hover, .filter-row button.active { color: white; background: var(--ink); border-color: var(--ink); }
.research-grid { display: grid; grid-template-columns: repeat(2, 1fr); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }
.research-card { min-width: 0; display: grid; grid-template-columns: .82fr 1.18fr; color: var(--ink); border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); text-decoration: none; transition: color .25s, background .25s; }
.research-card:hover { color: white; background: var(--blue); }
.research-card-image { position: relative; min-height: 310px; overflow: hidden; background: var(--paper-deep); }
.research-card-image img { width: 100%; height: 100%; object-fit: cover; transition: transform .55s var(--ease); }
.research-card:hover img { transform: scale(1.03); }
.research-card-image > span { position: absolute; top: 13px; left: 13px; padding: 6px 9px; color: white; background: var(--red); font-size: .75rem; font-weight: 800; }
.research-card-copy { display: flex; flex-direction: column; align-items: flex-start; padding: 28px; }
.research-card-copy > span { color: var(--red); font-size: var(--type-caption); font-weight: 800; letter-spacing: .09em; text-transform: uppercase; }
.research-card:hover .research-card-copy > span, .research-card:hover p { color: rgba(255,255,255,.7); }
.research-card-copy h2 { margin: 12px 0; font-size: 1.55rem; font-weight: 620; line-height: 1.14; letter-spacing: -.025em; }
.research-card-copy p { margin: 0; color: var(--ink-soft); font-size: .98rem; line-height: 1.55; }
.research-card-copy strong { display: inline-flex; gap: 10px; margin-top: auto; padding-top: 24px; font-size: var(--type-caption); }
.research-card-copy strong i { color: var(--red); font-style: normal; }

.project-hero { position: relative; min-height: 700px; display: flex; align-items: end; padding: 150px 0 82px; overflow: hidden; color: white; background: var(--ink); }
.project-hero-image, .project-hero-wash { position: absolute; inset: 0; }
.project-hero-image img { width: 100%; height: 100%; object-fit: cover; }
.project-hero-wash { background: linear-gradient(90deg, rgba(0,0,0,.9), rgba(0,0,0,.3)); }
.project-hero-content { position: relative; z-index: 1; }
.project-hero-content > a { display: inline-block; margin-bottom: 56px; color: white; font-size: var(--type-label); font-weight: 700; text-decoration: none; }
.project-hero h1 { max-width: 1040px; margin: 18px 0 0; font-size: clamp(3.3rem, 6vw, 6.8rem); font-weight: 620; line-height: .96; letter-spacing: -.06em; }
.project-body { background: var(--white); }
.article-grid { display: grid; grid-template-columns: minmax(210px, .34fr) minmax(0, 1fr); gap: 90px; align-items: start; }
.article-grid aside { position: sticky; top: 110px; }
.article-grid aside > span { color: var(--red); font-size: var(--type-caption); font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.article-grid aside h2 { margin: 14px 0; font-size: 2.4rem; line-height: 1.05; letter-spacing: -.04em; }
.article-grid aside p { color: var(--ink-soft); font-size: 1rem; line-height: 1.7; }
.archive-content { min-width: 0; color: var(--ink-soft); font-size: var(--type-body); line-height: 1.72; }
.archive-content h1, .archive-content h2, .archive-content h3, .archive-content h4 { color: var(--ink); font-weight: 620; line-height: 1.1; letter-spacing: -.035em; }
.archive-content h2 { margin: 58px 0 20px; font-size: clamp(2.2rem, 4vw, 3.8rem); }
.archive-content h3 { margin: 42px 0 16px; font-size: 1.65rem; }
.archive-content p { margin: 0 0 20px; }
.archive-content a { color: var(--red-dark); font-weight: 650; text-underline-offset: 3px; overflow-wrap: anywhere; }
.archive-content img { width: auto; max-width: 100%; height: auto; margin: 32px auto; }
.archive-content video { max-width: 100%; height: auto; }
.archive-content li { margin-bottom: 9px; }
.archive-content table { display: block; max-width: 100%; overflow-x: auto; border-collapse: collapse; }
.archive-content td, .archive-content th { padding: 12px; border: 1px solid var(--line); vertical-align: top; }
.archive-content blockquote { margin: 36px 0; padding: 24px 28px; background: var(--paper); border-left: 4px solid var(--red); }
.archive-content.compact { font-size: 1rem; }

.member-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
.member-card-modern { min-width: 0; overflow: hidden; background: var(--white); }
.member-card-modern.principal { grid-column: span 2; display: grid; grid-template-columns: 1fr 1fr; }
.member-image { height: 390px; overflow: hidden; background: var(--paper-deep); }
.principal .member-image { height: 540px; }
.member-image img { width: 100%; height: 100%; object-fit: cover; object-position: center top; filter: saturate(.88); transition: filter .3s, transform .55s var(--ease); }
.member-card-modern:hover img { filter: saturate(1); transform: scale(1.025); }
.member-info-modern { padding: 24px; }
.principal .member-info-modern { align-self: end; padding: 34px; }
.member-info-modern > span { color: var(--red); font-size: var(--type-caption); font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.member-info-modern h2 { margin: 8px 0 12px; font-size: 1.8rem; font-weight: 620; line-height: 1.1; }
.principal .member-info-modern h2 { font-size: 2.8rem; }
.member-info-modern p { display: -webkit-box; overflow: hidden; margin: 0 0 16px; color: var(--ink-soft); font-size: 1rem; line-height: 1.62; -webkit-line-clamp: 5; -webkit-box-orient: vertical; }
.member-info-modern a { font-size: var(--type-label); font-weight: 700; overflow-wrap: anywhere; text-underline-offset: 3px; }
.alumni-band { background: var(--white); }

.publication-categories { padding: 0; color: white; background: var(--red); }
.category-strip { display: grid; grid-template-columns: repeat(4, 1fr); }
.category-strip a { min-height: 116px; display: flex; align-items: end; justify-content: space-between; gap: 20px; padding: 22px; color: white; border-left: 1px solid rgba(255,255,255,.28); font-size: var(--type-label); font-weight: 750; text-decoration: none; transition: color .2s, background .2s; }
.category-strip a:last-child { border-right: 1px solid rgba(255,255,255,.28); }
.category-strip a:hover { color: var(--ink); background: white; }
.category-strip i { font-style: normal; }
.publication-index { display: grid; gap: 44px; }
.publication-section-heading { display: grid; grid-template-columns: 1fr .8fr; gap: 70px; align-items: end; padding-bottom: 38px; border-bottom: 1px solid var(--line); }
.publication-section-heading span { color: var(--red); font-size: var(--type-caption); font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.publication-section-heading h2 { max-width: 720px; margin: 12px 0 0; font-size: clamp(3rem, 5vw, 5rem); font-weight: 620; line-height: .98; letter-spacing: -.055em; }
.publication-section-heading p { max-width: 600px; margin: 0; color: var(--ink-soft); font-size: var(--type-body-lg); }
.bibliography { font-size: 1rem; }
.bibliography p { padding-bottom: 18px; border-bottom: 1px solid var(--line); }
.publication-years { min-width: 0; }
.publication-year { border-bottom: 1px solid var(--line); }
.publication-year:first-child { border-top: 1px solid var(--line); }
.publication-year-toggle { width: 100%; min-height: 98px; display: grid; grid-template-columns: 1fr auto 44px; align-items: center; gap: 24px; padding: 8px 14px; background: transparent; border: 0; text-align: left; cursor: pointer; transition: color .2s, background .2s; }
.publication-year-toggle:hover, .publication-year.is-open .publication-year-toggle { color: white; background: var(--blue); }
.publication-year-toggle > span { font-size: 2.5rem; font-weight: 620; letter-spacing: -.045em; }
.publication-year-toggle small { color: var(--muted); font-size: var(--type-caption); font-weight: 750; letter-spacing: .08em; text-transform: uppercase; }
.publication-year-toggle:hover small, .publication-year.is-open small { color: rgba(255,255,255,.72); }
.publication-year-toggle i { position: relative; width: 36px; height: 36px; border: 1px solid currentColor; }
.publication-year-toggle i::before, .publication-year-toggle i::after { position: absolute; left: 10px; right: 10px; top: 17px; height: 2px; content: ""; background: currentColor; }
.publication-year-toggle i::after { transform: rotate(90deg); transition: transform .25s; }
.publication-year.is-open .publication-year-toggle i::after { transform: rotate(0); }
.publication-year-panel { padding: 24px 0 48px; }
.publication-year-panel .bibliography { padding: 28px; background: var(--white); border: 1px solid var(--line); }
.publication-year-panel .bibliography > *:last-child { margin-bottom: 0; border-bottom: 0; }

.internship-feature { padding: 108px 0; color: white; background: #101820; border-top: 1px solid rgba(255,255,255,.1); }
.internship-feature-grid { display: grid; grid-template-columns: 1.12fr .88fr; gap: 100px; align-items: end; }
.internship-feature-copy h2 { max-width: 760px; margin: 18px 0 26px; font-size: clamp(3.2rem, 5vw, 5.6rem); font-weight: 620; line-height: .96; letter-spacing: -.06em; }
.internship-feature-copy p { max-width: 720px; margin: 0 0 36px; color: rgba(255,255,255,.72); font-size: var(--type-body-lg); line-height: 1.65; }
.internship-feature-facts { display: grid; border-top: 1px solid rgba(255,255,255,.22); }
.internship-feature-facts > div { display: grid; grid-template-columns: .55fr 1fr; gap: 24px; align-items: baseline; padding: 26px 0; border-bottom: 1px solid rgba(255,255,255,.22); }
.internship-feature-facts strong { color: #f1788c; font-size: clamp(2.5rem, 4vw, 4.3rem); font-weight: 620; line-height: 1; letter-spacing: -.055em; }
.internship-feature-facts span { color: rgba(255,255,255,.72); font-size: var(--type-label); line-height: 1.4; }
.opportunity-heading { display: grid; grid-template-columns: .45fr 1.1fr .7fr; gap: 48px; align-items: end; margin-bottom: 56px; }
.opportunity-heading h2 { margin: 0; font-size: clamp(2.8rem, 4.5vw, 4.8rem); font-weight: 620; line-height: .98; letter-spacing: -.055em; }
.opportunity-heading p { margin: 0; color: var(--ink-soft); font-size: var(--type-body); line-height: 1.65; }
.opportunity-grid { display: grid; grid-template-columns: repeat(2, 1fr); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }
.opportunity-card { min-height: 330px; display: flex; flex-direction: column; align-items: flex-start; padding: 34px; color: var(--ink); border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); text-decoration: none; transition: color .25s, background .25s; }
.opportunity-card:hover { color: white; background: var(--blue); }
.opportunity-card > span { color: var(--red); font-size: var(--type-caption); font-weight: 800; }
.opportunity-card h2 { margin: 58px 0 14px; font-size: 2.25rem; font-weight: 620; line-height: 1.05; letter-spacing: -.04em; }
.opportunity-card p { max-width: 500px; margin: 0; color: var(--ink-soft); font-size: 1rem; line-height: 1.65; }
.opportunity-card:hover p { color: rgba(255,255,255,.7); }
.opportunity-card strong { display: inline-flex; gap: 10px; margin-top: auto; padding-top: 28px; font-size: var(--type-caption); letter-spacing: .06em; text-transform: uppercase; }
.opportunity-card strong i { color: var(--red); font-style: normal; }
.application-band { padding: 96px 0; color: white; background: var(--blue); }
.application-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 90px; align-items: end; }
.application-grid h2 { max-width: 650px; margin: 18px 0 0; font-size: clamp(3rem, 5vw, 5rem); font-weight: 620; line-height: .98; letter-spacing: -.055em; }
.application-grid p { color: rgba(255,255,255,.72); font-size: var(--type-body-lg); }

/* High school internship */
.internship-hero { padding: 168px 0 104px; color: white; background: #0b1117; }
.internship-hero-grid { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(280px, .65fr); gap: 92px; align-items: end; }
.internship-back { display: block; margin-bottom: 66px; color: rgba(255,255,255,.7); font-size: var(--type-label); font-weight: 700; text-decoration: none; }
.internship-back:hover { color: white; }
.internship-hero h1 { max-width: 1000px; margin: 22px 0 28px; font-size: clamp(4rem, 7vw, 7.4rem); font-weight: 620; line-height: .92; letter-spacing: -.065em; }
.internship-hero-grid > div > p { max-width: 790px; margin: 0; color: rgba(255,255,255,.68); font-size: var(--type-lead); line-height: 1.55; }
.internship-cycle { padding: 32px; background: var(--red); border-top: 6px solid white; }
.internship-cycle span, .internship-cycle strong { display: block; }
.internship-cycle span { margin-bottom: 42px; font-size: var(--type-caption); font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.internship-cycle strong { font-size: 2rem; line-height: 1.05; letter-spacing: -.035em; }
.internship-cycle p { margin: 18px 0 40px; color: rgba(255,255,255,.8); font-size: 1rem; line-height: 1.55; }
.internship-cycle a { color: white; font-size: var(--type-label); font-weight: 750; text-underline-offset: 4px; }
.internship-stats { color: white; background: var(--red); }
.internship-stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
.internship-stat-grid > div { min-height: 174px; display: flex; flex-direction: column; justify-content: space-between; padding: 27px 24px; border-left: 1px solid rgba(255,255,255,.28); }
.internship-stat-grid > div:last-child { border-right: 1px solid rgba(255,255,255,.28); }
.internship-stat-grid strong { font-size: clamp(2.6rem, 4vw, 4.5rem); font-weight: 620; line-height: 1; letter-spacing: -.06em; }
.internship-stat-grid span { max-width: 170px; color: rgba(255,255,255,.78); font-size: var(--type-caption); font-weight: 700; line-height: 1.35; text-transform: uppercase; }
.internship-paths, .program-experience { background: var(--paper); }
.internship-section-heading { display: grid; grid-template-columns: .5fr 1.15fr .75fr; gap: 54px; align-items: end; margin-bottom: 56px; }
.internship-section-heading h2 { margin: 0; font-size: clamp(3rem, 5vw, 5.4rem); font-weight: 620; line-height: .96; letter-spacing: -.06em; }
.internship-section-heading p { margin: 0; color: var(--ink-soft); font-size: var(--type-body); line-height: 1.65; }
.internship-section-heading.light h2 { color: white; }
.internship-section-heading.light p { color: rgba(255,255,255,.66); }
.research-path-grid { display: grid; grid-template-columns: 1fr 1fr; }
.research-path-card { min-height: 560px; padding: 46px; border: 1px solid var(--line); }
.research-path-card + .research-path-card { border-left: 0; }
.research-path-card > span { display: block; color: var(--red); font-size: var(--type-caption); font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.research-path-card h3 { max-width: 600px; margin: 90px 0 24px; font-size: clamp(2.7rem, 4vw, 4.5rem); font-weight: 620; line-height: .98; letter-spacing: -.055em; }
.research-path-card p { max-width: 620px; color: var(--ink-soft); font-size: var(--type-body); line-height: 1.65; }
.research-path-card ul { margin: 36px 0 0; padding: 26px 0 0; border-top: 1px solid var(--line); list-style: none; }
.research-path-card li { position: relative; padding: 10px 0 10px 24px; color: var(--ink-soft); font-size: 1rem; }
.research-path-card li::before { position: absolute; left: 0; content: "↳"; color: var(--red); }
.research-path-card.computational { color: white; background: #111a24; border-color: #111a24; }
.research-path-card.computational > span, .research-path-card.computational li::before { color: #f1788c; }
.research-path-card.computational p, .research-path-card.computational li { color: rgba(255,255,255,.7); }
.research-path-card.computational ul { border-color: rgba(255,255,255,.18); }
.computational-projects { padding: 112px 0; color: white; background: #0b1117; }
.computational-project-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid rgba(255,255,255,.2); border-left: 1px solid rgba(255,255,255,.2); }
.computational-project-grid a { min-height: 380px; display: flex; flex-direction: column; padding: 30px; color: white; border-right: 1px solid rgba(255,255,255,.2); border-bottom: 1px solid rgba(255,255,255,.2); text-decoration: none; transition: color .2s, background .2s; }
.computational-project-grid a:hover { color: var(--ink); background: white; }
.computational-project-grid a > span { color: #f1788c; font-size: var(--type-caption); font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.computational-project-grid a:hover > span { color: var(--red); }
.computational-project-grid h3 { margin: 72px 0 26px; font-size: 1.85rem; font-weight: 620; line-height: 1.12; letter-spacing: -.035em; }
.computational-project-grid strong { margin-top: auto; font-size: var(--type-caption); letter-spacing: .05em; text-transform: uppercase; }
.program-step-grid { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }
.program-step-grid article { min-height: 330px; padding: 27px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.program-step-grid span { color: var(--red); font-size: var(--type-caption); font-weight: 800; }
.program-step-grid h3 { margin: 72px 0 18px; font-size: 2rem; font-weight: 620; letter-spacing: -.04em; }
.program-step-grid p { margin: 0; color: var(--ink-soft); font-size: 1rem; line-height: 1.65; }
.internship-details { padding: 112px 0; color: white; background: #111a24; }
.internship-details-grid { display: grid; grid-template-columns: .85fr 1.15fr; gap: 100px; }
.internship-details h2 { max-width: 650px; margin: 18px 0 0; font-size: clamp(3.2rem, 5vw, 5.5rem); font-weight: 620; line-height: .97; letter-spacing: -.06em; }
.internship-detail-list { border-top: 1px solid rgba(255,255,255,.2); }
.internship-detail-list > div { display: grid; grid-template-columns: .34fr 1fr; gap: 28px; padding: 27px 0; border-bottom: 1px solid rgba(255,255,255,.2); }
.internship-detail-list strong { color: #f1788c; font-size: var(--type-label); }
.internship-detail-list p { margin: 0; color: rgba(255,255,255,.7); font-size: 1rem; line-height: 1.6; }
.internship-contact { background: var(--red-dark); }

.visual-archive { max-width: 1000px; margin: 0 auto; }
.visual-archive img { width: min(100%, 850px); max-height: 720px; margin-block: 46px 14px; object-fit: cover; }
.visual-archive p, .visual-archive h2, .visual-archive h3 { max-width: 850px; margin-inline: auto; }
.contact-page { min-height: 860px; display: grid; grid-template-columns: 1.05fr .95fr; padding-top: 74px; background: var(--white); }
.contact-image { min-height: 760px; overflow: hidden; }
.contact-image img { width: 100%; height: 100%; object-fit: cover; }
.contact-panel { display: flex; flex-direction: column; justify-content: center; padding: 80px max(50px, calc((100vw - var(--shell)) / 2)); }
.contact-panel h1 { margin: 18px 0 24px; font-size: clamp(3.3rem, 5.5vw, 5.8rem); font-weight: 620; line-height: .96; letter-spacing: -.06em; }
.contact-panel > p { color: var(--ink-soft); line-height: 1.75; }
.contact-details { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 38px 0; padding: 28px 0; border-block: 1px solid var(--line); }
.contact-details span { display: block; margin-bottom: 10px; color: var(--red); font-size: var(--type-caption); font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.contact-details address, .contact-details a { color: var(--ink-soft); font-size: 1rem; font-style: normal; line-height: 1.65; }
.contact-actions { display: flex; align-items: center; gap: 24px; }

.archive-hero { padding: 174px 0 92px; color: white; background: var(--ink); }
.archive-hero a { color: #f1788c; font-size: var(--type-caption); font-weight: 800; letter-spacing: .08em; text-decoration: none; text-transform: uppercase; }
.archive-hero h1 { max-width: 1060px; margin: 28px 0 18px; font-size: clamp(3.2rem, 6vw, 6.8rem); font-weight: 620; line-height: .96; letter-spacing: -.06em; }
.archive-hero p { color: rgba(255,255,255,.68); }

/* Footer */
.site-footer { color: white; background: var(--ink); }
.footer-main { display: grid; grid-template-columns: 1fr .65fr; gap: 100px; padding-block: 90px; }
.footer-statement h2 { max-width: 700px; margin: 18px 0 0; font-size: clamp(2.5rem, 4vw, 4.2rem); font-weight: 590; line-height: 1.03; letter-spacing: -.045em; }
.footer-links { display: grid; grid-template-columns: 1fr 1fr; gap: 42px; }
.footer-links div { display: flex; flex-direction: column; align-items: flex-start; gap: 13px; }
.footer-links strong { margin-bottom: 8px; color: #f1788c; font-size: var(--type-caption); letter-spacing: .1em; text-transform: uppercase; }
.footer-links a { color: rgba(255,255,255,.7); font-size: var(--type-label); text-decoration: none; }
.footer-links a:hover { color: white; text-decoration: underline; text-underline-offset: 4px; }
.footer-bottom { display: flex; justify-content: space-between; gap: 20px; padding-block: 24px; color: rgba(255,255,255,.5); border-top: 1px solid var(--line-dark); font-size: .78rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }

/* Institutional editorial direction */
.scroll-progress { display: none; }
.site-header {
  color: var(--ink);
  background: rgba(255,255,255,.98);
  backdrop-filter: none;
}
.brand-mark { width: 36px; height: 36px; }
.brand-mark i { display: none; }
.site-header nav a { font-weight: 600; }
.site-header nav .nav-contact { background: var(--blue); border-color: var(--blue); }

.home-hero { padding: 126px 0 72px; background: white; }
.hero-layout { min-height: 530px; grid-template-columns: minmax(0, .9fr) minmax(440px, 1.1fr); gap: 68px; }
.hero-content { max-width: 590px; }
.hero-kicker { margin-bottom: 22px; font-size: .8rem; letter-spacing: .08em; }
.home-hero h1 {
  font-family: var(--serif);
  font-size: clamp(4.3rem, 6.2vw, 6.8rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -.045em;
}
.home-hero .hero-content > p { margin: 24px 0 30px; font-size: 1.05rem; line-height: 1.65; }
.home-hero .hero-content > p strong {
  display: block;
  margin-bottom: 13px;
  color: var(--ink);
  font-family: var(--serif);
  font-size: 1.55rem;
  font-weight: 400;
  line-height: 1.35;
}
.hero-media { height: 530px; }
.hero-media::after { background: linear-gradient(to top, rgba(0,0,0,.18), transparent 28%); }
.hero-media figcaption { font-size: .75rem; font-weight: 600; }

.expertise-strip { background: var(--blue); }
.expertise-item { min-height: 76px; padding: 14px 18px; font-size: .9rem; font-weight: 600; }
.mission-band { padding: 92px 0; }
.mission-grid { gap: 72px; }
.mission-grid h2, .section-heading h2, .people-copy h2 {
  font-family: var(--serif);
  font-size: clamp(2.5rem, 3.7vw, 3.9rem);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -.035em;
}
.mission-copy p { margin: 24px 0; font-size: 1.15rem; }
.mission-note { background: var(--blue); }
.focus-card { min-height: 270px; padding: 28px; }
.focus-card:hover { color: var(--ink); background: white; }
.focus-card:hover > span { color: var(--red); }
.focus-card:hover p { color: var(--ink-soft); }
.focus-card h3 { margin: 38px 0 15px; font-family: var(--serif); font-size: 2rem; font-weight: 400; line-height: 1.16; }
.focus-card p { margin-bottom: 0; font-size: 1rem; }

.featured-research { color: var(--ink); background: var(--paper); }
.split-heading.light { color: var(--ink); }
.split-heading.light .eyebrow, .eyebrow.light { color: var(--red); }
.text-link.light { color: var(--ink); }
.project-showcase { grid-template-columns: repeat(2, 1fr); gap: 18px; background: transparent; border: 0; }
.showcase-card {
  min-height: 240px;
  display: grid;
  grid-template-columns: .42fr .58fr;
  color: var(--ink);
  background: white;
  border: 1px solid var(--line);
}
.showcase-card img { min-height: 240px; filter: none; transition: none; }
.showcase-card:hover img { filter: none; transform: none; }
.showcase-overlay { display: none; }
.showcase-copy { position: relative; inset: auto; display: flex; flex-direction: column; justify-content: center; padding: 24px; }
.showcase-copy span { color: var(--red); font-size: .75rem; letter-spacing: .07em; }
.showcase-copy h3 { margin: 12px 0 0; font-family: var(--serif); font-size: 1.45rem; font-weight: 400; line-height: 1.22; letter-spacing: -.02em; }
.showcase-copy i { display: none; }

.people-feature { background: white; }
.people-feature-grid { gap: 72px; }
.people-collage { gap: 1px; background: var(--line); border: 1px solid var(--line); }
.portrait img, .member-image img { filter: none; transition: none; }
.portrait:hover img, .member-card-modern:hover img { filter: none; transform: none; }
.people-copy > p { font-size: 1.1rem; }
.news-card { padding: 20px; transition: border-color .2s; }
.news-card:hover { color: var(--ink); background: white; box-shadow: inset 0 -3px var(--red); }
.news-card:hover > span { color: var(--red); }
.news-card:hover p { color: var(--ink-soft); }
.news-card:hover img { transform: none; }
.news-card h3 { font-family: var(--serif); font-size: 1.5rem; font-weight: 400; }
.join-cta { padding: 78px 0; background: var(--blue); }
.join-grid h2 { font-family: var(--serif); font-size: clamp(2.5rem, 4vw, 4rem); font-weight: 400; line-height: 1.05; letter-spacing: -.035em; }

.page-intro { padding: 142px 0 70px; color: var(--ink); background: white; border-bottom: 1px solid var(--line); }
.intro-grid { grid-template-columns: .34fr 1.66fr; column-gap: 52px; }
.intro-grid .eyebrow.light { color: var(--red); }
.intro-grid h1 {
  max-width: 920px;
  font-family: var(--serif);
  font-size: clamp(3.5rem, 5.5vw, 5.8rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -.045em;
}
.intro-grid p { margin-top: 24px; color: var(--ink-soft); font-size: 1.2rem; line-height: 1.55; }

.research-card { background: white; transition: border-color .2s; }
.research-card:hover { color: var(--ink); background: white; box-shadow: inset 0 -3px var(--red); }
.research-card:hover .research-card-copy > span { color: var(--red); }
.research-card:hover p { color: var(--ink-soft); }
.research-card:hover img { transform: none; }
.research-card-copy h2, .member-info-modern h2, .publication-section-heading h2,
.opportunity-card h2, .application-grid h2, .archive-hero h1 {
  font-family: var(--serif);
  font-weight: 400;
}
.member-card-modern { background: white; }
.publication-categories { background: var(--blue); }
.category-strip a { min-height: 86px; }
.publication-section-heading h2 { font-size: clamp(2.8rem, 4vw, 4rem); letter-spacing: -.035em; }
.publication-year-toggle > span { font-family: var(--serif); font-weight: 400; }
.publication-year-toggle:hover, .publication-year.is-open .publication-year-toggle { color: var(--ink); background: white; box-shadow: inset 3px 0 var(--red); }
.publication-year-toggle:hover small, .publication-year.is-open small { color: var(--muted); }

.internship-feature { padding: 86px 0; background: var(--blue); }
.internship-feature-grid { gap: 72px; }
.internship-feature-copy h2 { font-family: var(--serif); font-size: clamp(2.8rem, 4vw, 4.2rem); font-weight: 400; line-height: 1.05; letter-spacing: -.035em; }
.internship-feature-facts strong { font-family: var(--serif); font-size: clamp(2.4rem, 3vw, 3.4rem); font-weight: 400; }
.opportunity-heading h2 { font-family: var(--serif); font-size: clamp(2.7rem, 3.8vw, 3.8rem); font-weight: 400; line-height: 1.05; letter-spacing: -.035em; }
.opportunity-card { min-height: 270px; background: white; }
.opportunity-card:hover { color: var(--ink); background: white; box-shadow: inset 0 -3px var(--red); }
.opportunity-card:hover p { color: var(--ink-soft); }
.opportunity-card h2 { margin-top: 38px; font-size: 2rem; letter-spacing: -.025em; }
.application-band { padding: 78px 0; background: var(--blue); }
.application-grid h2 { font-size: clamp(2.7rem, 4vw, 4rem); letter-spacing: -.035em; }

.internship-hero { padding: 142px 0 82px; background: var(--blue); }
.internship-hero h1 { font-family: var(--serif); font-size: clamp(3.7rem, 5.8vw, 6rem); font-weight: 400; line-height: 1; letter-spacing: -.045em; }
.internship-cycle { background: #af1630; border-top-width: 3px; }
.internship-stat-grid > div { min-height: 138px; }
.internship-stat-grid strong { font-family: var(--serif); font-size: clamp(2.4rem, 3vw, 3.6rem); font-weight: 400; }
.internship-section-heading h2, .research-path-card h3, .internship-details h2 {
  font-family: var(--serif);
  font-weight: 400;
  letter-spacing: -.035em;
}
.internship-section-heading h2 { font-size: clamp(2.8rem, 4vw, 4.2rem); }
.research-path-card { min-height: 460px; padding: 38px; }
.research-path-card h3 { margin-top: 56px; font-size: clamp(2.4rem, 3vw, 3.2rem); }
.research-path-card.computational { background: var(--blue); border-color: var(--blue); }
.computational-projects { padding: 88px 0; background: var(--blue); }
.computational-project-grid a { min-height: 320px; }
.computational-project-grid h3, .program-step-grid h3 { font-family: var(--serif); font-weight: 400; }
.internship-details { padding: 88px 0; background: var(--blue); }
.internship-details h2 { font-size: clamp(2.8rem, 4vw, 4rem); }

.news-archive { background: white; }
.news-page-intro .intro-grid {
  grid-template-columns: minmax(0, 1.15fr) minmax(360px, .85fr);
  align-items: end;
}
.news-page-intro .intro-grid .eyebrow { grid-column: 1 / -1; margin-bottom: 18px; }
.news-page-intro .intro-grid h1 { grid-column: 1; }
.news-page-intro .intro-grid p { grid-column: 2; margin: 0 0 8px; }
.visual-archive { max-width: 1040px; margin: 0; }
.visual-archive img { width: min(100%, 860px); max-height: 620px; margin: 34px 0 12px; border: 1px solid var(--line); }
.visual-archive p, .visual-archive h2, .visual-archive h3 { max-width: 860px; margin-inline: 0; }
.news-archive .visual-archive > h4:first-child {
  margin: 0 0 10px;
  color: var(--red);
  font-size: .78rem;
  font-weight: 750;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.news-archive .visual-archive > h4:nth-child(2) {
  max-width: 860px;
  margin: 0 0 34px;
  padding-bottom: 22px;
  font-family: var(--serif);
  font-size: clamp(2.6rem, 4vw, 3.8rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -.035em;
  border-bottom: 1px solid var(--line);
}
.archive-hero { background: var(--blue); }

.past-interns-preview { padding: 88px 0; background: white; border-top: 1px solid var(--line); }
.past-interns-heading { display: grid; grid-template-columns: 1fr .7fr; gap: 70px; align-items: end; margin-bottom: 44px; }
.past-interns-heading h2 { margin: 12px 0 0; font-family: var(--serif); font-size: clamp(2.8rem, 4vw, 4rem); font-weight: 400; line-height: 1.05; letter-spacing: -.035em; }
.past-interns-heading p { max-width: 560px; margin: 0; color: var(--ink-soft); line-height: 1.65; }
.past-intern-grid { display: grid; grid-template-columns: repeat(2, 1fr); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }
.past-intern-grid article { min-width: 0; display: grid; grid-template-columns: 170px 1fr; background: white; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.past-intern-grid img { width: 170px; height: 100%; min-height: 260px; object-fit: cover; object-position: center top; background: var(--paper-deep); }
.past-intern-grid article > div { min-width: 0; padding: 24px; }
.past-intern-grid span { color: var(--red); font-size: .75rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; }
.past-intern-grid h3 { margin: 10px 0 4px; font-family: var(--serif); font-size: 1.55rem; font-weight: 400; line-height: 1.15; }
.past-intern-grid small { display: block; color: var(--muted); font-size: .8rem; line-height: 1.4; }
.past-intern-grid p { display: -webkit-box; overflow: hidden; margin: 18px 0 0; color: var(--ink-soft); font-size: .92rem; line-height: 1.55; -webkit-box-orient: vertical; -webkit-line-clamp: 4; }
.past-intern-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 26px; margin-top: 34px; }

.cohort-hero { padding: 142px 0 76px; color: white; background: var(--blue); }
.cohort-hero a { display: block; margin-bottom: 46px; color: rgba(255,255,255,.72); font-size: var(--type-label); font-weight: 650; text-decoration: none; }
.cohort-hero .eyebrow.light { color: #f1788c; }
.cohort-hero h1 { margin: 16px 0 18px; font-family: var(--serif); font-size: clamp(3.8rem, 5.5vw, 5.8rem); font-weight: 400; line-height: 1; letter-spacing: -.045em; }
.cohort-hero p { max-width: 720px; margin: 0; color: rgba(255,255,255,.7); font-size: 1.2rem; }
.cohort-directory { padding: 84px 0 100px; background: var(--paper); }
.cohort-year + .cohort-year { margin-top: 88px; }
.cohort-year > header { display: flex; align-items: baseline; justify-content: space-between; gap: 24px; margin-bottom: 26px; padding-bottom: 18px; border-bottom: 1px solid var(--line); }
.cohort-year > header h2 { margin: 0; font-family: var(--serif); font-size: 3.5rem; font-weight: 400; line-height: 1; letter-spacing: -.04em; }
.cohort-year > header span { color: var(--muted); font-size: .8rem; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; }
.cohort-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
.cohort-grid article { min-width: 0; display: grid; grid-template-columns: 170px 1fr; background: white; border: 1px solid var(--line); }
.cohort-grid img { width: 170px; height: 230px; object-fit: cover; object-position: center top; background: var(--paper-deep); }
.cohort-grid article > div { min-width: 0; padding: 22px; }
.cohort-grid h3 { margin: 0 0 6px; font-family: var(--serif); font-size: 1.4rem; font-weight: 400; line-height: 1.15; }
.cohort-grid article span { display: block; color: var(--muted); font-size: .78rem; line-height: 1.4; }
.cohort-grid p { display: -webkit-box; overflow: hidden; margin: 16px 0 0; color: var(--ink-soft); font-size: .88rem; line-height: 1.5; -webkit-box-orient: vertical; -webkit-line-clamp: 5; }

.research-resources, .news-post-archive, .opportunity-records { padding: 88px 0; color: white; background: var(--blue); }
.resource-heading, .news-post-archive > .shell > header, .opportunity-records > .shell > header {
  display: grid;
  grid-template-columns: 1fr .62fr;
  gap: 70px;
  align-items: end;
  margin-bottom: 40px;
}
.resource-heading h2, .news-post-archive h2, .opportunity-records h2 {
  margin: 12px 0 0;
  font-family: var(--serif);
  font-size: clamp(2.7rem, 4vw, 4rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -.035em;
}
.resource-heading p, .news-post-archive header p, .opportunity-records header p {
  margin: 0;
  color: rgba(255,255,255,.7);
  line-height: 1.65;
}
.resource-links, .opportunity-record-links { display: grid; grid-template-columns: repeat(2, 1fr); border-top: 1px solid rgba(255,255,255,.2); border-left: 1px solid rgba(255,255,255,.2); }
.resource-links a, .opportunity-record-links a {
  min-height: 164px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-content: center;
  gap: 8px 24px;
  padding: 26px;
  color: white;
  border-right: 1px solid rgba(255,255,255,.2);
  border-bottom: 1px solid rgba(255,255,255,.2);
  text-decoration: none;
}
.resource-links a:hover, .opportunity-record-links a:hover { color: var(--ink); background: white; }
.resource-links strong, .opportunity-record-links strong { font-family: var(--serif); font-size: 1.4rem; font-weight: 400; line-height: 1.2; }
.resource-links span, .opportunity-record-links span { max-width: 520px; color: rgba(255,255,255,.66); font-size: .9rem; line-height: 1.5; }
.resource-links a:hover span, .opportunity-record-links a:hover span { color: var(--ink-soft); }
.resource-links i, .opportunity-record-links i { grid-column: 2; grid-row: 1 / span 2; align-self: center; font-style: normal; }
.opportunity-records { background: #1f303c; }

.news-post-list { border-top: 1px solid rgba(255,255,255,.22); }
.news-post-list a { min-height: 96px; display: grid; grid-template-columns: 150px 1fr 24px; gap: 28px; align-items: center; padding: 18px 10px; color: white; border-bottom: 1px solid rgba(255,255,255,.22); text-decoration: none; }
.news-post-list a:hover { background: rgba(255,255,255,.06); }
.news-post-list time { color: #f1788c; font-size: .8rem; font-weight: 700; text-transform: uppercase; }
.news-post-list a > span { min-width: 0; }
.news-post-list strong { display: block; font-family: var(--serif); font-size: 1.35rem; font-weight: 400; line-height: 1.2; }
.news-post-list small { display: block; margin-top: 7px; overflow: hidden; color: rgba(255,255,255,.6); font-size: .85rem; line-height: 1.45; text-overflow: ellipsis; white-space: nowrap; }
.news-post-list i { font-style: normal; }

.directory-hero { padding: 142px 0 78px; color: white; background: var(--blue); }
.directory-hero h1 { margin: 16px 0 20px; font-family: var(--serif); font-size: clamp(3.8rem, 5.8vw, 6rem); font-weight: 400; line-height: 1; letter-spacing: -.045em; }
.directory-hero > .shell > p { max-width: 800px; margin: 0; color: rgba(255,255,255,.7); font-size: 1.2rem; line-height: 1.6; }
.directory-counts { display: flex; flex-wrap: wrap; gap: 42px; margin-top: 46px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,.22); }
.directory-counts span { color: rgba(255,255,255,.64); font-size: .85rem; }
.directory-counts strong { margin-right: 7px; color: white; font-family: var(--serif); font-size: 1.7rem; font-weight: 400; }
.directory-primary { background: white; border-bottom: 1px solid var(--line); }
.directory-primary > .shell { display: grid; grid-template-columns: repeat(3, 1fr); border-left: 1px solid var(--line); }
.directory-primary a { min-height: 106px; display: flex; flex-direction: column; justify-content: center; padding: 20px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); text-decoration: none; }
.directory-primary a:hover { box-shadow: inset 0 -3px var(--red); }
.directory-primary strong { font-family: var(--serif); font-size: 1.25rem; font-weight: 400; }
.directory-primary span { margin-top: 4px; color: var(--muted); font-size: .8rem; }
.directory-groups { padding: 86px 0 110px; background: var(--paper); }
.directory-group + .directory-group { margin-top: 80px; }
.directory-group > header { display: grid; grid-template-columns: .8fr 1fr; gap: 64px; align-items: end; margin-bottom: 28px; }
.directory-group h2 { margin: 0; font-family: var(--serif); font-size: clamp(2.4rem, 3.4vw, 3.4rem); font-weight: 400; line-height: 1.05; letter-spacing: -.03em; }
.directory-group header p { max-width: 620px; margin: 0; color: var(--ink-soft); line-height: 1.6; }
.directory-links { border-top: 1px solid var(--line); }
.directory-links a { min-height: 82px; display: grid; grid-template-columns: minmax(220px, .7fr) 1fr 24px; gap: 28px; align-items: center; padding: 16px 12px; border-bottom: 1px solid var(--line); text-decoration: none; }
.directory-links a:hover { background: white; }
.directory-links span { font-family: var(--serif); font-size: 1.12rem; line-height: 1.25; }
.directory-links small { color: var(--muted); font-size: .82rem; line-height: 1.45; }
.directory-links i { color: var(--red); font-style: normal; }

@media (max-width: 1080px) {
  .hero-layout { grid-template-columns: 1fr .9fr; gap: 40px; }
  .hero-media { height: 600px; }
  .expertise-grid { grid-template-columns: repeat(3, 1fr); }
  .expertise-item:nth-child(3) { border-right: 1px solid var(--line-dark); }
  .expertise-item:nth-child(-n+3) { border-bottom: 1px solid var(--line-dark); }
  .intro-grid { grid-template-columns: 1fr 2fr; }
  .intro-grid p { grid-column: 2; }
  .research-grid { grid-template-columns: 1fr; }
  .member-grid { grid-template-columns: repeat(2, 1fr); }
  .category-strip { grid-template-columns: repeat(3, 1fr); }
  .internship-feature-grid, .internship-hero-grid, .internship-details-grid { gap: 56px; }
  .opportunity-heading, .internship-section-heading { grid-template-columns: .38fr 1fr; }
  .opportunity-heading p, .internship-section-heading p { grid-column: 2; }
  .program-step-grid { grid-template-columns: repeat(2, 1fr); }
  .past-intern-grid, .cohort-grid { grid-template-columns: 1fr; }
  .resource-links, .opportunity-record-links { grid-template-columns: 1fr; }
}

@media (max-width: 820px) {
  .shell { width: min(100% - 38px, var(--shell)); }
  .section-pad { padding: 82px 0; }
  .site-header { height: 68px; }
  .nav-shell { width: calc(100% - 30px); }
  .menu-toggle { display: block; }
  .site-header nav { position: absolute; left: 0; right: 0; top: 68px; display: none; flex-direction: column; align-items: stretch; padding: 12px 15px 18px; background: var(--paper); border-bottom: 1px solid var(--line); }
  .site-header nav.is-open { display: flex; }
  .site-header nav a { padding: 13px 5px; }
  .site-header nav .nav-contact { margin: 5px 0 0; text-align: center; }
  .home-hero { padding-top: 108px; }
  .hero-layout { min-height: auto; grid-template-columns: 1fr; gap: 46px; }
  .hero-content { max-width: none; }
  .home-hero h1 { font-size: clamp(3.6rem, 12vw, 6rem); }
  .hero-media { height: min(72vw, 620px); }
  .mission-grid, .people-feature-grid, .join-grid, .application-grid, .footer-main, .article-grid { grid-template-columns: 1fr; gap: 54px; }
  .split-heading { align-items: flex-start; flex-direction: column; gap: 24px; }
  .focus-grid { grid-template-columns: 1fr; border-left: 1px solid var(--line); }
  .focus-card { min-height: 260px; border-bottom: 1px solid var(--line); }
  .focus-card h3 { margin-top: 48px; }
  .impact-grid { grid-template-columns: 1fr; }
  .impact-grid > div { min-height: 140px; border-left: 1px solid var(--line); border-bottom: 1px solid var(--line); }
  .project-showcase { grid-template-columns: 1fr; }
  .showcase-card { min-height: 220px; }
  .showcase-card img { min-height: 220px; }
  .news-grid { grid-template-columns: 1fr; border-left: 1px solid var(--line); }
  .news-card { border-bottom: 1px solid var(--line); }
  .intro-grid { grid-template-columns: 1fr; }
  .intro-grid p { grid-column: auto; }
  .page-intro { padding: 144px 0 80px; }
  .article-grid aside { position: static; }
  .publication-section-heading { grid-template-columns: 1fr; gap: 24px; }
  .category-strip { grid-template-columns: repeat(2, 1fr); }
  .contact-page { grid-template-columns: 1fr; padding-top: 68px; }
  .contact-image { min-height: 430px; }
  .contact-panel { padding: 70px 25px; }
  .internship-feature-grid, .internship-hero-grid, .internship-details-grid { grid-template-columns: 1fr; }
  .internship-feature-facts { margin-top: 10px; }
  .internship-hero { padding: 130px 0 82px; }
  .internship-back { margin-bottom: 48px; }
  .internship-cycle { max-width: 480px; }
  .internship-stat-grid, .computational-project-grid { grid-template-columns: repeat(2, 1fr); }
  .research-path-grid { grid-template-columns: 1fr; }
  .research-path-card + .research-path-card { border-top: 0; border-left: 1px solid var(--line); }
  .internship-section-heading, .opportunity-heading { grid-template-columns: 1fr; gap: 22px; }
  .opportunity-heading p, .internship-section-heading p { grid-column: auto; }
  .internship-detail-list > div { grid-template-columns: .4fr 1fr; }
  .past-interns-heading { grid-template-columns: 1fr; gap: 22px; }
  .resource-heading, .news-post-archive > .shell > header, .opportunity-records > .shell > header,
  .directory-group > header { grid-template-columns: 1fr; gap: 20px; }
  .directory-primary > .shell { grid-template-columns: repeat(2, 1fr); }
  .directory-links a { grid-template-columns: 1fr 22px; gap: 6px 20px; }
  .directory-links small { grid-column: 1; }
  .directory-links i { grid-column: 2; grid-row: 1 / span 2; }
}

@media (max-width: 560px) {
  .brand-copy small { display: none; }
  .hero-actions { width: 100%; flex-direction: column; }
  .hero-actions .button { width: 100%; }
  .hero-proof { gap: 20px; }
  .hero-media { height: 115vw; max-height: 600px; }
  .expertise-grid { grid-template-columns: repeat(2, 1fr); }
  .expertise-item { min-height: 94px; border-bottom: 1px solid var(--line-dark); }
  .expertise-item:nth-child(3) { border-right: 0; }
  .mission-band { padding: 82px 0; }
  .mission-grid h2, .section-heading h2, .people-copy h2 { font-size: 2.75rem; }
  .showcase-card { min-height: 0; grid-template-columns: 1fr; }
  .showcase-card img { width: 100%; height: 220px; min-height: 0; }
  .showcase-copy { min-height: 180px; }
  .mission-note { right: 10px; width: calc(100% - 20px); }
  .research-card { grid-template-columns: 1fr; }
  .research-card-image { min-height: 280px; }
  .member-grid { grid-template-columns: 1fr; }
  .member-card-modern.principal { grid-column: auto; display: block; }
  .member-image, .principal .member-image { height: 440px; }
  .publication-year-toggle { grid-template-columns: 1fr 38px; gap: 12px; }
  .publication-year-toggle small { display: none; }
  .publication-year-panel .bibliography { padding: 20px 18px; }
  .opportunity-grid, .category-strip { grid-template-columns: 1fr; }
  .opportunity-card { min-height: 300px; padding: 28px; }
  .internship-feature, .computational-projects, .internship-details { padding: 82px 0; }
  .internship-feature-copy h2 { font-size: 3.1rem; }
  .internship-feature-facts > div { grid-template-columns: .65fr 1fr; }
  .internship-hero h1 { font-size: 3.7rem; }
  .internship-stat-grid, .computational-project-grid, .program-step-grid { grid-template-columns: 1fr; }
  .internship-stat-grid > div { min-height: 138px; border-right: 1px solid rgba(255,255,255,.28); border-bottom: 1px solid rgba(255,255,255,.28); }
  .internship-section-heading h2 { font-size: 3rem; }
  .research-path-card { min-height: auto; padding: 32px 26px 38px; }
  .research-path-card h3 { margin-top: 58px; font-size: 2.8rem; }
  .computational-project-grid a { min-height: 320px; }
  .program-step-grid article { min-height: 280px; }
  .internship-details h2 { font-size: 3rem; }
  .internship-detail-list > div { grid-template-columns: 1fr; gap: 10px; }
  .past-intern-grid article, .cohort-grid article { grid-template-columns: 118px 1fr; }
  .past-intern-grid img { width: 118px; min-height: 230px; }
  .cohort-grid img { width: 118px; height: 210px; }
  .past-intern-grid article > div, .cohort-grid article > div { padding: 18px; }
  .past-intern-actions { align-items: flex-start; flex-direction: column; }
  .directory-primary > .shell { grid-template-columns: 1fr; }
  .news-post-list a { grid-template-columns: 1fr 22px; gap: 8px 16px; }
  .news-post-list time { grid-column: 1; }
  .news-post-list a > span { grid-column: 1; }
  .news-post-list i { grid-column: 2; grid-row: 1 / span 2; }
  .directory-counts { align-items: flex-start; flex-direction: column; gap: 12px; }
  .contact-details { grid-template-columns: 1fr; }
  .contact-actions { align-items: flex-start; flex-direction: column; }
  .footer-main { padding-block: 70px; }
  .footer-links { gap: 24px; }
  .footer-bottom { align-items: flex-start; flex-direction: column; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; }
}

/* Institutional navigation and page wayfinding */
.site-header { height: 106px; }
.utility-bar {
  height: 32px;
  color: rgba(255,255,255,.82);
  background: var(--blue);
}
.utility-shell {
  width: min(var(--shell), calc(100% - 48px));
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-inline: auto;
  font-size: .72rem;
  font-weight: 650;
  letter-spacing: .055em;
}
.utility-shell > span { text-transform: uppercase; }
.utility-shell nav { display: flex; align-items: center; gap: 0; }
.utility-shell nav a {
  padding: 0 12px;
  color: rgba(255,255,255,.8);
  border: 0;
  border-left: 1px solid rgba(255,255,255,.2);
  font-size: .72rem;
  font-weight: 650;
  text-decoration: none;
}
.utility-shell nav a:last-child { padding-right: 0; }
.utility-shell nav a:hover { color: white; border-color: rgba(255,255,255,.2); }
.nav-shell { height: 74px; }

.home-hero { padding-top: 158px; }
.page-intro { padding-top: 174px; }
.internship-hero { padding-top: 174px; }
.cohort-hero, .directory-hero, .archive-hero { padding-top: 174px; }
.contact-page { padding-top: 106px; }

.section-nav {
  position: relative;
  z-index: 3;
  color: var(--ink);
  background: #f2f0eb;
  border-bottom: 1px solid var(--line);
}
.section-nav-inner {
  min-height: 64px;
  display: grid;
  grid-template-columns: 210px 1fr;
  align-items: stretch;
}
.section-nav-inner > strong {
  display: flex;
  align-items: center;
  padding-right: 28px;
  color: var(--red);
  border-right: 1px solid var(--line);
  font-size: .78rem;
  font-weight: 750;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.section-nav-inner > div { display: flex; align-items: stretch; }
.section-nav-inner a {
  display: flex;
  align-items: center;
  padding: 0 22px;
  color: var(--ink-soft);
  border-right: 1px solid var(--line);
  font-size: .9rem;
  font-weight: 650;
  text-decoration: none;
}
.section-nav-inner a:hover {
  color: var(--ink);
  background: white;
  box-shadow: inset 0 -3px var(--red);
}
[id] { scroll-margin-top: 116px; }

@media (max-width: 820px) {
  .site-header { height: 68px; }
  .utility-bar { display: none; }
  .nav-shell { height: 68px; }
  .home-hero { padding-top: 108px; }
  .page-intro { padding-top: 132px; }
  .internship-hero { padding-top: 130px; }
  .cohort-hero, .directory-hero, .archive-hero { padding-top: 130px; }
  .contact-page { padding-top: 68px; }
  .section-nav-inner {
    min-height: 0;
    grid-template-columns: 1fr;
    width: 100%;
  }
  .section-nav-inner > strong {
    min-height: 42px;
    padding: 0 19px;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }
  .section-nav-inner > div {
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scrollbar-width: none;
  }
  .section-nav-inner > div::-webkit-scrollbar { display: none; }
  .section-nav-inner a {
    min-height: 54px;
    flex: 0 0 auto;
    padding: 0 19px;
  }
  .news-page-intro .intro-grid { grid-template-columns: 1fr; }
  .news-page-intro .intro-grid .eyebrow,
  .news-page-intro .intro-grid h1,
  .news-page-intro .intro-grid p { grid-column: 1; }
  .news-page-intro .intro-grid p { margin-top: 24px; }
  [id] { scroll-margin-top: 76px; }
}
```
