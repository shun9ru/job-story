import { useState } from 'react';
import type { PlayerState, Job, StatKey, ValueKey, GameMode } from '../types';
import { getDiagnosisType } from '../data/diagnosis';
import { getJobById } from '../data/jobs/index';
import { JobCard } from './JobCard';
import { JobDetailModal } from './JobDetailModal';
import { SkillMapSection } from './SkillRadarChart';
import { PersonalityAnalysis } from './PersonalityAnalysis';

// ============================================================
// 共通の結果表示データ型
// ============================================================

/** 結果表示に必要なデータ（PlayerState / GameResultRecord 両対応） */
export interface ResultData {
  gameMode: GameMode;
  primaryStat: StatKey;
  stats: Record<StatKey, number>;
  discoveredJobIds: string[];
  recommendedJobIds?: string[];
  diagnosisValues?: Record<ValueKey, number>;
  educationPath?: 'university' | 'vocational' | 'work';
  date?: string;
}

// ============================================================
// 共通の結果表示コンテンツ（ボディ部分）
// ============================================================

/** 結果コンテンツを表示する共通コンポーネント */
export function ResultContent({ data }: { data: ResultData }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const diagType = getDiagnosisType(data.primaryStat);

  const recommendedJobs = (data.recommendedJobIds ?? [])
    .map(getJobById)
    .filter((j): j is Job => j !== undefined);

  const discoveredJobs = data.discoveredJobIds
    .map(getJobById)
    .filter((j): j is Job => j !== undefined);

  const allJobs = [...recommendedJobs, ...discoveredJobs]
    .filter((j, i, arr) => arr.findIndex((x) => x.id === j.id) === i);

  const summaryText = generateSummary(data);

  return (
    <>
      {/* ヘッダー */}
      <div className="text-center animate-fade-in">
        <div className="text-5xl mb-3 animate-scale-in">🎊</div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2 animate-gradient-shift">
          {data.gameMode === 'childhood'
            ? 'あなたの人生ストーリー'
            : 'あなたのキャリアストーリー'}
        </h1>
        <p className="text-sm text-gray-400">
          {data.gameMode === 'childhood'
            ? '子供時代から就活までの選択を振り返りました'
            : '社会人としてのキャリアシミュレーション結果です'}
        </p>
      </div>

      {/* ジャーニータイムライン */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-indigo-50/50 p-6 animate-slide-up border border-white/50">
        <SectionTitle>
          {data.gameMode === 'childhood' ? '🎒 歩んできた道のり' : '💼 キャリアの軌跡'}
        </SectionTitle>
        <div className="flex items-center justify-center gap-2 py-4">
          {getTimeline(data.gameMode, data.educationPath).map((stage, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && <div className="w-4 sm:w-8 h-0.5 bg-indigo-300 mx-1" />}
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl">{stage.emoji}</span>
                <span className="text-[10px] text-gray-500 mt-1">{stage.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* サマリー + タイプ統合 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-indigo-50/50 p-6 animate-slide-up border border-white/50">
        <SectionTitle>🔮 あなたのプロファイル</SectionTitle>

        <div className="text-center mb-4">
          <span className="text-4xl">{diagType.emoji}</span>
          <h3 className="text-xl font-bold text-gray-800 mt-2">{diagType.label}</h3>
          <p className="text-indigo-500 text-xs font-medium mt-1">{diagType.tagline}</p>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line mb-4">
          {summaryText}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-emerald-50 rounded-xl p-3">
            <p className="text-xs font-bold text-emerald-700 mb-1.5">💪 強み</p>
            <ul className="space-y-1">
              {diagType.strengths.slice(0, 3).map((s, i) => (
                <li key={i} className="text-xs text-emerald-600 flex items-start gap-1.5">
                  <span className="text-emerald-400 mt-0.5">•</span>{s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 rounded-xl p-3">
            <p className="text-xs font-bold text-amber-700 mb-1.5">🌱 伸びしろ</p>
            <ul className="space-y-1">
              {diagType.weaknesses.slice(0, 3).map((s, i) => (
                <li key={i} className="text-xs text-amber-600 flex items-start gap-1.5">
                  <span className="text-amber-400 mt-0.5">•</span>{s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-3 bg-indigo-50 rounded-xl p-3">
          <p className="text-xs font-bold text-indigo-700 mb-1">💡 アドバイス</p>
          <p className="text-xs text-indigo-600 leading-relaxed">{diagType.growthAdvice}</p>
        </div>
      </div>

      {/* AI パーソナリティ分析 */}
      <PersonalityAnalysis stats={data.stats} />

      {/* スキル＆価値観マップ */}
      <SkillMapSection
        playerStats={data.stats}
        diagnosisValues={data.diagnosisValues}
        discoveredJobs={allJobs.map((j) => ({
          id: j.id,
          title: j.title,
          tags: j.tags,
          skillsGained: j.skillsGained,
          suitableFor: j.suitableFor,
        }))}
      />

      {/* 向いてそうな職種 TOP5 */}
      {recommendedJobs.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-indigo-50/50 p-6 animate-slide-up border border-white/50">
          <SectionTitle>🏆 向いていそうな職種 TOP{recommendedJobs.length}</SectionTitle>
          <p className="text-xs text-gray-400 mb-4">
            あなたの選択とステータスから分析しました。タップで詳しく見られます。
          </p>
          <div className="space-y-3">
            {recommendedJobs.map((job, index) => (
              <div key={job.id} className="flex items-center gap-3">
                <span className={`text-lg font-bold w-6 text-center ${
                  index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-amber-600' : 'text-gray-300'
                }`}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                </span>
                <div className="flex-1">
                  <JobCard job={job} onClick={setSelectedJob} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 発見した職種一覧 */}
      {discoveredJobs.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-indigo-50/50 p-6 animate-slide-up border border-white/50">
          <SectionTitle>💡 発見した職種（{discoveredJobs.length}件）</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {discoveredJobs.map((job) => (
              <JobCard key={job.id} job={job} onClick={setSelectedJob} compact />
            ))}
          </div>
        </div>
      )}

      {/* メッセージ */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 text-center animate-slide-up border border-indigo-100/50">
        <p className="text-indigo-700 text-sm leading-relaxed">
          これはあくまで一つのシミュレーション。<br />
          違う選択をすれば、また違う未来が見えます。<br />
          気になった職種について、もっと調べてみましょう！
        </p>
      </div>

      {/* 職種詳細モーダル */}
      {selectedJob && (
        <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </>
  );
}

// ============================================================
// ResultPage（ストーリー直後の結果画面）
// ============================================================

interface ResultPageProps {
  gameMode: GameMode;
  player: PlayerState;
  recommendedJobs: Job[];
  educationPath?: 'university' | 'vocational' | 'work';
  diagnosisValues?: Record<ValueKey, number>;
  onRestart: () => void;
  onSwitchMode: () => void;
}

export function ResultPage({
  gameMode,
  player,
  recommendedJobs,
  educationPath,
  diagnosisValues,
  onRestart,
  onSwitchMode,
}: ResultPageProps) {
  const data: ResultData = {
    gameMode,
    primaryStat: player.primaryStat,
    stats: player.stats,
    discoveredJobIds: player.discoveredJobIds,
    recommendedJobIds: recommendedJobs.map((j) => j.id),
    diagnosisValues,
    educationPath,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-indigo-50 via-50% to-amber-50 relative overflow-hidden">
      <div className="animated-bg">
        <div className="absolute top-[5%] right-[5%] w-56 h-56 rounded-full bg-purple-200/15 animate-float-slow" />
        <div className="absolute top-[40%] left-[3%] w-40 h-40 rounded-full bg-amber-200/10 animate-float-medium" />
      </div>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8 relative z-10">
        <ResultContent data={data} />

        {/* ボタン群 */}
        <div className="text-center pb-8 space-y-4">
          <button
            onClick={onRestart}
            className="btn-glow px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-lg font-semibold rounded-full shadow-lg shadow-indigo-200/50 hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
          >
            もう一度遊ぶ
          </button>
          <div>
            <button
              onClick={onSwitchMode}
              className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-600 text-sm font-medium rounded-full shadow border border-gray-200 hover:border-gray-300 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              {gameMode === 'childhood'
                ? '💼 社会人編も遊んでみる'
                : '🎒 子供時代→就活コースも遊んでみる'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================================
// ヘルパー関数
// ============================================================

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
      {children}
    </h3>
  );
}

function generateSummary(data: ResultData): string {
  const stats = data.stats;
  const skillEntries = (Object.entries(stats) as [StatKey, number][]);
  const highest = [...skillEntries].sort((a, b) => b[1] - a[1])[0];

  const descriptions: Partial<Record<StatKey, string>> = {
    communication: '人との繋がりを大切にし、チームで成果を出す道を歩みました。',
    planning: 'アイデアと企画力で新しい価値を生み出す道を歩みました。',
    logical_thinking: 'データと論理で物事を解決していく道を歩みました。',
    creativity: '創造力と感性を活かして、新しいものを生み出す道を歩みました。',
    empathy: '人を支え、感謝される仕事を通じて社会に貢献する道を歩みました。',
    problem_solving: '専門知識と技術力を武器に、プロフェッショナルとして活躍する道を歩みました。',
    initiative: '常に挑戦を求め、スキルアップし続ける道を歩みました。',
    resilience: '安定した基盤を築き、堅実に歩む道を選びました。',
    leadership: 'リーダーシップを発揮し、チームを導く道を歩みました。',
    action: '圧倒的な行動力で、次々と新しい挑戦をしてきました。',
  };

  const jobCount = data.discoveredJobIds.length;
  const desc = descriptions[highest[0]] ?? 'あなたらしいキャリアを築いてきました。';

  if (data.gameMode === 'childhood') {
    return `子供時代から就活まで、あなたは${jobCount}種類の職種と出会いました。\n\n${desc}\n\n小さい頃の「好き」や「得意」が、意外な仕事につながっていることに気づいたのではないでしょうか。`;
  }
  return `社会人として歩む中で、あなたは${jobCount}種類の職種に出会いました。\n\n${desc}\n\nこの経験を通じて、あなたの中にある「働く上で大事にしたいこと」が少しずつ見えてきたのではないでしょうか。`;
}

function getTimeline(gameMode: GameMode, educationPath?: string) {
  if (gameMode === 'childhood') {
    const base = [
      { emoji: '🎒', label: '小学校' },
      { emoji: '📖', label: '中学校' },
      { emoji: '🏫', label: '高校' },
    ];
    switch (educationPath) {
      case 'vocational':
        return [...base, { emoji: '🔧', label: '専門学校' }, { emoji: '💼', label: '就活' }];
      case 'work':
        return [...base, { emoji: '💪', label: '就職' }];
      default:
        return [...base, { emoji: '🎓', label: '大学' }, { emoji: '💼', label: '就活' }];
    }
  }
  return [
    { emoji: '🌱', label: '入社' },
    { emoji: '🔥', label: '成長' },
    { emoji: '🔄', label: '転機' },
    { emoji: '🚀', label: '将来' },
  ];
}
