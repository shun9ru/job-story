import { useState, useCallback, useMemo } from 'react';
import type { JobExperience, ExperienceScene, ExperienceChoice } from '../data/job-experiences';
import { saveExperienceReflection } from '../utils/storage';
import type { ExperienceReflection, ExperienceHistoryEntry } from '../utils/storage';

interface Props {
  experience: JobExperience;
  onClose: () => void;
  onReflectionSaved?: (reflection: ExperienceReflection) => void;
}

type Phase =
  | { type: 'intro' }
  | { type: 'scene'; sceneIndex: number; chosen: false }
  | { type: 'scene'; sceneIndex: number; chosen: true; choiceId: string }
  | { type: 'ending' }
  | { type: 'reflection' };

/** シーンごとに安定したシャッフルを行う（同じシーンなら同じ順番） */
function shuffleChoices(choices: ExperienceChoice[], seed: number): ExperienceChoice[] {
  const result = [...choices];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = (s >>> 0) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** シーンIDから数値シードを生成 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) & 0xffffffff;
  }
  return hash;
}

/** 職業体験ミニゲーム */
export function JobExperienceGame({ experience, onClose, onReflectionSaved }: Props) {
  const [phase, setPhase] = useState<Phase>({ type: 'intro' });
  const [scores, setScores] = useState<Record<string, number>>(() =>
    Object.fromEntries(experience.metrics.map((m) => [m.key, 0])),
  );
  const [history, setHistory] = useState<{ sceneId: string; choiceId: string }[]>([]);

  const totalScenes = experience.scenes.length;

  // 現在のシーン
  const currentScene: ExperienceScene | null =
    phase.type === 'scene' ? experience.scenes[phase.sceneIndex] : null;

  // 選んだ選択肢
  const chosenChoice: ExperienceChoice | null = useMemo(() => {
    if (phase.type !== 'scene' || !phase.chosen || !currentScene) return null;
    return currentScene.choices.find((c) => c.id === phase.choiceId) ?? null;
  }, [phase, currentScene]);

  // 進捗 (0-1)
  const progress = useMemo(() => {
    if (phase.type === 'intro') return 0;
    if (phase.type === 'ending') return 1;
    if (phase.type === 'reflection') return 1;
    return (phase.sceneIndex + (phase.chosen ? 0.5 : 0)) / totalScenes;
  }, [phase, totalScenes]);

  // 選択肢を選ぶ
  const handleChoice = useCallback(
    (choice: ExperienceChoice) => {
      if (phase.type !== 'scene' || !currentScene) return;
      setScores((prev) => {
        const next = { ...prev };
        for (const [key, val] of Object.entries(choice.effects)) {
          next[key] = (next[key] ?? 0) + val;
        }
        return next;
      });
      setHistory((prev) => [...prev, { sceneId: currentScene.id, choiceId: choice.id }]);
      setPhase({ type: 'scene', sceneIndex: phase.sceneIndex, chosen: true, choiceId: choice.id });
    },
    [phase, currentScene],
  );

  // 次へ進む
  const handleNext = useCallback(() => {
    if (phase.type === 'intro') {
      setPhase({ type: 'scene', sceneIndex: 0, chosen: false });
    } else if (phase.type === 'scene' && phase.chosen) {
      const nextIndex = phase.sceneIndex + 1;
      if (nextIndex < totalScenes) {
        setPhase({ type: 'scene', sceneIndex: nextIndex, chosen: false });
      } else {
        setPhase({ type: 'ending' });
      }
    }
  }, [phase, totalScenes]);

  // 振り返りへ遷移
  const handleGoToReflection = useCallback(() => {
    setPhase({ type: 'reflection' });
  }, []);

  // エンディング結果
  const endingResult = useMemo(() => {
    if (phase.type !== 'ending' && phase.type !== 'reflection') return null;
    return experience.ending(scores);
  }, [phase, experience, scores]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col bg-white"
        style={{ maxHeight: '92vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <Header
          title={experience.title}
          progress={progress}
          onClose={onClose}
          sceneLabel={
            phase.type === 'scene'
              ? `${phase.sceneIndex + 1} / ${totalScenes}`
              : phase.type === 'ending'
                ? '結果'
                : phase.type === 'reflection'
                  ? '振り返り'
                  : ''
          }
        />

        {/* メイン */}
        <div className="flex-1 overflow-y-auto">
          {phase.type === 'intro' && (
            <IntroView experience={experience} onStart={handleNext} />
          )}
          {phase.type === 'scene' && currentScene && !chosenChoice && (
            <SceneView
              scene={currentScene}
              sceneIndex={phase.type === 'scene' ? phase.sceneIndex : 0}
              metrics={experience.metrics}
              scores={scores}
              onChoice={handleChoice}
            />
          )}
          {phase.type === 'scene' && currentScene && chosenChoice && (
            <FeedbackView
              scene={currentScene}
              choice={chosenChoice}
              metrics={experience.metrics}
              scores={scores}
              onNext={handleNext}
              isLast={phase.type === 'scene' && phase.sceneIndex === totalScenes - 1}
            />
          )}
          {phase.type === 'ending' && endingResult && (
            <EndingView
              result={endingResult}
              experience={experience}
              scores={scores}
              history={history}
              onReflection={handleGoToReflection}
            />
          )}
          {phase.type === 'reflection' && endingResult && (
            <ReflectionView
              experience={experience}
              scores={scores}
              resultTitle={endingResult.title}
              history={history}
              onClose={onClose}
              onReflectionSaved={onReflectionSaved}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes jxp-fade-in { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
        @keyframes jxp-pop { 0% { transform:scale(0.9); opacity:0 } 100% { transform:scale(1); opacity:1 } }
        @keyframes jxp-slide-up { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        .jxp-fade { animation: jxp-fade-in 0.35s ease-out both }
        .jxp-pop  { animation: jxp-pop 0.3s ease-out both }
        .jxp-slide { animation: jxp-slide-up 0.4s ease-out both }
      `}</style>
    </div>
  );
}

// ─── ヘッダー ───

function Header({
  title,
  progress,
  onClose,
  sceneLabel,
}: {
  title: string;
  progress: number;
  onClose: () => void;
  sceneLabel: string;
}) {
  return (
    <div className="shrink-0">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base">🎮</span>
          <span className="font-bold text-xs text-gray-700 truncate">{title}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {sceneLabel && (
            <span className="text-[10px] text-gray-400 font-mono">{sceneLabel}</span>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-lg leading-none cursor-pointer p-0.5"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}

// ─── イントロ ───

function IntroView({ experience, onStart }: { experience: JobExperience; onStart: () => void }) {
  const { intro } = experience;
  return (
    <div className="p-5 space-y-4 jxp-fade">
      {/* タイトル */}
      <div className="text-center space-y-1">
        <p className="text-[10px] text-indigo-500 font-bold tracking-wider">職業体験ゲーム</p>
        <h2 className="text-xl font-black text-gray-800">{experience.title}</h2>
        <p className="text-xs text-gray-500">{experience.subtitle}</p>
      </div>

      {/* ナレーション */}
      <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600 leading-relaxed">
        {intro.narration}
      </div>

      {/* キャラクター登場 */}
      <div className="flex gap-3 items-start">
        <div className="w-12 h-12 bg-indigo-100 border-2 border-indigo-300 rounded-full flex items-center justify-center text-2xl shrink-0">
          {intro.character.emoji}
        </div>
        <div className="flex-1 bg-white border-2 border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3">
          <p className="text-[10px] text-indigo-500 font-bold mb-1">
            {intro.character.name}（{intro.character.role}）
          </p>
          <p className="text-xs text-gray-700 leading-relaxed">{intro.briefing}</p>
        </div>
      </div>

      {/* ステータス紹介 */}
      <div className="bg-indigo-50 rounded-xl p-4">
        <p className="text-[10px] text-indigo-600 font-bold mb-2">📊 追跡するスキル</p>
        <div className="grid grid-cols-2 gap-2">
          {experience.metrics.map((m) => (
            <div key={m.key} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2">
              <span className="text-base">{m.emoji}</span>
              <span className="text-xs font-bold text-gray-700">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] cursor-pointer"
      >
        体験スタート！
      </button>
    </div>
  );
}

// ─── シーン表示 ───

function SceneView({
  scene,
  sceneIndex,
  metrics,
  scores,
  onChoice,
}: {
  scene: ExperienceScene;
  sceneIndex: number;
  metrics: JobExperience['metrics'];
  scores: Record<string, number>;
  onChoice: (choice: ExperienceChoice) => void;
}) {
  // シーンIDに基づいて選択肢の表示順をシャッフル
  const shuffledChoices = useMemo(
    () => shuffleChoices(scene.choices, hashString(scene.id)),
    [scene],
  );

  return (
    <div className="jxp-fade">
      {/* メトリクスバー */}
      <MetricsBar metrics={metrics} scores={scores} />

      <div className="p-5 space-y-4">
        {/* シーンヘッダー */}
        <div className="flex items-center gap-3">
          {scene.timeLabel && (
            <span className="text-[10px] font-mono font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded">
              {scene.timeLabel}
            </span>
          )}
          <h3 className="text-sm font-black text-gray-800">
            Scene {sceneIndex + 1}: {scene.title}
          </h3>
        </div>

        {/* ナレーション */}
        {scene.narration && (
          <div className="bg-gray-800 text-white text-xs px-4 py-2.5 rounded-lg leading-relaxed">
            {scene.narration}
          </div>
        )}

        {/* 会話 */}
        <div className="space-y-3">
          {scene.dialogues.map((d, i) => (
            <DialogueBubble key={i} {...d} delay={i * 0.1} />
          ))}
        </div>

        {/* 状況説明 */}
        <div className="bg-amber-50 border-l-4 border-amber-400 px-4 py-3 rounded-r-lg">
          <p className="text-xs text-amber-800 leading-relaxed font-medium">{scene.situation}</p>
        </div>

        {/* 選択肢 */}
        <div className="space-y-2">
          <p className="text-[10px] text-gray-400 font-bold text-center">▼ あなたの判断は？</p>
          {shuffledChoices.map((choice, i) => (
            <button
              key={choice.id}
              onClick={() => onChoice(choice)}
              className="w-full text-left px-4 py-3.5 bg-white border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 rounded-xl transition-all active:scale-[0.98] cursor-pointer group"
              style={{ animation: `jxp-slide-up 0.3s ease-out ${0.1 + i * 0.08}s both` }}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5 group-hover:scale-110 transition-transform">
                  {choice.emoji}
                </span>
                <span className="text-xs text-gray-700 leading-relaxed font-medium">
                  {choice.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── フィードバック ───

function FeedbackView({
  scene: _scene,
  choice,
  metrics,
  scores,
  onNext,
  isLast,
}: {
  scene: ExperienceScene;
  choice: ExperienceChoice;
  metrics: JobExperience['metrics'];
  scores: Record<string, number>;
  onNext: () => void;
  isLast: boolean;
}) {
  const fb = choice.feedback;
  return (
    <div className="jxp-fade">
      {/* メトリクスバー */}
      <MetricsBar metrics={metrics} scores={scores} animated />

      <div className="p-5 space-y-4">
        {/* 選んだ選択肢の表示 */}
        <div className="flex items-center gap-2 bg-indigo-50 rounded-lg px-3 py-2">
          <span className="text-base">{choice.emoji}</span>
          <span className="text-xs text-indigo-700 font-bold">あなたの選択：{choice.text}</span>
        </div>

        {/* スコア変動 */}
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(choice.effects).map(([key, val]) => {
            const metric = metrics.find((m) => m.key === key);
            if (!metric || val === 0) return null;
            return (
              <span
                key={key}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full jxp-pop ${
                  val > 0
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {metric.emoji} {metric.label} {val > 0 ? `+${val}` : val}
              </span>
            );
          })}
        </div>

        {/* ナレーション */}
        <div className="bg-gray-800 text-white text-xs px-4 py-2.5 rounded-lg leading-relaxed">
          {fb.narration}
        </div>

        {/* フィードバック会話 */}
        <div className="space-y-3">
          {fb.dialogues.map((d, i) => (
            <DialogueBubble key={i} {...d} delay={i * 0.12} />
          ))}
        </div>

        {/* 学びポイント */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 jxp-slide" style={{ animationDelay: '0.3s' }}>
          <p className="text-[10px] text-blue-600 font-bold mb-1.5">💡 学びポイント</p>
          <p className="text-xs text-blue-800 leading-relaxed">{fb.lesson}</p>
        </div>

        {/* 次へ */}
        <button
          onClick={onNext}
          className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl shadow transition-all active:scale-[0.98] cursor-pointer"
        >
          {isLast ? '結果を見る' : '次のシーンへ'}
        </button>
      </div>
    </div>
  );
}

// ─── エンディング ───

function EndingView({
  result,
  experience,
  scores,
  history,
  onReflection,
}: {
  result: ReturnType<JobExperience['ending']>;
  experience: JobExperience;
  scores: Record<string, number>;
  history: { sceneId: string; choiceId: string }[];
  onReflection: () => void;
}) {
  const maxScore = experience.scenes.length * 3; // 1シーンの最大スコアを3と仮定

  return (
    <div className="p-5 space-y-5 jxp-fade">
      {/* タイトル */}
      <div className="text-center space-y-2">
        <div className="text-5xl jxp-pop">{result.emoji}</div>
        <p className="text-[10px] text-gray-400 font-bold">あなたのタイプ</p>
        <h2 className="text-lg font-black text-gray-800">{result.title}</h2>
        <p className="text-xs text-gray-500 leading-relaxed">{result.summary}</p>
      </div>

      {/* スコアチャート */}
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-[10px] text-gray-500 font-bold mb-3">📊 スキルスコア</p>
        <div className="space-y-2.5">
          {experience.metrics.map((m) => {
            const score = scores[m.key] ?? 0;
            const pct = Math.max(0, Math.min(100, (score / maxScore) * 100));
            return (
              <div key={m.key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-700">
                    {m.emoji} {m.label}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">{score}pt</span>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 学んだこと */}
      <div className="bg-blue-50 rounded-xl p-4">
        <p className="text-[10px] text-blue-600 font-bold mb-2">📝 この体験で分かったこと</p>
        <ul className="space-y-2">
          {result.learnings.map((l, i) => (
            <li
              key={i}
              className="flex gap-2 text-xs text-blue-800 leading-relaxed"
              style={{ animation: `jxp-fade-in 0.3s ease-out ${i * 0.1}s both` }}
            >
              <span className="text-blue-400 shrink-0 mt-0.5">●</span>
              {l}
            </li>
          ))}
        </ul>
      </div>

      {/* リアルワールドノート */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
        <p className="text-[10px] text-amber-600 font-bold mb-1.5">🌍 実際の仕事では…</p>
        <p className="text-xs text-amber-800 leading-relaxed">{result.realWorldNote}</p>
      </div>

      {/* プレイ記録 */}
      <details className="text-xs">
        <summary className="text-gray-400 cursor-pointer hover:text-gray-600 text-center font-bold">
          プレイ記録を見る（{history.length}シーン）
        </summary>
        <div className="mt-2 space-y-1.5 bg-gray-50 rounded-lg p-3">
          {history.map((h, i) => {
            const scene = experience.scenes.find((s) => s.id === h.sceneId);
            const choice = scene?.choices.find((c) => c.id === h.choiceId);
            if (!scene || !choice) return null;
            return (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-gray-400 font-mono shrink-0 w-4 text-right">{i + 1}.</span>
                <div>
                  <span className="font-bold text-gray-600">{scene.title}</span>
                  <span className="text-gray-400"> → </span>
                  <span className="text-indigo-600">{choice.emoji} {choice.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </details>

      <button
        onClick={onReflection}
        className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl shadow transition-all active:scale-[0.98] cursor-pointer"
      >
        振り返りへ
      </button>
    </div>
  );
}

// ─── 振り返り ───

const INTEREST_TAGS = [
  '人と話すのが好き',
  'ものづくりが好き',
  'チームで働きたい',
  '一人で集中したい',
  '数字やデータが好き',
  'アイデアを出すのが好き',
  'リーダーシップに興味',
  '人を支える仕事がしたい',
  'クリエイティブな仕事がいい',
  '社会の役に立ちたい',
];

function ReflectionView({
  experience,
  scores,
  resultTitle,
  history,
  onClose,
  onReflectionSaved,
}: {
  experience: JobExperience;
  scores: Record<string, number>;
  resultTitle: string;
  history: { sceneId: string; choiceId: string }[];
  onClose: () => void;
  onReflectionSaved?: (reflection: ExperienceReflection) => void;
}) {
  const [interestLevel, setInterestLevel] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [freeComment, setFreeComment] = useState('');
  const [saved, setSaved] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleSave = async () => {
    const historyEntries: ExperienceHistoryEntry[] = history.map((h) => {
      const scene = experience.scenes.find((s) => s.id === h.sceneId);
      const choice = scene?.choices.find((c) => c.id === h.choiceId);
      return {
        sceneTitle: scene?.title ?? '',
        situation: scene?.situation ?? '',
        choiceText: choice?.text ?? '',
        choiceEmoji: choice?.emoji ?? '',
        lesson: choice?.feedback.lesson ?? '',
      };
    });
    const reflection: ExperienceReflection = {
      id: `ref-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      jobId: experience.jobId,
      jobTitle: experience.title,
      date: new Date().toLocaleDateString('ja-JP'),
      interestLevel,
      interestTags: selectedTags,
      freeComment,
      scores,
      resultTitle,
      history: historyEntries,
    };
    saveExperienceReflection(reflection);
    setSaved(true);
    onReflectionSaved?.(reflection);
  };

  if (saved) {
    return (
      <div className="p-5 space-y-5 jxp-fade text-center">
        <div className="text-5xl jxp-pop">📝</div>
        <h2 className="text-lg font-black text-gray-800">記録しました！</h2>
        <p className="text-xs text-gray-500">あとから振り返ることができます</p>
        <button
          onClick={onClose}
          className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl shadow transition-all active:scale-[0.98] cursor-pointer"
        >
          おわる
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-5 jxp-fade">
      <div className="text-center space-y-1">
        <p className="text-[10px] text-indigo-500 font-bold tracking-wider">振り返りアンケート</p>
        <h2 className="text-base font-black text-gray-800">{experience.title}を体験して</h2>
      </div>

      {/* 興味度 */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <p className="text-xs font-bold text-gray-700">この仕事にどのくらい興味を持った？</p>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => setInterestLevel(level)}
              className={`w-11 h-11 rounded-full text-xl transition-all cursor-pointer ${
                interestLevel >= level
                  ? 'bg-yellow-400 scale-110 shadow-md'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {interestLevel >= level ? '⭐' : '☆'}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-gray-400 text-center">
          {interestLevel === 0
            ? 'タップして選んでね'
            : interestLevel <= 2
              ? 'あまり興味なし'
              : interestLevel === 3
                ? 'ふつう'
                : interestLevel === 4
                  ? 'けっこう興味あり！'
                  : 'すごく興味あり！！'}
        </p>
      </div>

      {/* 関心タグ */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <p className="text-xs font-bold text-gray-700">この体験で感じたことは？（いくつでも）</p>
        <div className="flex flex-wrap gap-1.5">
          {INTEREST_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-[11px] px-3 py-1.5 rounded-full border-2 transition-all cursor-pointer ${
                selectedTags.includes(tag)
                  ? 'bg-indigo-500 text-white border-indigo-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* フリーコメント */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <p className="text-xs font-bold text-gray-700">自由にメモしよう（感想・気づきなど）</p>
        <textarea
          value={freeComment}
          onChange={(e) => setFreeComment(e.target.value)}
          placeholder="この仕事で面白かったこと、もっと知りたいこと、なんでもOK！"
          className="w-full h-24 text-xs rounded-lg border-2 border-gray-200 focus:border-indigo-400 focus:outline-none px-3 py-2 resize-none leading-relaxed"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-600 text-sm font-bold rounded-xl transition-all active:scale-[0.98] cursor-pointer"
        >
          スキップ
        </button>
        <button
          onClick={handleSave}
          disabled={interestLevel === 0}
          className="flex-1 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl shadow transition-all active:scale-[0.98] cursor-pointer"
        >
          記録する
        </button>
      </div>
    </div>
  );
}

// ─── 共通コンポーネント ───

/** メトリクスバー */
function MetricsBar({
  metrics,
  scores,
  animated,
}: {
  metrics: JobExperience['metrics'];
  scores: Record<string, number>;
  animated?: boolean;
}) {
  return (
    <div className="flex items-center justify-around bg-gray-50 border-b border-gray-100 px-3 py-2">
      {metrics.map((m) => (
        <div key={m.key} className="flex items-center gap-1">
          <span className="text-sm">{m.emoji}</span>
          <span
            className={`text-xs font-bold ${m.color} ${animated ? 'transition-all duration-300' : ''}`}
          >
            {scores[m.key] ?? 0}
          </span>
        </div>
      ))}
    </div>
  );
}

/** 会話バブル */
function DialogueBubble({
  speaker,
  emoji,
  text,
  isPlayer,
  delay = 0,
}: {
  speaker: string;
  emoji: string;
  text: string;
  isPlayer?: boolean;
  delay?: number;
}) {
  return (
    <div
      className={`flex gap-2.5 items-start ${isPlayer ? 'flex-row-reverse' : ''}`}
      style={{ animation: `jxp-fade-in 0.3s ease-out ${delay}s both` }}
    >
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 border-2 ${
          isPlayer
            ? 'bg-indigo-100 border-indigo-300'
            : 'bg-gray-100 border-gray-300'
        }`}
      >
        {emoji}
      </div>
      <div className={`flex-1 max-w-[80%] ${isPlayer ? 'text-right' : ''}`}>
        <p className="text-[10px] text-gray-400 font-bold mb-0.5">{speaker}</p>
        <div
          className={`inline-block text-left rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
            isPlayer
              ? 'bg-indigo-500 text-white rounded-tr-sm'
              : 'bg-white border border-gray-200 text-gray-700 rounded-tl-sm'
          }`}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
