import './ProgressBar.css';

export default function ProgressBar({ current, total }) {
  const percent = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
      <div
        className="progress-bar__fill"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
