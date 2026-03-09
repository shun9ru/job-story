import type { GameEvent } from '../types';

/**
 * 社会人編のイベント（8スロット × 3バリエーション = 24イベント）
 * 入社前の背景 → 入社1〜2年目 → 3〜5年目 → 将来ビジョン
 *
 * Event pools grouped by slot:
 * Slot 1: early-career (学生時代の背景)
 * Slot 2: early-career (入社先選び)
 * Slot 3: early-career (入社1年目)
 * Slot 4: early-career (入社2年目スキルアップ)
 * Slot 5: mid-career (入社3年目転機)
 * Slot 6: mid-career (副業・パラレル)
 * Slot 7: mid-career (チームでの役割)
 * Slot 8: future (10年後のビジョン)
 */

// ============================================================
// Slot 1: early-career step1 — 学生時代の背景
// ============================================================
const slot1Pool: GameEvent[] = [
  // --- Original ---
  {
    id: 'w-step1',
    step: 1,
    stage: 'early-career',
    title: 'まずはあなたの背景を教えて。どんな学生時代だった？',
    description: '社会人になる前のあなた。どんな経験が今の自分を作った？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w1-1',
        text: 'サークルやバイトで人との繋がりを広げた',
        emoji: '🤝',
        description: 'コミュニケーション能力と行動力が強み',
        effects: { communication: 3, satisfaction: 1 },
        unlockJobIds: ['corporate-sales', 'hr-sales', 'event-producer'],
      },
      {
        id: 'w1-2',
        text: '専門分野の勉強や研究に打ち込んだ',
        emoji: '📚',
        description: '知識の深さと論理的思考力が武器',
        effects: { technical: 2, analysis: 2 },
        unlockJobIds: ['researcher', 'data-scientist', 'pharmacist-industry'],
      },
      {
        id: 'w1-3',
        text: 'クリエイティブな活動に熱中した',
        emoji: '🎨',
        description: '表現力とアイデア力に自信がある',
        effects: { creative: 3, planning: 1 },
        unlockJobIds: ['graphic-designer', 'video-creator', 'copywriter'],
      },
      {
        id: 'w1-4',
        text: 'ボランティアや社会活動に力を入れた',
        emoji: '🌍',
        description: '社会貢献への意識と共感力が高い',
        effects: { care: 3, communication: 1 },
        unlockJobIds: ['social-worker', 'school-teacher', 'nurse'],
      },
    ],
  },
  // --- Alternative B ---
  {
    id: 'w-step1b',
    step: 1,
    stage: 'early-career',
    title: '学生時代、一番の「自分らしさ」はどこに出ていた？',
    description: '振り返ってみると、あなたはどんなタイプの学生だった？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w1b-1',
        text: '学園祭やイベントの企画運営で中心にいた',
        emoji: '🎪',
        description: '人を巻き込む力と計画力が光っていた',
        effects: { planning: 2, communication: 2 },
        unlockJobIds: ['event-producer', 'ad-planner', 'travel-planner'],
      },
      {
        id: 'w1b-2',
        text: 'プログラミングやモノづくりに没頭していた',
        emoji: '🛠️',
        description: '手を動かして何かを作ることが好きだった',
        effects: { technical: 3, creative: 1 },
        unlockJobIds: ['web-engineer', 'game-programmer', 'production-engineer'],
      },
      {
        id: 'w1b-3',
        text: '部活動で仲間と切磋琢磨していた',
        emoji: '⚽',
        description: 'チームワークと根性が自慢',
        effects: { communication: 2, growth: 2 },
        unlockJobIds: ['sports-trainer', 'police-fire', 'personal-sales'],
      },
      {
        id: 'w1b-4',
        text: '読書や映画鑑賞など一人の時間を大切にしていた',
        emoji: '📖',
        description: '内省的で、物事を深く考える力がある',
        effects: { analysis: 3, satisfaction: 1 },
        unlockJobIds: ['editor', 'librarian', 'university-researcher'],
      },
    ],
  },
  // --- Alternative C ---
  {
    id: 'w-step1c',
    step: 1,
    stage: 'early-career',
    title: '学生時代に得た「一番の武器」は何だと思う？',
    description: '社会に出る前に身につけた、あなたの最大の強みは？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w1c-1',
        text: '誰とでもすぐ打ち解けられるフレンドリーさ',
        emoji: '😄',
        description: '初対面の人にも物怖じしない社交性',
        effects: { communication: 3, care: 1 },
        unlockJobIds: ['hotel-staff', 'retail-sales', 'beauty-advisor'],
      },
      {
        id: 'w1c-2',
        text: '地道にコツコツ積み上げる忍耐力',
        emoji: '🧱',
        description: '継続する力と安定感が最大の武器',
        effects: { stability: 3, growth: 1 },
        unlockJobIds: ['accounting', 'general-admin', 'quality-control'],
      },
      {
        id: 'w1c-3',
        text: 'データや数字から本質を見抜く分析力',
        emoji: '🔍',
        description: '論理的に考え、根拠を持って判断できる',
        effects: { analysis: 3, technical: 1 },
        unlockJobIds: ['actuary', 'market-researcher', 'qa-engineer'],
      },
      {
        id: 'w1c-4',
        text: '人の気持ちに寄り添える共感力',
        emoji: '💗',
        description: '困っている人を放っておけない優しさ',
        effects: { care: 3, satisfaction: 1 },
        unlockJobIds: ['nursery-teacher', 'care-worker', 'clinical-technologist'],
      },
    ],
  },
];

// ============================================================
// Slot 2: early-career step2 — 入社先選び
// ============================================================
const slot2Pool: GameEvent[] = [
  // --- Original ---
  {
    id: 'w-step2',
    step: 2,
    stage: 'early-career',
    title: 'どんな会社に入社した？',
    description: '就活を経て、あなたが選んだ会社は？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w2-1',
        text: '成長中のIT・Web企業',
        emoji: '💻',
        description: '変化が早く、若手にもチャンスが多い',
        effects: { growth: 3, income: 1 },
        unlockJobIds: ['web-engineer', 'it-pm', 'marketing', 'digital-marketer'],
      },
      {
        id: 'w2-2',
        text: '大手メーカー・金融機関',
        emoji: '🏢',
        description: '安定した基盤と充実した研修制度',
        effects: { stability: 3, income: 1 },
        unlockJobIds: ['production-manager', 'bank-staff', 'quality-control', 'general-admin'],
      },
      {
        id: 'w2-3',
        text: '広告・メディア・エンタメ企業',
        emoji: '🎬',
        description: 'クリエイティブな環境で自由に働ける',
        effects: { creative: 2, communication: 2 },
        unlockJobIds: ['ad-planner', 'media-planner', 'journalist', 'video-creator'],
      },
      {
        id: 'w2-4',
        text: '医療・福祉・教育・公務員',
        emoji: '❤️',
        description: '人を支え、社会に貢献する環境',
        effects: { care: 2, stability: 2 },
        unlockJobIds: ['nurse', 'school-teacher', 'care-worker', 'local-civil-servant'],
      },
    ],
  },
  // --- Alternative B ---
  {
    id: 'w-step2b',
    step: 2,
    stage: 'early-career',
    title: '就活で最終的にあなたが重視した「決め手」は？',
    description: '複数の内定先から、最終的に何を基準に選んだ？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w2b-1',
        text: '「若いうちから裁量権がある」成長環境',
        emoji: '🚀',
        description: '年次関係なくチャレンジできる風土に惹かれた',
        effects: { growth: 3, creative: 1 },
        unlockJobIds: ['se', 'digital-marketer', 'sns-marketer', 'customer-success'],
      },
      {
        id: 'w2b-2',
        text: '「福利厚生と安定」の大企業',
        emoji: '🏛️',
        description: '長く安心して働ける環境が一番だと思った',
        effects: { stability: 3, income: 1 },
        unlockJobIds: ['general-affairs', 'legal-staff', 'procurement', 'bank-staff'],
      },
      {
        id: 'w2b-3',
        text: '「好きなことを仕事にできる」クリエイティブ系',
        emoji: '🎨',
        description: '情熱を注げる仕事でなければ意味がない',
        effects: { creative: 3, satisfaction: 1 },
        unlockJobIds: ['animator', 'game-designer', 'fashion-designer', 'photographer'],
      },
      {
        id: 'w2b-4',
        text: '「人の役に立てる」社会貢献型の職場',
        emoji: '🤲',
        description: '誰かの笑顔のために働きたいと思った',
        effects: { care: 3, communication: 1 },
        unlockJobIds: ['doctor', 'pharmacist', 'social-worker', 'nursery-teacher'],
      },
    ],
  },
  // --- Alternative C ---
  {
    id: 'w-step2c',
    step: 2,
    stage: 'early-career',
    title: '入社初日、オフィスに着いた。どんな雰囲気だった？',
    description: '新しい職場の第一印象が、これからのキャリアを方向づける。',
    relatedJobIds: [],
    choices: [
      {
        id: 'w2c-1',
        text: 'オープンなフロアにモニターが並ぶテック企業',
        emoji: '🖥️',
        description: 'スピード感と技術力の高さを感じた',
        effects: { technical: 2, growth: 2 },
        unlockJobIds: ['infra-engineer', 'ai-engineer', 'security-engineer', 'web-engineer'],
      },
      {
        id: 'w2c-2',
        text: '商談ブースが並ぶ活気ある営業フロア',
        emoji: '📞',
        description: '電話が鳴り続ける、エネルギッシュな空間',
        effects: { communication: 3, income: 1 },
        unlockJobIds: ['corporate-sales', 'mr', 'real-estate-sales', 'insurance-sales'],
      },
      {
        id: 'w2c-3',
        text: 'おしゃれなデスクにデザイン書が積まれたスタジオ',
        emoji: '✏️',
        description: 'センスとこだわりが求められる雰囲気',
        effects: { creative: 2, planning: 2 },
        unlockJobIds: ['ui-ux-designer', 'interior-designer', 'web-designer', 'graphic-designer'],
      },
      {
        id: 'w2c-4',
        text: '白衣や制服が行き交う専門的な施設',
        emoji: '🔬',
        description: '専門性と責任感が求められる現場だった',
        effects: { technical: 2, care: 2 },
        unlockJobIds: ['physical-therapist', 'dental-hygienist', 'dietitian', 'researcher'],
      },
    ],
  },
];

// ============================================================
// Slot 3: early-career step3 — 入社1年目
// ============================================================
const slot3Pool: GameEvent[] = [
  // --- Original ---
  {
    id: 'w-step3',
    step: 3,
    stage: 'early-career',
    title: '入社1年目、大きなプロジェクトが始まった！',
    description: '上司から重要なプロジェクトへの参加を打診された。どう向き合う？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w3-1',
        text: 'リーダーに立候補する',
        emoji: '🙋',
        description: 'プレッシャーはあるが、大きく成長できるチャンス',
        effects: { growth: 3, communication: 2, planning: 1 },
        unlockJobIds: ['management-consultant', 'it-pm', 'construction-manager', 'restaurant-manager'],
      },
      {
        id: 'w3-2',
        text: '専門スキルを磨く担当になる',
        emoji: '⚙️',
        description: '自分の得意分野を深掘りして貢献する',
        effects: { technical: 3, analysis: 2 },
        unlockJobIds: ['ai-engineer', 'researcher', 'actuary', 'security-engineer'],
      },
      {
        id: 'w3-3',
        text: 'チームのサポート役に回る',
        emoji: '🫶',
        description: 'メンバーが力を発揮できるよう裏方で支える',
        effects: { care: 2, stability: 2, satisfaction: 1 },
        unlockJobIds: ['secretary', 'general-affairs', 'hr-staff', 'tech-support'],
      },
    ],
  },
  // --- Alternative B ---
  {
    id: 'w-step3b',
    step: 3,
    stage: 'early-career',
    title: '入社1年目、初めての大失敗をしてしまった…',
    description: '重要な仕事でミスをしてしまった。ここからどう立ち直る？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w3b-1',
        text: '原因を徹底分析して再発防止策を作る',
        emoji: '📝',
        description: '失敗を仕組みで解決する姿勢が評価された',
        effects: { analysis: 3, planning: 2 },
        unlockJobIds: ['qa-engineer', 'internal-audit', 'production-engineer', 'it-consultant'],
      },
      {
        id: 'w3b-2',
        text: '先輩や上司に素直に相談して助けを求める',
        emoji: '🙏',
        description: '謙虚さと素直さが信頼につながった',
        effects: { communication: 3, care: 2 },
        unlockJobIds: ['hr-staff', 'customer-success', 'social-insurance-labor', 'hotel-staff'],
      },
      {
        id: 'w3b-3',
        text: '悔しさをバネに誰よりも努力して巻き返す',
        emoji: '🔥',
        description: '負けず嫌いな性格が原動力になった',
        effects: { growth: 3, technical: 1, satisfaction: 1 },
        unlockJobIds: ['securities-sales', 'personal-sales', 'pilot', 'lawyer'],
      },
    ],
  },
  // --- Alternative C ---
  {
    id: 'w-step3c',
    step: 3,
    stage: 'early-career',
    title: '入社1年目、尊敬する先輩の仕事ぶりに感動！',
    description: '先輩の仕事を間近で見て「自分もこうなりたい」と思った。何に惹かれた？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w3c-1',
        text: 'クライアントを一瞬で虜にするプレゼン力',
        emoji: '🎤',
        description: '言葉の力で人を動かすスキルに憧れた',
        effects: { communication: 3, planning: 1, creative: 1 },
        unlockJobIds: ['ad-planner', 'pr', 'management-consultant', 'overseas-sales'],
      },
      {
        id: 'w3c-2',
        text: '誰も解けない技術的課題をサクッと解決する力',
        emoji: '💡',
        description: '圧倒的な技術力にシビれた',
        effects: { technical: 3, analysis: 2 },
        unlockJobIds: ['se', 'infra-engineer', 'energy-engineer', 'architect'],
      },
      {
        id: 'w3c-3',
        text: '困っている後輩に寄り添う優しいマネジメント',
        emoji: '🌱',
        description: '人を大切にするリーダーシップに感銘を受けた',
        effects: { care: 3, communication: 1, satisfaction: 1 },
        unlockJobIds: ['school-teacher', 'nursery-teacher', 'sports-trainer', 'hr-consultant'],
      },
    ],
  },
];

// ============================================================
// Slot 4: early-career step4 — 入社2年目スキルアップ
// ============================================================
const slot4Pool: GameEvent[] = [
  // --- Original ---
  {
    id: 'w-step4',
    step: 4,
    stage: 'early-career',
    title: '入社2年目、スキルアップのために何を学ぶ？',
    description: '仕事にも慣れてきた。次のレベルに行くために、何に投資する？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w4-1',
        text: '語学（英語・中国語など）',
        emoji: '🌐',
        description: 'グローバルに活躍できるスキルを身につける',
        effects: { communication: 2, income: 1, growth: 2 },
        unlockJobIds: ['overseas-sales', 'translator', 'trading-company', 'trade-admin', 'hotel-staff'],
      },
      {
        id: 'w4-2',
        text: 'プログラミングやデータ分析',
        emoji: '👨‍💻',
        description: 'テクノロジースキルを武器にする',
        effects: { technical: 3, analysis: 1, growth: 1 },
        unlockJobIds: ['data-scientist', 'digital-marketer', 'web-engineer', 'ai-engineer'],
      },
      {
        id: 'w4-3',
        text: '簿記やFPなどの資格取得',
        emoji: '📋',
        description: '専門資格で市場価値を高める',
        effects: { stability: 2, analysis: 2, income: 1 },
        unlockJobIds: ['accounting', 'fp', 'tax-accountant', 'internal-audit', 'customs-broker'],
      },
      {
        id: 'w4-4',
        text: 'デザインや映像制作',
        emoji: '🎥',
        description: 'クリエイティブスキルを磨く',
        effects: { creative: 3, growth: 1, satisfaction: 1 },
        unlockJobIds: ['web-designer', 'graphic-designer', 'video-creator', 'interior-designer'],
      },
    ],
  },
  // --- Alternative B ---
  {
    id: 'w-step4b',
    step: 4,
    stage: 'early-career',
    title: '入社2年目、休日の過ごし方が変わってきた。何に時間を使ってる？',
    description: '仕事に余裕が出てきて、自己投資の時間が増えてきた。',
    relatedJobIds: [],
    choices: [
      {
        id: 'w4b-1',
        text: '社外の勉強会やセミナーに参加',
        emoji: '🎓',
        description: '業界の最新トレンドをキャッチアップ',
        effects: { growth: 3, communication: 1, analysis: 1 },
        unlockJobIds: ['management-consultant', 'it-consultant', 'digital-marketer', 'market-researcher'],
      },
      {
        id: 'w4b-2',
        text: '趣味の延長で作品づくりに没頭',
        emoji: '🎹',
        description: '仕事とは違う創造性を伸ばしている',
        effects: { creative: 3, satisfaction: 1, technical: 1 },
        unlockJobIds: ['sound-creator', 'animator', 'game-designer', 'patissier'],
      },
      {
        id: 'w4b-3',
        text: '体力づくりやマインドフルネスに注力',
        emoji: '🧘',
        description: '心身のコンディションを整えることが最優先',
        effects: { stability: 2, satisfaction: 2, care: 1 },
        unlockJobIds: ['sports-trainer', 'physical-therapist', 'dietitian', 'nurse'],
      },
      {
        id: 'w4b-4',
        text: '異業種交流会で人脈を拡大中',
        emoji: '🍻',
        description: '会社の外に広がるネットワークが財産',
        effects: { communication: 3, planning: 1, income: 1 },
        unlockJobIds: ['pr', 'real-estate-sales', 'entertainment-manager', 'event-producer'],
      },
    ],
  },
  // --- Alternative C ---
  {
    id: 'w-step4c',
    step: 4,
    stage: 'early-career',
    title: '入社2年目、上司から「もうワンランク上を目指せ」と言われた。何をする？',
    description: '期待されている今こそ、次のステップに向けて動くとき。',
    relatedJobIds: [],
    choices: [
      {
        id: 'w4c-1',
        text: '難関資格の勉強を始める',
        emoji: '📕',
        description: '国家資格や専門資格に本気で挑む',
        effects: { analysis: 2, stability: 2, growth: 1 },
        unlockJobIds: ['lawyer', 'judicial-scrivener', 'tax-accountant', 'social-insurance-labor'],
      },
      {
        id: 'w4c-2',
        text: '海外研修や留学の制度に応募する',
        emoji: '✈️',
        description: 'グローバルな視野を手に入れる',
        effects: { growth: 3, communication: 1, income: 1 },
        unlockJobIds: ['trading-company', 'overseas-sales', 'translator', 'national-civil-servant'],
      },
      {
        id: 'w4c-3',
        text: '社内の新規事業プロジェクトに手を挙げる',
        emoji: '🌟',
        description: 'ゼロからイチを作る経験を積む',
        effects: { planning: 2, creative: 2, growth: 1 },
        unlockJobIds: ['product-planner', 'real-estate-developer', 'marketing', 'it-pm'],
      },
      {
        id: 'w4c-4',
        text: '業務改善を提案して現場のエースになる',
        emoji: '📊',
        description: '日々の仕事の中で結果を出して認められる',
        effects: { technical: 2, planning: 2, stability: 1 },
        unlockJobIds: ['production-manager', 'logistics-manager', 'procurement', 'quality-control'],
      },
    ],
  },
];

// ============================================================
// Slot 5: mid-career step5 — 入社3年目転機
// ============================================================
const slot5Pool: GameEvent[] = [
  // --- Original ---
  {
    id: 'w-step5',
    step: 5,
    stage: 'mid-career',
    title: '入社3年目、キャリアの転機が訪れた',
    description: '一人前にできるようになった。ここでキャリアの選択肢が広がる。',
    relatedJobIds: [],
    choices: [
      {
        id: 'w5-1',
        text: '新しい部署に異動してマーケティングに挑戦',
        emoji: '📊',
        description: '社内で新しいスキルセットを獲得',
        effects: { growth: 2, planning: 2, creative: 1 },
        unlockJobIds: ['marketing', 'sns-marketer', 'market-researcher', 'product-planner'],
      },
      {
        id: 'w5-2',
        text: '転職してコンサル業界へ',
        emoji: '🔄',
        description: '多くの企業の課題解決に関わる',
        effects: { growth: 3, income: 2, analysis: 1 },
        unlockJobIds: ['management-consultant', 'it-consultant', 'hr-consultant', 'environmental-consultant'],
      },
      {
        id: 'w5-3',
        text: '今の仕事を極めてスペシャリストに',
        emoji: '🎯',
        description: '同じ領域で実力を高めてエキスパートを目指す',
        effects: { technical: 3, stability: 1, income: 1 },
        unlockJobIds: ['researcher', 'architect', 'lawyer', 'energy-engineer', 'pharmacist-industry'],
      },
      {
        id: 'w5-4',
        text: '地方移住して新しいライフスタイルに挑戦',
        emoji: '🏡',
        description: '都会を離れて、自然の中で新しい働き方を',
        effects: { satisfaction: 3, care: 1, growth: 1 },
        unlockJobIds: ['farmer', 'local-civil-servant', 'chef', 'travel-planner', 'librarian'],
      },
    ],
  },
  // --- Alternative B ---
  {
    id: 'w-step5b',
    step: 5,
    stage: 'mid-career',
    title: '入社3年目、同期との差が見えてきた。あなたの強みは？',
    description: '3年目になると得意・不得意がはっきりしてくる。あなたが周囲から評価されているのは？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w5b-1',
        text: '「あの人に聞けばわかる」と言われる専門知識',
        emoji: '🧠',
        description: '特定分野のスペシャリストとして頼りにされている',
        effects: { technical: 3, analysis: 1, stability: 1 },
        unlockJobIds: ['patent-ip', 'se', 'actuary', 'security-engineer', 'pharmacist-industry'],
      },
      {
        id: 'w5b-2',
        text: '「あの人がいるとチームが明るくなる」ムードメーカー力',
        emoji: '☀️',
        description: '人間関係を円滑にする力が大きな武器',
        effects: { communication: 3, satisfaction: 1, care: 1 },
        unlockJobIds: ['hr-sales', 'entertainment-manager', 'hairdresser', 'retail-sales', 'hotel-staff'],
      },
      {
        id: 'w5b-3',
        text: '「企画書がいつも通る」提案力と発想力',
        emoji: '💡',
        description: 'アイデアを形にして人を説得する力',
        effects: { creative: 2, planning: 2, growth: 1 },
        unlockJobIds: ['ad-planner', 'product-planner', 'game-designer', 'pr', 'copywriter'],
      },
      {
        id: 'w5b-4',
        text: '「数字に強い」と言われる分析・管理能力',
        emoji: '📈',
        description: 'データに基づいた判断で信頼を得ている',
        effects: { analysis: 3, income: 1, planning: 1 },
        unlockJobIds: ['data-scientist', 'investment-banker', 'fp', 'accounting', 'market-researcher'],
      },
    ],
  },
  // --- Alternative C ---
  {
    id: 'w-step5c',
    step: 5,
    stage: 'mid-career',
    title: '入社3年目、ヘッドハンターから連絡が来た！',
    description: '思いがけない転職のオファー。どう対応する？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w5c-1',
        text: '外資系企業に転職して年収アップを狙う',
        emoji: '💰',
        description: '実力主義の世界でチャレンジする',
        effects: { income: 3, growth: 1, analysis: 1 },
        unlockJobIds: ['investment-banker', 'securities-sales', 'management-consultant', 'overseas-sales'],
      },
      {
        id: 'w5c-2',
        text: 'スタートアップに飛び込んで立ち上げに参加',
        emoji: '🔥',
        description: '少人数で何でもやる環境で急成長',
        effects: { growth: 3, creative: 1, planning: 1 },
        unlockJobIds: ['web-engineer', 'ui-ux-designer', 'digital-marketer', 'customer-success'],
      },
      {
        id: 'w5c-3',
        text: 'オファーは断り、今の会社で昇進を目指す',
        emoji: '🏢',
        description: '積み上げた信頼と実績を活かす',
        effects: { stability: 3, communication: 1, income: 1 },
        unlockJobIds: ['general-admin', 'legal-staff', 'production-manager', 'bank-staff'],
      },
      {
        id: 'w5c-4',
        text: '業界は変えず、より社会貢献度の高い組織へ移る',
        emoji: '🌿',
        description: '自分のスキルを社会のために使いたい',
        effects: { care: 3, satisfaction: 1, growth: 1 },
        unlockJobIds: ['environmental-consultant', 'social-worker', 'national-civil-servant', 'school-teacher'],
      },
    ],
  },
];

// ============================================================
// Slot 6: mid-career step6 — 副業・パラレルキャリア
// ============================================================
const slot6Pool: GameEvent[] = [
  // --- Original ---
  {
    id: 'w-step6',
    step: 6,
    stage: 'mid-career',
    title: '副業・パラレルキャリアに興味が出てきた',
    description: '本業に加えて、もう一つの「仕事の顔」を持つ時代。何に挑戦する？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w6-1',
        text: 'ブログやSNSで情報発信',
        emoji: '✍️',
        description: '自分の知見をコンテンツにして届ける',
        effects: { creative: 2, communication: 2, income: 1 },
        unlockJobIds: ['sns-marketer', 'copywriter', 'journalist', 'editor'],
      },
      {
        id: 'w6-2',
        text: 'フリーランスとして技術案件を受注',
        emoji: '💻',
        description: 'スキルを直接お金に変える経験',
        effects: { technical: 2, income: 2, growth: 1 },
        unlockJobIds: ['web-engineer', 'web-designer', 'photographer', 'translator'],
      },
      {
        id: 'w6-3',
        text: '投資や資産運用を本格的に開始',
        emoji: '📈',
        description: 'お金の知識を深めて将来に備える',
        effects: { analysis: 2, income: 2, stability: 1 },
        unlockJobIds: ['fp', 'securities-sales', 'investment-banker', 'actuary'],
      },
      {
        id: 'w6-4',
        text: '社外コミュニティやNPO活動に参加',
        emoji: '🤲',
        description: '会社の外で視野を広げ、人脈を作る',
        effects: { care: 2, communication: 2, satisfaction: 1 },
        unlockJobIds: ['social-worker', 'hr-consultant', 'event-producer', 'school-teacher'],
      },
    ],
  },
  // --- Alternative B ---
  {
    id: 'w-step6b',
    step: 6,
    stage: 'mid-career',
    title: '仕事以外の時間で「もう一つの名刺」を持つなら？',
    description: '本業だけではない、あなたの新しい一面。何を始める？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w6b-1',
        text: '週末だけの小さなお店を開く（カフェ・雑貨など）',
        emoji: '☕',
        description: '自分の世界観を形にする場所を持つ',
        effects: { creative: 2, satisfaction: 2, planning: 1 },
        unlockJobIds: ['chef', 'patissier', 'restaurant-manager', 'interior-designer'],
      },
      {
        id: 'w6b-2',
        text: 'プログラミングで個人アプリを開発・公開',
        emoji: '📱',
        description: '自分のプロダクトを世に出す経験',
        effects: { technical: 3, creative: 1, income: 1 },
        unlockJobIds: ['game-programmer', 'web-engineer', 'ai-engineer', 'se'],
      },
      {
        id: 'w6b-3',
        text: '地域のスポーツチームでコーチを務める',
        emoji: '🏃',
        description: '人を教え、成長を見守る喜び',
        effects: { care: 3, communication: 1, satisfaction: 1 },
        unlockJobIds: ['sports-trainer', 'cram-teacher', 'school-teacher', 'nursery-teacher'],
      },
      {
        id: 'w6b-4',
        text: '専門知識を活かしてオンライン講師を始める',
        emoji: '🎓',
        description: '教えることで自分の理解も深まる',
        effects: { communication: 2, technical: 1, income: 2 },
        unlockJobIds: ['university-researcher', 'cram-teacher', 'it-consultant', 'fp'],
      },
    ],
  },
  // --- Alternative C ---
  {
    id: 'w-step6c',
    step: 6,
    stage: 'mid-career',
    title: '仕事とプライベートのバランスを見直す時期が来た',
    description: 'がむしゃらに働いてきたけど、そろそろ「自分の人生」も考えたい。',
    relatedJobIds: [],
    choices: [
      {
        id: 'w6c-1',
        text: 'ワークライフバランス重視に切り替える',
        emoji: '⚖️',
        description: '効率的に働いて、自分の時間も大切にする',
        effects: { satisfaction: 3, stability: 1, care: 1 },
        unlockJobIds: ['general-affairs', 'local-civil-servant', 'librarian', 'secretary'],
      },
      {
        id: 'w6c-2',
        text: '新しい資格に挑戦して市場価値を上げる',
        emoji: '📝',
        description: '将来の選択肢を広げるための自己投資',
        effects: { growth: 2, analysis: 2, income: 1 },
        unlockJobIds: ['tax-accountant', 'judicial-scrivener', 'customs-broker', 'social-insurance-labor'],
      },
      {
        id: 'w6c-3',
        text: '趣味に本気で打ち込んで心のリフレッシュ',
        emoji: '🎸',
        description: '仕事だけの人生にならないように',
        effects: { creative: 2, satisfaction: 2, growth: 1 },
        unlockJobIds: ['sound-creator', 'photographer', 'video-creator', 'fashion-designer'],
      },
      {
        id: 'w6c-4',
        text: 'ボランティア活動を通じて社会との接点を増やす',
        emoji: '🤝',
        description: '仕事では得られない充実感を求めて',
        effects: { care: 3, communication: 1, satisfaction: 1 },
        unlockJobIds: ['social-worker', 'care-worker', 'environmental-consultant', 'farmer'],
      },
    ],
  },
];

// ============================================================
// Slot 7: mid-career step7 — チームでの役割
// ============================================================
const slot7Pool: GameEvent[] = [
  // --- Original ---
  {
    id: 'w-step7',
    step: 7,
    stage: 'mid-career',
    title: '後輩が増えてきた。チームでのあなたの役割は？',
    description: '中堅社員として、チームの中でどんな存在になっている？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w7-1',
        text: 'プロジェクトマネージャーとして全体を統括',
        emoji: '🎯',
        description: 'スケジュール・予算・メンバーを管理するリーダー',
        effects: { planning: 3, communication: 1, income: 1 },
        unlockJobIds: ['it-pm', 'construction-manager', 'production-manager', 'logistics-manager'],
      },
      {
        id: 'w7-2',
        text: '後輩のメンターとして育成に注力',
        emoji: '🌟',
        description: '次世代を育てることが自分の成長にもつながる',
        effects: { care: 3, communication: 1 },
        unlockJobIds: ['school-teacher', 'cram-teacher', 'hr-staff', 'sports-trainer'],
      },
      {
        id: 'w7-3',
        text: '技術のスペシャリストとしてチームを牽引',
        emoji: '🔧',
        description: '難しい課題は自分が解決する、頼れるエキスパート',
        effects: { technical: 3, analysis: 1 },
        unlockJobIds: ['security-engineer', 'ai-engineer', 'architect', 'energy-engineer'],
      },
      {
        id: 'w7-4',
        text: 'クライアント対応のエースとして活躍',
        emoji: '🤝',
        description: '社外との信頼関係を構築し、ビジネスを拡大',
        effects: { communication: 3, income: 1 },
        unlockJobIds: ['management-consultant', 'securities-sales', 'overseas-sales', 'insurance-sales'],
      },
    ],
  },
  // --- Alternative B ---
  {
    id: 'w-step7b',
    step: 7,
    stage: 'mid-career',
    title: '中堅社員になった今、会議であなたが求められる役割は？',
    description: '若手でもベテランでもない。だからこそ果たせる役割がある。',
    relatedJobIds: [],
    choices: [
      {
        id: 'w7b-1',
        text: '議論を整理して結論に導くファシリテーター',
        emoji: '🗂️',
        description: 'バラバラな意見をまとめて合意形成する力',
        effects: { planning: 2, communication: 2, analysis: 1 },
        unlockJobIds: ['hr-consultant', 'it-pm', 'management-consultant', 'general-admin'],
      },
      {
        id: 'w7b-2',
        text: 'データを元に根拠ある提案をするアナリスト',
        emoji: '📊',
        description: '感覚ではなく数字で語ることで信頼される',
        effects: { analysis: 3, technical: 1, income: 1 },
        unlockJobIds: ['data-scientist', 'market-researcher', 'actuary', 'digital-marketer'],
      },
      {
        id: 'w7b-3',
        text: '誰も思いつかないアイデアを出すクリエイター',
        emoji: '✨',
        description: '発想力でチームに新しい風を吹き込む',
        effects: { creative: 3, growth: 1, satisfaction: 1 },
        unlockJobIds: ['game-designer', 'copywriter', 'ad-planner', 'animator'],
      },
      {
        id: 'w7b-4',
        text: '部署間の橋渡しをする調整役',
        emoji: '🌉',
        description: '社内政治も含めて人間関係をつなぐ力',
        effects: { communication: 2, care: 2, planning: 1 },
        unlockJobIds: ['general-affairs', 'procurement', 'trade-admin', 'hr-staff'],
      },
    ],
  },
  // --- Alternative C ---
  {
    id: 'w-step7c',
    step: 7,
    stage: 'mid-career',
    title: '部下から「理想の上司アンケート」で1位に！その理由は？',
    description: '後輩たちからの評価が高い。彼らが見ているあなたの魅力とは？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w7c-1',
        text: '「いつも的確な判断をしてくれる」決断力',
        emoji: '⚡',
        description: '迷ったときに頼れる存在として信頼されている',
        effects: { planning: 3, income: 1, growth: 1 },
        unlockJobIds: ['construction-manager', 'logistics-manager', 'pilot', 'restaurant-manager'],
      },
      {
        id: 'w7c-2',
        text: '「話を最後まで聞いてくれる」傾聴力',
        emoji: '👂',
        description: '相手の気持ちを受け止める姿勢が安心感を生む',
        effects: { care: 3, communication: 1, satisfaction: 1 },
        unlockJobIds: ['hr-staff', 'social-worker', 'school-teacher', 'physical-therapist'],
      },
      {
        id: 'w7c-3',
        text: '「何でも知ってて何でもできる」万能さ',
        emoji: '🦸',
        description: '幅広い知識と対応力で頼りにされている',
        effects: { technical: 2, analysis: 2, growth: 1 },
        unlockJobIds: ['infra-engineer', 'se', 'production-engineer', 'surveyor'],
      },
      {
        id: 'w7c-4',
        text: '「一緒に仕事すると楽しい」ポジティブさ',
        emoji: '🌈',
        description: 'チームの雰囲気を明るくするムードメーカー',
        effects: { communication: 2, satisfaction: 2, creative: 1 },
        unlockJobIds: ['beauty-advisor', 'hairdresser', 'entertainment-manager', 'event-producer'],
      },
    ],
  },
];

// ============================================================
// Slot 8: future step8 — 10年後のビジョン
// ============================================================
const slot8Pool: GameEvent[] = [
  // --- Original ---
  {
    id: 'w-step8',
    step: 8,
    stage: 'future',
    title: '10年後のあなた、どんなキャリアを描く？',
    description: 'キャリアの基盤ができてきた。これからの人生で、どんな働き方を目指す？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w8-1',
        text: 'マネージャーとしてチームを率いる',
        emoji: '👔',
        description: '人を育て、チームで大きな成果を出すリーダーへ',
        effects: { communication: 3, income: 2, planning: 1 },
        unlockJobIds: ['corporate-sales', 'it-pm', 'construction-manager', 'restaurant-manager', 'hr-staff'],
      },
      {
        id: 'w8-2',
        text: '専門性を極めてプロフェッショナルに',
        emoji: '🏅',
        description: '業界トップの専門家として活躍',
        effects: { technical: 3, analysis: 1, income: 2 },
        unlockJobIds: ['data-scientist', 'architect', 'actuary', 'patent-ip', 'pilot'],
      },
      {
        id: 'w8-3',
        text: '起業・独立して自分の力で挑戦する',
        emoji: '🦅',
        description: '自分のビジョンを実現するために独立',
        effects: { growth: 3, creative: 2, satisfaction: 1 },
        unlockJobIds: ['web-designer', 'photographer', 'chef', 'hairdresser', 'sports-trainer'],
      },
      {
        id: 'w8-4',
        text: '社会貢献度の高い仕事にシフトする',
        emoji: '🌎',
        description: '利益だけでなく、人や社会のために働く',
        effects: { care: 3, satisfaction: 2 },
        unlockJobIds: ['social-worker', 'school-teacher', 'environmental-consultant', 'police-fire', 'sdf', 'curator'],
      },
    ],
  },
  // --- Alternative B ---
  {
    id: 'w-step8b',
    step: 8,
    stage: 'future',
    title: '10年後の自分に手紙を書くとしたら、何を伝える？',
    description: '未来の自分が読む手紙。あなたが一番大切にしたい価値観は？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w8b-1',
        text: '「好きなことを仕事にできていますか？」',
        emoji: '❤️‍🔥',
        description: '情熱を持って働き続けることが最大の幸せ',
        effects: { creative: 3, satisfaction: 2, growth: 1 },
        unlockJobIds: ['game-designer', 'animator', 'fashion-designer', 'sound-creator', 'video-creator'],
      },
      {
        id: 'w8b-2',
        text: '「家族や大切な人と幸せに暮らしていますか？」',
        emoji: '🏠',
        description: '仕事と私生活のバランスが取れた人生',
        effects: { stability: 3, care: 2, satisfaction: 1 },
        unlockJobIds: ['local-civil-servant', 'general-affairs', 'nursery-teacher', 'dietitian', 'librarian'],
      },
      {
        id: 'w8b-3',
        text: '「社会に大きなインパクトを与えていますか？」',
        emoji: '🌏',
        description: 'スケールの大きな仕事で世の中を変えたい',
        effects: { growth: 3, planning: 2, income: 1 },
        unlockJobIds: ['management-consultant', 'journalist', 'national-civil-servant', 'real-estate-developer', 'ai-engineer'],
      },
      {
        id: 'w8b-4',
        text: '「誰かの人生を変えるような存在になれていますか？」',
        emoji: '🤝',
        description: '一人ひとりに寄り添い、影響を与える人生',
        effects: { care: 3, communication: 2, satisfaction: 1 },
        unlockJobIds: ['doctor', 'school-teacher', 'social-worker', 'lawyer', 'hr-consultant'],
      },
    ],
  },
  // --- Alternative C ---
  {
    id: 'w-step8c',
    step: 8,
    stage: 'future',
    title: '10年後、あなたの名刺の肩書きはどうなっている？',
    description: 'キャリアの集大成。どんな立場で働いていたい？',
    relatedJobIds: [],
    choices: [
      {
        id: 'w8c-1',
        text: 'CxO（経営幹部）として会社をリードしている',
        emoji: '🏆',
        description: '経営の最前線で意思決定を行うトップリーダー',
        effects: { planning: 3, income: 2, communication: 1 },
        unlockJobIds: ['investment-banker', 'management-consultant', 'corporate-sales', 'it-pm', 'trading-company'],
      },
      {
        id: 'w8c-2',
        text: '「○○の第一人者」として業界で名前が知られている',
        emoji: '🎖️',
        description: '専門分野で唯一無二の存在に',
        effects: { technical: 3, analysis: 2, growth: 1 },
        unlockJobIds: ['researcher', 'university-researcher', 'architect', 'energy-engineer', 'data-scientist'],
      },
      {
        id: 'w8c-3',
        text: '自分の会社やブランドを持っている',
        emoji: '🏗️',
        description: 'ゼロから作り上げた自分だけの城',
        effects: { creative: 2, growth: 2, income: 1, satisfaction: 1 },
        unlockJobIds: ['web-designer', 'photographer', 'chef', 'patissier', 'interior-designer'],
      },
      {
        id: 'w8c-4',
        text: '現場の最前線で人と向き合い続けている',
        emoji: '🤲',
        description: '地位よりも「目の前の人の役に立つ」ことを選んだ',
        effects: { care: 3, satisfaction: 2, stability: 1 },
        unlockJobIds: ['nurse', 'care-worker', 'physical-therapist', 'police-fire', 'dental-hygienist'],
      },
    ],
  },
];

// ============================================================
// Helper & exports
// ============================================================

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 各スロットからランダムに1つずつイベントを選び、8つのイベント配列を返す。
 */
export function getRandomWorkingEvents(): GameEvent[] {
  return [
    pickRandom(slot1Pool),
    pickRandom(slot2Pool),
    pickRandom(slot3Pool),
    pickRandom(slot4Pool),
    pickRandom(slot5Pool),
    pickRandom(slot6Pool),
    pickRandom(slot7Pool),
    pickRandom(slot8Pool),
  ];
}

/** backward compat */
export const workingEvents: GameEvent[] = getRandomWorkingEvents();
