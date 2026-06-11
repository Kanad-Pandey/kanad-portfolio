import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { ExperienceSection } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { getFeaturedProjects } from "@/lib/content/projects";
import { getAllExperience } from "@/lib/content/experience";

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const experience = getAllExperience();

  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects projects={featuredProjects} />
      <ExperienceSection experience={experience} />
      <Contact />
    </main>
  );
}
