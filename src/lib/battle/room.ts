import {
  get,
  onDisconnect,
  onValue,
  ref,
  runTransaction,
  set,
  update,
  type Unsubscribe,
} from 'firebase/database';
import type { PipBattleLook } from '@/lib/cosmetics';
import {
  BATTLE_COUNTDOWN_SECONDS,
  BATTLE_MAX_ROUNDS,
  BATTLE_REVEAL_SECONDS,
  BATTLE_ROUND_SECONDS,
  BATTLE_START_HP,
  emptyAnswer,
  generateRoomCode,
  gradeChoice,
  hasSubmitted,
  resolveRound,
  type BattleDifficulty,
  type BattleOutcome,
  type BattlePhase,
  type RoundAnswer,
} from '@/lib/battle/engine';
import { getBattleDatabase } from '@/lib/battle/firebase';
import { getQuestionById, pickMatchQuestions, questionForRoomRound } from '@/lib/battle/questions';

const ROOM_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours
const PLAYER_KEY = 'samen-battle-player-id';

export type Seat = 'a' | 'b';

export type BattlePlayer = {
  id: string;
  displayName: string;
  ready: boolean;
  connected: boolean;
  look: PipBattleLook;
  lastSeenAt: number | object | null;
};

export type BattleRoom = {
  code: string;
  createdAt: number;
  expiresAt: number;
  hostSeat: Seat;
  difficulty: BattleDifficulty;
  phase: BattlePhase;
  seed: number;
  questionIds: string[];
  /** correctIndex per question — used only for authoritative grading in transactions */
  correctIndexes: number[];
  /**
   * Exact option order per round. Both devices must use this list so indexes match grading.
   * Firebase may store nested arrays as objects — normalizeRoom restores them.
   */
  optionsByRound: Array<[string, string, string, string]>;
  roundIndex: number;
  countdownEndsAt: number | null;
  roundDeadlineAt: number | null;
  revealUntil: number | null;
  hp: { a: number; b: number };
  answers: { a: RoundAnswer; b: RoundAnswer };
  roundResolved: boolean;
  outcome: BattleOutcome;
  outcomeReason: 'hp' | 'question-limit' | null;
  players: {
    a: BattlePlayer | null;
    b: BattlePlayer | null;
  };
  leftBy: Seat | null;
};

function roomRef(code: string) {
  return ref(getBattleDatabase(), `battles/${code.toUpperCase()}`);
}

/** Stable per-browser guest identity — not the learning profile id. */
export function getBattlePlayerId(): string {
  if (typeof sessionStorage === 'undefined') {
    return `guest-${Math.random().toString(36).slice(2)}`;
  }
  let id = sessionStorage.getItem(PLAYER_KEY);
  if (!id) {
    id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `guest-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(PLAYER_KEY, id);
  }
  return id;
}

function nowMs(): number {
  return Date.now();
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (value && typeof value === 'object') {
    return Object.keys(value as object)
      .sort((a, b) => Number(a) - Number(b))
      .map((k) => String((value as Record<string, unknown>)[k]));
  }
  return [];
}

function asNumberArray(value: unknown): number[] {
  if (Array.isArray(value)) return value.map((n) => Number(n));
  if (value && typeof value === 'object') {
    return Object.keys(value as object)
      .sort((a, b) => Number(a) - Number(b))
      .map((k) => Number((value as Record<string, unknown>)[k]));
  }
  return [];
}

function asOptionsByRound(
  value: unknown,
): Array<[string, string, string, string]> {
  const rows = Array.isArray(value)
    ? value
    : value && typeof value === 'object'
      ? Object.keys(value as object)
          .sort((a, b) => Number(a) - Number(b))
          .map((k) => (value as Record<string, unknown>)[k])
      : [];
  return rows.map((row) => {
    const opts = asStringArray(row);
    return [opts[0] ?? '', opts[1] ?? '', opts[2] ?? '', opts[3] ?? ''] as [
      string,
      string,
      string,
      string,
    ];
  });
}

function normalizeChoiceIndex(
  value: unknown,
): 0 | 1 | 2 | 3 | -1 | null {
  if (value === undefined || value === null) return -1;
  const n = Number(value);
  if (n === -1) return -1;
  if (n === 0 || n === 1 || n === 2 || n === 3) return n;
  return -1;
}

/** Firebase omits nulls and empty arrays — restore defaults after every read. */
export function normalizeRoom(raw: BattleRoom): BattleRoom {
  const answers = raw.answers ?? { a: emptyAnswer(), b: emptyAnswer() };
  const rawWithOpts = raw as BattleRoom & { optionsByRound?: unknown };
  return {
    ...raw,
    questionIds: asStringArray(raw.questionIds),
    correctIndexes: asNumberArray(raw.correctIndexes),
    optionsByRound: asOptionsByRound(rawWithOpts.optionsByRound),
    hp: {
      a: Number(raw.hp?.a ?? BATTLE_START_HP),
      b: Number(raw.hp?.b ?? BATTLE_START_HP),
    },
    answers: {
      a: {
        ...emptyAnswer(),
        ...answers.a,
        choiceIndex: normalizeChoiceIndex(answers.a?.choiceIndex),
        submittedAt: Number(answers.a?.submittedAt ?? 0),
        correct:
          answers.a?.correct === true
            ? true
            : answers.a?.correct === false
              ? false
              : null,
      },
      b: {
        ...emptyAnswer(),
        ...answers.b,
        choiceIndex: normalizeChoiceIndex(answers.b?.choiceIndex),
        submittedAt: Number(answers.b?.submittedAt ?? 0),
        correct:
          answers.b?.correct === true
            ? true
            : answers.b?.correct === false
              ? false
              : null,
      },
    },
    players: {
      a: raw.players?.a
        ? {
            ...raw.players.a,
            look: {
              stage: raw.players.a.look?.stage ?? 'hatchling',
              mood: raw.players.a.look?.mood ?? 'curious',
              equipped: raw.players.a.look?.equipped ?? {},
              speechLine: raw.players.a.look?.speechLine ?? null,
            },
          }
        : null,
      b: raw.players?.b
        ? {
            ...raw.players.b,
            look: {
              stage: raw.players.b.look?.stage ?? 'hatchling',
              mood: raw.players.b.look?.mood ?? 'curious',
              equipped: raw.players.b.look?.equipped ?? {},
              speechLine: raw.players.b.look?.speechLine ?? null,
            },
          }
        : null,
    },
    roundIndex: Number(raw.roundIndex ?? 0),
    seed: Number(raw.seed ?? 0),
    roundResolved: Boolean(raw.roundResolved),
    outcome: (raw.outcome as BattleOutcome) || null,
    outcomeReason: (raw.outcomeReason as BattleRoom['outcomeReason']) || null,
    leftBy: (raw.leftBy as Seat) || null,
    countdownEndsAt: raw.countdownEndsAt ?? null,
    roundDeadlineAt: raw.roundDeadlineAt ?? null,
    revealUntil: raw.revealUntil ?? null,
  };
}

function sanitizeLook(look: PipBattleLook): PipBattleLook {
  return {
    stage: look.stage || 'hatchling',
    mood: look.mood || 'curious',
    equipped: look.equipped ?? {},
    speechLine: look.speechLine ?? '',
  };
}

export async function createBattleRoom(input: {
  displayName: string;
  look: PipBattleLook;
  difficulty?: BattleDifficulty;
}): Promise<{ code: string; seat: Seat }> {
  const db = getBattleDatabase();
  const playerId = getBattlePlayerId();
  let code = generateRoomCode();
  let attempts = 0;
  while (attempts < 8) {
    const snap = await get(ref(db, `battles/${code}`));
    if (!snap.exists()) break;
    code = generateRoomCode();
    attempts += 1;
  }

  const player: BattlePlayer = {
    id: playerId,
    displayName: input.displayName.trim() || 'Player',
    ready: false,
    connected: true,
    look: sanitizeLook(input.look),
    lastSeenAt: nowMs(),
  };

  const room: BattleRoom = {
    code,
    createdAt: nowMs(),
    expiresAt: nowMs() + ROOM_TTL_MS,
    hostSeat: 'a',
    difficulty: input.difficulty ?? 'beginner',
    phase: 'lobby',
    seed: 0,
    // Placeholder so Firebase does not drop empty arrays.
    questionIds: ['_pending'],
    correctIndexes: [-1],
    optionsByRound: [['', '', '', '']],
    roundIndex: 0,
    countdownEndsAt: null,
    roundDeadlineAt: null,
    revealUntil: null,
    hp: { a: BATTLE_START_HP, b: BATTLE_START_HP },
    answers: { a: emptyAnswer(), b: emptyAnswer() },
    roundResolved: false,
    outcome: null,
    outcomeReason: null,
    players: { a: player },
    leftBy: null,
  } as BattleRoom;

  await set(roomRef(code), room);
  const seatRef = ref(db, `battles/${code}/players/a/connected`);
  await onDisconnect(seatRef).set(false);
  return { code, seat: 'a' };
}

export async function joinBattleRoom(input: {
  code: string;
  displayName: string;
  look: PipBattleLook;
}): Promise<{ code: string; seat: Seat }> {
  const code = input.code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (code.length < 4) {
    throw new Error('Enter the full room code from the host screen.');
  }

  const db = getBattleDatabase();
  const playerId = getBattlePlayerId();
  const r = roomRef(code);

  const existing = await get(r);
  if (!existing.exists()) {
    throw new Error(
      `No room found for code ${code}. Check you typed it exactly, and that both devices use the beta site.`,
    );
  }

  const preview = normalizeRoom(existing.val() as BattleRoom);
  if (preview.expiresAt < nowMs()) {
    throw new Error('This room has expired. Ask the host to create a new one.');
  }
  if (preview.phase !== 'lobby') {
    throw new Error('This battle already started. Ask the host for a new room.');
  }

  // Already seated?
  if (preview.players.a?.id === playerId || preview.players.b?.id === playerId) {
    const seat: Seat = preview.players.a?.id === playerId ? 'a' : 'b';
    await update(ref(db, `battles/${code}/players/${seat}`), {
      displayName: input.displayName.trim() || 'Player',
      look: sanitizeLook(input.look),
      connected: true,
      lastSeenAt: nowMs(),
    });
    await onDisconnect(ref(db, `battles/${code}/players/${seat}/connected`)).set(false);
    return { code, seat };
  }

  if (preview.players.a && preview.players.b) {
    throw new Error('This room is full (2 players already).');
  }

  const newPlayer: BattlePlayer = {
    id: playerId,
    displayName: input.displayName.trim() || 'Player',
    ready: false,
    connected: true,
    look: sanitizeLook(input.look),
    lastSeenAt: nowMs(),
  };

  // Only claim seat b (or a if missing) with a narrow transaction — avoids
  // full-tree aborts from null/empty Firebase quirks.
  const seat: Seat = preview.players.a ? 'b' : 'a';
  const seatRef = ref(db, `battles/${code}/players/${seat}`);
  const claim = await runTransaction(seatRef, (current) => {
    if (current) return; // taken
    return newPlayer;
  });

  if (!claim.committed || !claim.snapshot.exists()) {
    throw new Error('Could not claim a seat — the other player may have just joined. Try again.');
  }

  await onDisconnect(ref(db, `battles/${code}/players/${seat}/connected`)).set(false);
  return { code, seat };
}

export function subscribeBattleRoom(
  code: string,
  onRoom: (room: BattleRoom | null) => void,
): Unsubscribe {
  return onValue(roomRef(code), (snap) => {
    if (!snap.exists()) {
      onRoom(null);
      return;
    }
    onRoom(normalizeRoom(snap.val() as BattleRoom));
  });
}

export function mySeat(room: BattleRoom, playerId = getBattlePlayerId()): Seat | null {
  if (room.players.a?.id === playerId) return 'a';
  if (room.players.b?.id === playerId) return 'b';
  return null;
}

export async function setPlayerReady(code: string, ready: boolean): Promise<void> {
  const playerId = getBattlePlayerId();
  const r = roomRef(code);
  await runTransaction(r, (current) => {
    if (!current) return;
    const room = normalizeRoom(current as BattleRoom);
    if (room.phase !== 'lobby') return room;
    const seat = mySeat(room, playerId);
    if (!seat || !room.players[seat]) return;
    room.players[seat] = { ...room.players[seat]!, ready };
    return room;
  });
}

export async function setRoomDifficulty(
  code: string,
  difficulty: BattleDifficulty,
): Promise<void> {
  const playerId = getBattlePlayerId();
  const r = roomRef(code);
  await runTransaction(r, (current) => {
    if (!current) return;
    const room = normalizeRoom(current as BattleRoom);
    if (room.phase !== 'lobby') return room;
    if (room.hostSeat !== mySeat(room, playerId)) return;
    room.difficulty = difficulty;
    return room;
  });
}

export async function startBattle(code: string): Promise<void> {
  const playerId = getBattlePlayerId();
  const r = roomRef(code);
  await runTransaction(r, (current) => {
    if (!current) return;
    const room = normalizeRoom(current as BattleRoom);
    if (room.phase !== 'lobby') return room;
    if (room.hostSeat !== mySeat(room, playerId)) return;
    if (!room.players.a || !room.players.b) return;
    if (!room.players.a.ready || !room.players.b.ready) return;

    const seed = (nowMs() ^ playerId.length * 997) >>> 0;
    const questions = pickMatchQuestions(room.difficulty, seed, BATTLE_MAX_ROUNDS);
    if (questions.length < 5) return;

    room.seed = seed;
    room.questionIds = questions.map((q) => q.id);
    room.correctIndexes = questions.map((q) => q.correctIndex);
    room.optionsByRound = questions.map((q) => q.options);
    room.phase = 'countdown';
    room.countdownEndsAt = nowMs() + BATTLE_COUNTDOWN_SECONDS * 1000;
    room.roundIndex = 0;
    room.hp = { a: BATTLE_START_HP, b: BATTLE_START_HP };
    room.answers = { a: emptyAnswer(), b: emptyAnswer() };
    room.roundResolved = false;
    room.outcome = null;
    room.outcomeReason = null;
    room.leftBy = null;
    return room;
  });
}

export async function beginAnsweringPhase(code: string): Promise<void> {
  const r = roomRef(code);
  await runTransaction(r, (current) => {
    if (!current) return;
    const room = normalizeRoom(current as BattleRoom);
    if (room.phase !== 'countdown') return room;
    if (!room.countdownEndsAt || room.countdownEndsAt > nowMs() + 50) return room;
    room.phase = 'answering';
    room.roundDeadlineAt = nowMs() + BATTLE_ROUND_SECONDS * 1000;
    room.revealUntil = null;
    room.answers = { a: emptyAnswer(), b: emptyAnswer() };
    room.roundResolved = false;
    return room;
  });
}

export async function submitBattleAnswer(
  code: string,
  choiceIndex: 0 | 1 | 2 | 3,
): Promise<void> {
  const playerId = getBattlePlayerId();
  const submittedAt = nowMs();
  const r = roomRef(code);

  await runTransaction(r, (current) => {
    if (!current) return;
    const room = normalizeRoom(current as BattleRoom);
    if (room.phase !== 'answering' || room.roundResolved) return;
    const seat = mySeat(room, playerId);
    if (!seat) return;
    if (hasSubmitted(room.answers[seat])) return; // one submission
    if (!room.roundDeadlineAt || submittedAt > room.roundDeadlineAt) return;

    room.answers[seat] = {
      choiceIndex: Number(choiceIndex) as 0 | 1 | 2 | 3,
      submittedAt,
      correct: false,
    };
    return room;
  });
}

/**
 * Resolve the current round when both answered or time expired.
 * Correctness is graded from stored correctIndexes — never from client claims.
 */
export async function maybeResolveRound(code: string): Promise<void> {
  const r = roomRef(code);
  await runTransaction(r, (current) => {
    if (!current) return;
    const room = normalizeRoom(current as BattleRoom);
    if (room.phase !== 'answering' || room.roundResolved) return room;

    const deadline = room.roundDeadlineAt ?? 0;
    const bothIn =
      hasSubmitted(room.answers.a) && hasSubmitted(room.answers.b);
    const timedOut = nowMs() >= deadline;
    if (!bothIn && !timedOut) return room;

    const qIndex = Number(room.roundIndex);
    const correctIndex = Number(room.correctIndexes[qIndex]);
    if (!Number.isFinite(correctIndex) || correctIndex < 0 || correctIndex > 3) {
      return;
    }

    const aCorrect = gradeChoice(
      correctIndex,
      room.answers.a.choiceIndex == null ? null : Number(room.answers.a.choiceIndex),
      room.answers.a.submittedAt,
      deadline,
    );
    const bCorrect = gradeChoice(
      correctIndex,
      room.answers.b.choiceIndex == null ? null : Number(room.answers.b.choiceIndex),
      room.answers.b.submittedAt,
      deadline,
    );

    room.answers.a = { ...room.answers.a, correct: aCorrect };
    room.answers.b = { ...room.answers.b, correct: bCorrect };

    const realQuestionCount = room.questionIds.filter((id) => id !== '_pending').length;
    const resolution = resolveRound({
      hpA: room.hp.a,
      hpB: room.hp.b,
      aCorrect,
      bCorrect,
      roundIndex: room.roundIndex,
      maxRounds: Math.min(BATTLE_MAX_ROUNDS, realQuestionCount),
    });

    room.hp = { a: resolution.hpA, b: resolution.hpB };
    room.roundResolved = true;
    room.phase = 'reveal';
    room.revealUntil = nowMs() + BATTLE_REVEAL_SECONDS * 1000;

    if (resolution.matchOver) {
      room.outcome = resolution.winner;
      room.outcomeReason = resolution.reason === 'continue' ? null : resolution.reason;
    }
    return room;
  });
}

export async function advanceAfterReveal(code: string): Promise<void> {
  const r = roomRef(code);
  await runTransaction(r, (current) => {
    if (!current) return;
    const room = normalizeRoom(current as BattleRoom);
    if (room.phase !== 'reveal') return room;
    if (!room.revealUntil || room.revealUntil > nowMs() + 50) return room;

    if (room.outcome) {
      room.phase = 'finished';
      return room;
    }

    room.roundIndex += 1;
    room.phase = 'answering';
    room.roundDeadlineAt = nowMs() + BATTLE_ROUND_SECONDS * 1000;
    room.revealUntil = null;
    room.answers = { a: emptyAnswer(), b: emptyAnswer() };
    room.roundResolved = false;
    return room;
  });
}

export async function leaveBattleRoom(code: string): Promise<void> {
  const playerId = getBattlePlayerId();
  const r = roomRef(code);
  await runTransaction(r, (current) => {
    if (!current) return;
    const room = normalizeRoom(current as BattleRoom);
    const seat = mySeat(room, playerId);
    if (!seat) return;
    room.leftBy = seat;
    if (room.players[seat]) {
      room.players[seat] = { ...room.players[seat]!, connected: false, ready: false };
    }
    if (room.phase !== 'finished' && room.phase !== 'lobby') {
      room.phase = 'finished';
      room.outcome = seat === 'a' ? 'playerB' : 'playerA';
      room.outcomeReason = 'hp';
    }
    return room;
  });
}

export async function heartbeat(code: string): Promise<void> {
  const playerId = getBattlePlayerId();
  const snap = await get(roomRef(code));
  if (!snap.exists()) return;
  const room = snap.val() as BattleRoom;
  const seat = mySeat(room, playerId);
  if (!seat) return;
  await update(ref(getBattleDatabase(), `battles/${code}/players/${seat}`), {
    connected: true,
    lastSeenAt: nowMs(),
  });
}

export function currentQuestionPublic(room: BattleRoom) {
  const idx = Number(room.roundIndex ?? 0);
  const ids = room.questionIds ?? [];
  const id = ids[idx];
  if (!id || id === '_pending') return null;

  const meta = getQuestionById(id) ?? questionForRoomRound(id, Number(room.seed ?? 0), idx);
  if (!meta) return null;

  // Authoritative options from the room (same on every device). Never re-shuffle locally.
  const storedOptions = room.optionsByRound?.[idx];
  const options =
    storedOptions &&
    storedOptions.length === 4 &&
    storedOptions.every((o) => o && o.length > 0)
      ? storedOptions
      : meta.options;

  const storedCorrect = room.correctIndexes?.[idx];
  let correctIndex: 0 | 1 | 2 | 3 = meta.correctIndex;
  if (
    storedCorrect !== undefined &&
    Number(storedCorrect) >= 0 &&
    Number(storedCorrect) <= 3
  ) {
    correctIndex = Number(storedCorrect) as 0 | 1 | 2 | 3;
  }

  return {
    id: meta.id,
    prompt: meta.prompt,
    promptEn: meta.promptEn,
    options: options as [string, string, string, string],
    explanation: meta.explanation,
    skill: meta.skill,
    correctIndex,
  };
}
