import { useEffect, useCallback } from 'react';
import './MultipleChoice.css';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function MultipleChoice({ options, value, onChange }) {
  const handleKeyDown = useCallback(
    (e) => {
      const key = e.key.toUpperCase();
      const index = LETTERS.indexOf(key);
      if (index >= 0 && index < options.length) {
        onChange(options[index]);
      }
    },
    [options, onChange]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="multiple-choice" role="radiogroup">
      {options.map((option, index) => {
        const isSelected = value === option;
        const classNames = [
          'multiple-choice__option',
          isSelected ? 'multiple-choice__option--selected' : '',
        ].filter(Boolean).join(' ');

        return (
          <button
            key={option}
            className={classNames}
            onClick={() => onChange(option)}
            role="radio"
            aria-checked={isSelected}
            type="button"
          >
            <span className="multiple-choice__key">{LETTERS[index]}</span>
            <span className="multiple-choice__label">{option}</span>
            <svg
              className="multiple-choice__check"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
