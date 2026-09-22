# Testing

Tests use **Vitest** with **jsdom** (`vite.config.ts`).

## Commands

```bash
npm run test:run    # single run (CI)
npm test            # watch mode
```

## Layout

Tests sit next to implementation:

- `src/lib/*.test.ts` — core logic
- `src/lib/lesson-flow.test.ts` — lesson completion updates progress
- `src/lib/assessment-flow.test.ts` — scoring threshold behaviour

Setup: `src/test/setup.ts` clears `localStorage` before each test.

## What we cover

| Area | Focus |
|------|--------|
| `answers` | Normalization, Dutch-friendly matching |
| `scoring` | Percentages, thresholds, skill breakdown |
| `review` | SM-2-inspired scheduling |
| `storage` | Two profiles, reset isolation, import |
| `progress` | Sequential unlock, lesson completion |
| `validation` | Curriculum error detection |

## CI

GitHub Actions runs `npm run test:run` before build. Keep tests fast and deterministic — no network, no real `speechSynthesis`.

## Adding tests

When adding exercise types or storage fields:

1. Extend validation tests if schema rules change.
2. Add a flow test if user-visible progress behaviour changes.
3. Prefer testing pure functions in `src/lib/` over full React trees unless routing is involved.
