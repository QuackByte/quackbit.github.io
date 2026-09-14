import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const locales = ["en", "es", "it", "de", "fr", "ja", "ko", "pt", "zh-Hans"];
const read = (path) => readFileSync(path, "utf8");
const source = JSON.parse(read("src/i18n/locales/en.json"));
function checkShape(value, reference, path) {
  if (Array.isArray(reference)) {
    assert.ok(Array.isArray(value), `${path}: expected an array`);
    assert.equal(value.length, reference.length, `${path}: missing entries`);
    reference.forEach((entry, i) =>
      checkShape(value[i], entry, `${path}[${i}]`),
    );
  } else if (typeof reference === "object") {
    assert.deepEqual(
      Object.keys(value).sort(),
      Object.keys(reference).sort(),
      `${path}: missing keys`,
    );
    for (const key of Object.keys(reference))
      checkShape(value[key], reference[key], `${path}.${key}`);
  } else {
    assert.equal(typeof value, "string", path);
    assert.ok(value.trim().length, `${path}: empty translation`);
  }
}
let pages = 0;
for (const locale of locales) {
  const translation = JSON.parse(read(`src/i18n/locales/${locale}.json`));
  checkShape(translation, source, locale);
  for (const page of ["", "privacy", "support"]) {
    const suffix = `${locale === "en" ? "" : `${locale}/`}${page ? `${page}/` : ""}`;
    const html = read(`dist/${suffix}index.html`);
    assert.ok(
      html.includes(`<html lang="${locale}">`),
      `${suffix}: wrong document language`,
    );
    assert.equal(
      (html.match(/<h1(?:\s|>)/g) ?? []).length,
      1,
      `${suffix}: expected one heading`,
    );
    assert.equal(
      (html.match(/rel="alternate"/g) ?? []).length,
      10,
      `${suffix}: missing alternate links`,
    );
    assert.ok(
      html.includes(`https://quackbyte.dev/quackbit/${suffix}`),
      `${suffix}: missing canonical`,
    );
    assert.ok(!html.includes("undefined"), `${suffix}: undefined text`);
    for (const [, href] of html.matchAll(
      /(?:href|src)="(\/quackbit\/[^"#]*)(?:#[^"]*)?"/g,
    )) {
      const relative = href.replace("/quackbit/", "");
      const target = `dist/${relative}${relative === "" || relative.endsWith("/") ? "index.html" : ""}`;
      assert.ok(existsSync(target), `${suffix}: broken link ${href}`);
    }
    for (const language of locales) {
      const target = `/quackbit/${language === "en" ? "" : `${language}/`}${page ? `${page}/` : ""}`;
      assert.ok(
        html.includes(`href="${target}" lang="${language}"`),
        `${suffix}: language switch loses current page`,
      );
    }
    pages++;
  }
}
console.log(
  `Validated ${locales.length} complete translations and ${pages} pages, including language switches, metadata, and local links.`,
);
