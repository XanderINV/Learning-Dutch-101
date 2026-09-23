/**
 * Lightweight battle SFX via Web Audio (no media files).
 * iOS/Safari need unlock from a real tap — call unlockBattleAudio() from Ready/answer.
 */

let ctx: AudioContext | null = null;
let muted = false;
let unlocked = false;

const MUTE_KEY = 'samen-battle-sfx-muted';

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

export function isBattleSfxMuted(): boolean {
  if (typeof sessionStorage === 'undefined') return muted;
  return sessionStorage.getItem(MUTE_KEY) === '1';
}

export function setBattleSfxMuted(next: boolean): void {
  muted = next;
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(MUTE_KEY, next ? '1' : '0');
  }
}

/** Call from a button/touch gesture so mobile browsers allow later beeps. */
export async function unlockBattleAudio(): Promise<boolean> {
  muted = isBattleSfxMuted();
  const audio = getCtx();
  if (!audio) return false;
  try {
    if (audio.state === 'suspended') {
      await audio.resume();
    }
    // Silent buffer primes iOS audio routing.
    const buffer = audio.createBuffer(1, 1, 22050);
    const source = audio.createBufferSource();
    source.buffer = buffer;
    source.connect(audio.destination);
    source.start(0);
    unlocked = audio.state === 'running';
    return unlocked;
  } catch {
    return false;
  }
}

function mobileBoost(): number {
  if (typeof navigator === 'undefined') return 1;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 1.8 : 1;
}

function tone(
  frequency: number,
  durationSec: number,
  options: {
    type?: OscillatorType;
    gain?: number;
    when?: number;
    slideTo?: number;
  } = {},
): void {
  if (muted || isBattleSfxMuted()) return;
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === 'suspended') {
    void audio.resume();
  }
  const start = options.when ?? audio.currentTime;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = options.type ?? 'sine';
  osc.frequency.setValueAtTime(frequency, start);
  if (options.slideTo != null) {
    osc.frequency.linearRampToValueAtTime(options.slideTo, start + durationSec);
  }
  const peak = (options.gain ?? 0.12) * mobileBoost();
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(Math.min(peak, 0.28), start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + durationSec);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(start);
  osc.stop(start + durationSec + 0.02);
}

export function playCorrectSound(): void {
  muted = isBattleSfxMuted();
  const audio = getCtx();
  if (!audio || muted) return;
  void unlockBattleAudio();
  const t = audio.currentTime;
  tone(523.25, 0.14, { gain: 0.14, when: t });
  tone(659.25, 0.16, { gain: 0.14, when: t + 0.1 });
  tone(783.99, 0.24, { gain: 0.16, when: t + 0.2 });
}

export function playWrongSound(): void {
  muted = isBattleSfxMuted();
  const audio = getCtx();
  if (!audio || muted) return;
  void unlockBattleAudio();
  const t = audio.currentTime;
  tone(220, 0.2, { type: 'triangle', gain: 0.12, when: t, slideTo: 160 });
  tone(160, 0.24, { type: 'triangle', gain: 0.1, when: t + 0.12, slideTo: 110 });
}

export function playTickSound(urgent = false): void {
  muted = isBattleSfxMuted();
  void unlockBattleAudio();
  tone(urgent ? 920 : 700, urgent ? 0.09 : 0.06, {
    type: 'square',
    gain: urgent ? 0.1 : 0.07,
  });
}

export function playNextQuestionWarn(): void {
  muted = isBattleSfxMuted();
  const audio = getCtx();
  if (!audio || muted) return;
  void unlockBattleAudio();
  const t = audio.currentTime;
  tone(440, 0.1, { gain: 0.1, when: t });
  tone(554.37, 0.12, { gain: 0.11, when: t + 0.09 });
}

/** Audible confirmation after user enables sound (helps verify phone audio). */
export function playTestBeep(): void {
  muted = false;
  setBattleSfxMuted(false);
  void unlockBattleAudio().then(() => {
    playTickSound(true);
  });
}

export function isBattleAudioUnlocked(): boolean {
  return unlocked && getCtx()?.state === 'running';
}
