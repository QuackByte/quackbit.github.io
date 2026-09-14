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

## Languages

The landing page, support page, and privacy policy are available in English,
Spanish, Italian, German, French, Japanese, Korean, Portuguese, and Simplified
Chinese. English keeps the original URLs; other languages use `/es/`, `/it/`,
`/de/`, `/fr/`, `/ja/`, `/ko/`, `/pt/`, and `/zh-Hans/` beneath `/quackbit/`.
The language menu preserves the current page and, with JavaScript, its anchor.
It works without JavaScript as well. No automatic language redirects are used.

- `src/i18n/locales/*.json` — all translated text, including metadata and previews
- `src/i18n/index.ts` — locale registry and base-aware URL helpers
- `src/components/Home.astro` — shared landing page
- `src/components/Document.astro` — shared privacy and support pages
- `src/components/PhonePreview.astro` — localized illustrative app preview
- `src/pages/[lang]/` — generated localized routes

The phone and garden are illustrative previews, with translated labels, rather
than English-only screenshots. The original screenshots remain in `public/images/`.

Run `npm run test:i18n` to build and verify translation completeness, all 27
pages, language metadata, language switches, and internal links. Run
`npm run check` for TypeScript checks.
