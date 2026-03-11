import type { JobExperience } from './types';

/** AIエンジニア体験ゲーム */
export const aiEngineerExperience: JobExperience = {
  jobId: 'ai-engineer',
  title: 'AIエンジニア体験',
  subtitle: 'AIで未来を切り拓く！ 画像認識システム開発の1日',
  intro: {
    narration:
      'あなたは今日から、AI開発企業「ディープビジョン」のAIエンジニアチームに配属されました。医療画像から病変を検出するAIシステムの開発プロジェクトが進行中です！',
    character: {
      name: 'アカネ先輩',
      emoji: '👩‍🔬',
      role: 'AIチームリーダー',
    },
    briefing:
      'ようこそ！ うちのチームでは医療画像AI「MedScan」を開発してるよ。レントゲン写真から肺の異常を検出するシステムなんだ。今日は開発工程を一通り体験してもらうね！',
  },
  metrics: [
    { key: 'technical', label: '技術力', emoji: '⚙️', color: 'text-blue-500' },
    { key: 'ethics', label: 'AI倫理', emoji: '⚖️', color: 'text-green-500' },
    {
      key: 'communication',
      label: '説明力',
      emoji: '💬',
      color: 'text-purple-500',
    },
    {
      key: 'problemSolving',
      label: '課題解決',
      emoji: '🔍',
      color: 'text-orange-500',
    },
  ],
  scenes: [
    // ── シーン1: データの前処理 ──
    {
      id: 'data-preprocessing',
      title: 'データの前処理に取り組もう',
      timeLabel: '09:00',
      narration:
        '朝一番の仕事は、AIに学習させるためのデータの準備です。病院から提供されたレントゲン画像データを確認します。',
      dialogues: [
        {
          speaker: 'アカネ先輩',
          emoji: '👩‍🔬',
          text: '今日届いた画像データ、まずは中身を確認しよう。AIの性能はデータの質で8割決まると言っても過言じゃないからね。',
        },
        {
          speaker: 'あなた',
          emoji: '🧑‍💻',
          text: '（データを開いてみると…画像サイズがバラバラだし、一部の画像は暗すぎて何が写っているか分からない。ラベル（正常・異常の分類）が付いていない画像も混ざっている…）',
          isPlayer: true,
        },
        {
          speaker: 'アカネ先輩',
          emoji: '👩‍🔬',
          text: '現実のデータはいつもキレイじゃないんだ。さて、どう前処理する？',
        },
      ],
      situation:
        '品質にばらつきのあるデータセットをどのように前処理しますか？',
      choices: [
        {
          id: 'thorough-cleaning',
          text: '品質の低い画像を除外し、残ったデータを丁寧にクリーニングする',
          emoji: '🧹',
          effects: { technical: 3, ethics: 1, communication: 0, problemSolving: 1 },
          feedback: {
            narration:
              '品質基準を設けて、基準を満たさないデータを除外しました。',
            dialogues: [
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: '丁寧なクリーニングだね。ノイズの多いデータを学習に使うと、AIが間違ったパターンを覚えてしまうんだ。',
              },
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: 'ただ、除外しすぎるとデータ量が減って学習に影響が出ることもある。除外基準の設定はバランスが大事だよ。',
              },
            ],
            lesson:
              'データクリーニングはAI開発の最重要ステップの一つです。「ゴミを入れればゴミが出る（Garbage In, Garbage Out）」という原則があり、データの質がモデルの性能を大きく左右します。',
          },
        },
        {
          id: 'augmentation',
          text: 'データ拡張（回転・反転・明るさ調整）で質と量を補う',
          emoji: '🔄',
          effects: { technical: 2, ethics: 0, communication: 1, problemSolving: 2 },
          feedback: {
            narration:
              'データ拡張技術を使って、学習データの質と量を確保しました。',
            dialogues: [
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: 'データ拡張（Data Augmentation）は少ないデータでも効果的に学習させるテクニックだね。画像を回転させたり反転させたりして、バリエーションを増やすんだ。',
              },
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: 'ただし医療画像の場合、過度な加工は病変の特徴を変えてしまうリスクもあるから、拡張の範囲は慎重に決めようね。',
              },
            ],
            lesson:
              'データ拡張は限られたデータから学習効果を高める重要な手法です。ただし、ドメイン（分野）の特性を理解した上で適切な拡張方法を選ぶ必要があります。',
          },
        },
        {
          id: 'consult-doctor',
          text: '医師に相談して、ラベル付けの基準と品質チェックを一緒に行う',
          emoji: '👨‍⚕️',
          effects: { technical: 1, ethics: 2, communication: 2, problemSolving: 1 },
          feedback: {
            narration:
              '医療の専門家と連携して、正確なデータセットを構築しました。',
            dialogues: [
              {
                speaker: 'ドクター田中',
                emoji: '👨‍⚕️',
                text: 'この画像は正常に見えるけど、この影は要注意だね。ラベルの基準を一緒に明確にしておこう。',
              },
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: 'ドメインの専門家と連携するのはAI開発の基本だよ。私たちだけでは正確なラベルは付けられないからね。',
              },
            ],
            lesson:
              'AI開発では、その分野（ドメイン）の専門家との連携が不可欠です。特に医療AIでは、医師の知見なしに正確なデータセットを作ることはできません。',
          },
        },
      ],
    },

    // ── シーン2: モデル設計 ──
    {
      id: 'model-design',
      title: 'AIモデルを設計しよう',
      timeLabel: '11:00',
      narration:
        'データの準備ができたので、次はAIモデルのアーキテクチャ（構造）を設計します。',
      dialogues: [
        {
          speaker: 'アカネ先輩',
          emoji: '👩‍🔬',
          text: 'モデル設計のフェーズだね。画像認識には深層学習（ディープラーニング）が有効なんだけど、いくつかアプローチがあるよ。',
        },
        {
          speaker: 'アカネ先輩',
          emoji: '👩‍🔬',
          text: 'A：既存の学習済みモデル（ResNetなど）を転移学習で使う。B：自分たちでゼロからモデルを設計する。C：軽量モデルで高速に動くものを作る。',
        },
        {
          speaker: 'ケンジさん',
          emoji: '👨‍💻',
          text: '病院側からは「診察中にリアルタイムで結果が出てほしい」って要望が来てますよ。',
        },
      ],
      situation:
        '精度・速度・開発期間のトレードオフがあります。どのアプローチを選びますか？',
      choices: [
        {
          id: 'transfer-learning',
          text: '転移学習で学習済みモデルを活用する',
          emoji: '🔁',
          effects: { technical: 2, ethics: 1, communication: 1, problemSolving: 2 },
          feedback: {
            narration:
              '大規模データで事前学習されたモデルをベースに、医療画像に特化した微調整を行いました。',
            dialogues: [
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: '賢い選択だね。転移学習（Transfer Learning）は、巨大なデータで学んだ「画像の見方」を再利用できるんだ。少ないデータでも高い精度が出やすいよ。',
              },
              {
                speaker: 'ケンジさん',
                emoji: '👨‍💻',
                text: '開発期間も短縮できますね。ゼロから作るより遥かに効率的です。',
              },
            ],
            lesson:
              '転移学習はAI開発の定番手法です。ImageNetなどの大規模データで学習済みのモデルを土台にすることで、少量のデータでも高精度なモデルを効率よく構築できます。',
          },
        },
        {
          id: 'from-scratch',
          text: '独自のモデルをゼロから設計する',
          emoji: '🏗️',
          effects: { technical: 3, ethics: 0, communication: 0, problemSolving: 2 },
          feedback: {
            narration:
              'ゼロから設計した独自モデルに挑戦しました。',
            dialogues: [
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: '技術的な挑戦としては素晴らしいね。独自モデルなら、医療画像に最適化した構造にできる可能性がある。',
              },
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: 'ただ、開発に時間がかかるのと、十分な学習データが必要になるよ。スケジュールとの兼ね合いは意識しておこう。',
              },
            ],
            lesson:
              '独自モデル設計は技術力を高める経験になりますが、コストも大きいです。実務ではまず既存手法で検証し、それで不十分な場合に独自設計を検討するのが一般的です。',
          },
        },
        {
          id: 'lightweight-model',
          text: '軽量モデルでリアルタイム推論を優先する',
          emoji: '⚡',
          effects: { technical: 2, ethics: 0, communication: 2, problemSolving: 2 },
          feedback: {
            narration:
              '推論速度を重視した軽量モデルを選択しました。',
            dialogues: [
              {
                speaker: 'ケンジさん',
                emoji: '👨‍💻',
                text: '病院側の要望に応えられるのは大きいですね。現場で使ってもらえなければ意味がないですから。',
              },
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: 'ユーザーの要望を技術選定に反映するのは大事な視点だね。MobileNetやEfficientNetのような軽量モデルでも十分な精度は出せるよ。',
              },
            ],
            lesson:
              'AIモデルは精度だけでなく「実際に使える速度で動くか」も重要です。ユーザーの利用環境を考慮した技術選定ができるのは、優れたAIエンジニアの特徴です。',
          },
        },
      ],
    },

    // ── シーン3: 学習の実行と評価 ──
    {
      id: 'training-evaluation',
      title: '学習を実行して評価しよう',
      timeLabel: '13:00',
      narration:
        'モデルの学習を実行した結果が出ました。しかし、評価指標を見ると気になる点があります。',
      dialogues: [
        {
          speaker: 'ケンジさん',
          emoji: '👨‍💻',
          text: '学習が終わりました！ 全体の正解率は95%です！',
        },
        {
          speaker: 'アカネ先輩',
          emoji: '👩‍🔬',
          text: 'ちょっと待って。もう少し詳しく見てみよう。',
        },
        {
          speaker: 'あなた',
          emoji: '🧑‍💻',
          text: '（詳細を確認すると…正常画像の判定は99%正確だけど、異常画像を「異常」と正しく検出できたのは70%しかない。つまり、病変を見逃すケースが30%もある…）',
          isPlayer: true,
        },
      ],
      situation:
        '全体の正解率は高いものの、病変の見逃し率（偽陰性率）が高いことが判明しました。どう対応しますか？',
      choices: [
        {
          id: 'adjust-threshold',
          text: '検出の閾値を下げて、見逃しを減らす方向に調整する',
          emoji: '🎚️',
          effects: { technical: 2, ethics: 2, communication: 1, problemSolving: 2 },
          feedback: {
            narration:
              '閾値を調整し、病変の見逃しを大幅に減らしました。ただし、誤検出は増えました。',
            dialogues: [
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: '医療AIでは「見逃し」と「誤報」のどちらがより深刻かを考えるのが大事なんだ。病気の見逃しは命に関わるから、多少の誤報を許容してでも見逃しを減らすのが正解だね。',
              },
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: 'これを「再現率（Recall）を重視する」って言うんだよ。',
              },
            ],
            lesson:
              'AIモデルの評価は「正解率」だけでは不十分です。医療分野では再現率（感度）が特に重要で、「病気を見逃さない」ことが最優先されます。用途に応じて適切な評価指標を選ぶことがAIエンジニアの重要なスキルです。',
          },
        },
        {
          id: 'more-data',
          text: '異常画像のデータを増やして再学習する',
          emoji: '📊',
          effects: { technical: 2, ethics: 1, communication: 1, problemSolving: 3 },
          feedback: {
            narration:
              '異常画像のデータを追加収集し、データの不均衡を解消して再学習しました。',
            dialogues: [
              {
                speaker: 'ケンジさん',
                emoji: '👨‍💻',
                text: 'データの不均衡が原因だったんですね。正常画像が圧倒的に多かったから、AIが「とりあえず正常と答えれば正解率が上がる」と学習してしまっていたんだ。',
              },
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: 'クラスの不均衡は医療AIでよくある問題だね。オーバーサンプリングやSMOTEなどの手法で対処できるよ。',
              },
            ],
            lesson:
              'データの不均衡（クラスインバランス）はAIモデルの性能を大きく偏らせます。正解率が高く見えても、少数クラスの検出が弱いことがあるため、混同行列で詳細に評価することが大切です。',
          },
        },
        {
          id: 'ensemble',
          text: '複数のモデルを組み合わせて検出精度を上げる',
          emoji: '🤝',
          effects: { technical: 3, ethics: 0, communication: 1, problemSolving: 2 },
          feedback: {
            narration:
              '異なるアーキテクチャのモデルを組み合わせたアンサンブル学習を試みました。',
            dialogues: [
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: 'アンサンブル学習は精度向上の定番手法だね。複数のモデルが「多数決」で判定するから、一つのモデルの弱点を他が補えるんだ。',
              },
              {
                speaker: 'ケンジさん',
                emoji: '👨‍💻',
                text: 'ただ、推論速度が落ちるのでリアルタイム要件との兼ね合いは考える必要がありますね。',
              },
            ],
            lesson:
              'アンサンブル学習は複数モデルの組み合わせで精度を向上させる手法です。Random ForestやBagging、Boostingなど様々な方法があり、コンペティションでもよく使われます。ただし、計算コストとのトレードオフがあります。',
          },
        },
      ],
    },

    // ── シーン4: バイアスと公平性 ──
    {
      id: 'bias-fairness',
      title: 'バイアスと公平性に向き合う',
      timeLabel: '14:30',
      narration:
        'モデルの性能を属性ごとに分析していると、重大な偏りが見つかりました。',
      dialogues: [
        {
          speaker: 'あなた',
          emoji: '🧑‍💻',
          text: '（年代別の検出精度を調べると…60代以上の患者では精度92%だけど、30代以下の若年層では精度が78%まで落ちている。若い患者の病変を見逃しやすいということだ…）',
          isPlayer: true,
        },
        {
          speaker: 'アカネ先輩',
          emoji: '👩‍🔬',
          text: '原因は分かる？ 学習データの年齢分布を見てみて。',
        },
        {
          speaker: 'あなた',
          emoji: '🧑‍💻',
          text: '（学習データの75%が50代以上の患者データだ。若年層のデータが極端に少ない…）',
          isPlayer: true,
        },
      ],
      situation:
        'AIモデルに年齢によるバイアスが発見されました。若年層の検出精度が低いまま運用すると、若い患者の病気を見逃すリスクがあります。どう対処しますか？',
      choices: [
        {
          id: 'collect-young-data',
          text: '若年層のデータを追加収集して、データの偏りを解消する',
          emoji: '📥',
          effects: { technical: 1, ethics: 3, communication: 1, problemSolving: 2 },
          feedback: {
            narration:
              '複数の病院と連携して若年層のデータを追加収集し、偏りを解消しました。',
            dialogues: [
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: '根本的な解決策だね。データの偏りはAIのバイアスに直結する。全ての患者さんに公平な精度を提供するのは、医療AIの最低限の責任だよ。',
              },
              {
                speaker: 'ドクター田中',
                emoji: '👨‍⚕️',
                text: '若い患者さんの病変を見逃すのは絶対に避けなければなりません。データ収集に協力しますよ。',
              },
            ],
            lesson:
              'AIのバイアスの多くはデータの偏りに起因します。学習データが特定の属性に偏っていると、AIの精度にも差が出ます。公平なAIを作るには、多様なデータを収集することが基本中の基本です。',
          },
        },
        {
          id: 'stratified-eval',
          text: '属性ごとの精度基準を設け、全ての層で基準を満たすまで改善する',
          emoji: '📏',
          effects: { technical: 2, ethics: 2, communication: 1, problemSolving: 2 },
          feedback: {
            narration:
              '年代別・性別など属性ごとの精度基準を設定し、全ての層で基準をクリアするまで改善を続けました。',
            dialogues: [
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: '「全体の精度」だけでなく「属性ごとの精度」を評価するのは、公平なAIを作るための重要な考え方だよ。これを「公平性指標」と呼ぶんだ。',
              },
              {
                speaker: 'ケンジさん',
                emoji: '👨‍💻',
                text: 'テストのパイプラインに公平性チェックを組み込んでおけば、今後も自動で検出できますね。',
              },
            ],
            lesson:
              'モデル評価では全体の精度だけでなく、サブグループごとの精度差を確認する「公平性評価」が不可欠です。属性ごとに大きな精度差がないかチェックする仕組みを開発プロセスに組み込みましょう。',
          },
        },
        {
          id: 'flag-limitation',
          text: '精度が低い層には「AI判定の信頼度が低い」と警告を表示する',
          emoji: '⚠️',
          effects: { technical: 1, ethics: 2, communication: 3, problemSolving: 0 },
          feedback: {
            narration:
              'AIの限界を正直にユーザーに伝える仕組みを導入しました。',
            dialogues: [
              {
                speaker: 'ドクター田中',
                emoji: '👨‍⚕️',
                text: 'AIの限界を明示してくれるのは医師としてありがたいです。信頼度が低い場合はより慎重に判断できますから。',
              },
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: 'AIの透明性を高めるアプローチだね。ただ、根本的にはデータの偏りも解消していく必要があるよ。両方を並行して進めよう。',
              },
            ],
            lesson:
              'AIの限界を正直に伝える「透明性」は信頼あるAIの必須条件です。ユーザーがAIの判断をどの程度信頼すべきかを知ることで、適切な意思決定ができます。ただし、根本原因の解消も忘れずに。',
          },
        },
      ],
    },

    // ── シーン5: 本番環境デプロイ ──
    {
      id: 'deployment',
      title: '本番環境にデプロイしよう',
      timeLabel: '16:00',
      narration:
        'モデルの改善が進み、いよいよ本番環境へのデプロイ（導入）を準備します。しかし、いくつかの課題が浮上しました。',
      dialogues: [
        {
          speaker: 'ケンジさん',
          emoji: '👨‍💻',
          text: '本番環境のサーバーは病院のオンプレミス環境です。GPUが搭載されていないので、推論速度が心配です。',
        },
        {
          speaker: 'アカネ先輩',
          emoji: '👩‍🔬',
          text: 'あと、モデルの更新（再学習）をどう運用するかも決めないとね。医療データは日々増えていくから。',
        },
        {
          speaker: 'ケンジさん',
          emoji: '👨‍💻',
          text: 'デプロイ戦略、どうしましょう？',
        },
      ],
      situation:
        '本番環境はGPUなしのオンプレミスサーバー。推論速度の確保とモデル更新の運用設計が課題です。',
      choices: [
        {
          id: 'optimize-model',
          text: 'モデルを量子化・軽量化してCPUでも高速に動くようにする',
          emoji: '🔧',
          effects: { technical: 3, ethics: 0, communication: 1, problemSolving: 2 },
          feedback: {
            narration:
              'モデルの量子化（精度を少し犠牲にして計算を軽くする技術）と枝刈りで推論速度を大幅に改善しました。',
            dialogues: [
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: 'ONNXへの変換とINT8量子化で推論速度が3倍になったね。精度の低下は0.5%以内に収まっているし、実用上は問題ないレベルだ。',
              },
              {
                speaker: 'ケンジさん',
                emoji: '👨‍💻',
                text: '現場の環境に合わせて最適化するのもAIエンジニアの腕の見せどころですね。',
              },
            ],
            lesson:
              'AIモデルのデプロイでは、開発環境と本番環境の違いを考慮する必要があります。量子化、蒸留、枝刈りなどの最適化技術を使えば、限られたハードウェアでも実用的な速度を実現できます。',
          },
        },
        {
          id: 'cloud-api',
          text: 'クラウドのGPUサーバーにモデルを置き、APIで呼び出す構成にする',
          emoji: '☁️',
          effects: { technical: 2, ethics: 1, communication: 2, problemSolving: 1 },
          feedback: {
            narration:
              'クラウドAPIを利用した構成を提案しましたが、データの扱いについて議論が必要になりました。',
            dialogues: [
              {
                speaker: 'ドクター田中',
                emoji: '👨‍⚕️',
                text: '患者のレントゲン画像を外部のクラウドに送信するのは、個人情報保護の観点から慎重に検討する必要がありますね。',
              },
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: '技術的には良い選択肢だけど、医療データの取り扱いには厳しい規制があるんだ。匿名化処理や専用のセキュアな回線を用意するなど、対策を考えよう。',
              },
            ],
            lesson:
              'クラウドは高性能な計算資源を手軽に使える利点がありますが、医療データなどのセンシティブな情報を扱う場合は、プライバシー保護やデータガバナンスの観点から慎重な設計が求められます。',
          },
        },
        {
          id: 'gradual-rollout',
          text: '段階的にデプロイし、まず1つの診療科で試験運用してから拡大する',
          emoji: '📈',
          effects: { technical: 1, ethics: 2, communication: 2, problemSolving: 2 },
          feedback: {
            narration:
              'まず呼吸器内科で試験運用を開始し、フィードバックを得てから他の診療科に拡大する計画を立てました。',
            dialogues: [
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: '段階的デプロイは実務では非常に重要な戦略だよ。いきなり全体に展開すると、問題が起きた時の影響が大きすぎるからね。',
              },
              {
                speaker: 'ドクター田中',
                emoji: '👨‍⚕️',
                text: '現場の声を聞きながら改善していけるのは助かります。最初から完璧を求めるのは非現実的ですからね。',
              },
            ],
            lesson:
              '段階的デプロイ（カナリアリリース）はリスクを最小化しながらシステムを導入する方法です。小さく始めて検証し、問題がないことを確認してから段階的に展開するのが安全な導入戦略です。',
          },
        },
      ],
    },

    // ── シーン6: クライアントへの説明 ──
    {
      id: 'client-explanation',
      title: 'クライアントにAIを説明しよう',
      timeLabel: '17:00',
      narration:
        '導入先の病院の院長や看護師長に向けて、AIシステムの説明会が開かれました。医療従事者はAIに詳しくない方がほとんどです。',
      dialogues: [
        {
          speaker: '院長・スズキ先生',
          emoji: '👨‍⚕️',
          text: 'このAIシステムは、医師の判断をどこまで置き換えるものなの？ 誤診したら誰の責任になるの？',
        },
        {
          speaker: '看護師長・ミヤケさん',
          emoji: '👩‍⚕️',
          text: '現場のスタッフが使いこなせるか心配です。操作が難しくないですか？',
        },
      ],
      situation:
        'AIに対する不安や疑問を持つクライアントに、正直かつ分かりやすく説明する必要があります。',
      choices: [
        {
          id: 'support-tool',
          text: 'AIは医師の判断を「支援」するツールであり、最終判断は医師が行うと明確に伝える',
          emoji: '🤝',
          effects: { technical: 0, ethics: 3, communication: 2, problemSolving: 1 },
          feedback: {
            narration:
              'AIの役割と限界を正直に伝えたことで、医療スタッフの安心感が高まりました。',
            dialogues: [
              {
                speaker: 'あなた',
                emoji: '🧑‍💻',
                text: 'このAIは「第二の目」として医師の診断を支援します。見落としを防ぐ補助ツールであり、最終的な診断と責任は必ず医師にあります。AIは100%正確ではないので、必ず医師の確認が必要です。',
                isPlayer: true,
              },
              {
                speaker: '院長・スズキ先生',
                emoji: '👨‍⚕️',
                text: 'なるほど。あくまで支援ツールなら安心できますね。AIの限界も正直に言ってくれるのは信頼できます。',
              },
            ],
            lesson:
              'AIの役割と限界を正直に伝えることは、信頼関係の基盤です。特に医療AIでは「AIが全てを判断する」という誤解を防ぎ、人間とAIの適切な役割分担を明確にすることが重要です。',
          },
        },
        {
          id: 'demo-with-cases',
          text: '実際の症例（匿名化済み）を使ってデモを見せながら説明する',
          emoji: '🖥️',
          effects: { technical: 1, ethics: 1, communication: 3, problemSolving: 1 },
          feedback: {
            narration:
              '匿名化された実際の症例を使ったデモにより、AIの動作を直感的に理解してもらえました。',
            dialogues: [
              {
                speaker: 'あなた',
                emoji: '🧑‍💻',
                text: 'この画像でAIが検出した異常箇所がこちらです。ヒートマップで「AIがどこに注目しているか」も表示できます。',
                isPlayer: true,
              },
              {
                speaker: '看護師長・ミヤケさん',
                emoji: '👩‍⚕️',
                text: 'AIがどこを見て判断しているか分かるのは安心しますね。ブラックボックスじゃないんですね。',
              },
            ],
            lesson:
              '実例を使ったデモは最も説得力のある説明方法です。また、Grad-CAMなどのヒートマップ表示でAIの判断根拠を可視化する「説明可能なAI（XAI）」は、ユーザーの信頼を得るための重要な技術です。',
          },
        },
        {
          id: 'training-plan',
          text: 'スタッフ向けの研修プランと、導入後のサポート体制を提案する',
          emoji: '📚',
          effects: { technical: 0, ethics: 1, communication: 2, problemSolving: 3 },
          feedback: {
            narration:
              '具体的な研修プランとサポート体制を提示したことで、導入への不安が軽減しました。',
            dialogues: [
              {
                speaker: 'あなた',
                emoji: '🧑‍💻',
                text: '導入後1ヶ月間はオンサイトでサポートします。使い方の研修は3回に分けて実施し、いつでも質問できるチャットサポートも用意します。',
                isPlayer: true,
              },
              {
                speaker: '院長・スズキ先生',
                emoji: '👨‍⚕️',
                text: 'サポート体制がしっかりしていると心強いですね。段階的に慣れていけるのは良いアプローチだ。',
              },
            ],
            lesson:
              'AIシステムの導入成功は技術だけでは決まりません。現場のユーザーが安心して使えるよう、研修とサポート体制を整えることが定着のカギです。技術の押し付けではなく、寄り添う姿勢が大切です。',
          },
        },
      ],
    },

    // ── シーン7: 振り返り ──
    {
      id: 'retrospective',
      title: 'プロジェクトの振り返り',
      timeLabel: '18:00',
      narration:
        '充実した1日の終わり、チームで今日の仕事を振り返ります。',
      dialogues: [
        {
          speaker: 'アカネ先輩',
          emoji: '👩‍🔬',
          text: 'お疲れさま！ 今日はAI開発の一連の流れを体験してもらったけど、どうだった？',
        },
        {
          speaker: 'ケンジさん',
          emoji: '👨‍💻',
          text: 'データの前処理からデプロイまで、AIエンジニアの仕事は本当に幅広いですよね。',
        },
        {
          speaker: 'アカネ先輩',
          emoji: '👩‍🔬',
          text: '今日1日を通して、一番大事だと感じたことは何？',
        },
      ],
      situation: 'あなたが今日の体験で最も学びになったことは？',
      choices: [
        {
          id: 'learned-data-importance',
          text: 'データの質と公平性がAIの性能を根本的に決めるということ',
          emoji: '📊',
          effects: { technical: 1, ethics: 3, communication: 0, problemSolving: 1 },
          feedback: {
            narration:
              'データの重要性を実感した1日でした。',
            dialogues: [
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: 'その通り！ 「AI開発の8割はデータ作業」と言われるくらい、データの質が全てを左右するんだ。偏りのないデータを集めることが、公平で信頼できるAIへの第一歩だよ。',
              },
            ],
            lesson:
              'AIエンジニアの仕事の大部分はデータに関する作業です。収集、クリーニング、ラベリング、バイアスの検出と対処など、地道なデータ作業が高品質なAIモデルの基盤となります。',
          },
        },
        {
          id: 'learned-real-world',
          text: '現場で実際に使ってもらうためには、技術以外の力が不可欠だということ',
          emoji: '🌍',
          effects: { technical: 0, ethics: 1, communication: 3, problemSolving: 1 },
          feedback: {
            narration:
              'AIを社会実装するための総合力の大切さに気づきました。',
            dialogues: [
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: 'AIは作って終わりじゃない。使う人に理解してもらい、信頼してもらって、初めて価値が生まれるんだ。説明力やサポート設計も立派な技術だよ。',
              },
            ],
            lesson:
              'AI技術を社会に届けるには「説明力」「ユーザー理解」「運用設計」など技術以外の力が必要です。どんなに優れたモデルも、使ってもらえなければ意味がありません。',
          },
        },
        {
          id: 'learned-responsibility',
          text: 'AIが間違えた時の影響を常に考え、安全策を用意しておくことの大切さ',
          emoji: '🛡️',
          effects: { technical: 1, ethics: 1, communication: 0, problemSolving: 3 },
          feedback: {
            narration:
              'AIの安全運用への意識が高まりました。',
            dialogues: [
              {
                speaker: 'アカネ先輩',
                emoji: '👩‍🔬',
                text: '大事な視点だね。AIは100%正確にはなれない。だからこそ「間違えた時にどうするか」を事前に設計しておくのがプロの仕事なんだ。フォールバック、モニタリング、人間のチェック体制、全部大切だよ。',
              },
            ],
            lesson:
              'AIシステムの設計では「失敗を前提とした安全設計」が欠かせません。フォールバック機構、異常検知、人間による最終確認など、多層的な安全策を組み込むことが、責任あるAI開発の基本です。',
          },
        },
      ],
    },
  ],
  ending: (scores) => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const topMetric = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const topLabels: Record<string, string> = {
      technical: '技術を極めるAIエンジニア',
      ethics: '倫理と公平性を守るAIエンジニア',
      communication: 'AIと社会をつなぐ伝道師',
      problemSolving: '課題解決のスペシャリスト',
    };
    if (total >= 37) {
      return {
        title: topLabels[topMetric] ?? 'バランス型AIエンジニア',
        emoji: '🌟',
        summary:
          'すばらしい1日でした！ データの前処理からデプロイまで、技術力・倫理観・説明力・課題解決力をバランスよく発揮しました。',
        learnings: [
          'AIエンジニアは「モデルを作る」だけでなく、データ品質・公平性・運用設計まで幅広く責任を持つ仕事',
          'AIの性能はデータの質と公平性で決まる。バイアスの検出と対処は最重要課題の一つ',
          '技術を知らない人にAIを分かりやすく伝える「説明力」がプロジェクト成功のカギ',
          'AIは100%正確ではないからこそ、安全設計とモニタリング体制が不可欠',
        ],
        realWorldNote:
          '実際のAIエンジニアも、モデル開発だけでなくデータ整備・倫理審査・本番運用・クライアント対応など幅広い業務を担っています。Google、OpenAI、Preferred Networksなど多くの企業でAIエンジニアが活躍しています。',
      };
    }
    return {
      title: '成長中のAIエンジニア',
      emoji: '🌱',
      summary:
        'AI開発の一連の流れを体験し、多くの学びを得た1日でした。技術・倫理・コミュニケーション、どれも奥が深い世界です！',
      learnings: [
        'AIエンジニアは「モデルを作る」だけでなく、データ品質・公平性・運用まで幅広くカバーする仕事',
        'AIプロジェクトでは技術的な判断と倫理的な判断の両方が常に求められる',
        'どの選択にもトレードオフがある。経験を積んでバランス感覚を磨いていこう',
        'AIは急速に進化する分野。常に学び続ける姿勢が最も大切',
      ],
      realWorldNote:
        '実際のAIエンジニアも、最初は試行錯誤の連続です。大切なのは技術への好奇心と、社会への責任感を持ち続けること。AI分野は今後もますます成長していく注目の職業です。',
    };
  },
};
