import type { SkillTag } from '@/content/types';
import { checkAnswer, checkMatchingAnswer, checkOrderedAnswer } from '@/lib/answers';

export type ScoredItem = {
  id: string;
  skill: SkillTag;
  correct: boolean;
};

export type AssessmentResponse = {
  questionId: string;
  skill: SkillTag;
  userAnswer: string;
  userItems?: string[];
  pairs?: { left: string; right: string }[];
  acceptedAnswers?: string[];
  orderItems?: string[];
};

export function scoreItem(response: AssessmentResponse): boolean {
  const { acceptedAnswers = [] } = response;
  if (response.pairs && acceptedAnswers.length > 0) {
    return checkMatchingAnswer(response.pairs, acceptedAnswers);
  }
  if (response.userItems && acceptedAnswers.length > 0) {
    return checkOrderedAnswer(response.userItems, acceptedAnswers);
  }
  return checkAnswer(response.userAnswer, acceptedAnswers);
}

export function scoreAssessment(responses: AssessmentResponse[]): ScoredItem[] {
  return responses.map((r) => ({
    id: r.questionId,
    skill: r.skill,
    correct: scoreItem(r),
  }));
}

export function calculatePercentage(items: ScoredItem[]): number {
  if (items.length === 0) return 0;
  const correct = items.filter((i) => i.correct).length;
  return Math.round((correct / items.length) * 100);
}

export function meetsThreshold(
  percentage: number,
  threshold = 80,
): boolean {
  return percentage >= threshold;
}

export type SkillBreakdownEntry = {
  skill: SkillTag;
  total: number;
  correct: number;
  percentage: number;
};

export function skillBreakdown(items: ScoredItem[]): SkillBreakdownEntry[] {
  const map = new Map<SkillTag, { total: number; correct: number }>();
  for (const item of items) {
    const current = map.get(item.skill) ?? { total: 0, correct: 0 };
    current.total += 1;
    if (item.correct) current.correct += 1;
    map.set(item.skill, current);
  }
  return [...map.entries()]
    .map(([skill, { total, correct }]) => ({
      skill,
      total,
      correct,
      percentage: total === 0 ? 0 : Math.round((correct / total) * 100),
    }))
    .sort((a, b) => a.skill.localeCompare(b.skill));
}
