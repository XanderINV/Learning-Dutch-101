import { useEffect, useRef, useState } from 'react';
import type { BattlePhase } from '@/lib/battle/engine';
import {
  isBattleSfxMuted,
  playCorrectSound,
  playNextQuestionWarn,
  playTestBeep,
  playTickSound,
  playWrongSound,
  setBattleSfxMuted,
  unlockBattleAudio,
} from '@/lib/battle/sounds';

type Options = {
  phase: BattlePhase | undefined;
  secondsLeft: number | null;
  /** Whether *you* got the round right (only meaningful in reveal). */
  myCorrect: boolean | null | undefined;
  roundIndex: number | undefined;
};

/**
 * Plays correct/wrong on reveal, ticks in the last seconds of answering,
 * and a warn chime as the next question is about to load.
 */
export function useBattleSounds({
  phase,
  secondsLeft,
  myCorrect,
  roundIndex,
}: Options): {
  muted: boolean;
  toggleMute: () => void;
  unlock: () => void;
} {
  const [muted, setMuted] = useState(() => isBattleSfxMuted());
  const lastTickSec = useRef<number | null>(null);
  const lastRevealSoundKey = useRef<string | null>(null);
  const lastWarnSec = useRef<number | null>(null);

  useEffect(() => {
    if (phase !== 'reveal' || myCorrect == null || roundIndex == null) return;
    const key = `${roundIndex}:${myCorrect}`;
    if (lastRevealSoundKey.current === key) return;
    lastRevealSoundKey.current = key;
    if (myCorrect) playCorrectSound();
    else playWrongSound();
  }, [phase, myCorrect, roundIndex]);

  useEffect(() => {
    if (secondsLeft == null) {
      lastTickSec.current = null;
      lastWarnSec.current = null;
      return;
    }

    if (phase === 'answering' && secondsLeft <= 3 && secondsLeft >= 1) {
      if (lastTickSec.current !== secondsLeft) {
        lastTickSec.current = secondsLeft;
        playTickSound(secondsLeft === 1);
      }
    } else if (phase !== 'answering') {
      lastTickSec.current = null;
    }

    // Reveal: warn as next question approaches (last 3 seconds).
    if (phase === 'reveal' && secondsLeft <= 3 && secondsLeft >= 1) {
      if (lastWarnSec.current !== secondsLeft) {
        lastWarnSec.current = secondsLeft;
        if (secondsLeft === 3) playNextQuestionWarn();
        else playTickSound(secondsLeft === 1);
      }
    } else if (phase !== 'reveal') {
      lastWarnSec.current = null;
    }

    // Match start countdown ticks.
    if (phase === 'countdown' && secondsLeft <= 3 && secondsLeft >= 1) {
      if (lastTickSec.current !== secondsLeft) {
        lastTickSec.current = secondsLeft;
        playTickSound(secondsLeft === 1);
      }
    }
  }, [phase, secondsLeft]);

  const toggleMute = () => {
    const next = !muted;
    setBattleSfxMuted(next);
    setMuted(next);
    if (!next) {
      void unlockBattleAudio().then(() => playTestBeep());
    }
  };

  const unlock = () => {
    void unlockBattleAudio();
  };

  return { muted, toggleMute, unlock };
}
