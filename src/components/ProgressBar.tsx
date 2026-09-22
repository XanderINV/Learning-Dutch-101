type Props = {
  value: number;
  max?: number;
  label: string;
};

export function ProgressBar({ value, max = 100, label }: Props) {
  const pct = max <= 0 ? 0 : Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.35rem',
          fontSize: '0.9rem',
        }}
      >
        <span>{label}</span>
        <span aria-hidden="true">{pct}%</span>
      </div>
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
