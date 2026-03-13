import { useState, useMemo } from 'react';
import type { PlayerState, Job, StatKey, GameMode } from '../types';
import { getDiagnosisType } from '../data/diagnosis';
import { getJobById } from '../data/jobs/index';
import { skillStatDefinitions } from '../data/stats';
import { JobCard } from './JobCard';
import { JobDetailModal } from './JobDetailModal';
import { SkillMapSection } from './SkillRadarChart';
import { PersonalityAnalysis } from './PersonalityAnalysis';

interface ResultPageProps {
  gameMode: GameMode;
  player: PlayerState;
  recommendedJobs: Job[];
  onRestart: () => void;
  onSwitchMode: () => void;
}

/** 結果画面 */
export function ResultPage({
  gameMode,
  player,
  recommendedJobs,
  onRestart,
  onSwitchMode,
}: ResultPageProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [tappedStatKey, setTappedStatKey] = useState<StatKey | null>(null);

  const diagType = getDiagnosisType(player.primaryTrait);
  const discoveredJobs = player.discoveredJobIds
    .map(getJobById)
    .filter((j): j is Job => j !== undefined);

  // ストーリー + 診断を統合したステータス（スキルマップ・パーソナリティ分析用）
  const combinedStats = useMemo(() => {
    const merged = { ...player.stats };
    if (player.diagnosisStats) {
      for (const [key, value] of Object.entries(player.diagnosisStats)) {
        merged[key as StatKey] = Math.min(20, merged[key as StatKey] + value);
      }
    }
    return merged;
  }, [player.stats, player.diagnosisStats]);

  // スキル系ステータスのうち上位3つを抽出
  const topStats = [...skillStatDefinitions]
    .sort((a, b) => combinedStats[b.key] - combinedStats[a.key])
    .slice(0, 3);

  // キャリアサマリーテキストを生成
  const summaryText = generateSummary(player, gameMode, combinedStats);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50">
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* ヘッダー */}
        <div className="text-center animate-fade-in">
          <div className="text-5xl mb-3">🎊</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            {gameMode === 'childhood'
              ? 'あなたの人生ストーリー'
              : 'あなたのキャリアストーリー'}
          </h1>
          <p className="text-sm text-gray-400">
            {gameMode === 'childhood'
              ? '子供時代から就活までの選択を振り返りました'
              : '社会人としてのキャリアシミュレーション結果です'}
          </p>
        </div>

        {/* ジャーニータイムライン */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
          <SectionTitle>
            {gameMode === 'childhood' ? '🎒 歩んできた道のり' : '💼 キャリアの軌跡'}
          </SectionTitle>
          {gameMode === 'childhood' ? (
            <div className="flex items-center justify-center gap-2 py-4">
              {[
                { emoji: '🎒', label: '小学校' },
                { emoji: '📖', label: '中学校' },
                { emoji: '🏫', label: '高校' },
                { emoji: '🎓', label: '大学' },
                { emoji: '💼', label: '就活' },
              ].map((stage, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && <div className="w-4 sm:w-8 h-0.5 bg-indigo-300 mx-1" />}
                  <div className="flex flex-col items-center">
                    <span className="text-xl sm:text-2xl">{stage.emoji}</span>
                    <span className="text-[10px] text-gray-500 mt-1">{stage.label}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 py-4">
              {[
                { emoji: '🌱', label: '入社' },
                { emoji: '🔥', label: '成長' },
                { emoji: '🔄', label: '転機' },
                { emoji: '🚀', label: '将来' },
              ].map((stage, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && <div className="w-6 sm:w-10 h-0.5 bg-indigo-300 mx-1" />}
                  <div className="flex flex-col items-center">
                    <span className="text-xl sm:text-2xl">{stage.emoji}</span>
                    <span className="text-[10px] text-gray-500 mt-1">{stage.label}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* キャリアサマリー */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
          <SectionTitle>📝 サマリー</SectionTitle>
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {summaryText}
          </p>
        </div>

        {/* タイプ傾向 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
          <SectionTitle>🔮 あなたのタイプ</SectionTitle>
          <div className="text-center py-4">
            <span className="text-4xl">{diagType.emoji}</span>
            <h3 className="text-xl font-bold text-gray-800 mt-2">
              {diagType.label}
            </h3>
            <p className="text-indigo-500 text-xs font-medium mt-1">
              {diagType.tagline}
            </p>
            <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
              {diagType.description}
            </p>
          </div>

          {/* 強みプレビュー */}
          <div className="mt-3 bg-emerald-50 rounded-xl p-3 text-left max-w-sm mx-auto">
            <p className="text-xs font-bold text-emerald-700 mb-1.5">💪 強み</p>
            <ul className="space-y-1">
              {diagType.strengths.slice(0, 3).map((s, i) => (
                <li key={i} className="text-xs text-emerald-600 flex items-start gap-1.5">
                  <span className="text-emerald-400 mt-0.5">•</span>{s}
                </li>
              ))}
            </ul>
          </div>

          {/* 強みステータス */}
          <div className="mt-4 flex justify-center gap-4">
            {topStats.map((stat) => {
              const isActive = tappedStatKey === stat.key;
              return (
                <div key={stat.key} className="flex flex-col items-center">
                  <div
                    onClick={() => setTappedStatKey(isActive ? null : stat.key)}
                    className={`text-center px-3 py-2 rounded-xl cursor-pointer transition-all ${
                      isActive ? 'bg-indigo-50 ring-1 ring-indigo-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl">{stat.emoji}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                    <div className="text-lg font-bold text-gray-800">
                      {combinedStats[stat.key]}
                    </div>
                  </div>
                  {isActive && (
                    <div className="mt-1 bg-white rounded-lg shadow border border-gray-100 p-3 animate-fade-in max-w-48">
                      <p className="text-xs text-gray-600 leading-relaxed">{stat.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* パーソナリティ分析 */}
        <PersonalityAnalysis stats={combinedStats} />

        {/* スキルマップ（レーダーチャート＋全職業ランキング） */}
        <SkillMapSection
          playerStats={combinedStats}
          discoveredJobs={[...recommendedJobs, ...discoveredJobs]
            .filter((j, i, arr) => arr.findIndex((x) => x.id === j.id) === i)
            .map((j) => ({
              id: j.id,
              title: j.title,
              tags: j.tags,
              skillsGained: j.skillsGained,
              suitableFor: j.suitableFor,
            }))}
        />

        {/* 向いてそうな職種 TOP5 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
          <SectionTitle>🏆 向いていそうな職種 TOP5</SectionTitle>
          <p className="text-xs text-gray-400 mb-4">
            {gameMode === 'childhood'
              ? 'あなたの「好き」と選択から分析しました。タップで詳しく見られます。'
              : 'あなたの選択とステータスから分析しました。タップで詳しく見られます。'}
          </p>
          <div className="space-y-3">
            {recommendedJobs.map((job, index) => (
              <div key={job.id} className="flex items-center gap-3">
                <span
                  className={`text-lg font-bold w-6 text-center ${
                    index === 0
                      ? 'text-yellow-500'
                      : index === 1
                        ? 'text-gray-400'
                        : index === 2
                          ? 'text-amber-600'
                          : 'text-gray-300'
                  }`}
                >
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                </span>
                <div className="flex-1">
                  <JobCard job={job} onClick={setSelectedJob} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 発見した職種一覧 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
          <SectionTitle>
            💡 今回発見した職種（{discoveredJobs.length}件）
          </SectionTitle>
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

        {/* メッセージ */}
        <div className="bg-indigo-50 rounded-2xl p-6 text-center animate-slide-up">
          <p className="text-indigo-700 text-sm leading-relaxed">
            これはあくまで一つのシミュレーション。
            <br />
            違う選択をすれば、また違う未来が見えます。
            <br />
            気になった職種について、もっと調べてみましょう！
          </p>
        </div>

        {/* ボタン群 */}
        <div className="text-center pb-8 space-y-4">
          <button
            onClick={onRestart}
            className="px-10 py-4 bg-indigo-500 hover:bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
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

/** セクションタイトル */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
      {children}
    </h3>
  );
}

/** キャリアサマリーのテキスト生成 */
function generateSummary(player: PlayerState, gameMode: GameMode, stats: Record<StatKey, number>): string {
  // スキル系ステータスのみから最も高いものを抽出
  const skillEntries = (Object.entries(stats) as [StatKey, number][])
    .filter(([key]) => key !== 'satisfaction' && key !== 'income');
  const highest = skillEntries.sort((a, b) => b[1] - a[1])[0];

  const descriptions: Record<StatKey, string> = {
    satisfaction: '',
    income: '',
    growth: '常に成長を求め、スキルアップし続ける道を歩みました。',
    stability: '安定した基盤を築き、堅実に歩む道を選びました。',
    communication: '人との繋がりを大切にし、チームで成果を出す道を歩みました。',
    planning: 'アイデアと企画力で新しい価値を生み出す道を歩みました。',
    analysis: 'データと論理で物事を解決していく道を歩みました。',
    creative: '創造力と感性を活かして、新しいものを生み出す道を歩みました。',
    care: '人を支え、感謝される仕事を通じて社会に貢献する道を歩みました。',
    technical: '専門知識と技術力を武器に、プロフェッショナルとして活躍する道を歩みました。',
  };

  const jobCount = player.discoveredJobIds.length;

  if (gameMode === 'childhood') {
    return `子供時代から就活まで、あなたは${jobCount}種類の職種と出会いました。\n\n${descriptions[highest[0]]}\n\n小さい頃の「好き」や「得意」が、意外な仕事につながっていることに気づいたのではないでしょうか。`;
  }

  return `社会人として歩む中で、あなたは${jobCount}種類の職種に出会いました。\n\n${descriptions[highest[0]]}\n\nこの経験を通じて、あなたの中にある「働く上で大事にしたいこと」が少しずつ見えてきたのではないでしょうか。`;
}
