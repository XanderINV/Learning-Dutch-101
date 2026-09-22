import { checkAnswer, normalizeAnswer } from '@/lib/answers';

describe('normalizeAnswer', () => {
  it('trims and collapses spaces', () => {
    expect(normalizeAnswer('  hallo   wereld  ')).toBe('hallo wereld');
  });

  it('normalizes curly apostrophes', () => {
    expect(normalizeAnswer("'s ochtends")).toBe("'s ochtends");
    expect(normalizeAnswer('\u2019s ochtends')).toBe("'s ochtends");
  });

  it('preserves umlauts', () => {
    expect(normalizeAnswer('Geïnteresseerd')).toBe('geïnteresseerd');
  });
});

describe('checkAnswer', () => {
  it('matches accepted Dutch answers fairly', () => {
    expect(checkAnswer('  Hoi! ', ['hoi'])).toBe(true);
    expect(checkAnswer('dag', ['Hallo'])).toBe(false);
  });
});
