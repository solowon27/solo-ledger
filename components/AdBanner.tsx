'use client';

import { useEffect, useRef } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const ad = adRef.current;

    if (!container || !ad) {
      return;
    }

    let initialized = false;
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const tryInitialize = () => {
      if (initialized) {
        return;
      }

      if (ad.getAttribute('data-adsbygoogle-status')) {
        initialized = true;
        return;
      }

      const containerWidth = container.getBoundingClientRect().width;

      /*
       * Do not let AdSense initialize while the element is effectively
       * hidden or still being laid out.
       *
       * 100px is intentionally conservative. An actual responsive ad
       * should never need to initialize at 1px.
       */
      if (containerWidth < 100) {
        attempts += 1;

        // Keep checking for a short period while the page settles.
        if (attempts < 50) {
          timer = setTimeout(tryInitialize, 200);
        }

        return;
      }

      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});

        initialized = true;
      } catch (error) {
        console.warn(
          'AdSense banner initialization skipped:',
          error
        );
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      if (!initialized) {
        tryInitialize();
      }
    });

    resizeObserver.observe(container);

    // Initial attempt after layout/paint.
    timer = setTimeout(tryInitialize, 300);

    return () => {
      resizeObserver.disconnect();

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`my-6 min-h-[90px] w-full overflow-hidden text-center ${className}`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          minHeight: '90px',
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