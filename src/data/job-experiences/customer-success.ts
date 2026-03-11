import type { JobExperience } from './types';

export const customerSuccessExperience: JobExperience = {
  jobId: 'customer-success',
  title: 'カスタマーサクセス体験',
  subtitle: 'SaaS企業で顧客の成功を支援する一日',
  intro: {
    narration: 'あなたはSaaS企業のカスタマーサクセスマネージャー（CSM）として、法人顧客の成功を支援しています。チャーン（解約）防止とLTV（顧客生涯価値）の最大化がミッションです。',
    character: { name: '鈴木マネージャー', emoji: '👩‍💻', role: 'CS部門のリーダー。データドリブンな顧客支援を推進し、チーム全体のチャーンレートを業界最低水準に保っている。' },
    briefing: '今日は重要なオンボーディングセッションと、解約リスクの高い顧客への対応があります。カスタマーサクセスは「受け身のサポート」ではなく「能動的に顧客の成功を設計する」仕事です。データを活用して先回りの支援を行いましょう。',
  },
  metrics: [
    { key: 'customerInsight', label: '顧客理解', emoji: '🎯', color: 'text-blue-500' },
    { key: 'dataAnalysis', label: 'データ分析', emoji: '📊', color: 'text-green-500' },
    { key: 'proposal', label: '提案力', emoji: '💡', color: 'text-purple-500' },
    { key: 'teamwork', label: 'チームワーク', emoji: '🤝', color: 'text-amber-500' },
  ],
  scenes: [
    {
      id: 'data-analysis',
      title: '顧客データ分析',
      timeLabel: '午前9:00',
      narration: '朝一番にダッシュボードで担当顧客の利用状況を確認します。ヘルススコアの変動をチェックし、対応が必要な顧客を特定します。',
      dialogues: [
        { speaker: '鈴木マネージャー', emoji: '👩‍💻', text: '毎朝のヘルススコアチェックは習慣にしよう。数字の変動には必ず理由がある。早期に気づけば対応策も打てるからね。' },
        { speaker: 'あなた', emoji: '😊', text: 'A社のログイン数が先月から30%減少しています。これは気になりますね。' },
      ],
      situation: 'ヘルススコアが低下しているA社について、どのようにアプローチしますか？',
      choices: [
        {
          id: 'deep-analysis',
          text: 'A社の利用データを詳細に分析し、どの機能の利用が減っているか特定してから連絡する',
          emoji: '📊',
          effects: { customerInsight: 3, dataAnalysis: 3, proposal: 2, teamwork: 1 },
          feedback: {
            narration: 'データに基づいた分析は、顧客との対話をより実りあるものにします。',
            dialogues: [{ speaker: '鈴木マネージャー', emoji: '👩‍💻', text: '素晴らしい。データで裏付けを取ってからアプローチすると、具体的な提案ができる。「何かお困りですか？」より「レポート機能の利用が減っていますが」の方が顧客も話しやすいよ。' }],
            lesson: 'カスタマーサクセスはデータドリブンな仕事です。利用状況の変化を数値で把握し、仮説を立ててから顧客にアプローチすることで、的確な支援が可能になります。',
          },
        },
        {
          id: 'immediate-call',
          text: 'すぐにA社の担当者に電話して状況を確認する',
          emoji: '📞',
          effects: { customerInsight: 1, dataAnalysis: 0, proposal: 1, teamwork: 1 },
          feedback: {
            narration: '迅速な対応は良いですが、データ分析なしでは的確な質問ができません。',
            dialogues: [{ speaker: '鈴木マネージャー', emoji: '👩‍💻', text: 'スピード感はいいけど、何を聞くか準備してからの方がいい。顧客は忙しいから、漠然とした質問だと「特に問題ないです」で終わってしまうよ。' }],
            lesson: '顧客との対話前にデータ分析を行うことで、具体的な質問や提案ができます。準備なしの電話は顧客の時間を奪い、CSMとしての信頼も低下させます。',
          },
        },
        {
          id: 'wait-and-see',
          text: '一時的な変動かもしれないので、もう1週間様子を見る',
          emoji: '⏳',
          effects: { customerInsight: 0, dataAnalysis: 1, proposal: 0, teamwork: 0 },
          feedback: {
            narration: '様子見は危険です。チャーンの予兆を見逃す可能性があります。',
            dialogues: [{ speaker: '鈴木マネージャー', emoji: '👩‍💻', text: '待つのは一番危険だ。解約を決めた顧客に事後対応しても手遅れ。30%減は明確なアラートだよ。CSは「先回り」が命だ。' }],
            lesson: 'カスタマーサクセスの本質は「プロアクティブ（能動的）」な支援です。利用状況の低下を放置すると、気づいた時には解約が決定済みということも珍しくありません。',
          },
        },
      ],
    },
    {
      id: 'onboarding',
      title: 'オンボーディング',
      timeLabel: '午前10:30',
      narration: '新規導入企業B社のオンボーディングセッションです。最初の90日間が製品定着の鍵を握ります。',
      dialogues: [
        { speaker: 'B社・田中部長', emoji: '👔', text: '先日契約したばかりですが、現場からは「使い方がわからない」という声が多くて...。導入効果を早く出したいのですが。' },
        { speaker: '鈴木マネージャー', emoji: '👩‍💻', text: 'オンボーディングは「タイム・トゥ・バリュー」を最短にすることが目標だよ。顧客が最初の成功体験を得るまでのプロセスを設計しよう。' },
      ],
      situation: 'B社の現場担当者がツールの活用に苦戦しています。オンボーディングをどのように進めますか？',
      choices: [
        {
          id: 'success-plan',
          text: 'B社のゴールを明確にし、段階的なサクセスプラン（成功計画）を作成して共有する',
          emoji: '🗺️',
          effects: { customerInsight: 3, dataAnalysis: 2, proposal: 3, teamwork: 2 },
          feedback: {
            narration: 'サクセスプランの作成は、顧客とCSMの共通認識を作る最も効果的な方法です。',
            dialogues: [{ speaker: 'B社・田中部長', emoji: '👔', text: 'なるほど、まずは営業チームのレポート自動化から始めて、段階的に全部門に展開するんですね。ゴールが明確になって安心しました。' }],
            lesson: 'オンボーディングでは「サクセスプラン」の策定が重要です。顧客のビジネス目標をKPI化し、マイルストーンを設定することで、導入価値を可視化できます。',
          },
        },
        {
          id: 'full-training',
          text: '全機能の操作マニュアルを用意し、包括的なトレーニングを実施する',
          emoji: '📚',
          effects: { customerInsight: 1, dataAnalysis: 1, proposal: 1, teamwork: 1 },
          feedback: {
            narration: '全機能の説明は情報過多になり、かえって混乱を招くことがあります。',
            dialogues: [{ speaker: '鈴木マネージャー', emoji: '👩‍💻', text: '全機能トレーニングは逆効果になることが多い。顧客が今すぐ使う機能に絞って、小さな成功体験を積み重ねるのがベストだよ。' }],
            lesson: 'オンボーディングでは「Less is More」の原則が有効です。最も価値を感じやすい機能から始め、段階的に活用範囲を広げることで定着率が向上します。',
          },
        },
        {
          id: 'champion-strategy',
          text: 'B社内の推進役（チャンピオン）を特定し、その人を中心に社内展開を支援する',
          emoji: '🏆',
          effects: { customerInsight: 2, dataAnalysis: 1, proposal: 2, teamwork: 3 },
          feedback: {
            narration: '社内チャンピオンの育成は、ツール定着の強力な推進力になります。',
            dialogues: [{ speaker: 'B社・田中部長', emoji: '👔', text: '確かに、山田さんがITに詳しいからチャンピオンにいいかもしれない。社内で推進役がいると浸透しやすいですよね。' }],
            lesson: 'チャンピオン戦略はカスタマーサクセスの重要な手法です。顧客社内に製品の推進役を作ることで、CSMが直接関われない日常的な活用促進が可能になります。',
          },
        },
      ],
    },
    {
      id: 'usage-check',
      title: '利用状況確認',
      timeLabel: '午後1:00',
      narration: '既存顧客のC社から定例ミーティングの時間です。契約更新まであと3ヶ月。利用状況を確認し、更新に向けた準備を進めます。',
      dialogues: [
        { speaker: 'C社・松本課長', emoji: '👩‍💼', text: '最近、チームの半分くらいしかツールを使っていなくて。使っている人は便利だと言っているんですが...。' },
        { speaker: '鈴木マネージャー', emoji: '👩‍💻', text: 'アダプション（活用定着）率の向上は更新率に直結する。使われていない理由を特定するのが大事だよ。' },
      ],
      situation: 'C社ではツールの利用率が50%にとどまっています。更新に向けてどう対応しますか？',
      choices: [
        {
          id: 'adoption-analysis',
          text: '利用者と非利用者のデータを分析し、活用阻害要因を特定して改善提案を行う',
          emoji: '🔍',
          effects: { customerInsight: 3, dataAnalysis: 3, proposal: 2, teamwork: 1 },
          feedback: {
            narration: 'データに基づく阻害要因の特定は、具体的な改善策の立案につながります。',
            dialogues: [{ speaker: 'C社・松本課長', emoji: '👩‍💼', text: '分析ありがとうございます。なるほど、ベテラン社員が既存のExcel運用から移行できていないんですね。そこに絞ったトレーニングをお願いできますか？' }],
            lesson: 'アダプション率向上には、非利用者の「なぜ使わないか」を理解することが重要です。技術的問題、教育不足、業務フローとの不整合など、要因ごとに対策が異なります。',
          },
        },
        {
          id: 'feature-demo',
          text: '新機能のデモを行い、ツールの新たな価値を訴求する',
          emoji: '✨',
          effects: { customerInsight: 1, dataAnalysis: 1, proposal: 2, teamwork: 1 },
          feedback: {
            narration: '新機能の紹介は有効ですが、既存機能の活用が不十分な段階では優先度が低いかもしれません。',
            dialogues: [{ speaker: '鈴木マネージャー', emoji: '👩‍💻', text: '新機能のデモも大事だけど、まずは今使っている機能の活用度を上げることが先決。基本機能を使いこなしてこそ新機能の価値も伝わるよ。' }],
            lesson: '新機能の紹介は既存機能の活用が定着してから行うのが効果的です。活用の土台がないまま新機能を追加しても、混乱が増すだけです。',
          },
        },
        {
          id: 'roi-discussion',
          text: '利用している部門の成果データを可視化し、ROI（投資対効果）を示して経営層にも共有する',
          emoji: '💰',
          effects: { customerInsight: 2, dataAnalysis: 2, proposal: 3, teamwork: 2 },
          feedback: {
            narration: 'ROIの可視化は契約更新の重要な判断材料になります。',
            dialogues: [{ speaker: 'C社・松本課長', emoji: '👩‍💼', text: 'これは説得力がありますね！使っている部門で業務時間が20%削減されているなら、経営会議で報告できます。全社展開の後押しになりそうです。' }],
            lesson: 'ROIの定量化は契約更新やアップセルの鍵です。顧客のビジネスインパクトを数値で示すことで、ツールの存在価値を経営層にも理解してもらえます。',
          },
        },
      ],
    },
    {
      id: 'churn-risk',
      title: '解約リスク対応',
      timeLabel: '午後2:30',
      narration: 'ヘルススコアが急激に低下しているD社から、解約を検討しているという連絡が入りました。CSMとして最も緊迫する場面です。',
      dialogues: [
        { speaker: 'D社・鈴木部長', emoji: '😠', text: '正直、期待していた効果が出ていません。来月の更新は見送ろうかと考えています。' },
        { speaker: '鈴木マネージャー', emoji: '👩‍💻', text: 'チャーン対応は冷静さが大事。まず顧客の本音を聞き出すことから始めよう。' },
      ],
      situation: '解約を検討しているD社にどう対応しますか？',
      choices: [
        {
          id: 'listen-first',
          text: 'まず顧客の不満や期待値のギャップを丁寧にヒアリングし、根本原因を理解する',
          emoji: '👂',
          effects: { customerInsight: 3, dataAnalysis: 2, proposal: 2, teamwork: 2 },
          feedback: {
            narration: '顧客の声に真摯に耳を傾けることが、解約防止の第一歩です。',
            dialogues: [{ speaker: 'D社・鈴木部長', emoji: '😠', text: '...実は、最初に聞いていた機能がまだ実装されていなくて。それと、サポートの対応が遅いことも不満だったんです。話を聞いてもらえて少しスッキリしました。' }],
            lesson: '解約リスク対応では、まず「傾聴」が最重要です。すぐに解決策を提示するのではなく、顧客の不満の根本原因を理解することで、的確な対策が打てます。',
          },
        },
        {
          id: 'discount-offer',
          text: '解約を防ぐため、特別割引やプラン変更を提案する',
          emoji: '💸',
          effects: { customerInsight: 0, dataAnalysis: 0, proposal: 1, teamwork: 1 },
          feedback: {
            narration: '値引きは一時的な延命策に過ぎず、根本的な解決にはなりません。',
            dialogues: [{ speaker: '鈴木マネージャー', emoji: '👩‍💻', text: '値引きで引き止めるのは最後の手段だ。根本的な不満を解決しないまま値引きしても、次の更新でまた同じ問題が起きる。それに利益率も下がるしね。' }],
            lesson: '値引きによるチャーン防止は、顧客の本質的な課題を解決しません。価格以外の不満が原因なら、値引きしても翌期に解約されるだけです。',
          },
        },
        {
          id: 'escalate',
          text: '社内の開発チームやサポートチームと連携し、D社専用の改善プランを策定する',
          emoji: '🤝',
          effects: { customerInsight: 2, dataAnalysis: 1, proposal: 2, teamwork: 3 },
          feedback: {
            narration: '社内チームとの連携は重要ですが、まず顧客の声を正確に理解することが前提です。',
            dialogues: [{ speaker: '鈴木マネージャー', emoji: '👩‍💻', text: 'チーム連携はいい判断だ。ただ、開発チームに要望を伝えるにも、顧客の本音を正確に把握してからでないと、ズレた改善になってしまうよ。' }],
            lesson: 'カスタマーサクセスは社内の「顧客の声の代弁者」です。開発・サポート・営業との連携を通じて、組織全体で顧客の課題解決に取り組む体制が重要です。',
          },
        },
      ],
    },
    {
      id: 'upsell',
      title: 'アップセル提案',
      timeLabel: '午後3:30',
      narration: '順調に活用が進んでいるE社との定例ミーティングで、上位プランへのアップグレードを提案する機会が巡ってきました。',
      dialogues: [
        { speaker: 'E社・木村取締役', emoji: '👨‍💼', text: '最近、利用ユーザーが増えて現在のプランでは制限に引っかかることが出てきました。' },
        { speaker: '鈴木マネージャー', emoji: '👩‍💻', text: 'アップセルは「売り込み」じゃなく「顧客の成長に合わせた提案」だよ。タイミングが重要だ。' },
      ],
      situation: 'E社の利用が拡大し、上位プランが適切な段階に来ています。どのようにアップセルを提案しますか？',
      choices: [
        {
          id: 'value-based',
          text: 'E社の成長データを示し、上位プランで実現できるビジネス価値を具体的に提案する',
          emoji: '📈',
          effects: { customerInsight: 3, dataAnalysis: 2, proposal: 3, teamwork: 2 },
          feedback: {
            narration: '顧客のデータに基づいた価値提案は、最も成功率の高いアップセル手法です。',
            dialogues: [{ speaker: 'E社・木村取締役', emoji: '👨‍💼', text: 'なるほど、上位プランにすればAPI連携で基幹システムと自動同期できるんですね。月間40時間の手作業がなくなるなら、コスト増分は十分に回収できます。' }],
            lesson: 'アップセルは顧客のROIで正当化できることが前提です。「高いプランを売る」のではなく、「成長した顧客に最適なプランを提案する」というマインドセットが重要です。',
          },
        },
        {
          id: 'feature-push',
          text: '上位プランの新機能を紹介し、魅力的なポイントを中心にプレゼンする',
          emoji: '✨',
          effects: { customerInsight: 1, dataAnalysis: 1, proposal: 2, teamwork: 1 },
          feedback: {
            narration: '機能紹介だけでは、顧客にとっての具体的な価値が伝わりにくい場合があります。',
            dialogues: [{ speaker: '鈴木マネージャー', emoji: '👩‍💻', text: '機能紹介はいいけど、「だから何？」という顧客の疑問に答えられないとダメ。機能じゃなくて、顧客のビジネスにどんなインパクトがあるかを伝えよう。' }],
            lesson: 'SaaSのアップセルでは「Feature（機能）」ではなく「Outcome（成果）」を訴求することが重要です。顧客のKPIにどう貢献するかを示しましょう。',
          },
        },
        {
          id: 'trial-offer',
          text: '上位プランの無料トライアル期間を提供し、実際に価値を体感してもらう',
          emoji: '🆓',
          effects: { customerInsight: 2, dataAnalysis: 1, proposal: 2, teamwork: 2 },
          feedback: {
            narration: 'トライアルは効果的ですが、活用サポートがないと逆効果になることもあります。',
            dialogues: [{ speaker: '鈴木マネージャー', emoji: '👩‍💻', text: 'トライアルはいい手段だけど、放置すると「使いこなせなかった→必要ない」と判断される。トライアル期間中のサポート計画も一緒に立てよう。' }],
            lesson: 'トライアル提供は「体験してもらう」だけでなく、「成功体験を設計する」ことが重要です。トライアル中の活用サポートとゴール設定を必ずセットで行いましょう。',
          },
        },
      ],
    },
    {
      id: 'internal-feedback',
      title: '社内フィードバック',
      timeLabel: '午後4:30',
      narration: '週次の社内ミーティングで、顧客から得たフィードバックを開発チームに共有する時間です。顧客の声を製品改善に活かす重要な場です。',
      dialogues: [
        { speaker: '開発リーダー', emoji: '👨‍💻', text: '最近CSチームから機能要望がたくさん来ているけど、優先順位がわからなくて困っているんだ。' },
        { speaker: '鈴木マネージャー', emoji: '👩‍💻', text: '顧客の声をそのまま伝えるだけじゃダメ。ビジネスインパクトとともに優先順位をつけて伝えるのがCSの役割だよ。' },
      ],
      situation: '複数の顧客から異なる機能要望が寄せられています。開発チームにどのように伝えますか？',
      choices: [
        {
          id: 'prioritized-report',
          text: '要望をARR（年間経常収益）インパクトで分類し、優先順位をつけたレポートを作成する',
          emoji: '📋',
          effects: { customerInsight: 2, dataAnalysis: 3, proposal: 3, teamwork: 3 },
          feedback: {
            narration: 'ビジネスインパクトで優先順位をつけることで、開発チームの意思決定を支援できます。',
            dialogues: [{ speaker: '開発リーダー', emoji: '👨‍💻', text: 'これはわかりやすい！ARR影響額で並べてくれると、どこに注力すべきか一目瞭然だ。今後もこの形式でお願いしたい。' }],
            lesson: 'CSは顧客の声を「翻訳」して開発チームに伝える役割を担います。要望をビジネスインパクトで定量化することで、プロダクト開発の方向性に影響を与えられます。',
          },
        },
        {
          id: 'raw-feedback',
          text: '顧客の声をそのまま一覧にして共有する',
          emoji: '📝',
          effects: { customerInsight: 1, dataAnalysis: 1, proposal: 0, teamwork: 1 },
          feedback: {
            narration: '生の声の共有は大事ですが、開発チームが判断しやすい形に加工する必要があります。',
            dialogues: [{ speaker: '鈴木マネージャー', emoji: '👩‍💻', text: '顧客の生の声は参考になるけど、開発チームには優先順位とビジネスインパクトを示さないと動いてもらえない。CSは翻訳者の役割を果たそう。' }],
            lesson: '顧客フィードバックの共有は「量」より「質」です。開発リソースは有限であるため、ビジネスインパクトに基づいた優先順位づけがCSの重要なスキルです。',
          },
        },
        {
          id: 'joint-session',
          text: '開発チームと顧客の直接対話の場を設定し、要望の背景を直接聞いてもらう',
          emoji: '💬',
          effects: { customerInsight: 2, dataAnalysis: 1, proposal: 2, teamwork: 3 },
          feedback: {
            narration: '顧客と開発チームの直接対話は、深い理解を生みますが頻繁には難しい場合もあります。',
            dialogues: [{ speaker: '開発リーダー', emoji: '👨‍💻', text: '直接話を聞けると文脈がわかっていい。ただ、毎回は難しいから、重要な案件に絞ってお願いしたいな。' }],
            lesson: '顧客と開発チームの直接対話は、CS主導で「戦略的に」設定することが重要です。重要度の高い要望について、背景と課題を共有する場として活用しましょう。',
          },
        },
      ],
    },
    {
      id: 'reflection',
      title: '振り返り',
      timeLabel: '午後6:00',
      narration: '一日の業務を振り返り、顧客ポートフォリオ全体の健康状態を確認します。',
      dialogues: [
        { speaker: '鈴木マネージャー', emoji: '👩‍💻', text: '今日も盛りだくさんだったね。CSの仕事は「顧客の成功＝自社の成功」という考え方が土台。この視点を忘れないようにしよう。' },
        { speaker: 'あなた', emoji: '😊', text: 'データを見て先回りすることの大切さを実感しました。明日もヘルススコアのチェックから始めます。' },
      ],
      situation: 'カスタマーサクセスマネージャーとして、今後最も注力すべきことは何だと思いますか？',
      choices: [
        {
          id: 'proactive-cs',
          text: 'データに基づくプロアクティブな支援体制を構築し、チャーンの予兆を早期に察知する',
          emoji: '🔮',
          effects: { customerInsight: 2, dataAnalysis: 3, proposal: 2, teamwork: 2 },
          feedback: {
            narration: 'プロアクティブなCSは、リアクティブなサポートの数倍の効果があると言われています。',
            dialogues: [{ speaker: '鈴木マネージャー', emoji: '👩‍💻', text: 'その通り。予測分析でリスクを事前に察知できれば、チャーンレートは大幅に下がる。これがCSの最先端の考え方だよ。' }],
            lesson: '先進的なCS組織は、AI・データ分析を活用した予測型支援に移行しています。ヘルススコアの自動モニタリングと早期アラートの仕組みづくりが重要です。',
          },
        },
        {
          id: 'relationship-focus',
          text: '顧客との信頼関係を深め、ビジネスパートナーとしてのポジションを確立する',
          emoji: '🤝',
          effects: { customerInsight: 3, dataAnalysis: 1, proposal: 2, teamwork: 2 },
          feedback: {
            narration: '顧客との深い信頼関係は、すべてのCS活動の基盤となります。',
            dialogues: [{ speaker: '鈴木マネージャー', emoji: '👩‍💻', text: '人間関係は大事だよね。ただ、データなしの勘と経験だけのCSには限界がある。信頼関係とデータドリブン、両方をバランスよく磨こう。' }],
            lesson: 'カスタマーサクセスは「ハイタッチ」（手厚い対人支援）と「テックタッチ」（テクノロジー活用型支援）のバランスが重要です。顧客の規模に応じて使い分けましょう。',
          },
        },
        {
          id: 'expansion-focus',
          text: '既存顧客のエクスパンション（拡大）収益を増やし、NRR（売上維持率）を高める',
          emoji: '📈',
          effects: { customerInsight: 1, dataAnalysis: 2, proposal: 3, teamwork: 1 },
          feedback: {
            narration: 'NRRの向上はSaaS企業の成長に直結する重要な指標です。',
            dialogues: [{ speaker: '鈴木マネージャー', emoji: '👩‍💻', text: 'NRR100%超えは優良SaaS企業の証だ。ただし、アップセルは顧客の成功が前提。無理な売り込みは逆効果になるからね。' }],
            lesson: 'NRR（Net Revenue Retention）はSaaS企業の健全性を示す最重要指標の一つです。既存顧客の成功を支援した結果としてのエクスパンションが理想です。',
          },
        },
      ],
    },
  ],
  ending: (scores) => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const topMetric = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const topLabels: Record<string, string> = {
      customerInsight: '顧客理解の達人',
      dataAnalysis: 'データドリブンCSM',
      proposal: '戦略的アドバイザー',
      teamwork: 'チーム連携のハブ',
    };
    if (total >= 28) {
      return {
        title: topLabels[topMetric] ?? '優秀なCSM',
        emoji: '🌟',
        summary: 'あなたはデータと顧客理解を両立させた優れたカスタマーサクセスマネージャーです。顧客の成功を通じてビジネス成果を生み出す力があります。',
        learnings: [
          'カスタマーサクセスは「受け身のサポート」ではなく「能動的な成功支援」',
          'データドリブンなアプローチで先回りの支援が可能になる',
          'チャーン防止はヘルススコアの早期察知が鍵',
          'アップセルは顧客の成功の延長線上にある',
        ],
        realWorldNote: 'カスタマーサクセスはSaaS業界を中心に急成長している職種です。未経験からの転職も多く、営業・サポート・コンサルティング経験が活かせます。Gainsight等のCSツールの知識も有用です。',
      };
    }
    return {
      title: '成長中のCSM',
      emoji: '🌱',
      summary: 'カスタマーサクセスの基本を学びましたが、まだ成長の余地があります。データ活用と顧客理解のスキルを磨いていきましょう。',
      learnings: [
        'CSの本質は顧客のビジネス成果への貢献',
        'ヘルススコアの定期的なモニタリングが重要',
        '社内連携でプロダクト改善に貢献する役割がある',
        'SaaS特有の指標（チャーンレート、NRR、LTV）の理解が必須',
      ],
      realWorldNote: 'CSMの求人は年々増加しています。SaaSの基礎知識、データ分析スキル、コミュニケーション力が求められます。CS関連の資格としてSuccessHACKER等のプログラムがあります。',
    };
  },
};
