// Server Component — no "use client" directive.
// Sections are imported directly and rendered server-side where possible.
// Only genuinely interactive leaf components carry "use client".

import Navbar from './Navbar';
import About from './About';
import SkillsSection from './sections/SkillsSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import EducationSection from './sections/EducationSection';
import ContactSection from './sections/ContactSection';
import Footer from './Footer';

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <div>
        <About />
        {/*
          Plain div replacing MUI Container — avoids pulling the MUI/Emotion chunk
          into this Server Component. The max-width and padding match Container maxWidth="lg".
        */}
        <div className="page-container">
          <section aria-labelledby="skills-heading">
            <SkillsSection />
          </section>

          <section aria-labelledby="experience-heading">
            <ExperienceSection />
          </section>

          <section aria-labelledby="projects-heading">
            <ProjectsSection />
          </section>

          <section aria-labelledby="education-heading">
            <EducationSection />
          </section>

          <section aria-labelledby="contact-heading">
            <ContactSection />
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
