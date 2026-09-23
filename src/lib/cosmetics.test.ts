import { describe, expect, it } from 'vitest';
import {
  COSMETIC_ITEMS,
  emptyCosmetics,
  equipCosmetic,
  isMilestoneMet,
  syncCosmeticUnlocks,
} from '@/lib/cosmetics';
import { createDefaultProfile } from '@/lib/storage';

describe('cosmetics unlocks', () => {
  it('awards each milestone only once', () => {
    const profile = createDefaultProfile('Ella', 0);
    profile.progress.lessons = [
      { moduleId: 'a', lessonId: '1', completedAt: '2026-01-01' },
      { moduleId: 'a', lessonId: '2', completedAt: '2026-01-01' },
      { moduleId: 'a', lessonId: '3', completedAt: '2026-01-01' },
    ];
    const once = syncCosmeticUnlocks(profile);
    expect(once.cosmetics.unlocked).toContain('orange-beanie');
    const awardedCount = once.cosmetics.awardedMilestones.length;
    const twice = syncCosmeticUnlocks(once);
    expect(twice.cosmetics.awardedMilestones.length).toBe(awardedCount);
    expect(twice.cosmetics.unlocked).toEqual(once.cosmetics.unlocked);
  });

  it('does not equip locked items', () => {
    const cosmetics = emptyCosmetics();
    const next = equipCosmetic(cosmetics, 'bike-helmet', 'hat');
    expect(next.equipped.hat).toBeUndefined();
  });

  it('equips and removes unlocked items', () => {
    let cosmetics = emptyCosmetics();
    cosmetics = {
      ...cosmetics,
      unlocked: ['orange-beanie'],
      awardedMilestones: ['lessons-3'],
    };
    cosmetics = equipCosmetic(cosmetics, 'orange-beanie', 'hat');
    expect(cosmetics.equipped.hat).toBe('orange-beanie');
    cosmetics = equipCosmetic(cosmetics, null, 'hat');
    expect(cosmetics.equipped.hat).toBeNull();
  });

  it('maps milestones to learning progress', () => {
    expect(
      isMilestoneMet('words-15', {
        lessonsCompleted: 0,
        words: 15,
        streak: 0,
        modulesFullyCompleted: 0,
        lessonRatio: 0,
      }),
    ).toBe(true);
    expect(
      isMilestoneMet('streak-5', {
        lessonsCompleted: 20,
        words: 40,
        streak: 4,
        modulesFullyCompleted: 1,
        lessonRatio: 0.5,
      }),
    ).toBe(false);
  });

  it('defines a small polished wardrobe set', () => {
    expect(COSMETIC_ITEMS.length).toBeGreaterThanOrEqual(6);
    expect(COSMETIC_ITEMS.every((i) => i.unlockLabel.length > 0)).toBe(true);
  });
});
