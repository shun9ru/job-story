import type { JobExperience } from './types';

/** Webデザイナー体験ゲーム */
export const webDesignerExperience: JobExperience = {
  jobId: 'web-designer',
  title: 'Webデザイナー体験',
  subtitle: '美しさと使いやすさを両立せよ！ デザインの力',
  intro: {
    narration: 'あなたは今日から、Web制作会社のデザイナーとして働きます。クライアントの想いをビジュアルで形にし、ユーザーが使いやすいWebサイトをデザインしましょう！',
    character: {
      name: '水野ディレクター',
      emoji: '🎨',
      role: 'クリエイティブディレクター',
    },
    briefing:
      'ようこそ！ 今日のクライアントは、新しくオープンするカフェのWebサイト制作だ。お店の世界観をWebで表現しつつ、お客さんが使いやすいサイトを一緒に作ろう！',
  },
  metrics: [
    { key: 'design', label: 'デザイン力', emoji: '🎨', color: 'text-pink-500' },
    { key: 'userUnderstanding', label: 'ユーザー理解', emoji: '👤', color: 'text-blue-500' },
    { key: 'technical', label: '技術力', emoji: '💻', color: 'text-purple-500' },
    { key: 'presentation', label: 'プレゼン力', emoji: '🎤', color: 'text-orange-500' },
  ],
  scenes: [
    {
      id: 'client-hearing',
      title: 'クライアントヒアリング',
      timeLabel: '10:00',
      narration: 'デザインの最初のステップは、クライアントの要望をしっかり聞くこと。相手のイメージを正確に掴みましょう。',
      dialogues: [
        { speaker: 'カフェオーナー 林さん', emoji: '☕', text: '自然素材にこだわったカフェなんです。温かみがあって、でもおしゃれで…イメージ伝わりますかね？' },
        { speaker: 'カフェオーナー 林さん', emoji: '☕', text: 'あと、ネット予約もできるようにしたいんです。お客さんの層は20〜40代の女性が多いです。' },
      ],
      situation: 'クライアントの要望を聞きました。次にどう進めますか？',
      choices: [
        {
          id: 'mood-board',
          text: '参考サイトや写真を集めたムードボードを作り、イメージを視覚的にすり合わせる',
          emoji: '📌',
          effects: { design: 3, userUnderstanding: 1, technical: 0, presentation: 2 },
          feedback: {
            narration: 'ムードボードでイメージの共有が格段にスムーズになりました。',
            dialogues: [
              { speaker: 'カフェオーナー 林さん', emoji: '☕', text: 'あっ、まさにこういう雰囲気です！ 写真で見ると自分のイメージがはっきりしますね。' },
              { speaker: '水野ディレクター', emoji: '🎨', text: 'ムードボードは「言葉のすれ違い」を防ぐ最強のツール。「おしゃれ」の定義は人によって全然違うからね。' },
            ],
            lesson: 'ムードボードは色味・雰囲気・方向性を視覚的に共有するツール。言葉だけでは伝わりにくいイメージを、ビジュアルで確認し合うことでミスマッチを防げます。',
          },
        },
        {
          id: 'competitor-research',
          text: '競合カフェのWebサイトを分析し、差別化ポイントを一緒に考える',
          emoji: '🔍',
          effects: { design: 1, userUnderstanding: 3, technical: 1, presentation: 2 },
          feedback: {
            narration: '競合分析により、差別化の方向性が明確になりました。',
            dialogues: [
              { speaker: 'カフェオーナー 林さん', emoji: '☕', text: '他のカフェのサイトと比べると、うちの「自然素材へのこだわり」がもっと前面に出せそうですね。' },
              { speaker: '水野ディレクター', emoji: '🎨', text: '競合を知ることで「何を作るか」だけでなく「何を作らないか」も見えてくる。リサーチ力はデザイナーの基盤だ。' },
            ],
            lesson: 'デザインの前に「リサーチ」。競合サイトの分析は、差別化ポイントを見つけるだけでなく、ユーザーが期待する情報構造を理解するのにも役立ちます。',
          },
        },
        {
          id: 'target-persona',
          text: 'ターゲットユーザーのペルソナを作り、「どんな人が、どんな場面で見るか」を明確にする',
          emoji: '👤',
          effects: { design: 1, userUnderstanding: 3, technical: 0, presentation: 2 },
          feedback: {
            narration: 'ペルソナ設定により、デザインの判断基準が明確になりました。',
            dialogues: [
              { speaker: '水野ディレクター', emoji: '🎨', text: '「30代女性、仕事帰りにスマホで検索」というペルソナがあると、フォントサイズや導線の判断がしやすくなるね。' },
            ],
            lesson: 'ペルソナ（架空のユーザー像）を作ることで、デザインの判断に迷った時に「この人ならどう感じるか？」という基準ができます。',
          },
        },
      ],
    },
    {
      id: 'wireframe',
      title: 'ワイヤーフレーム作成',
      timeLabel: '13:00',
      narration: 'サイトの設計図となる「ワイヤーフレーム」を作成します。情報の配置と導線を決める重要なステップです。',
      dialogues: [
        { speaker: '水野ディレクター', emoji: '🎨', text: 'トップページのワイヤーフレームを作ろう。このカフェサイトで最も大事な情報は何だと思う？' },
      ],
      situation: 'トップページの情報設計をどう組み立てますか？',
      choices: [
        {
          id: 'visual-first',
          text: '大きなビジュアル写真を最上部に置き、お店の雰囲気を一目で伝える構成にする',
          emoji: '📸',
          effects: { design: 3, userUnderstanding: 1, technical: 1, presentation: 1 },
          feedback: {
            narration: 'インパクトのあるビジュアルファーストの構成で、お店の世界観が伝わるデザインになりました。',
            dialogues: [
              { speaker: '水野ディレクター', emoji: '🎨', text: 'ビジュアルファーストはカフェサイトの王道だね。ただ、予約導線が埋もれないように、CTAボタンの配置も工夫しよう。' },
            ],
            lesson: 'ファーストビュー（最初に目に入る範囲）は最も重要な領域。飲食店サイトでは「雰囲気が伝わる写真」と「アクションにつながるボタン」の両立が鍵です。',
          },
        },
        {
          id: 'action-first',
          text: '予約ボタンとアクセス情報を目立つ位置に配置し、来店につながる導線を優先する',
          emoji: '📍',
          effects: { design: 1, userUnderstanding: 3, technical: 1, presentation: 1 },
          feedback: {
            narration: 'ユーザーの目的（予約・アクセス確認）に直結する実用的な構成になりました。',
            dialogues: [
              { speaker: '水野ディレクター', emoji: '🎨', text: 'ユーザーの行動を第一に考えた設計だね。カフェサイトを訪れる人の多くは「場所」と「予約」を求めている。実用性は大事だ。' },
            ],
            lesson: 'Webデザインでは「ユーザーが何をしたいか」を最優先に考えます。美しいだけでなく「使いやすい」サイトこそが、ビジネス成果につながるデザインです。',
          },
        },
        {
          id: 'story-telling',
          text: 'スクロールで「お店の物語」が展開する構成にし、こだわりを伝えてから予約に導く',
          emoji: '📖',
          effects: { design: 2, userUnderstanding: 2, technical: 2, presentation: 2 },
          feedback: {
            narration: 'ストーリーテリング型の構成で、お店のこだわりが深く伝わるサイトになりました。',
            dialogues: [
              { speaker: 'カフェオーナー 林さん', emoji: '☕', text: 'うちのこだわりが伝わる構成、嬉しいです！ でもスマホで見る人は長いスクロールに耐えられるかな…' },
              { speaker: '水野ディレクター', emoji: '🎨', text: 'いい視点だ。ストーリー型はブランディングに強いけど、スマホでの離脱率も考慮しよう。途中にCTAを挟むのが定石だ。' },
            ],
            lesson: 'ストーリーテリング型のデザインはブランディングに効果的ですが、コンテンツの長さと離脱率のバランスに注意。要所にCTA（行動喚起）を配置して、ユーザーを導きましょう。',
          },
        },
      ],
    },
    {
      id: 'design-comp',
      title: 'デザインカンプ制作',
      timeLabel: '翌日 10:00',
      narration: 'ワイヤーフレームが承認され、いよいよ見た目のデザインを作り込む「デザインカンプ」の制作です。',
      dialogues: [
        { speaker: '水野ディレクター', emoji: '🎨', text: 'カラーパレットとフォント選びは、サイト全体の印象を決める大事な要素だ。' },
      ],
      situation: '「温かみがあっておしゃれ」なカフェサイトの色とフォントを決めます。',
      choices: [
        {
          id: 'earth-tone',
          text: 'アースカラー（ベージュ・テラコッタ・グリーン）＋手書き風フォントで自然な温かみを表現',
          emoji: '🌿',
          effects: { design: 3, userUnderstanding: 2, technical: 0, presentation: 1 },
          feedback: {
            narration: 'アースカラーと手書きフォントの組み合わせが、カフェのコンセプトにぴったりでした。',
            dialogues: [
              { speaker: 'カフェオーナー 林さん', emoji: '☕', text: 'わぁ、これうちのお店の雰囲気そのままです！ テラコッタ色がいいですね。' },
              { speaker: '水野ディレクター', emoji: '🎨', text: '色選びのセンスがいいね。ただ、手書きフォントは本文に使うと読みにくいから、見出しだけに使おう。本文はゴシック体が読みやすい。' },
            ],
            lesson: 'カラーパレットの選定はブランドの印象を左右します。また、装飾的なフォントは「見出し」に限定し、「本文」は読みやすいフォントを使うのがWebデザインの基本原則です。',
          },
        },
        {
          id: 'minimal-modern',
          text: 'ホワイトベース＋アクセントカラー（深緑）＋モダンなサンセリフで洗練された印象に',
          emoji: '✨',
          effects: { design: 2, userUnderstanding: 2, technical: 1, presentation: 2 },
          feedback: {
            narration: 'モダンで洗練されたデザインに仕上がりましたが、温かみとのバランスが課題です。',
            dialogues: [
              { speaker: 'カフェオーナー 林さん', emoji: '☕', text: 'おしゃれですね！ でも少しクールすぎるかな… もう少し温かい感じが欲しいです。' },
              { speaker: '水野ディレクター', emoji: '🎨', text: 'クライアントのフィードバックは貴重だ。写真の暖色加工や、角丸の処理を増やすだけでも温かみは出せるよ。' },
            ],
            lesson: 'デザインの方向性がクライアントのイメージとずれることはよくあります。フィードバックを受けて素早く調整する柔軟さと、微調整で印象を変える技術が大切です。',
          },
        },
        {
          id: 'multi-proposal',
          text: '方向性の異なる2〜3パターンを用意して、クライアントに選んでもらう',
          emoji: '🎭',
          effects: { design: 2, userUnderstanding: 1, technical: 1, presentation: 3 },
          feedback: {
            narration: '複数案を提示したことで、クライアントが自分の好みを明確に言語化できました。',
            dialogues: [
              { speaker: 'カフェオーナー 林さん', emoji: '☕', text: '比較できると分かりやすい！ A案の色味とB案のレイアウトを組み合わせたいです。' },
              { speaker: '水野ディレクター', emoji: '🎨', text: '複数案提示はプレゼンの王道だ。ただ、作業量は増えるから、いつでも使える手ではない。重要なプロジェクトでは効果的だよ。' },
            ],
            lesson: '複数案の提示はクライアントが判断しやすくなる効果的な手法。ただし工数が増えるため、プロジェクトの規模や重要度に応じて使い分けましょう。',
          },
        },
      ],
    },
    {
      id: 'responsive',
      title: 'レスポンシブ対応',
      timeLabel: '翌日 14:00',
      narration: 'PC版のデザインが固まり、スマートフォン版のデザインに取り組みます。アクセスの7割はスマホからです。',
      dialogues: [
        { speaker: '水野ディレクター', emoji: '🎨', text: 'アクセスの7割がスマホだ。PC版のデザインをそのまま縮小するだけじゃダメだよ。スマホならではの最適化が必要だ。' },
      ],
      situation: 'スマートフォン向けのデザインをどう最適化しますか？',
      choices: [
        {
          id: 'mobile-first',
          text: 'スマホでの操作性を最優先に、タップしやすいボタンサイズと片手操作を意識したレイアウトにする',
          emoji: '📱',
          effects: { design: 2, userUnderstanding: 3, technical: 2, presentation: 0 },
          feedback: {
            narration: 'スマホに最適化されたデザインで、ユーザビリティが大幅に向上しました。',
            dialogues: [
              { speaker: '水野ディレクター', emoji: '🎨', text: 'タップターゲットは最低44px。片手で操作する人が多いから、重要なボタンは親指が届く範囲に配置する。こういう知識がプロのデザイナーの武器だ。' },
            ],
            lesson: 'モバイルデザインでは「タップターゲット44px以上」「片手操作への配慮」「通信速度を考慮した画像最適化」など、PC版とは異なるルールがあります。',
          },
        },
        {
          id: 'content-priority',
          text: 'スマホ版では情報の優先順位を見直し、最重要情報だけをファーストビューに配置する',
          emoji: '🎯',
          effects: { design: 2, userUnderstanding: 3, technical: 1, presentation: 1 },
          feedback: {
            narration: '情報の優先順位を見直したことで、スマホでもストレスなく目的にたどり着けるデザインになりました。',
            dialogues: [
              { speaker: '水野ディレクター', emoji: '🎨', text: 'スマホの画面は小さい。PC版の情報をすべて載せるのではなく「何を見せないか」を決めるのがスマホデザインの要だ。' },
            ],
            lesson: 'レスポンシブデザインは「PC版を縮小する」のではなく「スマホに最適な情報設計を考える」こと。画面の制約をデザインの力で解決するのがWebデザイナーの腕の見せどころです。',
          },
        },
        {
          id: 'prototype-test',
          text: '実際にスマホで操作できるプロトタイプを作り、使い勝手を検証してから本制作に入る',
          emoji: '🧪',
          effects: { design: 1, userUnderstanding: 2, technical: 3, presentation: 1 },
          feedback: {
            narration: 'プロトタイプでの検証により、実装前に操作性の問題を発見・修正できました。',
            dialogues: [
              { speaker: '水野ディレクター', emoji: '🎨', text: 'プロトタイプ検証は「デザインの仮説を検証する」プロセス。実機で触ってみないと分からないことは多い。' },
            ],
            lesson: 'プロトタイプ（試作品）で実際に操作してみることで、画面上では気づかなかった使い勝手の問題を発見できます。実装前に問題を見つけることで、手戻りを大幅に減らせます。',
          },
        },
      ],
    },
    {
      id: 'accessibility',
      title: 'アクセシビリティ対応',
      timeLabel: '3日目',
      narration: 'デザインの仕上げ段階で、アクセシビリティ（誰でも使えるデザイン）のチェックを行います。',
      dialogues: [
        { speaker: '水野ディレクター', emoji: '🎨', text: 'デザインの美しさだけでなく「誰でも使えるか」も大事だ。色覚多様性への配慮や、文字の読みやすさもチェックしよう。' },
      ],
      situation: 'アクセシビリティ対応をどこまで行いますか？',
      choices: [
        {
          id: 'contrast-check',
          text: 'コントラスト比をチェックし、色覚多様性にも配慮した配色に調整する',
          emoji: '👁️',
          effects: { design: 2, userUnderstanding: 3, technical: 2, presentation: 0 },
          feedback: {
            narration: 'コントラスト比の改善で、より多くの人が読みやすいデザインになりました。',
            dialogues: [
              { speaker: '水野ディレクター', emoji: '🎨', text: 'WCAG基準でコントラスト比4.5:1以上を確保するのが目安だ。美しさを保ちながらコントラストを確保するのがプロの技術だよ。' },
            ],
            lesson: 'Webアクセシビリティの基準「WCAG」では、テキストと背景のコントラスト比4.5:1以上が推奨されています。ツールで簡単にチェックでき、対応することでより多くの人が使えるサイトになります。',
          },
        },
        {
          id: 'full-accessibility',
          text: 'alt属性、見出し構造、キーボード操作対応など、包括的なアクセシビリティ対応を行う',
          emoji: '♿',
          effects: { design: 1, userUnderstanding: 2, technical: 3, presentation: 1 },
          feedback: {
            narration: '包括的なアクセシビリティ対応により、高い品質のサイトに仕上がりました。',
            dialogues: [
              { speaker: '水野ディレクター', emoji: '🎨', text: 'アクセシビリティは「特別な配慮」ではなく「品質の一部」だ。すべてのユーザーを想像してデザインすることが、デザイナーの責任だよ。' },
            ],
            lesson: 'アクセシビリティは「障害のある人のため」だけでなく「すべてのユーザーの使いやすさ」につながります。2024年に障害者差別解消法が改正され、Webアクセシビリティへの注目はますます高まっています。',
          },
        },
        {
          id: 'user-test-a11y',
          text: '実際にスクリーンリーダーで操作してみて、視覚障害のある方の体験を確認する',
          emoji: '🎧',
          effects: { design: 1, userUnderstanding: 3, technical: 2, presentation: 1 },
          feedback: {
            narration: 'スクリーンリーダーでの操作体験から、多くの改善点が見つかりました。',
            dialogues: [
              { speaker: '水野ディレクター', emoji: '🎨', text: '自分で体験してみると「この画像にalt属性がないと何も分からない」ということが実感できるよね。デザイナーこそアクセシビリティを体験すべきだ。' },
            ],
            lesson: 'スクリーンリーダーなどの支援技術を自分で体験することで、視覚に頼らないデザインの重要性を実感できます。体験に基づく理解は、より良いデザインの原動力になります。',
          },
        },
      ],
    },
    {
      id: 'design-review',
      title: 'デザインレビューとプレゼン',
      timeLabel: '4日目',
      narration: '完成したデザインをクライアントにプレゼンテーションします。デザインの意図を伝える大事な場です。',
      dialogues: [
        { speaker: '水野ディレクター', emoji: '🎨', text: 'デザインは「作る力」と同じくらい「伝える力」が大事だ。なぜこのデザインにしたのか、論理的に説明しよう。' },
      ],
      situation: 'クライアントへのプレゼンで、デザインの意図をどう伝えますか？',
      choices: [
        {
          id: 'logic-story',
          text: 'ターゲットユーザーの行動を起点に、デザインの各要素の根拠を論理的に説明する',
          emoji: '📊',
          effects: { design: 1, userUnderstanding: 2, technical: 0, presentation: 3 },
          feedback: {
            narration: '論理的な説明で、クライアントも「なぜこのデザインか」を深く理解してくれました。',
            dialogues: [
              { speaker: 'カフェオーナー 林さん', emoji: '☕', text: 'ユーザーの行動を考えてこの配置にしたんですね。理由が分かると安心です。' },
              { speaker: '水野ディレクター', emoji: '🎨', text: '「感覚」ではなく「論理」で説明できるデザイナーは信頼される。デザインの意図を言語化する力を磨こう。' },
            ],
            lesson: 'デザインの説明では「なんとなくおしゃれだから」ではなく「ターゲットの行動を分析し、この配置が最も効果的だから」と論理的に伝えることで、クライアントの納得感が大きく変わります。',
          },
        },
        {
          id: 'before-after',
          text: 'ビフォーアフターで比較し、新デザインの改善点を視覚的に示す',
          emoji: '↔️',
          effects: { design: 2, userUnderstanding: 1, technical: 0, presentation: 3 },
          feedback: {
            narration: 'ビジュアルでの比較により、デザインの価値が分かりやすく伝わりました。',
            dialogues: [
              { speaker: 'カフェオーナー 林さん', emoji: '☕', text: '比べると全然違いますね！ 新しいデザインの方がずっと印象的です。' },
              { speaker: '水野ディレクター', emoji: '🎨', text: 'ビフォーアフターは最も分かりやすいプレゼン手法の一つだ。デザインの価値を伝えるには「比較」が最強だ。' },
            ],
            lesson: 'プレゼンでは「比較」が最も効果的。ビフォーアフターや競合との比較で、デザインの価値を客観的に示すことができます。',
          },
        },
        {
          id: 'live-demo',
          text: '実際にプロトタイプを操作してもらい、ユーザー体験を直接感じてもらう',
          emoji: '👆',
          effects: { design: 1, userUnderstanding: 2, technical: 2, presentation: 2 },
          feedback: {
            narration: '実際に触ってもらったことで、デザインの使いやすさを体感してもらえました。',
            dialogues: [
              { speaker: 'カフェオーナー 林さん', emoji: '☕', text: 'スマホで実際に触ると、予約までの流れがスムーズですね！ これならお客さんも迷わなそう。' },
              { speaker: '水野ディレクター', emoji: '🎨', text: '百聞は一見に如かず、百見は一触に如かず。実際に触ってもらうのが一番だ。' },
            ],
            lesson: 'プロトタイプのライブデモは最も説得力のあるプレゼン方法。特にWebサイトのような「操作するもの」は、実際に触ってもらうことで、画面では伝わらない使い心地を体験してもらえます。',
          },
        },
      ],
    },
    {
      id: 'retrospective',
      title: '振り返り',
      timeLabel: 'プロジェクト完了後',
      narration: 'カフェのWebサイトが無事公開されました。クライアントにも喜んでもらえ、プロジェクトは成功です。',
      dialogues: [
        { speaker: '水野ディレクター', emoji: '🎨', text: 'いいサイトができたね。最後に、Webデザイナーとして一番大切だと感じたことを聞かせてくれ。' },
      ],
      situation: 'Webデザイナーとして一番大切だと感じたことは？',
      choices: [
        {
          id: 'user-centered',
          text: '常にユーザーの視点でデザインすること',
          emoji: '👤',
          effects: { design: 0, userUnderstanding: 3, technical: 0, presentation: 1 },
          feedback: {
            narration: 'ユーザー中心のデザイン思考を深く理解しました。',
            dialogues: [
              { speaker: '水野ディレクター', emoji: '🎨', text: 'その通り。デザイナーの自己満足ではなく、ユーザーにとって本当に使いやすく価値のあるデザインを追求する。これがUXデザインの本質だ。' },
            ],
            lesson: 'Webデザインの本質は「ユーザーの問題を解決すること」。美しさは重要ですが、それは「使いやすさ」の上に成り立つもの。ユーザー中心の考え方がデザインの基盤です。',
          },
        },
        {
          id: 'visual-communication',
          text: 'ビジュアルの力でクライアントの想いをユーザーに届けること',
          emoji: '🎨',
          effects: { design: 3, userUnderstanding: 0, technical: 0, presentation: 1 },
          feedback: {
            narration: 'ビジュアルコミュニケーションの力を実感しました。',
            dialogues: [
              { speaker: '水野ディレクター', emoji: '🎨', text: 'デザイナーは「視覚の翻訳者」。クライアントの想いを、ユーザーの心に届くビジュアルに変換する。その橋渡しができるのがデザイナーの価値だ。' },
            ],
            lesson: 'Webデザイナーはクライアントとユーザーの「橋渡し役」。クライアントのブランドや想いを、ユーザーに響くビジュアルとして表現する力が求められます。',
          },
        },
        {
          id: 'continuous-improvement',
          text: 'デザインは公開して終わりではなく、データをもとに改善し続けること',
          emoji: '📈',
          effects: { design: 1, userUnderstanding: 2, technical: 1, presentation: 0 },
          feedback: {
            narration: 'データドリブンなデザイン改善の重要性を実感しました。',
            dialogues: [
              { speaker: '水野ディレクター', emoji: '🎨', text: '公開後のアクセス解析やヒートマップで、ユーザーの実際の行動が分かる。仮説と実際が違うことも多い。データに基づいて改善し続けるのが、現代のWebデザイナーの仕事だ。' },
            ],
            lesson: '公開はゴールではなくスタート。アクセス解析・ヒートマップ・A/Bテストなどのデータをもとに、デザインを継続的に改善していくことが、成果を出すWebデザイナーの条件です。',
          },
        },
      ],
    },
  ],
  ending: (scores) => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const topMetric = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const topLabels: Record<string, string> = {
      design: 'ビジュアルの魔術師',
      userUnderstanding: 'UXデザインの達人',
      technical: 'テクニカルデザイナー',
      presentation: 'デザインの伝道師',
    };
    if (total >= 28) {
      return {
        title: topLabels[topMetric] ?? 'バランス型Webデザイナー',
        emoji: '🌟',
        summary: '素晴らしいデザイン体験でした！ ヒアリングからデザイン制作、アクセシビリティ対応、プレゼンまで、幅広いスキルを発揮しました。',
        learnings: [
          'Webデザイナーは「美しく作る」だけでなく、ユーザーの課題を解決する仕事',
          'ヒアリング・リサーチ・設計・制作・プレゼンとプロセスは多岐にわたる',
          'アクセシビリティは「特別な配慮」ではなく「品質の一部」',
          'デザインの意図を論理的に説明する力がクライアントの信頼を生む',
        ],
        realWorldNote: '実際のWebデザイナーも、こうしたプロセスの中でデザインを生み出しています。Web制作会社、事業会社、フリーランスなど活躍の場は多岐にわたります。',
      };
    }
    return {
      title: '成長中のWebデザイナー',
      emoji: '🌱',
      summary: 'Webデザインの奥深さと面白さを実感できた体験でした。技術とセンス、そしてコミュニケーション力のすべてが求められる仕事です！',
      learnings: [
        'デザインの第一歩は「聞くこと」。クライアントの要望を正確に理解する力が基盤',
        '美しさだけでなく「使いやすさ」を考えたデザインが求められる',
        'レスポンシブデザインでは、デバイスに応じた最適な情報設計が必要',
        'デザインは公開して終わりではなく、データで改善し続ける',
      ],
      realWorldNote: 'Webデザイナーはデザインツール（Figma等）だけでなく、HTML/CSSの基本知識があると活躍の幅が広がります。未経験から転職する人も多い職種です。',
    };
  },
};
