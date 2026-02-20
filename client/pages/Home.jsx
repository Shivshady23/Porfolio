import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import EducationSection from '../components/EducationSection';
import ResumeSection from '../components/ResumeSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ResumeSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

export default Home;
