'use client';

import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  dataAdSlot: string;
  dataAdFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  dataFullWidthResponsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

export function AdBanner({
  dataAdSlot,
  dataAdFormat = 'auto',
  dataFullWidthResponsive = true,
  className = '',
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const adElement = adRef.current;

    if (!adElement) {
      return;
    }

    // AdSense adds this attribute after the <ins>
    // has already been initialized.
    if (adElement.getAttribute('data-adsbygoogle-status')) {
      return;
    }

    try {
      if (typeof window === 'undefined') {
        return;
      }

      window.adsbygoogle = window.adsbygoogle || [];

      window.adsbygoogle.push({});
    } catch (error) {
      // An advertising failure should never break the application.
      console.warn('AdSense banner initialization skipped:', error);
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`my-6 min-h-[90px] w-full overflow-hidden text-center ${className}`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
        }}
        data-ad-client="ca-pub-5417333344144399"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={
          dataFullWidthResponsive ? 'true' : 'false'
        }
      />
    </div>
  );
}