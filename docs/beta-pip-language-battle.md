# Beta: Pip wardrobe + Language Battle

This branch adds Pip cosmetics and a real two-device Dutch Language Battle. The live site on `main` is unchanged until you merge (do not merge until Jen & Ella are happy).

## Branch

`beta/pip-language-battle`

## Architecture choices

| Concern | Choice |
|--------|--------|
| Progress / cosmetics | Same `localStorage` profiles (`samen-nederlands-state`). Cosmetics unlock from existing milestones; awarded once via `awardedMilestones`. |
| Cross-device cosmetics | Device-local unless you Export/Import JSON on Progress (same as lessons). Battle rooms send each player’s Pip look so the opponent still sees equipped items. |
| Multiplayer | **Firebase Realtime Database** — room state, deadlines, HP, answers. Clients submit a **choice index**; a transaction grades against stored `correctIndexes` (not a client “I was correct” flag). |
| Guest identities | `sessionStorage` battle player id per browser/tab — two devices (or two tabs) are always two players, even with the same profile name. |
| Questions | Multiple-choice from curriculum + vocabulary MC generated from the existing vocab lists. Validated: 4 distinct options, one correct answer. |
| Battles vs learning | Match results do **not** change lesson progress or farm cosmetics. |

## Firebase setup (required for live multiplayer)

1. Create a free Firebase project at https://console.firebase.google.com/
2. Add a **Web** app; copy the config.
3. Create a **Realtime Database** (start in test mode briefly, then deploy rules below).
4. Copy `.env.example` → `.env.local` and fill:

```
VITE_FIREBASE_API_KEY=…
VITE_FIREBASE_AUTH_DOMAIN=….firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://….firebaseio.com
VITE_FIREBASE_PROJECT_ID=…
VITE_FIREBASE_STORAGE_BUCKET=….appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=…
VITE_FIREBASE_APP_ID=…
```

5. Deploy rules from `firebase/database.rules.json` (Firebase Console → Realtime Database → Rules, or Firebase CLI).
6. In Firebase Console → Realtime Database → Rules, ensure reads/writes under `battles/` match the file. Spark (free) plan is enough for a family beta.

**Important:** Never commit `.env.local` or service-account JSON. Web API keys are expected to be public in the client bundle; security comes from database rules.

### Free-tier notes

- Spark plan Realtime Database: generous for two-player beta traffic.
- If you later need Cloud Functions for stricter anti-cheat, that requires Blaze (still usually $0 at this scale).

## Preview URL (without touching live Pages)

GitHub Pages only deploys from `main` today. For this beta:

### Option A — Firebase Hosting channel (recommended)

```bash
npm i -g firebase-tools
firebase login
firebase experiments:enable webframeworks   # only if prompted
# Create firebase.json hosting pointing at dist, then:
npm run build
firebase hosting:channel:deploy pip-battle
```

That prints a unique HTTPS URL for phone + computer testing.

### Option B — GitHub Actions beta workflow

Push this branch. Workflow `.github/workflows/deploy-beta.yml` builds the branch and, **if** repository secrets `VITE_FIREBASE_*` are set, builds with multiplayer enabled and uploads a Pages artifact named `beta-dist`. To publish an isolated URL, use Firebase Hosting (Option A) or a second project — do **not** point the main Pages environment at this branch.

### Option C — Local verification

```bash
npm install
cp .env.example .env.local   # fill Firebase values
npm run dev
```

Open the printed URL on computer + phone (same Wi‑Fi / tunnel as needed).

## Manual two-device walkthrough

1. Open the beta URL on your **computer**; finish onboarding if needed; pick Ella or Jen.
2. Open **Pip** (wardrobe) — preview/equip anything unlocked; locked items show milestones.
3. Open **Battle** → enter a display name → **Create private room**.
4. Copy the room code (or invite link).
5. On your **phone**, open the same beta URL in a fresh browser (or private tab). Use the other profile or the same name — battle guest ids differ per browser.
6. **Join** with the code. Confirm both customized Pips in the lobby.
7. Host sets Beginner or Intermediate; both tap **Ready**; host taps **Start**.
8. After countdown, answer the shared MC question within 10s. Confirm the other “Answered” indicator without seeing their choice.
9. Read the reveal explanation; wait for the next synced question.
10. Test wrong answer, timeout, refresh mid-match (should reconnect to the same seat), and leaving.

## Automated tests covered

- Round HP / draw / question-limit rules (`engine.test.ts`)
- Late answers rejected (`gradeChoice`)
- Cosmetic one-time unlocks (`cosmetics.test.ts`)
- Question bank validation + unique picks (`questions.test.ts`)

## Still incomplete / honest limits

- Preview HTTPS URL depends on you completing Firebase (and optionally Hosting channel). Until `VITE_FIREBASE_*` is set, the Battle page shows setup instructions instead of claiming multiplayer works.
- RTDB rules allow room updates for the beta; a determined cheater with the web config could tamper. Fine for Jen/Ella; harden with Cloud Functions before a public launch.
- Correct indexes are stored on the room for authoritative grading (curriculum answers are already in the JS bundle anyway).
