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

export const revalidate = 0; // Disable cache for demo purposes to see updates immediately

export default async function Home() {
  const data = await getContent();

  return (
    <main className="min-h-screen bg-zinc-950 text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <Hero data={data} />
      <AppsUsed />
      <Services data={data} />
      <Projects data={data} />
      <Skills />
      <Experience data={data} />
      <Testimonials data={data} />
      <Contact />
      <Footer />
    </main>
  );
}
