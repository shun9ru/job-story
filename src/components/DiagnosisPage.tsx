import { useState, useMemo } from 'react';
import { getRandomQuestions, getDiagnosisType, getPrimaryStatFromValues, getSecondaryStatFromValues } from '../data/diagnosis';
import type { StatKey, ValueKey, GameMode } from '../types';
import { initialStats, initialValues, valueDefinitions } from '../data/stats';
import { BgImage } from './BgImage';

interface DiagnosisPageProps {
  gameMode: GameMode;
  diagnosisOnly?: boolean;
  onAnswer: (effects: Partial<Record<StatKey, number>>) => void;
  onComplete: (
    stats: Record<StatKey, number>,
    values: Record<ValueKey, number>,
    primaryKey: StatKey,
    secondaryKey: StatKey,
  ) => void;
}

/** 簡易性格診断画面（ランダム出題） */
export function DiagnosisPage({ gameMode, diagnosisOnly, onAnswer, onComplete }: DiagnosisPageProps) {
  const questions = useMemo(() => getRandomQuestions(20), []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [stats, setStats] = useState<Record<StatKey, number>>({ ...initialStats });
  const [values, setValues] = useState<Record<ValueKey, number>>({ ...initialValues });

  const totalQuestions = questions.length;
  const question = currentIndex < totalQuestions ? questions[currentIndex] : null;

  const handleSelect = (
    effects: Partial<Record<StatKey, number>>,
    statEffects?: Partial<Record<StatKey, number>>,
    valueEffects?: Partial<Record<ValueKey, number>>,
  ) => {
    const newStats = { ...stats };
    for (const [key, value] of Object.entries(effects)) {
      newStats[key as StatKey] += value!;
    }
    if (statEffects) {
      for (const [key, value] of Object.entries(statEffects)) {
        newStats[key as StatKey] += value!;
      }
    }
    setStats(newStats);

    // Apply value effects (clamp 0-100)
    if (valueEffects) {
      const newValues = { ...values };
      for (const [key, value] of Object.entries(valueEffects)) {
        newValues[key as ValueKey] = Math.max(0, Math.min(100, newValues[key as ValueKey] + value!));
      }
      setValues(newValues);
    }

    onAnswer({});

    if (currentIndex + 1 >= totalQuestions) {
      setShowResult(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // 結果表示
  if (showResult) {
    const primaryKey = getPrimaryStatFromValues(values);
    const diagType = getDiagnosisType(primaryKey);
    const secondaryKey = getSecondaryStatFromValues(values);
    const subType = getDiagnosisType(secondaryKey);

    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-violet-100 via-indigo-50 to-pink-50 relative overflow-hidden">
        {/* Celebration background */}
        <div className="animated-bg">
          <div className="absolute top-[10%] left-[10%] w-48 h-48 rounded-full bg-purple-200/20 animate-float-slow" />
          <div className="absolute bottom-[20%] right-[10%] w-40 h-40 rounded-full bg-pink-200/20 animate-float-medium" />
        </div>
        <div className="absolute top-[8%] right-[15%] text-2xl animate-float-slow opacity-30 select-none">🎉</div>
        <div className="absolute bottom-[12%] left-[12%] text-2xl animate-float-medium opacity-25 select-none">🌟</div>

        <div className="max-w-md w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl shadow-indigo-100/50 p-8 text-center animate-bounce-in relative z-10 border border-white/50">
          <p className="text-sm bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-semibold mb-2">
            診断結果
          </p>
          <div className="text-6xl mb-3 animate-scale-in">{diagType.emoji}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            あなたは「{diagType.label}」
          </h2>
          <p className="text-indigo-500 text-xs font-medium mb-4">
            {diagType.tagline}
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            {diagType.description}
          </p>

          {/* サブタイプ */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full mb-5 border border-indigo-100">
            <span className="text-lg">{subType.emoji}</span>
            <span className="text-xs text-gray-500">
              サブタイプ: <span className="font-semibold text-gray-700">{subType.label}</span>
            </span>
          </div>

          {/* 価値観プレビュー */}
          <div className="text-left bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-5 border border-amber-100">
            <p className="text-xs font-bold text-amber-700 mb-3">🧭 あなたの価値観</p>
            <div className="space-y-2.5">
              {valueDefinitions.map((vd) => {
                const val = values[vd.key];
                return (
                  <div key={vd.key}>
                    <div className="flex justify-between text-[10px] text-gray-400 mb-0.5">
                      <span>{vd.lowLabel}</span>
                      <span className="font-medium text-gray-600">{vd.emoji} {vd.label}</span>
                      <span>{vd.highLabel}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-amber-300 to-orange-400 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 強み3つをプレビュー */}
          <div className="text-left bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-6 border border-emerald-100">
            <p className="text-xs font-bold text-emerald-700 mb-2">💪 あなたの強み</p>
            <ul className="space-y-1">
              {diagType.strengths.slice(0, 3).map((s, i) => (
                <li key={i} className="text-xs text-emerald-600 flex items-start gap-1.5">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-gray-400 mb-4">
            ※ 詳細な解説はホーム画面の「診断履歴」から見返せます
          </p>

          <button
            onClick={() => onComplete({ ...initialStats }, values, primaryKey, secondaryKey)}
            className="btn-glow px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-full shadow-lg shadow-indigo-200/50 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            {diagnosisOnly
              ? '詳しい結果を見る 🔮'
              : gameMode === 'childhood'
                ? '人生ストーリーを始める 🎒'
                : 'キャリアシミュレーションを始める 💼'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <BgImage imageKey="diagnosis" overlay={0.45} className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-violet-100 via-indigo-50 via-50% to-amber-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="animated-bg">
        <div className="absolute top-[20%] right-[8%] w-40 h-40 rounded-full bg-purple-200/15 animate-float-slow" />
        <div className="absolute bottom-[15%] left-[8%] w-48 h-48 rounded-full bg-amber-200/10 animate-float-medium" />
      </div>

      <div className="max-w-lg w-full animate-fade-in relative z-10">
        {/* モードバッジ */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs font-medium text-gray-500 shadow-sm border border-white/50">
            {diagnosisOnly ? '🔮 性格診断' : gameMode === 'childhood' ? '🎒 子供時代→就活コース' : '💼 社会人編'}
          </span>
        </div>

        {/* 進捗バー */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>質問 {currentIndex + 1} / {totalQuestions}</span>
            <span>🔮 性格診断</span>
          </div>
          <div className="w-full bg-gray-200/60 rounded-full h-2.5 backdrop-blur">
            <div
              className="bg-gradient-to-r from-indigo-400 to-purple-400 h-2.5 rounded-full transition-all duration-500 progress-glow"
              style={{
                width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* 質問カード */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl shadow-indigo-100/30 p-6 sm:p-8 animate-slide-up border border-white/50" key={question!.id}>
          {question!.emoji && (
            <div className="text-3xl mb-3 animate-scale-in">{question!.emoji}</div>
          )}
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 leading-relaxed">
            {question!.text}
          </h2>

          <div className="space-y-3">
            {question!.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleSelect(option.effects, option.statEffects, option.valueEffects)}
                className="w-full text-left p-4 border-2 border-gray-100/80 rounded-xl hover:border-indigo-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 active:scale-[0.98] cursor-pointer group bg-white/60"
              >
                <div className="flex items-center gap-3">
                  {option.emoji && (
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {option.emoji}
                    </span>
                  )}
                  <span className="text-gray-700 font-medium">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </BgImage>
  );
}
