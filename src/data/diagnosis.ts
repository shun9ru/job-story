import type { DiagnosisQuestion, DiagnosisType, TraitKey, StatKey } from '../types';

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
      { text: '「いいね！どこ行く？」とすぐノリノリ', emoji: '🙌', effects: { communication: 3, challenge: 1 } },
      { text: '「何するか決めてから考えたい」と計画派', emoji: '📋', effects: { planning: 3, analysis: 1 } },
      { text: '「家でゆっくりしたいかも…」と正直に言う', emoji: '🏠', effects: { stability: 2, technical: 2 } },
    ],
  },
  {
    id: 'q2',
    text: 'グループワークで自然と担当しがちな役割は？',
    emoji: '👥',
    options: [
      { text: 'みんなの意見をまとめるリーダー役', emoji: '👑', effects: { communication: 2, planning: 2 } },
      { text: '面白いアイデアを出すアイデアマン', emoji: '💡', effects: { creative: 3, challenge: 1 } },
      { text: '情報を集めて分析する調査担当', emoji: '🔍', effects: { analysis: 3, technical: 1 } },
    ],
  },
  {
    id: 'q3',
    text: '初対面の人が大勢いるパーティに行ったら？',
    emoji: '🥳',
    options: [
      { text: '自分から話しかけてどんどん友達を作る', emoji: '🤝', effects: { communication: 3, challenge: 1 } },
      { text: '知り合いの近くで様子を見ながら少しずつ話す', emoji: '👀', effects: { stability: 2, care: 2 } },
      { text: '一人で飲み物を持って静かに過ごす', emoji: '🥤', effects: { technical: 2, analysis: 2 } },
    ],
  },
  {
    id: 'q4',
    text: '友達が落ち込んでいる。どうする？',
    emoji: '😢',
    options: [
      { text: 'まず声をかけて話を聞く', emoji: '👂', effects: { care: 3, communication: 1 } },
      { text: '原因を分析して解決策を一緒に考える', emoji: '🧠', effects: { analysis: 2, technical: 2 } },
      { text: '気分転換に楽しいことに誘う', emoji: '🎈', effects: { challenge: 2, creative: 2 } },
    ],
  },
  {
    id: 'q5',
    text: 'チームの意見が割れた。あなたはどう動く？',
    emoji: '⚡',
    options: [
      { text: '両方の意見をまとめて折衷案を出す', emoji: '🤝', effects: { communication: 3, planning: 1 } },
      { text: 'データを集めてどちらが正しいか検証する', emoji: '📊', effects: { analysis: 3, technical: 1 } },
      { text: '自分の直感を信じて押し通す', emoji: '🔥', effects: { challenge: 3, creative: 1 } },
    ],
  },

  // --- 思考・分析系 ---
  {
    id: 'q6',
    text: '自由研究のテーマを選ぶなら？',
    emoji: '🔬',
    options: [
      { text: 'まだ誰もやってない新しいことに挑戦', emoji: '🚀', effects: { challenge: 3, creative: 1 } },
      { text: 'データを集めてじっくり分析したい', emoji: '📈', effects: { analysis: 3, technical: 1 } },
      { text: 'みんなが楽しめるイベントを企画したい', emoji: '🎪', effects: { planning: 2, communication: 2 } },
    ],
  },
  {
    id: 'q7',
    text: '数学のテストで難問が出た。どうする？',
    emoji: '📐',
    options: [
      { text: '別のアプローチを試してなんとか解く', emoji: '💪', effects: { analysis: 2, challenge: 2 } },
      { text: '飛ばして確実に取れる問題を先にやる', emoji: '📝', effects: { planning: 2, stability: 2 } },
      { text: 'ひらめきで解法が浮かぶのを待つ', emoji: '✨', effects: { creative: 2, technical: 2 } },
    ],
  },
  {
    id: 'q8',
    text: 'ニュースで一番気になるジャンルは？',
    emoji: '📰',
    options: [
      { text: '最新テクノロジーやガジェット', emoji: '🤖', effects: { technical: 3, challenge: 1 } },
      { text: '経済・ビジネス・マーケット', emoji: '💹', effects: { analysis: 2, planning: 2 } },
      { text: '社会問題・福祉・教育', emoji: '🌍', effects: { care: 3, stability: 1 } },
    ],
  },
  {
    id: 'q9',
    text: '謎解きゲームとクリエイティブ系ゲーム、どっちが好き？',
    emoji: '🎮',
    options: [
      { text: '謎解き！ロジックで攻略するのが快感', emoji: '🧩', effects: { analysis: 3, technical: 1 } },
      { text: 'クリエイティブ！自由に世界を作りたい', emoji: '🎨', effects: { creative: 3, challenge: 1 } },
      { text: '協力プレイ！仲間と一緒にクリアしたい', emoji: '🎯', effects: { stability: 2, care: 2 } },
    ],
  },
  {
    id: 'q10',
    text: '新しいことを学ぶとき、どう進める？',
    emoji: '📚',
    options: [
      { text: 'まず全体像を把握してから体系的に学ぶ', emoji: '🗂️', effects: { planning: 3, analysis: 1 } },
      { text: 'とりあえず手を動かしてやってみる', emoji: '🛠️', effects: { challenge: 2, technical: 2 } },
      { text: '詳しい人に教えてもらう', emoji: '🧑‍🏫', effects: { communication: 2, care: 2 } },
    ],
  },

  // --- 仕事観・将来像系 ---
  {
    id: 'q11',
    text: '将来の働き方で一番理想に近いのは？',
    emoji: '💭',
    options: [
      { text: '毎日違うことができてワクワクする環境', emoji: '🌈', effects: { challenge: 3, creative: 1 }, statEffects: { satisfaction: 2, growth: 2 } },
      { text: '自分のアイデアを形にできる環境', emoji: '🎨', effects: { creative: 2, planning: 2 }, statEffects: { satisfaction: 2, growth: 1 } },
      { text: '安定して長く働ける環境', emoji: '🏠', effects: { stability: 3, care: 1 }, statEffects: { income: 1, satisfaction: 1 } },
    ],
  },
  {
    id: 'q12',
    text: 'アルバイトを選ぶとき、一番大事にすることは？',
    emoji: '💼',
    options: [
      { text: '人とたくさん関われること', emoji: '👫', effects: { communication: 3, care: 1 }, statEffects: { satisfaction: 2 } },
      { text: '自分のスキルが身につくこと', emoji: '📈', effects: { technical: 2, challenge: 2 }, statEffects: { growth: 2 } },
      { text: '安定したシフトと給料', emoji: '💰', effects: { stability: 3, planning: 1 }, statEffects: { income: 2 } },
    ],
  },
  {
    id: 'q13',
    text: '10年後の自分、どんなイメージが一番嬉しい？',
    emoji: '🔮',
    options: [
      { text: '専門家として頼られる存在', emoji: '🏅', effects: { technical: 3, analysis: 1 }, statEffects: { income: 1, growth: 1 } },
      { text: '新しい事業を立ち上げた起業家', emoji: '🚀', effects: { challenge: 2, planning: 2 }, statEffects: { income: 2, growth: 1 } },
      { text: '人を支え、感謝される仕事をしている人', emoji: '❤️', effects: { care: 2, stability: 1, communication: 1 }, statEffects: { satisfaction: 3 } },
    ],
  },
  {
    id: 'q14',
    text: '「すごい！」と言われたいのは何？',
    emoji: '🌟',
    options: [
      { text: '面白いアイデアや企画を生み出すこと', emoji: '💡', effects: { creative: 2, planning: 2 }, statEffects: { satisfaction: 1, growth: 1 } },
      { text: '難しい問題を解決すること', emoji: '🔧', effects: { technical: 2, analysis: 2 }, statEffects: { growth: 2 } },
      { text: '人をまとめてチームを成功に導くこと', emoji: '👔', effects: { communication: 2, challenge: 2 }, statEffects: { income: 1, satisfaction: 1 } },
    ],
  },
  {
    id: 'q15',
    text: 'お金がたくさんあったら何に使う？',
    emoji: '💎',
    options: [
      { text: '世界中を旅して新しい経験をしたい', emoji: '✈️', effects: { challenge: 3, creative: 1 }, statEffects: { satisfaction: 2, growth: 1 } },
      { text: '投資して資産をさらに増やしたい', emoji: '📈', effects: { analysis: 2, stability: 2 }, statEffects: { income: 3 } },
      { text: '困っている人や社会のために使いたい', emoji: '🤲', effects: { care: 3, communication: 1 }, statEffects: { satisfaction: 3 } },
    ],
  },

  // --- 性格・行動パターン系 ---
  {
    id: 'q16',
    text: '休日の過ごし方、一番リラックスできるのは？',
    emoji: '☀️',
    options: [
      { text: '友達とカフェや遊びに出かける', emoji: '☕', effects: { communication: 2, challenge: 2 } },
      { text: '一人で本を読んだり映画を観る', emoji: '📖', effects: { analysis: 2, stability: 2 } },
      { text: '趣味のモノづくりや創作活動に没頭', emoji: '🎨', effects: { creative: 3, technical: 1 } },
    ],
  },
  {
    id: 'q17',
    text: '旅行の計画、どう立てる？',
    emoji: '🗺️',
    options: [
      { text: 'スケジュールをきっちり組む派', emoji: '📋', effects: { planning: 3, stability: 1 } },
      { text: 'ざっくり決めて現地でノリで動く派', emoji: '🎲', effects: { challenge: 2, creative: 2 } },
      { text: '同行者の希望に合わせる派', emoji: '🤝', effects: { care: 2, communication: 2 } },
    ],
  },
  {
    id: 'q18',
    text: '失敗したとき、まず何を考える？',
    emoji: '😔',
    options: [
      { text: '原因を分析して次に活かす', emoji: '📊', effects: { analysis: 3, technical: 1 } },
      { text: 'すぐ切り替えて次に挑戦する', emoji: '🔥', effects: { challenge: 3, creative: 1 } },
      { text: '周りに相談して気持ちを整理する', emoji: '💬', effects: { communication: 2, care: 2 } },
    ],
  },
  {
    id: 'q19',
    text: '朝型？夜型？',
    emoji: '⏰',
    options: [
      { text: '朝型！早起きして計画的に動く', emoji: '🌅', effects: { planning: 2, stability: 2 } },
      { text: '夜型！深夜に集中力が上がる', emoji: '🌙', effects: { creative: 2, technical: 2 } },
      { text: '特にこだわりなく、流れに任せる', emoji: '🌊', effects: { challenge: 2, care: 2 } },
    ],
  },
  {
    id: 'q20',
    text: '部屋の整理整頓、どのタイプ？',
    emoji: '🏠',
    options: [
      { text: 'いつもキレイ。決まった場所に物を置く', emoji: '✨', effects: { stability: 3, planning: 1 } },
      { text: '散らかるけど、どこに何があるかは把握してる', emoji: '🗂️', effects: { analysis: 2, creative: 2 } },
      { text: '正直あまり片付けは得意じゃない', emoji: '😅', effects: { challenge: 2, communication: 2 } },
    ],
  },

  // --- 価値観・嗜好系 ---
  {
    id: 'q21',
    text: '作品（絵・動画・文章など）を作るのは好き？',
    emoji: '✏️',
    options: [
      { text: '大好き！自分の世界を表現したい', emoji: '🎨', effects: { creative: 3, challenge: 1 } },
      { text: '作るよりも分析したり仕組みを考える方が好き', emoji: '⚙️', effects: { analysis: 2, technical: 2 } },
      { text: '作るのは苦手だけど人と関わる活動は好き', emoji: '💬', effects: { communication: 3, care: 1 } },
    ],
  },
  {
    id: 'q22',
    text: 'SNSの使い方、どれに近い？',
    emoji: '📱',
    options: [
      { text: '自分からどんどん発信する派', emoji: '📢', effects: { creative: 2, communication: 2 } },
      { text: '気になる情報を集めるのがメイン', emoji: '🔍', effects: { analysis: 2, technical: 2 } },
      { text: '友達とのやり取りがメイン', emoji: '💌', effects: { stability: 2, communication: 2 } },
    ],
  },
  {
    id: 'q23',
    text: '好きな映画・ドラマのジャンルは？',
    emoji: '🎬',
    options: [
      { text: 'SF・ファンタジー・アクション', emoji: '🚀', effects: { challenge: 2, creative: 2 } },
      { text: 'ミステリー・サスペンス・推理もの', emoji: '🔎', effects: { analysis: 3, technical: 1 } },
      { text: 'ヒューマンドラマ・恋愛もの', emoji: '💕', effects: { care: 1, stability: 1, communication: 2 } },
    ],
  },
  {
    id: 'q24',
    text: 'ペットを飼うとしたら？',
    emoji: '🐕',
    options: [
      { text: '犬！一緒に外で遊びたい', emoji: '🐶', effects: { challenge: 3, stability: 1 } },
      { text: '猫！マイペースに癒されたい', emoji: '🐱', effects: { creative: 2, stability: 2 } },
      { text: '熱帯魚や爬虫類！観察して楽しみたい', emoji: '🐠', effects: { analysis: 2, technical: 2 } },
    ],
  },
  {
    id: 'q25',
    text: '文化祭で一番やりたい役割は？',
    emoji: '🎪',
    options: [
      { text: '実行委員長として全体を統括', emoji: '📢', effects: { planning: 2, communication: 2 } },
      { text: 'ステージや装飾のデザイン担当', emoji: '🎨', effects: { creative: 3, technical: 1 } },
      { text: '裏方でみんなをサポート', emoji: '🫶', effects: { care: 2, stability: 2 } },
    ],
  },

  // --- ストレス・対処系 ---
  {
    id: 'q26',
    text: '締め切りが迫ってる！どう動く？',
    emoji: '⏳',
    options: [
      { text: '計画を立て直して効率的に片付ける', emoji: '📋', effects: { planning: 3, analysis: 1 } },
      { text: '火事場の馬鹿力で一気にやりきる', emoji: '🔥', effects: { challenge: 3, creative: 1 } },
      { text: '人に手伝ってもらって乗り越える', emoji: '🤝', effects: { communication: 2, care: 2 } },
    ],
  },
  {
    id: 'q27',
    text: 'ストレスがたまったときの発散方法は？',
    emoji: '😤',
    options: [
      { text: '友達に会って話を聞いてもらう', emoji: '💬', effects: { communication: 2, stability: 1, care: 1 } },
      { text: '一人で没頭できる趣味に集中', emoji: '🎧', effects: { creative: 2, technical: 2 } },
      { text: '運動やアウトドアで体を動かす', emoji: '🏃', effects: { challenge: 2, stability: 2 } },
    ],
  },
  {
    id: 'q28',
    text: '大きな決断を迫られたとき、どう決める？',
    emoji: '🤔',
    options: [
      { text: 'データや事実をもとに論理的に判断', emoji: '📊', effects: { analysis: 3, planning: 1 } },
      { text: '直感とワクワク感を大切にする', emoji: '✨', effects: { challenge: 2, creative: 2 } },
      { text: '信頼できる人に相談してから決める', emoji: '💬', effects: { communication: 2, care: 2 } },
    ],
  },

  // --- 学び・成長系 ---
  {
    id: 'q29',
    text: '新しいスキルを身につけるとしたら何を学ぶ？',
    emoji: '📖',
    options: [
      { text: 'プログラミングやデータサイエンス', emoji: '💻', effects: { technical: 3, analysis: 1 } },
      { text: 'デザインや映像制作', emoji: '🎨', effects: { creative: 3, planning: 1 } },
      { text: 'コーチングやカウンセリング', emoji: '🤝', effects: { care: 2, communication: 2 } },
    ],
  },
  {
    id: 'q30',
    text: '読書するならどんな本？',
    emoji: '📚',
    options: [
      { text: 'ビジネス書・自己啓発本', emoji: '📈', effects: { planning: 2, challenge: 2 } },
      { text: 'サイエンス・テクノロジー系', emoji: '🔬', effects: { technical: 2, analysis: 2 } },
      { text: '小説・エッセイ・アート本', emoji: '📖', effects: { creative: 2, care: 2 } },
    ],
  },
  {
    id: 'q31',
    text: '授業で一番好きなスタイルは？',
    emoji: '🏫',
    options: [
      { text: 'ディスカッションや発表が多い授業', emoji: '💬', effects: { communication: 3, planning: 1 } },
      { text: '実験や実習がメインの授業', emoji: '🧪', effects: { technical: 2, analysis: 2 } },
      { text: '自由課題で自分のペースで進められる授業', emoji: '🎨', effects: { creative: 2, stability: 2 } },
    ],
  },
  {
    id: 'q32',
    text: 'もし1年間自由に使えるとしたら？',
    emoji: '🌟',
    options: [
      { text: '世界一周して色んな文化に触れたい', emoji: '🌍', effects: { challenge: 3, communication: 1 } },
      { text: '何か一つのスキルをプロレベルまで磨きたい', emoji: '🏆', effects: { technical: 3, analysis: 1 } },
      { text: '地域の役に立つ活動やプロジェクトをしたい', emoji: '🤲', effects: { care: 3, planning: 1 } },
    ],
  },

  // --- 人間関係・チーム系 ---
  {
    id: 'q33',
    text: 'グループで何かを作るとき、一番楽しい瞬間は？',
    emoji: '🎊',
    options: [
      { text: 'みんなでアイデアを出し合うブレスト', emoji: '💡', effects: { communication: 2, creative: 2 } },
      { text: '計画通りに物事が進んでいる瞬間', emoji: '📋', effects: { planning: 3, stability: 1 } },
      { text: '完成した作品をみんなで見る瞬間', emoji: '🎉', effects: { stability: 2, creative: 2 } },
    ],
  },
  {
    id: 'q34',
    text: 'リーダーシップについてどう思う？',
    emoji: '👑',
    options: [
      { text: '自分がリーダーになるのが好き', emoji: '🙋', effects: { challenge: 3, stability: 1 } },
      { text: '参謀としてリーダーを支えたい', emoji: '🧠', effects: { analysis: 2, planning: 2 } },
      { text: 'メンバーとして自分の専門で貢献したい', emoji: '🔧', effects: { technical: 2, stability: 2 } },
    ],
  },
  {
    id: 'q35',
    text: '後輩に何かを教えるのは好き？',
    emoji: '👨‍🏫',
    options: [
      { text: '好き！成長を見るのが嬉しい', emoji: '😊', effects: { care: 2, challenge: 1, communication: 1 } },
      { text: '教えるのは苦手だけどマニュアルを作るのは得意', emoji: '📄', effects: { planning: 2, analysis: 2 } },
      { text: '自分がもっと上達することに集中したい', emoji: '🎯', effects: { technical: 2, challenge: 2 } },
    ],
  },

  // --- 直感・感性系 ---
  {
    id: 'q36',
    text: '素敵なカフェを見つけた。何が一番気になる？',
    emoji: '☕',
    options: [
      { text: 'インテリアや雰囲気のデザイン', emoji: '🪴', effects: { creative: 3, analysis: 1 } },
      { text: 'メニューのコスパや口コミ評価', emoji: '📊', effects: { analysis: 2, stability: 2 } },
      { text: '店員さんの接客やお客さんの雰囲気', emoji: '👋', effects: { stability: 1, care: 2, communication: 1 } },
    ],
  },
  {
    id: 'q37',
    text: 'プレゼントを選ぶとき、どう選ぶ？',
    emoji: '🎁',
    options: [
      { text: '相手の好みをリサーチして確実に喜ぶものを', emoji: '🔍', effects: { analysis: 2, care: 2 } },
      { text: '自分のセンスで「これだ！」と思うものを', emoji: '✨', effects: { creative: 2, challenge: 2 } },
      { text: '一緒に買いに行って本人に選んでもらう', emoji: '🤝', effects: { communication: 2, stability: 2 } },
    ],
  },
  {
    id: 'q38',
    text: '料理をするとき、どんなタイプ？',
    emoji: '🍳',
    options: [
      { text: 'レシピ通りに正確に作る', emoji: '📋', effects: { stability: 2, planning: 2 } },
      { text: 'アレンジを加えてオリジナルに', emoji: '🎨', effects: { creative: 3, challenge: 1 } },
      { text: '誰かと一緒に作るのが楽しい', emoji: '👨‍🍳', effects: { communication: 2, care: 2 } },
    ],
  },
  {
    id: 'q39',
    text: '買い物をするとき、どう決める？',
    emoji: '🛍️',
    options: [
      { text: '口コミやスペックを比較して慎重に', emoji: '📊', effects: { analysis: 3, stability: 1 } },
      { text: 'ビビッときたら即決！', emoji: '⚡', effects: { challenge: 2, creative: 2 } },
      { text: '友達のおすすめや流行りを参考に', emoji: '👫', effects: { stability: 2, care: 2 } },
    ],
  },
  {
    id: 'q40',
    text: '理想のチームの雰囲気は？',
    emoji: '🏢',
    options: [
      { text: '活発に意見が飛び交う熱い雰囲気', emoji: '🔥', effects: { communication: 2, challenge: 2 } },
      { text: '黙々と各自が専門性を発揮するプロ集団', emoji: '🎯', effects: { technical: 2, analysis: 2 } },
      { text: '和気あいあいで助け合える温かいチーム', emoji: '🌸', effects: { care: 2, stability: 2 } },
    ],
  },

  // --- 価値観・マインドセット系 ---
  {
    id: 'q41',
    text: '仕事を選ぶとき一番重視するのは？',
    emoji: '⚖️',
    options: [
      { text: '自分が心からやりがいを感じられること', emoji: '❤️‍🔥', effects: { challenge: 2, creative: 2 }, statEffects: { satisfaction: 3, growth: 1 } },
      { text: '安定した収入と生活が得られること', emoji: '🏠', effects: { stability: 3, planning: 1 }, statEffects: { income: 3, satisfaction: 1 } },
      { text: '社会や誰かの役に立てること', emoji: '🌏', effects: { care: 3, communication: 1 }, statEffects: { satisfaction: 2, growth: 1 } },
    ],
  },
  {
    id: 'q42',
    text: 'ワークライフバランスについてどう思う？',
    emoji: '🔄',
    options: [
      { text: '仕事もプライベートも全力！メリハリが大事', emoji: '⚡', effects: { planning: 2, stability: 2 }, statEffects: { satisfaction: 2, income: 1 } },
      { text: '好きな仕事なら仕事=人生でもいい', emoji: '🔥', effects: { challenge: 3, technical: 1 }, statEffects: { growth: 3 } },
      { text: '家族や友人との時間が最優先', emoji: '👨‍👩‍👧', effects: { care: 2, stability: 2 }, statEffects: { satisfaction: 3 } },
    ],
  },
  {
    id: 'q43',
    text: '「成功」と聞いて真っ先にイメージするのは？',
    emoji: '🏆',
    options: [
      { text: '自分の名前が広く知られること', emoji: '🌟', effects: { communication: 2, challenge: 2 }, statEffects: { income: 2, growth: 1 } },
      { text: '経済的に自由になること', emoji: '💰', effects: { analysis: 2, stability: 2 }, statEffects: { income: 3 } },
      { text: '自分の好きなことで生きていけること', emoji: '🎵', effects: { creative: 3, care: 1 }, statEffects: { satisfaction: 3 } },
    ],
  },
  {
    id: 'q44',
    text: '自分の強みを伸ばすか、弱みを克服するか？',
    emoji: '💪',
    options: [
      { text: '強みを徹底的に伸ばして武器にしたい', emoji: '🗡️', effects: { technical: 2, challenge: 2 }, statEffects: { growth: 2, income: 1 } },
      { text: '弱みを克服してバランスよくなりたい', emoji: '📐', effects: { stability: 2, planning: 2 }, statEffects: { satisfaction: 1, growth: 1 } },
      { text: '仲間と補い合えればどちらでもいい', emoji: '🤝', effects: { communication: 2, care: 2 }, statEffects: { satisfaction: 2 } },
    ],
  },
  {
    id: 'q45',
    text: '「お金」と「やりがい」、究極の選択なら？',
    emoji: '💸',
    options: [
      { text: 'やりがいのある仕事で年収そこそこ', emoji: '✨', effects: { creative: 2, care: 2 }, statEffects: { satisfaction: 3 } },
      { text: '好きじゃなくても高年収の仕事', emoji: '💎', effects: { analysis: 2, stability: 2 }, statEffects: { income: 3 } },
      { text: '両方追いたい。妥協したくない！', emoji: '🔥', effects: { challenge: 3, planning: 1 }, statEffects: { income: 1, growth: 2 } },
    ],
  },
  {
    id: 'q46',
    text: '組織のルールが理不尽だと感じたら？',
    emoji: '📜',
    options: [
      { text: '声を上げて改善を提案する', emoji: '📢', effects: { challenge: 2, communication: 2 }, statEffects: { growth: 2 } },
      { text: 'まずは理由を調べて合理性を検証する', emoji: '🔍', effects: { analysis: 3, technical: 1 }, statEffects: { growth: 1 } },
      { text: '周りと相談して穏便に対処する', emoji: '🕊️', effects: { stability: 2, care: 2 }, statEffects: { satisfaction: 1 } },
    ],
  },
  {
    id: 'q47',
    text: 'リスクをどう捉える？',
    emoji: '🎲',
    options: [
      { text: 'リスクを取らない方がリスク。攻めるべき', emoji: '⚔️', effects: { challenge: 3, creative: 1 }, statEffects: { income: 2, growth: 2 } },
      { text: 'リスクを計算した上で合理的に判断する', emoji: '📊', effects: { analysis: 2, planning: 2 }, statEffects: { income: 1, satisfaction: 1 } },
      { text: 'できるだけリスクは避けて堅実にいきたい', emoji: '🛡️', effects: { stability: 3, care: 1 }, statEffects: { satisfaction: 2 } },
    ],
  },
  {
    id: 'q48',
    text: '理想の上司や先輩はどんな人？',
    emoji: '👔',
    options: [
      { text: 'ビジョンを持って引っ張ってくれるカリスマ型', emoji: '🦁', effects: { challenge: 2, planning: 2 }, statEffects: { growth: 2 } },
      { text: '丁寧に教えてくれて成長を見守る師匠型', emoji: '🧙', effects: { care: 2, technical: 2 }, statEffects: { satisfaction: 1, growth: 1 } },
      { text: '対等に意見を言い合えるフラットな関係', emoji: '🤜', effects: { communication: 2, creative: 2 }, statEffects: { satisfaction: 2 } },
    ],
  },
  {
    id: 'q49',
    text: '大きなプロジェクトに関わるなら、どのポジション？',
    emoji: '🏗️',
    options: [
      { text: '全体を統括するプロジェクトリーダー', emoji: '🎖️', effects: { planning: 2, communication: 2 }, statEffects: { income: 2, growth: 1 } },
      { text: '核心技術を担うスペシャリスト', emoji: '⚙️', effects: { technical: 3, analysis: 1 }, statEffects: { income: 1, growth: 2 } },
      { text: 'メンバーの連携をつなぐ調整役', emoji: '🔗', effects: { care: 2, stability: 2 }, statEffects: { satisfaction: 2 } },
    ],
  },
  {
    id: 'q50',
    text: '「自分らしさ」って何だと思う？',
    emoji: '🪞',
    options: [
      { text: '誰にも真似できない個性や表現力', emoji: '🎭', effects: { creative: 3, challenge: 1 }, statEffects: { satisfaction: 2, growth: 1 } },
      { text: '信念を貫いてブレないこと', emoji: '🗿', effects: { stability: 2, technical: 2 }, statEffects: { satisfaction: 2 } },
      { text: '周りの人と築いてきた関係性そのもの', emoji: '🫂', effects: { communication: 2, care: 2 }, statEffects: { satisfaction: 2 } },
    ],
  },
  {
    id: 'q51',
    text: '転職するきっかけになりそうなのは？',
    emoji: '🚪',
    options: [
      { text: '成長できない環境にいると感じた時', emoji: '📉', effects: { challenge: 2, technical: 2 }, statEffects: { growth: 3 } },
      { text: '人間関係が辛くなった時', emoji: '😣', effects: { care: 2, stability: 2 }, statEffects: { satisfaction: 2 } },
      { text: 'もっと面白い仕事のチャンスを見つけた時', emoji: '🌈', effects: { creative: 2, planning: 2 }, statEffects: { growth: 1, income: 1 } },
    ],
  },
  {
    id: 'q52',
    text: '社会問題を解決するなら、どうアプローチする？',
    emoji: '🌱',
    options: [
      { text: 'テクノロジーで仕組みを変える', emoji: '🤖', effects: { technical: 2, analysis: 2 }, statEffects: { growth: 2, income: 1 } },
      { text: '現場で直接人を支援する', emoji: '🤲', effects: { care: 3, communication: 1 }, statEffects: { satisfaction: 3 } },
      { text: '発信力で世論を動かす', emoji: '📡', effects: { creative: 2, challenge: 2 }, statEffects: { growth: 2 } },
    ],
  },
  {
    id: 'q53',
    text: '「理想の働き方」に一番近いのは？',
    emoji: '🌐',
    options: [
      { text: 'フリーランスで自由に場所や時間を選びたい', emoji: '🏖️', effects: { creative: 2, challenge: 2 }, statEffects: { satisfaction: 2, growth: 1 } },
      { text: '大企業で安定した基盤のもと挑戦したい', emoji: '🏢', effects: { stability: 2, planning: 2 }, statEffects: { income: 2, satisfaction: 1 } },
      { text: 'チームで一体感を持って何かを成し遂げたい', emoji: '🏋️', effects: { communication: 2, care: 2 }, statEffects: { satisfaction: 2 } },
    ],
  },
  {
    id: 'q54',
    text: '自分が一番「没頭」できるのはどんな時？',
    emoji: '🔥',
    options: [
      { text: '難しい課題を解いている時', emoji: '🧩', effects: { analysis: 2, technical: 2 }, statEffects: { growth: 2 } },
      { text: '何かを一から作り上げている時', emoji: '🛠️', effects: { creative: 2, planning: 2 }, statEffects: { satisfaction: 2 } },
      { text: '人と深い対話をしている時', emoji: '💬', effects: { communication: 2, care: 2 }, statEffects: { satisfaction: 2 } },
    ],
  },
  {
    id: 'q55',
    text: '100年後に残したいものは？',
    emoji: '🏛️',
    options: [
      { text: '革新的な発明や作品', emoji: '💡', effects: { creative: 2, technical: 2 }, statEffects: { growth: 2, income: 1 } },
      { text: '多くの人を育てた実績', emoji: '🌳', effects: { care: 3, communication: 1 }, statEffects: { satisfaction: 3 } },
      { text: '世の中の仕組みを変えたという事実', emoji: '⚡', effects: { challenge: 2, planning: 2 }, statEffects: { growth: 2, income: 1 } },
    ],
  },
  {
    id: 'q56',
    text: '「多様性」のある環境で働きたい？',
    emoji: '🌈',
    options: [
      { text: 'ぜひ！色んな視点から刺激を受けたい', emoji: '🌍', effects: { communication: 2, creative: 2 }, statEffects: { growth: 2, satisfaction: 1 } },
      { text: '大事だけど、まずは専門性を磨きたい', emoji: '🎯', effects: { technical: 2, analysis: 2 }, statEffects: { income: 1, growth: 1 } },
      { text: '気が合う仲間と深い関係を築く方が好き', emoji: '🫶', effects: { care: 2, stability: 2 }, statEffects: { satisfaction: 2 } },
    ],
  },
  {
    id: 'q57',
    text: '5年後、どんな自分でいたい？',
    emoji: '🔭',
    options: [
      { text: '業界で名前が通る専門家になりたい', emoji: '🏅', effects: { technical: 2, challenge: 2 }, statEffects: { income: 2, growth: 2 } },
      { text: '信頼される仲間に囲まれていたい', emoji: '👨‍👩‍👧‍👦', effects: { care: 2, communication: 2 }, statEffects: { satisfaction: 3 } },
      { text: '自分のビジョンを形にしていたい', emoji: '🚀', effects: { planning: 2, creative: 2 }, statEffects: { satisfaction: 1, growth: 2 } },
    ],
  },
  {
    id: 'q58',
    text: '「正解がない問題」にどう向き合う？',
    emoji: '❓',
    options: [
      { text: 'データと論理で最善解を導く', emoji: '📊', effects: { analysis: 3, planning: 1 }, statEffects: { growth: 1, income: 1 } },
      { text: '直感を信じて自分なりの答えを出す', emoji: '🌟', effects: { creative: 2, challenge: 2 }, statEffects: { satisfaction: 1, growth: 1 } },
      { text: 'いろんな人の意見を聞いて総合的に判断', emoji: '👂', effects: { communication: 2, care: 2 }, statEffects: { satisfaction: 1 } },
    ],
  },
  {
    id: 'q59',
    text: '「競争」と「協調」、どちらが自分を伸ばす？',
    emoji: '🤼',
    options: [
      { text: '競争！ライバルがいると燃える', emoji: '🔥', effects: { challenge: 3, analysis: 1 }, statEffects: { income: 2, growth: 2 } },
      { text: '協調！仲間と高め合いたい', emoji: '🤝', effects: { care: 2, communication: 2 }, statEffects: { satisfaction: 2, growth: 1 } },
      { text: '一人で黙々と自分のペースで伸びたい', emoji: '🧘', effects: { technical: 2, stability: 2 }, statEffects: { satisfaction: 1, growth: 1 } },
    ],
  },
  {
    id: 'q60',
    text: '仕事で「これだけは譲れない」と思うことは？',
    emoji: '🔑',
    options: [
      { text: '自分の成長を実感できること', emoji: '📈', effects: { challenge: 2, technical: 2 }, statEffects: { growth: 3 } },
      { text: '人から感謝されること', emoji: '🙏', effects: { care: 3, communication: 1 }, statEffects: { satisfaction: 3 } },
      { text: '自分のアイデアや工夫を活かせること', emoji: '💡', effects: { creative: 2, planning: 2 }, statEffects: { satisfaction: 2, growth: 1 } },
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
// 診断タイプ詳細（MBTI級の解説）
// ============================================================
export const diagnosisTypes: DiagnosisType[] = [
  {
    key: 'communication',
    label: 'コミュニケーション型',
    emoji: '💬',
    tagline: '人と人をつなぐ「架け橋」タイプ',
    description: '人と関わることでエネルギーが湧くあなたは、会話や対話を通じて物事を前に進めるのが得意。初対面の相手ともすぐに打ち解けられ、チームの雰囲気を明るくするムードメーカー的存在です。',
    strengths: [
      '初対面でもすぐに信頼関係を築ける',
      'チーム内の雰囲気を良くするのが自然とできる',
      '相手の気持ちを汲み取って適切な言葉を選べる',
      '交渉や調整ごとで力を発揮する',
      '多くの人を巻き込んでプロジェクトを動かせる',
    ],
    weaknesses: [
      '一人で黙々と集中する作業が苦手な場合がある',
      '人の期待に応えようとしすぎて疲れることも',
      '細かいデータ分析より直感で判断しがち',
      '意見を言いすぎて周りとぶつかることがある',
    ],
    workStyle: '会議やディスカッションが多い環境で力を発揮。オープンなオフィスで、人と顔を合わせながら仕事をするのが理想。リモートワークよりも対面でのコミュニケーションを好む傾向があります。',
    communicationStyle: '話し上手で聞き上手。相手の話に共感しながら、自分の意見も率直に伝えられる。グループの中では自然とファシリテーター役になることが多い。',
    idealEnvironment: 'チームワーク重視の組織、顧客との接点が多い仕事、人と会う機会が多いポジション',
    stressSource: '一人きりの長時間作業、コミュニケーションが制限される環境、意見が通らない閉鎖的な組織',
    growthAdvice: 'コミュ力は最強の武器ですが、時にはデータや論理で裏付ける力も磨くと、説得力が何倍にもなります。「伝える力」と「考える力」の両方を持つ人材は、どの業界でも重宝されます。',
    compatibleTypes: ['planning', 'care'],
    challengingTypes: ['technical', 'analysis'],
    suitableJobs: ['営業', 'PR・広報', '人事', 'コンサルタント', 'イベントプロデューサー', '教師'],
    famousPersonas: ['明石家さんまタイプ', 'マツコ・デラックスタイプ', '孫正義タイプ'],
  },
  {
    key: 'planning',
    label: '企画・戦略型',
    emoji: '💡',
    tagline: 'ゼロからイチを生み出す「戦略家」タイプ',
    description: '新しいアイデアを考えて形にするのが生きがい。「こうしたらもっと面白くなるのに」と常に頭の中で企画を練っている人。ビジョンを描き、それを実現するための道筋を考えるのが得意です。',
    strengths: [
      '斬新なアイデアや企画を次々と生み出せる',
      '全体を見渡して戦略を立てるのが得意',
      '複雑なプロジェクトを段取りよく進められる',
      'トレンドを読んで先手を打てる',
      'プレゼンテーションで人を動かせる',
    ],
    weaknesses: [
      'アイデアが多すぎて実行が追いつかないことがある',
      '細かい実務作業を後回しにしがち',
      '完璧を求めすぎて締め切りに追われることも',
      '自分のプランに固執してしまうことがある',
    ],
    workStyle: 'ホワイトボードの前でブレストしている時間が一番幸せ。企画書を書くのは得意だが、その後のルーティン作業は苦手。常に新しいプロジェクトに関わっていたいタイプ。',
    communicationStyle: 'ビジョンを語るのが得意で、周りを巻き込む力がある。ただし、細部の説明は省きがちで「で、具体的にどうするの？」と聞かれることも。',
    idealEnvironment: '新規事業やスタートアップ、企画部門、マーケティングチーム、自由度の高い組織',
    stressSource: '決まりきったルーティン作業、自由にアイデアを出せない環境、変化のない日常',
    growthAdvice: '素晴らしいアイデアも、実行されなければ価値がありません。「考える力」に加えて「やりきる力」を意識的に鍛えると、あなたのアイデアが本当に世界を変える力になります。',
    compatibleTypes: ['communication', 'creative'],
    challengingTypes: ['stability', 'analysis'],
    suitableJobs: ['マーケティング', '広告プランナー', '商品企画', 'プロデューサー', 'コンサルタント', '起業家'],
    famousPersonas: ['スティーブ・ジョブズタイプ', '秋元康タイプ', '前田裕二タイプ'],
  },
  {
    key: 'analysis',
    label: 'ロジカル分析型',
    emoji: '📊',
    tagline: 'データで真実を見抜く「名探偵」タイプ',
    description: 'データや数字を読み解くのが得意で、感覚ではなくファクトベースで物事を判断するあなた。「なぜそうなるのか？」を突き詰めて考える知的好奇心の持ち主。複雑な問題を論理的に分解して解決策を見つけ出します。',
    strengths: [
      '複雑な問題を論理的に分解して解決できる',
      'データから他の人が見落とすパターンを発見できる',
      '感情に流されず冷静な判断ができる',
      '根拠のある提案で周りを納得させられる',
      '正確で質の高いアウトプットを出せる',
    ],
    weaknesses: [
      'データが不足する状況での直感的判断が苦手',
      '分析に時間をかけすぎて意思決定が遅れることがある',
      '感情面のケアが後回しになりがち',
      '「考えすぎ」で行動に移せないことも',
    ],
    workStyle: 'まず情報を集めて分析してから動く慎重派。ExcelやBIツールを駆使してデータと向き合うのが好き。結論に至るまでのプロセスを大事にする。',
    communicationStyle: '論理的で簡潔。データや根拠を示しながら話す。感情的な議論は苦手だが、事実ベースの議論では圧倒的な説得力を持つ。',
    idealEnvironment: 'データドリブンな組織、研究機関、コンサルティングファーム、金融機関',
    stressSource: '根拠のない意思決定、感情論だけの議論、データが手に入らない環境、いい加減な仕事',
    growthAdvice: '分析力は非常に強い武器ですが、「完璧なデータ」が揃うことはめったにありません。不完全な情報からでも意思決定する「割り切り力」を身につけると、リーダーとしても活躍できます。',
    compatibleTypes: ['technical', 'planning'],
    challengingTypes: ['creative', 'challenge'],
    suitableJobs: ['データサイエンティスト', '経営コンサルタント', '金融アナリスト', 'リサーチャー', '公認会計士', 'アクチュアリー'],
    famousPersonas: ['シャーロック・ホームズタイプ', 'ひろゆきタイプ', '落合陽一タイプ'],
  },
  {
    key: 'stability',
    label: '堅実キーパー型',
    emoji: '🛡️',
    tagline: '組織の土台を支える「守護神」タイプ',
    description: '着実にコツコツ積み上げることが得意で、チームの中で「この人がいるから安心」と思われる存在。派手さはなくても、正確さと堅実さで信頼を勝ち取る縁の下の力持ちです。',
    strengths: [
      'ミスなく正確に仕事を進められる',
      '長期的な視点で着実に結果を出せる',
      'ルールや手順を守り、品質を維持できる',
      'プレッシャーの中でも冷静さを保てる',
      '継続力があり、途中で投げ出さない',
    ],
    weaknesses: [
      '変化や突発的な事態への対応に時間がかかる',
      'リスクを取ることに慎重すぎる場合がある',
      '新しい方法を試すより既存のやり方を好む',
      '自分から積極的に発言するのが苦手なことも',
    ],
    workStyle: 'マニュアルや手順書がある環境で力を発揮。毎日のルーティンをきちんとこなし、品質を維持することに誇りを持つ。急な変更は苦手だが、計画通りの仕事なら圧倒的な安定感。',
    communicationStyle: '穏やかで聞き上手。派手な自己主張は少ないが、的確な意見を落ち着いて伝えられる。信頼関係を大切にし、一度築いた関係は長く続く。',
    idealEnvironment: '制度が整った大企業、公務員、金融機関、品質管理が重要な部門',
    stressSource: '頻繁な方針変更、不明確なルール、急すぎる変化、無計画な進行',
    growthAdvice: '安定感は最大の武器ですが、時代の変化に対応する「柔軟性」も意識的に鍛えましょう。「守り」だけでなく「攻め」もできる人材になると、キャリアの選択肢が大きく広がります。',
    compatibleTypes: ['care', 'analysis'],
    challengingTypes: ['challenge', 'creative'],
    suitableJobs: ['公務員', '経理・会計', '品質管理', '法務', '総務', '銀行員'],
    famousPersonas: ['イチロータイプ（コツコツ積み上げ）', '羽生善治タイプ（堅実な戦略）'],
  },
  {
    key: 'challenge',
    label: 'チャレンジャー型',
    emoji: '🚀',
    tagline: '未知の世界に飛び込む「冒険家」タイプ',
    description: '新しいことに飛び込むのが大好きで、「やったことないからこそやりたい」が口癖。失敗を恐れず行動するスピードと、ピンチをチャンスに変える強さを持っています。',
    strengths: [
      '誰よりも早く行動に移せるスピード感',
      '失敗を恐れずチャレンジし続けられる',
      'ピンチの場面で冷静にチャンスを見つけられる',
      '変化の激しい環境でも楽しみながら適応できる',
      '周りを巻き込む情熱とカリスマ性',
    ],
    weaknesses: [
      '慎重さに欠けて見切り発車になることがある',
      'ルーティン作業に飽きやすい',
      'リスクを過小評価してしまうことも',
      '計画よりも勢いで進む分、手戻りが発生しがち',
    ],
    workStyle: 'スピード重視。「まずやってみる」精神で、走りながら考えるタイプ。新規事業や立ち上げフェーズで最も輝く。安定期に入ると次の刺激を求めて動き出す。',
    communicationStyle: '情熱的で、自分のビジョンを熱く語る。人を動かすカリスマ性がある一方、細かい説明が雑になることも。「細かいことはいいから、とりあえずやろう！」が口癖。',
    idealEnvironment: 'スタートアップ、新規事業部門、変化の激しい業界、海外駐在、フリーランス',
    stressSource: '変化のない環境、保守的な組織文化、過度な承認プロセス、行動を制限されること',
    growthAdvice: '行動力は素晴らしいですが、「振り返り」の習慣をつけると成長速度が倍増します。失敗から学ぶ力を磨けば、あなたの挑戦はより大きな成果につながるでしょう。',
    compatibleTypes: ['creative', 'communication'],
    challengingTypes: ['stability', 'analysis'],
    suitableJobs: ['起業家', '新規事業開発', '海外営業', 'ベンチャーキャピタリスト', 'ジャーナリスト', 'パイロット'],
    famousPersonas: ['ホリエモンタイプ', 'イーロン・マスクタイプ', '本田圭佑タイプ'],
  },
  {
    key: 'creative',
    label: 'クリエイティブ型',
    emoji: '🎨',
    tagline: '感性で世界に色を塗る「アーティスト」タイプ',
    description: '自分の感性や表現力を活かして新しいものを生み出すことに喜びを感じるあなた。「美しいもの」「面白いもの」「感動するもの」への感度が高く、独自の世界観を持っています。',
    strengths: [
      '独創的な発想で新しい価値を生み出せる',
      '美的センスが高く、デザインや表現に強い',
      '既存の枠にとらわれない柔軟な思考ができる',
      '感情や雰囲気を的確に表現できる',
      'トレンドをキャッチするアンテナが鋭い',
    ],
    weaknesses: [
      'スケジュール管理や締め切りが苦手なことがある',
      '自分のこだわりが強すぎて妥協できないことも',
      '論理的な説明を求められると苦労する場面がある',
      '評価が主観的になりがちで、数字で成果を示しにくい',
    ],
    workStyle: 'インスピレーションが湧くタイミングに集中して一気に仕上げるタイプ。カフェやお気に入りの場所で作業すると捗る。自由度の高い環境が必須。',
    communicationStyle: '感覚的で詩的な表現が多い。ビジュアルやストーリーで伝えるのが得意。論理的な議論よりも、イメージや感情を共有するコミュニケーションを好む。',
    idealEnvironment: 'デザイン事務所、広告代理店、ゲーム会社、映像制作会社、自由な社風の組織',
    stressSource: 'マニュアル通りの仕事、創造性を発揮できない環境、数字だけで評価される文化',
    growthAdvice: '素晴らしい感性を持っていますが、それを「ビジネスの言語」で伝える力も磨きましょう。クリエイティブ×ロジックの掛け算ができる人材は、市場価値が非常に高いです。',
    compatibleTypes: ['challenge', 'planning'],
    challengingTypes: ['stability', 'analysis'],
    suitableJobs: ['デザイナー', '映像クリエイター', 'コピーライター', 'ファッションデザイナー', 'アニメーター', '建築士'],
    famousPersonas: ['宮崎駿タイプ', '蜷川実花タイプ', 'Steve Wozniakタイプ'],
  },
  {
    key: 'care',
    label: 'ケア・支援型',
    emoji: '🤝',
    tagline: '誰かの笑顔が自分の喜び「サポーター」タイプ',
    description: '人を助けること、支えることに喜びを感じるあなた。相手の気持ちに寄り添い、「ありがとう」の言葉が最大のモチベーション。チームの中ではみんなが安心して力を発揮できる環境を作る存在です。',
    strengths: [
      '相手の気持ちや状況を察する力が高い',
      '困っている人を放っておけない行動力がある',
      'チームの中で安心感を与える存在になれる',
      '人の成長を見守り、長期的な関係を築ける',
      '誰に対しても分け隔てなく接することができる',
    ],
    weaknesses: [
      '自分のことを後回しにしてしまいがち',
      'NOと言えず、負担を抱え込むことがある',
      '感情移入しすぎて疲弊することも',
      '自分の成果を主張するのが苦手',
    ],
    workStyle: '人と直接関わり、感謝される実感が持てる仕事で力を発揮。チームの調和を重視し、困っている人がいたら真っ先にサポートに回る。成果よりもプロセスや人間関係を大切にする。',
    communicationStyle: '温かく穏やかで、傾聴力が高い。相手が安心して話せる雰囲気を自然に作れる。ただし、自分の意見を遠慮して言わないこともあるので、意識的に発言する場面を作ると◎。',
    idealEnvironment: '医療・福祉・教育機関、HR部門、カスタマーサポート、NPO、チームワーク重視の組織',
    stressSource: '人の役に立てていない感覚、競争的すぎる環境、人間関係のトラブル、感謝されない仕事',
    growthAdvice: '支援力は素晴らしい才能ですが、自分自身を大切にすることも忘れずに。「自分が元気でいてこそ、人を支えられる」という意識を持つと、長く活躍し続けられます。',
    compatibleTypes: ['stability', 'communication'],
    challengingTypes: ['challenge', 'technical'],
    suitableJobs: ['看護師', '教師', '社会福祉士', 'カウンセラー', '人事', '保育士'],
    famousPersonas: ['マザー・テレサタイプ', '金八先生タイプ', '天海祐希タイプ（包容力）'],
  },
  {
    key: 'technical',
    label: '技術・専門職型',
    emoji: '🔬',
    tagline: '一つの道を極める「職人」タイプ',
    description: '一つの分野を深く極めたいあなたは、専門知識や技術力で勝負する「プロフェッショナル」志向。表面的な広さよりも、誰にも負けない深さを追求する職人気質を持っています。',
    strengths: [
      '一つの分野を深掘りして専門家になれる',
      '高い集中力で質の高いアウトプットを出せる',
      '技術的な課題を粘り強く解決できる',
      '新しい技術やツールへの学習意欲が高い',
      '客観的で正確な判断ができる',
    ],
    weaknesses: [
      '専門分野以外への関心が薄くなりがち',
      'コミュニケーションが最低限になることがある',
      '自分のやり方にこだわりすぎることも',
      'チームでの協調よりも個人作業を好む傾向',
    ],
    workStyle: '自分の専門性を存分に発揮できるポジションで最も輝く。静かで集中できる環境を好み、一つのタスクに深く没頭するタイプ。マルチタスクよりもシングルタスクで成果を出す。',
    communicationStyle: '簡潔で要点を押さえた話し方。専門用語を使いがちだが、本質を突いた発言が多い。雑談は苦手でも、技術的な議論では誰よりも饒舌になる。',
    idealEnvironment: '研究所、開発部門、専門コンサル、技術者が尊重される組織、スペシャリストとしてのキャリアパスがある会社',
    stressSource: '専門性を活かせない仕事、表面的な人間関係、技術を理解しない上司、中途半端な仕事',
    growthAdvice: '専門性の深さはあなたの最大の武器。でも「伝える力」を少し鍛えると、その専門性の価値が10倍にも100倍にもなります。技術×発信力の掛け算を意識してみてください。',
    compatibleTypes: ['analysis', 'stability'],
    challengingTypes: ['communication', 'care'],
    suitableJobs: ['エンジニア', '研究者', 'データサイエンティスト', '弁理士', '薬剤師', '建築士'],
    famousPersonas: ['まつもとゆきひろタイプ（Ruby開発者）', '中村修二タイプ（青色LED）', '庵野秀明タイプ'],
  },
];

/** トレイトキーから診断タイプ情報を取得 */
export function getDiagnosisType(key: TraitKey): DiagnosisType {
  return diagnosisTypes.find((t) => t.key === key)!;
}

/** トレイトスコアから一番高いトレイトを返す */
export function getPrimaryTrait(traits: Record<TraitKey, number>): TraitKey {
  const entries = Object.entries(traits) as [TraitKey, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

/** トレイトスコアから2番目に高いトレイトを返す */
export function getSecondaryTrait(traits: Record<TraitKey, number>): TraitKey {
  const entries = Object.entries(traits) as [TraitKey, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[1][0];
}
