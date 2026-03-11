import { useState, useMemo } from 'react';
import type { Job } from '../types';
import type { ExperienceReflection } from '../utils/storage';
import { jobs, getJobById, getIndustries } from '../data/jobs/index';
import { getJobExperience } from '../data/job-experiences';
import { JobCard } from './JobCard';
import { JobDetailModal } from './JobDetailModal';

interface JobEncyclopediaPageProps {
  /** 全プレイで発見した職種IDの集合 */
  allDiscoveredJobIds: string[];
  /** 体験ゲームの振り返り記録 */
  reflections: ExperienceReflection[];
  onBack: () => void;
  onReflectionSaved?: (reflection: ExperienceReflection) => void;
}

type TabKey = 'discovered' | 'reflections' | 'all';

/** 職種図鑑ページ */
export function JobEncyclopediaPage({ allDiscoveredJobIds, reflections, onBack, onReflectionSaved }: JobEncyclopediaPageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('discovered');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filterIndustry, setFilterIndustry] = useState<string>('all');
  const [expandedReflection, setExpandedReflection] = useState<string | null>(null);

  const industries = useMemo(() => getIndustries(), []);

  /** 発見済み職種リスト */
  const discoveredJobs = useMemo(() => {
    return allDiscoveredJobIds
      .map((id) => getJobById(id))
      .filter((j): j is Job => j !== undefined);
  }, [allDiscoveredJobIds]);

  /** 業界フィルタ適用 */
  const filteredDiscoveredJobs = useMemo(() => {
    if (filterIndustry === 'all') return discoveredJobs;
    return discoveredJobs.filter((j) => j.industry === filterIndustry);
  }, [discoveredJobs, filterIndustry]);

  const filteredAllJobs = useMemo(() => {
    if (filterIndustry === 'all') return jobs;
    return jobs.filter((j) => j.industry === filterIndustry);
  }, [filterIndustry]);

  /** 発見済み業界の集計 */
  const industryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const job of discoveredJobs) {
      counts[job.industry] = (counts[job.industry] || 0) + 1;
    }
    return counts;
  }, [discoveredJobs]);

  const totalJobs = jobs.length;
  const discoveredCount = allDiscoveredJobIds.length;
  const discoveredPercent = totalJobs > 0 ? Math.round((discoveredCount / totalJobs) * 100) : 0;

  const tabs: { key: TabKey; label: string; emoji: string; count?: number }[] = [
    { key: 'discovered', label: '発見した職種', emoji: '🔍', count: discoveredCount },
    { key: 'reflections', label: '体験の振り返り', emoji: '📝', count: reflections.length },
    { key: 'all', label: '全職種一覧', emoji: '📚', count: totalJobs },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50">
      {/* ヘッダー */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
          >
            ← 戻る
          </button>
          <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span>📖</span> 職種図鑑
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* 発見率サマリー */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-bold text-gray-700">発見率</h2>
              <p className="text-xs text-gray-400 mt-0.5">ゲームで出会った職種の数</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-indigo-600">{discoveredCount}</span>
              <span className="text-sm text-gray-400"> / {totalJobs}</span>
            </div>
          </div>
          {/* プログレスバー */}
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all duration-700"
              style={{ width: `${discoveredPercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2 text-right">{discoveredPercent}% コンプリート</p>

          {/* 業界別ミニ集計 */}
          {discoveredCount > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {industries.map((ind) => {
                const count = industryStats[ind] || 0;
                if (count === 0) return null;
                return (
                  <span
                    key={ind}
                    className="text-[11px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg"
                  >
                    {ind}: {count}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* タブ切り替え */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-white shadow text-gray-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.emoji} {tab.label}
              {tab.count !== undefined && (
                <span className="ml-1 text-[10px] text-gray-400">({tab.count})</span>
              )}
            </button>
          ))}
        </div>

        {/* 業界フィルタ（発見済み・全職種タブ用） */}
        {activeTab !== 'reflections' && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setFilterIndustry('all')}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                filterIndustry === 'all'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-indigo-300'
              }`}
            >
              すべて
            </button>
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setFilterIndustry(ind)}
                className={`shrink-0 text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  filterIndustry === ind
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-indigo-300'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        )}

        {/* コンテンツ */}
        {activeTab === 'discovered' && (
          <div className="animate-fade-in">
            {filteredDiscoveredJobs.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-4">🔎</p>
                <p className="text-gray-500 font-medium">
                  {discoveredCount === 0
                    ? 'まだ職種を発見していません'
                    : 'この業界の職種はまだ発見していません'}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  ゲームをプレイして色々な職種を発見しよう！
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filteredDiscoveredJobs.map((job) => {
                  const hasExperience = !!getJobExperience(job.id);
                  const reflection = reflections.find((r) => r.jobId === job.id);
                  return (
                    <div key={job.id} className="relative">
                      <JobCard job={job} onClick={setSelectedJob} />
                      {/* バッジ */}
                      <div className="absolute top-2 right-2 flex gap-1">
                        {hasExperience && (
                          <span className="text-[10px] bg-indigo-500 text-white px-1.5 py-0.5 rounded-full">
                            🎮 体験可
                          </span>
                        )}
                        {reflection && (
                          <span className="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                            📝 済
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reflections' && (
          <div className="animate-fade-in space-y-3">
            {reflections.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-4">📝</p>
                <p className="text-gray-500 font-medium">体験の振り返りはまだありません</p>
                <p className="text-xs text-gray-400 mt-2">
                  職種詳細から「この仕事を体験する！」で職業体験ゲームを遊んでみよう
                </p>
              </div>
            ) : (
              reflections.map((ref) => {
                const isExpanded = expandedReflection === ref.id;
                return (
                  <button
                    key={ref.id}
                    onClick={() => setExpandedReflection(isExpanded ? null : ref.id)}
                    className="w-full text-left bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-indigo-200 transition-all cursor-pointer"
                  >
                    {/* ヘッダー */}
                    <div className="flex items-center gap-3 p-4">
                      <div className="text-2xl">🎮</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-gray-800">{ref.jobTitle}</div>
                        <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                          <span>{ref.date}</span>
                          <span>•</span>
                          <span className="text-amber-500">
                            {'★'.repeat(ref.interestLevel)}{'☆'.repeat(5 - ref.interestLevel)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-medium text-indigo-600">{ref.resultTitle}</div>
                        <span className="text-gray-300 text-xs">{isExpanded ? '▲' : '▼'}</span>
                      </div>
                    </div>

                    {/* 展開部分 */}
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-3 animate-fade-in">
                        {/* 関心タグ */}
                        {ref.interestTags.length > 0 && (
                          <div>
                            <div className="text-[11px] text-gray-400 mb-1.5">関心ポイント</div>
                            <div className="flex flex-wrap gap-1.5">
                              {ref.interestTags.map((tag, i) => (
                                <span key={i} className="text-[11px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-lg">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* スコア */}
                        {Object.keys(ref.scores).length > 0 && (
                          <div>
                            <div className="text-[11px] text-gray-400 mb-1.5">スコア</div>
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(ref.scores).map(([key, val]) => (
                                <div key={key} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                  {key}: <span className="font-semibold">{val}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* フリーコメント */}
                        {ref.freeComment && (
                          <div>
                            <div className="text-[11px] text-gray-400 mb-1">メモ</div>
                            <p className="text-xs text-gray-600 bg-gray-50 rounded-lg p-2.5 leading-relaxed">
                              {ref.freeComment}
                            </p>
                          </div>
                        )}
                        {/* 選択履歴 */}
                        {ref.history && ref.history.length > 0 && (
                          <div>
                            <div className="text-[11px] text-gray-400 mb-2">体験の記録</div>
                            <div className="space-y-2.5">
                              {ref.history.map((entry, i) => (
                                <div key={i} className="bg-gray-50 rounded-lg p-2.5">
                                  <div className="flex items-start gap-2 mb-1.5">
                                    <span className="text-[10px] text-white bg-indigo-400 rounded-full w-4 h-4 flex items-center justify-center shrink-0 mt-0.5 font-bold">{i + 1}</span>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-[11px] font-bold text-gray-700">{entry.sceneTitle}</div>
                                      <div className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">{entry.situation}</div>
                                    </div>
                                  </div>
                                  <div className="ml-6 flex items-start gap-1.5 bg-indigo-50 rounded-lg px-2.5 py-1.5 mb-1.5">
                                    <span className="text-sm">{entry.choiceEmoji}</span>
                                    <span className="text-[11px] text-indigo-700 font-medium">{entry.choiceText}</span>
                                  </div>
                                  <div className="ml-6 text-[10px] text-blue-600 bg-blue-50 rounded-lg px-2.5 py-1.5 leading-relaxed">
                                    💡 {entry.lesson}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* 職種詳細を見るボタン */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            const job = getJobById(ref.jobId);
                            if (job) setSelectedJob(job);
                          }}
                          className="text-xs text-indigo-500 hover:text-indigo-700 font-medium pt-1"
                        >
                          この職種の詳細を見る →
                        </div>
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'all' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-2 gap-3">
              {filteredAllJobs.map((job) => {
                const isDiscovered = allDiscoveredJobIds.includes(job.id);
                return (
                  <div key={job.id} className="relative">
                    {!isDiscovered && (
                      <div className="absolute inset-0 z-10 bg-gray-100/60 backdrop-blur-[2px] rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-2xl mb-1">🔒</p>
                          <p className="text-[10px] text-gray-400 font-medium">未発見</p>
                        </div>
                      </div>
                    )}
                    <JobCard job={job} onClick={isDiscovered ? setSelectedJob : () => {}} />
                    {isDiscovered && (
                      <div className="absolute top-2 right-2">
                        <span className="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                          発見済み
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 職種詳細モーダル */}
      {selectedJob && (
        <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} onReflectionSaved={onReflectionSaved} />
      )}
    </div>
  );
}
