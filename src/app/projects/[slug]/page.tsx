import { notFound } from 'next/navigation';
import { ProjectDetail } from '../../../components/project/ProjectDetail';
import { PROJECTS } from '../../../data/projects';

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

  return <ProjectDetail project={project} />;
}
