import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import type { ReviewRating } from '@/lib/review';
import { rateCard } from '@/lib/review';
import {
  advanceLevelIfReady,
  patchProfileInState,
  updateLessonProgress,
} from '@/lib/progress';
import { modules } from '@/content/curriculum';
import {
  equipCosmetic,
  syncCosmeticUnlocks,
  type CosmeticSlot,
} from '@/lib/cosmetics';
import {
  createDefaultState,
  exportJson,
  importJson,
  loadState,
  resetProfile,
  saveState,
  enqueueVocabularyReview,
  type AppStorageState,
  type Profile,
  type ProfileIcon,
} from '@/lib/storage';

type AppContextValue = {
  state: AppStorageState;
  activeProfile: Profile;
  switchProfile: (id: string) => void;
  updateProfileMeta: (
    id: string,
    patch: Partial<Pick<Profile, 'name' | 'avatarColor' | 'icon'>>,
  ) => void;
  completeLesson: (input: {
    moduleId: string;
    lessonId: string;
    vocabularyIds?: string[];
    score?: number;
  }) => void;
  rateReviewCard: (cardId: string, rating: ReviewRating) => void;
  exportData: () => string;
  importData: (json: string) => void;
  resetActiveProfile: () => void;
  updateSettings: (patch: Partial<Profile['settings']>) => void;
  recordAssessment: (entry: Profile['assessmentHistory'][number]) => void;
  syncCosmetics: () => void;
  setEquippedCosmetic: (slot: CosmeticSlot, itemId: string | null) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

let memoryState: AppStorageState = createDefaultState();
const listeners = new Set<() => void>();

function getSnapshot(): AppStorageState {
  return memoryState;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setState(next: AppStorageState): void {
  memoryState = next;
  saveState(next);
  listeners.forEach((l) => l());
}

function initFromStorage(): void {
  memoryState = loadState();
  memoryState = {
    ...memoryState,
    profiles: memoryState.profiles.map(syncCosmeticUnlocks),
  };
  saveState(memoryState);
}

initFromStorage();

export function AppStateProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const activeProfile = useMemo(
    () =>
      state.profiles.find((p) => p.id === state.activeProfileId) ??
      state.profiles[0]!,
    [state],
  );

  const switchProfile = useCallback((id: string) => {
    if (!memoryState.profiles.some((p) => p.id === id)) return;
    setState({ ...memoryState, activeProfileId: id });
  }, []);

  const updateProfileMeta = useCallback(
    (
      id: string,
      patch: Partial<Pick<Profile, 'name' | 'avatarColor' | 'icon'>>,
    ) => {
      setState({
        ...memoryState,
        profiles: memoryState.profiles.map((p) =>
          p.id === id ? { ...p, ...patch } : p,
        ),
      });
    },
    [],
  );

  const completeLesson = useCallback(
    (input: {
      moduleId: string;
      lessonId: string;
      vocabularyIds?: string[];
      score?: number;
    }) => {
      const pid = memoryState.activeProfileId;
      setState(
        patchProfileInState(memoryState, pid, (profile) => {
          let next = updateLessonProgress(profile, modules, input);
          if (input.vocabularyIds?.length) {
            next = {
              ...next,
              reviewQueue: enqueueVocabularyReview(next, input.vocabularyIds),
            };
          }
          next = advanceLevelIfReady(next, modules);
          return syncCosmeticUnlocks(next);
        }),
      );
    },
    [],
  );

  const rateReviewCard = useCallback((cardId: string, rating: ReviewRating) => {
    const pid = memoryState.activeProfileId;
    setState(
      patchProfileInState(memoryState, pid, (profile) =>
        syncCosmeticUnlocks({
          ...profile,
          reviewQueue: profile.reviewQueue.map((item) =>
            item.cardId === cardId ? rateCard(item, rating) : item,
          ),
        }),
      ),
    );
  }, []);

  const exportData = useCallback(() => exportJson(memoryState), []);

  const importData = useCallback((json: string) => {
    setState(importJson(json));
  }, []);

  const resetActiveProfile = useCallback(() => {
    setState(resetProfile(memoryState, memoryState.activeProfileId));
  }, []);

  const updateSettings = useCallback((patch: Partial<Profile['settings']>) => {
    const pid = memoryState.activeProfileId;
    setState(
      patchProfileInState(memoryState, pid, (profile) => ({
        ...profile,
        settings: { ...profile.settings, ...patch },
      })),
    );
  }, []);

  const recordAssessment = useCallback(
    (entry: Profile['assessmentHistory'][number]) => {
      const pid = memoryState.activeProfileId;
      setState(
        patchProfileInState(memoryState, pid, (profile) =>
          syncCosmeticUnlocks({
            ...profile,
            assessmentHistory: [...profile.assessmentHistory, entry],
          }),
        ),
      );
    },
    [],
  );

  const syncCosmetics = useCallback(() => {
    setState({
      ...memoryState,
      profiles: memoryState.profiles.map(syncCosmeticUnlocks),
    });
  }, []);

  const setEquippedCosmetic = useCallback(
    (slot: CosmeticSlot, itemId: string | null) => {
      const pid = memoryState.activeProfileId;
      setState(
        patchProfileInState(memoryState, pid, (profile) => {
          const synced = syncCosmeticUnlocks(profile);
          return {
            ...synced,
            cosmetics: equipCosmetic(synced.cosmetics, itemId, slot),
          };
        }),
      );
    },
    [],
  );

  const value: AppContextValue = {
    state,
    activeProfile,
    switchProfile,
    updateProfileMeta,
    completeLesson,
    rateReviewCard,
    exportData,
    importData,
    resetActiveProfile,
    updateSettings,
    recordAssessment,
    syncCosmetics,
    setEquippedCosmetic,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}

export const PROFILE_ICONS: ProfileIcon[] = [
  'leaf',
  'bike',
  'book',
  'coffee',
  'windmill',
  'tulip',
];
