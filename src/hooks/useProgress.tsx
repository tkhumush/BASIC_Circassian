import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import {
  emptyProgress,
  saveProgressLocal,
  loadProgressLocal,
  publishProgress,
  publishProgressWithExtension,
  fetchProgress,
  type UserProgress,
  type WordAssessment,
} from '../nostr/progress';
import { useAuth } from './useAuth';

interface ProgressContextValue {
  progress: UserProgress;
  updateWordAssessment: (wordIndex: number, correct: boolean) => void;
  unlockNextWords: (count: number) => void;
  syncToNostr: () => Promise<void>;
  isSyncing: boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { keyPair, pubkey, loginMethod } = useAuth();
  const [progress, setProgress] = useState<UserProgress>(emptyProgress());
  const [isSyncing, setIsSyncing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load progress on login
  useEffect(() => {
    if (!pubkey || loaded) return;

    const local = loadProgressLocal();

    fetchProgress(pubkey).then(remote => {
      if (remote && local) {
        // Use whichever is newer
        const remoteDate = new Date(remote.lastActive).getTime();
        const localDate = new Date(local.lastActive).getTime();
        const best = remoteDate >= localDate ? remote : local;
        setProgress(best);
        saveProgressLocal(best);
      } else if (remote) {
        setProgress(remote);
        saveProgressLocal(remote);
      } else if (local) {
        setProgress(local);
      }
      setLoaded(true);
    }).catch(() => {
      if (local) setProgress(local);
      setLoaded(true);
    });
  }, [pubkey, loaded]);

  const updateWordAssessment = useCallback((wordIndex: number, correct: boolean) => {
    setProgress(prev => {
      const existing: WordAssessment = prev.assessments[wordIndex] || {
        level: 0,
        lastSeen: 0,
        streak: 0,
      };

      const newStreak = correct ? existing.streak + 1 : 0;
      let newLevel = existing.level;
      if (correct) {
        if (newStreak >= 5) newLevel = 4; // mastered
        else if (newStreak >= 3) newLevel = 3; // familiar
        else if (newStreak >= 1) newLevel = 2; // learning
        else newLevel = 1; // seen
      } else {
        newLevel = Math.max(1, newLevel - 1);
      }

      const xpGain = correct ? (newLevel >= 3 ? 5 : 10) : 0;
      const today = new Date().toISOString().split('T')[0];
      const wasActiveToday = prev.lastActive === today;

      const updated: UserProgress = {
        ...prev,
        currentIndex: Math.max(prev.currentIndex, wordIndex),
        assessments: {
          ...prev.assessments,
          [wordIndex]: {
            level: newLevel,
            lastSeen: Math.floor(Date.now() / 1000),
            streak: newStreak,
          },
        },
        xp: prev.xp + xpGain,
        streakDays: wasActiveToday ? prev.streakDays : prev.streakDays + 1,
        lastActive: today,
      };

      saveProgressLocal(updated);
      return updated;
    });
  }, []);

  const unlockNextWords = useCallback((count: number) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        wordsUnlocked: prev.wordsUnlocked + count,
      };
      saveProgressLocal(updated);
      return updated;
    });
  }, []);

  const syncToNostr = useCallback(async () => {
    if (!pubkey) return;
    setIsSyncing(true);
    try {
      if (loginMethod === 'extension') {
        await publishProgressWithExtension(progress);
      } else if (keyPair?.secretKey) {
        await publishProgress(progress, keyPair.secretKey);
      }
    } catch (e) {
      console.warn('Failed to sync progress to Nostr:', e);
    } finally {
      setIsSyncing(false);
    }
  }, [pubkey, loginMethod, keyPair, progress]);

  // Auto-sync every 30 seconds if logged in
  useEffect(() => {
    if (!pubkey) return;
    const interval = setInterval(() => {
      syncToNostr();
    }, 30000);
    return () => clearInterval(interval);
  }, [pubkey, syncToNostr]);

  return (
    <ProgressContext.Provider value={{ progress, updateWordAssessment, unlockNextWords, syncToNostr, isSyncing }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be inside ProgressProvider');
  return ctx;
}
