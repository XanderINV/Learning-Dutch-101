import { useState } from 'react';
import { assessments } from '@/content/curriculum';
import type { AssessmentQuestion } from '@/content/types';
import { ExercisePlayer } from '@/components/ExercisePlayer';
import {
  calculatePercentage,
  meetsThreshold,
  scoreAssessment,
  skillBreakdown,
  type AssessmentResponse,
} from '@/lib/scoring';
import { useAppState } from '@/state/AppState';
import { EmptyState } from '@/components/EmptyState';
import { SkillChart } from '@/components/SkillChart';

function questionToExercise(q: AssessmentQuestion) {
  return {
    ...q,
    moduleId: 'assessment',
    difficulty: q.difficulty,
    explanation: q.explanation,
  };
}

export function AssessmentsPage() {
  const { activeProfile, recordAssessment, updateSettings } = useAppState();
  const [activeId, setActiveId] = useState<string | null>(
    assessments[0]?.id ?? null,
  );
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [finished, setFinished] = useState(false);

  const assessment = assessments.find((a) => a.id === activeId);

  if (assessments.length === 0) {
    return (
      <>
        <header className="page-header">
          <h1>Assessments</h1>
        </header>
        <EmptyState
          title="Placement and level checks"
          description="Assessment content is not published yet. The scoring engine and history tracking are ready."
        />
      </>
    );
  }

  function handleAnswer(q: AssessmentQuestion, result: import('@/components/ExercisePlayer').ExerciseResult) {
    setResponses((prev) => {
      if (prev.some((r) => r.questionId === q.id)) return prev;
      return [
        ...prev,
        {
          questionId: q.id,
          skill: q.skill,
          userAnswer: result.userAnswer,
          acceptedAnswers: q.acceptedAnswers,
          userItems: result.userItems,
          pairs: result.pairs,
        },
      ];
    });
    void result.correct;
  }

  function finish() {
    const scored = scoreAssessment(responses);
    const pct = calculatePercentage(scored);
    if (assessment) {
      recordAssessment({
        assessmentId: assessment.id,
        takenAt: new Date().toISOString(),
        percentage: pct,
        passed: meetsThreshold(pct),
      });
      if (assessment.kind === 'placement' && assessment.targetLevel) {
        updateSettings({ placementLevel: assessment.targetLevel });
      }
    }
    setFinished(true);
  }

  const scored = finished ? scoreAssessment(responses) : [];
  const pct = finished ? calculatePercentage(scored) : 0;

  return (
    <>
      <header className="page-header">
        <h1>Assessments</h1>
        <p>Placement and progress checks — aim for at least 80% to pass.</p>
      </header>
      <label>
        Choose assessment{' '}
        <select value={activeId ?? ''} onChange={(e) => setActiveId(e.target.value)}>
          {assessments.map((a) => (
            <option key={a.id} value={a.id}>
              {a.title}
            </option>
          ))}
        </select>
      </label>
      {assessment && !finished ? (
        <>
          <p>{assessment.description}</p>
          {assessment.questions.map((q) => (
            <ExercisePlayer
              key={q.id}
              exercise={questionToExercise(q)}
              onComplete={(result) => handleAnswer(q, result)}
            />
          ))}
          <button
            type="button"
            className="btn btn--primary"
            disabled={responses.length < assessment.questions.length}
            onClick={finish}
          >
            Submit assessment
          </button>
        </>
      ) : null}
      {finished ? (
        <section className="card">
          <h2>Result: {pct}%</h2>
          <p>{meetsThreshold(pct) ? 'Passed — nice work!' : 'Keep studying and try again.'}</p>
          <SkillChart items={skillBreakdown(scored)} />
        </section>
      ) : null}
      {activeProfile.assessmentHistory.length > 0 ? (
        <section style={{ marginTop: '2rem' }}>
          <h2>History</h2>
          <ul>
            {activeProfile.assessmentHistory.map((h) => (
              <li key={`${h.assessmentId}-${h.takenAt}`}>
                {h.assessmentId}: {h.percentage}% {h.passed ? '✓' : '✗'}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
