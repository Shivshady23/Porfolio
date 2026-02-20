import { motion as Motion } from 'framer-motion';

function SuccessToast({ message }) {
  return (
    <Motion.div
      className="success-toast glass"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.25 }}
      role="status"
      aria-live="polite"
    >
      {message}
    </Motion.div>
  );
}

export default SuccessToast;

