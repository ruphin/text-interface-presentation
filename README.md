# The Text Interface

A slide deck built with [slidem](https://github.com/ruphin/slidem).

The slides are HTML in `index.html`. Styling lives in `src/deck.css`, and
`src/main.ts` registers the slidem elements and is the place for custom slide
types.

## Running

```sh
npm install
npm run dev      # serve the deck with hot reload
npm run build    # build a static site into dist/
npm run preview  # serve the built site
npm run check    # typecheck and format check
```

## Presenting

- `→` / `←`, `PageDown` / `PageUp`, `j` / `k`, or swipe to navigate.
- Link to a slide and step with `#slide-3/step-2`.
- Press `p` for presenter mode, which shows the next slide and the notes
  slotted into each slide with `slot="notes"`. Press `t` there to toggle the
  timer.
- Open the deck in a second window: every window follows the one that
  navigates.

## Writing slides

Each `<slidem-slide>` takes `in` and `out` transitions (`fade`, `slide`,
`zoom`), a `background` (a colour, a `--custom-property`, or an image URL,
optionally with `darken-background`), and `center`. Content elements take
`fit`, `uppercase`, `center`, `bold`, `italic`, `font-size`, `line-height` and
`color`. Add `reveal` to elements that should appear step by step.

The palette is defined in `src/deck.css` as `--ink`, `--paper`, `--accent` and
`--muted`.

## slidem

`slidem` is vendored in `vendor/slidem` and installed through a `file:`
dependency, until slidem 3 is published. See `vendor/slidem/VENDORED.md` for
the source commit and how to update it.
