import type { JobExperience } from './types';

/** Webエンジニア体験ゲーム */
export const webEngineerExperience: JobExperience = {
  jobId: 'web-engineer',
  title: 'Webエンジニア体験',
  subtitle: 'チームで作る！ みんなが使うWebサービス',
  intro: {
    narration: 'あなたは今日から、Webサービスを作る会社のエンジニアチームに加わります。チームで協力しながら、たくさんの人が使うサービスを作りましょう！',
    character: {
      name: 'サトシ先輩',
      emoji: '👨‍💻',
      role: 'チームリーダー',
    },
    briefing:
      'ようこそ！ うちのチームでは「みんなの献立アプリ」を作ってるんだ。今日はいくつか大事な仕事があるから、一緒にやっていこう！',
  },
  metrics: [
    { key: 'codeQuality', label: 'コード品質', emoji: '💎', color: 'text-blue-500' },
    { key: 'teamwork', label: 'チームワーク', emoji: '🤝', color: 'text-green-500' },
    { key: 'communication', label: '説明力', emoji: '💬', color: 'text-purple-500' },
    { key: 'problemSolving', label: '問題解決', emoji: '🔍', color: 'text-orange-500' },
  ],
  scenes: [
    // ── シーン1: 朝会 ──
    {
      id: 'standup',
      title: '朝会でタスクを決めよう',
      timeLabel: '10:00',
      narration: '毎朝、チームのみんなで「今日やること」を共有する時間があります。',
      dialogues: [
        { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'おはよう！ 今日のタスクなんだけど、2つ急ぎの仕事があるんだ。' },
        { speaker: 'サトシ先輩', emoji: '👨‍💻', text: '1つは「レシピ検索が遅い」っていうユーザーからの報告。もう1つは来週リリースの新機能「お気に入り保存」の開発。' },
        { speaker: 'ミキさん', emoji: '👩‍💻', text: '検索が遅いの、昨日から何件も問い合わせ来てますね…' },
      ],
      situation: 'どちらのタスクから取り組みますか？ チームには他にも開発者がいますが、あなたの判断が求められています。',
      choices: [
        {
          id: 'fix-bug-first',
          text: '検索の問題を先に直す',
          emoji: '🐛',
          effects: { codeQuality: 2, problemSolving: 2, teamwork: 0, communication: 1 },
          feedback: {
            narration: 'ユーザーが困っている問題を優先しました。',
            dialogues: [
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'いい判断だね！ 今使ってくれてる人が困ってることを先に解決するのは大事だよ。' },
              { speaker: 'ミキさん', emoji: '👩‍💻', text: '私が新機能の方を進めておきますね！' },
            ],
            lesson: 'エンジニアの仕事では「今ユーザーが困っていること」を優先するのが基本。これを「バグ修正の優先度判断」と言います。',
          },
        },
        {
          id: 'new-feature-first',
          text: '新機能の開発を先にやる',
          emoji: '✨',
          effects: { codeQuality: 1, problemSolving: 1, teamwork: 1, communication: 2 },
          feedback: {
            narration: '新機能の開発を選びました。リリース日を守ることも大切な判断です。',
            dialogues: [
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'リリース日を意識できてるのはいいね。スケジュールを守るのも大事な責任だからね。' },
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'ただ、バグの方も並行して誰かに見てもらえるとベストだね。優先度のバランスを考えるのもスキルだよ。' },
            ],
            lesson: 'リリース日を守ることもチームへの貢献です。ただし、既存ユーザーへの影響度も考慮して、「今何が一番大事か」を判断する力がエンジニアには求められます。',
          },
        },
        {
          id: 'ask-team',
          text: 'チームに相談して分担を決める',
          emoji: '🗣️',
          effects: { codeQuality: 0, problemSolving: 1, teamwork: 3, communication: 1 },
          feedback: {
            narration: 'チーム全体で話し合って分担を決めました。',
            dialogues: [
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'ナイス！ 一人で抱え込まずにチームで相談するのは大事なスキルだよ。' },
              { speaker: 'ミキさん', emoji: '👩‍💻', text: 'じゃあ私がバグ調査を始めて、新機能はペアで進めましょう！' },
            ],
            lesson: 'エンジニアの仕事はチーム戦。「一人で全部やる」より「チームで最適な分担を考える」方が、結果的に早くて良いものができます。',
          },
        },
      ],
    },

    // ── シーン2: コードレビュー ──
    {
      id: 'code-review',
      title: 'コードレビューに挑戦',
      timeLabel: '11:00',
      narration: '先輩が書いたコードを確認する「コードレビュー」の時間です。他の人のコードを読んで、問題がないかチェックします。',
      dialogues: [
        { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'レシピの「いいね」ボタンの処理を書いたから、レビューしてくれる？' },
        { speaker: 'あなた', emoji: '🧑‍💻', text: '（コードを読む…）', isPlayer: true },
        { speaker: 'あなた', emoji: '🧑‍💻', text: '（あれ？ 同じボタンを連打したら、いいねの数がおかしくなりそう…）', isPlayer: true },
      ],
      situation: '先輩のコードに「ボタンを連打すると数がズレる」問題を見つけました。どう伝えますか？',
      choices: [
        {
          id: 'point-out-directly',
          text: '「ここ、バグがありますよ」とストレートに伝える',
          emoji: '📢',
          effects: { codeQuality: 3, problemSolving: 1, teamwork: 1, communication: 0 },
          feedback: {
            narration: 'ストレートに伝えたことで、問題がすぐに修正されました。',
            dialogues: [
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'おっ、ほんとだ！ ストレートに言ってくれて助かるよ。すぐ直すね。' },
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: '率直な指摘はコードの品質を上げる近道だね。' },
            ],
            lesson: 'ストレートな指摘はコードの品質向上に直結します。率直さはエンジニア文化の強みでもあります。一方で、質問形式にすることで相手と一緒に考える流れも作れます。',
          },
        },
        {
          id: 'suggest-improvement',
          text: '「ここ、連打された時どうなりますかね？」と質問形式で伝える',
          emoji: '💡',
          effects: { codeQuality: 1, problemSolving: 1, teamwork: 2, communication: 2 },
          feedback: {
            narration: '質問形式で伝えたことで、お互いに考える流れになりました。',
            dialogues: [
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'あ、いい着眼点！ 確かに連打されたらマズいね。ボタンを一回押したら無効化する処理を入れよう。' },
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'こういう気づきがあるとチームのコードが良くなるんだよ。ありがとう！' },
            ],
            lesson: 'コードレビューのコツは「攻撃」ではなく「提案」。質問形式だと相手も受け入れやすく、一緒に解決策を考えられます。プロのエンジニアも大切にしている作法です。',
          },
        },
        {
          id: 'private-feedback',
          text: '一旦承認して、後からDMで個別に伝える',
          emoji: '✉️',
          effects: { codeQuality: 0, problemSolving: 1, teamwork: 2, communication: 2 },
          feedback: {
            narration: '一旦承認して、後からDMで個別にフィードバックしました。',
            dialogues: [
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'DMで教えてくれてありがとう。気を遣ってくれたんだね。' },
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'ただ、レビューコメントに残しておくと、チーム全体のナレッジにもなるんだ。次はレビュー上で書いてみて！' },
            ],
            lesson: '相手への配慮を大切にするのは素晴らしい姿勢です。コードレビューのコメントはチーム全体の学びにもなるので、公開の場で丁寧に伝えるスキルも磨いていくとさらに良いでしょう。',
          },
        },
      ],
    },

    // ── シーン3: デバッグ ──
    {
      id: 'debugging',
      title: 'バグを見つけ出せ！',
      timeLabel: '13:00',
      narration: 'お昼の後、ユーザーから「レシピ検索で和食を選んでも洋食が出てくる」という報告が来ました。',
      dialogues: [
        { speaker: 'ミキさん', emoji: '👩‍💻', text: '検索バグの調査、一緒にやりましょう！' },
        { speaker: 'ミキさん', emoji: '👩‍💻', text: 'さて、どこから調べる？ 原因になりそうな場所は色々あるけど…' },
      ],
      situation: 'バグの原因を探します。エンジニアはどうやって問題を見つけるのでしょう？',
      choices: [
        {
          id: 'random-search',
          text: 'とにかく怪しいところのコードを片っ端から読む',
          emoji: '🔍',
          effects: { codeQuality: 2, problemSolving: 2, teamwork: 0, communication: 1 },
          feedback: {
            narration: 'コードを直接読み込むことで、周辺の構造にも詳しくなりました。',
            dialogues: [
              { speaker: 'ミキさん', emoji: '👩‍💻', text: '時間はかかったけど、関連するコードをたくさん読めたから、コード全体の理解が深まったね！' },
              { speaker: 'ミキさん', emoji: '👩‍💻', text: '次からは先に条件を絞ってから読むと、もっと効率的かも。でもコードを読む力がついたのは大きいよ。' },
            ],
            lesson: 'コードを広く読む方法は、時間はかかりますが全体の理解が深まるメリットがあります。「条件を絞ってから調べる」方法と組み合わせると、さらに効果的です。',
          },
        },
        {
          id: 'systematic-debug',
          text: 'まず「いつから起きてるか」「どの条件で起きるか」を整理する',
          emoji: '📋',
          effects: { codeQuality: 1, problemSolving: 3, teamwork: 1, communication: 1 },
          feedback: {
            narration: '情報を整理してから調査したことで、スムーズに原因が見つかりました。',
            dialogues: [
              { speaker: 'ミキさん', emoji: '👩‍💻', text: 'なるほど、昨日のアップデート以降に発生してるんだ。じゃあ昨日の変更を確認すればいいね！' },
              { speaker: 'ミキさん', emoji: '👩‍💻', text: '見つけた！ カテゴリの番号がズレてたんだ。' },
            ],
            lesson: 'バグ修正の基本は「再現条件の特定→原因の範囲を狭める→修正」。闇雲にコードを読むよりも、まず情報を整理する方がずっと早く解決できます。',
          },
        },
        {
          id: 'ask-for-help',
          text: '詳しそうな人にすぐ聞く',
          emoji: '🙋',
          effects: { codeQuality: 0, problemSolving: 1, teamwork: 2, communication: 2 },
          feedback: {
            narration: '詳しい人に早めに相談したことで、効率よく解決できました。',
            dialogues: [
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: '聞いてくれてありがとう。この部分は去年自分が書いたところだから、一緒に見てみよう。' },
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: '次からは「いつから起きてるか」も合わせて伝えてくれると、もっと的確にアドバイスできるよ。' },
            ],
            lesson: '適切なタイミングで詳しい人に聞くのは、チームで働くエンジニアの重要なスキルです。「自分が調べたこと」を添えて質問すると、さらに効果的な回答が得られます。',
          },
        },
      ],
    },

    // ── シーン4: 企画とのミーティング ──
    {
      id: 'meeting',
      title: 'エンジニアじゃない人に説明しよう',
      timeLabel: '14:30',
      narration: '企画チームのタナカさんから「新機能の相談がしたい」と呼ばれました。',
      dialogues: [
        { speaker: 'タナカさん', emoji: '👔', text: 'ユーザーの位置情報を使って、近くのスーパーの特売情報を表示したいんだけど、来週までにできる？' },
        { speaker: 'あなた', emoji: '🧑‍💻', text: '（うーん、位置情報の機能は簡単じゃないし、プライバシーの問題もあるぞ…）', isPlayer: true },
      ],
      situation: '技術的に難しいお願いをされました。エンジニアとしてどう答えますか？',
      choices: [
        {
          id: 'just-say-ok',
          text: '「がんばります！」と引き受ける',
          emoji: '💪',
          effects: { codeQuality: 1, problemSolving: 1, teamwork: 2, communication: 2 },
          feedback: {
            narration: '意欲的に引き受けたことで、チャレンジングな開発に取り組めました。',
            dialogues: [
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: '積極的に挑戦する姿勢はいいね！ こういうチャレンジ精神はエンジニアの成長に欠かせないよ。' },
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'スケジュールが厳しくなったら早めに共有してね。そうすればチームで調整できるから。' },
            ],
            lesson: '難しい課題に挑戦する姿勢はエンジニアの成長エンジンです。挑戦しつつ、進捗をこまめに共有することで、チームとしてリスクを管理できます。',
          },
        },
        {
          id: 'explain-difficulty',
          text: '難しい理由を分かりやすく説明して、代わりの案を提案する',
          emoji: '💡',
          effects: { codeQuality: 0, problemSolving: 2, teamwork: 1, communication: 3 },
          feedback: {
            narration: '技術の制約を分かりやすく伝え、実現可能な代替案を提案しました。',
            dialogues: [
              { speaker: 'あなた', emoji: '🧑‍💻', text: '位置情報は個人情報なので慎重に扱う必要があって、実装には1ヶ月くらいかかります。でも「地域を手動で選べる機能」なら来週にも作れますよ！', isPlayer: true },
              { speaker: 'タナカさん', emoji: '👔', text: 'なるほど！ それなら地域選択でまずやってみよう。分かりやすく教えてくれてありがとう！' },
            ],
            lesson: 'エンジニアの大事なスキルの一つが「技術のことを、技術を知らない人に分かりやすく伝える力」。「できません」ではなく「こうすればできます」と伝えるのがポイント。',
          },
        },
        {
          id: 'just-say-no',
          text: '「技術的に無理です」と断る',
          emoji: '🚫',
          effects: { codeQuality: 2, problemSolving: 2, teamwork: 1, communication: 1 },
          feedback: {
            narration: '技術的な制約を正直に伝えたことで、現実的なスケジュール調整ができました。',
            dialogues: [
              { speaker: 'タナカさん', emoji: '👔', text: 'そっか、技術的に難しいんだね。正直に教えてくれて助かるよ。' },
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: '技術的な制約をちゃんと伝えるのは大事だね。加えて「こうすれば実現できる」という代替案も添えると、さらに会話が前に進むよ。' },
            ],
            lesson: '技術的制約を正確に伝えることは、無理なスケジュールを防ぐ重要なスキルです。さらに代替案も提示できると、エンジニアとしての信頼がさらに高まります。',
          },
        },
      ],
    },

    // ── シーン5: 設計の判断 ──
    {
      id: 'architecture',
      title: 'どっちの設計にする？',
      timeLabel: '15:30',
      narration: '「お気に入り保存」機能の設計方針を決める会議です。',
      dialogues: [
        { speaker: 'サトシ先輩', emoji: '👨‍💻', text: '設計の方針が2つあるんだ。' },
        { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'A案：シンプルに作れるけど、ユーザーが増えたら遅くなるかも。\nB案：最初は時間がかかるけど、ユーザーが増えても大丈夫。' },
        { speaker: 'ミキさん', emoji: '👩‍💻', text: '今のユーザー数だと、A案でも問題ないんですけどね…' },
      ],
      situation: '来週リリースの機能です。どの方針で進めますか？',
      choices: [
        {
          id: 'scalable-first',
          text: 'B案（しっかり設計）で最初からきちんと作る',
          emoji: '🏗️',
          effects: { codeQuality: 3, problemSolving: 1, teamwork: 0, communication: 1 },
          feedback: {
            narration: 'しっかり設計したことで、将来のスケーラビリティに備えられました。',
            dialogues: [
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: '長期的な視点で設計するのは大事な考え方だね。将来ユーザーが増えた時に慌てなくて済むよ。' },
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'リリースは少し遅れるけど、その分、後からの手戻りが減るメリットもあるんだ。' },
            ],
            lesson: '堅牢な設計は長期的なメンテナンスコストを下げます。一方で、リリースが遅れるトレードオフもあります。状況に応じて「今のスピード」と「将来の安定性」のバランスを取ることが大切です。',
          },
        },
        {
          id: 'simple-first',
          text: 'まずA案（シンプル）で出して、問題が起きたら直す',
          emoji: '🚀',
          effects: { codeQuality: 1, problemSolving: 2, teamwork: 1, communication: 1 },
          feedback: {
            narration: 'まず動くものを素早く届ける判断をしました。',
            dialogues: [
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'いい判断！ エンジニアの世界では「まず動くものを作って、改善していく」考え方を大事にしてるんだ。' },
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'これを「YAGNI（ヤグニ）」って言って、「今必要ないものは作らない」って原則だよ。' },
            ],
            lesson: 'ソフトウェア開発では「完璧を目指すより、まず動くものを届ける」ことが多い。将来の問題は将来の自分がもっと情報を持った状態で判断できるからです。',
          },
        },
      ],
    },

    // ── シーン6: 本番リリース ──
    {
      id: 'release',
      title: 'いよいよリリース！',
      timeLabel: '17:00',
      narration: 'ついに「お気に入り保存」機能をリリースする時が来ました。でも直前に小さな見た目の問題を発見…',
      dialogues: [
        { speaker: 'ミキさん', emoji: '👩‍💻', text: 'テスト全部通りました！ でも、ボタンの色がデザインと微妙に違うような…' },
        { speaker: 'サトシ先輩', emoji: '👨‍💻', text: '確かに。機能的には問題ないんだけど… どうする？' },
      ],
      situation: 'リリース直前、機能に問題はないけど見た目が少し違います。今日中のリリースが約束されています。',
      choices: [
        {
          id: 'fix-then-release',
          text: '色を直してからリリースする（少し遅れる）',
          emoji: '🎨',
          effects: { codeQuality: 3, problemSolving: 1, teamwork: 1, communication: 1 },
          feedback: {
            narration: '色を直してからリリースしたことで、デザイン通りの完成度で届けられました。',
            dialogues: [
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: '品質へのこだわりは大事だね。ユーザーが最初に見る画面の印象は重要だから。' },
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: '少し遅れたけど、直前の修正は慎重にテストすることも覚えておこう。' },
            ],
            lesson: '品質を妥協しない姿勢はプロフェッショナルとして重要です。ただし、直前の修正には新たな問題を生むリスクもあるため、修正後の再テストを忘れずに行いましょう。',
          },
        },
        {
          id: 'release-now',
          text: '機能は動くので予定通りリリースして、色は明日直す',
          emoji: '🚀',
          effects: { codeQuality: 1, problemSolving: 2, teamwork: 2, communication: 1 },
          feedback: {
            narration: '予定通りリリースし、翌日すぐに色を修正しました。',
            dialogues: [
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'ナイス判断！ 「完璧じゃなくても、約束を守る」ことも大事なんだ。' },
              { speaker: 'タナカさん', emoji: '👔', text: '予定通りリリースできてよかった！ 色は明日で全然OKだよ。' },
            ],
            lesson: '「完璧を待っていたら永遠にリリースできない」。致命的でない問題は後から直せます。約束した期日を守ることも信頼の一つです。',
          },
        },
      ],
    },

    // ── シーン7: ふりかえり ──
    {
      id: 'retrospective',
      title: 'チームでふりかえり',
      timeLabel: '18:00',
      narration: 'リリースが終わり、チームで今日の仕事をふりかえります。良かったこと・改善したいことをみんなで話し合う時間です。',
      dialogues: [
        { speaker: 'サトシ先輩', emoji: '👨‍💻', text: '今日のふりかえりをしよう。良かったことと、次に改善したいことを出してみて。' },
        { speaker: 'ミキさん', emoji: '👩‍💻', text: '私はバグ調査のやり方がレベルアップした気がします！' },
      ],
      situation: 'あなたが今日一番「学びになったこと」は？',
      choices: [
        {
          id: 'learned-communication',
          text: '技術を分かりやすく伝える力',
          emoji: '💬',
          effects: { codeQuality: 0, problemSolving: 0, teamwork: 1, communication: 3 },
          feedback: {
            narration: '伝える力の大切さを実感しました。',
            dialogues: [
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'めちゃくちゃ大事なポイント！ どんなにすごい技術を持ってても、伝えられなかったら宝の持ち腐れだからね。' },
            ],
            lesson: 'エンジニアは技術だけでなく「伝える力」も重要。企画・デザイン・営業など、色々な人と協力するために、分かりやすい説明力は必須スキルです。',
          },
        },
        {
          id: 'learned-teamwork',
          text: 'チームで相談しながら進める大切さ',
          emoji: '🤝',
          effects: { codeQuality: 0, problemSolving: 0, teamwork: 3, communication: 1 },
          feedback: {
            narration: 'チームワークの大切さに気づけました。',
            dialogues: [
              { speaker: 'サトシ先輩', emoji: '👨‍💻', text: 'その通り！ エンジニアは一人で黙々と…ってイメージがあるかもしれないけど、実はチーム力がめちゃくちゃ大事な仕事なんだ。' },
            ],
            lesson: 'エンジニアの仕事は「コードを書く」だけじゃなく、「チームで協力して良いものを作る」こと。コミュニケーションは最重要スキルの一つです。',
          },
        },
        {
          id: 'learned-problem-solving',
          text: '問題を整理してから取り組む大切さ',
          emoji: '🧩',
          effects: { codeQuality: 1, problemSolving: 3, teamwork: 0, communication: 0 },
          feedback: {
            narration: '論理的に考える力が伸びました。',
            dialogues: [
              { speaker: 'ミキさん', emoji: '👩‍💻', text: '同感！ エンジニアの仕事って「問題を見つけて解決する」の連続だよね。' },
            ],
            lesson: 'プログラミングの本質は「問題解決」。コードは手段であって、本当に大切なのは「何が問題か」を見極めて「どう解決するか」を考える力です。',
          },
        },
      ],
    },
  ],
  ending: (scores) => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const topMetric = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const topLabels: Record<string, string> = {
      codeQuality: '品質にこだわるエンジニア',
      teamwork: 'チームを支えるエンジニア',
      communication: '橋渡し上手なエンジニア',
      problemSolving: '問題解決のプロ',
    };
    if (total >= 37) {
      return {
        title: topLabels[topMetric] ?? 'バランス型エンジニア',
        emoji: '🌟',
        summary: 'すばらしい1日でした！ チームと協力しながら、たくさんの判断を的確にこなせました。',
        learnings: [
          'Webエンジニアは「コードを書くだけ」じゃなく、チームで協力して問題を解決する仕事',
          'バグ修正・コードレビュー・設計・リリースなど、1日の中に様々な仕事がある',
          '技術力だけでなく「伝える力」「判断力」「チームワーク」が求められる',
          'ユーザーのことを常に考えながら開発するのが大切',
        ],
        realWorldNote: '実際のWebエンジニアも、毎日こうした判断の連続です。Google、メルカリ、サイバーエージェントなどの会社で、たくさんのエンジニアが活躍しています。',
      };
    }
    return {
      title: '成長中のエンジニア',
      emoji: '🌱',
      summary: 'いろいろな場面で自分なりの判断ができた1日でした。経験を積むほど、さらに視野が広がりますよ！',
      learnings: [
        'Webエンジニアは「コードを書くだけ」じゃなく、チームで協力して問題を解決する仕事',
        'バグ修正・コードレビュー・設計・リリースなど、1日の中に様々な仕事がある',
        'どの判断にもメリットとトレードオフがある。経験を積んで判断力を磨いていこう',
        '技術だけじゃなく「伝え方」や「優先順位の判断」も大事なスキル',
      ],
      realWorldNote: '実際のWebエンジニアも、最初はみんな初心者。大切なのは「学び続ける姿勢」です。未経験からプロになった人もたくさんいますよ。',
    };
  },
};
