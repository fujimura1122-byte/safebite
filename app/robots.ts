import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dev/", "/api/"],
      },
    ],
    sitemap: "https://saferbite.org/sitemap.xml",
    host: "https://saferbite.org",
  };
}
