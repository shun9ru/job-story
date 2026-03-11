import type { JobExperience } from './types';

/** ITプロジェクトマネージャー体験ゲーム */
export const itPmExperience: JobExperience = {
  jobId: 'it-pm',
  title: 'ITプロジェクトマネージャー体験',
  subtitle: 'チームを率いてプロジェクトを成功に導け！',
  intro: {
    narration: 'あなたは今日から、大規模なECサイトリニューアルプロジェクトのプロジェクトマネージャー（PM）です。20人のチームを率いて、半年のプロジェクトを成功に導きましょう！',
    character: {
      name: '吉田部長',
      emoji: '👔',
      role: 'IT事業部長',
    },
    briefing:
      'このプロジェクトはうちの事業部の最重要案件だ。クライアントの期待も高い。PMとしてスケジュール・品質・コストをコントロールしてくれ。頼んだぞ！',
  },
  metrics: [
    { key: 'planning', label: '計画力', emoji: '📅', color: 'text-blue-500' },
    { key: 'risk', label: 'リスク管理', emoji: '⚠️', color: 'text-red-500' },
    { key: 'leadership', label: 'リーダーシップ', emoji: '👑', color: 'text-yellow-500' },
    { key: 'stakeholder', label: 'ステークホルダー管理', emoji: '🤝', color: 'text-green-500' },
  ],
  scenes: [
    {
      id: 'kickoff',
      title: 'プロジェクトキックオフ',
      timeLabel: 'プロジェクト開始日',
      narration: 'プロジェクトの最初のイベント「キックオフミーティング」です。チーム全員と関係者に、プロジェクトの方向性を示す重要な場です。',
      dialogues: [
        { speaker: '吉田部長', emoji: '👔', text: 'キックオフで何を伝えるかが、プロジェクトの空気を決める。しっかり準備してくれ。' },
        { speaker: 'エンジニアリーダー 大野さん', emoji: '👩‍💻', text: '前のプロジェクトではキックオフが形式的で、ゴールがよく分からないまま走り出しちゃったんですよね…' },
      ],
      situation: 'キックオフミーティングで最も重要視することは？',
      choices: [
        {
          id: 'vision-first',
          text: 'プロジェクトのビジョンと目標を明確に伝え、チーム全員の方向性を揃える',
          emoji: '🎯',
          effects: { planning: 2, risk: 1, leadership: 3, stakeholder: 1 },
          feedback: {
            narration: '明確なビジョンを示したことで、チームの一体感が生まれました。',
            dialogues: [
              { speaker: 'エンジニアリーダー 大野さん', emoji: '👩‍💻', text: '「なぜこのプロジェクトをやるのか」が分かると、やる気が全然違いますね！' },
              { speaker: '吉田部長', emoji: '👔', text: 'PMの最も大事な仕事は「チームの羅針盤になること」。方向性を示せたのは良いスタートだ。' },
            ],
            lesson: 'プロジェクトの成功はキックオフから始まります。「何を作るか」だけでなく「なぜ作るか」を共有することで、チームの自律的な判断と高いモチベーションが生まれます。',
          },
        },
        {
          id: 'plan-detail',
          text: '詳細なスケジュールとマイルストーンを提示し、具体的な進め方を共有する',
          emoji: '📋',
          effects: { planning: 3, risk: 2, leadership: 1, stakeholder: 1 },
          feedback: {
            narration: '具体的な計画を示したことで、チームは安心感を持って動き出せました。',
            dialogues: [
              { speaker: 'エンジニアリーダー 大野さん', emoji: '👩‍💻', text: 'いつまでに何をやるか明確だと、逆算して準備できるので助かります。' },
              { speaker: '吉田部長', emoji: '👔', text: '計画があると進捗の遅れにも早く気づける。ただ、計画は変わることもあるから柔軟性も忘れずにね。' },
            ],
            lesson: 'PMにとって「計画を立てる力」は最も基本的なスキル。ただし、計画は「変わるもの」という前提で、定期的に見直す柔軟性も大切です。',
          },
        },
        {
          id: 'role-clarity',
          text: '各メンバーの役割と責任を明確にし、コミュニケーションのルールを決める',
          emoji: '👥',
          effects: { planning: 1, risk: 1, leadership: 2, stakeholder: 3 },
          feedback: {
            narration: '役割の明確化で「誰に聞けばいいか」が全員に浸透しました。',
            dialogues: [
              { speaker: 'デザイナー 山本さん', emoji: '🎨', text: 'デザインの確認は誰に出せばいいか分かって、すごく動きやすくなりました。' },
              { speaker: '吉田部長', emoji: '👔', text: '役割を明確にすることで、責任の所在がはっきりする。問題が起きた時に「誰が判断するか」が分かるのは大きい。' },
            ],
            lesson: '役割と責任の明確化（RACIマトリクス）はPMの基本ツール。「誰が実行し、誰が承認し、誰に相談し、誰に報告するか」を決めることで、プロジェクトがスムーズに動きます。',
          },
        },
      ],
    },
    {
      id: 'schedule',
      title: 'スケジュール策定',
      timeLabel: '1週目',
      narration: '各チームからの見積もりを集め、全体のスケジュールを組み立てます。',
      dialogues: [
        { speaker: 'エンジニアリーダー 大野さん', emoji: '👩‍💻', text: '開発チームの見積もりですが、機能Aが3週間、機能Bが5週間。ただ、不確定要素もあるのでバッファが欲しいです。' },
        { speaker: 'クライアント 松本さん', emoji: '👔', text: 'リリースは6ヶ月後、絶対に遅らせたくないんです。' },
      ],
      situation: 'クライアントの期限とチームの見積もりの間にギャップがあります。',
      choices: [
        {
          id: 'buffer-plan',
          text: '各工程にバッファを入れた現実的なスケジュールを作り、クライアントに正直に説明する',
          emoji: '📊',
          effects: { planning: 3, risk: 3, leadership: 0, stakeholder: 2 },
          feedback: {
            narration: '正直な見積もりを提示したことで、クライアントからの信頼が得られました。',
            dialogues: [
              { speaker: 'クライアント 松本さん', emoji: '👔', text: 'リスクも含めた正直な計画を出してくれたんですね。信頼できます。では、スコープの優先順位を一緒に考えましょう。' },
            ],
            lesson: '楽観的な見積もりは後でトラブルの元。バッファを含めた現実的な計画を正直に示すことが、長期的な信頼関係と成功するプロジェクトの基盤です。',
          },
        },
        {
          id: 'parallel-plan',
          text: '並行作業できるタスクを洗い出し、スケジュールを圧縮する',
          emoji: '⚡',
          effects: { planning: 3, risk: 1, leadership: 2, stakeholder: 1 },
          feedback: {
            narration: '並行作業の最適化でスケジュールを短縮できましたが、チーム間の連携が重要になります。',
            dialogues: [
              { speaker: 'エンジニアリーダー 大野さん', emoji: '👩‍💻', text: '並行で進めるなら、インターフェースの仕様を先に決めないとお互い待ちになりますね。' },
              { speaker: '吉田部長', emoji: '👔', text: '並行作業はスケジュール圧縮の王道だが、依存関係の管理が肝だ。クリティカルパスを見極めよう。' },
            ],
            lesson: 'クリティカルパス法は、プロジェクトの最短期間を求める手法。並行作業を増やすことでスケジュールは短縮できますが、タスク間の依存関係の管理が重要になります。',
          },
        },
        {
          id: 'scope-negotiate',
          text: '6ヶ月で実現可能な機能を優先度順に並べ、スコープを調整する',
          emoji: '🔀',
          effects: { planning: 2, risk: 2, leadership: 1, stakeholder: 3 },
          feedback: {
            narration: 'スコープの優先順位づけで、クライアントの最も重要な要望を確実に実現できる計画になりました。',
            dialogues: [
              { speaker: 'クライアント 松本さん', emoji: '👔', text: '確かに、全部同時にやる必要はないですね。まずは売上に直結する決済と商品管理を優先しましょう。' },
              { speaker: '吉田部長', emoji: '👔', text: 'スコープ・スケジュール・品質のトレードオフを管理するのがPMの腕の見せどころだ。' },
            ],
            lesson: 'プロジェクトマネジメントでは「スコープ・スケジュール・品質・コスト」のトレードオフが常に存在します。全部を最大化するのは不可能。何を優先するか決めるのがPMの仕事です。',
          },
        },
      ],
    },
    {
      id: 'risk-event',
      title: 'リスク発生！ 主要メンバーの離脱',
      timeLabel: '2ヶ月目',
      narration: 'プロジェクトが進み始めた矢先、予期せぬ事態が発生しました。',
      dialogues: [
        { speaker: 'エンジニアリーダー 大野さん', emoji: '👩‍💻', text: 'すみません…バックエンドの主力メンバーの木村くんが、家庭の事情で来月から長期休職に入ることになりました。' },
        { speaker: 'エンジニアリーダー 大野さん', emoji: '👩‍💻', text: '木村くんは決済機能を一人で担当してたので、かなり影響が大きいです…' },
      ],
      situation: '主力メンバーが離脱します。プロジェクトへの影響をどう最小化しますか？',
      choices: [
        {
          id: 'knowledge-transfer',
          text: '木村くんが休職する前に、ナレッジの引き継ぎ期間を設けて他メンバーに移管する',
          emoji: '📝',
          effects: { planning: 2, risk: 3, leadership: 1, stakeholder: 1 },
          feedback: {
            narration: '計画的な引き継ぎにより、知識の断絶を最小限に抑えられました。',
            dialogues: [
              { speaker: 'エンジニアリーダー 大野さん', emoji: '👩‍💻', text: '木村くんがドキュメントを整理してくれて、後任の田中さんもキャッチアップできそうです。' },
              { speaker: '吉田部長', emoji: '👔', text: '「特定の人しかわからない状態」はリスクだ。今回を教訓に、常に知識を共有する文化を作ろう。' },
            ],
            lesson: '「バス係数」という概念があります。チームの何人がバスに轢かれたら（離脱したら）プロジェクトが止まるか。特定の人に依存しない体制を普段から作ることが大切です。',
          },
        },
        {
          id: 'reassign-resources',
          text: 'チーム内のリソースを再配置し、決済機能を複数人で分担する体制に変える',
          emoji: '🔄',
          effects: { planning: 2, risk: 2, leadership: 3, stakeholder: 0 },
          feedback: {
            narration: 'リソースの再配置で、一人に頼らない体制ができました。',
            dialogues: [
              { speaker: 'エンジニアリーダー 大野さん', emoji: '👩‍💻', text: '大変ですが、2人で分担することで逆にレビューし合える体制になりました。' },
              { speaker: '吉田部長', emoji: '👔', text: 'ピンチをチャンスに変えたね。リソース再配置はPMの重要なスキルだ。' },
            ],
            lesson: 'リソースの再配置はPMの重要な判断。単に人を当てるだけでなく、スキルセット・学習コスト・チームバランスを考慮して最適な配置を決めます。',
          },
        },
        {
          id: 'stakeholder-communication',
          text: 'クライアントに状況を正直に伝え、スケジュールへの影響と対策案を報告する',
          emoji: '💬',
          effects: { planning: 1, risk: 2, leadership: 1, stakeholder: 3 },
          feedback: {
            narration: '正直に状況を伝えたことで、クライアントと一緒に解決策を考えられました。',
            dialogues: [
              { speaker: 'クライアント 松本さん', emoji: '👔', text: '正直に教えてくれてありがとう。隠されるよりずっといい。一緒に対策を考えましょう。' },
              { speaker: '吉田部長', emoji: '👔', text: '悪い報告こそ早く。これが信頼関係を守る秘訣だ。' },
            ],
            lesson: '「悪い報告ほど早くする」はPMの鉄則。問題を隠すと後で大きなトラブルになります。正直に状況を伝え、対策案を添えて報告することで、ステークホルダーの信頼を維持できます。',
          },
        },
      ],
    },
    {
      id: 'team-issue',
      title: 'チーム内の課題解決',
      timeLabel: '3ヶ月目',
      narration: 'プロジェクトの中盤、チーム内でコミュニケーションの問題が表面化しています。',
      dialogues: [
        { speaker: 'デザイナー 山本さん', emoji: '🎨', text: 'エンジニアさんに渡したデザインが、実装の段階でかなり変えられてしまっていて…もっと早く相談してほしかったです。' },
        { speaker: 'エンジニアリーダー 大野さん', emoji: '👩‍💻', text: '技術的な制約で変更せざるを得なかったんです。でも確かに事前に相談すべきでした…' },
      ],
      situation: 'デザインチームとエンジニアチームの間で齟齬が生じています。',
      choices: [
        {
          id: 'process-change',
          text: 'デザインレビューの場にエンジニアも参加する仕組みを作り、早期に齟齬を防ぐ',
          emoji: '🔄',
          effects: { planning: 3, risk: 2, leadership: 2, stakeholder: 1 },
          feedback: {
            narration: 'プロセス改善により、デザインとエンジニアの間の齟齬が激減しました。',
            dialogues: [
              { speaker: 'デザイナー 山本さん', emoji: '🎨', text: 'エンジニアさんが早い段階で「これは技術的に難しい」と教えてくれるので、手戻りがなくなりました。' },
              { speaker: '吉田部長', emoji: '👔', text: '問題を「人」ではなく「仕組み」で解決する。これがマネジメントの王道だ。' },
            ],
            lesson: 'チーム間の問題は「人の性格」ではなく「プロセスの不備」が原因であることが多い。仕組みで解決することで、誰が担当しても同じ品質を保てます。',
          },
        },
        {
          id: 'facilitate-talk',
          text: '両チームを集めて対話の場を設け、お互いの考えや制約を共有する',
          emoji: '🗣️',
          effects: { planning: 0, risk: 1, leadership: 3, stakeholder: 2 },
          feedback: {
            narration: '対話を通じて相互理解が深まり、チームの一体感が増しました。',
            dialogues: [
              { speaker: 'デザイナー 山本さん', emoji: '🎨', text: 'エンジニアさんの苦労が分かったし、技術の制約を考慮したデザインを心がけますね。' },
              { speaker: 'エンジニアリーダー 大野さん', emoji: '👩‍💻', text: 'デザインの意図を聞けたので、今後は意図を活かした実装を心がけます。' },
            ],
            lesson: 'PMの重要な役割の一つが「ファシリテーション」。異なる専門性を持つチーム間の相互理解を促すことで、チーム全体のパフォーマンスが向上します。',
          },
        },
        {
          id: 'mediate',
          text: '双方の意見を個別に聞いた上で、PMとして判断基準を示し、今後のルールを決める',
          emoji: '⚖️',
          effects: { planning: 1, risk: 2, leadership: 3, stakeholder: 1 },
          feedback: {
            narration: 'PMとしての判断基準を示したことで、今後同じ問題が起きにくくなりました。',
            dialogues: [
              { speaker: '吉田部長', emoji: '👔', text: '個別に話を聞いた上で判断を下す。PMにはこの「仲裁者」としての役割もある。大事なのは、片方の味方をするのではなく、プロジェクトにとって最善の判断をすることだ。' },
            ],
            lesson: 'PMは「中立的な判断者」。片方の味方をするのではなく、プロジェクト全体の成功を基準に判断します。そのために、双方の意見を公平に聞くことが大切です。',
          },
        },
      ],
    },
    {
      id: 'client-negotiation',
      title: '顧客との交渉',
      timeLabel: '4ヶ月目',
      narration: 'クライアントから大幅な仕様変更の要望が来ました。プロジェクトへの影響が大きい変更です。',
      dialogues: [
        { speaker: 'クライアント 松本さん', emoji: '👔', text: '競合他社がAIレコメンド機能を出したんです。うちも同じ機能を追加できませんか？ 経営層も強く求めてます。' },
        { speaker: 'エンジニアリーダー 大野さん', emoji: '👩‍💻', text: '（小声）AI機能の追加は2ヶ月以上の追加工数になりますよ…' },
      ],
      situation: '大幅な仕様追加の要望です。どう対応しますか？',
      choices: [
        {
          id: 'impact-analysis',
          text: '影響分析を行い、コスト・スケジュール・品質への影響を具体的に数字で示す',
          emoji: '📊',
          effects: { planning: 3, risk: 2, leadership: 1, stakeholder: 3 },
          feedback: {
            narration: '具体的なデータで影響を示したことで、クライアントも冷静に判断できました。',
            dialogues: [
              { speaker: 'クライアント 松本さん', emoji: '👔', text: '2ヶ月遅れと追加費用800万円か…経営層と相談します。フェーズ2で対応する案も含めて検討しますね。' },
              { speaker: '吉田部長', emoji: '👔', text: '感情的に「無理です」と言うのではなく、データで示す。これがプロのPMだ。' },
            ],
            lesson: '仕様変更の要望に対しては「影響分析」で応える。スケジュール・コスト・品質への影響を具体的な数字で示すことで、クライアントが合理的に判断できるようにするのがPMの仕事です。',
          },
        },
        {
          id: 'alternative-proposal',
          text: 'フルのAI機能の代わりに、シンプルなレコメンド機能で実現可能な案を提案する',
          emoji: '💡',
          effects: { planning: 2, risk: 2, leadership: 2, stakeholder: 3 },
          feedback: {
            narration: '代替案が受け入れられ、スケジュールを守りながら競合にも対応できる計画になりました。',
            dialogues: [
              { speaker: 'クライアント 松本さん', emoji: '👔', text: 'なるほど、購買履歴ベースのシンプルなレコメンドなら1ヶ月で対応できるんですね。それでまずは進めましょう！' },
              { speaker: '吉田部長', emoji: '👔', text: '「できません」ではなく「こうすればできます」。PMの価値はここにある。' },
            ],
            lesson: 'PMは「No」と言うだけでなく、代替案を提案する力が求められます。クライアントの本当の目的（競合対策）を理解した上で、実現可能な解決策を示せるかが腕の見せどころです。',
          },
        },
        {
          id: 'accept-with-change',
          text: '要望を受け入れつつ、他の機能の優先度を下げてスコープを調整する',
          emoji: '🔀',
          effects: { planning: 2, risk: 3, leadership: 1, stakeholder: 2 },
          feedback: {
            narration: 'スコープのトレードオフを明確にしたことで、最も重要な機能に集中できる計画になりました。',
            dialogues: [
              { speaker: 'クライアント 松本さん', emoji: '👔', text: 'レビュー機能は確かに後回しにできますね。AI機能の方がビジネスインパクトは大きい。' },
              { speaker: '吉田部長', emoji: '👔', text: 'スコープの入れ替えは合理的な判断だ。ただ、変更した内容は必ず合意書に残しておこう。' },
            ],
            lesson: 'スコープの変更は「追加」だけでなく「入れ替え」で対応する方法もあります。何かを加えるなら何かを削る。このトレードオフを明確にすることで、現実的な計画を維持できます。',
          },
        },
      ],
    },
    {
      id: 'progress-management',
      title: '進捗管理の工夫',
      timeLabel: '5ヶ月目',
      narration: 'リリースまで残り1ヶ月。進捗に遅れが見え始めています。',
      dialogues: [
        { speaker: 'エンジニアリーダー 大野さん', emoji: '👩‍💻', text: 'テスト工程が予定より1週間遅れています。バグの修正に思ったより時間がかかっていて…' },
        { speaker: '吉田部長', emoji: '👔', text: 'リリース日は絶対に動かせない。どう巻き返す？' },
      ],
      situation: 'リリース1ヶ月前に進捗遅れが発生。どう対応しますか？',
      choices: [
        {
          id: 'reprioritize',
          text: '残りのバグを重大度で分類し、リリースに必須のものだけ優先対応する',
          emoji: '🎯',
          effects: { planning: 3, risk: 3, leadership: 1, stakeholder: 1 },
          feedback: {
            narration: 'バグの優先順位づけにより、限られた時間で最も重要な問題に集中できました。',
            dialogues: [
              { speaker: 'エンジニアリーダー 大野さん', emoji: '👩‍💻', text: 'リリースブロッカーの5件に集中したら、予定通りリリースできそうです。残りの軽微なバグはリリース後に対応しましょう。' },
              { speaker: '吉田部長', emoji: '👔', text: '「やらないことを決める」のもPMの大事な仕事だ。完璧を求めて遅れるより、重要なものを確実に届ける判断ができたね。' },
            ],
            lesson: 'リリース間際の進捗遅れでは「何をやらないか」を決めることが重要。バグを「ブロッカー」「メジャー」「マイナー」に分類し、リリースに必須のものだけに集中します。',
          },
        },
        {
          id: 'add-resources',
          text: '他のプロジェクトから応援メンバーを借りて、テスト工数を増やす',
          emoji: '👥',
          effects: { planning: 1, risk: 2, leadership: 2, stakeholder: 2 },
          feedback: {
            narration: '応援メンバーの投入で、テスト速度が上がりましたが、引き継ぎに時間がかかりました。',
            dialogues: [
              { speaker: '吉田部長', emoji: '👔', text: '人を追加して解決しようとするのはよくある手だが、「遅れたプロジェクトに人を追加するとさらに遅れる」というブルックスの法則もある。引き継ぎコストを考慮しよう。' },
            ],
            lesson: '「ブルックスの法則」は、遅れたプロジェクトに人員を追加すると逆効果になることがあるという法則。新メンバーへの教育コストやコミュニケーション増加を考慮する必要があります。',
          },
        },
        {
          id: 'daily-standup',
          text: '残り1ヶ月は毎日朝会を開き、進捗を可視化してチーム全体で問題を素早く潰す',
          emoji: '📊',
          effects: { planning: 2, risk: 2, leadership: 3, stakeholder: 1 },
          feedback: {
            narration: '毎日の進捗共有で問題が早期に発見され、チームの一体感も高まりました。',
            dialogues: [
              { speaker: 'エンジニアリーダー 大野さん', emoji: '👩‍💻', text: '毎日状況を共有すると、「あ、その問題なら私が手伝えますよ」って声が自然に出るようになりました。' },
              { speaker: '吉田部長', emoji: '👔', text: '進捗の可視化とチームの一体感。両方を生み出す良い施策だ。' },
            ],
            lesson: 'プロジェクトの佳境では、コミュニケーションの頻度を上げることが効果的。毎日の短い朝会（デイリースタンドアップ）で進捗を共有し、問題を即座に解決する体制を作ります。',
          },
        },
      ],
    },
    {
      id: 'retrospective',
      title: 'プロジェクトの振り返り',
      timeLabel: 'リリース後',
      narration: '無事リリースを完了し、プロジェクトの振り返りを行います。',
      dialogues: [
        { speaker: '吉田部長', emoji: '👔', text: 'お疲れさま。大変なプロジェクトだったけど、無事リリースできた。このプロジェクトから学んだことは？' },
      ],
      situation: 'PMとして一番大切だと感じたことは？',
      choices: [
        {
          id: 'communication-key',
          text: '関係者との誠実なコミュニケーションがすべての基盤',
          emoji: '💬',
          effects: { planning: 0, risk: 1, leadership: 1, stakeholder: 3 },
          feedback: {
            narration: 'コミュニケーションの大切さを深く実感しました。',
            dialogues: [
              { speaker: '吉田部長', emoji: '👔', text: 'PMの仕事の8割はコミュニケーションだと言われる。クライアント、チーム、経営層、すべてのステークホルダーとの誠実な対話が、プロジェクトの成功を左右する。' },
            ],
            lesson: 'PMの仕事の大部分はコミュニケーション。技術力や計画力も大切ですが、関係者との誠実な対話が、信頼とプロジェクトの成功の基盤です。',
          },
        },
        {
          id: 'risk-anticipation',
          text: 'リスクを先読みして備える力がプロジェクトを守る',
          emoji: '🛡️',
          effects: { planning: 1, risk: 3, leadership: 1, stakeholder: 0 },
          feedback: {
            narration: 'リスク管理の重要性を実感しました。',
            dialogues: [
              { speaker: '吉田部長', emoji: '👔', text: '問題が起きてから対処するのではなく、起きる前に備える。PMは「楽観的に計画し、悲観的に備える」くらいがちょうどいい。' },
            ],
            lesson: 'リスク管理はPMの核心的なスキル。リスクを「特定→分析→対策計画→監視」するサイクルを回し続けることで、予期せぬ事態にも冷静に対応できます。',
          },
        },
        {
          id: 'team-empowerment',
          text: 'チームが自律的に動ける環境を作ることがPMの最大の仕事',
          emoji: '🌱',
          effects: { planning: 0, risk: 0, leadership: 3, stakeholder: 1 },
          feedback: {
            narration: 'チームの成長を実感しました。',
            dialogues: [
              { speaker: '吉田部長', emoji: '👔', text: '最高のPMは「PMがいなくても回るチーム」を作る人だ。メンバーが自分で考え、自分で判断できる環境を整えるのが、本当のリーダーシップだ。' },
            ],
            lesson: 'PMの究極の仕事は「自分がいなくても動くチーム」を作ること。指示するのではなく、メンバーが自律的に判断できる環境・情報・権限を整えることが本当のリーダーシップです。',
          },
        },
      ],
    },
  ],
  ending: (scores) => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const topMetric = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const topLabels: Record<string, string> = {
      planning: '戦略的プランナーPM',
      risk: 'リスクマネジメントの達人PM',
      leadership: 'サーバントリーダーPM',
      stakeholder: '信頼構築の達人PM',
    };
    if (total >= 28) {
      return {
        title: topLabels[topMetric] ?? 'バランス型PM',
        emoji: '🌟',
        summary: '素晴らしいプロジェクト運営でした！ 計画・リスク管理・チーム運営・ステークホルダー管理を高いレベルでこなしました。',
        learnings: [
          'PMの仕事は「計画を立てる」だけでなく、変化に対応しながらプロジェクトを導くこと',
          '「悪い報告ほど早くする」が信頼関係の基盤',
          'スコープ・スケジュール・品質・コストのトレードオフを管理するのがPMの仕事',
          'チームが自律的に動ける環境を作ることが最高のリーダーシップ',
        ],
        realWorldNote: '実際のITプロジェクトマネージャーも、毎日こうした判断の連続です。PMの資格としてPMPやIPAのプロジェクトマネージャ試験があり、需要の高い職種です。',
      };
    }
    return {
      title: '成長中のPM',
      emoji: '🌱',
      summary: 'プロジェクトマネジメントの奥深さと面白さを実感できた体験でした。PMは技術とヒューマンスキルの両方が求められる挑戦的な仕事です！',
      learnings: [
        'PMは「技術」と「人」の両方を扱うハイブリッドな仕事',
        'コミュニケーションがPMの仕事の大部分を占める',
        '完璧な計画は存在しない。変化に適応する力が大切',
        'リスクは「起きてから対処」ではなく「起きる前に備える」',
      ],
      realWorldNote: 'PMは年齢や経験を重ねるほど価値が高まる職種。技術的なバックグラウンドがなくても、ビジネスやコミュニケーションの力を活かして活躍する人も多いです。',
    };
  },
};
