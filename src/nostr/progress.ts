import { finalizeEvent } from 'nostr-tools/pure';
import { getPool, getRelays } from './pool';

const APP_ID = 'adigabza';
const PROGRESS_D_TAG = `${APP_ID}/progress`;

export interface WordAssessment {
  /** 0 = not seen, 1 = seen, 2 = learning, 3 = familiar, 4 = mastered */
  level: number;
  /** last time this word was practiced (unix timestamp) */
  lastSeen: number;
  /** number of correct answers in a row */
  streak: number;
}

export interface UserProgress {
  /** Current position / last word index reached */
  currentIndex: number;
  /** Per-word proficiency assessments, keyed by word index */
  assessments: Record<number, WordAssessment>;
  /** Total XP earned */
  xp: number;
  /** Daily streak count */
  streakDays: number;
  /** Last active date (ISO string) */
  lastActive: string;
  /** Words unlocked count */
  wordsUnlocked: number;
}

export function emptyProgress(): UserProgress {
  return {
    currentIndex: 0,
    assessments: {},
    xp: 0,
    streakDays: 0,
    lastActive: new Date().toISOString().split('T')[0],
    wordsUnlocked: 0,
  };
}

const LOCAL_PROGRESS_KEY = 'adigabza_progress';

export function saveProgressLocal(progress: UserProgress): void {
  try {
    localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

export function loadProgressLocal(): UserProgress | null {
  try {
    const raw = localStorage.getItem(LOCAL_PROGRESS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return null;
}

export async function publishProgress(
  progress: UserProgress,
  secretKey: Uint8Array,
): Promise<void> {
  const pool = getPool();
  const relays = getRelays();

  const event = finalizeEvent(
    {
      kind: 30078,
      created_at: Math.floor(Date.now() / 1000),
      tags: [['d', PROGRESS_D_TAG]],
      content: JSON.stringify(progress),
    },
    secretKey,
  );

  await Promise.any(pool.publish(relays, event));
}

export async function publishProgressWithExtension(
  progress: UserProgress,
): Promise<void> {
  if (!window.nostr) throw new Error('No NIP-07 extension');
  const pool = getPool();
  const relays = getRelays();

  const event = await window.nostr.signEvent({
    kind: 30078,
    created_at: Math.floor(Date.now() / 1000),
    tags: [['d', PROGRESS_D_TAG]],
    content: JSON.stringify(progress),
  });

  await Promise.any(pool.publish(relays, event));
}

export async function fetchProgress(pubkey: string): Promise<UserProgress | null> {
  const pool = getPool();
  const relays = getRelays();

  const event = await pool.get(relays, {
    kinds: [30078],
    authors: [pubkey],
    '#d': [PROGRESS_D_TAG],
  });

  if (event) {
    try {
      return JSON.parse(event.content) as UserProgress;
    } catch {
      return null;
    }
  }
  return null;
}
