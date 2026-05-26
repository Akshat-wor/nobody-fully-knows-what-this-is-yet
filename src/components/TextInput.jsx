import { useEffect, useRef, useState } from 'react';
import './TextInput.css';

export default function TextInput({ value, onChange, placeholder, type = 'text', error }) {
  const inputRef = useRef(null);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (error) {
      setShaking(true);
      const timer = setTimeout(() => setShaking(false), 400);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const classNames = [
    'text-input',
    error ? 'text-input--error' : '',
    shaking ? 'text-input--shake' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <input
        ref={inputRef}
        className="text-input__field"
        type={type === 'phone' ? 'tel' : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
      />
      {error && (
        <div className="text-input__error">
          <span>⚠</span> {error}
        </div>
      )}
    </div>
  );
}
