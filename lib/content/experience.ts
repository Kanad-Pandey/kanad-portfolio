import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Experience, ExperienceFrontmatterSchema } from '@/types/content';

const EXPERIENCE_PATH = path.join(process.cwd(), 'content/experience');

export function getExperienceSlugs() {
  if (!fs.existsSync(EXPERIENCE_PATH)) return [];
  return fs.readdirSync(EXPERIENCE_PATH).filter((path) => /\.mdx?$/.test(path));
}

export function getExperienceBySlug(slug: string): Experience {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(EXPERIENCE_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const validatedData = ExperienceFrontmatterSchema.parse(data);

  return {
    ...validatedData,
    slug: realSlug,
    content,
  };
}

export function getAllExperience(): Experience[] {
  const slugs = getExperienceSlugs();
  const experience = slugs
    .map((slug) => getExperienceBySlug(slug))
    .sort((exp1, exp2) => {
      // Sort by period (approximate logic for resume timeline)
      if (exp1.current) return -1;
      if (exp2.current) return 1;
      return exp1.period > exp2.period ? -1 : 1;
    });
  return experience;
}
