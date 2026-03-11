import type { JobExperience } from './types';

export const retailSalesExperience: JobExperience = {
  jobId: 'retail-sales',
  title: '小売販売スタッフ体験',
  subtitle: 'アパレルショップで「買う喜び」を届ける一日',
  intro: {
    narration: 'あなたは人気アパレルブランドのショップスタッフとして、お客様に最高のショッピング体験を提供しています。接客、売場づくり、在庫管理...販売のプロフェッショナルとしての一日が始まります。',
    character: { name: '田中副店長', emoji: '👗', role: '販売歴8年のベテランスタッフ。VMD（ビジュアルマーチャンダイジング）の資格も持つ売場づくりのプロ。' },
    briefing: '今日は新商品の入荷日です。売場のレイアウト変更、接客対応、在庫管理、そして売上分析まで、販売スタッフの仕事は多岐にわたります。お客様の心を動かす接客と、データに基づいた売場づくりの両立を目指しましょう。',
  },
  metrics: [
    { key: 'service', label: '接客力', emoji: '😊', color: 'text-blue-500' },
    { key: 'productKnowledge', label: '商品知識', emoji: '👔', color: 'text-green-500' },
    { key: 'merchandising', label: '売場づくり', emoji: '🎨', color: 'text-purple-500' },
    { key: 'teamwork', label: 'チームワーク', emoji: '🤝', color: 'text-amber-500' },
  ],
  scenes: [
    {
      id: 'opening-prep',
      title: '開店準備',
      timeLabel: '午前9:30',
      narration: '開店30分前。店舗の清掃、商品の検品、売場の最終チェックを行います。第一印象が大切な小売業では、開店準備の質がその日の売上を左右します。',
      dialogues: [
        { speaker: '田中副店長', emoji: '👗', text: '今日は秋の新作が入荷したよ。売場のレイアウトを変更する必要があるから、開店までに準備を終わらせよう。' },
        { speaker: 'あなた', emoji: '😊', text: '新作はどのゾーンに配置しますか？前回のセールは奥のコーナーに置いた方がいいですよね。' },
      ],
      situation: '秋の新作コレクションが入荷しました。限られた売場スペースにどのように配置しますか？',
      choices: [
        {
          id: 'vmd-strategy',
          text: '前シーズンの売上データを分析し、お客様の動線を考慮したVMDプランを立てる',
          emoji: '🎨',
          effects: { service: 1, productKnowledge: 2, merchandising: 3, teamwork: 2 },
          feedback: {
            narration: 'データに基づくVMD戦略は、売上を最大化する科学的なアプローチです。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: '素晴らしい！入口にはアイキャッチとなるトレンドアイテム、中間にはコーディネート提案、奥にはベーシックアイテム。お客様の回遊性を高める配置だ。' }],
            lesson: 'VMD（ビジュアルマーチャンダイジング）は「見せ方」の科学です。VP（ビジュアルプレゼンテーション）、PP（ポイントオブセールスプレゼンテーション）、IP（アイテムプレゼンテーション）の3要素を意識しましょう。',
          },
        },
        {
          id: 'trend-display',
          text: '今シーズンのトレンドカラーやスタイルを中心にディスプレイを組む',
          emoji: '✨',
          effects: { service: 1, productKnowledge: 2, merchandising: 2, teamwork: 1 },
          feedback: {
            narration: 'トレンドを取り入れたディスプレイは魅力的ですが、データに基づく検証も必要です。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: 'トレンド感は大事だけど、うちの店のお客様層に合っているかも考えよう。ファッション誌のトレンドと、実際のお客様のニーズは違うことがあるからね。' }],
            lesson: 'トレンドは重要なインプットですが、自店の顧客層（ターゲット）に合わせたローカライズが不可欠です。売上データと顧客分析を組み合わせた売場づくりが効果的です。',
          },
        },
        {
          id: 'stock-priority',
          text: '在庫量の多い商品を目立つ場所に配置し、在庫回転率を優先する',
          emoji: '📦',
          effects: { service: 0, productKnowledge: 1, merchandising: 1, teamwork: 1 },
          feedback: {
            narration: '在庫管理の視点は重要ですが、在庫量だけで売場を構成するとブランドイメージが損なわれます。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: '在庫を消化したい気持ちはわかるけど、売場はお客様のためのもの。在庫処分目的の配置はブランドの世界観を壊してしまう。在庫管理はMD計画で対応しよう。' }],
            lesson: '売場づくりは「在庫消化」ではなく「顧客体験」を軸に考えます。在庫過多の商品は、コーディネート提案やスタイリング技術で魅力的に見せる工夫が重要です。',
          },
        },
      ],
    },
    {
      id: 'customer-service',
      title: '接客対応',
      timeLabel: '午前11:00',
      narration: '店内にお客様が入ってきました。30代女性で、ジャケットコーナーをゆっくり見ています。声掛けのタイミングと方法が接客の質を決めます。',
      dialogues: [
        { speaker: '田中副店長', emoji: '👗', text: '接客は「タイミング」が命。お客様の行動をよく観察して、ベストなタイミングでアプローチしよう。' },
        { speaker: 'お客様', emoji: '👩', text: '（ジャケットを手に取ってサイズタグを確認している）' },
      ],
      situation: 'お客様がジャケットを手に取り、サイズを確認しています。どのようにアプローチしますか？',
      choices: [
        {
          id: 'natural-approach',
          text: 'お客様の選んだ商品について自然な会話を始め、ニーズを丁寧にヒアリングする',
          emoji: '💬',
          effects: { service: 3, productKnowledge: 2, merchandising: 1, teamwork: 1 },
          feedback: {
            narration: 'お客様の行動を観察した上での自然なアプローチは、信頼を得やすい接客の基本です。',
            dialogues: [{ speaker: 'お客様', emoji: '👩', text: '実は来月の結婚式に着ていくジャケットを探していて。フォーマルすぎないけど、きちんと感のあるものが理想なんです。相談に乗ってもらえますか？' }],
            lesson: '接客の基本は「観察→アプローチ→ヒアリング→提案→クロージング」です。まずお客様の行動を観察し、興味を示した商品をきっかけに自然な会話を始めることが大切です。',
          },
        },
        {
          id: 'immediate-approach',
          text: '「いらっしゃいませ、何かお探しですか？」とすぐに声をかける',
          emoji: '🙋',
          effects: { service: 1, productKnowledge: 0, merchandising: 0, teamwork: 1 },
          feedback: {
            narration: 'マニュアル通りの声掛けは、お客様に警戒感を与えることがあります。',
            dialogues: [{ speaker: 'お客様', emoji: '👩', text: 'あ、大丈夫です、ちょっと見ているだけなので...。（少し引いた表情）' }],
            lesson: '「何かお探しですか？」は最もお客様が警戒する声掛けの一つです。お客様がまだ見ている段階では、少し距離を置いて観察し、具体的な興味を示してからアプローチしましょう。',
          },
        },
        {
          id: 'product-info',
          text: '手に取った商品の素材やデザインのこだわりなど、商品情報を中心に説明する',
          emoji: '👔',
          effects: { service: 2, productKnowledge: 3, merchandising: 0, teamwork: 0 },
          feedback: {
            narration: '商品知識を活かした説明はプロらしいですが、お客様のニーズ確認が先です。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: '商品説明は大事だけど、それはお客様のニーズを聞いた後だ。先に商品の話をすると「売り込み」に聞こえる。まずはお客様の「何のために」「どんな場面で」を聞こう。' }],
            lesson: '優れた接客は「聞く7：話す3」のバランスです。商品説明はお客様のニーズを理解してから行うことで、「押し売り」ではなく「最適な提案」と感じてもらえます。',
          },
        },
      ],
    },
    {
      id: 'display-change',
      title: '売場ディスプレイ',
      timeLabel: '午後1:00',
      narration: '昼過ぎ、メインウィンドウのディスプレイを変更する時間です。通行人の目を引き、入店率を高めるディスプレイを作ります。',
      dialogues: [
        { speaker: '田中副店長', emoji: '👗', text: 'ウィンドウディスプレイはお店の「顔」だ。通行人が3秒で足を止めるインパクトが必要だよ。' },
        { speaker: 'あなた', emoji: '😊', text: '今週末は秋の連休ですし、お出かけコーディネートをテーマにしてはどうでしょう？' },
      ],
      situation: 'ウィンドウディスプレイのテーマとスタイリングを決めます。どのようなアプローチを取りますか？',
      choices: [
        {
          id: 'story-display',
          text: '「秋の週末旅行」というストーリーを設定し、シーン全体をコーディネートする',
          emoji: '🎭',
          effects: { service: 2, productKnowledge: 2, merchandising: 3, teamwork: 2 },
          feedback: {
            narration: 'ストーリー性のあるディスプレイは、お客様の想像力を刺激し、購買意欲を高めます。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: '完璧！トランクケースやカフェのカップ小物も使って旅行気分を演出。お客様が「こんな服でお出かけしたい！」と感じるディスプレイだ。VMDの基本はストーリーテリングだよ。' }],
            lesson: '効果的なVMDは「モノを並べる」のではなく「ストーリーを伝える」ことです。お客様がその服を着たシーンを想像できるディスプレイが、入店率と購買率を高めます。',
          },
        },
        {
          id: 'color-display',
          text: '秋カラー（ボルドー、キャメル、カーキ）を中心にカラーコーディネートで統一感を出す',
          emoji: '🎨',
          effects: { service: 1, productKnowledge: 2, merchandising: 2, teamwork: 1 },
          feedback: {
            narration: 'カラーコーディネートは視覚的に美しいですが、もう一工夫するとさらに効果的です。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: 'カラーの統一感はいいね。ただ、色だけだと「きれい」で終わってしまう。お客様が「自分が着たらどうなるか」をイメージできるように、生活シーンの提案を加えるともっと良くなるよ。' }],
            lesson: 'カラーコーディネートはVMDの重要な要素ですが、それだけでは「ギャラリー」になってしまいます。お客様の「着用シーン」を想起させる演出をプラスしましょう。',
          },
        },
        {
          id: 'price-display',
          text: '新作の目玉商品を大きくフィーチャーし、価格の魅力も訴求する',
          emoji: '🏷️',
          effects: { service: 0, productKnowledge: 1, merchandising: 1, teamwork: 1 },
          feedback: {
            narration: '価格訴求型のディスプレイは、ブランドイメージを損なうリスクがあります。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: '価格を前面に出すのはスーパーの手法だ。アパレルブランドのディスプレイでは、価値を伝えることが大切。安さではなく、おしゃれさや品質で選んでもらえるブランドを目指そう。' }],
            lesson: 'アパレルブランドのVMDでは、価格ではなく「価値」を伝えることが重要です。ブランドの世界観やライフスタイル提案を通じて、価格以上の魅力を発信しましょう。',
          },
        },
      ],
    },
    {
      id: 'complaint',
      title: 'クレーム対応',
      timeLabel: '午後2:30',
      narration: '先日購入されたお客様がクレームを持って来店されました。クレーム対応は販売スタッフの重要なスキルの一つです。',
      dialogues: [
        { speaker: '怒っているお客様', emoji: '😤', text: '先週買ったニット、1回洗っただけで毛玉だらけになったんですけど！高かったのにこれはひどいでしょう？' },
        { speaker: '田中副店長', emoji: '👗', text: '（小声で）まず落ち着いて。クレーム対応の基本は「傾聴→共感→解決策の提示」だよ。' },
      ],
      situation: 'お客様がニットの品質についてクレームを訴えています。どのように対応しますか？',
      choices: [
        {
          id: 'empathy-first',
          text: 'まずお客様の不満に共感し、詳しい状況を聞いた上で、交換・返品の対応を提案する',
          emoji: '👂',
          effects: { service: 3, productKnowledge: 2, merchandising: 0, teamwork: 2 },
          feedback: {
            narration: '共感から始まるクレーム対応は、怒りを鎮め、信頼回復につなげる最善の方法です。',
            dialogues: [{ speaker: '怒っているお客様', emoji: '😤', text: '...ちゃんと話を聞いてくれてありがとう。洗濯ネットに入れてなかったかもしれないけど、それでも毛玉はちょっとね。交換してもらえるなら助かります。' }],
            lesson: 'クレーム対応の黄金法則は「傾聴→謝罪→共感→原因確認→解決策提示→フォロー」です。まず感情に寄り添い、その後で事実確認と解決策を提示しましょう。',
          },
        },
        {
          id: 'care-instruction',
          text: 'お手入れ方法を確認し、正しい洗濯方法を説明する',
          emoji: '📋',
          effects: { service: 1, productKnowledge: 2, merchandising: 0, teamwork: 0 },
          feedback: {
            narration: 'お手入れ方法の説明は必要ですが、最初に行うとお客様を非難しているように聞こえます。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: '正しい情報だけど、タイミングが悪い。お客様が怒っている時にケア方法を説明すると「あなたの洗い方が悪い」と言っているように聞こえる。まず共感してからだよ。' }],
            lesson: 'クレーム対応では「正論」よりも「共感」が先です。お客様は問題解決だけでなく、感情を理解してもらうことを求めています。事実確認は気持ちが落ち着いてから行いましょう。',
          },
        },
        {
          id: 'quick-exchange',
          text: 'すぐに新品との交換を申し出て、迅速に対応する',
          emoji: '🔄',
          effects: { service: 2, productKnowledge: 0, merchandising: 0, teamwork: 1 },
          feedback: {
            narration: '迅速な対応は好印象ですが、原因を確認しないと同じ問題が再発する可能性があります。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: 'スピーディーな対応はいいけど、原因を確認しないまま交換すると、また同じことが起きるかもしれない。洗濯方法の確認と、必要なら本社品質管理部門への報告も大事だよ。' }],
            lesson: 'クレームは「問題の芽」を発見するチャンスでもあります。原因を正確に把握し、製品の品質改善や接客時の説明強化につなげることで、組織全体の成長に貢献できます。',
          },
        },
      ],
    },
    {
      id: 'inventory',
      title: '在庫管理',
      timeLabel: '午後4:00',
      narration: '閉店に向けて在庫の確認作業を行います。在庫回転率の管理は店舗の収益に直結する重要業務です。',
      dialogues: [
        { speaker: '田中副店長', emoji: '👗', text: '在庫管理はアパレルの生命線だ。過剰在庫はセール（値引き）で処分するしかなく、利益を圧迫する。逆に欠品は販売機会の損失だ。' },
        { speaker: 'あなた', emoji: '😊', text: '夏物のセール品がまだバックヤードに残っています。新作の入荷で保管スペースも足りなくなってきました。' },
      ],
      situation: '夏物の在庫が残っており、秋物の新作も入荷しています。在庫管理をどう進めますか？',
      choices: [
        {
          id: 'data-driven',
          text: '売上データとSKU別の回転率を分析し、夏物の最終処分計画と秋物の追加発注を判断する',
          emoji: '📊',
          effects: { service: 1, productKnowledge: 2, merchandising: 3, teamwork: 2 },
          feedback: {
            narration: 'データに基づく在庫管理は、利益最大化の鍵です。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: '完璧な分析だ。SKU別の消化率を見ると、夏物のリネンシャツはまだ売れる可能性がある。秋口にも着られるから、コーディネート提案で消化しよう。逆にサンダルは即セール対象だね。' }],
            lesson: 'アパレルの在庫管理は「消化率」と「回転率」が重要指標です。SKU（Stock Keeping Unit）別に分析し、売れ筋の追加発注と不良在庫の早期処分を判断します。',
          },
        },
        {
          id: 'clearance-sale',
          text: '夏物を一律50%オフにしてクリアランスセールを実施する',
          emoji: '🏷️',
          effects: { service: 1, productKnowledge: 0, merchandising: 1, teamwork: 1 },
          feedback: {
            narration: '一律値引きは簡単ですが、まだ売れる商品まで値引きしてしまう可能性があります。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: '一律値引きは最終手段だ。まだ定価で売れるアイテムまで値引きすると「あの店はすぐセールする」というイメージがつく。商品ごとに判断しよう。' }],
            lesson: '安易なセールは短期的に在庫を減らせますが、ブランド価値を毀損し、「セール待ち」の顧客を増やすリスクがあります。商品別の消化率に基づいた戦略的な値引きが重要です。',
          },
        },
        {
          id: 'store-transfer',
          text: '他店舗への在庫移動を優先し、店舗間で在庫を融通する',
          emoji: '🔄',
          effects: { service: 0, productKnowledge: 1, merchandising: 2, teamwork: 3 },
          feedback: {
            narration: '店舗間の在庫融通は有効な手段の一つですが、それだけでは根本解決になりません。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: '店舗間移動はいい発想だ。地域によって売れ筋は違うからね。ただ、移動コストもかかるから、データ分析と組み合わせて判断しよう。' }],
            lesson: '店舗間在庫移動は、エリア特性（気候、客層、競合状況）を考慮して行います。北日本の店舗ではまだ夏物が売れる場合もあり、全社最適の視点が重要です。',
          },
        },
      ],
    },
    {
      id: 'closing-analysis',
      title: '閉店・売上分析',
      timeLabel: '午後8:00',
      narration: '閉店後、今日の売上データを分析し、翌日の戦略を立てます。数字の振り返りは販売スタッフの成長に欠かせない日課です。',
      dialogues: [
        { speaker: '田中副店長', emoji: '👗', text: '今日の売上は目標の95%。あと少し届かなかったね。何が原因か一緒に振り返ろう。' },
        { speaker: 'あなた', emoji: '😊', text: '客単価は上がったのですが、来店数が予想より少なかったです。' },
      ],
      situation: '売上目標に届かなかった原因を分析し、明日の改善策を考えます。どのようにアプローチしますか？',
      choices: [
        {
          id: 'kpi-analysis',
          text: '客数×客単価×購買率に分解し、各KPIの前日比・前年比を詳細に分析する',
          emoji: '📊',
          effects: { service: 1, productKnowledge: 2, merchandising: 3, teamwork: 2 },
          feedback: {
            narration: 'KPI分解による原因分析は、科学的な売上改善の基本手法です。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: '素晴らしい分析だ。客数は前年比90%だが、購買率が5%アップしている。つまり入店したお客様への接客は良かったが、集客に課題がある。明日はSNS発信を強化してみよう。' }],
            lesson: '小売業の売上は「客数×客単価×購買率（コンバージョンレート）」に分解できます。どのKPIに課題があるかを特定することで、的確な改善策を打てます。',
          },
        },
        {
          id: 'staff-feedback',
          text: 'スタッフ全員で今日の接客を振り返り、良かった点・改善点を共有する',
          emoji: '💬',
          effects: { service: 2, productKnowledge: 1, merchandising: 1, teamwork: 3 },
          feedback: {
            narration: 'チームでの振り返りは、スタッフ全員の成長とモチベーション向上に効果的です。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: 'チームミーティングはいいね。数字だけじゃなく、現場の実感も大事だ。「今日はこんなお客様がいて、こう対応したら喜んでもらえた」という共有が全員のスキルアップにつながる。' }],
            lesson: '小売業では「成功事例の共有」がチーム全体のスキル向上に効果的です。ベストプラクティスを言語化し、ナレッジとして蓄積することで、組織の接客レベルが底上げされます。',
          },
        },
        {
          id: 'tomorrow-plan',
          text: '明日の天候や曜日特性を考慮し、重点商品と接客戦略を立てる',
          emoji: '📋',
          effects: { service: 2, productKnowledge: 2, merchandising: 2, teamwork: 1 },
          feedback: {
            narration: '翌日の計画を立てる姿勢は良いですが、今日の原因分析が先です。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: '計画を立てるのはいいけど、今日の振り返りが甘いと同じ失敗を繰り返す。PDCAのCとAを丁寧にやってから、次のPに移ろう。' }],
            lesson: 'PDCAサイクル（Plan→Do→Check→Act）は小売業でも基本です。特にCheck（振り返り）を丁寧に行うことで、翌日のPlan（計画）の質が格段に向上します。',
          },
        },
      ],
    },
    {
      id: 'reflection',
      title: '振り返り',
      timeLabel: '帰宅後',
      narration: '一日を終え、販売スタッフとしてのキャリアについて考えます。接客の最前線で働くこの仕事の魅力と将来性について振り返ります。',
      dialogues: [
        { speaker: '田中副店長', emoji: '👗', text: '販売の仕事は「お客様の笑顔」がやりがいだ。でも、それだけじゃなくデータ分析やマネジメントのスキルも身につく。将来のキャリアにも活きるよ。' },
        { speaker: 'あなた', emoji: '😊', text: '接客、VMD、在庫管理...想像以上に幅広いスキルが求められるんですね。' },
      ],
      situation: '販売スタッフとして最も大切にしたいことは何ですか？',
      choices: [
        {
          id: 'customer-delight',
          text: 'お客様一人ひとりに合わせた最高の接客体験を提供すること',
          emoji: '✨',
          effects: { service: 3, productKnowledge: 2, merchandising: 1, teamwork: 2 },
          feedback: {
            narration: '顧客体験の追求は、小売業の本質であり最大の差別化ポイントです。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: 'EC（ネット通販）が普及した今、実店舗の価値は「人」にある。画面では味わえない、人と人のコミュニケーションが生む体験。それがリアル店舗の存在意義だよ。' }],
            lesson: 'EC全盛の時代に実店舗が生き残る鍵は「顧客体験（CX）」です。商品を売るだけでなく、スタイリング提案や試着体験など、オンラインにはない価値を提供することが重要です。',
          },
        },
        {
          id: 'business-skill',
          text: 'データ分析とマネジメントスキルを磨き、将来は店長・エリアマネージャーを目指す',
          emoji: '📈',
          effects: { service: 1, productKnowledge: 2, merchandising: 2, teamwork: 3 },
          feedback: {
            narration: 'キャリアアップの意識を持ちながら日々の業務に取り組む姿勢は素晴らしいです。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: 'いい目標だね。店長になるには接客力だけでなく、数字管理、スタッフ育成、本部との連携が必要になる。今のうちからその意識を持って仕事に取り組もう。' }],
            lesson: '販売スタッフのキャリアパスは、副店長→店長→エリアマネージャー→本部MD（マーチャンダイザー）と多彩です。現場経験を活かしたキャリアアップが可能です。',
          },
        },
        {
          id: 'brand-building',
          text: 'ブランドの世界観を体現し、ファンを増やすブランドアンバサダーになること',
          emoji: '👗',
          effects: { service: 2, productKnowledge: 3, merchandising: 2, teamwork: 1 },
          feedback: {
            narration: 'ブランドの世界観を伝える力は、販売スタッフの大きな付加価値です。',
            dialogues: [{ speaker: '田中副店長', emoji: '👗', text: 'ブランドの「顔」になるという意識は大切だ。SNSでの発信力も含めて、ブランドの魅力を多くの人に伝えられるスタッフは、今の時代本当に貴重な存在だよ。' }],
            lesson: '現代の販売スタッフは「ブランドアンバサダー」としての役割も担います。SNSでの情報発信、顧客との関係構築を通じて、ブランドのファンコミュニティを育てることも重要な仕事です。',
          },
        },
      ],
    },
  ],
  ending: (scores) => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const topMetric = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const topLabels: Record<string, string> = {
      service: '接客のプロフェッショナル',
      productKnowledge: '商品知識の達人',
      merchandising: '売場づくりのスペシャリスト',
      teamwork: 'チームを導くリーダー',
    };
    if (total >= 28) {
      return {
        title: topLabels[topMetric] ?? '優秀な販売スタッフ',
        emoji: '🌟',
        summary: 'あなたはお客様への細やかな接客と、データに基づく売場づくりを両立した優れた販売スタッフです。チームワークも良好で、店舗の戦力として高く評価されています。',
        learnings: [
          '接客は「聞く」ことから始まる',
          'VMDは「ストーリーを伝える」ことが本質',
          '売上はKPI分解で科学的に改善できる',
          'クレーム対応は「共感→解決」の順が鉄則',
        ],
        realWorldNote: 'アパレル販売の仕事は未経験からスタートしやすく、接客スキル、VMD、マネジメント力など汎用的なスキルが身につきます。販売士検定やファッションビジネス能力検定などの資格も有用です。',
      };
    }
    return {
      title: '成長中の販売スタッフ',
      emoji: '🌱',
      summary: '販売の基本を学びましたが、接客スキルや売場づくりにはまだ成長の余地があります。お客様の笑顔を目標に、日々の業務で経験を積んでいきましょう。',
      learnings: [
        '販売は接客だけでなく、在庫管理やデータ分析も重要',
        'お客様の潜在ニーズを引き出すヒアリング力が鍵',
        '売場づくりは科学（データ）とアート（感性）の融合',
        'チームワークが店舗の雰囲気と売上に直結する',
      ],
      realWorldNote: 'アパレル業界はECの普及で変革期を迎えています。オムニチャネル（店舗とネットの融合）対応や、SNSマーケティングの知識を持つ販売スタッフの需要が高まっています。',
    };
  },
};
