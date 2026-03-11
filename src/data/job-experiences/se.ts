import type { JobExperience } from './types';

/** システムエンジニア体験ゲーム */
export const seExperience: JobExperience = {
  jobId: 'se',
  title: 'システムエンジニア体験',
  subtitle: 'お客さまの「やりたい」をシステムで実現せよ！',
  intro: {
    narration: 'あなたは今日から、IT企業でシステムエンジニア（SE）として働きます。お客さまの業務をヒアリングし、最適なシステムを設計・開発するのがSEの仕事です。',
    character: {
      name: '高橋マネージャー',
      emoji: '👨‍💼',
      role: 'プロジェクトマネージャー',
    },
    briefing:
      'ようこそ！ 今日は新しいプロジェクトの立ち上げだ。クライアントは中堅の物流会社で、在庫管理システムのリプレイスを検討してる。一緒にいいシステムを作ろう！',
  },
  metrics: [
    { key: 'design', label: '設計力', emoji: '📐', color: 'text-blue-500' },
    { key: 'communication', label: 'コミュニケーション', emoji: '💬', color: 'text-green-500' },
    { key: 'technical', label: '技術力', emoji: '⚙️', color: 'text-purple-500' },
    { key: 'management', label: 'マネジメント', emoji: '📋', color: 'text-orange-500' },
  ],
  scenes: [
    {
      id: 'requirements',
      title: '要件定義ヒアリング',
      timeLabel: '10:00',
      narration: 'プロジェクトの最初のステップは、お客さまの要望を聞き出す「要件定義」です。何を作るか決まらないと、何も始まりません。',
      dialogues: [
        { speaker: '物流会社 田中部長', emoji: '👔', text: '今の在庫管理システムが古くて、入出庫のたびに手作業でExcelに入力してるんです。ミスも多くて困ってます。' },
        { speaker: '物流会社 田中部長', emoji: '👔', text: 'バーコードでピッとやるだけで管理できるようにしたいんだけど、できますかね？' },
      ],
      situation: 'お客さまの要望を聞きました。次にどう進めますか？',
      choices: [
        {
          id: 'deep-hearing',
          text: '現場の作業フローを詳しく聞き、隠れた課題も引き出す',
          emoji: '🔍',
          effects: { design: 3, communication: 2, technical: 0, management: 1 },
          feedback: {
            narration: '丁寧なヒアリングで、お客さま自身も気づいていなかった課題が見つかりました。',
            dialogues: [
              { speaker: '物流会社 田中部長', emoji: '👔', text: '言われてみれば、倉庫間の在庫移動の記録も曖昧でしたね…これも改善できたら助かります。' },
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: 'いい質問だったね。お客さまが言葉にできていない課題を引き出すのがSEの腕の見せどころだ。' },
            ],
            lesson: '要件定義で最も大切なのは「聞く力」。お客さまは技術に詳しくないことが多いので、業務の流れを丁寧に聞いて、本当に必要なものを一緒に見つけていくのがSEの役割です。',
          },
        },
        {
          id: 'propose-solution',
          text: 'すぐにバーコード管理の技術的な提案をする',
          emoji: '💡',
          effects: { design: 1, communication: 1, technical: 3, management: 1 },
          feedback: {
            narration: '技術的な提案でお客さまに具体的なイメージを持ってもらえました。',
            dialogues: [
              { speaker: '物流会社 田中部長', emoji: '👔', text: 'おお、ハンディターミナルでそんなことができるんですね！ イメージが湧きました。' },
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: '具体的な提案は良いね。ただ、まだ全体の業務が見えていないから、先に業務フローを整理してから提案すると、もっと的確になるよ。' },
            ],
            lesson: '技術提案は具体的なイメージを伝えるのに有効ですが、業務全体を理解してからの方がより適切な提案ができます。「まず聞く、それから提案する」がSEの基本です。',
          },
        },
        {
          id: 'similar-case',
          text: '似たような他社の導入事例を紹介しながら、要望を整理する',
          emoji: '📊',
          effects: { design: 2, communication: 2, technical: 1, management: 2 },
          feedback: {
            narration: '他社事例をもとに話を進めたことで、お客さまの理解が深まりました。',
            dialogues: [
              { speaker: '物流会社 田中部長', emoji: '👔', text: '他の会社さんではそうやってるんですね。うちもそれに近い形がいいかも。' },
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: '事例を使って説明するのはいい方法だね。お客さまにとって分かりやすいし、実現可能性も伝わる。' },
            ],
            lesson: '過去の事例を活用することで、お客さまにとって分かりやすい説明ができます。SEは技術と業務の「翻訳者」として、お客さまの言葉で語る力が求められます。',
          },
        },
      ],
    },
    {
      id: 'basic-design',
      title: '基本設計レビュー',
      timeLabel: '13:00',
      narration: 'ヒアリングの内容をもとに、システムの基本設計書を作成しました。チーム内でレビューを行います。',
      dialogues: [
        { speaker: '佐藤さん', emoji: '👩‍💻', text: 'この画面設計なんですけど、在庫一覧の検索条件がちょっと少なくないですか？ 現場だと商品カテゴリで絞り込みたいはずです。' },
        { speaker: '鈴木くん', emoji: '🧑‍💻', text: 'あと、このデータベース設計だと、将来的に商品数が増えたときに検索が遅くなりそうです。' },
      ],
      situation: 'チームメンバーから設計への指摘が出ました。どう対応しますか？',
      choices: [
        {
          id: 'accept-feedback',
          text: '指摘を受け入れて、検索条件追加とDB設計の見直しを行う',
          emoji: '✅',
          effects: { design: 3, communication: 1, technical: 2, management: 1 },
          feedback: {
            narration: 'チームの指摘を活かして、より良い設計に改善できました。',
            dialogues: [
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: 'レビューで品質が上がったね。設計段階で問題を見つけるのが一番コストが低いんだ。開発に入ってから気づくと何倍もの手戻りになる。' },
            ],
            lesson: '設計レビューは「間違い探し」ではなく「品質向上の機会」。早い段階でチームの知恵を借りることで、開発フェーズでの手戻りを大幅に減らせます。',
          },
        },
        {
          id: 'discuss-priority',
          text: 'それぞれの指摘について、優先度とコストを議論して判断する',
          emoji: '⚖️',
          effects: { design: 2, communication: 2, technical: 1, management: 3 },
          feedback: {
            narration: '指摘の重要度を整理し、限られた工数の中で最適な対応を決められました。',
            dialogues: [
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: 'すべての要望を入れると期日に間に合わない。優先度をつけて判断するのはSEに必要なスキルだね。' },
              { speaker: '佐藤さん', emoji: '👩‍💻', text: '検索条件はフェーズ1で、DB最適化はフェーズ2ということですね。納得です。' },
            ],
            lesson: 'すべてを完璧にしようとすると納期に間に合いません。優先度を付けて「今やるべきこと」と「後でやること」を分けるのがSEのプロジェクト管理力です。',
          },
        },
        {
          id: 'defend-design',
          text: '自分の設計の意図を説明し、現状の設計でも問題ないことを論理的に示す',
          emoji: '🛡️',
          effects: { design: 2, communication: 3, technical: 2, management: 0 },
          feedback: {
            narration: '設計意図を明確に伝えたことで、チームの理解が深まりました。',
            dialogues: [
              { speaker: '鈴木くん', emoji: '🧑‍💻', text: 'なるほど、そういう理由でこの設計にしたんですね。ただ、DB設計の件はやはり検討した方がいいかも…' },
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: '設計意図を説明できるのは大事。ただ、チームの指摘にも耳を傾けるバランスも忘れずにね。' },
            ],
            lesson: '設計の意図を論理的に説明する力はSEに不可欠です。同時に、チームの意見に柔軟に対応する姿勢も大切。「自分の考えを持ちつつ、他者の意見も尊重する」がベストです。',
          },
        },
      ],
    },
    {
      id: 'coding-decision',
      title: '実装方針の判断',
      timeLabel: '15:00',
      narration: '開発フェーズに入りました。バーコード読み取り機能の実装方法を決める必要があります。',
      dialogues: [
        { speaker: '鈴木くん', emoji: '🧑‍💻', text: 'バーコード読み取りの実装ですが、既存のライブラリを使う方法と、自前で作る方法があります。' },
        { speaker: '鈴木くん', emoji: '🧑‍💻', text: 'ライブラリだと開発は早いけど、細かいカスタマイズが難しい。自前だと自由度は高いけど時間がかかります。' },
      ],
      situation: 'バーコード機能の実装方法を決めてください。',
      choices: [
        {
          id: 'use-library',
          text: '既存ライブラリを採用し、開発スピードを優先する',
          emoji: '📦',
          effects: { design: 1, communication: 1, technical: 2, management: 3 },
          feedback: {
            narration: '既存ライブラリを使ったことで、予定通りに開発が進みました。',
            dialogues: [
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: 'いい判断だ。「作らなくていいものは作らない」。限られた工数をお客さまにとって価値のある部分に使おう。' },
            ],
            lesson: 'SEの仕事は「すべてを自分で作る」ことではありません。信頼できるライブラリを適切に選定・活用し、本当に注力すべき部分にリソースを集中させるのがプロの判断です。',
          },
        },
        {
          id: 'build-custom',
          text: '自前で実装し、お客さまの要件に完全にフィットさせる',
          emoji: '🔧',
          effects: { design: 2, communication: 0, technical: 3, management: 1 },
          feedback: {
            narration: '自前実装により、お客さまの要件に完璧に合うシステムが作れました。ただし開発期間は延びました。',
            dialogues: [
              { speaker: '鈴木くん', emoji: '🧑‍💻', text: '完成度は高いですが、思ったより時間がかかりましたね…' },
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: '技術的にはいい仕事だ。ただ、スケジュールとのバランスは常に考えよう。カスタマイズが本当に必要かの見極めが大事だね。' },
            ],
            lesson: '自前実装は柔軟性が高い反面、開発・保守コストが増大します。「お客さまにとって本当に必要なカスタマイズか」を見極める判断力がSEには求められます。',
          },
        },
        {
          id: 'hybrid',
          text: 'ライブラリをベースに、必要な部分だけカスタマイズする',
          emoji: '🔀',
          effects: { design: 3, communication: 1, technical: 2, management: 2 },
          feedback: {
            narration: 'ライブラリの利点を活かしつつ、必要な部分はカスタマイズ。バランスの取れた実装ができました。',
            dialogues: [
              { speaker: '鈴木くん', emoji: '🧑‍💻', text: 'いいとこ取りですね！ ベースはライブラリで、読み取り精度の部分だけ独自ロジックを入れると。' },
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: 'ハイブリッドアプローチは実務では一番よく使う方法だ。全体のバランスを見て判断できるのはSEの強みだね。' },
            ],
            lesson: '実務では「100%既製品」「100%自前」ではなく、両者を組み合わせるハイブリッドアプローチが最も多い。どこを作り、どこを借りるか。その線引きがSEの設計力です。',
          },
        },
      ],
    },
    {
      id: 'test-strategy',
      title: 'テスト戦略を考えよう',
      timeLabel: '16:30',
      narration: '開発が進み、テストフェーズの計画を立てる時期になりました。品質をどう担保するかが問われます。',
      dialogues: [
        { speaker: '佐藤さん', emoji: '👩‍💻', text: 'テスト計画を立てましょう。単体テスト、結合テスト、ユーザー受入テスト… どこに重点を置きますか？' },
        { speaker: '佐藤さん', emoji: '👩‍💻', text: '納期まであまり余裕がないので、全部を完璧にやるのは難しいです。' },
      ],
      situation: '限られた期間でテストの品質を最大化するには？',
      choices: [
        {
          id: 'risk-based',
          text: 'リスクの高い機能（バーコード読み取り・在庫計算）を重点的にテストする',
          emoji: '🎯',
          effects: { design: 2, communication: 1, technical: 2, management: 3 },
          feedback: {
            narration: 'リスクベースのテスト戦略で、重要な部分の品質を確実に担保できました。',
            dialogues: [
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: 'リスクベースドテストはプロのやり方だ。限られた時間で最大の効果を出すには、優先順位をつけるのが鉄則だね。' },
            ],
            lesson: 'テストに無限の時間はありません。「もしここが壊れたら一番影響が大きいのはどこか」を考え、リスクの高い順にテストするのがプロのテスト戦略です。',
          },
        },
        {
          id: 'automate',
          text: '自動テストを導入して、繰り返しテストできる仕組みを作る',
          emoji: '🤖',
          effects: { design: 1, communication: 0, technical: 3, management: 2 },
          feedback: {
            narration: '自動テストの導入で、何度でもテストを繰り返せる仕組みができました。',
            dialogues: [
              { speaker: '鈴木くん', emoji: '🧑‍💻', text: '自動テスト、最初は書くのに時間がかかりましたけど、修正のたびに安心して確認できるのはいいですね。' },
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: '長い目で見るとコスト削減になる。ただ今回は納期との兼ね合いもあるから、自動化する範囲を見極めよう。' },
            ],
            lesson: '自動テストは「未来への投資」。最初はコストがかかりますが、修正・機能追加のたびに安心して品質を確認できます。長期運用するシステムでは特に有効です。',
          },
        },
        {
          id: 'user-test-focus',
          text: 'お客さまに早めに触ってもらい、ユーザー受入テストを厚くする',
          emoji: '👥',
          effects: { design: 2, communication: 3, technical: 1, management: 2 },
          feedback: {
            narration: 'お客さまに早期に触ってもらったことで、重要な改善点が見つかりました。',
            dialogues: [
              { speaker: '物流会社 田中部長', emoji: '👔', text: '実際に使ってみたら、商品登録の画面でこのボタンが分かりにくいですね。あと、一括登録もできると助かります。' },
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: 'エンドユーザーの声は何より貴重だ。技術的なテストだけでは見つからない「使い勝手」の問題を早期に発見できたね。' },
            ],
            lesson: 'ユーザー受入テストは「お客さまの視点」で品質を確認する最後の砦。技術テストでは見つからない「実際の運用で困ること」が見つかります。できるだけ早い段階でお客さまに触ってもらうことが大切です。',
          },
        },
      ],
    },
    {
      id: 'incident',
      title: '本番障害が発生！',
      timeLabel: '翌月 9:00',
      narration: 'システムが無事リリースされ、お客さまに使い始めてもらったところ、翌月の月初に障害が発生しました。',
      dialogues: [
        { speaker: '物流会社 田中部長', emoji: '👔', text: '大変です！ 在庫数がマイナスになってる商品があります！ 出荷が止まってしまいます！' },
        { speaker: '高橋マネージャー', emoji: '👨‍💼', text: '落ち着いて対応しよう。まず何をする？' },
      ],
      situation: '本番環境で障害が発生。出荷業務に影響が出ています。',
      choices: [
        {
          id: 'quick-fix',
          text: 'まず在庫数を手動で修正して業務復旧を最優先し、原因調査は並行で行う',
          emoji: '🚨',
          effects: { design: 0, communication: 2, technical: 2, management: 3 },
          feedback: {
            narration: '業務への影響を最小限に抑えつつ、原因調査も進められました。',
            dialogues: [
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: '正解だ。障害対応の鉄則は「まず復旧、次に原因究明」。お客さまの業務を止めないことが最優先だ。' },
              { speaker: '物流会社 田中部長', emoji: '👔', text: '素早い対応助かりました。原因が分かったら教えてくださいね。' },
            ],
            lesson: '障害対応では「復旧 → 原因究明 → 再発防止」の順で対応します。お客さまの業務を止めないことが最優先。完璧な原因究明より、まず「動く状態に戻す」ことが大切です。',
          },
        },
        {
          id: 'investigate-first',
          text: '原因を特定してから確実な修正を行い、根本解決する',
          emoji: '🔬',
          effects: { design: 2, communication: 0, technical: 3, management: 1 },
          feedback: {
            narration: '原因を特定し根本的な修正ができましたが、復旧までに時間がかかりました。',
            dialogues: [
              { speaker: '鈴木くん', emoji: '🧑‍💻', text: '原因が分かりました。月次バッチ処理で排他制御が不足していたんです。' },
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: '原因を突き止めたのはいいけど、その間お客さまの業務が止まっていた。まず暫定復旧してから根本対策するのが望ましいね。' },
            ],
            lesson: '根本解決は大切ですが、本番障害では「お客さまの業務が止まっている」ことを忘れてはいけません。暫定対処で業務を復旧させてから、腰を据えて根本原因に取り組むのがセオリーです。',
          },
        },
        {
          id: 'team-response',
          text: 'チームメンバーに役割分担して、復旧と原因調査を同時に進める',
          emoji: '👥',
          effects: { design: 1, communication: 2, technical: 1, management: 3 },
          feedback: {
            narration: '役割を分けて対応したことで、効率的に障害を解決できました。',
            dialogues: [
              { speaker: '佐藤さん', emoji: '👩‍💻', text: '私がお客さま対応と暫定復旧を担当します！' },
              { speaker: '鈴木くん', emoji: '🧑‍💻', text: '僕が原因調査を進めます！' },
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: '完璧なチーム対応だ。障害時こそチームワークが試される。役割を明確にして動けるのはリーダーの資質だよ。' },
            ],
            lesson: '障害対応はチーム戦。「お客さま対応」「暫定復旧」「原因調査」を別々のメンバーが担当することで、最短で解決できます。誰が何をするか、瞬時に判断する力が求められます。',
          },
        },
      ],
    },
    {
      id: 'progress-report',
      title: '顧客への進捗報告',
      timeLabel: '翌週 14:00',
      narration: '障害対応が落ち着き、定例の進捗報告会です。追加要望への対応も求められています。',
      dialogues: [
        { speaker: '物流会社 田中部長', emoji: '👔', text: '先日の障害は大丈夫でしたが、実はもう一つ。他の拠点にも展開したいんです。3ヶ月以内にできますか？' },
        { speaker: '高橋マネージャー', emoji: '👨‍💼', text: '（小声）3ヶ月は厳しいな…どう回答する？' },
      ],
      situation: 'お客さまから厳しいスケジュールの追加要望が来ました。',
      choices: [
        {
          id: 'negotiate-scope',
          text: '3ヶ月で可能な範囲を提示し、段階的な展開を提案する',
          emoji: '📊',
          effects: { design: 2, communication: 3, technical: 0, management: 3 },
          feedback: {
            narration: '現実的なスケジュールと段階展開の提案で、お客さまも納得してくれました。',
            dialogues: [
              { speaker: 'あなた', emoji: '🧑‍💻', text: '3ヶ月で全拠点は難しいですが、まず主要拠点2つに展開し、残りは次の四半期で対応する方法はいかがでしょうか？', isPlayer: true },
              { speaker: '物流会社 田中部長', emoji: '👔', text: 'なるほど、段階的にやるなら安心感がありますね。それでお願いします。' },
            ],
            lesson: '「できません」ではなく「こうすればできます」と代替案を示すのがSEのコミュニケーション力。スコープ（範囲）とスケジュールのバランスをお客さまと一緒に考えましょう。',
          },
        },
        {
          id: 'accept-challenge',
          text: 'チームの頑張りで3ヶ月以内に全拠点展開を目指す',
          emoji: '💪',
          effects: { design: 1, communication: 2, technical: 2, management: 1 },
          feedback: {
            narration: '意欲的に取り組みましたが、チームへの負荷が高くなりました。',
            dialogues: [
              { speaker: '佐藤さん', emoji: '👩‍💻', text: '正直、かなりタイトなスケジュールですね… 品質が心配です。' },
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: 'お客さまの期待に応えたい気持ちは分かるけど、無理なスケジュールは品質低下やチームの疲弊につながる。正直に状況を伝える勇気も大事だよ。' },
            ],
            lesson: 'お客さまの要望にすべて応えたい気持ちは大切ですが、無理な約束は品質低下やチームの疲弊を招きます。「誠実にできることを伝える」のもプロフェッショナリズムの一つです。',
          },
        },
        {
          id: 'data-driven',
          text: '過去の開発実績データを示して、現実的な工数見積もりを提示する',
          emoji: '📈',
          effects: { design: 1, communication: 2, technical: 1, management: 3 },
          feedback: {
            narration: 'データに基づいた説明で、お客さまに納得感のある回答ができました。',
            dialogues: [
              { speaker: 'あなた', emoji: '🧑‍💻', text: '1拠点あたりの展開に約6週間かかっています。全5拠点だと現実的には5〜6ヶ月が見込みです。', isPlayer: true },
              { speaker: '物流会社 田中部長', emoji: '👔', text: 'データで示されると説得力がありますね。社内にもこの数字で説明できます。' },
            ],
            lesson: '見積もりは「勘」ではなく「データ」で示すのがSEの信頼を築く方法。過去の実績に基づいた数字は、お客さまも社内で説明しやすく、双方にとってメリットがあります。',
          },
        },
      ],
    },
    {
      id: 'retrospective',
      title: 'プロジェクトの振り返り',
      timeLabel: 'プロジェクト完了後',
      narration: '全拠点への展開が無事完了し、プロジェクトの振り返り会議です。今回のプロジェクトから学んだことを共有します。',
      dialogues: [
        { speaker: '高橋マネージャー', emoji: '👨‍💼', text: 'お疲れさま！ 大変なプロジェクトだったけど、お客さまにも喜んでもらえた。最後にみんなの学びを聞かせてくれ。' },
        { speaker: '佐藤さん', emoji: '👩‍💻', text: '私はテスト自動化の重要性を実感しました。次のプロジェクトでも活かしたいです。' },
      ],
      situation: 'あなたがこのプロジェクトで一番大切だと感じたことは？',
      choices: [
        {
          id: 'customer-understanding',
          text: 'お客さまの業務を深く理解することが、良いシステム設計の基盤',
          emoji: '🤝',
          effects: { design: 1, communication: 3, technical: 0, management: 1 },
          feedback: {
            narration: 'お客さまの業務理解の大切さを実感しました。',
            dialogues: [
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: 'その通りだ。SEの価値は「技術」だけじゃない。お客さまの業務を理解し、本当に必要なものを見極める力こそがSEの本領発揮だ。' },
            ],
            lesson: 'SEの仕事の本質は「お客さまの課題を技術で解決すること」。技術は手段であり、目的はお客さまの業務をより良くすること。業務理解こそがSEの付加価値です。',
          },
        },
        {
          id: 'team-power',
          text: 'チームで協力して一つのシステムを作り上げることの達成感',
          emoji: '🏆',
          effects: { design: 0, communication: 1, technical: 0, management: 3 },
          feedback: {
            narration: 'チームの力で大きなプロジェクトを成功させた達成感を得ました。',
            dialogues: [
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: 'SEは一人じゃ大きなシステムは作れない。それぞれの強みを活かしてチームで成果を出す。それがSIの醍醐味だ。' },
            ],
            lesson: 'システム開発はチームスポーツ。設計が得意な人、コーディングが得意な人、テストが得意な人。それぞれの強みを活かしてチームで成果を出すのがSEプロジェクトの面白さです。',
          },
        },
        {
          id: 'quality-commitment',
          text: '設計・実装・テストの各段階で品質を積み上げることの重要性',
          emoji: '💎',
          effects: { design: 2, communication: 0, technical: 2, management: 1 },
          feedback: {
            narration: '品質への意識が高まりました。',
            dialogues: [
              { speaker: '高橋マネージャー', emoji: '👨‍💼', text: '品質は最後のテストだけで作るものじゃない。要件定義、設計、実装、テスト、すべての工程で積み上げるもの。その視点を持てたのは大きな成長だ。' },
            ],
            lesson: '「品質は工程ごとに作り込むもの」。要件定義の品質、設計の品質、コードの品質、テストの品質。すべてが最終的なシステムの品質につながります。',
          },
        },
      ],
    },
  ],
  ending: (scores) => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const topMetric = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const topLabels: Record<string, string> = {
      design: '設計力抜群のアーキテクトSE',
      communication: 'お客さまに寄り添うコンサルSE',
      technical: '技術で課題を解決するスペシャリストSE',
      management: 'プロジェクトを導くリーダーSE',
    };
    if (total >= 28) {
      return {
        title: topLabels[topMetric] ?? 'バランス型SE',
        emoji: '🌟',
        summary: '素晴らしいプロジェクトでした！ お客さまの業務を深く理解し、チームと協力して高品質なシステムを作り上げました。',
        learnings: [
          'SEは「技術者」であり「コンサルタント」。お客さまの業務を理解して最適な解決策を提案する仕事',
          '要件定義 → 設計 → 実装 → テスト → 運用の各フェーズで品質を積み上げる',
          '障害対応では「まず復旧、次に原因究明」が鉄則',
          'チームで協力し、それぞれの強みを活かすことで大きなシステムが作れる',
        ],
        realWorldNote: '実際のSEも、技術力だけでなくコミュニケーション力が重要視されます。NTTデータ、富士通、NEC、アクセンチュアなど、多くの企業でSEが活躍しています。',
      };
    }
    return {
      title: '成長中のSE',
      emoji: '🌱',
      summary: '初めてのプロジェクトで多くのことを学べた経験でした。SEの仕事の幅広さと奥深さを実感できましたね！',
      learnings: [
        'SEの仕事は「プログラミング」だけではなく、ヒアリング・設計・テスト・運用と幅広い',
        'お客さまの言葉を技術の言葉に「翻訳」するのがSEの重要な役割',
        'すべてを完璧にするのではなく、優先順位をつけて判断する力が大切',
        '失敗やトラブルから学び、次に活かす姿勢が成長の鍵',
      ],
      realWorldNote: '未経験からSEになる人もたくさんいます。文系出身のSEも多く、大切なのは論理的に考える力とコミュニケーション力です。',
    };
  },
};
