import { useState, useMemo } from 'react';
import type { DiagnosisType, StatKey, DiagnosisRecord } from '../types';
import { diagnosisTypes, getDiagnosisType } from '../data/diagnosis';
import { statDefinitions, valueDefinitions } from '../data/stats';
import { jobs } from '../data/jobs/index';
import { DiagnosisAIReviewSection } from './DiagnosisAIReview';
import { CareerConsultation } from './CareerConsultation';
import { computeJobProfile, calcMatchRate } from './SkillRadarChart';
import { BgImage } from './BgImage';

interface DiagnosisDetailPageProps {
  record: DiagnosisRecord;
  onBack: () => void;
}

/** 診断結果の詳細ページ（MBTI級の解説） */
export function DiagnosisDetailPage({ record, onBack }: DiagnosisDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'work' | 'growth'>('overview');

  const primary = getDiagnosisType(record.primaryStat);
  const secondary = getDiagnosisType(record.secondaryStat);

  // 適性マッチ度ランキングと同じアルゴリズム（calcMatchRate）でTOP職種を算出
  const topJobTitles = useMemo(() => {
    return jobs
      .map((job) => {
        const profile = computeJobProfile(job.tags, job.skillsGained, job.suitableFor);
        return { title: job.title, rate: calcMatchRate(record.stats, profile) };
      })
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 5)
      .map((j) => `${j.title}（適性${j.rate}%）`);
  }, [record.stats]);

  // スコアのソート（バーチャート用）
  const sortedStats = (Object.entries(record.stats) as [StatKey, number][])
    .sort((a, b) => b[1] - a[1]);
  const maxStat = sortedStats[0][1] || 1;

  return (
    <BgImage imageKey="result" overlay={0.45} fixedBg className="min-h-screen bg-gradient-to-br from-violet-100 via-indigo-50 via-50% to-amber-50 relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[5%] right-[5%] w-56 h-56 rounded-full bg-purple-200/15 animate-float-slow" />
        <div className="absolute top-[40%] left-[3%] w-40 h-40 rounded-full bg-amber-200/10 animate-float-medium" />
      </div>

      {/* ヘッダー */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            ← 戻る
          </button>
          <h1 className="text-sm font-semibold text-gray-600">診断結果の詳細</h1>
          <span className="ml-auto text-xs text-gray-400">{record.date}</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6 relative z-10">
        {/* メインタイプ */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center animate-bounce-in">
          <span className="text-6xl">{primary.emoji}</span>
          <h2 className="text-2xl font-bold text-gray-800 mt-3">{primary.label}</h2>
          <p className="text-indigo-500 font-medium text-sm mt-1">{primary.tagline}</p>
          <p className="text-gray-500 text-sm leading-relaxed mt-4 max-w-md mx-auto">
            {primary.description}
          </p>

          {/* サブタイプ（控えめに表示） */}
          <p className="mt-3 text-[11px] text-gray-400">
            隠れた傾向: <span className="text-gray-500">{secondary.emoji} {secondary.label}</span>
          </p>
        </div>

        {/* スコアバーチャート */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
          <h3 className="text-base font-bold text-gray-800 mb-4">📊 あなたのスコア分布</h3>
          <div className="space-y-3">
            {sortedStats.map(([key, value]) => {
              const statDef = statDefinitions.find((d) => d.key === key);
              const percentage = Math.max(5, Math.round((value / maxStat) * 100));
              const isPrimary = key === record.primaryStat;
              const isSecondary = key === record.secondaryStat;
              return (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-lg w-8 text-center">{statDef?.emoji ?? '📊'}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-medium ${isPrimary ? 'text-indigo-600' : isSecondary ? 'text-violet-500' : 'text-gray-500'}`}>
                        {statDef?.label ?? key}
                        {isPrimary && ' ★'}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-700 ${isPrimary ? 'bg-indigo-500' : isSecondary ? 'bg-violet-400' : 'bg-gray-300'}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 価値観チャート */}
        {record.values && (
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-slide-up">
            <h3 className="text-base font-bold text-gray-800 mb-4">🧭 あなたの価値観</h3>
            <div className="space-y-4">
              {valueDefinitions.map((vd) => {
                const val = record.values[vd.key];
                return (
                  <div key={vd.key}>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{vd.lowLabel}</span>
                      <span className="font-semibold text-gray-600">{vd.emoji} {vd.label}</span>
                      <span>{vd.highLabel}</span>
                    </div>
                    <div className="relative w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="absolute top-0 left-0 bg-gradient-to-r from-amber-300 to-orange-400 h-3 rounded-full transition-all duration-700"
                        style={{ width: `${val}%` }}
                      />
                      {/* Center marker */}
                      <div className="absolute top-0 left-1/2 w-0.5 h-3 bg-gray-300" />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">{vd.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 就活なんでも相談 */}
        <CareerConsultation
          primaryStat={record.primaryStat}
          secondaryStat={record.secondaryStat}
          stats={record.stats}
          values={record.values}
          recommendedJobs={topJobTitles}
        />

        {/* AIレビュー */}
        <DiagnosisAIReviewSection
          primaryStat={record.primaryStat}
          secondaryStat={record.secondaryStat}
          values={record.values}
        />

        {/* タブ切り替え */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {([
            { key: 'overview', label: '性格・特徴', emoji: '🔮' },
            { key: 'work', label: '仕事スタイル', emoji: '💼' },
            { key: 'growth', label: '成長アドバイス', emoji: '🌱' },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-white shadow text-gray-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* タブコンテンツ */}
        {activeTab === 'overview' && (
          <div className="space-y-4 animate-fade-in">
            {/* 強み */}
            <DetailCard title="💪 強み" items={primary.strengths} color="green" />
            {/* 弱み */}
            <DetailCard title="⚠️ 弱み・注意点" items={primary.weaknesses} color="amber" />
            {/* コミュニケーションスタイル */}
            <TextCard title="💬 コミュニケーションスタイル" text={primary.communicationStyle} />
            {/* 有名人タイプ */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="text-sm font-bold text-gray-800 mb-3">🌟 似ている有名人タイプ</h4>
              <div className="flex flex-wrap gap-2">
                {primary.famousPersonas.map((p, i) => (
                  <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'work' && (
          <div className="space-y-4 animate-fade-in">
            <TextCard title="🏢 仕事スタイル" text={primary.workStyle} />
            <TextCard title="✨ 理想の環境" text={primary.idealEnvironment} />
            <TextCard title="😰 ストレス要因" text={primary.stressSource} />
            {/* 向いている仕事 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="text-sm font-bold text-gray-800 mb-3">💼 向いている仕事</h4>
              <div className="flex flex-wrap gap-2">
                {primary.suitableJobs.map((job, i) => (
                  <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                    {job}
                  </span>
                ))}
              </div>
            </div>
            {/* 相性 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="text-sm font-bold text-gray-800 mb-3">🤝 タイプ相性</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-2">相性の良いタイプ</p>
                  <div className="flex gap-2">
                    {primary.compatibleTypes.map((key) => {
                      const t = getDiagnosisType(key);
                      return (
                        <span key={key} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                          {t.emoji} {t.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">ぶつかりやすいタイプ</p>
                  <div className="flex gap-2">
                    {primary.challengingTypes.map((key) => {
                      const t = getDiagnosisType(key);
                      return (
                        <span key={key} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">
                          {t.emoji} {t.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'growth' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-indigo-800 mb-3">🌱 成長のためのアドバイス</h4>
              <p className="text-indigo-700 text-sm leading-relaxed">
                {primary.growthAdvice}
              </p>
            </div>

            {/* サブタイプとの掛け合わせ */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="text-sm font-bold text-gray-800 mb-3">
                {primary.emoji} × {secondary.emoji} あなたの組み合わせ
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                メインが「{primary.label}」、サブが「{secondary.label}」のあなたは、
                {getCombinationAdvice(primary, secondary)}
              </p>
            </div>

            {/* 全タイプ一覧 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="text-sm font-bold text-gray-800 mb-3">📋 全タイプ一覧</h4>
              <div className="grid grid-cols-2 gap-2">
                {diagnosisTypes.map((type) => {
                  const isActive = type.key === record.primaryStat;
                  return (
                    <div
                      key={type.key}
                      className={`p-3 rounded-xl text-xs ${
                        isActive
                          ? 'bg-indigo-50 border-2 border-indigo-300'
                          : 'bg-gray-50 border border-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{type.emoji}</span>
                        <span className={`font-bold ${isActive ? 'text-indigo-700' : 'text-gray-700'}`}>
                          {type.label}
                        </span>
                      </div>
                      <p className="text-gray-500 leading-relaxed">{type.tagline}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 戻るボタン */}
        <div className="text-center pb-8">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-full shadow transition-all duration-200 active:scale-95 cursor-pointer"
          >
            戻る
          </button>
        </div>
      </main>
    </BgImage>
  );
}

/** リストカード */
function DetailCard({ title, items, color }: { title: string; items: string[]; color: 'green' | 'amber' }) {
  const bgColor = color === 'green' ? 'bg-emerald-50' : 'bg-amber-50';
  const textColor = color === 'green' ? 'text-emerald-700' : 'text-amber-700';
  const dotColor = color === 'green' ? 'bg-emerald-400' : 'bg-amber-400';
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h4 className="text-sm font-bold text-gray-800 mb-3">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className={`flex items-start gap-2 text-xs ${textColor} ${bgColor} rounded-lg p-2.5`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor} mt-1 flex-shrink-0`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** テキストカード */
function TextCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h4 className="text-sm font-bold text-gray-800 mb-3">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

/** 組み合わせアドバイス生成 */
function getCombinationAdvice(primary: DiagnosisType, secondary: DiagnosisType): string {
  const combos: Record<string, string> = {
    'communication+planning': '人を巻き込みながら企画を実現する力があります。プロデューサーや営業企画で大活躍するタイプ。',
    'communication+empathy': '相手への共感力と発信力を兼ね備え、教育やカウンセリング、HR領域で輝くタイプ。',
    'communication+creativity': '表現力とコミュ力の掛け算で、プレゼンやPR、広告の世界で無双できるタイプ。',
    'communication+initiative': '情熱的にビジョンを語り、人を動かすリーダー。起業や新規事業で天性の才能を発揮。',
    'communication+logical_thinking': '論理的な説得力と対人スキルを両立。コンサルタントや経営企画で重宝されるタイプ。',
    'communication+problem_solving': '技術を人に分かりやすく伝えられる希少人材。テクニカルセールスやIT PMで活躍。',
    'communication+resilience': '安定感のある人間関係を築き、長期的な信頼を勝ち取れる。金融営業や公務員向き。',
    'planning+creativity': 'アイデアを形にする実行力がある。企画職やプロデューサー、マーケティングの花形。',
    'planning+logical_thinking': '戦略を論理的に組み立てられる頭脳派。経営コンサルやマーケティング戦略で無敵。',
    'planning+initiative': 'ビジョンと行動力を兼ね備えた起業家タイプ。新規事業や経営で力を発揮。',
    'planning+empathy': '人のニーズを考えた企画ができる。教育プログラムの設計や福祉サービスの企画に強い。',
    'planning+problem_solving': '技術的な裏付けのある企画ができる。プロダクトマネージャーやシステム企画で活躍。',
    'planning+resilience': '計画を着実に実行できる安定感。プロジェクトマネージャーや管理職で信頼を得るタイプ。',
    'logical_thinking+problem_solving': '高い専門性と論理的思考を武器に、研究開発やデータサイエンスでトップクラスの成果を出せるタイプ。',
    'logical_thinking+resilience': '正確さと堅実さが光る。監査、会計、品質管理など、ミスが許されない分野で最大の力を発揮。',
    'logical_thinking+creativity': 'データに基づく独創的なアイデアを出せる希少人材。UXリサーチやデータアートの分野で注目される。',
    'logical_thinking+initiative': '素早い分析と行動力の掛け算。トレーダーやベンチャーのCTO候補タイプ。',
    'logical_thinking+empathy': '人の悩みを論理的に解決できる。カウンセラーや社会課題解決のスペシャリスト向き。',
    'resilience+empathy': '安心感と思いやりの両立。看護師、教師、公務員など「安定×人への貢献」で長く活躍。',
    'resilience+problem_solving': '着実に専門性を積み上げる職人気質。長年のキャリアで業界の重鎮になるタイプ。',
    'resilience+creativity': 'こだわりの品質で作品を作り上げる。伝統工芸やブランドのクラフトマンシップに向く。',
    'resilience+initiative': '普段は堅実だが、ここぞという時に大胆な決断ができるバランス型。管理職として最も信頼されるタイプ。',
    'initiative+creativity': '常識にとらわれない革新者。アーティスト、起業家、新しいジャンルを切り開くパイオニア。',
    'initiative+problem_solving': '最先端技術に飛び込むイノベーター。AIスタートアップやR&Dで世界を変えるタイプ。',
    'initiative+empathy': '社会課題に情熱を持って取り組む社会起業家タイプ。NPOやソーシャルビジネスの旗振り役。',
    'creativity+empathy': '人の心に響く作品を作れるアーティスト。絵本作家、福祉デザイン、セラピーアートに適性。',
    'creativity+problem_solving': '技術とアートの融合。ゲームクリエイター、CG技術者、インタラクティブアートの世界で輝く。',
    'creativity+resilience': 'コツコツと作品を磨き上げる職人アーティスト。品質にこだわるデザイナーやクラフトマン。',
    'empathy+problem_solving': '専門技術で人を助ける。医療技術者、リハビリ職、エンジニアリングで社会貢献するタイプ。',
  };

  const key1 = `${primary.key}+${secondary.key}`;
  const key2 = `${secondary.key}+${primary.key}`;
  return combos[key1] ?? combos[key2] ?? `${primary.label}の強みと${secondary.label}の要素を組み合わせた、あなただけのユニークな個性です。自分だけの強みの掛け算を見つけてみましょう。`;
}
