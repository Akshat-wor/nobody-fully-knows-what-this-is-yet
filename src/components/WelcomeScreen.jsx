import { motion } from 'framer-motion';
import './WelcomeScreen.css';

export default function WelcomeScreen({ onStart }) {
  return (
    <motion.div
      className="welcome-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="welcome-screen__orb" />

      <div className="welcome-screen__content">
        <motion.h1
          className="welcome-screen__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          JOIN THE TEAM
        </motion.h1>

        <motion.p
          className="welcome-screen__tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          We're looking for people who think different.
        </motion.p>

        <motion.button
          className="welcome-screen__button"
          onClick={onStart}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileTap={{ scale: 0.95 }}
        >
          Start
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.button>

        <motion.p
          className="welcome-screen__subtext"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Takes only 2 minutes ⏱️
        </motion.p>
      </div>
    </motion.div>
  );
}
