import type { Profile } from '@/lib/storage';
import { modules } from '@/content/curriculum';
import { getMascotState } from '@/lib/mascot';

export type CosmeticSlot =
  | 'color'
  | 'hat'
  | 'accessory'
  | 'extra'
  | 'background'
  | 'speech';

export type CosmeticItem = {
  id: string;
  name: string;
  description: string;
  slot: CosmeticSlot;
  /** Milestone that unlocks this item (awarded once per item). */
  milestoneId: string;
  unlockLabel: string;
};

export type EquippedCosmetics = Partial<Record<CosmeticSlot, string | null>>;

export type ProfileCosmetics = {
  unlocked: string[];
  equipped: EquippedCosmetics;
  /** Milestone ids already granted — informational; unlocks are tracked per item. */
  awardedMilestones: string[];
};

export type PipColorPalette = {
  bodyLight: string;
  bodyMid: string;
  bodyDark: string;
  bellyLight: string;
  bellyDark: string;
  feet: string;
};

export const PIP_COLOR_PALETTES: Record<string, PipColorPalette> = {
  'color-classic': {
    bodyLight: '#7fd3c7',
    bodyMid: '#2f9e94',
    bodyDark: '#0f6e73',
    bellyLight: '#e8fff8',
    bellyDark: '#b8ebe2',
    feet: '#0b585c',
  },
  'color-sky': {
    bodyLight: '#93c5fd',
    bodyMid: '#3b82f6',
    bodyDark: '#1d4ed8',
    bellyLight: '#eff6ff',
    bellyDark: '#bfdbfe',
    feet: '#1e3a8a',
  },
  'color-tulip': {
    bodyLight: '#fda4af',
    bodyMid: '#f43f5e',
    bodyDark: '#be123c',
    bellyLight: '#fff1f2',
    bellyDark: '#fecdd3',
    feet: '#9f1239',
  },
  'color-dune': {
    bodyLight: '#fcd34d',
    bodyMid: '#d97706',
    bodyDark: '#92400e',
    bellyLight: '#fffbeb',
    bellyDark: '#fde68a',
    feet: '#78350f',
  },
  'color-midnight': {
    bodyLight: '#a5b4fc',
    bodyMid: '#6366f1',
    bodyDark: '#312e81',
    bellyLight: '#eef2ff',
    bellyDark: '#c7d2fe',
    feet: '#1e1b4b',
  },
  'color-orchard': {
    bodyLight: '#86efac',
    bodyMid: '#16a34a',
    bodyDark: '#14532d',
    bellyLight: '#f0fdf4',
    bellyDark: '#bbf7d0',
    feet: '#166534',
  },
  'color-oranje': {
    bodyLight: '#fdba74',
    bodyMid: '#ea580c',
    bodyDark: '#9a3412',
    bellyLight: '#fff7ed',
    bellyDark: '#fed7aa',
    feet: '#7c2d12',
  },
};

export function getPipColorPalette(colorId: string | null | undefined): PipColorPalette {
  if (colorId && PIP_COLOR_PALETTES[colorId]) return PIP_COLOR_PALETTES[colorId]!;
  return PIP_COLOR_PALETTES['color-classic']!;
}

export const COSMETIC_ITEMS: CosmeticItem[] = [
  // ——— Free starters (style Pip before any courses) ———
  {
    id: 'color-classic',
    name: 'Classic teal',
    description: 'Pip’s original mist-teal coat. Free for everyone.',
    slot: 'color',
    milestoneId: 'starter',
    unlockLabel: 'Free starter',
  },
  {
    id: 'hat-bow',
    name: 'Little bow',
    description: 'A tiny ribbon bow — free and cheerful.',
    slot: 'hat',
    milestoneId: 'starter',
    unlockLabel: 'Free starter',
  },
  {
    id: 'hat-soft-cap',
    name: 'Soft cap',
    description: 'A simple flat cap for everyday studying.',
    slot: 'hat',
    milestoneId: 'starter',
    unlockLabel: 'Free starter',
  },
  {
    id: 'glasses-round',
    name: 'Study glasses',
    description: 'Round specs for reading Dutch signs.',
    slot: 'accessory',
    milestoneId: 'starter',
    unlockLabel: 'Free starter',
  },
  {
    id: 'daisy-pin',
    name: 'Daisy pin',
    description: 'A simple white daisy badge.',
    slot: 'accessory',
    milestoneId: 'starter',
    unlockLabel: 'Free starter',
  },
  {
    id: 'bg-mint',
    name: 'Soft mint',
    description: 'A calm mint wash behind Pip.',
    slot: 'background',
    milestoneId: 'starter',
    unlockLabel: 'Free starter',
  },
  {
    id: 'speech-hoi',
    name: '“Hoi!”',
    description: 'A friendly Dutch hello.',
    slot: 'speech',
    milestoneId: 'starter',
    unlockLabel: 'Free starter',
  },

  // ——— Unlockable colours ———
  {
    id: 'color-sky',
    name: 'Sky blue',
    description: 'Bright as a clear Dutch sky.',
    slot: 'color',
    milestoneId: 'lessons-1',
    unlockLabel: 'Complete 1 lesson',
  },
  {
    id: 'color-tulip',
    name: 'Tulip pink',
    description: 'A rosy coat like spring bulbs.',
    slot: 'color',
    milestoneId: 'lessons-5',
    unlockLabel: 'Complete 5 lessons',
  },
  {
    id: 'color-dune',
    name: 'Dune gold',
    description: 'Warm sand tones from the coast.',
    slot: 'color',
    milestoneId: 'words-10',
    unlockLabel: 'Learn 10 vocabulary words',
  },
  {
    id: 'color-orchard',
    name: 'Orchard green',
    description: 'Fresh orchard leaves after rain.',
    slot: 'color',
    milestoneId: 'lessons-12',
    unlockLabel: 'Complete 12 lessons',
  },
  {
    id: 'color-midnight',
    name: 'Midnight indigo',
    description: 'Deep indigo for night study sessions.',
    slot: 'color',
    milestoneId: 'module-1',
    unlockLabel: 'Complete every lesson in one module',
  },
  {
    id: 'color-oranje',
    name: 'Oranje glow',
    description: 'Proud Dutch orange for streak heroes.',
    slot: 'color',
    milestoneId: 'streak-3',
    unlockLabel: 'Reach a 3-day streak',
  },

  // ——— Unlockable gear (existing + a few more) ———
  {
    id: 'orange-beanie',
    name: 'Oranje beanie',
    description: 'A cosy Dutch-orange knit hat for chilly canal mornings.',
    slot: 'hat',
    milestoneId: 'lessons-3',
    unlockLabel: 'Complete 3 lessons',
  },
  {
    id: 'bike-helmet',
    name: 'Fietshelm',
    description: 'Safety first — Pip rides like a true Nederlander.',
    slot: 'hat',
    milestoneId: 'lessons-10',
    unlockLabel: 'Complete 10 lessons',
  },
  {
    id: 'tulip-pin',
    name: 'Tulip pin',
    description: 'A bright tulip badge for your explorer.',
    slot: 'accessory',
    milestoneId: 'words-15',
    unlockLabel: 'Learn 15 vocabulary words',
  },
  {
    id: 'windmill-badge',
    name: 'Windmill badge',
    description: 'A tiny molen that spins with pride.',
    slot: 'accessory',
    milestoneId: 'module-1',
    unlockLabel: 'Complete every lesson in one module',
  },
  {
    id: 'stroopwafel-pack',
    name: 'Stroopwafel pouch',
    description: 'A sweet snack pouch clipped to Pip’s side.',
    slot: 'extra',
    milestoneId: 'words-40',
    unlockLabel: 'Learn 40 vocabulary words',
  },
  {
    id: 'clogs-charm',
    name: 'Klomp charm',
    description: 'Tiny wooden clogs for luck on the road.',
    slot: 'extra',
    milestoneId: 'lessons-6',
    unlockLabel: 'Complete 6 lessons',
  },
  {
    id: 'canal-dusk',
    name: 'Canal dusk',
    description: 'A soft Amsterdam canal backdrop at golden hour.',
    slot: 'background',
    milestoneId: 'lessons-8',
    unlockLabel: 'Complete 8 lessons',
  },
  {
    id: 'bg-tulip-field',
    name: 'Tulip field',
    description: 'Rows of colour under a spring sky.',
    slot: 'background',
    milestoneId: 'words-25',
    unlockLabel: 'Learn 25 vocabulary words',
  },
  {
    id: 'speech-goed-bezig',
    name: '“Goed bezig!”',
    description: 'Pip cheers you on with a classic Dutch pep talk.',
    slot: 'speech',
    milestoneId: 'streak-3',
    unlockLabel: 'Reach a 3-day streak',
  },
  {
    id: 'speech-lekker-bezig',
    name: '“Lekker bezig!”',
    description: 'A warmer cheer for steady learners.',
    slot: 'speech',
    milestoneId: 'streak-5',
    unlockLabel: 'Reach a 5-day streak',
  },
  {
    id: 'speech-super',
    name: '“Super!”',
    description: 'Short and sweet encouragement.',
    slot: 'speech',
    milestoneId: 'lessons-4',
    unlockLabel: 'Complete 4 lessons',
  },
];

const itemById = new Map(COSMETIC_ITEMS.map((item) => [item.id, item]));

export function getCosmeticItem(id: string): CosmeticItem | undefined {
  return itemById.get(id);
}

export function emptyCosmetics(): ProfileCosmetics {
  return { unlocked: [], equipped: {}, awardedMilestones: [] };
}

export type MilestoneSnapshot = {
  lessonsCompleted: number;
  words: number;
  streak: number;
  modulesFullyCompleted: number;
  lessonRatio: number;
};

export function getMilestoneSnapshot(profile: Profile): MilestoneSnapshot {
  const mascot = getMascotState(profile);
  const completedLessonIds = new Set(
    profile.progress.lessons.map((l) => `${l.moduleId}:${l.lessonId}`),
  );
  let modulesFullyCompleted = 0;
  for (const mod of modules) {
    if (mod.lessons.length === 0) continue;
    const done = mod.lessons.every((lesson) =>
      completedLessonIds.has(`${mod.id}:${lesson.id}`),
    );
    if (done) modulesFullyCompleted += 1;
  }
  return {
    lessonsCompleted: mascot.lessonsCompleted,
    words: mascot.words,
    streak: mascot.streak,
    modulesFullyCompleted,
    lessonRatio: mascot.lessonRatio,
  };
}

export function isMilestoneMet(
  milestoneId: string,
  snap: MilestoneSnapshot,
): boolean {
  switch (milestoneId) {
    case 'starter':
      return true;
    case 'lessons-1':
      return snap.lessonsCompleted >= 1;
    case 'lessons-3':
      return snap.lessonsCompleted >= 3;
    case 'lessons-4':
      return snap.lessonsCompleted >= 4;
    case 'lessons-5':
      return snap.lessonsCompleted >= 5;
    case 'lessons-6':
      return snap.lessonsCompleted >= 6;
    case 'lessons-8':
      return snap.lessonsCompleted >= 8;
    case 'lessons-10':
      return snap.lessonsCompleted >= 10;
    case 'lessons-12':
      return snap.lessonsCompleted >= 12;
    case 'words-10':
      return snap.words >= 10;
    case 'words-15':
      return snap.words >= 15;
    case 'words-25':
      return snap.words >= 25;
    case 'words-40':
      return snap.words >= 40;
    case 'module-1':
      return snap.modulesFullyCompleted >= 1;
    case 'streak-3':
      return snap.streak >= 3;
    case 'streak-5':
      return snap.streak >= 5;
    default:
      return false;
  }
}

/**
 * Award newly earned cosmetics once per item.
 * Safe to call on every progress mutation / page load — no farming.
 * Multiple items may share a milestone (e.g. all free starters).
 */
export function syncCosmeticUnlocks(profile: Profile): Profile {
  const cosmetics = profile.cosmetics ?? emptyCosmetics();
  const snap = getMilestoneSnapshot(profile);
  const unlocked = new Set(cosmetics.unlocked);
  const awarded = new Set(cosmetics.awardedMilestones);
  let changed = false;

  for (const item of COSMETIC_ITEMS) {
    if (unlocked.has(item.id)) continue;
    if (!isMilestoneMet(item.milestoneId, snap)) continue;
    unlocked.add(item.id);
    awarded.add(item.milestoneId);
    changed = true;
  }

  if (!changed) {
    if (profile.cosmetics) return profile;
    return { ...profile, cosmetics };
  }

  return {
    ...profile,
    cosmetics: {
      unlocked: [...unlocked],
      equipped: cosmetics.equipped,
      awardedMilestones: [...awarded],
    },
  };
}

export function isCosmeticUnlocked(
  cosmetics: ProfileCosmetics,
  itemId: string,
): boolean {
  return cosmetics.unlocked.includes(itemId);
}

export function equipCosmetic(
  cosmetics: ProfileCosmetics,
  itemId: string | null,
  slot: CosmeticSlot,
): ProfileCosmetics {
  if (itemId === null) {
    return {
      ...cosmetics,
      equipped: { ...cosmetics.equipped, [slot]: null },
    };
  }
  const item = getCosmeticItem(itemId);
  if (!item || item.slot !== slot) return cosmetics;
  if (!isCosmeticUnlocked(cosmetics, itemId)) return cosmetics;
  return {
    ...cosmetics,
    equipped: { ...cosmetics.equipped, [slot]: itemId },
  };
}

export function getEquippedSpeechLine(
  cosmetics: ProfileCosmetics | undefined,
): string | null {
  const id = cosmetics?.equipped.speech;
  if (!id) return null;
  if (id === 'speech-hoi') return 'Hoi!';
  if (id === 'speech-goed-bezig') return 'Goed bezig!';
  if (id === 'speech-lekker-bezig') return 'Lekker bezig!';
  if (id === 'speech-super') return 'Super!';
  return null;
}

/** Compact snapshot sent into battle rooms so the other player sees Pip. */
export type PipBattleLook = {
  stage: string;
  mood: string;
  equipped: EquippedCosmetics;
  speechLine: string | null;
};

export function getPipBattleLook(profile: Profile): PipBattleLook {
  const synced = syncCosmeticUnlocks(profile);
  const mascot = getMascotState(synced);
  const cosmetics = synced.cosmetics ?? emptyCosmetics();
  return {
    stage: mascot.stage,
    mood: mascot.mood,
    equipped: cosmetics.equipped,
    speechLine: getEquippedSpeechLine(cosmetics),
  };
}
