/** 職種データの型定義 */
export interface Job {
  id: string;
  title: string;
  industry: string;
  shortDescription: string;
  description: string[];
  dailySchedule: { time: string; task: string }[];
  yearlySchedule?: { month: string; task: string }[];
  careerPath?: { year: string; role: string; description: string }[];
  suitableFor: string[];
  skillsGained: string[];
  companyExamples: string[];
  tags: string[];
}

/** 診断の質問 */
export interface DiagnosisQuestion {
  id: string;
  text: string;
  emoji?: string;
  options: {
    text: string;
    emoji?: string;
    effects: Partial<Record<TraitKey, number>>;
  }[];
}

/** プレイヤーの性格傾向キー（8種類） */
export type TraitKey =
  | 'communication'
  | 'planning'
  | 'analysis'
  | 'stability'
  | 'challenge'
  | 'creative'
  | 'care'
  | 'technical';

/** 診断タイプ（MBTI級の詳細解説） */
export interface DiagnosisType {
  key: TraitKey;
  label: string;
  emoji: string;
  tagline: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  workStyle: string;
  communicationStyle: string;
  idealEnvironment: string;
  stressSource: string;
  growthAdvice: string;
  compatibleTypes: TraitKey[];
  challengingTypes: TraitKey[];
  suitableJobs: string[];
  famousPersonas: string[];
}

/** 診断結果の保存用 */
export interface DiagnosisRecord {
  id: string;
  date: string;
  primaryTrait: TraitKey;
  secondaryTrait: TraitKey;
  traits: Record<TraitKey, number>;
  gameMode?: GameMode;
}

/** ゲームモード */
export type GameMode = 'childhood' | 'working';

/** ライフステージ */
export type LifeStage = 'elementary' | 'middle-school' | 'high-school' | 'university' | 'shukatsu' | 'early-career' | 'mid-career' | 'future';

/** ライフステージの表示情報 */
export interface LifeStageInfo {
  key: LifeStage;
  label: string;
  emoji: string;
  color: string;
  bgGradient: string;
}

/** ゲームイベント */
export interface GameEvent {
  id: string;
  step: number;
  title: string;
  description: string;
  stage: LifeStage;
  relatedJobIds: string[];
  choices: Choice[];
}

/** 選択肢 */
export interface Choice {
  id: string;
  text: string;
  emoji?: string;
  description: string;
  effects: Partial<Record<StatKey, number>>;
  unlockJobIds: string[];
  nextEventId?: string;
}

/** プレイヤーステータスのキー */
export type StatKey =
  | 'satisfaction'
  | 'income'
  | 'growth'
  | 'stability'
  | 'communication'
  | 'planning'
  | 'analysis'
  | 'creative'
  | 'care'
  | 'technical';

/** プレイヤーの状態 */
export interface PlayerState {
  stats: Record<StatKey, number>;
  discoveredJobIds: string[];
  selectedChoices: { eventId: string; choiceId: string }[];
  diagnosisTraits: Record<TraitKey, number>;
  primaryTrait: TraitKey;
}

/** ステータス表示用の情報 */
export interface StatInfo {
  key: StatKey;
  label: string;
  emoji: string;
  color: string;
}
