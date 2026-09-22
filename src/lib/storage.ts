import type { CefrLevel } from '@/content/types';
import type { ReviewItem } from '@/lib/review';
import { createReviewItem } from '@/lib/review';

export const STORAGE_VERSION = 1;
export const STORAGE_KEY = 'samen-nederlands-state';

export type ProfileIcon = 'leaf' | 'bike' | 'book' | 'coffee' | 'windmill' | 'tulip';

export interface LessonProgressEntry {
  moduleId: string;
  lessonId: string;
  completedAt: string;
  score?: number;
}

export interface ModuleProgressEntry {
  moduleId: string;
  unlocked: boolean;
  lessonsCompleted: string[];
}

export interface AssessmentHistoryEntry {
  assessmentId: string;
  takenAt: string;
  percentage: number;
  passed: boolean;
}

export interface StreakState {
  current: number;
  longest: number;
  lastActivityDate: string | null;
}

export interface ProfileSettings {
  slowSpeech: boolean;
  placementLevel: CefrLevel | null;
  onboardingComplete: boolean;
  startPath: 'beginning' | 'placement' | null;
}

export interface ProfileProgress {
  modules: ModuleProgressEntry[];
  lessons: LessonProgressEntry[];
  vocabularyLearned: string[];
  currentLevel: CefrLevel;
}

export interface Profile {
  id: string;
  name: string;
  avatarColor: string;
  icon: ProfileIcon;
  progress: ProfileProgress;
  reviewQueue: ReviewItem[];
  assessmentHistory: AssessmentHistoryEntry[];
  streak: StreakState;
  settings: ProfileSettings;
}

export interface AppStorageState {
  version: number;
  activeProfileId: string;
  profiles: Profile[];
}

const DEFAULT_COLORS = ['#E87722', '#1B4F72', '#2E86AB', '#F4A261'];

function newProfileId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `profile-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createDefaultProfile(name: string, index = 0): Profile {
  const id = newProfileId();
  return {
    id,
    name,
    avatarColor: DEFAULT_COLORS[index % DEFAULT_COLORS.length]!,
    icon: (['leaf', 'bike'] as ProfileIcon[])[index] ?? 'book',
    progress: {
      modules: [],
      lessons: [],
      vocabularyLearned: [],
      currentLevel: 'pre-a1',
    },
    reviewQueue: [],
    assessmentHistory: [],
    streak: { current: 0, longest: 0, lastActivityDate: null },
    settings: {
      slowSpeech: false,
      placementLevel: null,
      onboardingComplete: false,
      startPath: null,
    },
  };
}

export function createDefaultState(): AppStorageState {
  const p1 = createDefaultProfile('Learner 1', 0);
  const p2 = createDefaultProfile('Learner 2', 1);
  return {
    version: STORAGE_VERSION,
    activeProfileId: p1.id,
    profiles: [p1, p2],
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function migrate(raw: unknown): AppStorageState {
  if (!isRecord(raw)) {
    return createDefaultState();
  }
  const version = typeof raw.version === 'number' ? raw.version : 0;
  if (version === STORAGE_VERSION) {
    return raw as unknown as AppStorageState;
  }
  if (version < STORAGE_VERSION) {
    const base = createDefaultState();
    if (Array.isArray(raw.profiles) && raw.profiles.length > 0) {
      base.profiles = raw.profiles as Profile[];
      base.activeProfileId =
        typeof raw.activeProfileId === 'string'
          ? raw.activeProfileId
          : base.profiles[0]!.id;
    }
    base.version = STORAGE_VERSION;
    return base;
  }
  return createDefaultState();
}

export function loadState(): AppStorageState {
  if (typeof localStorage === 'undefined') {
    return createDefaultState();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const fresh = createDefaultState();
      saveState(fresh);
      return fresh;
    }
    const parsed: unknown = JSON.parse(raw);
    const migrated = migrate(parsed);
    if (migrated.version !== (isRecord(parsed) ? parsed.version : undefined)) {
      saveState(migrated);
    }
    return migrated;
  } catch {
    const fresh = createDefaultState();
    saveState(fresh);
    return fresh;
  }
}

export function saveState(state: AppStorageState): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function exportJson(state: AppStorageState): string {
  return JSON.stringify(state, null, 2);
}

export function importJson(json: string): AppStorageState {
  const parsed: unknown = JSON.parse(json);
  const migrated = migrate(parsed);
  saveState(migrated);
  return migrated;
}

export function resetProfile(state: AppStorageState, profileId: string): AppStorageState {
  const index = state.profiles.findIndex((p) => p.id === profileId);
  if (index === -1) return state;
  const name = state.profiles[index]!.name;
  const replacement = createDefaultProfile(name, index);
  replacement.id = profileId;
  const profiles = [...state.profiles];
  profiles[index] = replacement;
  return { ...state, profiles };
}

export function enqueueVocabularyReview(
  profile: Profile,
  vocabularyIds: string[],
): ReviewItem[] {
  const existing = new Set(profile.reviewQueue.map((r) => r.cardId));
  const added = vocabularyIds
    .filter((id) => !existing.has(id))
    .map((id) => createReviewItem(id));
  return [...profile.reviewQueue, ...added];
}
