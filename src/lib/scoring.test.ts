import {
  calculatePercentage,
  meetsThreshold,
  scoreAssessment,
  skillBreakdown,
} from '@/lib/scoring';

describe('scoring', () => {
  it('scores assessments', () => {
    const items = scoreAssessment([
      {
        questionId: '1',
        skill: 'grammar',
        userAnswer: 'hoi',
        acceptedAnswers: ['hoi'],
      },
      {
        questionId: '2',
        skill: 'vocabulary',
        userAnswer: 'wrong',
        acceptedAnswers: ['dag'],
      },
    ]);
    expect(calculatePercentage(items)).toBe(50);
    expect(meetsThreshold(50)).toBe(false);
    expect(meetsThreshold(80)).toBe(true);
    expect(skillBreakdown(items)).toHaveLength(2);
  });
});
