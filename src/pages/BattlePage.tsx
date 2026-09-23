import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getPipBattleLook } from '@/lib/cosmetics';
import type { MascotMood, MascotStage } from '@/lib/mascot';
import {
  getFirebaseConfigStatus,
  isBattleBackendConfigured,
} from '@/lib/battle/firebase';
import {
  advanceAfterReveal,
  beginAnsweringPhase,
  createBattleRoom,
  currentQuestionPublic,
  getBattlePlayerId,
  heartbeat,
  joinBattleRoom,
  leaveBattleRoom,
  maybeResolveRound,
  mySeat,
  setPlayerReady,
  setRoomDifficulty,
  startBattle,
  submitBattleAnswer,
  subscribeBattleRoom,
  type BattleRoom,
  type Seat,
} from '@/lib/battle/room';
import type { BattleDifficulty } from '@/lib/battle/engine';
import { useAppState } from '@/state/AppState';
import { PipAvatar } from '@/components/Mascot/PipAvatar';

function HpBar({ label, hp, max = 7 }: { label: string; hp: number; max?: number }) {
  return (
    <div className="battle-hp" aria-label={`${label} ${hp} of ${max} HP`}>
      <div className="battle-hp__label">
        <span>{label}</span>
        <strong>
          {hp}/{max}
        </strong>
      </div>
      <div className="battle-hp__track">
        <div
          className="battle-hp__fill"
          style={{ width: `${Math.max(0, (hp / max) * 100)}%` }}
        />
      </div>
    </div>
  );
}

function PlayerCard({
  name,
  look,
  hp,
  ready,
  answered,
  reaction,
  you,
}: {
  name: string;
  look: BattleRoom['players']['a'];
  hp?: number;
  ready?: boolean;
  answered?: boolean;
  reaction?: 'idle' | 'correct' | 'wrong' | 'cheer';
  you?: boolean;
}) {
  if (!look) {
    return (
      <div className="battle-player battle-player--empty">
        <p>Waiting for player…</p>
      </div>
    );
  }
  return (
    <div className={`battle-player${you ? ' battle-player--you' : ''}`}>
      <PipAvatar
        stage={look.look.stage as MascotStage}
        mood={look.look.mood as MascotMood}
        equipped={look.look.equipped}
        size="md"
        reaction={reaction ?? 'idle'}
      />
      <div>
        <p className="battle-player__name">
          {name}
          {you ? ' (you)' : ''}
        </p>
        {look.look.speechLine ? (
          <p className="mascot__speech">“{look.look.speechLine}”</p>
        ) : null}
        {typeof hp === 'number' ? <HpBar label="HP" hp={hp} /> : null}
        {typeof ready === 'boolean' ? (
          <p className="battle-player__meta">{ready ? 'Ready' : 'Not ready'}</p>
        ) : null}
        {answered ? <p className="battle-player__meta">Answered ✓</p> : null}
      </div>
    </div>
  );
}

export function BattleLobbyPage() {
  const { activeProfile } = useAppState();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [displayName, setDisplayName] = useState(activeProfile.name);
  const [joinCode, setJoinCode] = useState(params.get('code') ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const status = getFirebaseConfigStatus();

  const look = useMemo(() => getPipBattleLook(activeProfile), [activeProfile]);

  const onCreate = async () => {
    setError(null);
    setBusy(true);
    try {
      const { code } = await createBattleRoom({
        displayName,
        look,
      });
      navigate(`/battle/${code}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not create room');
    } finally {
      setBusy(false);
    }
  };

  const onJoin = async () => {
    setError(null);
    setBusy(true);
    try {
      const { code } = await joinBattleRoom({
        code: joinCode,
        displayName,
        look,
      });
      navigate(`/battle/${code}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not join room');
    } finally {
      setBusy(false);
    }
  };

  if (!status.configured) {
    return (
      <>
        <header className="page-header">
          <p className="eyebrow">Beta · Language Battle</p>
          <h1>Almost ready</h1>
          <p>
            Real-time battles need a free Firebase Realtime Database. The UI and
            match rules are built; connect Firebase to play across two devices.
          </p>
        </header>
        <section className="card card--panel">
          <h2>Missing configuration</h2>
          <ul>
            {status.missing.map((key) => (
              <li key={key}>
                <code>{key}</code>
              </li>
            ))}
          </ul>
          <p>
            Follow <code>docs/beta-pip-language-battle.md</code> — create a Firebase
            project, enable Realtime Database, copy the web config into{' '}
            <code>.env.local</code>, deploy the security rules, then rebuild.
          </p>
          <Link className="btn btn--secondary" to="/home">
            Back home
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <header className="page-header">
        <p className="eyebrow">Beta · Language Battle</p>
        <h1>Dutch Language Battle</h1>
        <p>
          Two players, two devices, same questions. Create a private room or join
          with a code. Each browser gets its own guest battle identity — use
          different devices (or two browsers) even if profile names match.
        </p>
      </header>

      <section className="card card--panel">
        <label className="field">
          <span>Display name</span>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={24}
            autoComplete="nickname"
          />
        </label>
        <p className="muted small">
          Guest id for this browser: <code>{getBattlePlayerId().slice(0, 8)}…</code>
        </p>
      </section>

      <div className="battle-setup-grid">
        <section className="card card--panel">
          <h2>Create room</h2>
          <p>You’ll get a short join code to share.</p>
          <button
            type="button"
            className="btn btn--primary"
            disabled={busy || !displayName.trim()}
            onClick={() => void onCreate()}
          >
            Create private room
          </button>
        </section>

        <section className="card card--panel">
          <h2>Join room</h2>
          <label className="field">
            <span>Join code</span>
            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              maxLength={8}
              placeholder="e.g. AB12CD"
              autoCapitalize="characters"
            />
          </label>
          <button
            type="button"
            className="btn btn--secondary"
            disabled={busy || !displayName.trim() || joinCode.trim().length < 4}
            onClick={() => void onJoin()}
          >
            Join battle
          </button>
        </section>
      </div>

      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="btn-row">
        <Link className="btn btn--ghost" to="/wardrobe">
          Pip wardrobe
        </Link>
        <Link className="btn btn--ghost" to="/home">
          Home
        </Link>
      </div>
    </>
  );
}

export function BattleRoomPage() {
  const { code = '' } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState<BattleRoom | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [selected, setSelected] = useState<0 | 1 | 2 | 3 | null>(null);
  const configured = isBattleBackendConfigured();

  const seat: Seat | null = room ? mySeat(room) : null;
  const question = room ? currentQuestionPublic(room) : null;

  useEffect(() => {
    if (!configured || !code) return;
    const unsub = subscribeBattleRoom(code, setRoom);
    return unsub;
  }, [code, configured]);

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    if (!room || !code) return;
    const id = window.setInterval(() => {
      void heartbeat(code);
    }, 15000);
    return () => window.clearInterval(id);
  }, [room, code]);

  // Drive synchronized phase transitions from shared room timestamps
  useEffect(() => {
    if (!room || !code) return;
    if (room.phase === 'countdown') {
      void beginAnsweringPhase(code);
    } else if (room.phase === 'answering') {
      void maybeResolveRound(code);
    } else if (room.phase === 'reveal') {
      void advanceAfterReveal(code);
    }
  }, [room, code, now]);

  useEffect(() => {
    setSelected(null);
  }, [room?.roundIndex, room?.phase]);

  const onReady = useCallback(async () => {
    if (!code || !seat || !room) return;
    const me = room.players[seat];
    await setPlayerReady(code, !me?.ready);
  }, [code, seat, room]);

  const onStart = useCallback(async () => {
    if (!code) return;
    try {
      await startBattle(code);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not start');
    }
  }, [code]);

  const onAnswer = useCallback(
    async (index: 0 | 1 | 2 | 3) => {
      if (!code || selected !== null) return;
      setSelected(index);
      try {
        await submitBattleAnswer(code, index);
      } catch (e) {
        setSelected(null);
        setError(e instanceof Error ? e.message : 'Submit failed');
      }
    },
    [code, selected],
  );

  const onLeave = useCallback(async () => {
    if (code) await leaveBattleRoom(code);
    navigate('/battle');
  }, [code, navigate]);

  if (!configured) {
    return <BattleLobbyPage />;
  }

  if (!room) {
    return (
      <section className="card card--panel">
        <h1>Connecting…</h1>
        <p className="muted">Looking up room {code.toUpperCase()}.</p>
        <Link className="btn btn--secondary" to="/battle">
          Back
        </Link>
      </section>
    );
  }

  if (seat === null && room.phase === 'lobby') {
    // Auto-join if opened via invite link
    return <AutoJoin code={code} />;
  }

  if (seat === null) {
    return (
      <section className="card card--panel">
        <h1>Room is full</h1>
        <p>This battle already has two players.</p>
        <Link className="btn btn--primary" to="/battle">
          Start another battle
        </Link>
      </section>
    );
  }

  const me = room.players[seat]!;
  const foeSeat: Seat = seat === 'a' ? 'b' : 'a';
  const foe = room.players[foeSeat];
  const isHost = room.hostSeat === seat;
  const inviteUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}#/battle/${room.code}`
      : `#/battle/${room.code}`;

  const secondsLeft =
    room.phase === 'answering' && room.roundDeadlineAt
      ? Math.max(0, Math.ceil((room.roundDeadlineAt - now) / 1000))
      : room.phase === 'countdown' && room.countdownEndsAt
        ? Math.max(0, Math.ceil((room.countdownEndsAt - now) / 1000))
        : room.phase === 'reveal' && room.revealUntil
          ? Math.max(0, Math.ceil((room.revealUntil - now) / 1000))
          : null;

  const myAnswered = room.answers[seat].submittedAt != null;
  const foeAnswered = foe ? room.answers[foeSeat].submittedAt != null : false;

  const myReaction =
    room.phase === 'reveal'
      ? room.answers[seat].correct
        ? 'correct'
        : 'wrong'
      : 'idle';
  const foeReaction =
    room.phase === 'reveal'
      ? room.answers[foeSeat].correct
        ? 'correct'
        : 'wrong'
      : 'idle';

  if (room.phase === 'finished') {
    const won =
      (room.outcome === 'playerA' && seat === 'a') ||
      (room.outcome === 'playerB' && seat === 'b');
    const draw = room.outcome === 'draw';
    return (
      <section className="card card--panel battle-results">
        <h1>{draw ? 'It’s a draw!' : won ? 'Je wint!' : 'Goed gevochten!'}</h1>
        <p>
          {draw
            ? 'Both Pips matched HP at the end. Rematch when you’re ready.'
            : won
              ? `Nice work, ${me.displayName}. Pip is proud.`
              : `Well played, ${me.displayName}. Another round will sharpen those answers.`}
        </p>
        <div className="battle-arena">
          <PlayerCard name={me.displayName} look={me} hp={room.hp[seat]} you reaction={won ? 'cheer' : 'idle'} />
          <PlayerCard name={foe?.displayName ?? 'Opponent'} look={foe} hp={room.hp[foeSeat]} />
        </div>
        {room.leftBy ? (
          <p className="muted">A player left the match early.</p>
        ) : null}
        <div className="btn-row">
          <Link className="btn btn--primary" to="/home">
            Return home
          </Link>
          <Link className="btn btn--secondary" to="/battle">
            New battle
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <header className="page-header battle-header">
        <p className="eyebrow">Room {room.code}</p>
        <h1>
          {room.phase === 'lobby'
            ? 'Battle lobby'
            : room.phase === 'countdown'
              ? 'Get ready…'
              : room.phase === 'reveal'
                ? 'Round result'
                : 'Language Battle'}
        </h1>
        {room.phase === 'lobby' ? (
          <p>
            Share code <strong>{room.code}</strong> or invite link. Both players
            ready up; host starts when the lobby is full.
          </p>
        ) : null}
      </header>

      <div className="battle-arena">
        <PlayerCard
          name={me.displayName}
          look={me}
          hp={room.phase === 'lobby' ? undefined : room.hp[seat]}
          ready={room.phase === 'lobby' ? me.ready : undefined}
          answered={room.phase === 'answering' ? myAnswered : undefined}
          reaction={myReaction}
          you
        />
        <PlayerCard
          name={foe?.displayName ?? 'Opponent'}
          look={foe}
          hp={room.phase === 'lobby' ? undefined : room.hp[foeSeat]}
          ready={room.phase === 'lobby' ? foe?.ready : undefined}
          answered={room.phase === 'answering' ? foeAnswered : undefined}
          reaction={foeReaction}
        />
      </div>

      {room.phase === 'lobby' ? (
        <section className="card card--panel">
          <label className="field">
            <span>Difficulty {isHost ? '(host chooses)' : '(set by host)'}</span>
            <select
              value={room.difficulty}
              disabled={!isHost}
              onChange={(e) =>
                void setRoomDifficulty(code, e.target.value as BattleDifficulty)
              }
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
            </select>
          </label>
          <p className="muted small">
            Invite: <code className="invite-code">{inviteUrl}</code>
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn--secondary" onClick={() => void onReady()}>
              {me.ready ? 'Unready' : 'Ready'}
            </button>
            {isHost ? (
              <button
                type="button"
                className="btn btn--primary"
                disabled={!room.players.a || !room.players.b || !room.players.a.ready || !room.players.b.ready}
                onClick={() => void onStart()}
              >
                Start battle
              </button>
            ) : (
              <p className="muted">Waiting for host to start…</p>
            )}
            <button type="button" className="btn btn--ghost" onClick={() => void onLeave()}>
              Leave
            </button>
          </div>
        </section>
      ) : null}

      {room.phase === 'countdown' ? (
        <section className="card card--panel battle-countdown" aria-live="polite">
          <p className="battle-countdown__num">{secondsLeft}</p>
          <p>Same question for both players. 10 seconds per round.</p>
        </section>
      ) : null}

      {room.phase === 'answering' && question ? (
        <section className="card card--panel battle-question">
          <div className="battle-question__meta">
            <span>
              Round {room.roundIndex + 1}/{room.questionIds.length}
            </span>
            <span
              className={`battle-timer${secondsLeft !== null && secondsLeft <= 3 ? ' is-urgent' : ''}`}
            >
              {secondsLeft}s
            </span>
          </div>
          <h2>{question.prompt}</h2>
          {question.promptEn ? <p className="muted">{question.promptEn}</p> : null}
          <div className="battle-options" role="group" aria-label="Answer choices">
            {question.options.map((opt, i) => {
              const idx = i as 0 | 1 | 2 | 3;
              const locked = myAnswered || selected !== null;
              return (
                <button
                  key={`${question.id}-${i}`}
                  type="button"
                  className={`battle-option${selected === idx ? ' is-selected' : ''}`}
                  disabled={locked}
                  onClick={() => void onAnswer(idx)}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          <p className="muted small">
            {myAnswered
              ? foeAnswered
                ? 'Both answered — resolving…'
                : 'Waiting for the other player…'
              : 'Choose once. Wrong or timeout costs 1 HP.'}
          </p>
        </section>
      ) : null}

      {room.phase === 'reveal' && question ? (
        <section className="card card--panel battle-reveal" aria-live="polite">
          <h2>Correct answer</h2>
          <p className="battle-reveal__answer">
            {question.options[question.correctIndex]}
          </p>
          <p>{question.explanation}</p>
          <p className="muted">
            You were {room.answers[seat].correct ? 'correct' : 'incorrect'}. Next
            question in {secondsLeft}s…
          </p>
        </section>
      ) : null}

      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
    </>
  );
}

function AutoJoin({ code }: { code: string }) {
  const { activeProfile } = useAppState();
  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await joinBattleRoom({
          code,
          displayName: activeProfile.name,
          look: getPipBattleLook(activeProfile),
        });
      } catch (e) {
        if (!cancelled) {
          setErr(e instanceof Error ? e.message : 'Join failed');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, activeProfile]);

  if (err) {
    return (
      <section className="card card--panel">
        <h1>Could not join</h1>
        <p>{err}</p>
        <button type="button" className="btn btn--primary" onClick={() => navigate('/battle')}>
          Back to battle lobby
        </button>
      </section>
    );
  }

  return (
    <section className="card card--panel">
      <h1>Joining {code.toUpperCase()}…</h1>
    </section>
  );
}
