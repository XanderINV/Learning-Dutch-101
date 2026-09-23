import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getMascotState } from '@/lib/mascot';
import {
  COSMETIC_ITEMS,
  getEquippedSpeechLine,
  type CosmeticSlot,
} from '@/lib/cosmetics';
import { useAppState } from '@/state/AppState';
import { PipAvatar } from '@/components/Mascot/PipAvatar';

const SLOT_LABELS: Record<CosmeticSlot, string> = {
  hat: 'Hats',
  accessory: 'Accessories',
  extra: 'Extras',
  background: 'Backgrounds',
  speech: 'Cheer lines',
};

export function LearningBuddy() {
  const { activeProfile } = useAppState();
  const mascot = getMascotState(activeProfile);
  const cosmetics = activeProfile.cosmetics;
  const speech = getEquippedSpeechLine(cosmetics);
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

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
        <PipAvatar
          stage={mascot.stage}
          mood={mascot.mood}
          equipped={cosmetics.equipped}
          size="md"
          className="mascot__pip"
        />
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
          {speech ? <p className="mascot__speech">“{speech}”</p> : null}
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
          <Link className="btn btn--secondary btn--small" to="/wardrobe">
            Pip wardrobe
          </Link>
        </div>
      ) : null}
    </aside>
  );
}

export function WardrobePreviewNote() {
  return (
    <p className="muted">
      Cosmetics unlock from learning milestones and stay on this device with your
      progress. Equip items in each slot — evolution stages still grow as you
      learn.
    </p>
  );
}

export { SLOT_LABELS, COSMETIC_ITEMS };
