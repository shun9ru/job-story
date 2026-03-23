import { useState } from 'react';
import type { GameResultRecord } from '../utils/storage';
import { getDiagnosisType } from '../data/diagnosis';
import type { DiagnosisRecord } from '../types';
import { BgImage } from './BgImage';

interface TopPageProps {
  userId: string;
  diagRecords: DiagnosisRecord[];
  gameResults: GameResultRecord[];
  dataLoaded: boolean;
  onStartStory: () => void;
  onStartDiagnosis: () => void;
  onViewDiagnosis: (record: DiagnosisRecord) => void;
  onViewGameResult: (result: GameResultRecord) => void;
  onEncyclopedia: () => void;
  onLogout: () => void;
  onToggleGameFavorite: (id: string) => void;
  onDeleteGameResult: (id: string) => void;
  onDeleteDiagnosis: (id: string) => void;
}

/** トップ画面 */
export function TopPage({
  userId,
  diagRecords,
  gameResults,
  dataLoaded,
  onStartStory,
  onStartDiagnosis,
  onViewDiagnosis,
  onViewGameResult,
  onEncyclopedia,
  onLogout,
  onToggleGameFavorite,
  onDeleteGameResult,
  onDeleteDiagnosis,
}: TopPageProps) {
  const [tab, setTab] = useState<'home' | 'history'>('home');
  const [showAllGames, setShowAllGames] = useState(false);
  const [showAllDiag, setShowAllDiag] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // お気に入り順 → 日付降順でソート
  const sortedGameResults = [...gameResults].sort((a, b) => {
    if (a.favorite && !b.favorite) return -1;
    if (!a.favorite && b.favorite) return 1;
    return 0;
  });

  const displayedGames = showAllGames ? sortedGameResults : sortedGameResults.slice(0, 5);
  const displayedDiag = showAllDiag ? diagRecords : diagRecords.slice(0, 5);

  const handleDeleteGame = (id: string) => {
    if (confirmDeleteId === id) {
      onDeleteGameResult(id);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
      setTimeout(() => setConfirmDeleteId(null), 3000);
    }
  };

  const handleDeleteDiag = (id: string) => {
    if (confirmDeleteId === id) {
      onDeleteDiagnosis(id);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
      setTimeout(() => setConfirmDeleteId(null), 3000);
    }
  };

  const historyCount = gameResults.length + diagRecords.length;

  return (
    <BgImage imageKey="top" overlay={0.5} className="min-h-screen flex flex-col bg-gradient-to-br from-violet-100 via-indigo-50 via-50% to-amber-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="animated-bg">
        <div className="absolute top-[10%] right-[5%] w-72 h-72 rounded-full bg-purple-200/15 animate-float-slow" />
        <div className="absolute bottom-[20%] left-[5%] w-56 h-56 rounded-full bg-amber-200/15 animate-float-medium" />
        <div className="absolute top-[40%] left-[50%] w-40 h-40 rounded-full bg-pink-200/10 animate-float-fast" />
      </div>

      {/* ユーザー情報バー */}
      <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
        <span className="text-sm text-white/80 bg-black/30 backdrop-blur px-3 py-1 rounded-full">
          <span className="text-indigo-300 font-semibold">{userId}</span> でログイン中
        </span>
        <button
          onClick={onLogout}
          className="text-xs text-white/50 hover:text-red-300 transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-red-500/20"
        >
          ログアウト
        </button>
      </div>

      {/* タブナビゲーション */}
      <div className="w-full flex justify-center pt-14 pb-2 relative z-10">
        <div className="flex bg-black/30 backdrop-blur-lg rounded-full p-1 shadow-sm border border-white/20">
          <button
            onClick={() => setTab('home')}
            className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
              tab === 'home'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-200/50'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            🏠 ホーム
          </button>
          <button
            onClick={() => setTab('history')}
            className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              tab === 'history'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-200/50'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            📋 プレイ履歴
            {historyCount > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                tab === 'history'
                  ? 'bg-white/30 text-white'
                  : 'bg-indigo-100 text-indigo-600'
              }`}>
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ホームタブ */}
      {tab === 'home' && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
          <div className="text-center animate-fade-in">
            {/* Floating emoji row */}
            <div className="mb-6 flex items-center justify-center gap-2">
              <span className="text-4xl animate-float-slow inline-block">🎒</span>
              <span className="text-xl text-indigo-300 animate-sparkle">✦</span>
              <span className="text-4xl animate-float-medium inline-block">🎓</span>
              <span className="text-xl text-amber-300 animate-sparkle" style={{ animationDelay: '0.5s' }}>✦</span>
              <span className="text-4xl animate-float-fast inline-block">💼</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-3 tracking-tight animate-gradient-shift drop-shadow-lg">
              Job Story
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-2 drop-shadow-md">
              キャリア探索シミュレーション
            </p>
            <p className="text-sm text-white/70 mb-10 max-w-md mx-auto leading-relaxed drop-shadow-md">
              子供時代の「好き」から、未来の仕事を見つけよう。
              <br />
              選択であなただけのストーリーが生まれる。
            </p>

            {/* Main action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onStartStory}
                className="btn-glow px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white text-base font-semibold rounded-full shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50 transition-all duration-200 active:scale-95 cursor-pointer card-hover"
              >
                🎒 ストーリーで探す
              </button>
              <button
                onClick={onStartDiagnosis}
                className="btn-glow px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-base font-semibold rounded-full shadow-lg shadow-purple-200/50 hover:shadow-xl hover:shadow-purple-300/50 transition-all duration-200 active:scale-95 cursor-pointer card-hover"
              >
                🔮 性格診断だけ
              </button>
            </div>

            {/* Encyclopedia button */}
            <button
              onClick={onEncyclopedia}
              className="mt-4 px-8 py-3 bg-white/15 backdrop-blur hover:bg-white/25 text-white text-sm font-semibold rounded-full border-2 border-white/30 hover:border-white/50 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer card-hover"
            >
              📖 職種図鑑
            </button>

            {/* Info text */}
            <div className="mt-6 text-xs text-white/50 space-y-1">
              <p>ストーリー：診断＋シミュレーション（約5〜10分）</p>
              <p>性格診断：10問の質問で性格タイプを分析（約2分）</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pb-6 pt-8 text-xs text-white/40">
            あなたの人生ストーリーを、ここから。
          </div>
        </div>
      )}

      {/* 履歴タブ */}
      {tab === 'history' && (
        <div className="flex-1 flex flex-col items-center px-4 pt-4 pb-8 overflow-y-auto relative z-10">
          {!dataLoaded && (
            <div className="mt-10 text-sm text-white/60 animate-pulse">データを読み込み中...</div>
          )}
          {dataLoaded && historyCount === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-white/60">
              <span className="text-4xl mb-4">📭</span>
              <p className="text-sm">まだプレイ履歴がありません</p>
              <button
                onClick={() => setTab('home')}
                className="mt-4 text-sm text-indigo-300 hover:text-indigo-200 cursor-pointer"
              >
                ホームに戻ってプレイする →
              </button>
            </div>
          )}
          {dataLoaded && historyCount > 0 && (
            <div className="w-full max-w-md space-y-6 animate-fade-in">
              {/* ゲーム結果履歴 */}
              {gameResults.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-white/70 mb-3 flex items-center gap-2">
                    🏆 プレイ結果
                    <span className="bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full">
                      {gameResults.length}件
                    </span>
                  </h3>
                  <div className="space-y-2">
                    {displayedGames.map((result) => {
                      const type = getDiagnosisType(result.primaryStat);
                      const jobCount = result.discoveredJobIds?.length ?? result.discoveredJobCount ?? 0;
                      const isConfirmingDelete = confirmDeleteId === result.id;
                      return (
                        <div
                          key={result.id}
                          className={`relative flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl border transition-all card-hover ${
                            result.favorite
                              ? 'border-amber-200 bg-amber-50/50 shadow-sm shadow-amber-100/50'
                              : 'border-white/50 hover:border-indigo-200 hover:bg-white'
                          }`}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleGameFavorite(result.id);
                            }}
                            className="text-lg hover:scale-125 transition-transform cursor-pointer shrink-0"
                            title={result.favorite ? 'お気に入り解除' : 'お気に入り'}
                          >
                            {result.favorite ? '⭐' : '☆'}
                          </button>

                          <button
                            onClick={() => onViewGameResult(result)}
                            className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer"
                          >
                            <span className="text-2xl hover:scale-110 transition-transform">
                              {result.gameMode === 'childhood' ? '🎒' : '💼'}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-gray-700">
                                {type.emoji} {type.label}
                              </div>
                              <div className="text-xs text-gray-400 truncate">
                                {jobCount}職種発見
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-xs text-gray-400">{result.date}</div>
                              <span className="text-gray-300 text-sm hover:text-indigo-400 transition-colors">
                                詳細 →
                              </span>
                            </div>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteGame(result.id);
                            }}
                            className={`text-xs px-2 py-1 rounded-lg transition-all cursor-pointer shrink-0 ${
                              isConfirmingDelete
                                ? 'bg-red-500 text-white'
                                : 'text-gray-300 hover:text-red-400 hover:bg-red-50'
                            }`}
                            title="削除"
                          >
                            {isConfirmingDelete ? '削除?' : '×'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  {gameResults.length > 5 && (
                    <button
                      onClick={() => setShowAllGames((v) => !v)}
                      className="w-full mt-2 py-2 text-xs text-indigo-300 hover:text-indigo-200 hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                    >
                      {showAllGames ? '▲ 閉じる' : `▼ すべて表示（${gameResults.length}件）`}
                    </button>
                  )}
                </div>
              )}

              {/* 診断履歴 */}
              {diagRecords.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-white/70 mb-3 flex items-center gap-2">
                    🔮 診断結果
                    <span className="bg-purple-500/30 text-purple-200 px-2 py-0.5 rounded-full">
                      {diagRecords.length}件
                    </span>
                  </h3>
                  <div className="space-y-2">
                    {displayedDiag.map((record) => {
                      const type = getDiagnosisType(record.primaryStat);
                      const isConfirmingDelete = confirmDeleteId === record.id;
                      return (
                        <div
                          key={record.id}
                          className="relative flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 hover:border-indigo-200 hover:bg-white transition-all card-hover"
                        >
                          <button
                            onClick={() => onViewDiagnosis(record)}
                            className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer"
                          >
                            <span className="text-2xl hover:scale-110 transition-transform">
                              {type.emoji}
                            </span>
                            <div className="flex-1">
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
                            <span className="text-gray-300 text-sm hover:text-indigo-400 transition-colors">
                              詳細 →
                            </span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteDiag(record.id);
                            }}
                            className={`text-xs px-2 py-1 rounded-lg transition-all cursor-pointer shrink-0 ${
                              isConfirmingDelete
                                ? 'bg-red-500 text-white'
                                : 'text-gray-300 hover:text-red-400 hover:bg-red-50'
                            }`}
                            title="削除"
                          >
                            {isConfirmingDelete ? '削除?' : '×'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  {diagRecords.length > 5 && (
                    <button
                      onClick={() => setShowAllDiag((v) => !v)}
                      className="w-full mt-2 py-2 text-xs text-indigo-300 hover:text-indigo-200 hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                    >
                      {showAllDiag ? '▲ 閉じる' : `▼ すべて表示（${diagRecords.length}件）`}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </BgImage>
  );
}
