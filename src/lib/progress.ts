import type { CefrLevel, Module } from '@/content/types';
import type {
  AppStorageState,
  LessonProgressEntry,
  Profile,
  ProfileProgress,
} from '@/lib/storage';

const LEVEL_ORDER: CefrLevel[] = ['pre-a1', 'a1', 'a2', 'b1'];

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function isConsecutiveDay(prev: string, next: string): boolean {
  const a = new Date(prev + 'T12:00:00');
  const b = new Date(next + 'T12:00:00');
  const diff = (b.getTime() - a.getTime()) / 86_400_000;
  return diff === 1;
}

export function updateStreak(profile: Profile, activityDate = todayIso()): Profile {
  const { streak } = profile;
  if (!streak.lastActivityDate) {
    return {
      ...profile,
      streak: {
        current: 1,
        longest: Math.max(1, streak.longest),
        lastActivityDate: activityDate,
      },
    };
  }
  if (streak.lastActivityDate === activityDate) {
    return profile;
  }
  const current = isConsecutiveDay(streak.lastActivityDate, activityDate)
    ? streak.current + 1
    : 1;
  return {
    ...profile,
    streak: {
      current,
      longest: Math.max(streak.longest, current),
      lastActivityDate: activityDate,
    },
  };
}

export function getModulesForLevel(modules: Module[], level: CefrLevel): Module[] {
  return modules.filter((m) => m.level === level).sort((a, b) => a.order - b.order);
}

export function unlockModulesForLevel(
  progress: ProfileProgress,
  modules: Module[],
  level: CefrLevel,
): ProfileProgress {
  const levelModules = getModulesForLevel(modules, level);
  const moduleMap = new Map(progress.modules.map((m) => [m.moduleId, m]));

  levelModules.forEach((mod, index) => {
    const existing = moduleMap.get(mod.id);
    const prevComplete =
      index === 0 ||
      (() => {
        const prev = levelModules[index - 1]!;
        const prevEntry = moduleMap.get(prev.id);
        return (
          prevEntry != null &&
          prev.lessons.every((l) => prevEntry.lessonsCompleted.includes(l.id))
        );
      })();

    const unlocked = index === 0 ? true : prevComplete;
    moduleMap.set(mod.id, {
      moduleId: mod.id,
      unlocked: existing?.unlocked ?? unlocked,
      lessonsCompleted: existing?.lessonsCompleted ?? [],
    });
  });

  return { ...progress, modules: [...moduleMap.values()] };
}

export function isLessonUnlocked(
  progress: ProfileProgress,
  module: Module,
  lessonIndex: number,
): boolean {
  const modProgress = progress.modules.find((m) => m.moduleId === module.id);
  if (!modProgress?.unlocked) return false;
  if (lessonIndex === 0) return true;
  const prevLesson = module.lessons[lessonIndex - 1];
  if (!prevLesson) return false;
  return modProgress.lessonsCompleted.includes(prevLesson.id);
}

export type LessonCompleteInput = {
  moduleId: string;
  lessonId: string;
  vocabularyIds?: string[];
  score?: number;
};

export function updateLessonProgress(
  profile: Profile,
  modules: Module[],
  input: LessonCompleteInput,
): Profile {
  const module = modules.find((m) => m.id === input.moduleId);
  if (!module) return profile;

  let progress = unlockModulesForLevel(profile.progress, modules, module.level);
  const modIndex = progress.modules.findIndex((m) => m.moduleId === input.moduleId);
  const modEntry =
    modIndex >= 0
      ? progress.modules[modIndex]!
      : { moduleId: input.moduleId, unlocked: true, lessonsCompleted: [] };

  if (!modEntry.lessonsCompleted.includes(input.lessonId)) {
    modEntry.lessonsCompleted = [...modEntry.lessonsCompleted, input.lessonId];
  }

  const modulesCopy = [...progress.modules];
  if (modIndex >= 0) {
    modulesCopy[modIndex] = modEntry;
  } else {
    modulesCopy.push(modEntry);
  }

  const lessonEntry: LessonProgressEntry = {
    moduleId: input.moduleId,
    lessonId: input.lessonId,
    completedAt: new Date().toISOString(),
    score: input.score,
  };
  const lessons = progress.lessons.some(
    (l) => l.moduleId === input.moduleId && l.lessonId === input.lessonId,
  )
    ? progress.lessons
    : [...progress.lessons, lessonEntry];

  const vocabSet = new Set(progress.vocabularyLearned);
  for (const id of input.vocabularyIds ?? []) {
    vocabSet.add(id);
  }

  progress = {
    ...progress,
    modules: modulesCopy,
    lessons,
    vocabularyLearned: [...vocabSet],
  };

  progress = unlockModulesForLevel(progress, modules, module.level);

  let updated = { ...profile, progress };
  updated = updateStreak(updated);
  return updated;
}

export function countVocabularyLearned(profile: Profile): number {
  return profile.progress.vocabularyLearned.length;
}

export function advanceLevelIfReady(
  profile: Profile,
  modules: Module[],
): Profile {
  const currentIdx = LEVEL_ORDER.indexOf(profile.progress.currentLevel);
  if (currentIdx === -1 || currentIdx >= LEVEL_ORDER.length - 1) {
    return profile;
  }
  const level = profile.progress.currentLevel;
  const levelModules = getModulesForLevel(modules, level);
  if (levelModules.length === 0) return profile;

  const allDone = levelModules.every((mod) => {
    const entry = profile.progress.modules.find((m) => m.moduleId === mod.id);
    return (
      entry != null &&
      mod.lessons.every((l) => entry.lessonsCompleted.includes(l.id))
    );
  });

  if (!allDone) return profile;

  const nextLevel = LEVEL_ORDER[currentIdx + 1]!;
  return {
    ...profile,
    progress: {
      ...profile.progress,
      currentLevel: nextLevel,
    },
  };
}

export function patchProfileInState(
  state: AppStorageState,
  profileId: string,
  updater: (p: Profile) => Profile,
): AppStorageState {
  return {
    ...state,
    profiles: state.profiles.map((p) => (p.id === profileId ? updater(p) : p)),
  };
}
