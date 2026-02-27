import { generateSecretKey, getPublicKey } from 'nostr-tools/pure';
import * as nip19 from 'nostr-tools/nip19';

const NSEC_STORAGE_KEY = 'adigabza_nsec';

export interface KeyPair {
  secretKey: Uint8Array;
  pubkey: string; // hex
  nsec: string;
  npub: string;
}

export function generateNewKeyPair(): KeyPair {
  const sk = generateSecretKey();
  const pk = getPublicKey(sk);
  return {
    secretKey: sk,
    pubkey: pk,
    nsec: nip19.nsecEncode(sk),
    npub: nip19.npubEncode(pk),
  };
}

export function keyPairFromNsec(nsecStr: string): KeyPair {
  const decoded = nip19.decode(nsecStr);
  if (decoded.type !== 'nsec') throw new Error('Invalid nsec');
  const sk = decoded.data;
  const pk = getPublicKey(sk);
  return {
    secretKey: sk,
    pubkey: pk,
    nsec: nip19.nsecEncode(sk),
    npub: nip19.npubEncode(pk),
  };
}

export function pubkeyFromNpub(npubStr: string): string {
  const decoded = nip19.decode(npubStr);
  if (decoded.type !== 'npub') throw new Error('Invalid npub');
  return decoded.data;
}

export function saveNsecToStorage(nsec: string): void {
  try {
    localStorage.setItem(NSEC_STORAGE_KEY, nsec);
  } catch {
    // localStorage may be unavailable
  }
}

export function loadNsecFromStorage(): string | null {
  try {
    return localStorage.getItem(NSEC_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function clearNsecFromStorage(): void {
  try {
    localStorage.removeItem(NSEC_STORAGE_KEY);
  } catch {
    // ignore
  }
}
