import { useState, useMemo, useCallback } from 'react';
import type { StatKey } from '../types';
import { analyzePersonality, generateAIPersonality } from '../utils/personality';
import type { PersonalityResult } from '../utils/personality';
import { getFromCache, saveToCache } from '../lib/ai-cache';

const CACHE_NS = 'personality';

interface PersonalityAnalysisProps {
  stats: Record<StatKey, number>;
}

/** パーソナリティ分析セクション */
export function PersonalityAnalysis({ stats }: PersonalityAnalysisProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // キャッシュチェック
  const cached = useMemo(
    () => getFromCache<PersonalityResult>(CACHE_NS, stats as unknown as Record<string, unknown>),
    [stats],
  );

  const [aiResult, setAiResult] = useState<PersonalityResult | null>(cached);
  const [aiStatus, setAiStatus] = useState<'idle' | 'loading' | 'done' | 'error'>(
    cached ? 'done' : 'idle',
  );

  // フォールバック（固定文）
  const fallback = useMemo(() => analyzePersonality(stats), [stats]);

  // 表示する結果（AI優先、なければ固定文）
  const result = aiResult ?? fallback;

  // AI生成
  const runAI = useCallback(async () => {
    setAiStatus('loading');
    setAiResult(null);
    setOpenIndex(null);
    try {
      const generated = await generateAIPersonality(stats);
      setAiResult(generated);
      setAiStatus('done');
      saveToCache(CACHE_NS, stats as unknown as Record<string, unknown>, generated);
    } catch (e) {
      console.error('AI分析エラー:', e);
      setAiStatus('error');
    }
  }, [stats]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
          🔮 パーソナリティ分析
        </h3>
        {/* AI状態インジケーター */}
        {aiStatus === 'loading' && (
          <span className="text-xs text-indigo-400 flex items-center gap-1">
            <span className="inline-block w-3 h-3 border-2 border-indigo-300 border-t-transparent rounded-full animate-spin" />
            AI分析中...
          </span>
        )}
        {aiStatus === 'done' && (
          <span className="text-xs text-emerald-500 font-medium">AI generated</span>
        )}
        {aiStatus === 'error' && (
          <button
            onClick={runAI}
            className="text-xs text-amber-500 hover:text-amber-600 cursor-pointer font-medium"
          >
            再生成
          </button>
        )}
      </div>
      <p className="text-xs text-gray-400 mb-4">
        あなたのステータス傾向から読み解く性格・潜在スキル
      </p>

      {/* タイプヘッダー */}
      <div className={`text-center py-4 mb-4 rounded-xl transition-all duration-500 ${
        aiStatus === 'loading'
          ? 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 animate-pulse'
          : 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50'
      }`}>
        <span className="text-4xl">{result.emoji}</span>
        <h4 className="text-lg font-bold text-gray-800 mt-2">{result.title}</h4>
        <p className="text-xs text-indigo-500 font-medium mt-1">{result.tagline}</p>
      </div>

      {/* アコーディオンセクション */}
      <div className="space-y-1">
        {result.sections.map((section, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                  isOpen
                    ? 'bg-indigo-50 ring-1 ring-indigo-200'
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

      {/* AI生成ボタン */}
      {aiStatus === 'idle' && (
        <button
          onClick={runAI}
          className="w-full mt-4 py-2.5 text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-all cursor-pointer shadow-sm"
        >
          🤖 AIでもっと詳しく分析する
        </button>
      )}
      {aiStatus === 'done' && (
        <button
          onClick={runAI}
          className="w-full mt-4 py-2 text-xs font-medium text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"
        >
          別の視点で再分析する
        </button>
      )}
    </div>
  );
}
