import './NavigationControls.css';

export default function NavigationControls({ onPrev, onNext, isFirst, isLast, isSubmitting }) {
  return (
    <div className="nav-controls">
      <button
        className={`nav-controls__btn${isFirst ? ' nav-controls__btn--disabled' : ''}`}
        onClick={onPrev}
        disabled={isFirst}
        aria-label="Previous question"
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
      <button
        className={`nav-controls__btn${isSubmitting ? ' nav-controls__btn--disabled' : ''}`}
        onClick={onNext}
        disabled={isSubmitting}
        aria-label="Next question"
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  );
}
