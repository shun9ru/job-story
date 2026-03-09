import { useState, useMemo } from 'react';
import { getJobById } from '../data/jobs/index';
import { getStageInfo } from '../data/stages';
import type { PlayerState, Choice, Job, GameMode, GameEvent, LifeStage } from '../types';
import { StatusBar } from './StatusBar';
import { JobCard } from './JobCard';
import { JobDetailModal } from './JobDetailModal';

interface GamePageProps {
  gameMode: GameMode;
  player: PlayerState;
  events: GameEvent[];
  currentEventIndex: number;
  onSelectChoice: (eventId: string, choice: Choice) => void;
  onFinish: () => void;
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

  // 現在のステージはどのインデックスか
  const currentStageKey = event?.stage;
  const currentStageIdx = stageTimeline.findIndex((s) => s.key === currentStageKey);

  // 背景グラデーション
  const bgGradient = stageInfo
    ? `bg-gradient-to-br ${stageInfo.bgGradient}`
    : 'bg-gradient-to-br from-indigo-50 via-white to-amber-50';

  // ゲーム終了
  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-amber-50">
        <div className="text-center animate-bounce-in">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {gameMode === 'childhood' ? '就活完了！' : 'シミュレーション完了！'}
          </h2>
          <p className="text-gray-500 mb-8">
            {gameMode === 'childhood'
              ? 'あなたの人生ストーリーが完成しました'
              : 'あなたのキャリアストーリーが完成しました'}
          </p>
          <button
            onClick={onFinish}
            className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-full shadow transition-all duration-200 active:scale-95 cursor-pointer"
          >
            結果を見る
          </button>
        </div>
      </div>
    );
  }

  const handleChoice = (choice: Choice) => {
    setIsChoiceAnimating(true);
    setTimeout(() => {
      onSelectChoice(event!.id, choice);
      setIsChoiceAnimating(false);
    }, 300);
  };

  // 発見済み職種
  const discoveredJobs = player.discoveredJobIds
    .map(getJobById)
    .filter((j): j is Job => j !== undefined);

  return (
    <div className={`min-h-screen transition-colors duration-700 ${bgGradient}`}>
      {/* ヘッダー（ステージタイムライン + 進捗） */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100 px-4 py-3">
        <div className="max-w-2xl mx-auto">
          {/* ステージタイムライン */}
          <div className="flex items-center justify-center gap-1 mb-3 overflow-x-auto">
            {stageTimeline.map((stage, idx) => {
              const isActive = idx === currentStageIdx;
              const isPast = idx < currentStageIdx;
              return (
                <div key={stage.key} className="flex items-center">
                  {idx > 0 && (
                    <div
                      className={`w-4 sm:w-8 h-0.5 mx-0.5 transition-colors duration-500 ${
                        isPast ? 'bg-indigo-400' : 'bg-gray-200'
                      }`}
                    />
                  )}
                  <div
                    className={`flex flex-col items-center transition-all duration-500 ${
                      isActive
                        ? 'scale-110'
                        : isPast
                          ? 'opacity-60'
                          : 'opacity-40'
                    }`}
                  >
                    <span
                      className={`text-lg sm:text-xl ${
                        isActive ? 'animate-bounce-subtle' : ''
                      }`}
                    >
                      {stage.emoji}
                    </span>
                    <span
                      className={`text-[10px] mt-0.5 whitespace-nowrap font-medium ${
                        isActive
                          ? stageInfo?.color ?? 'text-indigo-600'
                          : 'text-gray-400'
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
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-sm font-semibold ${stageInfo?.color ?? 'text-indigo-600'}`}>
              Step {currentEventIndex + 1} / {totalEvents}
            </span>
            <span className="text-xs text-gray-400">
              💡 発見: {player.discoveredJobIds.length}職種
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-400 h-2 rounded-full transition-all duration-700"
              style={{
                width: `${((currentEventIndex + 1) / totalEvents) * 100}%`,
              }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* ステータスバー */}
        <StatusBar stats={player.stats} />

        {/* ステージバナー */}
        <div className={`flex items-center gap-3 px-4 py-2 rounded-xl bg-white/60 backdrop-blur`}>
          <span className="text-3xl">{stageInfo?.emoji}</span>
          <div>
            <div className={`text-sm font-bold ${stageInfo?.color ?? 'text-gray-800'}`}>
              {stageInfo?.label}
            </div>
            <div className="text-xs text-gray-400">
              {getStageSubtitle(event!.stage, gameMode)}
            </div>
          </div>
        </div>

        {/* イベントカード */}
        <div
          className={`bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 ${
            isChoiceAnimating ? 'opacity-0 scale-95' : 'animate-slide-up'
          }`}
          key={event!.id}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
            {event!.title}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            {event!.description}
          </p>

          {/* 選択肢 */}
          <div className="space-y-3">
            {event!.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                disabled={isChoiceAnimating}
                className="w-full text-left p-4 border-2 border-gray-100 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  {choice.emoji && (
                    <span className="text-2xl flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      {choice.emoji}
                    </span>
                  )}
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 mb-1">
                      {choice.text}
                    </div>
                    <div className="text-xs text-gray-400">
                      {choice.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 発見した職種一覧 */}
        {discoveredJobs.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
              <span>💼</span>
              発見した職種（タップで詳細）
            </h3>
            <div className="flex flex-wrap gap-2">
              {discoveredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onClick={setSelectedJob}
                  compact
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 職種詳細モーダル */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}

/** ステージ別サブタイトル */
function getStageSubtitle(stage: LifeStage, mode: GameMode): string {
  if (mode === 'childhood') {
    const map: Record<string, string> = {
      'elementary': 'いろんなことに挑戦できる、好奇心いっぱいの時期',
      'middle-school': '部活や勉強で「自分の得意」が見えてくる時期',
      'high-school': '進路を決める、人生の大きな分かれ道',
      'university': '自由な時間を使って、自分を深める時期',
      'shukatsu': 'いよいよ社会へ。今までの全てが武器になる',
    };
    return map[stage] ?? '';
  }
  const map: Record<string, string> = {
    'early-career': '社会人としての基礎を築く時期',
    'mid-career': 'キャリアの方向性が見えてくる時期',
    'future': 'これからの人生を描く時期',
  };
  return map[stage] ?? '';
}
