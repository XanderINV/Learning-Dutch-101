import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getMascotState } from '@/lib/mascot';
import {
  COSMETIC_ITEMS,
  getCosmeticItem,
  getEquippedSpeechLine,
  getMilestoneSnapshot,
  isCosmeticUnlocked,
  isMilestoneMet,
  type CosmeticSlot,
} from '@/lib/cosmetics';
import { useAppState } from '@/state/AppState';
import { PipAvatar } from '@/components/Mascot/PipAvatar';
import { SLOT_LABELS } from '@/components/Mascot/LearningBuddy';

const SLOTS: CosmeticSlot[] = [
  'color',
  'hat',
  'accessory',
  'extra',
  'background',
  'speech',
];

export function WardrobePage() {
  const { activeProfile, syncCosmetics, setEquippedCosmetic } = useAppState();
  const mascot = getMascotState(activeProfile);
  const cosmetics = activeProfile.cosmetics;
  const snap = useMemo(
    () => getMilestoneSnapshot(activeProfile),
    [activeProfile],
  );
  const speech = getEquippedSpeechLine(cosmetics);

  useEffect(() => {
    syncCosmetics();
  }, [syncCosmetics]);

  return (
    <>
      <header className="page-header">
        <p className="eyebrow">Beta · Pip rewards</p>
        <h1>Pip wardrobe</h1>
        <p>
          Unlock looks through real learning milestones. Free starters are ready
          now so you can style Pip before any course. Cosmetics never change
          battle HP or question difficulty — they layer on top of Pip’s current
          evolution.
        </p>
      </header>

      <section className="wardrobe-stage card card--panel" aria-label="Pip preview">
        <PipAvatar
          stage={mascot.stage}
          mood={mascot.mood}
          equipped={cosmetics.equipped}
          size="lg"
          reaction="cheer"
        />
        <div>
          <h2>{mascot.title}</h2>
          {speech ? <p className="mascot__speech">“{speech}”</p> : null}
          <p className="muted">
            Progress stays on this device (same as lessons). Export/import on the
            Progress page to move cosmetics with you.
          </p>
          <div className="btn-row">
            <Link className="btn btn--secondary" to="/home">
              Back home
            </Link>
            <Link className="btn btn--primary" to="/battle">
              Language Battle
            </Link>
          </div>
        </div>
      </section>

      {SLOTS.map((slot) => {
        const items = COSMETIC_ITEMS.filter((i) => i.slot === slot);
        const equippedId = cosmetics.equipped[slot] ?? null;
        return (
          <section
            key={slot}
            className="card card--panel wardrobe-slot"
            aria-labelledby={`slot-${slot}`}
          >
            <div className="wardrobe-slot__head">
              <h2 id={`slot-${slot}`}>{SLOT_LABELS[slot]}</h2>
              <button
                type="button"
                className="btn btn--ghost btn--small"
                disabled={!equippedId}
                onClick={() => setEquippedCosmetic(slot, null)}
              >
                Remove
              </button>
            </div>
            <ul className="wardrobe-grid">
              {items.map((item) => {
                const unlocked = isCosmeticUnlocked(cosmetics, item.id);
                const met = isMilestoneMet(item.milestoneId, snap);
                const equipped = equippedId === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`wardrobe-item${equipped ? ' is-equipped' : ''}${unlocked ? '' : ' is-locked'}`}
                      disabled={!unlocked}
                      onClick={() =>
                        setEquippedCosmetic(slot, equipped ? null : item.id)
                      }
                      aria-pressed={equipped}
                    >
                      <span className="wardrobe-item__name">{item.name}</span>
                      <span className="wardrobe-item__desc">{item.description}</span>
                      {unlocked ? (
                        <span className="wardrobe-item__status">
                          {equipped ? 'Equipped' : 'Unlocked — tap to equip'}
                        </span>
                      ) : (
                        <span className="wardrobe-item__status">
                          Locked · {item.unlockLabel}
                          {met ? ' (syncing…)' : ''}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <section className="card card--panel">
        <h2>Currently equipped</h2>
        <ul className="plain-list">
          {SLOTS.map((slot) => {
            const id = cosmetics.equipped[slot];
            const item = id ? getCosmeticItem(id) : null;
            return (
              <li key={slot}>
                <strong>{SLOT_LABELS[slot]}:</strong>{' '}
                {item ? item.name : 'None'}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
