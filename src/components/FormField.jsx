import { useRef, useEffect, useState } from 'react';
import './FormField.css';

export default function FormField({ question, value, error, onChange, index }) {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    onChange(question.id, e.target.value);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (question.type === 'textarea' && inputRef.current) {
      const el = inputRef.current;
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }, [value, question.type]);

  const fieldClass = [
    'form-field',
    isFocused ? 'form-field--focused' : '',
    error ? 'form-field--error' : '',
  ].filter(Boolean).join(' ');

  const renderInput = () => {
    const commonProps = {
      ref: inputRef,
      value,
      onChange: handleChange,
      placeholder: question.placeholder || '',
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      className: 'form-field__input',
      id: `input-${question.id}`,
    };

    switch (question.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={1}
            className="form-field__input form-field__textarea"
          />
        );
      case 'checkbox':
        return (
          <div className="form-field__choices" id={`input-${question.id}`}>
            {question.options.map((opt) => {
              const isSelected = question.multiple
                ? (value || '').split(', ').map((s) => s.trim()).includes(opt)
                : value === opt;

              const handleChoiceClick = () => {
                if (question.multiple) {
                  const currentSelected = (value || '')
                    .split(', ')
                    .map((s) => s.trim())
                    .filter(Boolean);
                  let nextSelected;
                  if (currentSelected.includes(opt)) {
                    nextSelected = currentSelected.filter((item) => item !== opt);
                  } else {
                    nextSelected = [...currentSelected, opt];
                  }
                  onChange(question.id, nextSelected.join(', '));
                } else {
                  onChange(question.id, opt);
                }
              };

              return (
                <button
                  key={opt}
                  type="button"
                  className={`form-field__choice-btn ${isSelected ? 'form-field__choice-btn--selected' : ''}`}
                  onClick={handleChoiceClick}
                >
                  <span className="form-field__checkbox-indicator">
                    {isSelected ? '✓' : ''}
                  </span>
                  <span className="form-field__choice-text">{opt}</span>
                </button>
              );
            })}
          </div>
        );
      case 'email':
        return <input type="email" {...commonProps} />;
      case 'url':
        return <input type="url" {...commonProps} />;
      case 'select':
        return (
          <select {...commonProps} className="form-field__input form-field__select">
            <option value="" disabled hidden>{question.placeholder || 'Choose one'}</option>
            {question.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      default:
        return <input type="text" {...commonProps} />;
    }
  };

  return (
    <div className={fieldClass} id={`field-${question.id}`}>
      <label className="form-field__label" htmlFor={`input-${question.id}`}>
        <span className="form-field__number">{String(index).padStart(2, '0')}</span>
        <span className="form-field__label-text">
          {question.label}
          {question.required && <span className="form-field__required"> *</span>}
        </span>
      </label>

      {question.description && (
        <p className="form-field__description">{question.description}</p>
      )}

      {renderInput()}

      {error && (
        <p className="form-field__error">{error}</p>
      )}
    </div>
  );
}
