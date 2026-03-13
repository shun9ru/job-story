import type { StatInfo, StatKey } from '../types';

/** ステータス表示用の定義（10項目） */
export const statDefinitions: StatInfo[] = [
  { key: 'satisfaction', label: '満足度志向', emoji: '😊', color: 'bg-pink-400', description: 'やりがいや充実感をどれだけ重視するかの価値観。この数値が高い人は、仕事の意義や自己実現に重きを置く傾向がある。' },
  { key: 'income', label: '年収志向', emoji: '💰', color: 'bg-yellow-400', description: '経済的な豊かさや安定をどれだけ重視するかの価値観。この数値が高い人は、収入アップやキャリアの経済的リターンを重要視する傾向がある。' },
  { key: 'growth', label: '成長度', emoji: '📈', color: 'bg-green-400', description: '新しいことへの挑戦意欲と学び続ける力。変化を恐れず、自分のスキルや視野を広げ続けるキャリア志向の強さ。' },
  { key: 'stability', label: '安定度', emoji: '🛡️', color: 'bg-blue-400', description: '正確さ・堅実さ・責任感を持って物事を進める力。ルールや手順を守り、ミスなく確実に業務を遂行する能力。' },
  { key: 'communication', label: 'コミュ力', emoji: '💬', color: 'bg-orange-400', description: '人との対話・交渉・チームワークなど、他者と関わりながら成果を出す力。営業・接客・マネジメントなど幅広い職種で重要。' },
  { key: 'planning', label: '企画力', emoji: '💡', color: 'bg-purple-400', description: 'アイデアを形にし、戦略を立てて実行する力。新しい事業やサービスを生み出すための構想力・推進力を含む。' },
  { key: 'analysis', label: '分析力', emoji: '📊', color: 'bg-cyan-400', description: 'データや情報を読み解き、論理的に判断する力。問題の本質を見抜き、根拠に基づいた意思決定ができる。' },
  { key: 'creative', label: '創造力', emoji: '🎨', color: 'bg-rose-400', description: '独自の発想やセンスで新しい価値を生み出す力。デザイン・映像・音楽・広告など表現に関わる職種で特に重要。' },
  { key: 'care', label: '支援力', emoji: '🤝', color: 'bg-emerald-400', description: '人に寄り添い、支え、育てる力。教育・福祉・医療ケアなど、誰かの助けになることにやりがいを感じる人の強み。' },
  { key: 'technical', label: '技術力', emoji: '🔬', color: 'bg-indigo-400', description: '専門的な知識やスキルを駆使して課題を解決する力。IT・エンジニアリング・研究・医療など専門職の基盤となる。' },
];

/** 価値観系ステータスのキー（診断でのみ蓄積される） */
export const valueStatKeys: StatKey[] = ['satisfaction', 'income'];

/** スキル系ステータスのキー（ストーリーで成長する） */
export const skillStatKeys: StatKey[] = ['growth', 'stability', 'communication', 'planning', 'analysis', 'creative', 'care', 'technical'];

/** スキル系ステータス定義のみ */
export const skillStatDefinitions = statDefinitions.filter((d) => skillStatKeys.includes(d.key));

/** プレイヤーの初期ステータス */
export const initialStats: Record<StatKey, number> = {
  satisfaction: 0,
  income: 0,
  growth: 3,
  stability: 5,
  communication: 3,
  planning: 3,
  analysis: 3,
  creative: 3,
  care: 3,
  technical: 3,
};
