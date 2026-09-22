import {
  createDefaultState,
  importJson,
  loadState,
  resetProfile,
  saveState,
  STORAGE_KEY,
} from '@/lib/storage';

describe('storage profiles', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('keeps two profiles separate on reset', () => {
    const state = createDefaultState();
    state.profiles[0]!.progress.vocabularyLearned = ['a'];
    state.profiles[1]!.progress.vocabularyLearned = ['b'];
    saveState(state);

    const loaded = loadState();
    expect(loaded.profiles[0]!.progress.vocabularyLearned).toEqual(['a']);
    expect(loaded.profiles[1]!.progress.vocabularyLearned).toEqual(['b']);

    const reset = resetProfile(loaded, loaded.profiles[0]!.id);
    expect(reset.profiles[0]!.progress.vocabularyLearned).toEqual([]);
    expect(reset.profiles[1]!.progress.vocabularyLearned).toEqual(['b']);
  });

  it('imports json with migration', () => {
    const state = createDefaultState();
    importJson(JSON.stringify(state));
    expect(localStorage.getItem(STORAGE_KEY)).toBeTruthy();
  });
});
