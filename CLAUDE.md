# The Text Interface

A slide deck built with slidem. The content is the work here; the tooling is settled.

- `index.html` holds the slides as `<slidem-slide>` elements inside one `<slidem-deck>`. Give every slide a `name` and presenter notes in `<p slot="notes">`.
- `src/deck.css` defines the palette (`--ink`, `--paper`, `--accent`, `--muted`) and shared slide styles such as `pre.code`.
- `src/main.ts` registers the slidem elements and is where custom slide types go: extend `SlidemSlide` from `slidem` and override `renderContent()`.
- `slidem` is vendored in `vendor/slidem` (the built `dist/` of a slidem 3 pre-release) and installed with a `file:` dependency until slidem 3 is published. To update it, run `npm run build` in a slidem checkout and copy `dist/`, `package.json`, `CHANGELOG.md`, `LICENSE` and `README.md` over the vendored copy, then note the source commit in `vendor/slidem/VENDORED.md`.
- `npm run dev` serves the deck, `npm run check` runs the typecheck and Prettier. Format with `npm run format` before finishing.
- To check a slide visually without a browser window, use headless Chromium:
  `chromium --headless=new --screenshot=out.png --window-size=1920,1080 --virtual-time-budget=6000 "http://localhost:5000/#slide-3/step-2"`
