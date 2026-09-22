import type { SkillBreakdownEntry } from '@/lib/scoring';

type Props = {
  items: SkillBreakdownEntry[];
  title?: string;
};

export function SkillChart({ items, title = 'Skills' }: Props) {
  if (items.length === 0) {
    return (
      <p className="empty-state" style={{ padding: '1rem' }}>
        No skill data yet — complete a lesson or assessment.
      </p>
    );
  }

  return (
    <section aria-label={title}>
      <h3>{title}</h3>
      <div className="skill-chart">
        {items.map((item) => (
          <div key={item.skill} className="skill-chart__row">
            <span>{item.skill}</span>
            <div className="skill-chart__bar" aria-hidden="true">
              <div
                className="skill-chart__fill"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span aria-label={`${item.skill} ${item.percentage} percent`}>
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
