import type { JobExperience } from './types';

/** パティシエ体験ゲーム */
export const patissierExperience: JobExperience = {
  jobId: 'patissier',
  title: 'パティシエ体験',
  subtitle: '夢をカタチに！ 街のケーキ屋さんの1日',
  intro: {
    narration: 'あなたは今日から、街の人気ケーキ屋「パティスリー・エトワール」で働くパティシエです。お菓子を通じてお客さまを笑顔にしましょう！',
    character: {
      name: 'マリ先輩',
      emoji: '👩‍🍳',
      role: 'チーフパティシエ',
    },
    briefing:
      'いらっしゃい！ うちのお店は「お客さまの大切な日を彩るケーキ」がモットーなの。今日は忙しくなりそうだから、一緒にがんばろうね！',
  },
  metrics: [
    { key: 'taste', label: '味', emoji: '😋', color: 'text-orange-500' },
    { key: 'presentation', label: '見た目', emoji: '🎨', color: 'text-pink-500' },
    { key: 'efficiency', label: '段取り', emoji: '⏱️', color: 'text-blue-500' },
    { key: 'customerSatisfaction', label: 'お客さま満足', emoji: '😊', color: 'text-green-500' },
  ],
  scenes: [
    // ── シーン1: 朝の仕込み ──
    {
      id: 'morning-prep',
      title: '朝の仕込みを始めよう',
      timeLabel: '6:00',
      narration: 'パティシエの朝は早い。お店が開く前に、今日のケーキの土台を仕込みます。',
      dialogues: [
        { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'おはよう！ 今日の仕込みリストはこれ。ショートケーキ30個、チョコレートケーキ20個、あとシュークリーム50個。' },
        { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '全部を開店の10時までに終わらせないといけないの。どの順番で作る？' },
      ],
      situation: '3種類のお菓子を4時間で仕込みます。順番をどうしますか？',
      choices: [
        {
          id: 'chill-first',
          text: 'チョコケーキ → ショートケーキ → シュークリーム（冷やすのに時間がかかるものから）',
          emoji: '❄️',
          effects: { taste: 1, presentation: 1, efficiency: 3, customerSatisfaction: 1 },
          feedback: {
            narration: '冷やす時間が必要なものから作ったので、待ち時間に次の作業ができました！',
            dialogues: [
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'いいね！ パティシエの仕事で一番大事なのが「段取り」なの。冷蔵庫で冷やしてる間に次を作れるから、時間のムダがないでしょ？' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '料理もお菓子作りも「待ち時間」をうまく使える人が一流なのよ。' },
            ],
            lesson: '「待ち時間を活用する段取り」はパティシエの基本スキル。冷やす・焼く・寝かせるの間に次の工程を進めることで、限られた時間で最大限の品数を作れます。',
          },
        },
        {
          id: 'easy-first',
          text: 'シュークリーム → ショートケーキ → チョコケーキ（簡単なものから）',
          emoji: '📈',
          effects: { taste: 2, presentation: 1, efficiency: 1, customerSatisfaction: 2 },
          feedback: {
            narration: '簡単なものから始めたので、ウォーミングアップしながら調子を上げられました。ただチョコケーキの冷やし時間はギリギリに。',
            dialogues: [
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '簡単なものから手を動かしてリズムを作る方法もアリよね。実際、体が温まってから難しいものに取り掛かるメリットはあるの。' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'ただ、チョコケーキの冷やし時間を逆算すると、段取り面ではちょっとタイトになるわね。慣れてきたら冷やす時間も意識してみて。' },
            ],
            lesson: '簡単な作業から始めてリズムを作るアプローチにもメリットがあります。一方で「工程の所要時間」を逆算する段取り力も大切。自分に合ったやり方を見つけていきましょう。',
          },
        },
        {
          id: 'all-at-once',
          text: '3種類を同時に少しずつ進める',
          emoji: '🔄',
          effects: { taste: 1, presentation: 0, efficiency: 2, customerSatisfaction: 2 },
          feedback: {
            narration: '同時並行で進めたことで、すべての商品が少しずつ均等に仕上がっていきました。',
            dialogues: [
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '並行作業は上級者向けだけど、すべてを少しずつ進めておくと「どれか一つが大幅に遅れる」リスクを防げるメリットがあるのよ。' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'ただ、切り替えが多い分ミスも出やすいから、温度やタイミングの管理は特に丁寧にね。慣れると強い武器になるわ。' },
            ],
            lesson: '並行作業は切り替えコストがかかりますが、全体のリスク分散ができるメリットもあります。経験を積んで「計画的な並行作業」ができるようになると、プロの強みになります。',
          },
        },
      ],
    },

    // ── シーン2: 特別注文 ──
    {
      id: 'custom-order',
      title: 'お客さまの特別な注文',
      timeLabel: '10:30',
      narration: 'お店が開くと、さっそくお客さまが特別注文の相談に来ました。',
      dialogues: [
        { speaker: 'お客さま', emoji: '👩', text: '来週の娘の誕生日に、イチゴのケーキをお願いしたいんです。でも息子が卵アレルギーで…一緒に食べられるケーキはできますか？' },
        { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '（小声で）卵なしのスポンジは作れるけど、いつもと違う材料とレシピが必要よ。どう対応する？' },
      ],
      situation: 'アレルギー対応のケーキは作れますが、通常よりも手間がかかります。',
      choices: [
        {
          id: 'accept-without-checking',
          text: 'アレルギーの詳細を聞かずに「大丈夫ですよ！」と引き受ける',
          emoji: '👌',
          effects: { taste: 1, presentation: 1, efficiency: 1, customerSatisfaction: 2 },
          feedback: {
            narration: 'お客さまは喜んでくれましたが、マリ先輩がアレルギーの詳細確認の大切さを教えてくれました。',
            dialogues: [
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '引き受ける姿勢はいいわね！ ただ、卵アレルギーにも色々な重さがあるの。微量でもダメな人もいるから、詳しく確認するステップを加えるともっと安心よ。' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'お客さまに喜んでもらいたい気持ちは大事。そこに「安全確認」をプラスすれば完璧ね。' },
            ],
            lesson: 'お客さまの要望に応えたい気持ちは素晴らしいスタートライン。そこに「アレルギーの詳細確認」という安全ステップを加えることで、より信頼されるパティシエになれます。',
          },
        },
        {
          id: 'accept-with-info',
          text: 'アレルギー内容を詳しく聞いて、対応できるメニューを提案する',
          emoji: '📝',
          effects: { taste: 1, presentation: 1, efficiency: 0, customerSatisfaction: 3 },
          feedback: {
            narration: '丁寧にヒアリングして、安全で美味しいケーキを提案しました。',
            dialogues: [
              { speaker: 'あなた', emoji: '🧑‍🍳', text: '卵の代わりに豆乳と米粉を使ったスポンジで作れます。見た目も味も遜色ないですよ。アレルギーの重さによって対応が変わるので、もう少し教えていただけますか？', isPlayer: true },
              { speaker: 'お客さま', emoji: '👩', text: '家族みんなで食べられるなんて嬉しい！ ありがとうございます！' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'パーフェクトな対応！ アレルギー情報は命に関わるから、しっかり聞くのは本当に大事なことなの。' },
            ],
            lesson: 'パティシエにとってアレルギー対応は命に関わる重要事項。お客さまの要望を丁寧に聞き、安全を最優先にしながら最善のケーキを提案するのがプロの仕事です。',
          },
        },
        {
          id: 'refuse-politely',
          text: '「うちではアレルギー対応は難しいです」と丁寧に断る',
          emoji: '🙏',
          effects: { taste: 0, presentation: 0, efficiency: 3, customerSatisfaction: 1 },
          feedback: {
            narration: '丁寧にお断りしつつ、専門店を紹介することでお客さまも納得してくれました。',
            dialogues: [
              { speaker: 'お客さま', emoji: '👩', text: 'そうですか… でも専門のお店を教えてもらえて助かります。' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '無理に引き受けてリスクを抱えるより、専門のお店を紹介する判断も立派なプロ意識よ。安全面を考えると、この対応にもしっかりした理由があるわね。' },
            ],
            lesson: '自分のお店で対応しきれないと判断したとき、正直に伝えて専門店を紹介するのも誠実な対応です。お客さまの安全を最優先にした判断力はプロとして大切です。',
          },
        },
      ],
    },

    // ── シーン3: 味の調整 ──
    {
      id: 'taste-test',
      title: '新作ケーキの味を決めよう',
      timeLabel: '11:30',
      narration: '来月の新メニュー候補「レモンのレアチーズケーキ」の試作品ができました。',
      dialogues: [
        { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '試食してみて。この味、どう思う？' },
        { speaker: 'あなた', emoji: '🧑‍🍳', text: '（食べてみる… レモンの味はいいけど、ちょっと甘すぎるかな…）', isPlayer: true },
        { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '正直に感想を聞かせて。パティシエは「おいしい」と思ったら終わりじゃなくて、「なぜおいしいか」「何が足りないか」を言葉にする力が要るのよ。' },
      ],
      situation: '試作品の味はいいけれど、甘さが強いと感じました。先輩にどうフィードバックしますか？',
      choices: [
        {
          id: 'harsh-feedback',
          text: '「甘すぎです。これじゃダメだと思います」',
          emoji: '😤',
          effects: { taste: 2, presentation: 0, efficiency: 1, customerSatisfaction: 1 },
          feedback: {
            narration: 'ストレートな指摘で、問題点がすぐに伝わりました。',
            dialogues: [
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '率直に言ってくれてありがとう。問題点がすぐ分かるのは助かるわ。' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '次のステップとして「良いところ」と「改善ポイント」をセットで伝えられると、さらに建設的な議論になるわよ。' },
            ],
            lesson: 'ストレートなフィードバックは問題の早期発見に役立ちます。さらに「良い点＋改善点」をセットで伝えるスキルを身につけると、チームの議論がもっと活発になります。',
          },
        },
        {
          id: 'vague-feedback',
          text: '「おいしいと思います！」とだけ答える',
          emoji: '😊',
          effects: { taste: 0, presentation: 1, efficiency: 2, customerSatisfaction: 2 },
          feedback: {
            narration: '先輩との関係を大事にする姿勢はチームワークの面で好印象でした。',
            dialogues: [
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '褒めてくれるのは嬉しいわ。でもね、試作品の段階ではどんな小さな気づきでも教えてもらえると助かるの。' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'お客さまに出す前に改善できるチャンスだから、次は気づいたことも一緒に伝えてみてね。' },
            ],
            lesson: 'チーム内の関係性を大切にする姿勢は素晴らしいものです。そこに少しずつ具体的な意見を加えていけると、チーム全体の品質がさらに高まります。',
          },
        },
        {
          id: 'specific-feedback',
          text: '「レモンの香りは最高です！ でも甘さをもう少し抑えて酸味を活かしたらどうでしょう？」',
          emoji: '🍋',
          effects: { taste: 3, presentation: 0, efficiency: 1, customerSatisfaction: 1 },
          feedback: {
            narration: '具体的なフィードバックで、味の改善方針が見えてきました！',
            dialogues: [
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'いいね！ 「何が良くて、何をどう変えたいか」を具体的に言えるのは、パティシエとして大事な力よ。' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '砂糖を少し減らしてレモン果汁を足してみましょう。' },
            ],
            lesson: 'プロの味覚は「おいしい・まずい」ではなく「甘い・酸っぱい・苦い」のバランスで考えます。感覚を言葉にする力は、パティシエの重要なスキルです。',
          },
        },
      ],
    },

    // ── シーン4: トラブル対応 ──
    {
      id: 'trouble',
      title: '材料がたりない！',
      timeLabel: '14:00',
      narration: '午後、予想以上にショートケーキが売れて、イチゴが足りなくなりそうです。',
      dialogues: [
        { speaker: 'ユウキくん', emoji: '👦', text: 'マリ先輩！ イチゴがあと10個分しかないです！ でも予約がまだ5個…' },
        { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '仕入れ先に確認したけど、今日の追加はムリみたい。どうしようか？' },
      ],
      situation: 'イチゴが足りません。予約分は確保しなければいけませんが、お店にはまだお客さまが来そうです。',
      choices: [
        {
          id: 'use-all',
          text: '来るかどうか分からないお客さまの分も含めて、全部作ってしまう',
          emoji: '🎲',
          effects: { taste: 1, presentation: 2, efficiency: 1, customerSatisfaction: 1 },
          feedback: {
            narration: '店頭に並ぶケーキの種類を最大限キープでき、来店客には喜ばれました。ただ予約分の確保がギリギリに。',
            dialogues: [
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '売り場を充実させたい気持ちは分かるわ。来店客を大事にするのもお店にとって大切なこと。' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'ただ予約分の確保は先に計算しておくともっと安心ね。「予約を守りつつ店頭も充実」のバランスを意識してみて。' },
            ],
            lesson: '店頭の品揃えを充実させることは来店客の満足につながります。同時に、予約分を先に確保してから残りで勝負する計画性があると、さらに安定した運営ができます。',
          },
        },
        {
          id: 'creative-solution',
          text: '店頭分はイチゴの代わりに旬のフルーツを使った「本日限定ケーキ」にする',
          emoji: '🍊',
          effects: { taste: 2, presentation: 2, efficiency: 0, customerSatisfaction: 2 },
          feedback: {
            narration: 'ピンチをチャンスに変えました！ 限定ケーキが大人気に！',
            dialogues: [
              { speaker: 'お客さま', emoji: '🧑', text: '限定ケーキ？ 面白い！ 1つください！' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'いいアイデアね！ トラブルを「限定」っていう価値に変えるのはクリエイティブよ。ただ、新しいレシピを急いで作るから段取りはちょっと大変になるわね。' },
            ],
            lesson: '「あるもので最高のものを作る」発想力はパティシエの強み。新しいメニューを急遽作る手間はかかりますが、お客さまに新鮮な驚きを届けられます。',
          },
        },
        {
          id: 'reduce-display',
          text: '予約分だけ確保して、店頭のショートケーキは売り切れにする',
          emoji: '🔒',
          effects: { taste: 1, presentation: 0, efficiency: 3, customerSatisfaction: 2 },
          feedback: {
            narration: '予約分をしっかり確保でき、約束を守ることができました。',
            dialogues: [
              { speaker: 'ユウキくん', emoji: '👦', text: '予約のお客さまにはちゃんとお届けできました！ 店頭のお客さまには他のケーキをおすすめしました。' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '予約を最優先にするのは堅実な判断ね。お店の信頼はこういう地道な対応で積み重なるの。' },
            ],
            lesson: '予約は「お客さまとの約束」。約束を確実に守ることがお店の信頼の基盤です。堅実な在庫管理はパティシエの重要なスキルの一つです。',
          },
        },
      ],
    },

    // ── シーン5: 後輩指導 ──
    {
      id: 'teaching',
      title: '後輩に教えよう',
      timeLabel: '15:30',
      narration: '後輩のユウキくんがデコレーションに苦戦しています。',
      dialogues: [
        { speaker: 'ユウキくん', emoji: '👦', text: 'うう… クリームをナッペ（ケーキに塗る作業）するの、全然きれいにならないです…' },
        { speaker: 'ユウキくん', emoji: '👦', text: 'センスがないのかなぁ…' },
      ],
      situation: '後輩が落ち込んでいます。自分もまだ勉強中ですが、どう対応しますか？',
      choices: [
        {
          id: 'do-it-yourself',
          text: '「僕がやるから見てて！」と代わりにやってあげる',
          emoji: '✋',
          effects: { taste: 0, presentation: 2, efficiency: 2, customerSatisfaction: 1 },
          feedback: {
            narration: 'お手本を見せたことで、ユウキくんは完成形のイメージをつかむことができました。',
            dialogues: [
              { speaker: 'ユウキくん', emoji: '👦', text: 'なるほど、こういう仕上がりを目指せばいいんですね！ 次は自分でやってみます！' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'お手本を見せるのは大事な教え方の一つよ。完成形を知ることで目標が明確になるわ。次は本人にやらせてあげてね。' },
            ],
            lesson: 'お手本を見せることは「ゴールの共有」として有効な指導法です。見せた後に本人に挑戦させることで、効率と成長を両立できます。',
          },
        },
        {
          id: 'encourage-only',
          text: '「大丈夫！ 練習すればできるよ！」と励ます',
          emoji: '💪',
          effects: { taste: 0, presentation: 1, efficiency: 1, customerSatisfaction: 2 },
          feedback: {
            narration: '温かい励ましでユウキくんの気持ちが前向きになり、もう一度挑戦する元気が出ました。',
            dialogues: [
              { speaker: 'ユウキくん', emoji: '👦', text: 'ありがとうございます！ もう1回やってみます！' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '気持ちを支えるのは本当に大事なこと。落ち込んでる時はまず心のケアよね。次のステップとして、具体的なコツも一緒に伝えられるとさらに成長が加速するわよ。' },
            ],
            lesson: '落ち込んでいる人にはまず心理的なサポートが効果的です。安心感があってこそ挑戦する気持ちが生まれます。そこに具体的なアドバイスを加えると最強の組み合わせになります。',
          },
        },
        {
          id: 'show-and-teach',
          text: '隣で一緒にやりながら「手首の角度をこうするといいよ」とコツを教える',
          emoji: '🤲',
          effects: { taste: 0, presentation: 2, efficiency: 0, customerSatisfaction: 3 },
          feedback: {
            narration: '実際にやって見せながら教えたことで、ユウキくんも上達しました！',
            dialogues: [
              { speaker: 'ユウキくん', emoji: '👦', text: 'あ、本当だ！ 手首の角度を変えるだけで全然違う！ ありがとうございます！' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'いい教え方ね。パティシエの技術は「見て覚える」だけじゃなくて「言葉にして伝える」ことで後輩も、教える自分も成長するのよ。' },
            ],
            lesson: '技術を「言葉にして教える」のは、自分の理解も深まる学びの機会。パティシエの世界では先輩から後輩への技術伝承がとても大切にされています。',
          },
        },
      ],
    },

    // ── シーン6: クリスマスケーキの企画 ──
    {
      id: 'planning',
      title: 'クリスマスケーキを企画しよう',
      timeLabel: '16:30',
      narration: 'マリ先輩から「今年のクリスマス限定ケーキのアイデアを出して」と言われました。',
      dialogues: [
        { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '今年のクリスマスケーキ、何か新しいことをやりたいの。アイデア出してみて！' },
        { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'ポイントは「見た目のインパクト」「うちのお店らしさ」「材料コスト」の3つね。' },
      ],
      situation: 'クリスマスケーキの企画を任されました。どんなアイデアを出しますか？',
      choices: [
        {
          id: 'cost-focus',
          text: '材料コストを最優先に、シンプルなケーキにする',
          emoji: '💰',
          effects: { taste: 2, presentation: 0, efficiency: 3, customerSatisfaction: 1 },
          feedback: {
            narration: 'コストを抑えた分、利益率の高い商品になりそうです。',
            dialogues: [
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'コスト管理は経営で超大事よ！ シンプルだからこそ素材の良さが際立つケーキもあるわ。' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '利益をしっかり出すことでお店の経営が安定するし、製造もスムーズにいく。経営者目線を持つのは立派なことよ。' },
            ],
            lesson: 'コスト管理はお店を続けていくための大切なスキル。シンプルでも素材にこだわった商品は、確かなファンを獲得できます。利益と品質のバランスを考えるのもパティシエの腕の見せどころです。',
          },
        },
        {
          id: 'balanced-idea',
          text: '定番のイチゴケーキを、盛り付けで豪華に見せる「映える定番」',
          emoji: '🍰',
          effects: { taste: 1, presentation: 1, efficiency: 2, customerSatisfaction: 2 },
          feedback: {
            narration: '「安心の味×新しい見た目」のバランスの良いアイデアです。',
            dialogues: [
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'いい企画ね！ お客さまが求めてるのは「失敗しない安心感」と「特別感」の両方。それを両立させたのが良いわ。' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'コストも抑えられるし、製造もいつもの工程で対応できるから現実的よ。' },
            ],
            lesson: '定番の安心感と新しい見せ方の組み合わせは、お客さまの期待に応えながら効率よく製造できるバランス型の企画です。',
          },
        },
        {
          id: 'creative-idea',
          text: '見たことのない前衛的なケーキで話題を狙う',
          emoji: '🎆',
          effects: { taste: 1, presentation: 3, efficiency: 0, customerSatisfaction: 2 },
          feedback: {
            narration: 'インパクト抜群のアイデアで、SNS映えも期待できそうです！',
            dialogues: [
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '攻めてるわね！ 見た目のインパクトは今の時代、SNSで拡散されて大きな宣伝効果になるの。' },
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '製造は大変になるけど、話題性でお店のファンを増やすチャンスでもあるわね。挑戦する価値はあるわ！' },
            ],
            lesson: '前衛的なアイデアは製造効率の面では課題がありますが、話題性やブランド力の向上につながります。リスクを取って挑戦することもビジネスの大事な判断です。',
          },
        },
      ],
    },

    // ── シーン7: 閉店作業 ──
    {
      id: 'closing',
      title: '今日の仕事を終えて',
      timeLabel: '19:00',
      narration: '忙しかった1日も終わり。片付けをしながら、マリ先輩と今日を振り返ります。',
      dialogues: [
        { speaker: 'マリ先輩', emoji: '👩‍🍳', text: '今日はたくさんのことがあったわね。最後に聞かせて。' },
        { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'パティシエの仕事で一番大事だと思ったことは？' },
      ],
      situation: '1日の体験を振り返って、一番大事だと感じたことを答えましょう。',
      choices: [
        {
          id: 'creativity',
          text: '工夫して新しいものを生み出す力',
          emoji: '✨',
          effects: { taste: 1, presentation: 2, efficiency: 0, customerSatisfaction: 0 },
          feedback: {
            narration: 'クリエイティブな視点を大切にするあなた。',
            dialogues: [
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'パティシエは「アーティスト」でもあるものね。新しいものを生み出す力は、お店の未来を作る原動力よ。基礎と創造性、両方を磨いていこうね！' },
            ],
            lesson: 'パティシエのクリエイティブさは、確かな技術の上に成り立つもの。新しいケーキのアイデアも、基本の製菓技術があってこそ形にできます。創造力と基礎力の両方を育てましょう。',
          },
        },
        {
          id: 'for-customers',
          text: 'お客さまの気持ちを考えること',
          emoji: '❤️',
          effects: { taste: 0, presentation: 0, efficiency: 0, customerSatisfaction: 3 },
          feedback: {
            narration: 'お客さまファーストの心を持つあなたに、マリ先輩も嬉しそう。',
            dialogues: [
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'その気持ちがあれば、いいパティシエになれるわ。ケーキは「モノ」じゃなくて「思い出」を作るものだから。' },
            ],
            lesson: 'パティシエの仕事は「ケーキを作る」ことではなく「お客さまの大切な瞬間を彩る」こと。技術の先にある「誰かを喜ばせたい」という気持ちが原動力です。',
          },
        },
        {
          id: 'planning-skills',
          text: '段取りと計画の力',
          emoji: '📋',
          effects: { taste: 0, presentation: 0, efficiency: 3, customerSatisfaction: 0 },
          feedback: {
            narration: '仕事の進め方の大切さに気づけました。',
            dialogues: [
              { speaker: 'マリ先輩', emoji: '👩‍🍳', text: 'その通り！ どんなに腕が良くても段取りが悪いとお店は回らないの。パティシエは「職人」であり「段取りのプロ」でもあるのよ。' },
            ],
            lesson: 'パティシエは朝6時から限られた時間で何十種類ものお菓子を作る、段取りのプロフェッショナル。計画力はどんな仕事でも通用する力です。',
          },
        },
      ],
    },
  ],
  ending: (scores) => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const topMetric = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const topLabels: Record<string, string> = {
      taste: '味へのこだわりパティシエ',
      presentation: 'アーティスト系パティシエ',
      efficiency: '段取りマスターパティシエ',
      customerSatisfaction: 'おもてなしパティシエ',
    };
    if (total >= 28) {
      return {
        title: topLabels[topMetric] ?? 'バランス型パティシエ',
        emoji: '🌟',
        summary: 'すばらしい1日でした！ お菓子作りの技術だけでなく、段取り力やお客さまへの心配りも光っていました。',
        learnings: [
          'パティシエは「お菓子を作る人」だけじゃなく、段取り・企画・接客・後輩指導もこなすプロフェッショナル',
          'アレルギー対応など「安全」への配慮は食に関わる仕事の最優先事項',
          '材料のトラブルをチャンスに変える発想力も大事なスキル',
          '技術だけでなく「お客さまの大切な瞬間を彩る」というやりがいがある仕事',
        ],
        realWorldNote: '実際のパティシエも、こうした判断の連続の毎日です。有名なケーキ屋さんや、ホテル、レストランなど、活躍の場はたくさんあります。',
      };
    }
    return {
      title: '成長中のパティシエ',
      emoji: '🌱',
      summary: '初めてのことばかりで大変でしたが、お菓子作りの奥深さが分かった1日でした！',
      learnings: [
        'パティシエの朝は早い！ 段取り力がとても大切',
        '味だけじゃなく、見た目・安全・コストなど考えることがたくさんある',
        '一人で作るのではなく、チームで協力してお店を回す仕事',
        '失敗してもOK！ 大事なのは「次はこうしよう」と考えること',
      ],
      realWorldNote: 'パティシエの見習いは最初、洗い物や計量からスタート。地道な積み重ねが、いつか「自分だけのケーキ」を作る力になります。',
    };
  },
};
