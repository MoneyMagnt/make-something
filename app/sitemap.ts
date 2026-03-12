import type { MetadataRoute } from "next";
import { EVENTS } from "@/lib/eventsData";
import { LOCATION_SERVICE_PAGES } from "@/lib/locationServicePages";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services/seo`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services/content`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services/influencer`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services/founder-websites`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/data-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/events`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const eventRoutes: MetadataRoute.Sitemap = EVENTS.map((event) => ({
    url: `${SITE_URL}/events/${event.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.85,
  }));

  const locationServiceRoutes: MetadataRoute.Sitemap = LOCATION_SERVICE_PAGES.map((page) => ({
    url: `${SITE_URL}/services/${page.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...locationServiceRoutes, ...eventRoutes];
}
