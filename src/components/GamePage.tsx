import { useState, useMemo } from 'react';
import { getJobById } from '../data/jobs/index';
import { getStageInfo } from '../data/stages';
import type { PlayerState, Choice, Job, GameMode, GameEvent, LifeStage, StatKey } from '../types';
import { statDefinitions, skillCategories } from '../data/stats';
import { JobCard } from './JobCard';
import { JobDetailModal } from './JobDetailModal';
import { BgImage } from './BgImage';

interface GamePageProps {
  gameMode: GameMode;
  player: PlayerState;
  events: GameEvent[];
  currentEventIndex: number;
  onSelectChoice: (eventId: string, choice: Choice, eventTitle?: string) => void;
  onFinish: () => void;
}

/** スキル上昇エフェクト用の型 */
interface SkillGainEntry {
  key: StatKey;
  value: number;
  emoji: string;
  label: string;
}

/** ゲームメイン画面 */
export function GamePage({
  gameMode,
  player,
  events,
  currentEventIndex,
  onSelectChoice,
  onFinish,
}: GamePageProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isChoiceAnimating, setIsChoiceAnimating] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [skillGains, setSkillGains] = useState<SkillGainEntry[]>([]);
  const [showGains, setShowGains] = useState(false);

  const totalEvents = events.length;
  const isFinished = currentEventIndex >= totalEvents;
  const event = !isFinished ? events[currentEventIndex] : null;

  // 現在のステージ情報
  const stageInfo = event ? getStageInfo(event.stage) : null;

  // ステージ一覧（重複排除、順番通り）
  const stageTimeline = useMemo(() => {
    const seen = new Set<LifeStage>();
    const stages: { key: LifeStage; emoji: string; label: string }[] = [];
    for (const ev of events) {
      if (!seen.has(ev.stage)) {
        seen.add(ev.stage);
        const info = getStageInfo(ev.stage);
        stages.push({ key: ev.stage, emoji: info.emoji, label: info.label });
      }
    }
    return stages;
  }, [events]);

  const currentStageKey = event?.stage;
  const currentStageIdx = stageTimeline.findIndex((s) => s.key === currentStageKey);

  const bgGradient = stageInfo
    ? `bg-gradient-to-br ${stageInfo.bgGradient}`
    : 'bg-gradient-to-br from-indigo-50 via-white to-amber-50';

  // 上位スキル（値が0より大きいもの、上位6個）
  const topSkills = useMemo(() => {
    return statDefinitions
      .map((d) => ({ ...d, value: player.stats[d.key] }))
      .filter((s) => s.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [player.stats]);

  // ゲーム終了
  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-violet-100 via-indigo-50 to-amber-50 relative overflow-hidden">
        <div className="animated-bg">
          <div className="absolute top-[10%] left-[15%] w-56 h-56 rounded-full bg-purple-200/20 animate-float-slow" />
          <div className="absolute bottom-[15%] right-[10%] w-48 h-48 rounded-full bg-amber-200/20 animate-float-medium" />
        </div>
        <div className="absolute top-[5%] left-[20%] text-3xl animate-float-slow opacity-30 select-none">🎊</div>
        <div className="absolute top-[10%] right-[20%] text-2xl animate-float-medium opacity-25 select-none">✨</div>
        <div className="absolute bottom-[10%] left-[30%] text-2xl animate-float-fast opacity-20 select-none">🌟</div>

        <div className="text-center animate-bounce-in relative z-10">
          <div className="text-6xl mb-4 animate-scale-in">🎉</div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {gameMode === 'childhood' ? '就活完了！' : 'シミュレーション完了！'}
          </h2>
          <p className="text-gray-500 mb-8">
            {gameMode === 'childhood'
              ? 'あなたの人生ストーリーが完成しました'
              : 'あなたのキャリアストーリーが完成しました'}
          </p>
          <button
            onClick={onFinish}
            className="btn-glow px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-full shadow-lg shadow-indigo-200/50 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            結果を見る
          </button>
        </div>
      </div>
    );
  }

  const handleChoice = (choice: Choice) => {
    // スキル上昇を計算
    const gains: SkillGainEntry[] = [];
    for (const [key, value] of Object.entries(choice.effects)) {
      if (value && value > 0) {
        const def = statDefinitions.find((d) => d.key === key);
        if (def) {
          gains.push({ key: key as StatKey, value: value as number, emoji: def.emoji, label: def.label });
        }
      }
    }
    // 値の大きい順にソート
    gains.sort((a, b) => b.value - a.value);

    setIsChoiceAnimating(true);
    setSkillGains(gains);
    setShowGains(true);

    // エフェクト表示後に次へ進む
    setTimeout(() => {
      setShowGains(false);
      onSelectChoice(event!.id, choice, event!.title);
      setIsChoiceAnimating(false);
      setSkillGains([]);
    }, 1800);
  };

  // 発見済み職種
  const discoveredJobs = player.discoveredJobIds
    .map(getJobById)
    .filter((j): j is Job => j !== undefined);

  return (
    <BgImage imageKey={event?.stage ?? ''} overlay={0.45} className={`min-h-screen transition-colors duration-700 ${bgGradient} flex flex-col`}>
      {/* ヘッダー（ステージタイムライン + 進捗） */}
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-lg border-b border-white/50 px-4 py-2.5 shadow-sm">
        <div className="max-w-2xl mx-auto">
          {/* ステージタイムライン */}
          <div className="flex items-center justify-center gap-1 mb-2 overflow-x-auto">
            {stageTimeline.map((stage, idx) => {
              const isActive = idx === currentStageIdx;
              const isPast = idx < currentStageIdx;
              return (
                <div key={stage.key} className="flex items-center">
                  {idx > 0 && (
                    <div
                      className={`w-4 sm:w-6 h-0.5 mx-0.5 transition-colors duration-500 ${
                        isPast ? 'bg-indigo-400' : 'bg-gray-200'
                      }`}
                    />
                  )}
                  <div
                    className={`flex flex-col items-center transition-all duration-500 ${
                      isActive ? 'scale-110' : isPast ? 'opacity-60' : 'opacity-40'
                    }`}
                  >
                    <span className={`text-base sm:text-lg ${isActive ? 'animate-bounce-subtle' : ''}`}>
                      {stage.emoji}
                    </span>
                    <span
                      className={`text-[9px] mt-0.5 whitespace-nowrap font-medium ${
                        isActive ? stageInfo?.color ?? 'text-indigo-600' : 'text-gray-400'
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* プログレスバー */}
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs font-semibold ${stageInfo?.color ?? 'text-indigo-600'}`}>
              Step {currentEventIndex + 1} / {totalEvents}
            </span>
            <span className="text-[10px] text-gray-400">
              💡 {player.discoveredJobIds.length}職種発見
            </span>
          </div>
          <div className="w-full bg-gray-200/60 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-400 to-purple-400 h-2 rounded-full transition-all duration-700 progress-glow"
              style={{ width: `${((currentEventIndex + 1) / totalEvents) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* メインコンテンツ（質問・選択肢が最優先） */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-4 space-y-4">
        {/* ステージバナー（コンパクト） */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/50 backdrop-blur">
          <span className="text-xl">{stageInfo?.emoji}</span>
          <div>
            <span className={`text-xs font-bold ${stageInfo?.color ?? 'text-gray-800'}`}>
              {stageInfo?.label}
            </span>
            <span className="text-[10px] text-gray-400 ml-2">
              {getStageSubtitle(event!.stage, gameMode)}
            </span>
          </div>
        </div>

        {/* イベントカード（質問 + 選択肢） */}
        <div
          className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-indigo-50/50 p-5 sm:p-6 transition-all duration-300 border border-white/50 ${
            isChoiceAnimating ? 'opacity-0 scale-95' : 'animate-slide-up'
          }`}
          key={event!.id}
        >
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
            {event!.title}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            {event!.description}
          </p>

          {/* 選択肢 */}
          <div className="space-y-2.5">
            {event!.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                disabled={isChoiceAnimating}
                className="w-full text-left p-3.5 border-2 border-gray-100/80 rounded-xl hover:border-indigo-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 cursor-pointer group bg-white/60"
              >
                <div className="flex items-start gap-2.5">
                  {choice.emoji && (
                    <span className="text-xl flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      {choice.emoji}
                    </span>
                  )}
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 text-sm mb-0.5">
                      {choice.text}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {choice.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* スキル上昇エフェクト */}
        {showGains && skillGains.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-1.5 animate-skill-gains">
              {skillGains.map((gain, i) => (
                <div
                  key={gain.key}
                  className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-indigo-100 animate-skill-gain-item"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="text-lg">{gain.emoji}</span>
                  <span className="text-xs font-bold text-gray-700">{gain.label}</span>
                  <span className="text-sm font-black text-emerald-500">+{gain.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 発見した職種（コンパクト） */}
        {discoveredJobs.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-gray-400 font-medium">💼 発見:</span>
            {discoveredJobs.slice(-6).map((job) => (
              <JobCard key={job.id} job={job} onClick={setSelectedJob} compact />
            ))}
            {discoveredJobs.length > 6 && (
              <span className="text-[10px] text-gray-400">+{discoveredJobs.length - 6}</span>
            )}
          </div>
        )}
      </main>

      {/* 下部固定：スキルサマリー */}
      <div className="sticky bottom-0 z-10 bg-white/80 backdrop-blur-lg border-t border-white/50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-2xl mx-auto px-4">
          {/* トグルボタン + スキルプレビュー */}
          <button
            onClick={() => setShowSkills(!showSkills)}
            className="w-full py-2 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">🎮 獲得スキル</span>
              {/* 上位スキルのミニプレビュー */}
              <div className="flex items-center gap-1">
                {topSkills.slice(0, 4).map((s) => (
                  <span
                    key={s.key}
                    className="inline-flex items-center gap-0.5 text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full"
                  >
                    {s.emoji}{s.value}
                  </span>
                ))}
                {topSkills.length === 0 && (
                  <span className="text-[10px] text-gray-300">まだなし</span>
                )}
              </div>
            </div>
            <span className={`text-gray-400 text-xs transition-transform duration-200 ${showSkills ? 'rotate-180' : ''}`}>
              ▲
            </span>
          </button>

          {/* 展開時のスキル詳細 */}
          {showSkills && (
            <div className="pb-3 animate-fade-in">
              <div className="space-y-2">
                {skillCategories.map((cat) => {
                  const defs = statDefinitions.filter((d) => d.category === cat.key);
                  const hasValue = defs.some((d) => player.stats[d.key] > 0);
                  if (!hasValue) return null;
                  return (
                    <div key={cat.key}>
                      <p className="text-[9px] font-medium text-gray-400 mb-1">{cat.emoji} {cat.label}</p>
                      <div className="flex flex-wrap gap-1">
                        {defs.map((def) => {
                          const val = player.stats[def.key];
                          if (val === 0) return null;
                          return (
                            <span
                              key={def.key}
                              className="inline-flex items-center gap-1 text-[10px] bg-white border border-gray-100 text-gray-600 px-2 py-1 rounded-lg shadow-sm"
                            >
                              <span>{def.emoji}</span>
                              <span className="font-medium">{def.label}</span>
                              <span className="font-bold text-indigo-500">{val}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 職種詳細モーダル */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </BgImage>
  );
}

/** ステージ別サブタイトル */
function getStageSubtitle(stage: LifeStage, mode: GameMode): string {
  if (mode === 'childhood') {
    const map: Record<string, string> = {
      'elementary': 'いろんなことに挑戦できる時期',
      'middle-school': '「自分の得意」が見えてくる時期',
      'high-school': '進路を決める大きな分かれ道',
      'vocational': '即戦力を目指す時期',
      'university': '自分を深める時期',
      'shukatsu': '今までの全てが武器になる',
    };
    return map[stage] ?? '';
  }
  const map: Record<string, string> = {
    'early-career': '社会人の基礎を築く時期',
    'mid-career': 'キャリアの方向性が見えてくる時期',
    'future': 'これからの人生を描く時期',
  };
  return map[stage] ?? '';
}
