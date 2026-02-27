import { SimplePool } from 'nostr-tools/pool';
import { DEFAULT_RELAYS } from './relays';

let pool: SimplePool | null = null;

export function getPool(): SimplePool {
  if (!pool) {
    pool = new SimplePool();
  }
  return pool;
}

export function getRelays(): string[] {
  return DEFAULT_RELAYS;
}
