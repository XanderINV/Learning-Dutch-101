# Samen Nederlands (`Learning-Dutch-101`)

**Samen Nederlands** is a warm, adult-friendly Dutch learning site: short lessons, spaced review, local progress on your device, and deployment to GitHub Pages.

- **Live site:** https://xanderinv.github.io/Learning-Dutch-101/
- **Brand:** see `src/brand.ts` (rename in one place)

## Stack

- Vite 8 + React 19 + TypeScript
- React Router (`HashRouter` for GitHub Pages)
- Vitest + jsdom for unit tests
- oxlint for linting
- LocalStorage for profiles and progress (`src/lib/storage.ts`)

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm test` | Vitest watch mode |
| `npm run test:run` | CI-friendly test run |
| `npm run lint` | oxlint |
| `npm run typecheck` | `tsc -b --noEmit` |
| `npm run validate:content` | Curriculum validation (exit 1 on errors) |
| `npm run format` | Prettier on `src/` and `scripts/` |

## Project layout

```
src/
  brand.ts              # Product name & tagline
  content/              # Curriculum (types + modules — content team)
  lib/                  # Answers, scoring, review, storage, progress, validation
  state/AppState.tsx    # React context for profiles & mutations
  components/           # UI building blocks
  pages/                # Routes
  styles/               # tokens.css + global.css
scripts/
  validate-content.ts   # npm run validate:content
```

## Content wiring

1. Add modules to `src/content/curriculum.ts` (`modules`, `vocabulary`, `lessonExercises`, `assessments`, `referenceTopics`).
2. Run `npm run validate:content` before committing.
3. The lesson player resolves exercises via `getExerciseById` (checkpoint + `lessonExercises`).

See **`docs/content-guide.md`** for authoring rules.

## Profiles & data

- Two learner profiles per browser; switch in the nav.
- Export / import JSON on the Progress page.
- Reset clears only the active profile.

## Deployment

Push to `main` runs `.github/workflows/deploy.yml`: validate, lint, typecheck, test, build, deploy Pages.

Repository settings: **Settings → Pages → Build and deployment → GitHub Actions**.

`vite.config.ts` sets `base: '/Learning-Dutch-101/'` — change if your repo name differs.

### Beta branch (Pip wardrobe + Language Battle)

See **`docs/beta-pip-language-battle.md`**. Branch `beta/pip-language-battle` is isolated from the live site. Multiplayer needs a free Firebase Realtime Database (env keys in `.env.example`).

## Testing

See **`docs/testing.md`**.

## License

Add a license file if you publish publicly; curriculum sources should be cited in module metadata and `About`.
