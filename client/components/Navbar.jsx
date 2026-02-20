import { useEffect, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import ThemeSwitch from './ThemeSwitch';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience / Training', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
  { label: 'Footer', href: '#footer' },
];

function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 820) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', closeOnDesktop);
    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);

  const linkContent = (
    <>
      {navLinks.map((link) => (
        <a key={link.href} href={link.href} className="nav-link" onClick={() => setMenuOpen(false)}>
          {link.label}
        </a>
      ))}
      <ThemeSwitch theme={theme} onToggleTheme={onToggleTheme} />
    </>
  );

  return (
    <Motion.header
      className="navbar-wrap"
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar glass">
        <a href="#home" className="brand">
          Shivang.dev
        </a>

        <nav className="desktop-nav">{linkContent}</nav>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <Motion.nav
            className="mobile-nav glass"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {linkContent}
          </Motion.nav>
        ) : null}
      </AnimatePresence>
    </Motion.header>
  );
}

export default Navbar;

