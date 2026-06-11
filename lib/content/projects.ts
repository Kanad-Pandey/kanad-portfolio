import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project, ProjectFrontmatterSchema } from '@/types/content';

const PROJECTS_PATH = path.join(process.cwd(), 'content/projects');

export function getProjectSlugs() {
  if (!fs.existsSync(PROJECTS_PATH)) return [];
  return fs.readdirSync(PROJECTS_PATH).filter((path) => /\.mdx?$/.test(path));
}

export function getProjectBySlug(slug: string): Project {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(PROJECTS_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const validatedData = ProjectFrontmatterSchema.parse(data);

  return {
    ...validatedData,
    slug: realSlug,
    content,
  };
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    // sort projects by date in descending order
    .sort((project1, project2) => (project1.date > project2.date ? -1 : 1));
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured);
}
