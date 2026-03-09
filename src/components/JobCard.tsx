import type { Job } from '../types';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
  /** コンパクト表示モード（ゲーム中の小さいカード） */
  compact?: boolean;
}

/** 職種カードコンポーネント */
export function JobCard({ job, onClick, compact = false }: JobCardProps) {
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
      className="w-full text-left bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
        <span className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-medium whitespace-nowrap">
          {job.industry}
        </span>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed">
        {job.shortDescription}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-50 text-gray-400 px-2 py-0.5 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
    </button>
  );
}
