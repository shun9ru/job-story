import { useState } from 'react';
import type { StatKey } from '../types';
import { statDefinitions, skillCategories } from '../data/stats';

interface DiagnosisStatsBarProps {
  stats: Record<StatKey, number>;
  /** trueの場合、折りたたみなしで全体を表示 */
  expanded?: boolean;
}

/** 診断で判明したステータス（折りたたみ表示） */
export function DiagnosisStatsBar({ stats, expanded }: DiagnosisStatsBarProps) {
  const [isOpen, setIsOpen] = useState(expanded ?? false);
  const [tappedKey, setTappedKey] = useState<StatKey | null>(null);

  // レーダーチャートと同じ正規化: 最大値を100%として割合表示
  const maxStat = Math.max(...Object.values(stats), 1);

  // 上位3つのスキルを表示
  const topSkills = [...statDefinitions]
    .filter((d) => stats[d.key] > 0)
    .sort((a, b) => stats[b.key] - stats[a.key])
    .slice(0, 3);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 bg-purple-50 rounded-xl text-left cursor-pointer hover:bg-purple-100 transition-all"
      >
        <span className="text-xs font-semibold text-purple-600 flex items-center gap-1.5">
          <span>🔮</span>性格診断のステータス
        </span>
        <div className="flex items-center gap-2">
          {!isOpen && topSkills.map((s) => (
            <span key={s.key} className="text-xs text-purple-500">
              {s.emoji}{Math.round((stats[s.key] / maxStat) * 100)}%
            </span>
          ))}
          <span className={`text-purple-400 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="mt-2 space-y-3 animate-fade-in">
          {skillCategories.map((cat) => {
            const defs = statDefinitions.filter((d) => d.category === cat.key);
            return (
              <div key={cat.key}>
                <p className="text-[10px] font-medium text-gray-400 mb-1.5 px-1 flex items-center gap-1">
                  <span>{cat.emoji}</span>{cat.label}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {defs.map((def) => {
                    const value = stats[def.key];
                    const percentage = Math.max(5, Math.round((value / maxStat) * 100));
                    const isTapped = tappedKey === def.key;
                    return (
                      <div key={def.key}>
                        <div
                          onClick={() => setTappedKey(isTapped ? null : def.key)}
                          className={`rounded-xl p-3 shadow-sm border cursor-pointer transition-all ${
                            isTapped
                              ? 'bg-purple-50 border-purple-200 ring-1 ring-purple-300'
                              : 'bg-white border-purple-100 hover:border-purple-200'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="text-sm">{def.emoji}</span>
                            <span className="text-xs text-gray-500 font-medium">{def.label}</span>
                            <span className="text-xs text-gray-800 font-bold ml-auto">{percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div
                              className="bg-purple-400 h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                        {isTapped && (
                          <div className="mt-1 bg-white rounded-lg shadow border border-gray-100 p-3 animate-fade-in">
                            <p className="text-xs text-gray-600 leading-relaxed">{def.description}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
