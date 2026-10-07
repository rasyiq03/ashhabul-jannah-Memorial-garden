const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 8;
const MAX_TRACKED_KEYS = 5_000;

const recentRequests = new Map<string, number[]>();

/**
 * Pembatas sederhana di memori proses. Cukup untuk menahan kiriman berulang dari satu
 * perangkat; untuk banyak instance server, ganti dengan penyimpanan bersama.
 */
export function isRateLimited(key: string, now: number = Date.now()): boolean {
  const timestamps = (recentRequests.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    recentRequests.set(key, timestamps);
    return true;
  }
  timestamps.push(now);
  recentRequests.set(key, timestamps);

  if (recentRequests.size > MAX_TRACKED_KEYS) {
    const oldestKey = recentRequests.keys().next().value;
    if (oldestKey !== undefined) recentRequests.delete(oldestKey);
  }
  return false;
}
