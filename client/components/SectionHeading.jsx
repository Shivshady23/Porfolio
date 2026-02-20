import { motion as Motion } from 'framer-motion';

function SectionHeading({ title, subtitle }) {
  return (
    <Motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45 }}
    >
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </Motion.div>
  );
}

export default SectionHeading;

