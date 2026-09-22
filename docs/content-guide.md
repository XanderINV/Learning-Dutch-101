# Content guide

This document is for authors adding Dutch curriculum under `src/content/`.

## Registration

Export arrays from **`src/content/curriculum.ts`**:

- `modules` — full `Module` objects with lessons and checkpoint exercises
- `vocabulary` — `VocabularyItem[]`
- `lessonExercises` — exercises referenced by `exerciseIds` in lesson steps (not in checkpoint)
- `assessments` — placement and level-end tests
- `referenceTopics` — searchable reference articles

Types live in **`src/content/types.ts`**. Helpers like `exerciseHelpers.ts` and `vocabulary/buildItem.ts` reduce boilerplate.

## IDs

- Use stable, unique string IDs across modules, lessons, exercises, and vocabulary.
- Run `npm run validate:content` — duplicate IDs fail CI.

## Exercises

Every gradable exercise needs:

- `prompt`, `explanation`, `skill`, `difficulty`
- `acceptedAnswers` (array) for auto-graded types
- Type-specific fields: `options`, `orderItems`, `pairs`, `passage`, `audioText`, etc.

Answers are matched with Dutch-aware normalization in `src/lib/answers.ts` (case, spacing, curly apostrophes; accents preserved).

## Lessons

Each lesson has ordered **steps**: `explanation`, `examples`, `vocabulary`, `exercise`, `summary`.

Vocabulary steps list `vocabularyIds` that must exist in `vocabulary`.

## CEFR levels

Use: `pre-a1`, `a1`, `a2`, `b1`.

Modules unlock sequentially within a level when the previous module’s lessons are complete.

## Assessments

- `kind`: `placement` | `level-end` | `mixed`
- Questions reuse exercise shapes; include `level` per question.
- Passing default: **80%** (`src/lib/scoring.ts`).

## Reference topics

Include `keywords` for search on the Resources page and plain-language `content` (Markdown-like paragraphs are fine as plain text).

## Validation

`src/lib/validation.ts` checks duplicates, empty modules, missing answers, invalid levels, and broken vocabulary references.

Fix all errors before merge; CI runs `npm run validate:content` on every push to `main`.
