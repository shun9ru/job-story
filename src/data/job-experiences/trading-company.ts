import type { JobExperience } from './types';

export const tradingCompanyExperience: JobExperience = {
  jobId: 'trading-company',
  title: '商社マン体験',
  subtitle: '世界を舞台にビジネスを動かす一日',
  intro: {
    narration: 'あなたは総合商社の食料部門に所属する若手社員です。世界中から食料資源を調達し、国内メーカーや小売企業に供給しています。「ラーメンからロケットまで」と言われる商社の仕事を体験しましょう。',
    character: { name: '山本部長', emoji: '🌍', role: '海外駐在経験3カ国、商社歴20年のベテラン。グローバルなネットワークと冷静なリスク判断力に定評がある。' },
    briefing: '今日はブラジルからのコーヒー豆の輸入交渉、新規ビジネスの検討会議、そして物流トラブルの対応があります。商社の仕事は「トレーディング（取引仲介）」と「事業投資」の二本柱。常にリスクとリターンを天秤にかけながら判断する力が求められます。',
  },
  metrics: [
    { key: 'negotiation', label: '交渉力', emoji: '🤝', color: 'text-blue-500' },
    { key: 'intelligence', label: '情報収集力', emoji: '📡', color: 'text-green-500' },
    { key: 'global', label: 'グローバル力', emoji: '🌐', color: 'text-purple-500' },
    { key: 'riskManagement', label: 'リスク管理', emoji: '🛡️', color: 'text-amber-500' },
  ],
  scenes: [
    {
      id: 'morning-market',
      title: '朝の市況チェック',
      timeLabel: '午前7:00',
      narration: '早朝から世界の市場動向をチェックします。為替レート、コモディティ（商品先物）価格、地政学リスクなど、商社マンの朝は情報収集から始まります。',
      dialogues: [
        { speaker: '山本部長', emoji: '🌍', text: '今朝のニュースを見たか？ブラジルで大規模な霜害が発生した。コーヒー豆の先物価格が急騰している。' },
        { speaker: 'あなた', emoji: '😊', text: '確かに、アラビカ種の先物が昨日比15%上がっています。取引先への影響を確認しないと...。' },
      ],
      situation: 'ブラジルの霜害でコーヒー豆の価格が急騰しています。来月の納品分の調達コストに影響が出そうです。どう対応しますか？',
      choices: [
        {
          id: 'multi-source',
          text: 'ブラジル以外の産地（コロンビア、ベトナム等）からの代替調達を緊急で検討する',
          emoji: '🌍',
          effects: { negotiation: 2, intelligence: 3, global: 3, riskManagement: 3 },
          feedback: {
            narration: '複数の調達ルートを確保するリスク分散は、商社の基本戦略です。',
            dialogues: [{ speaker: '山本部長', emoji: '🌍', text: '素晴らしい判断だ。一つの調達先に依存するのは危険。我々がコロンビアとベトナムにも取引ネットワークを持っている理由がまさにこれだ。すぐに現地オフィスに連絡しよう。' }],
            lesson: '商社の強みは「グローバルネットワーク」です。一つの産地が不作でも、世界中のネットワークを活用して代替調達できることが、商社の存在価値の根幹です。',
          },
        },
        {
          id: 'wait-price',
          text: '価格が落ち着くのを待ってから調達を進める',
          emoji: '⏳',
          effects: { negotiation: 0, intelligence: 1, global: 0, riskManagement: 0 },
          feedback: {
            narration: '価格の回復を待つ間に、さらに高騰するリスクがあります。また、納期に間に合わない可能性もあります。',
            dialogues: [{ speaker: '山本部長', emoji: '🌍', text: '相場の底を読むのは至難の業だ。待っている間に価格がさらに上がることもある。商社マンは「待つ」のではなく「動く」ことで価値を生むんだ。' }],
            lesson: 'コモディティ市場は不確実性が高く、価格の底を予測することは困難です。「様子見」はリスク管理ではなく、リスクの放置です。能動的な代替策の検討が重要です。',
          },
        },
        {
          id: 'hedge',
          text: '先物市場でヘッジポジションを取り、価格変動リスクを抑制する',
          emoji: '📈',
          effects: { negotiation: 1, intelligence: 2, global: 2, riskManagement: 3 },
          feedback: {
            narration: 'ヘッジは有効なリスク管理手法ですが、代替調達の検討も同時に必要です。',
            dialogues: [{ speaker: '山本部長', emoji: '🌍', text: 'ヘッジは正しい判断だ。ただし、先物だけでは現物の供給は確保できない。金融面のヘッジと現物の代替調達、両方を同時に動かすのが商社の仕事だよ。' }],
            lesson: '商社ではヘッジ（先物取引による価格変動リスクの回避）が日常的に行われています。ただし、ヘッジは価格リスクの管理であり、供給リスクは別途対応が必要です。',
          },
        },
      ],
    },
    {
      id: 'overseas-negotiation',
      title: '海外交渉',
      timeLabel: '午前10:00（日本時間）',
      narration: 'コロンビアの現地パートナーとのビデオ会議が始まります。時差があるため、先方は前日の夜です。緊急の追加発注について交渉します。',
      dialogues: [
        { speaker: 'カルロス（現地パートナー）', emoji: '🇨🇴', text: 'Buenos días! I heard about the frost in Brazil. I assume you need more Colombian beans? Well, everyone does right now...' },
        { speaker: '山本部長', emoji: '🌍', text: '英語力も大事だが、交渉で一番重要なのは「相手の立場を理解すること」だ。カルロスにとって何がメリットかを考えろ。' },
      ],
      situation: 'カルロスは需要急増で強気です。追加のコーヒー豆500トンを確保する必要があります。どのように交渉しますか？',
      choices: [
        {
          id: 'partnership-approach',
          text: '長期的なパートナーシップの強化を提案し、安定取引のメリットを訴求する',
          emoji: '🤝',
          effects: { negotiation: 3, intelligence: 2, global: 3, riskManagement: 2 },
          feedback: {
            narration: '長期的関係をベースにした交渉は、一時的な価格交渉よりも持続的な成果を生みます。',
            dialogues: [{ speaker: 'カルロス（現地パートナー）', emoji: '🇨🇴', text: 'Interesting. If you can guarantee a minimum annual purchase volume, I can prioritize your orders and offer a more stable price. Long-term partnerships matter to us too.' }],
            lesson: '商社の交渉は「Win-Win」を目指します。短期的な価格だけでなく、長期的な取引関係、物流支援、品質管理協力など、多面的な価値を提案することが真の交渉力です。',
          },
        },
        {
          id: 'price-push',
          text: '過去の取引実績を盾に、据え置き価格での供給を求める',
          emoji: '💰',
          effects: { negotiation: 1, intelligence: 0, global: 1, riskManagement: 1 },
          feedback: {
            narration: '需給が逼迫している状況で価格据え置きを求めるのは、非現実的な交渉です。',
            dialogues: [{ speaker: '山本部長', emoji: '🌍', text: '市場が動いている中で過去の価格にこだわるのは無理がある。相手にも立場があるんだ。商社マンはマーケットの現実を受け入れた上で、最善の条件を引き出す力が必要だ。' }],
            lesson: 'コモディティ取引では、市場価格（マーケットプライス）が基準です。市場環境を無視した一方的な価格要求は、パートナーシップを壊すリスクがあります。',
          },
        },
        {
          id: 'creative-deal',
          text: '物流面のサポートや品質検査協力など、価格以外の付加価値を含む包括的な提案をする',
          emoji: '📦',
          effects: { negotiation: 3, intelligence: 2, global: 2, riskManagement: 2 },
          feedback: {
            narration: '価格以外の付加価値を組み合わせた提案は、商社ならではの交渉術です。',
            dialogues: [{ speaker: 'カルロス（現地パートナー）', emoji: '🇨🇴', text: 'That is a creative proposal! If you can help with logistics to the port and quality certification, we can work on a competitive price package. Let me discuss with my team.' }],
            lesson: '商社の強みは「取引の仲介」だけでなく、物流、金融、保険、品質管理など多機能を組み合わせたソリューション提案力です。価格だけの交渉は差別化できません。',
          },
        },
      ],
    },
    {
      id: 'new-business',
      title: '新規ビジネス検討',
      timeLabel: '午後1:00',
      narration: '午後は新規事業の検討会議です。アフリカのカカオ農園への投資案件が持ち上がっています。',
      dialogues: [
        { speaker: '山本部長', emoji: '🌍', text: '商社の二本柱はトレーディングと事業投資だ。この案件はカカオの安定調達と現地の経済発展の両方に貢献できる可能性がある。' },
        { speaker: '投資企画チーム', emoji: '📊', text: 'ガーナのカカオ農園に10億円の出資で30%の持分取得。年間5,000トンの優先調達権が得られます。ただし、政治リスクと為替リスクがあります。' },
      ],
      situation: 'カカオ農園への投資案件について、あなたの意見を求められています。どのように分析・提案しますか？',
      choices: [
        {
          id: 'comprehensive-analysis',
          text: 'カントリーリスク、為替リスク、需要予測を多角的に分析し、リスク軽減策とセットで提案する',
          emoji: '📊',
          effects: { negotiation: 1, intelligence: 3, global: 2, riskManagement: 3 },
          feedback: {
            narration: '多角的なリスク分析は、投資判断の質を大幅に向上させます。',
            dialogues: [{ speaker: '山本部長', emoji: '🌍', text: '素晴らしい分析だ。リスクを列挙するだけでなく、それぞれの軽減策まで提案しているのがいい。為替ヘッジ、政治リスク保険、段階的投資...こういった対策をセットで提案できるのが商社の強みだ。' }],
            lesson: '商社の投資判断は「リスクを避ける」のではなく「リスクを管理しながら取る」ことが基本です。カントリーリスク分析、財務モデリング、感度分析が重要なスキルです。',
          },
        },
        {
          id: 'enthusiastic-push',
          text: 'カカオ需要の成長性とチョコレート市場の拡大を根拠に、積極的な投資を推奨する',
          emoji: '🚀',
          effects: { negotiation: 2, intelligence: 1, global: 2, riskManagement: 0 },
          feedback: {
            narration: 'ポジティブな面だけを強調する提案は、投資判断を誤らせるリスクがあります。',
            dialogues: [{ speaker: '山本部長', emoji: '🌍', text: '成長性の分析はいいが、リスク面の検討が甘い。商社では「バラ色のシナリオ」だけで投資を決めない。最悪のケースでどうなるかも必ず検討しろ。' }],
            lesson: '投資判断では「ベストケース」だけでなく「ワーストケース」の検討が不可欠です。楽観的すぎる見通しは、大きな損失につながるリスクがあります。',
          },
        },
        {
          id: 'cautious-wait',
          text: 'リスクが大きいため、投資を見送り、従来のトレーディングに注力することを提案する',
          emoji: '🛑',
          effects: { negotiation: 0, intelligence: 1, global: 0, riskManagement: 2 },
          feedback: {
            narration: 'リスク回避だけでは商社の成長戦略は描けません。リスクの定量化と管理が重要です。',
            dialogues: [{ speaker: '山本部長', emoji: '🌍', text: 'リスクがあるからやらない、では商社マンとして物足りない。リスクを取らなければリターンもない。大事なのは「取るべきリスク」と「取るべきでないリスク」を見極める力だ。' }],
            lesson: '商社の事業投資は「リスクを取ってリターンを得る」ビジネスです。リスクをゼロにすることは不可能であり、リスクを定量化・管理した上で判断することが求められます。',
          },
        },
      ],
    },
    {
      id: 'logistics-trouble',
      title: '物流トラブル',
      timeLabel: '午後3:00',
      narration: '突然、海外からの貨物に問題が発生しました。ブラジルからの大豆を積んだ船がスエズ運河の渋滞で遅延し、納期に間に合わない可能性が出てきました。',
      dialogues: [
        { speaker: '物流チーム', emoji: '🚢', text: '大変です！大豆30,000トンを積んだ船がスエズ運河で3日間の待機になっています。国内メーカーへの納期は来週末です。' },
        { speaker: '山本部長', emoji: '🌍', text: 'トラブル対応は商社マンの真価が問われる場面だ。まず状況を正確に把握し、代替策を考えろ。' },
      ],
      situation: '30,000トンの大豆の納期遅延が確実になりました。国内メーカーの生産ラインに影響が出る可能性があります。どう対応しますか？',
      choices: [
        {
          id: 'alternative-supply',
          text: '国内の在庫や他社からの緊急調達で一部をカバーしつつ、顧客に状況を正直に報告する',
          emoji: '🔄',
          effects: { negotiation: 2, intelligence: 2, global: 2, riskManagement: 3 },
          feedback: {
            narration: '代替策の実行と誠実な報告の組み合わせは、トラブル時の最善の対応です。',
            dialogues: [{ speaker: '山本部長', emoji: '🌍', text: '完璧だ。まず代替供給を確保して被害を最小化し、顧客には正直に状況を伝える。隠したり嘘をついたりすれば信頼を失う。商社の信用はすべての取引の基盤だ。' }],
            lesson: '商社のトラブル対応は「代替策の実行」と「ステークホルダーへの透明な情報共有」が基本です。問題を隠蔽すると、発覚時により大きな信用失墜を招きます。',
          },
        },
        {
          id: 'blame-external',
          text: 'スエズ運河の遅延は不可抗力であることを説明し、納期の延期を交渉する',
          emoji: '📋',
          effects: { negotiation: 1, intelligence: 1, global: 1, riskManagement: 1 },
          feedback: {
            narration: '不可抗力の主張は法的には可能ですが、顧客の問題は解決しません。',
            dialogues: [{ speaker: '山本部長', emoji: '🌍', text: '法的な免責は確認すべきだが、それだけでは顧客の生産ラインが止まる問題は解決しない。商社は問題解決のプロだ。代替策を一緒に提案しないと評価されないよ。' }],
            lesson: '不可抗力（フォースマジュール）条項は契約上の免責根拠になりますが、顧客との関係維持には代替ソリューションの提供が不可欠です。法的正当性と商業的対応は別問題です。',
          },
        },
        {
          id: 'air-freight',
          text: '緊急で航空便での一部輸送を手配し、コスト増を覚悟で納期を厳守する',
          emoji: '✈️',
          effects: { negotiation: 2, intelligence: 1, global: 2, riskManagement: 2 },
          feedback: {
            narration: '航空便は迅速ですが、大豆30,000トンの航空輸送はコスト面で現実的ではありません。',
            dialogues: [{ speaker: '山本部長', emoji: '🌍', text: '気持ちはわかるが、大豆30,000トンの航空輸送はコストが数十倍になる。全量は非現実的だ。一部の緊急分だけ航空便、残りは代替調達という組み合わせが現実的だろう。' }],
            lesson: '物流トラブルの解決では、コストと緊急度のバランスが重要です。航空便、代替港、在庫の活用など、複数の手段を組み合わせた現実的なソリューションを設計しましょう。',
          },
        },
      ],
    },
    {
      id: 'internal-presentation',
      title: '社内プレゼン',
      timeLabel: '午後4:30',
      narration: '経営会議で、担当案件の進捗と市場分析を報告する時間です。役員クラスへのプレゼンテーションは商社マンの重要なスキルです。',
      dialogues: [
        { speaker: '山本部長', emoji: '🌍', text: '経営会議のプレゼンは5分で要点を伝えることが求められる。データと洞察をコンパクトにまとめろ。' },
        { speaker: '常務取締役', emoji: '👔', text: '食料部門の今期の見通しと、来期に向けた戦略を聞かせてくれ。' },
      ],
      situation: '経営会議でのプレゼンテーション。限られた時間で何を伝えますか？',
      choices: [
        {
          id: 'strategic-insight',
          text: '市場データに独自の洞察を加え、リスクと機会の両面から来期戦略を提案する',
          emoji: '🎯',
          effects: { negotiation: 2, intelligence: 3, global: 2, riskManagement: 3 },
          feedback: {
            narration: 'データと洞察の組み合わせは、経営層が求める報告の理想形です。',
            dialogues: [{ speaker: '常務取締役', emoji: '👔', text: '気候変動リスクを踏まえた調達先の分散化と、アフリカ新興市場への投資。データに裏付けされた提案で説得力がある。来期計画に組み込もう。' }],
            lesson: '商社の経営層は「情報」ではなく「洞察（インサイト）」を求めています。生データの報告ではなく、そこから何が読み取れるか、どう行動すべきかを提案する力が差別化要因です。',
          },
        },
        {
          id: 'data-heavy',
          text: '詳細なデータと数値を網羅的に報告する',
          emoji: '📊',
          effects: { negotiation: 1, intelligence: 2, global: 1, riskManagement: 1 },
          feedback: {
            narration: 'データの網羅性は重要ですが、経営層には「So What（だから何？）」が必要です。',
            dialogues: [{ speaker: '山本部長', emoji: '🌍', text: 'データは正確だが、情報量が多すぎて要点が伝わっていない。経営層は5分で判断材料が欲しいんだ。結論ファーストで、根拠データは求められたら出す、というスタイルにしよう。' }],
            lesson: '経営層へのプレゼンは「結論→根拠→提案」の順が基本です。ピラミッドストラクチャーを意識し、情報を構造化して伝える力はビジネスパーソンの必須スキルです。',
          },
        },
        {
          id: 'positive-spin',
          text: '好調な取引の実績を中心にアピールし、部門の貢献度を強調する',
          emoji: '🏆',
          effects: { negotiation: 2, intelligence: 1, global: 1, riskManagement: 0 },
          feedback: {
            narration: '実績アピールは大事ですが、リスクや課題を隠す報告は信用を失います。',
            dialogues: [{ speaker: '常務取締役', emoji: '👔', text: '成果報告は結構だが、リスク要因はないのか？ブラジルの霜害影響は？課題を隠す報告は経営判断を誤らせる。次回からはリスクも含めて報告してくれ。' }],
            lesson: '経営報告では「Good News」も「Bad News」も正確に伝えることが重要です。リスク情報の隠蔽は経営判断を誤らせ、組織全体に悪影響を及ぼします。',
          },
        },
      ],
    },
    {
      id: 'entertainment',
      title: '接待・関係構築',
      timeLabel: '午後7:00',
      narration: '夜は取引先の食品メーカー幹部との会食です。商社マンにとって、ビジネスディナーは関係構築と情報収集の重要な機会です。',
      dialogues: [
        { speaker: '山本部長', emoji: '🌍', text: '接待は単なる食事じゃない。信頼関係を深め、ビジネスの種を見つける場だ。ただし、最近はコンプライアンスも厳しい。節度を持って臨もう。' },
        { speaker: '取引先・佐々木常務', emoji: '👔', text: '山本さん、最近の新興国市場はどうですか？うちも海外調達を増やしたいと考えていましてね。' },
      ],
      situation: '会食の席で取引先から今後のビジネス展開について相談を受けています。どのように対応しますか？',
      choices: [
        {
          id: 'value-sharing',
          text: '市場情報を共有しつつ、取引先のニーズを深くヒアリングし、協業の可能性を探る',
          emoji: '💬',
          effects: { negotiation: 3, intelligence: 2, global: 2, riskManagement: 2 },
          feedback: {
            narration: '相互に価値を提供し合う対話は、最も生産的なビジネスディナーです。',
            dialogues: [{ speaker: '取引先・佐々木常務', emoji: '👔', text: 'なるほど、東南アジアのカカオ市場にそんな可能性があるとは。御社のネットワークを活かして一緒にやれないかな。来週改めて打ち合わせしましょう。' }],
            lesson: '商社マンの会食は「ギブ&テイク」の情報交換の場です。一方的な営業ではなく、取引先にとっても価値のある情報を提供することで、新しいビジネス機会が生まれます。',
          },
        },
        {
          id: 'sales-push',
          text: '自社が強みを持つ商材を積極的に売り込む',
          emoji: '💪',
          effects: { negotiation: 1, intelligence: 0, global: 1, riskManagement: 1 },
          feedback: {
            narration: '会食の場での積極的な営業は、関係構築の機会を台無しにする可能性があります。',
            dialogues: [{ speaker: '山本部長', emoji: '🌍', text: '会食の場で露骨な営業は品がない。まずは相手の話を聞いて、信頼関係を深めることが先だ。商売の話は後から自然についてくるものだよ。' }],
            lesson: 'ビジネスディナーでの過度な営業活動は逆効果です。まず人間関係を構築し、相手のニーズを理解した上で、後日正式な場で提案するのがプロのスタイルです。',
          },
        },
        {
          id: 'social-focus',
          text: 'ビジネスの話は控えめにし、趣味や共通の話題で親睦を深めることに集中する',
          emoji: '🍷',
          effects: { negotiation: 2, intelligence: 1, global: 1, riskManagement: 1 },
          feedback: {
            narration: '親睦を深めることは大切ですが、ビジネスの話を適度に織り交ぜることも重要です。',
            dialogues: [{ speaker: '山本部長', emoji: '🌍', text: '仲良くなるのは大事だが、商社マンとしてはビジネスの話題も自然に織り交ぜたい。相手も忙しい時間を割いて来てくれているんだから、有意義な情報交換もしよう。' }],
            lesson: '会食は「仕事の延長」と「プライベートな交流」のバランスが重要です。ビジネス7：プライベート3くらいの比率で、自然な会話の中からビジネスチャンスを見出しましょう。',
          },
        },
      ],
    },
    {
      id: 'reflection',
      title: '振り返り',
      timeLabel: '午後10:00',
      narration: '帰宅後、今日一日を振り返ります。朝の市況チェックから夜の会食まで、商社マンの一日は長く密度が濃いものでした。',
      dialogues: [
        { speaker: '山本部長', emoji: '🌍', text: '（メッセージで）今日はお疲れさま。商社の仕事は「人」「情報」「ネットワーク」が命だ。これらを日々磨き続けることが成長の秘訣だよ。' },
        { speaker: 'あなた', emoji: '😊', text: '世界を相手にビジネスをする面白さと難しさを実感した一日でした。' },
      ],
      situation: '商社マンとして、最も重要な資質は何だと感じましたか？',
      choices: [
        {
          id: 'global-mindset',
          text: '世界中の情報を収集・分析し、リスクを管理しながら新しいビジネスを創造する力',
          emoji: '🌍',
          effects: { negotiation: 2, intelligence: 3, global: 3, riskManagement: 2 },
          feedback: {
            narration: 'グローバルな視野とリスク管理能力は、商社マンの根幹をなす資質です。',
            dialogues: [{ speaker: '山本部長', emoji: '🌍', text: 'その通りだ。商社は「情報のハブ」としての機能が核心にある。世界中の情報を集め、分析し、ビジネスチャンスに変える。これがAI時代にも商社が必要とされる理由だ。' }],
            lesson: '商社の存在価値は「情報の非対称性」を活かすことにあります。グローバルなネットワークから得られる情報を元に、リスクを管理しながらビジネスを創造する力が商社マンの本質です。',
          },
        },
        {
          id: 'relationship-power',
          text: '国籍や文化を超えた信頼関係を構築し、人と人をつなぐ力',
          emoji: '🤝',
          effects: { negotiation: 3, intelligence: 1, global: 3, riskManagement: 1 },
          feedback: {
            narration: '人間力と異文化理解は、商社マンの最大の差別化要因です。',
            dialogues: [{ speaker: '山本部長', emoji: '🌍', text: '結局、ビジネスは人と人との信頼で成り立つ。特に商社は「人」が商品だ。どんなに優れたシステムも、人間同士の信頼関係には敵わない。' }],
            lesson: '商社マンは「人」が最大の資産です。多様な文化・言語の中で信頼関係を構築するスキルは、AIに代替されにくい商社の核心的競争力です。',
          },
        },
        {
          id: 'entrepreneurship',
          text: 'リスクを恐れず、新しい市場やビジネスモデルに挑戦する起業家精神',
          emoji: '🚀',
          effects: { negotiation: 2, intelligence: 2, global: 2, riskManagement: 2 },
          feedback: {
            narration: '商社マンに求められる起業家精神は、まさに「ラーメンからロケットまで」の精神そのものです。',
            dialogues: [{ speaker: '山本部長', emoji: '🌍', text: '商社は常に新しいビジネスを求めている。今の収益源も10年後にはなくなるかもしれない。だからこそ、次の柱を見つける起業家精神が不可欠なんだ。' }],
            lesson: '総合商社は時代とともにビジネスモデルを進化させてきました。繊維→鉄鋼→エネルギー→デジタルと、常に新領域に挑戦する起業家精神が商社の DNA です。',
          },
        },
      ],
    },
  ],
  ending: (scores) => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const topMetric = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const topLabels: Record<string, string> = {
      negotiation: '交渉のプロフェッショナル',
      intelligence: '情報の目利き',
      global: 'グローバルビジネスリーダー',
      riskManagement: 'リスク管理のスペシャリスト',
    };
    if (total >= 28) {
      return {
        title: topLabels[topMetric] ?? '優秀な商社マン',
        emoji: '🌟',
        summary: 'あなたはグローバルな視野とリスク管理能力を兼ね備えた優れた商社マンです。交渉力と情報収集力で新しいビジネスを創造する力があります。',
        learnings: [
          '商社は「トレーディング」と「事業投資」の二本柱で成り立つ',
          'リスクを避けるのではなく管理しながら取ることが重要',
          'グローバルネットワークが商社の最大の競争優位',
          '人間関係と信頼がすべてのビジネスの基盤',
        ],
        realWorldNote: '総合商社（三菱商事、三井物産、伊藤忠商事等）への就職は高倍率ですが、専門商社（鉄鋼、食品、化学等）も含めると選択肢は広がります。語学力（TOEIC 800以上推奨）、海外経験、論理的思考力が求められます。',
      };
    }
    return {
      title: '成長中の商社マン',
      emoji: '🌱',
      summary: '商社ビジネスの基本を学びましたが、グローバルな視野とリスク管理のスキルにはまだ成長の余地があります。世界に目を向け、経験を積んでいきましょう。',
      learnings: [
        '商社は世界中の「モノ・サービス・情報」を結びつける仕事',
        'コモディティ市場の理解と為替リスク管理の基礎知識が必要',
        '交渉はWin-Winを目指すことが長期的な成功につながる',
        '経営層への報告は「結論ファースト」で簡潔に',
      ],
      realWorldNote: '商社を目指すなら、学生時代に留学やインターンで海外経験を積むことが有効です。また、財務・会計の基礎知識や業界研究も重要です。入社後は若手のうちから海外駐在の機会があるのも商社の魅力です。',
    };
  },
};
