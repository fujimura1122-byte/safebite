import { MetadataRoute } from "next";
import { terms } from "./glossary/terms";

const BASE_URL = "https://saferbite.org";

// Cat.1 の高意図ページは priority 0.9、その他の用語ページは 0.8
const HIGH_INTENT_SLUGS = new Set([
  "yamibaitomiwakekata",
  "yamibaitokotowarikata",
  "yamibaitoouboshita",
  "yamibaitosoudan",
  "yamibaitotaiho",
  "sokujitsubarai",
  "mibunshosoufu",
  "gachianken",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const glossaryPages = terms.map((term) => ({
    url: `${BASE_URL}/glossary/${term.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: HIGH_INTENT_SLUGS.has(term.slug) ? 0.9 : 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/glossary`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,   // 100語になったので weekly に
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    // ── ガイドページ ────────────────────────────────────────────
    {
      url: `${BASE_URL}/guide/kotowarikata`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guide/higai-soudan`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guide/hogosha`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guide/taiho-jirei`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...glossaryPages,
  ];
}
