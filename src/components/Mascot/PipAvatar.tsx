import { useId } from 'react';
import type { MascotMood, MascotStage } from '@/lib/mascot';
import { getPipColorPalette, type EquippedCosmetics } from '@/lib/cosmetics';

export type PipAvatarProps = {
  stage: MascotStage;
  mood: MascotMood;
  equipped?: EquippedCosmetics;
  reaction?: 'idle' | 'correct' | 'wrong' | 'cheer';
  className?: string;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
};

export function PipAvatar({
  stage,
  mood,
  equipped = {},
  reaction = 'idle',
  className = '',
  title = 'Pip the study buddy',
  size = 'md',
}: PipAvatarProps) {
  const titleId = useId();
  const eyeOpen = mood !== 'sleepy';
  const lonely = mood === 'lonely';
  const happy =
    mood === 'happy' ||
    mood === 'proud' ||
    reaction === 'correct' ||
    reaction === 'cheer';
  const proud = mood === 'proud' || stage === 'champion';
  const showLeaf = stage !== 'hatchling';
  const showPack =
    stage === 'explorer' || stage === 'streaker' || stage === 'champion';
  const showScarf = stage === 'streaker' || stage === 'champion';
  const showCrown = stage === 'champion';
  const showSparkles =
    stage === 'streaker' ||
    stage === 'champion' ||
    proud ||
    reaction === 'cheer';

  const hat = equipped.hat;
  const accessory = equipped.accessory;
  const extra = equipped.extra;
  const background = equipped.background;
  const palette = getPipColorPalette(equipped.color);

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

  const sizeClass =
    size === 'sm'
      ? 'pip-avatar--sm'
      : size === 'lg'
        ? 'pip-avatar--lg'
        : 'pip-avatar--md';

  const bgClass =
    background === 'canal-dusk'
      ? ' pip-avatar--canal'
      : background === 'bg-mint'
        ? ' pip-avatar--mint'
        : background === 'bg-tulip-field'
          ? ' pip-avatar--tulips'
          : '';

  const fancyHat =
    hat === 'bike-helmet' ||
    hat === 'orange-beanie' ||
    hat === 'hat-bow' ||
    hat === 'hat-soft-cap';

  return (
    <div
      className={`pip-avatar ${sizeClass} pip-avatar--react-${reaction}${bgClass} ${className}`.trim()}
    >
      <svg
        viewBox="0 0 160 160"
        role="img"
        aria-labelledby={titleId}
        className="pip-avatar__svg"
      >
        <title id={titleId}>{title}</title>
        <defs>
          <radialGradient id={`${titleId}-body`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor={palette.bodyLight} />
            <stop offset="55%" stopColor={palette.bodyMid} />
            <stop offset="100%" stopColor={palette.bodyDark} />
          </radialGradient>
          <radialGradient id={`${titleId}-belly`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={palette.bellyLight} />
            <stop offset="100%" stopColor={palette.bellyDark} />
          </radialGradient>
          <linearGradient id={`${titleId}-canal`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fcd9a8" />
            <stop offset="45%" stopColor="#7eb6c9" />
            <stop offset="100%" stopColor="#1e5f74" />
          </linearGradient>
          <linearGradient id={`${titleId}-mint`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d1fae5" />
            <stop offset="100%" stopColor="#a7f3d0" />
          </linearGradient>
          <linearGradient id={`${titleId}-tulips`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="55%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#f9a8d4" />
          </linearGradient>
          <filter
            id={`${titleId}-soft`}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="3"
              floodColor="#0f1c2e"
              floodOpacity="0.18"
            />
          </filter>
        </defs>

        {background === 'canal-dusk' ? (
          <g aria-hidden="true">
            <rect
              x="8"
              y="8"
              width="144"
              height="144"
              rx="28"
              fill={`url(#${titleId}-canal)`}
            />
            <path
              d="M20 100 L40 70 L55 90 L70 55 L90 85 L110 60 L140 100 Z"
              fill="#0f3d4a"
              opacity="0.55"
            />
            <ellipse
              cx="80"
              cy="118"
              rx="54"
              ry="10"
              fill="#0b4a5c"
              opacity="0.45"
            />
          </g>
        ) : background === 'bg-mint' ? (
          <rect
            x="8"
            y="8"
            width="144"
            height="144"
            rx="28"
            fill={`url(#${titleId}-mint)`}
          />
        ) : background === 'bg-tulip-field' ? (
          <g aria-hidden="true">
            <rect
              x="8"
              y="8"
              width="144"
              height="144"
              rx="28"
              fill={`url(#${titleId}-tulips)`}
            />
            <ellipse cx="40" cy="120" rx="8" ry="14" fill="#e11d48" />
            <ellipse cx="70" cy="115" rx="8" ry="14" fill="#f59e0b" />
            <ellipse cx="100" cy="122" rx="8" ry="14" fill="#ec4899" />
            <ellipse cx="125" cy="118" rx="8" ry="14" fill="#ef4444" />
          </g>
        ) : (
          <ellipse cx="80" cy="138" rx="38" ry="8" fill="rgb(15 28 46 / 12%)" />
        )}

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

          {showCrown && !fancyHat ? (
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

          {hat === 'orange-beanie' ? (
            <g aria-hidden="true">
              <path
                d="M48 58 Q80 28 112 58 L108 70 Q80 58 52 70 Z"
                fill="#ea580c"
                stroke="#9a3412"
                strokeWidth="2"
              />
              <circle cx="80" cy="34" r="6" fill="#fdba74" />
            </g>
          ) : null}

          {hat === 'bike-helmet' ? (
            <g aria-hidden="true">
              <path
                d="M46 62 Q80 24 114 62 L110 72 Q80 58 50 72 Z"
                fill="#1e3a5f"
                stroke="#0f1c2e"
                strokeWidth="2"
              />
              <path d="M52 64 L108 64" stroke="#fbbf24" strokeWidth="3" />
            </g>
          ) : null}

          {hat === 'hat-bow' ? (
            <g aria-hidden="true">
              <path d="M68 40 L80 52 L92 40 L86 56 L74 56 Z" fill="#db2777" />
              <circle cx="80" cy="52" r="5" fill="#9d174d" />
            </g>
          ) : null}

          {hat === 'hat-soft-cap' ? (
            <g aria-hidden="true">
              <ellipse cx="80" cy="48" rx="34" ry="14" fill="#334155" />
              <path d="M46 50 Q80 62 120 50" fill="#1e293b" />
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

          <ellipse
            cx="36"
            cy="96"
            rx="14"
            ry="10"
            fill={`url(#${titleId}-body)`}
            transform="rotate(-18 36 96)"
          />
          <ellipse
            cx="124"
            cy="96"
            rx="14"
            ry="10"
            fill={`url(#${titleId}-body)`}
            transform="rotate(18 124 96)"
          />

          <ellipse
            cx="80"
            cy="92"
            rx="46"
            ry="42"
            fill={`url(#${titleId}-body)`}
            filter={`url(#${titleId}-soft)`}
          />
          <ellipse
            cx="80"
            cy="100"
            rx="28"
            ry="22"
            fill={`url(#${titleId}-belly)`}
          />

          {showScarf ? (
            <g aria-hidden="true">
              <path
                d="M48 86 Q80 102 112 86"
                fill="none"
                stroke="#c2410c"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path d="M98 92 L108 118 L96 114 Z" fill="#ea580c" />
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

          {extra === 'stroopwafel-pack' ? (
            <g aria-hidden="true">
              <ellipse
                cx="34"
                cy="112"
                rx="12"
                ry="9"
                fill="#d97706"
                stroke="#92400e"
                strokeWidth="1.5"
              />
              <path
                d="M26 112 Q34 106 42 112 Q34 118 26 112"
                fill="none"
                stroke="#92400e"
                strokeWidth="1.2"
              />
            </g>
          ) : null}

          {extra === 'clogs-charm' ? (
            <g aria-hidden="true">
              <path
                d="M28 118 Q34 108 48 112 L46 122 Q36 124 28 118"
                fill="#f59e0b"
                stroke="#b45309"
                strokeWidth="1.2"
              />
            </g>
          ) : null}

          {accessory === 'tulip-pin' ? (
            <g aria-hidden="true">
              <path d="M118 78 Q124 68 130 78 Q124 74 118 78" fill="#e11d48" />
              <path d="M124 78 L124 92" stroke="#15803d" strokeWidth="2" />
            </g>
          ) : null}

          {accessory === 'windmill-badge' ? (
            <g aria-hidden="true">
              <circle
                cx="42"
                cy="78"
                r="11"
                fill="#fef3c7"
                stroke="#b45309"
                strokeWidth="1.5"
              />
              <path
                d="M42 78 L42 68 M42 78 L52 78 M42 78 L42 88 M42 78 L32 78"
                stroke="#92400e"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          ) : null}

          {accessory === 'daisy-pin' ? (
            <g aria-hidden="true">
              <circle cx="118" cy="78" r="4" fill="#fbbf24" />
              <circle cx="118" cy="70" r="4" fill="#fff" stroke="#e2e8f0" />
              <circle cx="124" cy="74" r="4" fill="#fff" stroke="#e2e8f0" />
              <circle cx="124" cy="82" r="4" fill="#fff" stroke="#e2e8f0" />
              <circle cx="112" cy="74" r="4" fill="#fff" stroke="#e2e8f0" />
              <circle cx="112" cy="82" r="4" fill="#fff" stroke="#e2e8f0" />
            </g>
          ) : null}

          {accessory === 'glasses-round' ? (
            <g
              aria-hidden="true"
              fill="none"
              stroke="#0f172a"
              strokeWidth="2.5"
            >
              <circle cx="64" cy="84" r="12" />
              <circle cx="96" cy="84" r="12" />
              <path d="M76 84 H84" />
            </g>
          ) : null}

          {eyeOpen ? (
            <g>
              <ellipse
                cx="64"
                cy="84"
                rx="9"
                ry={lonely || reaction === 'wrong' ? 5 : 10}
                fill="#0f1c2e"
              />
              <ellipse
                cx="96"
                cy="84"
                rx="9"
                ry={lonely || reaction === 'wrong' ? 5 : 10}
                fill="#0f1c2e"
              />
              {!lonely && reaction !== 'wrong' ? (
                <>
                  <circle cx="67" cy="81" r="3" fill="#fff" />
                  <circle cx="99" cy="81" r="3" fill="#fff" />
                </>
              ) : null}
            </g>
          ) : (
            <g
              stroke="#0f1c2e"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            >
              <path d="M56 84 Q64 78 72 84" />
              <path d="M88 84 Q96 78 104 84" />
            </g>
          )}

          {happy || proud ? (
            <g aria-hidden="true">
              <ellipse
                cx="52"
                cy="96"
                rx="7"
                ry="4"
                fill="#fb7185"
                opacity="0.55"
              />
              <ellipse
                cx="108"
                cy="96"
                rx="7"
                ry="4"
                fill="#fb7185"
                opacity="0.55"
              />
            </g>
          ) : null}

          {lonely || reaction === 'wrong' ? (
            <path
              d="M72 108 Q80 102 88 108"
              fill="none"
              stroke="#0f1c2e"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ) : happy || proud ? (
            <path d="M68 106 Q80 118 92 106" fill="#0f1c2e" />
          ) : (
            <path
              d="M72 108 Q80 112 88 108"
              fill="none"
              stroke="#0f1c2e"
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}

          <ellipse cx="64" cy="128" rx="12" ry="8" fill={palette.feet} />
          <ellipse cx="96" cy="128" rx="12" ry="8" fill={palette.feet} />
        </g>
      </svg>
    </div>
  );
}
