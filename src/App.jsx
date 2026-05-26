import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import questions from './data/questions';
import { submitToGoogleSheets } from './utils/submitToGoogleSheets';
import FormField from './components/FormField';
import './App.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    for (const q of questions) {
      const answer = answers[q.id];
      if (q.required && (!answer || (typeof answer === 'string' && answer.trim() === ''))) {
        newErrors[q.id] = 'This field is required';
      }
      if (q.type === 'email' && answer && !EMAIL_PATTERN.test(answer)) {
        newErrors[q.id] = 'Please enter a valid email';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      // Scroll to first error
      const firstErrorId = Object.keys(errors)[0] || questions.find((q) => {
        const a = answers[q.id];
        return q.required && (!a || a.trim() === '');
      })?.id;
      if (firstErrorId) {
        const el = document.getElementById(`field-${firstErrorId}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    const result = await submitToGoogleSheets(answers);
    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrors((prev) => ({
        ...prev,
        _submit: result.error || 'Something went wrong. Please try again.',
      }));
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setErrors({});
    setIsSubmitted(false);
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPath !== '/form') {
    return (
      <div className="landing">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="landing__title">Nobody fully knows what this is yet?</h1>
          <button 
            className="landing__link" 
            onClick={() => {
              window.history.pushState({}, '', '/form');
              setCurrentPath('/form');
            }}
          >
            Let's find out.
          </button>
        </motion.div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="app">
        <div className="app__container">
          <motion.div
            className="app__success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="app__success-icon">✓</div>
            <h1 className="app__success-title">thank you for willingly entering whatever this is.</h1>
            <p className="app__success-text">
              if we vibe, we’ll probably text you at odd hours with absurd ideas.
            </p>
            <button className="app__restart-btn" onClick={handleRestart}>
              Submit another response
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app__container">
        <motion.div
          className="app__header"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="app__badge">YOZU</span>
          <h1 className="app__title">This might either become legendary or deeply concerning</h1>
          <p className="app__subtitle">
            <br />
            Nobody fully knows what this is yet.
            <br />
            including us.
            <br />
            if you’re still here, that’s already a good sign.
          </p>
        </motion.div>

        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className="app__fields">
            {questions.map((q, index) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.02 }}
              >
                <FormField
                  question={q}
                  value={answers[q.id] || ''}
                  error={errors[q.id]}
                  onChange={handleChange}
                  index={index + 1}
                />
              </motion.div>
            ))}
          </div>

          {errors._submit && (
            <p className="app__submit-error">{errors._submit}</p>
          )}

          <motion.div
            className="app__submit-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <button
              type="submit"
              className="app__submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="app__spinner" />
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
