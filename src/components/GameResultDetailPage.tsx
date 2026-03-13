import { useState } from 'react';
import type { Job, StatKey } from '../types';
import type { GameResultRecord } from '../utils/storage';
import { getDiagnosisType } from '../data/diagnosis';
import { getJobById } from '../data/jobs/index';
import { statDefinitions, skillStatDefinitions } from '../data/stats';
import { JobCard } from './JobCard';
import { JobDetailModal } from './JobDetailModal';
import { SkillMapSection } from './SkillRadarChart';
import { PersonalityAnalysis } from './PersonalityAnalysis';

interface GameResultDetailPageProps {
  result: GameResultRecord;
  onBack: () => void;
}

/** 過去のプレイ結果詳細ページ */
export function GameResultDetailPage({ result, onBack }: GameResultDetailPageProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [tappedStatKey, setTappedStatKey] = useState<StatKey | null>(null);

  const diagType = getDiagnosisType(result.primaryTrait);

  const recommendedJobs = (result.recommendedJobIds ?? [])
    .map(getJobById)
    .filter((j): j is Job => j !== undefined);

  const discoveredJobs = (result.discoveredJobIds ?? [])
    .map(getJobById)
    .filter((j): j is Job => j !== undefined);

  // タイプセクション用：診断由来のステータスがあればそれを使用、なければ統合値にフォールバック
  const diagStats = result.diagnosisStats ?? result.stats;
  const topStats = [...skillStatDefinitions]
    .sort((a, b) => diagStats[b.key] - diagStats[a.key])
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            ← 戻る
          </button>
          <h1 className="text-sm font-bold text-gray-700">
            プレイ結果 - {result.date}
          </h1>
          <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full font-medium ml-auto">
            {result.gameMode === 'childhood' ? '🎒 子供時代編' : '💼 社会人編'}
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* タイプ */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center animate-fade-in">
          <span className="text-4xl">{diagType.emoji}</span>
          <h3 className="text-xl font-bold text-gray-800 mt-2">
            {diagType.label}
          </h3>
          <p className="text-indigo-500 text-xs font-medium mt-1">
            {diagType.tagline}
          </p>

          {/* 強みステータス（診断由来） */}
          <div className="mt-4 flex justify-center gap-4">
            {topStats.map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="text-2xl">{stat.emoji}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                <div className="text-lg font-bold text-gray-800">
                  {diagStats[stat.key]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* スキルステータス */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
          <h3 className="text-base font-bold text-gray-800 mb-4">📊 スキルステータス</h3>
          <div className="space-y-1">
            {skillStatDefinitions.map((stat) => {
              const value = result.stats[stat.key];
              const maxValue = 20;
              const isOpen = tappedStatKey === stat.key;
              return (
                <div key={stat.key}>
                  <div
                    onClick={() => setTappedStatKey(isOpen ? null : stat.key)}
                    className={`flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer transition-all ${
                      isOpen ? 'bg-indigo-50 ring-1 ring-indigo-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg w-8 text-center">{stat.emoji}</span>
                    <span className="text-xs text-gray-600 w-20">{stat.label}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-indigo-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${(value / maxValue) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700 w-6 text-right">{value}</span>
                  </div>
                  {isOpen && (
                    <div className="ml-12 mr-2 mt-1 mb-2 bg-white rounded-lg shadow border border-gray-100 p-3 animate-fade-in">
                      <p className="text-xs text-gray-600 leading-relaxed">{stat.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 価値観ステータス（診断由来） */}
        {(result.stats.satisfaction > 0 || result.stats.income > 0) && (
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
            <h3 className="text-base font-bold text-gray-800 mb-1">💭 価値観の傾向</h3>
            <p className="text-xs text-gray-400 mb-4">性格診断で判明したあなたの仕事に対する志向</p>
            <div className="space-y-1">
              {statDefinitions.filter((s) => s.key === 'satisfaction' || s.key === 'income').map((stat) => {
                const value = result.stats[stat.key];
                const maxValue = 20;
                const isOpen = tappedStatKey === stat.key;
                return (
                  <div key={stat.key}>
                    <div
                      onClick={() => setTappedStatKey(isOpen ? null : stat.key)}
                      className={`flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer transition-all ${
                        isOpen ? 'bg-purple-50 ring-1 ring-purple-200' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg w-8 text-center">{stat.emoji}</span>
                      <span className="text-xs text-gray-600 w-20">{stat.label}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-purple-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${(value / maxValue) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-700 w-6 text-right">{value}</span>
                    </div>
                    {isOpen && (
                      <div className="ml-12 mr-2 mt-1 mb-2 bg-white rounded-lg shadow border border-gray-100 p-3 animate-fade-in">
                        <p className="text-xs text-gray-600 leading-relaxed">{stat.description}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* パーソナリティ分析 */}
        <PersonalityAnalysis stats={result.stats} />

        {/* スキルマップ（レーダーチャート＋全職業ランキング） */}
        {(recommendedJobs.length > 0 || discoveredJobs.length > 0) && (
          <SkillMapSection
            playerStats={result.stats}
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
        )}

        {/* 向いていそうな職種 TOP5 */}
        {recommendedJobs.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
            <h3 className="text-base font-bold text-gray-800 mb-4">
              🏆 向いていそうな職種 TOP{recommendedJobs.length}
            </h3>
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
        ) : result.topJobTitles && result.topJobTitles.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
            <h3 className="text-base font-bold text-gray-800 mb-4">
              🏆 向いていそうな職種
            </h3>
            <div className="space-y-2">
              {result.topJobTitles.map((title, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className={`text-lg font-bold w-6 text-center ${
                    index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-amber-600'
                  }`}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">{title}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* 発見した職種一覧 */}
        {discoveredJobs.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
            <h3 className="text-base font-bold text-gray-800 mb-4">
              💡 発見した職種（{discoveredJobs.length}件）
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
        ) : (result.discoveredJobCount ?? 0) > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
            <h3 className="text-base font-bold text-gray-800 mb-4">
              💡 発見した職種
            </h3>
            <p className="text-sm text-gray-400 text-center py-2">
              {result.discoveredJobCount}職種を発見しました（詳細データは次回プレイから保存されます）
            </p>
          </div>
        ) : null}
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
