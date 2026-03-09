import { useState, useMemo } from 'react';
import { getRandomQuestions, getDiagnosisType, getSecondaryTrait } from '../data/diagnosis';
import { saveDiagnosisRecord } from '../utils/storage';
import type { TraitKey, GameMode } from '../types';

interface DiagnosisPageProps {
  gameMode: GameMode;
  onAnswer: (effects: Partial<Record<TraitKey, number>>) => void;
  onComplete: () => void;
}

/** 簡易性格診断画面（ランダム出題） */
export function DiagnosisPage({ gameMode, onAnswer, onComplete }: DiagnosisPageProps) {
  // 初回マウント時にランダム10問を決定（再レンダリングでは変わらない）
  const questions = useMemo(() => getRandomQuestions(10), []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [traits, setTraits] = useState<Record<TraitKey, number>>({
    communication: 0,
    planning: 0,
    analysis: 0,
    stability: 0,
    challenge: 0,
    creative: 0,
    care: 0,
    technical: 0,
  });

  const totalQuestions = questions.length;
  const question = currentIndex < totalQuestions ? questions[currentIndex] : null;

  const handleSelect = (effects: Partial<Record<TraitKey, number>>) => {
    const newTraits = { ...traits };
    for (const [key, value] of Object.entries(effects)) {
      newTraits[key as TraitKey] += value!;
    }
    setTraits(newTraits);
    onAnswer(effects);

    if (currentIndex + 1 >= totalQuestions) {
      // 結果をlocalStorageに保存
      const primaryKey = (Object.entries(newTraits) as [TraitKey, number][])
        .sort((a, b) => b[1] - a[1])[0][0];
      const secondaryKey = getSecondaryTrait(newTraits);
      saveDiagnosisRecord({
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('ja-JP'),
        primaryTrait: primaryKey,
        secondaryTrait: secondaryKey,
        traits: newTraits,
        gameMode,
      });
      setShowResult(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // 結果表示
  if (showResult) {
    const primaryKey = (Object.entries(traits) as [TraitKey, number][]).sort(
      (a, b) => b[1] - a[1],
    )[0][0];
    const diagType = getDiagnosisType(primaryKey);
    const secondaryKey = getSecondaryTrait(traits);
    const subType = getDiagnosisType(secondaryKey);

    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center animate-bounce-in">
          <p className="text-sm text-indigo-500 font-semibold mb-2">
            診断結果
          </p>
          <div className="text-6xl mb-3">{diagType.emoji}</div>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full mb-6">
            <span className="text-lg">{subType.emoji}</span>
            <span className="text-xs text-gray-500">
              サブタイプ: <span className="font-semibold text-gray-700">{subType.label}</span>
            </span>
          </div>

          {/* 強み3つをプレビュー */}
          <div className="text-left bg-emerald-50 rounded-xl p-4 mb-6">
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
            onClick={onComplete}
            className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-full shadow transition-all duration-200 active:scale-95 cursor-pointer"
          >
            {gameMode === 'childhood'
              ? '人生ストーリーを始める 🎒'
              : 'キャリアシミュレーションを始める 💼'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-amber-50">
      <div className="max-w-lg w-full animate-fade-in">
        {/* モードバッジ */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full text-xs font-medium text-gray-500 shadow-sm">
            {gameMode === 'childhood' ? '🎒 子供時代→就活コース' : '💼 社会人編'}
          </span>
        </div>

        {/* 進捗バー */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>質問 {currentIndex + 1} / {totalQuestions}</span>
            <span>🔮 性格診断</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-400 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* 質問カード */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 animate-slide-up" key={question!.id}>
          {question!.emoji && (
            <div className="text-3xl mb-3">{question!.emoji}</div>
          )}
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-6 leading-relaxed">
            {question!.text}
          </h2>

          <div className="space-y-3">
            {question!.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleSelect(option.effects)}
                className="w-full text-left p-4 border-2 border-gray-100 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 active:scale-[0.98] cursor-pointer group"
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
    </div>
  );
}
