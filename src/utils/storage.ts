import type { DiagnosisRecord } from '../types';

const STORAGE_KEY = 'job-story-diagnosis-records';

/** 診断履歴を保存 */
export function saveDiagnosisRecord(record: DiagnosisRecord): void {
  const records = getDiagnosisRecords();
  records.unshift(record); // 新しいものを先頭に
  // 最大10件まで保持
  if (records.length > 10) records.length = 10;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    // localStorage 利用不可の環境でも動作する
  }
}

/** 診断履歴を取得 */
export function getDiagnosisRecords(): DiagnosisRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
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
