import { getMascotState } from '@/lib/mascot';
import { createDefaultProfile } from '@/lib/storage';

describe('getMascotState', () => {
  it('starts as a sleepy hatchling', () => {
    const profile = createDefaultProfile('Ella', 0);
    const state = getMascotState(profile);
    expect(state.stage).toBe('hatchling');
    expect(state.mood).toBe('sleepy');
    expect(state.name).toBe('Pip');
  });

  it('becomes a sprout after the first lesson', () => {
    const profile = createDefaultProfile('Jen', 1);
    profile.progress.lessons = [
      {
        moduleId: 'pre-a1-01',
        lessonId: 'pre-a1-01-l1',
        completedAt: new Date().toISOString(),
      },
    ];
    const state = getMascotState(profile);
    expect(state.stage).toBe('sprout');
  });

  it('feels lonely after a long gap', () => {
    const profile = createDefaultProfile('Ella', 0);
    profile.progress.lessons = [
      {
        moduleId: 'pre-a1-01',
        lessonId: 'pre-a1-01-l1',
        completedAt: new Date().toISOString(),
      },
    ];
    profile.streak = {
      current: 1,
      longest: 1,
      lastActivityDate: '2020-01-01',
    };
    const state = getMascotState(profile);
    expect(state.mood).toBe('lonely');
  });

  it('reaches streaker with a solid streak', () => {
    const profile = createDefaultProfile('Jen', 1);
    profile.progress.lessons = Array.from({ length: 6 }, (_, i) => ({
      moduleId: 'pre-a1-01',
      lessonId: `l-${i}`,
      completedAt: new Date().toISOString(),
    }));
    profile.streak = {
      current: 5,
      longest: 5,
      lastActivityDate: new Date().toISOString().slice(0, 10),
    };
    const state = getMascotState(profile);
    expect(state.stage).toBe('streaker');
    expect(['happy', 'proud', 'curious']).toContain(state.mood);
  });
});
