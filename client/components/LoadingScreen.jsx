import { motion as Motion } from 'framer-motion';

const STAR_POINTS = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  top: `${(index * 29) % 100}%`,
  left: `${(index * 41) % 100}%`,
  size: index % 3 === 0 ? 3 : 2,
  delay: (index % 6) * 0.18,
}));

function LoadingScreen() {
  return (
    <Motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="espace-stars" aria-hidden>
        {STAR_POINTS.map((star) => (
          <Motion.span
            key={star.id}
            className="espace-star"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{ opacity: [0.15, 0.8, 0.15] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: star.delay }}
          />
        ))}
      </div>

      <Motion.div
        className="espace-loader-card"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="loading-title">Launching Portfolio</h2>

        <div className="orbital-wrap">
          <Motion.div
            className="orbital-ring"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 5.2, ease: 'linear', repeat: Infinity }}
          >
            <span className="orbital-satellite" />
          </Motion.div>
          <div className="orbital-core">
            <Motion.span
              className="core-pulse"
              animate={{ scale: [0.88, 1.18, 0.88], opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>

        <div className="loading-progress" aria-hidden>
          <Motion.span
            className="loading-progress-fill"
            animate={{ width: ['14%', '96%', '38%'] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <Motion.p
          className="loading-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Stabilizing systems and rendering interface...
        </Motion.p>
      </Motion.div>
    </Motion.div>
  );
}

export default LoadingScreen;

