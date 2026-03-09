import type { LifeStageInfo } from '../types';

/** ライフステージの定義 */
export const lifeStages: LifeStageInfo[] = [
  {
    key: 'elementary',
    label: '小学校',
    emoji: '🎒',
    color: 'text-amber-600',
    bgGradient: 'from-amber-50 via-orange-50 to-yellow-50',
  },
  {
    key: 'middle-school',
    label: '中学校',
    emoji: '📖',
    color: 'text-green-600',
    bgGradient: 'from-green-50 via-emerald-50 to-teal-50',
  },
  {
    key: 'high-school',
    label: '高校',
    emoji: '🏫',
    color: 'text-sky-600',
    bgGradient: 'from-sky-50 via-blue-50 to-cyan-50',
  },
  {
    key: 'university',
    label: '大学',
    emoji: '🎓',
    color: 'text-violet-600',
    bgGradient: 'from-violet-50 via-purple-50 to-fuchsia-50',
  },
  {
    key: 'shukatsu',
    label: '就活',
    emoji: '💼',
    color: 'text-indigo-600',
    bgGradient: 'from-indigo-50 via-blue-50 to-violet-50',
  },
  {
    key: 'early-career',
    label: '入社1〜2年目',
    emoji: '🌱',
    color: 'text-emerald-600',
    bgGradient: 'from-emerald-50 via-green-50 to-teal-50',
  },
  {
    key: 'mid-career',
    label: '入社3〜5年目',
    emoji: '🔥',
    color: 'text-orange-600',
    bgGradient: 'from-orange-50 via-amber-50 to-yellow-50',
  },
  {
    key: 'future',
    label: '将来のビジョン',
    emoji: '🚀',
    color: 'text-rose-600',
    bgGradient: 'from-rose-50 via-pink-50 to-fuchsia-50',
  },
];

export function getStageInfo(key: string): LifeStageInfo {
  return lifeStages.find((s) => s.key === key) ?? lifeStages[0];
}
