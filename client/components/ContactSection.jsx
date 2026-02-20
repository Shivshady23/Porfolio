import { motion as Motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { contactInfo } from '../data/content';

function ContactSection() {
  return (
    <section id="contact" className="section">
      <SectionHeading
        title="Contact Me"
        subtitle="Reach me directly using the links below."
      />
      <Motion.article
        className="contact-card glass"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
      >
        <div className="contact-list">
          <div className="contact-row">
            <p className="contact-label">Email</p>
            <a className="contact-link" href={`mailto:${contactInfo.email}`}>
              {contactInfo.email}
            </a>
          </div>
          <div className="contact-row">
            <p className="contact-label">Phone</p>
            <a className="contact-link" href={`tel:${contactInfo.phone}`}>
              {contactInfo.phone}
            </a>
          </div>
          <div className="contact-row">
            <p className="contact-label">LinkedIn</p>
            <a className="contact-link" href={contactInfo.linkedin} target="_blank" rel="noreferrer">
              View LinkedIn Profile
            </a>
          </div>
          <div className="contact-row">
            <p className="contact-label">GitHub</p>
            <a className="contact-link" href={contactInfo.github} target="_blank" rel="noreferrer">
              View GitHub Profile
            </a>
          </div>
        </div>
      </Motion.article>
    </section>
  );
}

export default ContactSection;

