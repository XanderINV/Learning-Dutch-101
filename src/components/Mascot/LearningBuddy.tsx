import { useId, useState } from 'react';
import { getMascotState, type MascotMood, type MascotStage } from '@/lib/mascot';
import { useAppState } from '@/state/AppState';

type SvgProps = {
  stage: MascotStage;
  mood: MascotMood;
  titleId: string;
};

function PipSvg({ stage, mood, titleId }: SvgProps) {
  const eyeOpen = mood !== 'sleepy';
  const lonely = mood === 'lonely';
  const happy = mood === 'happy' || mood === 'proud';
  const proud = mood === 'proud' || stage === 'champion';
  const showLeaf = stage !== 'hatchling';
  const showPack = stage === 'explorer' || stage === 'streaker' || stage === 'champion';
  const showScarf = stage === 'streaker' || stage === 'champion';
  const showCrown = stage === 'champion';
  const showSparkles = stage === 'streaker' || stage === 'champion' || proud;
  const blush = happy || proud;

  const bodyScale =
    stage === 'hatchling'
      ? 0.86
      : stage === 'sprout'
        ? 0.92
        : stage === 'explorer'
          ? 1
          : stage === 'streaker'
            ? 1.04
            : 1.08;

  return (
    <svg
      viewBox="0 0 160 160"
      role="img"
      aria-labelledby={titleId}
      className="mascot__svg"
    >
      <title id={titleId}>Pip the study buddy</title>
      <defs>
        <radialGradient id="pip-body" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#7fd3c7" />
          <stop offset="55%" stopColor="#2f9e94" />
          <stop offset="100%" stopColor="#0f6e73" />
        </radialGradient>
        <radialGradient id="pip-belly" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#e8fff8" />
          <stop offset="100%" stopColor="#b8ebe2" />
        </radialGradient>
        <filter id="pip-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="3"
            floodColor="#0f1c2e"
            floodOpacity="0.18"
          />
        </filter>
      </defs>

      <ellipse cx="80" cy="138" rx="38" ry="8" fill="rgb(15 28 46 / 12%)" />

      <g
        style={{
          transformOrigin: '80px 90px',
          transform: `scale(${bodyScale})`,
        }}
      >
        {showSparkles ? (
          <g className="mascot__sparkles" aria-hidden="true">
            <circle cx="28" cy="42" r="3" fill="#fbbf24" />
            <circle cx="132" cy="50" r="2.5" fill="#fde68a" />
            <circle cx="140" cy="88" r="2" fill="#fbbf24" />
          </g>
        ) : null}

        {showCrown ? (
          <g aria-hidden="true">
            <path
              d="M52 44 L62 28 L80 40 L98 28 L108 44 Z"
              fill="#fbbf24"
              stroke="#b45309"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="62" cy="30" r="3" fill="#f97316" />
            <circle cx="80" cy="34" r="3" fill="#0f6e73" />
            <circle cx="98" cy="30" r="3" fill="#f97316" />
          </g>
        ) : null}

        {showLeaf ? (
          <g aria-hidden="true">
            <ellipse
              cx="52"
              cy="48"
              rx="10"
              ry="16"
              fill="#34d399"
              transform="rotate(-28 52 48)"
            />
            <ellipse
              cx="108"
              cy="48"
              rx="10"
              ry="16"
              fill="#10b981"
              transform="rotate(28 108 48)"
            />
          </g>
        ) : null}

        {/* arms */}
        <ellipse
          cx="36"
          cy="96"
          rx="14"
          ry="10"
          fill="url(#pip-body)"
          transform="rotate(-18 36 96)"
        />
        <ellipse
          cx="124"
          cy="96"
          rx="14"
          ry="10"
          fill="url(#pip-body)"
          transform="rotate(18 124 96)"
        />

        {/* body */}
        <ellipse
          cx="80"
          cy="92"
          rx="46"
          ry="42"
          fill="url(#pip-body)"
          filter="url(#pip-soft)"
        />
        <ellipse cx="80" cy="100" rx="28" ry="22" fill="url(#pip-belly)" />

        {showScarf ? (
          <g aria-hidden="true">
            <path
              d="M48 86 Q80 102 112 86"
              fill="none"
              stroke="#c2410c"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M98 92 L108 118 L96 114 Z"
              fill="#ea580c"
            />
          </g>
        ) : null}

        {showPack ? (
          <g aria-hidden="true">
            <rect
              x="108"
              y="88"
              width="22"
              height="26"
              rx="6"
              fill="#0f4c51"
              stroke="#083b40"
              strokeWidth="1.5"
            />
            <rect x="112" y="94" width="14" height="8" rx="2" fill="#fde68a" />
          </g>
        ) : null}

        {/* face */}
        {eyeOpen ? (
          <g>
            <ellipse
              cx="64"
              cy="84"
              rx="9"
              ry={lonely ? 5 : 10}
              fill="#0f1c2e"
            />
            <ellipse
              cx="96"
              cy="84"
              rx="9"
              ry={lonely ? 5 : 10}
              fill="#0f1c2e"
            />
            {!lonely ? (
              <>
                <circle cx="67" cy="81" r="3" fill="#fff" />
                <circle cx="99" cy="81" r="3" fill="#fff" />
              </>
            ) : null}
          </g>
        ) : (
          <g stroke="#0f1c2e" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M56 84 Q64 78 72 84" />
            <path d="M88 84 Q96 78 104 84" />
          </g>
        )}

        {blush ? (
          <g aria-hidden="true">
            <ellipse cx="52" cy="96" rx="7" ry="4" fill="#fb7185" opacity="0.55" />
            <ellipse cx="108" cy="96" rx="7" ry="4" fill="#fb7185" opacity="0.55" />
          </g>
        ) : null}

        {/* mouth */}
        {lonely ? (
          <path
            d="M72 108 Q80 102 88 108"
            fill="none"
            stroke="#0f1c2e"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ) : happy || proud ? (
          <path
            d="M68 106 Q80 118 92 106"
            fill="#0f1c2e"
          />
        ) : (
          <path
            d="M72 108 Q80 112 88 108"
            fill="none"
            stroke="#0f1c2e"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}

        {/* feet */}
        <ellipse cx="64" cy="128" rx="12" ry="8" fill="#0b585c" />
        <ellipse cx="96" cy="128" rx="12" ry="8" fill="#0b585c" />
      </g>
    </svg>
  );
}

export function LearningBuddy() {
  const { activeProfile } = useAppState();
  const mascot = getMascotState(activeProfile);
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const titleId = useId();

  if (minimized) {
    return (
      <div className="mascot mascot--minimized">
        <button
          type="button"
          className="mascot__fab"
          onClick={() => setMinimized(false)}
          aria-label="Show Pip, your study buddy"
        >
          <span aria-hidden="true">🌱</span>
        </button>
      </div>
    );
  }

  return (
    <aside
      className={`mascot mascot--${mascot.stage} mascot--mood-${mascot.mood}${open ? ' is-open' : ''}`}
      aria-label={`${mascot.name}: ${mascot.title}`}
    >
      <button
        type="button"
        className="mascot__hit"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="mascot__pulse" aria-hidden="true" />
        <PipSvg stage={mascot.stage} mood={mascot.mood} titleId={titleId} />
        <span className="mascot__badge">{mascot.name}</span>
      </button>

      {open ? (
        <div className="mascot__card" role="dialog" aria-label="Pip status">
          <div className="mascot__card-top">
            <strong>{mascot.title}</strong>
            <button
              type="button"
              className="mascot__icon-btn"
              onClick={() => setMinimized(true)}
              aria-label="Hide Pip"
            >
              ×
            </button>
          </div>
          <p className="mascot__tip">{mascot.tip}</p>
          <ul className="mascot__stats">
            <li>
              <span>Streak</span>
              <strong>{mascot.streak}d</strong>
            </li>
            <li>
              <span>Lessons</span>
              <strong>{mascot.lessonsCompleted}</strong>
            </li>
            <li>
              <span>Words</span>
              <strong>{mascot.words}</strong>
            </li>
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
