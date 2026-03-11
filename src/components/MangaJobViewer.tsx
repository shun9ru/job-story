import { useState, useCallback } from 'react';
import type { Job } from '../types';
import { getJobImageUrl } from '../data/job-images';

interface MangaJobViewerProps {
  job: Job;
  onClose: () => void;
}

/** 職種をマンガ風ストーリーで紹介するビューア（ページめくり式） */
export function MangaJobViewer({ job, onClose }: MangaJobViewerProps) {
  const pages = buildPages(job);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const goNext = useCallback(() => {
    if (currentPage < pages.length - 1) {
      setDirection('next');
      setCurrentPage((p) => p + 1);
    }
  }, [currentPage, pages.length]);

  const goPrev = useCallback(() => {
    if (currentPage > 0) {
      setDirection('prev');
      setCurrentPage((p) => p - 1);
    }
  }, [currentPage]);

  const page = pages[currentPage];
  const isFirst = currentPage === 0;
  const isLast = currentPage === pages.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div
        className="relative w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="bg-gray-900 text-white px-4 py-2.5 flex items-center justify-between sm:rounded-t-2xl shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-base">📖</span>
            <span className="font-bold text-xs tracking-wide">マンガでわかる！お仕事ずかん</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-gray-400 font-mono">
              {currentPage + 1} / {pages.length}
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-lg leading-none cursor-pointer p-0.5 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ページ進捗バー */}
        <div className="h-1 bg-gray-200 shrink-0">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
            style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
          />
        </div>

        {/* ページ内容 */}
        <div
          key={`${currentPage}-${direction}`}
          className="flex-1 overflow-y-auto bg-amber-50"
          style={{ animation: `manga-${direction === 'next' ? 'slide-left' : 'slide-right'} 0.25s ease-out` }}
        >
          <div className="p-4">
            {page.render()}
          </div>
        </div>

        {/* ナビゲーション */}
        <div className="bg-white border-t-2 border-gray-200 px-4 py-3 flex items-center justify-between shrink-0 sm:rounded-b-2xl">
          <button
            onClick={goPrev}
            disabled={isFirst}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              isFirst
                ? 'text-gray-300 cursor-default'
                : 'text-gray-600 hover:bg-gray-100 active:scale-95'
            }`}
          >
            <span>◀</span> もどる
          </button>

          {/* ページドット */}
          <div className="flex gap-1.5">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentPage ? 'next' : 'prev'); setCurrentPage(i); }}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  i === currentPage
                    ? 'bg-amber-500 scale-125'
                    : i < currentPage
                      ? 'bg-amber-300'
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {isLast ? (
            <button
              onClick={onClose}
              className="flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition-all active:scale-95 cursor-pointer"
            >
              おしまい!
            </button>
          ) : (
            <button
              onClick={goNext}
              className="flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 transition-all active:scale-95 cursor-pointer"
            >
              つぎへ <span>▶</span>
            </button>
          )}
        </div>

        {/* スワイプヒント（最初のページだけ） */}
        {isFirst && (
          <style>{`
            @keyframes manga-hint {
              0%, 100% { opacity: 0; }
              20%, 80% { opacity: 1; }
            }
          `}</style>
        )}
      </div>

      {/* アニメーション用スタイル */}
      <style>{`
        @keyframes manga-slide-left {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes manga-slide-right {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// ─── ページ組み立て ───

interface MangaPage {
  render: () => React.ReactNode;
}

/** 職種データからページを組み立てる */
function buildPages(job: Job): MangaPage[] {
  const imageUrl = getJobImageUrl(job.id);
  const timeSlots = groupSchedule(job.dailySchedule);
  const pages: MangaPage[] = [];

  // ── 1. 表紙 ──
  pages.push({
    render: () => (
      <div className="space-y-3">
        <Panel variant="title">
          {imageUrl && (
            <div className="w-full h-36 rounded-xl overflow-hidden mb-3 border-3 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.7)]">
              <img src={imageUrl} alt={job.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
          )}
          <div className="text-center">
            <SfxBadge text="ジャジャーン！" color="red" />
            <p className="text-[10px] text-gray-500 font-bold mt-2 tracking-wider">{job.industry}</p>
            <h2 className="text-2xl font-black text-gray-800 mt-1 tracking-tight leading-tight">
              {job.title}
            </h2>
          </div>
        </Panel>

        <Panel variant="normal">
          <div className="flex gap-3 items-start">
            <YumeIcon mood="sparkle" />
            <SpeechBubble>
              <span className="font-bold text-amber-600">ユメ</span>だよ！
              今日は<span className="font-bold text-indigo-600">「{job.title}」</span>のお仕事をたんけんするよ！
            </SpeechBubble>
          </div>
          <div className="mt-3 flex gap-3 items-start">
            <GuideIcon />
            <SpeechBubble variant="guide">
              {job.shortDescription}
            </SpeechBubble>
          </div>
        </Panel>

        <div className="text-center">
          <span className="text-[10px] text-gray-400 animate-pulse">▼ 「つぎへ」をタップしてね ▼</span>
        </div>
      </div>
    ),
  });

  // ── 2. 朝のシーン ──
  const morningTasks = [...timeSlots.morning, ...timeSlots.midday.slice(0, 1)];
  if (morningTasks.length > 0) {
    pages.push({
      render: () => (
        <div className="space-y-3">
          <NarrationBox>第1話：あさ がきた！</NarrationBox>

          <Panel variant="action">
            <SceneHeader emoji="🌅" text="朝のスタート！" />
            <div className="flex gap-3 items-start mt-3">
              <YumeIcon mood="excited" />
              <SpeechBubble>
                おはよう！ {job.title}さんの朝は何時からかな？
              </SpeechBubble>
            </div>

            {morningTasks.map((s, i) => (
              <div key={i} className="mt-3">
                <div className="flex gap-3 items-start">
                  <TimeIcon time={s.time} />
                  <div className="flex-1">
                    {i === 0 && <SfxBadge text="シャキーン！" color="blue" size="sm" />}
                    <div className="bg-white rounded-xl p-3 border-2 border-gray-200 text-xs text-gray-700 leading-relaxed mt-1">
                      <span className="font-bold text-indigo-500">{s.time}</span> — {s.task}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Panel>

          <Panel variant="normal">
            <div className="flex gap-3 items-start">
              <YumeIcon mood="thinking" />
              <ThoughtBubble>
                へぇ〜！ 朝からけっこういそがしいんだね！
              </ThoughtBubble>
            </div>
          </Panel>
        </div>
      ),
    });
  }

  // ── 3. 昼〜午後のシーン ──
  const afternoonTasks = [...timeSlots.midday.slice(1), ...timeSlots.afternoon];
  if (afternoonTasks.length > 0 || job.description.length > 0) {
    pages.push({
      render: () => (
        <div className="space-y-3">
          <NarrationBox>第2話：おひるの大かつやく！</NarrationBox>

          <Panel variant="action">
            <SceneHeader emoji="☀️" text="お昼〜午後" />
            {afternoonTasks.map((s, i) => (
              <div key={i} className="flex gap-3 items-start mt-3">
                <TimeIcon time={s.time} />
                <div className="flex-1 bg-white rounded-xl p-3 border-2 border-gray-200 text-xs text-gray-700 leading-relaxed">
                  <span className="font-bold text-orange-500">{s.time}</span> — {s.task}
                </div>
              </div>
            ))}
          </Panel>

          {job.description[0] && (
            <Panel variant="highlight">
              <div className="flex gap-3 items-start">
                <GuideIcon />
                <SpeechBubble variant="guide">
                  <span className="text-[10px] font-bold text-amber-600 block mb-1">おしごとメモ</span>
                  {job.description[0]}
                </SpeechBubble>
              </div>
            </Panel>
          )}

          <Panel variant="normal">
            <SfxBadge text="ドキドキ！" color="pink" size="sm" />
            <div className="flex gap-3 items-start mt-2">
              <YumeIcon mood="sparkle" />
              <SpeechBubble>
                すごい！ いろんなことをしてるんだね！
              </SpeechBubble>
            </div>
          </Panel>
        </div>
      ),
    });
  }

  // ── 4. 夕方・おしごとの秘密 ──
  pages.push({
    render: () => (
      <div className="space-y-3">
        <NarrationBox>第3話：おしごとのヒミツ</NarrationBox>

        {timeSlots.evening.length > 0 && (
          <Panel variant="normal">
            <SceneHeader emoji="🌙" text="夕方〜おわり" />
            {timeSlots.evening.map((s, i) => (
              <div key={i} className="flex gap-3 items-start mt-3">
                <TimeIcon time={s.time} />
                <div className="flex-1 bg-white rounded-xl p-3 border-2 border-gray-200 text-xs text-gray-700 leading-relaxed">
                  <span className="font-bold text-purple-500">{s.time}</span> — {s.task}
                </div>
              </div>
            ))}
          </Panel>
        )}

        {job.description.length > 1 && (
          <Panel variant="highlight">
            <div className="text-center mb-2">
              <SfxBadge text="ピカーン！" color="yellow" />
            </div>
            <div className="space-y-2">
              {job.description.slice(1, 3).map((d, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-lg shrink-0 mt-0.5">{['💡', '🌟'][i]}</span>
                  <div className="flex-1 bg-white/80 rounded-lg p-2.5 text-xs text-gray-700 leading-relaxed border border-amber-200">
                    {d}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        )}

        <Panel variant="normal">
          <div className="flex gap-3 items-start">
            <YumeIcon mood="surprised" />
            <SpeechBubble>
              そうなんだ！ 知らなかったことがいっぱい！
            </SpeechBubble>
          </div>
        </Panel>
      </div>
    ),
  });

  // ── 5. クイズ＆スゴいところ ──
  pages.push({
    render: () => (
      <div className="space-y-3">
        <NarrationBox>第4話：ここがスゴい！</NarrationBox>

        {/* ミニクイズ */}
        <Panel variant="action">
          <div className="text-center">
            <SfxBadge text="クイズ！" color="purple" />
            <p className="text-xs text-gray-600 mt-2 font-bold">
              {job.title}に向いてるのは<br />どんな人だと思う？
            </p>
            <div className="flex gap-3 items-start mt-3">
              <YumeIcon mood="thinking" />
              <ThoughtBubble>
                う〜ん、どんな人だろう…？
              </ThoughtBubble>
            </div>
          </div>
        </Panel>

        <Panel variant="highlight">
          <div className="text-center mb-2">
            <span className="inline-block bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full">
              こたえ：こんな人にピッタリ！
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {job.suitableFor.map((s, i) => (
              <span
                key={i}
                className="text-[11px] bg-white border-2 border-emerald-300 text-emerald-700 px-2.5 py-1 rounded-full font-bold"
              >
                {s}
              </span>
            ))}
          </div>
        </Panel>

        {job.description.length > 2 && (
          <Panel variant="normal">
            <div className="text-center mb-2">
              <span className="inline-block bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full">
                この仕事のスゴいところ！
              </span>
            </div>
            <div className="space-y-2">
              {job.description.slice(2).map((d, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-base shrink-0">{['🏆', '🎯', '💎', '🌈'][i % 4]}</span>
                  <p className="text-xs text-gray-700 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </Panel>
        )}
      </div>
    ),
  });

  // ── 6. 成長ストーリー ──
  const careerStart = job.careerPath?.[0];
  const careerEnd = job.careerPath?.[job.careerPath.length - 1];
  if (careerStart && careerEnd) {
    pages.push({
      render: () => (
        <div className="space-y-3">
          <NarrationBox>第5話：せいちょうストーリー</NarrationBox>

          <Panel variant="normal">
            <div className="flex gap-3 items-start">
              <YumeIcon mood="excited" />
              <SpeechBubble>
                {job.title}さんって、どうやって成長するの？
              </SpeechBubble>
            </div>
          </Panel>

          <Panel variant="action">
            <div className="text-center mb-2">
              <SfxBadge text="レベルアップ！" color="blue" />
            </div>

            {/* スタート */}
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 bg-green-100 border-2 border-green-500 rounded-full flex items-center justify-center text-lg shrink-0">
                🐣
              </div>
              <div className="flex-1 bg-green-50 rounded-xl p-3 border-2 border-green-200">
                <span className="text-[10px] text-green-600 font-bold">{careerStart.year}</span>
                <p className="text-xs font-bold text-gray-800 mt-0.5">{careerStart.role}</p>
                <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{careerStart.description}</p>
              </div>
            </div>

            {/* 矢印 */}
            <div className="flex flex-col items-center my-2 gap-0.5">
              <span className="text-gray-400 text-xs font-bold">⬇</span>
              <span className="text-[10px] text-gray-400 font-bold">けいけんをつんで…</span>
              <span className="text-gray-400 text-xs font-bold">⬇</span>
            </div>

            {/* ゴール */}
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 bg-amber-100 border-2 border-amber-500 rounded-full flex items-center justify-center text-lg shrink-0">
                🦅
              </div>
              <div className="flex-1 bg-amber-50 rounded-xl p-3 border-2 border-amber-200">
                <span className="text-[10px] text-amber-600 font-bold">{careerEnd.year}</span>
                <p className="text-xs font-bold text-gray-800 mt-0.5">{careerEnd.role}</p>
                <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{careerEnd.description}</p>
              </div>
            </div>

            {/* 中間ステップ */}
            {job.careerPath && job.careerPath.length > 2 && (
              <details className="mt-3">
                <summary className="text-[10px] text-indigo-500 font-bold cursor-pointer hover:text-indigo-700 text-center">
                  くわしいステップを見る（{job.careerPath.length}だんかい）
                </summary>
                <div className="mt-2 space-y-1.5">
                  {job.careerPath.map((step, i) => (
                    <div key={i} className="flex gap-2 items-start text-[10px]">
                      <span className="text-indigo-400 font-bold shrink-0 w-14">{step.year}</span>
                      <div>
                        <span className="font-bold text-gray-700">{step.role}</span>
                        <p className="text-gray-400 mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </Panel>

          <Panel variant="normal">
            <div className="flex gap-3 items-start">
              <YumeIcon mood="sparkle" />
              <SpeechBubble>
                すごい！ どんどんパワーアップしていくんだね！
              </SpeechBubble>
            </div>
          </Panel>
        </div>
      ),
    });
  }

  // ── 7. スキル＆エンディング ──
  pages.push({
    render: () => (
      <div className="space-y-3">
        <NarrationBox>さいしゅうわ：みにつくチカラ！</NarrationBox>

        <Panel variant="action">
          <div className="text-center mb-2">
            <span className="inline-block bg-blue-500 text-white text-[10px] font-black px-3 py-1 rounded-full">
              ゲットできるスキル！
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {job.skillsGained.map((s, i) => (
              <span
                key={i}
                className="text-[11px] bg-blue-50 border-2 border-blue-300 text-blue-700 px-2.5 py-1.5 rounded-full font-bold flex items-center gap-1"
              >
                <span>⚡</span> {s}
              </span>
            ))}
          </div>
        </Panel>

        {/* エンディング */}
        <Panel variant="title">
          <div className="text-center space-y-3">
            <SfxBadge text="パチパチパチ！" color="yellow" />
            <div className="text-4xl mt-2">📖✨</div>
            <div className="flex gap-3 items-center justify-center">
              <YumeIcon mood="happy" />
              <p className="text-sm font-bold text-gray-700">
                「{job.title}」のおはなし<br />おしまい！
              </p>
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              きになったら、ゲームの中で<br />この仕事を発見してみよう！
            </p>
            <button
              onClick={() => {/* handled by parent nav */}}
              className="mt-1 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-full shadow transition-all active:scale-95 cursor-pointer"
            >
              とじる
            </button>
          </div>
        </Panel>
      </div>
    ),
  });

  return pages;
}

// ─── サブコンポーネント ───

/** マンガのコマ */
function Panel({
  variant = 'normal',
  children,
}: {
  variant?: 'normal' | 'title' | 'action' | 'highlight';
  children: React.ReactNode;
}) {
  const styles: Record<string, string> = {
    normal: 'bg-white border-2 border-gray-800 rounded-lg p-4',
    title: 'bg-white border-3 border-gray-900 rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]',
    action: 'bg-white border-2 border-gray-800 rounded-lg p-4 shadow-[3px_3px_0px_0px_rgba(99,102,241,0.4)]',
    highlight: 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400 rounded-lg p-4',
  };
  return <div className={styles[variant]}>{children}</div>;
}

/** ユメちゃん（案内キャラ） */
function YumeIcon({ mood }: { mood: 'sparkle' | 'excited' | 'thinking' | 'surprised' | 'happy' }) {
  const faces: Record<string, string> = {
    sparkle: '🤩',
    excited: '😆',
    thinking: '🤔',
    surprised: '😲',
    happy: '😊',
  };
  return (
    <div className="w-10 h-10 bg-pink-100 border-2 border-pink-400 rounded-full flex items-center justify-center text-lg shrink-0 shadow-sm">
      {faces[mood]}
    </div>
  );
}

/** 先生キャラ */
function GuideIcon() {
  return (
    <div className="w-10 h-10 bg-indigo-100 border-2 border-indigo-400 rounded-full flex items-center justify-center text-lg shrink-0 shadow-sm">
      🧑‍🏫
    </div>
  );
}

/** 時刻アイコン */
function TimeIcon({ time }: { time: string }) {
  return (
    <div className="w-9 h-9 bg-gray-100 border-2 border-gray-600 rounded-lg flex items-center justify-center shrink-0">
      <span className="text-[10px] font-black text-gray-700">{time}</span>
    </div>
  );
}

/** 吹き出し */
function SpeechBubble({
  variant = 'speech',
  children,
}: {
  variant?: 'speech' | 'guide';
  children: React.ReactNode;
}) {
  const base = 'relative flex-1 rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed';
  const style = variant === 'guide'
    ? `${base} bg-indigo-50 border-2 border-indigo-300 text-indigo-800`
    : `${base} bg-white border-2 border-gray-700 text-gray-700`;

  const arrowColor = variant === 'guide' ? 'border-r-indigo-300' : 'border-r-gray-700';
  const arrowInner = variant === 'guide' ? 'border-r-indigo-50' : 'border-r-white';

  return (
    <div className={style}>
      <div className={`absolute -left-2 top-3 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] ${arrowColor} border-b-[6px] border-b-transparent`} />
      <div className={`absolute -left-[5px] top-3 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] ${arrowInner} border-b-[6px] border-b-transparent`} />
      {children}
    </div>
  );
}

/** 考え中の吹き出し */
function ThoughtBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex-1 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl px-3.5 py-2.5 text-xs text-gray-600 leading-relaxed italic">
      {children}
    </div>
  );
}

/** 効果音バッジ */
function SfxBadge({ text, color, size = 'md' }: { text: string; color: 'red' | 'blue' | 'pink' | 'yellow' | 'purple'; size?: 'sm' | 'md' }) {
  const colors: Record<string, string> = {
    red: 'bg-red-500 text-white',
    blue: 'bg-blue-500 text-white',
    pink: 'bg-pink-500 text-white',
    yellow: 'bg-yellow-400 text-yellow-900',
    purple: 'bg-purple-500 text-white',
  };
  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1';
  return (
    <span className={`inline-block ${colors[color]} ${sizeClass} font-black rounded-full tracking-wider shadow-sm`}
      style={{ transform: 'rotate(-2deg)', display: 'inline-block' }}
    >
      {text}
    </span>
  );
}

/** シーン見出し */
function SceneHeader({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <span className="text-lg">{emoji}</span>
      <span className="text-sm font-black text-gray-800 tracking-wider">{text}</span>
      <div className="flex-1 border-b-2 border-gray-300" />
    </div>
  );
}

/** ナレーションボックス */
function NarrationBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-800 text-white text-xs font-bold px-4 py-2.5 rounded-lg text-center tracking-wider shadow-md">
      {children}
    </div>
  );
}

// ─── ヘルパー ───

function groupSchedule(schedule: { time: string; task: string }[]) {
  const morning: typeof schedule = [];
  const midday: typeof schedule = [];
  const afternoon: typeof schedule = [];
  const evening: typeof schedule = [];

  for (const item of schedule) {
    const hour = parseHour(item.time);
    if (hour < 10) morning.push(item);
    else if (hour < 13) midday.push(item);
    else if (hour < 17) afternoon.push(item);
    else evening.push(item);
  }

  return { morning, midday, afternoon, evening };
}

function parseHour(time: string): number {
  const match = time.match(/(\d{1,2})/);
  return match ? parseInt(match[1], 10) : 12;
}
