import type { Module } from '@/content/types';
import { createDefaultProfile } from '@/lib/storage';
import { updateLessonProgress } from '@/lib/progress';

const module: Module = {
  id: 'mod-greet',
  level: 'pre-a1',
  title: 'Greetings',
  titleNl: 'Groeten',
  topic: 'daily',
  grammarFocus: [],
  vocabularyFocus: ['v1'],
  skills: ['speaking'],
  description: 'Say hello',
  order: 1,
  lessons: [
    {
      id: 'lesson-1',
      title: 'Hello',
      objective: 'Greet someone',
      steps: [{ type: 'summary', title: 'Done', bullets: ['Hi'] }],
    },
  ],
  checkpoint: [],
};

describe('lesson flow', () => {
  it('completing a lesson updates progress', () => {
    const profile = createDefaultProfile('Learner');
    const updated = updateLessonProgress(profile, [module], {
      moduleId: 'mod-greet',
      lessonId: 'lesson-1',
      vocabularyIds: ['v1'],
    });
    expect(updated.progress.lessons.some((l) => l.lessonId === 'lesson-1')).toBe(true);
    expect(updated.progress.vocabularyLearned).toContain('v1');
    expect(updated.streak.current).toBeGreaterThanOrEqual(1);
  });
});
