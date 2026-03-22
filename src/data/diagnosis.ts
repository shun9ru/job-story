import type { DiagnosisQuestion, DiagnosisType, StatKey, ValueKey } from '../types';

// ============================================================
// 質問プール（60問）— 毎回ランダムに20問を出題
// ============================================================
const allQuestions: DiagnosisQuestion[] = [
  // --- 対人・コミュニケーション系 ---
  {
    id: 'q1',
    text: '友達に「遊びに行こう」と誘われた。あなたの反応は？',
    emoji: '🎉',
    options: [
      { text: '「いいね！どこ行く？」とすぐノリノリ', emoji: '🙌', effects: { communication: 11, teamwork: 4, planning: 4, decision_making: 1 }, valueEffects: { work_life_balance: 3 } },
      { text: '「何するか決めてから考えたい」と計画派', emoji: '📋', effects: { planning: 11, decision_making: 4, logical_thinking: 3, critical_thinking: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: '「家でゆっくりしたいかも…」と正直に言う', emoji: '🏠', effects: { resilience: 6, self_management: 4, problem_solving: 6, learning_agility: 4 }, valueEffects: { growth_orientation: -5, work_life_balance: 8 } },
    ],
  },
  {
    id: 'q2',
    text: 'グループワークで自然と担当しがちな役割は？',
    emoji: '👥',
    options: [
      { text: 'みんなの意見をまとめるリーダー役', emoji: '👑', effects: { communication: 7, teamwork: 3, planning: 7, decision_making: 3 }, valueEffects: { work_life_balance: 3 } },
      { text: '面白いアイデアを出すアイデアマン', emoji: '💡', effects: { creativity: 11, initiative: 4, planning: 4, decision_making: 1 }, valueEffects: { growth_orientation: 3 } },
      { text: '情報を集めて分析する調査担当', emoji: '🔍', effects: { logical_thinking: 9, critical_thinking: 6, problem_solving: 3, learning_agility: 2 }, valueEffects: { growth_orientation: 8 } },
    ],
  },
  {
    id: 'q3',
    text: '初対面の人が大勢いるパーティに行ったら？',
    emoji: '🥳',
    options: [
      { text: '自分から話しかけてどんどん友達を作る', emoji: '🤝', effects: { communication: 11, teamwork: 4, resilience: 3, self_management: 2 }, valueEffects: { work_life_balance: 3 } },
      { text: '知り合いの近くで様子を見ながら少しずつ話す', emoji: '👀', effects: { resilience: 6, self_management: 4, empathy: 6, listening: 4 }, valueEffects: { social_contribution: 3 } },
      { text: '一人で飲み物を持って静かに過ごす', emoji: '🥤', effects: { problem_solving: 6, learning_agility: 4, logical_thinking: 6, critical_thinking: 4 }, valueEffects: { growth_orientation: 3 } },
    ],
  },
  {
    id: 'q4',
    text: '友達が落ち込んでいる。どうする？',
    emoji: '😢',
    options: [
      { text: 'まず声をかけて話を聞く', emoji: '👂', effects: { empathy: 9, listening: 6, communication: 4, teamwork: 1 }, valueEffects: { social_contribution: 5 } },
      { text: '原因を分析して解決策を一緒に考える', emoji: '🧠', effects: { logical_thinking: 6, critical_thinking: 4, problem_solving: 6, learning_agility: 4 }, valueEffects: { growth_orientation: 8 } },
      { text: '気分転換に楽しいことに誘う', emoji: '🎈', effects: { initiative: 9, action: 4, creativity: 7 }, valueEffects: { work_life_balance: 5 } },
    ],
  },
  {
    id: 'q5',
    text: 'チームの意見が割れた。あなたはどう動く？',
    emoji: '⚡',
    options: [
      { text: '両方の意見をまとめて折衷案を出す', emoji: '🤝', effects: { communication: 11, teamwork: 4, planning: 4, decision_making: 1 }, valueEffects: { work_life_balance: 3 } },
      { text: 'データを集めてどちらが正しいか検証する', emoji: '📊', effects: { logical_thinking: 9, critical_thinking: 6, problem_solving: 3, learning_agility: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: '自分の直感を信じて押し通す', emoji: '🔥', effects: { initiative: 10, action: 6, creativity: 4 }, valueEffects: { stability_orientation: -5 } },
    ],
  },

  // --- 思考・分析系 ---
  {
    id: 'q6',
    text: '自由研究のテーマを選ぶなら？',
    emoji: '🔬',
    options: [
      { text: 'まだ誰もやってない新しいことに挑戦', emoji: '🚀', effects: { initiative: 9, action: 6, problem_solving: 3, learning_agility: 2 }, valueEffects: { stability_orientation: -8, growth_orientation: 5 } },
      { text: 'データを集めてじっくり分析したい', emoji: '📈', effects: { logical_thinking: 9, critical_thinking: 6, problem_solving: 3, learning_agility: 2 }, valueEffects: { growth_orientation: 8 } },
      { text: 'みんなが楽しめるイベントを企画したい', emoji: '🎪', effects: { planning: 7, decision_making: 3, communication: 7, teamwork: 3 }, valueEffects: { social_contribution: 3 } },
    ],
  },
  {
    id: 'q7',
    text: '数学のテストで難問が出た。どうする？',
    emoji: '📐',
    options: [
      { text: '別のアプローチを試してなんとか解く', emoji: '💪', effects: { logical_thinking: 6, critical_thinking: 4, initiative: 6, action: 4 }, valueEffects: { growth_orientation: 5 } },
      { text: '飛ばして確実に取れる問題を先にやる', emoji: '📝', effects: { planning: 7, decision_making: 3, resilience: 6, self_management: 4 }, valueEffects: { stability_orientation: 13 } },
      { text: 'ひらめきで解法が浮かぶのを待つ', emoji: '✨', effects: { creativity: 7, initiative: 3, problem_solving: 6, learning_agility: 4 }, valueEffects: { growth_orientation: 3 } },
    ],
  },
  {
    id: 'q8',
    text: 'ニュースで一番気になるジャンルは？',
    emoji: '📰',
    options: [
      { text: '最新テクノロジーやガジェット', emoji: '🤖', effects: { problem_solving: 9, learning_agility: 6, planning: 4, decision_making: 1 }, valueEffects: { growth_orientation: 3 } },
      { text: '経済・ビジネス・マーケット', emoji: '💹', effects: { logical_thinking: 6, critical_thinking: 4, planning: 7, decision_making: 3 }, valueEffects: { income_orientation: 8 } },
      { text: '社会問題・福祉・教育', emoji: '🌍', effects: { empathy: 9, listening: 6, resilience: 3, self_management: 2 }, valueEffects: { social_contribution: 8 } },
    ],
  },
  {
    id: 'q9',
    text: '謎解きゲームとクリエイティブ系ゲーム、どっちが好き？',
    emoji: '🎮',
    options: [
      { text: '謎解き！ロジックで攻略するのが快感', emoji: '🧩', effects: { logical_thinking: 9, critical_thinking: 6, problem_solving: 3, learning_agility: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: 'クリエイティブ！自由に世界を作りたい', emoji: '🎨', effects: { creativity: 11, initiative: 4, planning: 4, decision_making: 1 }, valueEffects: { growth_orientation: 3 } },
      { text: '協力プレイ！仲間と一緒にクリアしたい', emoji: '🎯', effects: { resilience: 6, self_management: 4, empathy: 6, listening: 4 }, valueEffects: { work_life_balance: 5 } },
    ],
  },
  {
    id: 'q10',
    text: '新しいことを学ぶとき、どう進める？',
    emoji: '📚',
    options: [
      { text: 'まず全体像を把握してから体系的に学ぶ', emoji: '🗂️', effects: { planning: 11, decision_making: 4, logical_thinking: 3, critical_thinking: 2 }, valueEffects: { growth_orientation: 8 } },
      { text: 'とりあえず手を動かしてやってみる', emoji: '🛠️', effects: { initiative: 6, action: 4, problem_solving: 6, learning_agility: 4 }, valueEffects: { growth_orientation: 8 } },
      { text: '詳しい人に教えてもらう', emoji: '🧑‍🏫', effects: { communication: 7, teamwork: 3, empathy: 6, listening: 4 }, valueEffects: { stability_orientation: -5 } },
    ],
  },

  // --- 仕事観・将来像系 ---
  {
    id: 'q11',
    text: '将来の働き方で一番理想に近いのは？',
    emoji: '💭',
    options: [
      { text: '毎日違うことができてワクワクする環境', emoji: '🌈', effects: { initiative: 9, action: 6, planning: 4, decision_making: 1 }, statEffects: { self_awareness: 7, empathy: 3, learning_agility: 6, grit: 4 }, valueEffects: { social_contribution: 3 } },
      { text: '自分のアイデアを形にできる環境', emoji: '🎨', effects: { creativity: 7, initiative: 3, planning: 7, decision_making: 3 }, statEffects: { self_awareness: 7, empathy: 3, learning_agility: 3, grit: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: '安定して長く働ける環境', emoji: '🏠', effects: { resilience: 9, self_management: 6, empathy: 3, listening: 2 }, statEffects: { decision_making: 3, action: 2, self_awareness: 4, empathy: 1 }, valueEffects: { stability_orientation: 8 } },
    ],
  },
  {
    id: 'q12',
    text: 'アルバイトを選ぶとき、一番大事にすることは？',
    emoji: '💼',
    options: [
      { text: '人とたくさん関われること', emoji: '👫', effects: { communication: 11, teamwork: 4, empathy: 3, listening: 2 }, statEffects: { self_awareness: 7, empathy: 3 }, valueEffects: { social_contribution: 3 } },
      { text: '自分のスキルが身につくこと', emoji: '📈', effects: { problem_solving: 6, learning_agility: 4, planning: 7, decision_making: 3 }, statEffects: { learning_agility: 6, grit: 4 }, valueEffects: { growth_orientation: 3 } },
      { text: '安定したシフトと給料', emoji: '💰', effects: { resilience: 9, self_management: 6, planning: 4, decision_making: 1 }, statEffects: { decision_making: 6, action: 4 }, valueEffects: { income_orientation: 5, stability_orientation: 8 } },
    ],
  },
  {
    id: 'q13',
    text: '10年後の自分、どんなイメージが一番嬉しい？',
    emoji: '🔮',
    options: [
      { text: '専門家として頼られる存在', emoji: '🏅', effects: { problem_solving: 9, learning_agility: 6, logical_thinking: 3, critical_thinking: 2 }, statEffects: { decision_making: 3, action: 2, learning_agility: 3, grit: 2 }, valueEffects: { growth_orientation: 3, stability_orientation: -3 } },
      { text: '新しい事業を立ち上げた起業家', emoji: '🚀', effects: { initiative: 6, action: 4, planning: 7, decision_making: 3 }, statEffects: { decision_making: 6, action: 4, learning_agility: 3, grit: 2 }, valueEffects: { growth_orientation: 5 } },
      { text: '人を支え、感謝される仕事をしている人', emoji: '❤️', effects: { empathy: 6, listening: 4, resilience: 3, self_management: 2, communication: 4, teamwork: 1 }, statEffects: { self_awareness: 11, empathy: 4 }, valueEffects: { social_contribution: 5 } },
    ],
  },
  {
    id: 'q14',
    text: '「すごい！」と言われたいのは何？',
    emoji: '🌟',
    options: [
      { text: '面白いアイデアや企画を生み出すこと', emoji: '💡', effects: { creativity: 7, initiative: 3, planning: 7, decision_making: 3 }, statEffects: { self_awareness: 4, empathy: 1, learning_agility: 3, grit: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: '難しい問題を解決すること', emoji: '🔧', effects: { problem_solving: 6, learning_agility: 4, logical_thinking: 6, critical_thinking: 4 }, statEffects: { learning_agility: 6, grit: 4 }, valueEffects: { growth_orientation: 3 } },
      { text: '人をまとめてチームを成功に導くこと', emoji: '👔', effects: { communication: 7, teamwork: 3, initiative: 6, action: 4 }, statEffects: { decision_making: 3, action: 2, self_awareness: 4, empathy: 1 }, valueEffects: { growth_orientation: 3, stability_orientation: -3 } },
    ],
  },
  {
    id: 'q15',
    text: 'お金がたくさんあったら何に使う？',
    emoji: '💎',
    options: [
      { text: '世界中を旅して新しい経験をしたい', emoji: '✈️', effects: { initiative: 9, action: 6, planning: 4, decision_making: 1 }, statEffects: { self_awareness: 7, empathy: 3, learning_agility: 3, grit: 2 }, valueEffects: { income_orientation: 5 } },
      { text: '投資して資産をさらに増やしたい', emoji: '📈', effects: { logical_thinking: 6, critical_thinking: 4, resilience: 6, self_management: 4 }, statEffects: { decision_making: 9, action: 6 }, valueEffects: { income_orientation: 8 } },
      { text: '困っている人や社会のために使いたい', emoji: '🤲', effects: { empathy: 9, listening: 6, communication: 4, teamwork: 1 }, statEffects: { self_awareness: 11, empathy: 4 }, valueEffects: { social_contribution: 5 } },
    ],
  },

  // --- 性格・行動パターン系 ---
  {
    id: 'q16',
    text: '休日の過ごし方、一番リラックスできるのは？',
    emoji: '☀️',
    options: [
      { text: '友達とカフェや遊びに出かける', emoji: '☕', effects: { communication: 7, teamwork: 3, planning: 7, decision_making: 3 }, valueEffects: { work_life_balance: 5 } },
      { text: '一人で本を読んだり映画を観る', emoji: '📖', effects: { logical_thinking: 6, critical_thinking: 4, resilience: 6, self_management: 4 }, valueEffects: { stability_orientation: 3 } },
      { text: '趣味のモノづくりや創作活動に没頭', emoji: '🎨', effects: { creativity: 11, initiative: 4, problem_solving: 3, learning_agility: 2 }, valueEffects: { work_life_balance: 8 } },
    ],
  },
  {
    id: 'q17',
    text: '旅行の計画、どう立てる？',
    emoji: '🗺️',
    options: [
      { text: 'スケジュールをきっちり組む派', emoji: '📋', effects: { planning: 11, decision_making: 4, resilience: 3, self_management: 2 }, valueEffects: { work_life_balance: 5 } },
      { text: 'ざっくり決めて現地でノリで動く派', emoji: '🎲', effects: { initiative: 9, action: 4, creativity: 7 }, valueEffects: { stability_orientation: 8 } },
      { text: '同行者の希望に合わせる派', emoji: '🤝', effects: { empathy: 6, listening: 4, communication: 7, teamwork: 3 }, valueEffects: { stability_orientation: -5 } },
    ],
  },
  {
    id: 'q18',
    text: '失敗したとき、まず何を考える？',
    emoji: '😔',
    options: [
      { text: '原因を分析して次に活かす', emoji: '📊', effects: { logical_thinking: 9, critical_thinking: 6, problem_solving: 3, learning_agility: 2 }, valueEffects: { growth_orientation: 8 } },
      { text: 'すぐ切り替えて次に挑戦する', emoji: '🔥', effects: { initiative: 9, action: 6, problem_solving: 3, learning_agility: 2 }, valueEffects: { stability_orientation: -8, growth_orientation: 5 } },
      { text: '周りに相談して気持ちを整理する', emoji: '💬', effects: { communication: 7, teamwork: 3, empathy: 6, listening: 4 }, valueEffects: { social_contribution: 3 } },
    ],
  },
  {
    id: 'q19',
    text: '朝型？夜型？',
    emoji: '⏰',
    options: [
      { text: '朝型！早起きして計画的に動く', emoji: '🌅', effects: { planning: 7, decision_making: 3, resilience: 6, self_management: 4 }, valueEffects: { stability_orientation: 3 } },
      { text: '夜型！深夜に集中力が上がる', emoji: '🌙', effects: { creativity: 7, initiative: 3, problem_solving: 6, learning_agility: 4 }, valueEffects: { stability_orientation: 8 } },
      { text: '特にこだわりなく、流れに任せる', emoji: '🌊', effects: { initiative: 6, action: 4, empathy: 6, listening: 4 }, valueEffects: { social_contribution: 3 } },
    ],
  },
  {
    id: 'q20',
    text: '部屋の整理整頓、どのタイプ？',
    emoji: '🏠',
    options: [
      { text: 'いつもキレイ。決まった場所に物を置く', emoji: '✨', effects: { resilience: 9, self_management: 6, planning: 4, decision_making: 1 }, valueEffects: { stability_orientation: 3 } },
      { text: '散らかるけど、どこに何があるかは把握してる', emoji: '🗂️', effects: { logical_thinking: 6, critical_thinking: 4, creativity: 7, initiative: 3 }, valueEffects: { stability_orientation: 8 } },
      { text: '正直あまり片付けは得意じゃない', emoji: '😅', effects: { initiative: 6, action: 4, communication: 7, teamwork: 3 }, valueEffects: { growth_orientation: 3, stability_orientation: -3 } },
    ],
  },

  // --- 価値観・嗜好系 ---
  {
    id: 'q21',
    text: '作品（絵・動画・文章など）を作るのは好き？',
    emoji: '✏️',
    options: [
      { text: '大好き！自分の世界を表現したい', emoji: '🎨', effects: { creativity: 11, initiative: 4, problem_solving: 3, learning_agility: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: '作るよりも分析したり仕組みを考える方が好き', emoji: '⚙️', effects: { logical_thinking: 6, critical_thinking: 4, problem_solving: 6, learning_agility: 4 }, valueEffects: { growth_orientation: 8 } },
      { text: '作るのは苦手だけど人と関わる活動は好き', emoji: '💬', effects: { communication: 11, teamwork: 4, empathy: 3, listening: 2 }, valueEffects: { work_life_balance: 3 } },
    ],
  },
  {
    id: 'q22',
    text: 'SNSの使い方、どれに近い？',
    emoji: '📱',
    options: [
      { text: '自分からどんどん発信する派', emoji: '📢', effects: { creativity: 7, initiative: 3, communication: 7, teamwork: 3 }, valueEffects: { growth_orientation: 3 } },
      { text: '気になる情報を集めるのがメイン', emoji: '🔍', effects: { logical_thinking: 6, critical_thinking: 4, problem_solving: 6, learning_agility: 4 }, valueEffects: { growth_orientation: 3 } },
      { text: '友達とのやり取りがメイン', emoji: '💌', effects: { resilience: 6, self_management: 4, communication: 7, teamwork: 3 }, valueEffects: { stability_orientation: 3 } },
    ],
  },
  {
    id: 'q23',
    text: '好きな映画・ドラマのジャンルは？',
    emoji: '🎬',
    options: [
      { text: 'SF・ファンタジー・アクション', emoji: '🚀', effects: { planning: 7, decision_making: 3, creativity: 7, initiative: 3 }, valueEffects: { growth_orientation: 3 } },
      { text: 'ミステリー・サスペンス・推理もの', emoji: '🔎', effects: { logical_thinking: 9, critical_thinking: 6, problem_solving: 3, learning_agility: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: 'ヒューマンドラマ・恋愛もの', emoji: '💕', effects: { empathy: 3, listening: 2, resilience: 3, self_management: 2, communication: 7, teamwork: 3 }, valueEffects: { work_life_balance: 3 } },
    ],
  },
  {
    id: 'q24',
    text: 'ペットを飼うとしたら？',
    emoji: '🐕',
    options: [
      { text: '犬！一緒に外で遊びたい', emoji: '🐶', effects: { initiative: 9, action: 6, resilience: 3, self_management: 2 }, valueEffects: { work_life_balance: 5 } },
      { text: '猫！マイペースに癒されたい', emoji: '🐱', effects: { creativity: 7, initiative: 3, resilience: 6, self_management: 4 }, valueEffects: { growth_orientation: -5 } },
      { text: '熱帯魚や爬虫類！観察して楽しみたい', emoji: '🐠', effects: { logical_thinking: 6, critical_thinking: 4, problem_solving: 6, learning_agility: 4 }, valueEffects: { growth_orientation: 3 } },
    ],
  },
  {
    id: 'q25',
    text: '文化祭で一番やりたい役割は？',
    emoji: '🎪',
    options: [
      { text: '実行委員長として全体を統括', emoji: '📢', effects: { planning: 7, decision_making: 3, communication: 7, teamwork: 3 }, valueEffects: { stability_orientation: 3 } },
      { text: 'ステージや装飾のデザイン担当', emoji: '🎨', effects: { creativity: 11, initiative: 4, problem_solving: 3, learning_agility: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: '裏方でみんなをサポート', emoji: '🫶', effects: { empathy: 6, listening: 4, resilience: 6, self_management: 4 }, valueEffects: { social_contribution: 3 } },
    ],
  },

  // --- ストレス・対処系 ---
  {
    id: 'q26',
    text: '締め切りが迫ってる！どう動く？',
    emoji: '⏳',
    options: [
      { text: '計画を立て直して効率的に片付ける', emoji: '📋', effects: { planning: 11, decision_making: 4, logical_thinking: 3, critical_thinking: 2 }, valueEffects: { stability_orientation: 3 } },
      { text: '火事場の馬鹿力で一気にやりきる', emoji: '🔥', effects: { initiative: 9, action: 6, problem_solving: 3, learning_agility: 2 }, valueEffects: { growth_orientation: 3, stability_orientation: -3 } },
      { text: '人に手伝ってもらって乗り越える', emoji: '🤝', effects: { communication: 7, teamwork: 3, empathy: 6, listening: 4 }, valueEffects: { social_contribution: 3 } },
    ],
  },
  {
    id: 'q27',
    text: 'ストレスがたまったときの発散方法は？',
    emoji: '😤',
    options: [
      { text: '友達に会って話を聞いてもらう', emoji: '💬', effects: { communication: 7, teamwork: 3, resilience: 3, self_management: 2, empathy: 3, listening: 2 }, valueEffects: { social_contribution: 3 } },
      { text: '一人で没頭できる趣味に集中', emoji: '🎧', effects: { creativity: 7, initiative: 3, problem_solving: 6, learning_agility: 4 }, valueEffects: { work_life_balance: 8 } },
      { text: '運動やアウトドアで体を動かす', emoji: '🏃', effects: { initiative: 6, action: 4, resilience: 6, self_management: 4 }, valueEffects: { work_life_balance: 5 } },
    ],
  },
  {
    id: 'q28',
    text: '大きな決断を迫られたとき、どう決める？',
    emoji: '🤔',
    options: [
      { text: 'データや事実をもとに論理的に判断', emoji: '📊', effects: { logical_thinking: 9, critical_thinking: 6, planning: 4, decision_making: 1 }, valueEffects: { growth_orientation: 3 } },
      { text: '直感とワクワク感を大切にする', emoji: '✨', effects: { initiative: 6, action: 4, planning: 7, decision_making: 3 }, valueEffects: { growth_orientation: 3, stability_orientation: -3 } },
      { text: '信頼できる人に相談してから決める', emoji: '💬', effects: { communication: 7, teamwork: 3, empathy: 6, listening: 4 }, valueEffects: { social_contribution: 3 } },
    ],
  },

  // --- 学び・成長系 ---
  {
    id: 'q29',
    text: '新しいスキルを身につけるとしたら何を学ぶ？',
    emoji: '📖',
    options: [
      { text: 'プログラミングやデータサイエンス', emoji: '💻', effects: { problem_solving: 9, learning_agility: 6, logical_thinking: 3, critical_thinking: 2 }, valueEffects: { growth_orientation: 8 } },
      { text: 'デザインや映像制作', emoji: '🎨', effects: { creativity: 11, initiative: 4, planning: 4, decision_making: 1 }, valueEffects: { growth_orientation: 3 } },
      { text: 'コーチングやカウンセリング', emoji: '🤝', effects: { empathy: 6, listening: 4, communication: 7, teamwork: 3 }, valueEffects: { social_contribution: 3 } },
    ],
  },
  {
    id: 'q30',
    text: '読書するならどんな本？',
    emoji: '📚',
    options: [
      { text: 'ビジネス書・自己啓発本', emoji: '📈', effects: { planning: 7, decision_making: 3, problem_solving: 6, learning_agility: 4 }, valueEffects: { income_orientation: 8 } },
      { text: 'サイエンス・テクノロジー系', emoji: '🔬', effects: { problem_solving: 6, learning_agility: 4, logical_thinking: 6, critical_thinking: 4 }, valueEffects: { income_orientation: 8 } },
      { text: '小説・エッセイ・アート本', emoji: '📖', effects: { creativity: 7, initiative: 3, empathy: 6, listening: 4 }, valueEffects: { growth_orientation: 3 } },
    ],
  },
  {
    id: 'q31',
    text: '授業で一番好きなスタイルは？',
    emoji: '🏫',
    options: [
      { text: 'ディスカッションや発表が多い授業', emoji: '💬', effects: { communication: 11, teamwork: 4, planning: 4, decision_making: 1 }, valueEffects: { work_life_balance: 3 } },
      { text: '実験や実習がメインの授業', emoji: '🧪', effects: { problem_solving: 6, learning_agility: 4, logical_thinking: 6, critical_thinking: 4 }, valueEffects: { growth_orientation: 3 } },
      { text: '自由課題で自分のペースで進められる授業', emoji: '🎨', effects: { creativity: 7, initiative: 3, resilience: 6, self_management: 4 }, valueEffects: { growth_orientation: 3 } },
    ],
  },
  {
    id: 'q32',
    text: 'もし1年間自由に使えるとしたら？',
    emoji: '🌟',
    options: [
      { text: '世界一周して色んな文化に触れたい', emoji: '🌍', effects: { initiative: 9, action: 6, communication: 4, teamwork: 1 }, valueEffects: { work_life_balance: 5 } },
      { text: '何か一つのスキルをプロレベルまで磨きたい', emoji: '🏆', effects: { problem_solving: 9, learning_agility: 6, logical_thinking: 3, critical_thinking: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: '地域の役に立つ活動やプロジェクトをしたい', emoji: '🤲', effects: { empathy: 9, listening: 6, planning: 4, decision_making: 1 }, valueEffects: { growth_orientation: 8, work_life_balance: -5 } },
    ],
  },

  // --- 人間関係・チーム系 ---
  {
    id: 'q33',
    text: 'グループで何かを作るとき、一番楽しい瞬間は？',
    emoji: '🎊',
    options: [
      { text: 'みんなでアイデアを出し合うブレスト', emoji: '💡', effects: { communication: 7, teamwork: 3, creativity: 7, initiative: 3 }, valueEffects: { growth_orientation: 3 } },
      { text: '計画通りに物事が進んでいる瞬間', emoji: '📋', effects: { planning: 11, decision_making: 4, resilience: 3, self_management: 2 }, valueEffects: { stability_orientation: 3 } },
      { text: '完成した作品をみんなで見る瞬間', emoji: '🎉', effects: { resilience: 6, self_management: 4, creativity: 7, initiative: 3 }, valueEffects: { growth_orientation: 3 } },
    ],
  },
  {
    id: 'q34',
    text: 'リーダーシップについてどう思う？',
    emoji: '👑',
    options: [
      { text: '自分がリーダーになるのが好き', emoji: '🙋', effects: { initiative: 9, action: 6, planning: 4, decision_making: 1 }, valueEffects: { growth_orientation: 3, stability_orientation: -3 } },
      { text: '参謀としてリーダーを支えたい', emoji: '🧠', effects: { logical_thinking: 6, critical_thinking: 4, planning: 7, decision_making: 3 }, valueEffects: { social_contribution: 5 } },
      { text: 'メンバーとして自分の専門で貢献したい', emoji: '🔧', effects: { problem_solving: 6, learning_agility: 4, resilience: 6, self_management: 4 }, valueEffects: { stability_orientation: 3 } },
    ],
  },
  {
    id: 'q35',
    text: '後輩に何かを教えるのは好き？',
    emoji: '👨‍🏫',
    options: [
      { text: '好き！成長を見るのが嬉しい', emoji: '😊', effects: { empathy: 6, listening: 4, initiative: 3, action: 2, communication: 4, teamwork: 1 }, valueEffects: { growth_orientation: 8 } },
      { text: '教えるのは苦手だけどマニュアルを作るのは得意', emoji: '📄', effects: { planning: 7, decision_making: 3, logical_thinking: 6, critical_thinking: 4 }, valueEffects: { stability_orientation: 8 } },
      { text: '自分がもっと上達することに集中したい', emoji: '🎯', effects: { problem_solving: 6, learning_agility: 4, planning: 7, decision_making: 3 }, valueEffects: { stability_orientation: 8 } },
    ],
  },

  // --- 直感・感性系 ---
  {
    id: 'q36',
    text: '素敵なカフェを見つけた。何が一番気になる？',
    emoji: '☕',
    options: [
      { text: 'インテリアや雰囲気のデザイン', emoji: '🪴', effects: { creativity: 11, initiative: 4, logical_thinking: 3, critical_thinking: 2 }, valueEffects: { work_life_balance: 5 } },
      { text: 'メニューのコスパや口コミ評価', emoji: '📊', effects: { logical_thinking: 6, critical_thinking: 4, resilience: 6, self_management: 4 }, valueEffects: { stability_orientation: 3 } },
      { text: '店員さんの接客やお客さんの雰囲気', emoji: '👋', effects: { resilience: 3, self_management: 2, empathy: 6, listening: 4, communication: 4, teamwork: 1 }, valueEffects: { income_orientation: 8 } },
    ],
  },
  {
    id: 'q37',
    text: 'プレゼントを選ぶとき、どう選ぶ？',
    emoji: '🎁',
    options: [
      { text: '相手の好みをリサーチして確実に喜ぶものを', emoji: '🔍', effects: { logical_thinking: 6, critical_thinking: 4, empathy: 6, listening: 4 }, valueEffects: { stability_orientation: 8 } },
      { text: '自分のセンスで「これだ！」と思うものを', emoji: '✨', effects: { creativity: 7, initiative: 9, action: 4 }, valueEffects: { growth_orientation: 3 } },
      { text: '一緒に買いに行って本人に選んでもらう', emoji: '🤝', effects: { communication: 7, teamwork: 3, resilience: 6, self_management: 4 }, valueEffects: { stability_orientation: 3 } },
    ],
  },
  {
    id: 'q38',
    text: '料理をするとき、どんなタイプ？',
    emoji: '🍳',
    options: [
      { text: 'レシピ通りに正確に作る', emoji: '📋', effects: { resilience: 6, self_management: 4, planning: 7, decision_making: 3 }, valueEffects: { stability_orientation: 8 } },
      { text: 'アレンジを加えてオリジナルに', emoji: '🎨', effects: { creativity: 11, initiative: 4, problem_solving: 3, learning_agility: 2 }, valueEffects: { stability_orientation: 8 } },
      { text: '誰かと一緒に作るのが楽しい', emoji: '👨‍🍳', effects: { communication: 7, teamwork: 3, empathy: 6, listening: 4 }, valueEffects: { social_contribution: 3 } },
    ],
  },
  {
    id: 'q39',
    text: '買い物をするとき、どう決める？',
    emoji: '🛍️',
    options: [
      { text: '口コミやスペックを比較して慎重に', emoji: '📊', effects: { logical_thinking: 9, critical_thinking: 6, resilience: 3, self_management: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: 'ビビッときたら即決！', emoji: '⚡', effects: { initiative: 9, action: 4, creativity: 7 }, valueEffects: { stability_orientation: 8 } },
      { text: '友達のおすすめや流行りを参考に', emoji: '👫', effects: { resilience: 6, self_management: 4, empathy: 6, listening: 4 }, valueEffects: { stability_orientation: -5 } },
    ],
  },
  {
    id: 'q40',
    text: '理想のチームの雰囲気は？',
    emoji: '🏢',
    options: [
      { text: '活発に意見が飛び交う熱い雰囲気', emoji: '🔥', effects: { communication: 7, teamwork: 3, initiative: 6, action: 4 }, valueEffects: { growth_orientation: 3, stability_orientation: -3 } },
      { text: '黙々と各自が専門性を発揮するプロ集団', emoji: '🎯', effects: { problem_solving: 6, learning_agility: 4, logical_thinking: 6, critical_thinking: 4 }, valueEffects: { growth_orientation: 3 } },
      { text: '和気あいあいで助け合える温かいチーム', emoji: '🌸', effects: { empathy: 6, listening: 4, resilience: 6, self_management: 4 }, valueEffects: { social_contribution: 5 } },
    ],
  },

  // --- 価値観・マインドセット系 ---
  {
    id: 'q41',
    text: '仕事を選ぶとき一番重視するのは？',
    emoji: '⚖️',
    options: [
      { text: '自分が心からやりがいを感じられること', emoji: '❤️‍🔥', effects: { initiative: 9, action: 4, creativity: 7 }, statEffects: { self_awareness: 11, empathy: 4, learning_agility: 3, grit: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: '安定した収入と生活が得られること', emoji: '🏠', effects: { resilience: 9, self_management: 6, planning: 4, decision_making: 1 }, statEffects: { decision_making: 9, action: 6, self_awareness: 4, empathy: 1 }, valueEffects: { income_orientation: 8, stability_orientation: 8 } },
      { text: '社会や誰かの役に立てること', emoji: '🌏', effects: { empathy: 9, listening: 6, communication: 4, teamwork: 1 }, statEffects: { self_awareness: 7, empathy: 3, learning_agility: 3, grit: 2 }, valueEffects: { income_orientation: 8, stability_orientation: 8 } },
    ],
  },
  {
    id: 'q42',
    text: 'ワークライフバランスについてどう思う？',
    emoji: '🔄',
    options: [
      { text: '仕事もプライベートも全力！メリハリが大事', emoji: '⚡', effects: { planning: 7, decision_making: 3, resilience: 6, self_management: 4 }, statEffects: { self_awareness: 7, empathy: 3, decision_making: 3, action: 2 }, valueEffects: { work_life_balance: 8 } },
      { text: '好きな仕事なら仕事=人生でもいい', emoji: '🔥', effects: { initiative: 9, action: 6, problem_solving: 3, learning_agility: 2 }, statEffects: { learning_agility: 9, grit: 6 }, valueEffects: { work_life_balance: 0 } },
      { text: '家族や友人との時間が最優先', emoji: '👨‍👩‍👧', effects: { empathy: 6, listening: 4, resilience: 6, self_management: 4 }, statEffects: { self_awareness: 11, empathy: 4 }, valueEffects: { work_life_balance: -5 } },
    ],
  },
  {
    id: 'q43',
    text: '「成功」と聞いて真っ先にイメージするのは？',
    emoji: '🏆',
    options: [
      { text: '自分の名前が広く知られること', emoji: '🌟', effects: { communication: 7, teamwork: 3, initiative: 6, action: 4 }, statEffects: { decision_making: 6, action: 4, learning_agility: 3, grit: 2 }, valueEffects: { growth_orientation: 3, stability_orientation: -3 } },
      { text: '経済的に自由になること', emoji: '💰', effects: { logical_thinking: 6, critical_thinking: 4, resilience: 6, self_management: 4 }, statEffects: { decision_making: 9, action: 6 }, valueEffects: { income_orientation: 8 } },
      { text: '自分の好きなことで生きていけること', emoji: '🎵', effects: { creativity: 11, initiative: 4, resilience: 3, self_management: 2 }, statEffects: { self_awareness: 11, empathy: 4 }, valueEffects: { income_orientation: 8, work_life_balance: 5 } },
    ],
  },
  {
    id: 'q44',
    text: '自分の強みを伸ばすか、弱みを克服するか？',
    emoji: '💪',
    options: [
      { text: '強みを徹底的に伸ばして武器にしたい', emoji: '🗡️', effects: { problem_solving: 6, learning_agility: 4, initiative: 6, action: 4 }, statEffects: { learning_agility: 6, grit: 4, decision_making: 3, action: 2 }, valueEffects: { growth_orientation: 3, stability_orientation: -3 } },
      { text: '弱みを克服してバランスよくなりたい', emoji: '📐', effects: { resilience: 6, self_management: 4, planning: 7, decision_making: 3 }, statEffects: { self_awareness: 4, empathy: 1, learning_agility: 3, grit: 2 }, valueEffects: { stability_orientation: 3 } },
      { text: '仲間と補い合えればどちらでもいい', emoji: '🤝', effects: { communication: 7, teamwork: 3, empathy: 6, listening: 4 }, statEffects: { self_awareness: 7, empathy: 3 }, valueEffects: { social_contribution: 3 } },
    ],
  },
  {
    id: 'q45',
    text: '「お金」と「やりがい」、究極の選択なら？',
    emoji: '💸',
    options: [
      { text: 'やりがいのある仕事で年収そこそこ', emoji: '✨', effects: { creativity: 7, initiative: 3, empathy: 6, listening: 4 }, statEffects: { self_awareness: 11, empathy: 4 }, valueEffects: { income_orientation: 8 } },
      { text: '好きじゃなくても高年収の仕事', emoji: '💎', effects: { logical_thinking: 6, critical_thinking: 4, resilience: 6, self_management: 4 }, statEffects: { decision_making: 9, action: 6 }, valueEffects: { income_orientation: 8 } },
      { text: '両方追いたい。妥協したくない！', emoji: '🔥', effects: { initiative: 9, action: 6, planning: 4, decision_making: 1 }, statEffects: { decision_making: 3, action: 2, learning_agility: 6, grit: 4 }, valueEffects: { income_orientation: 8 } },
    ],
  },
  {
    id: 'q46',
    text: '組織のルールが理不尽だと感じたら？',
    emoji: '📜',
    options: [
      { text: '声を上げて改善を提案する', emoji: '📢', effects: { initiative: 6, action: 4, communication: 7, teamwork: 3 }, statEffects: { learning_agility: 6, grit: 4 }, valueEffects: { growth_orientation: 3, stability_orientation: -3 } },
      { text: 'まずは理由を調べて合理性を検証する', emoji: '🔍', effects: { logical_thinking: 9, critical_thinking: 6, problem_solving: 3, learning_agility: 2 }, statEffects: { learning_agility: 3, grit: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: '周りと相談して穏便に対処する', emoji: '🕊️', effects: { resilience: 6, self_management: 4, empathy: 6, listening: 4 }, statEffects: { self_awareness: 4, empathy: 1 }, valueEffects: { social_contribution: 3 } },
    ],
  },
  {
    id: 'q47',
    text: 'リスクをどう捉える？',
    emoji: '🎲',
    options: [
      { text: 'リスクを取らない方がリスク。攻めるべき', emoji: '⚔️', effects: { initiative: 9, action: 6, planning: 4, decision_making: 1 }, statEffects: { decision_making: 6, action: 4, learning_agility: 6, grit: 4 }, valueEffects: { stability_orientation: -8 } },
      { text: 'リスクを計算した上で合理的に判断する', emoji: '📊', effects: { logical_thinking: 6, critical_thinking: 4, planning: 7, decision_making: 3 }, statEffects: { decision_making: 3, action: 2, self_awareness: 4, empathy: 1 }, valueEffects: { stability_orientation: -8 } },
      { text: 'できるだけリスクは避けて堅実にいきたい', emoji: '🛡️', effects: { resilience: 9, self_management: 6, empathy: 3, listening: 2 }, statEffects: { self_awareness: 7, empathy: 3 }, valueEffects: { stability_orientation: 0 } },
    ],
  },
  {
    id: 'q48',
    text: '理想の上司や先輩はどんな人？',
    emoji: '👔',
    options: [
      { text: 'ビジョンを持って引っ張ってくれるカリスマ型', emoji: '🦁', effects: { initiative: 6, action: 4, planning: 7, decision_making: 3 }, statEffects: { learning_agility: 6, grit: 4 }, valueEffects: { growth_orientation: 3, stability_orientation: -3 } },
      { text: '丁寧に教えてくれて成長を見守る師匠型', emoji: '🧙', effects: { empathy: 6, listening: 4, problem_solving: 6, learning_agility: 4 }, statEffects: { self_awareness: 4, empathy: 1, learning_agility: 3, grit: 2 }, valueEffects: { stability_orientation: 5, growth_orientation: 8 } },
      { text: '対等に意見を言い合えるフラットな関係', emoji: '🤜', effects: { communication: 7, teamwork: 3, creativity: 7, initiative: 3 }, statEffects: { self_awareness: 7, empathy: 3 }, valueEffects: { growth_orientation: 8 } },
    ],
  },
  {
    id: 'q49',
    text: '大きなプロジェクトに関わるなら、どのポジション？',
    emoji: '🏗️',
    options: [
      { text: '全体を統括するプロジェクトリーダー', emoji: '🎖️', effects: { planning: 7, decision_making: 3, communication: 7, teamwork: 3 }, statEffects: { decision_making: 6, action: 4, learning_agility: 3, grit: 2 }, valueEffects: { stability_orientation: 3 } },
      { text: '核心技術を担うスペシャリスト', emoji: '⚙️', effects: { problem_solving: 9, learning_agility: 6, logical_thinking: 3, critical_thinking: 2 }, statEffects: { decision_making: 3, action: 2, learning_agility: 6, grit: 4 }, valueEffects: { growth_orientation: 3 } },
      { text: 'メンバーの連携をつなぐ調整役', emoji: '🔗', effects: { empathy: 6, listening: 4, resilience: 6, self_management: 4 }, statEffects: { self_awareness: 7, empathy: 3 }, valueEffects: { social_contribution: 3 } },
    ],
  },
  {
    id: 'q50',
    text: '「自分らしさ」って何だと思う？',
    emoji: '🪞',
    options: [
      { text: '誰にも真似できない個性や表現力', emoji: '🎭', effects: { creativity: 11, initiative: 4, problem_solving: 3, learning_agility: 2 }, statEffects: { self_awareness: 7, empathy: 3, learning_agility: 3, grit: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: '信念を貫いてブレないこと', emoji: '🗿', effects: { resilience: 6, self_management: 4, problem_solving: 6, learning_agility: 4 }, statEffects: { self_awareness: 7, empathy: 3 }, valueEffects: { stability_orientation: 3 } },
      { text: '周りの人と築いてきた関係性そのもの', emoji: '🫂', effects: { communication: 7, teamwork: 3, empathy: 6, listening: 4 }, statEffects: { self_awareness: 7, empathy: 3 }, valueEffects: { social_contribution: 3 } },
    ],
  },
  {
    id: 'q51',
    text: '転職するきっかけになりそうなのは？',
    emoji: '🚪',
    options: [
      { text: '成長できない環境にいると感じた時', emoji: '📉', effects: { initiative: 6, action: 4, problem_solving: 6, learning_agility: 4 }, statEffects: { learning_agility: 9, grit: 6 }, valueEffects: { growth_orientation: 8 } },
      { text: '人間関係が辛くなった時', emoji: '😣', effects: { empathy: 6, listening: 4, resilience: 6, self_management: 4 }, statEffects: { self_awareness: 7, empathy: 3 }, valueEffects: { growth_orientation: 8 } },
      { text: 'もっと面白い仕事のチャンスを見つけた時', emoji: '🌈', effects: { creativity: 7, initiative: 3, planning: 7, decision_making: 3 }, statEffects: { learning_agility: 3, grit: 2, decision_making: 3, action: 2 }, valueEffects: { growth_orientation: 3 } },
    ],
  },
  {
    id: 'q52',
    text: '社会問題を解決するなら、どうアプローチする？',
    emoji: '🌱',
    options: [
      { text: 'テクノロジーで仕組みを変える', emoji: '🤖', effects: { problem_solving: 6, learning_agility: 4, logical_thinking: 6, critical_thinking: 4 }, statEffects: { learning_agility: 6, grit: 4, decision_making: 3, action: 2 }, valueEffects: { social_contribution: 5 } },
      { text: '現場で直接人を支援する', emoji: '🤲', effects: { empathy: 9, listening: 6, communication: 4, teamwork: 1 }, statEffects: { self_awareness: 11, empathy: 4 }, valueEffects: { social_contribution: 3 } },
      { text: '発信力で世論を動かす', emoji: '📡', effects: { creativity: 7, initiative: 3, planning: 7, decision_making: 3 }, statEffects: { learning_agility: 6, grit: 4 }, valueEffects: { social_contribution: 5 } },
    ],
  },
  {
    id: 'q53',
    text: '「理想の働き方」に一番近いのは？',
    emoji: '🌐',
    options: [
      { text: 'フリーランスで自由に場所や時間を選びたい', emoji: '🏖️', effects: { creativity: 7, initiative: 9, action: 4 }, statEffects: { self_awareness: 7, empathy: 3, learning_agility: 3, grit: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: '大企業で安定した基盤のもと挑戦したい', emoji: '🏢', effects: { resilience: 6, self_management: 4, planning: 7, decision_making: 3 }, statEffects: { decision_making: 6, action: 4, self_awareness: 4, empathy: 1 }, valueEffects: { stability_orientation: 0, growth_orientation: 5 } },
      { text: 'チームで一体感を持って何かを成し遂げたい', emoji: '🏋️', effects: { communication: 7, teamwork: 3, empathy: 6, listening: 4 }, statEffects: { self_awareness: 7, empathy: 3 }, valueEffects: { stability_orientation: 8 } },
    ],
  },
  {
    id: 'q54',
    text: '自分が一番「没頭」できるのはどんな時？',
    emoji: '🔥',
    options: [
      { text: '難しい課題を解いている時', emoji: '🧩', effects: { logical_thinking: 6, critical_thinking: 4, problem_solving: 6, learning_agility: 4 }, statEffects: { learning_agility: 6, grit: 4 }, valueEffects: { growth_orientation: 3 } },
      { text: '何かを一から作り上げている時', emoji: '🛠️', effects: { creativity: 7, initiative: 3, planning: 7, decision_making: 3 }, statEffects: { self_awareness: 7, empathy: 3 }, valueEffects: { growth_orientation: 3 } },
      { text: '人と深い対話をしている時', emoji: '💬', effects: { communication: 7, teamwork: 3, empathy: 6, listening: 4 }, statEffects: { self_awareness: 7, empathy: 3 }, valueEffects: { social_contribution: 3 } },
    ],
  },
  {
    id: 'q55',
    text: '100年後に残したいものは？',
    emoji: '🏛️',
    options: [
      { text: '革新的な発明や作品', emoji: '💡', effects: { creativity: 7, initiative: 3, problem_solving: 6, learning_agility: 4 }, statEffects: { learning_agility: 6, grit: 4, decision_making: 3, action: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: '多くの人を育てた実績', emoji: '🌳', effects: { empathy: 9, listening: 6, communication: 4, teamwork: 1 }, statEffects: { self_awareness: 11, empathy: 4 }, valueEffects: { social_contribution: 3 } },
      { text: '世の中の仕組みを変えたという事実', emoji: '⚡', effects: { initiative: 6, action: 4, planning: 7, decision_making: 3 }, statEffects: { learning_agility: 6, grit: 4, decision_making: 3, action: 2 }, valueEffects: { social_contribution: 5 } },
    ],
  },
  {
    id: 'q56',
    text: '「多様性」のある環境で働きたい？',
    emoji: '🌈',
    options: [
      { text: 'ぜひ！色んな視点から刺激を受けたい', emoji: '🌍', effects: { communication: 7, teamwork: 3, creativity: 7, initiative: 3 }, statEffects: { learning_agility: 6, grit: 4, self_awareness: 4, empathy: 1 }, valueEffects: { growth_orientation: 3 } },
      { text: '大事だけど、まずは専門性を磨きたい', emoji: '🎯', effects: { problem_solving: 6, learning_agility: 4, logical_thinking: 6, critical_thinking: 4 }, statEffects: { decision_making: 3, action: 2, learning_agility: 3, grit: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: '気が合う仲間と深い関係を築く方が好き', emoji: '🫶', effects: { empathy: 6, listening: 4, resilience: 6, self_management: 4 }, statEffects: { self_awareness: 7, empathy: 3 }, valueEffects: { social_contribution: 3 } },
    ],
  },
  {
    id: 'q57',
    text: '5年後、どんな自分でいたい？',
    emoji: '🔭',
    options: [
      { text: '業界で名前が通る専門家になりたい', emoji: '🏅', effects: { problem_solving: 6, learning_agility: 4, logical_thinking: 6, critical_thinking: 4 }, statEffects: { decision_making: 6, action: 4, learning_agility: 6, grit: 4 }, valueEffects: { growth_orientation: 3 } },
      { text: '信頼される仲間に囲まれていたい', emoji: '👨‍👩‍👧‍👦', effects: { empathy: 6, listening: 4, communication: 7, teamwork: 3 }, statEffects: { self_awareness: 11, empathy: 4 }, valueEffects: { growth_orientation: 8 } },
      { text: '自分のビジョンを形にしていたい', emoji: '🚀', effects: { planning: 7, decision_making: 3, creativity: 7, initiative: 3 }, statEffects: { self_awareness: 4, empathy: 1, learning_agility: 6, grit: 4 }, valueEffects: { growth_orientation: 3 } },
    ],
  },
  {
    id: 'q58',
    text: '「正解がない問題」にどう向き合う？',
    emoji: '❓',
    options: [
      { text: 'データと論理で最善解を導く', emoji: '📊', effects: { logical_thinking: 9, critical_thinking: 6, planning: 4, decision_making: 1 }, statEffects: { learning_agility: 3, grit: 2, decision_making: 3, action: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: '直感を信じて自分なりの答えを出す', emoji: '🌟', effects: { creativity: 7, initiative: 9, action: 4 }, statEffects: { self_awareness: 4, empathy: 1, learning_agility: 3, grit: 2 }, valueEffects: { growth_orientation: 3 } },
      { text: 'いろんな人の意見を聞いて総合的に判断', emoji: '👂', effects: { communication: 7, teamwork: 3, empathy: 6, listening: 4 }, statEffects: { self_awareness: 4, empathy: 1 }, valueEffects: { social_contribution: 3 } },
    ],
  },
  {
    id: 'q59',
    text: '「競争」と「協調」、どちらが自分を伸ばす？',
    emoji: '🤼',
    options: [
      { text: '競争！ライバルがいると燃える', emoji: '🔥', effects: { initiative: 9, action: 6, logical_thinking: 3, critical_thinking: 2 }, statEffects: { decision_making: 6, action: 4, learning_agility: 6, grit: 4 }, valueEffects: { growth_orientation: 3, stability_orientation: -3 } },
      { text: '協調！仲間と高め合いたい', emoji: '🤝', effects: { empathy: 6, listening: 4, communication: 7, teamwork: 3 }, statEffects: { self_awareness: 7, empathy: 3, learning_agility: 3, grit: 2 }, valueEffects: { social_contribution: 3 } },
      { text: '一人で黙々と自分のペースで伸びたい', emoji: '🧘', effects: { problem_solving: 6, learning_agility: 4, resilience: 6, self_management: 4 }, statEffects: { self_awareness: 4, empathy: 1, learning_agility: 3, grit: 2 }, valueEffects: { stability_orientation: 3 } },
    ],
  },
  {
    id: 'q60',
    text: '仕事で「これだけは譲れない」と思うことは？',
    emoji: '🔑',
    options: [
      { text: '自分の成長を実感できること', emoji: '📈', effects: { initiative: 6, action: 4, problem_solving: 6, learning_agility: 4 }, statEffects: { learning_agility: 9, grit: 6 }, valueEffects: { growth_orientation: 8 } },
      { text: '人から感謝されること', emoji: '🙏', effects: { empathy: 9, listening: 6, communication: 4, teamwork: 1 }, statEffects: { self_awareness: 11, empathy: 4 }, valueEffects: { growth_orientation: 8 } },
      { text: '自分のアイデアや工夫を活かせること', emoji: '💡', effects: { creativity: 7, initiative: 3, planning: 7, decision_making: 3 }, statEffects: { self_awareness: 7, empathy: 3, learning_agility: 3, grit: 2 }, valueEffects: { social_contribution: 5 } },
    ],
  },
];

/** 質問プールからランダムに20問を選出 */
export function getRandomQuestions(count = 20): DiagnosisQuestion[] {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/** 後方互換用 — デフォルトの10問 */
export const diagnosisQuestions = allQuestions.slice(0, 10);

// ============================================================
// 診断タイプ詳細 — 価値観5軸ベース（8タイプ）
// StatKeyを互換キーとして再利用
// ============================================================

/**
 * 価値観プロファイルからタイプを判定するためのスコアリングルール。
 * 各タイプは価値観の組み合わせで決まる。
 */
interface ValueTypeRule {
  key: StatKey;
  score: (v: Record<ValueKey, number>) => number;
}

const valueTypeRules: ValueTypeRule[] = [
  // 💰 キャリアアチーバー型: 年収志向が高い
  { key: 'planning', score: (v) => v.income_orientation * 2 + v.growth_orientation * 0.5 - v.work_life_balance * 0.3 },
  // 🛡️ 安定キーパー型: 安定志向が高い
  { key: 'resilience', score: (v) => v.stability_orientation * 2 + v.income_orientation * 0.3 - v.growth_orientation * 0.3 },
  // 🚀 グロースシーカー型: 成長志向が高く安定志向が低い
  { key: 'initiative', score: (v) => v.growth_orientation * 2 - v.stability_orientation * 0.8 + v.income_orientation * 0.2 },
  // ☀️ ライフバランサー型: WLB重視
  { key: 'creativity', score: (v) => v.work_life_balance * 2 - v.income_orientation * 0.3 + v.stability_orientation * 0.3 },
  // 🌍 ソーシャルチェンジャー型: 社会貢献が高い
  { key: 'empathy', score: (v) => v.social_contribution * 2 + v.growth_orientation * 0.3 - v.income_orientation * 0.5 },
  // 🏢 プロフェッショナル型: 成長+安定が両方高い
  { key: 'logical_thinking', score: (v) => v.growth_orientation * 1.2 + v.stability_orientation * 1.2 - v.work_life_balance * 0.3 },
  // 🤝 ヒューマニスト型: 社会貢献+WLBが高い
  { key: 'communication', score: (v) => v.social_contribution * 1.2 + v.work_life_balance * 1.2 - v.income_orientation * 0.5 },
  // 🔥 アントレプレナー型: 年収+成長が高く安定低い
  { key: 'problem_solving', score: (v) => v.income_orientation * 1.2 + v.growth_orientation * 1.2 - v.stability_orientation * 1.0 },
];

export const diagnosisTypes: DiagnosisType[] = [
  {
    key: 'planning',
    label: 'キャリアアチーバー型',
    emoji: '💰',
    tagline: '努力と成果で道を切り拓く「達成者」タイプ',
    description: '高い目標を掲げ、それに見合う報酬を求めるあなた。収入とキャリアアップを重視し、結果で自分の価値を証明したいタイプです。',
    strengths: ['目標に向かって計画的に努力できる', '結果を出すことへの強いこだわり', '市場価値を高めるための自己投資を惜しまない', '数字で成果を測る合理的な思考'],
    weaknesses: ['成果が見えない仕事にモチベーションが下がりやすい', '収入に固執しすぎて本当にやりたいことを見失うことも', '周囲との比較でストレスを感じやすい'],
    workStyle: '明確なKPIや評価基準がある環境で力を発揮。成果主義の組織や、昇進ルートが明確な企業が向いている。',
    communicationStyle: '要点を押さえた効率的なコミュニケーション。数字や事実ベースで話す。',
    idealEnvironment: '外資系企業、コンサルティングファーム、金融業界、成果報酬型の組織',
    stressSource: '努力が報われない評価制度、成長実感の乏しい環境',
    growthAdvice: '高い目標意識は素晴らしい武器です。ただ、お金以外の「豊かさ」にも目を向けると、キャリアの選択肢がさらに広がります。',
    compatibleTypes: ['initiative', 'problem_solving'],
    challengingTypes: ['creativity', 'empathy'],
    suitableJobs: ['経営コンサルタント', '投資銀行', '外資系営業', '不動産デベロッパー', 'ITプロジェクトマネージャー', '証券アナリスト'],
    famousPersonas: ['孫正義タイプ', '前澤友作タイプ', 'ウォーレン・バフェットタイプ'],
  },
  {
    key: 'resilience',
    label: '安定キーパー型',
    emoji: '🛡️',
    tagline: '揺るがない土台を築く「守護者」タイプ',
    description: '長く安心して働ける環境を重視するあなた。安定した収入、福利厚生、制度の整った組織で着実にキャリアを積み上げていきたいタイプです。',
    strengths: ['長期的な視点で着実にキャリアを築ける', 'プレッシャーの中でも冷静さを保てる', '信頼感があり、組織の中核を担える', 'リスク管理の意識が高い'],
    weaknesses: ['変化へのフットワークが重くなりがち', 'リスクを避けすぎてチャンスを逃すことも', '安定に慣れすぎると成長が停滞する可能性'],
    workStyle: '制度やルールが整った環境で安心感を持って力を発揮。計画通りに進む仕事が得意。',
    communicationStyle: '丁寧で堅実。信頼を重視した落ち着いた対話スタイル。',
    idealEnvironment: '大手企業、公務員、金融機関、インフラ企業、歴史ある組織',
    stressSource: '頻繁な方針転換、不安定な雇用、先行きが見えない状況',
    growthAdvice: '安定は素晴らしい価値観です。その上で、小さなチャレンジを重ねると「守り」も「攻め」もできる強い人材になれます。',
    compatibleTypes: ['logical_thinking', 'communication'],
    challengingTypes: ['initiative', 'problem_solving'],
    suitableJobs: ['公務員', '銀行員', '大手メーカー総合職', '経理・会計', '品質管理', '法務'],
    famousPersonas: ['イチロータイプ（継続の力）', '羽生善治タイプ（堅実な戦略）'],
  },
  {
    key: 'initiative',
    label: 'グロースシーカー型',
    emoji: '🚀',
    tagline: '限界を超え続ける「挑戦者」タイプ',
    description: '厳しくても成長できる環境を選ぶあなた。安定よりもチャレンジ、安心よりもワクワクを求め、自分の可能性を広げ続けたいタイプです。',
    strengths: ['失敗を恐れず新しいことに挑戦できる', '変化の激しい環境でも柔軟に適応できる', '自己成長への強い意志がある', '周りを巻き込む情熱と行動力'],
    weaknesses: ['安定を軽視しすぎてリスクを取りすぎることも', '成長実感がないと焦りを感じやすい', '周囲の「普通」に満足できず孤立することも'],
    workStyle: '裁量権が大きく、若手でも挑戦できる環境が最適。スタートアップやベンチャーで力を発揮する。',
    communicationStyle: '情熱的でビジョンを語る力がある。周囲を鼓舞するリーダーシップ。',
    idealEnvironment: 'ベンチャー企業、スタートアップ、海外拠点、新規事業部門',
    stressSource: '変化のない環境、年功序列、行動を制限される組織文化',
    growthAdvice: '成長意欲は最大の原動力です。ただ、時には立ち止まって「何のために成長するのか」を振り返ると、進む方向がより明確になります。',
    compatibleTypes: ['problem_solving', 'planning'],
    challengingTypes: ['resilience', 'creativity'],
    suitableJobs: ['起業家', '新規事業開発', 'コンサルタント', '海外営業', 'ベンチャーキャピタリスト', 'エンジニア'],
    famousPersonas: ['イーロン・マスクタイプ', 'ホリエモンタイプ', '本田圭佑タイプ'],
  },
  {
    key: 'creativity',
    label: 'ライフバランサー型',
    emoji: '☀️',
    tagline: '仕事もプライベートも全力で楽しむ「調和者」タイプ',
    description: '仕事だけの人生にはしたくないあなた。趣味、家族、友人、自分の時間を大切にし、人生全体の充実度を高めたいタイプです。',
    strengths: ['オンオフの切り替えが上手く、効率的に働ける', '多様な経験から独自の視点を持てる', '心身の健康を保ち、長期的にパフォーマンスを発揮できる', '人間関係を大切にし、信頼を得やすい'],
    weaknesses: ['仕事一筋の人から「甘い」と見られることも', '残業や休日出勤が多い環境には合わない', 'キャリアアップのスピードが遅れる可能性'],
    workStyle: '効率重視。限られた時間で最大の成果を出すことに注力。リモートワークやフレックスとの相性が良い。',
    communicationStyle: '穏やかで協調的。プライベートの話題も含めた人間味のあるコミュニケーション。',
    idealEnvironment: 'ワークライフバランスを重視する企業、フレックス制度、リモートワーク対応組織',
    stressSource: '長時間労働、プライベートを犠牲にする企業文化、休みが取れない環境',
    growthAdvice: 'バランス感覚は長期的なキャリアの武器です。「効率」を極めることで、限られた時間でも大きな成果を出せる人材を目指しましょう。',
    compatibleTypes: ['communication', 'resilience'],
    challengingTypes: ['planning', 'initiative'],
    suitableJobs: ['ホワイト企業の総合職', '地方公務員', 'Webデザイナー（フリー）', '教師', '社内SE', 'ライター'],
    famousPersonas: ['タモリタイプ（マイペース）', '星野源タイプ（多趣味）'],
  },
  {
    key: 'empathy',
    label: 'ソーシャルチェンジャー型',
    emoji: '🌍',
    tagline: '社会を変える使命を持つ「変革者」タイプ',
    description: '自分の仕事を通じて社会を良くしたいあなた。利益よりも意義、効率よりも共感を大切にし、誰かの役に立つことが最大のモチベーションです。',
    strengths: ['仕事に強い目的意識を持てる', '困っている人を放っておけない行動力', '多様な人と信頼関係を築ける', '社会課題に対する深い洞察力'],
    weaknesses: ['理想が高すぎて現実とのギャップに悩むことも', '自己犠牲的になりすぎる傾向', '収入面で妥協しすぎることがある'],
    workStyle: '人や社会との接点を感じられる仕事で最も力を発揮。「ありがとう」の言葉が最大の報酬。',
    communicationStyle: '温かく丁寧。相手の立場に立った共感的な対話。',
    idealEnvironment: 'NPO・NGO、医療・福祉、教育機関、CSR部門、ソーシャルビジネス',
    stressSource: '社会的意義を感じられない仕事、利益だけを追求する組織文化',
    growthAdvice: '社会貢献の志は素晴らしいです。「持続可能な貢献」のために、自分自身の生活基盤もしっかり築きましょう。',
    compatibleTypes: ['communication', 'resilience'],
    challengingTypes: ['planning', 'problem_solving'],
    suitableJobs: ['社会福祉士', '教師', '看護師', 'NPO職員', '環境コンサルタント', '国際協力', 'カウンセラー'],
    famousPersonas: ['マザー・テレサタイプ', '金八先生タイプ', '緒方貞子タイプ'],
  },
  {
    key: 'logical_thinking',
    label: 'プロフェッショナル型',
    emoji: '🏢',
    tagline: '実力と安定を両立する「堅実な成長者」タイプ',
    description: '専門性を高めながらも安定した環境で長く働きたいあなた。地に足のついた成長を重視し、実力で評価される環境を好みます。',
    strengths: ['専門知識を着実に積み上げられる', '安定感と成長意欲のバランスが取れている', '長期的なキャリアプランを描ける', '組織の中核として信頼される存在になれる'],
    weaknesses: ['石橋を叩きすぎて大胆な決断が遅れることも', '専門性にこだわりすぎて視野が狭くなる可能性', '変化の速い業界ではペースに焦りを感じることも'],
    workStyle: '体系的な研修制度がある環境で腰を据えてスキルアップ。資格取得や社内昇進を計画的に進める。',
    communicationStyle: '論理的で正確。データや実績に基づいた説得力のある話し方。',
    idealEnvironment: '大手企業の専門職、資格が活きる業界、研究機関、コンサルティングファーム',
    stressSource: '専門性を活かせない配置転換、実力より年功が重視される環境',
    growthAdvice: '専門性×安定の組み合わせは最強のキャリア戦略です。さらに「横のつながり」も意識すると、キャリアの選択肢が広がります。',
    compatibleTypes: ['resilience', 'planning'],
    challengingTypes: ['creativity', 'initiative'],
    suitableJobs: ['エンジニア', '弁護士', '公認会計士', '薬剤師', 'データサイエンティスト', '研究者'],
    famousPersonas: ['落合陽一タイプ', 'まつもとゆきひろタイプ', '中村修二タイプ'],
  },
  {
    key: 'communication',
    label: 'ヒューマニスト型',
    emoji: '🤝',
    tagline: '人と社会に寄り添う「共感の達人」タイプ',
    description: '人とのつながりを大切にし、社会的意義のある仕事をしながらもプライベートの充実も求めるあなた。バランスの取れた温かいキャリアを志向します。',
    strengths: ['人の気持ちに寄り添える共感力', '周囲から信頼され、チームの潤滑油になれる', '仕事とプライベートの両立が上手', '長期的に安定したパフォーマンスを発揮できる'],
    weaknesses: ['競争的な環境が苦手', '自分より他人を優先しすぎることがある', '大きなリスクを取る決断に時間がかかる'],
    workStyle: '温かい人間関係の中で協力しながら成果を出す。チームの雰囲気づくりに自然と貢献する。',
    communicationStyle: '温かく聞き上手。相手が安心して話せる雰囲気を作れる。',
    idealEnvironment: '人を大切にする組織文化、チーム重視の職場、教育・福祉関連',
    stressSource: '冷たい人間関係、成果だけを求められる環境、競争が激しすぎる職場',
    growthAdvice: '人を大切にする姿勢は一生の財産です。その上で「自分の意見を発信する力」も磨くと、リーダーとしても活躍できます。',
    compatibleTypes: ['empathy', 'creativity'],
    challengingTypes: ['planning', 'problem_solving'],
    suitableJobs: ['人事', '教師', 'カウンセラー', '保育士', 'ホテルスタッフ', '福祉職', 'カスタマーサクセス'],
    famousPersonas: ['天海祐希タイプ（包容力）', '所ジョージタイプ（人間力）'],
  },
  {
    key: 'problem_solving',
    label: 'アントレプレナー型',
    emoji: '🔥',
    tagline: '稼ぎながら挑戦する「起業家精神」タイプ',
    description: '高収入を目指しつつ、成長のためにはリスクも取る攻めの姿勢。安定より挑戦、固定給よりインセンティブを好むアグレッシブなタイプです。',
    strengths: ['リスクを取って大きなリターンを狙える', '成長と報酬の両方を追求する貪欲さ', '変化を楽しみ、新しい市場を開拓できる', '自分でビジネスを作り出す創造力'],
    weaknesses: ['無謀なリスクを取ってしまうことがある', '安定を軽視しすぎてバーンアウトの危険性', '人を手段として見てしまう傾向も'],
    workStyle: '自分の裁量で動ける環境が最適。起業、フリーランス、成果報酬型の仕事で力を発揮。',
    communicationStyle: 'スピード重視で結論から話す。交渉力が高く、Win-Winを作れる。',
    idealEnvironment: 'スタートアップ、独立・起業、外資系、成果連動型の組織',
    stressSource: '裁量がない環境、変化を嫌う組織、成果が報酬に反映されない制度',
    growthAdvice: '攻める力は最大の武器です。「守り」のスキル（リスク管理、人間関係構築）も鍛えると、持続的な成功につながります。',
    compatibleTypes: ['initiative', 'planning'],
    challengingTypes: ['resilience', 'communication'],
    suitableJobs: ['起業家', '営業（成果報酬型）', 'ベンチャーキャピタリスト', '不動産営業', 'フリーランス', 'トレーダー'],
    famousPersonas: ['ホリエモンタイプ', '前田裕二タイプ', 'マーク・ザッカーバーグタイプ'],
  },
];

/** StatKeyから診断タイプ情報を取得 */
export function getDiagnosisType(key: StatKey): DiagnosisType {
  const direct = diagnosisTypes.find((t) => t.key === key);
  if (direct) return direct;
  // フォールバック: 近いタイプにマッピング
  const fallbackMap: Partial<Record<StatKey, StatKey>> = {
    critical_thinking: 'logical_thinking',
    learning_agility: 'initiative',
    grit: 'resilience',
    self_management: 'resilience',
    self_awareness: 'communication',
    listening: 'empathy',
    teamwork: 'communication',
    leadership: 'initiative',
    decision_making: 'planning',
    action: 'problem_solving',
  };
  const fallbackKey = fallbackMap[key] ?? 'communication';
  return diagnosisTypes.find((t) => t.key === fallbackKey)!;
}

/** 価値観プロファイルからプライマリータイプ（StatKey互換）を返す */
export function getPrimaryStatFromValues(values: Record<ValueKey, number>): StatKey {
  let bestKey: StatKey = 'communication';
  let bestScore = -Infinity;
  for (const rule of valueTypeRules) {
    const score = rule.score(values);
    if (score > bestScore) {
      bestScore = score;
      bestKey = rule.key;
    }
  }
  return bestKey;
}

/** 価値観プロファイルからセカンダリータイプ（StatKey互換）を返す */
export function getSecondaryStatFromValues(values: Record<ValueKey, number>): StatKey {
  const scores = valueTypeRules.map(rule => ({ key: rule.key, score: rule.score(values) }));
  scores.sort((a, b) => b.score - a.score);
  return scores[1]?.key ?? 'communication';
}

/** 後方互換: スキルベースの判定（ストーリー結果用） */
export function getPrimaryStat(stats: Record<StatKey, number>): StatKey {
  const entries = Object.entries(stats) as [StatKey, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

/** 後方互換: スキルベースの判定（ストーリー結果用） */
export function getSecondaryStat(stats: Record<StatKey, number>): StatKey {
  const entries = Object.entries(stats) as [StatKey, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[1][0];
}
