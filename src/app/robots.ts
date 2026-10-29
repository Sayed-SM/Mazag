import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/checkout", "/order/", "/track", "/api/"],
      },
    ],
    sitemap: "https://mazag.eg/sitemap.xml",
    host: "https://mazag.eg",
  };
}
