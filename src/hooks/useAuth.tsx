import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import {
  generateNewKeyPair,
  keyPairFromNsec,
  saveNsecToStorage,
  loadNsecFromStorage,
  clearNsecFromStorage,
  type KeyPair,
} from '../nostr/keys';
import { fetchProfile, type NostrProfile } from '../nostr/profile';

type LoginMethod = 'nsec' | 'extension' | 'generated';

interface AuthState {
  keyPair: KeyPair | null;
  pubkey: string | null;
  loginMethod: LoginMethod | null;
  profile: NostrProfile | null;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  generateAccount: () => KeyPair;
  loginWithNsec: (nsec: string) => void;
  loginWithExtension: () => Promise<void>;
  setProfile: (profile: NostrProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    keyPair: null,
    pubkey: null,
    loginMethod: null,
    profile: null,
    isLoading: true,
  });

  // Auto-login from stored nsec on mount
  useEffect(() => {
    const stored = loadNsecFromStorage();
    if (stored) {
      try {
        const kp = keyPairFromNsec(stored);
        setState(s => ({ ...s, keyPair: kp, pubkey: kp.pubkey, loginMethod: 'nsec', isLoading: false }));
        fetchProfile(kp.pubkey).then(p => {
          if (p) setState(s => ({ ...s, profile: p }));
        });
      } catch {
        clearNsecFromStorage();
        setState(s => ({ ...s, isLoading: false }));
      }
    } else {
      setState(s => ({ ...s, isLoading: false }));
    }
  }, []);

  const generateAccount = useCallback(() => {
    const kp = generateNewKeyPair();
    saveNsecToStorage(kp.nsec);
    setState(s => ({ ...s, keyPair: kp, pubkey: kp.pubkey, loginMethod: 'generated' }));
    return kp;
  }, []);

  const loginWithNsec = useCallback((nsec: string) => {
    const kp = keyPairFromNsec(nsec);
    saveNsecToStorage(kp.nsec);
    setState(s => ({ ...s, keyPair: kp, pubkey: kp.pubkey, loginMethod: 'nsec' }));
    fetchProfile(kp.pubkey).then(p => {
      if (p) setState(s => ({ ...s, profile: p }));
    });
  }, []);

  const loginWithExtension = useCallback(async () => {
    if (!window.nostr) throw new Error('No Nostr extension found');
    const pubkey = await window.nostr.getPublicKey();
    setState(s => ({ ...s, keyPair: null, pubkey, loginMethod: 'extension' }));
    const p = await fetchProfile(pubkey);
    if (p) setState(s => ({ ...s, profile: p }));
  }, []);

  const setProfileFn = useCallback((profile: NostrProfile) => {
    setState(s => ({ ...s, profile }));
  }, []);

  const logout = useCallback(() => {
    clearNsecFromStorage();
    setState({
      keyPair: null,
      pubkey: null,
      loginMethod: null,
      profile: null,
      isLoading: false,
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        generateAccount,
        loginWithNsec,
        loginWithExtension,
        setProfile: setProfileFn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
