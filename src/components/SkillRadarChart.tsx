import { useState, useMemo } from 'react';
import type { StatKey, ValueKey } from '../types';
import { statDefinitions, initialStats, valueDefinitions, tagStatMap, tagValueMap, initialValues } from '../data/stats';

// ============================================================
// 統合軸（スキル18 + 価値観5 = 23軸）
// ============================================================

type UnifiedKey = StatKey | ValueKey;

interface UnifiedAxis {
  key: UnifiedKey;
  label: string;
  emoji: string;
  description: string;
  category: 'skill' | 'value';
}

const UNIFIED_AXES: UnifiedAxis[] = [
  // スキル18軸
  ...statDefinitions.map((d) => ({
    key: d.key as UnifiedKey,
    label: d.label,
    emoji: d.emoji,
    description: d.description,
    category: 'skill' as const,
  })),
  // 価値観5軸
  ...valueDefinitions.map((d) => ({
    key: d.key as UnifiedKey,
    label: d.label,
    emoji: d.emoji,
    description: d.description,
    category: 'value' as const,
  })),
];

// ============================================================
// 統合レーダーチャート
// ============================================================

export interface RadarDataset {
  label: string;
  values: Partial<Record<UnifiedKey, number>>;
  color: string;
  fillOpacity?: number;
}

interface UnifiedRadarChartProps {
  datasets: RadarDataset[];
  maxValue?: number;
  size?: number;
  unit?: string;
}

export function UnifiedRadarChart({
  datasets,
  maxValue = 100,
  size = 340,
  unit = '',
}: UnifiedRadarChartProps) {
  const [hoveredAxis, setHoveredAxis] = useState<number | null>(null);
  const [tappedAxis, setTappedAxis] = useState<number | null>(null);

  const center = size / 2;
  const radius = size * 0.34;
  const axisCount = UNIFIED_AXES.length;
  const angleStep = (Math.PI * 2) / axisCount;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + angleStep * index;
    const r = (value / maxValue) * radius;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  };

  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const gridPolygons = gridLevels.map((level) =>
    Array.from({ length: axisCount }, (_, i) => {
      const p = getPoint(i, maxValue * level);
      return `${p.x},${p.y}`;
    }).join(' '),
  );

  const dataPolygons = datasets.map((ds) => {
    const points = UNIFIED_AXES.map((axis, i) => {
      const val = ds.values[axis.key] ?? 0;
      const p = getPoint(i, val);
      return `${p.x},${p.y}`;
    }).join(' ');
    return { ...ds, points };
  });

  const labelPositions = UNIFIED_AXES.map((axis, i) => {
    const p = getPoint(i, maxValue * 1.22);
    return { ...axis, x: p.x, y: p.y, index: i };
  });

  // 価値観軸の開始・終了インデックス
  const valueStartIdx = statDefinitions.length;

  return (
    <div className="flex flex-col items-center" onClick={() => setTappedAxis(null)}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="max-w-full">
        {/* グリッド */}
        {gridPolygons.map((points, i) => (
          <polygon key={i} points={points} fill="none" stroke="#e5e7eb" strokeWidth={i === gridPolygons.length - 1 ? 1.5 : 0.8} />
        ))}

        {/* 軸線 */}
        {UNIFIED_AXES.map((axis, i) => {
          const p = getPoint(i, maxValue);
          const isValue = axis.category === 'value';
          return (
            <line key={i} x1={center} y1={center} x2={p.x} y2={p.y}
              stroke={hoveredAxis === i ? (isValue ? '#f59e0b' : '#6366f1') : '#d1d5db'}
              strokeWidth={hoveredAxis === i ? 1.5 : 0.8}
              strokeDasharray={isValue ? '3 2' : undefined}
            />
          );
        })}

        {/* 価値観の境界マーカー（薄い背景扇形） */}
        {(() => {
          // 扇形を近似するパスで価値観エリアをハイライト
          const arcPoints = [];
          for (let i = valueStartIdx; i < axisCount; i++) {
            arcPoints.push(getPoint(i, maxValue));
          }
          const d = `M ${center} ${center} L ${arcPoints.map(p => `${p.x} ${p.y}`).join(' L ')} Z`;
          return <path d={d} fill="#fef3c7" fillOpacity={0.15} />;
        })()}

        {/* データポリゴン */}
        {dataPolygons.map((dp, i) => (
          <polygon key={i} points={dp.points} fill={dp.color} fillOpacity={dp.fillOpacity ?? 0.2}
            stroke={dp.color} strokeWidth={2} strokeLinejoin="round" />
        ))}

        {/* データポイント */}
        {datasets.map((ds, di) =>
          UNIFIED_AXES.map((axis, ai) => {
            const val = ds.values[axis.key] ?? 0;
            const p = getPoint(ai, val);
            return (
              <circle key={`${di}-${ai}`} cx={p.x} cy={p.y}
                r={hoveredAxis === ai ? 4 : 3} fill={ds.color} stroke="white" strokeWidth={1.5} />
            );
          }),
        )}

        {/* ラベル */}
        {labelPositions.map((lp) => {
          const isActive = hoveredAxis === lp.index || tappedAxis === lp.index;
          const isValue = lp.category === 'value';
          return (
            <g key={lp.index}
              onMouseEnter={() => setHoveredAxis(lp.index)}
              onMouseLeave={() => setHoveredAxis(null)}
              onClick={(e) => { e.stopPropagation(); setTappedAxis(tappedAxis === lp.index ? null : lp.index); }}
              className="cursor-pointer"
            >
              <rect x={lp.x - 24} y={lp.y - 14} width={48} height={28} fill="transparent" />
              <text x={lp.x} y={lp.y - 2} textAnchor="middle" fontSize={10} className="select-none">
                {lp.emoji}
              </text>
              <text x={lp.x} y={lp.y + 10} textAnchor="middle" fontSize={7}
                fill={isActive ? (isValue ? '#d97706' : '#4f46e5') : (isValue ? '#b45309' : '#6b7280')}
                fontWeight={isActive || isValue ? 700 : 500} className="select-none"
              >
                {lp.label.length > 5 ? lp.label.slice(0, 5) + '..' : lp.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* 凡例 */}
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        {datasets.map((ds, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ds.color }} />
            <span className="text-xs text-gray-600">{ds.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-amber-100 border border-amber-300" />
          <span className="text-xs text-gray-500">= 価値観エリア</span>
        </div>
      </div>

      {/* タップしたスキルの展開説明 */}
      {tappedAxis !== null && (
        <div className={`w-full mt-2 rounded-xl p-3 animate-fade-in ${
          UNIFIED_AXES[tappedAxis].category === 'value' ? 'bg-amber-50' : 'bg-indigo-50'
        }`} onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-base">{UNIFIED_AXES[tappedAxis].emoji}</span>
            <span className="text-xs font-bold text-gray-800">{UNIFIED_AXES[tappedAxis].label}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
              UNIFIED_AXES[tappedAxis].category === 'value'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-indigo-100 text-indigo-700'
            }`}>
              {UNIFIED_AXES[tappedAxis].category === 'value' ? '価値観' : 'スキル'}
            </span>
            <div className="ml-auto flex gap-2">
              {datasets.map((ds, i) => (
                <span key={i} className="text-xs font-bold" style={{ color: ds.color }}>
                  {ds.values[UNIFIED_AXES[tappedAxis].key] ?? 0}{unit}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {UNIFIED_AXES[tappedAxis].description}
          </p>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 職業プロファイル計算（スキル + 価値観 統合）
// ============================================================

/** テキストからスキルキーワードを検出するマップ */
const TEXT_SKILL_MAP: [RegExp, StatKey, number][] = [
  [/論理|ロジカル|分析|データ|数字|統計|調査|定量|仮説/i, 'logical_thinking', 8],
  [/問題解決|課題|技術|プログラミング|IT|エンジニア|システム|開発|専門|テスト|品質|資格|理系|実験/i, 'problem_solving', 8],
  [/批判|検証|根拠|客観|精査|多角的|見極|判断力/i, 'critical_thinking', 8],
  [/クリエイティブ|デザイン|制作|映像|アート|表現|感性|美的|ものづくり|ファッション|独自|個性|センス/i, 'creativity', 8],
  [/学び|学習|好奇心|適応|柔軟|新しい|成長|吸収|進化|最先端|スキルアップ|ワクワク|知的/i, 'learning_agility', 8],
  [/主体|自発|率先|挑戦|ベンチャー|起業|自ら|切り拓|開拓/i, 'initiative', 8],
  [/継続|粘り|コツコツ|努力|積み上げ|忍耐|地道|根気|諦め/i, 'grit', 8],
  [/自己管理|時間管理|規律|計画的|正確|几帳面|丁寧|ルール|管理|整理|効率/i, 'self_management', 8],
  [/安定|堅実|慎重|責任|メンタル|ストレス|プレッシャー|回復|忍耐|冷静/i, 'resilience', 8],
  [/自己理解|内省|やりがい|情熱|好き|夢中|達成感|感謝|使命|誇り|充実|楽しい/i, 'self_awareness', 8],
  [/営業|対人|コミュニケーション|接客|交渉|プレゼン|説得|話す|語学|英語|伝え/i, 'communication', 8],
  [/傾聴|相談|聞く|受け止め|寄り添|カウンセリング|気持ち|心/i, 'listening', 8],
  [/共感|ケア|福祉|医療|教育|支援|看護|介護|サポート|指導|育成|面倒見|人助け|役に立/i, 'empathy', 8],
  [/チーム|協力|協働|連携|仲間|一緒|みんな/i, 'teamwork', 8],
  [/リーダー|マネジメント|統率|導く|まとめ|引っ張|率い/i, 'leadership', 8],
  [/企画|提案|戦略|マーケティング|計画|プロジェクト|経営|アイデア|発想|構想/i, 'planning', 8],
  [/判断|決断|意思決定|金融|投資|コンサル|決め|見極/i, 'decision_making', 8],
  [/行動|実行|スピード|フットワーク|体力|スポーツ|実践|動く|走る|燃える/i, 'action', 8],
];

/** 職業のtags + skillsGained + suitableForから統合プロファイルを算出 */
export function computeJobProfile(
  tags: string[],
  skillsGained?: string[],
  suitableFor?: string[],
): Record<UnifiedKey, number> {
  const skillProfile: Record<StatKey, number> = { ...initialStats };

  // 1. タグからスキルを加算（メイン情報源）
  for (const tag of tags) {
    const mapped = tagStatMap[tag];
    if (!mapped) continue;
    mapped.forEach((skill, idx) => {
      const weight = idx === 0 ? 15 : idx === 1 ? 10 : 5;
      skillProfile[skill] += weight;
    });
  }

  // 2. skillsGained と suitableFor のテキストからキーワードマッチ（補助情報源）
  const allTexts = [...(skillsGained ?? []), ...(suitableFor ?? [])];
  if (allTexts.length > 0) {
    const combined = allTexts.join(' ');
    for (const [pattern, key, points] of TEXT_SKILL_MAP) {
      if (pattern.test(combined)) {
        skillProfile[key] += points;
      }
    }
  }

  // 3. 全職種共通で一定レベル必要なベーススキルを加算
  // （社会人としてどの仕事でも各スキルはある程度必要）
  const baseSkills: Record<StatKey, number> = {
    // 思考力
    logical_thinking: 4,
    problem_solving: 4,
    critical_thinking: 3,
    creativity: 3,
    learning_agility: 5,
    // 自己管理力
    initiative: 4,
    grit: 5,
    self_management: 6,
    resilience: 5,
    self_awareness: 4,
    // 対人能力
    communication: 7,
    listening: 4,
    empathy: 4,
    teamwork: 7,
    leadership: 3,
    // 実行力
    planning: 4,
    decision_making: 4,
    action: 5,
  };
  for (const [k, v] of Object.entries(baseSkills)) {
    skillProfile[k as StatKey] += v;
  }

  // 4. スケーリング: 最低30、最大95、なだらかな分布
  const skillKeys = Object.keys(skillProfile) as StatKey[];
  const maxSkill = Math.max(...skillKeys.map((k) => skillProfile[k]), 1);
  for (const k of skillKeys) {
    const ratio = skillProfile[k] / maxSkill;
    // ratio^0.55 で中間値を適度に持ち上げつつ、上位との差も保つ
    skillProfile[k] = Math.round(30 + Math.pow(ratio, 0.55) * 65); // 30〜95
  }

  // 価値観
  const valueProfile: Record<ValueKey, number> = { ...initialValues };
  for (const tag of tags) {
    const mapped = tagValueMap[tag];
    if (!mapped) continue;
    for (const [vk, vv] of Object.entries(mapped)) {
      valueProfile[vk as ValueKey] = Math.max(0, Math.min(100, valueProfile[vk as ValueKey] + vv));
    }
  }

  // 価値観の偏差を増幅（50中心から離れるほど強調し、レーダーチャートで差を可視化）
  const valueKeys = Object.keys(valueProfile) as ValueKey[];
  for (const vk of valueKeys) {
    const raw = valueProfile[vk];
    const deviation = raw - 50;
    // 偏差を2.5倍に増幅し、べき乗で大きな偏差をさらに強調
    const sign = deviation >= 0 ? 1 : -1;
    const amplified = sign * Math.pow(Math.abs(deviation) / 50, 0.75) * 45;
    valueProfile[vk] = Math.round(Math.max(5, Math.min(95, 50 + amplified)));
  }

  return { ...skillProfile, ...valueProfile } as Record<UnifiedKey, number>;
}

/** マッチ度計算（プレイヤーのプロファイルと職業プロファイルの形状一致度） */
function calcMatchRate(
  playerStats: Record<StatKey, number>,
  jobProfile: Record<UnifiedKey, number>,
): number {
  const playerMax = Math.max(...Object.values(playerStats), 1);
  const keys = Object.keys(initialStats) as StatKey[];

  // プレイヤーの各スキルを0-100に正規化
  const playerNorm: Record<StatKey, number> = { ...initialStats };
  for (const k of keys) {
    playerNorm[k] = Math.round(((playerStats[k] ?? 0) / playerMax) * 100);
  }

  // 職業プロファイルの重みに基づいた加重マッチ度
  // 各スキルについて「プレイヤーが職業要件をどれだけ満たしているか」を計算
  let weightedSum = 0;
  let totalWeight = 0;

  for (const k of keys) {
    const jobReq = jobProfile[k] ?? 30;
    const playerVal = playerNorm[k];
    // 職業が要求するレベルが高いほど重みを大きくする
    const weight = jobReq * jobReq; // 二乗で重要スキルを強調
    // カバー率: プレイヤーのスキルが要件をどの程度満たすか (0-1)
    const coverage = Math.min(playerVal / Math.max(jobReq, 1), 1.2);
    weightedSum += coverage * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) return 50;
  const rawRate = (weightedSum / totalWeight) * 100;
  // 20-95の範囲にスケーリング（全員0%や100%にならないように）
  return Math.max(20, Math.min(95, Math.round(rawRate * 0.8 + 10)));
}

// ============================================================
// SkillMapSection（統合マップ）
// ============================================================

interface RankedJob {
  id: string;
  title: string;
  tags: string[];
  skillsGained: string[];
  suitableFor: string[];
  matchRate: number;
  profile: Record<UnifiedKey, number>;
}

type JobInput = { id: string; title: string; tags: string[]; skillsGained: string[]; suitableFor: string[] };

export function SkillMapSection({
  playerStats,
  diagnosisValues,
  discoveredJobs,
}: {
  playerStats: Record<StatKey, number>;
  diagnosisValues?: Record<ValueKey, number>;
  discoveredJobs: JobInput[];
}) {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const rankedJobs: RankedJob[] = useMemo(() => {
    return discoveredJobs
      .map((job) => {
        const profile = computeJobProfile(job.tags, job.skillsGained, job.suitableFor);
        return {
          ...job,
          profile,
          matchRate: calcMatchRate(playerStats, profile),
        };
      })
      .sort((a, b) => b.matchRate - a.matchRate);
  }, [playerStats, discoveredJobs]);

  const selectedJob = rankedJobs.find((j) => j.id === selectedJobId) ?? null;

  // プレイヤーの統合プロファイルを構築
  const playerMax = useMemo(() => {
    const vals = statDefinitions.map((a) => playerStats[a.key] ?? 0);
    return Math.max(...vals, 1);
  }, [playerStats]);

  const playerValues = diagnosisValues ?? initialValues;

  const datasets: RadarDataset[] = useMemo(() => {
    // プレイヤーデータ: スキルはパーセンテージ化、価値観はそのまま(0-100)
    const playerUnified: Partial<Record<UnifiedKey, number>> = {};
    for (const def of statDefinitions) {
      playerUnified[def.key] = Math.round(((playerStats[def.key] ?? 0) / playerMax) * 100);
    }
    for (const def of valueDefinitions) {
      playerUnified[def.key] = playerValues[def.key] ?? 50;
    }

    const result: RadarDataset[] = [
      { label: 'あなた', values: playerUnified, color: '#6366f1', fillOpacity: 0.25 },
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
  }, [playerStats, playerMax, playerValues, selectedJob]);

  const INITIAL_COUNT = 10;
  const displayJobs = showAll ? rankedJobs : rankedJobs.slice(0, INITIAL_COUNT);
  const hasMore = rankedJobs.length > INITIAL_COUNT;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
      <h3 className="text-base font-bold text-gray-800 mb-1 flex items-center gap-2">
        🗺️ スキル＆価値観マップ
      </h3>
      <p className="text-xs text-gray-400 mb-3">
        スキル18項目＋価値観5項目の統合チャート。職業をタップで比較できます。
      </p>

      {/* 統合レーダーチャート */}
      <UnifiedRadarChart datasets={datasets} maxValue={100} unit="%" />

      {selectedJob && (
        <div className="mt-3 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
            比較中: {selectedJob.title}
            <button onClick={() => setSelectedJobId(null)} className="ml-1 text-amber-400 hover:text-amber-600 cursor-pointer">✕</button>
          </span>
        </div>
      )}

      {/* マッチ度ランキング */}
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
                  isSelected ? 'bg-amber-50 ring-1 ring-amber-300' : 'hover:bg-gray-50'
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
                  <span className={`text-xs font-bold ${
                    job.matchRate >= 80 ? 'text-emerald-600' : job.matchRate >= 60 ? 'text-amber-600' : 'text-gray-500'
                  }`}>
                    {job.matchRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isSelected ? 'bg-amber-400' : job.matchRate >= 80 ? 'bg-emerald-400' : job.matchRate >= 60 ? 'bg-amber-400' : 'bg-gray-300'
                    }`}
                    style={{ width: `${job.matchRate}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

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

// 後方互換: computeJobSkillProfile のエクスポート
export function computeJobSkillProfile(
  tags: string[],
  skillsGained: string[],
  suitableFor: string[],
): Record<StatKey, number> {
  const full = computeJobProfile(tags, skillsGained, suitableFor);
  const result: Record<StatKey, number> = { ...initialStats };
  for (const k of Object.keys(initialStats) as StatKey[]) {
    result[k] = full[k] ?? 0;
  }
  return result;
}
