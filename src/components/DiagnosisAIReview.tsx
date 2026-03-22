import { useState, useMemo, useCallback } from 'react';
import type { StatKey, ValueKey } from '../types';
import { generateDiagnosisAIReview } from '../utils/personality';
import type { DiagnosisAIReview } from '../utils/personality';
import { getFromCache, saveToCache, getDailyRemaining, consumeDailyQuota, refundDailyQuota } from '../lib/ai-cache';

const CACHE_NS = 'diag_review';

interface DiagnosisAIReviewProps {
  primaryStat: StatKey;
  secondaryStat: StatKey;
  values: Record<ValueKey, number>;
}

/** 診断結果のAIレビューセクション */
export function DiagnosisAIReviewSection({
  primaryStat,
  secondaryStat,
  values,
}: DiagnosisAIReviewProps) {
  // キャッシュキー用の入力
  const cacheInput = useMemo(
    () => ({ primaryStat, secondaryStat, values } as unknown as Record<string, unknown>),
    [primaryStat, secondaryStat, values],
  );

  const cached = useMemo(() => getFromCache<DiagnosisAIReview>(CACHE_NS, cacheInput), [cacheInput]);

  const [review, setReview] = useState<DiagnosisAIReview | null>(cached);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error' | 'rate-limited'>(
    cached ? 'done' : 'idle',
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [cooldown, setCooldown] = useState(false);

  const remaining = getDailyRemaining();

  const generate = useCallback(async () => {
    if (cooldown) return;
    if (!consumeDailyQuota()) {
      setStatus('rate-limited');
      return;
    }
    setStatus('loading');
    setReview(null);
    setOpenIndex(null);
    // 再生成後30秒のクールダウン
    setCooldown(true);
    setTimeout(() => setCooldown(false), 10_000);
    try {
      const result = await generateDiagnosisAIReview(primaryStat, secondaryStat, values);
      setReview(result);
      setStatus('done');
      saveToCache(CACHE_NS, cacheInput, result);
    } catch (e) {
      console.error('AI診断レビューエラー:', e);
      refundDailyQuota();
      setStatus('error');
    }
  }, [primaryStat, secondaryStat, values, cacheInput, cooldown]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
          🤖 AIレビュー
        </h3>
        {status === 'loading' && (
          <span className="text-xs text-indigo-400 flex items-center gap-1">
            <span className="inline-block w-3 h-3 border-2 border-indigo-300 border-t-transparent rounded-full animate-spin" />
            分析中...
          </span>
        )}
        {status === 'done' && (
          <span className="text-xs text-emerald-500 font-medium">AI generated</span>
        )}
        {status === 'error' && (
          <button
            onClick={generate}
            disabled={cooldown}
            className="text-xs text-amber-500 hover:text-amber-600 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            再生成
          </button>
        )}
      </div>

      {/* 未生成状態 */}
      {status === 'idle' && (
        <div className="text-center py-6">
          <p className="text-xs text-gray-400 mb-4">
            AIがあなたの価値観診断を深掘りしてレビューします
          </p>
          <button
            onClick={generate}
            className="px-6 py-2.5 text-xs font-medium text-white bg-purple-500 hover:bg-purple-600 rounded-lg transition-all cursor-pointer shadow-sm"
          >
            🤖 AIレビューを生成する
          </button>
          <p className="text-[10px] text-gray-300 mt-2">本日の残り回数: {remaining}回</p>
        </div>
      )}

      {/* ローディング */}
      {status === 'loading' && (
        <div className="py-4">
          <p className="text-xs text-gray-400 mb-4">
            AIがあなたの価値観を分析しています...
          </p>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-50 rounded w-full mb-1" />
                <div className="h-3 bg-gray-50 rounded w-4/5" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* レート制限 */}
      {status === 'rate-limited' && (
        <div className="text-center py-6">
          <p className="text-2xl mb-2">⏳</p>
          <p className="text-xs text-gray-500">
            本日のAI生成回数の上限に達しました。<br />
            明日またお試しください。
          </p>
        </div>
      )}

      {/* レビュー表示 */}
      {review && status === 'done' && (
        <>
          <p className="text-xs text-gray-400 mb-4">
            AIがあなた専用のレビューを生成しました
          </p>

          {/* ヘッドライン */}
          <div className="text-center py-4 mb-4 rounded-xl bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50">
            <span className="text-4xl">{review.emoji}</span>
            <h4 className="text-lg font-bold text-gray-800 mt-2">{review.headline}</h4>
          </div>

          {/* アコーディオンセクション */}
          <div className="space-y-1">
            {review.sections.map((section, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                      isOpen
                        ? 'bg-purple-50 ring-1 ring-purple-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm font-bold text-gray-700">{section.heading}</span>
                    <span className={`text-gray-400 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 py-3 animate-fade-in">
                      <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                        {section.body}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 再生成ボタン */}
          <button
            onClick={generate}
            disabled={cooldown || getDailyRemaining() <= 0}
            className="w-full mt-4 py-2 text-xs font-medium text-purple-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {cooldown ? '⏳ しばらくお待ちください...' : `別の視点で再レビューする（残り${getDailyRemaining()}回）`}
          </button>
        </>
      )}

      {/* エラー状態 */}
      {status === 'error' && !review && (
        <p className="text-xs text-gray-400 mt-2">
          生成に失敗しました。しばらく待ってから再生成をお試しください
        </p>
      )}
    </div>
  );
}
