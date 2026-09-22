import type { Module } from '@/content/types';
import { createDefaultProfile } from '@/lib/storage';
import { isLessonUnlocked, unlockModulesForLevel, updateLessonProgress } from '@/lib/progress';

const sampleModule: Module = {
  id: 'm1',
  level: 'pre-a1',
  title: 'Test',
  titleNl: 'Test',
  topic: 'greetings',
  grammarFocus: [],
  vocabularyFocus: [],
  skills: ['vocabulary'],
  description: 'desc',
  order: 1,
  lessons: [
    { id: 'l1', title: 'L1', objective: 'o', steps: [] },
    { id: 'l2', title: 'L2', objective: 'o', steps: [] },
  ],
  checkpoint: [],
};

const laterModule: Module = {
  ...sampleModule,
  id: 'm2',
  order: 2,
  lessons: [{ id: 'l1', title: 'L1', objective: 'o', steps: [] }],
  checkpoint: [],
};

describe('progress', () => {
  it('keeps all modules unlocked without prior completion', () => {
    const profile = createDefaultProfile('Test');
    const progress = unlockModulesForLevel(profile.progress, [sampleModule, laterModule]);
    expect(progress.modules.every((m) => m.unlocked)).toBe(true);
    expect(isLessonUnlocked(progress, laterModule, 0)).toBe(true);
  });

  it('still records lesson completion', () => {
    let profile = createDefaultProfile('Test');
    profile = updateLessonProgress(profile, [sampleModule], {
      moduleId: 'm1',
      lessonId: 'l2',
    });
    expect(profile.progress.lessons.some((l) => l.lessonId === 'l2')).toBe(true);
  });
});
