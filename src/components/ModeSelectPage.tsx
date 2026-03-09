import type { GameMode } from '../types';

interface ModeSelectPageProps {
  onSelect: (mode: GameMode) => void;
}

/** モード選択画面 */
export function ModeSelectPage({ onSelect }: ModeSelectPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-amber-50">
      <div className="text-center animate-fade-in mb-8">
        <div className="text-4xl mb-4">🗺️</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          どの人生を体験する？
        </h1>
        <p className="text-sm text-gray-400">
          プレイしたいコースを選んでね
        </p>
      </div>

      <div className="w-full max-w-lg space-y-4 animate-slide-up">
        {/* 子供時代→就活コース */}
        <button
          onClick={() => onSelect('childhood')}
          className="w-full text-left group cursor-pointer"
        >
          <div className="relative overflow-hidden rounded-2xl border-2 border-transparent hover:border-amber-300 bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6">
            {/* 背景デコレーション */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100/50 to-transparent rounded-bl-full" />

            {/* ステージアイコン列 */}
            <div className="flex items-center gap-1 mb-4 relative z-10">
              <span className="text-2xl" title="小学校">🎒</span>
              <span className="text-gray-300 text-sm">→</span>
              <span className="text-2xl" title="中学校">📖</span>
              <span className="text-gray-300 text-sm">→</span>
              <span className="text-2xl" title="高校">🏫</span>
              <span className="text-gray-300 text-sm">→</span>
              <span className="text-2xl" title="大学">🎓</span>
              <span className="text-gray-300 text-sm">→</span>
              <span className="text-2xl" title="就活">💼</span>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors relative z-10">
              子供時代 → 就活コース
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed relative z-10">
              小学校の習い事から始まり、部活、文理選択、大学生活を経て就活へ。
              <br />
              あなたの「好き」と「得意」が、どんな仕事につながるか発見しよう！
            </p>

            <div className="mt-4 flex items-center gap-2 relative z-10">
              <span className="text-xs px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
                おすすめ
              </span>
              <span className="text-xs text-gray-400">
                全10ステップ ／ 約5〜10分
              </span>
            </div>
          </div>
        </button>

        {/* 社会人編 */}
        <button
          onClick={() => onSelect('working')}
          className="w-full text-left group cursor-pointer"
        >
          <div className="relative overflow-hidden rounded-2xl border-2 border-transparent hover:border-indigo-300 bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6">
            {/* 背景デコレーション */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-100/50 to-transparent rounded-bl-full" />

            {/* ステージアイコン列 */}
            <div className="flex items-center gap-1 mb-4 relative z-10">
              <span className="text-2xl" title="入社">🌱</span>
              <span className="text-gray-300 text-sm">→</span>
              <span className="text-2xl" title="成長">🔥</span>
              <span className="text-gray-300 text-sm">→</span>
              <span className="text-2xl" title="転機">🔄</span>
              <span className="text-gray-300 text-sm">→</span>
              <span className="text-2xl" title="将来">🚀</span>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors relative z-10">
              社会人編
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed relative z-10">
              入社してからのキャリアストーリー。プロジェクト、スキルアップ、転機…
              <br />
              社会人としてどんなキャリアを歩むかシミュレーションしよう！
            </p>

            <div className="mt-4 flex items-center gap-2 relative z-10">
              <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
                社会人向け
              </span>
              <span className="text-xs text-gray-400">
                全8ステップ ／ 約5分
              </span>
            </div>
          </div>
        </button>
      </div>

      <p className="mt-8 text-xs text-gray-300 animate-fade-in">
        どちらのコースも、最後にあなたに合った職種を提案します
      </p>
    </div>
  );
}
