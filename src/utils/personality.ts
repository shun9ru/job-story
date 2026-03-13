import type { StatKey, TraitKey } from '../types';
import { generateWithGemini } from '../lib/gemini';

/** AI分析の結果型 */
export interface PersonalityResult {
  title: string;
  emoji: string;
  tagline: string;
  sections: { heading: string; body: string }[];
}

const STAT_LABEL_MAP: Record<StatKey, string> = {
  satisfaction: '満足度', income: '年収', growth: '成長度', stability: '安定度',
  communication: 'コミュ力', planning: '企画力', analysis: '分析力',
  creative: '創造力', care: '支援力', technical: '技術力',
};

/** Gemini FlashでAI分析を生成 */
export async function generateAIPersonality(stats: Record<StatKey, number>): Promise<PersonalityResult> {
  // 上位3つ+下位1つだけ送る（トークン節約）
  const sorted = (Object.entries(stats) as [StatKey, number][]).sort((a, b) => b[1] - a[1]);
  const statText = sorted.map(([k, v]) => `${STAT_LABEL_MAP[k]}: ${v}`).join(', ');

  const prompt = `就活生向けキャリア診断。以下のステータス(各0-20)の人物を分析しJSON出力。
ステータス: ${statText}
JSON形式(これ以外出力しないで):
{"title":"タイプ名(4-10字)","emoji":"絵文字1つ","tagline":"キャッチコピー(30字以内)","sections":[{"heading":"🪞 基本性格","body":"性格描写150-200字"},{"heading":"💎 潜在スキル","body":"隠れた才能150-200字"},{"heading":"🌱 伸びしろ","body":"前向きなアドバイス150-200字"},{"heading":"⚖️ バランス","body":"スペシャリスト/オールラウンダー判定100-150字"},{"heading":"🏢 相性の良い環境","body":"箇条書き(•)で3-4個"}]}
注意:前向き表現のみ、「あなたは〜」で語りかけ、高い項目と低い項目の組み合わせに触れること`;

  const raw = await generateWithGemini(prompt);

  // JSONを抽出（```json ... ``` で囲まれている場合にも対応）
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('AIレスポンスからJSONを抽出できませんでした');
  }

  const parsed = JSON.parse(jsonMatch[0]) as PersonalityResult;

  // バリデーション
  if (!parsed.title || !parsed.emoji || !parsed.sections?.length) {
    throw new Error('AIレスポンスの形式が不正です');
  }

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
  const bottom2 = sorted[sorted.length - 2][0];

  const total = sorted.reduce((s, [, v]) => s + v, 0);
  const avg = total / sorted.length;
  const maxVal = sorted[0][1];
  const minVal = sorted[sorted.length - 1][1];
  const spread = maxVal - minVal;

  // 上位2つの組み合わせでタイプを決定
  const comboKey = [top1, top2].sort().join('+');

  const typeMap: Record<string, { title: string; emoji: string; tagline: string }> = {
    'communication+planning': { title: 'ビジョナリーリーダー', emoji: '👑', tagline: '人を巻き込み、ゼロからイチを生み出す求心力の持ち主' },
    'communication+income': { title: 'トップセールス', emoji: '🏆', tagline: '信頼を武器に成果を積み上げるビジネスの牽引役' },
    'communication+satisfaction': { title: 'ピープルファースト', emoji: '🌻', tagline: '人と関わることに喜びを感じ、周囲を明るくする存在' },
    'communication+care': { title: 'チームのムードメーカー', emoji: '🤗', tagline: '誰よりも人に寄り添い、チームの絆を深める潤滑油' },
    'communication+analysis': { title: 'ロジカルネゴシエーター', emoji: '🎯', tagline: '論理と対話の両輪で、複雑な課題を解きほぐす交渉の達人' },
    'communication+creative': { title: 'クリエイティブ・ディレクター', emoji: '🎬', tagline: 'アイデアと人をつなぎ、形にする表現のプロデューサー' },
    'communication+technical': { title: 'ブリッジビルダー', emoji: '🌉', tagline: '技術と人をつなぐ、両方の言葉を話せる希少な存在' },
    'communication+stability': { title: '信頼のアンカー', emoji: '⚓', tagline: '堅実さと対話力で組織を支える頼れる柱' },
    'communication+growth': { title: 'グロースハッカー', emoji: '🚀', tagline: '人脈と挑戦心で新しい道を切り拓くパイオニア' },
    'planning+analysis': { title: 'ストラテジスト', emoji: '🧠', tagline: 'データに裏打ちされた戦略で未来を描く参謀役' },
    'planning+creative': { title: 'イノベーター', emoji: '💫', tagline: '枠にとらわれない発想で、世界に新しい価値を生み出す' },
    'planning+income': { title: 'ビジネスアーキテクト', emoji: '🏗️', tagline: '事業構想力と収益感覚を併せ持つ経営人材' },
    'planning+satisfaction': { title: 'ライフデザイナー', emoji: '🎨', tagline: '自分らしい人生を自らの手で設計できるプランナー' },
    'planning+technical': { title: 'テックストラテジスト', emoji: '⚙️', tagline: '技術の可能性を見極め、事業戦略に落とし込む設計者' },
    'planning+care': { title: 'ソーシャルプランナー', emoji: '🌱', tagline: '社会課題に戦略的にアプローチする企画力の持ち主' },
    'planning+stability': { title: 'プロジェクトマスター', emoji: '📋', tagline: '緻密な計画と着実な実行で、プロジェクトを完遂させる' },
    'planning+growth': { title: 'シリアルチャレンジャー', emoji: '🔥', tagline: '次々と新しい挑戦を企画し、成長し続ける行動派' },
    'analysis+technical': { title: 'テクニカルアナリスト', emoji: '🔬', tagline: '深い専門知識とデータ分析で真実を解き明かす探究者' },
    'analysis+income': { title: 'ファイナンスマスター', emoji: '📈', tagline: '数字を読み解く力で、経済的な価値を最大化する' },
    'analysis+satisfaction': { title: 'インサイトシーカー', emoji: '🔍', tagline: '物事の本質を見抜く喜びを糧に、知的探究を続ける' },
    'analysis+creative': { title: 'データアーティスト', emoji: '📊', tagline: 'データと感性の掛け合わせで、新しい発見を生み出す' },
    'analysis+care': { title: 'エビデンスケアラー', emoji: '💊', tagline: '根拠に基づいたアプローチで、確かな支援を提供する' },
    'analysis+stability': { title: 'リスクマネージャー', emoji: '🛡️', tagline: '緻密な分析と堅実な判断で、組織を守る番人' },
    'analysis+growth': { title: 'ラーニングアナリスト', emoji: '📚', tagline: '学びと分析を武器に、常に一歩先を行く知識人' },
    'creative+technical': { title: 'テックアーティスト', emoji: '🎮', tagline: '技術と創造性の融合で、誰も見たことのないものを作る' },
    'creative+income': { title: 'クリエイティブ・プロフェッショナル', emoji: '💎', tagline: 'センスを価値に変え、クリエイティブで稼ぐ実力派' },
    'creative+satisfaction': { title: 'パッションクリエイター', emoji: '🎭', tagline: '「好き」を原動力に、心から満足できるものを生み出す' },
    'creative+care': { title: 'ヒーリングアーティスト', emoji: '🌈', tagline: '表現の力で人の心に寄り添い、癒しと勇気を届ける' },
    'creative+stability': { title: 'クラフトマスター', emoji: '🪡', tagline: '確かな技巧と丁寧さで、長く愛されるものを作り上げる' },
    'creative+growth': { title: 'アバンギャルド', emoji: '🎪', tagline: '常に新しい表現を追い求め、進化し続けるクリエイター' },
    'technical+income': { title: 'ハイスペックエンジニア', emoji: '💻', tagline: '高度な専門性を経済的価値に直結させるプロフェッショナル' },
    'technical+satisfaction': { title: 'テックエバンジェリスト', emoji: '🌟', tagline: '技術への愛と誇りを持ち、その魅力を伝え広める伝道師' },
    'technical+care': { title: 'テックフォーグッド', emoji: '🩺', tagline: '技術の力で人を助ける、社会派エンジニア' },
    'technical+stability': { title: 'システムガーディアン', emoji: '🏰', tagline: '堅牢なシステムを構築し、安定した基盤を守る守護者' },
    'technical+growth': { title: 'テックパイオニア', emoji: '🧬', tagline: '最先端技術を追い求め、技術の未来を切り拓く開拓者' },
    'care+income': { title: 'プロフェッショナルケアラー', emoji: '🏥', tagline: '人を助ける専門性を高め、社会的にも経済的にも評価される' },
    'care+satisfaction': { title: 'ヒューマニスト', emoji: '🕊️', tagline: '人の笑顔が最大のやりがい。誰かの人生を照らす存在' },
    'care+stability': { title: 'ライフサポーター', emoji: '🌿', tagline: '安定した環境の中で、着実に人を支え続ける堅実な支援者' },
    'care+growth': { title: 'エンパワーメント・コーチ', emoji: '🌻', tagline: '自らも成長しながら、人の可能性を引き出す育成の達人' },
    'stability+income': { title: 'ウェルスビルダー', emoji: '🏦', tagline: '堅実な積み上げで、着実に資産と信頼を築く実務家' },
    'stability+satisfaction': { title: 'ライフバランサー', emoji: '⚖️', tagline: '安定と充実を両立し、穏やかに自分らしい人生を歩む' },
    'stability+growth': { title: 'ステディクライマー', emoji: '🧗', tagline: '着実に一歩ずつ登り続ける、ブレない成長志向の持ち主' },
    'growth+income': { title: 'キャリアロケット', emoji: '🚀', tagline: '成長と報酬の好循環を生み出す、上昇志向のキャリア構築者' },
    'growth+satisfaction': { title: 'セルフアクチュアライザー', emoji: '✨', tagline: '自己実現への道を楽しみながら、日々進化し続ける' },
    'income+satisfaction': { title: 'ライフウィナー', emoji: '🎯', tagline: '経済的成功とやりがいの両方を手に入れる、人生の勝者' },
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
  const growth = getGrowthArea(bottom1, bottom2, top1);
  sections.push({
    heading: '🌱 伸びしろ',
    body: growth,
  });

  // 4. バランス診断
  const balance = getBalanceDiagnosis(spread, avg, sorted.length);
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

const STAT_LABELS: Record<StatKey, string> = {
  satisfaction: '満足度', income: '年収', growth: '成長度', stability: '安定度',
  communication: 'コミュ力', planning: '企画力', analysis: '分析力',
  creative: '創造力', care: '支援力', technical: '技術力',
};

function getPersonalityTraits(top1: StatKey, top2: StatKey, top3: StatKey): string {
  const traitMap: Record<StatKey, string[]> = {
    satisfaction: ['自分の気持ちに正直で、「楽しい」「やりたい」という感覚を大切にするタイプ。損得よりも心の充実感で物事を判断できる直感力がある。'],
    income: ['目標を数字で捉え、成果にこだわれるタイプ。「頑張った分だけ報われたい」という健全な野心が、あなたの行動力の源泉。'],
    growth: ['「昨日の自分より今日の自分」が口癖になりそうな、根っからの成長志向。新しい環境や未知の挑戦にワクワクできる好奇心の持ち主。'],
    stability: ['慎重で着実、信頼される堅実タイプ。「石橋を叩いて渡る」慎重さは、リスクの高い場面で真価を発揮する。周囲から安心感を持たれやすい。'],
    communication: ['人との関わりの中でエネルギーを得るタイプ。初対面でも自然と打ち解けられ、相手の本音を引き出す力がある。'],
    planning: ['「こうしたらもっと面白くなるのに」と常にアイデアが湧いてくる企画脳の持ち主。構想を練るのが好きで、ゼロからイチを生み出す力がある。'],
    analysis: ['感覚より論理、直感より根拠を重視するタイプ。複雑な問題を前にすると、むしろテンションが上がる知的好奇心の持ち主。'],
    creative: ['「人と同じ」が苦手で、自分だけの表現や視点を大切にするタイプ。日常の中にも美しさや面白さを見出せる感性がある。'],
    care: ['困っている人を放っておけない、生まれながらのケアラー。相手の気持ちを察する共感力が高く、「ありがとう」が最大のモチベーション。'],
    technical: ['「なぜそうなるのか」を突き詰めたい探究心の持ち主。一つの分野を深く掘り下げることに喜びを感じる、職人気質なタイプ。'],
  };

  return `${traitMap[top1][0]}\n\nさらに${STAT_LABELS[top2]}と${STAT_LABELS[top3]}も高く、${getComboTrait(top1, top2)}`;
}

function getComboTrait(a: StatKey, b: StatKey): string {
  const key = [a, b].sort().join('+');
  const comboTraits: Record<string, string> = {
    'communication+planning': '人を巻き込みながら新しいプロジェクトを推進できる実行力を秘めています。',
    'communication+analysis': '相手の話を深く理解した上で、論理的に解決策を提示できるバランス感覚があります。',
    'communication+creative': '自分のアイデアを魅力的に伝え、人の心を動かす表現力が際立っています。',
    'communication+technical': '技術的な内容をわかりやすく伝えられる、エンジニアとビジネスの架け橋になれる素質があります。',
    'communication+care': '深い共感力と対話力で、人の心に寄り添える天性のカウンセラー気質があります。',
    'planning+analysis': '戦略を緻密に組み立て、データで裏付ける参謀としての素質が光ります。',
    'planning+creative': '既存の枠を超えた斬新なアイデアを実現可能な形に落とし込める稀有な能力を持っています。',
    'analysis+technical': '深い技術理解とデータ分析力で、複雑な技術課題を解決するスペシャリストの素質があります。',
    'creative+technical': '技術とアートの境界を越えて、テクノロジーで新しい体験を生み出す力があります。',
    'care+technical': '技術の力で社会課題を解決する、テック・フォー・グッドの精神を持っています。',
  };

  return comboTraits[key] ?? `${STAT_LABELS[a]}と${STAT_LABELS[b]}の掛け合わせが、あなたならではのユニークな強みになっています。`;
}

function getStrengths(top1: StatKey, top2: StatKey, stats: Record<StatKey, number>): string {
  const strengthMap: Record<StatKey, string> = {
    satisfaction: '自分軸で判断できるブレない価値観 — 流行や周囲の声に流されず、本当に大切なものを選び取れる',
    income: '成果への執着力と戦略的思考 — 目標達成に向けてリソースを最適配分できるビジネスセンス',
    growth: '自己変革力と学習スピード — 新しい知識やスキルを素早く吸収し、実践に落とし込む力',
    stability: 'リスク管理能力と継続力 — 長期的な視点で物事を捉え、一貫した行動を取り続ける力',
    communication: '対人影響力と場の空気を読む力 — 相手に合わせたコミュニケーションで信頼関係を構築する力',
    planning: '構想力とプロデュース力 — 複数の要素を組み合わせて、魅力的な企画を生み出すセンス',
    analysis: '問題の構造化能力 — 複雑な課題をシンプルに分解し、本質的な解決策を導く思考力',
    creative: '独自の審美眼と表現力 — 他の人には見えない角度から物事を捉え、形にする力',
    care: '共感力とホスピタリティ — 言葉にならない気持ちを汲み取り、適切なサポートを提供する力',
    technical: '専門性の深さと問題解決力 — 高度な技術課題に対して粘り強く取り組み、解を見つけ出す力',
  };

  const lines = [strengthMap[top1], strengthMap[top2]];

  // 隠れた強みを発見（上位でないが意外と高いスキル）
  const entries = Object.entries(stats) as [StatKey, number][];
  const avg = entries.reduce((s, [, v]) => s + v, 0) / entries.length;
  const hidden = entries
    .filter(([k, v]) => k !== top1 && k !== top2 && v >= avg + 1)
    .sort((a, b) => b[1] - a[1]);

  if (hidden.length > 0) {
    const [hk] = hidden[0];
    lines.push(`\n意外な隠れスキルとして${STAT_LABELS[hk as StatKey]}も平均以上。自覚していないかもしれませんが、いざという時に頼れる引き出しになります。`);
  }

  return lines.join('\n');
}

function getGrowthArea(bottom1: StatKey, bottom2: StatKey, top1: StatKey): string {
  const adviceMap: Record<StatKey, string> = {
    satisfaction: '効率や成果を追い求めるあまり、「自分は本当にこれがやりたいのか？」と立ち止まる時間を忘れがち。定期的に自分の心の声に耳を傾けてみて。',
    income: '「お金のためだけに働きたくない」という気持ちは素敵。ただし、経済的な余裕は選択肢の幅を広げてくれるもの。自分の価値を正当に主張する力も大切にしよう。',
    growth: '今の環境が心地よくても、それは「成長が止まっている」サインかも。小さくてもいいから、定期的に新しいことに挑戦する習慣をつけてみて。',
    stability: '変化を楽しめるのはあなたの長所。ただ、長期的なキャリアを考えると「守りの力」も重要。安定した基盤があってこそ、冒険できることもある。',
    communication: '一人で考え抜く力は素晴らしい。ただ、アイデアを実現するには仲間が必要。まずは「相談する」ことから始めてみて。意外な化学反応が起きるかも。',
    planning: '目の前のことに全力投球するのはあなたの強み。ただ、少し先の未来を描く時間を作ると、今の頑張りがもっと大きな成果につながるはず。',
    analysis: '直感で動ける行動力は武器。ただ「なぜうまくいったのか」「なぜ失敗したのか」を振り返る習慣をつけると、成功の再現性がグンと上がる。',
    creative: '論理的で確実なアプローチは信頼される。たまには「正解がわからないまま動く」ことも試してみて。思いがけないアイデアが生まれることがある。',
    care: '自分のことに集中できるのは立派な能力。ただ、人を助ける経験が視野を広げてくれることもある。ボランティアや後輩指導など、小さな一歩から。',
    technical: '幅広い視野は素晴らしい。一方で「これだけは誰にも負けない」という専門性を一つ持つと、キャリアの軸がグッと太くなる。',
  };

  return `${STAT_LABELS[bottom1]}が控えめなのは弱みではなく、${STAT_LABELS[top1]}に全力を注いできた証拠。\n\n${adviceMap[bottom1]}`;
}

function getBalanceDiagnosis(spread: number, avg: number, count: number): string {
  if (spread <= 4) {
    return 'ステータスが全体的にバランス良く伸びている「オールラウンダー型」。どんな環境にも適応できる柔軟性が最大の武器。特定の職種に縛られず、様々なキャリアパスの可能性を秘めています。一方で「何でもできるけど、これが一番」という軸を見つけると、さらにキャリアが加速するかも。';
  }
  if (spread <= 8) {
    return '得意分野がありつつも、他のスキルもしっかり伸びている「バランス型スペシャリスト」。専門性を活かしつつ、チームの中で幅広い役割をこなせるのが強み。「T字型人材」として、多くの企業が求める理想的なスキルバランスです。';
  }
  return '特定の分野に突き抜けた強みを持つ「スペシャリスト型」。この尖り方こそがあなたの個性であり最大の武器。得意分野では替えのきかない存在になれるポテンシャルがあります。苦手分野は無理に伸ばそうとせず、得意な仲間と補い合うチーム戦略がおすすめ。';
}

function getIdealEnvironment(top1: StatKey, top2: StatKey): string {
  const envMap: Record<StatKey, string[]> = {
    satisfaction: ['自分のペースで仕事ができる環境', '理念やビジョンに共感できる組織'],
    income: ['成果報酬型の評価制度がある環境', '実力次第で若手でも抜擢される組織'],
    growth: ['新規事業や新しい挑戦が歓迎される環境', '研修制度や学習支援が充実した組織'],
    stability: ['明確なルールや評価基準がある環境', '長期的なキャリアパスが見える組織'],
    communication: ['チームワークを重視するフラットな環境', '社内外の交流が活発な組織'],
    planning: ['裁量が大きく、提案が通りやすい環境', '新しいアイデアを歓迎する組織文化'],
    analysis: ['データドリブンな意思決定が行われる環境', '論理的な議論が歓迎される組織'],
    creative: ['自由な発想が許される環境', '多様性を尊重するカルチャーの組織'],
    care: ['チームの成長を大切にする環境', '社会的意義のある事業を行う組織'],
    technical: ['技術的チャレンジが豊富な環境', '専門性が正当に評価される組織'],
  };

  const envs = [...envMap[top1], ...envMap[top2]];
  return envs.map((e) => `• ${e}`).join('\n');
}

// ============================================================
// 診断結果レビュー用 AI 生成
// ============================================================

const TRAIT_LABEL_MAP: Record<TraitKey, string> = {
  communication: 'コミュニケーション',
  planning: '企画・戦略',
  analysis: 'ロジカル分析',
  stability: '堅実・安定',
  challenge: 'チャレンジ',
  creative: 'クリエイティブ',
  care: 'ケア・支援',
  technical: '技術・専門',
};

/** 診断結果のAIレビューの型 */
export interface DiagnosisAIReview {
  headline: string;
  emoji: string;
  sections: { heading: string; body: string }[];
}

/** Gemini Flash で診断結果のAIレビューを生成 */
export async function generateDiagnosisAIReview(
  primaryTrait: TraitKey,
  secondaryTrait: TraitKey,
  traits: Record<TraitKey, number>,
  stats?: Record<StatKey, number>,
): Promise<DiagnosisAIReview> {
  const sorted = (Object.entries(traits) as [TraitKey, number][]).sort((a, b) => b[1] - a[1]);
  const traitText = sorted.map(([k, v]) => `${TRAIT_LABEL_MAP[k]}:${v}`).join(',');
  const valueText = stats ? ` 価値観→満足度志向:${stats.satisfaction},年収志向:${stats.income}` : '';

  const prompt = `就活生向け性格診断レビュー。メイン:${TRAIT_LABEL_MAP[primaryTrait]}型,サブ:${TRAIT_LABEL_MAP[secondaryTrait]}型。スコア:${traitText}。${valueText}
JSON出力(これ以外出力しないで):
{"headline":"一言見出し15-25字","emoji":"絵文字1つ","sections":[{"heading":"🔮 あなたの本質","body":"本質的な性格を占い風に150-200字"},{"heading":"💫 隠された才能","body":"隠れた才能や可能性150-200字"},{"heading":"🗺️ 人生テーマ","body":"追い求めるテーマ具体例込み150-200字"},{"heading":"⚡ 覚醒のカギ","body":"更に魅力的になるアクション2-3個150-200字"},{"heading":"🌟 運命の仕事スタイル","body":"輝ける働き方と職種名2-3個150-200字"}]}
注意:前向き表現のみ、「あなたは〜」で語りかけ、スコアの数値差や組み合わせに具体的に言及`;

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
