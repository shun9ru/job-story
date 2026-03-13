import { useState, useMemo, useCallback } from 'react';
import type { TraitKey, StatKey } from '../types';
import { generateDiagnosisAIReview } from '../utils/personality';
import type { DiagnosisAIReview } from '../utils/personality';
import { getFromCache, saveToCache } from '../lib/ai-cache';

const CACHE_NS = 'diag_review';

interface DiagnosisAIReviewProps {
  primaryTrait: TraitKey;
  secondaryTrait: TraitKey;
  traits: Record<TraitKey, number>;
  stats?: Record<StatKey, number>;
}

/** 診断結果のAIレビューセクション */
export function DiagnosisAIReviewSection({
  primaryTrait,
  secondaryTrait,
  traits,
  stats,
}: DiagnosisAIReviewProps) {
  // キャッシュキー用の入力
  const cacheInput = useMemo(
    () => ({ primaryTrait, secondaryTrait, traits, stats } as unknown as Record<string, unknown>),
    [primaryTrait, secondaryTrait, traits, stats],
  );

  const cached = useMemo(() => getFromCache<DiagnosisAIReview>(CACHE_NS, cacheInput), [cacheInput]);

  const [review, setReview] = useState<DiagnosisAIReview | null>(cached);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>(
    cached ? 'done' : 'idle',
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const generate = useCallback(async () => {
    setStatus('loading');
    setReview(null);
    setOpenIndex(null);
    try {
      const result = await generateDiagnosisAIReview(primaryTrait, secondaryTrait, traits, stats);
      setReview(result);
      setStatus('done');
      saveToCache(CACHE_NS, cacheInput, result);
    } catch (e) {
      console.error('AI診断レビューエラー:', e);
      setStatus('error');
    }
  }, [primaryTrait, secondaryTrait, traits, stats, cacheInput]);

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
            className="text-xs text-amber-500 hover:text-amber-600 cursor-pointer font-medium"
          >
            再生成
          </button>
        )}
      </div>

      {/* 未生成状態 */}
      {status === 'idle' && (
        <div className="text-center py-6">
          <p className="text-xs text-gray-400 mb-4">
            AIがあなたの診断結果を深掘りしてレビューします
          </p>
          <button
            onClick={generate}
            className="px-6 py-2.5 text-xs font-medium text-white bg-purple-500 hover:bg-purple-600 rounded-lg transition-all cursor-pointer shadow-sm"
          >
            🤖 AIレビューを生成する
          </button>
        </div>
      )}

      {/* ローディング */}
      {status === 'loading' && (
        <div className="py-4">
          <p className="text-xs text-gray-400 mb-4">
            AIがあなたの診断結果を分析しています...
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
            className="w-full mt-4 py-2 text-xs font-medium text-purple-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all cursor-pointer"
          >
            別の視点で再レビューする
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
