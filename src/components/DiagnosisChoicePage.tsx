import { getDiagnosisType } from '../data/diagnosis';
import type { DiagnosisRecord } from '../types';

interface DiagnosisChoicePageProps {
  records: DiagnosisRecord[];
  onReuse: (record: DiagnosisRecord) => void;
  onRedo: () => void;
}

/** 過去の診断結果を使うか、やり直すかの選択画面 */
export function DiagnosisChoicePage({ records, onReuse, onRedo }: DiagnosisChoicePageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-violet-100 via-indigo-50 via-50% to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="animated-bg">
        <div className="absolute top-[15%] right-[10%] w-48 h-48 rounded-full bg-purple-200/15 animate-float-slow" />
        <div className="absolute bottom-[20%] left-[10%] w-40 h-40 rounded-full bg-indigo-200/10 animate-float-medium" />
      </div>

      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3 animate-wiggle inline-block">🔮</div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">性格診断</h1>
          <p className="text-sm text-gray-400">
            過去の診断結果を使うこともできます
          </p>
        </div>

        <div className="space-y-4 animate-slide-up">
          {/* やり直すボタン */}
          <button
            onClick={onRedo}
            className="w-full text-left group cursor-pointer"
          >
            <div className="rounded-2xl border-2 border-transparent hover:border-indigo-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 p-5 card-hover">
              <div className="flex items-center gap-4">
                <span className="text-3xl group-hover:animate-bounce-subtle">🆕</span>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    新しく診断する
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    10問の質問に答えて、あなたのタイプを診断します
                  </p>
                </div>
                <span className="text-gray-300 group-hover:text-indigo-400 transition-colors">→</span>
              </div>
            </div>
          </button>

          {/* 過去の結果一覧 */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 text-center mt-4 mb-2">
              📋 過去の結果を使ってすぐ始める
            </p>
            {records.slice(0, 5).map((record) => {
              const diagType = getDiagnosisType(record.primaryStat);
              return (
                <button
                  key={record.id}
                  onClick={() => onReuse(record)}
                  className="w-full text-left group cursor-pointer"
                >
                  <div className="rounded-xl border-2 border-transparent hover:border-emerald-300 bg-white/80 backdrop-blur-sm shadow hover:shadow-lg hover:shadow-emerald-50/50 transition-all duration-300 p-4 card-hover">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {diagType.emoji}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                          {diagType.label}
                        </div>
                        <div className="text-xs text-gray-400">
                          {record.date}
                          {record.gameMode && (
                            <span className="ml-1.5">
                              {record.gameMode === 'childhood' ? '🎒 子供時代編' : '💼 社会人編'}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-emerald-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        この結果で開始
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
