import {
  calculatePercentage,
  meetsThreshold,
  scoreAssessment,
} from '@/lib/scoring';

describe('assessment flow', () => {
  it('passes when threshold met', () => {
    const scored = scoreAssessment([
      {
        questionId: 'q1',
        skill: 'reading',
        userAnswer: 'antwoord',
        acceptedAnswers: ['antwoord'],
      },
      {
        questionId: 'q2',
        skill: 'grammar',
        userAnswer: 'is',
        acceptedAnswers: ['is'],
      },
      {
        questionId: 'q3',
        skill: 'vocabulary',
        userAnswer: 'ja',
        acceptedAnswers: ['ja'],
      },
      {
        questionId: 'q4',
        skill: 'listening',
        userAnswer: 'nee',
        acceptedAnswers: ['nee'],
      },
      {
        questionId: 'q5',
        skill: 'writing',
        userAnswer: 'x',
        acceptedAnswers: ['y'],
      },
    ]);
    const pct = calculatePercentage(scored);
    expect(pct).toBe(80);
    expect(meetsThreshold(pct)).toBe(true);
  });
});
