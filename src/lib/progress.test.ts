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

describe('progress', () => {
  it('unlocks lessons sequentially', () => {
    let profile = createDefaultProfile('Test');
    profile = updateLessonProgress(profile, [sampleModule], {
      moduleId: 'm1',
      lessonId: 'l1',
    });
    const progress = unlockModulesForLevel(profile.progress, [sampleModule], 'pre-a1');
    expect(isLessonUnlocked(progress, sampleModule, 1)).toBe(true);
  });
});
