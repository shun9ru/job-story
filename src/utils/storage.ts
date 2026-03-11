import type { DiagnosisRecord, GameMode, TraitKey, StatKey } from '../types';
import { supabase } from '../lib/supabase';

/** 体験ゲームのシーン選択履歴 */
export interface ExperienceHistoryEntry {
  sceneTitle: string;
  situation: string;
  choiceText: string;
  choiceEmoji: string;
  lesson: string;
}

/** 職業体験の振り返り記録 */
export interface ExperienceReflection {
  id: string;
  jobId: string;
  jobTitle: string;
  date: string;
  /** 興味度 1-5 */
  interestLevel: number;
  /** 選択式の関心ポイント */
  interestTags: string[];
  /** フリーコメント */
  freeComment: string;
  /** ゲームのスコア */
  scores: Record<string, number>;
  /** 結果タイプ */
  resultTitle: string;
  /** 各シーンでの選択履歴 */
  history?: ExperienceHistoryEntry[];
}

const USER_KEY = 'job-story-current-user';

/** ゲーム結果の保存用 */
export interface GameResultRecord {
  id: string;
  date: string;
  gameMode: GameMode;
  primaryTrait: TraitKey;
  stats: Record<StatKey, number>;
  discoveredJobIds: string[];
  recommendedJobIds: string[];
  /** @deprecated */
  discoveredJobCount?: number;
  /** @deprecated */
  topJobTitles?: string[];
}

// ─── ユーザーセッション ───

/** ログイン（ユーザーIDを保存 + Supabase upsert） */
export async function loginUser(userId: string): Promise<void> {
  try {
    localStorage.setItem(USER_KEY, userId);
  } catch { /* ignore */ }

  if (supabase) {
    await supabase.from('users').upsert({ id: userId }, { onConflict: 'id' });
  }
}

/** ログアウト */
export function logoutUser(): void {
  try {
    localStorage.removeItem(USER_KEY);
  } catch { /* ignore */ }
}

/** 現在ログイン中のユーザーIDを取得 */
export function getCurrentUserId(): string | null {
  try {
    return localStorage.getItem(USER_KEY);
  } catch {
    return null;
  }
}

// ─── 診断履歴 ───

/** 診断履歴を保存 */
export async function saveDiagnosisRecord(record: DiagnosisRecord): Promise<void> {
  const userId = getCurrentUserId();
  if (!userId) return;

  if (supabase) {
    await supabase.from('diagnosis_records').insert({
      id: record.id,
      user_id: userId,
      date: record.date,
      primary_trait: record.primaryTrait,
      secondary_trait: record.secondaryTrait,
      traits: record.traits,
      game_mode: record.gameMode ?? null,
    });
  }
}

/** 診断履歴を取得 */
export async function getDiagnosisRecords(): Promise<DiagnosisRecord[]> {
  const userId = getCurrentUserId();
  if (!userId) return [];

  if (supabase) {
    const { data, error } = await supabase
      .from('diagnosis_records')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching diagnosis records:', error);
      return [];
    }

    return (data ?? []).map((r) => ({
      id: r.id,
      date: r.date,
      primaryTrait: r.primary_trait as TraitKey,
      secondaryTrait: r.secondary_trait as TraitKey,
      traits: r.traits as Record<TraitKey, number>,
      gameMode: r.game_mode as GameMode | undefined,
    }));
  }

  return [];
}

/** 診断履歴があるか */
export async function hasDiagnosisRecords(): Promise<boolean> {
  const records = await getDiagnosisRecords();
  return records.length > 0;
}

// ─── ゲーム結果履歴 ───

/** ゲーム結果を保存 */
export async function saveGameResult(result: GameResultRecord): Promise<void> {
  const userId = getCurrentUserId();
  if (!userId) return;

  if (supabase) {
    await supabase.from('game_results').insert({
      id: result.id,
      user_id: userId,
      date: result.date,
      game_mode: result.gameMode,
      primary_trait: result.primaryTrait,
      stats: result.stats,
      discovered_job_ids: result.discoveredJobIds,
      recommended_job_ids: result.recommendedJobIds,
    });
  }
}

/** ゲーム結果を取得 */
export async function getGameResults(): Promise<GameResultRecord[]> {
  const userId = getCurrentUserId();
  if (!userId) return [];

  if (supabase) {
    const { data, error } = await supabase
      .from('game_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching game results:', error);
      return [];
    }

    return (data ?? []).map((r) => ({
      id: r.id,
      date: r.date,
      gameMode: r.game_mode as GameMode,
      primaryTrait: r.primary_trait as TraitKey,
      stats: r.stats as Record<StatKey, number>,
      discoveredJobIds: r.discovered_job_ids ?? [],
      recommendedJobIds: r.recommended_job_ids ?? [],
    }));
  }

  return [];
}

// ─── 体験振り返り ───

/** 振り返りを保存 */
export async function saveExperienceReflection(reflection: ExperienceReflection): Promise<void> {
  const userId = getCurrentUserId();
  if (!userId) return;

  if (supabase) {
    await supabase.from('experience_reflections').insert({
      id: reflection.id,
      user_id: userId,
      job_id: reflection.jobId,
      job_title: reflection.jobTitle,
      date: reflection.date,
      interest_level: reflection.interestLevel,
      interest_tags: reflection.interestTags,
      free_comment: reflection.freeComment,
      scores: reflection.scores,
      result_title: reflection.resultTitle,
      history: reflection.history ?? [],
    });
  }
}

/** 振り返り一覧を取得 */
export async function getExperienceReflections(): Promise<ExperienceReflection[]> {
  const userId = getCurrentUserId();
  if (!userId) return [];

  if (supabase) {
    const { data, error } = await supabase
      .from('experience_reflections')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching experience reflections:', error);
      return [];
    }

    return (data ?? []).map((r) => ({
      id: r.id,
      jobId: r.job_id,
      jobTitle: r.job_title,
      date: r.date,
      interestLevel: r.interest_level,
      interestTags: r.interest_tags ?? [],
      freeComment: r.free_comment ?? '',
      scores: r.scores ?? {},
      resultTitle: r.result_title ?? '',
      history: r.history ?? [],
    }));
  }

  return [];
}
