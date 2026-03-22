import { useState } from 'react';
import type { StatKey } from '../types';
import { statDefinitions, skillCategories } from '../data/stats';

interface StatusBarProps {
  stats: Record<StatKey, number>;
  label?: string;
}

/** ステータスバー表示コンポーネント（18スキル全表示、カテゴリ別） */
export function StatusBar({ stats, label }: StatusBarProps) {
  const [tappedKey, setTappedKey] = useState<StatKey | null>(null);

  return (
    <div>
      {label && (
        <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1.5">
          <span>🎮</span>{label}
        </p>
      )}
    {skillCategories.map((cat) => {
      const defs = statDefinitions.filter((d) => d.category === cat.key);
      return (
        <div key={cat.key} className="mb-3">
          <p className="text-[10px] font-medium text-gray-400 mb-1.5 flex items-center gap-1">
            <span>{cat.emoji}</span>{cat.label}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {defs.map((def) => {
              const value = stats[def.key];
              const percentage = Math.min(100, (value / 100) * 100);
              const isOpen = tappedKey === def.key;

              return (
                <div key={def.key}>
                  <div
                    onClick={() => setTappedKey(isOpen ? null : def.key)}
                    className={`rounded-xl p-3 shadow-sm border cursor-pointer transition-all ${
                      isOpen
                        ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-300'
                        : 'bg-white border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-sm">{def.emoji}</span>
                      <span className="text-xs text-gray-500 font-medium">
                        {def.label}
                      </span>
                      <span className="text-xs text-gray-800 font-bold ml-auto">
                        {value}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className={`${def.color} h-1.5 rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  {isOpen && (
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
  );
}
