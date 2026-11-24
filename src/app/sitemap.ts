import type { MetadataRoute } from "next";
import { PROJECTS } from "../data/projects";
import { SITE_URL } from "../data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
    },
    ...PROJECTS.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
    })),
  ];
}
