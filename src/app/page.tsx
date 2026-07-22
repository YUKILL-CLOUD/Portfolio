import { getContent } from "@/lib/content"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Projects } from "@/components/sections/projects"
import { Skills } from "@/components/sections/skills"
import { Experience } from "@/components/sections/experience"
import { Testimonials } from "@/components/sections/testimonials"
import { Contact } from "@/components/sections/contact"
import { AppsUsed } from "@/components/sections/apps-used"
import { WorkWithMe } from "@/components/sections/work-with-me"
import { GithubActivity } from "@/components/sections/github-activity"

export const revalidate = 0; // Disable cache to reflect CMS updates live

export default async function Home() {
  const data = await getContent();

  return (
    <main className="min-h-screen bg-zinc-950 text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <Hero data={data} />
      <AppsUsed />
      <Services data={data} />
      <Projects data={data} />
      <Skills data={data} />
      <Experience data={data} />
      <GithubActivity username={data.settings?.github_username || 'YUKILL-CLOUD'} />
      <Testimonials data={data} />
      <WorkWithMe settings={data.settings} />
      <Contact />
      <Footer />
    </main>
  );
}
