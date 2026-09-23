import type { Profile } from '@/lib/storage';
import { modules } from '@/content/curriculum';
import { getMascotState } from '@/lib/mascot';

export type CosmeticSlot =
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
  /** Milestone that unlocks this item (awarded once). */
  milestoneId: string;
  unlockLabel: string;
};

export type EquippedCosmetics = Partial<Record<CosmeticSlot, string | null>>;

export type ProfileCosmetics = {
  unlocked: string[];
  equipped: EquippedCosmetics;
  /** Milestone ids already granted — prevents farming on replay/refresh. */
  awardedMilestones: string[];
};

export const COSMETIC_ITEMS: CosmeticItem[] = [
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
    id: 'canal-dusk',
    name: 'Canal dusk',
    description: 'A soft Amsterdam canal backdrop at golden hour.',
    slot: 'background',
    milestoneId: 'lessons-8',
    unlockLabel: 'Complete 8 lessons',
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
    case 'lessons-3':
      return snap.lessonsCompleted >= 3;
    case 'lessons-8':
      return snap.lessonsCompleted >= 8;
    case 'lessons-10':
      return snap.lessonsCompleted >= 10;
    case 'words-15':
      return snap.words >= 15;
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
 * Award newly earned cosmetics once per milestone.
 * Safe to call on every progress mutation / page load — no farming.
 */
export function syncCosmeticUnlocks(profile: Profile): Profile {
  const cosmetics = profile.cosmetics ?? emptyCosmetics();
  const snap = getMilestoneSnapshot(profile);
  const unlocked = new Set(cosmetics.unlocked);
  const awarded = new Set(cosmetics.awardedMilestones);
  let changed = false;

  for (const item of COSMETIC_ITEMS) {
    if (awarded.has(item.milestoneId)) continue;
    if (!isMilestoneMet(item.milestoneId, snap)) continue;
    awarded.add(item.milestoneId);
    unlocked.add(item.id);
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
  if (id === 'speech-goed-bezig') return 'Goed bezig!';
  if (id === 'speech-lekker-bezig') return 'Lekker bezig!';
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
