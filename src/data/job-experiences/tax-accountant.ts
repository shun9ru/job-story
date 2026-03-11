import type { JobExperience } from './types';

export const taxAccountantExperience: JobExperience = {
  jobId: 'tax-accountant',
  title: '税理士体験',
  subtitle: '税務のプロとして中小企業を支える一日',
  intro: {
    narration: 'あなたは税理士事務所の税理士として、中小企業や個人事業主の税務をサポートしています。確定申告の時期を迎え、事務所は繁忙期に突入しています。',
    character: { name: '森所長', emoji: '📚', role: '税理士歴25年のベテラン。「税理士は経営者の一番の相談相手」をモットーに、顧問先との信頼関係を大切にしている。' },
    briefing: '今日は確定申告の相談、税務調査への立会い、法人決算のチェック、そして節税提案と盛りだくさんです。税法は毎年改正されるため、常に最新の知識をアップデートする必要があります。正確性と誠実さが税理士の命です。',
  },
  metrics: [
    { key: 'taxKnowledge', label: '税務知識', emoji: '📜', color: 'text-blue-500' },
    { key: 'accuracy', label: '正確性', emoji: '🎯', color: 'text-green-500' },
    { key: 'communication', label: 'コミュニケーション', emoji: '💬', color: 'text-purple-500' },
    { key: 'problemSolving', label: '問題解決', emoji: '🔧', color: 'text-amber-500' },
  ],
  scenes: [
    {
      id: 'morning-email',
      title: '朝のメール確認',
      timeLabel: '午前9:00',
      narration: '朝一番にメールとスケジュールを確認します。確定申告期限が迫り、顧問先からの問い合わせが殺到しています。',
      dialogues: [
        { speaker: '森所長', emoji: '📚', text: '確定申告の時期は一年で最も忙しい。ミスが許されない仕事だから、忙しい時こそ丁寧に、一つずつ確実にこなしていこう。' },
        { speaker: 'あなた', emoji: '😊', text: '今日は3件の申告相談と、午後から税務調査の立会いが入っています。顧問先のAさんから経費の計上について質問メールも来ています。' },
      ],
      situation: '個人事業主のAさんから「自宅の一部を事務所として使っているが、家賃はどこまで経費にできるか」という質問が届いています。どう回答しますか？',
      choices: [
        {
          id: 'detailed-answer',
          text: '家事按分の考え方を丁寧に説明し、面積比・使用時間比での計算方法を具体的に案内する',
          emoji: '📊',
          effects: { taxKnowledge: 3, accuracy: 3, communication: 3, problemSolving: 2 },
          feedback: {
            narration: '家事按分の適切な説明は、税理士として最も基本的かつ重要なアドバイスです。',
            dialogues: [{ speaker: '森所長', emoji: '📚', text: '完璧な回答だ。家事按分は面積比と使用時間比が一般的だが、合理的な基準であれば認められる。根拠資料の保管についても忘れずにアドバイスしよう。' }],
            lesson: '家事按分（かじあんぶん）は個人事業主の節税の基本です。事業用と私用の使用割合を合理的に算定し、その根拠を記録として残すことが税務調査でも重要になります。',
          },
        },
        {
          id: 'simple-answer',
          text: '「家賃の30%程度が一般的です」と簡潔に回答する',
          emoji: '✉️',
          effects: { taxKnowledge: 1, accuracy: 0, communication: 1, problemSolving: 0 },
          feedback: {
            narration: '一般的な目安を伝えるだけでは、個別事情に対応できていません。',
            dialogues: [{ speaker: '森所長', emoji: '📚', text: '「一般的に30%」という回答は危険だ。家事按分の割合は実態に基づいて個別に判断する必要がある。根拠なく一律の割合を指導すると、税務調査で否認されるリスクがあるよ。' }],
            lesson: '税務アドバイスは個別事情に基づいて行うことが原則です。一般的な目安の提示は参考になりますが、実態に基づかない割合の指導は税理士の責任問題に発展する可能性があります。',
          },
        },
        {
          id: 'meeting-suggest',
          text: '複雑な問題なので、一度事務所に来てもらって詳しく相談することを提案する',
          emoji: '🗓️',
          effects: { taxKnowledge: 1, accuracy: 2, communication: 2, problemSolving: 1 },
          feedback: {
            narration: '対面相談の提案は丁寧ですが、家事按分の基本的な質問にはメールでも回答可能です。',
            dialogues: [{ speaker: '森所長', emoji: '📚', text: '面談も大事だけど、この質問はメールで基本的な考え方を先に回答し、詳細は面談で確認する方が効率的だ。顧問先の時間も大切にしよう。' }],
            lesson: '顧問先への対応は、質問の複雑さに応じて適切な方法を選びましょう。基本的な質問にはメールで迅速に回答し、複雑な案件は面談で丁寧に対応するのが効率的です。',
          },
        },
      ],
    },
    {
      id: 'tax-return',
      title: '確定申告相談',
      timeLabel: '午前10:30',
      narration: 'フリーランスのWebデザイナーBさんが確定申告の相談に来られました。初めての確定申告で不安そうです。',
      dialogues: [
        { speaker: 'Bさん（フリーランス）', emoji: '💻', text: '初めての確定申告で何から手をつけていいかわかりません。経費の領収書はこの袋にまとめてあるんですが...（大量の領収書を出す）' },
        { speaker: '森所長', emoji: '📚', text: '初めてのお客様にはまず全体像を説明してあげよう。不安を解消することが最優先だ。' },
      ],
      situation: 'Bさんの確定申告をどのように進めますか？',
      choices: [
        {
          id: 'step-by-step',
          text: '確定申告の全体の流れを図解で説明し、Bさんと一緒に経費を分類しながら進める',
          emoji: '📋',
          effects: { taxKnowledge: 2, accuracy: 2, communication: 3, problemSolving: 3 },
          feedback: {
            narration: '丁寧なステップバイステップのガイドは、初めての方に最も安心感を与えるアプローチです。',
            dialogues: [{ speaker: 'Bさん（フリーランス）', emoji: '💻', text: 'こうやって一緒に整理してもらえると本当にわかりやすいです！青色申告の方が有利なんですね。来年からは帳簿つけも頑張ります。' }],
            lesson: 'フリーランスの確定申告では「白色申告」より「青色申告」の方が節税効果が大きいです（最大65万円の特別控除）。ただし、複式簿記による帳簿作成が必要です。',
          },
        },
        {
          id: 'quick-process',
          text: '効率を優先し、領収書を預かって事務所で処理する',
          emoji: '⚡',
          effects: { taxKnowledge: 1, accuracy: 2, communication: 0, problemSolving: 1 },
          feedback: {
            narration: '効率的ですが、Bさん自身の税務理解が深まらず、自立的な管理ができるようになりません。',
            dialogues: [{ speaker: '森所長', emoji: '📚', text: '丸投げを受けるのは簡単だけど、それじゃBさんは来年もまた同じ状態だ。税理士の仕事は「魚を与える」んじゃなく「釣り方を教える」ことだ。' }],
            lesson: '税理士の役割は「代行」だけでなく「教育」も含みます。顧問先が自身で基本的な経理処理ができるよう指導することで、双方の効率が上がり、より高度な相談に時間を使えるようになります。',
          },
        },
        {
          id: 'software-guide',
          text: '会計ソフトの導入を提案し、日常的な記帳方法から教える',
          emoji: '💻',
          effects: { taxKnowledge: 2, accuracy: 2, communication: 2, problemSolving: 2 },
          feedback: {
            narration: '会計ソフトの活用は長期的に有効ですが、今の確定申告を先に対応する必要があります。',
            dialogues: [{ speaker: '森所長', emoji: '📚', text: '会計ソフトの提案はいいね。ただ、今すぐ必要なのは目の前の確定申告を片付けること。まず申告を完了させてから、来年に向けてソフト導入を進めよう。' }],
            lesson: 'クラウド会計ソフト（freee、マネーフォワード等）は個人事業主の強い味方です。ただし、導入のタイミングは大切。目の前の課題を解決してから、次のステップとして提案するのが効果的です。',
          },
        },
      ],
    },
    {
      id: 'tax-audit',
      title: '税務調査対応',
      timeLabel: '午後1:00',
      narration: '午後から顧問先の飲食店C社に対する税務調査に立ち会います。税務調査は税理士の専門性が最も発揮される場面の一つです。',
      dialogues: [
        { speaker: 'C社・社長', emoji: '🍽️', text: '税務調査と聞いて朝から緊張しています...。何か問題があるんでしょうか？' },
        { speaker: '森所長', emoji: '📚', text: '税務調査は定期的に行われるものだ。やましいことがなければ堂々と対応すればいい。ただし、調査官の質問には正確に答えることが大切だ。' },
      ],
      situation: '税務調査官が来て、売上の計上漏れがないかを重点的にチェックしています。調査官がレジの記録と申告書の売上に差異を発見しました。どう対応しますか？',
      choices: [
        {
          id: 'honest-explanation',
          text: '差異の原因を冷静に調査し、正確な事実関係を税務調査官に説明する',
          emoji: '🔍',
          effects: { taxKnowledge: 3, accuracy: 3, communication: 2, problemSolving: 3 },
          feedback: {
            narration: '正確な事実確認と誠実な対応は、税務調査において最も重要な姿勢です。',
            dialogues: [{ speaker: '税務調査官', emoji: '👨‍💼', text: 'なるほど、キャンセル分の処理方法の違いですね。帳簿を確認しましたが、実態としては問題ないようです。記帳方法は今後統一してください。' }],
            lesson: '税務調査での対応は「正確・誠実・冷静」が三原則です。差異がある場合は隠さず原因を調査し、根拠資料とともに説明することで、調査官の信頼を得られます。',
          },
        },
        {
          id: 'defensive',
          text: '「うちは適切に処理しています」と主張し、差異はレジの誤作動だと説明する',
          emoji: '🛡️',
          effects: { taxKnowledge: 0, accuracy: 0, communication: 0, problemSolving: 0 },
          feedback: {
            narration: '根拠のない弁解は調査官の不信感を招き、調査が長期化するリスクがあります。',
            dialogues: [{ speaker: '森所長', emoji: '📚', text: '根拠のない弁明は絶対にダメだ！税務調査官はプロだから嘘はすぐ見抜く。不信感を持たれると、さらに深掘りされて調査期間も延びる。正直に対応しよう。' }],
            lesson: '税務調査での虚偽説明は「重加算税」（最大40%）の対象になり得ます。正直に事実を述べ、不明点は「確認して後日回答します」と伝えるのが正しい対応です。',
          },
        },
        {
          id: 'detailed-records',
          text: '日次の売上記録、レジジャーナル、入金記録をすべて照合し、差異の全容を把握する',
          emoji: '📑',
          effects: { taxKnowledge: 2, accuracy: 3, communication: 1, problemSolving: 2 },
          feedback: {
            narration: '詳細な資料照合は正確性を担保しますが、調査官への説明も同時に必要です。',
            dialogues: [{ speaker: '森所長', emoji: '📚', text: '資料の照合は素晴らしい。ただ、調査官を待たせすぎると心証が悪くなる。まず概要を説明し、「詳細は資料を照合してお伝えします」と段階的に対応しよう。' }],
            lesson: '税務調査では、調査官に「協力的な姿勢」を見せることが重要です。完璧な回答を用意してから答えるよりも、まず概要を説明し、詳細を追って報告する方がスムーズに進みます。',
          },
        },
      ],
    },
    {
      id: 'tax-saving',
      title: '節税提案',
      timeLabel: '午後3:00',
      narration: '顧問先の製造業D社の社長から「利益が出過ぎているので節税したい」と相談を受けました。適法な節税と脱税の境界を見極める判断力が問われます。',
      dialogues: [
        { speaker: 'D社・社長', emoji: '🏭', text: '今期は予想以上に利益が出ています。税金を少しでも減らしたいんですが、何かいい方法はありませんか？' },
        { speaker: '森所長', emoji: '📚', text: '節税提案は税理士の腕の見せ所だ。ただし、「節税」と「脱税」の境界は明確にしないといけない。合法的な範囲で最大限の提案をしよう。' },
      ],
      situation: 'D社の社長に節税策を提案します。どのようなアプローチを取りますか？',
      choices: [
        {
          id: 'comprehensive-plan',
          text: '中小企業向けの税制優遇措置を網羅的に検討し、長期的な税務戦略を提案する',
          emoji: '📊',
          effects: { taxKnowledge: 3, accuracy: 2, communication: 3, problemSolving: 3 },
          feedback: {
            narration: '長期的な視点での税務戦略は、顧問税理士として最も価値の高いアドバイスです。',
            dialogues: [{ speaker: 'D社・社長', emoji: '🏭', text: '中小企業経営強化税制で設備投資の即時償却ができるんですね。来期の設備更新計画と合わせて検討します。退職金の準備も今から始めた方がいいんですね。' }],
            lesson: '節税は「単年度」ではなく「長期的」に考えることが重要です。設備投資減税、退職金準備（中退共・小規模企業共済）、生命保険活用など、経営計画と連動した税務戦略が効果的です。',
          },
        },
        {
          id: 'aggressive-scheme',
          text: '利益の圧縮を最大化するため、グレーゾーンの節税スキームも含めて提案する',
          emoji: '💰',
          effects: { taxKnowledge: 2, accuracy: 0, communication: 1, problemSolving: 0 },
          feedback: {
            narration: 'グレーゾーンの節税は、税務調査で否認されるリスクが高く、追徴課税の原因になります。',
            dialogues: [{ speaker: '森所長', emoji: '📚', text: 'グレーゾーンの節税は絶対にダメだ！税理士は「節税」を提案する立場であって「脱税」を手助けする立場じゃない。否認されれば追徴課税に加え、加算税もかかる。顧問先を守ることが最優先だ。' }],
            lesson: '税理士には「租税正義の実現」の義務があります。グレーゾーンの節税スキームは、税務調査で否認された場合、本税＋過少申告加算税＋延滞税が課されます。リスクに見合いません。',
          },
        },
        {
          id: 'basic-measures',
          text: '決算賞与の支給や少額減価償却資産の特例など、確実な節税策を提案する',
          emoji: '✅',
          effects: { taxKnowledge: 2, accuracy: 3, communication: 2, problemSolving: 2 },
          feedback: {
            narration: '確実性の高い基本的な節税策は、リスクが低く着実な効果があります。',
            dialogues: [{ speaker: 'D社・社長', emoji: '🏭', text: '決算賞与で従業員のモチベーションも上がるし、30万円未満の備品も一括経費にできるんですね。手堅い方法でいきましょう。' }],
            lesson: '中小企業の基本的な節税策として、決算賞与（期末従業員への賞与）、少額減価償却資産の特例（30万円未満の一括経費算入）、倒産防止共済（経営セーフティ共済）などがあります。',
          },
        },
      ],
    },
    {
      id: 'corporate-settlement',
      title: '法人決算',
      timeLabel: '午後4:30',
      narration: '顧問先のIT企業E社の法人決算のチェックを行います。決算書の正確性は企業の信用に直結する重要な業務です。',
      dialogues: [
        { speaker: 'E社・経理担当', emoji: '👩‍💼', text: '決算書の第一稿ができました。確認をお願いします。売掛金の計上で少し迷った箇所があるのですが...。' },
        { speaker: '森所長', emoji: '📚', text: '決算チェックは「正確性」が最優先だ。一つのミスが税額に大きく影響する。ダブルチェック体制で臨もう。' },
      ],
      situation: '決算書をチェック中、売掛金の計上時期に疑義のある取引を発見しました。期末直前に大口の売上が計上されていますが、実際の納品は翌期になっています。どう対応しますか？',
      choices: [
        {
          id: 'accurate-correction',
          text: '収益認識基準に基づき、売上計上時期を翌期に修正するよう指導する',
          emoji: '📏',
          effects: { taxKnowledge: 3, accuracy: 3, communication: 2, problemSolving: 2 },
          feedback: {
            narration: '収益認識基準の正確な適用は、決算の信頼性を担保する基本中の基本です。',
            dialogues: [{ speaker: 'E社・経理担当', emoji: '👩‍💼', text: '納品が完了していない以上、今期の売上には計上できないんですね。修正します。来期の数字は良くなりますが、正確性が大事ですよね。' }],
            lesson: '売上の計上時期は「収益認識基準」に基づいて判断します。商品の引渡し時、役務の提供時など、実態に即した計上が必要です。期ずれは税務調査でも重点チェック項目です。',
          },
        },
        {
          id: 'client-preference',
          text: '社長の希望もあるため、今期に計上したまま処理する',
          emoji: '👔',
          effects: { taxKnowledge: 0, accuracy: 0, communication: 1, problemSolving: 0 },
          feedback: {
            narration: '経営者の希望に従って不正確な決算を作成することは、税理士の倫理違反です。',
            dialogues: [{ speaker: '森所長', emoji: '📚', text: '経営者の意向で会計処理を歪めることは絶対に許されない。税理士には「真実の報告義務」がある。不正確な決算書に署名した税理士は懲戒処分の対象になるよ。' }],
            lesson: '税理士は独立した専門家として、クライアントの圧力に屈することなく正確な税務処理を行う義務があります。税理士法第1条の「税理士の使命」に反する行為は懲戒の対象です。',
          },
        },
        {
          id: 'consultation',
          text: '売上計上時期について、契約書と納品実績を詳しく確認してから判断する',
          emoji: '🔍',
          effects: { taxKnowledge: 2, accuracy: 3, communication: 1, problemSolving: 2 },
          feedback: {
            narration: '契約条件の詳細な確認は、正確な会計処理の前提となる重要なステップです。',
            dialogues: [{ speaker: '森所長', emoji: '📚', text: '契約書の確認は正しい。出荷基準か検収基準かによって計上時期が変わることがある。事実関係を正確に把握してから判断しよう。' }],
            lesson: '収益の計上時期は契約条件、業界慣行、取引の実態を総合的に判断します。出荷基準、検収基準、工事進行基準など、取引の性質に応じた適切な基準を選択しましょう。',
          },
        },
      ],
    },
    {
      id: 'tax-reform-study',
      title: '税制改正勉強',
      timeLabel: '午後6:00',
      narration: '業務を終え、来年度の税制改正大綱の勉強会に参加します。税法は毎年変わるため、継続的な学習は税理士にとって不可欠です。',
      dialogues: [
        { speaker: '森所長', emoji: '📚', text: '税法は毎年改正される。最新の知識がなければ、顧問先に適切なアドバイスはできない。勉強を怠った税理士は、すぐに時代遅れになるよ。' },
        { speaker: 'あなた', emoji: '😊', text: '今年の改正はインボイス制度の見直しと、中小企業向けの設備投資減税が注目ですね。' },
      ],
      situation: '税制改正の知識をどのように実務に活かしますか？',
      choices: [
        {
          id: 'proactive-advisory',
          text: '改正内容を顧問先ごとの影響度で分析し、個別にアドバイスレターを送付する',
          emoji: '📝',
          effects: { taxKnowledge: 3, accuracy: 2, communication: 3, problemSolving: 2 },
          feedback: {
            narration: '個別の影響分析とプロアクティブな情報提供は、顧問税理士の大きな付加価値です。',
            dialogues: [{ speaker: '森所長', emoji: '📚', text: '素晴らしい取り組みだ。顧問先から聞かれる前に情報を提供する。それが「頼りになる税理士」への道だ。年末調整や確定申告の前に、改正内容を通知するのは基本中の基本だよ。' }],
            lesson: '税制改正の情報をいち早く顧問先に伝え、具体的な影響と対策を提案できる税理士は高い評価を得ます。「言われてから動く」のではなく「先回りして動く」姿勢が差別化になります。',
          },
        },
        {
          id: 'self-study',
          text: '改正内容を自分で理解し、質問されたら回答できるよう準備する',
          emoji: '📚',
          effects: { taxKnowledge: 2, accuracy: 2, communication: 1, problemSolving: 1 },
          feedback: {
            narration: '知識の習得は大切ですが、受け身の姿勢では顧問先への貢献度が限定的です。',
            dialogues: [{ speaker: '森所長', emoji: '📚', text: '知識を蓄えるのはいいが、聞かれてから答えるだけでは付加価値が低い。税理士の価値は「先手を打って」顧問先の利益を守ること。能動的に動こう。' }],
            lesson: '税理士の付加価値は「知識」ではなく「知識の活用」にあります。改正情報を顧問先の状況に当てはめ、具体的なアクションプランとして提案することが重要です。',
          },
        },
        {
          id: 'seminar-organize',
          text: '顧問先向けの税制改正セミナーを企画し、まとめて情報提供する',
          emoji: '🎤',
          effects: { taxKnowledge: 2, accuracy: 1, communication: 3, problemSolving: 2 },
          feedback: {
            narration: 'セミナー開催は効率的な情報提供方法であり、事務所のブランディングにもなります。',
            dialogues: [{ speaker: '森所長', emoji: '📚', text: 'セミナーはいいアイデアだ。ただ、顧問先ごとに影響が異なるから、セミナーは概要説明、個別対応はフォローアップで、という二段構えが効果的だよ。' }],
            lesson: '税理士事務所が開催する税制改正セミナーは、顧問先への情報提供と新規顧客の獲得の両方に効果的です。セミナー後の個別フォローも重要なポイントです。',
          },
        },
      ],
    },
    {
      id: 'reflection',
      title: '振り返り',
      timeLabel: '帰宅後',
      narration: '確定申告シーズンの忙しい一日を終えて帰宅します。税理士としてのキャリアと使命について振り返ります。',
      dialogues: [
        { speaker: '森所長', emoji: '📚', text: '税理士は「税の番人」であり「経営者のパートナー」だ。数字の正確さと、人との信頼関係。この両方を大切にしてほしい。' },
        { speaker: 'あなた', emoji: '😊', text: '正確性と誠実さが税理士の命だということを改めて実感した一日でした。' },
      ],
      situation: '税理士として最も大切にすべきことは何だと思いますか？',
      choices: [
        {
          id: 'trust-and-accuracy',
          text: '正確な税務処理と誠実な対応で、顧問先からの信頼を積み重ねること',
          emoji: '🏛️',
          effects: { taxKnowledge: 2, accuracy: 3, communication: 2, problemSolving: 2 },
          feedback: {
            narration: '正確性と信頼は税理士業務の根幹であり、すべての活動の土台です。',
            dialogues: [{ speaker: '森所長', emoji: '📚', text: 'その通りだ。税理士の信用は一朝一夕には築けない。しかし、一つのミスで失われることもある。毎日の丁寧な仕事の積み重ねが、最大の財産になるよ。' }],
            lesson: '税理士業は「信頼業」です。正確な処理と誠実な対応の積み重ねが、顧問先の紹介や長期契約につながります。一件のミスが信頼を損なうリスクも常に意識しましょう。',
          },
        },
        {
          id: 'continuous-learning',
          text: '税法の改正に常に対応し、専門知識のアップデートを怠らないこと',
          emoji: '📖',
          effects: { taxKnowledge: 3, accuracy: 2, communication: 1, problemSolving: 2 },
          feedback: {
            narration: '税法の継続学習は税理士としての専門性を維持・向上させる生命線です。',
            dialogues: [{ speaker: '森所長', emoji: '📚', text: '税法は毎年変わる。10年前の知識では今の仕事はできない。CPE（継続的専門教育）を受けるだけでなく、自主的な学習も欠かさないことが大切だ。' }],
            lesson: '税理士には年36時間以上のCPE（継続的専門教育）が求められます。税法だけでなく、会計基準、IT、経営コンサルティングなど、幅広い知識のアップデートが必要です。',
          },
        },
        {
          id: 'business-partner',
          text: '税務だけでなく、経営全般の相談相手として顧問先の成長を支援すること',
          emoji: '🤝',
          effects: { taxKnowledge: 1, accuracy: 1, communication: 3, problemSolving: 3 },
          feedback: {
            narration: '経営パートナーとしての役割は、税理士の付加価値を最大化する方向性です。',
            dialogues: [{ speaker: '森所長', emoji: '📚', text: '中小企業の社長にとって、税理士は最も身近な専門家なんだ。税務だけでなく、資金繰り、事業承継、M&A...経営全般の相談に乗れる税理士は、これからの時代ますます求められるよ。' }],
            lesson: '税理士の業務は税務申告だけでなく、経営コンサルティング、事業承継、M&A支援など拡大しています。「認定経営革新等支援機関」として中小企業の成長を総合的に支援できます。',
          },
        },
      ],
    },
  ],
  ending: (scores) => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const topMetric = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const topLabels: Record<string, string> = {
      taxKnowledge: '税法のエキスパート',
      accuracy: '正確無比の税務プロ',
      communication: '信頼される経営パートナー',
      problemSolving: '問題解決の達人税理士',
    };
    if (total >= 28) {
      return {
        title: topLabels[topMetric] ?? '優秀な税理士',
        emoji: '🌟',
        summary: 'あなたは正確な税務処理と顧問先への誠実な対応を兼ね備えた優れた税理士です。専門知識と人間力で、中小企業の発展に貢献しています。',
        learnings: [
          '税理士は「税の番人」であり「経営者のパートナー」',
          '正確性は税理士の最も重要な資質',
          '節税提案は合法的な範囲で最大限の工夫をする',
          '税法は毎年改正されるため継続学習が必須',
        ],
        realWorldNote: '税理士試験は科目合格制（5科目合格で資格取得）で、合格率は各科目10-20%程度。平均合格期間は5-10年の難関資格です。公認会計士資格や大学院修了による一部免除制度もあります。独立開業が多い点も特徴です。',
      };
    }
    return {
      title: '成長中の税理士',
      emoji: '🌱',
      summary: '税理士業務の基本を学びましたが、税務知識や顧問先対応にはまだ伸びしろがあります。正確さと誠実さを大切に、経験を積んでいきましょう。',
      learnings: [
        '確定申告の基本的な流れと注意点',
        '税務調査では正確・誠実・冷静な対応が重要',
        '節税と脱税の境界を明確に理解する必要がある',
        '顧問先への能動的な情報提供が付加価値になる',
      ],
      realWorldNote: '税理士を目指すなら、まず簿記2級から始めましょう。税理士事務所でのアルバイトや就職で実務経験を積みながら試験に挑戦する方法が一般的です。科目合格制なので、働きながら取得を目指せます。',
    };
  },
};
