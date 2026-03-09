import { useState } from 'react';
import type { Job } from '../types';
import type { GameResultRecord } from '../utils/storage';
import { getDiagnosisType } from '../data/diagnosis';
import { getJobById } from '../data/jobs/index';
import { statDefinitions } from '../data/stats';
import { JobCard } from './JobCard';
import { JobDetailModal } from './JobDetailModal';

interface GameResultDetailPageProps {
  result: GameResultRecord;
  onBack: () => void;
}

/** 過去のプレイ結果詳細ページ */
export function GameResultDetailPage({ result, onBack }: GameResultDetailPageProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const diagType = getDiagnosisType(result.primaryTrait);

  const recommendedJobs = result.recommendedJobIds
    .map(getJobById)
    .filter((j): j is Job => j !== undefined);

  const discoveredJobs = result.discoveredJobIds
    .map(getJobById)
    .filter((j): j is Job => j !== undefined);

  const topStats = [...statDefinitions]
    .sort((a, b) => result.stats[b.key] - result.stats[a.key])
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

          {/* 強みステータス */}
          <div className="mt-4 flex justify-center gap-4">
            {topStats.map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="text-2xl">{stat.emoji}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                <div className="text-lg font-bold text-gray-800">
                  {result.stats[stat.key]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 全ステータス */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
          <h3 className="text-base font-bold text-gray-800 mb-4">📊 ステータス一覧</h3>
          <div className="space-y-2">
            {statDefinitions.map((stat) => {
              const value = result.stats[stat.key];
              const maxValue = 20;
              return (
                <div key={stat.key} className="flex items-center gap-3">
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
              );
            })}
          </div>
        </div>

        {/* 向いていそうな職種 TOP5 */}
        {recommendedJobs.length > 0 && (
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
        )}

        {/* 発見した職種一覧 */}
        {discoveredJobs.length > 0 && (
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
