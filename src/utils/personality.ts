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

  const prompt = `就活生向けキャリア診断。以下のステータス(各0-100)の人物を分析しJSON出力。
ステータス: ${statText}
JSON形式(これ以外出力しないで):
{"title":"タイプ名(4-10字)","emoji":"絵文字1つ","tagline":"キャッチコピー(30字以内)","sections":[{"heading":"🪞 基本性格","body":"性格描写150-200字"},{"heading":"💎 潜在スキル","body":"隠れた才能150-200字"},{"heading":"🌱 伸びしろ","body":"前向きなアドバイス150-200字"},{"heading":"⚖️ バランス","body":"スペシャリスト/オールラウンダー判定100-150字"},{"heading":"🏢 相性の良い環境","body":"箇条書き(•)で3-4個"}]}
注意:前向き表現のみ、「あなたは〜」で語りかけ、高い項目と低い項目の組み合わせに触れること`;

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

  const prompt = `就活生向けキャリア価値観診断のパーソナライズレビュー。
診断タイプ: メイン「${primaryType.label}」(${primaryType.tagline}), サブ「${secondaryType.label}」(${secondaryType.tagline})
価値観スコア(50が中央値): ${valuesText}

この人物の価値観プロファイルを分析し、以下のJSON形式で出力してください(JSON以外は出力しないで):
{"headline":"一言見出し15-25字","emoji":"絵文字1つ","sections":[{"heading":"🧭 あなたのキャリア観","body":"この人の仕事に対する価値観の本質を語る150-200字"},{"heading":"💎 あなたならではの強み","body":"この価値観の組み合わせだからこそ持てる強み150-200字"},{"heading":"⚠️ 気をつけたいポイント","body":"この価値観の人が陥りやすい罠と対策150-200字"},{"heading":"🗺️ 理想のキャリアパス","body":"5年後10年後のキャリアビジョン提案と具体的な職種名3-4個150-200字"},{"heading":"💡 就活へのアドバイス","body":"企業選びの軸や面接でアピールすべきポイント3つ150-200字"}]}
注意: 前向き表現のみ、「あなたは〜」で語りかけ、各価値観スコアの数値(50との差)に具体的に言及すること`;

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
