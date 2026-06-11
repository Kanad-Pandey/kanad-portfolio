import { z } from 'zod';

export const ProjectFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  image: z.string().optional(),
  featured: z.boolean().default(false),
  client: z.string().optional(),
  role: z.string().optional(),
  link: z.string().url().optional(),
  github: z.string().url().optional(),
});

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

export interface Project extends ProjectFrontmatter {
  slug: string;
  content: string;
}

export const ExperienceFrontmatterSchema = z.object({
  company: z.string(),
  role: z.string(),
  location: z.string(),
  period: z.string(),
  current: z.boolean().default(false),
  tags: z.array(z.string()),
});

export type ExperienceFrontmatter = z.infer<typeof ExperienceFrontmatterSchema>;

export interface Experience extends ExperienceFrontmatter {
  slug: string;
  content: string;
}
