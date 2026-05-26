import { useEffect, useRef, useState, useCallback } from 'react';
import './TextArea.css';

export default function TextArea({ value, onChange, placeholder, error }) {
  const textareaRef = useRef(null);
  const [shaking, setShaking] = useState(false);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    autoResize();
  }, [value, autoResize]);

  useEffect(() => {
    if (error) {
      setShaking(true);
      const timer = setTimeout(() => setShaking(false), 400);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const classNames = [
    'text-area',
    error ? 'text-area--error' : '',
    shaking ? 'text-area--shake' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <textarea
        ref={textareaRef}
        className="text-area__field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        spellCheck={false}
      />
      {error && (
        <div className="text-area__error">
          <span>⚠</span> {error}
        </div>
      )}
      <div className="text-area__hint">
        <kbd>Shift</kbd> + <kbd>Enter</kbd> for new line
      </div>
    </div>
  );
}
