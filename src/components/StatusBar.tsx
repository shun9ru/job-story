import { useState } from 'react';
import type { StatKey } from '../types';
import { skillStatDefinitions } from '../data/stats';

interface StatusBarProps {
  stats: Record<StatKey, number>;
}

/** ステータスバー表示コンポーネント（スキル系8軸のみ表示） */
export function StatusBar({ stats }: StatusBarProps) {
  const [tappedKey, setTappedKey] = useState<StatKey | null>(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {skillStatDefinitions.map((def) => {
        const value = stats[def.key];
        const percentage = Math.min(100, (value / 20) * 100);
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
  );
}
