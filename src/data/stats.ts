import type { StatInfo, StatKey } from '../types';

/** ステータス表示用の定義（10項目） */
export const statDefinitions: StatInfo[] = [
  { key: 'satisfaction', label: '満足度', emoji: '😊', color: 'bg-pink-400' },
  { key: 'income', label: '年収', emoji: '💰', color: 'bg-yellow-400' },
  { key: 'growth', label: '成長度', emoji: '📈', color: 'bg-green-400' },
  { key: 'stability', label: '安定度', emoji: '🛡️', color: 'bg-blue-400' },
  { key: 'communication', label: 'コミュ力', emoji: '💬', color: 'bg-orange-400' },
  { key: 'planning', label: '企画力', emoji: '💡', color: 'bg-purple-400' },
  { key: 'analysis', label: '分析力', emoji: '📊', color: 'bg-cyan-400' },
  { key: 'creative', label: '創造力', emoji: '🎨', color: 'bg-rose-400' },
  { key: 'care', label: '支援力', emoji: '🤝', color: 'bg-emerald-400' },
  { key: 'technical', label: '技術力', emoji: '🔬', color: 'bg-indigo-400' },
];

/** プレイヤーの初期ステータス */
export const initialStats: Record<StatKey, number> = {
  satisfaction: 5,
  income: 3,
  growth: 3,
  stability: 5,
  communication: 3,
  planning: 3,
  analysis: 3,
  creative: 3,
  care: 3,
  technical: 3,
};
