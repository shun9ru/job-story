import { useState } from 'react';
import type { Job } from '../types';
import { getJobImageUrl } from '../data/job-images';

interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
}

/** 職種詳細モーダル */
export function JobDetailModal({ job, onClose }: JobDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'daily' | 'yearly' | 'career'>('daily');
  const [imgError, setImgError] = useState(false);
  const imageUrl = getJobImageUrl(job.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/40" />

      {/* モーダル本体 */}
      <div
        className="relative bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[85vh] overflow-y-auto shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヒーロー画像 */}
        {imageUrl && !imgError && (
          <div className="relative h-40 sm:h-48 overflow-hidden sm:rounded-t-2xl">
            <img
              src={imageUrl}
              alt={job.title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center text-lg leading-none cursor-pointer backdrop-blur-sm transition-colors"
            >
              ✕
            </button>
            <div className="absolute bottom-3 left-4">
              <span className="text-xs bg-white/90 text-indigo-600 px-2 py-0.5 rounded font-medium">
                {job.industry}
              </span>
              <h2 className="text-xl font-bold text-white mt-1 drop-shadow-lg">
                {job.title}
              </h2>
            </div>
          </div>
        )}

        {/* テキストヘッダー（画像がない場合） */}
        {(!imageUrl || imgError) && (
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <div>
              <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-medium">
                {job.industry}
              </span>
              <h2 className="text-xl font-bold text-gray-800 mt-1">
                {job.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer p-1"
            >
              ✕
            </button>
          </div>
        )}

        <div className="px-6 py-5 space-y-6">
          {/* 一言説明 */}
          <p className="text-gray-600 leading-relaxed font-medium">
            {job.shortDescription}
          </p>

          {/* 主な仕事内容 */}
          <Section title="📋 主な仕事内容">
            <ul className="space-y-2">
              {job.description.map((d, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600">
                  <span className="text-indigo-400 mt-0.5 shrink-0">●</span>
                  {d}
                </li>
              ))}
            </ul>
          </Section>

          {/* タイムラインタブ */}
          <div>
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-4">
              {([
                { key: 'daily', label: '1日の流れ', emoji: '⏰' },
                { key: 'yearly', label: '1年の流れ', emoji: '📅' },
                { key: 'career', label: 'キャリアパス', emoji: '🚀' },
              ] as const).map((tab) => {
                const hasData = tab.key === 'daily' || (tab.key === 'yearly' && job.yearlySchedule) || (tab.key === 'career' && job.careerPath);
                return (
                  <button
                    key={tab.key}
                    onClick={() => hasData && setActiveTab(tab.key)}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                      activeTab === tab.key
                        ? 'bg-white shadow text-gray-800'
                        : hasData
                          ? 'text-gray-500 hover:text-gray-700'
                          : 'text-gray-300 cursor-default'
                    }`}
                  >
                    {tab.emoji} {tab.label}
                  </button>
                );
              })}
            </div>

            {/* 1日の流れ */}
            {activeTab === 'daily' && (
              <div className="space-y-2 animate-fade-in">
                {job.dailySchedule.map((s, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="text-indigo-500 font-mono font-semibold w-12 shrink-0">
                      {s.time}
                    </span>
                    <span className="text-gray-600">{s.task}</span>
                  </div>
                ))}
              </div>
            )}

            {/* 1年の流れ */}
            {activeTab === 'yearly' && job.yearlySchedule && (
              <div className="space-y-2 animate-fade-in">
                {job.yearlySchedule.map((s, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="text-emerald-600 font-semibold w-16 shrink-0">
                      {s.month}
                    </span>
                    <span className="text-gray-600">{s.task}</span>
                  </div>
                ))}
              </div>
            )}

            {/* キャリアパス */}
            {activeTab === 'career' && job.careerPath && (
              <div className="space-y-3 animate-fade-in">
                {job.careerPath.map((step, i) => (
                  <div key={i} className="relative pl-6 pb-3">
                    {/* タイムラインの縦線 */}
                    {i < job.careerPath!.length - 1 && (
                      <div className="absolute left-[9px] top-6 bottom-0 w-0.5 bg-indigo-100" />
                    )}
                    {/* ドット */}
                    <div className={`absolute left-0 top-1 w-[18px] h-[18px] rounded-full border-2 ${
                      i === 0 ? 'bg-indigo-500 border-indigo-500' : 'bg-white border-indigo-300'
                    }`} />
                    <div>
                      <span className="text-xs font-bold text-indigo-600">{step.year}</span>
                      <h4 className="text-sm font-semibold text-gray-800 mt-0.5">{step.role}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* データがない場合 */}
            {activeTab === 'yearly' && !job.yearlySchedule && (
              <p className="text-xs text-gray-400 text-center py-4">準備中です</p>
            )}
            {activeTab === 'career' && !job.careerPath && (
              <p className="text-xs text-gray-400 text-center py-4">準備中です</p>
            )}
          </div>

          {/* 向いている人 */}
          <Section title="🙋 向いている人">
            <div className="flex flex-wrap gap-2">
              {job.suitableFor.map((s, i) => (
                <span
                  key={i}
                  className="text-sm bg-green-50 text-green-700 px-3 py-1.5 rounded-lg"
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>

          {/* 身につく力 */}
          <Section title="💪 身につく力">
            <div className="flex flex-wrap gap-2">
              {job.skillsGained.map((s, i) => (
                <span
                  key={i}
                  className="text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg"
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>

          {/* 代表的な企業例 */}
          <Section title="🏢 代表的な企業例">
            <div className="flex flex-wrap gap-2">
              {job.companyExamples.map((c, i) => (
                <span
                  key={i}
                  className="text-sm bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg border border-gray-100"
                >
                  {c}
                </span>
              ))}
            </div>
          </Section>
        </div>

        {/* 下部余白 */}
        <div className="h-6" />
      </div>
    </div>
  );
}

/** セクション見出しコンポーネント */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-800 mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}
