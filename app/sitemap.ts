import type { MetadataRoute } from "next";

const siteUrl = "https://shaikharyanbilal.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/certifications`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/resume`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  return staticRoutes;
}
