import { useState } from 'react';

/** モバイル判定のブレークポイント (px) */
const MOBILE_BREAKPOINT = 768;

/** 背景画像マッピング */
const BG_IMAGES: Record<string, { pc: string; mobile: string }> = {
  // ページ別
  top: { pc: '/images/backgrounds/top.jpg', mobile: '/images/backgrounds/mobile/top.jpg' },
  diagnosis: { pc: '/images/backgrounds/diagnosis.jpg', mobile: '/images/backgrounds/mobile/diagnosis.jpg' },
  result: { pc: '/images/backgrounds/result.jpg', mobile: '/images/backgrounds/mobile/result.jpg' },
  encyclopedia: { pc: '/images/backgrounds/encyclopedia.jpg', mobile: '/images/backgrounds/mobile/encyclopedia.jpg' },
  // ライフステージ別
  elementary: { pc: '/images/backgrounds/elementary.jpg', mobile: '/images/backgrounds/mobile/elementary.jpg' },
  'middle-school': { pc: '/images/backgrounds/middle-school.jpg', mobile: '/images/backgrounds/mobile/middle-school.jpg' },
  'high-school': { pc: '/images/backgrounds/high-school.jpg', mobile: '/images/backgrounds/mobile/high-school.jpg' },
  university: { pc: '/images/backgrounds/university.jpg', mobile: '/images/backgrounds/mobile/university.jpg' },
  vocational: { pc: '/images/backgrounds/vocational.jpg', mobile: '/images/backgrounds/mobile/vocational.jpg' },
  shukatsu: { pc: '/images/backgrounds/shukatsu.jpg', mobile: '/images/backgrounds/mobile/shukatsu.jpg' },
  'early-career': { pc: '/images/backgrounds/early-career.jpg', mobile: '/images/backgrounds/mobile/early-career.jpg' },
  'mid-career': { pc: '/images/backgrounds/mid-career.jpg', mobile: '/images/backgrounds/mobile/mid-career.jpg' },
  future: { pc: '/images/backgrounds/future.jpg', mobile: '/images/backgrounds/mobile/future.jpg' },
  // 業種別
  'IT・テクノロジー': { pc: '/images/backgrounds/industry-it.jpg', mobile: '/images/backgrounds/mobile/industry-it.jpg' },
  'クリエイティブ・メディア': { pc: '/images/backgrounds/industry-creative.jpg', mobile: '/images/backgrounds/mobile/industry-creative.jpg' },
  'ビジネス・営業': { pc: '/images/backgrounds/industry-business.jpg', mobile: '/images/backgrounds/mobile/industry-business.jpg' },
  '金融・コンサル': { pc: '/images/backgrounds/industry-finance.jpg', mobile: '/images/backgrounds/mobile/industry-finance.jpg' },
  'メーカー': { pc: '/images/backgrounds/industry-maker.jpg', mobile: '/images/backgrounds/mobile/industry-maker.jpg' },
  '医療・福祉': { pc: '/images/backgrounds/industry-medical.jpg', mobile: '/images/backgrounds/mobile/industry-medical.jpg' },
  '教育・法律・公務': { pc: '/images/backgrounds/industry-education.jpg', mobile: '/images/backgrounds/mobile/industry-education.jpg' },
  'サービス・ライフスタイル': { pc: '/images/backgrounds/industry-service.jpg', mobile: '/images/backgrounds/mobile/industry-service.jpg' },
  '建設・インフラ': { pc: '/images/backgrounds/industry-infra.jpg', mobile: '/images/backgrounds/mobile/industry-infra.jpg' },
};

export function getBgImageUrl(key: string): string | undefined {
  const entry = BG_IMAGES[key];
  if (!entry) return undefined;
  return window.innerWidth <= MOBILE_BREAKPOINT ? entry.mobile : entry.pc;
}

interface BgImageProps {
  /** BG_IMAGESのキー */
  imageKey: string;
  /** 暗くするオーバーレイの不透明度 (0-1, デフォルト 0.55) */
  overlay?: number;
  /** trueにすると背景をビューポートに固定し、コンテンツだけスクロールする */
  fixedBg?: boolean;
  children: React.ReactNode;
  className?: string;
}

/** 背景画像付きコンテナ。画像がない場合は children のみ表示 */
export function BgImage({ imageKey, overlay = 0.55, fixedBg = false, children, className = '' }: BgImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const entry = BG_IMAGES[imageKey];

  if (!entry || error) {
    return <>{children}</>;
  }

  const pcUrl = entry.pc;
  const mobileUrl = entry.mobile;

  return (
    <div className={`relative ${className}`}>
      {/* 背景画像（fixedモード: ビューポート固定、コンテンツだけスクロール） */}
      <div className={fixedBg ? 'fixed inset-0 z-0' : 'absolute inset-0 z-0'}>
        <picture>
          <source media={`(max-width: ${MOBILE_BREAKPOINT}px)`} srcSet={mobileUrl} />
          <img
            src={pcUrl}
            alt=""
            loading="eager"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </picture>
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
