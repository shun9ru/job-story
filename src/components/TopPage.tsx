import { getDiagnosisRecords, getGameResults } from '../utils/storage';
import { getDiagnosisType } from '../data/diagnosis';
import type { DiagnosisRecord } from '../types';

interface TopPageProps {
  userId: string;
  onStart: () => void;
  onViewDiagnosis: (record: DiagnosisRecord) => void;
  onLogout: () => void;
}

/** トップ画面 */
export function TopPage({ userId, onStart, onViewDiagnosis, onLogout }: TopPageProps) {
  const diagRecords = getDiagnosisRecords();
  const gameResults = getGameResults();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-amber-50">
      {/* ユーザー情報バー */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <span className="text-sm text-gray-500">
          <span className="text-indigo-500 font-semibold">{userId}</span> でログイン中
        </span>
        <button
          onClick={onLogout}
          className="text-xs text-gray-400 hover:text-red-400 transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-red-50"
        >
          ログアウト
        </button>
      </div>

      <div className="text-center animate-fade-in">
        {/* ロゴ・タイトル */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="text-4xl">🎒</span>
          <span className="text-3xl text-gray-300">→</span>
          <span className="text-4xl">🎓</span>
          <span className="text-3xl text-gray-300">→</span>
          <span className="text-4xl">💼</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3 tracking-tight">
          Job Story
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 mb-2">
          キャリア探索シミュレーション
        </p>
        <p className="text-sm text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
          子供時代の「好き」から、未来の仕事を見つけよう。
          <br />
          選択であなただけのストーリーが生まれる。
        </p>

        {/* はじめるボタン */}
        <button
          onClick={onStart}
          className="px-10 py-4 bg-indigo-500 hover:bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
        >
          はじめる
        </button>

        {/* 補足テキスト */}
        <p className="mt-6 text-xs text-gray-400">
          所要時間：約5〜10分
        </p>
      </div>

      {/* 履歴セクション */}
      {(gameResults.length > 0 || diagRecords.length > 0) && (
        <div className="mt-10 w-full max-w-sm space-y-6 animate-slide-up">
          {/* ゲーム結果履歴 */}
          {gameResults.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-3 text-center">
                🏆 過去のプレイ結果
              </h3>
              <div className="space-y-2">
                {gameResults.slice(0, 3).map((result) => {
                  const type = getDiagnosisType(result.primaryTrait);
                  return (
                    <div
                      key={result.id}
                      className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur rounded-xl border border-gray-100"
                    >
                      <span className="text-2xl">
                        {result.gameMode === 'childhood' ? '🎒' : '💼'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-700">
                          {type.emoji} {type.label}
                        </div>
                        <div className="text-xs text-gray-400 truncate">
                          TOP: {result.topJobTitles.join('、')}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-gray-400">{result.date}</div>
                        <div className="text-xs text-indigo-400">
                          {result.discoveredJobCount}職種発見
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 診断履歴 */}
          {diagRecords.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-3 text-center">
                📋 過去の診断結果
              </h3>
              <div className="space-y-2">
                {diagRecords.slice(0, 3).map((record) => {
                  const type = getDiagnosisType(record.primaryTrait);
                  return (
                    <button
                      key={record.id}
                      onClick={() => onViewDiagnosis(record)}
                      className="w-full flex items-center gap-3 p-3 bg-white/80 backdrop-blur rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-white transition-all cursor-pointer group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {type.emoji}
                      </span>
                      <div className="text-left flex-1">
                        <div className="text-sm font-semibold text-gray-700">
                          {type.label}
                        </div>
                        <div className="text-xs text-gray-400">
                          {record.date}
                          {record.gameMode && (
                            <span className="ml-2">
                              {record.gameMode === 'childhood' ? '🎒' : '💼'}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-gray-300 text-sm group-hover:text-indigo-400 transition-colors">
                        詳細 →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* フッター */}
      <div className="absolute bottom-6 text-xs text-gray-300">
        あなたの人生ストーリーを、ここから。
      </div>
    </div>
  );
}
