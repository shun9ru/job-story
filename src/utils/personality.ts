import type { StatKey, ValueKey } from '../types';
import { generateWithGemini } from '../lib/gemini';

/** AI分析の結果型 */
export interface PersonalityResult {
  title: string;
  emoji: string;
  tagline: string;
  sections: { heading: string; body: string }[];
}

const VALUE_LABEL_MAP: Record<ValueKey, string> = {
  income_orientation: '年収志向',
  stability_orientation: '安定志向',
  growth_orientation: '成長志向',
  work_life_balance: 'ワークライフバランス志向',
  social_contribution: '社会貢献志向',
};

const STAT_LABEL_MAP: Record<StatKey, string> = {
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

/** Gemini FlashでAI分析を生成（ストーリー結果のスキル分析用） */
export async function generateAIPersonality(stats: Record<StatKey, number>): Promise<PersonalityResult> {
  const sorted = (Object.entries(stats) as [StatKey, number][]).sort((a, b) => b[1] - a[1]);
  const statText = sorted.map(([k, v]) => `${STAT_LABEL_MAP[k]}: ${v}`).join(', ');

  const entries = Object.entries(stats) as [StatKey, number][];
  const avg = entries.reduce((s, [, v]) => s + v, 0) / entries.length;
  const top3 = sorted.slice(0, 3).map(([k, v]) => `${STAT_LABEL_MAP[k]}(${v})`).join('・');
  const bottom2 = sorted.slice(-2).map(([k, v]) => `${STAT_LABEL_MAP[k]}(${v})`).join('・');
  const hidden = sorted.filter(([k], i) => i >= 3 && stats[k] >= avg + 2).slice(0, 2).map(([k, v]) => `${STAT_LABEL_MAP[k]}(${v})`).join('・');

  const prompt = `あなたは就活キャリアカウンセラーです。以下のステータス(各0-100)を持つ就活生を深く分析し、本人が気づいていない強みや行動パターンを言語化してください。
ステータス: ${statText}
上位3: ${top3} / 下位2: ${bottom2}${hidden ? ` / 隠れた高スコア: ${hidden}` : ''} / 平均: ${avg.toFixed(1)}

【重要な分析指針】
- 数値の単純比較ではなく「この組み合わせを持つ人が無意識にやっていること」を具体的に描写する
- 上位スキルが高いことで日常や仕事で「自然とできてしまう行動」を言語化する（本人は当たり前だと思っているが実は希少な強み）
- 下位スキルが低いのは弱みではなく「上位スキルに全力投球してきた証拠」として肯定的に解釈する
- 就活の面接・ES・企業選びに直結する具体的なアドバイスを含める

JSON形式(これ以外出力しないで):
{"title":"タイプ名(4-10字)","emoji":"絵文字1つ","tagline":"キャッチコピー(30字以内)","sections":[{"heading":"🪞 あなたが無意識にやっていること","body":"この人が普段の生活で自然とやっているが本人は気づいていない行動パターンを具体的に描写。例:会話の中で自然と論点を整理している、チームで誰かが困ると真っ先に気づく等。十分な長さで詳しく書くこと"},{"heading":"💎 本人も気づいていない隠れた武器","body":"上位スキルの組み合わせ・隠れた高スコアから読み取れる希少な才能。この組み合わせを持つ人は全体の何割程度か、なぜ企業が欲しがるのかを具体的に。十分な長さで詳しく書くこと"},{"heading":"🎯 就活での最強アピールポイント","body":"面接やESでどのエピソードをどう語るべきか。ガクチカや自己PRの構成例を具体的に提案。この人の強みが最も伝わるストーリーの型を示す。十分な長さで詳しく書くこと"},{"heading":"🏢 あなたが輝ける企業の見極め方","body":"業界名でなく『面接で聞くべき質問』『会社説明会でチェックすべきポイント』など具体的な行動を箇条書き(•)で5-7個。十分な長さで詳しく書くこと"},{"heading":"⚡ 入社1年目から差がつく理由","body":"この人が社会人になったとき、同期と比べてどんな場面で力を発揮するか。上司や先輩からどう評価されやすいかを具体的に。十分な長さで詳しく書くこと"}]}
注意:前向き表現のみ、「あなたは〜」で語りかけ、具体的な場面描写を多用すること`;

  const raw = await generateWithGemini(prompt);
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('AIレスポンスからJSONを抽出できませんでした');
  const parsed = JSON.parse(jsonMatch[0]) as PersonalityResult;
  if (!parsed.title || !parsed.emoji || !parsed.sections?.length) throw new Error('AIレスポンスの形式が不正です');
  return parsed;
}

/** ステータス分布からパーソナリティ分析テキストを生成（フォールバック用） */
export function analyzePersonality(stats: Record<StatKey, number>): {
  title: string;
  emoji: string;
  tagline: string;
  sections: { heading: string; body: string }[];
} {
  const entries = Object.entries(stats) as [StatKey, number][];
  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const top1 = sorted[0][0];
  const top2 = sorted[1][0];
  const top3 = sorted[2][0];
  const bottom1 = sorted[sorted.length - 1][0];

  const total = sorted.reduce((s, [, v]) => s + v, 0);
  void total;
  const maxVal = sorted[0][1];
  const minVal = sorted[sorted.length - 1][1];
  const spread = maxVal - minVal;

  // 上位2つの組み合わせでタイプを決定
  const comboKey = [top1, top2].sort().join('+');

  const typeMap: Record<string, { title: string; emoji: string; tagline: string }> = {
    'communication+planning': { title: 'ビジョナリーリーダー', emoji: '👑', tagline: '人を巻き込み、ゼロからイチを生み出す求心力の持ち主' },
    'communication+empathy': { title: 'チームのムードメーカー', emoji: '🤗', tagline: '誰よりも人に寄り添い、チームの絆を深める潤滑油' },
    'communication+logical_thinking': { title: 'ロジカルネゴシエーター', emoji: '🎯', tagline: '論理と対話の両輪で、複雑な課題を解きほぐす交渉の達人' },
    'communication+creativity': { title: 'クリエイティブ・ディレクター', emoji: '🎬', tagline: 'アイデアと人をつなぎ、形にする表現のプロデューサー' },
    'communication+problem_solving': { title: 'ブリッジビルダー', emoji: '🌉', tagline: '技術と人をつなぐ、両方の言葉を話せる希少な存在' },
    'communication+resilience': { title: '信頼のアンカー', emoji: '⚓', tagline: '堅実さと対話力で組織を支える頼れる柱' },
    'communication+initiative': { title: 'グロースハッカー', emoji: '🚀', tagline: '人脈と挑戦心で新しい道を切り拓くパイオニア' },
    'planning+logical_thinking': { title: 'ストラテジスト', emoji: '🧠', tagline: 'データに裏打ちされた戦略で未来を描く参謀役' },
    'planning+creativity': { title: 'イノベーター', emoji: '💫', tagline: '枠にとらわれない発想で、世界に新しい価値を生み出す' },
    'planning+problem_solving': { title: 'テックストラテジスト', emoji: '⚙️', tagline: '技術の可能性を見極め、事業戦略に落とし込む設計者' },
    'planning+empathy': { title: 'ソーシャルプランナー', emoji: '🌱', tagline: '社会課題に戦略的にアプローチする企画力の持ち主' },
    'planning+resilience': { title: 'プロジェクトマスター', emoji: '📋', tagline: '緻密な計画と着実な実行で、プロジェクトを完遂させる' },
    'planning+initiative': { title: 'シリアルチャレンジャー', emoji: '🔥', tagline: '次々と新しい挑戦を企画し、成長し続ける行動派' },
    'logical_thinking+problem_solving': { title: 'テクニカルアナリスト', emoji: '🔬', tagline: '深い専門知識とデータ分析で真実を解き明かす探究者' },
    'logical_thinking+creativity': { title: 'データアーティスト', emoji: '📊', tagline: 'データと感性の掛け合わせで、新しい発見を生み出す' },
    'logical_thinking+empathy': { title: 'エビデンスケアラー', emoji: '💊', tagline: '根拠に基づいたアプローチで、確かな支援を提供する' },
    'logical_thinking+resilience': { title: 'リスクマネージャー', emoji: '🛡️', tagline: '緻密な分析と堅実な判断で、組織を守る番人' },
    'creativity+problem_solving': { title: 'テックアーティスト', emoji: '🎮', tagline: '技術と創造性の融合で、誰も見たことのないものを作る' },
    'creativity+empathy': { title: 'ヒーリングアーティスト', emoji: '🌈', tagline: '表現の力で人の心に寄り添い、癒しと勇気を届ける' },
    'creativity+resilience': { title: 'クラフトマスター', emoji: '🪡', tagline: '確かな技巧と丁寧さで、長く愛されるものを作り上げる' },
    'creativity+initiative': { title: 'アバンギャルド', emoji: '🎪', tagline: '常に新しい表現を追い求め、進化し続けるクリエイター' },
    'problem_solving+empathy': { title: 'テックフォーグッド', emoji: '🩺', tagline: '技術の力で人を助ける、社会派エンジニア' },
    'problem_solving+resilience': { title: 'システムガーディアン', emoji: '🏰', tagline: '堅牢なシステムを構築し、安定した基盤を守る守護者' },
    'problem_solving+initiative': { title: 'テックパイオニア', emoji: '🧬', tagline: '最先端技術を追い求め、技術の未来を切り拓く開拓者' },
    'empathy+resilience': { title: 'ライフサポーター', emoji: '🌿', tagline: '安定した環境の中で、着実に人を支え続ける堅実な支援者' },
    'empathy+initiative': { title: 'エンパワーメント・コーチ', emoji: '🌻', tagline: '自らも成長しながら、人の可能性を引き出す育成の達人' },
    'resilience+initiative': { title: 'ステディクライマー', emoji: '🧗', tagline: '着実に一歩ずつ登り続ける、ブレない成長志向の持ち主' },
    'initiative+action': { title: 'キャリアロケット', emoji: '🚀', tagline: '圧倒的な行動力で道を切り開く推進力の持ち主' },
    'leadership+communication': { title: 'カリスマリーダー', emoji: '🦁', tagline: 'ビジョンと対話力で組織を導くカリスマ' },
    'leadership+planning': { title: 'マスターストラテジスト', emoji: '♟️', tagline: '人を動かし戦略を実行する司令塔' },
    'decision_making+logical_thinking': { title: 'エグゼクティブ・ジャッジ', emoji: '⚖️', tagline: 'データと論理で的確な判断を下す意思決定者' },
    'grit+problem_solving': { title: 'プロフェッショナル', emoji: '🏅', tagline: '粘り強く専門性を磨き続ける真のプロ' },
    'self_awareness+empathy': { title: 'ヒューマニスト', emoji: '🕊️', tagline: '自分と他者を深く理解し、人の笑顔を生む存在' },
    'learning_agility+creativity': { title: 'マルチクリエイター', emoji: '✨', tagline: '高い学習力と創造力で次々と新しい価値を生む' },
    'teamwork+communication': { title: 'チームビルダー', emoji: '🤜', tagline: 'チームの力を最大化する協働のプロフェッショナル' },
  };

  const typeInfo = typeMap[comboKey] ?? { title: 'マルチポテンシャライト', emoji: '🌈', tagline: '多彩な才能を持ち、あらゆる分野で力を発揮する万能型' };

  // --- セクション生成 ---
  const sections: { heading: string; body: string }[] = [];

  // 1. 基本性格
  const personalityTraits = getPersonalityTraits(top1, top2, top3);
  sections.push({
    heading: '🪞 基本性格',
    body: personalityTraits,
  });

  // 2. 潜在スキル・強み
  const strengths = getStrengths(top1, top2, stats);
  sections.push({
    heading: '💎 潜在スキル・強み',
    body: strengths,
  });

  // 3. 注意点・伸びしろ
  const growth = getGrowthArea(bottom1, top1);
  sections.push({
    heading: '🌱 伸びしろ',
    body: growth,
  });

  // 4. バランス診断
  const balance = getBalanceDiagnosis(spread);
  sections.push({
    heading: '⚖️ バランス診断',
    body: balance,
  });

  // 5. 相性の良い環境
  const environment = getIdealEnvironment(top1, top2);
  sections.push({
    heading: '🏢 相性の良い環境',
    body: environment,
  });

  return { ...typeInfo, sections };
}

function getPersonalityTraits(top1: StatKey, top2: StatKey, top3: StatKey): string {
  const traitMap: Partial<Record<StatKey, string[]>> = {
    logical_thinking: ['感覚より論理、直感より根拠を重視するタイプ。複雑な問題を前にすると、むしろテンションが上がる知的好奇心の持ち主。'],
    problem_solving: ['「なぜそうなるのか」を突き詰めたい探究心の持ち主。一つの分野を深く掘り下げることに喜びを感じる、職人気質なタイプ。'],
    critical_thinking: ['情報を鵜呑みにせず、本質を見抜く目を持つタイプ。多角的な視点から物事を検証し、的確な判断を下せる。'],
    creativity: ['「人と同じ」が苦手で、自分だけの表現や視点を大切にするタイプ。日常の中にも美しさや面白さを見出せる感性がある。'],
    learning_agility: ['新しいことへの好奇心が旺盛で、未知の分野にも臆せず飛び込めるタイプ。学ぶスピードが速く、どんな環境でも適応できる。'],
    initiative: ['新しいことに飛び込むのが大好きで、失敗を恐れず行動するスピードと、ピンチをチャンスに変える強さを持っている。'],
    grit: ['途中で諦めない粘り強さが最大の武器。目標に向かって地道に努力を続け、最終的に大きな成果を出せるタイプ。'],
    self_management: ['時間や感情をコントロールする力が高く、計画的に物事を進められる。周囲から頼りにされる安定感がある。'],
    resilience: ['慎重で着実、信頼される堅実タイプ。困難にも動じず、逆境を成長の糧にできるメンタルの強さがある。'],
    self_awareness: ['自分の強みと弱みを客観的に把握し、それを活かして行動できるタイプ。内省力が高く、成長への道筋を自ら描ける。'],
    communication: ['人との関わりの中でエネルギーを得るタイプ。初対面でも自然と打ち解けられ、相手の本音を引き出す力がある。'],
    listening: ['相手の言葉の裏にある感情や意図まで汲み取れる傾聴力の持ち主。信頼関係を築く天性の才能がある。'],
    empathy: ['困っている人を放っておけない、生まれながらのケアラー。相手の気持ちを察する共感力が高く、「ありがとう」が最大のモチベーション。'],
    teamwork: ['チームの中で自然と調和を生み出せるタイプ。メンバーの強みを引き出し、協力して成果を出す力がある。'],
    leadership: ['ビジョンを示し、人を導く天性のリーダー。チームをまとめて目標に向かわせるカリスマ性がある。'],
    planning: ['「こうしたらもっと面白くなるのに」と常にアイデアが湧いてくる計画脳の持ち主。ゴールから逆算して行動を設計できる。'],
    decision_making: ['複数の選択肢から素早く的確に判断を下せるタイプ。情報を整理し、リスクとリターンを考慮した決断ができる。'],
    action: ['考えたことを即実行に移せるスピード感が武器。結果を出すまでの行動力は周囲を圧倒する。'],
  };

  const trait = traitMap[top1]?.[0] ?? `${STAT_LABEL_MAP[top1]}が際立つタイプ。`;
  return `${trait}\n\nさらに${STAT_LABEL_MAP[top2]}と${STAT_LABEL_MAP[top3]}も高く、${getComboTrait(top1, top2)}`;
}

function getComboTrait(a: StatKey, b: StatKey): string {
  const key = [a, b].sort().join('+');
  const comboTraits: Record<string, string> = {
    'communication+planning': '人を巻き込みながら新しいプロジェクトを推進できる実行力を秘めています。',
    'communication+logical_thinking': '相手の話を深く理解した上で、論理的に解決策を提示できるバランス感覚があります。',
    'communication+creativity': '自分のアイデアを魅力的に伝え、人の心を動かす表現力が際立っています。',
    'communication+problem_solving': '技術的な内容をわかりやすく伝えられる、エンジニアとビジネスの架け橋になれる素質があります。',
    'communication+empathy': '深い共感力と対話力で、人の心に寄り添える天性のカウンセラー気質があります。',
    'planning+logical_thinking': '戦略を緻密に組み立て、データで裏付ける参謀としての素質が光ります。',
    'planning+creativity': '既存の枠を超えた斬新なアイデアを実現可能な形に落とし込める稀有な能力を持っています。',
    'logical_thinking+problem_solving': '深い技術理解とデータ分析力で、複雑な技術課題を解決するスペシャリストの素質があります。',
    'creativity+problem_solving': '技術とアートの境界を越えて、テクノロジーで新しい体験を生み出す力があります。',
    'empathy+problem_solving': '技術の力で社会課題を解決する、テック・フォー・グッドの精神を持っています。',
  };

  return comboTraits[key] ?? `${STAT_LABEL_MAP[a]}と${STAT_LABEL_MAP[b]}の掛け合わせが、あなたならではのユニークな強みになっています。`;
}

function getStrengths(top1: StatKey, top2: StatKey, stats: Record<StatKey, number>): string {
  const strengthMap: Partial<Record<StatKey, string>> = {
    logical_thinking: '問題の構造化能力 — 複雑な課題をシンプルに分解し、本質的な解決策を導く思考力',
    problem_solving: '専門性の深さと問題解決力 — 高度な技術課題に対して粘り強く取り組み、解を見つけ出す力',
    critical_thinking: '情報の信頼性を見極める力 — 根拠を精査し、多角的に検証して的確な判断を導く力',
    creativity: '独自の審美眼と表現力 — 他の人には見えない角度から物事を捉え、形にする力',
    learning_agility: '自己変革力と学習スピード — 新しい知識やスキルを素早く吸収し、実践に落とし込む力',
    initiative: '誰よりも早く行動に移せるスピード感 — 変化の激しい環境でも楽しみながら適応できる',
    grit: '途中で投げ出さない継続力 — 困難に直面しても粘り強く取り組み、目標達成まで諦めない',
    self_management: '時間・感情・行動のコントロール力 — 計画的に行動し、常に安定したパフォーマンスを発揮',
    resilience: 'リスク管理能力と継続力 — 長期的な視点で物事を捉え、一貫した行動を取り続ける力',
    self_awareness: '自分軸で判断できるブレない価値観 — 自分の強み弱みを客観的に捉え、成長に活かす力',
    communication: '対人影響力と場の空気を読む力 — 相手に合わせたコミュニケーションで信頼関係を構築する力',
    listening: '傾聴力とラポール構築力 — 相手が安心して話せる雰囲気を自然に作れる力',
    empathy: '共感力とホスピタリティ — 言葉にならない気持ちを汲み取り、適切なサポートを提供する力',
    teamwork: 'チーム全体の力を引き出す協働力 — メンバーの強みを見極め、最大限に活かせる力',
    leadership: '人を動かすビジョン力 — 明確な方向性を示し、チームを目標に導く力',
    planning: '構想力とプロデュース力 — 複数の要素を組み合わせて、実現可能な計画を生み出すセンス',
    decision_making: '素早く的確な意思決定力 — 情報を整理し、リスクとリターンを考慮して決断する力',
    action: '考えたことを即実行する推進力 — スピード感を持って結果を出し、周囲を巻き込む力',
  };

  const lines = [strengthMap[top1] ?? STAT_LABEL_MAP[top1], strengthMap[top2] ?? STAT_LABEL_MAP[top2]];

  // 隠れた強みを発見（上位でないが意外と高いスキル）
  const entries = Object.entries(stats) as [StatKey, number][];
  const avg = entries.reduce((s, [, v]) => s + v, 0) / entries.length;
  const hidden = entries
    .filter(([k, v]) => k !== top1 && k !== top2 && v >= avg + 1)
    .sort((a, b) => b[1] - a[1]);

  if (hidden.length > 0) {
    const [hk] = hidden[0];
    lines.push(`\n意外な隠れスキルとして${STAT_LABEL_MAP[hk as StatKey]}も平均以上。自覚していないかもしれませんが、いざという時に頼れる引き出しになります。`);
  }

  return lines.join('\n');
}

function getGrowthArea(bottom1: StatKey, top1: StatKey): string {
  const adviceMap: Partial<Record<StatKey, string>> = {
    logical_thinking: '直感で動ける行動力は武器。ただ「なぜうまくいったのか」を振り返る習慣をつけると、成功の再現性がグンと上がる。',
    problem_solving: '幅広い視野は素晴らしい。一方で「これだけは誰にも負けない」という専門性を一つ持つと、キャリアの軸がグッと太くなる。',
    critical_thinking: '行動力は素晴らしいですが、時に立ち止まって情報の信頼性を検証する習慣を持つと、判断の精度が上がります。',
    creativity: '論理的で確実なアプローチは信頼される。たまには「正解がわからないまま動く」ことも試してみて。',
    learning_agility: '今の環境が心地よくても、新しいことに挑戦する習慣をつけてみて。小さな学びが大きな成長につながります。',
    initiative: '慎重さは長所。ただ時には「まずやってみる」精神で小さな一歩を踏み出すと、新しい発見があるかも。',
    grit: '柔軟性は武器。ただ、ここぞという時に「やりきる力」を発揮できると、周囲からの信頼がさらに高まります。',
    self_management: '自由な発想は素敵。ただ、計画的に行動する力も少し鍛えると、アイデアをもっと確実に形にできます。',
    resilience: '変化を楽しめるのはあなたの長所。ただ、「守りの力」も重要。安定した基盤があってこそ冒険できることもある。',
    self_awareness: '周囲への気配りは素晴らしい。たまには自分自身と向き合い、「自分は本当に何がしたいのか？」を考える時間を。',
    communication: '一人で考え抜く力は素晴らしい。ただ、まずは「相談する」ことから始めてみて。意外な化学反応が起きるかも。',
    listening: '自分の意見を発信する力は大切。同時に、相手の話にじっくり耳を傾ける時間も作ると、関係がさらに深まります。',
    empathy: '自分のことに集中できるのは立派な能力。ただ、人を助ける経験が視野を広げてくれることもあります。',
    teamwork: '個人の力は素晴らしい。それをチームで活かす経験を積むと、さらに大きな成果につながるでしょう。',
    leadership: 'サポート役として輝くあなた。時には自分がリードする経験も積むと、新しい一面が見えてきます。',
    planning: '目の前のことに全力投球するのはあなたの強み。少し先の未来を描く時間を作ると、今の頑張りがもっと大きな成果に。',
    decision_making: '慎重な判断は信頼される。ただ、時には素早く決断する練習をすると、チャンスを逃さなくなります。',
    action: '計画力は素晴らしい。ただ「考えすぎて動けない」状態を避けるため、小さなアクションから始める習慣を。',
  };

  return `${STAT_LABEL_MAP[bottom1]}が控えめなのは弱みではなく、${STAT_LABEL_MAP[top1]}に全力を注いできた証拠。\n\n${adviceMap[bottom1] ?? '伸びしろがあるということは、まだまだ成長できるということ。少しずつ意識してみましょう。'}`;
}

function getBalanceDiagnosis(spread: number): string {
  if (spread <= 4) {
    return 'ステータスが全体的にバランス良く伸びている「オールラウンダー型」。どんな環境にも適応できる柔軟性が最大の武器。特定の職種に縛られず、様々なキャリアパスの可能性を秘めています。一方で「何でもできるけど、これが一番」という軸を見つけると、さらにキャリアが加速するかも。';
  }
  if (spread <= 8) {
    return '得意分野がありつつも、他のスキルもしっかり伸びている「バランス型スペシャリスト」。専門性を活かしつつ、チームの中で幅広い役割をこなせるのが強み。「T字型人材」として、多くの企業が求める理想的なスキルバランスです。';
  }
  return '特定の分野に突き抜けた強みを持つ「スペシャリスト型」。この尖り方こそがあなたの個性であり最大の武器。得意分野では替えのきかない存在になれるポテンシャルがあります。苦手分野は無理に伸ばそうとせず、得意な仲間と補い合うチーム戦略がおすすめ。';
}

function getIdealEnvironment(top1: StatKey, top2: StatKey): string {
  const envMap: Partial<Record<StatKey, string[]>> = {
    logical_thinking: ['データドリブンな意思決定が行われる環境', '論理的な議論が歓迎される組織'],
    problem_solving: ['技術的チャレンジが豊富な環境', '専門性が正当に評価される組織'],
    critical_thinking: ['根拠に基づく議論が重視される環境', '多角的な検証が求められる組織'],
    creativity: ['自由な発想が許される環境', '多様性を尊重するカルチャーの組織'],
    learning_agility: ['新規事業や新しい挑戦が歓迎される環境', '研修制度や学習支援が充実した組織'],
    initiative: ['裁量が大きく自由に動ける環境', '変化の激しいスタートアップ的組織'],
    grit: ['長期的な目標に向かって取り組める環境', '努力と実績が評価される組織'],
    self_management: ['自律的に働ける環境', '計画的なプロジェクト管理が行われる組織'],
    resilience: ['明確なルールや評価基準がある環境', '長期的なキャリアパスが見える組織'],
    self_awareness: ['自分のペースで仕事ができる環境', '理念やビジョンに共感できる組織'],
    communication: ['チームワークを重視するフラットな環境', '社内外の交流が活発な組織'],
    listening: ['対話を大切にする文化がある環境', '顧客の声を重視する組織'],
    empathy: ['チームの成長を大切にする環境', '社会的意義のある事業を行う組織'],
    teamwork: ['協力して成果を出す文化がある環境', '多様なメンバーで構成されるチーム'],
    leadership: ['リーダーシップが求められるポジション', '裁量と責任が与えられる組織'],
    planning: ['裁量が大きく、提案が通りやすい環境', '新しいアイデアを歓迎する組織文化'],
    decision_making: ['素早い判断が求められる環境', '権限移譲が進んだフラットな組織'],
    action: ['スピード感を持って仕事が進む環境', '実行力を重視する組織'],
  };

  const envs = [...(envMap[top1] ?? []), ...(envMap[top2] ?? [])];
  return envs.map((e) => `• ${e}`).join('\n');
}

// ============================================================
// AI分析フォールバック（ローカル生成）
// ============================================================

/** API失敗時にローカルでAI分析風のテキストを生成する */
export function generateLocalPersonality(stats: Record<StatKey, number>): PersonalityResult {
  const entries = Object.entries(stats) as [StatKey, number][];
  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const top1 = sorted[0];
  const top2 = sorted[1];
  const top3 = sorted[2];
  const bottom1 = sorted[sorted.length - 1];
  const _bottom2 = sorted[sorted.length - 2];

  const maxVal = top1[1];
  const minVal = bottom1[1];
  const spread = maxVal - minVal;
  const avg = entries.reduce((s, [, v]) => s + v, 0) / entries.length;

  // 隠れた強み（上位3に入らないが平均以上）
  const hidden = sorted
    .filter(([k]) => k !== top1[0] && k !== top2[0] && k !== top3[0])
    .filter(([, v]) => v >= avg + 1)
    .slice(0, 2);

  // バランス判定
  const balanceType = spread <= 4 ? 'allrounder' : spread <= 8 ? 'balanced' : 'specialist';

  // カテゴリ別の強さ
  const categoryMap: Record<string, StatKey[]> = {
    thinking: ['logical_thinking', 'problem_solving', 'critical_thinking', 'creativity', 'learning_agility'],
    self_mgmt: ['initiative', 'grit', 'self_management', 'resilience', 'self_awareness'],
    social: ['communication', 'listening', 'empathy', 'teamwork', 'leadership'],
    execution: ['planning', 'decision_making', 'action'],
  };

  const categoryScores = Object.entries(categoryMap).map(([cat, keys]) => {
    const total = keys.reduce((s, k) => s + (stats[k] ?? 0), 0);
    return { cat, avg: total / keys.length };
  }).sort((a, b) => b.avg - a.avg);

  const strongCat = categoryScores[0].cat;
  const _weakCat = categoryScores[categoryScores.length - 1].cat;

  const _catLabel: Record<string, string> = {
    thinking: '思考力',
    self_mgmt: '自己管理力',
    social: '対人能力',
    execution: '実行力',
  };

  // タイプ判定（analyzePersonalityとは異なる切り口）
  const archetype = getArchetype(top1[0], top2[0], balanceType);

  const sections: { heading: string; body: string }[] = [];

  // 1. あなたが無意識にやっていること
  sections.push({
    heading: '🪞 あなたが無意識にやっていること',
    body: `${getUnconsciousBehavior(top1[0], top2[0])}\n\nさらに${STAT_LABEL_MAP[top3[0]]}（${top3[1]}pt）も高いため、${getThirdStatEffect(top3[0])}これらは本人にとって「当たり前」でも、周囲から見れば非常に希少な行動パターンです。`,
  });

  // 2. 隠れた才能 + 就活での武器化
  const hiddenText = hidden.length > 0
    ? `意外な発見として、${hidden.map(([k, v]) => `${STAT_LABEL_MAP[k]}（${v}pt）`).join('と')}が平均を上回っています。${getHiddenTalentAdvice(hidden[0][0])}\n\nこれは就活で「意外性のあるアピール」として強力な武器になります。面接では${STAT_LABEL_MAP[top1[0]]}のエピソードの中で、この力が自然に発揮された場面を語ると説得力が増します。`
    : `あなたのスキルは広く分散しており、どんな状況にも対応できる「適応力」が最大の武器です。面接では「未経験の課題にも柔軟に対応した経験」をアピールすると、この強みが伝わります。`;
  sections.push({
    heading: '💎 本人も気づいていない隠れた武器',
    body: hiddenText,
  });

  // 3. 就活での最強アピールポイント
  sections.push({
    heading: '🎯 就活での最強アピールポイント',
    body: getJobHuntingStrategy(top1[0], top2[0], balanceType),
  });

  // 4. 企業の見極め方
  sections.push({
    heading: '🏢 あなたが輝ける企業の見極め方',
    body: getCompanySelectionTips(top1[0], top2[0], strongCat),
  });

  // 5. 入社後に差がつく理由
  sections.push({
    heading: '⚡ 入社1年目から差がつく理由',
    body: getFirstYearAdvantage(top1[0], top2[0], bottom1[0]),
  });

  return {
    ...archetype,
    sections,
  };
}

function getArchetype(top1: StatKey, top2: StatKey, balance: string): { title: string; emoji: string; tagline: string } {
  if (balance === 'allrounder') {
    return { title: 'アダプティブ・ジェネラリスト', emoji: '🌐', tagline: 'どんな環境にも溶け込み、多角的に価値を発揮する適応の達人' };
  }

  const archetypes: Partial<Record<StatKey, { title: string; emoji: string; tagline: string }>> = {
    logical_thinking: { title: 'アナリティカル・シンカー', emoji: '🧪', tagline: 'データと論理で真実を解き明かす知の探究者' },
    problem_solving: { title: 'ソリューション・アーキテクト', emoji: '🏗️', tagline: '複雑な課題に美しい解を設計する問題解決の匠' },
    critical_thinking: { title: 'ストラテジック・アドバイザー', emoji: '🔍', tagline: '本質を見抜き、的確な判断を導く参謀' },
    creativity: { title: 'クリエイティブ・ヴィジョナリー', emoji: '🎨', tagline: '想像力で世界を塗り替えるビジョンの持ち主' },
    learning_agility: { title: 'ラピッド・ラーナー', emoji: '📚', tagline: 'あらゆる知識を吸収し、進化し続ける学びの達人' },
    initiative: { title: 'ファースト・ムーバー', emoji: '⚡', tagline: '誰よりも早く動き、道を切り拓くパイオニア' },
    grit: { title: 'エンデュランス・マスター', emoji: '💪', tagline: '粘り強さで不可能を可能にする努力の体現者' },
    self_management: { title: 'セルフ・コントローラー', emoji: '⏱️', tagline: '揺るぎない自律性で安定した成果を出す管理者' },
    resilience: { title: 'レジリエント・ガーディアン', emoji: '🛡️', tagline: '逆境に動じず、組織を守る不屈の番人' },
    self_awareness: { title: 'インサイトフル・ナビゲーター', emoji: '🧭', tagline: '深い自己理解で最適な道を選び取る航海士' },
    communication: { title: 'コネクティブ・ブリッジ', emoji: '🌉', tagline: '人と人をつなぎ、関係性から価値を生む架け橋' },
    listening: { title: 'ディープ・リスナー', emoji: '👂', tagline: '言葉の奥にある真意を聴き取る傾聴の達人' },
    empathy: { title: 'エンパシー・チャンピオン', emoji: '💝', tagline: '共感の力で人を癒し、チームに安心をもたらす存在' },
    teamwork: { title: 'チーム・カタリスト', emoji: '🤝', tagline: 'チームの化学反応を引き起こす触媒役' },
    leadership: { title: 'ヴィジョナリー・リーダー', emoji: '🦅', tagline: '高い視座からビジョンを示し、人を導く指揮者' },
    planning: { title: 'マスター・プランナー', emoji: '📐', tagline: '緻密な計画で構想を現実にする設計者' },
    decision_making: { title: 'ディシジョン・メーカー', emoji: '⚖️', tagline: '的確な判断で組織を前に進める決断者' },
    action: { title: 'アクション・ドライバー', emoji: '🏃', tagline: '圧倒的な行動力で結果を出す推進者' },
  };

  return archetypes[top1] ?? { title: 'ユニーク・パーソナリティ', emoji: '🌟', tagline: `${STAT_LABEL_MAP[top1]}と${STAT_LABEL_MAP[top2]}の独自の組み合わせが輝く存在` };
}

function getUnconsciousBehavior(top1: StatKey, _top2: StatKey): string {
  const behaviors: Partial<Record<StatKey, string>> = {
    logical_thinking: '会議やグループワークで、誰かの発言を聞きながら頭の中で自然と「要するにこういうこと」と整理しています。周囲が混乱している時にあなたが一言まとめると場が動くのは、この力のおかげ。',
    problem_solving: '何か問題が起きたとき、感情的になる前に「原因は何か」「どうすれば直るか」を考え始めています。トラブル対応の速さで周囲を驚かせることがあるはず。',
    critical_thinking: 'ニュースやSNSの情報を見て「本当にそうかな？」と一度立ち止まって考えるクセがあります。周囲が流されやすい場面でも、冷静に判断できるのはこの思考習慣のおかげ。',
    creativity: '日常の中で「もっとこうしたら面白いのに」というアイデアが自然と浮かんでいます。友達との会話やSNS投稿でも、人とは違う切り口で反応を得ることが多いはず。',
    learning_agility: '新しいアプリ、ゲーム、ツールに触れたとき、説明書を読まずに「まず触ってみる」タイプ。気づけば周囲より早く使いこなしていて、友達に教える側になっていることが多い。',
    initiative: '「誰かがやるだろう」と思う場面で、気づいたら自分が動いています。飲み会の幹事、旅行の計画、チームの方向決め——「最初の一歩」を踏み出すのがあなた。',
    grit: '他の人が「もういいか」と諦めるタイミングで、あなたはまだ粘っています。テスト勉強、部活、趣味——結果が出るまで地道に続けられる忍耐力は、実は非常に希少な才能。',
    self_management: '締め切り前に慌てる友達を見て「なんで早くやらないんだろう」と思ったことがあるはず。あなたの時間管理力は天性のもので、社会人になるとこの力の価値が爆発的に上がります。',
    resilience: '落ち込むことがあっても、翌日にはある程度回復している自分に気づいているはず。この回復力は、変化の激しい環境で長期的に活躍するための最強の土台。',
    self_awareness: '「自分は何が好きで、何が苦手か」を言語化できるのは、実はかなり珍しい力。就活で自己分析に苦しむ人が多い中、あなたは自分の軸がブレにくい。',
    communication: '初対面の人とも自然と会話が弾み、気づけば相手が本音を話してくれている——そんな経験が多いはず。この「話しやすい空気」を作る力は、営業でもマネジメントでも超重要。',
    listening: '友達から「聞いてほしい」と相談を受けることが多いのでは。あなたは無意識に、相手が話しやすい相槌やタイミングを使いこなしています。',
    empathy: '映画を見て泣いたり、友達の話を聞いて自分のことのように感じたりする感受性の高さ。これは「人の痛みがわかる」という、リーダーやサービス職で最も求められる資質。',
    teamwork: 'チームで動くとき、自然とメンバーの得意不得意を把握して役割分担を考えています。「あの人はこれが得意だから任せよう」という判断を無意識にしているはず。',
    leadership: '人が迷っている場面で「こうしよう」と方向を示す——それが「命令」ではなく「提案」として受け入れられるのが、あなたのリーダーシップの特徴。',
    planning: '旅行やイベントの計画を立てるのが好きで、頭の中でスケジュールやタスクが自然と整理されていきます。この「構想力」はプロジェクトマネジメントの原石。',
    decision_making: 'レストランでメニューを選ぶとき、優柔不断な友達を横目にサッと決められるタイプ。情報を素早く整理して判断する力は、ビジネスの現場で圧倒的に重宝されます。',
    action: '「考えるより先に体が動く」タイプ。良いアイデアが浮かんだらすぐ試す、興味があればすぐ調べる。この瞬発力は、スピード勝負の現場で大きなアドバンテージ。',
  };

  const b1 = behaviors[top1] ?? `${STAT_LABEL_MAP[top1]}が高いあなたは、この力を日常で自然と発揮しています。`;
  return b1;
}

function getThirdStatEffect(stat: StatKey): string {
  const effects: Partial<Record<StatKey, string>> = {
    logical_thinking: '物事を感覚だけでなく論理でも裏付ける習慣があり、説得力のある発言ができます。',
    creativity: 'ルーティンの中にも工夫を加える創造性があり、マンネリに陥りにくいタイプです。',
    empathy: '成果を出しながらも人の気持ちに配慮できるバランス感覚を持っています。',
    communication: '自分の考えを人にわかりやすく伝える力も備わっており、チームでの影響力が大きくなります。',
    planning: '行動力だけでなく段取りも考えられるため、成果の再現性が高いです。',
    resilience: 'プレッシャーがかかる場面でもパフォーマンスが落ちにくい安定感があります。',
    initiative: '人から言われる前に自分で動けるため、「指示待ち」とは無縁のタイプです。',
    action: '考えたことを行動に移すスピードが速く、チャンスを逃しにくいです。',
    leadership: '必要な場面で自然とリーダーシップを発揮でき、チームの推進力になります。',
    teamwork: '個人の力だけでなくチームの力も引き出せるため、組織での評価が高くなりやすいです。',
    listening: '相手の話をしっかり受け止める力があるため、信頼関係の構築が早いです。',
    grit: '目標に向かって粘り強く取り組む姿勢があり、中長期のプロジェクトで真価を発揮します。',
  };
  return effects[stat] ?? `${STAT_LABEL_MAP[stat]}も平均以上にあり、行動に独自の深みを与えています。`;
}

function getHiddenTalentAdvice(key: StatKey): string {
  const advice: Partial<Record<StatKey, string>> = {
    creativity: '普段は論理的に考えていても、ふとした瞬間にユニークな発想が出る人です。ブレストや企画の場面で意識的にこの力を使ってみてください。',
    empathy: '実は人の気持ちの変化に敏感。チームの空気がおかしいと感じたら、その直感を信じてアクションを起こしてみてください。',
    planning: '無意識のうちに段取りを考えている計画タイプ。タスク管理やプロジェクト運営で思わぬ力を発揮するかもしれません。',
    leadership: '自分では気づいていないかもしれませんが、あなたの言動に影響を受けている人がいるはず。小さなチームから試してみてください。',
    action: '考えるだけでなく動ける素質があります。「まずやってみる」マインドを意識すると、成果が加速するでしょう。',
    resilience: 'ストレス耐性が意外と高い。プレッシャーのかかる場面で冷静さを保てるのは大きな武器です。',
    communication: '人前で話す機会を増やすと、思いがけず楽しめるかもしれません。プレゼンやファシリテーションに挑戦してみてください。',
  };
  return advice[key] ?? 'この力を意識的に使う場面を作ると、新しいキャリアの可能性が広がります。';
}

function _getCategoryAdvice(strong: string, weak: string): string {
  const pairs: Record<string, string> = {
    'thinking+social': '頭で考える力は十分。次はそれを「人に伝える」経験を積むと、あなたのアイデアがもっと広がります。グループワークやプレゼンの機会を意識して増やしてみてください。',
    'thinking+execution': '分析力は申し分なし。あとは「やってみる」スピードを少し上げるだけ。完璧を目指しすぎず、7割の完成度で動く練習をしてみてください。',
    'thinking+self_mgmt': '思考力が高い分、考えすぎて疲れることも。定期的に「考えない時間」を作り、リフレッシュする習慣を持つと持続力が上がります。',
    'social+thinking': '人との関わりが得意な分、もう少しデータや論理で裏付けを取る習慣をつけると、説得力がさらに増します。',
    'social+execution': 'コミュニケーションは強い。あとは「段取り力」を磨くと、チームを率いるリーダーとしてさらに飛躍できます。',
    'social+self_mgmt': '人付き合いを大切にしつつ、自分だけの時間もしっかり確保して。セルフケアがあなたの対人力を長く支えます。',
    'execution+thinking': '実行力は十分。「なぜうまくいったか」を振り返る分析の時間を加えると、成功の再現性が上がります。',
    'execution+social': '行動が速い分、周りを置いてけぼりにしていないか確認を。巻き込み力を意識すると、もっと大きな成果に。',
    'self_mgmt+thinking': '自分を律する力がある。あとは知的好奇心をもう少し解放して、新しい分野にも手を出してみてください。',
    'self_mgmt+social': '安定感が武器。もう少し周囲との対話を増やすと、さらに信頼される存在になれます。',
  };

  const key = `${strong}+${weak}`;
  return pairs[key] ?? `「${strong === 'thinking' ? '思考力' : strong === 'social' ? '対人能力' : strong === 'execution' ? '実行力' : '自己管理力'}」をベースに、「${weak === 'thinking' ? '思考力' : weak === 'social' ? '対人能力' : weak === 'execution' ? '実行力' : '自己管理力'}」を少し意識するだけで、大きなレベルアップが期待できます。`;
}

function _getWeaknessReframe(bottom: StatKey, top: StatKey): string {
  const reframes: Partial<Record<StatKey, string>> = {
    logical_thinking: `あなたは${STAT_LABEL_MAP[top]}で勝負するタイプ。論理に頼らなくても結果を出せるのは、それだけ他の力が強い証拠です。必要な時にロジカルシンキングの「フレームワーク」を1つだけ覚えておくと、苦手意識が和らぎます。`,
    communication: `一人で深く考え抜ける力は大きな武器。コミュニケーションは「スキル」なので、場数を踏めば必ず伸びます。まずは1対1の対話から始めてみてください。`,
    creativity: `独創性より「着実さ」で勝負するあなた。クリエイティビティは0から生むだけでなく、既存のものを組み合わせることでも発揮できます。`,
    empathy: `共感力が控えめでも、あなたの${STAT_LABEL_MAP[top]}は人を助ける別の形になります。「共感」ではなく「問題解決」で人をサポートするスタイルもアリ。`,
    planning: `即興力と瞬発力があなたの持ち味。「計画通りにいかない場面」でこそ輝くタイプです。最低限のToDoリストだけ作って、あとは柔軟に動くのがあなた流。`,
    initiative: `慎重さは美徳。まずは「小さな実験」から始める習慣をつけると、リスクを抑えながら挑戦できます。`,
    resilience: `変化を恐れない柔軟性があなたの強み。「安定」は外部環境だけでなく、強いスキルを持つことでも得られます。`,
  };

  return reframes[bottom] ?? `${STAT_LABEL_MAP[bottom]}が伸びしろということは、少しの努力で大きなリターンが得られる「コスパの良い成長領域」です。${STAT_LABEL_MAP[top]}という確かな軸があるからこそ、安心して新しいスキルに挑戦できます。`;
}

function getJobHuntingStrategy(top1: StatKey, top2: StatKey, balance: string): string {
  const gakulikaMap: Partial<Record<StatKey, string>> = {
    logical_thinking: '「課題を分析し、仮説を立てて検証した」プロセスを軸に語る',
    problem_solving: '「困難な状況で原因を特定し、解決策を実行した」ストーリーで語る',
    creativity: '「既存のやり方に疑問を持ち、新しいアプローチを提案・実行した」エピソードで語る',
    communication: '「関係者の意見を引き出し、合意形成を主導した」経験で語る',
    empathy: '「相手の立場に立って考え、相手が本当に求めていることを実現した」経験で語る',
    planning: '「目標から逆算して計画を立て、チームを巻き込んで達成した」過程で語る',
    initiative: '「誰も手をつけていなかった課題に自ら挑戦した」行動力で語る',
    leadership: '「メンバーの強みを活かしてチームを目標達成に導いた」リーダー経験で語る',
    action: '「考えたことをすぐ実行に移し、PDCAを高速で回した」スピード感で語る',
    grit: '「困難にぶつかっても諦めず、最後まで粘り強く取り組んだ」忍耐力で語る',
    resilience: '「逆境を乗り越え、そこから学びを得て成長した」回復力で語る',
    teamwork: '「多様なメンバーの力を引き出し、チーム全体の成果を最大化した」協働力で語る',
    listening: '「相手の言葉の裏にあるニーズを汲み取り、的確な提案につなげた」傾聴力で語る',
  };

  const top1Advice = gakulikaMap[top1] ?? `「${STAT_LABEL_MAP[top1]}を活かして成果を出した」経験で語る`;
  const top2Advice = gakulikaMap[top2] ?? `${STAT_LABEL_MAP[top2]}`;

  if (balance === 'specialist') {
    return `【ガクチカの黄金パターン】\n${top1Advice}\n\n【自己PRの差別化ポイント】\n${STAT_LABEL_MAP[top1]}の「深さ」が最大の武器。エピソードは1つに絞り、「なぜそこまでこだわったのか」の動機を深く掘り下げて語ると、面接官の心に刺さります。\n\n【逆質問で印象を残す】\n「御社で${STAT_LABEL_MAP[top1]}を最も活かせるポジションはどこですか？」と聞くと、あなたの強みが面接官の記憶に残ります。`;
  }

  return `【ガクチカの黄金パターン】\n${top1Advice}\n\n【掛け合わせでライバルに差をつける】\n${STAT_LABEL_MAP[top1]}×${STAT_LABEL_MAP[top2]}の「二刀流」が差別化ポイント。面接では「${STAT_LABEL_MAP[top1]}だけでなく${top2Advice}も活かして成果を出した」と語ると、多くの志望者と一線を画せます。\n\n【逆質問で印象を残す】\n「御社では${STAT_LABEL_MAP[top1]}と${STAT_LABEL_MAP[top2]}の両方を活かせる場面はありますか？」——この質問自体が、あなたの強みのアピールになります。`;
}

function getCompanySelectionTips(top1: StatKey, top2: StatKey, strongCat: string): string {
  const baseTips = [
    `• 面接で「この会社で${STAT_LABEL_MAP[top1]}が活きた場面を教えてください」と逆質問する→具体例が出る会社はあなたと相性が良い`,
    `• 会社説明会で登壇する社員が「楽しそうに話しているか」に注目する→社員の熱量はカルチャーの鏡`,
    `• OB/OG訪問では「入社1年目で一番大変だったことと、どう乗り越えたか」を聞く→あなたの強みで乗り越えられそうなら相性◎`,
  ];

  const catTips: Record<string, string> = {
    thinking: '• 口コミサイトで「裁量権」「挑戦的な仕事」の評価を確認→思考力を活かせる仕事が多い会社を選ぶ',
    self_mgmt: '• 「評価制度が明確か」「成果が正当に認められるか」をOB/OGに聞く→自律性が報われる環境が重要',
    social: '• 「チームの雰囲気」「社内コミュニケーション」を面接で質問→対人力を活かせる文化かチェック',
    execution: '• 「スピード感」「実行重視の文化か」をインターンで体感する→行動力を評価する環境で輝ける',
  };

  const specificTip = catTips[strongCat] ?? `• 「${STAT_LABEL_MAP[top2]}を伸ばせる研修制度があるか」を確認→入社後の成長速度に直結`;

  return [...baseTips, specificTip, `• 最終面接では「5年後にどんな人材になってほしいか」を聞く→あなたの成長ビジョンとの一致度がわかる`].join('\n');
}

function getFirstYearAdvantage(top1: StatKey, top2: StatKey, bottom: StatKey): string {
  const advantages: Partial<Record<StatKey, string>> = {
    logical_thinking: '上司への報告で「結論→理由→具体例」の順に話せるため、早い段階で「論理的で分かりやすい」と評価される',
    problem_solving: 'トラブルが発生した時に慌てず対処できるため、先輩から「頼りになる新人」と信頼される',
    creativity: '定例会議やプレゼンで「新しい視点」を提供できるため、「面白い発想をする新人」として一目置かれる',
    communication: '他部署との連携やクライアント対応で即戦力になれるため、早い段階で重要な案件を任されやすい',
    empathy: 'お客様や同僚の気持ちを察することができるため、「空気が読める」「気配りができる」と信頼が積み上がる',
    planning: '仕事の段取りが上手いため、同期が締め切りに追われる中で余裕を持って成果を出せる',
    initiative: '「指示待ち」ではなく自分から動けるため、上司の手間を減らす存在として早期に評価が上がる',
    leadership: '同期の中で自然とまとめ役を担い、研修やプロジェクトで「期待の新人」として注目される',
    action: '「まず動く」スピードが周囲を驚かせ、試行錯誤の回数が多い分、成長速度も同期の中で頭一つ抜ける',
    grit: '地道な作業や困難な案件でも粘り強く取り組むため、「信頼して任せられる」と長期的に評価が上がっていく',
    resilience: '失敗しても翌日には前向きに切り替えられるため、挫折しやすい1年目を安定して乗り越えられる',
    teamwork: 'チーム内の潤滑油的存在になれるため、先輩や上司から「一緒に仕事がしやすい」と好評を得る',
    listening: '顧客ヒアリングや社内の打ち合わせで相手の真のニーズを掴めるため、提案の質が同期より高くなる',
  };

  const adv = advantages[top1] ?? `${STAT_LABEL_MAP[top1]}の高さが、入社初日から周囲との差を生みます`;
  return `${adv}。\n\nまた${STAT_LABEL_MAP[top2]}との掛け合わせにより、単なる「○○が得意な新人」ではなく「${STAT_LABEL_MAP[top1]}も${STAT_LABEL_MAP[top2]}もできる希少な人材」としてポジションを確立できます。${STAT_LABEL_MAP[bottom]}は入社後にOJTで自然と鍛えられるので、今は気にしなくて大丈夫です。`;
}

function _getGrowthStrategy(top: StatKey, bottom: StatKey, balance: string): string {
  if (balance === 'allrounder') {
    return `あなたはバランス型なので、まず「一番好き・楽しい」と感じるスキルを1つ選んで集中的に伸ばすのがおすすめ。\n\n具体的には：\n• 3ヶ月間、${STAT_LABEL_MAP[top]}に関連する活動に集中する\n• その分野で「小さな実績」を1つ作る\n• 実績を軸に、他のスキルとの掛け合わせを考える\n\nオールラウンダーの最大の武器は「何にでも適応できる柔軟性」。その上に1本の柱を立てることで、替えのきかない存在になれます。`;
  }

  if (balance === 'specialist') {
    return `あなたは${STAT_LABEL_MAP[top]}に特化したスペシャリスト型。この尖りを武器に：\n\n• まず${STAT_LABEL_MAP[top]}を「誰にも負けないレベル」に磨き上げる\n• 次に${STAT_LABEL_MAP[bottom]}を「最低限困らないレベル」まで引き上げる\n• 得意分野を活かせる環境を優先して選ぶ\n\n苦手分野は仲間に任せるのも立派な戦略。「自分の得意で貢献し、苦手は助けてもらう」チーム戦略を意識してみてください。`;
  }

  return `バランス型スペシャリストのあなたには「T字型成長」がおすすめ：\n\n• 縦軸：${STAT_LABEL_MAP[top]}をさらに深める（専門性）\n• 横軸：${STAT_LABEL_MAP[bottom]}を少しずつ広げる（汎用性）\n\n具体的には、${STAT_LABEL_MAP[top]}に関連するインターンやプロジェクトに参加しつつ、月1回は${STAT_LABEL_MAP[bottom]}を使う場面を意識的に作ってみてください。`;
}

// ============================================================
// 診断結果レビュー用 AI 生成
// ============================================================

/** 診断結果のAIレビューの型 */
export interface DiagnosisAIReview {
  headline: string;
  emoji: string;
  sections: { heading: string; body: string }[];
}

/** Gemini Flash で診断結果のAIレビューを生成（価値観ベース） */
export async function generateDiagnosisAIReview(
  primaryStat: StatKey,
  secondaryStat: StatKey,
  values: Record<ValueKey, number>,
): Promise<DiagnosisAIReview> {
  const { getDiagnosisType } = await import('../data/diagnosis');
  const primaryType = getDiagnosisType(primaryStat);
  const secondaryType = getDiagnosisType(secondaryStat);

  const valuesText = (Object.entries(values) as [ValueKey, number][])
    .map(([k, v]) => `${VALUE_LABEL_MAP[k]}:${v}/100`)
    .join(', ');

  // 価値観の偏りを分析
  const valEntries = Object.entries(values) as [ValueKey, number][];
  const valSorted = [...valEntries].sort((a, b) => b[1] - a[1]);
  const topVal = valSorted[0];
  const lowVal = valSorted[valSorted.length - 1];
  const extremes = valEntries.filter(([, v]) => Math.abs(v - 50) >= 15).map(([k, v]) => `${VALUE_LABEL_MAP[k]}=${v}(${v > 50 ? '強い' : '弱い'})`).join(', ');

  const prompt = `あなたは新卒就活に特化したキャリアカウンセラーです。この就活生の価値観プロファイルを深く分析し、本人が言語化できていない「仕事選びの本当の軸」を明らかにしてください。

診断タイプ: メイン「${primaryType.label}」(${primaryType.tagline}), サブ「${secondaryType.label}」(${secondaryType.tagline})
価値観スコア(50が中央値): ${valuesText}
特に偏りが大きい項目: ${extremes || 'なし（バランス型）'}
最も高い価値観: ${VALUE_LABEL_MAP[topVal[0]]}(${topVal[1]}) / 最も低い: ${VALUE_LABEL_MAP[lowVal[0]]}(${lowVal[1]})

【重要な分析指針】
- スコアの数値を並べるだけの分析はNG。「なぜこの人はこの価値観を持つに至ったのか」の仮説を立てること
- ${VALUE_LABEL_MAP[topVal[0]]}が高い人が就活で犯しがちな具体的な失敗例と回避策を示す
- 面接・ES・企業研究・OB訪問それぞれで使える実践的テクニックを含める
- 「この価値観の人が内定後に後悔しやすいパターン」にも触れる

JSON形式(これ以外は出力しないで):
{"headline":"一言見出し15-25字","emoji":"絵文字1つ","sections":[{"heading":"🧭 あなたが本当に求めているもの","body":"価値観スコアの裏にある『本人も言葉にできていない欲求』を言語化。例:安定志向が高いのは単に安定が好きなのではなく『安心できる土台の上でこそ挑戦できるタイプ』等。数値の表面的な解釈ではなく深層心理に踏み込む。十分な長さで詳しく書くこと"},{"heading":"💎 この価値観だから持てる就活での武器","body":"この価値観の組み合わせを持つ人が面接で自然と発揮できる強みを具体的に。例:成長志向×社会貢献の人は志望動機に一貫性が出やすい等。面接官がどう評価するかの視点も含める。十分な長さで詳しく書くこと"},{"heading":"⚠️ 就活で絶対やってはいけないこと","body":"この価値観の人が就活中に陥りがちな具体的な失敗パターン3つ。例:年収志向の人が面接で給与の話ばかりする、安定志向の人が大手病になる等。それぞれの回避策も簡潔に。十分な長さで詳しく書くこと"},{"heading":"🔍 企業選びの裏ワザ","body":"一般的な企業研究では見えない、この人が確認すべきポイントを具体的に。OB訪問で聞くべき質問例、口コミサイトで見るべき項目、説明会で注目すべき社員の特徴など実践的なテクニックを箇条書き(•)で5-7個。十分な長さで詳しく書くこと"},{"heading":"📝 内定を勝ち取るES・面接戦略","body":"この価値観タイプに最適なガクチカの語り方、志望動機の構成、逆質問の例を具体的に提案。面接官の心に刺さるキーフレーズも1-2個提案。十分な長さで詳しく書くこと"}]}
注意: 前向き表現のみ、「あなたは〜」で語りかけること`;

  const raw = await generateWithGemini(prompt);

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('AIレスポンスからJSONを抽出できませんでした');
  }

  const parsed = JSON.parse(jsonMatch[0]) as DiagnosisAIReview;

  if (!parsed.headline || !parsed.emoji || !parsed.sections?.length) {
    throw new Error('AIレスポンスの形式が不正です');
  }

  return parsed;
}

/** API失敗時にローカルで診断レビュー風テキストを生成する */
export function generateLocalDiagnosisReview(
  primaryStat: StatKey,
  secondaryStat: StatKey,
  values: Record<ValueKey, number>,
): DiagnosisAIReview {
  const valEntries = Object.entries(values) as [ValueKey, number][];
  const sorted = [...valEntries].sort((a, b) => b[1] - a[1]);
  const topVal = sorted[0];
  const secondVal = sorted[1];
  const lowVal = sorted[sorted.length - 1];

  const valDescMap: Record<ValueKey, { high: string; low: string; career: string }> = {
    income_orientation: {
      high: '年収や経済的な成功に対する意識が高く、自分の市場価値を高めることにモチベーションを感じるタイプ',
      low: '収入よりもやりがいや自己実現を優先する価値観の持ち主',
      career: '外資系コンサル、投資銀行、大手メーカー幹部候補',
    },
    stability_orientation: {
      high: '安定した環境で着実にキャリアを築きたいという堅実な価値観の持ち主',
      low: '変化や挑戦を恐れず、リスクを取ってでも成長したいという冒険心がある',
      career: '公務員、大手インフラ企業、金融機関（メガバンク・保険）',
    },
    growth_orientation: {
      high: '自己成長への意欲が非常に高く、常に新しいスキルや経験を求めるタイプ',
      low: '今の自分を大切にしつつ、無理のないペースで成長したいという姿勢',
      career: 'ベンチャー企業、コンサルティング、IT系スタートアップ',
    },
    work_life_balance: {
      high: '仕事と私生活のバランスを大切にし、人生全体の充実を追求する価値観',
      low: '仕事に情熱を注ぎ、キャリアを通じて自己実現したいという志の高さ',
      career: 'ホワイト企業、リモートワーク推奨企業、地方自治体',
    },
    social_contribution: {
      high: '社会に貢献し、人の役に立つことに大きなやりがいを感じるタイプ',
      low: 'まず自分の力をつけてから社会に還元したいという段階的な考え',
      career: 'NPO/NGO、教育系企業、医療・福祉、CSR推進部門',
    },
  };

  const _topDesc = valDescMap[topVal[0]];
  const secondDesc = valDescMap[secondVal[0]];
  const _lowDesc = valDescMap[lowVal[0]];

  const primaryLabel = STAT_LABEL_MAP[primaryStat];
  const _secondaryLabel = STAT_LABEL_MAP[secondaryStat];
  const headline = `${VALUE_LABEL_MAP[topVal[0]]}×${VALUE_LABEL_MAP[secondVal[0]]}のキャリア探求者`;

  // 価値観の深層心理を読み解く
  const deepPsychMap: Record<ValueKey, { deep: string; trap: string; question: string }> = {
    income_orientation: {
      deep: '年収を重視するのは、お金そのものが欲しいわけではなく「自分の力が正当に評価されている実感」を求めているサイン。成果が数字で見える環境でモチベーションが上がるタイプです',
      trap: '①面接で給与・待遇の話を先に出してしまう（志望動機が薄く見える）\n②年収ランキングだけで企業を選び、仕事内容とのミスマッチに気づかない\n③初任給だけを比較し、昇給カーブや生涯年収を見落とす',
      question: '「成果を上げた社員は具体的にどう評価されますか？」→報酬制度の実態がわかる',
    },
    stability_orientation: {
      deep: '安定を求めるのは「リスク回避」ではなく「安心できる土台の上でこそ本来の力を発揮できる」タイプの証拠。長期的に腰を据えて成長できる環境で真価を発揮します',
      trap: '①「大手=安定」と思い込み、知名度だけで企業を選んでしまう\n②安定志向を面接で伝えると「受け身」と誤解される（「挑戦できる安定基盤」と言い換える）\n③業界の将来性より今の安定感だけで判断してしまう',
      question: '「10年在籍している社員はどんなキャリアパスを歩んでいますか？」→長期的な成長環境がわかる',
    },
    growth_orientation: {
      deep: '成長志向が高いのは「現状に満足しない向上心」の表れ。新しいスキルを身につけたとき、仕事そのもの以上に「成長している実感」にやりがいを感じるタイプです',
      trap: '①「成長できる環境」を志望動機にするが具体性がなく刺さらない（何の成長？と突っ込まれる）\n②ベンチャー=成長と安易に考え、教育体制がない環境で伸び悩む\n③成長スピードに焦り、3年以内に転職を繰り返すリスク',
      question: '「入社1-3年目の社員が任される仕事と、3年目以降で変わることは何ですか？」→成長の実態がわかる',
    },
    work_life_balance: {
      deep: 'WLBを重視するのは「怠けたい」のではなく「仕事以外の人生経験が、仕事のパフォーマンスも高めると知っている」賢さの表れ。持続可能な働き方で長期的に高い成果を出せるタイプです',
      trap: '①面接で「残業少ないですか？」と直接聞いてしまう（働く意欲が低く見える）\n②WLBの良さだけで選び、仕事内容への興味が薄い企業に入ってしまう\n③「効率よく成果を出したい」というポジティブな動機を伝え損ねる',
      question: '「社員の方は休日どのように過ごされていますか？」→自然にWLBの実態が聞ける',
    },
    social_contribution: {
      deep: '社会貢献志向が高いのは「自分の仕事が誰かの役に立っている実感」がモチベーションの源泉であるサイン。目の前の利益より「仕事の意義」に突き動かされるタイプです',
      trap: '①「社会に貢献したい」という抽象的な志望動機で終わってしまう（具体的にどう？と聞かれて詰まる）\n②NPO・公務員だけに視野が狭まり、民間企業の社会貢献に気づかない\n③理想が高すぎて、現実の泥臭い仕事とのギャップに苦しむ',
      question: '「御社の事業が社会にもたらした具体的なインパクトを教えてください」→本気度がわかる',
    },
  };

  const topPsych = deepPsychMap[topVal[0]];
  const lowPsych = deepPsychMap[lowVal[0]];

  const sections: { heading: string; body: string }[] = [
    {
      heading: '🧭 あなたが本当に求めているもの',
      body: `${topPsych.deep}。\n\nさらに${VALUE_LABEL_MAP[secondVal[0]]}も${secondVal[1]}ptと高く、${secondDesc.high}という側面も。つまりあなたのキャリア選びの本当の軸は「${VALUE_LABEL_MAP[topVal[0]]}」×「${VALUE_LABEL_MAP[secondVal[0]]}」の掛け合わせにあります。`,
    },
    {
      heading: '💎 この価値観だから持てる就活での武器',
      body: `${VALUE_LABEL_MAP[topVal[0]]}と${VALUE_LABEL_MAP[secondVal[0]]}を同時に高く持つ人は、${getValueComboStrength(topVal[0], secondVal[0])}。\n\n面接では「${primaryLabel}」としての強みと価値観が一致したエピソードを語ると、「自分を深く理解している学生」という印象を与えられます。面接官は"自己理解の深さ"を非常に重視しています。`,
    },
    {
      heading: '⚠️ 就活で絶対やってはいけないこと',
      body: `あなたの価値観タイプが陥りやすい失敗パターン：\n${topPsych.trap}\n\n対策：志望動機では価値観をストレートに語るのではなく、「その価値観がどんな成果につながったか」をエピソードで示しましょう。`,
    },
    {
      heading: '🔍 企業選びの裏ワザ',
      body: `• ${topPsych.question}\n• ${lowPsych.question}\n• 口コミサイトでは「年収」ではなく「やりがい」「成長性」の投稿に注目→実際に働く人の本音が見える\n• 説明会では質疑応答での社員の「表情」をチェック→質問に嬉しそうに答える会社はカルチャーが健全\n• 最終面接で「私のような${primaryLabel}タイプが御社で活躍できる場面は？」と聞く→相性が一発でわかる`,
    },
    {
      heading: '📝 内定を勝ち取るES・面接戦略',
      body: `【ガクチカの型】${STAT_LABEL_MAP[primaryStat]}を活かして成果を出した経験を「課題→行動→結果→学び」で構成。特に「なぜその行動を取ったか」に${VALUE_LABEL_MAP[topVal[0]]}への価値観をにじませると一貫性が出ます。\n\n【志望動機のキーフレーズ】「${VALUE_LABEL_MAP[topVal[0]]}と${VALUE_LABEL_MAP[secondVal[0]]}を両立できる環境」ではなく「○○という経験から、△△に貢献したいと考えた」と原体験から語ること。\n\n【逆質問で刺さる一言】「御社で3年目に任される仕事の裁量感を教えてください」→入社後の具体的なビジョンが伝わる`,
    },
  ];

  return { headline, emoji: '🔍', sections };
}

function getValueComboStrength(v1: ValueKey, v2: ValueKey): string {
  const key = [v1, v2].sort().join('+');
  const combos: Record<string, string> = {
    'growth_orientation+income_orientation': '成長と報酬の両方を追求するハイパフォーマー気質を持ち、成果主義の環境で爆発的に力を発揮できます',
    'income_orientation+stability_orientation': '堅実に高収入を目指す戦略家タイプで、大手企業の中で着実にキャリアアップしていく適性があります',
    'growth_orientation+social_contribution': '社会課題を解決しながら自己成長したいという志の高さがあり、ソーシャルビジネスやCSR分野で輝けます',
    'social_contribution+work_life_balance': '人生全体の豊かさを大切にしながら社会に貢献したいという価値観で、教育や福祉の分野との相性が抜群です',
    'growth_orientation+work_life_balance': '成長と生活のバランスを取れる稀有な判断力があり、長期的に活躍し続けるサステナブルなキャリアを築けます',
    'stability_orientation+work_life_balance': '安定した基盤の上で充実した人生を送りたいという明確なビジョンがあり、企業選びで迷いにくい強みがあります',
    'income_orientation+social_contribution': '経済的な力で社会を変えたいというスケールの大きな志があり、企業の社会的責任に関わるポジションに適しています',
    'stability_orientation+social_contribution': '安定した環境で着実に社会貢献したいという堅実な志で、公務員や大手の社会貢献事業に適しています',
    'income_orientation+work_life_balance': '効率よく稼ぎ、人生を豊かにしたいという合理的な価値観で、高待遇かつワークライフバランスの取れた企業を見極める力があります',
    'growth_orientation+stability_orientation': '安定した基盤の上で挑戦し続けたいという実は理想的な組み合わせで、大手企業の新規事業部門などとの相性が良いです',
  };
  return combos[key] ?? `${VALUE_LABEL_MAP[v1]}と${VALUE_LABEL_MAP[v2]}という一見異なる価値観を両立させる力があり、多角的な視点で企業を評価できます`;
}
