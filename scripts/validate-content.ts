import {
  assessments,
  lessonExercises,
  modules,
  vocabulary,
} from '../src/content/curriculum.ts';
import { validateCurriculum } from '../src/lib/validation.ts';

const result = validateCurriculum(modules, vocabulary, assessments, lessonExercises);

if (!result.ok) {
  console.error('Content validation failed:\n');
  for (const err of result.errors) {
    console.error(`  • ${err}`);
  }
  process.exit(1);
}

console.log(
  `Content OK: ${modules.length} modules, ${vocabulary.length} vocabulary, ${assessments.length} assessments, ${lessonExercises.length} lesson exercises`,
);
