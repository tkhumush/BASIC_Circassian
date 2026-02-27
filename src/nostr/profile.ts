import { finalizeEvent } from 'nostr-tools/pure';
import { getPool, getRelays } from './pool';

export interface NostrProfile {
  name?: string;
  display_name?: string;
  about?: string;
  picture?: string;
  nip05?: string;
}

export async function publishProfile(
  profile: NostrProfile,
  secretKey: Uint8Array,
): Promise<void> {
  const pool = getPool();
  const relays = getRelays();

  const event = finalizeEvent(
    {
      kind: 0,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: JSON.stringify(profile),
    },
    secretKey,
  );

  await Promise.any(pool.publish(relays, event));
}

export async function publishProfileWithExtension(
  profile: NostrProfile,
): Promise<void> {
  if (!window.nostr) throw new Error('No NIP-07 extension');
  const pool = getPool();
  const relays = getRelays();

  const event = await window.nostr.signEvent({
    kind: 0,
    created_at: Math.floor(Date.now() / 1000),
    tags: [],
    content: JSON.stringify(profile),
  });

  await Promise.any(pool.publish(relays, event));
}

export async function fetchProfile(pubkey: string): Promise<NostrProfile | null> {
  const pool = getPool();
  const relays = getRelays();

  const event = await pool.get(relays, {
    kinds: [0],
    authors: [pubkey],
  });

  if (event) {
    try {
      return JSON.parse(event.content) as NostrProfile;
    } catch {
      return null;
    }
  }
  return null;
}
