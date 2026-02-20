import { contactInfo } from '../data/content';

function Footer() {
  return (
    <footer id="footer" className="section footer-section">
      <div className="footer-card glass">
        <p className="footer-name">Shivang Jignesh Chauhan</p>
        <p className="footer-copy">© 2026 Shivang Chauhan. All rights reserved.</p>
        <div className="footer-socials">
          <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="footer-link">
            LinkedIn
          </a>
          <a href={contactInfo.github} target="_blank" rel="noreferrer" className="footer-link">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
