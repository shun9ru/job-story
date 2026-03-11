import type { JobExperience } from './types';

/** セキュリティエンジニア体験ゲーム */
export const securityEngineerExperience: JobExperience = {
  jobId: 'security-engineer',
  title: 'セキュリティエンジニア体験',
  subtitle: 'サイバー攻撃から企業を守れ！ デジタルの番人',
  intro: {
    narration: 'あなたは今日から、大手ECサイトのセキュリティチームで働きます。日々進化するサイバー攻撃から、何百万人ものユーザーの情報を守るのがあなたの使命です。',
    character: {
      name: '黒田リーダー',
      emoji: '🛡️',
      role: 'セキュリティチームリーダー',
    },
    briefing:
      'ようこそ。セキュリティは「何も起きないことが成功」という地味な仕事に見えるかもしれない。でも、僕たちがいなければ何百万人の個人情報が危険にさらされる。今日は色々な場面を体験してもらうよ。',
  },
  metrics: [
    { key: 'security', label: 'セキュリティ知識', emoji: '🔒', color: 'text-blue-500' },
    { key: 'analysis', label: '分析力', emoji: '🔬', color: 'text-purple-500' },
    { key: 'response', label: '対応力', emoji: '⚡', color: 'text-red-500' },
    { key: 'communication', label: 'コミュニケーション', emoji: '💬', color: 'text-green-500' },
  ],
  scenes: [
    {
      id: 'morning-monitoring',
      title: '朝のセキュリティ監視',
      timeLabel: '9:00',
      narration: 'セキュリティエンジニアの朝はシステムのログを確認することから始まります。異常がないかチェックするのが日課です。',
      dialogues: [
        { speaker: '黒田リーダー', emoji: '🛡️', text: '昨夜のログで、海外からの不審なアクセスが急増してる。いつもの10倍くらいだ。' },
        { speaker: '黒田リーダー', emoji: '🛡️', text: '今のところ実害はなさそうだけど、どう対応する？' },
      ],
      situation: '海外からの不審なアクセスが急増しています。実害はまだ出ていません。',
      choices: [
        {
          id: 'block-immediately',
          text: '即座に該当IPアドレス帯域からのアクセスをブロックする',
          emoji: '🚫',
          effects: { security: 3, analysis: 1, response: 3, communication: 0 },
          feedback: {
            narration: '素早いブロックで不審なアクセスを遮断できました。ただし、正規のユーザーも巻き込まれていないか確認が必要です。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: '判断は速かったね。ただ、IPブロックは正規ユーザーも巻き込む可能性がある。影響範囲を確認してから実行するともっと良いよ。' },
            ],
            lesson: 'セキュリティ対応では「スピード」と「正確さ」の両立が求められます。素早い対応は大切ですが、影響範囲を確認してから行動する習慣をつけましょう。',
          },
        },
        {
          id: 'analyze-pattern',
          text: 'まずアクセスパターンを詳しく分析して、攻撃の種類を特定する',
          emoji: '🔍',
          effects: { security: 2, analysis: 3, response: 1, communication: 1 },
          feedback: {
            narration: 'アクセスパターンを分析した結果、ブルートフォース攻撃（パスワード総当たり）であることが判明しました。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: 'よく見つけたね。パスワード総当たり攻撃だ。アクセス元のIPとタイミングのパターンから、ボットネットを使った自動攻撃と分かる。' },
              { speaker: '黒田リーダー', emoji: '🛡️', text: '攻撃の種類が分かれば、的確な対策が打てる。分析力はセキュリティの基本スキルだ。' },
            ],
            lesson: '攻撃の種類を特定することで、最適な防御策を選べます。ブルートフォース攻撃には「アカウントロック」「レート制限」「多要素認証」などの対策が有効です。',
          },
        },
        {
          id: 'escalate',
          text: '上長に報告し、チームで対応方針を検討する',
          emoji: '📢',
          effects: { security: 1, analysis: 1, response: 2, communication: 3 },
          feedback: {
            narration: 'チームで情報共有したことで、組織的な対応ができました。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: '報告してくれてありがとう。セキュリティインシデントは一人で抱えない。組織として対応することが重要なんだ。' },
              { speaker: '黒田リーダー', emoji: '🛡️', text: 'では、チームで分担して対応しよう。分析班と対応班に分かれて動くぞ。' },
            ],
            lesson: 'セキュリティインシデントは「一人で抱え込まない」が鉄則。組織として対応することで、見落としを防ぎ、適切な判断ができます。報告・連絡・相談はセキュリティの基本です。',
          },
        },
      ],
    },
    {
      id: 'vulnerability-scan',
      title: '脆弱性診断',
      timeLabel: '10:30',
      narration: '定期的に行う脆弱性診断の時間です。自社のシステムに弱点がないかをチェックします。',
      dialogues: [
        { speaker: '黒田リーダー', emoji: '🛡️', text: '新しくリリースした決済ページの脆弱性診断を行おう。どのツールでどう診断する？' },
        { speaker: '山田さん', emoji: '👩‍💻', text: '自動スキャンツールで一通り回した結果、いくつか「中」レベルの警告が出ています。' },
      ],
      situation: '脆弱性スキャンで複数の警告が出ました。次のステップは？',
      choices: [
        {
          id: 'manual-verify',
          text: '自動ツールの結果を手動で検証し、誤検知を排除する',
          emoji: '🧪',
          effects: { security: 3, analysis: 3, response: 1, communication: 0 },
          feedback: {
            narration: '手動検証の結果、3件中1件は誤検知でしたが、2件は実際に対処が必要でした。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: '自動ツールの結果を鵜呑みにしない。これが大事だ。誤検知（フォールスポジティブ）を見極められるのがプロの力だよ。' },
            ],
            lesson: '自動ツールの結果は必ず手動で検証しましょう。誤検知を正確に見極め、本当に危険な脆弱性に集中して対応することが、限られた時間を有効に使うコツです。',
          },
        },
        {
          id: 'prioritize-fix',
          text: '深刻度に基づいて優先順位をつけ、開発チームに修正を依頼する',
          emoji: '📋',
          effects: { security: 2, analysis: 1, response: 2, communication: 3 },
          feedback: {
            narration: '優先度を明確にしたことで、開発チームもスムーズに対応できました。',
            dialogues: [
              { speaker: '山田さん', emoji: '👩‍💻', text: '開発チームに分かりやすいレポートで伝えたら、すぐに対応してもらえました。' },
              { speaker: '黒田リーダー', emoji: '🛡️', text: '技術的な脆弱性情報を開発者が理解できる言葉で伝えるのも、セキュリティエンジニアの大事な仕事だ。' },
            ],
            lesson: 'セキュリティエンジニアは「発見して終わり」ではなく、開発チームに修正してもらうまでがゴール。優先順位と対策方法を分かりやすく伝えるコミュニケーション力が重要です。',
          },
        },
        {
          id: 'deep-pentest',
          text: 'さらに深い侵入テスト（ペネトレーションテスト）を実施する',
          emoji: '🔓',
          effects: { security: 3, analysis: 2, response: 2, communication: 0 },
          feedback: {
            narration: '深い侵入テストの結果、自動ツールでは見つからなかった重大な脆弱性を発見しました。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: 'いい判断だ。ペネトレーションテストは攻撃者の視点でシステムを調べる。自動ツールでは見つからない複合的な脆弱性が見つかることがある。' },
            ],
            lesson: 'ペネトレーションテストは「攻撃者の視点」でシステムを診断する高度な手法です。自動ツールと手動テストを組み合わせることで、セキュリティの穴を最大限に発見できます。',
          },
        },
      ],
    },
    {
      id: 'incident',
      title: 'インシデント発生！',
      timeLabel: '13:00',
      narration: '昼食後、セキュリティ監視システムからアラートが鳴り響きます。',
      dialogues: [
        { speaker: '監視システム', emoji: '🚨', text: '【重大アラート】不正なデータベースクエリが検知されました。SQLインジェクション攻撃の可能性。' },
        { speaker: '黒田リーダー', emoji: '🛡️', text: 'これは本物のインシデントだ。落ち着いて、手順通りに動こう。' },
      ],
      situation: 'SQLインジェクション攻撃が検知されました。データ漏洩の可能性があります。',
      choices: [
        {
          id: 'contain-first',
          text: '直ちに攻撃元のアクセスを遮断し、被害の拡大を防ぐ',
          emoji: '🛑',
          effects: { security: 3, analysis: 1, response: 3, communication: 1 },
          feedback: {
            narration: '素早い遮断で、被害を最小限に食い止めることができました。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: 'よし、まず封じ込めだ。インシデント対応の最初のステップは「被害の拡大を止めること」。正解だよ。' },
              { speaker: '黒田リーダー', emoji: '🛡️', text: '次はデータ漏洩の有無を確認しよう。ログを詳しく分析するぞ。' },
            ],
            lesson: 'インシデント対応の基本は「検知→封じ込め→根絶→復旧→教訓」の5ステップ。まず被害の拡大を止めることが最優先です。',
          },
        },
        {
          id: 'assess-damage',
          text: 'まずデータ漏洩の有無と影響範囲を調査してから対応を決める',
          emoji: '📊',
          effects: { security: 2, analysis: 3, response: 1, communication: 2 },
          feedback: {
            narration: '影響範囲を調査した結果、幸い個人情報の漏洩は確認されませんでしたが、対応に時間がかかりました。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: '影響範囲を調べる姿勢はいい。ただ、攻撃が進行中の場合は、まず遮断してから調査する方が安全だ。攻撃が続いている間に被害が拡大するリスクがあるからね。' },
            ],
            lesson: '攻撃が進行中の場合、調査より先に封じ込めを優先しましょう。遮断してからでも詳しい調査はできます。「止めてから調べる」がセキュリティの鉄則です。',
          },
        },
        {
          id: 'activate-irp',
          text: 'インシデント対応計画（IRP）を発動し、関係部門に一斉通知する',
          emoji: '📋',
          effects: { security: 2, analysis: 1, response: 2, communication: 3 },
          feedback: {
            narration: '組織的な対応体制が即座に立ち上がり、効率的にインシデント対応が進みました。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: 'IRP発動は正しい判断だ。セキュリティインシデントは技術チームだけの問題じゃない。経営層、法務、広報、すべてが連携して対応する必要がある。' },
              { speaker: '黒田リーダー', emoji: '🛡️', text: '事前に計画があるから、パニックにならずに動ける。準備の大切さが分かるだろう。' },
            ],
            lesson: 'インシデント対応計画（IRP）は「有事に備える仕組み」。事前に計画を策定し、訓練しておくことで、実際のインシデント時にパニックにならず組織的に動けます。',
          },
        },
      ],
    },
    {
      id: 'forensics',
      title: 'フォレンジック調査',
      timeLabel: '15:00',
      narration: 'インシデントの封じ込めが完了し、何が起きたのかを詳しく調べる「フォレンジック調査」を行います。',
      dialogues: [
        { speaker: '黒田リーダー', emoji: '🛡️', text: 'では、何が起きたのか正確に把握しよう。証拠を保全しつつ、攻撃の全貌を明らかにする必要がある。' },
        { speaker: '山田さん', emoji: '👩‍💻', text: 'ログを見ると、攻撃者は検索フォームを経由してSQLインジェクションを試みていたようです。' },
      ],
      situation: 'フォレンジック調査をどう進めますか？',
      choices: [
        {
          id: 'log-analysis',
          text: 'アクセスログ・DBログ・WAFログを時系列で突合し、攻撃経路を特定する',
          emoji: '📜',
          effects: { security: 2, analysis: 3, response: 2, communication: 0 },
          feedback: {
            narration: '複数のログを突合することで、攻撃の全体像が明らかになりました。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: 'ログの突合分析は基本中の基本だ。攻撃者の行動を時系列で追うことで、何を狙って、どこまで到達したかが分かる。' },
              { speaker: '黒田リーダー', emoji: '🛡️', text: '今回は検索フォームから入って、商品データベースにはアクセスされたが、顧客DBまでは到達していなかった。不幸中の幸いだ。' },
            ],
            lesson: 'フォレンジック調査では「証拠の保全」と「時系列での分析」が鍵。複数のログを突き合わせることで、攻撃の全貌が見えてきます。',
          },
        },
        {
          id: 'preserve-evidence',
          text: 'まず証拠を確実に保全し、改ざんされないようハッシュ値を記録する',
          emoji: '🔐',
          effects: { security: 3, analysis: 2, response: 1, communication: 1 },
          feedback: {
            narration: '証拠を適切に保全したことで、後の法的対応にも備えられました。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: '証拠保全は最初にやるべきことだ。ログが上書きされたり改ざんされたりする前に、ハッシュ値付きでコピーを取る。法的対応が必要になった時に、この証拠が重要になる。' },
            ],
            lesson: 'デジタル証拠は簡単に消えたり改ざんされたりします。インシデント発生直後に証拠を保全し、ハッシュ値で完全性を保証することが、フォレンジックの第一歩です。',
          },
        },
        {
          id: 'report-writing',
          text: '経営層向けのインシデントレポートを作成し、被害状況と対策を報告する',
          emoji: '📄',
          effects: { security: 1, analysis: 1, response: 2, communication: 3 },
          feedback: {
            narration: '経営層に分かりやすい報告書を作成し、迅速な意思決定につながりました。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: 'いいレポートだ。経営層は技術的な詳細よりも「何が起きて、影響はどれくらいで、今後どうするか」を知りたい。技術をビジネスの言葉に翻訳する力は非常に重要だよ。' },
            ],
            lesson: 'セキュリティインシデントの報告は「技術者向け」と「経営層向け」で内容を変える必要があります。経営層には「ビジネスへの影響」と「対策」を簡潔に伝えましょう。',
          },
        },
      ],
    },
    {
      id: 'security-training',
      title: '社内セキュリティ教育',
      timeLabel: '翌日 14:00',
      narration: 'インシデントを受けて、全社向けのセキュリティ教育を実施することになりました。',
      dialogues: [
        { speaker: '黒田リーダー', emoji: '🛡️', text: '今回のインシデントを機に、全社員向けのセキュリティ研修をやろう。社員のセキュリティ意識を高めることが、最大の防御になる。' },
        { speaker: '黒田リーダー', emoji: '🛡️', text: 'どんな内容で研修を組む？' },
      ],
      situation: '全社向けセキュリティ研修の内容を考えます。',
      choices: [
        {
          id: 'phishing-simulation',
          text: '実際のフィッシングメールを模した訓練を実施して、体験的に学んでもらう',
          emoji: '🎣',
          effects: { security: 3, analysis: 1, response: 2, communication: 2 },
          feedback: {
            narration: '擬似フィッシング訓練で、多くの社員がリアルな脅威を実感しました。',
            dialogues: [
              { speaker: '営業部 佐々木さん', emoji: '👔', text: '恥ずかしながら、訓練メールのリンクをクリックしてしまいました…本物だったらと思うとゾッとします。' },
              { speaker: '黒田リーダー', emoji: '🛡️', text: 'それが狙いだ。座学で「クリックするな」と言うより、実際に体験してもらう方が何倍も効果がある。失敗を安全な環境で経験できるのが訓練の価値だ。' },
            ],
            lesson: 'セキュリティ教育は「座学」より「体験」が効果的。擬似フィッシング訓練は多くの企業が実施しており、社員のセキュリティ意識を大幅に向上させる効果があります。',
          },
        },
        {
          id: 'case-study',
          text: '今回のインシデントを事例として、具体的な攻撃手法と対策を解説する',
          emoji: '📖',
          effects: { security: 2, analysis: 2, response: 1, communication: 3 },
          feedback: {
            narration: '身近な事例を使ったことで、社員の理解が深まりました。',
            dialogues: [
              { speaker: '開発部 中村さん', emoji: '👩‍💻', text: 'うちで実際に起きた話だから、すごくリアルに感じました。開発時にもっと注意します。' },
              { speaker: '黒田リーダー', emoji: '🛡️', text: '自社の事例は最も効果的な教材だ。「自分ごと」として捉えてもらえるからね。' },
            ],
            lesson: '自社で起きたインシデントは最も効果的な教育素材です。「他社の話」ではなく「自分たちの話」として伝えることで、社員の当事者意識が大幅に高まります。',
          },
        },
        {
          id: 'security-rules',
          text: 'パスワード管理や情報取り扱いなど、日常の基本ルールを徹底的に教育する',
          emoji: '📋',
          effects: { security: 2, analysis: 0, response: 1, communication: 3 },
          feedback: {
            narration: '基本ルールの徹底で、セキュリティの土台が固まりました。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: '基本を侮ってはいけない。セキュリティインシデントの大半は、基本ルールが守られていないことが原因だ。パスワードの使い回し一つで、大きな被害につながることもある。' },
            ],
            lesson: 'セキュリティの基本は「パスワード管理」「ソフトウェア更新」「不審なメールに注意」など地味なものばかり。しかし、インシデントの多くはこの基本が守られていないことが原因です。',
          },
        },
      ],
    },
    {
      id: 'policy',
      title: 'セキュリティポリシー策定',
      timeLabel: '翌週',
      narration: 'インシデントの教訓を活かして、会社全体のセキュリティポリシーを見直します。',
      dialogues: [
        { speaker: '黒田リーダー', emoji: '🛡️', text: '今回の件を受けて、セキュリティポリシーを更新しよう。再発防止と、今後の脅威にも備える必要がある。' },
        { speaker: '情報システム部長', emoji: '👔', text: 'ただ、厳しすぎるポリシーは業務効率を落とすからバランスも考えてほしい。' },
      ],
      situation: 'セキュリティ強化と業務効率のバランスをどう取りますか？',
      choices: [
        {
          id: 'risk-based-policy',
          text: 'リスクの大きさに応じて、対策のレベルを段階的に設定する',
          emoji: '⚖️',
          effects: { security: 3, analysis: 2, response: 1, communication: 2 },
          feedback: {
            narration: 'リスクベースのポリシーで、重要な部分は厳しく、それ以外は柔軟に対応できる仕組みを作りました。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: '全部を最高レベルで守ろうとすると、コストも業務負荷も膨大になる。リスクに応じて対策レベルを変えるのが、現実的で効果的なアプローチだ。' },
            ],
            lesson: 'リスクベースのセキュリティ対策は「限られたリソースで最大の効果」を得る方法。すべてを最高レベルで守るのではなく、重要度に応じてメリハリをつけるのが実務の基本です。',
          },
        },
        {
          id: 'zero-trust',
          text: 'ゼロトラストの考え方を導入し、すべてのアクセスを検証する仕組みを提案する',
          emoji: '🔐',
          effects: { security: 3, analysis: 2, response: 2, communication: 1 },
          feedback: {
            narration: 'ゼロトラストの概念を取り入れた先進的なポリシーを策定できました。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: '「何も信頼しない、すべてを検証する」。ゼロトラストは現代のセキュリティの主流になりつつある。段階的に導入していこう。' },
            ],
            lesson: 'ゼロトラストは「社内ネットワークだから安全」という従来の考えを捨て、すべてのアクセスを検証する新しい考え方。リモートワーク時代に不可欠なアプローチです。',
          },
        },
        {
          id: 'user-friendly',
          text: '現場の声を聞きながら、守りやすいルールを一緒に作る',
          emoji: '🤝',
          effects: { security: 1, analysis: 1, response: 2, communication: 3 },
          feedback: {
            narration: '現場の声を反映したポリシーで、社員の理解と協力を得られました。',
            dialogues: [
              { speaker: '情報システム部長', emoji: '👔', text: '現場の意見を聞いてくれたおかげで、実行可能なルールになったね。守れないルールを作っても意味がないからね。' },
              { speaker: '黒田リーダー', emoji: '🛡️', text: 'セキュリティポリシーは「守ってもらえてこそ」意味がある。現場の声を聞く姿勢は大切だ。ただ、譲れない部分は毅然と主張することも忘れずにね。' },
            ],
            lesson: 'セキュリティポリシーは「守られなければ意味がない」。現場の声を反映し、実行可能なルールを作ることが大切。ただし、安全に関わる部分は妥協しない覚悟も必要です。',
          },
        },
      ],
    },
    {
      id: 'retrospective',
      title: '振り返り',
      timeLabel: '月末',
      narration: '一連のインシデント対応が落ち着き、チームで振り返りを行います。',
      dialogues: [
        { speaker: '黒田リーダー', emoji: '🛡️', text: '大変な月だったけど、チームとしてよく対応できた。最後に、この経験から一番大切だと思ったことを聞かせてくれ。' },
      ],
      situation: 'セキュリティエンジニアとして一番大切だと感じたことは？',
      choices: [
        {
          id: 'continuous-learning',
          text: '攻撃者は常に進化する。学び続けることが最大の防御',
          emoji: '📚',
          effects: { security: 3, analysis: 1, response: 0, communication: 0 },
          feedback: {
            narration: '継続的な学習の大切さを実感しました。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: 'その通りだ。サイバーセキュリティの世界では、昨日の常識が今日通用しないことがある。常に最新の脅威と対策を学び続ける姿勢がプロには不可欠だ。' },
            ],
            lesson: 'セキュリティの世界は変化が速く、常に新しい攻撃手法が生まれます。学び続ける姿勢こそが、セキュリティエンジニアの最大の武器です。',
          },
        },
        {
          id: 'prevention',
          text: '事後対応より事前防止。準備と予防が最も重要',
          emoji: '🛡️',
          effects: { security: 2, analysis: 2, response: 1, communication: 0 },
          feedback: {
            narration: '予防の重要性を深く理解しました。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: 'インシデント1件の対応コストは、予防策の何十倍にもなる。脆弱性診断、教育、ポリシー整備。地味だけど、この予防活動が最もコスパの高いセキュリティ対策だ。' },
            ],
            lesson: '「1オンスの予防は1ポンドの治療に勝る」。セキュリティ投資は「何も起きないこと」に対する投資。地味ですが、事前の準備が最も効果的な対策です。',
          },
        },
        {
          id: 'people-matter',
          text: 'セキュリティは技術だけでなく、人の意識と組織の文化が鍵',
          emoji: '👥',
          effects: { security: 1, analysis: 0, response: 1, communication: 3 },
          feedback: {
            narration: '人と組織の大切さに気づきました。',
            dialogues: [
              { speaker: '黒田リーダー', emoji: '🛡️', text: 'いいところに気づいたね。世界最強のファイアウォールがあっても、社員がフィッシングメールに引っかかったら意味がない。技術×人×組織、この三位一体がセキュリティの本質だ。' },
            ],
            lesson: 'セキュリティは「技術的対策」だけでは不十分。人のセキュリティ意識と、組織としてのセキュリティ文化があって初めて、真の防御力が発揮されます。',
          },
        },
      ],
    },
  ],
  ending: (scores) => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const topMetric = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const topLabels: Record<string, string> = {
      security: 'セキュリティの守護者',
      analysis: '分析のスペシャリスト',
      response: 'インシデント対応のエース',
      communication: 'セキュリティの伝道師',
    };
    if (total >= 28) {
      return {
        title: topLabels[topMetric] ?? 'バランス型セキュリティエンジニア',
        emoji: '🌟',
        summary: '素晴らしいセキュリティ体験でした！ 監視から脆弱性診断、インシデント対応、教育まで、幅広いスキルを発揮しました。',
        learnings: [
          'セキュリティエンジニアは「監視」「診断」「インシデント対応」「教育」「ポリシー策定」と多岐にわたる仕事を担う',
          'インシデント対応は「検知→封じ込め→根絶→復旧→教訓」の5ステップ',
          'セキュリティは技術だけでなく、人の意識と組織の文化が重要',
          '攻撃は常に進化するため、学び続ける姿勢が不可欠',
        ],
        realWorldNote: '実際のセキュリティエンジニアは、サイバーセキュリティの最前線で活躍しています。NRI、ラック、トレンドマイクロなどのセキュリティ企業のほか、あらゆる企業でニーズが高まっています。',
      };
    }
    return {
      title: '成長中のセキュリティエンジニア',
      emoji: '🌱',
      summary: 'セキュリティの奥深さと重要性を実感できた体験でした。「守る」仕事のやりがいを感じられたのではないでしょうか。',
      learnings: [
        'セキュリティは「何も起きないことが成功」という縁の下の力持ち的な仕事',
        '技術力だけでなく、コミュニケーション力も非常に重要',
        '攻撃を知ることで、より良い防御ができる',
        '一人で抱え込まず、組織として対応することが大切',
      ],
      realWorldNote: 'セキュリティエンジニアは世界的に人材不足が続いています。需要が高く、専門性の高いキャリアを築ける分野です。',
    };
  },
};
