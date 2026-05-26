import { motion } from 'framer-motion';
import './ThankYouScreen.css';

const CONFETTI_COUNT = 20;

export default function ThankYouScreen({ onRestart }) {
  return (
    <motion.div
      className="thank-you"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Confetti */}
      <div className="thank-you__confetti">
        {Array.from({ length: CONFETTI_COUNT }, (_, i) => (
          <div key={i} className="thank-you__confetti-piece" />
        ))}
      </div>

      <div className="thank-you__content">
        {/* Animated checkmark */}
        <motion.div
          className="thank-you__checkmark"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        >
          <div className="thank-you__circle">
            <svg className="thank-you__check-svg" viewBox="0 0 24 24">
              <polyline className="thank-you__check-path" points="20 6 9 17 4 12" />
            </svg>
          </div>
        </motion.div>

        <motion.h1
          className="thank-you__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Thank you!
        </motion.h1>

        <motion.p
          className="thank-you__subtitle"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          Your application has been submitted successfully.
        </motion.p>

        <motion.p
          className="thank-you__muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          We'll be in touch soon.
        </motion.p>

        <motion.button
          className="thank-you__restart"
          onClick={onRestart}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          type="button"
        >
          Submit another response
        </motion.button>
      </div>
    </motion.div>
  );
}
