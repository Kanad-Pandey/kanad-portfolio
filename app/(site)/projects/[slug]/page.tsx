import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectBySlug, getProjectSlugs } from '@/lib/content/projects';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { RevealText } from '@/components/motion/RevealText';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Calendar, User, Briefcase } from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ''),
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = getProjectBySlug(slug);
    return {
      title: `${project.title} | Kanad Pandey`,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        type: 'article',
        publishedTime: project.date,
        authors: ['Kanad Pandey'],
      },
    };
  } catch {
    return {
      title: 'Project Not Found',
    };
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  
  let project;
  try {
    project = getProjectBySlug(slug);
  } catch (e) {
    notFound();
  }

  return (
    <article className="min-h-screen pt-32 pb-20">
      {/* Hero Header */}
      <header className="container mx-auto px-6 mb-16">
        <Link 
          href="/#projects" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to projects</span>
        </Link>

        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-accent-cyan uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white font-display mb-8 uppercase tracking-tighter leading-tight">
            <RevealText>{project.title}</RevealText>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-12 max-w-3xl">
            {project.description}
          </p>

          {/* Project Meta Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/10">
            {project.client && (
              <div>
                <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest mb-2 font-mono">
                  <User size={12} />
                  <span>Client</span>
                </div>
                <div className="text-white font-medium">{project.client}</div>
              </div>
            )}
            {project.role && (
              <div>
                <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest mb-2 font-mono">
                  <Briefcase size={12} />
                  <span>Role</span>
                </div>
                <div className="text-white font-medium">{project.role}</div>
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest mb-2 font-mono">
                <Calendar size={12} />
                <span>Date</span>
              </div>
              <div className="text-white font-medium">
                {new Date(project.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-gray-500 text-xs uppercase tracking-widest mb-1 font-mono">Links</div>
              <div className="flex gap-4">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-cyan transition-colors">
                    <ExternalLink size={20} />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-cyan transition-colors">
                    <Github size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mdx-content">
          <MDXRemote source={project.content} components={mdxComponents} />
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="container mx-auto px-6 mt-32 pt-16 border-t border-white/10">
        <div className="flex justify-between items-center">
          <Link 
            href="/#projects" 
            className="text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-mono"
          >
            All Projects
          </Link>
          <div className="text-gray-600 text-sm font-mono">
            © {new Date().getFullYear()} Kanad Pandey
          </div>
        </div>
      </footer>
    </article>
  );
}
