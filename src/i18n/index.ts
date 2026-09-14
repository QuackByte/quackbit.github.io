import en from "./locales/en.json";
import es from "./locales/es.json";
import it from "./locales/it.json";
import de from "./locales/de.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
import ko from "./locales/ko.json";
import pt from "./locales/pt.json";
import zh from "./locales/zh-Hans.json";

export const languages = {
  en: "English",
  es: "Español",
  it: "Italiano",
  de: "Deutsch",
  fr: "Français",
  ja: "日本語",
  ko: "한국어",
  pt: "Português",
  "zh-Hans": "简体中文",
} as const;
export type Locale = keyof typeof languages;
export type Page = "" | "privacy" | "support";
export type Translation = typeof en;
export const translations: Record<Locale, Translation> = {
  en,
  es,
  it,
  de,
  fr,
  ja,
  ko,
  pt,
  "zh-Hans": zh,
};
export const locales = Object.keys(languages) as Locale[];
export const base = import.meta.env.BASE_URL.replace(/\/$/, "");
// Keep the existing English App Store and inbound URLs intact.
export function pageUrl(locale: Locale, page: Page = "") {
  return `${base}/${locale === "en" ? "" : `${locale}/`}${page ? `${page}/` : ""}`;
}
export function localizedPaths() {
  return locales
    .filter((locale) => locale !== "en")
    .map((lang) => ({ params: { lang }, props: { locale: lang } }));
}
