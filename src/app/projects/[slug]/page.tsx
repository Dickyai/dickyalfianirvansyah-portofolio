import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { ProjectDetail } from '../../../components/project/ProjectDetail';
import { PROJECTS } from '../../../data/projects';
import { SITE_URL } from '../../../data/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) return {};

  const url = `${SITE_URL}/projects/${project.slug}`;
  const title = `${project.title} | Dicky Alfian Irvansyah`;
  const description = project.summary.en;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${project.title} — Dicky Alfian Irvansyah`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <main id="main-content" tabIndex={-1}>
      <ProjectDetail project={project} />
    </main>
  );
}
