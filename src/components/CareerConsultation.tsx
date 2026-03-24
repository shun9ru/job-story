import { useState, useCallback, useEffect } from 'react';
import type { StatKey, ValueKey, ChoiceHistoryItem } from '../types';
import { generateWithGemini } from '../lib/gemini';
import { consumeDailyQuota, getDailyRemaining, refundDailyQuota } from '../lib/ai-cache';

interface CareerConsultationProps {
  primaryStat: StatKey;
  secondaryStat: StatKey;
  stats: Record<StatKey, number>;
  values: Record<ValueKey, number>;
  recommendedJobs?: string[];
  choiceHistory?: ChoiceHistoryItem[];
}

interface ConsultationResult {
  sections: { heading: string; body: string }[];
}

const STAT_LABEL: Record<StatKey, string> = {
  logical_thinking: '論理的思考力',
  problem_solving: '問題解決力',
  critical_thinking: '批判的思考力',
  creativity: '創造力',
  learning_agility: '学習力',
  initiative: '主体性',
  grit: '継続力',
  self_management: '自己管理能力',
  resilience: 'レジリエンス',
  self_awareness: '自己理解',
  communication: 'コミュニケーション力',
  listening: '傾聴力',
  empathy: '共感力',
  teamwork: '協働力',
  leadership: 'リーダーシップ',
  planning: '計画力',
  decision_making: '意思決定力',
  action: '行動力',
};

const VALUE_LABEL: Record<ValueKey, string> = {
  income_orientation: '年収志向',
  stability_orientation: '安定志向',
  growth_orientation: '成長志向',
  work_life_balance: 'ワークライフバランス志向',
  social_contribution: '社会貢献志向',
};

const PLACEHOLDER_EXAMPLES = [
  'やりたいことが見つからず、企業選びの軸が定まりません',
  'IT業界に興味がありますが、自分に向いているか不安です',
  '面接で自分の強みをうまく伝えられません',
  '大手とベンチャー、どちらが自分に合うかわかりません',
  'ガクチカに書けるような経験がありません',
  '周りが内定をもらい始めて焦っています',
];

// ============================================================
// JSONパーサー（AI応答からJSONを安全に抽出）
// ============================================================

/** JSON文字列値の中にある生の改行を \\n にエスケープする */
function fixJsonNewlines(text: string): string {
  // シンプルなアプローチ: JSON文字列値内の改行を置換
  // "..." の中にある \n を \\n に変換
  return text.replace(/"(?:[^"\\]|\\.)*"/g, (match) => {
    return match.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
  });
}

/** AI応答テキストからJSONオブジェクトを安全に抽出する */
function extractJSON(raw: string): ConsultationResult | null {
  // 前処理: JSON文字列内のリテラル改行をエスケープ
  const fixed = fixJsonNewlines(raw);

  // 方法1: ネスト追跡
  const start = fixed.indexOf('{');
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < fixed.length; i++) {
    const ch = fixed[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\' && inString) { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === '{') depth++;
    if (ch === '}') { depth--; if (depth === 0) {
      try { return JSON.parse(fixed.slice(start, i + 1)); } catch { break; }
    }}
  }

  // 方法2: 不完全JSONの修復（応答が途中で切れた場合）
  const partial = fixed.slice(start).replace(/,\s*$/, '');
  const repairs = [partial + '"}]}', partial + '"}]}'  , partial + ']}', partial + '}'];
  for (const attempt of repairs) {
    try { return JSON.parse(attempt); } catch { /* next */ }
  }

  // 方法3: 貪欲マッチ（最終手段）
  const m = fixed.match(/\{[\s\S]*\}/);
  if (m) { try { return JSON.parse(m[0]); } catch { /* fall through */ } }

  return null;
}

// ============================================================
// スキルハイライトカード（ビジュアル要素）
// ============================================================

const SKILL_COLORS = [
  'from-indigo-400 to-blue-500',
  'from-purple-400 to-indigo-500',
  'from-pink-400 to-rose-500',
  'from-amber-400 to-orange-500',
  'from-emerald-400 to-teal-500',
];

const VALUE_EMOJI: Record<string, string> = {
  income_orientation: '💰',
  stability_orientation: '🛡️',
  growth_orientation: '🚀',
  work_life_balance: '⚖️',
  social_contribution: '🌍',
};

function SkillHighlightCard({ stats, values }: { stats: Record<StatKey, number>; values: Record<ValueKey, number> }) {
  const entries = Object.entries(stats) as [StatKey, number][];
  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const max = sorted[0][1] || 1;
  const top5 = sorted.slice(0, 5);

  const valEntries = (Object.entries(values) as [ValueKey, number][]).sort((a, b) => b[1] - a[1]);
  const topVal = valEntries[0];

  return (
    <div className="rounded-xl overflow-hidden border border-indigo-100 animate-slide-up">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-3">
        <p className="text-white text-xs font-bold flex items-center gap-1.5">📊 あなたのスキルプロフィール</p>
      </div>
      <div className="bg-white px-4 py-4">
        {/* TOP5 スキルバー */}
        <div className="space-y-2.5 mb-4">
          {top5.map(([key, value], i) => {
            const pct = Math.round((value / max) * 100);
            const label = STAT_LABEL[key];
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[11px] font-medium text-gray-700">{label}</span>
                  <span className="text-[10px] font-bold text-gray-500">{value}pt</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${SKILL_COLORS[i]} transition-all duration-700`}
                    style={{ width: `${pct}%`, animationDelay: `${i * 100}ms` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 価値観サマリー */}
        <div className="flex items-center gap-3 px-3 py-2 bg-amber-50 rounded-lg">
          <span className="text-lg">{VALUE_EMOJI[topVal[0]] ?? '🧭'}</span>
          <div>
            <p className="text-[10px] text-amber-600 font-bold">最も大切にしている価値観</p>
            <p className="text-xs text-amber-800 font-medium">{VALUE_LABEL[topVal[0]]}（{topVal[1]}/100）</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// リッチテキストレンダラー（Markdownライク記法をReactに変換）
// ============================================================

/** **太字** をパースしてインラインで返す */
function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(<strong key={key++} className="font-bold text-gray-800">{match[1]}</strong>);
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

/** bodyテキストを正規化してからパースする前処理 */
function normalizeBody(raw: string): string {
  let text = raw;

  // リテラル \n を実際の改行に変換（JSON二重エスケープ対策）
  text = text.replace(/\\n/g, '\n');

  // ①②③… → 1. 2. 3. …
  text = text.replace(/^[①②③④⑤⑥⑦⑧⑨⑩]\s*/gm, (m) => {
    const idx = '①②③④⑤⑥⑦⑧⑨⑩'.indexOf(m.trim().charAt(0));
    return `${idx + 1}. `;
  });

  // 全角・半角の箇条書き記号を統一 → 「• 」
  text = text.replace(/^[・\-−ー]\s*/gm, '• ');
  text = text.replace(/^- /gm, '• ');

  // ## → ### に統一
  text = text.replace(/^##\s/gm, '### ');

  // 「**見出し**」だけの行 → ### 見出し に変換（AIがサブ見出しをboldで代用するケース）
  text = text.replace(/^\*\*([^*]+)\*\*$/gm, '### $1');

  // 長すぎる段落を句点で自動分割
  text = text.replace(/^(?!###|>|•|\d+\.|---).{200,}$/gm, (paragraph) => {
    const sentences = paragraph.split(/(?<=。)/);
    if (sentences.length <= 2) return paragraph;
    const chunks: string[] = [];
    let current = '';
    for (const s of sentences) {
      current += s;
      if (current.length > 80) {
        chunks.push(current.trim());
        current = '';
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks.join('\n\n');
  });

  return text;
}

/** body文字列をリッチなUIに変換するコンポーネント */
function RichBody({ text }: { text: string }) {
  const normalized = normalizeBody(text);
  const lines = normalized.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let keyCounter = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    // 空行 → スペーサー
    if (!trimmed) { i++; continue; }

    // --- → 区切り線
    if (/^-{3,}$/.test(trimmed)) {
      elements.push(<hr key={keyCounter++} className="border-gray-100 my-3" />);
      i++; continue;
    }

    // > 引用（コールアウト）→ 連続行をまとめる
    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <div key={keyCounter++} className="flex gap-2 my-2 px-3 py-2.5 bg-amber-50 border-l-3 border-amber-300 rounded-r-lg">
          <span className="text-amber-500 text-sm shrink-0">💡</span>
          <p className="text-xs text-amber-800 leading-relaxed">{renderInline(quoteLines.join('\n'))}</p>
        </div>
      );
      continue;
    }

    // ### サブ見出し（## や #### も許容）
    if (/^#{2,4}\s/.test(trimmed)) {
      const heading = trimmed.replace(/^#{2,4}\s+/, '');
      elements.push(
        <p key={keyCounter++} className="text-xs font-bold text-indigo-700 mt-3 mb-1 flex items-center gap-1.5">
          <span className="w-1 h-3.5 bg-indigo-400 rounded-full inline-block" />
          {renderInline(heading)}
        </p>
      );
      i++; continue;
    }

    // 番号付きリスト（1. 2. 3. / 1) 2) 3) ...） → 連続行をまとめる
    if (/^\d+[\.\)]\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+[\.\)]\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+[\.\)]\s*/, ''));
        i++;
      }
      elements.push(
        <ol key={keyCounter++} className="my-2 space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2.5 items-start">
              <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-bold flex items-center justify-center mt-0.5">
                {idx + 1}
              </span>
              <span className="text-xs text-gray-600 leading-relaxed flex-1">{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 箇条書き（• ✅ ✓ ◉ ● ▸ ► ☑）→ 連続行をまとめる
    if (/^[•✅✓☑◉●▸►]\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[•✅✓☑◉●▸►]\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[•✅✓☑◉●▸►]\s*/, ''));
        i++;
      }
      elements.push(
        <ul key={keyCounter++} className="my-2 space-y-1.5">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2 items-start text-xs text-gray-600 leading-relaxed">
              <span className="text-indigo-400 mt-0.5 shrink-0">▸</span>
              <span className="flex-1">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 通常テキスト → 連続行を段落にまとめる
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('> ') &&
      !/^#{2,4}\s/.test(lines[i].trim()) &&
      !/^-{3,}$/.test(lines[i].trim()) &&
      !/^\d+[\.\)]\s/.test(lines[i].trim()) &&
      !/^[•✅✓☑◉●▸►]\s/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length > 0) {
      elements.push(
        <p key={keyCounter++} className="text-xs text-gray-600 leading-relaxed mb-2">
          {renderInline(paraLines.join('\n'))}
        </p>
      );
    }
  }

  return <div>{elements}</div>;
}

/** 就活悩み相談セクション */
export function CareerConsultation({
  primaryStat,
  secondaryStat,
  stats,
  values,
  recommendedJobs = [],
  choiceHistory = [],
}: CareerConsultationProps) {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<ConsultationResult | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'rate-limited'>('idle');
  const [isAIGenerated, setIsAIGenerated] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [cooldown, setCooldown] = useState(false);

  const placeholder = PLACEHOLDER_EXAMPLES[Math.floor(Date.now() / 60000) % PLACEHOLDER_EXAMPLES.length];

  const generate = useCallback(async () => {
    if (cooldown || !concern.trim()) return;
    if (!consumeDailyQuota()) {
      setStatus('rate-limited');
      return;
    }
    setStatus('loading');
    setResult(null);
    setOpenIndex(null);
    setCooldown(true);
    setTimeout(() => setCooldown(false), 10_000);

    const statEntries = Object.entries(stats) as [StatKey, number][];
    const sorted = [...statEntries].sort((a, b) => b[1] - a[1]);
    const valuesText = (Object.entries(values) as [ValueKey, number][])
      .map(([k, v]) => `${VALUE_LABEL[k]}:${v}/100`)
      .join(', ');

    // 全18スキルをカテゴリ別に整理
    const categories: Record<string, [StatKey, number][]> = {
      '思考力': [], '自己管理力': [], '対人能力': [], '実行力': [],
    };
    const catMap: Record<string, string> = {
      logical_thinking: '思考力', problem_solving: '思考力', critical_thinking: '思考力',
      creativity: '思考力', learning_agility: '思考力',
      initiative: '自己管理力', grit: '自己管理力', self_management: '自己管理力',
      resilience: '自己管理力', self_awareness: '自己管理力',
      communication: '対人能力', listening: '対人能力', empathy: '対人能力',
      teamwork: '対人能力', leadership: '対人能力',
      planning: '実行力', decision_making: '実行力', action: '実行力',
    };
    for (const [k, v] of statEntries) {
      const cat = catMap[k];
      if (cat) categories[cat].push([k, v]);
    }
    const avg = sorted.reduce((s, [, v]) => s + v, 0) / sorted.length;

    // 各スキルに高い/平均的/低いの判定を付けてAIに渡す
    const allStatsText = Object.entries(categories).map(([cat, items]) => {
      const itemsText = items
        .sort((a, b) => b[1] - a[1])
        .map(([k, v]) => {
          const level = v >= avg * 1.3 ? '★高い' : v >= avg * 0.7 ? '普通' : '▼低い';
          return `${STAT_LABEL[k]}=${v}pt(${level})`;
        })
        .join(', ');
      return `[${cat}] ${itemsText}`;
    }).join('\n');

    // 上位・下位を明示
    const top3 = sorted.slice(0, 3);
    const bottom3 = sorted.slice(-3);
    const hidden = sorted.filter(([, v], i) => i >= 3 && v >= avg * 1.2).slice(0, 3);
    const strongSkills = sorted.filter(([, v]) => v >= avg * 1.3).map(([k, v]) => `${STAT_LABEL[k]}(${v}pt)`);
    const weakSkills = sorted.filter(([, v]) => v < avg * 0.7).map(([k, v]) => `${STAT_LABEL[k]}(${v}pt)`);
    const profileSummary = [
      `平均: ${avg.toFixed(0)}pt`,
      `★この人の強み（平均より明確に高い）: ${strongSkills.length > 0 ? strongSkills.join('・') : 'なし（均等型）'}`,
      `▼この人の弱み（平均より明確に低い）: ${weakSkills.length > 0 ? weakSkills.join('・') : 'なし（均等型）'}`,
      hidden.length > 0 ? `隠れた強み: ${hidden.map(([k, v]) => `${STAT_LABEL[k]}(${v}pt)`).join('・')}` : '',
    ].filter(Boolean).join('\n');

    // スキルと職種の対応情報を構築
    const top5 = sorted.slice(0, 5);
    const skillJobMap = top5.map(([k, v]) => `${STAT_LABEL[k]}(${v}pt) → ${getMatchingJobs(k)}`).join('\n');

    // 価値観から合う企業タイプを導出
    const valSorted = ([...Object.entries(values)] as [ValueKey, number][]).sort((a, b) => b[1] - a[1]);
    const topValKey = valSorted[0][0];
    const valContext = getValueContext(topValKey, valSorted[0][1]);

    const prompt = `あなたは就活生の隣に座っている先輩です。答えを教えるのではなく、一緒に考え、一緒に悩み、寄り添ってください。

【この人の相談】
「${concern.trim()}」

この相談内容をよく読んで、この人が本当に聞きたいこと・不安に思っていることに集中して答えてください。
相談内容と関係ない話題は絶対に書かないでください。

【この人のスキルデータ】
${allStatsText}
${profileSummary}
価値観: ${valuesText}
適性TOP5: ${recommendedJobs.join(' / ') || '未算出'}
${choiceHistory.length > 0 ? `
【この人が診断・ストーリーで選んだ選択肢の履歴】
この履歴から、この人の性格・考え方・行動パターンを読み取って回答に活かすこと。
数値だけでなく「なぜその数値になったか」の背景がわかるデータです。
${choiceHistory.map((h, i) => `${i + 1}. Q:「${h.question}」→ A:「${h.chosen}」`).join('\n')}
` : ''}
【データの使い方ルール】
- 「★高い」のスキルだけをこの人の強みとして語ること
- 「▼低い」のスキルを強みとして勧めたりアピールさせようとしないこと
- スキル名とポイント数をそのまま羅列しないこと。「コミュニケーション力が75ptで、計画力が79ptで…」のような読み上げは禁止
- 代わりに、そのスキルが日常生活や仕事で「具体的にどういう行動として現れるか」に翻訳して語ること
  × 「あなたの計画力は79ptと高いです」
  ○ 「あなたって、旅行の計画とか文化祭の準備とか、段取りを組むのが自然にできるタイプじゃない？それが計画力79ptに表れてるんだよ」
  × 「コミュニケーション力が75ptあります」
  ○ 「初対面の人とでもわりとすぐ打ち解けられたり、グループワークで自然と話をまとめちゃったりしない？」
- 選択履歴がある場合は、「あなたが○○の場面で『△△』を選んだよね。あれってまさに〜」のように、実際の選択を引用して語ると説得力が増す

【話し方】
友達や信頼できる先輩のように話す。
• 共感: 「それ、めちゃくちゃわかるよ」「そう感じるの、全然おかしくないからね」
• 一緒に考える: 「ちょっと一緒に整理してみようか」「こう考えてみるとどうかな」
• 励まし: 「焦らなくて大丈夫だよ」「完璧じゃなくていいからね」
• スキル言及: ステータス名を出すときは必ず具体的な行動例とセットにする

【回答の深さ — ここが一番大事】
共感や分析だけで終わらないこと。必ず「じゃあどうすればいいか」の解決策の案を複数出し、それぞれ「なぜこの案があなたに合うのか」をスキルデータや選択履歴を根拠に説明すること。
例: 「案1: ○○してみるのはどうかな。なぜかっていうと、あなたは△△力がXptあるから〜」「案2: □□という方法もあるよ。あなたの選択履歴を見ると〜な傾向があるから、こっちの方が合うかも」
答えを押し付けるのではなく「こういう選択肢があるよ、あなたのデータを見るとこれが合いそうだよ、でも最後に決めるのはあなただよ」というスタンスで。

【構成は相談内容に合わせて自由に決めてよい】
セクション数は3〜7個。相談内容に最適な見出しと流れを自分で考えること。
各セクション500文字以上。たっぷり語ること。1行で終わる説明は禁止。

body書式: 段落間は\\n\\nで区切る。「### 」サブ見出し、「• 」箇条書き、「1. 」番号リスト、**太字**、「> 」重要ポイント を使って構造化する。

JSON形式で出力(JSON以外は出力しないで):
{"sections":[{"heading":"見出し","body":"回答"}, ...]}`;


    try {
      const raw = await generateWithGemini(prompt);
      console.log('[CareerConsultation] AI raw response length:', raw.length);
      console.log('[CareerConsultation] AI raw response (first 500 chars):', raw.slice(0, 500));
      const parsed = extractJSON(raw);
      console.log('[CareerConsultation] Parsed result:', parsed ? `${parsed.sections?.length ?? 0} sections` : 'null');
      if (!parsed?.sections?.length) {
        console.warn('[CareerConsultation] Full raw response:', raw);
        throw new Error('不正な形式');
      }
      setResult(parsed);
      setIsAIGenerated(true);
      setStatus('done');
    } catch (e) {
      console.warn('キャリア相談AI生成失敗:', e);
      refundDailyQuota();
      const errMsg = e instanceof Error ? e.message : '不明なエラー';
      setResult({
        sections: [{ heading: '⚠️ AI回答の生成に失敗しました', body: `エラー内容: **${errMsg}**\n\n時間を置いてからもう一度お試しください。APIのレート制限に引っかかっている場合は、1分ほど待つと回復します。` }],
      });
      setIsAIGenerated(false);
      setStatus('done');
    }
  }, [concern, cooldown, primaryStat, secondaryStat, stats, values, recommendedJobs]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
      <h3 className="text-base font-bold text-gray-800 flex items-center gap-2 mb-1">
        💭 就活なんでも相談
      </h3>
      <p className="text-xs text-gray-400 mb-4">
        あなたの診断結果をもとに、AIがパーソナライズされたアドバイスをします
      </p>

      {/* よくある質問テンプレート */}
      {!concern && status !== 'loading' && status !== 'done' && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {[
            '自分にどんな業種・職種が向いているかわからない',
            '面接で自分の強みをうまく伝えられない',
            '大手とベンチャー、どちらが自分に合う？',
            'ガクチカに書けるような経験がない',
            '周りが内定をもらい始めて焦っている',
          ].map((q) => (
            <button
              key={q}
              onClick={() => setConcern(q)}
              className="text-[11px] px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors cursor-pointer border border-indigo-100"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* 入力エリア */}
      <div className="space-y-3">
        <textarea
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          placeholder={placeholder}
          maxLength={500}
          rows={3}
          className="w-full px-4 py-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent placeholder:text-gray-300 transition-all"
        />
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-300">{concern.length}/500</span>
          <button
            onClick={generate}
            disabled={!concern.trim() || status === 'loading' || cooldown}
            className="px-5 py-2 text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-all cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                考え中...
              </span>
            ) : '相談する'}
          </button>
        </div>
      </div>

      {/* レート制限 */}
      {status === 'rate-limited' && (
        <div className="text-center py-4 mt-3">
          <p className="text-2xl mb-2">⏳</p>
          <p className="text-xs text-gray-500">
            本日のAI生成回数の上限に達しました。<br />
            明日またお試しください。
          </p>
        </div>
      )}

      {/* ローディング */}
      {status === 'loading' && (
        <LoadingTips />
      )}

      {/* 結果表示 */}
      {result && status === 'done' && (
        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-end mb-1">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${isAIGenerated ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
              {isAIGenerated ? '🤖 AI generated' : '⚠️ エラー'}
            </span>
          </div>

          {/* スキルハイライトカード（自動挿入） */}
          <SkillHighlightCard stats={stats} values={values} />

          {result.sections.map((section, i) => (
            <div key={i}>
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 overflow-hidden animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="px-4 py-3 bg-gradient-to-r from-indigo-50/80 to-purple-50/60 border-b border-indigo-100/50">
                  <h4 className="text-sm font-bold text-gray-800">{section.heading}</h4>
                </div>
                <div className="px-4 py-4">
                  <RichBody text={section.body} />
                </div>
              </div>
              {/* セクション間の区切りイラスト */}
              {i < result.sections.length - 1 && (
                <div className="flex items-center justify-center py-2">
                  <div className="flex items-center gap-2 text-gray-200">
                    <div className="w-8 h-px bg-gray-200" />
                    <span className="text-sm">{['💭', '✨', '🌱', '🔍', '💡', '🎯'][i % 6]}</span>
                    <div className="w-8 h-px bg-gray-200" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* 別の悩みで再相談 */}
          <button
            onClick={() => {
              setResult(null);
              setStatus('idle');
              setConcern('');
              setOpenIndex(null);
            }}
            className="w-full mt-3 py-2 text-xs font-medium text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all cursor-pointer"
          >
            別の悩みを相談する（残り{getDailyRemaining()}回）
          </button>
        </div>
      )}
    </div>
  );
}

/** AI失敗時のローカルフォールバック */
function generateLocalAdvice(
  concern: string,
  primaryStat: StatKey,
  secondaryStat: StatKey,
  stats: Record<StatKey, number>,
  values: Record<ValueKey, number>,
  recommendedJobs: string[] = [],
): ConsultationResult {
  const statEntries = Object.entries(stats) as [StatKey, number][];
  const sorted = [...statEntries].sort((a, b) => b[1] - a[1]);
  const top1 = sorted[0][0];
  const top2 = sorted[1][0];

  const valEntries = Object.entries(values) as [ValueKey, number][];
  const topVal = [...valEntries].sort((a, b) => b[1] - a[1])[0][0];

  // 悩みのキーワードに応じたアドバイス分岐
  const lc = concern.toLowerCase();

  let essenceBody: string;
  let solutionBody: string;
  let stepsBody: string;
  let hintBody: string;

  if (lc.includes('やりたいこと') || lc.includes('見つから') || lc.includes('わからない') || lc.includes('軸') || lc.includes('業種') || lc.includes('業界') || lc.includes('職種') || lc.includes('向いて') || lc.includes('イメージ') || lc.includes('どんな仕事')) {
    const recJobList = recommendedJobs.length > 0
      ? recommendedJobs.map((j, i) => `${i + 1}. ${j}`).join('\n')
      : `1. ${getMatchingJobs(top1).split('、').slice(0, 3).join('\n2. ')}`;
    essenceBody = `あなたの診断結果（スキル＋価値観）を総合的に分析した結果、**最も向いている職種**はこちらです：\n\n${recJobList}\n\n> これはあなたの**${STAT_LABEL[top1]}**（${stats[top1]}pt）・**${STAT_LABEL[top2]}**（${stats[top2]}pt）の高さと、**${VALUE_LABEL[topVal]}**（${values[topVal]}pt）の価値観を掛け合わせて算出しています。`;
    solutionBody = `### なぜこれらの職種が向いているか\n\nあなたの**${STAT_LABEL[top1]}**の高さは、${getStrengthContext(primaryStat)}ということ。${recommendedJobs[0] ? `例えば**${recommendedJobs[0]}**では、この力が日常的に求められます。` : ''}\n\n### 価値観との一致\n\n**${VALUE_LABEL[topVal]}**が高い（${values[topVal]}pt）あなたには、${getValueContext(topVal, values[topVal])}\n\n> つまり、上記のランキングはあなたの「得意なこと」×「大切にしたい価値観」の両方を満たせる職種です。`;
    stepsBody = `1. **今日中に：** 上のランキングから「少しでも気になる」ものを2〜3個選ぶ（直感でOK）\n2. **今週中に：** 選んだ職種について、実際の仕事内容をネットで調べる。特に「1日のスケジュール」「やりがい」「大変なこと」を確認\n3. **来週中に：** 最も気になった職種に就いている人にOB/OG訪問を申し込む。「${STAT_LABEL[top1]}が活きる場面はありますか？」と聞いてみる`;
    hintBody = `上のランキング以外にも、あなたの組み合わせから関連する分野があります。\n\n### スキル×価値観の掛け合わせ\n\n• **${STAT_LABEL[primaryStat]}** × **${STAT_LABEL[secondaryStat]}** × **${VALUE_LABEL[topVal]}**\n• 関連分野：**${getCareerHint(primaryStat, topVal, stats)}**\n\n> まだピンとこなくても大丈夫。大事なのは「頭で考える」より「実際に話を聞きに行く」こと。説明会やインターンで実際の仕事に触れると、「これかも」という感覚が必ず見つかります。`;
  } else if (lc.includes('面接') || lc.includes('伝え') || lc.includes('アピール') || lc.includes('自己pr')) {
    essenceBody = `面接でうまく伝えられないのは、あなたの能力が低いからではありません。自分の強みを**「言語化」する練習**が足りていないだけです。\n\n> あなたの**${STAT_LABEL[primaryStat]}**は高い水準にあり、これは面接で非常に評価されるスキルです。`;
    solutionBody = `### STAR法でエピソードを構成しよう\n\nあなたの**${STAT_LABEL[primaryStat]}**を面接でアピールするなら、**STAR法**でエピソードを構成してください。\n\n• **S（状況）：** どんな場面だったか\n• **T（課題）：** 何が問題だったか\n• **A（行動）：** あなたが何をしたか ← **ここで${STAT_LABEL[primaryStat]}を語る**\n• **R（結果）：** どんな成果が出たか\n\n> 特に「行動」の部分で**${STAT_LABEL[primaryStat]}**がどう発揮されたかを具体的に語ると説得力が出ます。`;
    stepsBody = `1. **今日中に：** ${STAT_LABEL[primaryStat]}が発揮されたエピソードを1つ選び、STAR法で書き出す\n2. **3日以内に：** 友達や家族の前で1分間で語る練習をする（録音して聞き返すとさらに効果的）\n3. **1週間以内に：** 大学のキャリアセンターで模擬面接を予約する`;
    hintBody = `### あなたのスキルが活きる業界\n\n**${STAT_LABEL[primaryStat]}** × **${STAT_LABEL[secondaryStat]}**の組み合わせは、特に以下で高く評価されます。\n\n• **${getIndustryHint(primaryStat, secondaryStat)}**\n\n> 面接では「この2つの力をどう仕事に活かすか」を語れると、他の志望者と差がつきます。`;
  } else if (lc.includes('大手') || lc.includes('ベンチャー') || lc.includes('企業選び') || lc.includes('迷')) {
    essenceBody = `企業選びで迷うのは、自分の中に明確な**「判断基準」**がまだないから。\n\nあなたの価値観を見ると**${VALUE_LABEL[topVal]}**が高いので、これを企業選びの第一軸にしましょう。\n\n> 大手かベンチャーかという二択ではなく、「自分の価値観に合うか」で選ぶことが大切です。`;
    solutionBody = `### 価値観ベースの企業選び\n\nあなたの**${VALUE_LABEL[topVal]}**の高さを活かすなら、企業のサイズよりも**「その企業で${VALUE_LABEL[topVal]}が実現できるか」**で判断してください。\n\n### OB/OG訪問で聞くべき質問\n\n• 「${VALUE_LABEL[topVal]}の実態はどうですか？」\n• 「入社前と入社後のギャップはありましたか？」\n• 「同期で辞めた人の理由は？」`;
    stepsBody = `1. **今週中に：** 「自分にとって絶対に譲れない条件」と「あれば嬉しい条件」を分けてリストアップ\n2. **来週中に：** 気になる企業3社について、その条件に照らし合わせて◎○△で評価してみる\n3. **再来週中に：** 評価が高かった企業のOB/OGに話を聞き、イメージとのギャップを確認する`;
    hintBody = `### あなたに合う企業タイプ\n\nあなたの**${STAT_LABEL[primaryStat]}**と**${VALUE_LABEL[topVal]}**を考えると：\n\n> ${getCompanySizeHint(primaryStat, topVal)}が合いやすいです。\n\nただし一般論なので、最終的にはOB/OG訪問で**「実際の働き方」**を確認して判断してください。`;
  } else {
    // 汎用アドバイス
    essenceBody = `あなたが感じている不安は、就活を真剣に考えているからこそ生まれるもの。**それ自体が前向きな姿勢の証拠**です。\n\n### あなたの明確な強み\n\n• **${STAT_LABEL[top1]}**（${stats[top1]}pt）\n• **${STAT_LABEL[top2]}**（${stats[top2]}pt）\n\n> この強みを軸に考えると、道は必ず見えてきます。`;
    solutionBody = `### 強みをエピソードに紐づけよう\n\nあなたの**${STAT_LABEL[primaryStat]}**を最大限活かすために、まずは自分の強みを**「具体的なエピソード」**と紐づけてください。\n\n**${STAT_LABEL[primaryStat]}**が発揮された場面を3つ思い出し、それぞれ書き出しましょう：\n\n• 何が起きたか？\n• どう行動したか？\n• どんな結果になったか？\n\n> これがES・面接のベースになります。`;
    stepsBody = `1. **今日中に：** この診断結果のスクリーンショットを保存し、自分の強みを改めて確認する\n2. **今週中に：** 強みが発揮されたエピソードを3つ書き出す（バイト、部活、授業、日常なんでもOK）\n3. **来週中に：** 信頼できる友人や先輩にエピソードを聞いてもらい、フィードバックをもらう`;
    hintBody = `### あなたに向いている可能性がある分野\n\n**${STAT_LABEL[primaryStat]}** × **${VALUE_LABEL[topVal]}**の組み合わせから：\n\n• **${getCareerHint(primaryStat, topVal, stats)}**\n\n> まずは幅広く情報収集してみてください。`;
  }

  return {
    sections: [
      { heading: '💬 あなたの悩みの本質', body: essenceBody },
      { heading: '🎯 あなたの強みを活かした解決策', body: solutionBody },
      { heading: '📋 今日からできる3つのステップ', body: stepsBody },
      { heading: '💡 あなたに合ったキャリアのヒント', body: hintBody },
    ],
  };
}

function getMatchingJobs(stat: StatKey): string {
  const map: Record<StatKey, string> = {
    logical_thinking: 'データアナリスト、ITコンサルタント、経営企画、マーケティングリサーチャー、SE、品質管理、研究開発',
    problem_solving: 'システムエンジニア、Webエンジニア、コンサルタント、研究職、インフラエンジニア、プロダクトマネージャー',
    critical_thinking: 'コンサルタント、ジャーナリスト、法務、監査法人、リスクマネジメント、編集者、政策立案',
    creativity: 'デザイナー(UI/UX/グラフィック)、広告クリエイター、企画職、ゲームデザイナー、映像クリエイター、コピーライター',
    learning_agility: 'ITエンジニア(技術変化に強い)、コンサルタント、研究職、新規事業開発、スタートアップ全般',
    initiative: 'ベンチャー企業全般、新規事業開発、起業、営業(開拓型)、イベントプロデューサー、プロジェクトリーダー',
    grit: '研究開発、職人系専門職、長期プロジェクト系(建設・インフラ)、士業(弁護士・会計士)、医療従事者',
    self_management: 'プロジェクトマネージャー、経理・財務、品質管理、リモートワーク系職種、フリーランス',
    resilience: 'インフラ企業、公務員、金融(メガバンク・保険)、医療従事者、社会福祉士、危機管理',
    self_awareness: 'キャリアカウンセラー、人事(採用・育成)、コーチング、心理職、マネジメント',
    communication: '営業全般、広報・PR、人材業界、接客・サービス業、教育、マーケティング、コンサルタント',
    listening: 'カウンセラー、人事、カスタマーサクセス、医療従事者、介護福祉、コンサルタント(ヒアリング重視)',
    empathy: '看護師、社会福祉士、教育、カウンセラー、UXリサーチャー、カスタマーサクセス、NPO',
    teamwork: 'プロジェクトマネジメント、チームリーダー、企画職、教育、スポーツ関連、イベント運営',
    leadership: '経営幹部候補、マネジメント職、営業マネージャー、プロジェクトリーダー、起業、教育管理職',
    planning: '企画職(商品・事業・イベント)、プロジェクトマネージャー、広告プランナー、経営企画、プロデューサー',
    decision_making: '経営企画、投資銀行、トレーダー、コンサルタント、起業家、プロダクトマネージャー',
    action: '営業(新規開拓)、スタートアップ、イベントプロデューサー、ディレクター、フィールドエンジニア',
  };
  return map[stat];
}

function getValueContext(val: ValueKey, score: number): string {
  const contexts: Record<ValueKey, string> = {
    income_orientation: `年収志向が${score}ptと高め → 成果報酬型の企業、外資系、金融、コンサル、不動産、IT(実力主義)が合いやすい。年収だけでなく「市場価値を高められる環境」を選ぶと長期的な年収UPにつながる`,
    stability_orientation: `安定志向が${score}ptと高め → 大手メーカー、インフラ(電力・ガス・鉄道)、公務員、メガバンク、大手保険が合いやすい。「安定×成長」の両立を意識すると後悔しにくい`,
    growth_orientation: `成長志向が${score}ptと高め → ベンチャー、コンサル、IT企業、外資系、スタートアップが合いやすい。研修制度だけでなく「実践で学べる機会の多さ」をチェックすべき`,
    work_life_balance: `WLB志向が${score}ptと高め → ホワイト企業、リモートワーク推奨企業、地方自治体、メーカー(非ブラック)が合いやすい。「残業時間」より「生産性の高い働き方ができるか」で選ぶべき`,
    social_contribution: `社会貢献志向が${score}ptと高め → NPO/NGO、教育系、医療・福祉、CSR部門、社会起業家、環境コンサルが合いやすい。大企業のCSR部門やSDGs関連事業も選択肢に入る`,
  };
  return contexts[val];
}

function getStrengthContext(stat: StatKey): string {
  const map: Partial<Record<StatKey, string>> = {
    logical_thinking: '物事を筋道立てて考えられる',
    problem_solving: '課題を発見し解決まで導ける',
    creativity: '独自の視点やアイデアを生み出せる',
    communication: '人との関係構築が上手い',
    empathy: '人の気持ちに寄り添える',
    planning: 'ゴールまでの道筋を設計できる',
    initiative: '自ら率先して動ける',
    leadership: '人を巻き込み導ける',
    action: '素早く行動に移せる',
  };
  return map[stat] ?? `${STAT_LABEL[stat]}の力がある`;
}

function getCareerHint(stat: StatKey, val: ValueKey, stats?: Record<StatKey, number>): string {
  // 全スキルが渡されている場合、スキルバランスを考慮した推薦を行う
  if (stats) {
    const has = (key: StatKey, threshold = 15) => (stats[key] ?? 0) >= threshold;
    const avg = Object.values(stats).reduce((s, v) => s + v, 0) / Object.values(stats).length;
    const isHigh = (key: StatKey) => (stats[key] ?? 0) >= avg * 1.2;

    // スキルの組み合わせで具体的に判定
    if (isHigh('initiative') && isHigh('action') && isHigh('creativity')) {
      if (val === 'growth_orientation') return 'スタートアップ創業メンバー、新規事業開発リーダー、起業';
      return 'ベンチャー企業の企画職、プロデューサー、事業開発';
    }
    if (isHigh('logical_thinking') && isHigh('empathy')) {
      return 'UXリサーチャー、データに基づく教育設計、医療IT、コンサルタント（人に寄り添える論理派として希少）';
    }
    if (isHigh('communication') && isHigh('logical_thinking')) {
      return '戦略コンサル、ITコンサル、プリセールス、法人営業企画（論理と対話を両立できるのが武器）';
    }
    if (isHigh('creativity') && isHigh('planning')) {
      return '広告プランナー、プロダクトマネージャー、事業企画（アイデア×実行力の掛け算が強み）';
    }
    if (isHigh('empathy') && isHigh('grit')) {
      return '医療・福祉専門職、教育（長期的に人を支え続ける粘り強さが活きる）';
    }
    if (isHigh('leadership') && isHigh('communication')) {
      return '総合商社、大手企業の幹部候補、プロジェクトマネージャー（チームを率いる素質あり）';
    }
    if (isHigh('problem_solving') && isHigh('learning_agility')) {
      return 'ITエンジニア、データサイエンティスト、R&D（技術変化に強い問題解決型人材）';
    }
    // 行動力・創造力が低い場合はスタートアップ系を推薦しない
    if (!has('action', avg * 0.8) || !has('initiative', avg * 0.8)) {
      if (val === 'stability_orientation') return '大手メーカー、インフラ企業、公務員（安定した環境で専門性を磨ける）';
      if (val === 'social_contribution') return '公的機関、教育機関、大手企業のCSR部門（組織の後ろ盾がある環境で社会貢献）';
      return '大手企業の専門職、研究機関、安定基盤のある組織（着実にキャリアを積める環境）';
    }
  }

  // フォールバック: 2軸マッピング
  const hints: Record<string, string> = {
    'logical_thinking+income_orientation': '外資系コンサル、データアナリスト、金融専門職',
    'logical_thinking+growth_orientation': 'ITエンジニア、研究開発職、コンサルタント',
    'logical_thinking+stability_orientation': '大手メーカーの技術職、公務員（技術系）',
    'communication+income_orientation': '営業職（IT・不動産）、コンサルタント',
    'communication+social_contribution': '教育業界、NPO、医療系営業',
    'communication+growth_orientation': '人材業界、広告代理店、ベンチャー営業',
    'creativity+growth_orientation': 'デザイナー、マーケティング、広告クリエイティブ',
    'creativity+income_orientation': 'UXデザイナー、プロダクトマネージャー',
    'empathy+social_contribution': '福祉、教育、カウンセラー、医療従事者',
    'planning+stability_orientation': '大手企業の企画職、プロジェクトマネージャー',
    'initiative+growth_orientation': 'スタートアップ、新規事業開発、起業',
  };
  return hints[`${stat}+${val}`] ?? '幅広い業界での活躍が期待できる分野';
}

function getIndustryHint(primary: StatKey, secondary: StatKey): string {
  const key = [primary, secondary].sort().join('+');
  const map: Record<string, string> = {
    'communication+logical_thinking': 'コンサルティング、IT営業、企画職',
    'communication+empathy': '人材、教育、医療・福祉業界',
    'creativity+logical_thinking': 'UXデザイン、プロダクト開発、マーケティング',
    'communication+planning': '広告代理店、イベント企画、プロジェクトマネジメント',
    'logical_thinking+problem_solving': 'ITエンジニア、データサイエンス、研究開発',
  };
  return map[key] ?? `${STAT_LABEL[primary]}と${STAT_LABEL[secondary]}を求める業界`;
}

function getCompanySizeHint(stat: StatKey, val: ValueKey): string {
  if (val === 'stability_orientation') return '大手企業やインフラ系企業のように安定基盤のある会社';
  if (val === 'growth_orientation') return '急成長中のベンチャーや大手の新規事業部門';
  if (val === 'income_orientation') return '成果報酬型の外資系企業や実力主義の日系ベンチャー';
  if (val === 'social_contribution') return 'ソーシャルビジネスやCSRに力を入れている企業';
  return '柔軟な働き方を推進している企業やリモートワーク推奨企業';
}

// ============================================================
// ローディング中の就活豆知識コンポーネント
// ============================================================

const LOADING_TIPS = [
  { emoji: '💡', title: '知ってた？', body: '面接官が最も重視するのは「論理性」より「一貫性」。ガクチカ・自己PR・志望動機がつながっていると評価が跳ね上がります。' },
  { emoji: '📊', title: '就活データ', body: '内定者の約70%が「第一志望ではない企業」に入社しています。視野を広げることが結果的に満足度の高い就活につながります。' },
  { emoji: '🎯', title: '面接のコツ', body: '逆質問で「御社の課題は？」と聞くと好印象。自分ごととして考えている姿勢が伝わります。' },
  { emoji: '🔍', title: '企業研究の裏技', body: 'IR資料（投資家向け情報）を読むと、企業の本音と将来戦略がわかります。面接でこれに言及すると一目置かれます。' },
  { emoji: '✍️', title: 'ES攻略', body: '「〇〇した」ではなく「〇〇のために△△を考え、□□を実行した」と書くだけで、思考力のアピール度が格段に上がります。' },
  { emoji: '🤝', title: 'OB訪問のコツ', body: '「入社前と入社後で一番ギャップを感じたことは？」この質問だけで、企業の本当の姿が見えてきます。' },
  { emoji: '📱', title: '意外と見られてる', body: 'SNSアカウントは採用担当の約4割がチェックしています。プロフィールや投稿内容を今一度見直してみましょう。' },
  { emoji: '⏰', title: 'タイミングの話', body: '夏インターンに参加した学生の約60%が本選考で優遇を受けています。早めの行動が最大のアドバンテージ。' },
  { emoji: '🧠', title: '自己分析のヒント', body: '「好きなこと」より「時間を忘れて没頭できること」を掘り下げると、本当の強みが見えてきます。' },
  { emoji: '💼', title: '業界選びのヒント', body: '「やりたい仕事」がなくても大丈夫。「絶対にやりたくないこと」を消去法で除くと、意外と選択肢が絞れます。' },
  { emoji: '🌟', title: 'グループディスカッション', body: 'リーダーをやらなくても高評価は取れます。「議論を整理する人」「反対意見にも配慮する人」は面接官に刺さります。' },
  { emoji: '📝', title: '志望動機の鉄則', body: '「御社の〇〇に惹かれた」だけでは弱い。「自分の△△という経験から〇〇に共感した」と原体験を入れると説得力が段違い。' },
];

const LOADING_STEPS = [
  { emoji: '🔍', text: 'あなたの診断結果を読み込んでいます...' },
  { emoji: '🧠', text: '悩みの内容を分析しています...' },
  { emoji: '📊', text: 'スキルと価値観を照合しています...' },
  { emoji: '✨', text: 'パーソナライズされたアドバイスを生成中...' },
];

function LoadingTips() {
  const [tipIndex, setTipIndex] = useState(() => Math.floor(Math.random() * LOADING_TIPS.length));
  const [stepIndex, setStepIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  // 豆知識を5秒ごとにフェード切り替え
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setTipIndex((prev) => (prev + 1) % LOADING_TIPS.length);
        setFadeIn(true);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ステップを3秒ごとに進める
  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, LOADING_STEPS.length - 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const tip = LOADING_TIPS[tipIndex];

  return (
    <div className="py-5 mt-3 space-y-5">
      {/* ステップインジケーター */}
      <div className="space-y-2">
        {LOADING_STEPS.map((step, i) => (
          <div
            key={i}
            className={`flex items-center gap-2.5 transition-all duration-500 ${
              i <= stepIndex ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 transition-all duration-500 ${
              i < stepIndex
                ? 'bg-emerald-100 text-emerald-600'
                : i === stepIndex
                  ? 'bg-indigo-100 text-indigo-600 animate-pulse'
                  : 'bg-gray-100 text-gray-300'
            }`}>
              {i < stepIndex ? '✓' : step.emoji}
            </div>
            <span className={`text-xs transition-colors duration-500 ${
              i <= stepIndex ? 'text-gray-600' : 'text-gray-300'
            }`}>
              {step.text}
            </span>
          </div>
        ))}
      </div>

      {/* プログレスバー */}
      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${((stepIndex + 1) / LOADING_STEPS.length) * 90}%` }}
        />
      </div>

      {/* 就活豆知識カード */}
      <div className={`bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-4 transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-base">{tip.emoji}</span>
          <span className="text-[10px] font-bold text-amber-600 tracking-wide">待ってる間に就活豆知識</span>
        </div>
        <p className="text-[11px] font-semibold text-gray-700 mb-1">{tip.title}</p>
        <p className="text-[11px] text-gray-500 leading-relaxed">{tip.body}</p>
      </div>
    </div>
  );
}
