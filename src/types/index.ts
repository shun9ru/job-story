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
  imageUrl?: string;
  tags: string[];
}

/** スキルステータスのキー（18項目・4カテゴリ） */
export type StatKey =
  // ① 思考力（Thinking Skills）
  | 'logical_thinking'    // 論理的思考力
  | 'problem_solving'     // 問題解決力
  | 'critical_thinking'   // 批判的思考力
  | 'creativity'          // 創造力
  | 'learning_agility'    // 学習力
  // ② 自己管理力（Self Management）
  | 'initiative'          // 主体性
  | 'grit'                // 継続力
  | 'self_management'     // 自己管理能力
  | 'resilience'          // レジリエンス
  | 'self_awareness'      // 自己理解
  // ③ 対人能力（Social Skills）
  | 'communication'       // コミュニケーション力
  | 'listening'           // 傾聴力
  | 'empathy'             // 共感力
  | 'teamwork'            // 協働力
  | 'leadership'          // リーダーシップ
  // ④ 実行力（Execution Skills）
  | 'planning'            // 計画力
  | 'decision_making'     // 意思決定力
  | 'action';             // 行動力

/** スキルカテゴリ */
export type SkillCategory = 'thinking' | 'self_management' | 'social' | 'execution';

/** 価値観キー（診断専用・5項目） */
export type ValueKey =
  | 'income_orientation'       // 年収志向
  | 'stability_orientation'    // 安定志向
  | 'growth_orientation'       // 成長志向
  | 'work_life_balance'        // ワークライフバランス志向
  | 'social_contribution';     // 社会貢献志向

/** 価値観の表示情報 */
export interface ValueInfo {
  key: ValueKey;
  label: string;
  emoji: string;
  lowLabel: string;   // 0側のラベル
  highLabel: string;  // 100側のラベル
  description: string;
}

/** 診断の質問 */
export interface DiagnosisQuestion {
  id: string;
  text: string;
  emoji?: string;
  options: {
    text: string;
    emoji?: string;
    effects: Partial<Record<StatKey, number>>;
    statEffects?: Partial<Record<StatKey, number>>;
    valueEffects?: Partial<Record<ValueKey, number>>;
  }[];
}

/** 診断タイプ（性格傾向の詳細解説） */
export interface DiagnosisType {
  key: StatKey;
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
  compatibleTypes: StatKey[];
  challengingTypes: StatKey[];
  suitableJobs: string[];
  famousPersonas: string[];
}

/** 診断結果の保存用 */
export interface DiagnosisRecord {
  id: string;
  date: string;
  primaryStat: StatKey;
  secondaryStat: StatKey;
  stats: Record<StatKey, number>;
  values: Record<ValueKey, number>;
  gameMode?: GameMode;
}

/** ゲームモード */
export type GameMode = 'childhood' | 'working';

/** ライフステージ */
export type LifeStage = 'elementary' | 'middle-school' | 'high-school' | 'vocational' | 'university' | 'shukatsu' | 'early-career' | 'mid-career' | 'future';

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

/** プレイヤーの状態 */
export interface PlayerState {
  stats: Record<StatKey, number>;
  discoveredJobIds: string[];
  selectedChoices: { eventId: string; choiceId: string }[];
  primaryStat: StatKey;
}

/** ステータス表示用の情報 */
export interface StatInfo {
  key: StatKey;
  label: string;
  emoji: string;
  color: string;
  description: string;
  category: SkillCategory;
}

/** カテゴリ表示用の情報 */
export interface SkillCategoryInfo {
  key: SkillCategory;
  label: string;
  emoji: string;
}
