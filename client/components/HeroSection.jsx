import { motion as Motion } from 'framer-motion';
import FloatingBlobs from './FloatingBlobs';
import TypingText from './TypingText';
import resumePdf from 'url:../Shivang.pdf';

function HeroSection() {
  return (
    <section id="home" className="section hero-section">
      <FloatingBlobs />
      <Motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <Motion.div
          className="hero-card glass"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Motion.p
            className="hero-overline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            Shivang Jignesh Chauhan
          </Motion.p>
          <Motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            Full Stack Developer
          </Motion.h1>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.45 }}
          >
            <TypingText />
          </Motion.div>
          <Motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.55 }}
          >
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              Let&apos;s Work Together
            </a>
            <a href={resumePdf} download="Shivang-Resume.pdf" className="btn btn-secondary">
              Download Resume
            </a>
          </Motion.div>
        </Motion.div>
      </Motion.div>
    </section>
  );
}

export default HeroSection;
