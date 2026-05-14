import { MetadataRoute } from "next";
import { terms } from "./glossary/terms";

const BASE_URL = "https://safebite-zeta.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const glossaryPages = terms.map((term) => ({
    url: `${BASE_URL}/glossary/${term.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/glossary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...glossaryPages,
  ];
}
