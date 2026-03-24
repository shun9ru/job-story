import { useState, useMemo, useCallback } from 'react';
import type { StatKey } from '../types';
import { analyzePersonality, generateAIPersonality, generateLocalPersonality } from '../utils/personality';
import type { PersonalityResult } from '../utils/personality';
import { getFromCache, saveToCache, getDailyRemaining, consumeDailyQuota, refundDailyQuota } from '../lib/ai-cache';
import { statDefinitions, skillCategories } from '../data/stats';

const CACHE_NS = 'personality';

/** プロファイル情報（ResultPageから渡される） */
interface ProfileInfo {
  emoji: string;
  label: string;
  tagline: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  growthAdvice: string;
}

interface PersonalityAnalysisProps {
  stats: Record<StatKey, number>;
  diagnosisStats?: Record<StatKey, number>;
  profile?: ProfileInfo;
}

/** パーソナリティ分析セクション */
export function PersonalityAnalysis({ stats, diagnosisStats, profile }: PersonalityAnalysisProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [aiOpenIndex, setAiOpenIndex] = useState<number | null>(null);

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

  // 固定文（常に表示）
  const fallback = useMemo(() => analyzePersonality(stats), [stats]);

  // AI生成
  const runAI = useCallback(async () => {
    if (cooldown) return;
    if (!consumeDailyQuota()) {
      setAiStatus('rate-limited');
      return;
    }
    setAiStatus('loading');
    setAiResult(null);
    setAiOpenIndex(null);
    setCooldown(true);
    setTimeout(() => setCooldown(false), 10_000);
    try {
      const generated = await generateAIPersonality(stats);
      setAiResult(generated);
      setAiStatus('done');
      saveToCache(CACHE_NS, stats as unknown as Record<string, unknown>, generated);
    } catch (e) {
      console.warn('AI分析フォールバック（ローカル生成に切替）:', e);
      refundDailyQuota();
      const local = generateLocalPersonality(stats);
      setAiResult(local);
      setAiStatus('done');
      saveToCache(CACHE_NS, stats as unknown as Record<string, unknown>, local);
    }
  }, [stats, cooldown]);

  return (
    <div className="space-y-4">
      {/* ===== 固定文セクション（常に表示） ===== */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
        <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 mb-1">
          🔮 {profile ? 'あなたのプロファイル' : 'パーソナリティ分析'}
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          あなたのステータス傾向から読み解く性格・潜在スキル
        </p>

        {/* 診断タイプ（価値観ベース） */}
        {profile && (
          <>
            <div className="text-center mb-4 py-4 rounded-xl bg-gradient-to-r from-violet-50 via-indigo-50 to-purple-50 border border-indigo-100">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">🔮 性格診断タイプ</p>
              <span className="text-4xl">{profile.emoji}</span>
              <h3 className="text-xl font-bold text-gray-800 mt-2">{profile.label}</h3>
              <p className="text-indigo-500 text-xs font-medium mt-1">{profile.tagline}</p>
              <p className="text-[10px] text-gray-400 mt-1">※ 価値観診断から判定</p>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line mb-4">
              {profile.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="bg-emerald-50 rounded-xl p-3">
                <p className="text-xs font-bold text-emerald-700 mb-1.5">💪 強み</p>
                <ul className="space-y-1">
                  {profile.strengths.map((s, i) => (
                    <li key={i} className="text-xs text-emerald-600 flex items-start gap-1.5">
                      <span className="text-emerald-400 mt-0.5">•</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-50 rounded-xl p-3">
                <p className="text-xs font-bold text-amber-700 mb-1.5">🌱 伸びしろ</p>
                <ul className="space-y-1">
                  {profile.weaknesses.map((s, i) => (
                    <li key={i} className="text-xs text-amber-600 flex items-start gap-1.5">
                      <span className="text-amber-400 mt-0.5">•</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-4 bg-indigo-50 rounded-xl p-3">
              <p className="text-xs font-bold text-indigo-700 mb-1">💡 アドバイス</p>
              <p className="text-xs text-indigo-600 leading-relaxed">{profile.growthAdvice}</p>
            </div>

            <hr className="border-gray-100 mb-4" />
          </>
        )}

        {/* ストーリー蓄積スキルのタイプ */}
        <div className="text-center py-4 mb-4 rounded-xl bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border border-amber-100">
          <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wider mb-1">📊 ストーリースキルタイプ</p>
          <span className="text-4xl">{fallback.emoji}</span>
          <h4 className="text-lg font-bold text-gray-800 mt-2">{fallback.title}</h4>
          <p className="text-xs text-amber-600 font-medium mt-1">{fallback.tagline}</p>
          <p className="text-[10px] text-gray-400 mt-1">※ ストーリーの選択で蓄積したスキルから判定</p>
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

        {/* 固定文アコーディオン */}
        <div className="space-y-1">
          {fallback.sections.map((section, i) => {
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

        {/* AI生成ボタン（未生成時のみここに表示） */}
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

        {/* ローディング */}
        {aiStatus === 'loading' && (
          <div className="mt-4 py-4 text-center">
            <span className="text-xs text-indigo-400 flex items-center justify-center gap-1">
              <span className="inline-block w-3 h-3 border-2 border-indigo-300 border-t-transparent rounded-full animate-spin" />
              AI分析中...
            </span>
          </div>
        )}

        {/* レート制限 */}
        {aiStatus === 'rate-limited' && (
          <div className="text-center py-4 mt-2">
            <p className="text-2xl mb-2">⏳</p>
            <p className="text-xs text-gray-500">
              本日のAI生成回数の上限に達しました。<br />
              明日またお試しください。
            </p>
          </div>
        )}
      </div>

      {/* ===== AI分析セクション（生成後に別カードとして表示） ===== */}
      {aiResult && aiStatus === 'done' && (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg p-6 animate-slide-up border border-purple-100">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              🤖 AI深掘り分析
            </h3>
            <span className="text-xs text-emerald-500 font-medium">AI generated</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            AIがあなたのデータをさらに詳しく分析しました
          </p>

          {/* AIタイプヘッダー */}
          <div className="text-center py-4 mb-4 rounded-xl bg-white/70">
            <span className="text-4xl">{aiResult.emoji}</span>
            <h4 className="text-lg font-bold text-gray-800 mt-2">{aiResult.title}</h4>
            <p className="text-xs text-purple-500 font-medium mt-1">{aiResult.tagline}</p>
          </div>

          {/* AIアコーディオン */}
          <div className="space-y-1">
            {aiResult.sections.map((section, i) => {
              const isOpen = aiOpenIndex === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setAiOpenIndex(isOpen ? null : i)}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                      isOpen
                        ? 'bg-purple-100/70 ring-1 ring-purple-200'
                        : 'hover:bg-white/50'
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
            onClick={runAI}
            disabled={cooldown || getDailyRemaining() <= 0}
            className="w-full mt-4 py-2 text-xs font-medium text-purple-400 hover:text-purple-600 hover:bg-white/50 rounded-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {cooldown ? '⏳ しばらくお待ちください...' : `別の視点で再分析する（残り${getDailyRemaining()}回）`}
          </button>
        </div>
      )}
    </div>
  );
}
