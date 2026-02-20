import { motion as Motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { education } from '../data/content';

function EducationSection() {
  return (
    <section id="education" className="section">
      <SectionHeading title="Education" subtitle="Academic background in a simple format." />

      <Motion.article
        className="education-card glass"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4 }}
      >
        <div className="education-grid">
          <div className="education-row">
            <p className="education-label">Degree</p>
            <p className="education-value">{education.degree}</p>
          </div>
          <div className="education-row">
            <p className="education-label">College</p>
            <p className="education-value">{education.college}</p>
          </div>
          <div className="education-row">
            <p className="education-label">Year</p>
            <p className="education-value">{education.year}</p>
          </div>
          <div className="education-row">
            <p className="education-label">CGPA</p>
            <p className="education-value">{education.cgpa}</p>
          </div>
        </div>
      </Motion.article>
    </section>
  );
}

export default EducationSection;
