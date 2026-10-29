import type { MetadataRoute } from "next";
import { categories, dishes } from "@/lib/menu";
import { posts } from "@/content/journal";

const base = "https://mazag.eg";

const staticPages = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/menu", changeFrequency: "weekly", priority: 0.9 },
  { path: "/offers", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/journal", changeFrequency: "monthly", priority: 0.6 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/shipping", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/legal/terms", changeFrequency: "yearly", priority: 0.2 },
  { path: "/legal/privacy", changeFrequency: "yearly", priority: 0.2 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${base}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${base}/menu/${cat.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const dishRoutes: MetadataRoute.Sitemap = dishes.map((dish) => ({
    url: `${base}/dish/${dish.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const journalRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/journal/${post.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...categoryRoutes, ...dishRoutes, ...journalRoutes];
}
