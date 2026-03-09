import type { DiagnosisRecord, GameMode, TraitKey, StatKey } from '../types';

const USER_KEY = 'job-story-current-user';

/** ゲーム結果の保存用 */
export interface GameResultRecord {
  id: string;
  date: string;
  gameMode: GameMode;
  primaryTrait: TraitKey;
  stats: Record<StatKey, number>;
  discoveredJobCount: number;
  topJobTitles: string[];
}

// ─── ユーザーセッション ───

/** ログイン（ユーザーIDを保存） */
export function loginUser(userId: string): void {
  try {
    localStorage.setItem(USER_KEY, userId);
  } catch {
    // ignore
  }
}

/** ログアウト */
export function logoutUser(): void {
  try {
    localStorage.removeItem(USER_KEY);
  } catch {
    // ignore
  }
}

/** 現在ログイン中のユーザーIDを取得 */
export function getCurrentUserId(): string | null {
  try {
    return localStorage.getItem(USER_KEY);
  } catch {
    return null;
  }
}

// ─── ユーザーごとのストレージキー ───

function diagnosisKey(userId: string): string {
  return `job-story-diagnosis-${userId}`;
}

function gameResultKey(userId: string): string {
  return `job-story-results-${userId}`;
}

// ─── 診断履歴 ───

/** 診断履歴を保存 */
export function saveDiagnosisRecord(record: DiagnosisRecord): void {
  const userId = getCurrentUserId();
  if (!userId) return;
  const records = getDiagnosisRecords();
  records.unshift(record);
  if (records.length > 20) records.length = 20;
  try {
    localStorage.setItem(diagnosisKey(userId), JSON.stringify(records));
  } catch {
    // ignore
  }
}

/** 診断履歴を取得 */
export function getDiagnosisRecords(): DiagnosisRecord[] {
  const userId = getCurrentUserId();
  if (!userId) return [];
  try {
    const raw = localStorage.getItem(diagnosisKey(userId));
    if (!raw) return [];
    return JSON.parse(raw) as DiagnosisRecord[];
  } catch {
    return [];
  }
}

/** 診断履歴があるか */
export function hasDiagnosisRecords(): boolean {
  return getDiagnosisRecords().length > 0;
}

// ─── ゲーム結果履歴 ───

/** ゲーム結果を保存 */
export function saveGameResult(result: GameResultRecord): void {
  const userId = getCurrentUserId();
  if (!userId) return;
  const results = getGameResults();
  results.unshift(result);
  if (results.length > 20) results.length = 20;
  try {
    localStorage.setItem(gameResultKey(userId), JSON.stringify(results));
  } catch {
    // ignore
  }
}

/** ゲーム結果を取得 */
export function getGameResults(): GameResultRecord[] {
  const userId = getCurrentUserId();
  if (!userId) return [];
  try {
    const raw = localStorage.getItem(gameResultKey(userId));
    if (!raw) return [];
    return JSON.parse(raw) as GameResultRecord[];
  } catch {
    return [];
  }
}
