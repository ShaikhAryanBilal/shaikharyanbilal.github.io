import type { MetadataRoute } from "next";
import { work } from "@/lib/content";

const siteUrl = "https://shaikharyanbilal.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/certifications`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/work-history`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = work.projects
    .filter((p) => !p.hidden)
    .map((p) => ({
      url: `${siteUrl}/portfolio/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...projectRoutes];
}
