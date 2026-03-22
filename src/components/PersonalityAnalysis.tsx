import { useState, useMemo, useCallback } from 'react';
import type { StatKey } from '../types';
import { analyzePersonality, generateAIPersonality } from '../utils/personality';
import type { PersonalityResult } from '../utils/personality';
import { getFromCache, saveToCache, getDailyRemaining, consumeDailyQuota, refundDailyQuota } from '../lib/ai-cache';
import { statDefinitions, skillCategories } from '../data/stats';

const CACHE_NS = 'personality';

interface PersonalityAnalysisProps {
  stats: Record<StatKey, number>;
  diagnosisStats?: Record<StatKey, number>;
}

/** パーソナリティ分析セクション */
export function PersonalityAnalysis({ stats, diagnosisStats }: PersonalityAnalysisProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // キャッシュチェック
  const cached = useMemo(
    () => getFromCache<PersonalityResult>(CACHE_NS, stats as unknown as Record<string, unknown>),
    [stats],
  );

  const [aiResult, setAiResult] = useState<PersonalityResult | null>(cached);
  const [aiStatus, setAiStatus] = useState<'idle' | 'loading' | 'done' | 'error' | 'rate-limited'>(
    cached ? 'done' : 'idle',
  );
  const [cooldown, setCooldown] = useState(false);

  // フォールバック（固定文）
  const fallback = useMemo(() => analyzePersonality(stats), [stats]);

  // 表示する結果（AI優先、なければ固定文）
  const result = aiResult ?? fallback;

  // AI生成
  const runAI = useCallback(async () => {
    if (cooldown) return;
    if (!consumeDailyQuota()) {
      setAiStatus('rate-limited');
      return;
    }
    setAiStatus('loading');
    setAiResult(null);
    setOpenIndex(null);
    setCooldown(true);
    setTimeout(() => setCooldown(false), 10_000);
    try {
      const generated = await generateAIPersonality(stats);
      setAiResult(generated);
      setAiStatus('done');
      saveToCache(CACHE_NS, stats as unknown as Record<string, unknown>, generated);
    } catch (e) {
      console.error('AI分析エラー:', e);
      refundDailyQuota();
      setAiStatus('error');
    }
  }, [stats, cooldown]);

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
            disabled={cooldown}
            className="text-xs text-amber-500 hover:text-amber-600 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* スキル分布（カテゴリ別） */}
      {diagnosisStats && (
        <div className="mb-4">
          <p className="text-xs font-bold text-gray-600 mb-3 flex items-center gap-1.5">
            🔮 性格診断スキル分布
          </p>
          {skillCategories.map((cat) => {
            const defs = statDefinitions.filter((d) => d.category === cat.key);
            const hasValues = defs.some((d) => diagnosisStats[d.key] > 0);
            if (!hasValues) return null;
            return (
              <div key={cat.key} className="mb-3">
                <p className="text-[10px] text-gray-400 font-medium mb-1.5 flex items-center gap-1">
                  <span>{cat.emoji}</span>{cat.label}
                </p>
                <div className="space-y-1.5">
                  {defs.map((def) => {
                    const value = diagnosisStats[def.key];
                    const maxVal = Math.max(...Object.values(diagnosisStats), 1);
                    const pct = Math.round((value / maxVal) * 100);
                    return (
                      <div key={def.key} className="flex items-center gap-2">
                        <span className="text-sm w-5 text-center">{def.emoji}</span>
                        <span className="text-[11px] text-gray-500 w-16 shrink-0">{def.label}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`${def.color} h-full rounded-full transition-all duration-500`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-gray-600 w-6 text-right">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* レート制限 */}
      {aiStatus === 'rate-limited' && (
        <div className="text-center py-4 mb-2">
          <p className="text-2xl mb-2">⏳</p>
          <p className="text-xs text-gray-500">
            本日のAI生成回数の上限に達しました。<br />
            明日またお試しください。
          </p>
        </div>
      )}

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
        <div>
          <button
            onClick={runAI}
            className="w-full mt-4 py-2.5 text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-all cursor-pointer shadow-sm"
          >
            🤖 AIでもっと詳しく分析する
          </button>
          <p className="text-[10px] text-gray-300 mt-1 text-center">本日の残り回数: {getDailyRemaining()}回</p>
        </div>
      )}
      {aiStatus === 'done' && (
        <button
          onClick={runAI}
          disabled={cooldown || getDailyRemaining() <= 0}
          className="w-full mt-4 py-2 text-xs font-medium text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {cooldown ? '⏳ しばらくお待ちください...' : `別の視点で再分析する（残り${getDailyRemaining()}回）`}
        </button>
      )}
    </div>
  );
}
