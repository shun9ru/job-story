import { useState, useMemo } from 'react';
import type { StatKey } from '../types';

/** レーダーチャートで表示するスキル軸（10軸・ステータスと完全一致） */
const SKILL_AXES: { key: StatKey; label: string; emoji: string; description: string }[] = [
  { key: 'satisfaction', label: '満足度志向', emoji: '😊', description: 'やりがいや充実感をどれだけ重視するかの価値観。この数値が高い人は、仕事の意義や自己実現に重きを置く傾向がある。' },
  { key: 'income', label: '年収志向', emoji: '💰', description: '経済的な豊かさや安定をどれだけ重視するかの価値観。この数値が高い人は、収入アップやキャリアの経済的リターンを重要視する傾向がある。' },
  { key: 'communication', label: 'コミュ力', emoji: '💬', description: '人との対話・交渉・チームワークなど、他者と関わりながら成果を出す力。営業・接客・マネジメントなど幅広い職種で重要。' },
  { key: 'planning', label: '企画力', emoji: '💡', description: 'アイデアを形にし、戦略を立てて実行する力。新しい事業やサービスを生み出すための構想力・推進力を含む。' },
  { key: 'analysis', label: '分析力', emoji: '📊', description: 'データや情報を読み解き、論理的に判断する力。問題の本質を見抜き、根拠に基づいた意思決定ができる。' },
  { key: 'creative', label: '創造力', emoji: '🎨', description: '独自の発想やセンスで新しい価値を生み出す力。デザイン・映像・音楽・広告など表現に関わる職種で特に重要。' },
  { key: 'technical', label: '技術力', emoji: '🔬', description: '専門的な知識やスキルを駆使して課題を解決する力。IT・エンジニアリング・研究・医療など専門職の基盤となる。' },
  { key: 'care', label: '支援力', emoji: '🤝', description: '人に寄り添い、支え、育てる力。教育・福祉・医療ケアなど、誰かの助けになることにやりがいを感じる人の強み。' },
  { key: 'stability', label: '安定度', emoji: '🛡️', description: '正確さ・堅実さ・責任感を持って物事を進める力。ルールや手順を守り、ミスなく確実に業務を遂行する能力。' },
  { key: 'growth', label: '成長度', emoji: '📈', description: '新しいことへの挑戦意欲と学び続ける力。変化を恐れず、自分のスキルや視野を広げ続けるキャリア志向の強さ。' },
];

/** データセット一つ分 */
export interface RadarDataset {
  label: string;
  values: Partial<Record<StatKey, number>>;
  color: string;
  fillOpacity?: number;
}

interface SkillRadarChartProps {
  datasets: RadarDataset[];
  maxValue?: number;
  size?: number;
}

/** SVGレーダーチャート */
export function SkillRadarChart({
  datasets,
  maxValue = 20,
  size = 320,
}: SkillRadarChartProps) {
  const [hoveredAxis, setHoveredAxis] = useState<number | null>(null);
  const [tappedAxis, setTappedAxis] = useState<number | null>(null);

  const center = size / 2;
  const radius = size * 0.36;
  const axisCount = SKILL_AXES.length;
  const angleStep = (Math.PI * 2) / axisCount;
  // 上から始める（-90度）
  const startAngle = -Math.PI / 2;

  /** 軸の座標を計算 */
  const getPoint = (index: number, value: number) => {
    const angle = startAngle + angleStep * index;
    const r = (value / maxValue) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  /** グリッド線（同心多角形） */
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  const gridPolygons = gridLevels.map((level) => {
    const points = Array.from({ length: axisCount }, (_, i) => {
      const p = getPoint(i, maxValue * level);
      return `${p.x},${p.y}`;
    }).join(' ');
    return points;
  });

  /** データセットのポリゴン */
  const dataPolygons = datasets.map((ds) => {
    const points = SKILL_AXES.map((axis, i) => {
      const val = ds.values[axis.key] ?? 0;
      const p = getPoint(i, val);
      return `${p.x},${p.y}`;
    }).join(' ');
    return { ...ds, points };
  });

  /** ラベル位置 */
  const labelPositions = SKILL_AXES.map((axis, i) => {
    const p = getPoint(i, maxValue * 1.22);
    return { ...axis, x: p.x, y: p.y, index: i };
  });

  return (
    <div className="flex flex-col items-center" onClick={() => setTappedAxis(null)}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="max-w-full"
      >
        {/* グリッド */}
        {gridPolygons.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={i === gridPolygons.length - 1 ? 1.5 : 0.8}
          />
        ))}

        {/* 軸線 */}
        {SKILL_AXES.map((_, i) => {
          const p = getPoint(i, maxValue);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke={hoveredAxis === i ? '#6366f1' : '#d1d5db'}
              strokeWidth={hoveredAxis === i ? 1.5 : 0.8}
            />
          );
        })}

        {/* データポリゴン */}
        {dataPolygons.map((dp, i) => (
          <polygon
            key={i}
            points={dp.points}
            fill={dp.color}
            fillOpacity={dp.fillOpacity ?? 0.2}
            stroke={dp.color}
            strokeWidth={2}
            strokeLinejoin="round"
          />
        ))}

        {/* データポイント */}
        {datasets.map((ds, di) =>
          SKILL_AXES.map((axis, ai) => {
            const val = ds.values[axis.key] ?? 0;
            const p = getPoint(ai, val);
            return (
              <circle
                key={`${di}-${ai}`}
                cx={p.x}
                cy={p.y}
                r={hoveredAxis === ai ? 4 : 3}
                fill={ds.color}
                stroke="white"
                strokeWidth={1.5}
              />
            );
          }),
        )}

        {/* ラベル（タッチ領域付き） */}
        {labelPositions.map((lp) => {
          const isActive = hoveredAxis === lp.index || tappedAxis === lp.index;
          return (
            <g
              key={lp.index}
              onMouseEnter={() => setHoveredAxis(lp.index)}
              onMouseLeave={() => setHoveredAxis(null)}
              onClick={(e) => {
                e.stopPropagation();
                setTappedAxis(tappedAxis === lp.index ? null : lp.index);
              }}
              className="cursor-pointer"
            >
              <rect
                x={lp.x - 24}
                y={lp.y - 14}
                width={48}
                height={28}
                fill="transparent"
              />
              <text
                x={lp.x}
                y={lp.y - 2}
                textAnchor="middle"
                fontSize={11}
                className="select-none"
              >
                {lp.emoji}
              </text>
              <text
                x={lp.x}
                y={lp.y + 11}
                textAnchor="middle"
                fontSize={9}
                fill={isActive ? '#4f46e5' : '#6b7280'}
                fontWeight={isActive ? 700 : 500}
                className="select-none"
                textDecoration={isActive ? 'underline' : 'none'}
              >
                {lp.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* 凡例 */}
      {datasets.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {datasets.map((ds, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: ds.color }}
              />
              <span className="text-xs text-gray-600">{ds.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* タップしたスキルの展開説明 */}
      {tappedAxis !== null && (
        <div className="w-full mt-2 bg-indigo-50 rounded-xl p-3 animate-fade-in" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-base">{SKILL_AXES[tappedAxis].emoji}</span>
            <span className="text-xs font-bold text-gray-800">{SKILL_AXES[tappedAxis].label}</span>
            {/* 数値 */}
            <div className="ml-auto flex gap-2">
              {datasets.map((ds, i) => (
                <span key={i} className="text-xs font-bold" style={{ color: ds.color }}>
                  {ds.label} {ds.values[SKILL_AXES[tappedAxis].key] ?? 0}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {SKILL_AXES[tappedAxis].description}
          </p>
        </div>
      )}
    </div>
  );
}

/** キーワード → スキル軸のマッピング（tags / skillsGained / suitableFor 共通） */
const KEYWORD_SKILL_MAP: [RegExp, StatKey, number][] = [
  // satisfaction
  [/やりがい|充実|達成感|満足|楽しい|好き|夢中|情熱|誇り|感動|感謝|社会貢献|使命/i, 'satisfaction', 3],
  // income
  [/高収入|年収|報酬|稼|給与|給料|金融|投資|コンサル|経営|エリート|商社|外資|証券/i, 'income', 3],
  // communication
  [/営業|対人|コミュニケーション|接客|交渉|ヒアリング|プレゼン|説得|傾聴|相談|折衝|調整|人と関わ|話.*好き|リーダーシップ|チームワーク|ファシリテーション|グローバル|語学|英語/i, 'communication', 3],
  // planning
  [/企画|提案|戦略|プランニング|マネジメント|リーダー|管理|プロジェクト|事業|経営|ビジネス|マーケティング|ブランド|発想|アイデア|構想|起業|挑戦/i, 'planning', 3],
  // analysis
  [/分析|データ|論理|数字|数値|統計|リサーチ|調査|会計|ファイナンス|金融|計算|定量|仮説|コンサル|問題解決|課題解決|戦略的|批判的思考|ロジカル/i, 'analysis', 3],
  // creative
  [/クリエイティブ|デザイン|制作|映像|音楽|写真|表現|アート|広告|コピー|UI|UX|ゲーム|アニメ|イラスト|ビジュアル|感性|美的|ものづくり|SNS|動画|おしゃれ|ファッション|インテリア/i, 'creative', 3],
  // technical
  [/技術|開発|プログラミング|IT|AI|セキュリティ|設計|エンジニア|コード|システム|インフラ|サーバー|専門|理系|研究|実験|科学|テスト|品質|資格/i, 'technical', 3],
  // care
  [/ケア|福祉|医療|教育|保育|支援|介護|看護|リハビリ|カウンセリング|ボランティア|社会貢献|人助け|寄り添|サポート|指導|育成|面倒見|体力|スポーツ|健康|栄養|医師|歯科|薬剤|臨床|診療|患者|治療|障害|高齢|児童|相談員/i, 'care', 3],
  // stability
  [/安定|堅実|正確|几帳面|コツコツ|ルーティン|法律|法務|公務|規則|ルール|監査|検査|品質管理|事務|バックオフィス|書類|手続き|管理|責任感/i, 'stability', 3],
  // growth
  [/成長|挑戦|学び|向上|スキルアップ|好奇心|新しい|変化|グローバル|キャリア|目標|競争|ベンチャー|最先端|トレンド|自己研鑽|努力|積み上げ|適応|柔軟|進化|多様|異文化|未経験|若手|ポテンシャル/i, 'growth', 3],
];

/** 職業のtags + skillsGained + suitableFor からスキルプロファイルを算出 */
export function computeJobSkillProfile(
  tags: string[],
  skillsGained: string[],
  suitableFor: string[],
): Record<StatKey, number> {
  // ベースライン: どの職業でも最低限のスキルはある
  const profile: Record<StatKey, number> = {
    satisfaction: 2,
    income: 2,
    communication: 2,
    planning: 2,
    analysis: 2,
    creative: 2,
    technical: 2,
    care: 2,
    stability: 2,
    growth: 2,
  };

  // 全テキストをまとめてマッチング
  const allTexts = [...tags, ...skillsGained, ...suitableFor];
  const combined = allTexts.join(' ');

  for (const [pattern, key, points] of KEYWORD_SKILL_MAP) {
    // パターン内の複数キーワードそれぞれにマッチした回数でスコア加算
    const keywords = pattern.source.split('|');
    let matchCount = 0;
    for (const kw of keywords) {
      try {
        const re = new RegExp(kw, 'i');
        for (const text of allTexts) {
          if (re.test(text)) matchCount++;
        }
      } catch {
        if (combined.includes(kw)) matchCount++;
      }
    }
    if (matchCount > 0) {
      // ヒット数に応じてスコア加算（逓減あり）
      profile[key] += Math.min(points * matchCount, points * 4);
    }
  }

  // 0〜20 にスケーリング（最大値を18に、最小値を保持）
  const skillKeys: StatKey[] = ['satisfaction', 'income', 'communication', 'planning', 'analysis', 'creative', 'technical', 'care', 'stability', 'growth'];
  const maxRaw = Math.max(...skillKeys.map((k) => profile[k]));
  if (maxRaw > 0) {
    const scale = 18 / maxRaw;
    for (const k of skillKeys) {
      profile[k] = Math.max(2, Math.round(profile[k] * scale));
    }
  }

  return profile;
}

/** マッチ度計算（コサイン類似度） */
function calcMatchRate(
  playerStats: Record<StatKey, number>,
  jobProfile: Record<StatKey, number>,
): number {
  const keys: StatKey[] = ['satisfaction', 'income', 'communication', 'planning', 'analysis', 'creative', 'technical', 'care', 'stability', 'growth'];
  let dot = 0, pMag = 0, jMag = 0;
  for (const k of keys) {
    const pv = playerStats[k] ?? 0;
    const jv = jobProfile[k] ?? 0;
    dot += pv * jv;
    pMag += pv * pv;
    jMag += jv * jv;
  }
  const denom = Math.sqrt(pMag) * Math.sqrt(jMag);
  return denom > 0 ? Math.round((dot / denom) * 100) : 0;
}

/** ランキング済み職業の型 */
interface RankedJob {
  id: string;
  title: string;
  tags: string[];
  skillsGained: string[];
  suitableFor: string[];
  matchRate: number;
  profile: Record<StatKey, number>;
}

type JobInput = { id: string; title: string; tags: string[]; skillsGained: string[]; suitableFor: string[] };

/** スキルマップ付き比較セクション */
export function SkillMapSection({
  playerStats,
  discoveredJobs,
}: {
  playerStats: Record<StatKey, number>;
  discoveredJobs: JobInput[];
}) {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  // 全職業のプロファイル計算＆マッチ度ランキング
  const rankedJobs: RankedJob[] = useMemo(() => {
    return discoveredJobs
      .map((job) => {
        const profile = computeJobSkillProfile(job.tags, job.skillsGained, job.suitableFor);
        return {
          ...job,
          profile,
          matchRate: calcMatchRate(playerStats, profile),
        };
      })
      .sort((a, b) => b.matchRate - a.matchRate);
  }, [playerStats, discoveredJobs]);

  const selectedJob = rankedJobs.find((j) => j.id === selectedJobId) ?? null;

  const datasets: RadarDataset[] = useMemo(() => {
    const result: RadarDataset[] = [
      {
        label: 'あなた',
        values: playerStats,
        color: '#6366f1',
        fillOpacity: 0.25,
      },
    ];
    if (selectedJob) {
      result.push({
        label: selectedJob.title,
        values: selectedJob.profile,
        color: '#f59e0b',
        fillOpacity: 0.15,
      });
    }
    return result;
  }, [playerStats, selectedJob]);

  // 表示件数: デフォルトTOP10、展開で全件
  const INITIAL_COUNT = 10;
  const displayJobs = showAll ? rankedJobs : rankedJobs.slice(0, INITIAL_COUNT);
  const hasMore = rankedJobs.length > INITIAL_COUNT;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
      <h3 className="text-base font-bold text-gray-800 mb-1 flex items-center gap-2">
        🗺️ スキルマップ
      </h3>
      <p className="text-xs text-gray-400 mb-4">
        あなたのスキルバランスを可視化。ランキングの職業をタップすると重ねて比較できます。
      </p>

      {/* レーダーチャート */}
      <SkillRadarChart datasets={datasets} />

      {/* 選択中の職業表示 */}
      {selectedJob && (
        <div className="mt-3 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
            比較中: {selectedJob.title}
            <button
              onClick={() => setSelectedJobId(null)}
              className="ml-1 text-amber-400 hover:text-amber-600 cursor-pointer"
            >
              ✕
            </button>
          </span>
        </div>
      )}

      {/* マッチ度ランキング（全職業） */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-gray-600">
            📊 適性マッチ度ランキング（{rankedJobs.length}職種）
          </p>
        </div>
        <div className="space-y-1.5">
          {displayJobs.map((job, i) => {
            const rank = i + 1;
            const isSelected = selectedJobId === job.id;
            return (
              <button
                key={job.id}
                onClick={() => setSelectedJobId(isSelected ? null : job.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-50 ring-1 ring-amber-300'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                    <span className={`w-6 text-center font-bold ${
                      rank === 1 ? 'text-yellow-500' : rank === 2 ? 'text-gray-400' : rank === 3 ? 'text-amber-600' : 'text-gray-300'
                    }`}>
                      {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}`}
                    </span>
                    {job.title}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      job.matchRate >= 80
                        ? 'text-emerald-600'
                        : job.matchRate >= 60
                          ? 'text-amber-600'
                          : 'text-gray-500'
                    }`}
                  >
                    {job.matchRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isSelected
                        ? 'bg-amber-400'
                        : job.matchRate >= 80
                          ? 'bg-emerald-400'
                          : job.matchRate >= 60
                            ? 'bg-amber-400'
                            : 'bg-gray-300'
                    }`}
                    style={{ width: `${job.matchRate}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* もっと見るボタン */}
        {hasMore && (
          <button
            onClick={() => setShowAll((v) => !v)}
            className="w-full mt-3 py-2 text-xs font-medium text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"
          >
            {showAll ? '▲ 閉じる' : `▼ すべて表示（残り${rankedJobs.length - INITIAL_COUNT}件）`}
          </button>
        )}
      </div>
    </div>
  );
}
