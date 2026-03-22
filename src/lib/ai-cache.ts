/** AI生成結果のlocalStorageキャッシュ & レート制限 */

const CACHE_PREFIX = 'ai_cache_';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7日

/** 1日あたりのAPI呼び出し上限 */
const DAILY_LIMIT = 30;
const DAILY_LIMIT_KEY = 'ai_daily_usage';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface DailyUsage {
  date: string;
  count: number;
}

/** オブジェクトのキーをソートして安定したJSON文字列を生成 */
function stableStringify(obj: unknown): string {
  if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
  if (Array.isArray(obj)) return '[' + obj.map(stableStringify).join(',') + ']';
  const sorted = Object.keys(obj as Record<string, unknown>).sort();
  return '{' + sorted.map((k) => JSON.stringify(k) + ':' + stableStringify((obj as Record<string, unknown>)[k])).join(',') + '}';
}

/** 入力データからキャッシュキーを生成（プロパティ順序に依存しない） */
function makeKey(namespace: string, input: Record<string, unknown>): string {
  const hash = stableStringify(input);
  let h = 0;
  for (let i = 0; i < hash.length; i++) {
    h = ((h << 5) - h + hash.charCodeAt(i)) | 0;
  }
  return `${CACHE_PREFIX}${namespace}_${h >>> 0}`;
}

/** 今日の日付文字列 */
function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

/** 今日のAPI使用回数を取得 */
export function getDailyUsage(): number {
  try {
    const raw = localStorage.getItem(DAILY_LIMIT_KEY);
    if (!raw) return 0;
    const usage: DailyUsage = JSON.parse(raw);
    if (usage.date !== todayStr()) return 0;
    return usage.count;
  } catch {
    return 0;
  }
}

/** 今日のAPI残り回数を取得 */
export function getDailyRemaining(): number {
  return Math.max(0, DAILY_LIMIT - getDailyUsage());
}

/** API呼び出しを1回カウント。上限超過ならfalseを返す */
export function consumeDailyQuota(): boolean {
  const today = todayStr();
  const current = getDailyUsage();
  if (current >= DAILY_LIMIT) return false;
  try {
    const usage: DailyUsage = { date: today, count: current + 1 };
    localStorage.setItem(DAILY_LIMIT_KEY, JSON.stringify(usage));
  } catch {
    // ignore
  }
  return true;
}

/** API側エラー時にクォータを1回分戻す */
export function refundDailyQuota(): void {
  try {
    const today = todayStr();
    const current = getDailyUsage();
    if (current > 0) {
      const usage: DailyUsage = { date: today, count: current - 1 };
      localStorage.setItem(DAILY_LIMIT_KEY, JSON.stringify(usage));
    }
  } catch {
    // ignore
  }
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
