import { useState } from 'react';

/** 背景画像マッピング */
const BG_IMAGES: Record<string, string> = {
  // ページ別
  top: '/images/backgrounds/top.jpg',
  diagnosis: '/images/backgrounds/diagnosis.jpg',
  result: '/images/backgrounds/result.jpg',
  encyclopedia: '/images/backgrounds/encyclopedia.jpg',
  // ライフステージ別
  elementary: '/images/backgrounds/elementary.jpg',
  'middle-school': '/images/backgrounds/middle-school.jpg',
  'high-school': '/images/backgrounds/high-school.jpg',
  university: '/images/backgrounds/university.jpg',
  vocational: '/images/backgrounds/vocational.jpg',
  shukatsu: '/images/backgrounds/shukatsu.jpg',
  'early-career': '/images/backgrounds/early-career.jpg',
  'mid-career': '/images/backgrounds/mid-career.jpg',
  future: '/images/backgrounds/future.jpg',
  // 業種別
  'IT・テクノロジー': '/images/backgrounds/industry-it.jpg',
  'クリエイティブ・メディア': '/images/backgrounds/industry-creative.jpg',
  'ビジネス・営業': '/images/backgrounds/industry-business.jpg',
  '金融・コンサル': '/images/backgrounds/industry-finance.jpg',
  'メーカー': '/images/backgrounds/industry-maker.jpg',
  '医療・福祉': '/images/backgrounds/industry-medical.jpg',
  '教育・法律・公務': '/images/backgrounds/industry-education.jpg',
  'サービス・ライフスタイル': '/images/backgrounds/industry-service.jpg',
  '建設・インフラ': '/images/backgrounds/industry-infra.jpg',
};

export function getBgImageUrl(key: string): string | undefined {
  return BG_IMAGES[key];
}

interface BgImageProps {
  /** BG_IMAGESのキー */
  imageKey: string;
  /** 暗くするオーバーレイの不透明度 (0-1, デフォルト 0.55) */
  overlay?: number;
  children: React.ReactNode;
  className?: string;
}

/** 背景画像付きコンテナ。画像がない場合は children のみ表示 */
export function BgImage({ imageKey, overlay = 0.55, children, className = '' }: BgImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const url = BG_IMAGES[imageKey];

  if (!url || error) {
    return <>{children}</>;
  }

  return (
    <div className={`relative ${className}`}>
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0">
        <img
          src={url}
          alt=""
          loading="eager"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* オーバーレイ */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0,0,0,${overlay})` }}
        />
      </div>
      {/* コンテンツ */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
