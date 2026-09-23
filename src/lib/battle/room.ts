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
  resolveRound,
  type BattleDifficulty,
  type BattleOutcome,
  type BattlePhase,
  type RoundAnswer,
} from '@/lib/battle/engine';
import { getBattleDatabase } from '@/lib/battle/firebase';
import { getQuestionById, pickMatchQuestions } from '@/lib/battle/questions';

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
    look: input.look,
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
    questionIds: [],
    correctIndexes: [],
    roundIndex: 0,
    countdownEndsAt: null,
    roundDeadlineAt: null,
    revealUntil: null,
    hp: { a: BATTLE_START_HP, b: BATTLE_START_HP },
    answers: { a: emptyAnswer(), b: emptyAnswer() },
    roundResolved: false,
    outcome: null,
    outcomeReason: null,
    players: { a: player, b: null },
    leftBy: null,
  };

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
  const code = input.code.trim().toUpperCase();
  const playerId = getBattlePlayerId();
  const r = roomRef(code);

  const result = await runTransaction(r, (current) => {
    if (!current) return;
    const room = current as BattleRoom;
    if (room.expiresAt < nowMs()) return;
    if (room.phase !== 'lobby') return;

    // Reconnect to own seat
    if (room.players.a?.id === playerId) {
      room.players.a = {
        ...room.players.a,
        displayName: input.displayName.trim() || room.players.a.displayName,
        look: input.look,
        connected: true,
        lastSeenAt: nowMs(),
      };
      return room;
    }
    if (room.players.b?.id === playerId) {
      room.players.b = {
        ...room.players.b,
        displayName: input.displayName.trim() || room.players.b.displayName,
        look: input.look,
        connected: true,
        lastSeenAt: nowMs(),
      };
      return room;
    }

    if (room.players.b) return; // full

    room.players.b = {
      id: playerId,
      displayName: input.displayName.trim() || 'Player',
      ready: false,
      connected: true,
      look: input.look,
      lastSeenAt: nowMs(),
    };
    return room;
  });

  if (!result.committed || !result.snapshot.exists()) {
    throw new Error('Could not join room. Check the code, or the room may be full or expired.');
  }

  const room = result.snapshot.val() as BattleRoom;
  const seat: Seat = room.players.a?.id === playerId ? 'a' : 'b';
  const seatRef = ref(getBattleDatabase(), `battles/${code}/players/${seat}/connected`);
  await onDisconnect(seatRef).set(false);
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
    onRoom(snap.val() as BattleRoom);
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
    const room = current as BattleRoom;
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
    const room = current as BattleRoom;
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
    const room = current as BattleRoom;
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
    room.phase = 'countdown';
    room.countdownEndsAt = nowMs() + BATTLE_COUNTDOWN_SECONDS * 1000;
    room.roundIndex = 0;
    room.hp = { a: BATTLE_START_HP, b: BATTLE_START_HP };
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
    const room = current as BattleRoom;
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
    const room = current as BattleRoom;
    if (room.phase !== 'answering' || room.roundResolved) return;
    const seat = mySeat(room, playerId);
    if (!seat) return;
    if (room.answers[seat].submittedAt != null) return; // one submission
    if (!room.roundDeadlineAt || submittedAt > room.roundDeadlineAt) return;

    room.answers[seat] = {
      choiceIndex,
      submittedAt,
      correct: null,
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
    const room = current as BattleRoom;
    if (room.phase !== 'answering' || room.roundResolved) return room;

    const deadline = room.roundDeadlineAt ?? 0;
    const bothIn =
      room.answers.a.submittedAt != null && room.answers.b.submittedAt != null;
    const timedOut = nowMs() >= deadline;
    if (!bothIn && !timedOut) return room;

    const qIndex = room.roundIndex;
    const correctIndex = room.correctIndexes[qIndex];
    if (correctIndex === undefined) return;

    const aCorrect = gradeChoice(
      correctIndex,
      room.answers.a.choiceIndex,
      room.answers.a.submittedAt,
      deadline,
    );
    const bCorrect = gradeChoice(
      correctIndex,
      room.answers.b.choiceIndex,
      room.answers.b.submittedAt,
      deadline,
    );

    room.answers.a = { ...room.answers.a, correct: aCorrect };
    room.answers.b = { ...room.answers.b, correct: bCorrect };

    const resolution = resolveRound({
      hpA: room.hp.a,
      hpB: room.hp.b,
      aCorrect,
      bCorrect,
      roundIndex: room.roundIndex,
      maxRounds: Math.min(BATTLE_MAX_ROUNDS, room.questionIds.length),
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
    const room = current as BattleRoom;
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
    const room = current as BattleRoom;
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
  const id = room.questionIds[room.roundIndex];
  if (!id) return null;
  const q = getQuestionById(id);
  if (!q) return null;
  return {
    id: q.id,
    prompt: q.prompt,
    promptEn: q.promptEn,
    options: q.options,
    explanation: q.explanation,
    skill: q.skill,
    correctIndex: q.correctIndex,
  };
}
