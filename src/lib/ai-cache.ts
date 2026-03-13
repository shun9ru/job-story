/** AI生成結果のlocalStorageキャッシュ */

const CACHE_PREFIX = 'ai_cache_';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7日

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

/** 入力データからキャッシュキーを生成 */
function makeKey(namespace: string, input: Record<string, unknown>): string {
  const hash = JSON.stringify(input);
  // 簡易ハッシュ（衝突しにくい程度で十分）
  let h = 0;
  for (let i = 0; i < hash.length; i++) {
    h = ((h << 5) - h + hash.charCodeAt(i)) | 0;
  }
  return `${CACHE_PREFIX}${namespace}_${h >>> 0}`;
}

/** キャッシュから取得 */
export function getFromCache<T>(namespace: string, input: Record<string, unknown>): T | null {
  try {
    const key = makeKey(namespace, input);
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

/** キャッシュに保存 */
export function saveToCache<T>(namespace: string, input: Record<string, unknown>, data: T): void {
  try {
    const key = makeKey(namespace, input);
    const entry: CacheEntry<T> = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // ストレージ容量超過等は無視
  }
}
