import type { Profile } from '@/lib/storage';
import { modules } from '@/content/curriculum';

export type MascotStage =
  | 'hatchling'
  | 'sprout'
  | 'explorer'
  | 'streaker'
  | 'champion';

export type MascotMood = 'sleepy' | 'curious' | 'happy' | 'proud' | 'lonely';

export type MascotState = {
  name: string;
  stage: MascotStage;
  mood: MascotMood;
  title: string;
  tip: string;
  lessonsCompleted: number;
  streak: number;
  words: number;
  lessonRatio: number;
};

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysSince(iso: string | null): number | null {
  if (!iso) return null;
  const a = new Date(`${iso}T12:00:00`);
  const b = new Date(`${todayIso()}T12:00:00`);
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

export function getMascotState(profile: Profile): MascotState {
  const lessonsCompleted = profile.progress.lessons.length;
  const totalLessons = Math.max(
    1,
    modules.reduce((n, m) => n + m.lessons.length, 0),
  );
  const lessonRatio = lessonsCompleted / totalLessons;
  const streak = profile.streak.current;
  const words = profile.progress.vocabularyLearned.length;
  const gap = daysSince(profile.streak.lastActivityDate);

  let stage: MascotStage = 'hatchling';
  if (lessonsCompleted >= 24 || (lessonRatio >= 0.45 && streak >= 7)) {
    stage = 'champion';
  } else if (streak >= 5 || (lessonsCompleted >= 12 && streak >= 3)) {
    stage = 'streaker';
  } else if (lessonsCompleted >= 5 || words >= 30) {
    stage = 'explorer';
  } else if (lessonsCompleted >= 1 || words >= 5) {
    stage = 'sprout';
  }

  let mood: MascotMood = 'curious';
  if (gap != null && gap >= 2) {
    mood = 'lonely';
  } else if (stage === 'champion' || (streak >= 7 && lessonsCompleted >= 10)) {
    mood = 'proud';
  } else if (streak >= 3 || lessonsCompleted >= 4) {
    mood = 'happy';
  } else if (lessonsCompleted === 0) {
    mood = 'sleepy';
  }

  const titles: Record<MascotStage, string> = {
    hatchling: 'Tiny Pip is waking up',
    sprout: 'Pip is sprouting',
    explorer: 'Pip the explorer',
    streaker: 'Pip on a roll',
    champion: 'Champion Pip',
  };

  let tip =
    'Finish a short lesson today and Pip grows a little stronger.';
  if (mood === 'lonely') {
    tip = 'Pip missed you. One quick review brings the sparkle back.';
  } else if (stage === 'hatchling') {
    tip = 'Start your first lesson — Pip hatches with you.';
  } else if (stage === 'sprout') {
    tip = 'Keep going: a few more lessons unlock explorer mode.';
  } else if (stage === 'explorer') {
    tip = 'Build a streak of 3+ days to unlock Pip’s warm scarf.';
  } else if (stage === 'streaker') {
    tip = 'Stay consistent — champion form needs progress and streak.';
  } else if (stage === 'champion') {
    tip = 'Pip is thriving. Keep the streak alive to stay proud.';
  }

  return {
    name: 'Pip',
    stage,
    mood,
    title: titles[stage],
    tip,
    lessonsCompleted,
    streak,
    words,
    lessonRatio,
  };
}
