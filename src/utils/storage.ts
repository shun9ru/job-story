import type { DiagnosisRecord, GameMode, StatKey, ValueKey } from '../types';
import { initialValues } from '../data/stats';
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
  primaryStat: StatKey;
  stats: Record<StatKey, number>;
  discoveredJobIds: string[];
  recommendedJobIds: string[];
  favorite?: boolean;
  /** @deprecated */
  discoveredJobCount?: number;
  /** @deprecated */
  topJobTitles?: string[];
  /** @deprecated - old field name */
  primaryTrait?: string;
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
    const row: Record<string, unknown> = {
      id: record.id,
      user_id: userId,
      date: record.date,
      primary_trait: record.primaryStat,
      secondary_trait: record.secondaryStat,
      traits: record.stats,
      stats: record.stats ?? null,
      values: record.values ?? null,
      game_mode: record.gameMode ?? null,
    };
    const { error } = await supabase.from('diagnosis_records').insert(row);
    if (error) {
      if (error.code === 'PGRST204' || error.code === '42703') {
        // stats/game_mode カラムが未追加 → 除外して再試行
        const { stats: _, game_mode: __, ...rowWithout } = row;
        const { error: retryError } = await supabase.from('diagnosis_records').insert(rowWithout);
        if (retryError) {
          console.error('Error saving diagnosis record (retry):', retryError);
        }
      } else {
        console.error('Error saving diagnosis record:', error);
      }
    }
  }
}

/** 診断履歴を取得 */
export async function getDiagnosisRecords(): Promise<DiagnosisRecord[]> {
  const userId = getCurrentUserId();
  if (!userId) return [];

  if (supabase) {
    // まず全カラムで試行、失敗したら基本カラムのみで再試行
    let { data, error } = await supabase
      .from('diagnosis_records')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      // stats/game_mode カラムが存在しない場合は基本カラムのみで取得
      const retry = await supabase
        .from('diagnosis_records')
        .select('id,user_id,date,primary_trait,secondary_trait,traits,created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20);
      if (retry.error) {
        console.error('Error fetching diagnosis records:', retry.error);
        return [];
      }
      data = retry.data;
    }

    return (data ?? []).map((r) => ({
      id: r.id,
      date: r.date,
      primaryStat: (r.primary_trait as StatKey),
      secondaryStat: (r.secondary_trait as StatKey),
      stats: (r.stats ?? r.traits) as Record<StatKey, number>,
      values: (r.values as Record<ValueKey, number>) ?? { ...initialValues },
      gameMode: (r.game_mode as GameMode) ?? undefined,
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
    const row: Record<string, unknown> = {
      id: result.id,
      user_id: userId,
      date: result.date,
      game_mode: result.gameMode,
      primary_trait: result.primaryStat,
      stats: result.stats,
      discovered_job_ids: result.discoveredJobIds,
      recommended_job_ids: result.recommendedJobIds,
    };
    const { error } = await supabase.from('game_results').insert(row);
    if (error) {
      console.error('Error saving game result:', error);
    }
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
      primaryStat: (r.primary_trait as StatKey),
      stats: r.stats as Record<StatKey, number>,
      discoveredJobIds: r.discovered_job_ids ?? [],
      recommendedJobIds: r.recommended_job_ids ?? [],
      favorite: r.favorite ?? false,
    }));
  }

  return [];
}

/** ゲーム結果のお気に入りを切り替え */
export async function toggleGameResultFavorite(id: string, favorite: boolean): Promise<void> {
  if (supabase) {
    const { error } = await supabase
      .from('game_results')
      .update({ favorite })
      .eq('id', id);
    if (error) console.error('Error toggling favorite:', error);
  }
}

/** ゲーム結果を削除 */
export async function deleteGameResult(id: string): Promise<void> {
  if (supabase) {
    const { error } = await supabase
      .from('game_results')
      .delete()
      .eq('id', id);
    if (error) console.error('Error deleting game result:', error);
  }
}

/** 診断履歴を削除 */
export async function deleteDiagnosisRecord(id: string): Promise<void> {
  if (supabase) {
    const { error } = await supabase
      .from('diagnosis_records')
      .delete()
      .eq('id', id);
    if (error) console.error('Error deleting diagnosis record:', error);
  }
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
