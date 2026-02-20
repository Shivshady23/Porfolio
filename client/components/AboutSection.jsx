import { motion as Motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { aboutMe } from '../data/content';

const aboutRows = [
  { label: 'Location', value: aboutMe.location },
  { label: 'Education', value: aboutMe.education },
  { label: 'Availability', value: aboutMe.availability },
];

function AboutSection() {
  return (
    <section id="about" className="section">
      <SectionHeading title="About Me" subtitle="Personal overview, background, and current focus." />

      <div className="about-layout">
        <Motion.article
          className="about-card glass"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4 }}
        >
          <p className={`about-summary ${aboutMe.summary ? '' : 'about-empty'}`}>
            {aboutMe.summary || 'Add your summary to display your story and professional background.'}
          </p>

          <div className="about-highlights">
            {aboutMe.highlights.length > 0 ? (
              aboutMe.highlights.map((item) => (
                <span key={item} className="about-chip">
                  {item}
                </span>
              ))
            ) : (
              <span className="about-chip about-empty">Add focus highlights</span>
            )}
          </div>
        </Motion.article>

        <Motion.article
          className="about-card glass"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          <div className="about-meta">
            {aboutRows.map((row) => (
              <div className="about-row" key={row.label}>
                <p className="about-label">{row.label}</p>
                <p className={`about-value ${row.value ? '' : 'about-empty'}`}>{row.value || 'Pending'}</p>
              </div>
            ))}
          </div>
        </Motion.article>
      </div>
    </section>
  );
}

export default AboutSection;
