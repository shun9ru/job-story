import type { GameResultRecord } from '../utils/storage';
import type { StatKey, ValueKey } from '../types';
import { ResultContent } from './ResultPage';
import type { ResultData } from './ResultPage';
import { BgImage } from './BgImage';

interface GameResultDetailPageProps {
  result: GameResultRecord;
  diagnosisValues?: Record<ValueKey, number>;
  diagnosisSecondaryStat?: StatKey;
  onBack: () => void;
}

/** 過去のプレイ結果詳細ページ（ResultPage と完全に同じ表示） */
export function GameResultDetailPage({ result, diagnosisValues, diagnosisSecondaryStat, onBack }: GameResultDetailPageProps) {
  const data: ResultData = {
    gameMode: result.gameMode,
    primaryStat: result.primaryStat,
    secondaryStat: diagnosisSecondaryStat,
    stats: result.stats,
    discoveredJobIds: result.discoveredJobIds ?? [],
    recommendedJobIds: result.recommendedJobIds,
    diagnosisValues,
    date: result.date,
  };

  return (
    <BgImage imageKey="result" overlay={0.45} fixedBg className="min-h-screen bg-gradient-to-br from-violet-100 via-indigo-50 via-50% to-amber-50 relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[5%] right-[5%] w-56 h-56 rounded-full bg-purple-200/15 animate-float-slow" />
        <div className="absolute top-[40%] left-[3%] w-40 h-40 rounded-full bg-amber-200/10 animate-float-medium" />
      </div>

      {/* 戻るヘッダー */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            ← 戻る
          </button>
          <h1 className="text-sm font-bold text-gray-700">
            プレイ結果 - {result.date}
          </h1>
          <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full font-medium ml-auto">
            {result.gameMode === 'childhood' ? '🎒 子供時代編' : '💼 社会人編'}
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8 relative z-10">
        <ResultContent data={data} />

        {/* 戻るボタン */}
        <div className="text-center pb-8">
          <button
            onClick={onBack}
            className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg shadow-indigo-200/50 hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
          >
            ホームに戻る
          </button>
        </div>
      </main>
    </BgImage>
  );
}
