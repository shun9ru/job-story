import type { StatInfo, StatKey, SkillCategory, SkillCategoryInfo, ValueInfo, ValueKey } from '../types';

/** カテゴリ定義 */
export const skillCategories: SkillCategoryInfo[] = [
  { key: 'thinking', label: '思考力', emoji: '🧠' },
  { key: 'self_management', label: '自己管理力', emoji: '🎯' },
  { key: 'social', label: '対人能力', emoji: '🤝' },
  { key: 'execution', label: '実行力', emoji: '⚡' },
];

/** ステータス表示用の定義（18項目） */
export const statDefinitions: StatInfo[] = [
  // ① 思考力（Thinking Skills）
  { key: 'logical_thinking', label: '論理的思考力', emoji: '🔍', color: 'bg-cyan-400', description: '物事を筋道立てて考える力。複雑な問題を整理し、因果関係を見抜いてロジカルに結論を導く。', category: 'thinking' },
  { key: 'problem_solving', label: '問題解決力', emoji: '🧩', color: 'bg-teal-400', description: '課題を発見し、解決策を考える力。現状の問題点を正確に把握し、実行可能な解決策を生み出す。', category: 'thinking' },
  { key: 'critical_thinking', label: '批判的思考力', emoji: '⚖️', color: 'bg-slate-400', description: '情報を鵜呑みにせず判断する力。根拠の信頼性を見極め、多角的な視点から検証する。', category: 'thinking' },
  { key: 'creativity', label: '創造力', emoji: '🎨', color: 'bg-rose-400', description: '新しいアイデアを生み出す力。既存の枠にとらわれず、独自の発想やセンスで新しい価値を創る。', category: 'thinking' },
  { key: 'learning_agility', label: '学習力', emoji: '📚', color: 'bg-green-400', description: '新しいことを素早く学ぶ力。未知の分野にも積極的に取り組み、短期間で知識やスキルを吸収する。', category: 'thinking' },
  // ② 自己管理力（Self Management）
  { key: 'initiative', label: '主体性', emoji: '🚀', color: 'bg-orange-400', description: '自分から行動する力。指示を待たず自ら考え、課題を見つけて積極的にアクションを起こす。', category: 'self_management' },
  { key: 'grit', label: '継続力', emoji: '💪', color: 'bg-red-400', description: '途中で諦めず続ける力。困難に直面しても粘り強く取り組み、目標達成まで努力し続ける。', category: 'self_management' },
  { key: 'self_management', label: '自己管理能力', emoji: '⏰', color: 'bg-blue-400', description: '時間・感情・行動をコントロールする力。計画的に行動し、ストレスや誘惑に流されない。', category: 'self_management' },
  { key: 'resilience', label: 'レジリエンス', emoji: '🛡️', color: 'bg-indigo-400', description: '失敗から立ち直る力。逆境や挫折を経験しても前向きに捉え、成長の糧にできる。', category: 'self_management' },
  { key: 'self_awareness', label: '自己理解', emoji: '🪞', color: 'bg-violet-400', description: '自分の強み・弱みを理解する力。自分の感情や行動パターンを客観的に捉え、成長に活かす。', category: 'self_management' },
  // ③ 対人能力（Social Skills）
  { key: 'communication', label: 'コミュニケーション力', emoji: '💬', color: 'bg-amber-400', description: '相手に分かりやすく伝える力。自分の考えを的確に言語化し、相手に理解してもらえるよう表現する。', category: 'social' },
  { key: 'listening', label: '傾聴力', emoji: '👂', color: 'bg-emerald-400', description: '相手の話を理解する力。言葉の裏にある感情や意図まで汲み取り、信頼関係を築く。', category: 'social' },
  { key: 'empathy', label: '共感力', emoji: '💗', color: 'bg-pink-400', description: '相手の立場を理解する力。他者の気持ちに寄り添い、多様な価値観を尊重できる。', category: 'social' },
  { key: 'teamwork', label: '協働力', emoji: '🤜', color: 'bg-sky-400', description: 'チームで成果を出す力。メンバーの強みを活かし、協力して目標を達成する。', category: 'social' },
  { key: 'leadership', label: 'リーダーシップ', emoji: '👑', color: 'bg-yellow-400', description: '人を導く力。ビジョンを示し、チームをまとめて目標に向かって導く。', category: 'social' },
  // ④ 実行力（Execution Skills）
  { key: 'planning', label: '計画力', emoji: '📋', color: 'bg-purple-400', description: '目標から逆算して行動を設計する力。ゴールを明確にし、実現までのステップを組み立てる。', category: 'execution' },
  { key: 'decision_making', label: '意思決定力', emoji: '🎲', color: 'bg-fuchsia-400', description: '複数の選択肢から判断する力。情報を素早く整理し、リスクとリターンを考慮して決断する。', category: 'execution' },
  { key: 'action', label: '行動力', emoji: '⚡', color: 'bg-lime-400', description: '考えたことを実行する力。計画を素早く実行に移し、スピード感を持って結果を出す。', category: 'execution' },
];

/** カテゴリ別のステータス定義を取得 */
export function getStatsByCategory(category: SkillCategory): StatInfo[] {
  return statDefinitions.filter((d) => d.category === category);
}

/** タグ → スキルキーのマッピング（職種マッチ度計算共通） */
export const tagStatMap: Record<string, StatKey[]> = {
  // 対人・コミュニケーション系
  '対人': ['communication', 'listening'],
  'コミュニケーション': ['communication', 'teamwork'],
  '営業': ['communication', 'action', 'decision_making'],
  '接客': ['communication', 'empathy', 'self_management'],
  '提案': ['communication', 'planning'],
  '交渉': ['communication', 'decision_making'],
  '調整': ['communication', 'teamwork', 'listening'],
  // クリエイティブ系
  '企画': ['planning', 'creativity'],
  'メディア': ['creativity', 'communication'],
  '広告': ['creativity', 'planning', 'communication'],
  'クリエイティブ': ['creativity', 'initiative', 'self_awareness'],
  'デザイン': ['creativity', 'problem_solving'],
  '制作': ['creativity', 'grit', 'self_management'],
  '映像': ['creativity', 'problem_solving', 'teamwork'],
  '音楽': ['creativity', 'empathy', 'self_awareness'],
  '写真': ['creativity', 'self_awareness'],
  '撮影': ['creativity', 'action'],
  '表現': ['creativity', 'communication', 'self_awareness'],
  'アニメ': ['creativity', 'grit'],
  '空間': ['creativity', 'planning'],
  'インテリア': ['creativity', 'empathy'],
  '出版': ['critical_thinking', 'communication'],
  '編集': ['critical_thinking', 'creativity'],
  '取材': ['communication', 'action'],
  '文章': ['creativity', 'logical_thinking'],
  '言葉': ['creativity', 'communication'],
  'ビジュアル': ['creativity', 'self_awareness'],
  'おしゃれ': ['creativity', 'self_awareness'],
  // データ・分析系
  'データ': ['logical_thinking', 'critical_thinking'],
  '分析': ['logical_thinking', 'critical_thinking'],
  '数字': ['logical_thinking', 'self_management'],
  'リサーチ': ['logical_thinking', 'critical_thinking'],
  // 安定・管理系
  '安定': ['self_management', 'resilience'],
  'バックオフィス': ['self_management', 'resilience'],
  '事務': ['self_management', 'grit'],
  '経理': ['logical_thinking', 'self_management'],
  '総務': ['self_management', 'teamwork', 'listening'],
  '秘書': ['self_management', 'listening', 'communication'],
  'マナー': ['self_management', 'empathy'],
  '調達': ['decision_making', 'logical_thinking'],
  '監査': ['critical_thinking', 'self_management'],
  // ケア・支援系
  'サポート': ['empathy', 'listening'],
  'ケア': ['empathy', 'listening', 'grit'],
  '福祉': ['empathy', 'grit', 'resilience'],
  '医療': ['empathy', 'problem_solving', 'resilience'],
  '教育': ['empathy', 'communication', 'leadership'],
  '保育': ['empathy', 'listening', 'self_management'],
  '指導': ['leadership', 'communication', 'empathy'],
  '相談': ['listening', 'empathy'],
  '栄養': ['empathy', 'logical_thinking'],
  '検査': ['logical_thinking', 'self_management'],
  '歯科': ['empathy', 'self_management'],
  'リハビリ': ['empathy', 'grit', 'problem_solving'],
  '薬': ['logical_thinking', 'self_management'],
  // 技術・IT系
  '技術': ['problem_solving', 'learning_agility'],
  '開発': ['problem_solving', 'logical_thinking', 'teamwork'],
  '研究': ['logical_thinking', 'critical_thinking', 'grit'],
  'IT': ['problem_solving', 'learning_agility'],
  'プログラミング': ['problem_solving', 'logical_thinking'],
  'AI': ['logical_thinking', 'learning_agility'],
  'セキュリティ': ['critical_thinking', 'problem_solving', 'resilience'],
  '設計': ['planning', 'logical_thinking'],
  'インフラ': ['problem_solving', 'resilience'],
  'テスト': ['critical_thinking', 'self_management'],
  'DX': ['initiative', 'learning_agility'],
  'Web': ['problem_solving', 'creativity'],
  'UI': ['creativity', 'empathy'],
  'UX': ['empathy', 'critical_thinking'],
  // 戦略・コンサル系
  '専門': ['learning_agility', 'grit'],
  '戦略': ['planning', 'critical_thinking', 'decision_making', 'leadership'],
  'コンサル': ['problem_solving', 'communication', 'leadership'],
  '問題解決': ['problem_solving', 'critical_thinking'],
  // 金融・法律系
  '金融': ['logical_thinking', 'decision_making'],
  '銀行': ['self_management', 'resilience'],
  '証券': ['decision_making', 'action'],
  '保険': ['communication', 'resilience'],
  '資産': ['logical_thinking', 'decision_making'],
  '投資銀行': ['decision_making', 'action', 'logical_thinking'],
  '法律': ['critical_thinking', 'logical_thinking'],
  '法務': ['critical_thinking', 'self_management'],
  '書類': ['self_management', 'logical_thinking'],
  '労務': ['self_management', 'listening'],
  '税務': ['logical_thinking', 'self_management'],
  '会計': ['logical_thinking', 'self_management'],
  '通関': ['logical_thinking', 'self_management'],
  '特許': ['logical_thinking', 'critical_thinking'],
  // グローバル・語学系
  'グローバル': ['communication', 'initiative'],
  '海外': ['communication', 'initiative', 'action'],
  '語学': ['learning_agility', 'communication'],
  '商社': ['communication', 'action', 'decision_making'],
  '貿易': ['logical_thinking', 'communication'],
  // 体力・アウトドア系
  '体力': ['grit', 'resilience', 'action'],
  '屋外': ['action', 'resilience'],
  '現場': ['action', 'teamwork', 'resilience'],
  // エンタメ・ゲーム系
  'エンタメ': ['creativity', 'communication', 'teamwork'],
  'ゲーム': ['creativity', 'problem_solving'],
  'イベント': ['planning', 'teamwork', 'action'],
  // マネジメント・リーダー系
  'マネジメント': ['leadership', 'teamwork', 'decision_making'],
  '管理': ['self_management', 'planning'],
  'リーダー': ['leadership', 'decision_making'],
  '挑戦': ['initiative', 'action'],
  '組織': ['leadership', 'teamwork'],
  '人事': ['listening', 'empathy', 'decision_making'],
  '採用': ['communication', 'decision_making'],
  'キャリア': ['listening', 'empathy'],
  '人材': ['communication', 'listening'],
  // スポーツ・健康系
  'スポーツ': ['grit', 'teamwork', 'action'],
  '健康': ['empathy', 'self_management'],
  // 起業・ベンチャー系
  '起業': ['initiative', 'action', 'decision_making', 'leadership'],
  // 公務・行政系
  '防衛': ['resilience', 'grit', 'teamwork'],
  '公務': ['self_management', 'resilience'],
  '公務員': ['self_management', 'resilience'],
  '政策': ['critical_thinking', 'planning'],
  '行政': ['self_management', 'planning'],
  '地域': ['empathy', 'communication'],
  '公安': ['resilience', 'action', 'teamwork'],
  '街づくり': ['planning', 'empathy'],
  '測量': ['logical_thinking', 'self_management'],
  // その他専門系
  '品質': ['critical_thinking', 'self_management'],
  '堅実': ['self_management', 'grit'],
  '資格': ['learning_agility', 'grit'],
  'マーケティング': ['critical_thinking', 'planning'],
  'ブランド': ['creativity', 'planning'],
  'SNS': ['creativity', 'communication', 'action'],
  '発信': ['communication', 'initiative'],
  'トレンド': ['learning_agility', 'creativity'],
  '高収入': ['decision_making', 'action'],
  'ハイクラス': ['decision_making', 'leadership'],
  'エリート': ['decision_making', 'learning_agility'],
  '社会貢献': ['empathy', 'initiative'],
  'SDGs': ['empathy', 'initiative'],
  '環境': ['empathy', 'critical_thinking'],
  'エネルギー': ['problem_solving', 'resilience'],
  '自然': ['empathy', 'self_awareness'],
  '農業': ['grit', 'self_awareness', 'action'],
  '食': ['creativity', 'empathy'],
  '料理': ['creativity', 'self_management'],
  'スイーツ': ['creativity', 'grit'],
  '建築': ['planning', 'creativity', 'logical_thinking'],
  '建設': ['planning', 'teamwork', 'action'],
  '物流': ['planning', 'self_management'],
  '計画': ['planning', 'logical_thinking'],
  '効率化': ['logical_thinking', 'planning'],
  '改善': ['problem_solving', 'initiative'],
  '航空': ['self_management', 'decision_making', 'resilience'],
  '操縦': ['decision_making', 'self_management'],
  '正義': ['resilience', 'empathy'],
  '文化': ['self_awareness', 'empathy'],
  '美術': ['creativity', 'self_awareness'],
  '情報': ['logical_thinking', 'learning_agility'],
  'ものづくり': ['problem_solving', 'grit'],
  'メーカー': ['teamwork', 'self_management'],
  '理系': ['logical_thinking', 'problem_solving'],
  'チーム': ['teamwork', 'communication'],
  '個人': ['initiative', 'self_management'],
  '不動産': ['communication', 'decision_making'],
  '受験': ['grit', 'planning'],
  'アカデミア': ['logical_thinking', 'grit'],
  // 追加マッピング（未マップタグ対応）
  'サービス': ['communication', 'empathy'],
  'ファッション': ['creativity', 'self_awareness'],
  'ホテル': ['communication', 'self_management'],
  '商品開発': ['planning', 'creativity'],
  '広報': ['communication', 'planning', 'leadership'],
  '数理': ['logical_thinking', 'critical_thinking'],
  '旅行': ['communication', 'planning'],
  '最先端': ['learning_agility', 'initiative'],
  '社会': ['empathy', 'leadership'],
  '美容': ['creativity', 'self_awareness'],
  '翻訳': ['learning_agility', 'self_management'],
  '製薬': ['logical_thinking', 'resilience'],
  '製造': ['teamwork', 'self_management'],
  '論理': ['logical_thinking', 'critical_thinking'],
  '販売': ['communication', 'action'],
  '食品': ['self_management', 'empathy'],
  '飲食': ['teamwork', 'leadership', 'action'],
};

/** タグ → 価値観のマッピング（初期値50からの加算。各軸0-100に収まる） */
export const tagValueMap: Record<string, Partial<Record<ValueKey, number>>> = {
  // ── 年収志向が高い ──
  '高収入': { income_orientation: 30 },
  'ハイクラス': { income_orientation: 25 },
  'エリート': { income_orientation: 25, growth_orientation: 15 },
  '投資銀行': { income_orientation: 30, growth_orientation: 15 },
  '証券': { income_orientation: 25 },
  '金融': { income_orientation: 15 },
  '外資': { income_orientation: 25, growth_orientation: 15 },
  '商社': { income_orientation: 15, growth_orientation: 10 },
  '不動産': { income_orientation: 15 },
  'コンサル': { income_orientation: 15, growth_orientation: 25 },
  '営業': { income_orientation: 10, stability_orientation: -5 },
  '交渉': { income_orientation: 10 },
  '広告': { income_orientation: 10, growth_orientation: 5 },
  // ── 安定志向が高い ──
  '安定': { stability_orientation: 30 },
  '公務': { stability_orientation: 30, work_life_balance: 15 },
  '公務員': { stability_orientation: 30, work_life_balance: 15 },
  '銀行': { stability_orientation: 25, income_orientation: 10 },
  'バックオフィス': { stability_orientation: 25, work_life_balance: 15 },
  '堅実': { stability_orientation: 25 },
  '事務': { stability_orientation: 15, work_life_balance: 15 },
  '経理': { stability_orientation: 15 },
  '管理': { stability_orientation: 15 },
  '法務': { stability_orientation: 15 },
  '保険': { stability_orientation: 15 },
  'メーカー': { stability_orientation: 15 },
  '製造': { stability_orientation: 10 },
  '薬': { stability_orientation: 10 },
  '検査': { stability_orientation: 10 },
  '品質': { stability_orientation: 10 },
  '物流': { stability_orientation: 10 },
  '建設': { stability_orientation: 10 },
  '建築': { stability_orientation: 10 },
  '測量': { stability_orientation: 15 },
  '航空': { stability_orientation: 15, income_orientation: 10 },
  '法律': { stability_orientation: 15, income_orientation: 15 },
  '税務': { stability_orientation: 15 },
  '会計': { stability_orientation: 15 },
  '書類': { stability_orientation: 10 },
  '通関': { stability_orientation: 10 },
  // ── 成長志向が高い ──
  '挑戦': { growth_orientation: 30, stability_orientation: -15 },
  '起業': { growth_orientation: 30, stability_orientation: -25 },
  'IT': { growth_orientation: 15 },
  'AI': { growth_orientation: 25 },
  'DX': { growth_orientation: 25 },
  'グローバル': { growth_orientation: 15 },
  '海外': { growth_orientation: 15, stability_orientation: -10 },
  '戦略': { growth_orientation: 15, income_orientation: 10 },
  '資格': { growth_orientation: 15 },
  '研究': { growth_orientation: 15 },
  '専門': { growth_orientation: 10 },
  '技術': { growth_orientation: 10 },
  '開発': { growth_orientation: 10 },
  '最先端': { growth_orientation: 20 },
  'Web': { growth_orientation: 10 },
  'プログラミング': { growth_orientation: 10 },
  'セキュリティ': { growth_orientation: 10 },
  'データ': { growth_orientation: 10 },
  'マーケティング': { growth_orientation: 10 },
  'SNS': { growth_orientation: 10, work_life_balance: -5 },
  'ゲーム': { growth_orientation: 10, work_life_balance: -10 },
  // ── WLB志向が高い ──
  '地域': { work_life_balance: 15, social_contribution: 15 },
  '教育': { work_life_balance: 10, social_contribution: 15 },
  '保育': { work_life_balance: 10, social_contribution: 15 },
  'クリエイティブ': { work_life_balance: 10, growth_orientation: 5 },
  '自然': { work_life_balance: 15 },
  '農業': { work_life_balance: 15, social_contribution: 10 },
  '文化': { work_life_balance: 10, social_contribution: 10 },
  '美術': { work_life_balance: 10 },
  'スポーツ': { work_life_balance: 10, social_contribution: 5 },
  '健康': { work_life_balance: 10, social_contribution: 10 },
  '写真': { work_life_balance: 10 },
  '個人': { work_life_balance: 10, stability_orientation: -10 },
  // WLBが低い傾向（激務系）
  '接客': { work_life_balance: -10, social_contribution: 5 },
  '飲食': { work_life_balance: -15 },
  'ホテル': { work_life_balance: -10 },
  '現場': { work_life_balance: -10, stability_orientation: 10 },
  'イベント': { work_life_balance: -10 },
  'エンタメ': { work_life_balance: -10, growth_orientation: 5 },
  // ── 社会貢献志向が高い ──
  '社会貢献': { social_contribution: 30 },
  'SDGs': { social_contribution: 30 },
  '福祉': { social_contribution: 30 },
  '医療': { social_contribution: 25 },
  'ケア': { social_contribution: 25 },
  '環境': { social_contribution: 25 },
  '正義': { social_contribution: 15 },
  '防衛': { social_contribution: 15, stability_orientation: 15 },
  '公安': { social_contribution: 15, stability_orientation: 15 },
  '栄養': { social_contribution: 10 },
  '相談': { social_contribution: 10 },
  '指導': { social_contribution: 10 },
  '歯科': { social_contribution: 10, stability_orientation: 10 },
  'リハビリ': { social_contribution: 15 },
  'サポート': { social_contribution: 10 },
  'サービス': { social_contribution: 5, work_life_balance: -5 },
  // ── 複合タグ（対人・コミュ系など幅広く使われるタグ） ──
  '対人': { income_orientation: 5, social_contribution: 5 },
  'コミュニケーション': { growth_orientation: 5 },
  '提案': { income_orientation: 5, growth_orientation: 5 },
  '企画': { growth_orientation: 10 },
  'ブランド': { income_orientation: 5 },
  'デザイン': { work_life_balance: 5, growth_orientation: 5 },
  '制作': { work_life_balance: 5 },
  '表現': { work_life_balance: 5 },
  '映像': { growth_orientation: 5 },
  '音楽': { work_life_balance: 10, stability_orientation: -10 },
  'アニメ': { work_life_balance: -10, growth_orientation: 5 },
  '編集': { growth_orientation: 5 },
  '出版': { stability_orientation: 10 },
  '取材': { growth_orientation: 5, stability_orientation: -5 },
  '人事': { stability_orientation: 10, social_contribution: 5 },
  '採用': { growth_orientation: 5 },
  '人材': { social_contribution: 5, growth_orientation: 5 },
  'キャリア': { social_contribution: 10 },
  '旅行': { work_life_balance: 10 },
  'ファッション': { income_orientation: 5, work_life_balance: -5 },
  '美容': { work_life_balance: -5 },
  'ものづくり': { stability_orientation: 5 },
  '語学': { growth_orientation: 10 },
  '翻訳': { work_life_balance: 10 },
  'マナー': { stability_orientation: 5 },
  '販売': { income_orientation: 5, work_life_balance: -5 },
  '食品': { stability_orientation: 10 },
  '食': { work_life_balance: -5 },
  '料理': { work_life_balance: -10 },
  'スイーツ': { work_life_balance: -5 },
  'インフラ': { stability_orientation: 15 },
  'エネルギー': { stability_orientation: 10, social_contribution: 10 },
  '調達': { stability_orientation: 10 },
  '監査': { stability_orientation: 15, income_orientation: 5 },
  '総務': { stability_orientation: 10, work_life_balance: 10 },
  '秘書': { stability_orientation: 10 },
  'マネジメント': { income_orientation: 10, growth_orientation: 10 },
  'リーダー': { income_orientation: 5, growth_orientation: 10 },
  '組織': { stability_orientation: 5 },
  '計画': { stability_orientation: 5 },
};

/** タグベースで職種のマッチスコアを算出（スキル＋価値観の総合） */
export function calcTagMatchScore(
  tags: string[],
  playerStats: Record<StatKey, number>,
  discoveredJobIds?: string[],
  jobId?: string,
  playerValues?: Record<ValueKey, number>,
): number {
  let score = 0;
  if (discoveredJobIds && jobId && discoveredJobIds.includes(jobId)) score += 5;

  // スキルマッチ
  for (const tag of tags) {
    const relevantStats = tagStatMap[tag];
    if (relevantStats) {
      for (const statKey of relevantStats) {
        score += playerStats[statKey];
      }
    }
  }

  // 価値観マッチ（プレイヤーの価値観と職種の価値観傾向の一致度）
  if (playerValues) {
    for (const tag of tags) {
      const valueEffect = tagValueMap[tag];
      if (valueEffect) {
        for (const [vk, vv] of Object.entries(valueEffect)) {
          const playerVal = playerValues[vk as ValueKey] ?? 50;
          // 価値観が正の方向に一致 → ボーナス
          if (vv > 0 && playerVal > 50) {
            score += Math.round(((playerVal - 50) / 50) * vv);
          }
          // 価値観が負の方向（例: stability -5）で、プレイヤーも低い → ボーナス
          if (vv < 0 && playerVal < 50) {
            score += Math.round(((50 - playerVal) / 50) * Math.abs(vv));
          }
        }
      }
    }
  }

  return score;
}

/** プレイヤーの初期ステータス */
export const initialStats: Record<StatKey, number> = {
  logical_thinking: 0,
  problem_solving: 0,
  critical_thinking: 0,
  creativity: 0,
  learning_agility: 0,
  initiative: 0,
  grit: 0,
  self_management: 0,
  resilience: 0,
  self_awareness: 0,
  communication: 0,
  listening: 0,
  empathy: 0,
  teamwork: 0,
  leadership: 0,
  planning: 0,
  decision_making: 0,
  action: 0,
};

/** 全StatKeyの一覧 */
export const allStatKeys: StatKey[] = Object.keys(initialStats) as StatKey[];

// ============================================================
// 価値観（診断専用・5軸）
// ============================================================

/** 価値観の定義 */
export const valueDefinitions: ValueInfo[] = [
  { key: 'income_orientation', label: '年収志向', emoji: '💰', lowLabel: 'やりがい重視', highLabel: '年収重視', description: 'お金とやりがい、どちらを優先するかの軸。高いほど収入を重視する傾向。' },
  { key: 'stability_orientation', label: '安定志向', emoji: '🛡️', lowLabel: 'リスク歓迎', highLabel: '安定重視', description: '安定とチャレンジ、どちらを好むかの軸。高いほど安定した環境を求める傾向。' },
  { key: 'growth_orientation', label: '成長志向', emoji: '📈', lowLabel: 'ゆったり志向', highLabel: '成長重視', description: '成長スピードへのこだわりの軸。高いほど厳しくても成長できる環境を求める傾向。' },
  { key: 'work_life_balance', label: 'WLB志向', emoji: '⚖️', lowLabel: '仕事中心', highLabel: 'プライベート重視', description: '仕事とプライベートのバランスの軸。高いほど私生活の充実を重視する傾向。' },
  { key: 'social_contribution', label: '社会貢献志向', emoji: '🌍', lowLabel: '気にしない', highLabel: '社会貢献重視', description: '仕事を通じた社会貢献への関心の軸。高いほど社会的意義のある仕事を求める傾向。' },
];

/** 価値観の初期値（中央値50） */
export const initialValues: Record<ValueKey, number> = {
  income_orientation: 50,
  stability_orientation: 50,
  growth_orientation: 50,
  work_life_balance: 50,
  social_contribution: 50,
};
