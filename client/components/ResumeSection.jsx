import { motion as Motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import resumePdf from 'url:../Shivang.pdf';

function ResumeSection() {
  return (
    <section id="resume" className="section">
      <SectionHeading title="Resume" subtitle="Download or view my latest resume." />

      <Motion.article
        className="resume-card glass"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
      >
        <p className="resume-copy">
          Access my resume for detailed information about projects, technical skills, and work experience.
        </p>
        <div className="resume-actions">
          <a href={resumePdf} target="_blank" rel="noreferrer" className="btn btn-secondary">
            View Resume
          </a>
          <a href={resumePdf} download="Shivang-Resume.pdf" className="btn btn-primary">
            Download Resume
          </a>
        </div>
      </Motion.article>
    </section>
  );
}

export default ResumeSection;
