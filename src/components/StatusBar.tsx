import type { StatKey } from '../types';
import { statDefinitions } from '../data/stats';

interface StatusBarProps {
  stats: Record<StatKey, number>;
}

/** ステータスバー表示コンポーネント */
export function StatusBar({ stats }: StatusBarProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
      {statDefinitions.map((def) => {
        const value = stats[def.key];
        const percentage = Math.min(100, (value / 20) * 100);

        return (
          <div
            key={def.key}
            className="bg-white rounded-xl p-3 shadow-sm border border-gray-100"
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
        );
      })}
    </div>
  );
}
