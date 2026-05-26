import TextInput from './TextInput';
import TextArea from './TextArea';
import MultipleChoice from './MultipleChoice';
import './QuestionSlide.css';

export default function QuestionSlide({
  question,
  answer,
  error,
  onAnswer,
  onNext,
  index,
  total,
}) {
  // Bridge onAnswer: child inputs call onChange(value), we call onAnswer(id, value)
  const handleChange = (value) => {
    onAnswer(question.id, value);
  };

  const renderInput = () => {
    switch (question.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'url':
        return (
          <TextInput
            value={answer}
            onChange={handleChange}
            placeholder={question.placeholder}
            type={question.type}
            error={error}
          />
        );
      case 'textarea':
        return (
          <TextArea
            value={answer}
            onChange={handleChange}
            placeholder={question.placeholder}
            error={error}
          />
        );
      case 'multiple-choice':
        return (
          <MultipleChoice
            options={question.options}
            value={answer}
            onChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  const isTextarea = question.type === 'textarea';

  return (
    <div className="question-slide">
      <div className="question-slide__number">
        {index + 1} <span>→</span> <span>{total}</span>
      </div>

      <h2 className="question-slide__question">{question.question}</h2>

      {question.description && (
        <p className="question-slide__description">{question.description}</p>
      )}

      <div className="question-slide__input">{renderInput()}</div>

      <div className="question-slide__footer">
        <button className="question-slide__ok-btn" onClick={onNext} type="button">
          OK
          <svg
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

        <span className="question-slide__hint">
          press <kbd>{isTextarea ? 'Ctrl' : 'Enter'}</kbd>
          {isTextarea && <> + <kbd>Enter</kbd></>} ↵
        </span>
      </div>

      {!question.required && (
        <button className="question-slide__skip" onClick={onNext} type="button">
          skip →
        </button>
      )}
    </div>
  );
}
