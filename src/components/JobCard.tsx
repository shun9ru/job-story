import { useState } from 'react';
import type { Job } from '../types';
import { getJobImageUrl } from '../data/job-images';

/** 業界ごとのグラデーション（画像フォールバック用） */
const industryGradients: Record<string, string> = {
  'IT・テクノロジー': 'from-blue-500 to-indigo-600',
  'クリエイティブ': 'from-pink-500 to-purple-600',
  '営業・ビジネス': 'from-amber-500 to-orange-600',
  'マーケティング・広告': 'from-rose-500 to-red-600',
  'コンサル・金融': 'from-emerald-500 to-teal-600',
  '管理・バックオフィス': 'from-slate-500 to-gray-600',
  'メーカー・製造': 'from-cyan-500 to-blue-600',
  '医療・福祉': 'from-green-500 to-emerald-600',
  '教育・法律・公務': 'from-violet-500 to-purple-600',
  'サービス・ライフスタイル': 'from-orange-500 to-amber-600',
  'インフラ・その他': 'from-stone-500 to-zinc-600',
};

/** 業界ごとの代表絵文字 */
const industryEmojis: Record<string, string> = {
  'IT・テクノロジー': '💻',
  'クリエイティブ': '🎨',
  '営業・ビジネス': '🤝',
  'マーケティング・広告': '📊',
  'コンサル・金融': '💰',
  '管理・バックオフィス': '📁',
  'メーカー・製造': '🏭',
  '医療・福祉': '🏥',
  '教育・法律・公務': '📚',
  'サービス・ライフスタイル': '✨',
  'インフラ・その他': '🏗️',
};

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
  compact?: boolean;
}

/** 職種カードコンポーネント */
export function JobCard({ job, onClick, compact = false }: JobCardProps) {
  const imageUrl = getJobImageUrl(job.id);

  if (compact) {
    return (
      <button
        onClick={() => onClick(job)}
        className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-3 py-2 hover:border-indigo-300 hover:shadow-sm transition-all text-left cursor-pointer"
      >
        <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-medium whitespace-nowrap">
          {job.industry}
        </span>
        <span className="text-sm text-gray-700 font-medium truncate">
          {job.title}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={() => onClick(job)}
      className="w-full text-left bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer group"
    >
      {/* 画像エリア */}
      <JobImage imageUrl={imageUrl} industry={job.industry} title={job.title} />

      {/* テキストエリア */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="text-base font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
            {job.title}
          </h3>
          <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium whitespace-nowrap ml-2 shrink-0">
            {job.industry}
          </span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {job.shortDescription}
        </p>
      </div>
    </button>
  );
}

/** 画像コンポーネント（ロード失敗時はグラデーションフォールバック） */
function JobImage({ imageUrl, industry, title }: { imageUrl?: string; industry: string; title: string }) {
  const [imgError, setImgError] = useState(false);
  const gradient = industryGradients[industry] || 'from-gray-500 to-gray-600';
  const emoji = industryEmojis[industry] || '💼';

  if (!imageUrl || imgError) {
    return (
      <div className={`h-28 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
        <span className="text-4xl opacity-80">{emoji}</span>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    );
  }

  return (
    <div className="h-28 relative overflow-hidden bg-gray-100">
      <img
        src={imageUrl}
        alt={title}
        loading="lazy"
        onError={() => setImgError(true)}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}
