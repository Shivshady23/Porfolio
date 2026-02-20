import { motion as Motion } from 'framer-motion';
import { experiences } from '../data/content';
import SectionHeading from './SectionHeading';

function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <SectionHeading
        title="Experience / Training"
        subtitle="A quick look at professional work, internships, and practical training."
      />
      <div className="timeline">
        {experiences.map((item, index) => (
          <Motion.article
            className="timeline-item glass"
            key={`${item.role}-${item.company}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <div className="timeline-dot" />
            <p className="timeline-period">{item.period}</p>
            <h3>{item.role}</h3>
            <h4>{item.company}</h4>
            <p>{item.details}</p>
          </Motion.article>
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;

