import { validateCurriculum } from '@/lib/validation';

describe('validateCurriculum', () => {
  it('accepts a minimal valid curriculum', () => {
    expect(
      validateCurriculum(
        [
          {
            id: 'm1',
            level: 'a1',
            title: 'T',
            titleNl: 'T',
            topic: 't',
            grammarFocus: [],
            vocabularyFocus: [],
            skills: ['vocabulary'],
            description: 'd',
            order: 1,
            lessons: [
              {
                id: 'l1',
                title: 'L',
                objective: 'o',
                steps: [{ type: 'summary', title: 'S', bullets: ['b'] }],
              },
            ],
            checkpoint: [
              {
                id: 'e1',
                moduleId: 'm1',
                type: 'multiple-choice',
                prompt: 'p',
                options: ['a', 'b'],
                acceptedAnswers: ['a'],
                explanation: 'e',
                skill: 'vocabulary',
                difficulty: 1,
              },
            ],
          },
        ],
        [],
        [],
      ).ok,
    ).toBe(true);
  });

  it('flags empty module list', () => {
    expect(validateCurriculum([], [], []).ok).toBe(false);
  });

  it('flags duplicate vocabulary ids', () => {
    const result = validateCurriculum(
      [
        {
          id: 'm1',
          level: 'a1',
          title: 'T',
          titleNl: 'T',
          topic: 't',
          grammarFocus: [],
          vocabularyFocus: [],
          skills: ['vocabulary'],
          description: 'd',
          order: 1,
          lessons: [
            {
              id: 'l1',
              title: 'L',
              objective: 'o',
              steps: [{ type: 'summary', title: 'S', bullets: ['b'] }],
            },
          ],
          checkpoint: [
            {
              id: 'e1',
              moduleId: 'm1',
              type: 'multiple-choice',
              prompt: 'p',
              options: ['a', 'b'],
              acceptedAnswers: ['a'],
              explanation: 'e',
              skill: 'vocabulary',
              difficulty: 1,
            },
          ],
        },
      ],
      [
        {
          id: 'dup',
          dutch: 'a',
          english: 'a',
          wordType: 'noun',
          level: 'a1',
          topic: 't',
          exampleNl: 'nl',
          exampleEn: 'en',
        },
        {
          id: 'dup',
          dutch: 'b',
          english: 'b',
          wordType: 'noun',
          level: 'a1',
          topic: 't',
          exampleNl: 'nl',
          exampleEn: 'en',
        },
      ],
      [],
    );
    expect(result.ok).toBe(false);
    expect(result.errors.some((e) => e.includes('Duplicate'))).toBe(true);
  });
});
