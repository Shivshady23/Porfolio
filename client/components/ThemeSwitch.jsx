import { motion as Motion } from 'framer-motion';

function ThemeSwitch({ theme, onToggleTheme }) {
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      className={`liquid-switch ${isLight ? 'is-light' : 'is-dark'}`}
      onClick={onToggleTheme}
      role="switch"
      aria-checked={isLight}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
    >
      <span className="liquid-track">
        <span className="liquid-icon liquid-icon-sun" aria-hidden>
          Sun
        </span>
        <span className="liquid-icon liquid-icon-moon" aria-hidden>
          Moon
        </span>
        <Motion.span
          className="liquid-knob"
          layout
          transition={{ type: 'spring', stiffness: 460, damping: 34 }}
          animate={{
            x: isLight ? 30 : 0,
            rotate: isLight ? 12 : -12,
            boxShadow: isLight
              ? '0 8px 24px rgba(168, 85, 247, 0.45)'
              : '0 8px 24px rgba(56, 189, 248, 0.42)',
          }}
        >
          <span className="liquid-knob-inner" />
        </Motion.span>
      </span>
    </button>
  );
}

export default ThemeSwitch;
