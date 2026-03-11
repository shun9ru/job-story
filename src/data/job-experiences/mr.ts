import type { JobExperience } from './types';

export const mrExperience: JobExperience = {
  jobId: 'mr',
  title: 'MR体験',
  subtitle: '医薬情報担当者として医療に貢献する一日',
  intro: {
    narration: 'あなたは大手製薬会社のMR（医薬情報担当者）として、担当エリアの医療機関を訪問し、自社医薬品の適正使用情報を提供しています。今日も朝から忙しい一日が始まります。',
    character: { name: '高橋先輩', emoji: '👨‍💼', role: '入社5年目のベテランMR。科学的根拠に基づいた情報提供を信条としている。' },
    briefing: '今日は大学病院の循環器内科を中心に訪問予定です。新薬の情報提供に加え、副作用報告の対応もあります。MRはプロモーションではなく、エビデンスに基づく情報提供で医療に貢献する仕事です。しっかり準備して臨みましょう。',
  },
  metrics: [
    { key: 'medicalKnowledge', label: '医薬知識', emoji: '💊', color: 'text-blue-500' },
    { key: 'trust', label: '信頼構築', emoji: '🤝', color: 'text-green-500' },
    { key: 'presentation', label: 'プレゼン力', emoji: '📊', color: 'text-purple-500' },
    { key: 'ethics', label: '倫理観', emoji: '⚖️', color: 'text-amber-500' },
  ],
  scenes: [
    {
      id: 'morning-research',
      title: '朝の情報収集',
      timeLabel: '午前7:30',
      narration: '出社前、最新の医学論文や競合品の情報をチェックする時間です。今日訪問する医師の専門領域に関連する情報を整理しましょう。',
      dialogues: [
        { speaker: '高橋先輩', emoji: '👨‍💼', text: '朝の情報収集は基本中の基本だ。医師は常に最新のエビデンスを求めている。こちらも負けていられないよ。' },
        { speaker: 'あなた', emoji: '😊', text: '今日は循環器内科の田中教授を訪問予定です。どのように準備すればいいですか？' },
      ],
      situation: '田中教授は高血圧治療の権威で、最近ARB（アンジオテンシンII受容体拮抗薬）に関する国際学会で発表を行いました。あなたの担当製品は新しいARB製剤です。どのように準備しますか？',
      choices: [
        {
          id: 'deep-study',
          text: '田中教授の最新論文を読み込み、エビデンスデータを整理する',
          emoji: '📚',
          effects: { medicalKnowledge: 3, trust: 2, presentation: 1, ethics: 2 },
          feedback: {
            narration: '教授の研究テーマを深く理解した上での訪問準備は、MRとして最も重要な姿勢です。',
            dialogues: [{ speaker: '高橋先輩', emoji: '👨‍💼', text: '素晴らしい！医師の専門領域を理解した上で情報提供することで、本当に役立つ対話ができる。これがMRの本質だよ。' }],
            lesson: 'MRは医師と対等に議論できる医学知識が求められます。相手の研究領域を理解することが信頼構築の第一歩です。',
          },
        },
        {
          id: 'sales-focus',
          text: '自社製品の優位性を示すデータだけを重点的にまとめる',
          emoji: '📈',
          effects: { medicalKnowledge: 1, trust: 0, presentation: 2, ethics: 0 },
          feedback: {
            narration: '自社製品のデータだけでは、医師からバランスの取れた情報提供とは見なされません。',
            dialogues: [{ speaker: '高橋先輩', emoji: '👨‍💼', text: '自社製品のデータだけじゃ不十分だ。医師はフェアな情報を求めている。競合品のデータも含めて客観的に提示できないと信頼を失うよ。' }],
            lesson: 'MRは自社製品の営業員ではなく、医薬品情報の専門家です。偏った情報提供は医療倫理に反し、長期的な信頼を損ないます。',
          },
        },
        {
          id: 'quick-prep',
          text: '前回の訪問メモを確認し、基本的な製品パンフレットを準備する',
          emoji: '📋',
          effects: { medicalKnowledge: 1, trust: 1, presentation: 1, ethics: 1 },
          feedback: {
            narration: '最低限の準備はできますが、専門性の高い医師との対話には物足りないかもしれません。',
            dialogues: [{ speaker: '高橋先輩', emoji: '👨‍💼', text: '基本の準備はOKだけど、田中教授クラスの先生には最新のエビデンスを持っていかないと話が噛み合わない。もう一歩深く準備しよう。' }],
            lesson: '医師のレベルに合わせた情報提供が重要です。大学病院の教授には、最新の臨床データや論文情報を準備する必要があります。',
          },
        },
      ],
    },
    {
      id: 'hospital-visit',
      title: '病院訪問',
      timeLabel: '午前10:00',
      narration: '大学病院に到着しました。MRは医師の診療の合間に面会するため、待ち時間も長くなることがあります。今日は外来診療の合間を狙って訪問します。',
      dialogues: [
        { speaker: '受付スタッフ', emoji: '👩‍⚕️', text: '高橋さん、お疲れさまです。田中教授は今、外来中ですが、11時頃に少しお時間いただけるかもしれません。' },
        { speaker: '高橋先輩', emoji: '👨‍💼', text: '待ち時間も有効活用しよう。他の先生方への情報提供や、薬剤部への挨拶もできるよ。' },
      ],
      situation: '教授との面会まで約1時間あります。この待ち時間をどのように活用しますか？',
      choices: [
        {
          id: 'pharmacy-visit',
          text: '薬剤部を訪問し、自社製品の使用状況や副作用情報を確認する',
          emoji: '💊',
          effects: { medicalKnowledge: 2, trust: 3, presentation: 1, ethics: 2 },
          feedback: {
            narration: '薬剤師との情報交換は、安全性情報の収集と適正使用推進に不可欠です。',
            dialogues: [{ speaker: '薬剤部長', emoji: '👨‍🔬', text: '高橋さんの後輩ですか。うちの病院では先月から御社の薬の処方が増えていますが、一部で消化器症状の報告がありますよ。詳しくお伝えしますね。' }],
            lesson: '薬剤師はMRにとって重要なパートナーです。処方動向や副作用情報の収集は、安全性確保と医師への情報提供の質を高めます。',
          },
        },
        {
          id: 'wait-quietly',
          text: 'ロビーで待機し、プレゼン資料の最終確認をする',
          emoji: '📱',
          effects: { medicalKnowledge: 1, trust: 0, presentation: 2, ethics: 1 },
          feedback: {
            narration: '資料の確認は大切ですが、病院での貴重な時間を情報収集に使う機会を逃しています。',
            dialogues: [{ speaker: '高橋先輩', emoji: '👨‍💼', text: '資料の確認も大事だけど、病院にいる時間は多職種との関係構築のチャンスだ。薬剤師や看護師からの情報は現場のリアルな声だよ。' }],
            lesson: '病院訪問時は医師だけでなく、薬剤師、看護師など多職種との関係構築が重要です。チーム医療の時代、多角的な情報収集が求められます。',
          },
        },
        {
          id: 'other-doctors',
          text: '他の診療科の医師を訪問し、自社製品の紹介を行う',
          emoji: '🏥',
          effects: { medicalKnowledge: 1, trust: 1, presentation: 2, ethics: 1 },
          feedback: {
            narration: '新規開拓の意欲は良いですが、アポなしの飛び込み訪問は相手の負担になることもあります。',
            dialogues: [{ speaker: '高橋先輩', emoji: '👨‍💼', text: '新しい先生への訪問は事前にアポを取るのがマナーだ。突然の訪問は診療の妨げになる。まずは薬剤部経由で関係を作るのが正攻法だよ。' }],
            lesson: '医療機関への訪問はルールとマナーの遵守が最優先です。MRの訪問規制は年々厳しくなっており、ルールを守ることが長期的な信頼につながります。',
          },
        },
      ],
    },
    {
      id: 'doctor-meeting',
      title: '医師への情報提供',
      timeLabel: '午前11:00',
      narration: '田中教授との面会時間が来ました。限られた時間で、正確かつ有用な情報を提供する必要があります。',
      dialogues: [
        { speaker: '田中教授', emoji: '👨‍⚕️', text: '高橋くん、今日は何かな？忙しいから手短に頼むよ。' },
        { speaker: '高橋先輩', emoji: '👨‍💼', text: '（小声で）教授は忙しいから、ポイントを絞って話そう。新人の君にプレゼンさせるから、頑張って。' },
      ],
      situation: '田中教授に新しいARB製剤の臨床試験結果を説明する機会を得ました。教授は時間が限られています。どのようにプレゼンしますか？',
      choices: [
        {
          id: 'evidence-based',
          text: '臨床試験のプライマリーエンドポイント結果と安全性データを簡潔に説明する',
          emoji: '🔬',
          effects: { medicalKnowledge: 3, trust: 3, presentation: 2, ethics: 3 },
          feedback: {
            narration: 'エビデンスに基づいた簡潔な説明は、多忙な医師に最も評価されるプレゼンスタイルです。',
            dialogues: [{ speaker: '田中教授', emoji: '👨‍⚕️', text: 'なるほど、有効性と安全性のバランスがよく分かった。この副次評価項目のデータも興味深いね。詳しい資料を後で送ってくれるかな。' }],
            lesson: '医師への情報提供は「エビデンスファースト」が鉄則です。有効性だけでなく安全性データも必ず含め、バランスの取れた情報提供を行いましょう。',
          },
        },
        {
          id: 'competitive-comparison',
          text: '競合品との比較データを中心に、自社製品の優位性を強調する',
          emoji: '📊',
          effects: { medicalKnowledge: 1, trust: 0, presentation: 2, ethics: 0 },
          feedback: {
            narration: '競合品との比較だけに偏ると、バイアスのある情報提供と受け取られるリスクがあります。',
            dialogues: [{ speaker: '田中教授', emoji: '👨‍⚕️', text: 'その比較データ、試験デザインが違うのに単純比較していないか？MRにはもっと科学的な情報提供を期待しているんだがな。' }],
            lesson: '異なる臨床試験の結果を単純比較することは科学的に不適切です。医師はバイアスに敏感であり、フェアな情報提供が信頼の基盤となります。',
          },
        },
        {
          id: 'patient-story',
          text: '実際の処方事例を紹介しながら、使用感を伝える',
          emoji: '👥',
          effects: { medicalKnowledge: 1, trust: 1, presentation: 2, ethics: 1 },
          feedback: {
            narration: '個別の症例紹介は参考になりますが、エビデンスレベルとしては低く、大学教授には物足りない可能性があります。',
            dialogues: [{ speaker: '田中教授', emoji: '👨‍⚕️', text: '症例報告もいいけど、まずは大規模臨床試験のデータを見せてくれ。個別症例はN=1だからね。エビデンスレベルの高い情報が欲しい。' }],
            lesson: 'エビデンスにはレベルがあります（ランダム化比較試験＞症例報告）。相手の専門性に合わせて、適切なレベルのエビデンスを提示することが重要です。',
          },
        },
      ],
    },
    {
      id: 'adverse-event',
      title: '副作用報告対応',
      timeLabel: '午後1:30',
      narration: '昼食後、担当クリニックの医師から電話が入りました。自社製品を服用中の患者に副作用が疑われる症状が出たとのことです。',
      dialogues: [
        { speaker: '佐藤医師', emoji: '👩‍⚕️', text: '高橋さんの後輩さん？実は御社のARB製剤を飲んでいる患者さんに血管浮腫の症状が出たんです。まだ軽度ですが報告しておきます。' },
        { speaker: '高橋先輩', emoji: '👨‍💼', text: '副作用報告は最優先事項だ。これはMRの最も重要な業務の一つ。適切に対応しよう。' },
      ],
      situation: '副作用が疑われる症状の報告を受けました。血管浮腫はARB製剤の既知の副作用です。どのように対応しますか？',
      choices: [
        {
          id: 'immediate-report',
          text: '詳細を聴取し、直ちに社内の安全性管理部門に報告する',
          emoji: '🚨',
          effects: { medicalKnowledge: 2, trust: 3, presentation: 1, ethics: 3 },
          feedback: {
            narration: '副作用報告の迅速な処理は、薬機法で定められたMRの重要な義務です。',
            dialogues: [{ speaker: '高橋先輩', emoji: '👨‍💼', text: '完璧な対応だ。副作用報告は15日以内（重篤な場合は即日）に規制当局へ報告する義務がある。安全性情報の収集・伝達はMRの最重要業務だよ。' }],
            lesson: '副作用報告は薬機法に基づく法的義務です。発生頻度や重篤度に関わらず、すべての副作用情報を迅速に報告することがMRの責務です。',
          },
        },
        {
          id: 'minimize',
          text: '既知の副作用なので、添付文書の情報を伝えて様子を見てもらう',
          emoji: '📄',
          effects: { medicalKnowledge: 1, trust: 0, presentation: 1, ethics: 0 },
          feedback: {
            narration: '既知の副作用であっても、個々の症例報告を怠ることは重大な問題です。',
            dialogues: [{ speaker: '高橋先輩', emoji: '👨‍💼', text: '既知の副作用だからといって報告しないのは絶対にダメだ！すべての副作用情報を収集・報告するのがMRの法的義務。これを怠ると最悪、業務停止処分になるよ。' }],
            lesson: '既知の副作用であっても、新たな症例は必ず報告が必要です。副作用の頻度や重篤度の評価に影響するため、一件一件の報告が医薬品の安全性向上に貢献します。',
          },
        },
        {
          id: 'investigate-first',
          text: '患者の詳細な情報（併用薬、既往歴等）を収集してから報告する',
          emoji: '🔍',
          effects: { medicalKnowledge: 2, trust: 2, presentation: 1, ethics: 2 },
          feedback: {
            narration: '詳細情報の収集は重要ですが、第一報は速やかに行い、詳細は追加報告とすべきです。',
            dialogues: [{ speaker: '高橋先輩', emoji: '👨‍💼', text: '情報収集の姿勢はいいけど、まずは第一報を入れよう。詳細情報は後から追加報告できる。迅速性と正確性の両立が大事だ。' }],
            lesson: '副作用報告は「速報→詳報」の二段階で行います。第一報は得られた情報で速やかに、その後追加情報を収集して詳細報告を行うのが正しい手順です。',
          },
        },
      ],
    },
    {
      id: 'study-session',
      title: '勉強会企画',
      timeLabel: '午後3:00',
      narration: '担当エリアの開業医向けに、高血圧治療の最新ガイドラインに関する勉強会を企画することになりました。',
      dialogues: [
        { speaker: '上司', emoji: '👔', text: '来月、地域の先生方向けに勉強会を開催したい。テーマと講師の選定を任せるよ。' },
        { speaker: '高橋先輩', emoji: '👨‍💼', text: '勉強会は地域の医療レベル向上に貢献する重要な活動だ。ただし、自社製品の宣伝にならないよう注意が必要だよ。' },
      ],
      situation: '勉強会のテーマと形式を決める必要があります。どのような勉強会を企画しますか？',
      choices: [
        {
          id: 'guideline-focus',
          text: 'ガイドラインに基づく治療戦略をテーマに、外部の専門医を講師に招く',
          emoji: '📖',
          effects: { medicalKnowledge: 3, trust: 3, presentation: 2, ethics: 3 },
          feedback: {
            narration: 'ガイドラインベースの教育的な内容で、外部講師を招くことで中立性も確保できます。',
            dialogues: [{ speaker: '上司', emoji: '👔', text: '素晴らしい企画だ。外部講師を招くことで客観性が担保される。先生方にとって実践的な内容になるし、地域医療への貢献にもなる。' }],
            lesson: '製薬会社主催の勉強会は、プロモーションと教育の境界が問われます。ガイドラインに準拠し、外部講師を招くことで、教育的価値と中立性を両立できます。',
          },
        },
        {
          id: 'product-centered',
          text: '自社新薬の使用経験を共有するテーマで、処方実績の多い医師に講演を依頼する',
          emoji: '💊',
          effects: { medicalKnowledge: 1, trust: 0, presentation: 2, ethics: 0 },
          feedback: {
            narration: '自社製品中心の内容は、プロモーション目的と見なされるリスクがあります。',
            dialogues: [{ speaker: '高橋先輩', emoji: '👨‍💼', text: '製品紹介に偏った勉強会は、医療用医薬品の販売情報提供活動ガイドラインに抵触する恐れがある。教育的価値のある内容にしないとダメだよ。' }],
            lesson: '製薬企業の情報提供活動は厳格なガイドラインで規制されています。プロモーション色が強い勉強会は、業界の信頼を損ない、規制強化につながります。',
          },
        },
        {
          id: 'case-discussion',
          text: '症例検討会形式で、参加医師が実際の治療経験を共有できる場を作る',
          emoji: '💬',
          effects: { medicalKnowledge: 2, trust: 2, presentation: 2, ethics: 2 },
          feedback: {
            narration: '参加型の症例検討会は、医師にとって実践的で有意義な学びの場になります。',
            dialogues: [{ speaker: '上司', emoji: '👔', text: '症例検討会はいいアイデアだ。先生方の参加意欲も高まるし、地域の医師同士のネットワーク構築にもなる。ファシリテーターの選定が鍵だね。' }],
            lesson: '症例検討会は参加型で学びの多い形式です。ただし、特定の製品に議論が偏らないよう、中立的なファシリテーターの選定と事前の議論設計が重要です。',
          },
        },
      ],
    },
    {
      id: 'competitor-question',
      title: '競合比較質問',
      timeLabel: '午後4:30',
      narration: '午後の訪問先で、医師から競合品との比較について直接質問されました。正確かつ公正な回答が求められます。',
      dialogues: [
        { speaker: '山田医師', emoji: '👨‍⚕️', text: '最近、他社のARBも使い始めたんだけど、御社の製品と比べてどうなの？正直に教えてほしい。' },
        { speaker: '高橋先輩', emoji: '👨‍💼', text: '（小声で）ここが腕の見せ所だ。誠実に答えることで長期的な信頼が生まれるよ。' },
      ],
      situation: '山田医師は御社の製品と競合品の両方を使用しています。競合品との比較について聞かれました。どう回答しますか？',
      choices: [
        {
          id: 'fair-comparison',
          text: '両製品の添付文書データと臨床試験結果を客観的に比較して説明する',
          emoji: '⚖️',
          effects: { medicalKnowledge: 3, trust: 3, presentation: 2, ethics: 3 },
          feedback: {
            narration: '公正な比較情報の提供は、MRの信頼性を最も高める行動です。',
            dialogues: [{ speaker: '山田医師', emoji: '👨‍⚕️', text: '公平に説明してくれてありがとう。こういう客観的な比較が一番参考になるよ。今後も相談させてもらうね。' }],
            lesson: '競合品との比較は、科学的根拠に基づき公正に行うことが原則です。自社製品の弱みも正直に伝えることで、医師からの長期的な信頼を獲得できます。',
          },
        },
        {
          id: 'highlight-strength',
          text: '自社製品の強みを中心に説明し、競合品の弱点を指摘する',
          emoji: '💪',
          effects: { medicalKnowledge: 1, trust: 0, presentation: 2, ethics: 0 },
          feedback: {
            narration: '競合品の弱点を強調する姿勢は、医師にバイアスを感じさせてしまいます。',
            dialogues: [{ speaker: '山田医師', emoji: '👨‍⚕️', text: 'うーん、自社製品のいいところばかり言うのは当然だよね。もうちょっと客観的な情報が欲しいんだけどな。' }],
            lesson: '競合品を貶める情報提供は「ネガティブキャンペーン」と呼ばれ、MRの信頼を大きく損なう行為です。公正競争規約にも違反する可能性があります。',
          },
        },
        {
          id: 'defer-to-literature',
          text: '直接比較試験がないことを正直に伝え、各製品の特徴を整理した資料を後日届けると約束する',
          emoji: '📚',
          effects: { medicalKnowledge: 2, trust: 2, presentation: 1, ethics: 3 },
          feedback: {
            narration: 'わからないことを正直に伝え、後日正確な情報を届ける姿勢は誠実です。',
            dialogues: [{ speaker: '山田医師', emoji: '👨‍⚕️', text: '正直でいいね。直接比較試験がないのに比較するのは確かに難しいよね。資料、楽しみにしているよ。' }],
            lesson: '直接比較試験のない製品同士を比較する場合、その限界を正直に伝えることが重要です。曖昧な比較は医療現場で誤った判断を招くリスクがあります。',
          },
        },
      ],
    },
    {
      id: 'reflection',
      title: '振り返り',
      timeLabel: '午後6:00',
      narration: '一日の訪問を終え、オフィスに戻って活動の振り返りを行います。明日以降の計画にどう活かすかが重要です。',
      dialogues: [
        { speaker: '高橋先輩', emoji: '👨‍💼', text: '今日一日お疲れさま。MRの仕事は、医師と製薬会社の架け橋として医療に貢献すること。日々の振り返りが成長につながるよ。' },
        { speaker: 'あなた', emoji: '😊', text: '今日は学ぶことがたくさんありました。特に副作用報告の重要性を実感しました。' },
      ],
      situation: '一日を振り返り、今後の活動方針を考えています。MRとしてどのような姿勢を最も大切にしますか？',
      choices: [
        {
          id: 'patient-first',
          text: '患者さんの安全を最優先に、科学的根拠に基づく情報提供を徹底する',
          emoji: '🏥',
          effects: { medicalKnowledge: 2, trust: 3, presentation: 1, ethics: 3 },
          feedback: {
            narration: '患者中心の姿勢こそ、MRの存在意義の根幹です。',
            dialogues: [{ speaker: '高橋先輩', emoji: '👨‍💼', text: 'その通りだ。MRは「Medical Representative（医薬情報担当者）」であって営業マンじゃない。患者さんの安全と医療の発展に貢献することが我々の使命だ。' }],
            lesson: 'MRの根本的な使命は、医薬品の適正使用を通じて患者の健康に貢献することです。売上目標も大切ですが、倫理観を失っては本末転倒です。',
          },
        },
        {
          id: 'sales-target',
          text: '売上目標の達成を第一に、効率的な訪問計画を立てる',
          emoji: '🎯',
          effects: { medicalKnowledge: 1, trust: 0, presentation: 2, ethics: 0 },
          feedback: {
            narration: '売上も重要な指標ですが、それだけを優先すると本質を見失います。',
            dialogues: [{ speaker: '高橋先輩', emoji: '👨‍💼', text: '売上は結果としてついてくるものだ。信頼関係と適切な情報提供の積み重ねが、長期的な処方につながる。短期的な売上だけを追うMRは長続きしないよ。' }],
            lesson: '売上目標の達成は重要ですが、信頼に基づく長期的な関係構築なしには持続しません。倫理的な情報提供活動が、結果として売上にも貢献します。',
          },
        },
        {
          id: 'continuous-learning',
          text: '医学知識の継続学習に力を入れ、医師に信頼される専門性を磨く',
          emoji: '📖',
          effects: { medicalKnowledge: 3, trust: 2, presentation: 1, ethics: 2 },
          feedback: {
            narration: '継続的な学習は、MRとしての専門性を高め、キャリアの基盤となります。',
            dialogues: [{ speaker: '高橋先輩', emoji: '👨‍💼', text: '学び続ける姿勢は素晴らしい。医学は日進月歩だから、常にアップデートが必要だ。MR認定試験の勉強も含めて、計画的に学んでいこう。' }],
            lesson: 'MRには継続的な学習が求められます。MR認定試験の更新制度もあり、最新の医学・薬学知識の習得は義務であり、武器でもあります。',
          },
        },
      ],
    },
  ],
  ending: (scores) => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const topMetric = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const topLabels: Record<string, string> = {
      medicalKnowledge: '医薬品のスペシャリスト',
      trust: '信頼のメディカルパートナー',
      presentation: 'プレゼンテーションの達人',
      ethics: '倫理観のあるMR',
    };
    if (total >= 28) {
      return {
        title: topLabels[topMetric] ?? '優秀なMR',
        emoji: '🌟',
        summary: 'あなたは科学的根拠に基づく情報提供と高い倫理観を持つMRです。医師からの信頼も厚く、医療の発展に大きく貢献しています。',
        learnings: [
          'MRは営業ではなく、医薬品情報の専門家である',
          '副作用報告は法的義務であり、最優先業務である',
          'エビデンスに基づく公正な情報提供が信頼の基盤',
          '患者の安全を最優先にする姿勢が重要',
        ],
        realWorldNote: 'MRになるにはMR認定試験の合格が必要です。医学・薬学の基礎知識に加え、MR活動の倫理やルールについても学ぶ必要があります。近年はデジタルMR（リモート面会）も増加しています。',
      };
    }
    return {
      title: '成長中のMR',
      emoji: '🌱',
      summary: 'MRとしてはまだ学ぶべきことが多いですが、経験を積むことで必ず成長できます。科学的根拠と倫理観を大切に、一歩ずつ前進しましょう。',
      learnings: [
        'MRは医師と患者の架け橋となる重要な職業',
        '自社製品だけでなく疾患全体の知識が必要',
        '倫理的な情報提供活動の重要性',
        '多職種との連携が医療現場では不可欠',
      ],
      realWorldNote: 'MRは製薬会社の正社員として採用されるのが一般的です。文系・理系問わず応募可能ですが、入社後にMR認定試験の合格が求められます。学生時代に薬学や生命科学を学んでおくと有利です。',
    };
  },
};
