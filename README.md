# Quackbit website

Marketing site and privacy policy for Quackbit, the private habit tracker for
iPhone, iPad, and Mac.

Built with [Astro](https://astro.build) and TypeScript (Vite under the hood).

The site is served by the org site at **https://quackbyte.dev/quackbit/**. It is
not its own GitHub Pages site: `QuackByte/quackbyte.github.io` checks this repo out,
builds it with `base: /quackbit`, and copies `dist/` into `public/quackbit/` before
deploying. This mirrors how `quacktop.github.io` is published.

## Develop

```sh
npm install
npm run dev       # http://localhost:4321/quackbit/
npm run check     # tsc --noEmit
npm run build     # static output in dist/
npm run preview
```

Because of the base path, use `http://localhost:4321/quackbit/`, not the bare root.

## Content

- `src/pages/index.astro` — landing page
- `src/pages/privacy.astro` — privacy policy (the App Store privacy URL)
- `src/pages/support.astro` — support and FAQ (the App Store support URL)
- `src/layouts/Layout.astro` — shared shell, nav, and footer
- `src/styles/global.css` — theme and layout
- `public/images/` — app screenshots
