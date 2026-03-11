import type { JobExperience } from './types';

/** ゲームプログラマー体験ゲーム */
export const gameProgrammerExperience: JobExperience = {
  jobId: 'game-programmer',
  title: 'ゲームプログラマー体験',
  subtitle: 'コードで世界を動かせ！ ゲーム開発の舞台裏',
  intro: {
    narration: 'あなたは今日から、ゲーム開発会社でプログラマーとして働きます。新作アクションRPGの開発チームに配属され、プレイヤーを夢中にさせるゲームを作りましょう！',
    character: {
      name: '川口リードプログラマー',
      emoji: '🎮',
      role: 'リードプログラマー',
    },
    briefing:
      'ようこそ！ うちのチームは今、新作「クロノブレイド」の開発佳境だ。プログラマーはゲームの「動き」を作る仕事。見た目の華やかさの裏には、たくさんの技術と工夫があるんだ。一緒にやっていこう！',
  },
  metrics: [
    { key: 'programming', label: 'プログラミング力', emoji: '💻', color: 'text-blue-500' },
    { key: 'creativity', label: '創造性', emoji: '✨', color: 'text-purple-500' },
    { key: 'optimization', label: '最適化力', emoji: '⚡', color: 'text-yellow-500' },
    { key: 'teamwork', label: 'チームワーク', emoji: '🤝', color: 'text-green-500' },
  ],
  scenes: [
    {
      id: 'morning-standup',
      title: '朝会でタスクを確認',
      timeLabel: '10:00',
      narration: 'ゲーム開発チームの朝会です。今日のタスクと進捗を共有します。',
      dialogues: [
        { speaker: '川口リードプログラマー', emoji: '🎮', text: '今日のタスクだけど、ボスキャラの攻撃AIの実装と、フィールドのカメラワーク改善の2つがある。どっちから着手する？' },
        { speaker: 'プランナー 森さん', emoji: '📝', text: 'ボスのAIは来週のプレイテストまでに完成してほしいんですが…' },
      ],
      situation: '優先度の高いタスクが2つあります。どちらから取り組みますか？',
      choices: [
        {
          id: 'boss-ai',
          text: 'ボスAIを優先。プレイテストの締切を守ることが大事',
          emoji: '👹',
          effects: { programming: 2, creativity: 2, optimization: 1, teamwork: 2 },
          feedback: {
            narration: '締切を意識した判断で、チームの信頼を得ました。',
            dialogues: [
              { speaker: '川口リードプログラマー', emoji: '🎮', text: 'いい判断だ。プレイテストはチーム全体のマイルストーンだから、それに合わせて動くのは大事だよ。' },
              { speaker: 'プランナー 森さん', emoji: '📝', text: 'ありがとうございます！ テスターさんの予定もあるので助かります。' },
            ],
            lesson: 'ゲーム開発ではマイルストーン（節目の締切）を守ることが重要。チーム全体のスケジュールを考えてタスクの優先度を決める力が求められます。',
          },
        },
        {
          id: 'camera-first',
          text: 'カメラワーク改善を先に。小さいタスクを先に片付けたい',
          emoji: '📷',
          effects: { programming: 2, creativity: 1, optimization: 2, teamwork: 1 },
          feedback: {
            narration: 'カメラワークの改善で気持ちよく作業が進み、勢いがつきました。',
            dialogues: [
              { speaker: '川口リードプログラマー', emoji: '🎮', text: '小さいタスクを先に片付けるのも一つの戦略だ。達成感が出て勢いがつく。ただ、ボスAIの方が複雑だから、時間の余裕を持って取りかかろう。' },
            ],
            lesson: '小さなタスクを先に片付けてモメンタムを作る方法は有効です。ただし、複雑なタスクの見積もりを甘くしないよう、常にスケジュール全体を意識しましょう。',
          },
        },
        {
          id: 'ask-details',
          text: 'プランナーにボスAIの仕様を詳しく聞いてから着手判断する',
          emoji: '🗣️',
          effects: { programming: 1, creativity: 1, optimization: 1, teamwork: 3 },
          feedback: {
            narration: '仕様を確認したことで、思っていたよりシンプルな実装で済むことが分かりました。',
            dialogues: [
              { speaker: 'プランナー 森さん', emoji: '📝', text: '最初は3パターンの攻撃だけでOKです。フェーズ切替は次のスプリントで追加する予定です。' },
              { speaker: '川口リードプログラマー', emoji: '🎮', text: 'いいね、仕様を確認してから見積もるのは基本だ。思い込みで作り始めると手戻りになるからね。' },
            ],
            lesson: 'プログラマーにとって「仕様確認」は最重要ステップ。思い込みでコードを書き始めると、後で大きな手戻りになります。不明点は必ず確認してから着手しましょう。',
          },
        },
      ],
    },
    {
      id: 'character-behavior',
      title: 'キャラクター挙動の実装',
      timeLabel: '11:00',
      narration: 'ボスキャラの攻撃AIを実装します。プレイヤーが「手応え」を感じる、面白いボス戦を作りましょう。',
      dialogues: [
        { speaker: '川口リードプログラマー', emoji: '🎮', text: 'ボスの攻撃パターンを実装するんだけど、AIの設計方針が大事だ。単純なランダムだとつまらないし、パターンが決まりすぎると作業になる。' },
        { speaker: 'アーティスト 岡田さん', emoji: '🎨', text: 'アニメーションは「大振り攻撃」「連続斬り」「範囲魔法」の3つを用意してあります。' },
      ],
      situation: 'ボスAIの攻撃パターンをどう設計しますか？',
      choices: [
        {
          id: 'state-machine',
          text: 'ステートマシンで状態遷移を管理し、状況に応じて攻撃を選ぶAIを作る',
          emoji: '🔄',
          effects: { programming: 3, creativity: 2, optimization: 2, teamwork: 0 },
          feedback: {
            narration: 'ステートマシンにより、プレイヤーの行動に反応する賢いボスAIが完成しました。',
            dialogues: [
              { speaker: '川口リードプログラマー', emoji: '🎮', text: '王道のアプローチだね。ステートマシンはゲームAIの基本中の基本。状態を明確に定義することで、デバッグもしやすいし拡張もしやすい。' },
            ],
            lesson: 'ステートマシン（状態遷移図）はゲームAIの基本パターン。「待機→接近→攻撃→クールダウン」のように状態を定義することで、複雑な挙動も管理しやすくなります。',
          },
        },
        {
          id: 'behavior-tree',
          text: 'ビヘイビアツリーで柔軟なAIを構築し、後からパターンを追加しやすくする',
          emoji: '🌳',
          effects: { programming: 3, creativity: 1, optimization: 1, teamwork: 2 },
          feedback: {
            narration: 'ビヘイビアツリーの導入で、プランナーがパラメータを調整しやすい構造になりました。',
            dialogues: [
              { speaker: 'プランナー 森さん', emoji: '📝', text: 'これだと、プログラマーに頼まなくても攻撃パターンの調整ができるんですね！ すごい！' },
              { speaker: '川口リードプログラマー', emoji: '🎮', text: '他の人が触りやすい仕組みを作る。これもプログラマーの大事な仕事だ。' },
            ],
            lesson: 'ビヘイビアツリーは拡張性の高いAI設計パターン。プランナーやデザイナーがパラメータを調整できるよう設計すると、チーム全体の開発効率が上がります。',
          },
        },
        {
          id: 'player-reactive',
          text: 'プレイヤーの行動を分析して、リアルタイムに攻撃パターンを変えるAIに挑戦',
          emoji: '🧠',
          effects: { programming: 2, creativity: 3, optimization: 1, teamwork: 1 },
          feedback: {
            narration: '挑戦的なAIが完成し、テストプレイでも「賢いボスだ」と好評でした。',
            dialogues: [
              { speaker: '川口リードプログラマー', emoji: '🎮', text: 'プレイヤーリアクティブAIか。攻撃的な学習で面白いけど、バランス調整が大変だぞ。テストプレイを重ねてチューニングしていこう。' },
            ],
            lesson: 'プレイヤーの行動に反応するAIは「手応え」を生み出しますが、バランス調整が難しいという課題もあります。革新的な実装ほど、テストとチューニングが重要になります。',
          },
        },
      ],
    },
    {
      id: 'performance',
      title: 'パフォーマンス最適化',
      timeLabel: '14:00',
      narration: 'テスト環境で動かすと、ボス戦のシーンでフレームレートが30fpsまで落ちてしまいます。60fpsを維持するための最適化が必要です。',
      dialogues: [
        { speaker: '川口リードプログラマー', emoji: '🎮', text: 'プロファイラーで見ると、ボスのエフェクト描画と当たり判定の処理が重いみたいだ。' },
        { speaker: '川口リードプログラマー', emoji: '🎮', text: '60fps安定は必須だ。カクカクしたゲームはプレイヤーのストレスになるからね。' },
      ],
      situation: 'フレームレートが低下しています。どうやって最適化しますか？',
      choices: [
        {
          id: 'optimize-collision',
          text: '当たり判定を空間分割法で最適化し、不要な判定を減らす',
          emoji: '📦',
          effects: { programming: 3, creativity: 0, optimization: 3, teamwork: 1 },
          feedback: {
            narration: '空間分割により当たり判定の処理が大幅に軽くなり、60fpsを達成しました。',
            dialogues: [
              { speaker: '川口リードプログラマー', emoji: '🎮', text: '当たり判定の最適化は永遠のテーマだ。全オブジェクトの総当たりをやめて、近くのオブジェクトだけ判定するようにするだけで劇的に速くなる。' },
            ],
            lesson: 'ゲームプログラミングではパフォーマンスが最優先の場面が多い。空間分割（クォードツリーやグリッド分割）は当たり判定の最適化における基本テクニックです。',
          },
        },
        {
          id: 'reduce-effects',
          text: 'エフェクトのパーティクル数を減らし、LOD（詳細度制御）を導入する',
          emoji: '🎨',
          effects: { programming: 2, creativity: 2, optimization: 3, teamwork: 1 },
          feedback: {
            narration: '見た目の品質を保ちつつ、処理負荷を大幅に下げることができました。',
            dialogues: [
              { speaker: 'アーティスト 岡田さん', emoji: '🎨', text: 'パーティクル数減らしても、動きの速さでごまかせるところはありますね。一緒に調整しましょう！' },
              { speaker: '川口リードプログラマー', emoji: '🎮', text: 'アーティストと協力して「見た目を損なわず軽くする」。これが最適化の腕の見せどころだ。' },
            ],
            lesson: 'LOD（Level of Detail）は、カメラからの距離や画面上のサイズに応じて描画の詳細度を変える技術。「見た目の品質」と「処理負荷」のバランスを取る重要な手法です。',
          },
        },
        {
          id: 'profiler-deep',
          text: 'プロファイラーで詳細に分析し、ボトルネックの真因を特定してから対策する',
          emoji: '🔬',
          effects: { programming: 2, creativity: 0, optimization: 3, teamwork: 1 },
          feedback: {
            narration: '詳細な分析で、意外なところにボトルネックがあることが判明しました。',
            dialogues: [
              { speaker: '川口リードプログラマー', emoji: '🎮', text: 'おっ、分析した結果、一番重かったのは当たり判定じゃなくて、毎フレーム動的にメモリ確保してたことだったか。思い込みで最適化すると的外れになるから、計測ファーストは正解だよ。' },
            ],
            lesson: '「推測するな、計測せよ」はプログラミングの格言。最適化は必ずプロファイラーで計測してからボトルネックを特定しましょう。思い込みで最適化すると、効果のない場所に時間を使ってしまいます。',
          },
        },
      ],
    },
    {
      id: 'bug-fix',
      title: 'バグを退治せよ！',
      timeLabel: '16:00',
      narration: 'QAチームから「ボスを倒した後にゲームがフリーズする」というバグ報告が来ました。',
      dialogues: [
        { speaker: 'QA 中島さん', emoji: '🐛', text: 'ボスのHP0で倒した瞬間に、画面が固まります。毎回じゃなくて、3回に1回くらい。再現条件がちょっと分からなくて…' },
        { speaker: '川口リードプログラマー', emoji: '🎮', text: '再現率3割か…厄介だな。でもこれ、放置するとユーザー離脱の原因になる。しっかり直そう。' },
      ],
      situation: '再現率の低いフリーズバグ。どうアプローチしますか？',
      choices: [
        {
          id: 'reproduce-first',
          text: '再現条件を絞り込む。ボスの残HP、プレイヤーの位置、発動中のスキルなどを記録する',
          emoji: '📋',
          effects: { programming: 2, creativity: 1, optimization: 1, teamwork: 2 },
          feedback: {
            narration: '条件を絞り込んだ結果、「ボスの攻撃アニメーション中に倒すとフリーズする」ことが判明しました。',
            dialogues: [
              { speaker: '川口リードプログラマー', emoji: '🎮', text: 'よし、再現条件が分かった！ 攻撃モーション中に死亡処理が走ると、アニメーションの完了コールバックと死亡イベントが競合してるんだ。' },
              { speaker: '川口リードプログラマー', emoji: '🎮', text: 'バグ修正の8割は「再現すること」に時間がかかる。再現できれば半分解決したようなものだ。' },
            ],
            lesson: 'バグ修正の最重要ステップは「安定して再現できる条件を見つけること」。再現条件さえ分かれば、原因究明と修正はずっと楽になります。',
          },
        },
        {
          id: 'code-review',
          text: 'ボス撃破時の処理コードを読み直し、怪しい箇所を見つける',
          emoji: '👀',
          effects: { programming: 3, creativity: 0, optimization: 2, teamwork: 0 },
          feedback: {
            narration: 'コードを精査した結果、非同期処理の競合状態（レースコンディション）を発見しました。',
            dialogues: [
              { speaker: '川口リードプログラマー', emoji: '🎮', text: 'レースコンディションか。複数の処理が同時に走るときに起きるバグで、ゲーム開発では頻出する厄介なやつだ。' },
            ],
            lesson: 'レースコンディション（競合状態）は、複数の処理が予期せぬ順序で実行されることで起きるバグ。再現率が低く見つけにくいため、ゲーム開発者が最も恐れるバグの一つです。',
          },
        },
        {
          id: 'qa-collaborate',
          text: 'QAチームと一緒にデバッグプレイし、リアルタイムでログを確認する',
          emoji: '🤝',
          effects: { programming: 1, creativity: 1, optimization: 1, teamwork: 3 },
          feedback: {
            narration: 'QAチームの的確な再現手順と、プログラマーのリアルタイム分析で、素早くバグを特定できました。',
            dialogues: [
              { speaker: 'QA 中島さん', emoji: '🐛', text: '一緒にプレイしながらデバッグできると、私たちも「こういう情報があると助かるんだ」って分かって勉強になります。' },
              { speaker: '川口リードプログラマー', emoji: '🎮', text: 'プログラマーとQAがお互いの視点を共有するのは最高のデバッグ方法だ。QAの知見はプログラマーには真似できない。' },
            ],
            lesson: 'QAチームはバグを見つけるプロ。プログラマーとQAが協力してデバッグすることで、お互いの専門性を活かした効率的な問題解決ができます。',
          },
        },
      ],
    },
    {
      id: 'spec-discussion',
      title: 'プランナーとの仕様調整',
      timeLabel: '17:00',
      narration: 'プランナーから「ボスの第2形態を追加したい」という要望が来ました。',
      dialogues: [
        { speaker: 'プランナー 森さん', emoji: '📝', text: '実はボスに第2形態を追加したくて… HP半分以下になったら見た目と攻撃パターンが変わるんです。' },
        { speaker: 'プランナー 森さん', emoji: '📝', text: '来週のプレイテストまでに入れたいんですけど、できそうですか？' },
      ],
      situation: '仕様追加の要望にどう対応しますか？',
      choices: [
        {
          id: 'negotiate-scope',
          text: '来週までに「見た目の変化」は入れるが、「新攻撃パターン」は次のスプリントに分割する提案をする',
          emoji: '📊',
          effects: { programming: 1, creativity: 1, optimization: 1, teamwork: 3 },
          feedback: {
            narration: '段階的な実装でプランナーも納得し、確実にリリースできるスケジュールになりました。',
            dialogues: [
              { speaker: 'プランナー 森さん', emoji: '📝', text: '確かに、まず見た目が変わるだけでも「第2形態感」は出ますね。それでいきましょう！' },
              { speaker: '川口リードプログラマー', emoji: '🎮', text: 'いい交渉だ。「全部やる or やらない」じゃなくて、分割して段階的に実現する。これがアジャイル開発のエッセンスだよ。' },
            ],
            lesson: '仕様を小さく分割して段階的に実装する「アジャイル」の考え方は、ゲーム開発で非常に有効。完璧を待つより、動くものを早く作って改善する方が結果的に良いゲームになります。',
          },
        },
        {
          id: 'accept-all',
          text: '全力で実装して、来週までに第2形態を完全に仕上げる',
          emoji: '💪',
          effects: { programming: 3, creativity: 2, optimization: 0, teamwork: 1 },
          feedback: {
            narration: '猛烈な勢いで実装を進め、何とか形になりましたが、品質面に少し不安が残ります。',
            dialogues: [
              { speaker: '川口リードプログラマー', emoji: '🎮', text: 'ガッツは認めるけど、急いで作ったコードはバグの温床になりやすい。技術的負債と言うんだけど、後で自分を苦しめることになるから注意だ。' },
            ],
            lesson: '「技術的負債」とは、急いで書いた低品質なコードが後々のバグや修正コストとして跳ね返ってくること。納期と品質のバランスは常に意識しましょう。',
          },
        },
        {
          id: 'propose-alternative',
          text: '第2形態の代わりに、既存の攻撃パターンの組み合わせで「怒りモード」を実装する',
          emoji: '💡',
          effects: { programming: 2, creativity: 3, optimization: 2, teamwork: 1 },
          feedback: {
            narration: '既存のリソースを活用した代替案で、開発コストを抑えつつ面白い体験を実現できました。',
            dialogues: [
              { speaker: 'プランナー 森さん', emoji: '📝', text: 'あ、これはこれで面白いかも！ 攻撃速度が上がって、パターンの組み合わせが変わるだけで全然違う戦闘になりますね。' },
              { speaker: '川口リードプログラマー', emoji: '🎮', text: '既存のリソースを活かした代替案を出せるのはいいセンスだ。ゲームプログラマーにとって「工夫する力」は技術力と同じくらい大事だよ。' },
            ],
            lesson: 'ゲーム開発では「限られたリソースで最大の面白さ」を追求する力が重要。新しいものを一から作るだけでなく、既存の仕組みを組み合わせて新しい体験を生み出す工夫もプログラマーの腕の見せどころです。',
          },
        },
      ],
    },
    {
      id: 'playtest',
      title: 'プレイテスト',
      timeLabel: '翌週',
      narration: 'ボス戦の実装が完了し、チーム全員でプレイテストを行います。',
      dialogues: [
        { speaker: '川口リードプログラマー', emoji: '🎮', text: 'さあ、みんなでプレイテストだ。プログラマーの仕事は「作って終わり」じゃない。実際に遊んでもらって初めて完成だ。' },
        { speaker: 'ディレクター 原田さん', emoji: '🎬', text: 'うーん、ボスが強すぎるかな…初見だと攻撃パターンが読みにくくて、何度も死んでストレスを感じるかも。' },
      ],
      situation: 'プレイテストでバランスの問題が指摘されました。',
      choices: [
        {
          id: 'add-telegraph',
          text: '攻撃前の「予備動作」を長くして、プレイヤーが回避しやすくする',
          emoji: '⚠️',
          effects: { programming: 2, creativity: 3, optimization: 0, teamwork: 2 },
          feedback: {
            narration: '予備動作を調整したことで、「手応えがあるけど理不尽じゃない」ボス戦になりました。',
            dialogues: [
              { speaker: 'ディレクター 原田さん', emoji: '🎬', text: 'これだ！ 攻撃が来るのが分かるから、避けられた時の快感がある。「死んだのは自分のせい」と思えるバランスが大事なんだ。' },
              { speaker: '川口リードプログラマー', emoji: '🎮', text: '予備動作の長さでゲームの印象がガラッと変わる。数フレームの違いが大きな違いを生むのがゲームプログラミングの奥深さだ。' },
            ],
            lesson: 'ゲームデザインの「テレグラフ」とは、攻撃や危険を事前に知らせるサイン。プレイヤーに「反応する時間」を与えることで、難しいけど理不尽じゃないゲームバランスが生まれます。',
          },
        },
        {
          id: 'difficulty-setting',
          text: '難易度選択を実装して、プレイヤーが自分に合った難しさを選べるようにする',
          emoji: '🎚️',
          effects: { programming: 3, creativity: 1, optimization: 1, teamwork: 2 },
          feedback: {
            narration: '難易度選択の導入で、幅広いプレイヤーが楽しめるゲームになりました。',
            dialogues: [
              { speaker: 'ディレクター 原田さん', emoji: '🎬', text: 'これなら初心者からコアゲーマーまで満足できるね。ただ、難易度ごとにテストケースが増えるから、QAの負荷は考慮しよう。' },
            ],
            lesson: '難易度設定は多くのプレイヤーに楽しんでもらうための有効な手段。ただし、難易度ごとのバランス調整とテスト工数も考慮する必要があります。',
          },
        },
        {
          id: 'data-driven-balance',
          text: 'ボスのパラメータを外部ファイルに切り出し、プランナーが自由に調整できるようにする',
          emoji: '📊',
          effects: { programming: 2, creativity: 1, optimization: 2, teamwork: 3 },
          feedback: {
            narration: 'パラメータの外部化により、プランナーが何度も微調整できる仕組みが完成しました。',
            dialogues: [
              { speaker: 'プランナー 森さん', emoji: '📝', text: 'これ最高です！ プログラマーに頼まなくても、HP・攻撃力・予備動作の長さを自分で調整できるんですね。' },
              { speaker: '川口リードプログラマー', emoji: '🎮', text: 'データドリブンの設計だ。パラメータを外に出すだけで、チーム全体の開発スピードが何倍にもなる。これぞプログラマーの仕事だ。' },
            ],
            lesson: 'ゲーム開発では「データドリブン設計」が非常に重要。パラメータをコードから分離し、プランナーが直接調整できるようにすることで、何度もの試行錯誤が効率的に行えます。',
          },
        },
      ],
    },
    {
      id: 'retrospective',
      title: '振り返り',
      timeLabel: 'スプリント終了後',
      narration: 'ボス戦の実装が完了し、チームで今回のスプリントを振り返ります。',
      dialogues: [
        { speaker: '川口リードプログラマー', emoji: '🎮', text: '今回のスプリント、いい仕事ができたね。最後に、ゲームプログラマーとして一番大事だと思ったことを聞かせてくれ。' },
      ],
      situation: 'ゲームプログラマーとして一番大切だと感じたことは？',
      choices: [
        {
          id: 'fun-first',
          text: '技術は手段。最終的に「プレイヤーが楽しめるか」が一番大事',
          emoji: '😄',
          effects: { programming: 0, creativity: 3, optimization: 0, teamwork: 1 },
          feedback: {
            narration: '「プレイヤーの楽しさ」を軸にした考え方はゲーム開発の本質です。',
            dialogues: [
              { speaker: '川口リードプログラマー', emoji: '🎮', text: 'その通り。どんなに高度な技術を使っても、プレイヤーが楽しくなければ意味がない。技術はあくまで「楽しさ」を実現するための手段だ。' },
            ],
            lesson: 'ゲームプログラマーの究極の目標は「プレイヤーを楽しませること」。技術は手段であり、常に「この実装はプレイヤーの体験を良くするか」を基準に判断しましょう。',
          },
        },
        {
          id: 'craft-quality',
          text: 'パフォーマンスや安定性など、見えないところの品質がゲームの完成度を決める',
          emoji: '⚡',
          effects: { programming: 2, creativity: 0, optimization: 3, teamwork: 0 },
          feedback: {
            narration: '品質へのこだわりがゲームの完成度を支えます。',
            dialogues: [
              { speaker: '川口リードプログラマー', emoji: '🎮', text: 'フレームレート、ロード時間、バグの少なさ。プレイヤーは気づかないかもしれないけど、これらがゲーム体験の土台を支えてる。職人のこだわりだ。' },
            ],
            lesson: 'ゲームの「快適さ」は見えない技術力の結晶。60fps安定、高速ロード、バグのない動作。プレイヤーが「気にならない」ことこそが、プログラマーの最高の仕事です。',
          },
        },
        {
          id: 'team-creation',
          text: 'プランナー・アーティスト・QAとの連携があって初めて面白いゲームが生まれる',
          emoji: '🤝',
          effects: { programming: 0, creativity: 1, optimization: 0, teamwork: 3 },
          feedback: {
            narration: 'チームワークの大切さを実感しました。',
            dialogues: [
              { speaker: '川口リードプログラマー', emoji: '🎮', text: 'ゲームは一人じゃ作れない。プランナーの発想、アーティストの表現、QAの品質管理、プログラマーの技術。全部が噛み合って初めて名作が生まれるんだ。' },
            ],
            lesson: 'ゲーム開発は「総合芸術」。プランナー・アーティスト・プログラマー・QA、それぞれの専門家がリスペクトし合い、協力して作り上げるチームワークが、素晴らしいゲームを生みます。',
          },
        },
      ],
    },
  ],
  ending: (scores) => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const topMetric = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const topLabels: Record<string, string> = {
      programming: 'テクニカルエース',
      creativity: 'クリエイティブプログラマー',
      optimization: 'パフォーマンスの鬼',
      teamwork: 'チームの要',
    };
    if (total >= 28) {
      return {
        title: topLabels[topMetric] ?? 'バランス型ゲームプログラマー',
        emoji: '🌟',
        summary: '素晴らしいゲーム開発体験でした！ AI実装からパフォーマンス最適化、バグ修正まで、幅広いスキルを発揮しました。',
        learnings: [
          'ゲームプログラマーはAI、物理演算、描画、ネットワークなど幅広い技術を扱う',
          'パフォーマンス最適化はゲーム開発の核心。「推測するな、計測せよ」が鉄則',
          'プランナー・アーティスト・QAとの連携がゲームの品質を決める',
          '技術は手段。最終的に「プレイヤーが楽しめるか」が最も大切',
        ],
        realWorldNote: '実際のゲームプログラマーも日々このような判断の連続です。任天堂、カプコン、スクウェア・エニックス、サイゲームスなどで、多くのプログラマーが活躍しています。',
      };
    }
    return {
      title: '成長中のゲームプログラマー',
      emoji: '🌱',
      summary: 'ゲーム開発の奥深さと楽しさを実感できた体験でした。技術とチームワークの両方が大切だと気づけましたね！',
      learnings: [
        'ゲームプログラマーは「コードを書く」だけでなく、チームで面白さを追求する仕事',
        'バグ修正ではまず「再現条件の特定」が最重要ステップ',
        '仕様を小さく分割して段階的に実装する「アジャイル」の考え方が有効',
        '失敗しても大丈夫。プレイテストを繰り返して改善するのがゲーム開発の醍醐味',
      ],
      realWorldNote: 'ゲームプログラマーは技術力とゲーム愛の両方が求められる職種。プログラミング未経験から始めた人も多く、大切なのは「ゲームが好き」という情熱と「学び続ける」姿勢です。',
    };
  },
};
