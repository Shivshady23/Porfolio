import { motion as Motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { skillGroups } from '../data/content';

function SkillsSection() {
  return (
    <section id="skills" className="section">
      <SectionHeading
        title="Skills"
        subtitle="Core technologies, tools, and foundational concepts used across my development workflow."
      />
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <Motion.article
            key={group.category}
            className="skill-card glass"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.25) }}
            whileHover={{ y: -6 }}
          >
            <h3>{group.category}</h3>
            <div className="skill-items">
              {group.items.map((item) => (
                <span key={item} className="skill-tag">
                  {item}
                </span>
              ))}
            </div>
          </Motion.article>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;

